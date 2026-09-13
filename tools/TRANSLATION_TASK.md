# 翻译任务说明（子 Agent 必读）

目标：把 LeRobot 官方文档（英文，已展开为 MDX 的文本单元）翻译成简体中文。
工作目录：本仓库根目录（以下命令均在仓库根目录执行）

## 输入
- `tools/units_en/<rel>.json`：英文源。结构：
  ```json
  {"file": "index.mdx", "units": [
      {"id": 0, "kind": "heading", "text": "# LeRobot", "tokens": []},
      {"id": 1, "kind": "para", "text": "LeRobot is ⟦0⟧ for ⟦1⟧.", "tokens": ["<a ...>", "..."]},
      ...
  ]}
  ```
  - `text` 是正文，其中 **⟦0⟧ ⟦1⟧ … 是占位符 token**，代表代码片段、链接、URL、HTML/Svelte 标签等，原文在 `tokens` 数组里（**不要翻译 token 内容，绝对不要改动或删除占位符**）。
  - `id` 必须原样保留。

## 输出
对每个分配到的文件，写出 `tools/units_zh/<同样相对路径>.json`，结构**必须**为：
```json
{"file": "index.mdx", "units": [
    {"id": 0, "zh": "翻译后的文本"},
    {"id": 1, "zh": "翻译后的文本"}
]}
```
- **每个 unit 都要有 `zh`，数量与 id 与英文源完全一致**（可以省略 `kind`/`text`/`tokens` 等字段，但 id 和 zh 必须有）。
- 只输出这两个字段即可；不要复制输出英文原文。

## 翻译规则（严格）
1. **占位符 token**：每个 unit 的英文 `text` 里出现的 `⟦0⟧`、`⟦1⟧`…… 在对应的 `zh` 里必须**原样出现且仅出现一次**（token 可以随着中文语序移动，但不可以增删或改写）。验证时程序会逐 token 核对。
2. 只翻译**人类可读的英文正文**。以下内容保持原样（它们本来就在 token 里，也不要凭空制造）：代码、标识符、命令（`lerobot-train` 等）、路径、参数、产品/型号/机器人/论文/模型名称（LeRobot、SO-101、Koch、LeKiwi、ACT、SmolVLA、π₀、GR00T、LIBERO 等）、缩写、URL。
3. 多行 unit：保留原有的换行结构（`\n`）。例如 blockquote 的每一行都必须以 `> ` 开头；列表每行仍以 `- ` 或 `1. ` 等开头。
4. 保留 Markdown 标记：`**加粗**`、`*斜体*`、表格竖线 `|`、GitHub 提示标记（`[!TIP]`、`[!NOTE]`、`[!WARNING]`、`[!IMPORTANT]`、`[!CAUTION]` 必须原样保留）。
5. 标题只翻译标题文字，不要动 `[[...]]`（它们已是 token）。
6. 术语按 `tools/GLOSSARY.md` 统一译法（policy=策略、dataset=数据集、teleoperation=遥操作、leader/follower arm=主臂/从臂 等）。
7. 技术文档语体：简洁、准确、专业，不口语化，不添加额外解释。

## 示例
英文 unit：
```json
{"id": 12, "kind": "list", "text": "- **Train** - a policy ⟦0⟧ learns to imitate your demonstrations.", "tokens": ["(the neural network)"]}
```
正确输出：
```json
{"id": 12, "zh": "- **训练** - 策略⟦0⟧通过模仿你的演示来学习。"}
```
错误示例：
- ❌ 漏掉 `⟦0⟧`，或写成了 `⟦1⟧`，或改成了 `(the neural network)`；
- ❌ 不翻译（中文文件里出现整句英文）。

## 自检（必须做）
写完后运行（把 <文件...> 换成你负责的相对路径，如 `index.mdx api/cameras.mdx`）：
```
python tools/check_zh.py <文件...>
```
必须输出 `0 problems`。若报 token mismatch，逐个修正后重跑，直到通过。

## 注意
- 不要修改 `tools/units_en/`、`tools/mdx_en/`、`source/` 或任何其他目录。
- 不要额外创建说明文件；只在 `tools/units_zh/` 下写分配给你的 JSON。
