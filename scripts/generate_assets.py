#!/usr/bin/env python3
"""Generate assets from Prompt Packs (dry-run stub or HTTP API).

Usage:
  python scripts/generate_assets.py --module examples/vault/modules/lantern-on-the-pier

Env:
  TRPG_IMAGE_API_URL  — POST endpoint (optional)
  TRPG_IMAGE_API_KEY  — bearer token (optional)

Without API URL, writes <target>.stub.txt next to each Prompt Pack target path.
"""

from __future__ import annotations

import argparse
import os
import re
import urllib.error
import urllib.request
from pathlib import Path


TARGET_RE = re.compile(r"\*\*Target:\*\*\s*`([^`]+)`")


def parse_targets(prompt_dir: Path) -> list[tuple[Path, Path]]:
    pairs: list[tuple[Path, Path]] = []
    for md in sorted(prompt_dir.glob("*.md")):
        if md.name.upper() == "INDEX.MD":
            continue
        text = md.read_text(encoding="utf-8")
        m = TARGET_RE.search(text)
        if not m:
            continue
        rel = m.group(1)
        # targets are relative to module root (assets/...)
        module_root = prompt_dir.parent.parent
        pairs.append((md, module_root / rel))
    return pairs


def stub_write(dest: Path, pack: Path) -> None:
    stub = dest.with_suffix(dest.suffix + ".stub.txt")
    stub.parent.mkdir(parents=True, exist_ok=True)
    stub.write_text(
        f"Stub for {dest.name}\n"
        f"Prompt pack: {pack}\n"
        f"Set TRPG_IMAGE_API_URL to enable real generation.\n",
        encoding="utf-8",
    )
    print(f"stub {stub}")


def api_generate(dest: Path, pack: Path, url: str, key: str | None) -> None:
    body = pack.read_text(encoding="utf-8").encode("utf-8")
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "text/plain; charset=utf-8")
    if key:
        req.add_header("Authorization", f"Bearer {key}")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()
    except urllib.error.URLError as e:
        raise SystemExit(f"API failed for {pack.name}: {e}") from e
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print(f"wrote {dest} ({len(data)} bytes)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--module", type=Path, required=True, help="Module folder")
    args = ap.parse_args()
    module = args.module
    prompt_dir = module / "assets" / "prompts"
    if not prompt_dir.is_dir():
        raise SystemExit(f"No prompts dir: {prompt_dir}")

    url = os.environ.get("TRPG_IMAGE_API_URL")
    key = os.environ.get("TRPG_IMAGE_API_KEY")
    pairs = parse_targets(prompt_dir)
    if not pairs:
        raise SystemExit("No Prompt Packs with **Target:** found")

    for pack, dest in pairs:
        if url:
            api_generate(dest, pack, url, key)
        else:
            stub_write(dest, pack)


if __name__ == "__main__":
    main()
