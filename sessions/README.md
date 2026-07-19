---
title: Sessions
---

# Sessions

One **folder** per working session, dated. This is the running record of the project: what we
discussed, what we built, what we decided, and what the AI picks up before next time.

Sessions are the heartbeat of this project — the format is one live session a week, and the
last ten minutes of each generates the work the AI does in between. So this folder is both
history and queue.

## Log

| Date | Session | What happened |
|---|---|---|
| 2026-07-18 | [Session 2 — the first tracer bullet takes shape](2026-07-18/) | Scoped the first tracer bullet (session doc → AI blog post → published page), decided the website is a separate repo (0006) and processing stays local (0005), and turned it into 5 GitHub issues for `full-path-github`. |
| 2026-07-12 | [Scaffolding the brain, and the first skill that didn't survive contact](2026-07-12/) | Built the brain's six areas. Set the weekend cadence. Killed the planned YouTube uploader after finding API uploads lock videos private forever — split the pipeline instead. |

Newest first.

## Folder layout

Each session is a folder so its record and its raw artifacts stay together:

```
sessions/YYYY-MM-DD/
  README.md            <- the session record (the readable doc)
  artifacts/           <- raw material: transcript, and later the recording link, etc.
```

The `README.md` is the reasoning — the thing agents read. `artifacts/` holds the raw bulk (a
4,000-line verbatim transcript is not something you read top-to-bottom; it's source a
summarize-skill mines). Keeping it in a labeled subfolder keeps the record clean.

## Adding a session

Create `sessions/YYYY-MM-DD/README.md` with this frontmatter:

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

Drop raw artifacts (transcripts, exports) in `sessions/YYYY-MM-DD/artifacts/` and link them
from the record. Add a row to the log above when you add a session — an unindexed session is a
session no agent will find.
