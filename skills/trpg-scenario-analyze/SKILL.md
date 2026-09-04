---
name: trpg-scenario-analyze
description: >
  Analyze TRPG Module source into a full prep structure pack (pacing, 6W, story, timeline,
  characters, locations, clues, NPCs, module BGM, system nodes, strategy, appendices).
  Use when 備團分析, 拆劇本, analyze module, or /trpg-scenario-analyze.
  Not for translation, image prompts, or session notes.
---

# trpg-scenario-analyze

Charter §3. Layout: `docs/vault-layout.md`. System pack: `systems/<system>/`.

## When you start

Usually after `/trpg-campaign-setup` left `modules/<id>/source/scenario.*.md` in place.
If the GM is still in a setup chat, they should have been told to run **this** skill explicitly — Cursor does not auto-chain skills.

## Writes (only these)

Create/update files under `modules/<id>/prep/`:

| File | Content |
|------|---------|
| `00-overview.md` | Short GM overview + missing-section list |
| `01-structure-and-6w.md` | Pacing/structure + Who/What/When/Where/Why/How |
| `02-story-and-endings.md` | Core story + endings |
| `03-background.md` | Setting background |
| `04-timeline.md` | Timeline and events |
| `05-references.md` | Reference reading |
| `06-characters.md` | PC-facing / investigator roles if any |
| `07-locations.md` | Scenes and places |
| `08-gm-player-tips.md` | Tips for GM and players |
| `09-clues.md` | Clue list and links |
| `10-npcs.md` | NPCs |
| `11-bgm.md` | Module-level BGM suggestions (occasion, not tonight’s order) |
| `12-system-nodes.md` | System nodes (CoC: SAN, fights, gates…) |
| `13-strategy.md` | Strategy / walkthrough table |
| `14-appendices.md` | Appendices |
| `15-special-systems.md` | Scenario-specific systems |

If the source lacks material for a section, write the file with `Status: missing` and what to ask the GM — do not invent canon.

## Hard rules

- Answer “how does this play at the table”, not “how to translate” or “how to draw”.
- No Session Notes, no Prompt Packs, no Archive site.
- After structural change to source, re-run this skill; locale-only changes → `trpg-localize`.

## Hand-off

- Need translation → `trpg-localize`
- Need art prompts → `trpg-handout-art`
- Need tonight’s run sheet → `trpg-live-aid`
