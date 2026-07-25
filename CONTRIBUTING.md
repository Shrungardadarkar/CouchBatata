# Contributing

Contributions from humans and AI coding agents are welcome.

1. Fork or clone the repository, then fetch `origin/main` before starting.
2. Read `AGENTS.md` and `PROJECT.md`.
3. Create a focused branch unless the owner is actively driving the session and
   explicitly asks for a direct `main` update; this repository has historically
   used direct-to-main handoffs for those sessions.
4. Run `npm test` before and after the change.
5. Test interaction changes in a browser at phone and desktop widths.
6. Open a pull request for independent contributions. For an owner-directed
   direct-to-main handoff, use a small descriptive commit and report the commit
   and validation run clearly.

Keep the production app dependency-free and avoid unrelated formatting or
architecture rewrites. Do not add tracking, remote fonts, remote scripts,
credentials, or private hosting configuration.

When a local checkout cannot fast-forward to `origin/main`, preserve any
uncommitted work elsewhere and use a fresh clone instead of merging unrelated
histories.
