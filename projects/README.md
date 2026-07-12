---
title: Projects
---

# Projects

One folder per project. Each folder's README is the project's front page: what it is, where
it stands, what's next.

## Active

| Project | What it is | Status |
|---|---|---|
| [`aimpostor-syndrome/`](aimpostor-syndrome/) | The system that publishes the story of us building it | Phase 1 — Capture |

## Adding a project

Create `projects/<slug>/README.md` with this frontmatter:

```yaml
---
title: <Project name>
status: active | paused | shipped | abandoned
phase: <where it is now>
---
```

The body covers: what it is in two sentences, where it stands, what's next, and what's
explicitly out of scope. That last one saves more agent time than the other three combined
— it's the difference between an agent building the right thing and an agent building
something reasonable that nobody asked for.

As a project grows, give it subfolders with their own indexes rather than letting one
README sprawl. A project README you have to scroll is a project README nobody reads.
