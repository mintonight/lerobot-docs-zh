#!/usr/bin/env python
"""Structural sanity check: translated MDX vs English source.

- header (up to HF_DOC_BODY_START) and footer (from HF_DOC_BODY_END) must be byte-identical
- code fence and <Docstring> counts must match
- no leftover ⟦n⟧ markers anywhere
- CJK presence report
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EN = ROOT / "tools" / "mdx_en" / "lerobot" / "main" / "en"
ZH = ROOT / "tools" / "mdx_zh" / "lerobot" / "main" / "en"
CJK_RE = re.compile(r"[\u4e00-\u9fff]")


def main() -> None:
    problems: list[str] = []
    n_cjk = 0
    files = sorted(EN.rglob("*.mdx"))
    for en_path in files:
        rel = en_path.relative_to(EN)
        zh_path = ZH / rel
        if not zh_path.is_file():
            problems.append(f"{rel}: missing")
            continue
        en = en_path.read_text(encoding="utf-8")
        zh = zh_path.read_text(encoding="utf-8")
        en_head = en.split("HF_DOC_BODY_START", 1)[0] + "HF_DOC_BODY_START"
        zh_head = zh.split("HF_DOC_BODY_START", 1)[0] + "HF_DOC_BODY_START"
        if en_head != zh_head:
            problems.append(f"{rel}: header differs")
        if "HF_DOC_BODY_END" in en and "HF_DOC_BODY_END" in zh:
            en_tail = en.split("HF_DOC_BODY_END", 1)[1]
            zh_tail = zh.split("HF_DOC_BODY_END", 1)[1]
            if en_tail != zh_tail:
                problems.append(f"{rel}: footer differs")
        for pattern, name in [(r"(?m)^\s*```", "fences"), (r"<Docstring", "Docstring")]:
            if len(re.findall(pattern, en)) != len(re.findall(pattern, zh)):
                problems.append(f"{rel}: {name} count mismatch")
        if "\u27e6" in zh:
            problems.append(f"{rel}: leftover token marker")
        if CJK_RE.search(zh):
            n_cjk += 1
    for p in problems:
        print("PROBLEM:", p)
    print(f"{len(files)} files compared, {n_cjk} contain Chinese, {len(problems)} problems")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
