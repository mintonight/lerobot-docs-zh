#!/usr/bin/env python
"""Serve the built docs site locally with correct URL mapping.

The official SvelteKit kit builds asset URLs rooted at /docs/<library>/<version>/<language>/,
so this server mounts the `site` folder at that prefix and adds .html extension fallback
(the generated links are extension-less).

Usage: python serve_site.py [--root site] [--library lerobot] [--version main] [--language en] [--port 8090]
Then open http://localhost:8090/docs/lerobot/main/en/index.html
"""

from __future__ import annotations

import argparse
import posixpath
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PREFIX_TEMPLATE = "/docs/{library}/{version}/{language}"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default="site")
    parser.add_argument("--library", default="lerobot")
    parser.add_argument("--version", default="main")
    parser.add_argument("--language", default="en")
    parser.add_argument("--port", type=int, default=8090)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    prefix = PREFIX_TEMPLATE.format(library=args.library, version=args.version, language=args.language)

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(root), **kw)

        def do_GET(self):
            if self.path == "/" or self.path == "":
                self.send_response(302)
                self.send_header("Location", prefix + "/index.html")
                self.end_headers()
                return
            if self.path == "/favicon.ico" and (root / "favicon.png").is_file():
                self.path = "/favicon.png"
                return super().do_GET()
            # resolve against both layouts: files nested under the prefix (deploy layout)
            # and files at the site root with the prefix mapped onto it (raw build layout)
            path_only, _, query = self.path.partition("?")
            rests = []
            if path_only.startswith(prefix + "/") or path_only == prefix:
                rests.append(path_only[len(prefix):].lstrip("/"))
            rests.append(path_only.lstrip("/"))
            seen: set[str] = set()
            for rest in rests:
                rest = posixpath.normpath(rest) if rest else ""
                if rest == ".":
                    rest = ""
                if rest in seen:
                    continue
                seen.add(rest)
                target = root / rest
                if target.is_dir():
                    target = target / "index.html"
                if not target.is_file() and not rest.endswith(".html"):
                    candidate = root / (rest + ".html")
                    if candidate.is_file():
                        target = candidate
                if target.is_file() and target.resolve().is_relative_to(root):
                    self.path = "/" + str(target.relative_to(root)).replace("\\", "/")
                    if query:
                        self.path += "?" + query
                    return super().do_GET()
            self.send_error(404, "Not found")

    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Serving {root} at http://localhost:{args.port}{prefix}/index.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
