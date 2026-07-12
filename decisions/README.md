# Decisions

Choices that would be expensive to revisit. One document each.

Not every choice belongs here — most are cheap to reverse and should just be made. The test
is: **if someone reversed this without knowing why we chose it, would that cost us real
time?** If yes, write it down. If no, don't; a decisions folder full of trivia is one nobody
reads.

An agent about to contradict a past call should find it here first.

## Decisions

| Date | Decision | Rules out |
|---|---|---|
| 2026-07-12 | [Team Brain holds reasoning, not code](0001-brain-holds-reasoning-not-code.md) | Skill scripts living in this repo |

Newest first.

## Adding a decision

Create `decisions/NNNN-<slug>.md` with this frontmatter:

```yaml
---
title: <the decision, stated as a claim>
date: 2026-07-12
status: active | superseded
---
```

Four sections, in this order:

- **Context** — what forced the choice.
- **Decision** — the call, stated plainly.
- **Why** — the reasoning. This is the section that matters; it's what an agent needs when
  the world has changed and it's deciding whether the call still holds.
- **Rules out** — what this forecloses. Be specific, because this is what makes the doc
  useful to someone about to do the thing you ruled out.

Superseding a decision does not mean deleting it. Mark it `superseded`, link forward to the
one that replaced it, and leave the reasoning intact — a decision you reversed is evidence
about how you think, and the next agent to face the same question benefits from seeing the
first answer and why it stopped being right.
