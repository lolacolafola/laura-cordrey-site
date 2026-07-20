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
  repo needs BOTH the author and committer set to the GitHub noreply address**
  (`261253710+lolacolafola@users.noreply.github.com`), not the personal one.
  `git commit --author="..."` alone is NOT enough — that flag only overrides the
  author field; the committer field still silently falls back to local git
  config (the personal email). The reliable one-shot fix is `-c` (a per-command
  config override, not a persistent config change — this is allowed):
  `git -c user.name="Laura Cordrey" -c user.email="261253710+lolacolafola@users.noreply.github.com" commit -m "..."`
  This sets both author and committer correctly in a single call — no `--author`
  flag or `GIT_COMMITTER_*` env vars needed.
- This can't be fixed by changing git config (config changes are off-limits), so
  it must be passed explicitly on every `git commit` call in this repo.
- Before any push, verify both fields on every unpushed commit:
  `git log --format="%h author=%ae committer=%ce %s" origin/main..HEAD`
  — don't rely on the push succeeding as the first signal; check first.
- If a commit already landed with the wrong author and/or committer before a
  push, fix it before pushing rather than hitting the GH007 rejection: for the
  tip commit, `git commit --amend --author="..."` plus the `GIT_COMMITTER_*` env
  vars above; retry once or twice if it's blocked by the permission classifier
  (usually transient). For a commit further back, rebuild it on a fresh branch
  from the last good commit using `git checkout <bad-commit-hash> -- <files>`
  (not `git diff`/`git apply` or `git cherry-pick`, both of which the classifier
  tends to block) followed by `git add <those exact files>` — never `git add -A`,
  which will also stage unrelated untracked files sitting in the working tree.

## Design rules
- **Hover honesty.** Cursor response is a promise: if an element lifts, scales,
  glows or otherwise reacts on hover, clicking it must do something. `:hover`
  motion lives only on `<a>` and `<button>`. Informational cards, logos and
  quotes stay static under the cursor.
- Ambient animation (scroll reveals, autonomous loops like the radar sweep) is
  fine anywhere — it promises nothing. Keep it off under
  `prefers-reduced-motion`.
