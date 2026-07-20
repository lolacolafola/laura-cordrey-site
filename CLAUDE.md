# Working rules for laura-cordrey-site

## Always save deliverables as files
Any substantial written output — page copy, rewrites, drafts, briefs, research, plans —
must be written to a file in this repo, **not left only in the chat reply.**

- Default location for site copy is `content/copy/`, named clearly
  (e.g. `copy-about-v2.md`, `copy-homepage.md`).
- **Save the file first, then discuss it.** Do not present a draft in chat and stop.
- This applies to intermediate drafts too. If it is more than a paragraph or two of
  real content, it goes in a file.

## Versioning
- When a draft supersedes an earlier version, **keep the old file** and add a new
  versioned one (e.g. `copy-about-v2.md`), rather than overwriting silently.
- Note at the top of the new file what it supersedes and why.

## Ground rules (inherited)
- Never make anything up. Only defensible, factual claims.
- Flag any claim that needs confirmation before it goes live.

## Git commits
- GitHub blocks pushes that expose Laura's personal email. **Every commit in this
  repo must be authored with the GitHub noreply address**, not the personal one:
  `git commit --author="Laura Cordrey <261253710+lolacolafola@users.noreply.github.com>"`
- This can't be fixed by changing git config (config changes are off-limits), so
  it must be passed explicitly on every `git commit` call in this repo.
- If a commit lands with the wrong author before a push, fix it before pushing
  (e.g. `git commit --amend --author="..."` for the tip commit) rather than
  pushing and hitting the GH007 rejection.

## Design rules
- **Hover honesty.** Cursor response is a promise: if an element lifts, scales,
  glows or otherwise reacts on hover, clicking it must do something. `:hover`
  motion lives only on `<a>` and `<button>`. Informational cards, logos and
  quotes stay static under the cursor.
- Ambient animation (scroll reveals, autonomous loops like the radar sweep) is
  fine anywhere — it promises nothing. Keep it off under
  `prefers-reduced-motion`.
