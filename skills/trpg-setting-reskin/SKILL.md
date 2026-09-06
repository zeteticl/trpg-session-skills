---
name: trpg-setting-reskin
description: >
  Fork a Module into a Module Variant with a new era/place and unified proper-name remap.
  Requires non-empty prep 06-characters, 10-npcs, 04-timeline, and 07-locations first.
  Use when 換皮, 改時空, 改地名人名, 現代香港版, setting reskin, module variant, or /trpg-setting-reskin.
  Does not translate prose (localize), rewrite the parent Module in place, or invent prep tables.
---

# trpg-setting-reskin

Charter §13. Layout: `docs/vault-layout.md`. Glossary: **Module Variant**.

Speak plainly (繁中 unless the Keep writes in English). Interview like grilling: ask the whole open frontier each round, recommend answers, **do not write files** until mapping decisions are confirmed.

## Job

Create a **new** `modules/<parent-id>-<variant-label>/` (Module Variant) from a parent Module: same story spine, new era/place and/or unified character–place–org names. **Never** overwrite the parent folder.

## Hard gate (required — stop if any fail)

Check **in this order**. Each file must exist under `modules/<parent-id>/prep/` and be **non-empty** (not only a title stub / `Status: missing` for the whole file):

1. `06-characters.md`  
2. `10-npcs.md`  
3. `04-timeline.md`  
4. `07-locations.md`  

If any fail:

> 還不能換皮。請先執行 `/trpg-scenario-analyze`，補齊人物（06）→ NPC（10）→ 時序（04）→ 地點（07）後再跑 `/trpg-setting-reskin`。  
> Skills **不會**自動串接。

Optional: scan `source/scenario.*.md` for extra proper nouns to propose in the mapping — **never** a substitute for the four tables.

## Inputs

- Vault Root + parent `module-id`
- Keep’s variant intent (era / city / name policy) — collected in interview rounds
- Parent `module.yaml`, `prep/*`, `glossary.md` (if any), `assets/prompts/*`

## Interview rounds (before any write)

Ask until settled (one round = all currently unblocked questions):

1. **Variant label** — folder suffix (e.g. `現代香港`, `1920日本`); spaces → `_`  
2. **Era / calendar** — target time frame vs parent  
3. **Place frame** — city / country / institutions to swap  
4. **Name policy** — see **Naming systems** below (required round; recommend + ask)  
5. **Source rewrite?** — default **no**; only rewrite `source/` if Keep explicitly says yes  
6. **Campaign hook?** — ask later after files exist (see below)

Build a draft mapping table in chat; Keep confirms → then write.

## Naming systems (required — recommend and ask)

When remapping **people** (from `06` / `10`), do **not** invent one-off random names. Interview the Keep and **recommend** a stratified system that fits the Place frame / era:

### Tier A — 高貴／古老／少見（建議預設給：貴族、世家、教會高層、財閥、古老血脈、主要反派世家）

Recommend (and ask whether to use):

- **比較高貴、少見的姓**（目標文化裡聽起來「有來頭」、不是街坊常見姓）  
- **古老貴族／世家感**（複姓、古姓、外語貴族姓在地化、紋章式稱呼等——依變體時空挑選）  
- 同一家族共用姓；分支可用字輩／排行／封號區分，但姓要穩定  

Ask explicitly, e.g.:

> 高貴／權力線人物要用「少見貴族姓／古老世家姓」嗎？若要，偏好偏中式古姓、歐陸貴族風，還是跟變體城市綁定的本地望族姓？

### Tier B — 非高貴：有系統的系列名（建議預設給：路人、店員、工人、士兵編號感、調查線配角）

Recommend picking **one coherent series** (or one series per faction), not mixed noise. When interviewing, **offer several options from this catalog of 20 common ideas** (adapt wording to the variant era/place; do not dump all 20 every time — pick 4–6 that fit, and say more exist if Keep wants):

| # | 系列 idea | 例子方向（依時空改寫） |
|---|-----------|------------------------|
| 1 | 季節 | 春夏秋冬；或立春／冬至節氣感 |
| 2 | 月份 | 正～臘；Jan–Dec 在地化 |
| 3 | 數字／編號 | 一～十、七號、門牌、工號 |
| 4 | 顏色 | 青白赤玄、紅白機對比 |
| 5 | 方位 | 東南西北、中、內外 |
| 6 | 五行／元素 | 金木水火土；風雷（若文化合） |
| 7 | 花草 | 梅蘭竹菊、蓮、菊、蒲公英 |
| 8 | 樹木 | 松柏桐柳、橡、杉 |
| 9 | 飛禽 | 雀燕鷹鶴、鴉、鴿 |
| 10 | 走獸／生肖 | 鼠牛虎…或狼鹿狐 |
| 11 | 天氣／氣象 | 雨霧霜雪、雷、虹 |
| 12 | 星辰／月相 | 星名、新月滿月、北斗感 |
| 13 | 寶石／礦物 | 玉石金銀銅鐵、煤、硝 |
| 14 | 五味／香料 | 甜苦辛鹹、桂皮、椒 |
| 15 | 樂器 | 琴笛鼓鐘、號、鈴 |
| 16 | 棋牌 | 將士相車；花色／點數 |
| 17 | 曜日／星期 | 日月火水木金土 |
| 18 | 時辰／晝夜 | 晨午暮夜、子丑寅… |
| 19 | 行業字根 | 同業同字（魚米茶炭船） |
| 20 | 交通／地標碼 | 站名、碼頭、路線號、宿舍床號 |

Ask explicitly, e.g.:

> 非高貴角色要用「系統化系列名」嗎？常見好記的有：季節、數字、顏色、方位、花草、飛禽、天氣、星辰、行業字根、交通編號等（完整 20 種見 skill 目錄）。建議先選 **一個** 主系列；同一陣營／場景小角色共用，方便桌上記憶。你要哪一種（或要我依變體時空從目錄裡挑 4–6 個給你選）？

### Rules when applying names

- Tag each person row in the mapping with `tier: noble | series | keep` and the series id if any.  
- **Same Old → same New** everywhere; family members share the noble surname.  
- Series names stay inside one theme; do not mix 季節+顏色 for the same faction unless Keep asks.  
- Places／orgs get their own policy (street/district patterns); do not reuse person-series tokens for major place names unless intentional.  
- Record the chosen system under `## Naming system` in `prep/16-setting-remap.md`.

## Writes (variant folder only)

1. **Copy** entire parent tree → `modules/<parent-id>-<variant-label>/`  
   - Normalize label with the same human-folder rules as setup (`_` not spaces; strip `《》`; CJK↔Latin get `_`).  
   - If target exists, append `_2`, `_3`, …  
2. Update variant `module.yaml`:  
   - `id:` = new folder name  
   - `title:` reflect variant  
   - `derived_from: <parent-id>`  
   - `variant_label: <label>`  
3. Write `prep/16-setting-remap.md` (this skill owns it):

```markdown
# Setting remap — <variant-label>

Parent: `modules/<parent-id>/`
Variant: `modules/<parent-id>-<label>/`
Era: <from> → <to>
Place frame: <from> → <to>
Source rewrite: no | yes

## Naming system

- Noble / high tier: <e.g. rare archaic surnames, shared clan names>
- Common / series tier: <e.g. seasons | numbers | colors | directions> — factions: …
- Keep opted out / custom: …

## Proper nouns

| Kind | Old | New | Tier | Notes |
|------|-----|-----|------|-------|
| person | … | … | noble \| series:<id> \| keep | from 06/10 |
| place | … | … | — | from 07 |
| org | … | … | — | |
| other | … | … | — | |

## Open / DRAFT

- …
```

4. Apply mapping **consistently** across the variant (same Old → same New everywhere):  
   - **Always (default):** all `prep/*.md` (including 03 background, 09 clues, …), `glossary.md` if present, `assets/prompts/*.md`  
   - **`source/`:** only if Keep opted in; preserve `<!-- PDF p.N -->` anchors  
5. Do **not** invent new plot beats; flag unresolved renames under Open/DRAFT in `16-setting-remap.md`.

## Campaign hook (after variant exists)

Ask once:

> 要把目前 Campaign 的 `modules:` 改掛這個變體嗎？（是／否）

- **是** → update that campaign’s `campaign.yaml` `modules:` (and note in chat).  
- **否** → leave campaign unchanged.

## Hard rules

- Never modify `modules/<parent-id>/` in place.  
- Never run without the four-file gate.  
- Not a translation skill — language change → `/trpg-localize` on the variant (or parent) separately.  
- Not analyze — do not create missing 06/10/04/07; send Keep back to analyze.  
- Not handout-art authorship from scratch — only remap existing Prompt Pack text when present.  
- Keep page cites (`（劇本 p.N）`); remapping names does not invent pages.  
- Personal prep / rights reminder if `source/` was copied from a commercial module.

## Next step (required)

> **下一步（建議）：**  
> - 若改過 `assets/prompts/` → `/trpg-handout-art`（依新名複核 Prompt Pack）  
> - 否則 → `/trpg-live-aid`（用變體 prep 寫今晚開團表）  
> - 若還要換語系 → `/trpg-localize`（在變體上）  
> Skills **不會**自動串接。

While still interviewing:

> **下一步（建議）：** 回覆上面那題即可。  
> Skills **不會**自動串接。

See `docs/next-steps.md`.
