#!/usr/bin/env python
"""Validate translated unit JSON files against the English source.

Checks, for every unit: id present, zh non-empty, opaque tokens ⟦n⟧ used exactly once each
and no stray markers. Also prints a report of leftover latin words for eyeballing.

Usage: python check_zh.py [REL ...]   (e.g. python check_zh.py index.mdx api/cameras.mdx)
       python check_zh.py             (all files that exist in units_zh)
"""

from __future__ import annotations

import collections
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EN = ROOT / "tools" / "units_en"
ZH = ROOT / "tools" / "units_zh"
TOKEN_RE = re.compile(r"\u27e6(\d+)\u27e7")
WORD_RE = re.compile(r"\b[A-Za-z][A-Za-z0-9_.+-]{3,}\b")

ALLOWED = {
    "LeRobot", "Hugging", "Face", "Hub", "HuggingFace", "Python", "PyTorch", "CUDA", "GitHub", "Discord",
    "Linux", "macOS", "Windows", "Colab", "Jupyter", "Isaac", "LIBERO", "RoboTwin", "RoboCasa", "RoboMME",
    "VLABench", "LeIsaac", "LeLab", "WandB", "PyPI", "API", "CLI", "HTTP", "HTTPS", "JSON", "YAML", "YML",
    "OpenCV", "RealSense", "Intel", "Feetech", "Dynamixel", "Damiao", "Unitree", "OpenArm", "SmolVLA",
    "Diffusion", "Policy", "GR00T", "MolmoAct", "WALL", "OSS", "SARM", "ROBOMETER", "TOPReward", "VLA",
    "JEPA", "LingBot", "FAST", "LoRA", "PEFT", "RTC", "ACT", "TDMPC", "VQ", "BeT", "SO", "Koch", "LeKiwi",
    "Hope", "Reachy", "Earth", "Rover", "Mini", "OMX", "rebot", "B601", "DM", "NVIDIA", "Google", "Apple",
    "Ubuntu", "Docker", "Anaconda", "MuJoCo", "Gymnasium", "Gym", "NumPy", "Pandas", "FFmpeg", "OpenAI",
    "vLLM", "CoRL", "arXiv", "BibTeX", "RGB", "USB", "URI", "UUID", "SDK", "CPU", "GPU", "TPU", "SSH",
    "FPS", "MB", "GB", "TB", "ms", "px", "WiFi", "LAN", "URL", "PNG", "JPG", "JPEG", "MP4", "CSV", "YAML.",
    "Tutorial", "TODO", "Note", "Tip", "Warning", "Important", "Caution", "Updated", "Get", "Started",
    "Robots", "Teleoperators", "Cameras", "Motors", "Datasets", "Policies", "Processors", "Environments",
    "Configuration", "Simulation", "Benchmarks", "Resources", "About", "Inference", "Training", "Installation",
    "Overview", "Reference", "Hardware", "Software", "Physics", "World", "Fetch", "Push", "Pick", "Place",
    "Warp", "Kernel", "Flash", "Git", "Makefile", "Jetson", "Raspberry", "Pi", "Arduino", "CAN", "I2C", "UART",
    "TTL", "PWM", "ADC", "IMU", "LED", "LCD", "SDK.", "Nix", "Snap", "Winget", "Homebrew", "Ubuntu.",
    "Swift", "Dockerfile", "Aloha", "ALOHA", "PushT", "Transporter", "ACT.", "SAC", "PPO", "DQN", "RL",
    "IRL", "HIL", "HIL-SERL", "SERL", "MDP", "POMDP", "BC", "MLP", "CNN", "RNN", "LSTM", "ViT", "CLIP",
    "SigLIP", "VLM", "LLM", "Transformer", "Diffuser", "Flow", "Matching", "Score", "SDE", "ODE", "DDPG",
    "Twin", "Delayed", "Gazebo", "PyBullet", "Mujoco", "dm", "Control", "IsaacLab", "Omniverse", "Arena",
    "Sphinx", "Ruff", "Mypy", "Pytest", "Conda", "Venuv", "Micromamba", "Mamba", "Poetry", "Cargo", "Rust",
    "Windows.", "PowerShell", "Bash", "Zsh", "Fish", "TMUX", "Vim", "VSCode", "Cursor", "Copilot",
}


def check(rel: str) -> tuple[list[str], collections.Counter]:
    problems: list[str] = []
    leftovers: collections.Counter = collections.Counter()
    en_path = EN / (rel + ".json")
    zh_path = ZH / (rel + ".json")
    if not en_path.is_file():
        return [f"{rel}: no english file"], leftovers
    if not zh_path.is_file():
        return [f"{rel}: MISSING translation"], leftovers
    try:
        en = json.loads(en_path.read_text(encoding="utf-8"))
        zh = json.loads(zh_path.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        return [f"{rel}: invalid JSON: {e}"], leftovers
    zh_by_id = {u.get("id"): u.get("zh") for u in zh.get("units", [])}
    ids_en = {u["id"] for u in en["units"]}
    if set(zh_by_id) != ids_en:
        missing = sorted(ids_en - set(zh_by_id))
        extra = sorted(set(zh_by_id) - ids_en)
        problems.append(f"{rel}: id mismatch missing={missing} extra={extra}")
    for u in en["units"]:
        z = zh_by_id.get(u["id"])
        if z is None:
            continue
        if not str(z).strip():
            problems.append(f"{rel}#{u['id']}: empty translation")
            continue
        used = sorted(int(m.group(1)) for m in TOKEN_RE.finditer(z))
        if used != list(range(len(u["tokens"]))):
            problems.append(
                f"{rel}#{u['id']}: token mismatch used={used} expected={list(range(len(u['tokens'])))}"
            )
        if "\u27e6" in TOKEN_RE.sub("", z):
            problems.append(f"{rel}#{u['id']}: stray token marker")
        visible = TOKEN_RE.sub(" ", z)
        for w in WORD_RE.findall(visible):
            if w not in ALLOWED and not w.isupper():
                leftovers[w] += 1
    return problems, leftovers


def main() -> None:
    if len(sys.argv) > 1:
        rels = sys.argv[1:]
    else:
        rels = sorted(str(p.relative_to(ZH)).replace("\\", "/")[:-5] for p in ZH.rglob("*.json"))
    all_problems: list[str] = []
    leftovers: collections.Counter = collections.Counter()
    for rel in rels:
        problems, left = check(rel)
        all_problems.extend(problems)
        leftovers.update(left)
    for p in all_problems:
        print("PROBLEM:", p)
    if leftovers:
        print("leftover latin words (top 40, review manually):")
        print("  " + ", ".join(f"{w}×{c}" for w, c in leftovers.most_common(40)))
    print(f"{len(rels)} files checked, {len(all_problems)} problems")
    sys.exit(1 if all_problems else 0)


if __name__ == "__main__":
    main()
