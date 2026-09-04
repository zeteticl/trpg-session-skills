---
name: trpg-archive-publish
description: >
  Build archive-manifest/v1 and generate a static Session Archive site (Astro) for one session.
  Use when 出站, publish archive, Session Archive, or /trpg-archive-publish.
  Does not rewrite recap prose or start bots. Default publish_mode is players.
---

# trpg-archive-publish

## Inputs

- Session with `recap.md` (required)
- `publish_mode`: `players` (default) or `public`
- Media under `media/`
- Never include `keep-appendix.md` in player output

## Steps

1. Write `archive-manifest.yaml` using `contracts/archive-manifest.example.yaml` as schema guide.
2. Copy or link player-facing markdown via `archive` sync (`npm run sync` scans all sessions); each Session Archive is served at `/sessions/<id>/`. Campaign Hub is `/hub/` (see `trpg-campaign-hub`).
3. Run from repo: `cd archive && npm install && npm run build` (or `npm run dev` for preview).
4. Report output paths (`/hub/`, `/sessions/<id>/`) and remind GM of rights for `public` mode.

## Hard rules

- Do not rewrite recap wording; fix only broken links/paths if required for build.
- Do not start Discord/HKTRPG bots; point at `adapters/hktrpg/` stubs only.
- Multi-session Hub is not this skill.
- Never publish `keep-appendix.md` or GM-only prep blocks into player pages.
