# Session Archive (Astro)

Minimal static site for one or more Session Archives.

## Dev

```bash
cd archive
npm install
npm run sync   # copies example session player-facing md into src/content
npm run dev
npm run build
```

`npm run sync` reads:
`../examples/vault/campaigns/demo-table/sessions/001/`
and writes player-facing files into `src/data/session/` (never `keep-appendix.md`).

`npm run sync:hub` reads campaign `hub/` into `src/data/hub/` for `/hub`.
