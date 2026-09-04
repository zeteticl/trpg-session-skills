---
name: trpg-campaign-hub
description: >
  Build a multi-Session Campaign Hub (character pages + unresolved-clue board) from existing
  Session Archives. Use when 多團總站, campaign hub, clue board across sessions, or /trpg-campaign-hub.
  Does not replace single-session archive-publish.
---

# trpg-campaign-hub

Charter §12.

## Inputs

- Campaign id with one or more `sessions/*/recap.md` and `unresolved-clues.md`
- Optional PC files under `campaigns/<id>/pcs/`

## Writes / build

1. Write `campaigns/<id>/hub/hub-manifest.yaml` listing sessions, locales, publish_mode aggregate.
2. Aggregate unresolved clues into `campaigns/<id>/hub/clue-board.md`.
3. Sync into Astro via `cd archive && npm run sync && npm run build` (scans all `sessions/*` and `pcs/*`, builds `/hub`, `/sessions/<id>/`, `/pcs/<id>/`).
4. Player site must not include any `keep-appendix.md`.
5. Hub must list every session with a link to its Archive page, show an aggregated clue board, character pages when `pcs/` exists, and bilingual UI (`?lang=zh-Hant|en`).

## Hard rules

- Single-session publish stays `trpg-archive-publish`; this skill only builds the cross-session Hub.
- Do not invent clues not present in session unresolved files.
- Do not start bots.

## Next step (required)

> **下一步（建議）：** 預覽 `/hub/`；缺單團頁再補 `/trpg-archive-publish`。  
> **也可以：** 開下一團 → `/trpg-live-aid`。  
> Skills **不會**自動串接。
