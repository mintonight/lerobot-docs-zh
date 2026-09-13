#!/usr/bin/env python
"""Take a headless Edge screenshot of a URL, optionally starting the local docs server first."""

from __future__ import annotations

import argparse
import socket
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EDGE_CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def wait_port(port: int, timeout: float = 15.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=1):
                return True
        except OSError:
            time.sleep(0.3)
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--root", help="If set, start serve_site.py with this site root")
    parser.add_argument("--port", type=int, default=8090)
    parser.add_argument("--window", default="1440,2000")
    parser.add_argument("--budget", default="9000")
    args = parser.parse_args()

    edge = next((p for p in EDGE_CANDIDATES if Path(p).is_file()), None)
    if edge is None:
        sys.exit("Edge not found")

    server = None
    if args.root:
        server = subprocess.Popen(
            [sys.executable, str(ROOT / "tools" / "serve_site.py"), "--root", args.root, "--port", str(args.port)],
            cwd=str(ROOT),
        )
        if not wait_port(args.port):
            server.terminate()
            sys.exit("server did not start")

    try:
        if args.root:
            import urllib.request

            with urllib.request.urlopen(args.url, timeout=10) as r:
                print(f"pre-check: HTTP {r.status}, {len(r.read())} bytes")
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        if out.exists():
            out.unlink()
        profile = ROOT / "tools" / ".edge-profile" / str(int(time.time() * 1000))
        cmd = [
            edge,
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            "--no-proxy-server",
            "--user-data-dir=" + str(profile),
            "--hide-scrollbars",
            f"--window-size={args.window}",
            f"--virtual-time-budget={args.budget}",
            f"--screenshot={out.resolve()}",
            args.url,
        ]
        subprocess.run(cmd, check=False)
        # Edge may return before the browser finished writing the screenshot; wait for the file
        deadline = time.time() + 45
        while time.time() < deadline:
            if out.exists() and out.stat().st_size > 1000:
                break
            time.sleep(0.5)
        print(f"screenshot -> {out} ({out.stat().st_size if out.exists() else 0} bytes)")
    finally:
        if server:
            server.terminate()


if __name__ == "__main__":
    main()
