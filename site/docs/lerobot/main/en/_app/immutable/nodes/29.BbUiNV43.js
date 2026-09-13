import"../chunks/DsnmJJEf.js";import{i as O,h as q,C as P,H as t,a as e,E as $}from"../chunks/B0fLWDn-.js";import{p as K,o as ll,s as l,f as tl,a as Y,b as el,c as S,d as z,r as Q,n as k}from"../chunks/CK-oPab5.js";import{s as al}from"../chunks/C_Vwy0jz.js";const cl='{"title":"EVO1","local":"evo1","sections":[{"title":"模型概览","local":"模型概览","sections":[{"title":"LeRobot 集成涵盖的内容","local":"lerobot-集成涵盖的内容","sections":[],"depth":3}],"depth":2},{"title":"安装要求","local":"安装要求","sections":[],"depth":2},{"title":"数据要求","local":"数据要求","sections":[],"depth":2},{"title":"用法","local":"用法","sections":[],"depth":2},{"title":"训练","local":"训练","sections":[{"title":"阶段 1","local":"阶段-1","sections":[],"depth":3},{"title":"阶段 2","local":"阶段-2","sections":[],"depth":3},{"title":"关键训练参数","local":"关键训练参数","sections":[],"depth":3}],"depth":2},{"title":"inference","local":"inference","sections":[],"depth":2},{"title":"结果","local":"结果","sections":[{"title":"LIBERO 评估","local":"libero-评估","sections":[{"title":"参考结果","local":"参考结果","sections":[],"depth":4},{"title":"参考训练配方","local":"参考训练配方","sections":[],"depth":4},{"title":"作者格式评估配置","local":"作者格式评估配置","sections":[],"depth":4},{"title":"原生 lerobot/libero v3 配置","local":"原生-lerobotlibero-v3-配置","sections":[],"depth":4}],"depth":3}],"depth":2},{"title":"参考","local":"参考","sections":[],"depth":2},{"title":"许可证","local":"许可证","sections":[],"depth":2}],"depth":1}';var ol=z('<meta name="hf:doc:metadata"/>'),il=z(`<p></p> <!> <!> <p>EVO1 是一种用于机器人控制的视觉-语言-action policy，围绕 InternVL3 骨干和连续流匹配 action 头构建。此 LeRobot 集成将 EVO1 作为标准 policy 类型公开，因此可以用常见的 LeRobot dataset、checkpoint 和处理器 API 对其进行训练和评估。</p> <!> <p>该 policy 使用 InternVL3 嵌入一个或多个相机图像以及语言任务提示，将机器人 state/action 向量填充到固定的最大维度，并使用流匹配 action 头预测未来的 action chunk。inference 时，policy 采样一个 action chunk，并在再次采样之前从该 action chunk 返回 <code>n_action_steps</code> 个 action。</p> <!> <ul><li>通过 LeRobot 的标准 <code>policy.type=evo1</code> 配置</li> <li>InternVL3 图像/文本嵌入，并带有可选的 FlashAttention 回退</li> <li>面向仅 action 头 fine-tune 和 VLM fine-tune 运行的基于阶段的 fine-tune 控制</li> <li>连续流匹配 action prediction</li> <li>通过 LeRobot policy API 保存/加载 checkpoint</li> <li>使用 <code>lerobot-train</code> 进行训练，并使用标准 policy inference API 进行评估</li></ul> <p>更广泛的 EVO1 项目可能包含额外的训练脚本和 dataset 工具。本页重点介绍 LeRobot 机器人控制 policy 路径。</p> <!> <ol><li><p>按照<a href="./installation">安装指南</a>安装 LeRobot。</p></li> <li><p>安装 EVO1 依赖项：</p> <!> <p>对于 LIBERO 训练和评估，还需安装 LIBERO extra：</p> <!></li> <li><p>仅当 <code>flash-attn</code> wheel 与你的 Python、PyTorch、CUDA 和 GPU 技术栈兼容时才安装它。当 <code>flash_attn</code> 不可用时，EVO1 会回退到标准注意力。</p></li></ol> <p>EVO1 使用原生 Hugging Face <code>transformers</code> InternVL 实现，因此 <code>policy.vlm_model_name</code> 必须指向原生转换的 checkpoint，例如 <code>OpenGVLab/InternVL3-1B-hf</code>（注意 <code>-hf</code> 后缀）。首次运行会下载配置的 VLM checkpoint，后续运行会从 Hugging Face 缓存中复用它。</p> <!> <p>EVO1 期望 LeRobot dataset 具有：</p> <ul><li>一到 <code>policy.max_views</code> 个视觉 observation，例如 <code>observation.images.image</code></li> <li><code>observation.state</code></li> <li><code>action</code></li> <li>dataset <code>task</code> 字段中的语言任务指令，或使用 <code>policy.task_field</code> 配置的另一个字段</li></ul> <p>state 和 action 向量会填充到 <code>policy.max_state_dim</code> 和 <code>policy.max_action_dim</code>。预测结果在返回之前会被裁剪回 dataset 的 action 维度。</p> <!> <p>要在 LeRobot 配置中使用 EVO1，请指定：</p> <!> <p>默认情况下，新的 EVO1 policy 从以下位置初始化其 VLM：</p> <!> <p>一旦获得 LeRobot 格式的 EVO1 checkpoint，请使用以下方式加载：</p> <!> <!> <!> <p>阶段 1 冻结 VLM 并训练 action 头：</p> <!> <!> <p>阶段 2 加载阶段 1 的 policy，但启动全新的优化器和调度器：</p> <!> <p>默认情况下，<code>policy.training_stage</code> 会重新应用该阶段的 fine-tune 默认值。当从阶段 1 checkpoint 启动阶段 2 时，这一点很重要，因为阶段 1 checkpoint 配置将 VLM fine-tune
标志存储为禁用 state。这些阶段默认值优先于已保存或手动提供的 <code>policy.finetune_*</code> 标志，除非 <code>policy.apply_training_stage_defaults=false</code>，因此仅当你手动控制
每个 fine-tune 标志时才设置该标志。</p> <!> <table><thead><tr><th>参数</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td><code>policy.vlm_model_name</code></td><td><code>OpenGVLab/InternVL3-1B-hf</code></td><td>原生转换的 InternVL3 checkpoint 或本地模型目录</td></tr><tr><td><code>policy.training_stage</code></td><td><code>stage1</code></td><td><code>stage1</code> 训练 action 头；<code>stage2</code> fine-tune VLM 分支</td></tr><tr><td><code>policy.apply_training_stage_defaults</code></td><td><code>true</code></td><td>加载 checkpoint 后重新应用阶段 fine-tune 默认值</td></tr><tr><td><code>policy.vlm_num_layers</code></td><td><code>14</code></td><td>为 policy 保留的 InternVL3 语言层数</td></tr><tr><td><code>policy.vlm_dtype</code></td><td><code>bfloat16</code></td><td>请求的 VLM 数据类型</td></tr><tr><td><code>policy.use_flash_attn</code></td><td><code>true</code></td><td>安装时请求 FlashAttention；否则回退</td></tr><tr><td><code>policy.enable_gradient_checkpointing</code></td><td><code>true</code></td><td>在支持的 InternVL3 模块上启用 checkpoint</td></tr><tr><td><code>policy.gradient_checkpointing_use_reentrant</code></td><td><code>false</code></td><td>在支持时传递给梯度 checkpoint 的 reentrant 设置</td></tr><tr><td><code>policy.chunk_size</code></td><td><code>50</code></td><td>每个 action chunk 预测的未来 action 数</td></tr><tr><td><code>policy.n_action_steps</code></td><td><code>50</code></td><td>从采样的 action chunk 中消耗的 action 数</td></tr><tr><td><code>policy.max_state_dim</code></td><td><code>24</code></td><td>state 填充维度</td></tr><tr><td><code>policy.max_action_dim</code></td><td><code>24</code></td><td>action 填充维度</td></tr><tr><td><code>policy.postprocess_action_dim</code></td><td><code>null</code></td><td>EVO1 后处理之后返回的可选 action 维度</td></tr><tr><td><code>policy.binarize_gripper</code></td><td><code>false</code></td><td>为 LIBERO 风格评估对后处理的 gripper 通道进行二值化</td></tr><tr><td><code>policy.task_field</code></td><td><code>task</code></td><td>用作语言提示的批次字段</td></tr></tbody></table> <!> <p>使用训练好的 EVO1 checkpoint 试用：</p> <!> <!> <!> <!> <blockquote class="note"><p>发布的 Stage-2 checkpoint 通过了干净下载和 rollout 验证： <a href="https://huggingface.co/zuoxingdong/evo1_libero" rel="nofollow"><code>zuoxingdong/evo1_libero</code></a>，revision <a href="https://huggingface.co/zuoxingdong/evo1_libero/commit/515921f4a2c1d3f3ad523721eafa26fdf2af315b" rel="nofollow"><code>515921f4a2c1d3f3ad523721eafa26fdf2af315b</code></a>。
干净下载评估使用了 LeRobot revision <a href="https://github.com/huggingface/lerobot/commit/e40b58a8dfa9e7b86918c374791599d070518d11" rel="nofollow"><code>e40b58a8dfa9e7b86918c374791599d070518d11</code></a>。</p></blockquote> <p>第 70,000 步的单次运行 Stage-2 checkpoint 产生了：</p> <table><thead><tr><th>套件</th><th align="right">成功 episode</th><th align="right">episode</th><th align="right">成功率</th></tr></thead><tbody><tr><td>LIBERO Spatial</td><td align="right">485</td><td align="right">500</td><td align="right">97.0%</td></tr><tr><td>LIBERO Object</td><td align="right">496</td><td align="right">500</td><td align="right">99.2%</td></tr><tr><td>LIBERO Goal</td><td align="right">483</td><td align="right">500</td><td align="right">96.6%</td></tr><tr><td>LIBERO-10</td><td align="right">469</td><td align="right">500</td><td align="right">93.8%</td></tr><tr><td><strong>总体</strong></td><td align="right"><strong>1,933</strong></td><td align="right"><strong>2,000</strong></td><td align="right"><strong>96.65%</strong></td></tr></tbody></table> <p>这些结果使用一个训练好的 checkpoint 和评估种子 <code>1000</code>；它们不是多种子平均值或置信度估计。</p> <!> <p>发布的 checkpoint 在 <a href="https://huggingface.co/zuoxingdong/evo1_libero/blob/515921f4a2c1d3f3ad523721eafa26fdf2af315b/train_config.json" rel="nofollow"><code>train_config.json</code></a> 中记录了完整解析后的 Stage-2 配置。
实测运行使用两块 H100 GPU 和两个 DDP 进程，每个进程批次为 64，因此全局批次为 128。两个阶段使用相同的拓扑。基础 VLM 来自 <code>OpenGVLab/InternVL3-1B-hf</code> 的 revision <code>014c0583a0d4bedf29fbe2dbff4f865eb998e171</code>。
发布的产物没有记录确切的 LeRobot 训练提交或其原始依赖锁定，
因此下面的命令从当前检出重现记录的配置和拓扑，
而不是逐位重建软件环境。</p> <p>在 LeRobot 源码检出中，安装锁定的依赖并下载该确切的 VLM revision：</p> <!> <p>阶段 1 冻结 VLM 并训练 action 头 5,000 步：</p> <!> <p>阶段 2 加载 Stage-1 policy，但启动全新的优化器和调度器。它训练 80,000 步；
报告的 checkpoint 是第 70,000 步保存的版本：</p> <!> <!> <p>作者格式的 EVO1 LIBERO 配置使用原始 LIBERO 相机特征名
（<code>observation.images.agentview_image</code> 和 <code>observation.images.robot0_eye_in_hand_image</code>），每
14 个 action 重新规划，并在推进 simulation 器之前对 gripper 命令进行二值化。EVO1 policy 后处理器
可以将填充的 24 维 action 裁剪回 7 维 LIBERO action space，并应用该 gripper 二值化。要在
相同的每任务一个 episode 设置下评估作者格式 checkpoint，请保留原始相机名，
而不是默认的 <code>image</code>/<code>image2</code> 映射，并设置 LIBERO action 后处理标志：</p> <!> <!> <p>Revision <code>a1aaacb7f6cd6ee5fb43120f673cebb0cfea7dd4</code> 将相机特征存储为 <code>image</code> 和 <code>image2</code>。此示例评估全部十个 LIBERO Object 任务，每个任务在全新进程中启动：</p> <!> <p>使用以下视界运行每个套件的全部十个任务 ID：</p> <table><thead><tr><th><code>env.task</code></th><th align="right"><code>env.episode_length</code></th></tr></thead><tbody><tr><td><code>libero_spatial</code></td><td align="right"><code>280</code></td></tr><tr><td><code>libero_object</code></td><td align="right"><code>280</code></td></tr><tr><td><code>libero_goal</code></td><td align="right"><code>300</code></td></tr><tr><td><code>libero_10</code></td><td align="right"><code>520</code></td></tr></tbody></table> <p>为每一行设置 <code>suite</code> 和 <code>horizon</code>。这样每个套件有 500 个 episode，总共 2,000 个 episode，而
循环中每个任务使用全新进程与实测的 RNG 重置拓扑相匹配。</p> <!> <ul><li><a href="https://github.com/MINT-SJTU/Evo-1" rel="nofollow">EVO1 仓库</a></li> <li><a href="https://huggingface.co/OpenGVLab/InternVL3-1B-hf" rel="nofollow">InternVL3-1B-hf</a></li></ul> <!> <p>此 LeRobot 集成遵循 LeRobot 使用的 Apache 2.0 License。请查看上游 EVO1 和 InternVL3 模型页面，了解已发布 checkpoint 和数据的许可证。</p> <!> <p></p>`,1);function pl(x,F){K(F,!1),ll(()=>{new URLSearchParams(window.location.search).get("fw")}),O();var c=il();q("s2nssk",E=>{var A=ol();al(A,"content",cl),Y(E,A)});var o=l(tl(c),2);P(o,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var i=l(o,2);t(i,{title:"EVO1",local:"evo1",headingTag:"h1"});var d=l(i,4);t(d,{title:"模型概览",local:"模型概览",headingTag:"h2"});var s=l(d,4);t(s,{title:"LeRobot 集成涵盖的内容",local:"lerobot-集成涵盖的内容",headingTag:"h3"});var n=l(s,6);t(n,{title:"安装要求",local:"安装要求",headingTag:"h2"});var a=l(n,2),M=l(S(a),2),p=l(S(M),2);e(p,{code:"cGlwJTIwaW5zdGFsbCUyMC1lJTIwJTIyLiU1QnRyYWluaW5nJTJDZXZvMSU1RCUyMg==",highlighted:'pip install -e <span class="hljs-string">&quot;.[training,evo1]&quot;</span>',lang:"bash",wrap:!1});var D=l(p,4);e(D,{code:"cGlwJTIwaW5zdGFsbCUyMC1lJTIwJTIyLiU1QnRyYWluaW5nJTJDZXZvMSUyQ2xpYmVybyU1RCUyMg==",highlighted:'pip install -e <span class="hljs-string">&quot;.[training,evo1,libero]&quot;</span>',lang:"bash",wrap:!1}),Q(M),k(2),Q(a);var J=l(a,4);t(J,{title:"数据要求",local:"数据要求",headingTag:"h2"});var r=l(J,8);t(r,{title:"用法",local:"用法",headingTag:"h2"});var T=l(r,4);e(T,{code:"cG9saWN5LnR5cGUlM0Rldm8x",highlighted:'policy.<span class="hljs-built_in">type</span>=evo1',lang:"python",wrap:!1});var y=l(T,4);e(y,{code:"cG9saWN5LnZsbV9tb2RlbF9uYW1lJTNET3BlbkdWTGFiJTJGSW50ZXJuVkwzLTFCLWhm",highlighted:"policy.vlm_model_name=OpenGVLab/InternVL3-1B-hf",lang:"python",wrap:!1});var h=l(y,4);e(h,{code:"cG9saWN5LnBhdGglM0R5b3VyLW9yZyUyRnlvdXItZXZvMS1jaGVja3BvaW50",highlighted:"policy.path=your-org/your-evo1-checkpoint",lang:"python",wrap:!1});var b=l(h,2);t(b,{title:"训练",local:"训练",headingTag:"h2"});var U=l(b,2);t(U,{title:"阶段 1",local:"阶段-1",headingTag:"h3"});var w=l(U,4);e(w,{code:"bGVyb2JvdC10cmFpbiUyMCU1QyUwQSUyMCUyMC0tZGF0YXNldC5yZXBvX2lkJTNEeW91cl9vcmclMkZ5b3VyX2RhdGFzZXQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS50eXBlJTNEZXZvMSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnRyYWluaW5nX3N0YWdlJTNEc3RhZ2UxJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudmxtX21vZGVsX25hbWUlM0RPcGVuR1ZMYWIlMkZJbnRlcm5WTDMtMUItaGYlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuY2h1bmtfc2l6ZSUzRDUwJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kubl9hY3Rpb25fc3RlcHMlM0Q1MCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9zdGF0ZV9kaW0lM0QyNCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9hY3Rpb25fZGltJTNEMjQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5vcHRpbWl6ZXJfbHIlM0QxZS01JTIwJTVDJTBBJTIwJTIwLS1iYXRjaF9zaXplJTNENCUyMCU1QyUwQSUyMCUyMC0tc3RlcHMlM0Q1MDAwJTIwJTVDJTBBJTIwJTIwLS1vdXRwdXRfZGlyJTNELiUyRm91dHB1dHMlMkZldm8xX3N0YWdlMQ==",highlighted:`lerobot-train \\
  --dataset.repo_id=your_org/your_dataset \\
  --policy.type=evo1 \\
  --policy.training_stage=stage1 \\
  --policy.vlm_model_name=OpenGVLab/InternVL3-1B-hf \\
  --policy.device=cuda \\
  --policy.chunk_size=50 \\
  --policy.n_action_steps=50 \\
  --policy.max_state_dim=24 \\
  --policy.max_action_dim=24 \\
  --policy.optimizer_lr=1e-5 \\
  --batch_size=4 \\
  --steps=5000 \\
  --output_dir=./outputs/evo1_stage1`,lang:"bash",wrap:!1});var j=l(w,2);t(j,{title:"阶段 2",local:"阶段-2",headingTag:"h3"});var m=l(j,4);e(m,{code:"bGVyb2JvdC10cmFpbiUyMCU1QyUwQSUyMCUyMC0tZGF0YXNldC5yZXBvX2lkJTNEeW91cl9vcmclMkZ5b3VyX2RhdGFzZXQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5wYXRoJTNELiUyRm91dHB1dHMlMkZldm8xX3N0YWdlMSUyRmNoZWNrcG9pbnRzJTJGMDA1MDAwJTJGcHJldHJhaW5lZF9tb2RlbCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnRyYWluaW5nX3N0YWdlJTNEc3RhZ2UyJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudmxtX21vZGVsX25hbWUlM0RPcGVuR1ZMYWIlMkZJbnRlcm5WTDMtMUItaGYlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuY2h1bmtfc2l6ZSUzRDUwJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kubl9hY3Rpb25fc3RlcHMlM0Q1MCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9zdGF0ZV9kaW0lM0QyNCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9hY3Rpb25fZGltJTNEMjQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5vcHRpbWl6ZXJfbHIlM0QxZS01JTIwJTVDJTBBJTIwJTIwLS1iYXRjaF9zaXplJTNENCUyMCU1QyUwQSUyMCUyMC0tc3RlcHMlM0Q4MDAwMCUyMCU1QyUwQSUyMCUyMC0tb3V0cHV0X2RpciUzRC4lMkZvdXRwdXRzJTJGZXZvMV9zdGFnZTI=",highlighted:`lerobot-train \\
  --dataset.repo_id=your_org/your_dataset \\
  --policy.path=./outputs/evo1_stage1/checkpoints/005000/pretrained_model \\
  --policy.training_stage=stage2 \\
  --policy.vlm_model_name=OpenGVLab/InternVL3-1B-hf \\
  --policy.device=cuda \\
  --policy.chunk_size=50 \\
  --policy.n_action_steps=50 \\
  --policy.max_state_dim=24 \\
  --policy.max_action_dim=24 \\
  --policy.optimizer_lr=1e-5 \\
  --batch_size=4 \\
  --steps=80000 \\
  --output_dir=./outputs/evo1_stage2`,lang:"bash",wrap:!1});var _=l(m,4);t(_,{title:"关键训练参数",local:"关键训练参数",headingTag:"h3"});var I=l(_,4);t(I,{title:"inference",local:"inference",headingTag:"h2"});var u=l(I,4);e(u,{code:"bGVyb2JvdC1yb2xsb3V0JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kucGF0aCUzRHlvdXItb3JnJTJGeW91ci1ldm8xLWNoZWNrcG9pbnQlMjAlNUMlMEElMjAlMjAtLWluZmVyZW5jZS50eXBlJTNEcnRjJTIwJTVDJTIwJTIzJTIwb3B0aW9uYWwlMEElMjAlMjAuLi4=",highlighted:`lerobot-rollout \\
  --policy.path=your-org/your-evo1-checkpoint \\
  --inference.type=rtc \\ <span class="hljs-comment"># optional</span>
  ...`,lang:"bash",wrap:!1});var g=l(u,2);t(g,{title:"结果",local:"结果",headingTag:"h2"});var V=l(g,2);t(V,{title:"LIBERO 评估",local:"libero-评估",headingTag:"h3"});var Z=l(V,2);t(Z,{title:"参考结果",local:"参考结果",headingTag:"h4"});var W=l(Z,10);t(W,{title:"参考训练配方",local:"参考训练配方",headingTag:"h4"});var R=l(W,6);e(R,{code:"dXYlMjBzeW5jJTIwLS1sb2NrZWQlMjAtLWV4dHJhJTIwdHJhaW5pbmclMjAtLWV4dHJhJTIwZXZvMSUyMC0tZXh0cmElMjBsaWJlcm8lMEFWTE1fRElSJTNEJTI0KHV2JTIwcnVuJTIwaGYlMjBkb3dubG9hZCUyME9wZW5HVkxhYiUyRkludGVyblZMMy0xQi1oZiUyMCU1QyUwQSUyMCUyMC0tcmV2aXNpb24lM0QwMTRjMDU4M2EwZDRiZWRmMjlmYmUyZGJmZjRmODY1ZWI5OThlMTcxKQ==",highlighted:`uv <span class="hljs-built_in">sync</span> --locked --extra training --extra evo1 --extra libero
VLM_DIR=$(uv run hf download OpenGVLab/InternVL3-1B-hf \\
  --revision=014c0583a0d4bedf29fbe2dbff4f865eb998e171)`,lang:"bash",wrap:!1});var v=l(R,4);e(v,{code:"dXYlMjBydW4lMjBhY2NlbGVyYXRlJTIwbGF1bmNoJTIwLS1udW1fcHJvY2Vzc2VzJTNEMiUyMC1tJTIwbGVyb2JvdC5zY3JpcHRzLmxlcm9ib3RfdHJhaW4lMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucmVwb19pZCUzRGxlcm9ib3QlMkZsaWJlcm8lMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucmV2aXNpb24lM0RhMWFhYWNiN2Y2Y2Q2ZWU1ZmI0MzEyMGY2NzNjZWJiMGNmZWE3ZGQ0JTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnZpZGVvX2JhY2tlbmQlM0R0b3JjaGNvZGVjJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnJldHVybl91aW50OCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQuaW1hZ2VfdHJhbnNmb3Jtcy5lbmFibGUlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnVzZV9pbWFnZW5ldF9zdGF0cyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQuZXZhbF9zcGxpdCUzRDAuMCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnR5cGUlM0Rldm8xJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudHJhaW5pbmdfc3RhZ2UlM0RzdGFnZTElMjAlNUMlMEElMjAlMjAtLXBvbGljeS5hcHBseV90cmFpbmluZ19zdGFnZV9kZWZhdWx0cyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS52bG1fbW9kZWxfbmFtZSUzRCUyMiUyNCU3QlZMTV9ESVIlN0QlMjIlMjAlNUMlMEElMjAlMjAtLXBvbGljeS52bG1fbnVtX2xheWVycyUzRDE0JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudmxtX2R0eXBlJTNEYmZsb2F0MTYlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudXNlX2FtcCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS51c2VfZmxhc2hfYXR0biUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5lbmFibGVfZ3JhZGllbnRfY2hlY2twb2ludGluZyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5ncmFkaWVudF9jaGVja3BvaW50aW5nX3VzZV9yZWVudHJhbnQlM0RmYWxzZSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmltYWdlX3Jlc29sdXRpb24lM0QnJTVCNDQ4JTJDNDQ4JTVEJyUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmNodW5rX3NpemUlM0Q1MCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm5fYWN0aW9uX3N0ZXBzJTNENTAlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5tYXhfc3RhdGVfZGltJTNEMjQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5tYXhfYWN0aW9uX2RpbSUzRDI0JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuZHJvcG91dCUzRDAuMiUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm9wdGltaXplcl9sciUzRDFlLTUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5vcHRpbWl6ZXJfd2VpZ2h0X2RlY2F5JTNEMWUtMyUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm9wdGltaXplcl9ncmFkX2NsaXBfbm9ybSUzRDEuMCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnNjaGVkdWxlcl93YXJtdXBfc3RlcHMlM0QxMDAwJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kucHVzaF90b19odWIlM0RmYWxzZSUyMCU1QyUwQSUyMCUyMC0tdXNlX3BvbGljeV90cmFpbmluZ19wcmVzZXQlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1iYXRjaF9zaXplJTNENjQlMjAlNUMlMEElMjAlMjAtLXN0ZXBzJTNENTAwMCUyMCU1QyUwQSUyMCUyMC0tc2F2ZV9jaGVja3BvaW50JTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tc2F2ZV9jaGVja3BvaW50X3RvX2h1YiUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwLS1zYXZlX2ZyZXElM0QyNTAwJTIwJTVDJTBBJTIwJTIwLS1sb2dfZnJlcSUzRDEwJTIwJTVDJTBBJTIwJTIwLS1lbnZfZXZhbF9mcmVxJTNEMCUyMCU1QyUwQSUyMCUyMC0tbnVtX3dvcmtlcnMlM0Q0JTIwJTVDJTBBJTIwJTIwLS1wcmVmZXRjaF9mYWN0b3IlM0QyJTIwJTVDJTBBJTIwJTIwLS1wZXJzaXN0ZW50X3dvcmtlcnMlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1zZWVkJTNEMTAwMCUyMCU1QyUwQSUyMCUyMC0td2FuZGIuZW5hYmxlJTNEZmFsc2UlMjAlNUMlMEElMjAlMjAtLW91dHB1dF9kaXIlM0QuJTJGb3V0cHV0cyUyRmV2bzEtbGliZXJvLXN0YWdlMS1nMTI4LTVr",highlighted:`uv run accelerate launch --num_processes=2 -m lerobot.scripts.lerobot_train \\
  --dataset.repo_id=lerobot/libero \\
  --dataset.revision=a1aaacb7f6cd6ee5fb43120f673cebb0cfea7dd4 \\
  --dataset.video_backend=torchcodec \\
  --dataset.return_uint8=<span class="hljs-literal">true</span> \\
  --dataset.image_transforms.enable=<span class="hljs-literal">true</span> \\
  --dataset.use_imagenet_stats=<span class="hljs-literal">true</span> \\
  --dataset.eval_split=0.0 \\
  --policy.type=evo1 \\
  --policy.training_stage=stage1 \\
  --policy.apply_training_stage_defaults=<span class="hljs-literal">true</span> \\
  --policy.vlm_model_name=<span class="hljs-string">&quot;<span class="hljs-variable">\${VLM_DIR}</span>&quot;</span> \\
  --policy.vlm_num_layers=14 \\
  --policy.vlm_dtype=bfloat16 \\
  --policy.device=cuda \\
  --policy.use_amp=<span class="hljs-literal">true</span> \\
  --policy.use_flash_attn=<span class="hljs-literal">true</span> \\
  --policy.enable_gradient_checkpointing=<span class="hljs-literal">true</span> \\
  --policy.gradient_checkpointing_use_reentrant=<span class="hljs-literal">false</span> \\
  --policy.image_resolution=<span class="hljs-string">&#x27;[448,448]&#x27;</span> \\
  --policy.chunk_size=50 \\
  --policy.n_action_steps=50 \\
  --policy.max_state_dim=24 \\
  --policy.max_action_dim=24 \\
  --policy.dropout=0.2 \\
  --policy.optimizer_lr=1e-5 \\
  --policy.optimizer_weight_decay=1e-3 \\
  --policy.optimizer_grad_clip_norm=1.0 \\
  --policy.scheduler_warmup_steps=1000 \\
  --policy.push_to_hub=<span class="hljs-literal">false</span> \\
  --use_policy_training_preset=<span class="hljs-literal">true</span> \\
  --batch_size=64 \\
  --steps=5000 \\
  --save_checkpoint=<span class="hljs-literal">true</span> \\
  --save_checkpoint_to_hub=<span class="hljs-literal">false</span> \\
  --save_freq=2500 \\
  --log_freq=10 \\
  --env_eval_freq=0 \\
  --num_workers=4 \\
  --prefetch_factor=2 \\
  --persistent_workers=<span class="hljs-literal">true</span> \\
  --seed=1000 \\
  --wandb.enable=<span class="hljs-literal">false</span> \\
  --output_dir=./outputs/evo1-libero-stage1-g128-5k`,lang:"bash",wrap:!1});var N=l(v,4);e(N,{code:"dXYlMjBydW4lMjBhY2NlbGVyYXRlJTIwbGF1bmNoJTIwLS1udW1fcHJvY2Vzc2VzJTNEMiUyMC1tJTIwbGVyb2JvdC5zY3JpcHRzLmxlcm9ib3RfdHJhaW4lMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucmVwb19pZCUzRGxlcm9ib3QlMkZsaWJlcm8lMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQucmV2aXNpb24lM0RhMWFhYWNiN2Y2Y2Q2ZWU1ZmI0MzEyMGY2NzNjZWJiMGNmZWE3ZGQ0JTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnZpZGVvX2JhY2tlbmQlM0R0b3JjaGNvZGVjJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnJldHVybl91aW50OCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQuaW1hZ2VfdHJhbnNmb3Jtcy5lbmFibGUlM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1kYXRhc2V0LnVzZV9pbWFnZW5ldF9zdGF0cyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWRhdGFzZXQuZXZhbF9zcGxpdCUzRDAuMCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnBhdGglM0QuJTJGb3V0cHV0cyUyRmV2bzEtbGliZXJvLXN0YWdlMS1nMTI4LTVrJTJGY2hlY2twb2ludHMlMkYwMDUwMDAlMkZwcmV0cmFpbmVkX21vZGVsJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudHJhaW5pbmdfc3RhZ2UlM0RzdGFnZTIlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5hcHBseV90cmFpbmluZ19zdGFnZV9kZWZhdWx0cyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXBvbGljeS52bG1fbW9kZWxfbmFtZSUzRCUyMiUyNCU3QlZMTV9ESVIlN0QlMjIlMjAlNUMlMEElMjAlMjAtLXBvbGljeS52bG1fbnVtX2xheWVycyUzRDE0JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudmxtX2R0eXBlJTNEZmxvYXQzMiUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmRldmljZSUzRGN1ZGElMjAlNUMlMEElMjAlMjAtLXBvbGljeS51c2VfYW1wJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnVzZV9mbGFzaF9hdHRuJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmVuYWJsZV9ncmFkaWVudF9jaGVja3BvaW50aW5nJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LmdyYWRpZW50X2NoZWNrcG9pbnRpbmdfdXNlX3JlZW50cmFudCUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuaW1hZ2VfcmVzb2x1dGlvbiUzRCclNUI0NDglMkM0NDglNUQnJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuY2h1bmtfc2l6ZSUzRDUwJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kubl9hY3Rpb25fc3RlcHMlM0Q1MCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9zdGF0ZV9kaW0lM0QyNCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm1heF9hY3Rpb25fZGltJTNEMjQlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kcm9wb3V0JTNEMC4yJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kub3B0aW1pemVyX2xyJTNEMWUtNSUyMCU1QyUwQSUyMCUyMC0tcG9saWN5Lm9wdGltaXplcl93ZWlnaHRfZGVjYXklM0QxZS0zJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kub3B0aW1pemVyX2dyYWRfY2xpcF9ub3JtJTNEMS4wJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuc2NoZWR1bGVyX3dhcm11cF9zdGVwcyUzRDEwMDAlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5wdXNoX3RvX2h1YiUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwLS11c2VfcG9saWN5X3RyYWluaW5nX3ByZXNldCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWJhdGNoX3NpemUlM0Q2NCUyMCU1QyUwQSUyMCUyMC0tc3RlcHMlM0Q4MDAwMCUyMCU1QyUwQSUyMCUyMC0tcmVzdW1lJTNEZmFsc2UlMjAlNUMlMEElMjAlMjAtLXNhdmVfY2hlY2twb2ludCUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXNhdmVfY2hlY2twb2ludF90b19odWIlM0RmYWxzZSUyMCU1QyUwQSUyMCUyMC0tc2F2ZV9mcmVxJTNEMTAwMDAlMjAlNUMlMEElMjAlMjAtLWxvZ19mcmVxJTNEMTAlMjAlNUMlMEElMjAlMjAtLWVudl9ldmFsX2ZyZXElM0QwJTIwJTVDJTBBJTIwJTIwLS1udW1fd29ya2VycyUzRDQlMjAlNUMlMEElMjAlMjAtLXByZWZldGNoX2ZhY3RvciUzRDIlMjAlNUMlMEElMjAlMjAtLXBlcnNpc3RlbnRfd29ya2VycyUzRHRydWUlMjAlNUMlMEElMjAlMjAtLXNlZWQlM0QxMDAwJTIwJTVDJTBBJTIwJTIwLS13YW5kYi5lbmFibGUlM0RmYWxzZSUyMCU1QyUwQSUyMCUyMC0tb3V0cHV0X2RpciUzRC4lMkZvdXRwdXRzJTJGZXZvMS1saWJlcm8tc3RhZ2UyLWcxMjgtODBr",highlighted:`uv run accelerate launch --num_processes=2 -m lerobot.scripts.lerobot_train \\
  --dataset.repo_id=lerobot/libero \\
  --dataset.revision=a1aaacb7f6cd6ee5fb43120f673cebb0cfea7dd4 \\
  --dataset.video_backend=torchcodec \\
  --dataset.return_uint8=<span class="hljs-literal">true</span> \\
  --dataset.image_transforms.enable=<span class="hljs-literal">true</span> \\
  --dataset.use_imagenet_stats=<span class="hljs-literal">true</span> \\
  --dataset.eval_split=0.0 \\
  --policy.path=./outputs/evo1-libero-stage1-g128-5k/checkpoints/005000/pretrained_model \\
  --policy.training_stage=stage2 \\
  --policy.apply_training_stage_defaults=<span class="hljs-literal">true</span> \\
  --policy.vlm_model_name=<span class="hljs-string">&quot;<span class="hljs-variable">\${VLM_DIR}</span>&quot;</span> \\
  --policy.vlm_num_layers=14 \\
  --policy.vlm_dtype=float32 \\
  --policy.device=cuda \\
  --policy.use_amp=<span class="hljs-literal">true</span> \\
  --policy.use_flash_attn=<span class="hljs-literal">true</span> \\
  --policy.enable_gradient_checkpointing=<span class="hljs-literal">true</span> \\
  --policy.gradient_checkpointing_use_reentrant=<span class="hljs-literal">false</span> \\
  --policy.image_resolution=<span class="hljs-string">&#x27;[448,448]&#x27;</span> \\
  --policy.chunk_size=50 \\
  --policy.n_action_steps=50 \\
  --policy.max_state_dim=24 \\
  --policy.max_action_dim=24 \\
  --policy.dropout=0.2 \\
  --policy.optimizer_lr=1e-5 \\
  --policy.optimizer_weight_decay=1e-3 \\
  --policy.optimizer_grad_clip_norm=1.0 \\
  --policy.scheduler_warmup_steps=1000 \\
  --policy.push_to_hub=<span class="hljs-literal">false</span> \\
  --use_policy_training_preset=<span class="hljs-literal">true</span> \\
  --batch_size=64 \\
  --steps=80000 \\
  --resume=<span class="hljs-literal">false</span> \\
  --save_checkpoint=<span class="hljs-literal">true</span> \\
  --save_checkpoint_to_hub=<span class="hljs-literal">false</span> \\
  --save_freq=10000 \\
  --log_freq=10 \\
  --env_eval_freq=0 \\
  --num_workers=4 \\
  --prefetch_factor=2 \\
  --persistent_workers=<span class="hljs-literal">true</span> \\
  --seed=1000 \\
  --wandb.enable=<span class="hljs-literal">false</span> \\
  --output_dir=./outputs/evo1-libero-stage2-g128-80k`,lang:"bash",wrap:!1});var L=l(N,2);t(L,{title:"作者格式评估配置",local:"作者格式评估配置",headingTag:"h4"});var X=l(L,4);e(X,{code:"bGVyb2JvdC1ldmFsJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kucGF0aCUzRHlvdXItb3JnJTJGeW91ci1ldm8xLWxpYmVyby1jaGVja3BvaW50JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudmxtX21vZGVsX25hbWUlM0RPcGVuR1ZMYWIlMkZJbnRlcm5WTDMtMUItaGYlMjAlNUMlMEElMjAlMjAtLXBvbGljeS5kZXZpY2UlM0RjdWRhJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kudXNlX2ZsYXNoX2F0dG4lM0R0cnVlJTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kubl9hY3Rpb25fc3RlcHMlM0QxNCUyMCU1QyUwQSUyMCUyMC0tcG9saWN5LnBvc3Rwcm9jZXNzX2FjdGlvbl9kaW0lM0Q3JTIwJTVDJTBBJTIwJTIwLS1wb2xpY3kuYmluYXJpemVfZ3JpcHBlciUzRHRydWUlMjAlNUMlMEElMjAlMjAtLWVudi50eXBlJTNEbGliZXJvJTIwJTVDJTBBJTIwJTIwLS1lbnYudGFzayUzRGxpYmVyb19vYmplY3QlMjAlNUMlMEElMjAlMjAtLWVudi5jYW1lcmFfbmFtZV9tYXBwaW5nJTNEJTIyJTdCYWdlbnR2aWV3X2ltYWdlJTNBJTIwYWdlbnR2aWV3X2ltYWdlJTJDJTIwcm9ib3QwX2V5ZV9pbl9oYW5kX2ltYWdlJTNBJTIwcm9ib3QwX2V5ZV9pbl9oYW5kX2ltYWdlJTdEJTIyJTIwJTVDJTBBJTIwJTIwLS1lbnYub2JzZXJ2YXRpb25faGVpZ2h0JTNENDQ4JTIwJTVDJTBBJTIwJTIwLS1lbnYub2JzZXJ2YXRpb25fd2lkdGglM0Q0NDglMjAlNUMlMEElMjAlMjAtLWV2YWwuYmF0Y2hfc2l6ZSUzRDElMjAlNUMlMEElMjAlMjAtLWV2YWwubl9lcGlzb2RlcyUzRDE=",highlighted:`lerobot-eval \\
  --policy.path=your-org/your-evo1-libero-checkpoint \\
  --policy.vlm_model_name=OpenGVLab/InternVL3-1B-hf \\
  --policy.device=cuda \\
  --policy.use_flash_attn=<span class="hljs-literal">true</span> \\
  --policy.n_action_steps=14 \\
  --policy.postprocess_action_dim=7 \\
  --policy.binarize_gripper=<span class="hljs-literal">true</span> \\
  --env.type=libero \\
  --env.task=libero_object \\
  --env.camera_name_mapping=<span class="hljs-string">&quot;{agentview_image: agentview_image, robot0_eye_in_hand_image: robot0_eye_in_hand_image}&quot;</span> \\
  --env.observation_height=448 \\
  --env.observation_width=448 \\
  --eval.batch_size=1 \\
  --eval.n_episodes=1`,lang:"bash",wrap:!1});var C=l(X,2);t(C,{title:"原生 lerobot/libero v3 配置",local:"原生-lerobotlibero-v3-配置",headingTag:"h4"});var f=l(C,4);e(f,{code:"ZXhwb3J0JTIwTVVKT0NPX0dMJTNEZWdsJTBBZXhwb3J0JTIwUFlPUEVOR0xfUExBVEZPUk0lM0RlZ2wlMEElMEFzdWl0ZSUzRGxpYmVyb19vYmplY3QlMEFob3Jpem9uJTNEMjgwJTBBZm9yJTIwdGFza19pZCUyMGluJTIwJTdCMC4uOSU3RCUzQiUyMGRvJTBBJTIwJTIwbGVyb2JvdC1ldmFsJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kucGF0aCUzRHp1b3hpbmdkb25nJTJGZXZvMV9saWJlcm8lMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5wcmV0cmFpbmVkX3JldmlzaW9uJTNENTE1OTIxZjRhMmMxZDNmM2FkNTIzNzIxZWFmYTI2ZmRmMmFmMzE1YiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LnZsbV9tb2RlbF9uYW1lJTNET3BlbkdWTGFiJTJGSW50ZXJuVkwzLTFCLWhmJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kuZGV2aWNlJTNEY3VkYSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LnVzZV9hbXAlM0R0cnVlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kudmxtX2R0eXBlJTNEYmZsb2F0MTYlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS51c2VfZmxhc2hfYXR0biUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kuZW5hYmxlX2dyYWRpZW50X2NoZWNrcG9pbnRpbmclM0RmYWxzZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LnZsbV9udW1fbGF5ZXJzJTNEMTQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5pbWFnZV9yZXNvbHV0aW9uJTNEJyU1QjQ0OCUyQzQ0OCU1RCclMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5tYXhfdGV4dF9sZW5ndGglM0QxMDI0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kuY2h1bmtfc2l6ZSUzRDUwJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kubl9hY3Rpb25fc3RlcHMlM0QxNCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5Lm1heF9zdGF0ZV9kaW0lM0QyNCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5Lm1heF9hY3Rpb25fZGltJTNEMjQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5udW1faW5mZXJlbmNlX3RpbWVzdGVwcyUzRDMyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kucG9zdHByb2Nlc3NfYWN0aW9uX2RpbSUzRDclMjAlNUMlMEElMjAlMjAlMjAlMjAtLXBvbGljeS5iaW5hcml6ZV9ncmlwcGVyJTNEdHJ1ZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcG9saWN5LmdyaXBwZXJfdGhyZXNob2xkJTNEMC4wJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kuZ3JpcHBlcl9iZWxvd190aHJlc2hvbGRfdmFsdWUlM0QtMS4wJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1wb2xpY3kuZ3JpcHBlcl9hYm92ZV90aHJlc2hvbGRfdmFsdWUlM0QxLjAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWVudi50eXBlJTNEbGliZXJvJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYudGFzayUzRCUyMiUyNCU3QnN1aXRlJTdEJTIyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYudGFza19pZHMlM0QlMjIlNUIlMjQlN0J0YXNrX2lkJTdEJTVEJTIyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYuY2FtZXJhX25hbWUlM0RhZ2VudHZpZXdfaW1hZ2UlMkNyb2JvdDBfZXllX2luX2hhbmRfaW1hZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWVudi5jYW1lcmFfbmFtZV9tYXBwaW5nJTNEJTIyJTdCYWdlbnR2aWV3X2ltYWdlJTNBJTIwaW1hZ2UlMkMlMjByb2JvdDBfZXllX2luX2hhbmRfaW1hZ2UlM0ElMjBpbWFnZTIlN0QlMjIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWVudi5jb250cm9sX21vZGUlM0RyZWxhdGl2ZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZW52Lm9ic190eXBlJTNEcGl4ZWxzX2FnZW50X3BvcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZW52Lm9ic2VydmF0aW9uX3dpZHRoJTNENDQ4JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYub2JzZXJ2YXRpb25faGVpZ2h0JTNENDQ4JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYuaW5pdF9zdGF0ZXMlM0R0cnVlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYuZXBpc29kZV9sZW5ndGglM0QlMjIlMjQlN0Job3Jpem9uJTdEJTIyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lbnYucmVuZGVyX21vZGUlM0RyZ2JfYXJyYXklMjAlNUMlMEElMjAlMjAlMjAlMjAtLWVudi5tYXhfcGFyYWxsZWxfdGFza3MlM0QxJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1ldmFsLm5fZXBpc29kZXMlM0Q1MCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZXZhbC5iYXRjaF9zaXplJTNEMSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZXZhbC51c2VfYXN5bmNfZW52cyUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1ldmFsLnJlY29yZGluZyUzRGZhbHNlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1zZWVkJTNEMTAwMCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3V0cHV0X2RpciUzRCUyMi4lMkZvdXRwdXRzJTJGZXZvMS1saWJlcm8tc3RhZ2UyLTcway1ldmFsJTJGJTI0JTdCc3VpdGUlN0QlMkZ0YXNrLSUyNCU3QnRhc2tfaWQlN0QlMjIlMjAlNUMlMEElMjAlMjAlMjAlMjAtLWpvYl9uYW1lJTNEJTIyZXZvMS1saWJlcm8tc3RhZ2UyLTcway0lMjQlN0JzdWl0ZSU3RC10YXNrLSUyNCU3QnRhc2tfaWQlN0QlMjIlMEFkb25l",highlighted:`<span class="hljs-built_in">export</span> MUJOCO_GL=egl
<span class="hljs-built_in">export</span> PYOPENGL_PLATFORM=egl

suite=libero_object
horizon=280
<span class="hljs-keyword">for</span> task_id <span class="hljs-keyword">in</span> {0..9}; <span class="hljs-keyword">do</span>
  lerobot-eval \\
    --policy.path=zuoxingdong/evo1_libero \\
    --policy.pretrained_revision=515921f4a2c1d3f3ad523721eafa26fdf2af315b \\
    --policy.vlm_model_name=OpenGVLab/InternVL3-1B-hf \\
    --policy.device=cuda \\
    --policy.use_amp=<span class="hljs-literal">true</span> \\
    --policy.vlm_dtype=bfloat16 \\
    --policy.use_flash_attn=<span class="hljs-literal">false</span> \\
    --policy.enable_gradient_checkpointing=<span class="hljs-literal">false</span> \\
    --policy.vlm_num_layers=14 \\
    --policy.image_resolution=<span class="hljs-string">&#x27;[448,448]&#x27;</span> \\
    --policy.max_text_length=1024 \\
    --policy.chunk_size=50 \\
    --policy.n_action_steps=14 \\
    --policy.max_state_dim=24 \\
    --policy.max_action_dim=24 \\
    --policy.num_inference_timesteps=32 \\
    --policy.postprocess_action_dim=7 \\
    --policy.binarize_gripper=<span class="hljs-literal">true</span> \\
    --policy.gripper_threshold=0.0 \\
    --policy.gripper_below_threshold_value=-1.0 \\
    --policy.gripper_above_threshold_value=1.0 \\
    --env.type=libero \\
    --env.task=<span class="hljs-string">&quot;<span class="hljs-variable">\${suite}</span>&quot;</span> \\
    --env.task_ids=<span class="hljs-string">&quot;[<span class="hljs-variable">\${task_id}</span>]&quot;</span> \\
    --env.camera_name=agentview_image,robot0_eye_in_hand_image \\
    --env.camera_name_mapping=<span class="hljs-string">&quot;{agentview_image: image, robot0_eye_in_hand_image: image2}&quot;</span> \\
    --env.control_mode=relative \\
    --env.obs_type=pixels_agent_pos \\
    --env.observation_width=448 \\
    --env.observation_height=448 \\
    --env.init_states=<span class="hljs-literal">true</span> \\
    --env.episode_length=<span class="hljs-string">&quot;<span class="hljs-variable">\${horizon}</span>&quot;</span> \\
    --env.render_mode=rgb_array \\
    --env.max_parallel_tasks=1 \\
    --eval.n_episodes=50 \\
    --eval.batch_size=1 \\
    --eval.use_async_envs=<span class="hljs-literal">false</span> \\
    --eval.recording=<span class="hljs-literal">false</span> \\
    --seed=1000 \\
    --output_dir=<span class="hljs-string">&quot;./outputs/evo1-libero-stage2-70k-eval/<span class="hljs-variable">\${suite}</span>/task-<span class="hljs-variable">\${task_id}</span>&quot;</span> \\
    --job_name=<span class="hljs-string">&quot;evo1-libero-stage2-70k-<span class="hljs-variable">\${suite}</span>-task-<span class="hljs-variable">\${task_id}</span>&quot;</span>
<span class="hljs-keyword">done</span>`,lang:"bash",wrap:!1});var G=l(f,8);t(G,{title:"参考",local:"参考",headingTag:"h2"});var B=l(G,4);t(B,{title:"许可证",local:"许可证",headingTag:"h2"});var H=l(B,4);$(H,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/evo1.mdx"}),k(2),Y(x,c),el()}export{pl as component};
