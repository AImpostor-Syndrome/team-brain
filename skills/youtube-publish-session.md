---
title: youtube-publish-session
status: proposed
implementation: none yet — planned for `jwrobes/skills`
---

# youtube-publish-session

## Does

Given a YouTube video ID that already exists and the session doc it belongs to, sets the
video's title, description, and tags from the session record, adds it to the series playlist,
sets its thumbnail, and writes the resulting URL back into the session doc.

## Does not

**It does not upload the video.** That is a deliberate exclusion, not a gap to be filled in
later, and it is the single most important line in this contract.

Uploading via the API's `videos.insert` endpoint from an unverified API project causes YouTube
to lock the video to private permanently — the channel owner cannot unlock it, and there is no
appeal. The call returns HTTP 200 and a video ID first, so it *looks* like it worked. The full
reasoning and sources are in
[`decisions/0003`](../decisions/0003-manual-youtube-upload.md).

Jonathan uploads through the YouTube web UI. This skill takes it from there.

Anyone extending this skill: `videos.update` (what we use) is not subject to the lock;
`videos.insert` is. Do not add the latter without reading 0003 first. Driving youtube.com with
a browser automation tool instead is also ruled out there — it violates YouTube's ToS and the
risk is channel termination.

## Inputs

| Input | Type | Notes |
|---|---|---|
| `video_id` | string | From the manual upload. The 11-character ID, not the full URL. |
| `session_doc` | path | A `sessions/YYYY-MM-DD-<slug>.md` in this repo. Source of title and description. |
| `playlist_id` | string, optional | The series playlist. Skipped if absent. |
| `thumbnail` | path, optional | Image file. Skipped if absent. |

## Outputs

- The video on the channel, with its metadata matching the session record.
- The video URL written into the session doc's frontmatter (`recording:`), so the brain and
  the channel agree.
- Printed: the URL, and what actually changed.

## Deterministic?

**Mostly, and the boundary matters.**

- The API calls are deterministic — same input, same result.
- **Generating the description from the session doc is not.** If that step calls a model to
  summarize, the output varies between runs, and every caller depends on the shape. The first
  version should do the dumb, deterministic thing: lift the session doc's title and summary
  verbatim. Add generation only when there's a reason to, and say so here when it happens.

## Verifying it worked

Check the channel, not the response code. A 200 from this API is not proof that the thing you
wanted happened — that is the lesson 0003 was written to preserve, and it applies to this
skill's own tests.
