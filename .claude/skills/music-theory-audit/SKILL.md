---
name: music-theory-audit
description: Use before and after any change to FORMULAS, OPEN, findVoicings(), FAMILIAR_VOICING_TEMPLATES, identify(), scale definitions (SCALES), or any music-theory claim in the app (chord names, scale coverage, key analysis). Verifies pitch-class correctness programmatically rather than by hand, and checks the full blast radius of a change. Triggers on "chord formula", "pitch class", "scale", "voicing generator", "key analysis", "interval".
---

# Music-theory audit

This is the correctness lens for anything touching the app's music-theory
core. Pair with `guitar-fundamentals` for playability — a voicing can be
pitch-perfect and still be a bad suggestion.

## The rule that would have saved real time this session

**Never trust a hand-typed chord shape or pitch-class claim. Compute it.**

A hand-derived reference for C7 (`x32310`) was cited as correct when it was
actually missing the 5th (only contains root/3rd/♭7 — a real, commonly-played
voicing, but not what this app's strict all-tones-present matcher requires
for the "7" formula). Two hand-derived barre shapes (an E-shape "F" and an
A-shape "B") were also mistranscribed on the first attempt. Every one of
these was caught only by computing pitch classes fresh from `OPEN[]`, never
by re-reading the shape and "looking" more carefully.

### The verification snippet (use this pattern every time)

```js
// midis: absolute MIDI notes from a fret array in the app's own
// high-e-to-low-E index order (index i corresponds to OPEN[i]).
const midis = [];
frets.forEach((fret, i) => { if (fret >= 0) midis.push(OPEN[i] + fret); });
const pcsPresent = [...new Set(midis.map(m => ((m - root) % 12 + 12) % 12))].sort((a,b)=>a-b);
const expected = [...formula.iv].sort((a,b)=>a-b);
// pcsPresent must deep-equal expected — not a superset, not a subset.
```

`tests/voicing-audit.mjs` already runs this for every entry in
`FAMILIAR_VOICING_TEMPLATES` — extend it rather than hand-checking ad hoc.

## Required validation for any FORMULAS / OPEN / findVoicings() change

This is not optional — it's already stated in `AGENTS.md`, restated here with
the specific failure modes to watch for:

1. `npm run compare:voicings` — diffs all 12 roots × `FORMULAS.length` chord
   qualities against `HEAD` (or pass a specific ref). It's a reporting tool,
   not a gate: some changes are the point. **Read every line it prints.**
2. Count the changes. A well-scoped fix touches a small, explainable set of
   combinations. If a change touches dozens or hundreds of combinations, that
   is not evidence the fix is "more thorough" — it's evidence the change is
   operating on shared scoring/ranking logic with effects you haven't traced.
   Two attempts at generalizing barre-chord recognition this session produced
   17 and 28 changed combinations respectively for what should have been a
   1-chord fix; both were correctly discarded rather than shipped.
3. For every combination that changed, manually check: is the new shape
   actually better (matches a known standard shape, or scores appropriately),
   or did it just win a ranking tiebreak for an unrelated reason? Don't
   sample — inspect all of them if the count is small enough to (which it
   should be, per point 2).
4. `npm run test:voicings` (or `npm test`, which includes it) — asserts every
   `FAMILIAR_VOICING_TEMPLATES` entry is pitch-correct and actually offered,
   and that all 300 root × formula combinations return between 1 and 5
   voicings (never zero, never over the cap).
5. Only after 1–4 pass, consider the change done. `git diff --check` and the
   rest of the normal test suite still apply on top of this, not instead of
   it.

## Extraction gotcha if you're writing a new test script

`OPEN`, `FORMULAS`, `findVoicings()`, etc. cannot be pulled out of
`index.html` as one contiguous slice from `const OPEN=` through the end of
`findVoicings()` — there's a large chunk of browser-dependent code (the audio
engine, which touches `localStorage` at the top level) sitting between them
that will throw when `eval`'d outside a browser. Extract each declaration
independently by name (see `tests/voicing-audit.mjs` / `voicing-compare.mjs`
for the working pattern) and concatenate just those. Also note: `const`/`let`
top-level declarations do not become properties of a Node `vm` context object
— wrap the extracted source in an IIFE that explicitly returns the bindings
you need, and use the return value of `vm.runInContext(...)`.

## Scale and key claims

- Never claim a single tonic scale "covers" a chord progression without
  checking the actual union of pitch classes across every chord in it — this
  is explicit in `AGENTS.md` (the I7/IV7/V7-blues-is-not-one-Mixolydian-scale
  rule) and should be treated as a hard constraint, not a style preference.
- `identify()` matches by exact pitch-class-set equality (`setEq`), with one
  specific, deliberate exception: 5+-tone formulas that include the 5th (iv
  contains 7) are also matched with the 5th omitted, to catch the common
  "drop the 5th" voicing pattern for extended chords. Don't assume other
  formulas have this leniency — a 4-tone dominant-7 chord voiced without its
  5th will *not* match the "7" formula, by design (see the C7 note above).
