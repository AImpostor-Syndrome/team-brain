---
title: Sessions
---

# Sessions

One document per working session, dated. This is the running record of the project: what we
discussed, what we built, what we decided, and what the AI picks up before next time.

Sessions are the heartbeat of this project — the format is one live session a week, and the
last ten minutes of each generates the work the AI does in between. So this folder is both
history and queue.

## Log

| Date | Session | What happened |
|---|---|---|
| 2026-07-18 | [Session 2 — TBD](2026-07-18-session-2.md) | *In progress — live doc.* |
| 2026-07-12 | [Scaffolding the brain, and the first skill that didn't survive contact](2026-07-12-scaffolding-the-brain.md) | Built the brain's six areas. Set the weekend cadence. Killed the planned YouTube uploader after finding API uploads lock videos private forever — split the pipeline instead. |

Newest first.

## Adding a session

Create `sessions/YYYY-MM-DD-<slug>.md` with this frontmatter:

```yaml
---
title: <what the session was about>
date: 2026-07-12
present: [jonathan, ...]
---
```

The body follows the episode format: where we started, what we discussed, what we built,
what we decided, and what's queued for the AI. Decisions that would be expensive to revisit
get lifted out into [`decisions/`](../decisions/) and linked from here — the session record
says *that* we decided, the decision doc says *why*, and the why is what an agent needs six
weeks later.

Add a row to the log above when you add a session. An unindexed session is a session no
agent will find.
