---
name: trpg-campaign-setup
description: >
  Beginner-friendly TRPG vault setup: create the full empty folder tree first with
  temporary placeholder names, then when a PDF/scenario arrives auto-rename module
  and campaign folders from the title/filename before extracting source.
  Use when 建團, 備團資料夾, setup vault, 空殼, 新手建團, first time prep, or /trpg-campaign-setup.
  Does not analyze, translate, or write art prompts.
---

# trpg-campaign-setup

Charter §2. Layout: `docs/vault-layout.md`.

You are helping a **new GM** prepare a place for their table files. Speak plainly (繁中 unless they write in English). **Do not** open with a parameter checklist or jargon dump.

## Golden rule

1. **Build the whole empty house first** (no interrogation). Placeholders `starter-module` / `my-table` are **temporary**.
2. **Then** explain what you created in everyday words.
3. **Only then** ask how they want to bring in a PDF / scenario — one gentle question at a time.
4. When a PDF / title / paste arrives: **rename placeholders from the scenario name first**, then put files into the **new** paths.

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
| `modules/starter-module/` | **暫用名** — 放劇本／PDF 轉出文字；有劇本後會改名 |
| `campaigns/my-table/` | **暫用名** — 這一桌；有劇本後會改名 |
| `campaigns/my-table/pcs/` | 玩家角色 |
| `campaigns/my-table/hub/` | 以後多團總站用 |
| `campaigns/my-table/sessions/001/` | 第一團的筆記與出站材料 |
| `campaigns/my-table/modules-embedded/` | 一次性劇本可整包放這裡 |
| assets / prep / source 空目錄 | 圖、備團分析、原文 |

Defaults (override only if the GM already named things in the same message):

- `system`: `coc7`
- `module-id`: `starter-module` (placeholder)
- `campaign-id`: `my-table` (placeholder)
- `session`: `001`

If folders already exist, **do not wipe** — only create missing pieces (`writeIfMissing` / ensureDir).

If the node script is unavailable, create the same tree manually per `docs/vault-layout.md` + session stubs from the old setup skill (empty files only).

## Phase C — Explain like a beginner (required)

After creating, reply with something like this shape (adapt wording, keep warmth):

1. 「已經幫你建好備團用的資料夾了，現在是空房子，還沒有劇本內容。」
2. Short map in plain language (3–5 bullets, not a YAML dump). Mention that `starter-module` / `my-table` are **暫用名**，劇本一來會改成劇本名。
3. Point to where the scenario will live after rename: `modules/<劇本id>/source/`.

**Do not** ask for IDs, system packs, or publish modes in this message.

## Phase D — Guide getting a PDF / scenario (only after folders exist)

Ask **one** question:

> 接下來要把劇本放進來。你手上有現成的 PDF／Word，還是只有構想／網頁文字？

### When they provide a PDF / DOCX / title / paste — rename first (required)

Do **not** dump the file into `modules/starter-module/` and leave that name. Order:

1. Infer a display **劇本名** from (first available): GM’s words → document metadata/title → first heading of paste → PDF/DOCX filename (last resort).
2. **Rename placeholders** with the helper (preferred):

```bash
node <toolkit>/scripts/setup_vault.mjs --vault <VAULT> --rename-defaults \
  --title "<劇本名>" \
  --from-file "<Original.pdf>"
```

Optional short code (數字／英文代號) appended after the title:

```bash
… --title "碼頭燈籠" --code "A01"
# → modules/碼頭燈籠_A01/
```

- Folder names are **human-readable 劇本名** with **`_` instead of spaces** (e.g. `碼頭燈籠`, `Lantern_on_the_Pier`). **Do not** kebab-slug lowercase (`lantern-on-the-pier`).
- Prefer `--title`; if missing, use the PDF/DOCX filename cleaned for illegal path chars (spaces/`_` collapsed to `_`).
- Renames `modules/starter-module` → `modules/<劇本名>` and `campaigns/my-table` → `campaigns/<同名>` by default.
- Rewrites `module.yaml` / `campaign.yaml` / session manifests / `INDEX.md`.
- Name collision → append `_2`, `_3`, …
- Optional: `--module-id` / `--campaign-id` if the GM already chose different display names for module vs table.

If the script is unavailable, perform the same renames + yaml/`INDEX.md` id updates manually.

3. **Then** place/copy the PDF under `modules/<new-id>/source/` and extract to `source/scenario.zh-Hant.md` (or `.en.md`) **with page anchors** `<!-- PDF p.N -->` (see `docs/source-citations.md`).
4. Show the redistribution warning (personal prep only).
5. Tell them the new paths in plain language (e.g. 「資料夾已改成 `modules/碼頭燈籠/`」).

| They say | You do (and then **STOP**) |
|----------|----------------------------|
| 有 PDF／DOCX | Rename defaults → extract into **new** `source/` → warn → stop |
| 只有文字／構想 | Rename from their title/first heading → save paste into **new** `source/scenario.*.md` → stop |
| 暫時沒有 | Stop. Folders stay as placeholders until a scenario arrives. **End turn.** |

If placeholders were **already** renamed earlier, skip rename; write into the existing module `source/`.

## Next step (required)

As soon as `source/scenario.*.md` exists (or they confirm the PDF is ready in `source/`), you **must**:

1. Tell them setup is finished for this skill (include the **final** module/campaign ids).
2. Use this shape:

> **下一步（建議）：** `/trpg-scenario-analyze` — 拆備團結構（頁碼與 GM/玩家可見分流）。  
> **也可以：** `/trpg-localize`（若還要譯）／先休息。  
> Skills **不會**自動串接。

3. **End your turn.** Do **not** read chapters to fill `prep/`. Do **not** write `prep/00`–`15`.

If they only wanted empty folders and have no PDF yet:

> **下一步（建議）：** 把 PDF／劇本名交給我（會自動改掉暫用資料夾名），或有正文後執行 `/trpg-scenario-analyze`。  
> Skills **不會**自動串接。

See `docs/next-steps.md`.

## Hard rules

- Setup only builds empty shells (+ INDEX / stub yaml), **renames placeholders from scenario identity**, and may place/extract **source** text for personal prep. **No `prep/` analysis**, no translation skill work, no Prompt Packs, no recap, no site build.
- Never leave a newly ingested scenario only under `starter-module` / `my-table` when those placeholders still exist — rename first.
- Do not copy commercial module text into public Archive guidance; personal prep OK with warning.
- Prefer creating first; questions second; IDs only if they volunteer custom names in the same breath as setup.
- **Never** silently chain into analyze / localize / handout-art / publish in the same setup turn.
- Every setup turn ends with **Next step** guidance (`docs/next-steps.md`).
