# LeRobot 文档翻译术语表（英 → 中）

一致性优先。以下为推荐译法；带“保留”的不要翻译。

## 英文优先（本项目约定，2026-09 调整）
以下术语在中文正文中**直接保留英文**（不翻译），中英之间加半角空格：

policy、dataset、checkpoint、episode、rollout、token、benchmark、inference、fine-tune、
teleoperation、teleoperator、leader arm、follower arm、gripper、end-effector、calibration、
demonstration、simulation、observation、action、state

常用搭配同样保留英文：policy server / policy network / policy gradient / policy learning / policy deployment、
action chunk / action chunking / action space / action sequence / action expert / action prediction /
action representation / relative action / absolute action、observation space、state space、state vector、
episode index、inference backend / inference latency / async inference / real-time inference、
simulation environment。

动词场景按英文动词处理：calibrate（例如 calibrate 机器人 / 需要 calibrate）、fine-tune；
保留中文动词的特殊情况：观测到、演示了/演示如何（见 `tools/keep_english.py` 的 PROTECT 列表）。

## 产品与品牌（保留原文）
LeRobot, Hugging Face, HuggingFace Hub / the Hub（可写 "Hub"）, LeRobotDataset（保留）, LeRobotDatasetMetadata（保留）,
SO-100, SO-101, SO-ARM100, Koch, LeKiwi, Hope Jr, Reachy 2, Unitree G1, Earth Rover Mini, OpenArm, OMX, reBot B601-DM,
Damiao, Feetech, Dynamixel, Intel RealSense, OpenCV, Python, PyTorch, CUDA, Linux, macOS, Windows,
ACT, Diffusion Policy, VQ-BeT, TDMPC, SmolVLA, π₀ / Pi0, π₀-FAST, π₀.₅ / Pi05, GR00T, MolmoAct2, X-VLA, EVO1, FastWAM,
WALL-OSS, SARM, ROBOMETER, TOPReward, VLA-JEPA, LingBot-VA, Multitask DiT, RTC (Real-Time Chunking), PEFT, LoRA, Isaac, LIBERO, Meta-World, RoboTwin, RoboCasa, RoboMME, VLABench, LeIsaac, LeLab, Colab, Jupyter, Discord, GitHub, wandb, Weights & Biases

## 核心术语
- policy → 策略
- dataset → 数据集
- robot → 机器人
- robotics → 机器人技术 / 机器人学（按语境）
- teleoperation → 遥操作
- teleoperator → 遥操作设备
- leader arm → 主臂；follower arm → 从臂
- calibration / calibrate → 校准
- checkpoint → 检查点
- episode / episodes → 回合（数据语境）；如指视频片段可用“片段”
- demonstration / demo → 演示
- rollout → 部署运行（或“推理运行”，按语境；`lerobot-rollout` 保留原文）
- inference → 推理
- evaluation / eval → 评估
- benchmark → 基准测试
- simulation / sim → 仿真
- deployment / deploy → 部署
- training → 训练
- fine-tuning → 微调
- pretrained → 预训练
- feature (observation feature) → 特征
- observation → 观测
- action → 动作
- state → 状态
- trajectory → 轨迹
- frame → 帧
- camera → 相机
- motor → 电机
- servo → 舵机
- actuator → 执行器
- end-effector → 末端执行器
- joint → 关节
- gripper → 夹爪
- torque → 力矩
- fps / FPS → FPS（保留）
- config / configuration → 配置
- processor → 处理器（LeRobot 组件名，保留 Processor 一词可选）
- pipeline → 流水线
- wrapper → 封装 / 包装器
- buffer → 缓冲区
- chunk (action chunk) → 动作块
- async inference → 异步推理
- policy server → 策略服务器
- client → 客户端
- host → 主机
- daemon → 守护进程
- episode index → 回合索引
- metadata → 元数据
- schema → 模式（数据结构语境）
- dtype → 数据类型
- tensor → 张量
- batch → 批次
- loss → 损失
- optimizer → 优化器
- learning rate → 学习率
- gradient → 梯度
- attention → 注意力
- token → 词元（模型语境）
- quantization → 量化
- throughput → 吞吐量
- latency → 延迟
- real-time → 实时
- repository / repo → 仓库
- release → 版本发布
- changelog → 更新日志
- tutorial → 教程
- guide → 指南
- troubleshooting → 故障排查
- quickstart → 快速开始
- prerequisites → 前置条件
- hardware → 硬件
- software → 软件
- firmware → 固件
- wiring → 接线
- assembly → 组装
- bill of materials (BOM) → 物料清单
- 3D print → 3D 打印
- mount → 安装 / 固定
- screw → 螺丝
- plug / unplug → 插上 / 拔下
- port → 端口
- device → 设备
- permission → 权限
- thread (background thread) → 线程
- resource leak → 资源泄漏
- context manager → 上下文管理器
- deprecated → 已弃用
- backward compatibility → 向后兼容
- breaking change → 破坏性变更

## CLI / 代码相关（保留原文，不翻译）
- 所有 `lerobot-*` 命令（lerobot-train, lerobot-record, lerobot-teleoperate, lerobot-calibrate, lerobot-eval, lerobot-rollout 等）
- python / pip / uv / git / npm / bash / conda 命令
- 参数名（如 --policy.type）、字段名、变量名、函数名、类名、文件名、路径
- shell 环境变量（HF_TOKEN 等）
- JSON/YAML 键名、URL、代码块内容
- 在反引号或 token 中的一切内容

## 风格要求
- 简体中文，技术文档语体，简洁准确，不口语化。
- 不要逐字直译导致生硬；术语统一优先于辞藻。
- 不添加原文没有的解释。
- 保留 Markdown 结构：加粗 `**…**`、斜体、列表标记、表格竖线、引用 `>` 前缀、GitHub 提示标记 `[!TIP]` 等。
