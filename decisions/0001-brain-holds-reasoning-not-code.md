---
title: Team Brain holds reasoning, not executable code
date: 2026-07-12
status: active
---

# Team Brain holds reasoning, not executable code

## Context

The project's engineering philosophy says everything is a skill, and a skill is a markdown
spec plus one or more scripts. When we scaffolded this repo, that raised an immediate
question: do the scripts live here, next to their specs, or somewhere else?

Keeping a skill's spec and its script together is genuinely appealing — one place to look,
no drift between contract and implementation.

## Decision

Team Brain holds specs, records, and reasoning. Skill scripts live in the repos that ship
them. Each skill spec here names its implementation location in frontmatter.

## Why

This repo's job is to be read — mostly by agents, often at the start of a task when context
is scarce. Every file in it competes for that attention. Source code is a large volume of
text that an agent almost never needs in order to answer the questions this repo exists to
answer: what did we decide, what exists already, where does this stand, who do I hand this
to.

It also follows the project's own split. The LLM reasons, scripts execute. The artifacts of
reasoning belong in the brain; the artifacts of execution belong where they execute, next
to their tests and their deploy path.

The cost is real: spec and implementation can drift. We accept that, and the mitigation is
the `implementation:` field — a spec that can't name where it runs is a spec for something
that doesn't exist yet, and should say `none yet`.

## Rules out

- Skill scripts, test suites, or runnable code committed to this repo.
- Treating a spec here as the source of truth for behavior. The code is the source of truth
  for what a skill *does*; the spec is the source of truth for what it *promises*. When they
  disagree, that's a bug in one of them — and worth a session note.

If this repo ever becomes something agents write to more than they read from, this decision
is the first one to revisit.
