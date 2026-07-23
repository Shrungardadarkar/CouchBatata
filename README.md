# Couch Batata — For the songs that you almost wrote.

**Catch the chord. Keep the song.**

Couch Batata is a free, private tab builder for singer-songwriters. It works as a guitar
song workspace for phones, tablets, and laptops. Tap the notes
you played, identify the chord, save the shape or progression while the idea is
fresh, and keep building the song. It works offline after the first visit and
does not require an account.

## Why I built Couch Batata

I have played guitar on and off for years with the intent to learn the instrument.
I learnt chords for songs but was never able to remember them. It wasn't going anywhere.
Then my goal shifted from learning guitar (which I still suck at) to writing
songs—hoping that at least I'd be able to remember my own songs. That posed
a new challenge, though a good problem to have. Whenever an idea came to me,
I would start finding a finger formation on the guitar without knowing the chord,
record it as a voice memo—but I had no simple way to document what I had
actually played. Later, I would try to recreate it by ear, often unable to
remember the chord shape, notes, or progression that made the idea work.

Couch Batata grew from that gap. I wanted a simple place to tap the notes I was
holding, figure out the chord, save the progression or arpeggio while the idea
was fresh, and keep building the song. It is made for guitarists who play by
listening and experimenting—not only for people who already know the chord
name.

It is free, private, works offline after the first visit, and does not ask for
an account or track you.

The production app is a self-contained static website. It has no accounts, no
analytics, no advertising, no server-side database, and no runtime package
dependencies. Song data stays in the browser unless the user explicitly exports
it.

## Open the app

Once GitHub Pages is enabled, the public app is available at:

**https://shrungardadarkar.github.io/CouchBatata/**

**[Try Couch Batata](https://shrungardadarkar.github.io/CouchBatata/)**

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
- Key and scale direction appears before the fretboard; after a clear key is
  established, clickable I / IV / V (or i / iv / V) shapes appear first, with
  other unused in-key chords available on request. An active scale overlay
  remains visible while recording a solo.
- Standard tuning with sharps/flats spelling.
- Chord recognition, inversions, alternate interpretations, and a smoothly
  animated, fully visible voicing browser.
- Song sections, repeats, lyrics, duplication, deletion, reordering, and safe
  copy/move-and-merge into another section.
- Key analysis, borrowed-chord guidance, scale suggestions, and position boxes.
- Compact playable chord suggestions beneath the fretboard, presented as
  complete-chip pages with smooth directional previous/next controls; selecting
  a soloing scale re-centres their priority around that scale's tonal character.
  Core diatonic chords appear before richer in-scale variants; a full selected
  mode such as harmonic minor also changes the harmonic suggestion pool.
- Plain-text chord and lead-tab preview and export.
- A compact **Working on / My songs** bar: start a fresh local song, switch
  between ideas, back up one song, or delete one deliberately. The current
  idea stays immediately reachable without interrupting the fretboard flow.
- Editable JSON project backup and import. Importing creates a separate local
  song when the browser supports the song picker, so it never replaces the
  current idea by accident.
- Local autosave with close/reload protection and a one-time migration from
  earlier single-song saves.
- Responsive touch layout and accessible custom section menu.
- Progressive Web App manifest, icons, and offline service worker.
- A floating Help button with a quick start and in-app feature guide.

## Privacy and offline behavior

- The app makes no analytics or tracking requests.
- On supported browsers, the local song library is stored in IndexedDB under
  `couch-batata.projects`. Each record contains one complete editable project,
  its title, local timestamps, a small factual summary, and a revision number.
- The active song is also mirrored to the stable legacy key
  `fretwork.song.v1` for quick-close recovery and compatibility with earlier
  offline tabs. Existing saves migrate automatically on first use; the raw
  legacy entry is left intact.
- If an old cached tab and the current app disagree about the active mirror,
  Couch Batata preserves the conflicting copy as a separate recovered local
  song instead of overwriting either idea.
- If IndexedDB is unavailable, the app falls back to the original single-song
  local save and gives a clear backup reminder.
- Clearing browser/site data can erase local songs. Use **Back up project
  (.json)** for every important song.
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
scripts/validate-agents.mjs  Checks .claude/ skill and agent docs for stale references
tests/smoke.mjs            Dependency-free app-shell validation
tests/voicing-audit.mjs    Pitch-class and familiar-voicing regression checks
tests/voicing-compare.mjs  Before/after voicing comparison for generator work
.claude/skills/            Project skills (music theory, guitar playability)
.claude/agents/            Project agents (product, UX, marketing, code review)
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
