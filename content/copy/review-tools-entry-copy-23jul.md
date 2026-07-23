# Review: entry copy for the two tools (Fan Score™ and Fan Value Model™)

**Date:** 23 July 2026
**Scope:** The copy a cold visitor reads *before* they act. The Fan Score intro
screen (`src/pages/FanAuditPage.jsx:209-232`) and the Fan Value Model header
(`src/pages/FanValueModelPage.jsx:220-253`), plus both meta descriptions.
**Status:** Diagnosis only. Nothing changed. Sketches at the end are illustrative,
not proposals.
**Supersedes:** nothing. This is the first review of the tool entry copy.
Related: `review-fan-led-growth-copy-v1.md`, `keyword-demand-check-fan-led-growth.md`.

---

## The short version

The homepage was corrected to lead with the customer problem and let "fan-led
growth" be the answer rather than the entry. The two tools never got that pass.
They still open the way the homepage used to: trademark first, category second,
and the human stake either late or absent.

Fan Value recovers by its third line. Fan Score never does above the fold.

---

## 1. What each page actually says, in reading order

### Fan Score, intro screen

| Slot | Copy | What it is |
|---|---|---|
| Eyebrow | The Fan Score™ | the IP |
| H1 | How fan-led is your growth? | the category |
| Lede | Paid growth stops the moment you stop paying. Fan-led growth keeps going. | the category again |
| Get-line | A few honest questions. Two minutes to your result and the one move to grow it. | the mechanics |
| CTA | Get my Fan Score™ | the IP |
| Cross-link | Fan Value: what your fans are worth? | the other tool |

Before the CTA, the word **customer** appears zero times. The word **fan**
appears only inside the product name. Nothing on the screen says the growth is
sitting in people the visitor has already paid for.

The stake does arrive, but below the fold, in the bio: "thirteen years turning
audiences into fans". It is doing duty as a credential there, not as the promise.

### Fan Value Model, header

| Slot | Copy | What it is |
|---|---|---|
| Cold bar | Fan Score: how fan-led is your growth? | the category, borrowed from the other tool |
| Eyebrow | The Fan Value Model™ | the IP |
| H1 | What is the fan gap worth to you? | undefined jargon |
| Hook | The growth is already in your userbase. Here's what it's worth. | **the stake, finally** |
| Lede | ...what your fans are worth: what you gain when they stay, spend more, and bring you new customers. | the stake, in the homepage's own words |

Note the lede lands almost exactly on the homepage hero ("they stay, spend more,
and bring new customers with them"). That consistency is a real asset. It is
simply arriving in slot five instead of slot two.

---

## 2. Findings, in order of how much they cost

### 2.1 The Fan Score H1 asks a question the visitor cannot answer

"How fan-led is your growth?" fails twice over.

First, positionally: it asks the visitor to rate themselves on a category they
have not been introduced to, in the first line of type on the page.

Second, and this is the part that is a usability problem rather than a
positioning one: **it is not a question the visitor can hold an opinion about.**
A diagnostic headline works when the reader either already has a hunch
("Are you overpaying for customers?") or actively wants the number
("What are your customers actually worth?"). This one asks them to self-assess
on an unfamiliar scale, which is precisely the job they are about to hand to the
quiz. The headline and the tool are asking the same question, so the headline
adds nothing they can act on.

### 2.2 "The fan gap" is used once on the entire site, and never defined

`grep -rn "fan gap" src/` returns exactly one line: the Fan Value H1
(`FanValueModelPage.jsx:245`). It is the single largest piece of type on the
page, and it is the only place the term exists. A first-time visitor meets a
noun phrase in 60px type that the site never explains and never uses again.

This one is worth fixing whatever happens with the wider positioning question,
because it is not a matter of taste. Either "the fan gap" is a real term in the
system, in which case it needs a definition somewhere and more than one use, or
it is not, in which case the H1 is naming something that does not exist.

### 2.3 The two tools describe the Fan Value Model three different ways

Same product, three objects of value:

| Where | How it is described | The thing being valued |
|---|---|---|
| Fan Score cross-link | "Fan Value: what your fans are worth?" | your fans |
| Fan Value H1 | "What is the fan gap worth to you?" | a gap |
| Fan Value meta description | "what fan-led growth is worth to your brand each year" | a category |

A visitor who clicks the cross-link expecting to learn what their fans are worth
lands on a page headlined about a gap. "What your fans are worth" is the
strongest of the three, it is the most concrete, and it is the one that already
matches the homepage. It should probably win everywhere.

Small mechanical note on the same link: "Fan Value: what your fans are worth?"
takes a question mark on a phrase that is not a question. Either make it one
("What are your fans worth?") or drop the mark.

### 2.4 The audience language says software, the positioning says consumer brands

The homepage eyebrow is "Fan-led growth for consumer brands". The tools then say:

- "Is your product live, with real users yet?" (`FanAuditPage.jsx:238`)
- "The growth is already in your **userbase**." (`FanValueModelPage.jsx:247`)
- "your users" (`FanAuditPage.jsx:37`)

A games studio or a SaaS company reads "userbase" without blinking. A drinks
brand, a fashion label or a retailer does not have one, and the word quietly
signals that the tool was not built for them. This is a wider question than the
entry copy and it may well be deliberate, given the AI segment work. Flagging it
rather than assuming: **worth confirming who the tools are actually for before
rewriting anything at the top of them.**

### 2.5 Both meta descriptions lead with the category

- Fan Score: "A short diagnostic that tells you how fan-led your growth is today, and the one move that would grow it. Two minutes."
- Fan Value: "A quick estimate of what fan-led growth is worth to your brand each year, built from published benchmarks. Conservative, and it shows its work."

These are the lines that appear in search results, in front of people who have
never heard the term. Per `keyword-demand-check-fan-led-growth.md`, that phrase
has no search demand to capture. Neither description mentions customers,
retention or advocacy, which are the things a person in this situation would
actually be searching for. Both are within length (Fan Score 118 chars, Fan
Value 141), so there is room to lead differently without going long.

### 2.6 Trademark drift on the Fan Value page

`FanValueModelPage.jsx` uses "Fan Score" as a bare string in four places,
including the cold bar a first-time visitor reads first (line 231) and the
results label (line 634). `FanAuditPage.jsx` sets the mark correctly on the
equivalent slots. Per CLAUDE.md the canonical-name rule covers Fan Score, so at
minimum the two visitor-facing instances (231, 634) want the mark. Lines 92 and
227 are a code comment and a returning-visitor chip, lower stakes, but worth a
consistent decision.

---

## 3. What is working, and should survive any rewrite

- **The Fan Value lede.** "what you gain when they stay, spend more, and bring
  you new customers" is the homepage promise, in the homepage's words, in the
  right voice. Do not touch it. Move it up if anything.
- **The Fan Value hook.** "The growth is already in your userbase" is the single
  best line across both entry screens. Subject to 2.4 on the noun.
- **"A few honest questions."** Sets expectation and tone in four words, and the
  honesty framing is consistent with the disclaimer at `FanAuditPage.jsx:894`.
  It earns trust before asking for two minutes.
- **"Get my Fan Score™"** as a CTA. Verb first, first person, names the outcome
  rather than the mechanism. Correct.
- **The gate screen.** Splitting live from pre-launch before any question gets
  asked is good product thinking and reads as care, not friction.

---

## 4. The shape of the fix, if you take it

The change is an ordering change more than a rewriting one. Both pages have the
right material; the Fan Score is missing one line of it and both are leading
with slot four.

The sequence that matches the corrected homepage is:

1. **The stake** (the customers you already have are worth more than you get)
2. **The question or the number** (what the tool will tell you)
3. **The name** (this is the Fan Score™, part of the Fan Engine™)
4. **The cost** (two minutes, a few honest questions)

Today both pages run 3, 2, 4 and reach 1 late or not at all.

### Sketches, not proposals

Illustrative only, to show the shape. Real options belong in a follow-up file
once 2.4 is settled, since the audience question changes the nouns.

**Fan Score H1, direction A (the money):** open on what the customers already
bought and are worth, and let "how fan-led" be what the score is called, not
what the page asks.

**Fan Score H1, direction B (the instinct):** ask something the visitor can
answer on the spot and wants the real answer to, of the form "would your
customers recommend you, and what is it worth if they did", then reveal the Fan
Score as the name for what they just measured.

**Fan Value H1:** almost certainly "What are your fans worth?", which retires
"the fan gap", matches the cross-link, matches the meta, and matches the
homepage. One decision fixes 2.2 and 2.3 together.

---

## 5. Open questions for Laura

1. **Who are the tools for?** Consumer brands, or product companies with a
   userbase? The entry copy cannot be settled before this. (2.4)
2. **Is "the fan gap" a real term in the Fan Engine™?** If yes it needs
   defining and using; if no the H1 should go. (2.2)
3. **Should the tools carry the homepage promise verbatim,** or say the same
   thing in their own words? Verbatim is stronger for recall, and both pages
   already half do it.

## 6. Claims flagged for confirmation

Nothing in this review asserts a new factual claim about results or clients.
The one existing claim in the reviewed copy that is worth a periodic check is
the bio at `FanAuditPage.jsx:226` ("thirteen years", the named employers, the
Animoca acquisition), which is unchanged from the live site and is not something
this review proposes altering.
