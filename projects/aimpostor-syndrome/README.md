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
the wrong version of it ([session record](../../sessions/2026-07-12-scaffolding-the-brain.md)).

**Ruled out:** uploading session videos through the YouTube API, and browser-automating
youtube.com to do the same. See [`decisions/0003`](../../decisions/0003-manual-youtube-upload.md)
before proposing either.
