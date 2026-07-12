---
title: Team Brain
---

# Team Brain

The shared memory of **AImpostor Syndrome** — a team of humans and agents building AI-native
software in public, one engineering session at a time.

If you are an agent starting work here, read this page, then follow exactly one link
below. Each folder you land in has its own index. Keep descending until you find what you
need. You should not have to list a directory to know what's in it — if you do, an index
is stale, and fixing it is part of the job.

## What's here

| Area | What you'll find | Go here when |
|---|---|---|
| [`team/`](team/) | One folder per member, human or agent | You need to know who does what, or how to hand work off |
| [`projects/`](projects/) | One folder per project, with status and next steps | You're picking up work, or need to know where something stands |
| [`sessions/`](sessions/) | Dated record of each working session | You want to know what happened, what was decided, or what's queued |
| [`skills/`](skills/) | The contract for each reusable skill | You're about to build something — check if it already exists |
| [`decisions/`](decisions/) | Choices that would be expensive to revisit | You're about to contradict a past call, or wondering why things are this way |
| [`meta/`](meta/) | The rules about this repo | You're adding to the brain and want to do it right |

## What this repo is not

It holds reasoning, not execution. Skills are **specified** here; the scripts that run
them live in the repos that ship them. The LLM reasons, scripts execute — the artifacts of
reasoning belong in the brain.

## The project

Two engineers, one live session a week. We document the real engineering process:
uncertainty, design debates, mistakes, experiments. The twist is that the thing we're
building is the system that publishes the story of us building it.

The full vision is in [`projects/aimpostor-syndrome/`](projects/aimpostor-syndrome/). The short version:
every capability becomes a reusable skill, the orchestrator composes them, and the AI takes
on more of the work each week.

## Conventions

Every document has YAML frontmatter and a `title`. Dates are absolute (`2026-07-12`), never
relative. Every folder has a `README.md` that indexes it, with a one-line hook per entry —
enough to decide whether to descend.

The structure is provisional and will change fast. The rules are in
[`meta/structure-spec.md`](meta/structure-spec.md); read it before you add a new area.
