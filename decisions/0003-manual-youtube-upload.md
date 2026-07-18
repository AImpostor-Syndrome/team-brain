---
title: Session videos are uploaded to YouTube by hand; we automate the metadata around them
date: 2026-07-12
status: active
---

# Session videos are uploaded to YouTube by hand; we automate the metadata around them

## Context

Publishing the recording is the first link in the pipeline this project exists to build, so
the obvious move was to automate it: a skill that takes the session's `.mp4` and pushes it to
the channel via the YouTube Data API. We started to build exactly that.

Researching the API first turned up a restriction that invalidates the approach.

**Videos uploaded via `videos.insert` from an unverified API project are locked to private,
and the channel owner cannot unlock them.** This is not a privacy flag we set and can flip
back — it's applied by YouTube's backend after the fact, and Google's help center states
plainly that for videos locked this way "you will not be able to appeal." The only remedy is
to re-upload through the web UI, which is the thing the automation was supposed to replace.

The failure mode is nasty. The API call returns HTTP 200 with a video ID. The upload looks
like it worked. YouTube locks the video minutes later and emails you.

Lifting the restriction requires passing a YouTube **compliance audit** — a different process
from OAuth consent-screen verification, which is the thing most guides conflate it with.
Passing OAuth verification does *not* unlock uploads. The audit is a form built for
public-facing applications (it asks about your users, your data-retention policy, your UI),
takes weeks to months in practice with no published SLA, and fits a one-channel personal
script badly.

Sources: [Videos: insert](https://developers.google.com/youtube/v3/docs/videos/insert) ·
[Videos locked as private](https://support.google.com/youtube/answer/7300965) ·
[Quota and compliance audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)

## Decision

Jonathan uploads the session video through the YouTube web UI.

We automate everything *around* the upload — title, description, tags, playlist membership,
thumbnail — via `videos.update`, which is **not** subject to the private lock. The skill takes
a video ID that already exists and makes the channel agree with the session record in this
brain.

Quota is not a factor either way. As of 2025-12-04, `videos.insert` costs 1 unit in a separate
uploads bucket with a 100/day allocation; the old 1600-unit figure is superseded. The lock is
the only thing that matters here.

## Why

An automated upload that produces an unpublishable video is worse than no automation, because
it looks like it worked. We'd have shipped a skill whose contract said "publishes the session"
and whose actual behavior was "silently buries it."

The audit is a bet we don't need to take. It costs weeks of latency and a real chance of
rejection, and the thing it buys — skipping a five-minute drag-and-drop, once a week — is the
cheapest step in the pipeline. The expensive steps are transcription, summarization, and
writing the episode's description, and none of them are gated. Automating the un-gated 90% is
most of the value at none of the risk.

There's a general lesson here worth keeping, and it's the reason this doc is longer than the
decision needs: **a 200 from an API does not mean the thing you wanted happened.** We'd have
found this out by shipping a locked video. Reading the docs first cost twenty minutes.

Revisit this if we ever have a reason to pass the compliance audit for something else — if
the project ends up with a real user-facing app on the YouTube API, the audit comes with it,
and uploading becomes free at that point.

## Rules out

- **`videos.insert` anywhere in our pipeline.** Any skill spec proposing it should be checked
  against this doc first.
- **Browser-automating youtube.com to upload** (Selenium, Playwright, or driving the UI with
  a computer-use agent). This is the workaround everyone reaches for and it explicitly
  violates the YouTube Terms of Service, which bar accessing the service "using any automated
  means." The risk is not a broken script — it's channel termination. Named here specifically
  so that nobody, human or agent, helpfully adds it later.
- **Treating a successful API response as proof of publication.** Verify on the channel.
- **Uploading via API "as private, then publishing manually."** Does not work. That's the
  whole point — the lock is not a setting you can toggle.
