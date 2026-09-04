# File formats

**Default: Markdown (`.md`)** for anything a GM reads at the table or while prepping.

## Use Markdown

| Artifact | File |
|----------|------|
| Prep pack | `prep/*.md` |
| Live Aid run sheet (scenes + BGM + handout reveals) | `sessions/<nnn>/live-aid.md` |
| Recap, notes, transcript, clue board | `*.md` |
| Prompt Packs | `assets/prompts/*.md` |
| Glossary | `glossary.md` |
| Player characters (Hub) | `pcs/<id>.md` |
| Human-readable export lists | tables inside the MD above |

Do **not** create parallel `bgm-cues.yaml` / `handout-reveals.yaml` unless an external tool explicitly requires them — Live Aid owns one MD file.

## YAML / JSON only for machine manifests (special purpose)

| File | Why not MD |
|------|------------|
| `module.yaml`, `campaign.yaml`, `session.yaml` | Stable ids / system / locale for scripts |
| `archive-manifest.yaml` | Astro publish contract |
| `hub.json` (generated) | Hub site build input |
| `token.json` | Token Spec sidecar next to PNG |
| `adapters/**/fixture.json` | Bot payload sketch |

When in doubt: write Markdown.
