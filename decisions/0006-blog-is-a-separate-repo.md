---
title: The website is a separate repo; the brain reads, the website publishes
date: 2026-07-18
status: active
---

# The website is a separate repo; the brain reads, the website publishes

## Context

The first tracer bullet publishes an AI-drafted post to a web page (see
[`projects/aimpostor-syndrome/`](../projects/aimpostor-syndrome/)). That raised a real
question: does the website live inside `team-brain`, or in its own repo?

The case for putting it in the brain was genuine and worth stating, because it's the case a
future agent will re-make:

- The brain is self-encapsulated — it already holds who we are, how we decide, what happened.
- In a sense the brain *is* the product, so publishing from it is natural.
- The post-generation step wants to *read* the brain (session docs, decisions, our voice) to
  write good posts. Co-locating input and output looks convenient.

## Decision

Two repos. `team-brain` holds reasoning and stays private-by-default; **`AImpostor-Syndrome/website`**
holds only website content and is the thing published to GitHub Pages. The post-generation
agent **reads** the brain and **writes** to the website repo. It has access to both.

## Why

**The Pages collision is disqualifying, on its own.** GitHub Pages publishes the *whole repo*
at one public domain. If the brain and website shared a repo, we could not publish the site
without publishing the brain — every decision doc, every raw session record, every internal
note would become a public URL. There is no per-file "keep this private" on Pages. That single
constraint ends the debate; everything below is why we're *glad* it does.

**"The brain is the product" argues for separation, not against it.** If the brain is the
product, its shape has to stay pristine — reasoning, indexed, greppable, fast to read when an
agent's context is scarce. Bolting Jekyll config, HTML templates, and CSS into it makes its
shape half-reasoning, half-website-scaffold, and erodes the very premise of
[`decisions/0001`](0001-brain-holds-reasoning-not-code.md). Keeping the site separate is how we
*protect* the product.

**This is 0001 applied a second time, not a new pattern.** The brain already specifies skills
whose *scripts* live elsewhere (`jwrobes/skills`). The website is another "elsewhere": the
brain reasons, the website is an execution artifact that lives where it executes. Same rule,
same shape, new instance. Recording it means the next artifact that raises this question has a
precedent instead of a fresh debate.

The convenience we gave up — reading brain files to generate posts — costs nothing, because an
agent with access to both repos reads the brain and writes the site just as easily across a
repo boundary as within one.

## Rules out

- **Website/Jekyll/Pages config, HTML, or CSS committed to `team-brain`.**
- **Serving the brain itself on GitHub Pages.** It is not a published surface; it is the team's
  private reasoning store.
- **A single repo for both, "with the private stuff in a folder we don't link."** Pages
  publishes the folder anyway. Unlinked is not unpublished.

Revisit only if GitHub Pages gains true per-path privacy, which would remove the collision
constraint — but the shape-of-the-product argument would still stand.
