# Instructions for AI coding agents

This repository is intentionally simple and host-neutral. An AI agent should be
able to clone it, read this file, run the tests, modify the app, and push a safe
update without reconstructing prior conversation history.

## Start here

1. Read `README.md`, this file, and `PROJECT.md` completely.
2. Run `npm test` before editing.
3. Serve the repository with `npm run serve` for browser work.
4. Treat `index.html` as the product source of truth.

## Architecture

- The shipped product is plain static HTML/CSS/JavaScript.
- Do not introduce a framework, bundler, server, account system, analytics, or
  external runtime dependency unless the owner explicitly requests it.
- All runtime assets must remain local to this repository.
- All app URLs must be relative so the project works at the GitHub Pages
  sub-path `/CouchBatata/` and on other static hosts.
- `sw.js` controls offline caching. Increment its `CACHE_NAME` whenever a cached
  file changes, otherwise installed users may temporarily receive stale files.

## Data compatibility

- Never rename the local-storage key `fretwork.song.v1` without a migration.
- Preserve project backup compatibility (`version: 1`) or add a backwards-
  compatible migration.
- Validate imported JSON and never inject imported text as raw HTML.
- Autosave must flush on `pagehide`/hidden state.

## Interaction requirements

- Phone users must be able to scroll vertically even when a gesture begins on a
  chord chip or section header.
- The fretboard may scroll horizontally on narrow screens; the page itself must
  not overflow horizontally.
- Maintain keyboard operation and visible focus states.
- Custom menus must support Arrow keys, Home, End, Enter, Escape, Tab, outside
  click, and accessible names.
- Preserve reduced-motion behavior.

## Music-theory requirements

- Never claim that a single tonic Mixolydian scale covers an I7/IV7/V7 blues.
- Any “covers every chord” claim must be verified against the union of actual
  chord pitch classes.
- Keep `OPEN = [64,59,55,50,45,40]`; index 0 is high e and index 5 is low E.
- Exported fret shapes read low E to high e.

## Required validation

Before committing:

```bash
npm test
```

For meaningful UI changes, test at minimum:

- 320 × 568 phone
- 390 × 844 phone
- 768 × 1024 tablet
- 1440 × 900 laptop
- one network-disabled reload after the service worker controls the page

Confirm that there are no console errors, unintended page-level horizontal
overflow, inaccessible controls, or external network requests.

## Git and deployment

- Work on a focused branch unless the owner requests direct-to-main changes.
- Keep commits small and descriptive.
- Never rewrite published history or force-push without explicit approval.
- `.github/workflows/pages.yml` deploys `main` to GitHub Pages.
- `.github/workflows/test.yml` runs the dependency-free smoke tests.

## Repository policy

- Keep the project free of employer/workspace branding, credentials, tracking
  code, private URLs, and proprietary hosting configuration.
- Never commit tokens, cookies, `.env` files, or generated credentials.
- Preserve the MIT license and attribution.
