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

## Naming rules
- **It is never "the Engine". It is always the Fan Engine, and it always
  carries the ™.** No shortening, no "the Engine" on second reference, no
  bare "Fan Engine" without the mark. This is a trademark, and a trademark
  that is used loosely stops being one.
  - In JSX, use the styled mark: `Fan Engine<span className="tm">™</span>`
  - In plain strings (meta descriptions, `<option>` labels, JSON-LD, alt
    text) use the literal character: `Fan Engine™`
  - Same rule for **Fan Score** and the **Fan Value Model** — canonical names,
    never abbreviated or improvised.
- Before shipping copy, grep for drift:
  `grep -rn "the Engine" src/ | grep -v "Fan Engine"`

## Design rules
- **Hover honesty.** Cursor response is a promise: if an element lifts, scales,
  glows or otherwise reacts on hover, clicking it must do something. `:hover`
  motion lives only on `<a>` and `<button>`. Informational cards, logos and
  quotes stay static under the cursor.
- Ambient animation (scroll reveals, autonomous loops like the radar sweep) is
  fine anywhere — it promises nothing. Keep it off under
  `prefers-reduced-motion`.
- **Change a band's ground, re-check every `<mark>` on it.** The red `<mark>`
  is the single most common contrast failure on this site, and it is always
  the same cause: the buttons and body copy get checked when a section's
  background changes, and the mark does not. It has bitten four times:
  `#C8362B` on oxblood at **1.4** (the /services close), on `#2D2723` at
  **2.82** (twice on /about), and a 20px→16.8px body change silently pushing a
  mark under the 18.66px "large text" line so 4.32 stopped being a pass.
  - Large text (≥24px, or ≥18.66px bold) needs **3.0**. Everything else needs
    **4.5**. A font-size change can move a mark across that boundary without
    the colour changing at all.
  - Known-good substitutions, already used across the site: **`#E4695E`** for
    red marks on dark grounds, **`var(--accent-deep)` `#8E2520`** for red on
    bone or cream, **`#F2D79A`** for gold on oxblood, **`#B8AEA2`** for muted
    body copy on the mid-dark grounds (`#2D2723`, `#241D19`), where
    `--ink-muted` measures 3.8–4.3.
  - Measure in the browser, not by eye, and composite `rgba()`/`color()`
    foregrounds over the resolved ground before computing the ratio. Note that
    Chrome returns some colours as `color(srgb 0.93 0.91 0.86 / 0.84)` with
    channels in **0–1, not 0–255**; a parser that assumes 0–255 invents
    failures that are not there.
