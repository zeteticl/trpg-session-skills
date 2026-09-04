# TRPG Session Skills

Human GM (Keep) toolkit: prepare a Module, run light Live Aid, recap a Session, publish a Session Archive. Not an AI Keeper/DM.

## Docs

- [CONTEXT.md](./CONTEXT.md) — glossary
- [docs/skills-charter.md](./docs/skills-charter.md) — skill boundaries (source of truth)
- [docs/vault-layout.md](./docs/vault-layout.md) — vault paths
- [docs/adr/](./docs/adr/) — decisions

## Skills (1–12)

Install via this repo’s `skills/` (Cursor: `.cursor/skills` junctions).

| Skill | Job |
|-------|-----|
| `trpg-router` | Route intent only |
| `trpg-campaign-setup` | Empty vault shells |
| `trpg-scenario-analyze` | Prep structure pack |
| `trpg-localize` | Translation + glossary |
| `trpg-handout-art` | Prompt Packs + paths |
| `trpg-live-aid` | Session run sheet |
| `trpg-session-recap` | Recap from notes |
| `trpg-archive-publish` | Manifest + Astro Session Archive |
| `trpg-vault-tidy` | Rename/move + INDEX |
| `trpg-session-transcribe` | Normalize external STT |
| `trpg-asset-generate` | Prompt Pack → assets (API or stub) |
| `trpg-campaign-hub` | Multi-session Hub + clue board |

## Quick start

1. Set vault root, e.g. `examples/vault` or your own folder.
2. `/trpg-campaign-setup` (or ask the agent to run that skill).
3. Put module text in `modules/<id>/source/`, then analyze → optional localize → handout-art → live-aid → play → notes → recap → publish.

```bash
# Token from a portrait (optional Pillow)
python scripts/make_token.py examples/vault/modules/lantern-on-the-pier/assets/portraits/chen-wei.png --name "Chen Wei" --border "#334455"

# Prompt Packs → stub assets (or set TRPG_IMAGE_API_URL)
python scripts/generate_assets.py --module examples/vault/modules/lantern-on-the-pier

# Build Session Archive + Campaign Hub
cd archive && npm install && npm run build
# Hub: archive/dist/hub/index.html
```

## Example vault

`examples/vault` — short original CoC-flavored module **Lantern on the Pier** / 碼頭燈籠, plus a demo campaign session with notes and recap.

## License

MIT. Example module text is original to this repo. Call of Cthulhu is a trademark of Chaosium; this project is unofficial fan tooling.
