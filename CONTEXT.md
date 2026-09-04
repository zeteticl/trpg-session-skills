# TRPG Session Skills

Agent skills and conventions that help a human Keep (KP/GM) prepare a reusable Module, run it inside a Campaign, generate or curate table assets, and publish a Session Archive site. Not an AI Keep/DM engine.

## Language

### People

**Keep**:
The human facilitator who prepares, runs, and archives play. Synonyms in the wild include KP and GM; this project uses Keep as the canonical role name.
_Avoid_: AI DM, AI KP, host bot (as the primary actor)

**Player**:
A human participant who plays a Player Character and may later read a published Session Archive or Campaign Hub.

### Containers

**Module**:
A reusable scenario package: beats, clues, NPCs, handout specs, and asset manifests. It can be referenced by more than one Campaign.
_Avoid_: adventure (ambiguous), one-shot folder (when the content is meant to be reusable)

**Campaign**:
The authoritative play vault for one ongoing table: which Module(s) are in use, Player Characters, session history, and table-specific state.
_Avoid_: server, discord, group (social containers, not the vault)

**Session**:
One seated play meeting under a Campaign, from prep freeze through recap publish.
_Avoid_: chapter (Module structure), episode (media metaphor)

### Deliverables

**Session Archive**:
The MVP published site for one Session: timeline, recap, unresolved clues, handouts, and linked media. Static and shareable.
_Avoid_: VOD site, stream archive (unless audio/video is explicitly the primary artifact)

**Campaign Hub**:
A multi-Session site with character pages and an unresolved-clue board. Served at `/hub/` (characters at `/pcs/<id>/`). Session Archives stay at `/sessions/<id>/`.
_Avoid_: treating Hub as a replacement for single-Session Archive publish

### Assets

**Portrait**:
A character likeness image used for NPCs or Player Characters.

**Token**:
A table-facing marker derived from a Portrait (typically cropped/cutout), not a full 3D miniature.
_Avoid_: 3D model, mini (unless explicitly a Miniature)

**Backdrop**:
A scene or location background image for mood or VTT.

**Handout**:
A player-facing prop (note, photo, document) with a defined reveal moment.

**BGM Cue**:
A curated music reference (track + when to play), not necessarily a generated audio file.

**Miniature**:
An optional curated 3D (or printable) figure reference. Out of scope for generation in the hybrid asset pipeline.
_Avoid_: Token (2D marker)

### Systems

**System Pack**:
A pluggable rules/flavor pack (glossary, beat types, check vocabulary) that extends a generic TRPG skeleton.
_Avoid_: hard-coding one ruleset into every skill

**Generic Skeleton**:
System-agnostic Module/Campaign/Session structures and workflows shared by all System Packs.

**CoC System Pack**:
The first concrete System Pack: Call of Cthulhu 7th Edition vocabulary (sanity, investigation beats, handout-led reveals).

### Workflow slices

**Prep**:
Work on a Module or Campaign before seating: analysis, localization, asset generate/curate, live-aid lists.

**Live Aid**:
Lightweight in-session Keep references (BGM Cue order, Handout reveal order, scene switch notes). Not dice engines, combat trackers, or AI-spoken NPCs.
_Avoid_: AI Keep, VTT bot

**Post**:
After a Session: recap, clue board update, Session Archive publish.

### Publishing

**Publish Mode**:
How a Session Archive is intended to be shared: `players` (default, table-only) or `public` (portfolio/promotion). Keep remains responsible for rights of Module text and assets.

**Keep Appendix**:
Optional Keep-only notes excluded from the Player-facing Archive. Encryption is not required for MVP.

### Localization

**Personal Prep Localization**:
Translating Module text for the Keep's own table prep. Default Archive Publish Mode is `players`; redistributing full copyrighted Module text is out of policy for this toolkit's guidance.
_Avoid_: treating the toolkit as a piracy/redistribution pipeline

### Repository scope

**Toolkit Repo**:
This repository contains agent skills, the Session Archive static-site generator, and asset-pipeline scripts (Portrait/Token/Backdrop helpers, BGM Cue manifests). Runtime bots and hosted services belong elsewhere.
_Avoid_: Discord/HKTRPG bot, multi-tenant hosting (in this repo)

### Language policy

**Bilingual Surface**:
Skills, glossaries, and Archive UI copy are maintained in Traditional Chinese and English in parallel. Rules keywords from a System Pack keep their canonical official forms (e.g. English CoC terms) alongside localized glosses.

### Vault layout

**Campaign Vault**:
A single filesystem vault that may contain many Modules and Campaigns. Canonical layout uses `modules/<module-id>/` for reusable Module packages and `campaigns/<campaign-id>/` for table state, Player Characters, Sessions, and overrides.
_Avoid_: one flat folder with mixed Module and Campaign files

**Embedded Module**:
A Module copied or authored inside a Campaign for one-shots when reuse is not required. Still shaped like a Module package so it can be extracted later.
_Avoid_: ad-hoc `01-scenario/` dumps with no Module manifest

### Token pipeline

**Token Spec**:
MVP Token output is a single transparent PNG (default 256×256) plus a small `token.json` sidecar (display name, border color). Multi-size and VTT bundles may be added later without changing the sidecar's core fields.
_Avoid_: treating Miniatures or VTT packages as MVP Token requirements

### Archive pipeline

**Archive Generator**:
A static-site builder in this Toolkit Repo that turns Campaign Session markdown/MDX and assets into a Session Archive. Chosen direction: Markdown/MDX → Astro.
_Avoid_: Obsidian-only publish as the primary generator; framework-free HTML as the long-term Hub path

**Archive Manifest**:
The structured description of one Session Archive (pages, media, Publish Mode, locale). The generator and any future adapters consume this contract.

**Session Notes**:
Keep-authored structured notes that are the primary input to Post/recap (timeline, rolls, clue checks).
_Avoid_: treating raw chat logs as the canonical Session record

**Transcript**:
Optional speech-to-text output attached to a Session. Produced outside the toolkit (e.g. local Whisper); skills only normalize and merge it into Session Notes / Archive content.
_Avoid_: bundling an STT runtime into this repo for MVP

### External edges

**Export Contract**:
Versioned JSON/YAML shapes for Archive Manifest, BGM Cue lists, and Handout reveal order, usable by bots or other tools without importing this repo's runtime.

**Adapter Stub**:
Optional `adapters/` sketches (interfaces + fixture data) that show how Export Contracts map to Discord/HKTRPG-shaped payloads. Not a running bot.
_Avoid_: shipping hosted bot code in this Toolkit Repo

### Vault binding

**Vault Root**:
The filesystem root of a Campaign Vault that skills and scripts operate on. Configured per Keep (path argument or env); not assumed to be this Toolkit Repo. The Toolkit Repo may ship an `examples/` vault for demos.
_Avoid_: storing the Keep's real Campaign data inside the Toolkit Repo by default

### Art pipeline (MVP)

**Prompt Pack**:
Named prompt files and naming rules for Portrait, Backdrop, and Handout art. MVP generates prompts and paths; calling a hosted image API is optional later.
_Avoid_: requiring an image API key to complete Prep

### Skills (ownership)

One job per skill. Full prose boundaries live in `docs/skills-charter.md`. Only the owner may create or overwrite its artifacts.

**Router Skill** (`trpg-router`):
Routes GM/Keep intent to the correct skill; writes no canon files.
_Avoid_: prep, recap, or publish work itself

**Setup Skill** (`trpg-campaign-setup`):
Creates empty vault trees and stub manifests (Module, Campaign, Session, Embedded Module).
_Avoid_: analysis, translation, art prompts, recap text
_Formerly_: trpg-campaign-scaffold

**Analyze Skill** (`trpg-scenario-analyze`):
Writes the Module prep structure pack from Module source: pacing, structure, 6W, core story and endings, background, timeline and events, reference reading, character analysis/intros, locations, GM and player tips, clues, NPCs, module-level BGM suggestions, system nodes, strategy tables, appendices, and scenario-specific systems.
_Avoid_: translation, Prompt Packs, Session Notes, site build, session-night BGM run sheets (Live Aid)

**Localize Skill** (`trpg-localize`):
Writes localized Module text and glossary entries for Personal Prep Localization.
_Avoid_: redrawing the prep structure pack, publishing Archives

**Handout Art Skill** (`trpg-handout-art`):
Writes Prompt Packs and asset path stubs for Portrait, Backdrop, Handout.
_Avoid_: Token cropping (script), BGM selection, image API calls in MVP

**Live Aid Skill** (`trpg-live-aid`):
Writes the Session run sheet: tonight's BGM Cue order, Handout reveal order, scene switches.
_Avoid_: dice, NPC voice, post-session recap, site build; owning module-level BGM catalog (Analyze)

**Recap Skill** (`trpg-session-recap`):
Writes Session recap markdown and unresolved-clue updates from Session Notes ± Transcript.
_Avoid_: inventing events not in sources; building the static site

**Publish Skill** (`trpg-archive-publish`):
Writes Archive Manifest and runs Archive Generator → Session Archive (`players`|`public`).
_Avoid_: rewriting recap prose; running bots

**Tidy Skill** (`trpg-vault-tidy`):
Renames/moves files to vault conventions, dedupes, refreshes INDEX; no new narrative content.
_Avoid_: analyze/localize/recap authorship

**Transcribe Skill** (`trpg-session-transcribe`):
Normalizes an external STT file into a Transcript with speaker tags; does not run Whisper.
_Avoid_: writing the Player-facing recap (Recap does)

**Asset Generate Skill** (`trpg-asset-generate`):
Calls a configured image API from an existing Prompt Pack to write asset files.
_Avoid_: inventing new prompts (Handout Art does); Token Spec conversion (script)

**Campaign Hub Skill** (`trpg-campaign-hub`):
Builds multi-Session Campaign Hub from existing Session Archives and Campaign state.
_Avoid_: replacing single-Session Archive publish (Publish Skill)

### MVP completion

**MVP Slice**:
Example vault path: Module → setup → analyze → Prompt Packs → Live Aid → Session Notes → Session Archive, plus Token Spec script, Export Contracts, Adapter Stub.

**Full toolkit slice**:
Also vault-tidy, session-transcribe (external STT only), asset-generate (API or stub), campaign-hub. Image API keys and Whisper runtimes remain optional/external.
