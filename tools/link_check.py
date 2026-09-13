#!/usr/bin/env python
"""Crawl the built site through the local server and report broken internal links/assets.

Usage: python link_check.py [--root site] [--port 8091]
"""

from __future__ import annotations

import argparse
import html.parser
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class LinkParser(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name in ("href", "src") and value:
                self.links.append(value)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default="site")
    parser.add_argument("--port", type=int, default=8091)
    args = parser.parse_args()

    server = subprocess.Popen(
        [sys.executable, str(ROOT / "tools" / "serve_site.py"), "--root", args.root, "--port", str(args.port)],
        cwd=str(ROOT),
    )
    base = f"http://127.0.0.1:{args.port}/docs/lerobot/main/en"
    time.sleep(2)

    failures: list[tuple[str, str]] = []
    checked: set[str] = set()
    queue = [base + "/index.html"]
    pages = 0
    while queue:
        url = queue.pop()
        if url in checked:
            continue
        checked.add(url)
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                body = r.read().decode("utf-8", "replace")
                content_type = r.headers.get("Content-Type", "")
        except urllib.error.HTTPError as e:
            failures.append((url, f"HTTP {e.code}"))
            continue
        except Exception as e:  # noqa: BLE001
            failures.append((url, str(e)))
            continue
        if "text/html" not in content_type:
            continue
        pages += 1
        lp = LinkParser()
        lp.feed(body)
        for link in lp.links:
            if link.startswith(("http://", "https://", "mailto:", "data:", "#", "javascript:")):
                continue
            link = link.split("#", 1)[0]
            if not link:
                continue
            resolved = urllib.parse.urljoin(url, link)
            if resolved.startswith(base) and resolved not in checked:
                queue.append(resolved)
    server.terminate()

    for url, err in failures:
        print(f"BROKEN {url} -> {err}")
    print(f"{pages} html pages crawled, {len(checked)} urls checked, {len(failures)} failures")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
