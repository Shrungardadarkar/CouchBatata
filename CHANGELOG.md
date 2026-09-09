# Changelog

## 2026-09-09 — The map's bridge chords are playable, and "Look from" stops lying about distance

- The bridge chord now sits **on the dotted line** it belongs to, because it
  is the step between those two chords — not a label crowded onto one end of
  it. It is also a control now: tap it and that chord goes on the fretboard,
  and the chord it leads into gets selected so the caption explains the move
  you just heard. Where two outliers share a spoke's neighbourhood, their
  bridge chips slide to different points along their own lines instead of
  landing on top of each other.
- Fixed "Look from" re-anchoring itself to whatever you were previewing.
  Previewing a distant reading silently re-measured the whole strip from
  *there*, so a key 5 notes from your song could show its own neighbours as
  "same chords" while the ring above was full of outside chords — the strip
  and the map were describing two different places. It is now always measured
  from your song's own key, and says so ("from B phrygian") above the row.
- The reading you are previewing no longer vanishes from the strip. It used
  to be excluded as "home" the moment you looked at it; now it stays, marked
  **viewing**, at its own honest distance — including a reading reached from
  an "Explore" link rather than from the strip itself.
- Every chip now also says how much of your song actually fits it ("8/14
  fit"). Note-distance says what the *scale* costs; this says what the *song*
  costs, and they are not the same question — which is the thing that makes a
  far-away reading obviously far away rather than just differently labelled.
- Fixed the "Look from" list changing shape depending on the flavour of the
  key you were standing in: the six same-note rotations (G major, A Dorian,
  C Lydian…) were only ever offered from a major reading, so a Phrygian or
  Dorian song was shown a list with its six *closest* answers missing. Every
  church mode is one collection rotated, so they are offered from all of them
  now.
- Fixed "over it" recommending a scale from the other side of the world. It
  took the first mode off a fixed list that merely contained the chord's
  notes, which answered an F♯ triad in B Phrygian with **B Lydian** — five of
  seven notes away from the key the rest of the song is in. It now picks the
  nearest mode to your actual key that genuinely holds the chord: B harmonic
  minor, two notes away, and where that chord's raised third comes from.

## 2026-09-09 — The chord that opens a modulated section, and a truer whole-song key

- A section that modulates to its own key now shows the chord that led it
  there: when the section before it ends on a chord that hinges into the
  new key — either a chord shared by both (a common-chord pivot) or a
  dominant whose target is the new key's own chord — the section header
  gets a "via F♯7"-style badge next to its key tag. Tap it to jump straight
  to that chord and see the full explanation in both keys.
- The per-chord context line now checks across a section break, not just
  within it: a dominant parked on the last chord of a section that resolves
  on the first chord of the next now correctly says "it lands on Bm right
  after" instead of staying silent because the two chords live in different
  section arrays.
- Fixed a real accuracy bug this surfaced: a section that reads cleanly in
  its own key (a chorus that modulates) was still allowed to vote on what
  the whole SONG's key is, and a big enough modulated section could drag
  the reading somewhere neither section actually lives (two 10-chord A
  major choruses pulled a plainly-G-major song toward "D major"). Sections
  the app already treats as "modulated, not borrowed" are now excluded from
  the whole-song key vote before it's taken.
- Fixed a second, deeper accuracy bug in the same area: picking a key by
  raw chord-coverage alone can prefer a coincidental fit over the one the
  song is actually telling. On the same real song, a plain reading of
  "which key covers more chords" preferred C major (whose only advantage
  was one accidental match) over G major, even though the "leftover"
  chords in a G major reading are the song's own well-known borrowings
  (♭VII, and V7 of iii) while the C major leftovers explained nothing. The
  key detector now checks its own leftovers with the app's own
  borrowing/secondary-dominant engine, and a key that can explain what it
  doesn't cover always beats one that merely covers slightly more by
  accident.

## 2026-09-09 — Look from any key or mode, and set it as the working key

- The map's "related keys" no longer needs its own tab: one ranked strip,
  "Look from", lists every reading of the current key — a relative mode
  (A Dorian, the same 7 chords read from a different one), a real key
  change (D major, your V), a same-tonic mode (G Mixolydian) — closest
  first, each tagged with how many chords it actually costs ("same
  chords" / "1 chord differs" / …), measured, not bucketed by category.
  The same-sounding name can appear twice at two different distances (A
  Dorian vs A natural minor) and both are shown, honestly tagged, rather
  than picked for you.
- Tapping a reading previews it on the ring; **Set as key** commits it —
  the header, the chord suggestions, the scale suggestions and position
  boxes, and the exported chart all follow the new key, with an
  always-visible "↩ back to the detected key" once you have. The choice
  is saved with the song and survives a reload.
- Every chord outside the key now gets a real bridge chord, found the
  same way any other join is smoothed (real fret-based voice-leading, not
  a guessed formula) — named on the ring itself ("via D7") and spelled
  out wherever the chord's story is told, instead of needing a separate
  control to find it. A borrowed chord's popover also links straight to
  the mode it came from ("Explore G Mixolydian →").
- The chord map, the context line, and the exported chart can now center
  on any of the seven modes, not just major and minor — key names,
  distances, and scale suggestions are computed for whichever one is
  showing rather than assumed to be major. A minor key's own dominant
  (E7 for A minor) is recognised as such; Dorian, Phrygian and Locrian
  are not credited with a borrowing that is only ever a natural-minor
  convention.

## 2026-09-08 — One line under the chord, one map of the key

- The five disclosures under the chord (also in key, more in key, related
  keys, using, smooth the join) are now one context line and two chips. The
  line says where the chord on the board sits against the key — "the ii of
  G major", "the ♭VII of G major, borrowed from the parallel minor", "the
  dominant of Am, a secondary dominant" — and carries the moves that follow:
  a chord before or after it, a chord between it and a stretched neighbour,
  the scale to play over it. Tap to hear, tap again to keep.
- The related-keys compass is folded into the chord map. Each key next door
  is reached through one chord on the ring (its own I or i), so that chord
  names the key; tap it and "Look from E minor →" redraws the ring from
  there. The parallel key is a flip at the centre. "You are here" now marks
  the chord selected in the song, not the key.
- Out-of-key chords are named for what they are doing — ♭VII, iv, ♭VI, ♭III,
  ♭II, ii°, ♯iv°, the Picardy I, Dorian IV, the subtonic VII — with the mode
  they came from and where they usually go. The old "replace with" offer is
  gone; the scale claimed for a borrowed chord is only made after every note
  of the chord has been checked against it.
- Key analysis: with equal coverage, a minor reading wins when the structure
  backs it (Am G F E is A minor, not C major with a stray E). A minor key's
  V7 is recognised as its own. Augmented chords are no longer tonicised. The
  chord on the board is not counted twice when the song already has it.
- The header pill reads "2 borrowed" instead of a fit fraction, and opens
  the map. Charts now carry a "Borrowed:" line naming each one.
- Only one thing opens under the chord at a time; opening the map closes
  scales and vice versa.

## 2026-07-26 — Desktop two-column layout (experimental)

- On wide screens (1100px+), Tab builder and Key & Scales now live in a
  sticky right rail next to the fretboard/chord column, instead of stacking
  below it — cross-referencing the song or adding a chord no longer requires
  scrolling past the fretboard. Phone and narrow-tablet layouts are
  unchanged: same single-column stack, same visual order.
- Implemented via two non-semantic grouping wrappers (`.col-main`,
  `.col-rail`) that are `display:contents` below the breakpoint, so mobile
  markup order/behavior is untouched; `order` on each panel restores the
  original single-column reading order at that width.

## 2026-07-25 — Linked phrase playback intent

- Saved chord chips now copy their voicing into the shared Solo fretboard when
  Solo mode is active, so loading and playing a chord visibly updates the board.
- Fretboard Pick in Solo mode now resolves carried chords from the editing
  context and plays them sequentially as an exploration arpeggio.
- Replaced the Arp / Strum dropdown with an always-visible compact toggle, so
  the choice cannot overlap neighboring solo chips.
- Chip previews now initialise audio and play their first event inside the
  click gesture, preserving sound on mobile browsers.
- Clicking a phrase while already editing now previews it before selecting it
  for editing, including keyboard activation.
- Added the Arp / Strum picker to multi-note slide, hammer-on, and pull-off
  phrases, defaulting them to a tight strum while preserving linked strings.
- Saved linked phrases now retain that intent and use it when previewed from a
  Song chip or the recorder.
- Saved Strum playback is simultaneous, while Arp remains sequential. The
  fretboard Strum button remains a separate live downstroke sweep.
- Linked-phrase playback menus open upward by default so they do not cover the
  following solo chips, with a viewport-aware downward fallback.
- Repeat-count menus now expand inline in a compact two-column layout, pushing
  surrounding rows down instead of covering adjacent chips or panels.

## 2026-07-25 — Project context documentation

- Updated `PROJECT.md`, `README.md`, `HANDOFF.md`, and `CONTRIBUTING.md` to
  document the current multi-song model, solo playback intent (`note`, `arp`,
  `strum`, and linked techniques), saved-chip preview behavior, compatibility
  defaults, and owner-directed handoff workflow.
- Expanded the in-app Help copy so the same playback and preview rules are
  available to people using the tool, not only to contributors.

## 2026-07-23 — Calm returning and in-key guidance

- Kept the named “Last time” restoration notice visible long enough to orient a
  returning player.
- Removed routine “Added chord / Try next” board stickers. The saved Song chip
  is now the visible confirmation, with a polite non-visual announcement for
  assistive technology.
- Moved next-chord guidance into **Key & Scales**: after a stable clean key,
  the panel gently introduces clickable primary I / IV / V (or i / iv / V)
  shapes, while other unused diatonic chords stay behind an explicit reveal.
  Suggestions only load a fretboard shape; they never add a chord by themselves.
- Moved **My songs** into a compact top-level working-context bar and refined
  the picker’s focus and whole-card hover behaviour.
- Made the opening promise shorter and action-led, and aligned the Help quick
  start with it.

## 2026-07-20 — Fresh social previews

- Versioned the social-card image URL so WhatsApp, LinkedIn, and other preview
  crawlers can retrieve the refreshed card rather than reusing the prior image.

## 2026-07-20 — Explicit product description

- Kept the emotional headline as the title and made **“A tab builder for
  singer-songwriters”** the explicit product description in the app metadata,
  social descriptions, installable-app manifest, README, and product guide.

## 2026-07-20 — For the songs that you almost wrote.

- Repositioned Couch Batata around its real purpose: preserving the guitar
  ideas that might otherwise be lost.
- Replaced the former “Build songs from the sofa” share-card message with
  “For the songs that you almost wrote. Catch the chord. Keep the song.”
- Updated the app header, browser/installable-app text, GitHub README, social
  metadata, and exported-chart credit line to use the new positioning.
- Replaced the WhatsApp/LinkedIn preview with a calmer, acoustic-guitar mascot
  card designed to stay readable at small sizes.

## 2026-07-20 — Builder story

- Added the creator’s story to the README: the need to preserve voice-memo
  guitar ideas, identify what was played, and make music rather than only study
  guitar.

## 2026-07-19 — Consistent shape navigation

- Applied the suggestion navigator’s roomy, no-crop control treatment to the
  chord-shape browser.
- Shape descriptions now slide in the direction of the selected voicing while
  the fretboard continues to pop the newly shown notes.

## 2026-07-19 — Smooth suggestion navigation

- Made full-chip suggestion pages slide in the direction of travel, so the
  controls read as horizontal exploration rather than an abrupt replacement.
- Widened the reserved navigation slot so both arrows, their borders, and their
  sticker shadows remain fully visible.
- Strengthened the core-to-colourful guide with clearly visible directional
  arrows.

## 2026-07-19 — Visible active scale state

- Added a passive mint status badge to the Key & Scales header whenever a scale
  is displayed on the fretboard.
- The header remains one large click target; selecting the active scale card is
  still the only way to turn the overlay off.
- Bumped the offline cache so installed copies receive the indicator.

## 2026-07-19 — Accurate scale names and spellings

- Renamed the ambiguous **Blues** entry to **Minor blues**; its formula is
  `1–♭3–4–blue–5–♭7`.
- Restored the global sharp/flat toggle across scale overlays and the scale
  panel, and now redraws and saves immediately when the preference changes.
- Corrected Lydian’s displayed `♯4` and clarified broad “safe note” wording.
- Updated Help to describe the paged chord-suggestion controls.
- Bumped the offline cache so installed copies receive the correction.

## 2026-07-19 — Paged suggestion and shape navigation

- Suggestions now advance through full-chip pages. Permanent ◀ / ▶ controls
  dim at the start/end, and no chip or control is cropped or overlapped.
- The chord-shape navigator now reserves one stable centre slot for its label,
  so its arrows never shift as the shape description changes.
- Bumped the offline cache so installed copies receive the refinement.

## 2026-07-19 — One visual system for every picker

- Replaced every native dropdown with an accessible in-app picker: New section,
  section-transfer target, chord repeats, and Solo repeats.
- Open menus now match the app’s styled section-name menu on phone, tablet, and
  desktop rather than switching to an operating-system popup.
- Bumped the offline cache so installed copies receive the visual update.

## 2026-07-19 — Copy, merge, and duplicate musical content

- Added an explicit section **Copy / Move contents** workflow. It appends
  chords, complete Solo phrases, and lyrics to a chosen section; moving then
  removes the source only after confirmation.
- Added **⧉** to Solo events. It duplicates a whole Slide, Hammer-on, or
  Pull-off phrase together, preserving its source/destination relationship.
- Bumped the offline cache so installed copies receive the new tools.

## 2026-07-19 — Readable linked Solo phrases

- Connected Slides, Hammer-ons, and Pull-offs now show their dashed source and
  red-bordered destination in both the Solo draft and saved Song events.
- Clear labels identify where a phrase starts and which event it comes from.
- Bumped the offline cache so installed copies receive the visual improvement.

## 2026-07-19 — Clear transient Solo chord references

- **Clear selection** now removes the carried chord reference as well as the
  active Solo selection.
- Using or clearing a carried chord is now one-shot, so translucent markers do
  not return on a later visit to Solo / arpeggio mode unless a chord is chosen
  or edited again.

## 2026-07-19 — Restore Solo Clean action

- Fixed saving a selected chord or note group with **Clean** in Solo / arpeggio
  mode; it now adds the event to the draft as intended.
- Bumped the offline cache so installed copies receive the repair.

## 2026-07-19 — Smoke-test and handoff maintenance

- Streamlined the smoke-test suite.
- Clarified how contributors and AI sessions should begin from the shared main
  branch and recover safely from a divergent local checkout.

## 2026-07-19 — Consistent key analysis and leaner offline install

- Corrected chord-suggestion ordering so the detected tonic is ranked first in
  every key, not only C-based contexts.
- Exported charts now use the same key-analysis engine as the Key & Scales panel.
- Removed the social preview image from the offline pre-cache while keeping it
  available for WhatsApp and LinkedIn sharing.

## 2026-07-19 — In-place Solo technique edits

- Turning an existing clean event into a Slide, Hammer-on, or Pull-off now
  keeps it at its current place and adds only the destination beside it.
- Selecting either half of a connected phrase edits its destination in place;
  the interface now identifies the dashed source and selected destination.

## 2026-07-19 — Linked phrase editing and reordering

- Dragging any event in a connected Slide, Hammer-on, or Pull-off now moves
  its complete phrase as one unit, so the technique cannot disappear.
- Events cannot be inserted between a linked source and destination.
- Clicking a saved Solo event opens it directly for editing; linked events
  retain their source/destination relationship while their destination changes.

## 2026-07-19 — Two-step Solo connections

- Slide, Hammer-on, and Pull-off now use an explicit source → destination flow:
  choose the source, arm the technique, choose the destination, then save it.
- Slides infer their tab direction from fret movement, and multi-note slides
  require linked strings to move in one direction for accurate notation.

## 2026-07-19 — Chord-to-chord Solo slides

- Removed the redundant Show other shapes button; the visible shape navigator
  is the single place to browse voicings.
- A chosen chord can now be the first end of a Slide, Hammer-on, or Pull-off:
  moving its notes and applying a connection automatically records the source
  chord and destination together when there was no earlier Solo event.

## 2026-07-19 — Saved chord-shape editing

- Restored the prominent Shape 1 of N navigator below the chord actions.
- Changing a shape for a selected Song chord now writes that voicing back to
  the existing chord in place, without moving it in the progression.

## 2026-07-19 — Intentional chord reference in Solo mode

- A deliberately selected chord now remains visibly selected when switching to
  Solo / arpeggio mode and becomes the active Solo selection, ready to record
  as a chord hit or reshape into an arpeggio.
- Adding that chord to a Song section clears the temporary reference and the
  fretboard resets cleanly, without showing default open-string markers.
- Applying a Solo technique also consumes that temporary reference, leaving a
  clear fretboard ready for the next event.

## 2026-07-19 — Connected solo techniques and repeats

- Hammer-ons, pull-offs, and slides now connect the immediately previous Solo
  event to the new note on the same string, with a visible source-event badge.
- These techniques stay unavailable until a valid preceding event exists; a
  reordered or deleted source safely clears a broken connection.
- Added visible ×1–×8 repeat controls for each Solo event and expanded repeats
  into the exported tab.

## 2026-07-19 — Editable solo events

- Clicking a saved draft event now loads its notes onto the Solo fretboard.
- Editing its notes and choosing a technique updates that same event in place;
  the full solo is committed with Save solo.

## 2026-07-19 — Chord reference and shape navigation

- Kept the selected chord visible as a quiet reference while recording Solo /
  arpeggio notes, without changing the chord itself.
- Moved always-available shape arrows beside the Chord tab and retained a full
  E-shape barre-family voicing when alternate shapes are generated.

## 2026-07-19 — Music-theory correctness pass

- Ranked chord suggestions by core diatonic harmony first, then richer in-scale
  variants; the strip now says “core → colourful,” not unsupported rarity claims.
- Recognised ordinary harmonic- and melodic-minor dominant language instead of
  labelling it borrowed from the relative major.
- Made full selected modes define their suggestion pool, while pentatonic and
  blues selections only re-centre ranking as melodic overlays.
- Removed the inaccurate minor-IV-to-Dorian recommendation and clarified Help.

## 2026-07-19 — Chord suggestions

- Added compact, playable chord suggestions below the shared fretboard in Chord mode.
- The same Key & Scales analysis now reacts to a chord being auditioned on the board;
  that one-chord reading is labelled tentative until it becomes song context.
- Selecting a scale re-centres suggestion priority around that scale's tonal character.
- Suggestion rows now scroll horizontally instead of clipping chords, and starter
  suggestions include every major and minor root.

## 2026-07-18 — Open-string chord board

- Chord mode now begins with all six strings selected as open notes.
- The nut is the only mute control: tap an open note to show one × on that nut,
  then tap it again to restore the open string.
- Reset restores the standard open tuning, and string labels stay as plain names
  so alternate-shape views never show a duplicate ×.

## 2026-07-18 — Fretboard technique drawer

- Moved Solo / arpeggio technique pills into a sliding strip directly below the
  fret numbers on the shared fretboard.
- The strip opens only in Solo mode, and its techniques remain disabled until
  one or more notes are selected.

## 2026-07-18 — Preview action

- Replaced the ambiguous Copy to clipboard action with Preview, which opens the
  complete in-app tab chart before export.

## 2026-07-18 — Whole-pill fretboard switches

- Rebuilt Chord/Solo and Notes/Tab as single-click sliding switches that match
  the ♯/♭ control; tapping anywhere on either pill toggles its state.

## 2026-07-18 — Unified fretboard controls

- Grouped Chord/Solo, Notes/Tab, and ♯/♭ controls together above the shared
  fretboard; Notes/Tab appears there in Solo mode.

## 2026-07-18 — Notes / Tab display fix

- Made Notes / Tab visibly switch active scale-guide labels between note names
  and fret numbers in Solo / arpeggio mode.

## 2026-07-18 — Floating Help

- Added a small, bottom-right Help button with a non-blocking quick-start guide
  and expandable how-to topics.
- Covers chords, solos, sections, scales, export, offline use, and privacy.

## 2026-07-18 — Solo interaction polish and QA

- Matched Solo mode controls, event chips, and edit actions to the app’s springy
  sticker-button motion and added a pop-in for newly recorded events.
- Completed desktop, phone, functional, layout, and reduced-motion QA for the
  chord, scale, and solo workflows.

## 2026-07-18 — Clear solo save states

- Changed Create solo to Save solo while editing an existing saved solo.
- New solos join the active section only when it has chords; otherwise Couch
  Batata creates a separate Solo section.

## 2026-07-18 — Visible, editable saved solos

- Show every saved solo event directly inside its Song section instead of only
  showing an event count.
- Added Edit solo to load a saved solo back into the recorder and update the
  same section after editing.
- Added per-event × deletion and drag reordering for saved solo events.

## 2026-07-18 — Solo draft and creation workflow

- Made the Notes/Tab switch update both shared-fretboard markers and drafted
  solo events.
- Replaced Undo event with Create solo: drafted events are added to the active
  song section only after confirmation, or create a new Solo section.
- Added × deletion controls for draft events and saved solos; draft events can
  be dragged into a different order before creating the solo.

## 2026-07-18 — Scale-guided solo mode

- Moved Key & Scales above the shared fretboard for earlier musical direction.
- Kept active scale notes visible in Solo / arpeggio mode until the scale is
  deselected, with selected solo notes layered above the scale.

## 2026-07-18 — One shared fretboard

- Replaced the separate solo recorder fretboard with the original chord
  fretboard, so both workflows use exactly the same visual instrument.
- Added a Chord / Solo / arpeggio mode switch above the shared fretboard.

## 2026-07-18 — Lead recorder: grouped notes and tab display

- Made the solo fretboard visually match the main guitar fretboard.
- Select one note or multiple notes before choosing Clean, bend, release, pull-off,
  hammer-on, slide, vibrato, or mute to save the whole hit as one event.
- Added a Notes/Tab switch for selected fretboard markers and grouped-event tab export.

## 2026-07-18 — Solo and arpeggio recorder

- Added a separate tappable lead fretboard that records notes into the active song section.
- Added bend, release, pull-off, hammer-on, slide, vibrato, and mute tab techniques.
- Added lead-tab export, local autosave, and JSON backup/restore support.

## 2026-07-18 — Fix forward section drag

- Fixed forward section drags landing one slot too early in the song order.
- Bumped the offline cache so installed users receive the fix.

## 2026-07-18 — Fix forward chord drag within a section

- Fixed forward chord drags landing one slot too early in the same section.
- Bumped the offline cache so installed users receive the fix.

## 2026-07-18 — Desktop app title

- Simplified installed desktop app metadata to read: “Couch Batata - A tab builder for singer-songwriters”.

## 2026-07-18 — Header mascot refresh

- Replaced the old embedded mascot with the supplied transparent acoustic-guitar artwork.
- Added the new mascot to the offline app shell so installed users receive it too.

## 2026-07-18 — In-app update notice

- Added a clear Update now prompt when an installed app detects a newer published version.
- The app checks for a fresh version at launch and hourly while it remains open online.

## 2026-07-18 — Home-screen icon refresh

- Replaced the undersized icon with a bold couch-potato illustration.
- Changed the instrument to a natural-wood acoustic guitar.
- Added dedicated iOS, standard PWA, and safely padded Android maskable icons.
- Versioned the icon filenames and offline cache so phones fetch the new artwork.

## 1.0.0 — 2026-07-18

- Published the complete static guitar chord and song builder.
- Added reliable local autosave and editable JSON project backup/import.
- Corrected dominant-blues scale guidance.
- Preserved multiple chord voicings in text exports.
- Added accessible custom section-name menus.
- Fixed touch scrolling on phones and tablets.
- Added installable PWA metadata, icons, offline caching, and social preview.
- Added dependency-free tests, documentation, AI-agent guidance, and automated
  GitHub Pages deployment.
## 2026-07-24

- Solo playback now distinguishes single-note picks, arpeggios, chord-like strums, and synchronized linked phrases. Clean multi-note events expose an Arp/Strum picker, and playback intent is preserved in project backups.
- Clicking a saved solo/phrase chip previews it and reveals its notes on the fretboard without entering edit mode.
