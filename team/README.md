---
title: Team
---

# Team

One folder per member — human or agent, indexed the same way. An agent looking for someone
to hand work to should be able to decide from this page alone.

## Members

| Member | Role | Folder |
|---|---|---|
| Jonathan Wrobel | Engineer. Co-host. | [`jonathan/`](jonathan/) |
| Nick | Engineer. Co-host. | [`nick/`](nick/) |

Agent members go here too, on equal footing — an orchestrator is a teammate, and the
handoff rules for one should read the same as for the other.

## Adding a member

Create `team/<name>/README.md` with this frontmatter:

```yaml
---
title: <Name>
type: human | agent
role: <one line>
---
```

The body answers three questions, because those are the three an agent actually needs:
what are they good at, what do they own right now, and how do you hand work to them. Skip
biography — this is an operational document, not an About page.
