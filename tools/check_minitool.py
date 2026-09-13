"""Check the mini-tool page for horizontal overflow and runtime JS errors (CDP)."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
from check_sticky import CDP, EDGE, kill_stale  # noqa: E402

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8092/index.html"

PROBE = """(() => {
  var errs = window.__errs || [];
  var cw = document.documentElement.clientWidth;
  var sw = document.documentElement.scrollWidth;
  var wide = [];
  var all = document.querySelectorAll("body *");
  for (var i = 0; i < all.length; i++) {
    var r = all[i].getBoundingClientRect();
    if (r.right > cw + 1) {
      wide.push(all[i].tagName + "." + String(all[i].className).slice(0, 30) + " right=" + Math.round(r.right));
    }
    if (wide.length >= 6) break;
  }
  return JSON.stringify({ clientWidth: cw, scrollWidth: sw, errors: errs.slice(0, 5), wide: wide });
})()"""


def main() -> None:
    kill_stale()
    time.sleep(1)
    server = None
    if URL.startswith("http://127.0.0.1"):
        server = subprocess.Popen(
            [sys.executable, str(ROOT / "tools" / "serve_site.py"), "--root", "minitool", "--port", "8092"],
            cwd=ROOT,
        )
        time.sleep(2)
    profile = tempfile.mkdtemp(prefix="edge-minitool-")
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
            "--window-size=390,844",
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
        cdp.send("Runtime.enable")
        cdp.send(
            "Page.addScriptToEvaluateOnNewDocument",
            {
                "source": "window.__errs=[];window.addEventListener('error',function(e){window.__errs.push(String(e.message));});"
            },
        )
        cdp.send("Page.navigate", {"url": URL})
        time.sleep(6)
        print(cdp.eval(PROBE))
        print("cards:", cdp.eval("document.querySelectorAll('.card').length"))
        print("chips:", cdp.eval("document.querySelectorAll('.chip').length"))
    finally:
        edge.terminate()
        if server:
            server.terminate()
        kill_stale()


if __name__ == "__main__":
    main()
