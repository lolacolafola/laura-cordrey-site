# Copy audit: the Fan Score™ and Fan Value™

28 July 2026. A full read of every string in both tools, requested after two
lines turned out not to say what they meant.

**Nothing here is applied.** These are proposals for your approval — the voice
is yours, and I am not rewriting it unilaterally. Tick the ones you want and
I'll make the changes.

---

## Why this needed doing

The result screen is not a piece of writing. It is assembled at runtime from
interchangeable fragments: 4 opportunity lines × 4 moves × 3 tier headlines ×
3 tier subtitles × 3 paid-growth verdicts, plus a separate branch when two
disciplines tie, plus a whole second edition for pre-launch. **Well over a
hundred combinations, and each visitor sees exactly one.**

So most of these sentences have never been read end to end by a person. That is
how "the goodwill is there but untapped" survived: it only appears when Growth
is your weakest pillar. Unless you answered that way while proofreading, you
would never have seen it.

---

## 1. The trademark problem, and why the drift check missed it

**This is the biggest item here and it needs your decision, not my fix.**

`CLAUDE.md` is unambiguous: *"It is never 'the Engine'. It is always the Fan
Engine, and it always carries the ™."* The check it prescribes is:

```bash
grep -rn "the Engine" src/ | grep -v "Fan Engine"
```

That returns **nothing**, so the rule looks satisfied. It isn't. **The grep is
case-sensitive**, and every violation in the tools is lowercase:

| Where | Current text |
|---|---|
| `R_HEAD.Untapped` | "There's **a fan engine** here you haven't built yet." |
| `R_HEAD.Earned` | "**Your engine** is turning. Make it compound." |
| `R_HEAD.Compounding` | "You own **the engine**. Widen the lead." |
| `QuizReveal` step 1 | "Starting **the fan engine**…" |
| `REFRAME.Fuel` | "You're building **the engine** before securing what feeds it." |
| `GATE_WHY.Fuel` | "A fully built **engine** with no fuel is still empty." |
| pre-launch `gateBox` | "**The engine's** built and the fuel is lined up." |
| pre-launch reframe | "something to feed **the engine**, and **an engine** worth feeding" |
| ladder cap + `fuelSub` | "feed **the engine**" |

These are the first three lines of every live result and the spine of the entire
pre-launch edition.

**The tension is real, and it isn't obviously a mistake.** The engine/fuel
metaphor is what makes the pre-launch edition work — "an engine with no fuel is
still empty" is a good sentence. But it is also generic use of your trademark's
noun, which is exactly the dilution `CLAUDE.md` exists to prevent. A reader who
has just seen "The Fan Score™ · Pre-launch" cannot tell whether "the engine"
means your framework or a metaphor.

**Three ways to go. This is your call:**

- **A — Protect the mark.** Every reference becomes the Fan Engine™ or is
  reworded away from "engine". Costs the metaphor, and some lines become clumsy
  ("A fully built Fan Engine™ with no fuel is still empty").
- **B — Separate them deliberately.** Keep the metaphor, but never let a bare
  "engine" sit near the branded one, and make the first use on any screen the
  full Fan Engine™ so the reader is anchored before the metaphor starts.
- **C — Accept it as generic usage** and record that decision, so nobody
  "fixes" it later.

**Regardless of which you pick, the drift check should be case-insensitive.**
One-character change:

```bash
grep -rni "the engine\|an engine\|your engine" src/ | grep -v "Fan Engine"
```

I'd update `CLAUDE.md` with that either way.

---

## 2. "The one move" is still live in two places

You rejected this phrase on the live intro this morning, correctly — the result
gives a percentage, a four-discipline breakdown, the biggest opportunity *and* a
starting point. It survives in two more places:

| Where | Current | Proposed |
|---|---|---|
| Pre-launch result, section label (`:736`) | **The one move** | **Your move** — matches the live result's label exactly |
| `/fan-score` meta description (`:172`) | "…and **the one move** that would grow the number. Two minutes." | "…and where to start. Two minutes." |

The meta description one matters beyond tidiness: it's what shows in Google
results, so it's the promise a stranger reads before they ever reach the page.

The two editions also label their result sections differently for no reason I
can find:

| Live | Pre-launch |
|---|---|
| What's driving it | Where you stand |
| Your move | The one move |
| Where to next | *(none)* |

"What's driving it" and "Where you stand" are both fine and arguably
edition-appropriate. "Your move" vs "The one move" is just inconsistency.

---

## 3. Voice: one uncontracted line

The site is contracted throughout — `FaqPage.jsx` records that an entire page
was contracted at your call on 23 July because the uncontracted register "read
as a different writer."

| Where | Current | Proposed |
|---|---|---|
| `readinessVerdict`, Fan Value (`:97`) | "**You are** not set up to capture it, so most of it stays on the table." | "**You're** not set up to capture it, so most of it stays on the table." |

That's the only one in either tool. The rest is clean.

---

## 4. The reveal animation

```
"Starting the fan engine…"  →  "Vroom, vroom…"  →  "Ready for blast off!"
```

**Flagging rather than proposing, because this may be deliberate.**

Three things sit oddly. It mixes metaphors — an engine starting, then a rocket
launching. "Vroom, vroom" is a register that appears nowhere else on the site,
which is otherwise dry and grown-up. And it plays after ten considered questions
about someone's business, immediately before a verdict on it.

The counter-argument is real: a reveal should feel like something, three seconds
of lightness before a serious result is a legitimate choice, and playfulness is
disarming. But it is the one place the tool sounds like a different writer, and
it's the moment right before the thing you want taken seriously.

If you want it changed, I'd keep the pacing and drop the register: "Reading what
you told me" is already the subtitle underneath and does the job. If you want it
kept, it should stay — but let's have decided rather than defaulted.

---

## 5. Checked and genuinely fine

Recording these so they don't get re-litigated:

- **"We" and "our" throughout the quiz answers** ("We actively manage a
  community") — correct. That's the visitor describing their own company, not
  your voice. Only the site's own voice needed to become "me", which is done.
- **The four opportunity lines all end "…so there's room to…"** — formulaic on
  the page, invisible in practice, because a visitor only ever sees one.
- **"Your card downloads when you send this"** — correctly conditional. It only
  renders when a download actually exists, so it never appears on Fan Value,
  which has no card. Verified in the code.
- **The pre-launch edition withholding the Fan Value cross-sell** — deliberate
  and right. No revenue to model, and it keeps the tool a diagnosis rather than
  a funnel.
- **"Directional read · self-assessed"** and **"Unverified · self-assessed"** —
  honest, and they protect the numbers from being over-read.
- **The share card naming your strongest discipline, not your weakest** — the
  reasoning is in a code comment and it's sound: the card gets posted to a
  network including employers and investors.

---

## Suggested order

1. **Decide the trademark question (§1).** It's the only one with a real
   trade-off, it touches the most strings, and everything else is small.
2. Apply §2 and §3 — unambiguous, six strings total.
3. Decide on the reveal (§4).

Say which and I'll make the changes, verify them in the browser across both
editions, and add the case-insensitive drift check to `CLAUDE.md`.
