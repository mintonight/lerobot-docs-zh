#!/usr/bin/env python
"""Assemble translated MDX files from translated unit JSON files.

Reads units_en/<rel>.json (produced by extract.py, with original text/offsets/tokens) and
units_zh/<rel>.json (produced by translators: {"file": ..., "units": [{"id": n, "zh": "..."}]}),
restores the opaque tokens and splices the translation back into the original MDX text at the
recorded offsets.

Usage: python inject.py [--src DIR] [--units-en DIR] [--units-zh DIR] [--out DIR] [--only ...]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKEN_RE = re.compile(r"\u27e6(\d+)\u27e7")


def restore_tokens(zh: str, tokens: list[str], where: str) -> str:
    def rep(m: re.Match) -> str:
        idx = int(m.group(1))
        if idx >= len(tokens):
            raise ValueError(f"{where}: token {idx} out of range")
        return tokens[idx]

    out = TOKEN_RE.sub(rep, zh)
    if "\u27e6" in out or "\u27e7" in out:
        raise ValueError(f"{where}: leftover/unbalanced token markers")
    return out


def assemble(original: str, en: dict, zh: dict) -> tuple[str, list[str]]:
    problems: list[str] = []
    en_units = en["units"]
    zh_by_id = {u["id"]: u.get("zh") for u in zh.get("units", [])}
    if set(zh_by_id) != {u["id"] for u in en_units}:
        missing = {u["id"] for u in en_units} - set(zh_by_id)
        extra = set(zh_by_id) - {u["id"] for u in en_units}
        problems.append(f"unit id mismatch (missing={sorted(missing)}, extra={sorted(extra)})")
    pieces = []
    cursor = len(original)
    for u in sorted(en_units, key=lambda u: u["start"], reverse=True):
        if u["end"] > cursor:
            problems.append(f"unit {u['id']} overlaps previous unit")
            continue
        zh_text = zh_by_id.get(u["id"])
        if zh_text is None:
            problems.append(f"unit {u['id']} has no translation")
            continue
        try:
            restored = restore_tokens(zh_text, u["tokens"], f"unit {u['id']}")
        except ValueError as e:
            problems.append(str(e))
            continue
        # token integrity: every token index must appear exactly once
        used = sorted(int(m.group(1)) for m in TOKEN_RE.finditer(zh_text))
        if used != list(range(len(u["tokens"]))):
            problems.append(f"unit {u['id']}: token usage mismatch {used} != {list(range(len(u['tokens'])))}")
        pieces.append((u["start"], u["end"], restored))
        cursor = u["start"]
    text = original
    for start, end, restored in pieces:
        text = text[:start] + restored + text[end:]
    return text, problems


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--src", default=str(ROOT / "tools" / "mdx_en" / "lerobot" / "main" / "en"))
    parser.add_argument("--units-en", default=str(ROOT / "tools" / "units_en"))
    parser.add_argument("--units-zh", default=str(ROOT / "tools" / "units_zh"))
    parser.add_argument("--out", default=str(ROOT / "tools" / "mdx_zh" / "lerobot" / "main" / "en"))
    parser.add_argument("--only", nargs="*", default=None)
    args = parser.parse_args()

    src = Path(args.src)
    units_en = Path(args.units_en)
    units_zh = Path(args.units_zh)
    out = Path(args.out)

    all_problems: list[str] = []
    n_done = 0
    for en_path in sorted(units_en.rglob("*.mdx.json")):
        rel = str(en_path.relative_to(units_en)).replace("\\", "/")[:-len(".json")]
        if args.only and rel not in set(args.only):
            continue
        zh_path = units_zh / (rel + ".json")
        orig = (src / rel).read_text(encoding="utf-8")
        en = json.loads(en_path.read_text(encoding="utf-8"))
        if not zh_path.is_file():
            all_problems.append(f"{rel}: missing translation file")
            continue
        zh = json.loads(zh_path.read_text(encoding="utf-8"))
        text, problems = assemble(orig, en, zh)
        all_problems.extend(f"{rel}: {p}" for p in problems)
        edit_link = (
            f'\n<EditOnGithub source="https://github.com/huggingface/lerobot/blob/main/docs/source/{rel}" />\n'
        )
        marker = "<!--HF DOCBUILD BODY END-->"
        if marker in text:
            text = text.replace(marker, edit_link + "\n" + marker, 1)
        # internal links to ".mdx" pages must be extension-less for the static site router
        text = re.sub(r"\]\(([^)\s]+?)\.mdx(#[^)]+)?\)", r"](\1\2)", text)
        dest = out / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8", newline="\n")
        n_done += 1

    for p in all_problems:
        print("PROBLEM:", p)
    # copy non-mdx files (e.g. _toctree.yml, images) that the site build needs
    import shutil

    toctree_zh = ROOT / "tools" / "toctree_zh.yml"
    for extra in src.rglob("*"):
        if extra.is_file() and extra.suffix != ".mdx":
            dest = out / extra.relative_to(src)
            dest.parent.mkdir(parents=True, exist_ok=True)
            if extra.name == "_toctree.yml" and toctree_zh.is_file():
                shutil.copyfile(toctree_zh, dest)
            else:
                shutil.copyfile(extra, dest)
    print(f"{n_done} files assembled -> {out}, {len(all_problems)} problems")
    sys.exit(1 if all_problems else 0)


if __name__ == "__main__":
    main()
