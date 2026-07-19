# Product and technical specification

## Product

Couch Batata helps guitarists capture a song idea without needing notation
software. The primary loop is:

1. Select or mute notes on a guitar fretboard.
2. Review the identified chord and alternate interpretations.
3. Add the chord to the active song section.
4. Arrange sections, repeats, and optional lyrics.
5. Switch the same fretboard to Solo / arpeggio mode and record into the active
   section, using any selected scale overlay as a visual guide.
6. Review key and scale guidance.
7. Export a readable chart or an editable project backup.

Chord suggestions use complete-chip pages with persistent previous/next controls
when there is more than one page. This avoids partially cropped suggestions and
keeps the navigation placement stable across screen sizes.

The product should feel playful and immediate rather than academic. Music-
theory guidance must still be careful, explicit, and testable.

## Visual system

- Warm cream paper background.
- Plum outlines and text.
- Tomato, sunflower, mint, sky, and lilac sticker colors.
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
```

### Persistence

- Browser key: `fretwork.song.v1`
- Format version: `1`
- Local data: sections, lyrics, chord shapes, grouped lead events (including technique links and repeats), active section,
  spelling, scale state, panel state, and next section ID.
- Editable backups use the same normalized JSON model.
- Imported chords are rebuilt from known formulas instead of trusting arbitrary
  pitch-class or suffix data.

## Music theory

- Standard tuning: `OPEN = [64,59,55,50,45,40]` in high-e-to-low-E order.
- Chord identification compares unique pitch classes against the built-in
  formula library and considers bass-note inversions.
- Key analysis scores all twelve major collections and reports ambiguity.
- Dominant I/IV/V blues progressions are presented as a dominant-blues tonal
  context, not as one universal Mixolydian scale.
- Scale coverage claims are based on actual chord pitch classes.
- The app calls the `1–♭3–4–blue–5–♭7` collection **Minor blues**. Scale-note
  labels use their musical degrees (for example, A minor blues shows E♭ as the
  blue note), rather than blindly following the global sharp/flat preference.
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
