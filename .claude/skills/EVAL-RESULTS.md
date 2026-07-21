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

### Not yet run (blocked on rate limit at time of writing)

- `music-theory-audit` eval id 1 — **without_skill (baseline)** — not run.
  Needed to confirm the skill's answer is meaningfully better than what a
  general-purpose agent would produce unprompted, not just "also correct."
- `music-theory-audit` eval id 2 (vm-extraction gotchas) — not run.
- `guitar-fundamentals` eval id 1 (Bm barre-shape gap) — not run, with or
  without skill.
- `guitar-fundamentals` eval id 2 (Csus4 playability walk-through) — not run.

## Next steps

Re-run the 7 remaining with-skill/baseline pairs once the session rate
limit clears. Grade each against its `evals.json` expectations the same way
as above, and specifically compare with-skill vs. baseline output for the
`music-theory-audit` eval id 1 pair once both exist — that comparison is
the actual evidence the skill helps, which this log doesn't have yet.
