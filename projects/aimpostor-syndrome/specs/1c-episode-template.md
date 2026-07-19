---
title: "US-1c — Reusable episode-page template"
status: proposed
issue: AImpostor-Syndrome/website#2
labels: [tracer-bullet, critical-path, needs-design-spec]
---

# US-1c — Reusable episode-page template (embeds & plays the video)

**Issue:** [AImpostor-Syndrome/website#2](https://github.com/AImpostor-Syndrome/website/issues/2)

## Goal

A reusable episode-page template: given a title, an AI-drafted summary, and a YouTube video
ID, render a page that embeds and **plays** the video and shows the summary. This is the shape
every published episode pours into.

## Requirements

- Template takes at minimum: episode title, date, YouTube video ID/URL, summary (markdown or
  HTML) → produces one episode page.
- The video is embedded and playable inline (privacy-friendly `youtube-nocookie.com` preferred,
  not required for the tracer bullet).
- The summary renders readably beneath/beside the video.
- Repeatable: publishing episode N is "provide the fields → get a page," not hand-editing HTML.
- An episode index/list page linking to each episode (can be minimal).
- Responsive: works on phone and desktop; the video never overflows the viewport.

## Acceptance criteria

- [ ] Given title + video ID + summary, the template produces a working episode page.
- [ ] The embedded video plays inline on the published page.
- [ ] The summary is rendered and legible.
- [ ] An index page lists episodes and links to them.
- [ ] Adding a second episode requires no template edits, only new content.

## Design handoff

Needs a full visual spec. Hand to Claude Code Design (web) for episode-page layout (video +
summary composition), the index treatment, and how metadata is shown — consistent with 1a's
system. Attach the spec to the issue, then run `full-path-github`.
