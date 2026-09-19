---
title: Anonymizer
status: active
phase: Phase 1, building
---

# Anonymizer

Lets a guest speak on the record without being identifiable in the published episode. It
covers the audio that ships to YouTube, the transcript, the episode metadata, and this brain.

**Status: building today, against a real recording.** The build spec lives in
[`AImpostor-Syndrome/anonymizer`](https://github.com/AImpostor-Syndrome/anonymizer) per
[decision 0001](../../decisions/0001-brain-holds-reasoning-not-code.md). This page holds the
reasoning and the open decisions.

That repo is private. Everyone in the org can read it.

The guest is on camera in a screen share and he speaks. An earlier draft of this page proposed
deferring video to a later phase on the theory that anonymized guests would keep cameras off.
That does not apply to this recording.

**Priorities, set 2026-09-19.** Hiding the face is P0, and losing some screen-share content to
the mask is an accepted cost. Bleeping personal references out of the audio is P0. A human
reviewing and approving the locked render before publish is P0. **Voice anonymization is P2 and
is not required to publish this video.** Work is tracked as
[issues on the implementation repo](https://github.com/AImpostor-Syndrome/anonymizer/issues).

## Two examples worth copying

**Voice actors, the radio standard.** This American Life and NPR-style shows transcribe the
interview and hire a performer of similar age and background to read it back, then cut the
performance into the episode. The audience is told, in the episode and in the show notes,
that the voice is an actor. Producers who have tried both report the performer is less
distracting than a filter or a synthetic voice, and reads as more honest
([The Podcast Host](https://www.thepodcasthost.com/presenting-your-podcast/protect-your-podcast-guest/)).

**Welcome to Chechnya (2020), digital doubles.** For 23 people fleeing Chechnya, David
France recruited LGBTQ activists in New York to lend their faces, shot them on a blue screen,
and machine-learning-mapped those faces onto the subjects. The film opens by telling you it
did this. It was the first documentary shortlisted for the visual effects Oscar
([Variety](https://variety.com/video/why-welcome-to-chechnya-used-deepfake-like-face-replacement-technology-to-protect-their-subjects/),
[Screen Daily](https://www.screendaily.com/features/how-welcome-to-chechnya-team-digitally-disguised-endangered-lgbtq-subjects/5157704.article),
[The Conversation](https://theconversation.com/deepfake-technology-unlocks-real-stories-of-lgbtq-persecution-in-welcome-to-chechnya-144053)).

Both teach the same three things:

1. **Replace, don't obscure.** A blurred face and a pitch-shifted voice are the original
   signal with noise on top. An actor's read and a donor's face are a different signal. The
   first can be attacked; the second has nothing to attack.
2. **Tell the audience you did it.** Both disclose up front. Undisclosed synthetic voice on a
   documentary podcast is a credibility problem, and disclosure costs nothing.
3. **The face and the voice are not the whole problem.** Recent work on long-form audio shows
   an attacker can re-identify a speaker from vocabulary, syntax, and turns of phrase even
   when the voice is fully disguised, and finds paraphrasing to be the effective defense
   ([arXiv 2510.12780](https://arxiv.org/html/2510.12780v2)). A guest who mentions their
   employer, their city, and a distinctive story is identifiable in plain text.

## What must not happen

The failure mode that matters is a leak that looks like a success. [Decision 0003](../../decisions/0003-manual-youtube-upload.md) is
the house example: a 200 response and a video nobody can watch. The equivalents here:

- **Reversible voice transforms.** A pitch shift is undone by shifting back. Anything we ship
  has to be non-invertible by construction.
- **A region where the transform silently didn't apply.** One unprocessed minute is the whole
  leak.
- **Names in the wrapper, not the content.** Zoom puts participant names in filenames and in
  VTT speaker labels. YouTube descriptions and chapter markers. This repo's `present:`
  frontmatter. Perfect audio next to a file called `interview-with-<name>.m4a` leaks.
- **Raw files outliving the episode.** If the original sits in a drive forever, we anonymized
  the publication and not the risk.

## The public-repo problem

`team-brain` is a public GitHub repo. Any mapping of pseudonym to real identity is the
deanonymization key, and it cannot live here, in a session doc, in a commit message, or in a
branch name. The brain gets pseudonyms and a pointer. The mapping lives in a private store we
pick as part of the consent decision below.

Naming this explicitly because it is exactly the file someone adds later for convenience.

## How a guest moves through it

1. **Before recording.** Consent captured, pseudonym assigned, and Zoom set to record a
   separate audio file per participant. That setting is capture-time only and it is a hard
   gate, not a preference. With his isolated track we edit his audio directly. Without it we
   have to find him inside a mixed track, which needs diarization and leaks at every boundary.
2. **During.** Hosts use the pseudonym out loud. Screen-share layout stays put, because layout
   changes are what break a fixed mask.
3. **After.** The pipeline runs automatically when the recording finishes saving.
4. **Before publish.** Judge report, then a human watches the masked video and scans a contact
   sheet, then the guest reviews and can still withdraw. After upload, withdrawal is not fully
   possible and the consent form has to say so.
5. **Publish.** Manual upload as unlisted, check the live artifact, then public. The manual
   upload in [0003](../../decisions/0003-manual-youtube-upload.md) is a safety feature here: a
   human is the last gate.

## What the pipeline does

Nine stages, each re-runnable. Full spec in the implementation repo.

| Stage | What it does |
|---|---|
| probe | Refuses to continue if per-participant audio is missing |
| detect-faces | Samples the video at low confidence, unions every box found |
| mask | Fills that union region black for the whole duration |
| transcribe | Word-level timestamps, guest track and mixed track separately |
| flag | Model proposes spans to cut, **human approves**, not autonomous |
| redact-audio | Mutes approved spans in place, never cuts |
| verify | Re-transcribes and re-detects against the output file |
| judge | Separate process, reads evidence, passes or fails closed |
| lock and approve | Freezes the render and records a human approval tied to its hash |
| revoice | P2. Replaces his track with synthesized speech. Not required to publish |

Two choices in there are load-bearing. **The mask is a fixed band across the top of the frame,
not a tracker,** because a tracker that drops one frame leaks that frame while a band that is
always there cannot. **The audio is muted rather than cut,** because cutting shortens the track
and desyncs it from the video permanently.

Nothing publishes without the approval record, and the record is tied to the file hash. Re-render
after approval and the approval stops applying.

## Running it automatically

The trigger is separate from the pipeline, and that separation is the point. Today a local
watcher on `~/Documents/Zoom` fires when a recording finishes saving. Later a storage event
fires the identical command in a hosted job.

Zoom writes the file progressively and then runs a conversion pass after the meeting ends, so
the watcher waits for the file size to hold steady rather than for the file to appear.

**The hosted phase has a constraint worth deciding early:** the pipeline sees unredacted media
and the identity list, so whatever hosts it inherits the full trust requirement. That is a
decision, not a deployment detail.

## The judge

A separate process that reads evidence and cannot change anything, because the thing that did
the work should not grade the work. It fails closed: any error is a failure.

Its report is itself a leak risk. A line reading `found "<real name>" at 00:14:32` is the
mapping, written to a file. The report carries timestamps, match counts, and salted hashes of
matched terms, never the terms. It runs locally only, because its inputs include the identity
list.

## The acceptance gate

**Re-transcribe the rendered episode and grep that.** Not the working transcript, the file
that ships. It is the only check that catches all four failures at once: a host saying the
real name aloud, a region the transform missed, an editing mistake, and a mixdown that
reintroduces the raw track. Same lesson as 0003: check the channel, not the response code.

The video equivalent matters just as much: re-run face detection on the **output**, at a higher
sample rate than was used to build the mask, and require zero hits.

The check fails closed on any hit from the identity list. No stage in this pipeline is done
until it passes this on a real file.

The screen share is a bigger leak surface than the face. A shared screen leaks Slack sidebars,
mail, calendar invites, browser tabs, git blame. Scanning every frame with OCR is a later job.
The control now is a contact sheet, one thumbnail every five seconds in a grid, read by a
person.

## Decisions we need from the three of us

Proposed, not decided. Each would be expensive to reverse, so each gets a doc.

1. **How hard is this to break?** Casual listener, someone who knows the guest, or a motivated
   attacker. This sets everything else. Recommendation: build for "someone who knows them,"
   since that is who a reticent guest is usually hiding from.
2. **Consent, retention, and where the mapping lives.** What the guest agrees to, how long we
   keep raw files, and which private store holds the mapping.
3. **Camera policy going forward.** Today we mask a face that is already recorded. For future
   sessions, camera off costs nothing and cannot fail, while masking is work that can fail.
   Worth setting as the default and treating today as the exception.

Open question underneath decision 1: a human actor reads with real emotion and is completely
non-invertible, but costs money and scheduling. Synthesizing from text is cheap and flattens
prosody, which on a podcast is a real quality hit. Voice conversion keeps more of the delivery
and protects less. Worth trying all three on one paragraph before committing.

## Build order

**Today.** Mask, transcribe, flag, redact, verify, judge, on this recording, run by hand.
Re-voicing last, because verification is what tells you whether anything else worked. If
re-voicing does not land, ship with his speech muted and captioned. That is ugly and it is
completely non-invertible, which is the property that matters. A pitch shift is not a
substitute, since shifting back undoes it.

**Next.** The local watcher, then a launchd job, then hosting.

**Then, the brain's own schema.** `sessions/` frontmatter is `present: [jonathan, nick]`, a
list of team slugs, and `team/` is one folder per member. A guest is neither. Add a `guests:`
field holding pseudonyms only, and a rule that `team/` never gets a folder for one.

## Out of scope

- **Anonymizing the hosts.** Different problem, and nobody has asked.
- **Live or real-time anonymization.** Everything here is post-production.
- **OCR over every frame of the screen share.** Deferred to the hosted phase. A contact sheet
  and a person cover it today.
- **Protecting a guest from a state-level adversary.** Chechnya had a VFX team, a legal team,
  and an evacuation plan. If someone's safety depends on this, the honest answer is that we
  are not equipped and they should talk to an organization that is.
- **Scrubbing anything already published.** Assume anything public has been mirrored.
