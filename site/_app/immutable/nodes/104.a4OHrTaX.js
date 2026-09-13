import"../chunks/DsnmJJEf.js";import{i as S,h as N,C as L,H as l,a as t,E as F}from"../chunks/B0fLWDn-.js";import{p as E,o as H,s as e,f as z,a as Q,b as x,d as A,n as D}from"../chunks/CK-oPab5.js";import{s as q}from"../chunks/C_Vwy0jz.js";const P='{"title":"使用 dataset 工具","local":"使用-dataset-工具","sections":[{"title":"概述","local":"概述","sections":[],"depth":2},{"title":"命令行工具：lerobot-edit-dataset","local":"命令行工具lerobot-edit-dataset","sections":[{"title":"用法示例","local":"用法示例","sections":[{"title":"删除 episode","local":"删除-episode","sections":[],"depth":4},{"title":"拆分 dataset","local":"拆分-dataset","sections":[],"depth":4},{"title":"合并 dataset","local":"合并-dataset","sections":[],"depth":4},{"title":"移除特征","local":"移除特征","sections":[],"depth":4},{"title":"修改任务","local":"修改任务","sections":[],"depth":4},{"title":"转换为视频","local":"转换为视频","sections":[],"depth":4},{"title":"重新编码视频","local":"重新编码视频","sections":[],"depth":4}],"depth":3},{"title":"显示 dataset 信息","local":"显示-dataset-信息","sections":[],"depth":3},{"title":"推送到 Hub","local":"推送到-hub","sections":[],"depth":3}],"depth":2}],"depth":1}';var K=A('<meta name="hf:doc:metadata"/>'),O=A(`<p></p> <!> <!> <p>本指南介绍 LeRobot 中可用于修改和编辑现有 dataset 的 dataset 工具实用程序。</p> <!> <p>LeRobot 提供了若干用于操作 dataset 的实用程序：</p> <ol><li><strong>删除 episode</strong> - 从 dataset 中移除特定 episode</li> <li><strong>拆分 dataset</strong> - 将 dataset 划分为多个较小的 dataset</li> <li><strong>合并 dataset</strong> - 将多个 dataset 合并为一个。这些 dataset 必须具有相同的特征，并且 episode 按 <code>repo_ids</code> 中指定的顺序拼接</li> <li><strong>添加特征</strong> - 向 dataset 添加新特征</li> <li><strong>移除特征</strong> - 从 dataset 中移除特征</li> <li><strong>修改任务</strong> - 更改与 episode 关联的自然语言任务描述</li> <li><strong>转换为视频</strong> - 将基于图像的 dataset 转换为视频格式以高效存储（RGB 和深度相机使用单独的编码器编码）</li> <li><strong>重新编码视频</strong> - 使用新的编码器设置重新编码现有视频 dataset 的 RGB 和/或深度流</li> <li><strong>显示 dataset 信息</strong> - 显示 dataset 信息摘要，例如 episode 数等。</li></ol> <p>核心实现位于 <code>lerobot.datasets.dataset_tools</code>。
详细说明如何使用工具 API 的示例脚本位于 <code>examples/dataset/use_dataset_tools.py</code>。</p> <!> <p><code>lerobot-edit-dataset</code> 是用于编辑 dataset 的命令行脚本。它可用于删除 episode、拆分 dataset、合并 dataset、添加特征、移除特征以及将图像 dataset 转换为视频格式。</p> <p>运行 <code>lerobot-edit-dataset --help</code> 以获取有关每个操作配置的更多信息。</p> <!> <!> <p>从 dataset 中移除特定 episode。这对于过滤掉不需要的数据很有用。</p> <!> <!> <p>将 dataset 划分为多个子集。</p> <!> <p>拆分名称没有限制，可由用户自行确定。生成的 dataset 保存在仓库 id 下并附加拆分名称，例如 <code>lerobot/pusht_train</code>、<code>lerobot/pusht_task1</code>、<code>lerobot/pusht_task2</code>。</p> <!> <p>将多个 dataset 合并为一个 dataset。</p> <!> <!> <p>从 dataset 中移除特征。</p> <!> <!> <p>更改附加到 episode 上的自然语言任务描述。这对于修复拼写错误、统一措辞或重新标记 episode 很有用。</p> <blockquote class="warning"><p><code>modify_tasks</code> 会 <strong>就地</strong> 修改 dataset（更新 <code>meta/tasks.parquet</code>、数据文件中的 <code>task_index</code> 列、episode 元数据中的 <code>tasks</code> 列，以及 <code>meta/info.json</code> 中的 <code>total_tasks</code>）。此操作会忽略 <code>--new_repo_id</code> 和 <code>--new_root</code> 参数。</p></blockquote> <!> <p><strong>参数：</strong></p> <ul><li><code>new_task</code>：用作未被其他规则覆盖的 episode 默认值的单个任务字符串。</li> <li><code>episode_tasks</code>：从 episode index 到任务字符串的映射。</li> <li><code>task_replacements</code>：从现有任务字符串到其替换值的映射，应用于当前任务匹配某个键的 episode。每个键必须是 dataset 中已存在的任务。</li></ul> <p>这些模式可以在单次运行中组合使用。对于每个 episode，任务按以下优先级解析：</p> <p><code>episode_tasks</code> > <code>task_replacements</code> > <code>new_task</code> > 原始任务</p> <p>必须至少指定 <code>new_task</code>、<code>episode_tasks</code> 或 <code>task_replacements</code> 之一。最终没有任务的 episode 会引发错误。</p> <!> <p>将基于图像的 dataset 转换为视频格式，创建一个新的 LeRobotDataset，其中的图像以视频形式存储。这对于减少存储需求和提升数据加载性能很有用。新 dataset 将具有与原始 dataset 完全相同的结构，但图像会按正确的 LeRobot 格式编码为 MP4 视频。</p> <!> <p><strong>参数：</strong></p> <ul><li><code>output_dir</code>：自定义输出目录（可选 - 默认使用 <code>new_repo_id</code> 或 <code>&#123;repo_id&#125;_video</code>）</li> <li><code>rgb_encoder</code>：应用于 RGB 相机的视频编码器设置——所有子字段均可通过 <code>--operation.rgb_encoder.&lt;field&gt;</code> 访问。详见 <a href="./video_encoding_parameters">视频编码参数</a>。</li> <li><code>depth_encoder</code>：应用于深度图相机的视频编码器设置（例如来自 Intel RealSense）。除标准编码器字段外，它还暴露深度量化旋钮（<code>depth_min</code>、<code>depth_max</code>、<code>shift</code>、<code>use_log</code>），可通过 <code>--operation.depth_encoder.&lt;field&gt;</code> 访问。这些量化设置会持久化到 dataset 元数据中，以便在加载时将深度反量化回物理单位。详见 <a href="./video_encoding_parameters#depth-streams">深度流</a> 部分。</li> <li><code>episode_indices</code>：要转换的特定 episode 列表（默认：所有 episode）</li> <li><code>num_workers</code>：用于处理的并行工作进程数（默认：4）</li></ul> <p><strong>注意：</strong> 生成的 dataset 将是一个规范的 LeRobotDataset，所有相机都编码为 <code>videos/</code> 目录中的视频，parquet 文件仅包含元数据（无原始图像数据）。深度图相机会被自动检测并路由到 <code>depth_encoder</code>，而 RGB 相机使用 <code>rgb_encoder</code>。所有 episode、统计信息和任务都会被保留。</p> <!> <p>使用不同的编码器设置重新编码现有视频 dataset 的视频，而无需回到原始帧。RGB 视频使用 <code>rgb_encoder</code>，深度视频使用 <code>depth_encoder</code>。只需提供你想要重新编码的编码器；另一种流类型保持不变。</p> <!> <p><strong>参数：</strong></p> <ul><li><code>rgb_encoder</code>：应用于每个 RGB 视频的编码器设置。省略则跳过重新编码 RGB 视频。</li> <li><code>depth_encoder</code>：应用于每个深度视频的编码器设置。省略则跳过重新编码深度视频。</li> <li><code>num_workers</code>：用于处理的并行工作进程数。</li></ul> <blockquote class="note"><p>重新编码深度视频时，现有的深度量化参数（<code>depth_min</code>、<code>depth_max</code>、<code>shift</code>、<code>use_log</code>）和 <code>is_depth_map</code> 标志会被 <strong>保留</strong>——重新编码仅改变所存储流的编解码器/质量，不改变加载时深度的反量化方式。</p></blockquote> <!> <p>显示 dataset 信息，例如 episode 数、帧数、文件大小等。
不会对 dataset 做任何更改</p> <!> <p><strong>参数：</strong></p> <ul><li><code>parameters</code>：用于控制是否显示带特征细节的 dataset 信息的标志。（default=false）</li></ul> <!> <p>向任何命令添加 <code>--push_to_hub true</code> 标志，即可自动将生成的 dataset 上传到 Hugging Face Hub：</p> <!> <p>还有一个用于向 dataset 添加特征的工具，尚未在 <code>lerobot-edit-dataset</code> 中涵盖。</p> <!> <!> <p>当你使用 <code>lerobot</code> 录制 dataset 时，除非另有指定，它会自动上传到 Hugging Face Hub。要在线查看 dataset，请使用我们的 <strong>LeRobot dataset 可视化器</strong>，地址为： <a href="https://huggingface.co/spaces/lerobot/visualize_dataset" rel="nofollow">https://huggingface.co/spaces/lerobot/visualize_dataset</a></p> <!> <p>你也可以使用我们的命令行工具在本地可视化 dataset 中的 episode。</p> <p><strong>从 Hugging Face Hub：</strong></p> <!> <p>对于私有或受限 dataset，请先使用 <code>hf auth login</code> 进行认证，或设置 <code>HF_TOKEN</code> 环境变量。之后 Hub 客户端会自动发现凭据；无需提供令牌参数。</p> <p><strong>从本地文件夹：</strong> 添加 <code>--root</code> 选项并设置 <code>--mode local</code>。例如，要在 <code>./my_local_data_dir/lerobot/pusht</code> 中搜索：</p> <!> <p>执行后，该工具会打开 <code>rerun.io</code> 并显示所选 episode 的相机流、机器人 state 和 action。</p> <p>要使用 <a href="https://foxglove.dev" rel="nofollow">Foxglove</a> 而不是 Rerun，请安装额外组件 <code>--display-mode foxglove</code>。这会启动一个 WebSocket 服务器（将 Foxglove 应用连接到 <code>ws://127.0.0.1:8765</code>），将 episode 作为可拖动的时间线提供，你可以播放/暂停和拖动。</p> <p>如需高级用法——包括可视化存储在远程服务器上的 dataset——请运行：</p> <!> <!> <p></p>`,1);function oe(k,Y){E(Y,!1),H(()=>{new URLSearchParams(window.location.search).get("fw")}),S();var o=O();N("199su04",W=>{var R=K();q(R,"content",P),Q(W,R)});var a=e(z(o),2);L(a,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var d=e(a,2);l(d,{title:"使用 dataset 工具",local:"使用-dataset-工具",headingTag:"h1"});var s=e(d,4);l(s,{title:"概述",local:"概述",headingTag:"h2"});var M=e(s,8);l(M,{title:"命令行工具：lerobot-edit-dataset",local:"命令行工具lerobot-edit-dataset",headingTag:"h2"});var i=e(M,6);l(i,{title:"用法示例",local:"用法示例",headingTag:"h3"});var c=e(i,2);l(c,{title:"删除 episode",local:"删除-episode",headingTag:"h4"});var p=e(c,4);t(p,{code:"JTIzJTIwRGVsZXRlJTIwZXBpc29kZXMlMjAwJTJDJTIwMiUyQyUyMGFuZCUyMDUlMjAobW9kaWZpZXMlMjBvcmlnaW5hbCUyMGRhdGFzZXQpJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi50eXBlJTIwZGVsZXRlX2VwaXNvZGVzJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24uZXBpc29kZV9pbmRpY2VzJTIwJTIyJTVCMCUyQyUyMDIlMkMlMjA1JTVEJTIyJTBBJTBBJTIzJTIwRGVsZXRlJTIwZXBpc29kZXMlMjBhbmQlMjBzYXZlJTIwdG8lMjBhJTIwbmV3JTIwZGF0YXNldCUyMChwcmVzZXJ2ZXMlMjBvcmlnaW5hbCUyMGRhdGFzZXQpJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW5ld19yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2FmdGVyX2RlbGV0aW9uJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGRlbGV0ZV9lcGlzb2RlcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmVwaXNvZGVfaW5kaWNlcyUyMCUyMiU1QjAlMkMlMjAyJTJDJTIwNSU1RCUyMg==",highlighted:`<span class="hljs-comment"># Delete episodes 0, 2, and 5 (modifies original dataset)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type delete_episodes \\
    --operation.episode_indices <span class="hljs-string">&quot;[0, 2, 5]&quot;</span>

<span class="hljs-comment"># Delete episodes and save to a new dataset (preserves original dataset)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --new_repo_id lerobot/pusht_after_deletion \\
    --operation.type delete_episodes \\
    --operation.episode_indices <span class="hljs-string">&quot;[0, 2, 5]&quot;</span>`,lang:"bash",wrap:!1});var y=e(p,2);l(y,{title:"拆分 dataset",local:"拆分-dataset",headingTag:"h4"});var n=e(y,4);t(n,{code:"JTIzJTIwU3BsaXQlMjBieSUyMGZyYWN0aW9ucyUyMChlLmcuJTIwNjAlMjUlMjB0cmFpbiUyQyUyMDIwJTI1JTIwdmFsJTJDJTIwMjAlMjUlMjB0ZXN0KSUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMHNwbGl0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24uc3BsaXRzJTIwJyU3QiUyMnRyYWluJTIyJTNBJTIwMC42JTJDJTIwJTIydmFsJTIyJTNBJTIwMC4yJTJDJTIwJTIydGVzdCUyMiUzQSUyMDAuMiU3RCclMEElMEElMjMlMjBTcGxpdCUyMGJ5JTIwc3BlY2lmaWMlMjBlcGlzb2RlJTIwaW5kaWNlcyUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMHNwbGl0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24uc3BsaXRzJTIwJyU3QiUyMnRhc2sxJTIyJTNBJTIwJTVCMCUyQyUyMDElMkMlMjAyJTJDJTIwMyU1RCUyQyUyMCUyMnRhc2syJTIyJTNBJTIwJTVCNCUyQyUyMDUlNUQlN0Qn",highlighted:`<span class="hljs-comment"># Split by fractions (e.g. 60% train, 20% val, 20% test)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type <span class="hljs-built_in">split</span> \\
    --operation.splits <span class="hljs-string">&#x27;{&quot;train&quot;: 0.6, &quot;val&quot;: 0.2, &quot;test&quot;: 0.2}&#x27;</span>

<span class="hljs-comment"># Split by specific episode indices</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type <span class="hljs-built_in">split</span> \\
    --operation.splits <span class="hljs-string">&#x27;{&quot;task1&quot;: [0, 1, 2, 3], &quot;task2&quot;: [4, 5]}&#x27;</span>`,lang:"bash",wrap:!1});var J=e(n,4);l(J,{title:"合并 dataset",local:"合并-dataset",headingTag:"h4"});var U=e(J,4);t(U,{code:"JTIzJTIwTWVyZ2UlMjB0cmFpbiUyMGFuZCUyMHZhbGlkYXRpb24lMjBzcGxpdHMlMjBiYWNrJTIwaW50byUyMG9uZSUyMGRhdGFzZXQlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodF9tZXJnZWQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi50eXBlJTIwbWVyZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5yZXBvX2lkcyUyMCUyMiU1QidsZXJvYm90JTJGcHVzaHRfdHJhaW4nJTJDJTIwJ2xlcm9ib3QlMkZwdXNodF92YWwnJTVEJTIy",highlighted:`<span class="hljs-comment"># Merge train and validation splits back into one dataset</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_merged \\
    --operation.type merge \\
    --operation.repo_ids <span class="hljs-string">&quot;[&#x27;lerobot/pusht_train&#x27;, &#x27;lerobot/pusht_val&#x27;]&quot;</span>`,lang:"bash",wrap:!1});var r=e(U,2);l(r,{title:"移除特征",local:"移除特征",headingTag:"h4"});var w=e(r,4);t(w,{code:"JTIzJTIwUmVtb3ZlJTIwYSUyMGNhbWVyYSUyMGZlYXR1cmUlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjByZW1vdmVfZmVhdHVyZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmZlYXR1cmVfbmFtZXMlMjAlMjIlNUInb2JzZXJ2YXRpb24uaW1hZ2VzLnRvcCclNUQlMjI=",highlighted:`<span class="hljs-comment"># Remove a camera feature</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type remove_feature \\
    --operation.feature_names <span class="hljs-string">&quot;[&#x27;observation.images.top&#x27;]&quot;</span>`,lang:"bash",wrap:!1});var T=e(w,2);l(T,{title:"修改任务",local:"修改任务",headingTag:"h4"});var b=e(T,6);t(b,{code:"JTIzJTIwU2V0JTIwYSUyMHNpbmdsZSUyMHRhc2slMjBmb3IlMjBhbGwlMjBlcGlzb2RlcyUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMG1vZGlmeV90YXNrcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLm5ld190YXNrJTIwJTIyUGljayUyMHVwJTIwdGhlJTIwY3ViZSUyMGFuZCUyMHBsYWNlJTIwaXQlMjIlMEElMEElMjMlMjBTZXQlMjBkaWZmZXJlbnQlMjB0YXNrcyUyMGZvciUyMHNwZWNpZmljJTIwZXBpc29kZXMlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjBtb2RpZnlfdGFza3MlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5lcGlzb2RlX3Rhc2tzJTIwJyU3QiUyMjAlMjIlM0ElMjAlMjJUYXNrJTIwQSUyMiUyQyUyMCUyMjElMjIlM0ElMjAlMjJUYXNrJTIwQiUyMiUyQyUyMCUyMjIlMjIlM0ElMjAlMjJUYXNrJTIwQSUyMiU3RCclMEElMEElMjMlMjBSZXBsYWNlJTIwZXhpc3RpbmclMjB0YXNrJTIwc3RyaW5ncyUyMHdoZXJldmVyJTIwdGhleSUyMGFwcGVhciUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMG1vZGlmeV90YXNrcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnRhc2tfcmVwbGFjZW1lbnRzJTIwJyU3QiUyMlBpY2slMjB1cCUyMHRoZSUyMHJlZCUyMGN1YmUlMjIlM0ElMjAlMjJMaWZ0JTIwdGhlJTIwcmVkJTIwY3ViZSUyMiU3RCclMEElMEElMjMlMjBDb21iaW5lJTIwbW9kZXMlMjBpbiUyMGElMjBzaW5nbGUlMjBydW4lMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjBtb2RpZnlfdGFza3MlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5uZXdfdGFzayUyMCUyMkRlZmF1bHQlMjB0YXNrJTIyJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udGFza19yZXBsYWNlbWVudHMlMjAnJTdCJTIyUGljayUyMHVwJTIwdGhlJTIwcmVkJTIwY3ViZSUyMiUzQSUyMCUyMkxpZnQlMjB0aGUlMjByZWQlMjBjdWJlJTIyJTdEJyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmVwaXNvZGVfdGFza3MlMjAnJTdCJTIyNSUyMiUzQSUyMCUyMlNwZWNpYWwlMjB0YXNrJTIwZm9yJTIwZXBpc29kZSUyMDUlMjIlN0Qn",highlighted:`<span class="hljs-comment"># Set a single task for all episodes</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type modify_tasks \\
    --operation.new_task <span class="hljs-string">&quot;Pick up the cube and place it&quot;</span>

<span class="hljs-comment"># Set different tasks for specific episodes</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type modify_tasks \\
    --operation.episode_tasks <span class="hljs-string">&#x27;{&quot;0&quot;: &quot;Task A&quot;, &quot;1&quot;: &quot;Task B&quot;, &quot;2&quot;: &quot;Task A&quot;}&#x27;</span>

<span class="hljs-comment"># Replace existing task strings wherever they appear</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type modify_tasks \\
    --operation.task_replacements <span class="hljs-string">&#x27;{&quot;Pick up the red cube&quot;: &quot;Lift the red cube&quot;}&#x27;</span>

<span class="hljs-comment"># Combine modes in a single run</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type modify_tasks \\
    --operation.new_task <span class="hljs-string">&quot;Default task&quot;</span> \\
    --operation.task_replacements <span class="hljs-string">&#x27;{&quot;Pick up the red cube&quot;: &quot;Lift the red cube&quot;}&#x27;</span> \\
    --operation.episode_tasks <span class="hljs-string">&#x27;{&quot;5&quot;: &quot;Special task for episode 5&quot;}&#x27;</span>`,lang:"bash",wrap:!1});var h=e(b,12);l(h,{title:"转换为视频",local:"转换为视频",headingTag:"h4"});var j=e(h,4);t(j,{code:"JTIzJTIwTG9jYWwtb25seSUzQSUyMFNhdmUlMjB0byUyMGElMjBjdXN0b20lMjBvdXRwdXQlMjBkaXJlY3RvcnklMjAobm8lMjBodWIlMjBwdXNoKSUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2ltYWdlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGNvbnZlcnRfaW1hZ2VfdG9fdmlkZW8lMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5vdXRwdXRfZGlyJTIwJTJGcGF0aCUyRnRvJTJGb3V0cHV0JTJGcHVzaHRfdmlkZW8lMEElMEElMjMlMjBTYXZlJTIwd2l0aCUyMG5ldyUyMHJlcG9faWQlMjAobG9jYWwlMjBzdG9yYWdlKSUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2ltYWdlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1uZXdfcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodF92aWRlbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjBjb252ZXJ0X2ltYWdlX3RvX3ZpZGVvJTBBJTBBJTIzJTIwQ29udmVydCUyMGFuZCUyMHB1c2glMjB0byUyMEh1Z2dpbmclMjBGYWNlJTIwSHViJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHRfaW1hZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW5ld19yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X3ZpZGVvJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGNvbnZlcnRfaW1hZ2VfdG9fdmlkZW8lMjAlNUMlMEElMjAlMjAlMjAlMjAtLXB1c2hfdG9faHViJTIwdHJ1ZSUwQSUwQSUyMyUyMENvbnZlcnQlMjB3aXRoJTIwY3VzdG9tJTIwdmlkZW8lMjBjb2RlYyUyMGFuZCUyMHF1YWxpdHklMjBzZXR0aW5ncyUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2ltYWdlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGNvbnZlcnRfaW1hZ2VfdG9fdmlkZW8lMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5vdXRwdXRfZGlyJTIwb3V0cHV0cyUyRnB1c2h0X3ZpZGVvJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24ucmdiX2VuY29kZXIudmNvZGVjJTIwbGlic3Z0YXYxJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24ucmdiX2VuY29kZXIucGl4X2ZtdCUyMHl1djQyMHAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5yZ2JfZW5jb2Rlci5nJTIwMiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnJnYl9lbmNvZGVyLmNyZiUyMDMwJTBBJTBBJTIzJTIwQ29udmVydCUyMGElMjBkYXRhc2V0JTIwdGhhdCUyMGluY2x1ZGVzJTIwZGVwdGglMjBtYXBzJTJDJTIwY3VzdG9taXppbmclMjB0aGUlMjBkZXB0aCUyMGVuY29kZXIlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodF9pbWFnZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjBjb252ZXJ0X2ltYWdlX3RvX3ZpZGVvJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24ub3V0cHV0X2RpciUyMG91dHB1dHMlMkZwdXNodF92aWRlbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmRlcHRoX2VuY29kZXIuZGVwdGhfbWluJTIwMC4wMSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmRlcHRoX2VuY29kZXIuZGVwdGhfbWF4JTIwMTAuMCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmRlcHRoX2VuY29kZXIudXNlX2xvZyUyMHRydWUlMEElMEElMjMlMjBDb252ZXJ0JTIwb25seSUyMHNwZWNpZmljJTIwZXBpc29kZXMlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodF9pbWFnZSUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjBjb252ZXJ0X2ltYWdlX3RvX3ZpZGVvJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24ub3V0cHV0X2RpciUyMG91dHB1dHMlMkZwdXNodF92aWRlbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmVwaXNvZGVfaW5kaWNlcyUyMCUyMiU1QjAlMkMlMjAxJTJDJTIwMiUyQyUyMDUlMkMlMjAxMCU1RCUyMiUwQSUwQSUyMyUyMENvbnZlcnQlMjB3aXRoJTIwbXVsdGlwbGUlMjB3b3JrZXJzJTIwZm9yJTIwcGFyYWxsZWwlMjBwcm9jZXNzaW5nJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHRfaW1hZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi50eXBlJTIwY29udmVydF9pbWFnZV90b192aWRlbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLm91dHB1dF9kaXIlMjBvdXRwdXRzJTJGcHVzaHRfdmlkZW8lMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5udW1fd29ya2VycyUyMDglMEElMEElMjMlMjBGb3IlMjBtZW1vcnktY29uc3RyYWluZWQlMjBzeXN0ZW1zJTJDJTIwdXNlcnMlMjBjYW4lMjBub3clMjBzcGVjaWZ5JTIwbGltaXRzJTNBJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHRfaW1hZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi50eXBlJTIwY29udmVydF90b192aWRlbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLm1heF9lcGlzb2Rlc19wZXJfYmF0Y2glMjA1MCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLm1heF9mcmFtZXNfcGVyX2JhdGNoJTIwMTAwMDA=",highlighted:`<span class="hljs-comment"># Local-only: Save to a custom output directory (no hub push)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_image_to_video \\
    --operation.output_dir /path/to/output/pusht_video

<span class="hljs-comment"># Save with new repo_id (local storage)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --new_repo_id lerobot/pusht_video \\
    --operation.type convert_image_to_video

<span class="hljs-comment"># Convert and push to Hugging Face Hub</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --new_repo_id lerobot/pusht_video \\
    --operation.type convert_image_to_video \\
    --push_to_hub <span class="hljs-literal">true</span>

<span class="hljs-comment"># Convert with custom video codec and quality settings</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_image_to_video \\
    --operation.output_dir outputs/pusht_video \\
    --operation.rgb_encoder.vcodec libsvtav1 \\
    --operation.rgb_encoder.pix_fmt yuv420p \\
    --operation.rgb_encoder.g 2 \\
    --operation.rgb_encoder.crf 30

<span class="hljs-comment"># Convert a dataset that includes depth maps, customizing the depth encoder</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_image_to_video \\
    --operation.output_dir outputs/pusht_video \\
    --operation.depth_encoder.depth_min 0.01 \\
    --operation.depth_encoder.depth_max 10.0 \\
    --operation.depth_encoder.use_log <span class="hljs-literal">true</span>

<span class="hljs-comment"># Convert only specific episodes</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_image_to_video \\
    --operation.output_dir outputs/pusht_video \\
    --operation.episode_indices <span class="hljs-string">&quot;[0, 1, 2, 5, 10]&quot;</span>

<span class="hljs-comment"># Convert with multiple workers for parallel processing</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_image_to_video \\
    --operation.output_dir outputs/pusht_video \\
    --operation.num_workers 8

<span class="hljs-comment"># For memory-constrained systems, users can now specify limits:</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type convert_to_video \\
    --operation.max_episodes_per_batch 50 \\
    --operation.max_frames_per_batch 10000`,lang:"bash",wrap:!1});var I=e(j,8);l(I,{title:"重新编码视频",local:"重新编码视频",headingTag:"h4"});var C=e(I,4);t(C,{code:"JTIzJTIwUmUtZW5jb2RlJTIwYWxsJTIwUkdCJTIwdmlkZW9zJTIwd2l0aCUyMG5ldyUyMHNldHRpbmdzJTIwKHNhdmVzJTIwdG8lMjBsZXJvYm90JTJGcHVzaHRfcmVlbmNvZGVkJTIwYnklMjBkZWZhdWx0KSUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMHJlZW5jb2RlX3ZpZGVvcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnJnYl9lbmNvZGVyLnZjb2RlYyUyMGgyNjQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5yZ2JfZW5jb2Rlci5waXhfZm10JTIweXV2NDIwcCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnJnYl9lbmNvZGVyLmNyZiUyMDIzJTBBJTBBJTIzJTIwUmUtZW5jb2RlJTIwYm90aCUyMFJHQiUyMGFuZCUyMGRlcHRoJTIwdmlkZW9zJTIwaW4lMjBhJTIwZGF0YXNldCUyMHdpdGglMjBkZXB0aCUyMG1hcHMlMEFsZXJvYm90LWVkaXQtZGF0YXNldCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwb19pZCUyMGxlcm9ib3QlMkZwdXNodF9kZXB0aCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnR5cGUlMjByZWVuY29kZV92aWRlb3MlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi5yZ2JfZW5jb2Rlci52Y29kZWMlMjBoMjY0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24uZGVwdGhfZW5jb2Rlci5jcmYlMjA1MA==",highlighted:`<span class="hljs-comment"># Re-encode all RGB videos with new settings (saves to lerobot/pusht_reencoded by default)</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --operation.type reencode_videos \\
    --operation.rgb_encoder.vcodec h264 \\
    --operation.rgb_encoder.pix_fmt yuv420p \\
    --operation.rgb_encoder.crf 23

<span class="hljs-comment"># Re-encode both RGB and depth videos in a dataset with depth maps</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_depth \\
    --operation.type reencode_videos \\
    --operation.rgb_encoder.vcodec h264 \\
    --operation.depth_encoder.crf 50`,lang:"bash",wrap:!1});var Z=e(C,8);l(Z,{title:"显示 dataset 信息",local:"显示-dataset-信息",headingTag:"h3"});var m=e(Z,4);t(m,{code:"JTBBJTIzJTIwU2hvdyUyMGRhdGFzZXQlMjBpbmZvcm1hdGlvbiUyMHdpdGhvdXQlMjBmZWF0dXJlJTIwZGV0YWlscyUwQWxlcm9ib3QtZWRpdC1kYXRhc2V0JTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2ltYWdlJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGluZm8lMjAlNUMlMEElMEElMjMlMjBTaG93JTIwZGF0YXNldCUyMGluZm9ybWF0aW9uJTIwd2l0aCUyMGZlYXR1cmUlMjBkZXRhaWxzJTBBbGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHRfaW1hZ2UlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW9wZXJhdGlvbi50eXBlJTIwaW5mbyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLnNob3dfZmVhdHVyZXMlMjB0cnVlJTBB",highlighted:`
<span class="hljs-comment"># Show dataset information without feature details</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type info \\

<span class="hljs-comment"># Show dataset information with feature details</span>
lerobot-edit-dataset \\
    --repo_id lerobot/pusht_image \\
    --operation.type info \\
    --operation.show_features <span class="hljs-literal">true</span>
`,lang:"bash",wrap:!1});var u=e(m,6);l(u,{title:"推送到 Hub",local:"推送到-hub",headingTag:"h3"});var X=e(u,4);t(X,{code:"bGVyb2JvdC1lZGl0LWRhdGFzZXQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJlcG9faWQlMjBsZXJvYm90JTJGcHVzaHQlMjAlNUMlMEElMjAlMjAlMjAlMjAtLW5ld19yZXBvX2lkJTIwbGVyb2JvdCUyRnB1c2h0X2FmdGVyX2RlbGV0aW9uJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1vcGVyYXRpb24udHlwZSUyMGRlbGV0ZV9lcGlzb2RlcyUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tb3BlcmF0aW9uLmVwaXNvZGVfaW5kaWNlcyUyMCUyMiU1QjAlMkMlMjAyJTJDJTIwNSU1RCUyMiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcHVzaF90b19odWIlMjB0cnVl",highlighted:`lerobot-edit-dataset \\
    --repo_id lerobot/pusht \\
    --new_repo_id lerobot/pusht_after_deletion \\
    --operation.type delete_episodes \\
    --operation.episode_indices <span class="hljs-string">&quot;[0, 2, 5]&quot;</span> \\
    --push_to_hub <span class="hljs-literal">true</span>`,lang:"bash",wrap:!1});var B=e(X,4);l(B,{title:"dataset 可视化",local:"dataset-可视化",headingTag:"h1"});var G=e(B,2);l(G,{title:"在线可视化",local:"在线可视化",headingTag:"h2"});var _=e(G,4);l(_,{title:"本地可视化",local:"本地可视化",headingTag:"h2"});var v=e(_,6);t(v,{code:"bGVyb2JvdC1kYXRhc2V0LXZpeiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwby1pZCUyMGxlcm9ib3QlMkZwdXNodCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tZXBpc29kZS1pbmRleCUyMDA=",highlighted:`lerobot-dataset-viz \\
    --repo-id lerobot/pusht \\
    --episode-index 0`,lang:"bash",wrap:!1});var V=e(v,6);t(V,{code:"bGVyb2JvdC1kYXRhc2V0LXZpeiUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcmVwby1pZCUyMGxlcm9ib3QlMkZwdXNodCUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tcm9vdCUyMC4lMkZteV9sb2NhbF9kYXRhX2RpciUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tbW9kZSUyMGxvY2FsJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1lcGlzb2RlLWluZGV4JTIwMA==",highlighted:`lerobot-dataset-viz \\
    --repo-id lerobot/pusht \\
    --root ./my_local_data_dir \\
    --mode <span class="hljs-built_in">local</span> \\
    --episode-index 0`,lang:"bash",wrap:!1});var g=e(V,8);t(g,{code:"bGVyb2JvdC1kYXRhc2V0LXZpeiUyMC0taGVscA==",highlighted:'lerobot-dataset-viz --<span class="hljs-built_in">help</span>',lang:"bash",wrap:!1});var f=e(g,2);F(f,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/using_dataset_tools.mdx"}),D(2),Q(k,o),x()}export{oe as component};
