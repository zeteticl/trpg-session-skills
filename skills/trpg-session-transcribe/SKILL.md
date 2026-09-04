---
name: trpg-session-transcribe
description: >
  Normalize an external STT transcript into a Session Transcript with speaker tags.
  Use when 逐字稿, transcript, 整理錄音文字, Whisper output, or /trpg-session-transcribe.
  Does not run Whisper or write player-facing recap/site.
---

# trpg-session-transcribe

Charter §10.

## Inputs

- Path to raw STT text/file (Whisper or other) — **required**
- Campaign + session id
- Optional speaker map from GM (`KP`, PC names)

## Writes

`campaigns/<cid>/sessions/<nnn>/transcript.md`:

```markdown
# Transcript — Session <nnn>

Source: external STT (engine not run by this skill)
Normalized: <ISO date>

## Lines

- **[GM]**: …
- **[Maya]**: …
- **[Unknown]**: …
```

Also set `session.yaml` field `transcript: transcript.md` if the file exists.

## Steps

1. If no STT file path, stop and ask.
2. Clean obvious junk (timestamps-only lines, repeated filler), keep meaning.
3. Tag speakers when clear; else `Unknown` — do not invent dialogue.
4. Hand off to `trpg-session-recap` (recap reads transcript + notes).

## Hard rules

- Do not invoke Whisper/ffmpeg/cloud STT.
- Do not write `recap.md` or publish Archive.
- Do not fabricate lines missing from the STT source.
