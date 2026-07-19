# Couch Batata - A tab builder for singer-songwriter.

**Explore Chords, Scales, Progressions and Create Tabs; always create music.**

Couch Batata is a free, installable guitar chord and song builder for phones,
tablets, and laptops. Pick notes on the fretboard, identify the chord, arrange
sections, add lyrics, inspect key and scale suggestions, and export a portable
chord chart.

The production app is a self-contained static website. It has no accounts, no
analytics, no advertising, no server-side database, and no runtime package
dependencies. Song data stays in the browser unless the user explicitly exports
it.

## Open the app

Once GitHub Pages is enabled, the public app is available at:

**https://shrungardadarkar.github.io/CouchBatata/**

The link can be shared through WhatsApp, LinkedIn, email, or any other service.
Users do not need an app-store download.

### Install on a phone or tablet

- **iPhone/iPad:** open the link in Safari, tap **Share**, then **Add to Home
  Screen** and enable **Open as Web App**.
- **Android:** open the link in Chrome and choose **Install app** or **Add to Home
  screen** from the browser menu.
- Installation is optional. The app also works as an ordinary website.
- After the first successful visit, the app shell is cached for offline use.
- The WhatsApp/LinkedIn share image stays online-only, so it is not downloaded
  as part of the offline app shell.

## Features

- Interactive 6-string, 12-fret guitar fretboard.
- One shared fretboard with Chord and Solo / arpeggio modes. In Solo mode,
  select one or more notes, then save the hit with clean, bend, release,
  pull-off, hammer-on, slides, vibrato, or mute; selected markers can show
  note names or tab fret numbers. Draft events can be deleted or reordered,
  then **Create solo** adds them to the selected section (or a new Solo section).
- Solo techniques slide in directly beneath the fret numbers and activate only
  after selecting one or more notes.
- Saved solos are visible in their Song section and can be reopened with
  **Edit solo** for further changes; the action becomes **Save solo** while
  editing. A new solo joins an active chord section, or creates a Solo section
  when no chord section is active.
- Key and scale direction appears before the fretboard; an active scale overlay
  remains visible while recording a solo.
- Standard tuning with sharps/flats spelling.
- Chord recognition, inversions, alternate interpretations, and voicing browser.
- Song sections, repeats, lyrics, duplication, deletion, and reordering.
- Key analysis, borrowed-chord guidance, scale suggestions, and position boxes.
- Compact playable chord suggestions beneath the fretboard; selecting a soloing
  scale re-centres their priority around that scale's tonal character. Core
  diatonic chords appear before richer in-scale variants; a full selected mode
  such as harmonic minor also changes the harmonic suggestion pool.
- Plain-text chord and lead-tab preview and export.
- Editable JSON project backup and restore.
- Local autosave with close/reload protection.
- Responsive touch layout and accessible custom section menu.
- Progressive Web App manifest, icons, and offline service worker.
- A floating Help button with a quick start and in-app feature guide.

## Privacy and offline behavior

- The app makes no analytics or tracking requests.
- Songs are stored locally under the stable key `fretwork.song.v1`.
- Clearing browser/site data can erase local songs. Use **Back up project
  (.json)** for important work.
- The service worker caches the app shell, not the user's songs or the social
  share image.

## Project structure

```text
index.html                 Complete application: HTML, CSS and JavaScript
manifest.webmanifest       Installable-app metadata
sw.js                      Offline cache and update behavior
apple-touch-icon-v2.png    iPhone and iPad home-screen icon
icon-192-v2.png            Standard home-screen icon
icon-512-v2.png            Large home-screen icon
icon-maskable-512-v2.png   Safely padded Android adaptive icon
app-icon-master.png        Full-resolution editable icon artwork
mascot-v2.png              Transparent header mascot image
og.png                     WhatsApp/LinkedIn social preview
PROJECT.md                 Product and technical specification
AGENTS.md                  Instructions for AI coding agents
CONTRIBUTING.md             Human and AI contribution workflow
scripts/serve.mjs          Dependency-free local web server
tests/smoke.mjs            Dependency-free validation suite
.github/workflows/         Tests and GitHub Pages deployment
```

## Work locally

Only Node.js 20 or newer is needed for the helper scripts. The app itself has no
build step.

```bash
npm test
npm run serve
```

Then open `http://localhost:4173/`.

You can also double-click `index.html`, but installation and offline caching
require a local server or HTTPS.

## Updating the app

1. Fetch `origin/main`, then read `AGENTS.md` and `PROJECT.md`.
2. Edit `index.html` or the relevant static asset.
3. Increment `CACHE_NAME` in `sw.js` when changing cached app files.
4. Run `npm test`.
5. Test at phone, tablet, and desktop widths.
6. Commit and push to `main`. GitHub Pages deploys automatically.

If an older checkout cannot fast-forward to `origin/main`, copy out any
uncommitted work and make a fresh clone before continuing. This keeps handoffs
between people and AI sessions predictable.

## License

Released under the [MIT License](LICENSE).
