# Vault Layout

All skills operate on a **Vault Root** (path given by the GM or `TRPG_VAULT_ROOT`).

```
<vault>/
  INDEX.md
  modules/
    <module-id>/
      module.yaml                 # id, system, title, locales
      source/
        scenario.zh-Hant.md       # or scenario.en.md
        scenario.en.md            # optional second locale
      glossary.yaml               # localize owns
      prep/                       # analyze owns
        00-overview.md
        01-structure-and-6w.md
        02-story-and-endings.md
        03-background.md
        04-timeline.md
        05-references.md
        06-characters.md
        07-locations.md
        08-gm-player-tips.md
        09-clues.md
        10-npcs.md
        11-bgm.md
        12-system-nodes.md
        13-strategy.md
        14-appendices.md
        15-special-systems.md
      assets/
        prompts/                  # handout-art owns Prompt Packs
        portraits/
        backdrops/
        handouts/
        tokens/                   # token script output
  campaigns/
    <campaign-id>/
      campaign.yaml               # modules refs, system, table name
      pcs/
      sessions/
        <nnn>/
          session.yaml
          notes.md                # GM Session Notes (required for recap)
          transcript.md           # optional
          live-aid.md             # live-aid owns
          recap.md                # recap owns
          unresolved-clues.md
          keep-appendix.md        # not published to players
          archive-manifest.yaml   # publish owns
          media/
      modules-embedded/           # optional Embedded Module copies
```

Embedded Module: same shape as `modules/<id>/`, living under `campaigns/<id>/modules-embedded/<id>/`.
