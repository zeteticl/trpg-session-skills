# Next-step guidance (all skills)

Every skill turn that finishes useful work **must end** by recommending the GM’s next move.

## Rules

1. Speak plainly (繁中 unless the GM writes in English).
2. Give **one primary** next slash command (or “可以先開團／休息”／「回覆上面那題」).
3. Optionally list 1–2 alternatives.
4. Remind: **Skills 不會自動串接** — the GM (or chat) must run the next skill.
5. Do not start the next skill’s writes in the same turn unless this skill’s charter explicitly allows a tiny bridge (e.g. setup may extract `source/` only).
6. Clarifying questions (e.g. setup waiting on “要用這份 PDF 嗎？”) → next-step is **回覆上面那題**, not the next pipeline skill.

## Typical pipeline

```
setup → analyze → (localize?) → (setting-reskin?) → live-aid
  ↗ handout-art (optional, before or after live-aid) → (asset-generate?)
  → [play] → (transcribe?) → recap → archive-publish → (campaign-hub?)
```

After **analyze**, primary next is `/trpg-live-aid` (pick tonight’s chapter / run sheet). Alternatives: `/trpg-setting-reskin`（要換時空／統一改名且 06/10/04/07 已齊）、`/trpg-handout-art`（先寫 Prompt Pack）。

After **setting-reskin**, prefer `/trpg-handout-art` if prompts were remapped, else `/trpg-live-aid`; language change → `/trpg-localize` on the variant.

`router` only names the next skill. `vault-tidy` returns to whatever was blocked (often analyze or recap).
