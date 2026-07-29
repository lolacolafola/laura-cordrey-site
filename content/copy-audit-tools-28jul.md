# Copy audit: the Fan Score™ and Fan Value™

28 July 2026. A full read of every string in both tools, requested after two
lines turned out not to say what they meant.

**RESOLVED 28 Jul 2026 — see the note at the end. Everything in §1–§4 is now
applied, but §1 landed on a better answer than any of the three options below.**

Originally written as proposals for approval; kept as written so the reasoning
is on the record.

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


---

# Resolution, 28 July 2026

## §1 — the answer was none of A, B or C

The three options all assumed a choice between *protecting the mark* and
*keeping the metaphor*. Laura's answer removed the trade-off: **say "growth
engine" wherever the generic metaphor is meant.**

That works because it does three things at once. It is unmistakably not the
trademark, so there is no dilution. It is *clearer* than the bare noun ever was
— "a growth engine" tells you what kind of engine, where "the engine" left the
reader to infer it. And it lets almost every original sentence survive intact.

The rule now in force, by who the sentence is about:

| The sentence is about… | Says | Example |
|---|---|---|
| Laura's system | **the Fan Engine™** | "I build the Fan Engine™ around it" (/faq) |
| The visitor's own growth | **their growth engine** | "You own the growth engine. Widen the lead." |

Three tier headlines that had been reworded off the metaphor entirely were
restored to Laura's originals with only "growth" added — the metaphor was never
the problem, the bare noun was.

The pre-launch lede likewise went back to its original phrasing:

> …5 quick questions on whether you're ready to build a growth engine fans will
> power, and to fuel it.

Measured at 3 rendered lines, as required.

**One inconsistency this exposed.** The four pre-launch result strings had been
given the mark on the reasoning that the edition is a Fan Engine™ readiness
check. Once the lede said "a growth engine", the visitor was reading two names
for one thing on consecutive screens. They now all say "growth engine". The
Fan Engine™ is what Laura builds; the growth engine is what the visitor ends up
with.

## §2, §3, §4 — all applied

- "The one move" → "Your move" in the pre-launch result, and out of the
  `/fan-score` meta description (129 chars).
- The uncontracted Fan Value line contracted.
- The reveal patter removed, pacing kept.

## Beyond the tools

The case-insensitive check found nine more usages across `/faq`, `/services`,
`/fan-led-growth`, `/fan-engine`, `/ai` and `/fan-value` — all now resolved
under the same rule. The one that mattered most was on `/fan-led-growth`, where
the link text read **"an engine you own"** and pointed at `/fan-engine`: the
site telling a reader they owned the methodology. Now "the Fan Engine™".

Verified: no bare "engine" remains in any page copy. The only matches left in
the repo are code comments quoting the old strings.

---

# Addendum, 28 July 2026 — two things found reviewing the quiz itself

Not copy. Both are about how the two tools agree with each other, found while
answering "are you comfortable with the quiz?".

## 1. The Fan Score and Fan Value contradict each other on three scores

The live result's CTA links to `/fan-value?score={owned}`, so a visitor carries
their percentage straight across. But the two tools band that number
differently. Fan Score tiers come from the raw total (`core`): Untapped ≤14,
Earned 15–20, Compounding 21+. Fan Value's `readinessVerdict` bands the
percentage: "Mostly" ≥70, "In part" ≥40, "Not yet" below.

Those boundaries do not line up. Three of the nineteen possible scores produce
a contradiction in the same session:

| core | owned % | Fan Score says | Fan Value then says |
|---|---|---|---|
| 15 | 33 | **Earned** — "Growth you're earning." | **"Not yet.** You're not set up to capture it, so most of it stays on the table." |
| 16 | 39 | **Earned** | **"Not yet."** |
| 21 | 67 | **Compounding** — "Growth that compounds." | **"In part."** |

The first two are the damaging ones. Someone is told they are earning
fan-led growth, clicks the button you put in front of them, and is immediately
told they are not set up to capture it.

**FIXED same day.** On reading it properly this was not a calibration choice
at all: the function's own comment already said *"Verdict copy keyed to Fan
Score buckets (audit tiers: Untapped / Earned / Compounding)"*. Alignment was
always the intent — the boundaries were simply restated as 70/40 instead of the
Fan Score's actual 67/33. So this was a bug against its own stated design, not
the hand-calibrated Fan Value math, which is untouched.

The two now share one definition, in `src/lib/fanTiers.js`, with the boundaries
derived from `scoreLive`'s thresholds rather than chosen:

```
lowest Earned      = core 15 → round(((15 - 9) / 18) * 100) = 33
lowest Compounding = core 21 → round(((21 - 9) / 18) * 100) = 67
```

Verified across all 19 reachable scores: **0 disagreements.** Also checked the
page still renders for a cold arrival with no score at all, and with no console
errors.

## 2. Growth carries more weight than the other three disciplines

Nine scored questions, unevenly split: Brand 2 (Q1–2), Product 2 (Q3–4),
Community 2 (Q5–6), **Growth 3 (Q7–9)**. So Growth is a third of the headline
percentage and the others are 22% each.

The per-discipline bars are unaffected — they use averages, so each reads fairly.
It is only the overall number that leans on Growth.

**Reviewed and kept, 28 Jul 2026.** Tested against the alternative — mean of
the four discipline means, so each pillar counts equally:

| profile | now | equal | tier now | tier equal |
|---|---|---|---|---|
| strong everywhere, weak growth | 67 | 75 | Compounding | Compounding |
| **weak everywhere, strong growth** | **33** | **25** | **Earned** | **Untapped** |
| strong growth, weak brand only | 78 | 75 | Compounding | Compounding |
| middling across the board | 50 | 50 | Earned | Earned |
| weak growth, middling rest | 33 | 38 | Earned | Earned |
| strong brand only | 22 | 25 | Untapped | Untapped |

Maximum movement is 8 points, and one profile in six changes tier. That profile
has just reported that growth holds without paid, customers promote them
unprompted, and a referral programme exists — so the **current** weighting gives
the truer answer and the "balanced" one gives a worse one. Growth is not a
fourth ingredient; it is where fan-led-ness shows up.

Also: no copy claims equal weighting. "Each discipline on the same scale"
describes the four bars, which use averages and genuinely are. And changing it
re-bases every score, so cards already shared stop reproducing.

Recorded as a decision in a comment above `scoreLive` so it does not get
"balanced" later.

---

# Fan Value calculator, 28 July 2026

## Fixed: money fields accept "4M"

`digits()` stripped every non-digit, so "4M" became **4**. You had to type all
seven zeros. The fields now parse `4M`, `4m`, `4.5M`, `800k`, `2B`,
`12,000,000` and plain digits, on Annual revenue, Annual acquisition spend and
Annual earned views.

The subtlety was decimals. These inputs reformat on every keystroke, so a purely
value-driven field eats the "." before you reach the "M" and "4.5M" is
untypeable. `AmountInput` holds a draft string while focused and hands back to
the formatted number on blur. Verified typing character by character:
`4` → `4.` → `4.5` → `4.5M`, then blur → `4,500,000`.

Left alone: value-per-customer, CAC and CPM. Those hold strings rather than
numbers and are small figures where shorthand is unlikely.

## NOT fixed, needs a decision: the advocacy field does nothing

**"Optional. The share you already get from advocacy today. Leave blank if
none."** Measured on the live headline, changing only that field:

| Entered | Headline |
|---|---|
| (blank) | $562K |
| 10% | $562K |
| 25% | $562K |
| 50% | $562K |
| 80% | $562K |
| 90% | $530K |
| 95% | $490K |

**Nothing below 86% has any effect at all.**

The arithmetic explains it. `bringLift = Math.min(fanN, 100 - bring0N)` — the
field only ever acts as a ceiling, and with the "Fans bring more" slider at its
default 14 it cannot bite until `100 - bring0N < 14`, i.e. above 86%.

That may be intentional: the slider is a *lift*, and the value of a 14-point
lift is arguably the same wherever you start from. But the field is presented as
an input that shapes the answer, and for every realistic value it does not.
Someone who fills it in and sees nothing move concludes the tool is broken —
which is exactly what happened.

Three options, and this is a **Fan Value math** decision so it is Laura's:

- **A — Make it count.** If a quarter of acquisition already comes via advocacy,
  the remaining paid portion is what a further lift saves against:
  `saved = acqN × (1 - bring0/100) × (bringLift/100)`. The field becomes
  meaningful and estimates get more conservative for anyone with existing
  advocacy.
- **B — Relabel it.** Keep the arithmetic and stop implying it drives the
  number: describe it as a sanity check, e.g. "so the lift below can't take you
  past 100%".
- **C — Remove it.** One less field on a form where every field costs
  completion, and it currently earns nothing for 99% of users.

I would do **A**: the field already asks for the right number, and it makes the
estimate more defensible rather than less, which suits a tool whose credibility
is the point.
