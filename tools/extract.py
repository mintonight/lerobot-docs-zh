#!/usr/bin/env python
"""Extract translatable text units from processed MDX files.

Each unit is a paragraph / heading / list item / table row / docstring block whose raw text has
code spans, urls, html tags and svelte expressions replaced with opaque tokens (=> "text"), so a
translator only ever sees prose + tokens. Units are written to one JSON file per MDX file.

Usage: python extract.py [--src DIR] [--out DIR] [--only RELPATH ...]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKEN_L, TOKEN_R = "\u27e6", "\u27e7"  # ⟦ ⟧
TOKEN_RE = re.compile(rf"{TOKEN_L}(\d+){TOKEN_R}")
HEAD_RE = re.compile(r"^#{1,6}\s")
LIST_RE = re.compile(r"^(\s*)([-*+]|\d+\.)\s")
FENCE_RE = re.compile(r"^(```|~~~)")


_COMBINED = re.compile(
    r"(?P<anchor>\[\[[^\]\n]+\]\])"
    r"|(?P<dcode>``.+?``)"
    r"|(?P<icode>`[^`\n]+`)"
    r"|(?P<code><code>.*?</code>)"
    r"|(?P<kbd><kbd>.*?</kbd>)"
    r"|(?P<field><(?:rettype|raisederrors|paramgroups|source|name|anchor)>.*?</(?:rettype|raisederrors|paramgroups|source|name|anchor)>)"
    r"|(?P<img>!\[[^\]]*\]\([^)]*\))"
    r"|(?P<link>\]\([^)\n]+\))"
    r"|(?P<expr>\{[^{}\n]*\})"
    r"|(?P<url>https?://[^\s<>()\[\]\"']+)"
    r"|(?P<tag></?[A-Za-z][^<>]*>)",
    re.DOTALL,
)


def tokenize(text: str) -> tuple[str, list[str]]:
    tokens: list[str] = []

    def add(s: str) -> str:
        tokens.append(s)
        return f"{TOKEN_L}{len(tokens) - 1}{TOKEN_R}"

    def repl(m: re.Match) -> str:
        if m.lastgroup == "link":
            return "](" + add(m.group(0)[2:-1]) + ")"
        return add(m.group(0))

    return _COMBINED.sub(repl, text), tokens


def visible_of(tokenized: str) -> str:
    return TOKEN_RE.sub("", tokenized)


def has_visible_text(s: str) -> bool:
    tokenized, _ = tokenize(s)
    return re.search(r"[A-Za-z]", visible_of(tokenized)) is not None


def is_structural_start(line: str) -> bool:
    s = line.strip()
    if s == "":
        return True
    if FENCE_RE.match(s) or HEAD_RE.match(s) or s.startswith("|"):
        return True
    if re.match(r"^>[ \t]", s):
        return True
    if LIST_RE.match(line):
        return True
    if s.startswith("<Docstring") or s.startswith("HF_DOC_BODY") or s.startswith("<!--"):
        return True
    if s.startswith("<") and not has_visible_text(s):
        return True
    return False


def extract_file(path: Path, rel: str) -> dict | None:
    text = path.read_text(encoding="utf-8")
    lines = text.split("\n")
    offs: list[int] = []
    o = 0
    for ln in lines:
        offs.append(o)
        o += len(ln) + 1

    try:
        start_idx = next(i for i, ln in enumerate(lines) if ln.strip() == "HF_DOC_BODY_START")
        end_idx = next(i for i, ln in enumerate(lines) if ln.strip() == "HF_DOC_BODY_END")
    except StopIteration:
        return None

    units: list[dict] = []

    def add_unit(i: int, j: int, kind: str) -> None:
        raw = "\n".join(lines[i:j])
        tokenized, tokens = tokenize(raw)
        if re.search(r"[A-Za-z]", visible_of(tokenized)) is None:
            return
        units.append(
            {
                "id": len(units),
                "kind": kind,
                "start": offs[i],
                "end": offs[j - 1] + len(lines[j - 1]),
                "text": tokenized,
                "tokens": tokens,
            }
        )

    i = start_idx + 1
    in_fence = False
    while i < end_idx:
        raw = lines[i]
        stripped = raw.strip()
        if in_fence:
            if FENCE_RE.match(stripped):
                in_fence = False
            i += 1
            continue
        if FENCE_RE.match(stripped):
            in_fence = True
            i += 1
            continue
        if stripped == "":
            i += 1
            continue
        if stripped.startswith("<Docstring"):
            i += 1
            continue
        if stripped.startswith("<!--"):
            i += 1
            continue
        mfield = re.match(r"<([a-z]+)>", stripped)
        if mfield and mfield.group(1) in ("paramsdesc", "retdesc", "raises", "returns", "yields", "note", "example"):
            tag = mfield.group(1)
            j = i
            while j < end_idx and f"</{tag}>" not in lines[j]:
                j += 1
            j = min(j + 1, end_idx)
            add_unit(i, j, "docfield")
            i = j
            continue
        if HEAD_RE.match(stripped):
            add_unit(i, i + 1, "heading")
            i += 1
            continue
        if stripped.startswith("|"):
            add_unit(i, i + 1, "table")
            i += 1
            continue
        if re.match(r"^>[ \t]", stripped):
            j = i
            while j < end_idx and re.match(r"^>[ \t]", lines[j].strip()):
                j += 1
            add_unit(i, j, "quote")
            i = j
            continue
        m = LIST_RE.match(raw)
        if m:
            indent = len(m.group(1))
            j = i + 1
            while j < end_idx and not is_structural_start(lines[j]):
                nm = LIST_RE.match(lines[j])
                if nm and len(nm.group(1)) <= indent:
                    break
                j += 1
            add_unit(i, j, "list")
            i = j
            continue
        # paragraph
        j = i + 1
        while j < end_idx and not is_structural_start(lines[j]):
            j += 1
        add_unit(i, j, "para")
        i = j

    return {"file": rel, "units": units}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--src", default=str(ROOT / "tools" / "mdx_en" / "lerobot" / "main" / "en"))
    parser.add_argument("--out", default=str(ROOT / "tools" / "units_en"))
    parser.add_argument("--only", nargs="*", default=None, help="Only these relative paths")
    args = parser.parse_args()

    src = Path(args.src)
    out = Path(args.out)
    files = sorted(p for p in src.rglob("*.mdx"))
    if args.only:
        wanted = {str(Path(o).with_suffix(".mdx")).replace("\\", "/") for o in args.only}
        files = [p for p in files if str(p.relative_to(src)).replace("\\", "/") in wanted]
    if not files:
        sys.exit("no mdx files found")

    total_units = 0
    for path in files:
        rel = str(path.relative_to(src)).replace("\\", "/")
        data = extract_file(path, rel)
        if data is None:
            print(f"skip (no body): {rel}")
            continue
        dest = out / (rel + ".json")
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8", newline="\n")
        total_units += len(data["units"])
    print(f"{len(files)} files, {total_units} translatable units -> {out}")


if __name__ == "__main__":
    main()
