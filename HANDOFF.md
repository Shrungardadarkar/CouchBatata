# Handoff: behavioral/UX roadmap — "Later" tier

*Temporary document. Delete this file once the items below are done, dropped,
or re-scoped into `PROJECT.md` — it's a one-time handoff, not a permanent doc.*

Read `AGENTS.md` first as usual. This file picks up specifically where a
2026-07-23 session on behavioral/UX improvements left off.

## What's already done

That session ran a full live-app behavioral-science audit (Fogg B=MAP,
Self-Determination Theory, loss aversion, flow/cognitive load, Zeigarnik
effect, variable reward — each finding tied to a named mechanism, not just
taste) and shipped every "Now" and "Next" tier item from it, each verified
live in a real browser (Playwright, mobile + desktop viewports) before
commit, not just read as code. All pushed directly to `main`:

1. `b2b6f1c` — Undo on chord/solo-event delete (single-chord and single-solo
   deletes had no confirm or undo, while whole-section delete did — the
   protection was backwards relative to how easy each is to trigger by
   accident).
2. `01cc2f7` — Confirm before "Open project" overwrites the current song.
3. `c702b8a` — Slugified export/backup filenames (derived from the song name
   instead of a fixed generic filename).
4. `56bf702` — Fixed the first Solo section being misnamed "Solo 2".
5. `6aea3b5` — Fixed the shape-navigator label clipping (centered flex text
   doesn't truncate cleanly with CSS `text-overflow`; the fix moved the
   "saved to X" detail into a `title` tooltip instead of the always-visible
   string).
6. `e560eb4` + `76f0c54` — First-load nudge explaining the open-string
   default, copy later corrected to also mention the Suggestions row below it.
7. `ac2ca8a` — The autosave-restored toast now names the actual last-built
   section instead of a generic "restored your song" message.
8. `3ea837c` — "Save & start fresh": backs up the current song, then clears
   with no confirm needed (the backup already removed the loss) — a
   low-stakes way to chase a new idea without Clear Song's destructive
   confirm.
9. `0dab1ce` — After adding a chord, an optional "Try `<chord>`?" action
   surfaces the next unused diatonic triad, reusing the exact same
   `diatonicTriadsFor`/`startsLike` computation the Key & Scales panel and
   the plain-text export already use.
10. `84c1443` — Redesigned all three board-contextual messages (the
    first-load hint, "Added X / Try Y?", "Loaded X — edit any note...") to
    render through a new `.board-sticker` component anchored to the
    fretboard's own position instead of the app-wide `#toast` fixed to the
    viewport top. Same visual language as `#toast` (size/color/shape/
    shadow/rotation) — just positioned differently. Read the commit message
    for two real positioning bugs that were caught by testing live rather
    than by review (scroll-anchoring inside `.board-wrap`'s horizontal
    scroll, and the board scrolling out of the viewport entirely on short
    screens) — if you touch `.board-sticker`/`positionBoardSticker()`,
    understand those two before changing the positioning math.

`#toast` (the original app-wide toast) still exists and is still correct for
everything NOT about the fretboard specifically: Undo/Restored/Song
cleared/Save & start fresh/Opened project/etc. Don't move those.

## What's next: the "Later" tier

These four were explicitly **not** implemented this session because each
needs a real scoping/design decision before code — don't build any of them
from a cold read of this bullet alone.

### 1. Multi-song architecture (biggest, do this first)

**Problem:** persistence is a single fixed `localStorage` key
(`fretwork.song.v1`) — no in-app list or switcher for multiple songs.
"Save & start fresh" (#8 above) is a manual escape hatch, not a real fix:
starting a second idea still means leaving the app's own state and relying
on the OS Downloads folder to track old backups. The target user (per the
app's own README origin story) accumulates multiple half-finished ideas
over time — the single-slot model doesn't support "keep building
yesterday's idea AND today's."

**Open questions to resolve before writing code:**
- Data model: multiple `localStorage` keys with an index, or move to
  IndexedDB (localStorage's synchronous API and ~5-10MB ceiling become a
  real constraint once several songs' worth of lyrics/solos accumulate)?
- UI: where does a song list/switcher live? Does it replace "Song name," or
  sit beside it? Should it show anything more than a name (chord count,
  last-edited)?
- Migration: existing users have one song under `fretwork.song.v1` — needs
  a clean, lossless one-time migration into whatever the new scheme is.
- Keep it calm: this app has no accounts, no dashboards, no heavy chrome —
  a "song management" UI that feels like a file browser would be off-brand.
  Mock it (see workflow note below) before building.

### 2. A closure moment for a finished song

**Problem:** every save/export currently feels identical regardless of how
complete the song is. Behavioral basis: the Zeigarnik effect (open loops
pull attention back) works both ways — right now there's no moment where a
loop actually *closes*, which is its own reward and gives the user a real
sense of "I made something."

**Open questions:**
- What defines "done"? A user-declared toggle, or a system-inferred
  heuristic (e.g. 2+ sections with lyrics)? The audit leaned toward NOT
  auto-inferring (presumptuous), but a manual toggle risks feeling like
  busywork — needs real product judgment, not a default guess.
- What does the moment actually look/feel like — a distinct export
  treatment, a one-time animation (respect `prefers-reduced-motion`),
  something else? Mock candidates before building.
- Hard constraint: no streaks, no badges, no score, no "day 7!" nagging —
  this app has zero analytics/accounts by design and that's a real product
  value the owner has reinforced repeatedly, not just a nice-to-have.

### 3. A lyric-capture prompt

**Problem:** the app's whole promise is "catch the idea before it slips
away," but today that only covers chords. A verbal fragment (a line, a
title idea) is just as fragile and currently has no equivalent capture
nudge.

**Open questions:**
- Where's the natural pause point to ask? Candidates: after
  Preview/Export, on a lyrics field left empty for a while, on
  tab-close/blur. This needs real judgment about what's a pause vs. an
  interruption — don't guess without checking how it feels live.
- Does this reuse `.board-sticker` (now that it exists) or a different
  surface? It's arguably NOT board-contextual (lyrics live in the Tab
  Builder section, not the fretboard) — likely belongs on the regular
  `#toast`, or a new small prompt near the lyrics field itself. Worth
  explicitly deciding, not defaulting to whichever component is newest.
- Must stay dismissible and non-blocking — same non-nagging ethos as
  everything else shipped this session.

### 4. PWA "continue" shortcut

**Problem:** no push notifications (by design), but a PWA home-screen
shortcut that opens straight into the existing autosave-restore flow
(rather than a blank load) would lower the effort of returning to zero.

**Smallest of the four — probably doesn't need heavy scoping.** Static PWA
app shortcuts (the `shortcuts` array in `manifest.webmanifest`) can't
dynamically say "continue Intro" — they're defined once, not per-session —
so this is realistically just a generic "Continue" shortcut entry that
opens the app, and the app's *existing* autosave-restore + named
"pick up here" toast (#7 above) already does the rest. Mostly a
`manifest.webmanifest` change; confirm the restore flow already covers it
before assuming more work is needed.

## Working conventions established this session (follow these)

- **Direct-to-main pushes are the norm on this repo** when the owner is
  driving the session directly (see `AGENTS.md`'s own policy) — no PR
  needed unless asked for one.
- **Bump `CACHE_NAME` in `sw.js`** on every commit that touches
  `index.html`.
- **Always verify UI changes live**, not just by reading the diff: run
  `npm run serve`, drive it with a scratch Playwright script (executablePath
  `/opt/pw-browsers/chromium`), take screenshots, then delete the scratch
  script. This session caught two real positioning bugs this way (see
  commit `84c1443`) that a code read alone would have missed.
- **For anything touching visual/UX design specifically: mock before you
  implement.** Build the mock via live DOM injection in the running app
  (never edit the real `index.html` for a mock) or a throwaway scratch
  copy, screenshot it, get explicit sign-off, *then* build it for real. The
  owner has specific, opinionated taste about visual consistency (reusing
  exact existing component styles rather than inventing new ones) — showing
  rather than describing avoids rework.
- **Run `npm test` before and after every change.**
- **Keep `git status` clean between commits** — delete every scratch/verify
  script (`_*_tmp.mjs` pattern used this session) before moving to the next
  task.
- **No dark patterns, ever**: no streaks, badges, scores, or engagement
  notifications. This app's calm, judgment-free, no-tracking posture is a
  real competitive advantage the owner has reinforced multiple times, not
  an oversight to "improve."

## Where to find things

- `.claude/skills/guitar-fundamentals/`, `.claude/skills/music-theory-audit/`
  — project skills, use them per their own descriptions if you touch
  `findVoicings()`/`FORMULAS`/chord shapes (not directly relevant to the
  Later-tier items above, but load-bearing if you end up near that code).
- `.claude/agents/behavioral-ux-reviewer.md` — the agent used to run the
  original audit; good to re-run against any of the four items above once
  built, the same way this session did.
- `tests/`, `scripts/validate-agents.mjs` — existing automated checks, all
  must stay green.
