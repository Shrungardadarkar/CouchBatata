# Product and technical specification

## Product

Couch Batata is a tab builder for singer-songwriters that helps guitarists
capture a song idea without needing notation software. Its emotional promise is
**“For the songs that you almost wrote.”** Its practical promise is **“Catch
the chord. Keep the song.”** It exists for an idea a player’s hands found before
they knew its name. The primary loop is:

1. Select or mute notes on a guitar fretboard.
2. Review the identified chord and alternate interpretations.
3. Add the chord to the active song section.
4. Arrange sections, repeats, and optional lyrics.
5. Switch the same fretboard to Solo / arpeggio mode and record into the active
   section, using any selected scale overlay as a visual guide.
6. Review key and scale guidance.
7. Export a readable chart or an editable project backup.

The return and guidance moments are deliberately calm. A restored session names
the last section long enough to orient the player; a routine chord addition is
confirmed by the new chip in the Song rather than a toast. Once two or more
saved chords establish a clean key, **Key & Scales** offers clickable primary
I / IV / V (or i / iv / V) shapes first, with the remaining unused diatonic
chords behind an explicit reveal. It never auto-adds a suggestion or repeatedly
asks the player to try one.

The compact **Working on / My songs** bar sits above the capture flow so a
returning player can switch ideas without turning the app into a dashboard.
The picker opens with its dialog focused for orientation; song rows have a
whole-card hover/focus state and only reveal backup/delete through their
secondary menu.

Chord suggestions use complete-chip pages with persistent previous/next controls
when there is more than one page. Each control change uses a small directional
slide, while a reserved navigation slot keeps chips, arrows, borders, and
sticker shadows fully visible across screen sizes.

The chord-shape browser follows the same pattern: its previous/next buttons
always have room for their sticker shadows, its centre label keeps one stable
slot, and each voicing change slides in the direction of travel.

The product should feel playful and immediate rather than academic. Music-
theory guidance must still be careful, explicit, and testable.

## Visual system

- Warm cream paper background.
- Plum outlines and text.
- Coral is reserved for brand moments and musical emphasis; heat yellow marks
  capture or commit actions; industrial aqua marks exploration, browsing, and
  saved-project tools; berry is reserved for destructive actions.
- Fretboard interval and scale guidance uses a separate, subdued mineral
  palette with labels and marker shapes, so colour is never the only cue.
- Thick borders, hard offset shadows, rounded cards, and physical button motion.
- The transparent potato-on-couch mascot is a normal project asset:
  `mascot-v2.png`.

## Runtime model

`index.html` contains the complete application logic and styling. No runtime
libraries are loaded. The manifest and service worker make the same static app
installable and offline-capable when served through HTTPS or localhost.

### Main state

```text
selection[6]          selected fret per string; null or "x" are also valid
current               identified chord on the fretboard
currentAlts[]         alternate chord interpretations
sections[]            ordered song sections, chords, lead events, and lyrics
lead event            {id, notes:[{s,f}], t, from?, links?, rep}: one or more simultaneous notes, an optional tab technique, and an optional repeat count; connected techniques are recorded as explicit source then destination events
activeSectionId       section receiving newly added chords
activeChip            selected song chord
scaleActive           selected scale overlay
scaleBoxIdx           selected position box
useFlats              note spelling preference
activeProjectId       canonical local-song record currently open (or null for a blank canvas)
songIndex[]           local song metadata for the My songs picker
```

### Persistence

- Canonical browser store: IndexedDB database `couch-batata.projects`, with
  `projects` records and a small `meta` store for the active-project id and
  one-time migration marker.
- Project record: `{id, revision, createdAt, updatedAt, title, summary,
  snapshot}`. `summary` is only a local section/chord/lead-event count for the
  picker; no musical activity is sent anywhere.
- Stable recovery mirror: `fretwork.song.v1`, format version `1`. It holds the
  currently open normalized snapshot for fast close/reload recovery and for
  older cached app tabs. First use migrates a valid legacy snapshot without
  deleting it. A disagreement creates one recovered local song rather than
  overwriting either version.
- An untouched first-visit canvas is not saved as a permanent record until a
  title or section gives it meaning. Choosing **+ New song** is an explicit
  exception: it intentionally creates an empty local idea that can be returned
  to after switching songs. **Clear this song** clears contents but keeps the
  song record and title; **Delete** is the explicit irreversible picker action.
- Import creates a new local record, adding an imported suffix if a title
  collides. IndexedDB-unavailable browsers retain the original single-song
  fallback and request confirmation before replacing it.
- Local data includes sections, lyrics, chord shapes, grouped lead events
  (including technique links and repeats), active section, spelling, scale
  state, panel state, and next IDs. Editable backups use the same normalized
  JSON model.
- Imported chords are rebuilt from known formulas instead of trusting arbitrary
  pitch-class or suffix data.

## Music theory

- Standard tuning: `OPEN = [64,59,55,50,45,40]` in high-e-to-low-E order.
- Chord identification compares unique pitch classes against the built-in
  formula library and considers bass-note inversions.
- The voicing generator searches playable fretboard combinations, then keeps
  positional variety. A very small, pitch-checked catalogue preserves a few
  widely taught grips that a lower-effort alternative would otherwise hide.
  Changes to its selection must be compared across all 12 roots and 25 chord
  formulas before release.
- Key analysis scores all twelve major collections and reports ambiguity.
- Dominant I/IV/V blues progressions are presented as a dominant-blues tonal
  context, not as one universal Mixolydian scale.
- Scale coverage claims are based on actual chord pitch classes.
- The app calls the `1–♭3–4–blue–5–♭7` collection **Minor blues**. The global
  sharp/flat toggle consistently respells every displayed pitch; the blue note
  is labelled simply **blue** to avoid implying one enharmonic spelling.
- Position overlays display scale-degree roles across frets 0–12.

## Export formats

### Text chart

Human-readable sections, chord repetitions, lead-tab lines, lyrics, tuning, and
every distinct voicing. It is intentionally not an editable project format.

### JSON project

Restorable application state for device transfer, backup, and continued editing.

## Offline/update strategy

- The first successful visit installs the app shell in Cache Storage.
- Navigation requests prefer the network and fall back to cached `index.html`.
- Static assets use cache-first with a background refresh.
- `og.png` remains available for WhatsApp/LinkedIn previews but is intentionally
  excluded from the offline app shell to keep installs smaller.
- Old named caches are deleted during service-worker activation.
- Every cached release must increment the service-worker cache name.

## Supported delivery

The repository deploys as a public GitHub Pages site. It can also be copied to
any standards-compliant static HTTPS host without modification.

## Definition of done

- `npm test` passes.
- The app contains no external runtime resources or tracking.
- It works at the repository sub-path, not only at a domain root.
- Phone/tablet/desktop layouts remain usable.
- Touch scrolling, keyboard navigation, persistence, backup/import, export, and
  offline reload are verified.
