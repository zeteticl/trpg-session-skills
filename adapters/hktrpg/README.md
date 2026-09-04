# HKTRPG / Discord adapter stub

Not a bot. Shows how Export Contracts could map to chat payloads later.

## Mapping (sketch)

| Contract | Suggested payload |
|----------|-------------------|
| `bgm-cue-list/v1` | Ordered embed fields: when → track |
| `handout-reveal/v1` | Message + image attachment per reveal id |
| `archive-manifest/v1` | Link to published Archive URL |

See `fixture.json` for a sample Discord-shaped message list derived from the example vault cues.
