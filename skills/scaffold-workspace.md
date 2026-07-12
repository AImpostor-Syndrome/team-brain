---
title: scaffold-workspace
status: built
implementation: jwrobes/skills — `scaffold-workspace/SKILL.md`
---

# scaffold-workspace

## Does

Creates a project workspace beside an existing clone — a git worktree on its own branch, a
paired workbench folder, a workspace `CLAUDE.md`, and a `.code-workspace` file — so an
initiative has a working surface separate from the repo it changes.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Project name | string | The repo must **already be cloned**. The skill does not clone. |
| Initiative name | string | `lowercase_with_underscores`. Becomes the workbench folder and part of the worktree name. |
| Branch name | string | Defaults to `build-<slug>`. Must not already exist. |
| Reference projects | list, optional | Other repos to expose in the `.code-workspace`. |
| Shared bootstrap files | list, optional | e.g. `.env.local`. Created once at the workspace root, symlinked into each worktree, gitignored. |

## Outputs

- `<root>/<project>_workspace/` containing `workbench/<initiative>/`, `.claude/skills/`,
  `CLAUDE.md`, `.gitignore`, and its own git repo.
- A git worktree at `<root>/<project>_workspace/<project>-<slug>/` on branch `build-<slug>`,
  created from the main clone.
- A `.code-workspace` file scoped to the initiative.
- A plan card in the work repo's `plans/active/<slug>.md`.

One canonical `<slug>` is used for all of them — worktree dir, branch, workbench folder, plan
card — because the fleet dashboard pairs them by that slug. Inconsistency there is the main
way this skill's output goes wrong.

## Deterministic?

**No.** Two judgment calls are made by the model, not by a script:

1. **Flat vs. nested layout.** It resolves `<root>` by locating the main clone and taking its
   parent, rather than assuming `~/workspace/<project>/`. Getting this wrong creates
   directories in the wrong place.
2. **Relative path depth** in the `.code-workspace` file, which changes with the layout.

Everything downstream of those two calls is mechanical.

## Used

**2026-07-12** — built this workspace. `team-brain` sits in an org folder
(`~/workspace/AImposter-Syndrome/`), so it resolved to the **nested** layout and placed
`team-brain_workspace/` beside the clone inside the org folder rather than at
`~/workspace/`. That branch of the skill is the one that would have been easy to get wrong,
and it's the reason the layout question is called out above.

Result: `workbench/session-planning/` and the `team-brain-session-planning/` worktree on
`build-session-planning` — the two directories this session's work was done in.
