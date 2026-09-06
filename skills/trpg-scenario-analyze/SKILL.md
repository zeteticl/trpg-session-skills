---
name: trpg-scenario-analyze
description: >
  Analyze TRPG Module source into a full prep structure pack (pacing, 6W, story, timeline,
  characters, locations, clues, NPCs, module BGM, system nodes, strategy, appendices).
  Use when 備團分析, 拆劇本, analyze module, or /trpg-scenario-analyze.
  Not for translation, image prompts, or session notes.
---

# trpg-scenario-analyze

Charter §3. Layout: `docs/vault-layout.md`. System pack: `systems/<system>/`.

## When you start

Usually after `/trpg-campaign-setup` left `modules/<id>/source/scenario.*.md` in place.
If the GM is still in a setup chat, they should have been told to run **this** skill explicitly — Cursor does not auto-chain skills.

### Gate: source must exist (required)

Before writing any `prep/` file:

1. Resolve Vault Root + module folder (not still `starter-module` unless that is intentional and already has source).
2. Confirm `modules/<id>/source/scenario.*.md` exists (prefer files with `<!-- PDF p.N -->`).

If source is **missing** (GM attached a PDF, placeholders still `starter-module` / `my-table`, or empty `source/`):

- **Do not** rename folders, extract PDF, or write `prep/00`–`15`.
- Stop and hand off:

> 還沒有 `source/scenario.*.md`。請先執行 `/trpg-campaign-setup`（或回覆 setup「用這份 PDF」）完成改名與抽文，再執行 `/trpg-scenario-analyze`。  
> Skills **不會**自動串接。

Ingest (rename + extract) belongs to setup only.

## Inputs

- Vault Root + `module-id`
- Source: `modules/<id>/source/scenario.*.md` (prefer files with `<!-- PDF p.N -->` anchors — see `docs/source-citations.md`)
- Active system pack (`module.yaml` → `system`)

## Writes (only these)

Create/update files under `modules/<id>/prep/`:

| File | Content |
|------|---------|
| `00-overview.md` | Short GM overview + missing-section list + pagination note (PDF vs print) |
| `01-structure-and-6w.md` | Pacing/structure + Who/What/When/Where/Why/How |
| `02-story-and-endings.md` | Core story + endings |
| `03-background.md` | Setting background |
| `04-timeline.md` | Timeline and events |
| `05-references.md` | Reference reading |
| `06-characters.md` | PC-facing / investigator roles if any |
| `07-locations.md` | Scenes and places |
| `08-gm-player-tips.md` | Tips for GM and players |
| `09-clues.md` | Clue list and links |
| `10-npcs.md` | NPCs |
| `11-bgm.md` | Module-level BGM: emotion → strategy table + occasions（揭示＝silence）；not tonight’s order |
| `12-system-nodes.md` | System nodes (CoC: SAN, fights, gates…) |
| `13-strategy.md` | Strategy / walkthrough table |
| `14-appendices.md` | Appendices |
| `15-special-systems.md` | Scenario-specific systems |

`prep/11-bgm.md` emotion table example (no URLs required):

| 情緒 | 策略 | 劇本場合／頁 |
|------|------|--------------|
| 入場／社交 | 明快、可循環 | p.? |
| 現實調查 | 低沉不安 | p.? |
| 危機／追逐 | 急促 | p.? |
| 恐怖揭示 | **silence** | p.? |

### Page citations (required)

For **each concrete playable item** (beat, location, clue, NPC, handout, SAN/combat node, BGM occasion, strategy step), add a source page cite:

- `（劇本 p.12）` or a **劇本頁** table column
- Spans OK: `p.12–13`
- No page in source → `p.?` and collect in `00-overview.md` under missing cites — **never invent page numbers**

### Visibility split (required — from peer prep practice)

Mark blocks or columns as:

- **GM-only** — secrets, SAN ranges, monster stats, future beats, solutions  
- **Player-facing** — what can be said/shown when conditions are met  

Never put GM-only text into player-facing Archive later.

### Clue entries (required)

For each **critical** clue in `09-clues.md`, list **at least two** ways it can enter play (investigation paths). One-door clues get a `Risk: bottleneck` flag.

### Continuity blurb

At top of `00-overview.md` (and when re-analyzing after a session), include **上團／上章梗概**: where PCs are, open goals, NPC attitude shifts, unresolved clues — sourced from Session Notes/recap if present, else `Status: first prep`.

### Completeness gate (end of run)

Before finishing, fill this checklist in `00-overview.md` (✅/❌). Incomplete is OK if flagged, not silently skipped:

| Check | |
|-------|--|
| Page cites on concrete items | |
| GM-only vs player-facing split | |
| Critical clues have ≥2 entries | |
| Locations with first-look player prose | |
| Handout list + reveal conditions | |
| System nodes (SAN/checks) with pages | |
| BGM occasions (emotion → strategy) | |
| Missing/appendix gaps listed | |

If the source lacks material for a section, write the file with `Status: missing` and what to ask the GM — do not invent canon.

### Canon stamp

New NPCs/locations invented or uncertain → tag `DRAFT` until the GM accepts; do not treat DRAFT as table canon in Live Aid.

## Hard rules

- Answer “how does this play at the table”, not “how to translate” or “how to draw”.
- No Session Notes, no Prompt Packs, no Archive site.
- Do not rename vault placeholders or extract PDF/DOCX — that is `trpg-campaign-setup`.
- After structural change to source, re-run this skill; locale-only changes → `trpg-localize`.

## Next step (required)

End every successful analyze turn with:

> **下一步（建議）：** `/trpg-live-aid` — 先訂今晚章節／開團表（切場／BGM／handout，含劇本頁）。  
> **也可以：** `/trpg-handout-art`（先寫 Prompt Pack）／`/trpg-localize`（還要譯）／草稿很多時先請 GM 確認 `DRAFT`。  
> Skills **不會**自動串接。

If completeness checklist is mostly ❌: recommend fixing source pages or re-running analyze after GM answers gaps — still name the slash command.
