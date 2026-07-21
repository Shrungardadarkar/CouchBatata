# Agent evals

Behavioral test scenarios for the 4 project agents in this directory. Unlike
`scripts/validate-agents.mjs` (deterministic, runs in CI on every push), these
require actually spawning the agent and reading its output — there's no way
to script an LLM's judgment, so this is a checklist a human or a Claude Code
session runs manually, on demand (e.g. after editing an agent's prompt).

## How to run a scenario

Spawn the agent via the Agent tool with `subagent_type: "<agent-name>"` and
the scenario's prompt verbatim. Check the response against that scenario's
checklist. A scenario fails if any checklist item fails — note which one and
why in this file's Results log at the bottom, or fix the agent prompt and
re-run.

---

## product-strategist

### Scenario 1: a proposal that violates the no-account constraint

**Prompt:** "Should we add user accounts so people can sync their songs
across devices?"

**Checklist:**
- [ ] Explicitly names the no-account/no-server/dependency-free constraint as
      load-bearing, not just "worth considering"
- [ ] Does not recommend building it as scoped, without at least naming a
      no-server alternative (e.g. export/import, a user-supplied sync target)
      or flagging it as an explicit exception the owner would have to approve
- [ ] References `PROJECT.md` or `README.md` specifics, not generic SaaS
      reasoning
- [ ] Ends with a decisive recommendation, not just a pros/cons list

### Scenario 2: an in-scope feature

**Prompt:** "Should we let users tag sections with a mood/energy label for
quick scanning?"

**Checklist:**
- [ ] Places the feature somewhere in the primary loop (or explains why it's
      a new loop)
- [ ] Considers whether it serves the "plays by ear, doesn't know theory"
      audience specifically
- [ ] Proposes a minimal version, not the maximal one
- [ ] Recommendation is decisive (build / cut / scope to X)

---

## behavioral-ux-reviewer

### Scenario 1: reviewing the capture moment

**Prompt:** "Review the flow from tapping notes on the fretboard to seeing
the chord name — is there anything that costs someone the idea before they
capture it?"

**Checklist:**
- [ ] Actually starts the app (`npm run serve`) rather than reasoning from
      code alone
- [ ] Frames findings around the specific stated premise (time pressure, low
      theory confidence) rather than generic UX heuristics
- [ ] At least one finding references a concrete screen/state, not an
      abstraction
- [ ] Does not edit any files (no Edit/Write tool calls — it doesn't have
      those tools, so this should be structurally guaranteed; confirm no
      attempted edit shows up as a permission request)

### Scenario 2: reward/feedback consistency

**Prompt:** "Does saving the song title feel satisfying, or ambiguous?"

**Checklist:**
- [ ] Connects the finding to the app's established color semantics
      (grey→green for armed/ready states, not grey→red)
- [ ] Gives a concrete fix suggestion, not just a diagnosis

---

## marketing-copywriter

### Scenario 1: drafting new copy

**Prompt:** "Draft a short one-paragraph announcement for the new editable
song-title feature, suitable for a social post."

**Checklist:**
- [ ] Voice matches existing copy (first-person or direct, specific scene,
      not generic SaaS-launch language)
- [ ] Does not introduce a competing tagline — extends "Catch the chord.
      Keep the song." / "For the songs that you almost wrote." rather than
      inventing new ones
- [ ] No manufactured urgency (countdowns, "join thousands of users", etc.)
- [ ] Output is a drafted file (via Write), not an edit to `index.html`

### Scenario 2: consistency check

**Prompt:** "Check whether the privacy claims in README.md, PROJECT.md, and
index.html's meta tags are worded consistently."

**Checklist:**
- [ ] Actually greps/reads all three locations rather than assuming
- [ ] Flags any wording drift, quoting the exact differing phrases
- [ ] Recommends which phrasing to standardize on (the already-most-repeated
      one), not a brand-new fourth phrasing

---

## couchbatata-code-reviewer

### Scenario 1: a hover-state CSS addition without the touch-safety wrapper

**Prompt:** "Review this proposed change: adding
`.new-toggle:hover{background:var(--sun)}` directly (not inside
`@media (hover:hover)`) for a new toggle button in index.html."

**Checklist:**
- [ ] Flags the missing `@media (hover:hover)` wrapper specifically, citing
      the iOS Safari two-tap bug this project has already fixed once
- [ ] Does not just say "looks fine" without running anything
- [ ] Report is read-only — no attempted Edit/Write (agent has no such tools;
      confirm no permission request for one appears)

### Scenario 2: a findVoicings() change without compare:voicings

**Prompt:** "Review this proposed change: I added a new entry to
FAMILIAR_VOICING_TEMPLATES for open C major and didn't run any tests yet."

**Checklist:**
- [ ] Runs `npm test` and `npm run compare:voicings` itself rather than
      taking the description at face value
- [ ] Treats "compare:voicings wasn't run" as a blocking finding on its own,
      independent of whether the change turns out to be correct
- [ ] References the specific prior incidents (17/28-combination blast
      radius from the barre-chord attempts) as the reason this matters, not
      just "best practice"

---

## Results log

Record actual run results here (date, scenario, pass/fail, notes) so drift
in agent behavior over time is visible.

- **2026-07-21 — product-strategist Scenario 1 — PASS.** Recommended cutting
  accounts, cited README.md:32-34 / PROJECT.md:41-45 by line number, proposed
  an in-constraint alternative (share-sheet export) instead of just saying no.
- **2026-07-21 — couchbatata-code-reviewer Scenario 1 — PASS.** Flagged the
  missing `@media (hover:hover)` wrap, grepped the codebase for ~40 existing
  comparable rules to show the pattern, and proactively raised a second issue
  (the proposed toggle doesn't match the existing `.toggle`/`.switch-toggle`
  family) beyond what the scenario asked for.
- Remaining 6 scenarios not yet run live — run on demand, e.g. after editing
  an agent's prompt, and log the result here.
