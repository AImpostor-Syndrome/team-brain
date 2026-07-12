---
title: Sessions run on weekends, one hour, with the option to run over
date: 2026-07-12
status: active
---

# Sessions run on weekends, one hour, with the option to run over

## Context

The project's format is one live session a week, and the last ten minutes of each generates
the work the AI does before the next one. That only holds if the sessions actually happen on
a rhythm — a weekly cadence that slips becomes a monthly one, and the AI's queue goes stale
between them.

Two things were open after the first session: which days we meet, and how long we sit.

The first session ran about an hour and ended with more to cover than time to cover it. That
is the useful data point, and it cuts both ways: an hour was enough to do real work, and not
enough to finish.

## Decision

**Weekends.** Next session is the weekend of 2026-07-18/19. The weekend after that
(2026-07-25/26) is out — neither of us is available.

**One hour, with the explicit option to keep going** when there's more on the table. Not
ninety minutes on the calendar.

## Why

Weekends, because both of us are actually free then and a session that competes with a
workday loses. The cost of a weekday slot isn't that it's impossible, it's that it gets
rescheduled — and a rescheduled session breaks the weekly heartbeat the whole publishing
pipeline is timed against.

One hour rather than ninety minutes, because the hour is the commitment and the overflow is
the option. Booking ninety minutes makes ninety minutes the floor: the session expands to
fill it, and the calendar cost goes up whether or not the extra half hour was needed. Booking
sixty and running long when there's a reason keeps the default cheap and the exception
available. The failure we're guarding against is not "we ran out of time," it's "we stopped
showing up because it got expensive."

This is written down rather than left as a shared understanding because it shapes everything
downstream — the publishing cadence, how much the AI can be expected to do between sessions,
and how much scope a single session's plan should carry. An agent planning a session's work
needs to know it's planning for an hour, not an afternoon.

## Rules out

- **Weekday or weeknight sessions.** If this changes, it's a new decision — don't quietly
  drift into it, because the whole cadence is downstream of it.
- **A fixed hard stop at 60 minutes.** Running over is explicitly allowed. An agent should
  not truncate a session plan on the assumption that the hour is a wall.
- **Booking 90-minute blocks by default.** That was the alternative considered and rejected.
- **Planning a session's scope as if it were open-ended.** One hour is the planning unit.
