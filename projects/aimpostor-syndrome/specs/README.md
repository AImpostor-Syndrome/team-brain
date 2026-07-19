---
title: Tracer-bullet specs
---

# Tracer-bullet specs

Lightweight specs for the first tracer bullet — one per user story. These are the **input** to
the design + implementation pipeline, not the final design:

1. The spec below (goal, requirements, acceptance criteria) →
2. hand to **Claude Code Design (web)** for a full visual spec (visual stories only) →
3. attach that spec to the GitHub issue →
4. run **`full-path-github`** to implement.

Each spec links to its live issue on
[`AImpostor-Syndrome/website`](https://github.com/AImpostor-Syndrome/website). The dependency
tree that orders them is in the [project README](../README.md).

## Specs

| Story | Issue | Status | Design step |
|---|---|---|---|
| [US-1a — GitHub Pages publishes the site](1a-github-pages.md) | [#1](https://github.com/AImpostor-Syndrome/website/issues/1) | proposed | needs design spec |
| [US-1c — Reusable episode-page template](1c-episode-template.md) | [#2](https://github.com/AImpostor-Syndrome/website/issues/2) | proposed | needs design spec |
| [US-2 — AI drafts a proposed blog post](us-2-ai-draft.md) | [#3](https://github.com/AImpostor-Syndrome/website/issues/3) | proposed | skip — content, not visual |
| [US-3 — Publish an approved draft](us-3-publish.md) | [#4](https://github.com/AImpostor-Syndrome/website/issues/4) | proposed | consumes US-1c's design |
| [US-1b — About-us / landing page](1b-landing.md) | [#5](https://github.com/AImpostor-Syndrome/website/issues/5) | **deferred** | later |

## Build order

`#1 → #2 → #3 → #4`. #1 unblocks everything; #3 can run in parallel once #1 is up. #5 is
deferred — first to cut. See the [dependency tree](../README.md#first-tracer-bullet-decided-2026-07-18).
