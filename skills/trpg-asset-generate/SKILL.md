---
name: trpg-asset-generate
description: >
  Generate image (or configured) asset files from existing Prompt Packs via a local API/env.
  Use when 真的出圖, generate assets from prompts, run image API, or /trpg-asset-generate.
  Does not invent prompts, crop Tokens, or pick BGM.
---

# trpg-asset-generate

Charter §11. Prompt Packs are owned by `trpg-handout-art`.

## Inputs

- Module `assets/prompts/*.md` (or INDEX)
- Env: `TRPG_IMAGE_API_URL` (optional), `TRPG_IMAGE_API_KEY` (optional)
- Script: `python scripts/generate_assets.py --module <path>`

## Steps

1. Confirm Prompt Packs exist; if not, hand off to `trpg-handout-art`.
2. Run `scripts/generate_assets.py` against the module assets folder.
3. If no API configured, script writes `.stub.txt` beside each target path explaining how to configure — still a valid dry-run.
4. Report written files. Token crop → `scripts/make_token.py` separately.

## Hard rules

- Do not invent or rewrite prompts (edit via handout-art).
- Do not select BGM or write prep/recap.
- Do not commit API keys into the vault.
