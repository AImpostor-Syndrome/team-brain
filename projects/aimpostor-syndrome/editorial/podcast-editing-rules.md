---
title: Podcast and edit rules for the automated editing step
status: proposed
date: 2026-11-24
applies-to: long-form video cut, sped-up segments, audio podcast, short clips, blog post
inputs: the per-recording segment map (schema not yet decided)
---

# Podcast and edit rules for the automated editing step

These are the rules an automated editing step follows when it turns one recorded session into
content. Every editing track reads the same timestamped **segment map** of the recording and
applies the rules below to it. The output is not an edited file; it is a list of proposed edit
decisions that a human reviews (Phase 3 — Editorial, see the [project README](../README.md)).

Nobody on the team has produced a podcast before, so the rules are deliberately concrete:
numbers where a reputable source gives one, and a plainly marked house default where it doesn't.

## How to read this

- Every rule has an ID (`G1`, `P4`…). An edit decision must cite the rule IDs it applied, so a
  reviewer can see why and so accepted or rejected decisions can later refine the rule.
- **MUST** rules are hard limits (ethics, platform specs). **SHOULD** rules are defaults the
  step may break, but only with a written reason in the decision.
- `[S3]` means the rule comes from source 3 in [Sources](#sources). `[house]` means it is our
  own starting default, not from a source: tune it after the first few episodes.

## What the rules need from the segment map

The segment map's design is still being discussed. Whatever its shape, these rules need each
segment to carry:

| Need | Why the rules need it |
|---|---|
| Start and end timestamps (to the tenth of a second) | Every decision is a range |
| Speaker(s), including who is the anonymized guest | Anonymization, crosstalk, quote attribution |
| Segment type: conversation, narrated coding, silent coding, debugging, waiting (build, install, test run, model thinking), logistics ("can you hear me"), tangent, off-the-record | Most rules key off type |
| Topic, and whether it ties back to the episode's main thread | Tangent rules |
| Energy / engagement (low, normal, high) and moments of surprise, laughter or insight | Cold open, clips, what to cut |
| **Screen-dependent**: does the meaning rely on what's on screen and isn't said aloud? Also any "as you can see / look at this" phrases | Audio-only rules |
| Quotable lines with exact word-level timestamps | Cold open, clips, blog pull quotes |
| Silence spans and filler words with timestamps | Dead-air and filler rules |
| Identifying information on screen or in speech (names, emails, git author, terminal prompts, Slack/DMs, file paths with usernames, company names) | Anonymization rules |
| Third-party audio (music, video playing on someone's machine) | Copyright rules for clips |

## G — Rules for every track

- **G1 (MUST)** Cuts must keep each speaker's meaning. Removing words, ums or pauses is fine
  only if what they said and how they meant it is unchanged, and an edit must never hide
  reluctance or doubt that is part of the answer. Test: no one should be surprised by what they
  hear themselves saying. `[S10]`
- **G2 (MUST)** Never create something that didn't happen: no stitching sentences from
  different moments into one apparent statement, no moving a reaction to a different moment,
  no synthesized voice for a real person. If two separate bits are joined, mark the join (a
  beat of music, a fade, or a visible cut in video). Audio has no ellipsis, so listeners assume
  joined sentences were said in that order. `[S11]` `[S12]`
- **G3 (MUST)** Keep the question that prompted an answer, or enough of it that the answer
  isn't misread. `[S10]`
- **G4 (SHOULD)** Edit lightly. An edit the listener can hear is usually not worth making; if a
  tidy-up can't be invisible, leave it. `[S7]` `[S9]`
- **G5 (SHOULD)** Cut at the end of a phrase, where the voice falls, and after a breath. Never
  cut a breath in half and never leave two breaths back to back. `[S9]`
- **G6 (SHOULD)** Music sets an editorial tone. Never put comic or mocking music under someone's
  mistake, a failed approach or a confused moment. `[S12]` `[house]`
- **G7 (SHOULD)** The show's subject is how each person uses AI. When choosing between two
  segments, prefer the one where someone explains a choice, a prompt, a surprise or a mistake
  with AI over one where the work just proceeds. `[house]`

## L — Long-form video ("cut the boring parts")

- **L1** Top and tail: start at the first moment of real content and end after the last. Cut
  "can you hear me", screen-share fumbling and long goodbyes. `[S6]`
- **L2** Silence over 3 seconds that carries no meaning: trim to about 0.5–1 second. A pause
  that carries meaning (thinking before a hard answer, a reaction to a result) stays, even at
  4 seconds. `[S8]` `[S10]`
- **L3** Filler: don't cut ums attached to words. Remove standalone ums (silence on both sides)
  only where they cluster badly; otherwise leave them. `[S6]` `[S9]`
- **L4** Crosstalk sounds natural; keep it. Fix only a long silence followed by both people
  starting at once, or a run of reflexive "yeah / uh-huh" over the other speaker. Keep
  laughter. `[S6]` `[S8]`
- **L5** Tangents: keep one that ties back to the topic or contains a quotable insight about
  using AI. Cut one that runs over about 2 minutes with neither, or move it to the end. `[S6]`
  `[S7]` `[house]`
- **L6** Debugging: keep the setup (what broke, what they expected), the turning point (the
  idea, the clue, what the AI suggested) and the fix. Compress the middle with L2 trims or S
  rules. A debugging stretch longer than about 3 minutes with no new idea gets compressed.
  `[house]`
- **L7** Waiting (builds, installs, test runs, the model thinking) is never shown at real speed
  beyond about 5 seconds: speed it up (S rules) or cut it with a visible jump. `[house]`
- **L8** Chapters for YouTube: the first starts at `00:00`, there are at least three, in
  ascending order, each at least 10 seconds long. Title each chapter by what happens ("Asking
  Claude to write the test"), not by a generic label ("Part 2"). `[S4]`

## S — Sped-up segments with music

- **S1** Only speed up segments with no speech that matters: silent coding, waiting, scrolling,
  a long test run. Never speed up anyone talking. `[house]`
- **S2** Use 2x–8x and show the factor on screen ("4x"), so viewers know time was compressed.
  This is the visible marker G2 asks for. `[house]` `[S11]`
- **S3** Replace the sped audio with a music bed. If someone speaks briefly inside the stretch,
  drop back to 1x for that line, then resume. `[house]`
- **S4** Pure music with nothing else happening should not run more than about 7 seconds; if a
  sped stretch still runs longer, cut it shorter or add on-screen text saying what's happening.
  `[S7]`
- **S5** Music under speech sits well below the voice: start around 18 dB down and adjust by
  ear on a phone speaker and headphones. Duck with slow fades, not abrupt drops, so the bed
  doesn't pump. `[S13]` `[S14]`
- **S6 (MUST)** Use only music we own or royalty-free library music (for example YouTube's
  Audio Library, which doesn't get Content ID claims). This also matters for clips: see C5. `[S15]`

## P — Audio podcast

Structure of an episode, in order:

1. **Cold open** (P1) — 20–30 seconds; hard cap 45. One moment, taken from the body, that
   captures the episode: a surprise, a strong opinion about AI, a moment of tension or laughter.
   It should leave the listener with a question. Pure setup or a summary is not a cold open.
   It's optional: if nothing qualifies, skip it rather than use a weak one. `[S7]` `[S16]` `[S17]`
2. **Intro** (P2) — theme music no longer than about 7 seconds of music alone, then the host
   names the show, the guest (or the guest's pseudonym, see A rules) and what they worked on.
   About 30–60 seconds in all. `[S7]` `[house]`
3. **Body** (P3) — the edited conversation in recorded order. Reordering is allowed only for
   small talk (moved to the end or cut) and to put the core material first; never reorder in a
   way that changes cause and effect. `[S7]` G1, G2.
4. **Outro** (P4) — under 60 seconds: what they built, where to find the video and blog post,
   and the next session's plan if it was set. `[house]`

Editing rules:

- **P5** Apply L1–L5 to the audio too.
- **P6 Screen-dependent segments.** Visual-only material doesn't translate to audio. For each
  segment marked screen-dependent, choose in this order: `[S18]`
  1. keep it if the speakers narrate enough to follow without seeing it;
  2. otherwise keep a short piece and add a **bridge**: one or two sentences, recorded by the
     host in their own voice, saying what's on screen ("Nick has the failing test open; the
     error says…"). Never an AI voice speaking as a participant (G2);
  3. otherwise cut it, with a bridge if the cut leaves a gap in the story.
  Lines like "as you can see" or "look at this" are a signal: cut the phrase or add a bridge.
- **P7** Silent coding and waiting have no place in audio: cut them. Sped-up segments (S rules)
  are video-only. `[house]`
- **P8** Debugging in audio: the story of the bug (what broke, the turning point, the fix) in
  about 60–90 seconds, unless the debugging *is* the episode's subject. `[house]`
- **P9** Length: there is no right length; the top 25 shows in the UK average 54 minutes and in
  the US 64, with huge spread. Let content decide. As a house default, a one-hour session
  should become a 30–45 minute episode. `[S19]` `[house]`
- **P10** Chapters: same rules as L8, re-timed to the audio. Write them into the file (ID3
  chapters) or a chapters file the host supports; each needs a start time and a title. Don't
  rely on apps' auto-chapters, which differ between apps. `[S5]` `[S20]`
- **P11 (MUST) Delivery spec**: integrated loudness −16 LUFS ±1 dB, true peak no higher than
  −1 dBTP, measured before encoding. Stereo, or two identical channels; a mono file should
  target −19 LUFS because it plays about 3 LU quieter. AAC preferred for the RSS feed; MP3 at
  128 kbps stereo is acceptable. `[S1]` `[S2]` `[S3]`

## C — Short clips

- **C1** A clip is one self-contained idea: it makes sense with no context, and someone who has
  never heard of the show gets the point. `[house]`
- **C2** Open on the strongest line, in the first 2–3 seconds; no wind-up. `[house]`
- **C3** Length: YouTube Shorts allow up to 3 minutes, vertical or square. Target 30–60
  seconds; go longer only for a complete story. `[S15]` `[S21]` `[house]`
- **C4** Burned-in captions on every clip, checked against the audio. `[house]`
- **C5 (MUST)** A Short over 1 minute with any active copyright claim is blocked worldwide.
  No third-party music or audio in any clip, including music playing on someone's machine
  during the session. `[S15]`
- **C6** Best sources for clips: quotable lines and high-energy moments in the segment map, a
  surprising AI result, a strong opinion, a before/after. Propose 3–5 per session, ranked.
  `[house]`
- **C7** Crop to the speaker's face or to the part of the screen that matters; never show a
  screen region that carries identifying information (A3). `[house]`

## B — Blog post

- **B1** Quotes in the post are verbatim from the transcript, with timestamps, and pass G1 and
  G3. Cleaning ums out of a written quote is fine; changing words is not. `[S10]`
- **B2** Use the same chapters as the structure of the post, and link each section to its
  timestamp in the video. `[house]`
- **B3** Pull quotes come from the segment map's quotable lines, so the post, the cold open and
  the clips draw on the same short list. `[house]`

## A — Anonymized guests

The [anonymizer](https://github.com/AImpostor-Syndrome/anonymizer) hides a guest's face and
name in the video. Every other track has to hide them too, or the anonymization is pointless.

- **A1 (MUST)** Use the guest's pseudonym everywhere: intro, outro, chapter titles, captions,
  transcript, blog post, clip titles, descriptions and file names.
- **A2 (MUST)** Spoken names: cut or bleep every time anyone says the guest's real name, their
  employer, or another detail that identifies them, in every track.
- **A3 (MUST)** Screen identity: flag every segment showing the guest's name, email, git author,
  shell prompt, home-directory paths, Slack or email, or their company's code or tools, and
  blur it in video or exclude the segment. This includes clips.
- **A4 (MUST)** No clip features an anonymized guest unless its video went through the
  anonymizer and passes A2–A3.
- **A5 (SHOULD)** A voice identifies someone to people who know them. Whether to alter an
  anonymized guest's voice is a team decision that hasn't been made; until it is, flag that
  the audio track contains the guest's real voice in the review notes. `[house]`
- **A6 (SHOULD)** Send the guest the cut before it's published. This applies the "no one should
  be surprised" test (G1) and is the last check on A1–A4. `[S10]` `[house]`

## What the step outputs

An **edit decision list**, one entry per decision, never a rendered file. Each entry carries:
the track, the segment range, the action (keep, cut, trim, speed up, move, add bridge, blur,
bleep, chapter, clip), the rule IDs applied, a one-line reason, and a confidence. MUST-rule
flags (A rules, C5) are listed first. A person accepts or rejects each decision, and the
accepted ones become guidance for the next run.

## Open questions

- The segment map's schema (being designed separately).
- Whether to alter an anonymized guest's voice (A5).
- Who records bridges (P6), and whether the host records them in a batch after each session.
- Which music library the show uses, and a short list of approved tracks (S6).
- Whether Zoom can give us a separate audio track per speaker, which makes L4 crosstalk fixes
  far easier. Worth checking before the next session.

## Sources

Read on 2026-11-24.

1. Apple Podcasts for Creators, "Audio requirements" — https://podcasters.apple.com/support/893-audio-requirements
2. Podnews, "How to do loudness: the LUFS and LKFS FAQ for podcasters" — https://podnews.net/article/lufs-lkfs-for-podcasters
3. Auphonic, "Loudness Targets for Mobile Audio, Podcasts, Radio and TV" — https://us.auphonic.com/blog/2013/01/07/loudness-targets-mobile-audio-podcasts-radio-tv/
4. YouTube Help, "Video chapters" — https://support.google.com/youtube/answer/9884579?hl=en
5. Podnews, "Why to use podcast chapters" — https://podnews.net/article/why-to-use-podcast-chapters
6. The Podcast Host, "How Much Editing Should I Do in My Podcast?" — https://www.thepodcasthost.com/editing-production/much-editing-should-i-do-in-my-podcast/
7. Alitu, "Podcast Editing Guide: 15 Tips From 15 Years Experience" — https://alitu.com/creator/content-creation/podcast-editing-tips/
8. Jason Snell, Six Colors, "How I podcast: Editing" — https://sixcolors.com/post/2015/02/how-i-podcast-editing/
9. KPFA, "Listening For 'Bad Edits'" — https://kpfa.org/?p=339139
10. NPR Training, "How to decide what to cut (or not) in an interview" — https://www.npr.org/sections/npr-training/2025/05/29/g-s1-65686/how-to-decide-what-to-cut-or-not-in-an-interview
11. Online News Association, Ethics: Audio — https://ethics.journalists.org/topics/audio/
12. RTDNA, "Video and audio editing" — https://www.rtdna.org/video-and-audio-editing
13. PremiumBeat, "Mixing voice-over with a music bed using dynamic controls" — https://www.premiumbeat.com/blog/video-tutorial-mixing-voice-over-with-music-bed-using-dynamic-controls
14. Boris FX, "What is audio ducking and how is it used?" — https://borisfx.com/blog/what-is-audio-ducking-and-how-is-it-used/
15. YouTube Help, "Understand three-minute YouTube Shorts" — https://support.google.com/youtube/answer/15424877?hl=en
16. The Podcast Host, "Cold opens" — https://www.thepodcasthost.com/storytelling/cold-opens/
17. Descript, "How to write a cold open that will hook listeners from the start" — https://www.descript.com/blog/article/how-to-write-a-cold-open-that-will-hook-listeners-from-the-start
18. Wistia, "How to turn your video series into a podcast" — https://wistia.com/learn/production/how-to-turn-your-video-series-into-a-podcast
19. Edison Research / SSRS, "Average episode length of the top 25 UK podcasts" — https://www.edisonresearch.com/average-episode-length-of-the-top-25-uk-podcasts/
20. Podlove Simple Chapters — https://podlove.org/simple-chapters/
21. YouTube Help, "YouTube Shorts upload tips" — https://support.google.com/youtube/answer/12921536
