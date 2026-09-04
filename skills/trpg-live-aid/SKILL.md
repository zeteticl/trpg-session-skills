---
name: trpg-live-aid
description: >
  Build a GM session run sheet: BGM cue order, handout reveal order, scene switches for one Session.
  Use when 開團表, live aid, BGM 順序, handout 揭示, or /trpg-live-aid.
  Not an AI Keeper: no dice, no NPC voice, no post-session recap.
---

# trpg-live-aid

## Inputs

- Campaign + session path
- Module `prep/11-bgm.md`, handout list, `07-locations.md`, session plan
- Contracts: `contracts/bgm-cue-list.example.yaml`, `handout-reveal.example.yaml`

## Writes

`campaigns/<cid>/sessions/<nnn>/live-aid.md` containing:

1. Scene switch list (order)
2. BGM cues for **tonight** (operation order) — may also write `bgm-cues.yaml` matching `bgm-cue-list/v1`
3. Handout reveal order — may write `handout-reveals.yaml` matching `handout-reveal/v1`

## Hard rules

- Human GM runs the table; you only prepare the sheet.
- No dice, no portraying NPCs, no writing `recap.md`.
- Module-level BGM catalog stays in analyze’s `prep/11-bgm.md`; you only sequence for this Session.
