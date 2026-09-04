---
name: trpg-vault-tidy
description: >
  Reorganize a TRPG Campaign Vault to match vault-layout conventions: rename/move,
  dedupe, refresh INDEX. Use when 整理檔案, tidy vault, fix naming, refresh INDEX,
  or /trpg-vault-tidy. Does not invent prep, translation, or recap content.
---

# trpg-vault-tidy

Charter §9. Layout: `docs/vault-layout.md`.

## Job

Make the Vault Root findable and conventional. **No new narrative content.**

## Steps

1. Read Vault Root (`TRPG_VAULT_ROOT` or path from GM).
2. List deviations: wrong folder names, files in root that belong under `modules/` or `campaigns/`, duplicate `scenario*.md`, stale `INDEX.md`.
3. Propose a move/rename plan; if GM already approved tidy, apply moves.
4. Rewrite `<vault>/INDEX.md` listing modules and campaigns with ids and titles from yaml when present.
5. Report what moved and what is still missing (hand off gaps: empty `source/` → setup/analyze; empty notes → GM; etc.).
6. If the GM brings **old** notes/PDF/transcripts to sort: interview lightly (what campaign? which session?) then classify into vault paths — do not invent what happened (peer: vault-ingest pattern). Hand narrative recovery to `trpg-session-recap` / analyze as needed.

## Hard rules

- Do not write or rewrite `prep/`, glossary translations, Prompt Packs, `recap.md`, or Archive sites.
- Prefer move over copy; if duplicates differ, keep both under `duplicates/` and flag for GM.
- Never delete without explicit GM confirmation.
