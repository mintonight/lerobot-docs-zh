import"../chunks/DsnmJJEf.js";import{i as V,h as A,C as _,H as a,a as t,E as Q}from"../chunks/B0fLWDn-.js";import{p as v,o as Z,s as l,f as X,a as N,b as S,d as g,n as f}from"../chunks/CK-oPab5.js";import{s as L}from"../chunks/C_Vwy0jz.js";const W='{"title":"GR00T policy","local":"gr00t-policy","sections":[{"title":"模型概览","local":"模型概览","sections":[],"depth":2},{"title":"安装要求","local":"安装要求","sections":[],"depth":2},{"title":"用法","local":"用法","sections":[],"depth":2},{"title":"训练","local":"训练","sections":[{"title":"训练命令示例","local":"训练命令示例","sections":[],"depth":3}],"depth":2},{"title":"性能结果","local":"性能结果","sections":[{"title":"LIBERO benchmark 结果","local":"libero-benchmark-结果","sections":[],"depth":3},{"title":"在 LIBERO 上训练","local":"在-libero-上训练","sections":[],"depth":3},{"title":"GR00T N1.7 的 LIBERO 结果","local":"gr00t-n17-的-libero-结果","sections":[],"depth":3},{"title":"在你的硬件环境中评估","local":"在你的硬件环境中评估","sections":[],"depth":3}],"depth":2},{"title":"许可证","local":"许可证","sections":[],"depth":2}],"depth":1}';var F=g('<meta name="hf:doc:metadata"/>'),Y=g(`<p></p> <!> <!> <p>GR00T 是 NVIDIA 面向通用人形机器人 inference 与技能的基础模型系列。它是一种跨具身 policy，接受多模态输入（包括语言、图像和本体感觉），以在多样化的环境中执行操作任务。</p> <p>LeRobot 通过 <code>groot</code> policy 类型集成 GR00T N1.7。</p> <blockquote class="warning"><p><strong>破坏性变更：</strong> LeRobot 已移除对 GR00T N1.5 的支持，当前版本仅支持 GR00T N1.7。N1.5 的 checkpoint 和配置会被拒绝，并附有迁移说明。要继续使用 N1.5 checkpoint，请固定到最后一个支持它的版本：<code>pip install 'lerobot==0.5.1'</code>。要使用当前版本，请迁移到 GR00T N1.7（基础模型 <a href="https://huggingface.co/nvidia/GR00T-N1.7-3B" rel="nofollow"><code>nvidia/GR00T-N1.7-3B</code></a>）。</p></blockquote> <!> <p>GR00T N1.7 使用 Cosmos-Reason2/Qwen3-VL 主干网络，并为 SimplerEnv、DROID 和 LIBERO 提供 checkpoint。</p> <p>开发者和研究人员可以使用自己的真实或合成数据对 GR00T 进行后训练，以适应特定的人形机器人或任务。</p> <p>GR00T 使用预训练的视觉和语言编码器，配合流匹配 action Transformer，对以视觉、语言和本体感觉为条件的一串 action 进行建模。</p> <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/lerobot-groot-paper1%20(1).png" alt="An overview of GR00T" width="80%"/> <p>它之所以性能强劲，是因为在广泛而多样的人形 dataset 上训练，其中包括：</p> <ul><li>从机器人采集的真实数据。</li> <li>使用 NVIDIA Isaac GR00T Blueprint 生成的合成数据。</li> <li>互联网规模的视频数据。</li></ul> <p>这种方法使模型能够通过后训练对特定的具身形式、任务和环境具有很高的适应性。</p> <!> <p>GR00T 面向 NVIDIA GPU 加速系统。安装带 GR00T 可选依赖的 LeRobot：</p> <!> <p>对于源码检出（source checkout）：</p> <!> <!> <p>要使用 GR00T N1.7：</p> <!> <!> <!> <p>以下是在你自己的 dataset 上 fine-tune GR00T 基础模型的完整训练命令：</p> <p>此命令使用了 <code>new_embodiment</code> 标志，该标志用于 SO-101 机器人，<a href="https://github.com/NVIDIA/Isaac-GR00T/blob/main/getting_started/policy.md#--embodiment-tag" rel="nofollow">了解更多关于 GR00T 如何处理不同具身形式的信息。</a>。</p> <!> <!> <!> <blockquote class="note"><p>在运行 <code>lerobot-eval</code> 之前，请先遵循 <a href="./libero">LIBERO</a> 的安装说明。</p></blockquote> <p>GR00T N1.7 在 LIBERO benchmark 套件上展现了强劲的性能。要复现 LeRobot 的结果，请遵循 <a href="./libero">LIBERO</a> 一节中的说明。</p> <!> <p>针对某个 LIBERO 套件的示例训练命令（此处为 <code>libero_spatial</code>）：</p> <!> <p>这将遵循<a href="https://github.com/NVIDIA/Isaac-GR00T/blob/main/examples/LIBERO/README.md" rel="nofollow">此处</a>找到的方案。</p> <!> <p>LeRobot 集成的初步结果（GR00T-LeRobot，每个套件 <code>eval.n_episodes &gt;= 50</code>）：</p> <table><thead><tr><th>套件</th><th align="right">成功率</th><th>checkpoint</th></tr></thead><tbody><tr><td>LIBERO Spatial</td><td align="right">95%</td><td><a href="https://huggingface.co/nvidia/gr00t17-lerobot-libero_spatial-640" rel="nofollow">nvidia/gr00t17-lerobot-libero_spatial-640</a></td></tr><tr><td>LIBERO Object</td><td align="right">100%</td><td><a href="https://huggingface.co/nvidia/gr00t17-lerobot-libero_object-640" rel="nofollow">nvidia/gr00t17-lerobot-libero_object-640</a></td></tr><tr><td>LIBERO Goal</td><td align="right">98%</td><td><a href="https://huggingface.co/nvidia/gr00t17-lerobot-libero_goal-640" rel="nofollow">nvidia/gr00t17-lerobot-libero_goal-640</a></td></tr><tr><td>LIBERO 10 (Long)</td><td align="right">93%</td><td><a href="https://huggingface.co/nvidia/gr00t17-lerobot-libero_10-640" rel="nofollow">nvidia/gr00t17-lerobot-libero_10-640</a></td></tr><tr><td><strong>平均值</strong></td><td align="right"><strong>96.5%</strong></td><td></td></tr></tbody></table> <!> <p>报告成功率时，每个套件使用 <code>eval.n_episodes &gt;= 50</code>。</p> <!> <p>使用你的参数训练好模型后，你就可以在下游任务中运行 inference。请遵循<a href="./inference">policy deployment（lerobot-rollout）</a>中的说明。例如：</p> <!> <blockquote class="note"><p>为确保 inference 稳定，<code>inference.queue_threshold</code> 的值不应超过 5。</p></blockquote> <!> <p>GR00T N1.7 根据 <a href="https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/" rel="nofollow">NVIDIA 开放模型许可协议</a>发布。</p> <!> <p></p>`,1);function x(C,G){v(G,!1),Z(()=>{new URLSearchParams(window.location.search).get("fw")}),V();var e=Y();A("nyssdy",m=>{var E=F();L(E,"content",W),N(m,E)});var s=l(X(e),2);_(s,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var o=l(s,2);a(o,{title:"GR00T policy",local:"gr00t-policy",headingTag:"h1"});var M=l(o,8);a(M,{title:"模型概览",local:"模型概览",headingTag:"h2"});var n=l(M,16);a(n,{title:"安装要求",local:"安装要求",headingTag:"h2"});var i=l(n,4);t(i,{code:"cGlwJTIwaW5zdGFsbCUyMCUyMmxlcm9ib3QlNUJncm9vdCU1RCUyMg==",highlighted:'pip install <span class="hljs-string">&quot;lerobot[groot]&quot;</span>',lang:"bash",wrap:!1});var U=l(i,4);t(U,{code:"cGlwJTIwaW5zdGFsbCUyMC1lJTIwJTIyLiU1Qmdyb290JTVEJTIy",highlighted:'pip install -e <span class="hljs-string">&quot;.[groot]&quot;</span>',lang:"bash",wrap:!1});var c=l(U,2);a(c,{title:"用法",local:"用法",headingTag:"h2"});var J=l(c,4);t(J,{code:"LS1wb2xpY3kudHlwZSUzRGdyb290",highlighted:"--policy.type=groot",lang:"bash",wrap:!1});var T=l(J,2);a(T,{title:"训练",local:"训练",headingTag:"h2"});var p=l(T,2);a(p,{title:"训练命令示例",local:"训练命令示例",headingTag:"h3"});var d=l(p,6);t(d,{code:"JTIzJTIwaW5zdGFsbCUyMGV4dHJhJTIwZGVwcyUyMGZvciUyMHRyYWluaW5nJTBBcGlwJTIwaW5zdGFsbCUyMCUyMmxlcm9ib3QlNUJ0cmFpbmluZyU1RCUyMiUwQSUwQWhmJTIwYXV0aCUyMGxvZ2luJTBBd2FuZGIlMjBsb2dpbiUwQSUwQWV4cG9ydCUyMERBVEFTRVRfTkFNRSUzRHlvdXJfZGF0YV9zZXQlMEFleHBvcnQlMjBIRl9VU0VSJTNEeW91cl9oZl91c2VybmFtZSUwQWV4cG9ydCUyMERBVEFTRVQlM0QlMjRIRl9VU0VSJTJGJTI0REFUQVNFVF9OQU1FJTBBZXhwb3J0JTIwUkVQT19JRCUzRCUyMiUyNCU3QkRBVEFTRVQlN0RfR1IwMFQxNyUyMiUyMCUyM3RoaXMlMjBpcyUyMHRoZSUyMG1vZGVsJTIwdGhhdCUyMHdpbGwlMjBiZSUyMHVwbG9hZGVkJTIwdG8lMjBodWdnaW5nZmFjZSUwQWV4cG9ydCUyME9VVFBVVF9ESVIlM0RvdXRwdXRzJTJGdHJhaW4lMkYlMjRSRVBPX0lEJTBBJTBBbGVyb2JvdC10cmFpbiUyMCU1QyUwQSUyMCUyMC0tZGF0YXNldC5yZXBvX2lkJTNEJTI0REFUQVNFVCUyMCU1QyUwQSUyMCUyMC0tZGF0YXNldC5pbWFnZV90cmFuc2Zvcm1zLmVuYWJsZSUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS50eXBlJTNEZ3Jvb3QlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuYmFzZV9tb2RlbF9wYXRoJTNEbnZpZGlhJTJGR1IwMFQtTjEuNy0zQiUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmVtYm9kaW1lbnRfdGFnJTNEbmV3X2VtYm9kaW1lbnQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5jaHVua19zaXplJTNEMTYlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5uX2FjdGlvbl9zdGVwcyUzRDE2JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudXNlX3JlbGF0aXZlX2FjdGlvbnMlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kucmVsYXRpdmVfZXhjbHVkZV9qb2ludHMlM0QnJTVCJTIyZ3JpcHBlciUyMiU1RCclMjAlNUMlMEElMjAlMjAtLXBvbGljeS51c2VfYmYxNiUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5wdXNoX3RvX2h1YiUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5yZXBvX2lkJTNEJTI0UkVQT19JRCUyMCU1QyUwQSUyMCUyMC0tc2VlZCUzRDQyJTIwJTVDJTBBJTIwJTIwLS1iYXRjaF9zaXplJTNENjQlMjAlNUMlMEElMjAlMjAtLXN0ZXBzJTNEMjAwMDAlMjAlNUMlMEElMjAlMjAtLXNhdmVfY2hlY2twb2ludCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXNhdmVfZnJlcSUzRDUwMDAlMjAlNUMlMEElMjAlMjAtLXVzZV9wb2xpY3lfdHJhaW5pbmdfcHJlc2V0JTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tZW52X2V2YWxfZnJlcSUzRDAlMjAlNUMlMEElMjAlMjAtLWV2YWxfc3RlcHMlM0QwJTIwJTVDJTBBJTIwJTIwLS1sb2dfZnJlcSUzRDEwJTIwJTVDJTBBJTIwJTIwLS1vdXRwdXRfZGlyJTNEJTI0T1VUUFVUX0RJUiUyMCU1QyUwQSUyMCUyMC0tam9iX25hbWUlM0QlMjREQVRBU0VUJTIwJTVDJTBBJTIwJTIwLS13YW5kYi5lbmFibGUlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS13YW5kYi5kaXNhYmxlX2FydGlmYWN0JTNEdHJ1ZSUwQQ==",highlighted:`<span class="hljs-comment"># install extra deps for training</span>
pip install <span class="hljs-string">&quot;lerobot[training]&quot;</span>

hf auth login
wandb login

<span class="hljs-built_in">export</span> DATASET_NAME=your_data_set
<span class="hljs-built_in">export</span> HF_USER=your_hf_username
<span class="hljs-built_in">export</span> DATASET=<span class="hljs-variable">$HF_USER</span>/<span class="hljs-variable">$DATASET_NAME</span>
<span class="hljs-built_in">export</span> REPO_ID=<span class="hljs-string">&quot;<span class="hljs-variable">\${DATASET}</span>_GR00T17&quot;</span> <span class="hljs-comment">#this is the model that will be uploaded to huggingface</span>
<span class="hljs-built_in">export</span> OUTPUT_DIR=outputs/train/<span class="hljs-variable">$REPO_ID</span>

lerobot-train \\
  --dataset.repo_id=<span class="hljs-variable">$DATASET</span> \\
  --dataset.image_transforms.enable=<span class="hljs-literal">true</span> \\
  --policy.type=groot \\
  --policy.device=cuda \\
  --policy.base_model_path=nvidia/GR00T-N1.7-3B \\
  --policy.embodiment_tag=new_embodiment \\
  --policy.chunk_size=16 \\
  --policy.n_action_steps=16 \\
  --policy.use_relative_actions=<span class="hljs-literal">true</span> \\
  --policy.relative_exclude_joints=<span class="hljs-string">&#x27;[&quot;gripper&quot;]&#x27;</span> \\
  --policy.use_bf16=<span class="hljs-literal">true</span> \\
  --policy.push_to_hub=<span class="hljs-literal">true</span> \\
  --policy.repo_id=<span class="hljs-variable">$REPO_ID</span> \\
  --seed=42 \\
  --batch_size=64 \\
  --steps=20000 \\
  --save_checkpoint=<span class="hljs-literal">true</span> \\
  --save_freq=5000 \\
  --use_policy_training_preset=<span class="hljs-literal">true</span> \\
  --env_eval_freq=0 \\
  --eval_steps=0 \\
  --log_freq=10 \\
  --output_dir=<span class="hljs-variable">$OUTPUT_DIR</span> \\
  --job_name=<span class="hljs-variable">$DATASET</span> \\
  --wandb.enable=<span class="hljs-literal">true</span> \\
  --wandb.disable_artifact=<span class="hljs-literal">true</span>
`,lang:"bash",wrap:!1});var y=l(d,2);a(y,{title:"性能结果",local:"性能结果",headingTag:"h2"});var r=l(y,2);a(r,{title:"LIBERO benchmark 结果",local:"libero-benchmark-结果",headingTag:"h3"});var h=l(r,6);a(h,{title:"在 LIBERO 上训练",local:"在-libero-上训练",headingTag:"h3"});var b=l(h,4);t(b,{code:"SU1BR0VfVFJBTlNGT1JNUyUzRCclN0IlMEElMjAlMjAlMjJicmlnaHRuZXNzJTIyJTNBJTIwJTdCJTIyd2VpZ2h0JTIyJTNBJTIwMS4wJTJDJTIwJTIydHlwZSUyMiUzQSUyMCUyMkNvbG9ySml0dGVyJTIyJTJDJTIwJTIya3dhcmdzJTIyJTNBJTIwJTdCJTIyYnJpZ2h0bmVzcyUyMiUzQSUyMCU1QjAuNyUyQyUyMDEuMyU1RCU3RCU3RCUyQyUwQSUyMCUyMCUyMmNvbnRyYXN0JTIyJTNBJTIwJTIwJTIwJTdCJTIyd2VpZ2h0JTIyJTNBJTIwMS4wJTJDJTIwJTIydHlwZSUyMiUzQSUyMCUyMkNvbG9ySml0dGVyJTIyJTJDJTIwJTIya3dhcmdzJTIyJTNBJTIwJTdCJTIyY29udHJhc3QlMjIlM0ElMjAlMjAlMjAlNUIwLjYlMkMlMjAxLjQlNUQlN0QlN0QlMkMlMEElMjAlMjAlMjJzYXR1cmF0aW9uJTIyJTNBJTIwJTdCJTIyd2VpZ2h0JTIyJTNBJTIwMS4wJTJDJTIwJTIydHlwZSUyMiUzQSUyMCUyMkNvbG9ySml0dGVyJTIyJTJDJTIwJTIya3dhcmdzJTIyJTNBJTIwJTdCJTIyc2F0dXJhdGlvbiUyMiUzQSUyMCU1QjAuNSUyQyUyMDEuNSU1RCU3RCU3RCUyQyUwQSUyMCUyMCUyMmh1ZSUyMiUzQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU3QiUyMndlaWdodCUyMiUzQSUyMDEuMCUyQyUyMCUyMnR5cGUlMjIlM0ElMjAlMjJDb2xvckppdHRlciUyMiUyQyUyMCUyMmt3YXJncyUyMiUzQSUyMCU3QiUyMmh1ZSUyMiUzQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCU1Qi0wLjA4JTJDJTIwMC4wOCU1RCU3RCU3RCUwQSU3RCclMEElMEFsZXJvYm90LXRyYWluJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnJlcG9faWQlM0RJUEVDLUNPTU1VTklUWSUyRmxpYmVyb19zcGF0aWFsX25vX25vb3BzXzEuMC4wX2xlcm9ib3QlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucm9vdCUzRCUyRmRhdGFzZXRzJTJGbGliZXJvX3NwYXRpYWwlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucmV2aXNpb24lM0RtYWluJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnZpZGVvX2JhY2tlbmQlM0RweWF2JTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LmltYWdlX3RyYW5zZm9ybXMuZW5hYmxlJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tZGF0YXNldC5pbWFnZV90cmFuc2Zvcm1zLm1heF9udW1fdHJhbnNmb3JtcyUzRDQlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQuaW1hZ2VfdHJhbnNmb3Jtcy50ZnMlM0QlMjIlMjRJTUFHRV9UUkFOU0ZPUk1TJTIyJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudHlwZSUzRGdyb290JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuYmFzZV9tb2RlbF9wYXRoJTNEbnZpZGlhJTJGR1IwMFQtTjEuNy0zQiUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmVtYm9kaW1lbnRfdGFnJTNEbGliZXJvX3NpbSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnB1c2hfdG9faHViJTNEZmFsc2UlMjAlNUMlMEElMjAlMjAtLXBvbGljeS51c2VfcmVsYXRpdmVfYWN0aW9ucyUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kubWF4X3N0ZXBzJTNEMjAwMDAlMjAlNUMlMEElMjAlMjAtLWJhdGNoX3NpemUlM0QzMjAlMjAlNUMlMEElMjAlMjAtLXN0ZXBzJTNEMjAwMDAlMjAlNUMlMEElMjAlMjAtLXNhdmVfZnJlcSUzRDIwMDAlMjAlNUMlMEElMjAlMjAtLWVudl9ldmFsX2ZyZXElM0QwJTIwJTVDJTBBJTIwJTIwLS1ldmFsX3N0ZXBzJTNEMCUyMCU1QyUwQSUyMCUyMC0tbG9nX2ZyZXElM0QxMCUyMCU1QyUwQSUyMCUyMC0td2FuZGIuZW5hYmxlJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0td2FuZGIucHJvamVjdCUzRGxlcm9ib3QlMjAlNUMlMEElMjAlMjAtLXdhbmRiLm1vZGUlM0RvbmxpbmUlMjAlNUMlMEElMjAlMjAtLXdhbmRiLmRpc2FibGVfYXJ0aWZhY3QlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1udW1fd29ya2VycyUzRDQlMjAlNUMlMEElMjAlMjAtLXByZWZldGNoX2ZhY3RvciUzRDIlMjAlNUMlMEElMjAlMjAtLXBlcnNpc3RlbnRfd29ya2VycyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLW91dHB1dF9kaXIlM0QlMjRPVVRQVVRfRElSJTIwJTVDJTBBJTIwJTIwLS1qb2JfbmFtZSUzRCUyNEpPQl9OQU1F",highlighted:`IMAGE_TRANSFORMS=<span class="hljs-string">&#x27;{
  &quot;brightness&quot;: {&quot;weight&quot;: 1.0, &quot;type&quot;: &quot;ColorJitter&quot;, &quot;kwargs&quot;: {&quot;brightness&quot;: [0.7, 1.3]}},
  &quot;contrast&quot;:   {&quot;weight&quot;: 1.0, &quot;type&quot;: &quot;ColorJitter&quot;, &quot;kwargs&quot;: {&quot;contrast&quot;:   [0.6, 1.4]}},
  &quot;saturation&quot;: {&quot;weight&quot;: 1.0, &quot;type&quot;: &quot;ColorJitter&quot;, &quot;kwargs&quot;: {&quot;saturation&quot;: [0.5, 1.5]}},
  &quot;hue&quot;:        {&quot;weight&quot;: 1.0, &quot;type&quot;: &quot;ColorJitter&quot;, &quot;kwargs&quot;: {&quot;hue&quot;:        [-0.08, 0.08]}}
}&#x27;</span>

lerobot-train \\
  --dataset.repo_id=IPEC-COMMUNITY/libero_spatial_no_noops_1.0.0_lerobot \\
  --dataset.root=/datasets/libero_spatial \\
  --dataset.revision=main \\
  --dataset.video_backend=pyav \\
  --dataset.image_transforms.enable=<span class="hljs-literal">true</span> \\
  --dataset.image_transforms.max_num_transforms=4 \\
  --dataset.image_transforms.tfs=<span class="hljs-string">&quot;<span class="hljs-variable">$IMAGE_TRANSFORMS</span>&quot;</span> \\
  --policy.type=groot \\
  --policy.base_model_path=nvidia/GR00T-N1.7-3B \\
  --policy.embodiment_tag=libero_sim \\
  --policy.push_to_hub=<span class="hljs-literal">false</span> \\
  --policy.use_relative_actions=<span class="hljs-literal">false</span> \\
  --policy.max_steps=20000 \\
  --batch_size=320 \\
  --steps=20000 \\
  --save_freq=2000 \\
  --env_eval_freq=0 \\
  --eval_steps=0 \\
  --log_freq=10 \\
  --wandb.enable=<span class="hljs-literal">true</span> \\
  --wandb.project=lerobot \\
  --wandb.mode=online \\
  --wandb.disable_artifact=<span class="hljs-literal">true</span> \\
  --num_workers=4 \\
  --prefetch_factor=2 \\
  --persistent_workers=<span class="hljs-literal">true</span> \\
  --output_dir=<span class="hljs-variable">$OUTPUT_DIR</span> \\
  --job_name=<span class="hljs-variable">$JOB_NAME</span>`,lang:"bash",wrap:!1});var w=l(b,4);a(w,{title:"GR00T N1.7 的 LIBERO 结果",local:"gr00t-n17-的-libero-结果",headingTag:"h3"});var j=l(w,6);t(j,{code:"ZXhwb3J0JTIwTU9ERUxfSUQlM0R5b3VyX3RyYWluZWRfbW9kZWxfb25faHVnZ2luZ2ZhY2UlMEElMEFsZXJvYm90LWV2YWwlMjAlNUMlMEElMjAlMjAtLXBvbGljeS50eXBlJTNEZ3Jvb3QlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5iYXNlX21vZGVsX3BhdGglM0QlMjRNT0RFTF9JRCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmVtYm9kaW1lbnRfdGFnJTNEbGliZXJvX3NpbSUyMCU1QyUwQSUyMCUyMC0tZW52LnR5cGUlM0RsaWJlcm8lMjAlNUMlMEElMjAlMjAtLWVudi50YXNrJTNEbGliZXJvX3NwYXRpYWwlMjAlNUMlMEElMjAlMjAtLWV2YWwubl9lcGlzb2RlcyUzRDUw",highlighted:`<span class="hljs-built_in">export</span> MODEL_ID=your_trained_model_on_huggingface

lerobot-eval \\
  --policy.type=groot \\
  --policy.base_model_path=<span class="hljs-variable">$MODEL_ID</span> \\
  --policy.embodiment_tag=libero_sim \\
  --env.type=libero \\
  --env.task=libero_spatial \\
  --eval.n_episodes=50`,lang:"bash",wrap:!1});var R=l(j,4);a(R,{title:"在你的硬件环境中评估",local:"在你的硬件环境中评估",headingTag:"h3"});var u=l(R,4);t(u,{code:"JTIzJTIwaW5zdGFsbCUyMGV4dHJhJTIwZGVwcyUyMGZvciUyMHJvdWxsb3V0JTIwYW5kJTIwcmVhbCUyMGhhcmR3YXJlJTBBcGlwJTIwaW5zdGFsbCUyMCUyMmxlcm9ib3QlNUJmZWV0ZWNoJTJDdml6JTVEJTIyJTBBJTBBZXhwb3J0JTIwTU9ERUxfSUQlM0R5b3VyX3RyYWluZWRfbW9kZWxfb25faHVnZ2luZ2ZhY2UlMEElMEElMjMlMjBtYWtlJTIwc3VyZSUyMHRoYXQlMjBjYW1lcmElMjBpbmRleCUyMG1hdGNoZXMlMjB5b3VyJTIwc2V0dXAhJTBBJTIzJTIwZmluZCUyMGluZGV4JTIwdXNpbmclMjAlNjB1diUyMHJ1biUyMGxlcm9ib3QtZmluZC1jYW1lcmFzJTIwb3BlbmN2JTYwJTBBV1JJU1RfQ0FNJTNEJ3dyaXN0JTNBJTIwJTdCdHlwZSUzQSUyMG9wZW5jdiUyQyUyMGluZGV4X29yX3BhdGglM0ElMjAyJTJDJTIwd2lkdGglM0ElMjA2NDAlMkMlMjBoZWlnaHQlM0ElMjA0ODAlMkMlMjBmcHMlM0ElMjAzMCUyQyUyMGZvdXJjYyUzQSUyMCUyMk1KUEclMjIlN0QnJTBBRlJPTlRfQ0FNJTNEJ2Zyb250JTNBJTIwJTdCdHlwZSUzQSUyMG9wZW5jdiUyQyUyMGluZGV4X29yX3BhdGglM0ElMjAwJTJDJTIwd2lkdGglM0ElMjA2NDAlMkMlMjBoZWlnaHQlM0ElMjA0ODAlMkMlMjBmcHMlM0ElMjAzMCUyQyUyMGZvdXJjYyUzQSUyMCUyMk1KUEclMjIlN0QnJTBBZXhwb3J0JTIwUk9CT1RfQ0FNRVJBUyUzRCUyMiU3QiUyMCUyNFdSSVNUX0NBTSUyQyUyMCUyNEZST05UX0NBTSUyMCU3RCUyMiUwQWV4cG9ydCUyMFJPQk9UX0lEJTNEZm9sbG93ZXJfcm9ib3QlMEFleHBvcnQlMjBST0JPVF9QT1JUJTNEJTJGZGV2JTJGdHR5QUNNMCUwQSUwQXV2JTIwcnVuJTIwbGVyb2JvdC1yb2xsb3V0JTIwJTVDJTBBJTIwJTIwLS1zdHJhdGVneS50eXBlJTNEYmFzZSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnBhdGglM0QlMjRNT0RFTF9JRCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmJhc2VfbW9kZWxfcGF0aCUzRG52aWRpYSUyRkdSMDBULU4xLjctM0IlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5uX2FjdGlvbl9zdGVwcyUzRDglMjAlNUMlMEElMjAlMjAtLXJvYm90LnR5cGUlM0RzbzEwMV9mb2xsb3dlciUyMCU1QyUwQSUyMCUyMC0tcm9ib3QucG9ydCUzRCUyNFJPQk9UX1BPUlQlMjAlNUMlMEElMjAlMjAtLXJvYm90LmlkJTNEJTI0Uk9CT1RfSUQlMjAlNUMlMEElMjAlMjAtLXJvYm90LmNhbWVyYXMlM0QlMjIlMjRST0JPVF9DQU1FUkFTJTIyJTIwJTVDJTBBJTIwJTIwLS10YXNrJTNEJTIycGxhY2UlMjB0aGUlMjB2aWFsJTIwaW4lMjB0aGUlMjByYWNrJTIyJTIwJTVDJTBBJTIwJTIwLS1kdXJhdGlvbiUzRDYwJTIwJTVDJTBBJTIwJTIwLS1kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1kaXNwbGF5X2RhdGElM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1pbmZlcmVuY2UudHlwZSUzRHJ0YyUyMCU1QyUwQSUyMCUyMC0taW5mZXJlbmNlLnJ0Yy5lbmFibGVkJTNEVHJ1ZSUyMCU1QyUyMCUyMyUyMHNldCUyMHRvJTIwRmFsc2UlMjBpZiUyMGl0JTIwY2F1c2VzJTIwaW5mZXJlbmNlJTIwaW5zdGFiaWxpdHklMEElMjAlMjAtLWluZmVyZW5jZS5ydGMuZXhlY3V0aW9uX2hvcml6b24lM0Q4JTIwJTVDJTBBJTIwJTIwLS1pbmZlcmVuY2UucXVldWVfdGhyZXNob2xkJTNEMA==",highlighted:`<span class="hljs-comment"># install extra deps for roullout and real hardware</span>
pip install <span class="hljs-string">&quot;lerobot[feetech,viz]&quot;</span>

<span class="hljs-built_in">export</span> MODEL_ID=your_trained_model_on_huggingface

<span class="hljs-comment"># make sure that camera index matches your setup!</span>
<span class="hljs-comment"># find index using \`uv run lerobot-find-cameras opencv\`</span>
WRIST_CAM=<span class="hljs-string">&#x27;wrist: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: &quot;MJPG&quot;}&#x27;</span>
FRONT_CAM=<span class="hljs-string">&#x27;front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: &quot;MJPG&quot;}&#x27;</span>
<span class="hljs-built_in">export</span> ROBOT_CAMERAS=<span class="hljs-string">&quot;{ <span class="hljs-variable">$WRIST_CAM</span>, <span class="hljs-variable">$FRONT_CAM</span> }&quot;</span>
<span class="hljs-built_in">export</span> ROBOT_ID=follower_robot
<span class="hljs-built_in">export</span> ROBOT_PORT=/dev/ttyACM0

uv run lerobot-rollout \\
  --strategy.type=base \\
  --policy.path=<span class="hljs-variable">$MODEL_ID</span> \\
  --policy.base_model_path=nvidia/GR00T-N1.7-3B \\
  --policy.n_action_steps=8 \\
  --robot.type=so101_follower \\
  --robot.port=<span class="hljs-variable">$ROBOT_PORT</span> \\
  --robot.id=<span class="hljs-variable">$ROBOT_ID</span> \\
  --robot.cameras=<span class="hljs-string">&quot;<span class="hljs-variable">$ROBOT_CAMERAS</span>&quot;</span> \\
  --task=<span class="hljs-string">&quot;place the vial in the rack&quot;</span> \\
  --duration=60 \\
  --device=cuda \\
  --display_data=<span class="hljs-literal">true</span> \\
  --inference.type=rtc \\
  --inference.rtc.enabled=True \\ <span class="hljs-comment"># set to False if it causes inference instability</span>
  --inference.rtc.execution_horizon=8 \\
  --inference.queue_threshold=0`,lang:"bash",wrap:!1});var I=l(u,4);a(I,{title:"许可证",local:"许可证",headingTag:"h2"});var B=l(I,4);Q(B,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/groot.mdx"}),f(2),N(C,e),S()}export{x as component};
