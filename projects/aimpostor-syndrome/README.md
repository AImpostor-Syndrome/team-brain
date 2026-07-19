---
title: AImpostor Syndrome
status: active
phase: Phase 1 — Capture
---

# AImpostor Syndrome

> Building AI-native software in public, one engineering session at a time.

**The name is spelled `impostor`, with an "o."** That is the standard spelling and the one
used in the psychological term this project puns on. Everything canonical uses it:
`aimpostorsyndrome.com`, the YouTube channel, the GitHub org. The `imposter` variant is a
typo trap we already fell into once — see
[`decisions/0004`](../../decisions/0004-project-name.md).

Two engineers sit down for a live working session each week. Rather than producing polished
tutorials, we document the real engineering process — uncertainty, design debates, mistakes,
experiments, successes. The twist: the thing we're building is the system that publishes the
story of us building it.

## Where it stands

**Phase 1 — Capture.** Team Brain was scaffolded on 2026-07-12 and now has its first session
record, three decisions, and two skill specs — one built
([`scaffold-workspace`](../../skills/scaffold-workspace.md)), one proposed
([`youtube-publish-session`](../../skills/youtube-publish-session.md)).

Publishing is the live edge. We found that YouTube locks API-uploaded videos to private
permanently unless the project passes a compliance audit, so the upload stays manual and we
automate the metadata around it — [`decisions/0003`](../../decisions/0003-manual-youtube-upload.md).
Transcription and summarization, the expensive parts of Phase 1, are still unbuilt.

## What each session should eventually become

A podcast episode, a lightly edited video, a blog post, a searchable knowledge base, a
GitHub update, and the starting point for the next week's work. The long-term goal is for
nearly all of that to happen automatically.

## Philosophy

AI is most powerful as a teammate, not a chatbot. Rather than asking a model to "do
everything," give it reusable skills and let an orchestrator compose them. The orchestrator
shouldn't know *how* to do things — only which skill to invoke.

Everything is a skill: a markdown spec, one or more scripts, clear inputs, clear outputs,
deterministic where possible. The LLM reasons. Scripts execute. Skill contracts live in
[`skills/`](../../skills/).

## Phases

| Phase | What it delivers | Status |
|---|---|---|
| 1 — Capture | Zoom recording, Whisper transcription, transcript cleanup, basic artifacts | **Current** |
| 2 — Publish | Blog generation, GitHub Pages, episode pages, video embedding | Not started |
| 3 — Editorial | AI edit suggestions, human review, accepted edits become future guidance | Not started |
| 4 — Memory | Persistent knowledge, decision tracking, episode relationships, searchable history | Not started |
| 5 — Autonomous engineering | AI receives tasks, works through the week, produces PRs | Not started |

The phase table above is the long-arc map. It is **not** the build order — the first thing we
actually build is a thin vertical slice across phases 1–2, below.

## First tracer bullet (decided 2026-07-18)

**One sentence:** a hand-written session doc becomes an AI-drafted blog post, published to a
live web page that embeds and plays the episode's YouTube video.

This deliberately cuts a thin slice through the whole system rather than completing any one
phase. It proves the publish pipeline end-to-end — AI artifact → public URL, linked to the
video — **before** taking on the expensive parts.

**What it does NOT do, on purpose:** no video/audio processing. The AI summarizes the session
doc we already write by hand, not a transcript. Transcription (Whisper) is the phase-2 swap —
we change the *input* to the pipeline once the pipeline itself works. This was the main
push-back that shaped the slice: "summarize the video" smuggles transcription — the hardest
component — into step one and buries what the tracer bullet is meant to prove.

The AI output is a **proposed** blog post — a draft a human approves before it publishes, not
an auto-publish. Human stays in the loop.

### User stories & dependency tree

```
US-1: The website exists              ← FIRST. blocks publishing. no AI, no deps.
  1a. GitHub Pages site, publishing        (critical path)
  1b. 'about us' / landing page            (deferred — nice, doesn't block an episode)
  1c. blog-post template: embeds+plays        (critical path)
      a YouTube video + shows a summary
        │
        │  US-1 and US-2 are INDEPENDENT — build in parallel, they meet at US-3
        │
US-2: AI drafts a blog post
      in:  session doc (text)   out: draft post (markdown)   runs LOCALLY (see 0005)
        │
        └──► US-3: Publish
             human reviews draft → commit → Pages builds → public episode page
                                              linked to and playing the video
```

**In scope this slice:** 1a, 1c, US-2, US-3. **First to cut if the hour runs short:** 1b.

A rendered version of this tree is in [`tracer-bullet-flow.html`](tracer-bullet-flow.html)
(also hosted: [artifact](https://claude.ai/code/artifact/e38b07ea-91ef-424c-acf5-82bfcca6d832)).

> **Note — a deliberate exception to [`decisions/0001`](../../decisions/0001-brain-holds-reasoning-not-code.md).**
> 0001 keeps rendered/executable output out of the brain. This one `.html` diagram is kept
> anyway, on purpose: it *is* the plan, made legible, and it's small and self-contained. It's
> an exception, not a precedent — website code, skill scripts, and other rendered output still
> live in their own repos.

### The specs

Each story has a lightweight spec in [`specs/`](specs/) — goal, requirements, acceptance
criteria — that feeds the pipeline: spec → Claude Code Design (web) for a full visual spec →
attach to the issue → `full-path-github` implements. Issues live on
[`AImpostor-Syndrome/website`](https://github.com/AImpostor-Syndrome/website) (a separate repo,
per [`decisions/0006`](../../decisions/0006-blog-is-a-separate-repo.md)).

Related: [`decisions/0005`](../../decisions/0005-process-locally-for-now.md) — processing runs
locally for the tracer bullet, not hosted infrastructure.

## Session format

Each recording roughly follows: current progress → design discussion → pair engineering →
AI collaboration → next week's tasks. The final ten minutes generate the work the AI
completes before the next recording. The record of each is in [`sessions/`](../../sessions/).

## Guiding principles

Ship every week. Publish before perfect. Build reusable skills. Prefer deterministic scripts
over repeated prompting. Capture the real engineering process. Make the AI increasingly
responsible over time.

The audience isn't just watching software get built. They're watching an AI teammate slowly
come to life.

## Out of scope / open

**Still open — the August build.** High-level requirements are undecided: video chat, or a
text thread? Which providers? Phone app, web app, or both? This gates real design work and
should be closed in an upcoming session.

**Closed 2026-07-12 — development strategy.** Confirmed: do not build the giant system. One
skill at a time — improve one capability, use it immediately, document the experience. It
earned its keep in the first session, where researching one skill before building it killed
the wrong version of it ([session record](../../sessions/2026-07-12/)).

**Ruled out:** uploading session videos through the YouTube API, and browser-automating
youtube.com to do the same. See [`decisions/0003`](../../decisions/0003-manual-youtube-upload.md)
before proposing either.
