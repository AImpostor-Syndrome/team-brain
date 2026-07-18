---
title: Skills
---

# Skills

The contract for each reusable capability. **Specs only** — the scripts that execute a
skill live in the repo that ships them. This folder tells an agent what exists and what it
promises, so it doesn't rebuild something we already have.

Read this index before you build anything. That's the entire point of the folder: the
project's stated goal is to minimize wasted tokens by teaching the agent where reusable
tooling already exists, and this is where it looks.

## Skills

| Skill | Does | In | Out |
|---|---|---|---|
| [`scaffold-workspace`](scaffold-workspace.md) — **built** | Creates a workspace beside a clone: worktree, workbench, `.code-workspace` | Project + initiative name | Worktree on `build-<slug>`, paired workbench, plan card |
| [`youtube-publish-session`](youtube-publish-session.md) — **proposed** | Sets a session video's title, description, playlist, thumbnail. **Does not upload** — see [`decisions/0003`](../decisions/0003-manual-youtube-upload.md) | Video ID + session doc | Video metadata matching the brain; URL written back |

Still unbuilt, from the vision doc: transcribe audio, summarize a discussion, generate a blog
post, suggest podcast edits, publish a website, generate next week's tasks. Build one at a
time, use it immediately.

## Adding a skill

Create `skills/<slug>.md` with this frontmatter:

```yaml
---
title: <skill name>
status: proposed | built | deprecated
implementation: <repo/path where the script lives, or "none yet">
---
```

The body is a contract, and it should read like one:

- **Does** — one sentence. If it takes two, it's two skills.
- **Inputs** — exactly what it takes, with types.
- **Outputs** — exactly what it produces, with types.
- **Deterministic?** — say so plainly. If the skill calls a model, the output varies, and
  every caller needs to know that before it depends on the shape.

An orchestrator composes skills without knowing how they work. That only holds if the
contract is honest — a skill whose real behavior drifts from its spec is worse than one
that was never written down, because the orchestrator will keep trusting it.
