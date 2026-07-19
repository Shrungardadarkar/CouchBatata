# Changelog

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
