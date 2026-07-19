---
title: "US-1a — GitHub Pages publishes the site"
status: proposed
issue: AImpostor-Syndrome/website#1
labels: [tracer-bullet, critical-path, needs-design-spec]
---

# US-1a — GitHub Pages publishes the site

**Issue:** [AImpostor-Syndrome/website#1](https://github.com/AImpostor-Syndrome/website/issues/1)

## Goal

Stand up GitHub Pages for `AImpostor-Syndrome/website` so that committing to the repo
publishes to a public URL. This is the foundation every other website story sits on — until
this works, nothing can be published.

## Requirements

- GitHub Pages enabled, building from a documented source (branch + folder, or Actions).
- A minimal but real homepage renders at the Pages URL (not the default 404).
- A documented, repeatable publish step: "commit X → page updates at Y."
- Custom-domain readiness: the repo owns `aimpostorsyndrome.com`; leave a clear config stub
  for pointing the domain at Pages (DNS is a human step, not in this issue).
- Static site generator choice is open — pick the simplest thing that supports per-episode
  pages later (plain HTML or a light generator; heavy frameworks are out of scope).

## Acceptance criteria

- [ ] Visiting the Pages URL returns a real homepage, HTTP 200.
- [ ] A commit results in a visibly updated published page.
- [ ] README documents the publish flow and local-preview command.
- [ ] Custom-domain config path is documented (even if DNS isn't wired yet).

## Design handoff

Needs a full visual spec before implementation. Hand the **design brief below** to Claude Code
Design (web), attach an initial branding image (see below), get back a full visual spec, attach
it to the issue, then run `full-path-github`.

### Branding image

An initial branding image will be attached to seed the visual direction — palette, mood, logo
feel. Claude Code Design should treat it as the jumping-off point: pull the color story and
tone from it rather than inventing a look from scratch.

> **TODO (Jonathan):** attach the branding image to issue #1 and drop the file in
> `projects/aimpostor-syndrome/branding/` so the brief and the image travel together.

### The prompt for Claude Code Design

> Design the homepage for **AImpostor Syndrome** — a web show where two engineers, Jonathan and
> Nick, build AI-native software *in public*, one live session a week. Each episode is a real
> working session: uncertainty, design debates, mistakes, experiments — not a polished tutorial.
> The twist the audience is here for: the thing we're building is the system that publishes the
> story of us building it. An AI teammate that slowly comes to life, on camera.
>
> The name is a pun — *impostor syndrome*, the feeling every engineer knows, plus "AI." Lean
> into that: it's honest, a little self-deprecating, technical but human. Not corporate, not
> hype. Think "two people who know what they're doing and are willing to show the messy parts."
>
> **This homepage's job:** tell a first-time visitor what the show is in five seconds, and point
> them at the episodes. It's the front of a site whose core unit is an *episode page* — an
> embedded YouTube video plus an AI-drafted written summary (that page is spec'd separately in
> US-1c, and the homepage must feel like the same product).
>
> **Use the attached branding image** as the starting point for palette and mood — build the
> system outward from it rather than replacing it.
>
> **Deliver:** a homepage layout with a hero that states the thesis, an episode list/preview,
> and a short "what this is" section; plus the design tokens (palette as named hex, type pairing,
> spacing scale) so the episode template can inherit them. It's published on GitHub Pages, so
> keep it static-site-friendly — no heavy framework.
>
> Tone of the design itself: confident and clean, with one real point of view. Avoid the
> generic "AI startup landing page" look (purple gradient hero, Inter everywhere, emoji section
> markers). This is a builder's show — it can look like it was made by people with taste who
> sweat the details.

Context the designer may want, in the brain: the [project README](../README.md) (what the show
is and where it's headed) and [`decisions/0004`](../../../decisions/0004-project-name.md) (the
name, and the impostor-with-an-o spelling).
