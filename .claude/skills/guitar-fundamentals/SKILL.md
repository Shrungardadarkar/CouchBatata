---
name: guitar-fundamentals
description: Use when touching anything that generates, ranks, or displays a guitar fret-shape — findVoicings(), FAMILIAR_VOICING_TEMPLATES, the shape browser, scale position boxes, or any claim about what's "playable." Checks a voicing for real-world playability, not just pitch-class correctness. Triggers on "voicing", "fret shape", "barre chord", "playable", "fingering", "capo", "open position".
---

# Guitar fundamentals

Couch Batata's voicing generator (`findVoicings()` in `index.html`) searches for
fretboard combinations that cover a chord's pitch classes, then scores them.
Being pitch-correct is necessary but not sufficient — a voicing also has to be
something a human hand can actually play, and ideally the shape people already
know. This skill is the playability lens; `music-theory-audit` is the
pitch-correctness lens. Voicing work usually needs both.

## Tuning and indexing (memorize this, don't re-derive it)

```
OPEN = [64,59,55,50,45,40]   // index 0 = high e, index 5 = low E
```

Fret arrays throughout the app (`.frets`, `FAMILIAR_VOICING_TEMPLATES`) are in
this **high-e-to-low-E** order — the opposite of how shapes are usually written
in tab (`x32010`, low-E-to-high-e). Reverse before comparing against a
textbook chart. Exported chart text and `-1`/`'x'` both mean muted.

## What makes a shape "hard" vs "easy," in order of cost

1. **A muted string in the middle of the played range** (`inner` in the
   scoring code) — usually requires deliberately deadening a string with a
   spare finger or the fretting hand's edge. Very costly; the generator caps
   this at 1.
2. **Fret span** — how far the fretting hand has to stretch (max fret minus
   min fret among fretted notes). More than ~3 frets stops being a relaxed
   single-position grip.
3. **An extra fretted note that doesn't add a new pitch class.** This is
   free-sounding but not free to play — it costs a finger for zero new
   information. The generator now has a narrow, score-margin-gated fix for
   this (see the "Prefer muting a redundant fretted edge string" block in
   `findVoicings()`), but it only fires when the note is on the *outermost*
   played string and the alternative's score is close behind. It will not
   catch every case — see the open caveats below.
4. **An open string is free**, cost-wise, even if it duplicates a pitch class
   already present elsewhere (e.g. doubling the root an octave down). Do not
   penalize this the way you'd penalize a redundant *fretted* note — that
   exact confusion caused a real regression this session (see history below).

## Barre-family recognition — the specific trap that bit us twice

There are two barre "shapes," and the app's `isBarreFamily()` / `fullEBarre`
detection only reliably recognizes one of them:

- **E-shape barre** (root on the low E string, e.g. F, F♯m): the barre fret
  repeats on 3+ *sounded* strings (low E, high e, and usually B). The existing
  `fullEBarre` check (`frets[0]===frets[1]===frets[5]`) catches this
  correctly.
- **A-shape barre** (root on the A string, e.g. Bm = x24432, B = x24442): the
  low E string is conventionally muted, so the barre fret only repeats on
  **2** sounded strings (the A string and the high e string). The `≥3 shared
  fret` heuristic never fires for these, so the classic A-shape grip silently
  loses to a lower-effort alternative in the same neck position.

Two attempts to generalize barre-family recognition to also catch A-shape
chords both failed during this session's work — one didn't even fix the
target chord and touched 17 unrelated chords; a second, more careful
same-bucket-only version fixed the target but regressed two chords that were
already correct (Dsus2, Asus4) because the pattern-match could land on the
wrong fret position for an unrelated chord. **Don't re-attempt a generalized
A-shape-barre heuristic without the full validation protocol in
`music-theory-audit`** — if you need a specific A-shape grip preserved,
prefer adding it to `FAMILIAR_VOICING_TEMPLATES` (see below) over touching
the scoring/recognition logic.

## The escape hatch: `FAMILIAR_VOICING_TEMPLATES`

For a widely-taught grip the general search keeps passing over, add an entry
here instead of tweaking global scoring:

```js
const FAMILIAR_VOICING_TEMPLATES=[
  {suf:'m', root:11, frets:[2,3,4,4,2,-1]}, // Bm: x24432
  ...
];
```

Rules for this catalogue (also stated in the comment above it in
`index.html` — keep both in sync if you change the policy):

- Every entry must pitch-check against its `FORMULAS` entry (see
  `music-theory-audit` for how) and must actually be reachable by the
  underlying search — verify both before adding, don't assume.
- The splice in `findVoicings()` only ever *replaces* an existing pick in the
  same position bucket; it never inserts a new bucket, never transposes a
  template to a different root, and never touches scoring for anything else.
  Keep it that way — this narrowness is what makes it safe to review (5 of
  300 root × formula combinations changed when this was introduced, and
  every one was the intended chord).
- Don't let this catalogue grow into a general shape matcher. If you're
  adding more than a handful of entries, or the entries start overlapping in
  non-obvious ways, that's a sign the underlying scoring needs a real
  rethink, not more patches here.

## Reference: verified standard open/barre shapes (high-e→low-E order)

Use these to sanity-check any voicing change — computed and pitch-verified
this session, not from memory:

```
E    001220   Em   000220   E7   001020
A    0222 0x  Am   0122 0x  A7   0202 0x
D    23 20xx  Dm   13 20xx  D7   21 20xx
G    300023   G7   100023
C    01023x   C7*  n/a (5-tone omit-5th shapes don't satisfy this app's
                    strict all-tones-present formula match)
B7   20 21 0x-1? see index.html tests for the exact array
Em7  000000  Am7  0102 0x
F(barre,fret1)   E-shape: 112331 reversed → 1,1,2,3,3,1
Bm(barre,fret2)  A-shape: x24432 reversed → 2,3,4,4,2,-1
```

(`x` = muted, both `-1` and `'x'` are used depending on context — `-1` in
fret arrays, `'x'` in `selection[]`.) For the authoritative, always-current
list, read `FAMILIAR_VOICING_TEMPLATES` and `tests/voicing-audit.mjs` rather
than trusting this table blindly — it's a memory aid, not the source of
truth, and hand-typed chord shapes have been wrong in this project before
(a C7 reference was missing its 5th; two barre shapes were mistranscribed).
Always verify a "known" shape's pitch classes programmatically before citing
it as ground truth. See `music-theory-audit` for exactly how.
