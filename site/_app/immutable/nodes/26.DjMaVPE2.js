import"../chunks/DsnmJJEf.js";import{i as q,h as P,C as $,H as e,a as n,s as ll,E as sl}from"../chunks/B0fLWDn-.js";import{p as al,o as el,s as l,f as nl,a as Q,b as tl,c as s,d as N,r as a,n as t}from"../chunks/CK-oPab5.js";import{s as ol}from"../chunks/C_Vwy0jz.js";const Ml='{"title":"LeIsaac × LeRobot EnvHub","local":"leisaac--lerobot-envhub","sections":[],"depth":1}';var cl=N('<meta name="hf:doc:metadata"/>'),pl=N(`<p></p> <!> <!> <p>LeRobot EnvHub 现已通过 LeIsaac 支持<strong>simulation 中的模仿学习</strong>。
启动日常操作任务、遥操作机器人、采集 demonstration、推送到 Hub，并在 LeRobot 中训练 policy——全部在一个闭环中完成。</p> <p><a href="https://github.com/LightwheelAI/leisaac" rel="nofollow">LeIsaac</a> 与 IsaacLab 及 SO101 主/follower arm 设置集成，提供：</p> <ul><li>🕹️ <strong>teleoperation 优先的工作流</strong>，用于数据采集</li> <li>📦 <strong>内置数据转换</strong>，可直接用于 LeRobot 训练</li> <li>🤖 <strong>日常技能</strong>，如拾取橙子、举起方块、清理桌面和折叠布料</li> <li>☁️ 来自 <a href="https://lightwheel.ai/" rel="nofollow">LightWheel</a> 的<strong>持续升级</strong>：云 simulation、EnvHub 支持、Sim2Real 工具等</li></ul> <p>下面列出了目前通过 LeRobot EnvHub 暴露的受支持 LeIsaac 任务。</p> <!> <p>下表列出了 LeIsaac x LeRobot Envhub 中所有可用的任务和环境。你也可以通过运行以下命令获取最新的环境列表：</p> <!> <table><thead><tr><th align="left">任务</th><th align="left">环境 ID</th><th align="left">任务描述</th><th align="left">相关机器人</th></tr></thead><tbody><tr><td align="left"><video src="https://github.com/user-attachments/assets/466eddff-f720-4f99-94d5-5e123e4c302c" autoplay="" loop="" playsinline="" style="max-width: 300px;"></video></td><td align="left"><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/pick_orange/pick_orange_env_cfg.py" rel="nofollow">LeIsaac-SO101-PickOrange-v0</a><br/><br/><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/pick_orange/direct/pick_orange_env.py" rel="nofollow">LeIsaac-SO101-PickOrange-Direct-v0</a></td><td align="left">拾取三个橙子放入盘子，然后将机械臂复位到静止 state。</td><td align="left">单臂 SO101 follower arm</td></tr><tr><td align="left"><video src="https://github.com/user-attachments/assets/1e4eb83a-0b38-40fb-a0b2-ddb0fe201e6d" autoplay="" loop="" playsinline="" style="max-width: 300px;"></video></td><td align="left"><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/lift_cube/lift_cube_env_cfg.py" rel="nofollow">LeIsaac-SO101-LiftCube-v0</a><br/><br/><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/lift_cube/direct/lift_cube_env.py" rel="nofollow">LeIsaac-SO101-LiftCube-Direct-v0</a></td><td align="left">将红色方块举起。</td><td align="left">单臂 SO101 follower arm</td></tr><tr><td align="left"><video src="https://github.com/user-attachments/assets/e49d8f1c-dcc9-412b-a88f-100680d8a45b" autoplay="" loop="" playsinline="" style="max-width: 300px;"></video></td><td align="left"><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/clean_toy_table/clean_toy_table_env_cfg.py" rel="nofollow">LeIsaac-SO101-CleanToyTable-v0</a><br/><br/><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/clean_toy_table/clean_toy_table_bi_arm_env_cfg.py" rel="nofollow">LeIsaac-SO101-CleanToyTable-BiArm-v0</a><br/><br/><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/clean_toy_table/direct/clean_toy_table_bi_arm_env.py" rel="nofollow">LeIsaac-SO101-CleanToyTable-BiArm-Direct-v0</a></td><td align="left">将两个字母 e 物体拾入盒子，并将机械臂复位到静止 state。</td><td align="left">单臂 SO101 follower arm <br/><br/> 双臂 SO101 follower arm</td></tr><tr><td align="left"><video src="https://github.com/user-attachments/assets/e29a0f8a-9286-4ce6-b45d-342c3d3ba754" autoplay="" loop="" playsinline="" style="max-width: 300px;"></video></td><td align="left"><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/fold_cloth/fold_cloth_bi_arm_env_cfg.py" rel="nofollow">LeIsaac-SO101-FoldCloth-BiArm-v0</a><br/><br/><a href="https://github.com/LightwheelAI/leisaac/blob/main/source/leisaac/leisaac/tasks/fold_cloth/direct/fold_cloth_bi_arm_env.py" rel="nofollow">LeIsaac-SO101-FoldCloth-BiArm-Direct-v0</a></td><td align="left">折叠布料，并将机械臂复位到静止 state。<br/><br/><em>注意：此任务中只有 DirectEnv 支持 check_success。</em></td><td align="left">双臂 SO101 follower arm</td></tr></tbody></table> <!> <blockquote><p>EnvHub：通过 HuggingFace 共享 LeIsaac 环境</p></blockquote> <p><a href="https://huggingface.co/docs/lerobot/envhub" rel="nofollow">EnvHub</a> 是我们的可复现环境中心，用一行代码启动打包好的 simulation，立即开始实验，并向社区发布你自己的任务。</p> <p>LeIsaac 提供 EnvHub 支持，你只需几条命令即可使用或分享任务。</p> <video controls="" src="https://github.com/user-attachments/assets/687666f5-ebe0-421d-84a0-eb86116ac5f8"></video> <!> <p>运行以下命令来设置你的代码环境：</p> <!> <!> <p>EnvHub 以统一的接口暴露每个 LeIsaac 支持的任务。下面的示例加载 <code>so101_pick_orange</code>，并演示随机 action rollout 和交互式 teleoperation。</p> <!> <details><summary>点击展开代码示例</summary> <!></details> <!> <p>你应该会看到 SO101 机械臂在纯随机命令下摆动。</p> <!> <p>LeRobot 的 teleoperation 栈可以驱动 simulation 机械臂。</p> <p>连接 SO101 leader arm 控制器，运行下面的 calibration 命令。</p> <!> <p>然后启动 teleoperation 脚本。</p> <details><summary>点击展开代码示例</summary> <!></details> <!> <p>运行该脚本可让你使用物理 leader arm 设备操作 simulation 机械臂。</p> <!> <p>没有本地 GPU 或合适的驱动？没问题！你可以在云端零配置运行 LeIsaac。
LeIsaac 在 <strong>NVIDIA Brev</strong> 上开箱即用，直接在浏览器中为你提供完全配置好的环境。</p> <p>👉 <strong>从这里开始：</strong><a href="https://lightwheelai.github.io/leisaac/docs/cloud_simulation/nvidia_brev" rel="nofollow">https://lightwheelai.github.io/leisaac/docs/cloud_simulation/nvidia_brev</a></p> <p>实例部署完成后，只需打开 <strong>80 端口（HTTP）</strong>的链接即可启动 <strong>Visual Studio Code Server</strong>（默认密码：<code>password</code>）。你可以从那里运行 simulation、编辑代码并可视化 IsaacLab 环境——全部在 Web 浏览器中完成。</p> <p><strong>无需 GPU、无需驱动、无需本地安装。点击即可运行。</strong></p> <!> <p>我们保持 EnvHub 覆盖范围与 LeIsaac 任务一致。目前支持：</p> <ul><li><code>so101_pick_orange</code></li> <li><code>so101_lift_cube</code></li> <li><code>so101_clean_toytable</code></li> <li><code>bi_so101_fold_cloth</code></li></ul> <p>在调用 <code>make_env</code> 时通过指定不同的脚本来切换任务，例如：</p> <!> <p>注意：使用 <code>bi_so101_fold_cloth</code> 时，获取环境后应立即调用 <code>initialize()</code>，然后再执行任何其他操作：</p> <details><summary>点击展开代码示例</summary> <!></details> <!> <p></p>`,3);function Jl(X,Y){al(Y,!1),el(()=>{new URLSearchParams(window.location.search).get("fw")}),q();var d=pl();P("zqu870",k=>{var E=cl();ol(E,"content",Ml),Q(k,E)});var J=l(nl(d),2);$(J,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var U=l(J,2);e(U,{title:"LeIsaac × LeRobot EnvHub",local:"leisaac--lerobot-envhub",headingTag:"h1"});var w=l(U,10);e(w,{title:"可用环境",local:"可用环境",headingTag:"h1"});var h=l(w,4);n(h,{code:"cHl0aG9uJTIwc2NyaXB0cyUyRmVudmlyb25tZW50cyUyRmxpc3RfZW52cy5weQ==",highlighted:"python scripts/environments/list_envs.py",lang:"bash",wrap:!1});var o=l(h,2),b=l(s(o)),M=s(b),T=s(M),F=s(T);F.muted=!0,a(T),t(3),a(M);var c=l(M),j=s(c),z=s(j);z.muted=!0,a(j),t(3),a(c);var p=l(c),m=s(p),x=s(m);x.muted=!0,a(m),t(3),a(p);var u=l(p),I=s(u),L=s(I);L.muted=!0,a(I),t(3),a(u),a(b),a(o);var v=l(o,2);e(v,{title:"在 LeRobot 中用一行代码直接加载 LeIsaac",local:"在-lerobot-中用一行代码直接加载-leisaac",headingTag:"h1"});var _=l(v,8);ll(_,{width:"100%",maxWidth:"960px",borderRadius:"8px"});var Z=l(_,2);e(Z,{title:"如何开始：环境设置",local:"如何开始环境设置",headingTag:"h2"});var G=l(Z,4);n(G,{code:"JTIzJTIwUmVmZXIlMjB0byUyMEdldHRpbmclMjBTdGFydGVkJTJGSW5zdGFsbGF0aW9uJTIwdG8lMjBpbnN0YWxsJTIwbGVpc2FhYyUyMGZpcnN0bHklMEFjb25kYSUyMGNyZWF0ZSUyMC1uJTIwbGVpc2FhY19lbnZodWIlMjBweXRob24lM0QzLjExJTBBY29uZGElMjBhY3RpdmF0ZSUyMGxlaXNhYWNfZW52aHViJTBBJTBBY29uZGElMjBpbnN0YWxsJTIwLWMlMjAlMjJudmlkaWElMkZsYWJlbCUyRmN1ZGEtMTIuOC4xJTIyJTIwY3VkYS10b29sa2l0JTBBcGlwJTIwaW5zdGFsbCUyMC1VJTIwdG9yY2glM0QlM0QyLjcuMCUyMHRvcmNodmlzaW9uJTNEJTNEMC4yMi4wJTIwLS1pbmRleC11cmwlMjBodHRwcyUzQSUyRiUyRmRvd25sb2FkLnB5dG9yY2gub3JnJTJGd2hsJTJGY3UxMjglMEFwaXAlMjBpbnN0YWxsJTIwJ2xlaXNhYWMlNUJpc2FhY2xhYiU1RCUyMCU0MCUyMGdpdCUyQmh0dHBzJTNBJTJGJTJGZ2l0aHViLmNvbSUyRkxpZ2h0d2hlZWxBSSUyRmxlaXNhYWMuZ2l0JTIzc3ViZGlyZWN0b3J5JTNEc291cmNlJTJGbGVpc2FhYyclMjAtLWV4dHJhLWluZGV4LXVybCUyMGh0dHBzJTNBJTJGJTJGcHlwaS5udmlkaWEuY29tJTBBJTBBJTIzJTIwSW5zdGFsbCUyMGxlcm9ib3QlMEFwaXAlMjBpbnN0YWxsJTIwbGVyb2JvdCUzRCUzRDAuNC4xJTBBJTBBJTIzJTIwRml4JTIwbnVtcHklMjB2ZXJzaW9uJTBBcGlwJTIwaW5zdGFsbCUyMG51bXB5JTNEJTNEMS4yNi4w",highlighted:`<span class="hljs-comment"># Refer to Getting Started/Installation to install leisaac firstly</span>
conda create -n leisaac_envhub python=3.11
conda activate leisaac_envhub

conda install -c <span class="hljs-string">&quot;nvidia/label/cuda-12.8.1&quot;</span> cuda-toolkit
pip install -U torch==2.7.0 torchvision==0.22.0 --index-url https://download.pytorch.org/whl/cu128
pip install <span class="hljs-string">&#x27;leisaac[isaaclab] @ git+https://github.com/LightwheelAI/leisaac.git#subdirectory=source/leisaac&#x27;</span> --extra-index-url https://pypi.nvidia.com

<span class="hljs-comment"># Install lerobot</span>
pip install lerobot==0.4.1

<span class="hljs-comment"># Fix numpy version</span>
pip install numpy==1.26.0`,lang:"bash",wrap:!1});var C=l(G,2);e(C,{title:"用法示例",local:"用法示例",headingTag:"h2"});var B=l(C,4);e(B,{title:"随机 action",local:"随机-action",headingTag:"h3"});var i=l(B,2),H=l(s(i),2);n(H,{code:"JTIzJTIwZW52aHViX3JhbmRvbV9hY3Rpb24ucHklMEElMEFpbXBvcnQlMjB0b3JjaCUwQWZyb20lMjBsZXJvYm90LmVudnMlMjBpbXBvcnQlMjBtYWtlX2VudiUwQSUwQSUyMyUyMExvYWQlMjBmcm9tJTIwdGhlJTIwaHViJTBBZW52c19kaWN0JTIwJTNEJTIwbWFrZV9lbnYoJTIyTGlnaHR3aGVlbEFJJTJGbGVpc2FhY19lbnYlM0FlbnZzJTJGc28xMDFfcGlja19vcmFuZ2UucHklMjIlMkMlMjBuX2VudnMlM0QxJTJDJTIwdHJ1c3RfcmVtb3RlX2NvZGUlM0RUcnVlKSUwQSUwQSUyMyUyMEFjY2VzcyUyMHRoZSUyMGVudmlyb25tZW50JTBBc3VpdGVfbmFtZSUyMCUzRCUyMG5leHQoaXRlcihlbnZzX2RpY3QpKSUwQXN5bmNfdmVjdG9yX2VudiUyMCUzRCUyMGVudnNfZGljdCU1QnN1aXRlX25hbWUlNUQlNUIwJTVEJTBBJTIzJTIwcmV0cmlldmUlMjB0aGUlMjBpc2FhYyUyMGVudmlyb25tZW50JTIwZnJvbSUyMHRoZSUyMHN5bmMlMjB2ZWN0b3IlMjBlbnYlMEFlbnYlMjAlM0QlMjBzeW5jX3ZlY3Rvcl9lbnYuZW52cyU1QjAlNUQudW53cmFwcGVkJTBBJTBBJTIzJTIwVXNlJTIwaXQlMjBsaWtlJTIwYW55JTIwZ3ltJTIwZW52aXJvbm1lbnQlMEFvYnMlMkMlMjBpbmZvJTIwJTNEJTIwZW52LnJlc2V0KCklMEElMEF3aGlsZSUyMFRydWUlM0ElMEElMjAlMjAlMjAlMjBhY3Rpb24lMjAlM0QlMjB0b3JjaC50ZW5zb3IoZW52LmFjdGlvbl9zcGFjZS5zYW1wbGUoKSklMEElMjAlMjAlMjAlMjBvYnMlMkMlMjByZXdhcmQlMkMlMjB0ZXJtaW5hdGVkJTJDJTIwdHJ1bmNhdGVkJTJDJTIwaW5mbyUyMCUzRCUyMGVudi5zdGVwKGFjdGlvbiklMEElMjAlMjAlMjAlMjBpZiUyMHRlcm1pbmF0ZWQlMjBvciUyMHRydW5jYXRlZCUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG9icyUyQyUyMGluZm8lMjAlM0QlMjBlbnYucmVzZXQoKSUwQSUwQWVudi5jbG9zZSgp",highlighted:`<span class="hljs-comment"># envhub_random_action.py</span>

<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> lerobot.envs <span class="hljs-keyword">import</span> make_env

<span class="hljs-comment"># Load from the hub</span>
envs_dict = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/so101_pick_orange.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Access the environment</span>
suite_name = <span class="hljs-built_in">next</span>(<span class="hljs-built_in">iter</span>(envs_dict))
sync_vector_env = envs_dict[suite_name][<span class="hljs-number">0</span>]
<span class="hljs-comment"># retrieve the isaac environment from the sync vector env</span>
env = sync_vector_env.envs[<span class="hljs-number">0</span>].unwrapped

<span class="hljs-comment"># Use it like any gym environment</span>
obs, info = env.reset()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    action = torch.tensor(env.action_space.sample())
    obs, reward, terminated, truncated, info = env.step(action)
    <span class="hljs-keyword">if</span> terminated <span class="hljs-keyword">or</span> truncated:
        obs, info = env.reset()

env.close()`,lang:"python",wrap:!1}),a(i);var f=l(i,2);n(f,{code:"cHl0aG9uJTIwZW52aHViX3JhbmRvbV9hY3Rpb24ucHk=",highlighted:"python envhub_random_action.py",lang:"bash",wrap:!1});var g=l(f,4);e(g,{title:"teleoperation",local:"teleoperation",headingTag:"h3"});var W=l(g,6);n(W,{code:"bGVyb2JvdC1jYWxpYnJhdGUlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXRlbGVvcC50eXBlJTNEc28xMDFfbGVhZGVyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS10ZWxlb3AucG9ydCUzRCUyRmRldiUyRnR0eUFDTTAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXRlbGVvcC5pZCUzRGxlYWRlcg==",highlighted:`lerobot-calibrate \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0 \\
    --teleop.id=leader`,lang:"bash",wrap:!1});var y=l(W,4),K=l(s(y),2);n(K,{code:"JTIzJTIwZW52aHViX3RlbGVvcF9leGFtcGxlLnB5JTBBJTBBaW1wb3J0JTIwbG9nZ2luZyUwQWltcG9ydCUyMHRpbWUlMEFpbXBvcnQlMjBneW1uYXNpdW0lMjBhcyUyMGd5bSUwQSUwQWZyb20lMjBkYXRhY2xhc3NlcyUyMGltcG9ydCUyMGFzZGljdCUyQyUyMGRhdGFjbGFzcyUwQWZyb20lMjBwcHJpbnQlMjBpbXBvcnQlMjBwZm9ybWF0JTBBJTBBZnJvbSUyMGxlcm9ib3QudGVsZW9wZXJhdG9ycyUyMGltcG9ydCUyMCglMjAlMjAlMjMlMjBub3FhJTNBJTIwRjQwMSUwQSUyMCUyMCUyMCUyMFRlbGVvcGVyYXRvciUyQyUwQSUyMCUyMCUyMCUyMFRlbGVvcGVyYXRvckNvbmZpZyUyQyUwQSUyMCUyMCUyMCUyMG1ha2VfdGVsZW9wZXJhdG9yX2Zyb21fY29uZmlnJTJDJTBBJTIwJTIwJTIwJTIwc29fbGVhZGVyJTJDJTBBJTIwJTIwJTIwJTIwYmlfc29fbGVhZGVyJTJDJTBBKSUwQWZyb20lMjBsZXJvYm90LnV0aWxzLnJvYm90X3V0aWxzJTIwaW1wb3J0JTIwcHJlY2lzZV9zbGVlcCUwQWZyb20lMjBsZXJvYm90LnV0aWxzLnV0aWxzJTIwaW1wb3J0JTIwaW5pdF9sb2dnaW5nJTBBZnJvbSUyMGxlcm9ib3QuZW52cyUyMGltcG9ydCUyMG1ha2VfZW52JTBBJTBBJTBBJTQwZGF0YWNsYXNzJTBBY2xhc3MlMjBUZWxlb3BlcmF0ZUNvbmZpZyUzQSUwQSUyMCUyMCUyMCUyMHRlbGVvcCUzQSUyMFRlbGVvcGVyYXRvckNvbmZpZyUwQSUyMCUyMCUyMCUyMGVudl9uYW1lJTNBJTIwc3RyJTIwJTNEJTIwJTIyc28xMDFfcGlja19vcmFuZ2UlMjIlMEElMjAlMjAlMjAlMjBmcHMlM0ElMjBpbnQlMjAlM0QlMjA2MCUwQSUwQSUwQSU0MGRhdGFjbGFzcyUwQWNsYXNzJTIwRW52V3JhcCUzQSUwQSUyMCUyMCUyMCUyMGVudiUzQSUyMGd5bS5FbnYlMEElMEElMEFkZWYlMjBtYWtlX2Vudl9mcm9tX2xlaXNhYWMoZW52X25hbWUlM0ElMjBzdHIlMjAlM0QlMjAlMjJzbzEwMV9waWNrX29yYW5nZSUyMiklM0ElMEElMjAlMjAlMjAlMjBlbnZzX2RpY3QlMjAlM0QlMjBtYWtlX2VudiglMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBmJ0xpZ2h0d2hlZWxBSSUyRmxlaXNhYWNfZW52JTNBZW52cyUyRiU3QmVudl9uYW1lJTdELnB5JyUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG5fZW52cyUzRDElMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjB0cnVzdF9yZW1vdGVfY29kZSUzRFRydWUlMEElMjAlMjAlMjAlMjApJTBBJTIwJTIwJTIwJTIwc3VpdGVfbmFtZSUyMCUzRCUyMG5leHQoaXRlcihlbnZzX2RpY3QpKSUwQSUyMCUyMCUyMCUyMHN5bmNfdmVjdG9yX2VudiUyMCUzRCUyMGVudnNfZGljdCU1QnN1aXRlX25hbWUlNUQlNUIwJTVEJTBBJTIwJTIwJTIwJTIwZW52JTIwJTNEJTIwc3luY192ZWN0b3JfZW52LmVudnMlNUIwJTVELnVud3JhcHBlZCUwQSUwQSUyMCUyMCUyMCUyMHJldHVybiUyMGVudiUwQSUwQSUwQWRlZiUyMHRlbGVvcF9sb29wKHRlbGVvcCUzQSUyMFRlbGVvcGVyYXRvciUyQyUyMGVudiUzQSUyMGd5bS5FbnYlMkMlMjBmcHMlM0ElMjBpbnQpJTNBJTBBJTIwJTIwJTIwJTIwZnJvbSUyMGxlaXNhYWMuZGV2aWNlcy5hY3Rpb25fcHJvY2VzcyUyMGltcG9ydCUyMHByZXByb2Nlc3NfZGV2aWNlX2FjdGlvbiUwQSUyMCUyMCUyMCUyMGZyb20lMjBsZWlzYWFjLmFzc2V0cy5yb2JvdHMubGVyb2JvdCUyMGltcG9ydCUyMFNPMTAxX0ZPTExPV0VSX01PVE9SX0xJTUlUUyUwQSUyMCUyMCUyMCUyMGZyb20lMjBsZWlzYWFjLnV0aWxzLmVudl91dGlscyUyMGltcG9ydCUyMGR5bmFtaWNfcmVzZXRfZ3JpcHBlcl9lZmZvcnRfbGltaXRfc2ltJTBBJTBBJTIwJTIwJTIwJTIwZW52X3dyYXAlMjAlM0QlMjBFbnZXcmFwKGVudiUzRGVudiklMEElMEElMjAlMjAlMjAlMjBvYnMlMkMlMjBpbmZvJTIwJTNEJTIwZW52LnJlc2V0KCklMEElMjAlMjAlMjAlMjB3aGlsZSUyMFRydWUlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBsb29wX3N0YXJ0JTIwJTNEJTIwdGltZS5wZXJmX2NvdW50ZXIoKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGlmJTIwZW52LmNmZy5keW5hbWljX3Jlc2V0X2dyaXBwZXJfZWZmb3J0X2xpbWl0JTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZHluYW1pY19yZXNldF9ncmlwcGVyX2VmZm9ydF9saW1pdF9zaW0oZW52JTJDJTIwJ3NvMTAxbGVhZGVyJyklMEElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjByYXdfYWN0aW9uJTIwJTNEJTIwdGVsZW9wLmdldF9hY3Rpb24oKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByb2Nlc3NlZF9hY3Rpb24lMjAlM0QlMjBwcmVwcm9jZXNzX2RldmljZV9hY3Rpb24oJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZGljdCglMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBzbzEwMV9sZWFkZXIlM0RUcnVlJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwam9pbnRfc3RhdGUlM0QlN0IlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBrLnJlbW92ZXN1ZmZpeCglMjIucG9zJTIyKSUzQSUyMHYlMjBmb3IlMjBrJTJDJTIwdiUyMGluJTIwcmF3X2FjdGlvbi5pdGVtcygpJTdEJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwbW90b3JfbGltaXRzJTNEU08xMDFfRk9MTE9XRVJfTU9UT1JfTElNSVRTKSUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVudl93cmFwJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG9icyUyQyUyMHJld2FyZCUyQyUyMHRlcm1pbmF0ZWQlMkMlMjB0cnVuY2F0ZWQlMkMlMjBpbmZvJTIwJTNEJTIwZW52LnN0ZXAocHJvY2Vzc2VkX2FjdGlvbiklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBpZiUyMHRlcm1pbmF0ZWQlMjBvciUyMHRydW5jYXRlZCUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMG9icyUyQyUyMGluZm8lMjAlM0QlMjBlbnYucmVzZXQoKSUwQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGR0X3MlMjAlM0QlMjB0aW1lLnBlcmZfY291bnRlcigpJTIwLSUyMGxvb3Bfc3RhcnQlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBwcmVjaXNlX3NsZWVwKG1heCgxJTIwJTJGJTIwZnBzJTIwLSUyMGR0X3MlMkMlMjAwLjApKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGxvb3BfcyUyMCUzRCUyMHRpbWUucGVyZl9jb3VudGVyKCklMjAtJTIwbG9vcF9zdGFydCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHByaW50KGYlMjIlNUNudGltZSUzQSUyMCU3Qmxvb3BfcyUyMColMjAxZTMlM0EuMmYlN0RtcyUyMCglN0IxJTIwJTJGJTIwbG9vcF9zJTNBLjBmJTdEJTIwSHopJTIyKSUwQSUwQSUwQWRlZiUyMHRlbGVvcGVyYXRlKGNmZyUzQSUyMFRlbGVvcGVyYXRlQ29uZmlnKSUzQSUwQSUyMCUyMCUyMCUyMGluaXRfbG9nZ2luZygpJTBBJTIwJTIwJTIwJTIwbG9nZ2luZy5pbmZvKHBmb3JtYXQoYXNkaWN0KGNmZykpKSUwQSUwQSUyMCUyMCUyMCUyMHRlbGVvcCUyMCUzRCUyMG1ha2VfdGVsZW9wZXJhdG9yX2Zyb21fY29uZmlnKGNmZy50ZWxlb3ApJTBBJTIwJTIwJTIwJTIwZW52JTIwJTNEJTIwbWFrZV9lbnZfZnJvbV9sZWlzYWFjKGNmZy5lbnZfbmFtZSklMEElMEElMjAlMjAlMjAlMjB0ZWxlb3AuY29ubmVjdCgpJTBBJTIwJTIwJTIwJTIwaWYlMjBoYXNhdHRyKGVudiUyQyUyMCdpbml0aWFsaXplJyklM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBlbnYuaW5pdGlhbGl6ZSgpJTBBJTIwJTIwJTIwJTIwdHJ5JTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGVsZW9wX2xvb3AodGVsZW9wJTNEdGVsZW9wJTJDJTIwZW52JTNEZW52JTJDJTIwZnBzJTNEY2ZnLmZwcyklMEElMjAlMjAlMjAlMjBleGNlcHQlMjBLZXlib2FyZEludGVycnVwdCUzQSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHBhc3MlMEElMjAlMjAlMjAlMjBmaW5hbGx5JTNBJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGVsZW9wLmRpc2Nvbm5lY3QoKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGVudi5jbG9zZSgpJTBBJTBBJTBBZGVmJTIwbWFpbigpJTNBJTBBJTIwJTIwJTIwJTIwdGVsZW9wZXJhdGUoVGVsZW9wZXJhdGVDb25maWcoJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwdGVsZW9wJTNEc29fbGVhZGVyLlNPMTAxTGVhZGVyQ29uZmlnKCUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHBvcnQlM0QlMjIlMkZkZXYlMkZ0dHlBQ00wJTIyJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwaWQlM0QnbGVhZGVyJyUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMHVzZV9kZWdyZWVzJTNERmFsc2UlMkMlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjApJTJDJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwZW52X25hbWUlM0QlMjJzbzEwMV9waWNrX29yYW5nZSUyMiUyQyUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMGZwcyUzRDYwJTJDJTBBJTIwJTIwJTIwJTIwKSklMEElMEElMEFpZiUyMF9fbmFtZV9fJTIwJTNEJTNEJTIwJTIyX19tYWluX18lMjIlM0ElMEElMjAlMjAlMjAlMjBtYWluKCklMEE=",highlighted:`<span class="hljs-comment"># envhub_teleop_example.py</span>

<span class="hljs-keyword">import</span> logging
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">import</span> gymnasium <span class="hljs-keyword">as</span> gym

<span class="hljs-keyword">from</span> dataclasses <span class="hljs-keyword">import</span> asdict, dataclass
<span class="hljs-keyword">from</span> pprint <span class="hljs-keyword">import</span> pformat

<span class="hljs-keyword">from</span> lerobot.teleoperators <span class="hljs-keyword">import</span> (  <span class="hljs-comment"># noqa: F401</span>
    Teleoperator,
    TeleoperatorConfig,
    make_teleoperator_from_config,
    so_leader,
    bi_so_leader,
)
<span class="hljs-keyword">from</span> lerobot.utils.robot_utils <span class="hljs-keyword">import</span> precise_sleep
<span class="hljs-keyword">from</span> lerobot.utils.utils <span class="hljs-keyword">import</span> init_logging
<span class="hljs-keyword">from</span> lerobot.envs <span class="hljs-keyword">import</span> make_env


<span class="hljs-meta">@dataclass</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">TeleoperateConfig</span>:
    teleop: TeleoperatorConfig
    env_name: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;so101_pick_orange&quot;</span>
    fps: <span class="hljs-built_in">int</span> = <span class="hljs-number">60</span>


<span class="hljs-meta">@dataclass</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">EnvWrap</span>:
    env: gym.Env


<span class="hljs-keyword">def</span> <span class="hljs-title function_">make_env_from_leisaac</span>(<span class="hljs-params">env_name: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;so101_pick_orange&quot;</span></span>):
    envs_dict = make_env(
        <span class="hljs-string">f&#x27;LightwheelAI/leisaac_env:envs/<span class="hljs-subst">{env_name}</span>.py&#x27;</span>,
        n_envs=<span class="hljs-number">1</span>,
        trust_remote_code=<span class="hljs-literal">True</span>
    )
    suite_name = <span class="hljs-built_in">next</span>(<span class="hljs-built_in">iter</span>(envs_dict))
    sync_vector_env = envs_dict[suite_name][<span class="hljs-number">0</span>]
    env = sync_vector_env.envs[<span class="hljs-number">0</span>].unwrapped

    <span class="hljs-keyword">return</span> env


<span class="hljs-keyword">def</span> <span class="hljs-title function_">teleop_loop</span>(<span class="hljs-params">teleop: Teleoperator, env: gym.Env, fps: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">from</span> leisaac.devices.action_process <span class="hljs-keyword">import</span> preprocess_device_action
    <span class="hljs-keyword">from</span> leisaac.assets.robots.lerobot <span class="hljs-keyword">import</span> SO101_FOLLOWER_MOTOR_LIMITS
    <span class="hljs-keyword">from</span> leisaac.utils.env_utils <span class="hljs-keyword">import</span> dynamic_reset_gripper_effort_limit_sim

    env_wrap = EnvWrap(env=env)

    obs, info = env.reset()
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        loop_start = time.perf_counter()
        <span class="hljs-keyword">if</span> env.cfg.dynamic_reset_gripper_effort_limit:
            dynamic_reset_gripper_effort_limit_sim(env, <span class="hljs-string">&#x27;so101leader&#x27;</span>)

        raw_action = teleop.get_action()
        processed_action = preprocess_device_action(
            <span class="hljs-built_in">dict</span>(
                so101_leader=<span class="hljs-literal">True</span>,
                joint_state={
                    k.removesuffix(<span class="hljs-string">&quot;.pos&quot;</span>): v <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> raw_action.items()},
                motor_limits=SO101_FOLLOWER_MOTOR_LIMITS),
            env_wrap
        )
        obs, reward, terminated, truncated, info = env.step(processed_action)
        <span class="hljs-keyword">if</span> terminated <span class="hljs-keyword">or</span> truncated:
            obs, info = env.reset()

        dt_s = time.perf_counter() - loop_start
        precise_sleep(<span class="hljs-built_in">max</span>(<span class="hljs-number">1</span> / fps - dt_s, <span class="hljs-number">0.0</span>))
        loop_s = time.perf_counter() - loop_start
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\\ntime: <span class="hljs-subst">{loop_s * <span class="hljs-number">1e3</span>:<span class="hljs-number">.2</span>f}</span>ms (<span class="hljs-subst">{<span class="hljs-number">1</span> / loop_s:<span class="hljs-number">.0</span>f}</span> Hz)&quot;</span>)


<span class="hljs-keyword">def</span> <span class="hljs-title function_">teleoperate</span>(<span class="hljs-params">cfg: TeleoperateConfig</span>):
    init_logging()
    logging.info(pformat(asdict(cfg)))

    teleop = make_teleoperator_from_config(cfg.teleop)
    env = make_env_from_leisaac(cfg.env_name)

    teleop.connect()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(env, <span class="hljs-string">&#x27;initialize&#x27;</span>):
        env.initialize()
    <span class="hljs-keyword">try</span>:
        teleop_loop(teleop=teleop, env=env, fps=cfg.fps)
    <span class="hljs-keyword">except</span> KeyboardInterrupt:
        <span class="hljs-keyword">pass</span>
    <span class="hljs-keyword">finally</span>:
        teleop.disconnect()
        env.close()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    teleoperate(TeleoperateConfig(
        teleop=so_leader.SO101LeaderConfig(
            port=<span class="hljs-string">&quot;/dev/ttyACM0&quot;</span>,
            <span class="hljs-built_in">id</span>=<span class="hljs-string">&#x27;leader&#x27;</span>,
            use_degrees=<span class="hljs-literal">False</span>,
        ),
        env_name=<span class="hljs-string">&quot;so101_pick_orange&quot;</span>,
        fps=<span class="hljs-number">60</span>,
    ))


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    main()
`,lang:"python",wrap:!1}),a(y);var V=l(y,2);n(V,{code:"cHl0aG9uJTIwZW52aHViX3RlbGVvcF9leGFtcGxlLnB5",highlighted:"python envhub_teleop_example.py",lang:"bash",wrap:!1});var A=l(V,4);e(A,{title:"☁️ 云 simulation（无需 GPU）",local:"-云-simulation无需-gpu",headingTag:"h2"});var R=l(A,10);e(R,{title:"附加说明",local:"附加说明",headingTag:"h2"});var S=l(R,8);n(S,{code:"ZW52c19kaWN0X3BpY2tfb3JhbmdlJTIwJTNEJTIwbWFrZV9lbnYoJTIyTGlnaHR3aGVlbEFJJTJGbGVpc2FhY19lbnYlM0FlbnZzJTJGc28xMDFfcGlja19vcmFuZ2UucHklMjIlMkMlMjBuX2VudnMlM0QxJTJDJTIwdHJ1c3RfcmVtb3RlX2NvZGUlM0RUcnVlKSUwQWVudnNfZGljdF9saWZ0X2N1YmUlMjAlM0QlMjBtYWtlX2VudiglMjJMaWdodHdoZWVsQUklMkZsZWlzYWFjX2VudiUzQWVudnMlMkZzbzEwMV9saWZ0X2N1YmUucHklMjIlMkMlMjBuX2VudnMlM0QxJTJDJTIwdHJ1c3RfcmVtb3RlX2NvZGUlM0RUcnVlKSUwQWVudnNfZGljdF9jbGVhbl90b3l0YWJsZSUyMCUzRCUyMG1ha2VfZW52KCUyMkxpZ2h0d2hlZWxBSSUyRmxlaXNhYWNfZW52JTNBZW52cyUyRnNvMTAxX2NsZWFuX3RveXRhYmxlLnB5JTIyJTJDJTIwbl9lbnZzJTNEMSUyQyUyMHRydXN0X3JlbW90ZV9jb2RlJTNEVHJ1ZSklMEFlbnZzX2RpY3RfZm9sZF9jbG90aCUyMCUzRCUyMG1ha2VfZW52KCUyMkxpZ2h0d2hlZWxBSSUyRmxlaXNhYWNfZW52JTNBZW52cyUyRmJpX3NvMTAxX2ZvbGRfY2xvdGgucHklMjIlMkMlMjBuX2VudnMlM0QxJTJDJTIwdHJ1c3RfcmVtb3RlX2NvZGUlM0RUcnVlKQ==",highlighted:`envs_dict_pick_orange = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/so101_pick_orange.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)
envs_dict_lift_cube = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/so101_lift_cube.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)
envs_dict_clean_toytable = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/so101_clean_toytable.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)
envs_dict_fold_cloth = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/bi_so101_fold_cloth.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)`,lang:"python",wrap:!1});var r=l(S,4),D=l(s(r),2);n(D,{code:"aW1wb3J0JTIwdG9yY2glMEFmcm9tJTIwbGVyb2JvdC5lbnZzJTIwaW1wb3J0JTIwbWFrZV9lbnYlMEElMEElMjMlMjBMb2FkJTIwZnJvbSUyMHRoZSUyMGh1YiUwQWVudnNfZGljdCUyMCUzRCUyMG1ha2VfZW52KCUyMkxpZ2h0d2hlZWxBSSUyRmxlaXNhYWNfZW52JTNBZW52cyUyRmJpX3NvMTAxX2ZvbGRfY2xvdGgucHklMjIlMkMlMjBuX2VudnMlM0QxJTJDJTIwdHJ1c3RfcmVtb3RlX2NvZGUlM0RUcnVlKSUwQSUwQSUyMyUyMEFjY2VzcyUyMHRoZSUyMGVudmlyb25tZW50JTBBc3VpdGVfbmFtZSUyMCUzRCUyMG5leHQoaXRlcihlbnZzX2RpY3QpKSUwQXN5bmNfdmVjdG9yX2VudiUyMCUzRCUyMGVudnNfZGljdCU1QnN1aXRlX25hbWUlNUQlNUIwJTVEJTBBJTIzJTIwcmV0cmlldmUlMjB0aGUlMjBpc2FhYyUyMGVudmlyb25tZW50JTIwZnJvbSUyMHRoZSUyMHN5bmMlMjB2ZWN0b3IlMjBlbnYlMEFlbnYlMjAlM0QlMjBzeW5jX3ZlY3Rvcl9lbnYuZW52cyU1QjAlNUQudW53cmFwcGVkJTBBJTBBJTIzJTIwTk9URSUzQSUyMGluaXRpYWxpemUoKSUyMGZpcnN0JTBBZW52LmluaXRpYWxpemUoKSUwQSUwQSUyMyUyMG90aGVyJTIwb3BlcmF0aW9uJTIwd2l0aCUyMGVudi4uLg==",highlighted:`<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> lerobot.envs <span class="hljs-keyword">import</span> make_env

<span class="hljs-comment"># Load from the hub</span>
envs_dict = make_env(<span class="hljs-string">&quot;LightwheelAI/leisaac_env:envs/bi_so101_fold_cloth.py&quot;</span>, n_envs=<span class="hljs-number">1</span>, trust_remote_code=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Access the environment</span>
suite_name = <span class="hljs-built_in">next</span>(<span class="hljs-built_in">iter</span>(envs_dict))
sync_vector_env = envs_dict[suite_name][<span class="hljs-number">0</span>]
<span class="hljs-comment"># retrieve the isaac environment from the sync vector env</span>
env = sync_vector_env.envs[<span class="hljs-number">0</span>].unwrapped

<span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> initialize() first</span>
env.initialize()

<span class="hljs-comment"># other operation with env...</span>`,lang:"python",wrap:!1}),a(r);var O=l(r,2);sl(O,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/envhub_leisaac.mdx"}),t(2),Q(X,d),tl()}export{Jl as component};
