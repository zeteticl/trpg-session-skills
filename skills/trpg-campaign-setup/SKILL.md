---
name: trpg-campaign-setup
description: >
  Beginner-friendly TRPG vault setup: create the full empty folder tree first with
  sensible defaults, then gently guide the GM on how to add a PDF or scenario text.
  Use when 建團, 備團資料夾, setup vault, 空殼, 新手建團, first time prep, or /trpg-campaign-setup.
  Does not analyze, translate, or write art prompts.
---

# trpg-campaign-setup

Charter §2. Layout: `docs/vault-layout.md`.

You are helping a **new GM** prepare a place for their table files. Speak plainly (繁中 unless they write in English). **Do not** open with a parameter checklist or jargon dump.

## Golden rule

1. **Build the whole empty house first** (no interrogation).
2. **Then** explain what you created in everyday words.
3. **Only then** ask how they want to bring in a PDF / scenario — one gentle question at a time.

Never block scaffolding on missing `module-id` / `campaign-id` / session numbers.

## Phase A — Decide vault root (minimal)

Use the first match; do not quiz unless truly ambiguous:

1. Env `TRPG_VAULT_ROOT` if set  
2. Else if this workspace already has `modules/` **or** `campaigns/` → workspace root is the vault  
3. Else if workspace looks like the toolkit repo (has `skills/trpg-*`) → use `examples/vault` **or** ask once: 「要把『備團資料夾』建在哪個資料夾？可直接用目前專案根目錄。」  
4. Else → **default: current workspace root** (most common for a new empty prep repo)

If the folder is empty, that is fine — you are about to fill it.

## Phase B — Create everything now (no asking)

Run the bootstrap helper (preferred):

```bash
node <toolkit>/scripts/setup_vault.mjs --vault <VAULT> --bootstrap --system coc7
```

If the toolkit path is this repo: `E:\github\trpg-session-skills\scripts\setup_vault.mjs` (or relative `scripts/setup_vault.mjs` when cwd is the toolkit).

`--bootstrap` creates **in one shot**:

| Path | Everyday meaning |
|------|------------------|
| `INDEX.md` | 總目錄說明 |
| `modules/starter-module/` | 放劇本／PDF 轉出文字的地方 |
| `campaigns/my-table/` | 你這一桌的資料 |
| `campaigns/my-table/pcs/` | 玩家角色 |
| `campaigns/my-table/hub/` | 以後多團總站用 |
| `campaigns/my-table/sessions/001/` | 第一團的筆記與出站材料 |
| `campaigns/my-table/modules-embedded/` | 一次性劇本可整包放這裡 |
| assets / prep / source 空目錄 | 圖、備團分析、原文 |

Defaults (override only if the GM already named things in the same message):

- `system`: `coc7`
- `module-id`: `starter-module`
- `campaign-id`: `my-table`
- `session`: `001`

If folders already exist, **do not wipe** — only create missing pieces (`writeIfMissing` / ensureDir).

If the node script is unavailable, create the same tree manually per `docs/vault-layout.md` + session stubs from the old setup skill (empty files only).

## Phase C — Explain like a beginner (required)

After creating, reply with something like this shape (adapt wording, keep warmth):

1. 「已經幫你建好備團用的資料夾了，現在是空房子，還沒有劇本內容。」
2. Short map in plain language (3–5 bullets, not a YAML dump).
3. Point to where the scenario will live: `modules/starter-module/source/`（或 embedded 路徑若他們說 one-shot）。

**Do not** ask for IDs, system packs, or publish modes in this message.

## Phase D — Guide getting a PDF / scenario (only after folders exist)

Ask **one** question:

> 接下來要把劇本放進來。你手上有現成的 PDF／Word，還是只有構想／網頁文字？

Then branch gently:

| They say | You do (and then **STOP**) |
|----------|----------------------------|
| 有 PDF／DOCX | Place/copy under `modules/starter-module/source/`. Extract into `source/scenario.zh-Hant.md` (or `.en.md`) **with page anchors** `<!-- PDF p.N -->` between pages (see `docs/source-citations.md`). Show the redistribution warning. |
| 只有文字／構想 | Help them save paste into `source/scenario.zh-Hant.md`. If they know print pages, they may add anchors; otherwise pages stay `p.?` later. |
| 暫時沒有 | Stop. Say the folders are ready whenever they are. **End turn.** |

## Next step (required)

As soon as `source/scenario.*.md` exists (or they confirm the PDF is ready in `source/`), you **must**:

1. Tell them setup is finished for this skill.
2. Use this shape:

> **下一步（建議）：** `/trpg-scenario-analyze` — 拆備團結構（頁碼與 GM/玩家可見分流）。  
> **也可以：** `/trpg-localize`（若還要譯）／先休息。  
> Skills **不會**自動串接。

3. **End your turn.** Do **not** read chapters to fill `prep/`. Do **not** write `prep/00`–`15`.

If they only wanted empty folders and have no PDF yet:

> **下一步（建議）：** 把 PDF 放進 `modules/starter-module/source/` 後再叫我，或有正文後執行 `/trpg-scenario-analyze`。  
> Skills **不會**自動串接。

See `docs/next-steps.md`.

## Hard rules

- Setup only builds empty shells (+ INDEX / stub yaml) and may place/extract **source** text for personal prep. **No `prep/` analysis**, no translation skill work, no Prompt Packs, no recap, no site build.
- Do not copy commercial module text into public Archive guidance; personal prep OK with warning.
- Prefer creating first; questions second; IDs only if they volunteer custom names in the same breath as setup.
- **Never** silently chain into analyze / localize / handout-art / publish in the same setup turn.
- Every setup turn ends with **Next step** guidance (`docs/next-steps.md`).
