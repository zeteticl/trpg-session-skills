---
name: trpg-router
description: >
  Route TRPG GM intent to the correct trpg-* skill without writing vault files.
  Use when the user says 備團, 收團, 出圖, 翻譯, 開團表, 出站, setup vault, analyze module,
  localize, handout art, live aid, recap, publish archive, or runs /trpg-router.
  Do not use for actually preparing content — only dispatch.
---

# trpg-router

Read `docs/skills-charter.md` if unsure about boundaries.

## Job

Classify the GM request and **invoke or instruct the next skill**. Write **no** Module/Campaign/Session files.

## Routing table

| Intent signals | Next skill |
|----------------|------------|
| 新 vault、建團、空殼、setup、新手備團、第一次備團 | `trpg-campaign-setup`（先建齊資料夾，再引導 PDF） |
| 拆劇本、備團結構、分析模組、6W、線索網 | `trpg-scenario-analyze` |
| 翻譯、術語表、localize | `trpg-localize` |
| 出圖 prompt、人像、背圖、handout 檔名 | `trpg-handout-art` |
| 開團表、BGM 順序、揭示順序、live aid | `trpg-live-aid` |
| 團摘要、收團、recap、未解線索 | `trpg-session-recap` |
| 出站、Archive、publish | `trpg-archive-publish` |
| 整理檔案、tidy、INDEX | `trpg-vault-tidy` |
| 逐字稿整理、transcript | `trpg-session-transcribe` |
| 真的出圖、image API | `trpg-asset-generate` |
| 多團 Hub、clue board | `trpg-campaign-hub` |

If multiple intents, order: setup → analyze → localize → live-aid → handout-art → recap → publish.

## Response shape

1. One line: chosen skill + why (plain language).
2. Optional: one alternative if the intent was ambiguous.
3. Stop. Do not start the work yourself.

## Next step (required)

> **下一步（建議）：** `/trpg-<chosen-skill>` — 一句原因。  
> **也可以：** （僅在意圖模糊時給一個替代）。  
> Skills **不會**自動串接。

See `docs/next-steps.md`.
