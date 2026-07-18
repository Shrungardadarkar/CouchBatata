# Changelog

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
