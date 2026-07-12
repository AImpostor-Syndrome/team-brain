---
title: IMPOSTRS.AI
status: active
phase: Phase 1 — Capture
---

# IMPOSTRS.AI

> Building AI-native software in public, one engineering session at a time.

Two engineers sit down for a live working session each week. Rather than producing polished
tutorials, we document the real engineering process — uncertainty, design debates, mistakes,
experiments, successes. The twist: the thing we're building is the system that publishes the
story of us building it.

## Where it stands

**Phase 1 — Capture.** Nothing built yet. Team Brain was scaffolded on 2026-07-12; that's
the whole of it so far.

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

Two things from the source doc are unresolved and worth pinning down in the next session,
because they gate real design work:

- **The August build.** High-level requirements are open — video chat? a text thread? which
  providers? phone app, web app, or both?
- **Development strategy.** Do not build the giant system. One skill at a time: improve one
  capability, use it immediately, document the experience.

Source: [`initial_docs/idea_for_project.md`](../../../initial_docs/idea_for_project.md).
