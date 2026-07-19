---
title: "US-3 — Publish an approved draft as a live episode page"
status: proposed
issue: AImpostor-Syndrome/website#4
labels: [tracer-bullet, critical-path]
---

# US-3 — Publish an approved draft as a live episode page

**Issue:** [AImpostor-Syndrome/website#4](https://github.com/AImpostor-Syndrome/website/issues/4)

## Goal

Turn an approved draft (US-2) plus a video URL into a live episode page, using the template
(US-1c), published via Pages (US-1a). This is where the tracer bullet pierces the last layer:
AI-drafted content → public URL.

## Dependencies

Depends on **US-1c** (template) and **US-2** (draft). The convergence point of the tree.

## Requirements

- Take an approved draft + episode metadata (title, date, video URL) → a committed episode page
  in the website repo using the US-1c template.
- Human review gate: review draft → approve → publish, not auto-publish.
- Publishing = a commit to the website repo that Pages builds into a live page.
- The episode appears on the index.
- Document the end-to-end runbook: "session doc exists" → "public episode page live."

## Acceptance criteria

- [ ] An approved draft + video URL becomes a live episode page at a public URL.
- [ ] The embedded video plays on that page.
- [ ] The episode shows up on the index page.
- [ ] The full runbook is documented.
- [ ] Nothing publishes without a human approval step.

## Design handoff

Consumes US-1c's design — no separate design needed. Run `full-path-github` after 1c and US-2
land.
