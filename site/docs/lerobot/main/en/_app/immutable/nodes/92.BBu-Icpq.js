import"../chunks/DsnmJJEf.js";import{i as f,h as _,C as V,H as e,a as n,E as v}from"../chunks/D1zeK86u.js";import{p as N,o as k,s as l,f as W,a as g,b as S,d as R,n as E}from"../chunks/B9a_YfHB.js";import{s as X}from"../chunks/CrPi-TAD.js";const Q='{"title":"实时分块（RTC）","local":"实时分块rtc","sections":[{"title":"RTC 的工作原理（简化版）","local":"rtc-的工作原理简化版","sections":[],"depth":2},{"title":"快速开始","local":"快速开始","sections":[{"title":"安装","local":"安装","sections":[],"depth":3},{"title":"将 RTC 与 Pi0 一起使用","local":"将-rtc-与-pi0-一起使用","sections":[],"depth":3}],"depth":2},{"title":"关键参数","local":"关键参数","sections":[],"depth":2},{"title":"离线测试 RTC","local":"离线测试-rtc","sections":[],"depth":2},{"title":"在真实机器人上测试 RTC","local":"在真实机器人上测试-rtc","sections":[],"depth":2},{"title":"与 LeRobot 中 async inference 的区别","local":"与-lerobot-中-async-inference-的区别","sections":[],"depth":2},{"title":"进阶：调试跟踪","local":"进阶调试跟踪","sections":[],"depth":2},{"title":"参考资料","local":"参考资料","sections":[],"depth":2}],"depth":1}';var Y=R('<meta name="hf:doc:metadata"/>'),A=R(`<p></p> <!> <!> <p>实时分块（RTC）让 <a href="./pi0">Pi0</a>、<a href="./pi05">Pi0.5</a> 和 <a href="./smolvla">SmolVLA</a> 等基于流匹配的大型机器人 policy，即使 inference latency 很高，也能产生平滑、连续且反应灵敏的运动。LeRobot 提供了原始的 inference 时引导模式，并针对兼容的 Pi05 checkpoint，提供训练时 action 条件化与廉价的硬前缀（hard-prefix）inference。</p> <p>这类 policy 生成的是未来 action chunk（例如每次 50 步），而不是单个 action。
由于模型很大，生成每个 action chunk 所需的时间比机器人执行它所需的时间更长。
简单地逐个执行 action chunk 会导致问题，例如停顿、过渡卡顿，或当下一个 action chunk 到达过晚或与先前执行的 action 不一致时 policy 突然改变。</p> <p>RTC 通过异步生成下一个 action chunk（同时机器人继续执行当前 action chunk），并引导新 action chunk 使其与上一个 action chunk 中已经执行的部分平滑衔接，来解决这一问题。</p> <!> <p>RTC 让机器人在移动的同时提前思考。当机器人正在执行一个 action chunk 时，RTC 会提前开始生成下一个 action chunk。
但由于新 action chunk 就绪时机器人已经移动了一段距离，RTC 必须确保新 action chunk 与机器人当前的 action 仍然平滑衔接。</p> <p>为此，RTC 将新 action chunk 的开头视为一个图像修复（inpainting）或“填补空缺”问题：
它会温和地调整新 action chunk 的开头部分，使其与机器人正在进行的运动自然融合。结果是既没有停顿，也没有突然跳跃。</p> <p>用技术术语来说，RTC 在流匹配去噪过程中加入了一个引导项，迫使新 action chunk 中重叠的时间步与上一个 action chunk 已执行的部分保持接近，通常使用一个软过渡掩码。</p> <!> <!> <p>RTC 内置在 LeRobot 中。只需安装你需要的 policy 依赖：</p> <!> <!> <p>你可以使用 <code>lerobot-rollout --strategy.type=base --inference.type=rtc</code> 在真实机器人上进行 RTC 部署。
下面的代码片段提供了一个简化的伪示例，说明 RTC 如何与 Pi0 在你的流水线中运作：</p> <!> <!> <p><code>RTCConfig</code> 有以下可供调优的参数：</p> <p><strong><code>mode</code></strong> 选择 action 前缀条件化方法：</p> <ul><li><code>guided</code>（默认）在去噪过程中应用原始的雅可比（Jacobian）引导，适用于普通的流匹配 checkpoint。</li> <li><code>trained</code> 使用逐 action 的流时间步对上一个 action chunk 的前缀进行硬图像修复。它目前需要一个使用 <code>policy.rtc_training_max_delay &gt; 0</code> 训练的 Pi05 checkpoint，并避免了引导的反向传播。</li></ul> <p>对于 trained 模式，<code>execution_horizon</code> 与 rollout 后端的 <code>inference.queue_threshold</code> 都必须至少等于 checkpoint 的 <code>rtc_training_max_delay</code>，且 <code>execution_horizon</code> 不得超过 <code>chunk_size - rtc_training_max_delay</code>（即 RTC
论文中的 <code>d &lt;= s &lt;= H - d</code> 界限）；rollout 会在连接机器人之前验证这一点。</p> <p><strong><code>execution_horizon</code></strong>：需要与上一个 action chunk 保持一致的步数。值越大，过渡越平滑，但反应性可能越低。</p> <p>典型值：8-12 步</p> <!> <p><strong><code>max_guidance_weight</code></strong>：对与上一个 action chunk 保持一致的约束强度。这是一个可通过调优来平衡过渡平滑性与 policy 反应性的超参数。对于 10 步流匹配（SmolVLA、Pi0、Pi0.5），10.0 是一个最佳值。</p> <p><strong><code>prefix_attention_schedule</code></strong>：如何在重叠区域内对一致性进行加权。</p> <ul><li><code>LINEAR</code>：从 inference_delay 到 execution_horizon 的线性衰减</li> <li><code>EXP</code>：指数衰减（推荐入门使用）</li> <li><code>ONES</code>：在整个 execution_horizon 上施加完整权重</li> <li><code>ZEROS</code>：二值（在 inference_delay 之前为完整权重，之后为零）</li></ul> <p><strong><code>inference_delay</code></strong>：你的系统的 inference latency 步数。该值会传给 <code>predict_action_chunk()</code> 而不是配置，因为它可能在运行时变化。</p> <!> <p>在真实机器人上运行之前，先用 dataset 样本测试 RTC，以可视化它的工作方式：</p> <!> <p>在评估兼容的训练时 RTC Pi05
checkpoint 时，请添加 <code>--rtc.mode=trained</code>。不支持的 policy 会拒绝 trained 模式，而不是回退到
guided RTC。</p> <p>该脚本会生成去噪过程的可视化结果，将标准生成（左）与 RTC（右）进行对比。在 RTC 图中，你可以看到开头几步（蓝色/紫色线条）是如何被引导以匹配红色真值轨迹（上一个 action chunk 的尾部）的，从而确保 action chunk 之间的平滑过渡。</p> <p align="center"><img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/flow_matching.png" alt="Denoising steps with and without RTC" width="100%"/></p> <!> <!> <p>对于训练时 RTC Pi05 checkpoint，请将模式改为 <code>trained</code>。该
checkpoint 记录了它支持的最大延迟，rollout 会将测量到的
延迟与之对比验证：</p> <!> <!> <p>RTC 和<a href="./async">async inference</a>都能改善实时机器人控制，但它们解决的是不同的问题。</p> <table><thead><tr><th>方面</th><th>async inference</th><th>RTC</th></tr></thead><tbody><tr><td><strong>问题</strong></td><td>等待 inference 时出现空闲帧</td><td>action chunk 之间的不连续性</td></tr><tr><td><strong>解决方案</strong></td><td>将预测与执行解耦</td><td>引导新 action chunk 平滑延续自上一个 action chunk</td></tr><tr><td><strong>优势</strong></td><td>无需等待，action 连续</td><td>平滑过渡，action 自然</td></tr><tr><td><strong>适用场景</strong></td><td>async inference 最适合高 inference latency 的大型模型</td><td>基于流匹配的 policy</td></tr></tbody></table> <p><strong>将两者结合使用</strong>可获得最佳的平滑性和反应性！</p> <!> <p>RTC 内置了调试跟踪功能，帮助你了解 inference 期间发生的情况：</p> <!> <p>参见 <code>examples/rtc/eval_dataset.py</code> 查看离线 RTC 可视化的完整示例。</p> <!> <ul><li><a href="https://alexander-soare.github.io/robotics/2025/08/05/smooth-as-butter-robot-policies.html" rel="nofollow">Smooth-As-Butter Robot Policies</a>——关于真实机器人结果的出色技术讲解</li> <li><a href="https://www.physicalintelligence.company/research/real_time_chunking" rel="nofollow">Physical Intelligence - Real-Time Chunking</a>——原始论文与研究</li> <li><a href="https://github.com/Physical-Intelligence/real-time-chunking-kinetix" rel="nofollow">Kinetix RTC Implementation</a>——来自 Physical Intelligence 的参考实现</li> <li><a href="https://arxiv.org/abs/2512.05964" rel="nofollow">Training-Time Action Conditioning</a>——在训练期间使用干净前缀条件化的高效 RTC</li> <li><a href="https://github.com/RLWRLD/RLDX-1" rel="nofollow">RLDX-1</a>——用于训练时 RTC 集成的 PyTorch 参考实现</li></ul> <!> <p></p>`,1);function L(Z,B){N(B,!1),k(()=>{new URLSearchParams(window.location.search).get("fw")}),f();var a=A();_("17eptco",I=>{var C=Y();X(C,"content",Q),g(I,C)});var t=l(W(a),2);V(t,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var c=l(t,2);e(c,{title:"实时分块（RTC）",local:"实时分块rtc",headingTag:"h1"});var o=l(c,8);e(o,{title:"RTC 的工作原理（简化版）",local:"rtc-的工作原理简化版",headingTag:"h2"});var s=l(o,8);e(s,{title:"快速开始",local:"快速开始",headingTag:"h2"});var i=l(s,2);e(i,{title:"安装",local:"安装",headingTag:"h3"});var M=l(i,4);n(M,{code:"JTIzJTIwRm9yJTIwUGkwJTIwb3IlMjBQaTAuNSUwQXBpcCUyMGluc3RhbGwlMjAtZSUyMCUyMi4lNUJwaSU1RCUyMiUwQSUwQSUyMyUyMEZvciUyMFNtb2xWTEElMEFwaXAlMjBpbnN0YWxsJTIwLWUlMjAlMjIuJTVCc21vbHZsYSU1RCUyMg==",highlighted:`<span class="hljs-comment"># For Pi0 or Pi0.5</span>
pip install -e <span class="hljs-string">&quot;.[pi]&quot;</span>

<span class="hljs-comment"># For SmolVLA</span>
pip install -e <span class="hljs-string">&quot;.[smolvla]&quot;</span>`,lang:"bash",wrap:!1});var p=l(M,2);e(p,{title:"将 RTC 与 Pi0 一起使用",local:"将-rtc-与-pi0-一起使用",headingTag:"h3"});var d=l(p,4);n(d,{code:"ZnJvbSUyMGxlcm9ib3QucG9saWNpZXMucGkwJTIwaW1wb3J0JTIwUEkwUG9saWN5JTJDJTIwUEkwQ29uZmlnJTBBZnJvbSUyMGxlcm9ib3QuY29uZmlncyUyMGltcG9ydCUyMFJUQ0F0dGVudGlvblNjaGVkdWxlJTBBZnJvbSUyMGxlcm9ib3QucG9saWNpZXMucnRjJTIwaW1wb3J0JTIwUlRDQ29uZmlnJTJDJTIwQWN0aW9uUXVldWUlMEElMEElMjMlMjBMb2FkJTIwUGkwJTIwd2l0aCUyMFJUQyUyMGVuYWJsZWQlMEFwb2xpY3lfY2ZnJTIwJTNEJTIwUEkwQ29uZmlnKCklMEElMEElMjMlMjBFbmFibGUlMjBSVEMlMEFwb2xpY3lfY2ZnLnJ0Y19jb25maWclMjAlM0QlMjBSVENDb25maWcoJTBBJTIwJTIwJTIwJTIwZW5hYmxlZCUzRFRydWUlMkMlMEElMjAlMjAlMjAlMjBleGVjdXRpb25faG9yaXpvbiUzRDEwJTJDJTIwJTIwJTIzJTIwSG93JTIwbWFueSUyMHN0ZXBzJTIwdG8lMjBibGVuZCUyMHdpdGglMjBwcmV2aW91cyUyMGNodW5rJTBBJTIwJTIwJTIwJTIwbWF4X2d1aWRhbmNlX3dlaWdodCUzRDEwLjAlMkMlMjAlMjAlMjMlMjBIb3clMjBzdHJvbmdseSUyMHRvJTIwZW5mb3JjZSUyMGNvbnNpc3RlbmN5JTBBJTIwJTIwJTIwJTIwcHJlZml4X2F0dGVudGlvbl9zY2hlZHVsZSUzRFJUQ0F0dGVudGlvblNjaGVkdWxlLkVYUCUyQyUyMCUyMCUyMyUyMEV4cG9uZW50aWFsJTIwYmxlbmQlMEEpJTBBJTBBJTIzJTIwTG9hZCUyMHRoZSUyMHBvbGljeSUwQXBvbGljeSUyMCUzRCUyMFBJMFBvbGljeS5mcm9tX3ByZXRyYWluZWQoJTIybGVyb2JvdCUyRnBpMF9iYXNlJTIyJTJDJTIwcG9saWN5X2NmZyUzRHBvbGljeV9jZmclMkMlMjBkZXZpY2UlM0QlMjJjdWRhJTIyKSUwQSUwQSUyMyUyME5vdyUyMHVzZSUyMHByZWRpY3RfYWN0aW9uX2NodW5rJTIwd2l0aCUyMFJUQyUyMHBhcmFtZXRlcnMlMEFpbmZlcmVuY2VfZGVsYXklMjAlM0QlMjA0JTIwJTIwJTIzJTIwSG93JTIwbWFueSUyMHN0ZXBzJTIwb2YlMjBpbmZlcmVuY2UlMjBsYXRlbmN5JTJDJTIwdGhpcyUyMHZhbHVlJTIwc2hvdWxkJTIwYmUlMjBjYWxjdWxhdGVkJTIwYmFzZWQlMjBvbiUyMHRoZSUyMGluZmVyZW5jZSUyMGxhdGVuY3klMjBvZiUyMHRoZSUyMHBvbGljeSUwQSUwQSUyMyUyMEluaXRpYWxpemUlMjB0aGUlMjBhY3Rpb24lMjBxdWV1ZSUwQWFjdGlvbl9xdWV1ZSUyMCUzRCUyMEFjdGlvblF1ZXVlKHBvbGljeV9jZmcucnRjX2NvbmZpZyklMEElMEElMjMlMjBTdGFydCUyMGluJTIwYSUyMHNlcGFyYXRlJTIwdGhyZWFkJTIwd2l0aCUyMHRoZSUyMGZvbGxvd2luZyUyMGZ1bmN0aW9uJTBBZGVmJTIwZ2V0X2FjdGlvbnMoKSUzQSUwQSUyMCUyMHdoaWxlJTIwVHJ1ZSUzQSUwQSUyMCUyMCUyMCUyMGlmJTIwc2hvdWxkX2dldF9hY3Rpb25zJTNBJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwcHJldl9hY3Rpb25zJTIwJTNEJTIwYWN0aW9uX3F1ZXVlLmdldF9sZWZ0X292ZXIoKSUwQSUyMCUyMCUyMCUyMCUyMCUyMG9icyUyMCUzRCUyMGdldF9yb2JvdF9vYnNlcnZhdGlvbnMocm9ib3QpJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwR2VuZXJhdGUlMjBhY3Rpb25zJTIwV0lUSCUyMFJUQyUwQSUyMCUyMCUyMCUyMCUyMCUyMGFjdGlvbnMlMjAlM0QlMjBwb2xpY3kucHJlZGljdF9hY3Rpb25fY2h1bmsoJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwb2JzJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaW5mZXJlbmNlX2RlbGF5JTNEaW5mZXJlbmNlX2RlbGF5JTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwcHJldl9jaHVua19sZWZ0X292ZXIlM0RwcmV2X2FjdGlvbnMlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjApJTBBJTBBJTIwJTIwJTIwJTIwJTIwJTIwYWN0aW9uX3F1ZXVlLm1lcmdlKCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGFjdGlvbnMlMkMlMjBhY3Rpb25zJTJDJTIwaW5mZXJlbmNlX2RlbGF5JTBBJTIwJTIwJTIwJTIwJTIwJTIwKSUwQSUwQWZvciUyMHN0ZXAlMjBpbiUyMHJhbmdlKG51bV9zdGVwcyklM0ElMEElMjAlMjAlMjAlMjBhY3Rpb24lMjAlM0QlMjBhY3Rpb25fcXVldWUuZ2V0KCklMEElMEElMjAlMjAlMjAlMjAlMjMlMjBFeGVjdXRlJTIwdGhlJTIwZmlyc3QlMjBOJTIwYWN0aW9ucyUwQSUyMCUyMCUyMCUyMGV4ZWN1dGVfYWN0aW9ucyhhY3Rpb24p",highlighted:`<span class="hljs-keyword">from</span> lerobot.policies.pi0 <span class="hljs-keyword">import</span> PI0Policy, PI0Config
<span class="hljs-keyword">from</span> lerobot.configs <span class="hljs-keyword">import</span> RTCAttentionSchedule
<span class="hljs-keyword">from</span> lerobot.policies.rtc <span class="hljs-keyword">import</span> RTCConfig, ActionQueue

<span class="hljs-comment"># Load Pi0 with RTC enabled</span>
policy_cfg = PI0Config()

<span class="hljs-comment"># Enable RTC</span>
policy_cfg.rtc_config = RTCConfig(
    enabled=<span class="hljs-literal">True</span>,
    execution_horizon=<span class="hljs-number">10</span>,  <span class="hljs-comment"># How many steps to blend with previous chunk</span>
    max_guidance_weight=<span class="hljs-number">10.0</span>,  <span class="hljs-comment"># How strongly to enforce consistency</span>
    prefix_attention_schedule=RTCAttentionSchedule.EXP,  <span class="hljs-comment"># Exponential blend</span>
)

<span class="hljs-comment"># Load the policy</span>
policy = PI0Policy.from_pretrained(<span class="hljs-string">&quot;lerobot/pi0_base&quot;</span>, policy_cfg=policy_cfg, device=<span class="hljs-string">&quot;cuda&quot;</span>)

<span class="hljs-comment"># Now use predict_action_chunk with RTC parameters</span>
inference_delay = <span class="hljs-number">4</span>  <span class="hljs-comment"># How many steps of inference latency, this value should be calculated based on the inference latency of the policy</span>

<span class="hljs-comment"># Initialize the action queue</span>
action_queue = ActionQueue(policy_cfg.rtc_config)

<span class="hljs-comment"># Start in a separate thread with the following function</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_actions</span>():
  <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">if</span> should_get_actions:

      prev_actions = action_queue.get_left_over()
      obs = get_robot_observations(robot)

      <span class="hljs-comment"># Generate actions WITH RTC</span>
      actions = policy.predict_action_chunk(
          obs,
          inference_delay=inference_delay,
          prev_chunk_left_over=prev_actions,
      )

      action_queue.merge(
          actions, actions, inference_delay
      )

<span class="hljs-keyword">for</span> step <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_steps):
    action = action_queue.get()

    <span class="hljs-comment"># Execute the first N actions</span>
    execute_actions(action)`,lang:"python",wrap:!1});var J=l(d,2);e(J,{title:"关键参数",local:"关键参数",headingTag:"h2"});var T=l(J,14);n(T,{code:"UlRDQ29uZmlnKGV4ZWN1dGlvbl9ob3Jpem9uJTNEMTAp",highlighted:'RTCConfig(execution_horizon=<span class="hljs-number">10</span>)',lang:"python",wrap:!1});var y=l(T,10);e(y,{title:"离线测试 RTC",local:"离线测试-rtc",headingTag:"h2"});var r=l(y,4);n(r,{code:"cHl0aG9uJTIwZXhhbXBsZXMlMkZydGMlMkZldmFsX2RhdGFzZXQucHklMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5wYXRoJTNEbGVyb2JvdCUyRnBpMF9saWJlcm9fZmluZXR1bmVkJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1kYXRhc2V0LnJlcG9faWQlM0RIdWdnaW5nRmFjZVZMQSUyRmxpYmVybyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcnRjLmV4ZWN1dGlvbl9ob3Jpem9uJTNEMTAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJ0Yy5tYXhfZ3VpZGFuY2Vfd2VpZ2h0JTNEMTAuMCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZGV2aWNlJTNEY3VkYQ==",highlighted:`python examples/rtc/eval_dataset.py \\
    --policy.path=lerobot/pi0_libero_finetuned \\
    --dataset.repo_id=HuggingFaceVLA/libero \\
    --rtc.execution_horizon=10 \\
    --rtc.max_guidance_weight=10.0 \\
    --device=cuda`,lang:"bash",wrap:!1});var h=l(r,8);e(h,{title:"在真实机器人上测试 RTC",local:"在真实机器人上测试-rtc",headingTag:"h2"});var w=l(h,2);n(w,{code:"bGVyb2JvdC1yb2xsb3V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1zdHJhdGVneS50eXBlJTNEYmFzZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LnBhdGglM0QlMjQlN0JIRl9VU0VSTkFNRSU3RCUyRnBvbGljeV9yZXBvX2lkJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1pbmZlcmVuY2UudHlwZSUzRHJ0YyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0taW5mZXJlbmNlLnJ0Yy5tb2RlJTNEZ3VpZGVkJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1pbmZlcmVuY2UucnRjLmV4ZWN1dGlvbl9ob3Jpem9uJTNEMTAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWluZmVyZW5jZS5ydGMubWF4X2d1aWRhbmNlX3dlaWdodCUzRDEwLjAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJvYm90LnR5cGUlM0RzbzEwMF9mb2xsb3dlciUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcm9ib3QucG9ydCUzRCUyRmRldiUyRnR0eS51c2Jtb2RlbTU4RkEwODM0NTkxJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yb2JvdC5jYW1lcmFzJTNEJTIyJTdCJTIwZ3JpcHBlciUzQSUyMCU3QnR5cGUlM0ElMjBvcGVuY3YlMkMlMjBpbmRleF9vcl9wYXRoJTNBJTIwMSUyQyUyMHdpZHRoJTNBJTIwNjQwJTJDJTIwaGVpZ2h0JTNBJTIwNDgwJTJDJTIwZnBzJTNBJTIwMzAlN0QlMkMlMjBmcm9udCUzQSUyMCU3QnR5cGUlM0ElMjBvcGVuY3YlMkMlMjBpbmRleF9vcl9wYXRoJTNBJTIwMCUyQyUyMHdpZHRoJTNBJTIwNjQwJTJDJTIwaGVpZ2h0JTNBJTIwNDgwJTJDJTIwZnBzJTNBJTIwMzAlN0QlN0QlMjIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXRhc2slM0QlMjJNb3ZlJTIwZ3JlZW4lMjBzbWFsbCUyMG9iamVjdCUyMGludG8lMjB0aGUlMjBwdXJwbGUlMjBwbGF0Zm9ybSUyMiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZHVyYXRpb24lM0QxMjAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWRldmljZSUzRGN1ZGE=",highlighted:`lerobot-rollout \\
    --strategy.type=base \\
    --policy.path=<span class="hljs-variable">\${HF_USERNAME}</span>/policy_repo_id \\
    --inference.type=rtc \\
    --inference.rtc.mode=guided \\
    --inference.rtc.execution_horizon=10 \\
    --inference.rtc.max_guidance_weight=10.0 \\
    --robot.type=so100_follower \\
    --robot.port=/dev/tty.usbmodem58FA0834591 \\
    --robot.cameras=<span class="hljs-string">&quot;{ gripper: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 30}, front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}}&quot;</span> \\
    --task=<span class="hljs-string">&quot;Move green small object into the purple platform&quot;</span> \\
    --duration=120 \\
    --device=cuda`,lang:"bash",wrap:!1});var U=l(w,4);n(U,{code:"bGVyb2JvdC1yb2xsb3V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1zdHJhdGVneS50eXBlJTNEYmFzZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LnBhdGglM0QlMjQlN0JIRl9VU0VSTkFNRSU3RCUyRnBpMDVfdHJhaW5pbmdfcnRjJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1pbmZlcmVuY2UudHlwZSUzRHJ0YyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0taW5mZXJlbmNlLnJ0Yy5tb2RlJTNEdHJhaW5lZCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0taW5mZXJlbmNlLnJ0Yy5leGVjdXRpb25faG9yaXpvbiUzRDEwJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yb2JvdC50eXBlJTNEc28xMDBfZm9sbG93ZXIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJvYm90LnBvcnQlM0QlMkZkZXYlMkZ0dHkudXNibW9kZW01OEZBMDgzNDU5MSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tdGFzayUzRCUyMk1vdmUlMjBncmVlbiUyMHNtYWxsJTIwb2JqZWN0JTIwaW50byUyMHRoZSUyMHB1cnBsZSUyMHBsYXRmb3JtJTIyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1kdXJhdGlvbiUzRDEyMCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZGV2aWNlJTNEY3VkYQ==",highlighted:`lerobot-rollout \\
    --strategy.type=base \\
    --policy.path=<span class="hljs-variable">\${HF_USERNAME}</span>/pi05_training_rtc \\
    --inference.type=rtc \\
    --inference.rtc.mode=trained \\
    --inference.rtc.execution_horizon=10 \\
    --robot.type=so100_follower \\
    --robot.port=/dev/tty.usbmodem58FA0834591 \\
    --task=<span class="hljs-string">&quot;Move green small object into the purple platform&quot;</span> \\
    --duration=120 \\
    --device=cuda`,lang:"bash",wrap:!1});var b=l(U,2);e(b,{title:"与 LeRobot 中 async inference 的区别",local:"与-lerobot-中-async-inference-的区别",headingTag:"h2"});var m=l(b,8);e(m,{title:"进阶：调试跟踪",local:"进阶调试跟踪",headingTag:"h2"});var u=l(m,4);n(u,{code:"JTIzJTIwRW5hYmxlJTIwZGVidWclMjB0cmFja2luZyUwQXBvbGljeV9jZmcucnRjX2NvbmZpZy5kZWJ1ZyUyMCUzRCUyMFRydWUlMEFwb2xpY3lfY2ZnLnJ0Y19jb25maWcuZGVidWdfbWF4bGVuJTIwJTNEJTIwMTAwJTBBJTBBJTIzJTIwQWZ0ZXIlMjBpbmZlcmVuY2UlMkMlMjBhY2Nlc3MlMjBkZWJ1ZyUyMGRhdGElMEFkZWJ1Z19kYXRhJTIwJTNEJTIwcG9saWN5LnJ0Y19wcm9jZXNzb3IuZ2V0X2RlYnVnX2RhdGEoKSUwQSUwQSUyMyUyMFZpc3VhbGl6ZSUyMGRlbm9pc2luZyUyMHN0ZXBzJTJDJTIwY29ycmVjdGlvbnMlMkMlMjBldGMuJTBBZnJvbSUyMGxlcm9ib3QucG9saWNpZXMucnRjLmRlYnVnX3Zpc3VhbGl6ZXIlMjBpbXBvcnQlMjBSVENEZWJ1Z1Zpc3VhbGl6ZXIlMEF2aXN1YWxpemVyJTIwJTNEJTIwUlRDRGVidWdWaXN1YWxpemVyKCklMEElMjMlMjAuLi4lMjBjcmVhdGUlMjBwbG90cw==",highlighted:`<span class="hljs-comment"># Enable debug tracking</span>
policy_cfg.rtc_config.debug = <span class="hljs-literal">True</span>
policy_cfg.rtc_config.debug_maxlen = <span class="hljs-number">100</span>

<span class="hljs-comment"># After inference, access debug data</span>
debug_data = policy.rtc_processor.get_debug_data()

<span class="hljs-comment"># Visualize denoising steps, corrections, etc.</span>
<span class="hljs-keyword">from</span> lerobot.policies.rtc.debug_visualizer <span class="hljs-keyword">import</span> RTCDebugVisualizer
visualizer = RTCDebugVisualizer()
<span class="hljs-comment"># ... create plots</span>`,lang:"python",wrap:!1});var j=l(u,4);e(j,{title:"参考资料",local:"参考资料",headingTag:"h2"});var G=l(j,4);v(G,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/rtc.mdx"}),E(2),g(Z,a),S()}export{L as component};
