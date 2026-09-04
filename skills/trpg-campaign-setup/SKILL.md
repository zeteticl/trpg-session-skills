---
name: trpg-campaign-setup
description: >
  Create empty TRPG Campaign Vault shells: modules, campaigns, sessions, embedded modules.
  Use when the user asks to setup vault, 建團資料夾, 空殼, new module/campaign/session, or /trpg-campaign-setup.
  Does not analyze, translate, or write art prompts.
---

# trpg-campaign-setup

Follow `docs/vault-layout.md`. Charter: setup only builds empty houses.

## Inputs

- Vault Root (`TRPG_VAULT_ROOT` or path from GM)
- `module-id` and/or `campaign-id` and/or `session` number
- `system`: `generic` or `coc7` (default `coc7` if unspecified and CoC context)
- `embedded`: true → create under `campaigns/<id>/modules-embedded/`

## Steps

1. Ensure `<vault>/INDEX.md` exists (create stub listing modules/campaigns if missing).
2. For a Module: create tree under `modules/<module-id>/` with `module.yaml`, empty `source/`, empty `prep/` placeholders **as empty files or omit content files** — prefer creating directories + `module.yaml` only; do **not** fill prep analysis.
3. For a Campaign: `campaign.yaml`, `pcs/`, `sessions/`.
4. For a Session: `sessions/<nnn>/` with `session.yaml`, empty `notes.md`, empty `media/`.
5. Report created paths. Hand off: if source text exists → `trpg-scenario-analyze`.

## module.yaml stub

```yaml
id: <module-id>
system: coc7
title:
  zh-Hant: ""
  en: ""
locales: [zh-Hant]
```

## campaign.yaml stub

```yaml
id: <campaign-id>
system: coc7
title: ""
modules: []
```

## Hard rules

- Do not write prep structure, glossary translations, Prompt Packs, live-aid, or recap.
- Do not copy commercial module text into the vault.
