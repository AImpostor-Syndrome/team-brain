---
title: The processing pipeline runs locally for the tracer bullet, not hosted
date: 2026-07-18
status: active
---

# The processing pipeline runs locally for the tracer bullet, not hosted

## Context

The first tracer bullet turns a session doc into an AI-drafted blog post published to a web
page (see [`projects/aimpostor-syndrome/`](../projects/aimpostor-syndrome/)). That pipeline
has to run somewhere. The question came up directly in session 2: do we run it on a local
machine, or stand it up in a box somewhere that runs automatically?

## Decision

Local, on one of our machines, for the tracer bullet. Automating and hosting it comes later,
as a deliberate migration once the pipeline exists and works.

## Why

The tracer bullet's job is to prove the *pipeline*, not the *operations*. Hosting adds a whole
second problem — where it runs, how it's triggered, credentials in a deploy environment,
paying for a box — none of which teaches us anything about whether "session doc → AI draft →
published page" actually holds together. That's the thing we're trying to learn first.

Running locally means the loop is: run a script, look at the output, fix it, run it again. No
deploy between each iteration. That's the fastest way to get the pipeline correct, and a
correct local pipeline is the thing you'd migrate anyway — so nothing is wasted.

It also matches the project's own principle of publishing before perfect and building one
capability at a time. Automation is a real capability with real value, but it's a *later*
one; adding it now is building ahead of what we've proven.

## Rules out

- **Standing up cloud/hosted infrastructure for the tracer bullet** — no server, no scheduled
  job, no container deploy for this slice.
- **Designing the summarize skill around a hosted runtime.** It should assume a local run
  (read a file, write a file). If that assumption gets baked in too hard it'll cost us at
  migration — so the skill's inputs/outputs should be plain files, which port fine either way.
- **Treating "automated and always-on" as part of the definition of done for the first slice.**
  Done means: it produces a published page from a session doc when we run it. Not: it does so
  unattended.

Revisit once the pipeline works locally and we're publishing weekly by hand — at that point
automation earns its keep, and this decision is the one to supersede.
