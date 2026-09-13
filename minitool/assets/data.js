window.LEROBOT_DATA = {
  source: "LeRobot 官方速查表（中文快照）",
  categories: [
    { id: "setup", name: "安装" },
    { id: "tool", name: "工具" },
    { id: "calib", name: "校准" },
    { id: "teleop", name: "遥操作" },
    { id: "record", name: "录制" },
    { id: "train", name: "训练" },
    { id: "infer", name: "推理" },
    { id: "tip", name: "小贴士" },
    { id: "faq", name: "常见问题" }
  ],
  items: [
    {
      cat: "setup",
      title: "创建 conda 环境",
      desc: "需要 Python 3.12（推荐用 miniforge 管理环境）。",
      cmd: "conda create -y -n lerobot python=3.12"
    },
    {
      cat: "setup",
      title: "激活虚拟环境",
      desc: "每次打开新的 shell 都需要激活。",
      cmd: "conda activate lerobot"
    },
    {
      cat: "setup",
      title: "安装 ffmpeg（视频解码）",
      desc: "TorchCodec 需要 ffmpeg；不支持 TorchCodec 的平台会自动回退到 pyav。",
      cmd: "conda install ffmpeg -c conda-forge"
    },
    {
      cat: "setup",
      title: "从源码安装",
      desc: "适合需要改代码的场景；[core_scripts] 覆盖录制、回放、校准等常用脚本。",
      cmd: "git clone https://github.com/huggingface/lerobot.git\ncd lerobot\npip install -e \".[core_scripts]\""
    },
    {
      cat: "setup",
      title: "从 PyPI 安装",
      desc: "只装核心库；按需换成 [training] / [all] 等 extra。",
      cmd: "pip install 'lerobot[core_scripts]'"
    },

    {
      cat: "tool",
      title: "查找串口",
      desc: "识别机器人连接了哪些串口：按提示拔下 USB 并回车，脚本会打印正确端口。",
      cmd: "lerobot-find-port"
    },
    {
      cat: "tool",
      title: "查找相机",
      desc: "列出相机索引并保存测试帧到 lerobot/outputs/captured_images。",
      cmd: "lerobot-find-cameras"
    },

    {
      cat: "calib",
      title: "校准机器人",
      desc: "每个机器人/teleoperator 通常只需校准一次；校准前让关节大致处于中间位置；后续脚本要使用相同的 id。",
      cmd: "lerobot-calibrate \\\n    --robot.type=so101_follower \\\n    --robot.port=/dev/ttyACM0 \\\n    --robot.id=my_follower_arm"
    },

    {
      cat: "teleop",
      title: "遥操作（双相机 + Rerun 可视化）",
      desc: "记得把端口、ID、相机索引改成你自己的值。",
      cmd: "lerobot-teleoperate \\\n    --robot.type=so101_follower \\\n    --robot.port=/dev/ttyACM0 \\\n    --robot.id=my_follower_arm \\\n    --robot.cameras=\"{ top: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 30}, wrist: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30} }\" \\\n    --teleop.type=so101_leader \\\n    --teleop.port=/dev/ttyACM1 \\\n    --teleop.id=my_leader_arm \\\n    --display_data=true"
    },

    {
      cat: "record",
      title: "登录 Hugging Face",
      desc: "数据集会自动上传，录制前先登录；token 在 HF 设置页获取。",
      cmd: "hf auth login"
    },
    {
      cat: "record",
      title: "录制数据集",
      desc: "键盘快捷键：→ 保存本组并进入下一个；← 删除本组并重试；Esc 停止、编码视频并上传。",
      cmd: "lerobot-record \\\n    --robot.type=so101_follower \\\n    --robot.port=/dev/ttyACM0 \\\n    --robot.id=my_follower_arm \\\n    --robot.cameras=\"{ top: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 30}, wrist: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30} }\" \\\n    --teleop.type=so101_leader \\\n    --teleop.port=/dev/ttyACM1 \\\n    --teleop.id=my_leader_arm \\\n    --dataset.repo_id=${HF_USER}/so101_dataset_test \\\n    --dataset.num_episodes=30 \\\n    --dataset.single_task=\"put the red brick in a bowl\" \\\n    --dataset.streaming_encoding=true \\\n    --display_data=true"
    },
    {
      cat: "record",
      title: "录制深度流",
      desc: "use_depth: true 时 Intel RealSense 记录 12 位深度，作为独立视频存储。",
      cmd: "lerobot-record \\\n    ... 其余参数与上面一致 ... \\\n    --robot.cameras=\"{ head: {type: intelrealsense, serial_number_or_name: \\\"0123456789\\\", width: 640, height: 480, fps: 30, use_depth: true} }\" \\\n    --dataset.repo_id=${HF_USER}/so101_depth_test \\\n    --dataset.single_task=\"put the red brick in a bowl\" \\\n    --dataset.depth_encoder.depth_min=0.01 \\\n    --dataset.depth_encoder.depth_max=10.0 \\\n    --dataset.depth_encoder.shift=0.0 \\\n    --dataset.depth_encoder.use_log=true"
    },
    {
      cat: "record",
      title: "自定义视频编码参数",
      desc: "RGB 与深度流分别通过 --dataset.rgb_encoder.* 和 --dataset.depth_encoder.* 独立编码。",
      cmd: "lerobot-record \\\n    ... 其余参数与上面一致 ... \\\n    --dataset.rgb_encoder.vcodec=h264 \\\n    --dataset.rgb_encoder.pix_fmt=yuv420p \\\n    --dataset.rgb_encoder.crf=23 \\\n    --dataset.depth_encoder.vcodec=hevc \\\n    --dataset.depth_encoder.extra_options='{\"x265-params\": \"lossless=1\"}'"
    },

    {
      cat: "train",
      title: "训练 ACT policy",
      desc: "训练可能需要数小时；--policy.device 可选 cuda / mps / cpu。",
      cmd: "lerobot-train \\\n    --dataset.repo_id=${HF_USER}/so101_dataset_test \\\n    --policy.type=act \\\n    --output_dir=outputs/train/act_so101_test \\\n    --job_name=act_so101_test \\\n    --policy.device=cuda \\\n    --wandb.enable=true \\\n    --policy.repo_id=${HF_USER}/policy_test \\\n    --steps=20000"
    },
    {
      cat: "train",
      title: "微调已有模型",
      desc: "提供 --policy.path 即可，可以省略 --policy.type。",
      cmd: "lerobot-train \\\n    --dataset.repo_id=${HF_USER}/so101_dataset_test \\\n    --policy.path=username/the_policy_to_finetune \\\n    --policy.device=cuda \\\n    --policy.repo_id=${HF_USER}/policy_test \\\n    --output_dir=outputs/train/act_so101_test \\\n    --steps=20000"
    },
    {
      cat: "train",
      title: "恢复训练",
      desc: "--config_path 指向 checkpoint（本地路径或 Hub 仓库 ID），加 --resume=true 继续训练。",
      cmd: "lerobot-train --config_path=${HF_USER}/policy_test --resume=true --job.target=a10g-small"
    },

    {
      cat: "infer",
      title: "部署运行训练好的 policy",
      desc: "相机配置需与采集数据集时一致；--duration 单位为秒，不填则一直运行。",
      cmd: "lerobot-rollout \\\n    --strategy.type=base \\\n    --policy.path=${HF_USER}/my_policy \\\n    --robot.type=so101_follower \\\n    --robot.port=/dev/ttyACM1 \\\n    --robot.cameras=\"{ up: {type: opencv, index_or_path: /dev/video1, width: 640, height: 480, fps: 30}, side: {type: opencv, index_or_path: /dev/video5, width: 640, height: 480, fps: 30}}\" \\\n    --task=\"Put lego brick into the transparent box\" \\\n    --duration=60"
    },

    {
      cat: "tip",
      title: "没有本地 GPU？",
      desc: "任选命令加上 --job.target=<flavor>（例如 a10g-small），会在 Hugging Face Jobs 上运行；用 hf jobs hardware 查看可用规格。",
      cmd: "lerobot-train ... --job.target=a10g-small"
    },
    {
      cat: "tip",
      title: "常见 policy 类型",
      desc: "act、diffusion、smolvla、pi05 等；--policy.device 支持 cuda（NVIDIA）、mps（Apple Silicon）、cpu。",
      cmd: ""
    },
    {
      cat: "tip",
      title: "录制键盘快捷键",
      desc: "→ 保存当前 episode 并进入下一个；← 删除当前 episode 并重试；Esc 停止、编码视频并上传。",
      cmd: ""
    },

    {
      cat: "faq",
      title: "相机画面模糊 / 不可用？",
      desc: "光照比分辨率更重要，先改善布光；相机索引可用 lerobot-find-cameras 确认。",
      cmd: ""
    },
    {
      cat: "faq",
      title: "构建或安装报错（cmake、ffmpeg、CUDA）？",
      desc: "对照官方安装指南的「故障排查」逐项检查（该内容在文档站，需联网查看）。",
      cmd: ""
    },
    {
      cat: "faq",
      title: "不确定哪种 policy 适合你的 GPU？",
      desc: "查看官方「算力硬件指南」中不同 policy 的显存占用与训练时长参考。",
      cmd: ""
    },
    {
      cat: "faq",
      title: "还是解决不了？",
      desc: "可以到 LeRobot Discord 社区提问（需联网访问）。",
      cmd: ""
    }
  ]
};
