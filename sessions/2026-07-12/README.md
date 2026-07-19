---
title: Scaffolding the brain, and the first skill that didn't survive contact
date: 2026-07-12
present: [jonathan, nick]
recording: pending — see "What's queued"
---

# Scaffolding the brain, and the first skill that didn't survive contact

## Where we started

Nothing existed. No brain, no session records, no skills — just the idea and a repo name.
The session's job was to give the project a memory before giving it anything else.

## What we discussed

**Where reasoning lives versus where code lives.** The project's philosophy is that
everything is a skill: a markdown spec plus scripts. That immediately raised the question of
whether the scripts sit next to their specs. We decided they don't — this repo is read by
agents at the start of a task, when context is scarce, and source code crowds out the things
they actually come here for. Written up as
[`decisions/0001`](../../decisions/0001-brain-holds-reasoning-not-code.md).

**Cadence.** The format only works if the sessions actually happen weekly — a slipping
schedule means the AI's queue goes stale between them. Weekends work for both of us. An hour
turned out to be enough to do real work and not enough to finish, which is the argument for
booking one hour and allowing overflow rather than booking ninety minutes and making ninety
minutes the floor. [`decisions/0002`](../../decisions/0002-weekend-sessions-one-hour.md).

**Development strategy.** Confirmed, and it's the one that constrains everything else: do not
build the giant system. One skill at a time — improve one capability, use it immediately,
document the experience. This session is the first real test of it, and it held up in an
unexpected way (below).

## What we built

The brain itself: six top-level areas (`team/`, `projects/`, `sessions/`, `skills/`,
`decisions/`, `meta/`), each with a README that is an index rather than a file listing. The
structure spec is at [`meta/structure-spec.md`](../../meta/structure-spec.md) and is explicitly
provisional — it will be wrong within a month, and that's expected.

Two skill specs, which is the first time this repo has done the job it exists for:
[`scaffold-workspace`](../../skills/scaffold-workspace.md) (built — it's what created this
workspace) and [`youtube-publish-session`](../../skills/youtube-publish-session.md) (proposed).

Nick joined the team index.

## What we decided

| Decision | The short version |
|---|---|
| [0001](../../decisions/0001-brain-holds-reasoning-not-code.md) | The brain holds specs and reasoning; skill scripts live in the repos that ship them. |
| [0002](../../decisions/0002-weekend-sessions-one-hour.md) | Weekends, one hour, option to run over. Next: **2026-07-18/19**. The weekend of 2026-07-25/26 is out for both of us. |
| [0003](../../decisions/0003-manual-youtube-upload.md) | Session videos go up through the YouTube web UI by hand. We automate the metadata around them, not the upload. |

## The interesting failure

The plan was to build a skill that uploads the session recording to YouTube. We researched the
API before writing it, and found that **videos uploaded via `videos.insert` from an unverified
API project are locked to private permanently** — the owner cannot unlock them, and there is
no appeal. The call returns HTTP 200 and a video ID first. It looks like it worked.

So the skill we set out to build would have produced a tool that cannot do the one thing it
was built for, and would have failed in the worst possible way: silently, while reporting
success. Unlocking it means passing a YouTube compliance audit — weeks to months, designed for
public-facing apps, not one-channel scripts.

We split the pipeline instead. The upload is manual (five minutes, once a week, zero risk).
Everything around it — title, description, tags, playlist, thumbnail — runs through
`videos.update`, which is not subject to the lock. That's the un-gated 90%, and it's where the
time actually goes.

This is the "one skill at a time, use it immediately" principle paying for itself in week one.
Had we built the giant pipeline first, this would have surfaced as a mystery in production
weeks from now.

## What's queued for the AI

1. **Build `youtube-publish-session`** in `jwrobes/skills` — the metadata half. `videos.update`
   for title/description/tags, playlist add, thumbnail, and write the URL back into this
   file's `recording:` frontmatter.
2. **The recording.** Jonathan converts the Zoom capture and uploads it via the web UI; the URL
   lands here. It could not be done during the session — the `.zoom` file was still being
   written while we were planning.
3. **Jonathan's reflections**, to be read against the ones below.

## Reflections — Claude

**What went well.** Researching the YouTube API before building the uploader was the highest-
value twenty minutes of the session. The instinct to write the code first would have cost
weeks and produced a locked video and a confusing bug report.

**What I'd do differently.** I started this session ready to execute the five queued tasks in
order, and the first one was impossible for two independent reasons — the recording didn't
exist yet as a video file, and the upload path couldn't publish it. Both were discoverable in
the first two minutes by looking rather than by starting. The lesson isn't "research more," it's
that a task list handed over confidently still deserves to be checked against reality before
the first line of work, because *the list itself* can be the thing that's wrong.

**What I'd flag for next time.** The brain currently has more structure than content — six
indexes, a handful of documents. That ratio is fine now and will be a problem if it persists;
indexes are a cost paid per-read, and they only earn out if there's something behind them.
The next few sessions should add documents, not areas.

Also: `projects/aimpostor-syndrome/README.md` (then `projects/impostrs-ai/`) cited a source file
(`initial_docs/idea_for_project.md`) that does not exist anywhere on disk. Dead link in a repo
whose own spec says a stale index is worse than none. Fixed this session, but worth noticing
that the very first document written into the brain already had one.

## Reflections — Jonathan

*To be written. We'll read them against each other.*
