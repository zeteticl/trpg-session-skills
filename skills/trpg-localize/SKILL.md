---
name: trpg-localize
description: >
  Personal-prep translation of a TRPG Module plus glossary, with anti-redistribution warnings.
  Use when 翻譯模組, glossary, localize scenario, or /trpg-localize.
  Does not redraw prep structure or publish archives.
---

# trpg-localize

## Inputs

- Module source locale + target locale (default target `zh-Hant` or `en` as asked)
- Existing `glossary.md` if any
- System pack glossary seeds (`systems/coc7/README.md`)

## Writes

1. Translated source file, e.g. `source/scenario.zh-Hant.md` or `source/scenario.en.md`
2. Updated `glossary.md` (Markdown table: term | source | target | notes)
3. Remind in the chat (and optionally `source/LOCALIZATION_NOTICE.md`):

> Personal prep only. Default Archive publish mode is `players`. Do not treat full copyrighted module text as a public redistribute-able product. GM is responsible for rights.

## Hard rules

- Do not rewrite `prep/` structure files (if understanding of structure changes, recommend `/trpg-scenario-analyze` on the translated text).
- Do not publish sites.
- Keep official rules keywords in English beside glosses when using CoC pack.
- **Preserve** `<!-- PDF p.N -->` (and similar) page anchors when translating — never strip pagination markers.

## Next step (required)

> **下一步（建議）：** `/trpg-scenario-analyze` — 用譯文重跑／更新備團結構。  
> **也可以：** `/trpg-handout-art` 或 `/trpg-live-aid`（若 prep 已夠用）。  
> Skills **不會**自動串接。
