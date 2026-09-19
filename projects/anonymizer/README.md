---
title: Anonymizer
status: active
phase: Phase 0, plan under review
---

# Anonymizer

Lets a guest speak on the record without being identifiable in the published episode. It
covers the audio that ships to YouTube, the transcript, the episode metadata, and this brain.

**Status: nothing is built.** This page is a plan written for Jonathan, Nick, and Luke to
review. Three decisions below need the team before any code gets written.

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
   separate audio file per participant. That setting is capture-time only. Without it we are
   separating voices out of a mixed track afterward, which is lossy and will leak. It gates
   everything below.
2. **During.** Hosts use the pseudonym out loud. Guest camera stays off (see decision 3).
3. **After.** Transcribe the guest's isolated track, scrub direct and indirect identifiers,
   paraphrase where a turn of phrase is distinctive, re-voice the scrubbed transcript, mix the
   new track against the host tracks.
4. **Before publish.** Leak check, then a human listen-back, then the guest reviews and can
   still withdraw. After upload, withdrawal is not fully possible and the consent form has to
   say so.
5. **Publish.** Manual upload as unlisted, leak check the live artifact, then public. The
   manual upload in [0003](../../decisions/0003-manual-youtube-upload.md) is a safety feature here: a human is the last gate.

## The acceptance gate

**Re-transcribe the rendered episode and grep that.** Not the working transcript, the file
that ships. It is the only check that catches all four failures at once: a host saying the
real name aloud, a region the transform missed, an editing mistake, and a mixdown that
reintroduces the raw track. Same lesson as 0003: check the channel, not the response code.

The check fails closed on any hit from the identity list. No skill in this pipeline is done
until it passes this on a real file.

## Skills this decomposes into

Specs get written when each is built, not now. Listing them so the shape is visible.

| Skill | Does | Deterministic? |
|---|---|---|
| `capture-consent` | Records pseudonym, level, retention clock. Writes the private mapping, never to this repo | Yes |
| `scrub-transcript` | Removes direct identifiers, flags indirect ones for a human, paraphrases distinctive phrasing | No, calls a model |
| `revoice-guest` | Scrubbed transcript plus isolated track to a new non-invertible audio track | No |
| `leak-check` | Re-transcribes the final render, greps every artifact against the identity list, fails closed | Yes |
| [`youtube-publish-session`](../../skills/youtube-publish-session.md) | Already proposed. Needs teaching that guest names never reach titles, descriptions, or chapters | Mostly |

## Decisions we need from the three of us

Proposed, not decided. Each would be expensive to reverse, so each gets a doc.

1. **How hard is this to break?** Casual listener, someone who knows the guest, or a motivated
   attacker. This sets everything else. Recommendation: build for "someone who knows them,"
   since that is who a reticent guest is usually hiding from.
2. **Consent, retention, and where the mapping lives.** What the guest agrees to, how long we
   keep raw files, and which private store holds the mapping.
3. **Camera off for anonymized guests.** Recommendation: yes. Chechnya shows face replacement
   works and it took a VFX team. Camera off costs nothing, cannot fail, and deletes an entire
   workstream. It also costs the guest presence on a video podcast, so it is the team's call,
   not mine.

Open question underneath decision 1: a human actor reads with real emotion and is completely
non-invertible, but costs money and scheduling. Synthesizing from text is cheap and flattens
prosody, which on a podcast is a real quality hit. Voice conversion keeps more of the delivery
and protects less. Worth trying all three on one paragraph before committing.

## Build order

**Phase 1, audio only, one guest.** Consent, per-speaker capture, scrub, re-voice, leak check,
unlisted upload. First run is a dry run with one of us playing the reticent guest, all the way
through the leak check. The working agreement is that a skill isn't done until a non-author
runs it, and that applies harder when the failure is a person getting outed.

**Phase 2, the brain's own schema.** `sessions/` frontmatter is `present: [jonathan, nick]`, a
list of team slugs, and `team/` is one folder per member. A reticent guest is neither. Add a
`guests:` field holding pseudonyms only, and a rule that `team/` never gets a folder for one.

**Phase 3, video.** Only if a guest needs to be on camera and decision 3 goes the other way.

## Out of scope

- **Anonymizing the hosts.** Different problem, and nobody has asked.
- **Live or real-time anonymization.** Everything here is post-production.
- **Protecting a guest from a state-level adversary.** Chechnya had a VFX team, a legal team,
  and an evacuation plan. If someone's safety depends on this, the honest answer is that we
  are not equipped and they should talk to an organization that is.
- **Scrubbing anything already published.** Assume anything public has been mirrored.
