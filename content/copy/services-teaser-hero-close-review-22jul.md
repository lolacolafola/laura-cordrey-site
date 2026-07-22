# /services: the Fan Engine™ teaser, the hero, the close, and the dark intro

**Written:** 22 Jul 2026
**Status:** review and recommendations. Nothing applied yet.
**Page state:** rows all closed on load, four grounds, 4,005px closed.

---

## 1 · The Fan Engine™ teaser line

**Current:** "The whole engine, powered by your fans."
**Laura's proposal:** "My IP offer, growth powered by fans"

### The real problem with the current line

It repeats the kicker. The row reads:

> **THE WHOLE SYSTEM**
> The Fan Engine™.
> *The whole engine, powered by your fans.*

"The whole system" and "the whole engine" are the same idea, forty pixels apart,
in the only two pieces of copy on a closed row. One of them has to do a
different job. So yes, this needs changing — but not for the reason it looks
like.

### Why "My IP offer" is not the fix

- **It is inside-out.** It describes the thing from Laura's side of the table.
  Nobody buys an "offer", and nobody buys "IP". They buy growth.
- **"IP" is ambiguous** in a sentence about a technical product. Intellectual
  property, or an IP address? A reader should never have to decide.
- **"Offer" is sales-desk language** on a page that otherwise speaks plainly.

### But the instinct behind it is right

Nothing on the closed row says this one is **hers**. That is the single most
important thing about the flagship and the closed row does not say it. The
proprietary claim currently waits until the panel is open ("My own framework,
shaped over thirteen years at Ubisoft, Amazon Games and BlaBlaCar"), which is
one click too late.

### Recommended

> **The one method I built. Your fans do the selling.**

- **"The one method I built"** is the proprietary claim, in buyer-facing
  language, without the word IP.
- **"Your fans do the selling"** is already the homepage's signature line for
  the Fan Engine™. Repeating it across pages is how a line becomes a brand
  asset rather than a one-off.
- It no longer repeats the kicker.
- 48 characters, in line with the other five teasers.

### Alternatives

| | Copy | Tone | Best for |
|---|---|---|---|
| **A** *(recommended)* | The one method I built. Your fans do the selling. | Proprietary, then payoff | Says whose it is and what it does, echoes the homepage |
| **B** | My own framework, built over thirteen years. | Credibility-led | Strongest for a cold reader, but duplicates the panel's opening line word for word |
| **C** | Growth from the customers you already have. | Pure benefit | Clearest to a stranger, but says nothing about it being hers, which is the whole point of the flagship |
| **D** | Fan-led growth, built into the business. | Category-led | Accurate and flat; the weakest of the four |

**Do not use "IP".** If the proprietary signal needs to be louder than A, the
place for it is the kicker: "The whole system" → "My framework".

---

## 2 · The hero — keep it

> **WORK WITH ME**
> The whole engine, or just the piece you need.
> Make the userbase you already paid for worth more. Protect it, grow from it,
> deepen it, or build the whole system that does all three.
> *[Let's talk]*

**It is doing its job.** It promises a menu with a flagship and pieces, and the
page immediately delivers exactly that: one gold row and four others. Hero and
page agree, which is the main thing a hero has to get right. One CTA, per the
rule settled earlier. Leave it.

**One thing to be aware of, not necessarily to fix.** The H1 uses "engine"
generically one screen above a row named "The Fan Engine™". Under the naming
rule just written into CLAUDE.md, that is worth a conscious decision rather
than an accident:

- **Keep as-is** *(recommended)* — it is lowercase and generic, and the
  "whole engine / just the piece" antithesis is what makes the line work.
  Capitalising or trademarking it would break the sentence.
- **Reword** — "The whole system, or just the piece you need." Loses a little
  music, removes the ambiguity entirely.

---

## 3 · The close — cut one CTA

**Current:** "What's your fanbase worth?" then **three buttons** (Let's talk /
Take the 2-min Fan Score / Size your Fan Value) plus an email link.

**That is four exits at the exact moment the page should be asking for one
thing.** The whole page has been built around a single job: get a contact.

The defence for the Fan Score is real — it is a lead magnet, so it converts
rather than leaks. **Size your Fan Value is the one to cut.** It is a
calculator, it is the least committing action on the page, and it is already
reachable from the Fan Score.

### Recommended

> **What's your fanbase worth?**
> Take the 2-minute Fan Score, or tell me what's going on.
> *[Let's talk]* *[Take the 2-min Fan Score]*
> Prefer to send a note? hello@lauracordrey.com

Two buttons, one email line. The supporting line already names exactly those
two actions, so it stops mismatching the buttons underneath it.

**Optional, sharper:** the headline "What's your fanbase worth?" sets up the
calculator, not the conversation. If the close should ask for the meeting, it
would be "So, where would you start?" — which closes the loop with the
question the offers section opens on. That is a bigger change and the current
headline is good, so it is a preference, not a fault.

---

## 4 · Design: do NOT remove the dark intro

**It is not a `/services` decision.** The hero has no background of its own —
measured `rgba(0,0,0,0)`. It sits on the site-wide body ground `#15110F`,
exactly as the heroes on `/about`, `/fan-engine`, `/fan-led-growth`,
`/speaking` and `/ai` do. Removing it would make `/services` the only page on
the site that opens light, and it would be a site-wide change wearing a
one-page disguise.

It also earns its place now: the dark hero is what the gold Fan Engine™ row
lands against. Take the dark away and the flagship's gold has nothing to be
brighter than.

### The ground sequence, measured

| | Section | Ground |
|---|---|---|
| 1 | Hero | `#15110F` dark *(inherits body)* |
| 2 | Offers band | `#EFE9DC` cream |
| | → Fan Engine™ | `#D4C896` gold |
| | → SOS / Programs / Moments | `#15110F` dark ×3 |
| | → Advisory | `#FBF3E4` near-white |
| 3 | For AI companies | `#2D2723` brown |
| 4 | How I work | `#EFE9DC` cream |
| 5 | Close | `#A12A1E` oxblood |

Read as a block, the offers are **gold → black → white**, which is a clean,
deliberate structure and the homepage's own card palette.

### The one thing I would change

**Advisory barely separates from the band it sits on.** `#FBF3E4` against
`#EFE9DC` is a four-point difference — the same failure that made the earlier
mock's light rows invisible, in a milder form. It is the weakest-reading row on
the page.

Fix: give the light rows a hairline border so they read as a card on the band,
the way the espresso rows already do with
`border-color: rgba(212,200,150,.18)`. One line of CSS,
`rgba(21,17,15,.12)` on `.svc-row--bone`.

**Everything else about the colour is working.** Do not add more.
