# Changelog

## 2026-07-19 — Intentional chord reference in Solo mode

- A deliberately selected chord now remains visibly selected when switching to
  Solo / arpeggio mode and becomes the active Solo selection, ready to record
  as a chord hit or reshape into an arpeggio.
- Adding that chord to a Song section clears the temporary reference and the
  fretboard resets cleanly, without showing default open-string markers.

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
