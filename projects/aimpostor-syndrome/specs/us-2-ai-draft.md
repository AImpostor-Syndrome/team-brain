---
title: "US-2 — AI drafts a proposed blog post from a session doc"
status: proposed
issue: AImpostor-Syndrome/website#3
labels: [tracer-bullet, critical-path]
---

# US-2 — AI drafts a proposed blog post from a session doc

**Issue:** [AImpostor-Syndrome/website#3](https://github.com/AImpostor-Syndrome/website/issues/3)

## Goal

Given a session doc from the brain, produce a **proposed** blog post (markdown) that a human
approves before publishing. The one AI step in the tracer bullet.

## Why this shape

Summarizes the hand-written session doc, **not** a video transcript — transcription (Whisper)
is the phase-2 swap. Keeps the hardest component out of the first slice. See
[`../../../decisions/0003-manual-youtube-upload.md`](../../../decisions/0003-manual-youtube-upload.md)
and the project's "no video processing yet" scoping.

## Inputs — the session folder

The skill reads a **session folder** (`sessions/YYYY-MM-DD/`), not a single file. Inside it:

- `README.md` — the distilled record (title, what was decided, what's queued). The *structure*
  of the post.
- `artifacts/transcript-*.txt` — the full verbatim transcript, declared in the README's
  frontmatter as `transcript:`. The *substance* — quotes, the actual back-and-forth, the color
  a good post needs. **This is the richer source, and the main input.**

Resolve the transcript by reading the `transcript:` frontmatter field, not by globbing — that's
the convention that keeps this robust as artifacts multiply.

**Open design choice (decide during enrichment):** transcript-only, doc-only, or both. Leaning
**both** — the session doc gives the skeleton and the decisions to foreground, the transcript
gives the voice and the specifics. Transcript-only risks a rambly post; doc-only loses the human
texture that makes it worth reading.

## Requirements

- Input: a session folder by path; the transcript located via the README's `transcript:` field.
- Output: a draft blog post in markdown — public-facing summary, not the internal record.
  Reflections and internal-only sections excluded (same stripping the `youtube-publish-session`
  skill already does).
- The draft includes a slot for the YouTube video URL/embed so US-3 can wire it in.
- **Proposed, not auto-published** — a human reads and approves. No direct write to the website
  repo in this step.
- Runs **locally** (read a file, write a file) per
  [`../../../decisions/0005-process-locally-for-now.md`](../../../decisions/0005-process-locally-for-now.md).
  Plain file I/O so it ports to a hosted runtime later.
- Determinism: state plainly that it calls a model (output varies). Follow the brain's
  skill-contract format.

## Acceptance criteria

- [ ] Given a real session folder (with a transcript), produces a readable markdown draft post.
- [ ] Resolves the transcript via the README's `transcript:` frontmatter field.
- [ ] Internal-only sections excluded from the public draft.
- [ ] The draft has a clear place for the video link.
- [ ] Runs locally against a file; writes a file; no hosted dependency.
- [ ] A skill contract is written in `skills/` per that folder's format.

## Design handoff

Content/skill story, not visual — likely does **not** need Claude Code Design. May benefit from
`grill-me` / `structured-backlog` during `full-path-github` enrichment.
