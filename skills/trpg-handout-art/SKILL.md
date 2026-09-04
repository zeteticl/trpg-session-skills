---
name: trpg-handout-art
description: >
  Write Prompt Packs and asset path naming for Portrait, Backdrop, and Handout art from module prep.
  Use when 出圖, prompt pack, NPC portrait, backdrop, handout art, or /trpg-handout-art.
  MVP does not call image APIs; Token crop is a script; BGM is not this skill.
---

# trpg-handout-art

## Inputs

- `modules/<id>/prep/06-characters.md`, `07-locations.md`, `10-npcs.md`, clue/handout mentions
- Asset dirs under `modules/<id>/assets/`

## Writes

Under `assets/prompts/`, one markdown or yaml pack per asset, plus an index `assets/prompts/INDEX.md`.

Naming:

- Portrait: `portrait-<slug>.md`
- Backdrop: `backdrop-<slug>.md`
- Handout: `handout-<slug>.md`

Each pack includes: target path (`assets/portraits|backdrops|handouts/<file>.png`), bilingual prompt text, negative cues, aspect ratio note.

## Hard rules

- Do not call image APIs (that is future `trpg-asset-generate`).
- Do not crop Tokens — tell GM to run `python scripts/make_token.py …`.
- Do not curate or order BGM.
- Do not write prep analysis or recap.
