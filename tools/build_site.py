#!/usr/bin/env python
"""Build the static HTML documentation site from a directory of processed MDX files.

Reuses the official doc-builder SvelteKit `kit` (the exact code huggingface.co/docs uses),
skipping the MDX preprocessing step so already-processed (and translated) MDX can be rendered.
"""

import argparse
import json
import shutil
import sys
import tempfile
from pathlib import Path

import yaml

from doc_builder.commands.build import docs_node_env, run_npm, stage_kit_routes
from doc_builder.utils import locate_kit_folder


def flatten_toc(chapters):
    flat = []
    for chapter in chapters:
        flat.append(chapter)
        if chapter.get("sections"):
            flat.extend(flatten_toc(chapter["sections"]))
    return flat


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mdx_dir", help="Directory containing processed .mdx files and _toctree.yml")
    parser.add_argument("out_dir", help="Where to write the built HTML site")
    parser.add_argument("--library", default="lerobot")
    parser.add_argument("--version", default="main")
    parser.add_argument("--language", default="en")
    parser.add_argument("--quiet", action="store_true", help="Capture npm output")
    args = parser.parse_args()

    mdx_dir = Path(args.mdx_dir).resolve()
    out_dir = Path(args.out_dir).resolve()
    if not mdx_dir.is_dir():
        sys.exit(f"mdx dir not found: {mdx_dir}")

    kit_folder = locate_kit_folder()
    print(f"Using kit: {kit_folder}")

    with tempfile.TemporaryDirectory() as tmp_dir:
        kit_dir, routes_dir, _ = stage_kit_routes(kit_folder, tmp_dir, mdx_dir)

        # inject the (translated) table of contents so the sidebar can be rendered at build time
        toc_file = mdx_dir / "_toctree.yml"
        toc = flatten_toc(yaml.safe_load(toc_file.read_text(encoding="utf-8")))
        (routes_dir / "toc.json").write_text(
            json.dumps(toc, ensure_ascii=False), encoding="utf-8", newline="\n"
        )

        print("Installing node dependencies")
        run_npm(["ci"], cwd=kit_dir, quiet=args.quiet)
        print("Building HTML files (this takes a few minutes)")
        run_npm(
            ["run", "build"],
            cwd=kit_dir,
            env=docs_node_env(args.library, args.version, args.language),
            quiet=args.quiet,
        )
        if out_dir.exists():
            shutil.rmtree(out_dir)
        shutil.copytree(kit_dir / "build", out_dir)

        # site links/assets are rooted at /docs/<library>/<version>/<language> (same as the
        # official site), so nest the built files under that prefix for static hosting
        prefix_dir = out_dir / "docs" / args.library / args.version / args.language
        prefix_dir.mkdir(parents=True, exist_ok=True)
        for item in list(out_dir.iterdir()):
            if item.name == "docs":
                continue
            shutil.move(str(item), str(prefix_dir / item.name))

    n_pages = len(list(out_dir.rglob("*.html")))
    print(f"Done. {n_pages} html pages written to {out_dir}")


if __name__ == "__main__":
    main()
