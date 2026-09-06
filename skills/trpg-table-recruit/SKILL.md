---
name: trpg-table-recruit
description: >
  Draft a structured table-recruit / open-table pitch (平台、語音、語言、系統、模組簡介、
  時長、人數、風格、難度、時段、收費、注意、背景須知、角色位) for Discord or similar.
  Use when 招團, 開團文, 招生, recruit pitch, table invite, 跑團公告, or /trpg-table-recruit.
  Does not run the table, write live-aid, or publish Archive sites.
---

# trpg-table-recruit

Charter §14. Speak plainly (繁中／粵語用字依 Keep；預設書面繁中，語音欄寫「廣東話」等事實即可).

## Job

Produce a **ready-to-post 招團／開團資訊** block matching the field structure below. Interview for gaps; pull tone and facts from Module prep when present. **Not** an AI Keep — only marketing/seat logistics for humans.

## Inputs

- Optional: Vault module `prep/00-overview.md`, `01-structure-and-6w.md`, `06-characters.md` (roles)
- Optional: background handouts Keep already has (e.g. era briefing `.docx` / `.md`) — **cite path, do not paste copyrighted full text into public posts**
- Keep answers for logistics (platform, Discord, schedule, price, hard seat count)

## Interview (before final write)

Ask missing logistics in one round (recommend defaults when obvious):

| Field | Ask / default idea |
|-------|-------------------|
| 跑團平台 | FVTT / Roll20 / 面對面… |
| 交流方式 | Discord 語音 / 文字… |
| 交流語言 | 廣東話 / 普通話 / English… |
| 模組系統 | from `module.yaml` system pack (e.g. CoC 7e) |
| 流程長度 | hours ± and session count |
| 模組人數 | hard cap if module-locked |
| 模組風格 | 3–5 short tags |
| 模組難度 | ★ scale or plain words |
| 跑團時間 | weekday + clock |
| 收費價目 | 免費 / 價目 |
| 注意事項 | table tone, fidelity asks (e.g. 嚴守歷史航天感) |
| 背景須知 | optional pre-read file names only |
| 角色位 | PC seats (e.g. 艦長／駕駛員／任務專家) |

If Module prep exists, draft **模組內容** blurb from player-facing overview — no GM-only spoilers (SAN numbers, twists, solutions).

## Output shape (required)

Write **both**:

1. Chat-ready Discord block (same fields).  
2. Vault file: `campaigns/<cid>/table-recruit.md` (create/update). If no campaign yet, write under `modules/<id>/prep/17-table-recruit.md` and say so.

### Field block (use these headings — Keep’s blueprint)

```markdown
# 招團／開團資訊 — <桌名或模組名>

跑團平台： <e.g. 線上 FVTT>
交流方式： <e.g. DISCORD 語音>
交流語言： <e.g. 廣東話>
模組系統： <e.g. CoC 7th Edition>

模組內容：
<2–6 句玩家向鉤子；時代＋召集理由＋調性；禁止劇透結局／怪物真身>

流程長度： <e.g. 6-8 小時 ±（3 sessions）>
模組人數： <e.g. 3 人（受劇本技術限制硬性規定）>
模組風格： <e.g. 絕密宇宙航行 / 本格科幻 / 生存恐怖>
模組難度： <e.g. ★★☆☆☆>
跑團時間： <e.g. 晚上 2130 - 0000>
收費價目： <e.g. 免費>

注意事項：
- <table expectations>
- <fidelity / tone>
- <safety tools if Keep wants>

背景須知
- <optional: 「請先看 〈檔名〉」— 只列檔名與一句用途，不貼全文>

角色
- <位1>： <一句玩家向職責，無劇透>
- <位2>： …
- <位3>： …
```

### Example tone (structure only — adapt facts)

Moon-dark / NASA-style pitches should feel **era-heavy and procedural** when Keep asks (冷戰、秘密基地召集、真實航天感)，still **player-safe**.

## Hard rules

- No GM-only spoilers in the public pitch.  
- Do not invent seat counts that contradict a module hard limit the Keep stated.  
- Do not paste full copyrighted briefing docs into Discord; link/name only.  
- Do not write `live-aid.md`, recap, or Archive.  
- Do not start bots; Discord is copy-paste text only (adapters stay stubs).

## Next step (required)

> **下一步（建議）：** `/trpg-live-aid` — 開團表（若今晚／本系列已定員）。  
> **也可以：** `/trpg-handout-art`（還缺講義／人像）／把招團文貼上 Discord 等回覆。  
> Skills **不會**自動串接。

While interviewing:

> **下一步（建議）：** 回覆上面缺的欄位即可。  
> Skills **不會**自動串接。

See `docs/next-steps.md`.
