#!/usr/bin/env python
"""Objective sticky-sidebar test using Edge headless + CDP.

Loads the local site, inspects all .sticky elements, scrolls down, and reports whether their
viewport positions stay fixed.
"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

import websocket

ROOT = Path(__file__).resolve().parent.parent
EDGE = next(
    p
    for p in (
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    )
    if Path(p).is_file()
)
URL = "http://127.0.0.1:8092/docs/lerobot/main/en/installation"


def run_probe(cdp, label: str) -> None:
    for target in (0, 800, 1600, 5000, 99999):
        cdp.eval(f"window.scrollTo(0, {target}); 'ok'")
        time.sleep(0.6)
        print(f"[{label}] {cdp.eval(PROBE)}")


class CDP:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=60, suppress_origin=True)
        self.mid = 0

    def send(self, method: str, params: dict | None = None) -> dict:
        self.mid += 1
        mid = self.mid
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                return msg

    def eval(self, expr: str):
        r = self.send("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
        return r["result"]["result"].get("value")


PROBE = """(() => {
  const out = {scrollY: window.scrollY, vh: window.innerHeight};
  out.els = Array.from(document.querySelectorAll('.sticky')).map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {cls: el.className.slice(0, 48), pos: cs.position, top: Math.round(r.top), height: Math.round(r.height)};
  });
  out.overflow = {
    html: getComputedStyle(document.documentElement).overflow,
    body: getComputedStyle(document.body).overflow,
  };
  return JSON.stringify(out);
})()"""


def kill_stale() -> None:
    subprocess.run(
        [
            "powershell",
            "-NoProfile",
            "-Command",
            "Get-CimInstance Win32_Process -Filter \"Name='msedge.exe'\" | "
            "Where-Object { $_.CommandLine -match 'edge-sticky|remote-debugging-port=9333' } | "
            "ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }",
        ],
        capture_output=True,
    )


def toggle_test(cdp: "CDP") -> None:
    print("close-button:", cdp.eval("document.querySelector('button[aria-label=\"收起目录\"]') ? 'present' : 'MISSING'"))
    cdp.eval("document.querySelector('button[aria-label=\"收起目录\"]')?.click(); 'ok'")
    time.sleep(0.8)
    print("after-close:", cdp.eval(PROBE))
    print("reopen-button:", cdp.eval("document.querySelector('button[aria-label=\"展开目录\"]') ? 'present' : 'MISSING'"))
    cdp.eval("document.querySelector('button[aria-label=\"展开目录\"]')?.click(); 'ok'")
    time.sleep(0.8)
    print("after-reopen:", cdp.eval(PROBE))


def main() -> None:
    url = sys.argv[1] if len(sys.argv) > 1 else URL
    kill_stale()
    time.sleep(1)
    server = None
    if url.startswith("http://127.0.0.1"):
        server = subprocess.Popen(
            [sys.executable, str(ROOT / "tools" / "serve_site.py"), "--root", "site", "--port", "8092"], cwd=ROOT
        )
        time.sleep(2)
    profile = tempfile.mkdtemp(prefix="edge-sticky-")
    edge = subprocess.Popen(
        [
            EDGE,
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            "--no-proxy-server",
            "--remote-debugging-port=9333",
            "--remote-allow-origins=*",
            f"--user-data-dir={profile}",
            "--window-size=1440,900",
            "about:blank",
        ]
    )
    try:
        targets = None
        for _ in range(80):
            try:
                targets = json.load(urllib.request.urlopen("http://127.0.0.1:9333/json", timeout=2))
                if targets:
                    break
            except Exception:  # noqa: BLE001
                time.sleep(0.25)
        page = next(t for t in targets if t.get("type") == "page")
        cdp = CDP(page["webSocketDebuggerUrl"])
        cdp.send("Page.enable")
        cdp.send("Page.navigate", {"url": url})
        time.sleep(8)
        run_probe(cdp, "probe")
        if len(sys.argv) > 2 and sys.argv[2] == "toggle":
            toggle_test(cdp)
    finally:
        edge.terminate()
        if server:
            server.terminate()
        kill_stale()


if __name__ == "__main__":
    main()
