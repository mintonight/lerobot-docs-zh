import"../chunks/DsnmJJEf.js";import{i as k,h as F,C as L,H as o,a as l,E as O}from"../chunks/D1zeK86u.js";import{p as Q,o as z,s as e,f as D,a as G,b as q,c as a,d as x,n as s,r as d}from"../chunks/B9a_YfHB.js";import{s as H}from"../chunks/CrPi-TAD.js";const K='{"title":"Isaac Teleop","local":"isaac-teleop","sections":[{"title":"安装","local":"安装","sections":[{"title":"设置 CloudXR 并连接头显","local":"设置-cloudxr-并连接头显","sections":[],"depth":3}],"depth":2},{"title":"工作原理","local":"工作原理","sections":[{"title":"离合器：由示例循环拥有","local":"离合器由示例循环拥有","sections":[],"depth":3}],"depth":2},{"title":"控制","local":"控制","sections":[],"depth":2},{"title":"开始使用","local":"开始使用","sections":[{"title":"步骤 1：创建 teleoperator","local":"步骤-1创建-teleoperator","sections":[],"depth":3},{"title":"步骤 2：连接","local":"步骤-2连接","sections":[],"depth":3},{"title":"步骤 3：运行示例","local":"步骤-3运行示例","sections":[],"depth":3}],"depth":2},{"title":"重要的流水线步骤和选项","local":"重要的流水线步骤和选项","sections":[],"depth":2},{"title":"故障排查","local":"故障排查","sections":[],"depth":2},{"title":"了解更多","local":"了解更多","sections":[],"depth":2}],"depth":1}';var P=x('<meta name="hf:doc:metadata"/>'),$=x(`<p></p> <!> <!> <p>使用 NVIDIA <a href="https://github.com/NVIDIA/IsaacTeleop" rel="nofollow">Isaac Teleop</a> 控制你的机器人，这是一个
多模态 teleoperation 框架。Isaac Teleop 通过一系列输入设备驱动单个 <code>TeleopSession</code> — XR（VR）控制器、手部追踪、全身追踪、Manus 手套、脚踏
等。</p> <p>在 LeRobot 中，Isaac Teleop 以自包含示例的形式提供，位于 <a href="https://github.com/huggingface/lerobot/tree/main/examples/isaac_teleop_to_so101" rel="nofollow"><code>examples/isaac_teleop_to_so101/</code></a>。
每个 Isaac Teleop 输入设备都是示例的 <code>isaac_teleop</code> 包中各自的 <code>Teleoperator</code> 子类，共享同一个会话生命周期（见 <code>IsaacTeleopTeleoperator</code>）。目前
可用的设备是 <strong>XR 控制器</strong>（<code>XRController</code>）和一个可反向驱动的 <strong>SO-101 leader arm</strong>（<code>SO101LeaderArm</code>）；Manus 手套和手部/全身追踪是
自然的后续设备。本指南聚焦于 XR 控制器；SO-101 leader arm 在<a href="#step-3-run-the-example">运行示例</a>下概述。</p> <p><strong>在本指南中你将学到：</strong></p> <ul><li>Isaac Teleop 设备如何驱动机器人 end-effector（EE）目标</li> <li><em>离合器</em>（XR 控制器上的挤压/握持）如何在不使机械臂猛动的情况下接合 teleoperation</li> <li>如何运行 SO‑101 teleoperation 示例并调整运动/gripper/IK</li></ul> <!> <p>该示例位于 LeRobot 仓库中（它不是 <code>lerobot</code> pip 包的一部分），因此
请克隆仓库并从源码安装。规范且始终最新的安装和使用
参考是示例的 <a href="https://github.com/huggingface/lerobot/tree/main/examples/isaac_teleop_to_so101/README.md" rel="nofollow"><code>README.md</code></a>；
简要来说：</p> <!> <p><code>isaacteleop</code> 发布在公共 PyPI 上（仅限 Linux）。<code>cloudxr</code> 可选项提供 CloudXR
运行时绑定；<code>retargeters-lite</code> 是基于 scipy 的重定向器路径，在
x86_64 和 ARM 上都能解析（在 aarch64 上——例如 DGX Spark——完整的 <code>retargeters</code> 可选项无法解析，
因为其 <code>dex-retargeting</code>/<code>nlopt</code> 版本固定，这就是它在这里不是默认选项的原因）。在
x86_64 上，你还可以安装完整的重定向器栈：</p> <!> <!> <p>Isaac Teleop 通过 <strong>NVIDIA CloudXR</strong> 将头显串流到你的机器，CloudXR 提供会话所连接的
OpenXR 运行时。默认情况下，当你调用 <code>teleop_device.connect()</code> 时，LeTeleop <strong>会为你自动启动 CloudXR 运行时</strong> — 你不再需要在单独的 shell 中运行 <code>python -m isaacteleop.cloudxr</code> and <code>source cloudxr.env</code>。你只需连接一个受支持的头显
并打开 CloudXR 防火墙端口。请遵循 Isaac Teleop <a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/quick_start.html" rel="nofollow">快速开始</a>了解
头显配对和防火墙的详细信息。</p> <p><strong>首次运行（EULA）。</strong>首次启动必须接受 NVIDIA CloudXR EULA。自动启动
会<strong>在 stdin 上</strong>提示接受，因此在无头机器上它会挂起等待输入。请先以交互方式
引导接受一次 EULA：</p> <!> <p>之后，<code>connect()</code> 会以非交互方式启动运行时。启动会<strong>阻塞约 30 秒</strong>，
直到运行时启动完成。</p> <p><strong>配置。</strong><code>IsaacTeleopConfig</code> 上的两个字段（由每个设备共享）控制这一行为：</p> <ul><li><code>auto_launch_cloudxr</code>（默认 <code>True</code>）— <code>connect()</code> 是否启动运行时。当 CloudXR 已在外部运行时，
设为 <code>False</code>。</li> <li><code>cloudxr_env_file</code>（默认 <code>None</code>）— 一个可选的 CloudXR 设备配置文件 <code>.env</code>，用于选择
头显传输方式（例如 Apple Vision Pro 配置文件）。这是启动器的<strong>输入</strong>；它不是旧手动流程
让你 <code>source</code> 的 <code>~/.cloudxr/run/cloudxr.env</code> <strong>输出</strong>文件。<code>None</code> 保留默认的 auto-WebRTC 配置文件 — 不过除非你传入 <code>--teleop.cloudxr_env_file</code>，SO-101 示例会将其覆盖为
与 <code>teleoperate.py</code> 一起提供的 <code>default.env</code>。</li></ul> <p><strong>选择退出。</strong>要跳过自动启动（CloudXR 已运行），可以设置 <code>auto_launch_cloudxr=False</code> 或导出环境变量：</p> <!> <p><strong>环境变量优先于配置字段</strong>：如果设置了 <code>LEROBOT_CLOUDXR_SKIP_AUTOLAUNCH=1</code>，
那么即使 <code>auto_launch_cloudxr=True</code> 也会跳过自动启动。此变量与
Isaac Lab 的 <code>ISAACLAB_CXR_SKIP_AUTOLAUNCH</code> <strong>相互独立</strong> — 设置其中一个不会影响另一个。</p> <p><strong>每个进程一个 teleoperator。</strong>CloudXR 运行时在进程范围内配置环境（单例），
因此每个进程只运行一个 Isaac Teleop teleoperator。</p> <p><strong>关闭。</strong>退出时（包括 Ctrl-C）始终调用 <code>teleop_device.disconnect()</code>。将
你的 teleoperation 循环包裹在 <code>try/finally</code> 中，并在 <code>finally</code> 中调用 <code>disconnect()</code>。这会在 CloudXR 运行时<strong>之前</strong>拆除
OpenXR 会话，这是必需的顺序；启动器的 <code>atexit</code> 钩子只会回收运行时，不会运行会话的 <code>__exit__</code>，因此如果没有
显式的 <code>disconnect()</code>，被中断的运行会以错误的顺序关闭。</p> <!> <p>参见<a href="https://nvidia.github.io/IsaacTeleop/main/references/requirements.html" rel="nofollow">系统要求</a> 了解受支持的操作系统 / GPU / CloudXR 版本和头显。</p> <!> <p>XR 控制器是一个 Isaac Teleop <strong>输入</strong>设备。<code>XRController</code> 是一层刻意设计得很薄的
读取器：它暴露<strong>原始</strong>控制器握持姿态 — 已静态重基到机器人
基座坐标系 — 外加挤压和扳机模拟值。它<strong>没有</strong>重定向器，也<strong>没有</strong> 自己的离合器逻辑。离合器（接合锁存 + 相对 EE 的增量重基）和 gripper
映射位于下游的示例循环中，随后馈入 LeRobot 现有的闭环
笛卡尔 IK 流水线 — 与手机 teleoperator 使用的是同一条流水线。设备特定的部分是 <code>XRController</code>、循环中的 <code>Clutch</code> 和 <code>MapXRControllerActionToRobotAction</code>；下游的一切
（<code>EEBoundsAndSafety</code>、<code>InverseKinematicsEEToJoints</code>）都是共享的，未来的设备（例如 Manus
手套）可以换入自己的 <code>teleop_&lt;device&gt;.py</code> + 处理器，同时复用其余部分。</p> <p><code>XRController._build_pipeline</code> 接入 Isaac Teleop 的 <code>ControllersSource</code> — 由原生 <code>ControllerTransform</code>（<code>base_T_anchor</code>）静态重基到
机器人基座坐标系 — 并原样暴露变换后的控制器流。<code>get_action()</code> 直接从其上读取
握持姿态、挤压和扳机；会话始终以 <code>RUNNING</code> 步进（没有需要门控的离合器重定向器）。</p> <p><code>Clutch</code> 类（位于 <code>examples/isaac_teleop_to_so101/isaac_teleop/clutch.py</code> 中，由 <code>common.py</code> 中的
循环驱动）镜像了 Isaac Teleop 的 <code>SO101ClutchRetargeter</code>，但存在于循环内，因此
设备可以保持为薄读取器：</p> <ul><li>它在挤压的<strong>接合边沿</strong>（挤压首次越过 <code>clutch_threshold</code> 的那一帧）锁存接合原点，并围绕它重基位置和姿态，因此接合不会
使机械臂瞬移。<code>Clutch.rebase</code> 以 <code>(pos, quat)</code> 对的形式返回绝对基座坐标系目标，循环将其拼接为馈入处理器的 7 维 <code>ee_pose</code>。</li> <li>模拟扳机在 <code>[0, 1]</code> 中变为 gripper <code>closedness</code>（0 = 张开，1 = 闭合），
与扳机拉动量成正比，<code>MapXRControllerActionToRobotAction</code> 将其映射为 gripper 目标。</li></ul> <p>参见 Isaac Teleop <a href="https://nvidia.github.io/IsaacTeleop/main/references/retargeting/index.html" rel="nofollow">重定向接口</a> 和<a href="https://nvidia.github.io/IsaacTeleop/main/overview/architecture.html" rel="nofollow">架构概览</a> 了解源节点和重定向器如何组合。</p> <!> <!> <p>与手机流水线（将离合器拆分到 <code>MapPhoneActionToRobotAction</code> 和 <code>EEReferenceAndDelta</code> 中）不同，XR 离合器完全位于示例循环的 <code>Clutch</code> 类中。它输出 <strong>绝对</strong> EE 姿态，因此没有 <code>EEReferenceAndDelta</code> 阶段，处理器中也没有增量累积 — <code>MapXRControllerActionToRobotAction</code> 是纯粹的、无 state 的逐帧映射。</p> <p>离合器在挤压的<strong>接合边沿</strong>（挤压越过 <code>clutch_threshold</code> 的时刻）锁存接合原点，
并根据<em>相对于</em>该原点的运动驱动 EE，因此接合时机械臂不会
瞬移。在<strong>每次</strong>接合时 — 无论是启动还是任务中途重新接合 — 原点 <em>位置</em>都根据机械臂<strong>实测关节</strong>的正运动学锁存，因此原点等于
机械臂的实际位置，即使它在断开期间移动过，接合也不会跳变。原点 <em>姿态</em>保留最后指令的旋转：5 自由度机械臂只能
柔和地跟踪姿态，因此锁存实测腕部姿态会在每次重新接合时将跟踪偏移注入
指令。</p> <!> <ul><li><strong>挤压 / 握持</strong> — <strong>离合器</strong>（安全手柄）。将其按住超过 <code>clutch_threshold</code> 以接合
teleoperation；松开即暂停。每次接合都会重新捕获原点，因此你可以在暂停时重新放置
手部，然后重新接合而不会使机械臂跳变（索引/离合风格）。</li> <li><strong>扳机</strong> — <strong>gripper</strong>，<strong>模拟</strong>控制。gripper 与扳机成比例地
跟踪 — 半按扳机使 gripper 半闭 — 通过 <code>[0, 1]</code> 中的闭合度
（0 = 张开，1 = 闭合）映射为绝对 gripper 关节目标。</li> <li><strong>控制器姿态</strong> — <strong>腕部</strong>。离合器将控制器姿态
（相对接合、基座坐标系）重基为一个柔和的 IK 姿态目标，腕部在跟踪位置的
同时跟踪该目标。在 5 自由度 SO‑101 上，腕部按设计只能部分跟随手部 — 见下文 <code>orientation_weight</code>。</li></ul> <!> <!> <!> <p><code>XRController.get_action()</code> 返回<strong>原始</strong>的基座坐标系控制器姿态，而非离合器重基后的
目标：机器人基座坐标系中的 <code>grip_pos</code> (3,) <code>[x, y, z]</code> [m] 和 <code>grip_quat</code> (4,) <code>[qx, qy, qz, qw]</code>，
外加 <code>[0, 1]</code> 中的标量 <code>squeeze</code> 和 <code>trigger</code> 模拟值。示例循环的 <code>Clutch</code> 将其转换为绝对 <code>ee_pose</code>，循环会对挤压值进行阈值判断以与 <code>clutch_threshold</code> 接合。</p> <!> <p>调用 <code>teleop_device.connect()</code> 会首先自动启动 CloudXR 运行时（除非你选择退出 —
参见<a href="#set-up-cloudxr-and-connect-a-headset">设置 CloudXR 并连接头显</a>；这会阻塞约 30 秒，首次运行时会在 stdin 上提示接受 EULA），然后启动 Isaac Teleop <a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/teleop_session.html" rel="nofollow"><code>TeleopSession</code></a> （打开 OpenXR 会话并发现控制器）。XR 控制器可自 calibration，因此
没有手动 calibrate 步骤 — 离合器在每次接合时负责重新居中。将 <code>connect()</code> 与一个调用 <code>disconnect()</code> 的 <code>try/finally</code> 搭配使用，以便在退出/Ctrl-C 时先拆除会话再
关闭运行时。</p> <!> <p>该示例假设你已配置好机器人（SO‑101 follower arm）并设置了正确的串口。</p> <p><strong>机器人 URDF 及其网格会在首次运行时自动获取</strong>：XR 设备会从 <a href="https://huggingface.co/buckets/lerobot/robot-urdfs/tree/so101" rel="nofollow"><code>lerobot/robot-urdfs</code> Hugging Face bucket</a> 下载 SO-101 URDF 到 LeRobot 缓存（<code>HF_LEROBOT_HOME/robot-urdfs/so101/</code>）并在之后复用，因此没有
单独的下载步骤：</p> <!> <p>CLI 采用 <code>lerobot-teleoperate</code> 风格（draccus）：<code>--robot.*</code> 配置 SO-101 follower arm， <code>--teleop.type</code> 选择 Isaac 输入设备（<code>xr_controller</code> | <code>so101_leader</code>）， <code>--teleop.*</code> 是其设备参数。<code>--teleop.type=xr_controller</code> 运行上文描述的 XR 控制器路径。
启动安全约定：默认情况下，它会在 <code>--reset_duration</code> 秒内将所有关节平滑转动到默认复位姿态
（<code>--reset_to_origin=false</code> 使机械臂保持在原位），然后根据机械臂的实测姿态为
离合器设定原点，使首次接合无跳变；只有在离合器接合时才会
向 follower arm 发送指令。</p> <p><strong>自定义复位姿态。</strong>复位姿态以内置默认值（一个舒适的中位姿态）形式提供，开箱即用 — 你<strong>不</strong>需要录制任何内容。要将其定制为你的设置，
请反向驱动机械臂到你想要的姿态并运行 <code>python -m examples.isaac_teleop_to_so101.override_reset_pose --id &lt;robot.id&gt;</code>；它会将
当前关节写入 LeRobot 缓存中按机械臂区分的文件
（<code>HF_LEROBOT_HOME/reset_poses/&lt;robot.name&gt;/&lt;robot.id&gt;.json</code>，与 calibration 类似地按 key 索引），该文件会在下次运行时
优先于内置默认值。由于它位于用户本地缓存（而非
仓库）中，你的覆盖会保留在你的机器上，且 <code>teleoperate</code> 和 <code>record</code> 在以相同 <code>--robot.id</code> 启动时
都会遵循它。</p> <p>另一个设备 <code>--teleop.type=so101_leader</code> 通过一个可反向驱动的
SO-101 <em>leader arm</em> 1:1 镜像 follower arm，该 leader arm 的关节由 Isaac Teleop 的原生 <code>so101_leader</code> 插件流式传输（无
离合器、无 IK — leader arm 和 follower arm 共享 SO-101 运动学）。</p> <p><code>so101_leader_plugin</code> 二进制文件是一个 C++ 插件，<strong>不</strong>属于 <code>isaacteleop</code> pip
包 — 你需要从 Isaac Teleop 源码树构建它。请遵循 <a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/build_from_source/index.html" rel="nofollow">从源码构建 Isaac Teleop</a> （简而言之，在你的 Isaac Teleop 检出目录中：<code>cmake -B build && cmake --build build --parallel && cmake --install build</code>); the build installs the plugins under <code>&lt;IsaacTeleop&gt;/install/plugins/</code>，这样
二进制文件会落在 <code>install/plugins/so101_leader/so101_leader_plugin</code> — 即下文的 <code>--launch_plugin</code> 路径。
有关其串口/calibration 细节，请参阅插件自带的 <code>README.md</code>（紧挨二进制文件）。</p> <p>将 <code>--teleop.port</code> 指向物理 leader arm 的串口，将 <code>--launch_plugin</code> 指向该插件
二进制文件，使脚本在 CloudXR 启动后生成它：</p> <!> <p>（注意这里的 <code>so101_leader</code> 是 <em>Isaac</em> leader arm，针对 Isaac Teleop 设备
注册表解析，不同于 <code>lerobot-teleoperate</code> 的串口 <code>so101_leader</code>。）当设置了 <code>--teleop.port</code> 时，
插件的 tick→弧度 calibration 会从 <code>--teleop.id</code> 推断并作为第三个位置参数传递给插件
— 即 <code>HF_LEROBOT_CALIBRATION/teleoperators/so_leader/&lt;id&gt;.json</code> 处的 LeRobot 格式 JSON，与串口 SO-101 leader arm
使用的文件相同（<code>lerobot-calibrate --teleop.type=so101_leader --teleop.id=&lt;id&gt;</code>）。如果缺失，脚本会
警告，插件使用内置默认值。运行 <code>python -m examples.isaac_teleop_to_so101.teleoperate --help</code> 查看所有标志。其
启动安全约定：默认情况下，follower arm 会在 <code>--align_duration</code> 秒内
平滑转动到 leader arm 的首次读数（<code>--align=false</code> 可跳过），这样
镜像开始时机械臂不会猛动；当 leader arm 流过期时，follower arm 会
保持在其实测姿态。</p> <p>URDF 获取使用 <code>huggingface_hub</code>（已是 LeRobot 依赖）访问公共 <code>lerobot/robot-urdfs</code> bucket，因此无需登录。它缓存在 <code>HF_LEROBOT_HOME/robot-urdfs/so101/</code> 下；删除该文件夹可强制重新下载。</p> <p>然后，在你的头显中：挤压并按住握持键以接合，移动控制器来驱动
机械臂，扭转/倾斜控制器来调整腕部姿态，按下扳机关闭 gripper
（按比例 — 松开即张开）。</p> <p>要录制 dataset（而不仅仅是 teleoperation），请使用同一文件夹中的 <code>record.py</code>。它根据 <code>--teleop.type</code>（<code>xr_controller</code> | <code>so101_leader</code>）分派，与 <code>teleoperate.py</code> 完全一样，因此任一设备
都可以驱动 follower arm；它还会将指令关节保存到 LeRobot dataset（<code>lerobot-record</code> 风格的 <code>--dataset.*</code> 标志）。完整的 CLI 和键盘录制快捷键请参阅其模块 docstring。</p> <!> <p>离合器已生成绝对基座坐标系姿态，因此处理器侧是一条薄的 <strong>绝对姿态</strong>路径 — 没有坐标系重映射、没有增量累积，也没有 <code>EEReferenceAndDelta</code> 阶段。</p> <ul><li><p><code>MapXRControllerActionToRobotAction</code> 是从设备输出到
IK 输入契约的无 state 逐帧映射。它写入绝对基座坐标系位置，将绝对
姿态编码为旋转向量目标，并将闭合度反转为电机 gripper 目标：</p> <!> <p>gripper 极性（<code>100 = open, 0 = closed</code>）是源码中的硬件 calibration 约定 — 如果 gripper 在应闭合时张开，请在源码中将其翻转。</p></li> <li><p><code>EEBoundsAndSafety</code> 将 EE 限制在工作空间内，并对逐帧跳变进行速率限制。离合器的
无瞬移特性使帧间变化较小，因此 <code>max_ee_step_m</code> 主要捕获瞬态的控制器跟踪
故障。z 下限为 <code>0.0</code>（桌面平面），因此异常目标无法驱动 EE 低于
桌面；x/y 保持在宽松的 <code>[-1, 1]</code> 米盒范围内。设置 <code>raise_on_jump=False</code> 使超限的帧被 <strong>钳制并警告</strong>而不是抛出异常 — 循环中途崩溃会让机械臂失控：</p> <!></li> <li><p><code>InverseKinematicsEEToJoints(initial_guess_current_joints=False, orientation_weight=0.01)</code> 求解
闭环 Placo IK。SO‑101 是 5 自由度机械臂，因此 IK 以位置为主；较小的 <code>orientation_weight</code> 让它柔和地跟踪 <code>ee.w*</code> 中携带的姿态目标，从而腕部
跟随手部，而欠定的滚转按设计保持部分跟踪。这里<strong>没有</strong> <code>GripperVelocityToJoint</code>：绝对 <code>ee.gripper_pos</code> 直接传递给 <code>gripper.pos</code>。 <code>initial_guess_current_joints=False</code> 每次求解都从<strong>上一次 IK 解</strong>热启动，
而不是从实测关节重新播种，因此关节轨迹在帧与帧之间保持连续。
在硬件上调整 <code>orientation_weight</code> — 太高会与位置跟踪冲突，太低
则会忽略姿态指令。</p></li></ul> <p>该示例还在循环层面进行安全门控：在启动复位平滑转动之后（默认开启 —
传入 <code>--reset_to_origin=false</code> 可使机械臂保持在原位），它<strong>仅在离合器接合时</strong> 向机器人发送指令，并在断开时重新发送实测关节，因此松开
离合器会使机械臂冻结在原位。</p> <p>有关将流水线适配到其他机器人的更多信息，请参阅<a href="./processors_robots_teleop">机器人和 teleoperator 处理器</a>指南。</p> <!> <ul><li><strong><code>ModuleNotFoundError: isaacteleop</code></strong> — 活动环境中未安装 <code>isaacteleop</code> 包。请重新运行本指南顶部的安装命令： <code>uv pip install "isaacteleop[cloudxr,retargeters-lite]~=1.3.131"</code>。</li> <li><strong>未找到控制器</strong> — 确保 CloudXR 运行时正在运行、防火墙端口
已加入白名单、头显已连接（参见 <a href="#set-up-cloudxr-and-connect-a-headset">设置 CloudXR 并连接头显</a>和 Isaac
Teleop <a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/quick_start.html" rel="nofollow">快速开始</a>）。</li> <li><strong>CloudXR 自动启动失败</strong> — 如果运行时未能在启动超时内
启动，<code>connect()</code> 会抛出 <code>RuntimeError</code>。查看 <code>~/.cloudxr/logs</code> 下的启动器日志。常见
原因：从未接受 EULA（以交互方式运行一次 <code>python -m isaacteleop.cloudxr --accept-eula</code> — 自动启动会在 stdin 上提示并在无头环境下挂起），或运行时已在
外部运行（设置 <code>LEROBOT_CLOUDXR_SKIP_AUTOLAUNCH=1</code> 或 <code>auto_launch_cloudxr=False</code> 以
跳过自动启动）。</li> <li><strong>机械臂不移动</strong> — 离合器是安全手柄：你必须将挤压/握持按住超过 <code>clutch_threshold</code>。如果你的控制器挤压值报告偏软，请降低阈值。</li> <li><strong>运动感觉不对齐</strong> — 确认头显/游玩空间的朝向。控制器流
由 <code>XRControllerConfig</code> 上的 <code>base_T_anchor</code> 变换重基到机器人基座坐标系
（默认：标准 OpenXR → 机器人轴约定）；如果你的锚点坐标系不同，请调整它。</li></ul> <!> <p>NVIDIA Isaac Teleop 文档（<a href="https://nvidia.github.io/IsaacTeleop/" rel="nofollow">文档主页</a>、 <a href="https://github.com/NVIDIA/IsaacTeleop" rel="nofollow">GitHub</a>）：</p> <ul><li><a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/quick_start.html" rel="nofollow">快速开始</a> —
安装、运行 CloudXR 服务器、连接头显、运行 teleoperation 示例。</li> <li><a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/teleop_session.html" rel="nofollow">TeleopSession</a> — <code>XRController</code> 封装的会话 API。</li> <li><a href="https://nvidia.github.io/IsaacTeleop/main/references/retargeting/index.html" rel="nofollow">重定向接口</a> 和<a href="https://nvidia.github.io/IsaacTeleop/main/overview/architecture.html" rel="nofollow">架构概览</a> —
源节点和重定向器如何组合成流水线。</li> <li><a href="https://nvidia.github.io/IsaacTeleop/main/getting_started/build_from_source/index.html" rel="nofollow">从源码构建</a> —
从本地检出构建 <code>isaacteleop</code>（及其 C++ 插件，包括上文使用的 <code>so101_leader</code> 插件）。</li> <li><a href="https://nvidia.github.io/IsaacTeleop/main/references/requirements.html" rel="nofollow">系统要求</a>和 <a href="https://docs.nvidia.com/cloudxr-sdk" rel="nofollow">CloudXR SDK 文档</a> — 支持的平台、GPU、
CloudXR/OpenXR 运行时版本和头显。</li></ul> <!> <p></p>`,1);function ce(V,N){Q(N,!1),z(()=>{new URLSearchParams(window.location.search).get("fw")}),k();var n=$();F("9df6t8",v=>{var B=P();H(B,"content",K),G(v,B)});var r=e(D(n),2);L(r,{containerStyle:"float: right; margin-left: 10px; display: inline-flex; position: relative; z-index: 10;"});var i=e(r,2);o(i,{title:"Isaac Teleop",local:"isaac-teleop",headingTag:"h1"});var p=e(i,10);o(p,{title:"安装",local:"安装",headingTag:"h2"});var M=e(p,4);l(M,{code:"Z2l0JTIwY2xvbmUlMjBodHRwcyUzQSUyRiUyRmdpdGh1Yi5jb20lMkZodWdnaW5nZmFjZSUyRmxlcm9ib3QuZ2l0JTBBY2QlMjBsZXJvYm90JTBBdXYlMjBwaXAlMjBpbnN0YWxsJTIwLWUlMjAlMjIuJTVCZmVldGVjaCUyQ2tpbmVtYXRpY3MlMkNkYXRhc2V0JTVEJTIyJTIwJTIyaHVnZ2luZ2ZhY2VfaHViJTNFJTNEMS41JTIyJTBBdXYlMjBwaXAlMjBpbnN0YWxsJTIwJTIyaXNhYWN0ZWxlb3AlNUJjbG91ZHhyJTJDcmV0YXJnZXRlcnMtbGl0ZSU1RH4lM0QxLjMuMTMxJTIyJTIwJTIyc2NpcHklM0UlM0QxLjE0JTIy",highlighted:`git <span class="hljs-built_in">clone</span> https://github.com/huggingface/lerobot.git
<span class="hljs-built_in">cd</span> lerobot
uv pip install -e <span class="hljs-string">&quot;.[feetech,kinematics,dataset]&quot;</span> <span class="hljs-string">&quot;huggingface_hub&gt;=1.5&quot;</span>
uv pip install <span class="hljs-string">&quot;isaacteleop[cloudxr,retargeters-lite]~=1.3.131&quot;</span> <span class="hljs-string">&quot;scipy&gt;=1.14&quot;</span>`,lang:"bash",wrap:!1});var T=e(M,4);l(T,{code:"dXYlMjBwaXAlMjBpbnN0YWxsJTIwJTIyaXNhYWN0ZWxlb3AlNUJyZXRhcmdldGVycyU1RH4lM0QxLjMuMTMxJTIy",highlighted:'uv pip install <span class="hljs-string">&quot;isaacteleop[retargeters]~=1.3.131&quot;</span>',lang:"bash",wrap:!1});var g=e(T,2);o(g,{title:"设置 CloudXR 并连接头显",local:"设置-cloudxr-并连接头显",headingTag:"h3"});var h=e(g,6);l(h,{code:"cHl0aG9uJTIwLW0lMjBpc2FhY3RlbGVvcC5jbG91ZHhyJTIwLS1hY2NlcHQtZXVsYSUyMCUyMCUyMCUyMyUyMG9uZS10aW1lJTNBJTIwYWNjZXB0JTIwdGhlJTIwQ2xvdWRYUiUyMEVVTEE=",highlighted:'python -m isaacteleop.cloudxr --accept-eula   <span class="hljs-comment"># one-time: accept the CloudXR EULA</span>',lang:"bash",wrap:!1});var J=e(h,10);l(J,{code:"ZXhwb3J0JTIwTEVST0JPVF9DTE9VRFhSX1NLSVBfQVVUT0xBVU5DSCUzRDE=",highlighted:'<span class="hljs-built_in">export</span> LEROBOT_CLOUDXR_SKIP_AUTOLAUNCH=1',lang:"bash",wrap:!1});var j=e(J,8);l(j,{code:"dGVsZW9wX2RldmljZS5jb25uZWN0KCklMEF0cnklM0ElMEElMjAlMjAlMjAlMjB3aGlsZSUyMFRydWUlM0ElMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjBhY3Rpb24lMjAlM0QlMjB0ZWxlb3BfZGV2aWNlLmdldF9hY3Rpb24oKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMyUyMC4uLiUyMGRyaXZlJTIwdGhlJTIwcm9ib3QlMjAuLi4lMEFmaW5hbGx5JTNBJTBBJTIwJTIwJTIwJTIwdGVsZW9wX2RldmljZS5kaXNjb25uZWN0KCk=",highlighted:`teleop_device.connect()
<span class="hljs-keyword">try</span>:
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        action = teleop_device.get_action()
        <span class="hljs-comment"># ... drive the robot ...</span>
<span class="hljs-keyword">finally</span>:
    teleop_device.disconnect()`,lang:"python",wrap:!1});var u=e(j,4);o(u,{title:"工作原理",local:"工作原理",headingTag:"h2"});var I=e(u,12);l(I,{code:"JTIwJTIwVlIlMjBjb250cm9sbGVyJTIwKE9wZW5YUiklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTYlQkMlMEElMjAlMjBYUkNvbnRyb2xsZXIuZ2V0X2FjdGlvbigpJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJUUyJTk0JTgwJUUyJTk0JTgwJTIwcmF3JTIwYmFzZS1mcmFtZSUyMGdyaXBfcG9zJTIwJTJGJTIwZ3JpcF9xdWF0JTIwJTJCJTIwc3F1ZWV6ZSUyMCUyQiUyMHRyaWdnZXIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODIlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAoVGVsZW9wU2Vzc2lvbiUyMGFsd2F5cyUyMHN0ZXBwZWQlMjBSVU5OSU5HJTNCJTIwY2x1dGNoJTIwbGl2ZXMlMjBkb3duc3RyZWFtKSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCVFMiU5NiVCQyUwQSUyMCUyMENsdXRjaC5yZWJhc2UoZ3JpcF9wb3MlMkMlMjBncmlwX3F1YXQpJTIwJUUyJTk0JTgwJUUyJTk0JTgwJTIwZW5nYWdlLXJlbGF0aXZlJTIwZGVsdGElMjBhcHBsaWVkJTIwdG8lMjB0aGUlMjBFRSUyMGhvbWUlMjAocG9zJTIwJTJCJTIwb3JpZW50KSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCVFMiU5NCU4MiUyMCUyMGVlX3Bvc2UlMjAoNyklMjAlMkYlMjBjbG9zZWRuZXNzJTIwJTIwJTIwJTIwJTIwJTIwJTIwJUUyJTg2JTkyJTIwYWJzb2x1dGUlMjBlZV9wb3NlJTNCJTIwY2xvc2VkbmVzcyUyMCUzRCUyMHRyaWdnZXIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTYlQkMlMEElMjAlMjBNYXBYUkNvbnRyb2xsZXJBY3Rpb25Ub1JvYm90QWN0aW9uJTIwJUUyJTk0JTgwJUUyJTk0JTgwJTIwYWJzb2x1dGUlMjBlZS54JTJGeSUyRnolM0IlMjBlZS53KiUyMCUzRCUyMG9yaWVudGF0aW9uJTIwcm90dmVjJTIwdGFyZ2V0JTNCJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJUUyJTk0JTgyJTIwJTIwZWUueCUyRnklMkZ6JTIwJTJGJTIwZWUudyolMjAlMkYlMjBlZS5ncmlwcGVyX3BvcyUyMCUyMCUyMGVlLmdyaXBwZXJfcG9zJTIwJTNEJTIwKDElMjAtJTIwY2xvc2VkbmVzcyklMjAqJTIwMTAwJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJUUyJTk2JUJDJTBBJTIwJTIwRUVCb3VuZHNBbmRTYWZldHklMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODAlRTIlOTQlODAlMjB3b3Jrc3BhY2UlMjBjbGlwJTIwJTJCJTIwcGVyLWZyYW1lJTIwc3RlcCUyMGNsYW1wJTIwKGNsYW1wJTJCd2FybiklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODIlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTYlQkMlMEElMjAlMjBJbnZlcnNlS2luZW1hdGljc0VFVG9Kb2ludHMlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODAlRTIlOTQlODAlMjBjbG9zZWQtbG9vcCUyMFBsYWNvJTIwSUslM0IlMjBwb3NpdGlvbiUyMCUyQiUyMHNvZnQtb3JpZW50YXRpb24lMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTQlODIlMjAlMjAob3JpZW50YXRpb25fd2VpZ2h0JTNEMC4wMSklMjAlMjAlMjAocGFzc2VzJTIwZWUuZ3JpcHBlcl9wb3MlMjAlRTIlODYlOTIlMjBncmlwcGVyLnBvcyklMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlRTIlOTYlQkMlMEElMjAlMjBTTy0xMDElMjBmb2xsb3dlciUyMGpvaW50JTIwdGFyZ2V0cw==",highlighted:`  VR controller (OpenXR)
        │
        ▼
  XRController.get_action()          ── raw base-frame grip_pos / grip_quat + squeeze + trigger
        │                                (TeleopSession always stepped RUNNING; clutch lives downstream)
        ▼
  Clutch.rebase(grip_pos, grip_quat) ── engage-relative delta applied to the EE home (pos + orient)
        │  ee_pose (7) / closedness       → absolute ee_pose; closedness = trigger
        ▼
  MapXRControllerActionToRobotAction ── absolute ee.x/y/z; ee.w* = orientation rotvec target;
        │  ee.x/y/z / ee.w* / ee.gripper_pos   ee.gripper_pos = (1 - closedness) * 100
        ▼
  EEBoundsAndSafety                ── workspace clip + per-frame step clamp (clamp+warn)
        │
        ▼
  InverseKinematicsEEToJoints      ── closed-loop Placo IK; position + soft-orientation
        │  (orientation_weight=0.01)   (passes ee.gripper_pos → gripper.pos)
        ▼
  SO-101 follower joint targets`,lang:"text",wrap:!1});var w=e(I,2);o(w,{title:"离合器：由示例循环拥有",local:"离合器由示例循环拥有",headingTag:"h3"});var y=e(w,6);o(y,{title:"控制",local:"控制",headingTag:"h2"});var b=e(y,4);o(b,{title:"开始使用",local:"开始使用",headingTag:"h2"});var m=e(b,2);o(m,{title:"步骤 1：创建 teleoperator",local:"步骤-1创建-teleoperator",headingTag:"h3"});var U=e(m,2);l(U,{code:"JTIzJTIwUnVuJTIwZnJvbSUyMHRoZSUyMHJlcG8lMjByb290JTIwc28lMjB0aGUlMjAlNjBleGFtcGxlcyU2MCUyMHBhY2thZ2UlMjBpcyUyMGltcG9ydGFibGUuJTBBZnJvbSUyMGV4YW1wbGVzLmlzYWFjX3RlbGVvcF90b19zbzEwMS5pc2FhY190ZWxlb3AlMjBpbXBvcnQlMjBYUkNvbnRyb2xsZXIlMkMlMjBYUkNvbnRyb2xsZXJDb25maWclMEElMEF0ZWxlb3BfY29uZmlnJTIwJTNEJTIwWFJDb250cm9sbGVyQ29uZmlnKCUwQSUyMCUyMCUyMCUyMGhhbmRfc2lkZSUzRCUyMnJpZ2h0JTIyJTJDJTIwJTIwJTIwJTIwJTIwJTIwJTIzJTIwJTIybGVmdCUyMiUyMG9yJTIwJTIycmlnaHQlMjIlMjBjb250cm9sbGVyJTBBJTIwJTIwJTIwJTIwY2x1dGNoX3RocmVzaG9sZCUzRDAuNSUyQyUyMCUyMCUyMCUyMyUyMHNxdWVlemUlMjB2YWx1ZSUyMGFib3ZlJTIwd2hpY2glMjB0aGUlMjBjbHV0Y2glMjBlbmdhZ2VzJTBBKSUwQXRlbGVvcF9kZXZpY2UlMjAlM0QlMjBYUkNvbnRyb2xsZXIodGVsZW9wX2NvbmZpZyk=",highlighted:`<span class="hljs-comment"># Run from the repo root so the \`examples\` package is importable.</span>
<span class="hljs-keyword">from</span> examples.isaac_teleop_to_so101.isaac_teleop <span class="hljs-keyword">import</span> XRController, XRControllerConfig

teleop_config = XRControllerConfig(
    hand_side=<span class="hljs-string">&quot;right&quot;</span>,      <span class="hljs-comment"># &quot;left&quot; or &quot;right&quot; controller</span>
    clutch_threshold=<span class="hljs-number">0.5</span>,   <span class="hljs-comment"># squeeze value above which the clutch engages</span>
)
teleop_device = XRController(teleop_config)`,lang:"python",wrap:!1});var A=e(U,4);o(A,{title:"步骤 2：连接",local:"步骤-2连接",headingTag:"h3"});var _=e(A,4);o(_,{title:"步骤 3：运行示例",local:"步骤-3运行示例",headingTag:"h3"});var R=e(_,6);l(R,{code:"cHl0aG9uJTIwLW0lMjBleGFtcGxlcy5pc2FhY190ZWxlb3BfdG9fc28xMDEudGVsZW9wZXJhdGUlMjAtLXJvYm90LnR5cGUlM0RzbzEwMV9mb2xsb3dlciUyMC0tcm9ib3QucG9ydCUzRCUyRmRldiUyRnR0eUFDTTAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJvYm90LmlkJTNEc28xMDFfZm9sbG93ZXJfYXJtJTIwLS10ZWxlb3AudHlwZSUzRHhyX2NvbnRyb2xsZXI=",highlighted:`python -m examples.isaac_teleop_to_so101.teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \\
    --robot.id=so101_follower_arm --teleop.type=xr_controller`,lang:"bash",wrap:!1});var C=e(R,12);l(C,{code:"cHl0aG9uJTIwLW0lMjBleGFtcGxlcy5pc2FhY190ZWxlb3BfdG9fc28xMDEudGVsZW9wZXJhdGUlMjAtLXJvYm90LnR5cGUlM0RzbzEwMV9mb2xsb3dlciUyMC0tcm9ib3QucG9ydCUzRCUyRmRldiUyRnR0eUFDTTAlMjAlNUMlMEElMjAlMjAlMjAlMjAtLXJvYm90LmlkJTNEc28xMDFfZm9sbG93ZXJfYXJtJTIwLS10ZWxlb3AudHlwZSUzRHNvMTAxX2xlYWRlciUyMCU1QyUwQSUyMCUyMCUyMCUyMC0tdGVsZW9wLnBvcnQlM0QlMkZkZXYlMkZ0dHlBQ00xJTIwLS10ZWxlb3AuaWQlM0RzbzEwMV9sZWFkZXJfYXJtJTIwJTVDJTBBJTIwJTIwJTIwJTIwLS1sYXVuY2hfcGx1Z2luJTNEJTJGY29kZSUyRlRlbGVvcCUyRmluc3RhbGwlMkZwbHVnaW5zJTJGc28xMDFfbGVhZGVyJTJGc28xMDFfbGVhZGVyX3BsdWdpbg==",highlighted:`python -m examples.isaac_teleop_to_so101.teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \\
    --robot.id=so101_follower_arm --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM1 --teleop.id=so101_leader_arm \\
    --launch_plugin=/code/Teleop/install/plugins/so101_leader/so101_leader_plugin`,lang:"bash",wrap:!1});var f=e(C,10);o(f,{title:"重要的流水线步骤和选项",local:"重要的流水线步骤和选项",headingTag:"h2"});var t=e(f,4),c=a(t),S=e(a(c),2);l(S,{code:"YWN0aW9uJTVCJTIyZWUueCUyMiU1RCUyQyUyMGFjdGlvbiU1QiUyMmVlLnklMjIlNUQlMkMlMjBhY3Rpb24lNUIlMjJlZS56JTIyJTVEJTIwJTNEJTIwZWVfcG9zZSU1QiUzQTMlNUQlMjAlMjAlMjAlMjMlMjBhYnNvbHV0ZSUyQyUyMGJhc2UlMjBmcmFtZSUyMCU1Qm0lNUQlMEFhY3Rpb24lNUIlMjJlZS53eCUyMiU1RCUyQyUyMGFjdGlvbiU1QiUyMmVlLnd5JTIyJTVEJTJDJTIwYWN0aW9uJTVCJTIyZWUud3olMjIlNUQlMjAlM0QlMjBvcmllbnRfcm90dmVjJTIwJTIwJTIzJTIwb3JpZW50YXRpb24lMjB0YXJnZXQlMjAocm90dmVjKSUwQWFjdGlvbiU1QiUyMmVlLmdyaXBwZXJfcG9zJTIyJTVEJTIwJTNEJTIwKDElMjAtJTIwY2xvc2VkbmVzcyklMjAqJTIwMTAwJTIwJTIwJTIwJTIzJTIwbW90b3IlMjB1bml0cyUzQiUyMFNPLTEwMSUyMGNhbGlicmF0ZXMlMjAxMDAlMjAlM0QlMjBvcGVu",highlighted:`action[<span class="hljs-string">&quot;ee.x&quot;</span>], action[<span class="hljs-string">&quot;ee.y&quot;</span>], action[<span class="hljs-string">&quot;ee.z&quot;</span>] = ee_pose[:<span class="hljs-number">3</span>]   <span class="hljs-comment"># absolute, base frame [m]</span>
action[<span class="hljs-string">&quot;ee.wx&quot;</span>], action[<span class="hljs-string">&quot;ee.wy&quot;</span>], action[<span class="hljs-string">&quot;ee.wz&quot;</span>] = orient_rotvec  <span class="hljs-comment"># orientation target (rotvec)</span>
action[<span class="hljs-string">&quot;ee.gripper_pos&quot;</span>] = (<span class="hljs-number">1</span> - closedness) * <span class="hljs-number">100</span>   <span class="hljs-comment"># motor units; SO-101 calibrates 100 = open</span>`,lang:"python",wrap:!1}),s(2),d(c);var Z=e(c,2),W=e(a(Z),2);l(W,{code:"RUVCb3VuZHNBbmRTYWZldHkoJTBBJTIwJTIwJTIwJTIwZW5kX2VmZmVjdG9yX2JvdW5kcyUzRCU3QiUyMm1pbiUyMiUzQSUyMCU1Qi0xLjAlMkMlMjAtMS4wJTJDJTIwMC4wJTVEJTJDJTIwJTIybWF4JTIyJTNBJTIwJTVCMS4wJTJDJTIwMS4wJTJDJTIwMS4wJTVEJTdEJTJDJTBBJTIwJTIwJTIwJTIwbWF4X2VlX3N0ZXBfbSUzRDAuMTAlMkMlMEElMjAlMjAlMjAlMjByYWlzZV9vbl9qdW1wJTNERmFsc2UlMkMlMEEp",highlighted:`EEBoundsAndSafety(
    end_effector_bounds={<span class="hljs-string">&quot;min&quot;</span>: [-<span class="hljs-number">1.0</span>, -<span class="hljs-number">1.0</span>, <span class="hljs-number">0.0</span>], <span class="hljs-string">&quot;max&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>, <span class="hljs-number">1.0</span>]},
    max_ee_step_m=<span class="hljs-number">0.10</span>,
    raise_on_jump=<span class="hljs-literal">False</span>,
)`,lang:"python",wrap:!1}),d(Z),s(2),d(t);var X=e(t,6);o(X,{title:"故障排查",local:"故障排查",headingTag:"h2"});var E=e(X,4);o(E,{title:"了解更多",local:"了解更多",headingTag:"h2"});var Y=e(E,6);O(Y,{source:"https://github.com/huggingface/lerobot/blob/main/docs/source/isaac_teleop.mdx"}),s(2),G(V,n),q()}export{ce as component};
