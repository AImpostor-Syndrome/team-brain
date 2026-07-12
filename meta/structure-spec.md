---
title: Team Brain Structure Spec
status: provisional
supersedes: none
---

# Team Brain Structure Spec

**Status: provisional.** Jonathan has a spec in mind that he couldn't locate. This one
exists so work isn't blocked. When the real spec surfaces, reconcile the two and replace
this file — don't keep both.

## What this repo is

The shared memory of the AImpostor Syndrome team: humans and agents. It holds the *reasoning*
artifacts — who we are, what we're building, what we decided and why, what happened in
each session, and what our skills are contracted to do.

It does not hold executable code. Skills are *specified* here; their scripts live in the
repos that ship them. This follows from the project's own principle — the LLM reasons,
scripts execute — and it keeps the brain fast to read.

## The one rule: every folder is an index

An agent should never need to list a directory to know what's in it. Reading the folder's
`README.md` should be enough to decide whether to descend, and where.

So: **every folder has a `README.md`, and that README is an index.** An index is not a
file listing. Each entry is a link plus a one-line hook that answers "would I find what
I'm looking for in here?" A stale index is worse than no index, because an agent will
trust it.

## How an agent navigates

Land at root. Read `/README.md` — it names the five top-level areas and what each is for.
Pick one. Read that folder's `README.md`. Descend. Repeat until you hit a leaf document.

The depth should be shallow — most answers are two hops from root, three at the most. If
you find yourself four levels deep, the structure is wrong and should be flattened.

## Frontmatter

Every document carries YAML frontmatter. This is what makes the repo greppable, and it's
how an agent filters without reading. The required fields depend on the document type;
see the per-folder READMEs for the specifics. At minimum, every document has a `title`.

Dates are absolute (`2026-07-12`), never relative ("last week"), because a document
outlives the moment it was written.

## The five areas

- **`team/`** — one folder per member, human or agent. Who they are, what they're good at,
  how to hand work to them.
- **`projects/`** — one folder per project. What it is, where it stands, what's next.
- **`sessions/`** — one document per working session, dated. The raw record: what we
  discussed, what we built, what we decided, what the AI does before next time.
- **`skills/`** — one document per skill. The contract: what it does, inputs, outputs.
  Specs only; the scripts live where they run.
- **`decisions/`** — one document per decision that would be expensive to revisit. Context,
  the call, why, and what it rules out.
- **`meta/`** — the rules about the repo itself. This file lives here.

## Growth

This structure will be wrong within a month; that's expected. When a folder's index gets
long enough to be hard to scan, split it into subfolders — each with its own index. Add a
top-level area only when something genuinely doesn't fit the five; the cost of a sixth
area is that every agent has to learn it.
