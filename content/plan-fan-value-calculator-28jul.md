# Plan: make the Fan Value™ calculator behave

28 July 2026. Written after Laura reported that the advocacy field and the
sliders "didn't seem to change anything". Every claim below is measured against
the live headline number, not read off the code.

**Nothing in this plan is applied yet**, except the "4M" fix already shipped.

---

## The finding: one root cause, three symptoms

The calculator silently ignores inputs when an internal cap is hit. There is no
message, no visual change, and the number simply stops responding. To a visitor
this is indistinguishable from a broken tool — which is exactly the conclusion
Laura reached, and she built it.

### Symptom 1 — the advocacy field does nothing below 86%

*"Optional. The share you already get from advocacy today."* Changing only that
field:

| Entered | (blank) | 10% | 25% | 50% | 80% | 90% | 95% |
|---|---|---|---|---|---|---|---|
| Headline | $562K | $562K | $562K | $562K | $562K | $530K | $490K |

`bringLift = Math.min(fanN, 100 - bring0N)` — it only ever acts as a ceiling, so
with the "Fans bring more" slider at its default 14 it cannot bite until above
86%. **No realistic answer changes anything.**

### Symptom 2 — the "Fans stay" slider dies above the retention ceiling

`appliedLift = Math.min(liftPts, Math.max(0, ceiling - r0N))`, where the ceiling
is 65 for transactional and 95 for subscription. Dragging that slider end to end:

| Business type | Retention entered | Slider min → max | Working? |
|---|---|---|---|
| Transactional | 30% | $247K → $922K | yes |
| Transactional | 64% | $400K → $445K | barely |
| **Transactional** | **70%** | **$427K → $427K** | **dead** |
| **Transactional** | **90%** | **$517K → $517K** | **dead** |
| Subscription | 80% | $472K → $1.1M | yes |
| **Subscription** | **96%** | **$544K → $544K** | **dead** |

A transactional business with a 70% repeat rate — a good business, and a
plausible prospect — finds the first slider inert with no explanation.

### Symptom 3 — nonsense inputs are accepted and produce confident numbers

The retention field carries `min="0" max="95"`, but those are browser hints
only: `onChange` writes `+e.target.value` with no clamping, so anything typed
goes straight into the model.

| Entered | Headline |
|---|---|
| 150% | $787K |
| −20% | $697K |
| 100% | $562K |

Note 150% produces a *higher* number than 100%. For a tool whose entire value is
being credible in front of a prospect, this is the worst of the three.

### Symptom 4 (separate) — you cannot see the number while you drag

All three sliders do work. They sit **below** the headline, so on most screens
the figure they change is off-screen while you are using them. This is why they
read as broken. Not a bug, a layout problem, and it is what made the two real
bugs above invisible for so long.

---

## The plan

### 1. Stop the silent caps — the fix that matters *(needs one decision)*

The principle: **if the model ignores an input, say so.** A capped value should
explain itself where the control is, in one line.

- **Retention above the ceiling:** show the reason next to the "Fans stay"
  slider — e.g. *"At 70% repeat purchase you're already near the practical
  ceiling, so there's little retention lift left to model."* The slider then
  reads as *answered*, not broken.
- **The advocacy field:** three ways, and this one is **Fan Value math, so it is
  Laura's call**:
  - **A — make it count** *(chosen 28 Jul)*. **⚠️ The formula I first proposed
    here was wrong.** See "Deriving the advocacy formula" below before
    implementing.
  - **B — relabel it** as a sanity check and stop implying it drives the number.
  - **C — remove it.** One less field on a form where every field costs
    completion.

### 2. Clamp the inputs *(no decision needed)*

Hold retention to 0–95, the percentages to sane ranges, and revenue and spend to
non-negative. Clamp on blur rather than on keystroke, so typing "7" on the way to
"70" isn't fought. No maths changes — this only stops impossible values reaching
a model that was never designed for them.

### 3. Keep the number in view while the sliders move *(no decision needed)*

The headline is the payoff and should stay where it is. Options, cheapest first:

- Echo the changed figure beside each slider ("Stay $450K"), so the effect is
  visible without scrolling. Small, self-contained.
- Make the headline sticky while the assumptions panel is on screen. More
  noticeable, slightly more layout risk on mobile.

I would do the first, and only add the second if it still feels disconnected.

### 4. Regression-test it *(no decision needed)*

The reason these survived is that nobody could see them. A short script in the
style of `scripts/csp-smoke.mjs` can drive the real page and assert that **every
control changes the headline**, across a handful of starting states — including
the high-retention case that is currently dead. It would have caught all three
symptoms, and it fails loudly.

---

## Order, and what I need from you

| | Work | Needs a decision? |
|---|---|---|
| 1 | Clamp inputs (§2) | No — I can do it now |
| 2 | Show the number by the sliders (§3) | No |
| 3 | Explain the retention ceiling (§1) | No |
| 4 | The advocacy field (§1) | **Yes — A, B or C** |
| 5 | Regression test (§4) | No |

Items 1–3 and 5 are behaviour-preserving or copy-level and I can start
immediately. **Item 4 is the only one that changes the Fan Value model**, which
is on the do-not-touch list, so it waits for you.

## Explicitly not touching

- The benchmark defaults (6pts retention, 10% AOV, 14% bring) — calibrated.
- The LTV/CAC arithmetic and the 24-month projection.
- The Fan Score tier boundaries, aligned separately today.


---

# Deriving the advocacy formula (28 July 2026)

Laura chose option A, then asked whether I was confident in the maths. I was
not, so I derived it from first principles rather than reasoning by analogy —
and the formula I had recommended was wrong in both size and **direction**.

## The model

`N` new customers a year. `bring0`% arrive free through advocacy. The rest are
bought, and `acq` is the entire budget that buys them. So:

```
cost per bought customer = acq / (N × (100 − bring0)/100)
```

If fans then bring `lift` more percentage points of your customers, that many
points shift from bought to free. The money no longer spent is:

```
saved = acq × lift / (100 − bring0)
```

## Checked against ground truth

Simulated per-customer, then compared with each candidate formula:

| bring0 | lift | truth | current code | what I recommended | derived |
|---|---|---|---|---|---|
| 0% | 14pt | $112,000 | $112,000 ✓ | $112,000 ✓ | $112,000 ✓ |
| 25% | 14pt | $149,333 | $112,000 ✗ | $84,000 ✗ | $149,333 ✓ |
| 50% | 14pt | $224,000 | $112,000 ✗ | $56,000 ✗ | $224,000 ✓ |
| 75% | 14pt | $448,000 | $112,000 ✗ | $28,000 ✗ | $448,000 ✓ |
| 80% | 20pt | $800,000 | $160,000 ✗ | $32,000 ✗ | $800,000 ✓ |

Three things fall out of this:

1. **The current formula is right in exactly one case — `bring0 = 0`**, which is
   the default (the field is blank). So the tool is correct for most visitors
   and understates for everyone who fills the field in. That is a much better
   starting position than it first appeared.
2. **My recommendation was wrong the other way.** I reasoned that existing
   advocacy should shrink the remaining opportunity. In fact your acquisition
   budget is buying a *smaller slice* of customers, so each extra point of
   advocacy displaces more expensive volume. The saving goes **up**, not down.
3. **The derived formula self-limits.** `bringLift` is already capped at
   `100 − bring0`, so `saved` can never exceed `acq`. At 80% existing advocacy
   with the full 20-point lift available, the saving is the whole budget —
   correct, because fans would then be bringing everyone.

## ⚠️ This changes what was agreed

Option A was approved on my description that it would make estimates **more
conservative**. The correct maths makes them **larger** for anyone who fills the
field in — at 50% existing advocacy, double. For a tool whose credibility is the
point, a bigger number is not automatically a better one, so this needs
confirming rather than assuming.

Implementation, if confirmed, is one line plus a guard:

```js
const saved = bring0N >= 100 ? acqN : acqN * (bringLift / (100 - bring0N))
```
