# Source page citations

When prep or Live Aid content comes from a printed/PDF module, **cite the page** so the GM can flip the book at the table.

## Marker in extracted source

When extracting PDF → `scenario.*.md`, insert page anchors, e.g.:

```markdown
<!-- PDF p.12 -->
## …heading from that page…
```

Prefer the PDF viewer page number the GM will see. If only print page numbers exist, use `print p.12` and say so once in `prep/00-overview.md`.

## Citation format in prep / live-aid

Inline or column:

- Markdown: `（劇本 p.12）` / `(module p.12)`
- Tables: a **Page** / **劇本頁** column

If the source has no pagination (pure chat paste), write `p.?` — do not invent page numbers.

## Who must cite

| Skill | What gets a page |
|-------|------------------|
| `trpg-campaign-setup` | PDF extract must insert `<!-- PDF p.N -->` anchors |
| `trpg-scenario-analyze` | Every concrete beat, clue, NPC, location, SAN node, handout, BGM occasion |
| `trpg-localize` | Preserve page anchors; do not strip them |
| `trpg-handout-art` | Each Prompt Pack cites page of the described handout/NPC/scene |
| `trpg-live-aid` | Every scene / BGM cue / handout reveal cites page |
| `trpg-session-recap` | Cite Session Notes / Transcript, not module pages (unless GM quoted a page) |
