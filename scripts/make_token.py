#!/usr/bin/env python3
"""Create Token Spec: 256x256 PNG + token.json from a portrait path.

Usage:
  python scripts/make_token.py <portrait.png> --name "Chen Wei" --border "#334455"
  python scripts/make_token.py --demo   # writes a placeholder portrait + token under examples/

Token Spec: transparent (or near) PNG default 256x256 + sidecar token.json.
"""

from __future__ import annotations

import argparse
import json
import struct
import zlib
from pathlib import Path


def write_solid_png(path: Path, size: int, rgb: tuple[int, int, int]) -> None:
    """Minimal RGB PNG writer (stdlib only)."""
    r, g, b = rgb
    raw = b"".join(b"\x00" + bytes([r, g, b]) * size for _ in range(size))

    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(png)


def try_pillow_token(src: Path, dest: Path, size: int) -> bool:
    try:
        from PIL import Image, ImageDraw  # type: ignore
    except ImportError:
        return False
    im = Image.open(src).convert("RGBA")
    # center-crop square
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest)
    return True


def write_token_json(path: Path, name: str, border: str, image: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps({"name": name, "border_color": border, "image": image, "size": 256}, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    p = argparse.ArgumentParser(description="TRPG Token Spec helper")
    p.add_argument("portrait", nargs="?", type=Path, help="Source portrait PNG")
    p.add_argument("--name", default="Token")
    p.add_argument("--border", default="#445566")
    p.add_argument("--out-dir", type=Path, help="Output directory for token.png + token.json")
    p.add_argument("--demo", action="store_true", help="Create example portrait + token")
    p.add_argument("--size", type=int, default=256)
    args = p.parse_args()

    root = Path(__file__).resolve().parents[1]
    if args.demo:
        portrait = root / "examples/vault/modules/lantern-on-the-pier/assets/portraits/chen-wei.png"
        out_dir = root / "examples/vault/modules/lantern-on-the-pier/assets/tokens"
        write_solid_png(portrait, 512, (70, 90, 110))
        args.portrait = portrait
        args.out_dir = out_dir
        args.name = "Chen Wei"

    if not args.portrait:
        p.error("portrait path required (or use --demo)")

    src = args.portrait
    out_dir = args.out_dir or (src.parent.parent / "tokens")
    token_png = out_dir / "token.png"
    token_json = out_dir / "token.json"

    if not try_pillow_token(src, token_png, args.size):
        # Fallback: copy-sized solid derived placeholder
        write_solid_png(token_png, args.size, (80, 100, 120))
        print("Pillow not installed: wrote solid placeholder token.png (pip install pillow for crop/circle)")

    write_token_json(token_json, args.name, args.border, token_png.name)
    print(f"Wrote {token_png}")
    print(f"Wrote {token_json}")


if __name__ == "__main__":
    main()
