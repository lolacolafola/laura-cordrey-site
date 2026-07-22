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
- **Which red, decided by job and ground — never by eye.** There are four, and
  picking between them is a lookup, not a judgement call. Defined in
  `src/styles/tokens.css`.

  | Token | Value | Use it for |
  |---|---|---|
  | `--accent` | `#C8362B` | **Fills**: buttons, bars, dots, gradient stops. Plus display text on cream. |
  | `--accent-deep` | `#8E2520` | Red **text on light** grounds (bone, cream). Also hover/pressed. |
  | `--accent-light` | `#E4695E` | Red **text on dark** grounds. |
  | — | `#A12A1E` | The oxblood **ground**. Never text. |

  Measured contrast, which is where the rule comes from:

  | | black `#0E0B09` | dark `#15110F` | card `#241D19` | brown `#2D2723` | bone `#EFE9DC` | cream `#FCFAF3` |
  |---|---|---|---|---|---|---|
  | `--accent` | 3.75 | 3.59 | 3.18 | 2.82 | 4.32 | 5.00 |
  | `--accent-deep` | 2.28 | 2.18 | 1.93 | 1.71 | **7.13** | **8.26** |
  | `--accent-light` | **6.05** | **5.79** | **5.12** | **4.54** | 2.68 | 3.10 |

  - **`--accent` is a fill colour, not a text colour.** It is the brand red and
    the instinct is to reach for it, but as body text it fails AA on every
    ground on this site except cream. That is why the other two exist.
  - `--accent-light` is the only red clearing 4.5 on all four dark grounds, so
    it is the safe default for red text on dark.
  - **Red is "the single gesture colour" (tokens.css). Spend it once per
    section.** A kicker plus a `<mark>` plus a row of 54px red numerals is
    three gestures, and it reads as decoration rather than emphasis. When a
    section wants more than one, the largest element gives it up first.
  - `#E0574B` is a **graphic tint**, not a member of the text palette: the
    second stop in the red gradients and the lighter segment in the Fan Value
    charts. Existing text uses on the two darkest grounds are measured and
    fine (5.26 / 5.04); do not add new ones, and never put it on `#241D19` or
    `#2D2723` (4.45 / 3.95).
  - Per-case-study `accent` values in `src/data/caseStudies.js` (e.g. Claw
    Mobile's `#FF6B5B`) are client brand colours and sit outside this system
    on purpose. Leave them alone.

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
