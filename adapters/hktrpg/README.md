# HKTRPG / Discord adapter stub

Not a bot. Shows how table content could map to chat payloads later.

## Mapping (sketch)

| Source (Markdown) | Suggested payload |
|-------------------|-------------------|
| `live-aid.md` → 配樂操作序 table | Ordered embeds: when → track → page |
| `live-aid.md` → Handout 揭示 table | Message + optional image per row |
| `archive-manifest.yaml` | Link to published Archive URL |

See `fixture.json` for a sample Discord-shaped message list. Prefer deriving fixtures from MD tables — do not ask the GM to maintain parallel YAML run sheets.
