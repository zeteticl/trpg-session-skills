---
name: trpg-session-recap
description: >
  Write session recap, unresolved clues, and hooks strictly from Session Notes and optional Transcript.
  Use when 收團, 團摘要, recap, 未解線索, or /trpg-session-recap.
  Does not build the static site or invent events missing from sources.
---

# trpg-session-recap

## Inputs (required)

- `sessions/<nnn>/notes.md` — if missing or empty, stop and ask GM to fill notes first
- Optional `transcript.md`

## Writes

- `recap.md` — bilingual sections if campaign is bilingual; otherwise GM’s primary locale
- `unresolved-clues.md`
- Brief next-session hooks inside recap or `hooks.md`
- PC changes **only** if stated in notes/transcript
- **`## Carry-forward`** (required): open clues, NPC attitude shifts, DRAFT entities to confirm, suggested focus for next `/trpg-live-aid` or re-analyze

## Hard rules

- No fabrication. If unclear, list questions for the GM under `## Open questions`.
- Do not run Astro / write `archive-manifest.yaml` (recommend `/trpg-archive-publish` next).
- Do not run STT; accept external transcript only.
- Tag uncertain new canon as `DRAFT` until GM confirms.

## Next step (required)

> **下一步（建議）：** `/trpg-archive-publish` — 把本團編成 Session Archive（`/sessions/<id>/`）。  
> **也可以：** `/trpg-live-aid`（準備下一團）／請 GM 確認 Carry-forward 裡的 `DRAFT`／多團後 `/trpg-campaign-hub`。  
> Skills **不會**自動串接。
