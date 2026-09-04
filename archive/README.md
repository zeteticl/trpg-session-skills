# Session Archive + Campaign Hub (Astro)

## Levels

| Route | Level | Role |
|-------|--------|------|
| `/hub/` | Campaign Hub (upgrade) | Multi-session home, clue board, characters |
| `/sessions/<id>/` | Session Archive (MVP) | One night’s player-facing recap |
| `/pcs/<id>/` | Hub | Character page |
| `/` | — | Redirects to `/hub/` |

## Dev

```bash
cd archive
npm install
npm run sync   # scans examples/vault/campaigns/demo-table
npm run dev
```

Override campaign path: `TRPG_CAMPAIGN_PATH=examples/vault/campaigns/demo-table npm run sync`

Never syncs `keep-appendix.md`.
