# Plan alignment

Settled design vs repo status. Update when a decision changes.

| Decision | Status | Where |
|----------|--------|--------|
| Human GM toolkit (not AI Keeper) | Done | `CONTEXT.md`, charter, README |
| Beginner setup: folders first, then PDF guidance | Done | `trpg-campaign-setup`, `scripts/setup_vault.mjs --bootstrap` |
| Module + Campaign + Embedded Module | Done (layout); Embedded example optional | `docs/vault-layout.md`, setup skill |
| Session Archive = usable MVP | Done | `/sessions/<id>/` |
| Campaign Hub = upgrade home | Done | `/hub/`, `/pcs/<id>/` |
| Generic + CoC 7e first pack | Done | `systems/` |
| Hybrid assets (Prompt Pack + token script; BGM curated) | Done | handout-art, `make_token.py`, prepare `11-bgm.md` |
| Prep + Live Aid + Post | Done | skills 3–8 |
| Publish `players` / `public`, default players | Done (manifest field); public filter = no Keep Appendix | archive-manifest, sync |
| Bilingual surface | Done (UI `?lang=` + vault locales) | hub / sessions / pcs |
| Personal prep localization | Done (skill) | `trpg-localize` |
| Toolkit = skills + Astro + scripts + contracts + adapter stubs | Done | repo root |
| No runtime bots in this repo | Done | ADR 0002, `adapters/hktrpg/` stub only |
| 12 skills | Done | `skills/` |
| Vault Root external; `examples/vault` demo | Done | examples + `TRPG_VAULT_ROOT` / `TRPG_CAMPAIGN_PATH` |
| Astro Archive Generator | Done | ADR 0001, `archive/` |
| Token Spec 256 + `token.json` | Done | `scripts/make_token.py` |
| Export Contracts | Done | `contracts/` + sync `exports/` |
| STT external only | Done | `trpg-session-transcribe` |
| Image API optional | Done | `generate_assets.py` stub/API |

## Site map (aligned levels)

```
/           → redirect /hub/
/hub/       Campaign Hub (upgrade)
/sessions/N Session Archive (MVP usable)
/pcs/id     Character page (Hub)
```

## Still thin (acceptable)

- No real image API wiring in CI
- No second demo session (Hub list works with N≥1)
- Adapter stubs are fixtures only
- Miniature / 3D remain curate-only (no skill)
