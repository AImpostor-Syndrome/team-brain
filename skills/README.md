# Skills

The contract for each reusable capability. **Specs only** — the scripts that execute a
skill live in the repo that ships them. This folder tells an agent what exists and what it
promises, so it doesn't rebuild something we already have.

Read this index before you build anything. That's the entire point of the folder: the
project's stated goal is to minimize wasted tokens by teaching the agent where reusable
tooling already exists, and this is where it looks.

## Skills

*None specified yet.*

| Skill | Does | In | Out |
|---|---|---|---|

The candidates from the vision doc, none built: transcribe audio, summarize a discussion,
generate a blog post, suggest podcast edits, publish a website, generate next week's tasks.
Build one at a time, use it immediately.

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
