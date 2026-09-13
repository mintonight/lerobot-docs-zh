#!/usr/bin/env python
"""Keep selected technical terms in English inside the Chinese translations ("英文优先").

Rewrites the `zh` fields of tools/units_zh/*.json and the titles of tools/toctree_zh.yml:
- ordered term/phrase replacements (longest compounds first)
- CJK/Latin spacing normalization so mixed text reads cleanly
- a small protection list for cases where the Chinese word does not mean the term

The pure-Chinese variant is kept at tools/units_zh_zhonly/ as a backup.
"""

from __future__ import annotations

import collections
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UNITS = ROOT / "tools" / "units_zh"
TOCTREE = ROOT / "tools" / "toctree_zh.yml"

# ordered: compounds / collocations first, then the bare terms
REPLACEMENTS: list[tuple[str, str]] = [
    # multi-word collocations
    ("动作分块", "action chunking"),
    ("动作词元", "action token"),
    ("动作空间", "action space"),
    ("动作序列", "action sequence"),
    ("动作专家", "action expert"),
    ("动作预测", "action prediction"),
    ("动作表示", "action representation"),
    ("动作块", "action chunk"),
    ("相对动作", "relative action"),
    ("绝对动作", "absolute action"),
    ("状态空间", "state space"),
    ("状态向量", "state vector"),
    ("观测空间", "observation space"),
    ("策略服务器", "policy server"),
    ("策略网络", "policy network"),
    ("策略梯度", "policy gradient"),
    ("策略学习", "policy learning"),
    ("策略部署", "policy deployment"),
    ("回合索引", "episode index"),
    ("仿真环境", "simulation environment"),
    ("异步推理", "async inference"),
    ("实时推理", "real-time inference"),
    ("推理后端", "inference backend"),
    ("推理延迟", "inference latency"),
    # verb usages / collocations that should not become the noun
    ("校准机器人", "calibrate 机器人"),
    ("校准机械臂", "calibrate 机械臂"),
    ("校准机器", "calibrate 机器"),
    ("校准手臂", "calibrate 手臂"),
    ("校准肢体", "calibrate 肢体"),
    ("校准主臂", "calibrate 主臂"),
    ("校准从臂", "calibrate 从臂"),
    ("校准 Hope", "calibrate Hope"),
    ("校准 SO", "calibrate SO"),
    ("校准它", "calibrate 它"),
    ("校准每个", "calibrate 每个"),
    ("校准你的", "calibrate 你的"),
    ("需要校准", "需要 calibrate"),
    ("必须校准", "必须 calibrate"),
    ("重新校准", "重新 calibrate"),
    ("手动校准", "手动 calibrate"),
    ("无法校准", "无法 calibrate"),
    ("来校准", "来 calibrate"),
    ("先校准", "先 calibrate"),
    ("并校准", "并 calibrate"),
    ("未校准", "未 calibrate"),
    ("可以校准", "可以 calibrate"),
    # bare terms
    ("检查点", "checkpoint"),
    ("基准测试", "benchmark"),
    ("基准", "benchmark"),
    ("遥操作设备", "teleoperator"),
    ("遥操作", "teleoperation"),
    ("主臂", "leader arm"),
    ("从臂", "follower arm"),
    ("夹爪", "gripper"),
    ("末端执行器", "end-effector"),
    ("校准", "calibration"),
    ("演示", "demonstration"),
    ("仿真", "simulation"),
    ("观测", "observation"),
    ("动作", "action"),
    ("状态", "state"),
    ("推理", "inference"),
    ("微调", "fine-tune"),
    ("词元", "token"),
    ("回合", "episode"),
    ("部署运行", "rollout"),
    ("策略", "policy"),
    ("数据集", "dataset"),
]

# Chinese words that must NOT be rewritten (different meaning / verb usage)
PROTECT = [
    "运行状态",
    "观测到",
    "演示了",
    "演示如何",
    "演示录制",
    "演示随机",
    "遥操作机",
]

# whole-title translations for toctree category entries
TOCTREE_SPECIAL = {
    "策略": "Policies",
    "数据集": "Datasets",
    "推理": "Inference",
    "仿真": "Simulation",
    "基准测试": "Benchmarks",
    "遥操作设备": "Teleoperators",
}

CJK = r"\u3400-\u4dbf\u4e00-\u9fff"
LATINISH = r"A-Za-z0-9\u0370-\u03ff"


def normalize_spacing(text: str) -> str:
    text = re.sub(rf"(?<=[{CJK}])(?=[{LATINISH}])", " ", text)
    text = re.sub(rf"(?<=[{LATINISH}])(?=[{CJK}])", " ", text)
    # keep tokens (⟦n⟧) attached like code spans: a space on either side
    text = re.sub(rf"(?<=[{CJK}])(?=\u27e6)", " ", text)
    text = re.sub(rf"(?<=\u27e7)(?=[{CJK}])", " ", text)
    text = re.sub(rf"(?<=\u27e7)(?=[{LATINISH}])", " ", text)
    text = re.sub(rf"(?<=[{LATINISH}])(?=\u27e6)", " ", text)
    return text


def replace_term(text: str, src: str, dst: str) -> str:
    """Replace `src` with `dst`, padding a space if it would glue onto latin letters/digits."""
    out: list[str] = []
    i = 0
    while True:
        j = text.find(src, i)
        if j < 0:
            out.append(text[i:])
            break
        out.append(text[i:j])
        before = text[j - 1] if j > 0 else ""
        after_idx = j + len(src)
        after = text[after_idx] if after_idx < len(text) else ""
        if before.isascii() and before.isalnum():
            out.append(" ")
        out.append(dst)
        if after.isascii() and after.isalnum():
            out.append(" ")
        i = after_idx
    return "".join(out)


def rewrite(text: str) -> str:
    protected: list[str] = []

    for word in PROTECT:
        if word in text:
            protected.append(word)
            text = text.replace(word, f"\ue100{len(protected) - 1}\ue101")
    for src, dst in REPLACEMENTS:
        text = replace_term(text, src, dst)
    for idx, word in enumerate(protected):
        text = text.replace(f"\ue100{idx}\ue101", word)
    return normalize_spacing(text)


def rewrite_toctree(text: str) -> tuple[str, list[tuple[str, str]]]:
    changes: list[tuple[str, str]] = []
    out_lines = []
    for line in text.split("\n"):
        m = re.match(r'^(\s*title:\s*)("?)(.+?)\2\s*$', line)
        if not m:
            out_lines.append(line)
            continue
        prefix, quote, value = m.group(1), m.group(2), m.group(3)
        new_value = TOCTREE_SPECIAL.get(value)
        if new_value is None:
            new_value = rewrite(value)
        if new_value != value:
            changes.append((value, new_value))
        out_lines.append(f"{prefix}{quote}{new_value}{quote}")
    return "\n".join(out_lines), changes


def main() -> None:
    stats: collections.Counter = collections.Counter()
    changed_units = 0
    total_units = 0
    samples: list[tuple[str, str, str]] = []

    for f in sorted(UNITS.rglob("*.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        for u in data.get("units", []):
            total_units += 1
            zh = u.get("zh", "")
            new = rewrite(zh)
            if new != zh:
                changed_units += 1
                for src, dst in REPLACEMENTS:
                    n = zh.count(src)
                    if n:
                        stats[dst] += n
                if len(samples) < 5 and zh.count("策略") + zh.count("动作") > 0:
                    samples.append((data["file"], zh[:110], new[:110]))
                u["zh"] = new
        f.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8", newline="\n")

    toctree_text = TOCTREE.read_text(encoding="utf-8")
    new_toctree, toc_changes = rewrite_toctree(toctree_text)
    TOCTREE.write_text(new_toctree, encoding="utf-8", newline="\n")

    print(f"{changed_units}/{total_units} units updated")
    print("replacements:", ", ".join(f"{k}×{v}" for k, v in stats.most_common()))
    print(f"toctree titles changed: {len(toc_changes)}")
    for old, new in toc_changes:
        print(f"   {old}  ->  {new}")
    print("samples:")
    for f, old, new in samples:
        print(f"  [{f}]\n    - {old}\n    + {new}")


if __name__ == "__main__":
    sys.exit(main())
