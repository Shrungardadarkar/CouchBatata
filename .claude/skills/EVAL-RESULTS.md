# Skill eval results log

Actual run results for the eval cases in `guitar-fundamentals/evals/evals.json`
and `music-theory-audit/evals/evals.json`. Mirrors the pattern in
`.claude/agents/EVALS.md` — a live log, not a spec (the specs are the
`evals.json` files themselves).

## 2026-07-21 — first live run attempt

Ran 4 subagents in parallel: with-skill and without-skill (baseline) for one
eval case per skill. **3 of 4 failed** partway through with a session API
rate-limit error (`You've hit your session limit · resets 5pm (UTC)`), not a
skill defect — they were cut off mid-investigation, before producing output.
Only `music-theory-audit` eval id 1, with-skill, completed.

**Honest status: this is a partial result.** No baseline comparison exists
for either skill yet (so there's no with-vs-without evidence, only a
solo grade against the eval's `expectations`), and `guitar-fundamentals`
has zero completed runs. Do not treat this as "the skills are validated" —
treat it as "one skill passed a solo grade once." Re-run the failed cases
once the rate limit resets to get real coverage; don't just re-run and
declare success without the baseline pairing, which is the part that
actually shows the skill changes behavior for the better rather than the
model would have said this anyway.

### music-theory-audit — eval id 1 — with_skill — GRADED PASS (solo, no baseline)

Output: `music-theory-audit-workspace/iteration-1/eval-familiar-voicing-verification/with_skill/outputs/answer.md`
(gitignored scratch output — regenerate by re-running the eval rather than
expecting this path to exist in a fresh checkout).

| Expectation | Result | Evidence |
|---|---|---|
| Gives the concrete pitch-class verification snippet, not just "check it looks right" | ✅ pass | Exact `OPEN[]`-based snippet reproduced verbatim, with a worked example for the actual proposed entry |
| Requires `npm run compare:voicings` and reading all of its output | ✅ pass | Explicit: "read every printed line yourself," states what "exactly one combination changed" must look like |
| States a large blast radius is a warning sign, not proof of thoroughness | ✅ pass | "that's not a sign the change is 'more thorough,' it's a sign you're touching shared ranking logic" — cites the 17/28-combination barre-chord history by name |
| References the prior C7 / mistranscribed-barre-shape mistakes as the reason hand-verification isn't trustworthy | ✅ pass | Named explicitly near the top as the reason to "compute everything" |

All 4/4 expectations met. The answer also went beyond the eval's
`expected_output` — it caught that the file's own comments write shapes
low-E-to-high-e while the `frets` array is indexed high-e-to-low-E (the
single most common transcription error in this codebase), and closed with
an explicit checkbox "done" list rather than a prose summary.

## 2026-07-22 — remaining 7 runs completed

All 4 eval cases now have both a with-skill and a baseline (without-skill)
run. Operational note first, then the actual grading.

**Data-loss lesson from this run (worth keeping):** the first attempt ran 4
of these 7 in isolated git worktrees (`isolation: "worktree"`). Three of
those four agents wrote their `answer.md` *inside* the worktree instead of
the literal absolute path they were given, and the worktree was
auto-deleted within seconds of the agent completing (isolation cleans up
once the agent's done) — the file was gone before it could be copied out,
even checking immediately on the completion notification. Only the fourth
worktree run happened to write to the true absolute path and survived. The
three lost runs (`music-theory-audit` eval 2 with-skill, `guitar-fundamentals`
eval 1 with-skill, `music-theory-audit` eval 1 baseline) were simply
re-run without worktree isolation, with an explicit "confirm with `ls`
before finishing" instruction, and all landed correctly. Lesson: don't use
`isolation: "worktree"` for a task whose only deliverable is a scratch file
outside git version control — plain agents (no isolation) write directly to
the real filesystem path given and don't have this failure mode.

### music-theory-audit — eval id 1 (familiar-voicing-verification)

| | with_skill | without_skill (baseline) |
|---|---|---|
| Concrete OPEN[]+fret-arithmetic pitch-class snippet | ✅ yes, worked example | ❌ says "computed, not eyeballed" but never shows the arithmetic — leans entirely on running `voicing-audit.mjs` as a black box |
| Requires `compare:voicings` + reading all output | ✅ yes | ✅ yes, and unprompted actually *ran* it against a sandboxed candidate entry |
| Large blast radius = warning sign, not thoroughness | ✅ explicit, named | ~ implied ("an unrelated diff would indicate you've broken something") but not stated as a general principle |
| Cites prior C7 / mistranscribed-barre-shape mistakes | ✅ yes, by name | ❌ no mention — nothing in the live repo documents those incidents (they never shipped), so an agent without the skill has no way to know they happened |

Baseline: 2/4 clear, 2 partial/missing. Notably the baseline agent did
something the with-skill run didn't: it actually built a sandbox, added a
candidate open-C-major template, and ran the real diff logic — discovering
that entry would be a **pure no-op** (the general search already ranks
`x32010` #1 for C major with zero templates). That's a genuinely valuable,
empirically-grounded finding neither run's `expected_output` anticipated.
The skill's edge here is specifically institutional memory (the historical
mistakes) and giving the exact verification snippet up front rather than
descriptively pointing at a test file.

### music-theory-audit — eval id 2 (vm-extraction gotchas)

| | with_skill | without_skill (baseline) |
|---|---|---|
| Warns against one contiguous OPEN→findVoicings slice | ✅ | ✅ |
| Names localStorage/audio-engine as the concrete cause | ✅ | ✅ |
| const/let-doesn't-attach-to-vm-context + IIFE-return fix | ✅ | ✅ |
| Points to voicing-audit.mjs/voicing-compare.mjs as reference | ✅ | ✅ |

Baseline: **4/4, same as with-skill.** Honest finding: for this question the
answer is fully derivable by actually reading `index.html` carefully (the
audio engine sitting between `OPEN` and `FORMULAS` is directly visible in
the source), so a general-purpose agent that investigates properly reaches
the same correct answer without the skill. The skill's value is highest
when the needed fact isn't recoverable from the repo alone (see eval 1 and
guitar-fundamentals eval 1 below); when it's a close-reading-of-code
question, a careful baseline agent does fine unassisted.

### guitar-fundamentals — eval id 1 (Bm barre-shape gap)

| | with_skill | without_skill (baseline) |
|---|---|---|
| Names A-shape vs E-shape barre distinction | ✅ | ✅ |
| Explains why isBarreFamily's "3+ shared fret" check fails for A-shape | ✅ | ✅ |
| Recommends FAMILIAR_VOICING_TEMPLATES over scoring/recognition changes | ✅ | ✅ (reasons it out from `AGENTS.md`'s general risk guidance) |
| Warns against re-attempting a generalized heuristic, citing prior attempts broke unrelated chords | ✅ explicit, cites "17 unrelated chords" and the Dsus2/Asus4 regression by name | ❌ argues abstractly that a scoring change is risky, but has no way to know the two specific discarded attempts ever happened |

With-skill: 4/4. Baseline: 3/4. This is the cleanest positive result in the
set — both attempts (never shipped, never committed) left literally no
trace in git history, so a baseline agent structurally cannot cite them.
The skill file is the only place that history is preserved, and it's
exactly the kind of "don't repeat a mistake that left no code trace"
knowledge a skill is for.

### guitar-fundamentals — eval id 2 (Csus4 playability)

| | with_skill | without_skill (baseline) |
|---|---|---|
| Reads fret array high-e→low-E, not reversed | ✅ | ✅ |
| Applies the cost hierarchy (mute position, span, redundant note, open strings) | ✅ | ~ covers the same factors but not as an explicit ranked hierarchy |
| Flags playability-only scope, defers pitch-correctness to music-theory-audit | ❌ verified pitch itself instead of naming the handoff | ❌ same |

Both runs: 2/3 against the literal checklist, and both did their own
pitch-class check rather than explicitly deferring to `music-theory-audit`
— so on the eval's formal expectations they're roughly tied. But the
**substantive recommendations diverged**: the with-skill run actually
executed `findVoicings(0,[0,5,7])` and found this exact shape is already
the generator's #1 pick with zero templates — so it recommended **not**
adding the entry (a no-op, and against the catalogue's stated scope). The
baseline run evaluated the shape in isolation, didn't check reachability
against the live generator, and recommended adding it. Only one of these
is actually correct given how the codebase works today. This isn't
captured by the checklist boxes above, but it's the most concrete evidence
in this whole set that the skill changes the *decision*, not just the
explanation.

## Overall assessment

4 of 4 skill/eval pairs now have both runs. The skill helped clearly in 2
cases (mta eval 1, gf eval 1) — specifically by supplying institutional
memory about past mistakes/discarded attempts that leave no trace in git
history for a baseline agent to find. It made no measurable difference in
1 case (mta eval 2) where the answer was fully derivable from careful code
reading. And in 1 case (gf eval 2) it didn't change the formal checklist
score but did change the final recommendation to the correct one, by
prompting an actual reachability check against the live generator instead
of a playability-only judgment. Net: the skills earn their place, but their
value is concentrated in preserving history that isn't in the code, not in
providing generic engineering rigor a careful agent would apply anyway.
