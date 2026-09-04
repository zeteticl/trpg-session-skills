---
name: trpg-live-aid
description: >
  Build a GM session run sheet in one Markdown file: scene switches, BGM cue order,
  handout reveals — each citing module page (劇本 p.N). Use when 開團表, live aid,
  BGM 順序, handout 揭示, or /trpg-live-aid. Not an AI Keeper: no dice, no NPC voice, no recap.
---

# trpg-live-aid

Charter §6. Pages: `docs/source-citations.md`. Formats: `docs/formats.md` (**MD only**). Peers: `docs/strengthen-from-peers.md`.

## Inputs

- Campaign + session path
- Prior `recap.md` / `unresolved-clues.md` if any (reconcile into tonight’s 假設)
- Module `prep/` with page cites and GM-only vs player-facing marks
- `source/scenario.*.md` anchors when prep is thin

## Writes (only this)

**One file:** `campaigns/<cid>/sessions/<nnn>/live-aid.md`

### live-aid.md shape

```markdown
# Live Aid — Session 001

## 假設／範圍
- 上團梗概：…
- 今晚目標／收團條件：…
- 調性（一句）：調查不安 / …（table-tone）

## 切場順序
| # | 場景 | 時機 | 劇本頁 | 提醒 |
|---|------|------|--------|------|

## 配樂操作序
| When | 曲風／情緒 | 劇本頁 | 註 |
|------|------------|--------|-----|
| mythos-reveal | silence | p.? | 揭示當下切靜音 |

## Handout／附件揭示
| When | 附件 | 劇本頁 | 怎麼給（玩家可見話術） | 禁止提前 |
|------|------|--------|------------------------|----------|
| … | 剪報 | p.9 | 「剪報邊已發黃……」 | 未觸發前不發 |

## Missing page cites
- …
```

### Send-timing rules (handouts / maps / portraits)

1. Do **not** send early — only when the reveal condition is met.  
2. Prefer diegetic framing (便箋／剪報／照片背面), not 「Handout 3」。  
3. If the trial PDF has no art, say so and use spoken description.  
4. Never include GM-only stats or solutions in what players see.

### BGM

Prefer emotion → strategy (調查低語、危機急促、**揭示＝silence**). No official track required — genre tags are enough.

## Hard rules

- Human GM runs the table; you only prepare the sheet.
- **Every** scene / cue / reveal includes 劇本頁 (`p.N` or `p.?`).
- Markdown only for Live Aid outputs.
- No dice, no portraying NPCs, no `recap.md`.
- Module-level BGM catalog stays in `prep/11-bgm.md`; tonight’s order only in `live-aid.md`.

## Next step (required)

> **下一步（建議）：** 去開團；團後把筆記寫進 `sessions/<nnn>/notes.md`，再執行 `/trpg-session-recap`。  
> **也可以：** 有錄音逐字稿 → 先 `/trpg-session-transcribe`；還缺圖 → `/trpg-handout-art`。  
> Skills **不會**自動串接。
