---
title: Branding
---

# Branding

Visual source-of-truth for AImpostor Syndrome, and the jump-off bundles for building the
website. A Claude Design export gave us two brand directions; we split them into two
self-contained bundles so each can be built into a full website version independently.

## What's here

| Folder | What it is |
|---|---|
| [`aimpostor-syndrome-branding-avatar/`](aimpostor-syndrome-branding-avatar/) | **Source bundle** — the original Claude Design export (both directions + shared assets). The source of truth; leave it intact. |
| [`option-gradient/`](option-gradient/) | **Jump-off — Gradient direction.** Violet→pink→coral, gradient-forward. Self-contained; hand to Claude Design to build a website. |
| [`option-solid-violet/`](option-solid-violet/) | **Jump-off — Solid Violet direction.** One restrained violet, no gradients. Self-contained; hand to Claude Design to build a website. |
| [`aimpostor-syndrome-homepage-color-gradient-version/`](aimpostor-syndrome-homepage-color-gradient-version/) | **Built homepage — Gradient.** Claude Design's homepage build from the Gradient direction. A candidate for issue #1. |
| [`aimpostor-syndrome-homepage-pure-violet-version/`](aimpostor-syndrome-homepage-pure-violet-version/) | **Built homepage — Pure Violet.** Claude Design's homepage build from the Solid Violet direction. A candidate for issue #1. |

## The two directions at a glance

| | Gradient | Solid Violet |
|---|---|---|
| Feel | Vibrant, energetic | Restrained, clean |
| Color | Violet `#8B5CF6` → pink `#E0559B` → coral `#FF6B5E` | Single violet `#9B7CFF` / `#7C5CF0` |
| Gradients | Load-bearing | Almost none |
| Shared | Dark ground `#0D1017`, cream `#F7F6F2`, same avatar/banner/lockup |

## The plan

1. ✅ Jonathan handed each `option-*/` bundle + the [design brief](../specs/1a-github-pages.md)
   to Claude Design → **two built homepage versions** (the two `homepage-*` folders above).
2. **Nick picks one** of the two homepage builds.
3. Its design spec is attached to
   [issue #1](https://github.com/AImpostor-Syndrome/website/issues/1) and built via
   `full-path-github`.
