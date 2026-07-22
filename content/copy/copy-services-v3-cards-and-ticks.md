# /services v3: colour-block cards, ticks, and the detail moved off the page

> **NOT SHIPPED, 22 Jul 2026.** This cut the offer copy to tick lists and
> lost the diagnosis ("Need it when"), which was the wrong trade. The OG
> copy was restored in full. Kept for the benchmark analysis and the PDF
> argument, both of which still stand. What shipped is in
> `services-final-rows-22jul.md`.


**Written:** 22 Jul 2026
**Supersedes** the copy currently live on `/services` and the direction in
`services-weight-options.md`, which costed eight ways to *hide* the words.
This is the ninth, which none of them considered: **cut them.**
**Status:** copy only. Nothing built. The flatten pass from earlier today is
still in the working tree and can stay or go independently.

---

## The call, and why it is the right one

Every option in the decision doc tried to preserve all 954 words and change
how they were revealed. The benchmark says the words *are* the problem:

| | Words |
|---|---|
| Energize Consulting | **249** |
| Anastasia Shtompel | **418** |
| **/services today** | **954** |
| **/services, this draft** | **~450** |

Cutting beats hiding on three counts. Hidden copy still has to load, still has
to be maintained, and still has to be got past. Cut copy is gone. It is also
better for SEO than any disclosure pattern, because there is no hidden content
question at all. And the page's job is a contact, not an education: a buyer
who needs 214 words on the Fan Engine before they will talk is a buyer who
should be reading the PDF, on a call, after they have got in touch.

**The structure per card is: what it is, what you get, when, and a way in.**

---

## Recommended copy

Card pattern: colour block or image on top, text panel below, the whole card
linking to `/contact` with that offer pre-selected.

### 01 · The Fan Engine™  *(gold block)*
**Kicker:** The whole system

> Fan-led growth built into the bones of your business, run as one system and
> measured end to end.

- Your Fan Value, scored on your own data
- A six-month plan, and the engine built to it
- A re-score every quarter

**6 to 8 weeks to build, then ongoing**
**Link:** Talk about the Engine →

### 02 · Sentiment SOS  *(espresso block)*
**Kicker:** Protect

> Emergency work for a community that has turned on you in public.

- The real cause, found in days
- A fix shipped across product and community
- Sentiment tracked so you watch it climb back

**1 to 2 weeks. We can start this week.**
**Link:** It's urgent, let's talk →

### 03 · Fan Programs  *(cream block)*
**Kicker:** Grow

> One program that gets your users bringing you the next ones.

- Creator, advocacy, loyalty or referral, whichever fits
- Built, launched and measured

**From 3 weeks**
**Link:** Talk about a program →

### 04 · Fan Moments  *(espresso block)*
**Kicker:** Deepen

> Something your best customers actually get to feel.

- A VIP event, a drop, unique merch or a brand collab
- Measured, so you see what it drove

**From 2 weeks**
**Link:** Talk about your moment →

### 05 · Advisory  *(cream block)*
**Kicker:** In the room

> Senior fan-led growth judgment, without a full-time hire.

- One call on your hardest question
- The plan in writing that week

**Per session, or an embedded role**
**Link:** Book a session →

**Offer copy total: 181 words**, down from 954.

---

## Where the proof goes

The proof numbers are the strongest thing on the page and the ticks have no
room for them. **One strip under the grid**, five numbers on one line, instead
of five proof cards buried in five sections:

> **60M+** fan views, Ubisoft · **85%** positive sentiment across 15M players,
> Ghost Recon · **50M+** views, Rainbow Six Siege · **$32K** in three hours,
> US Mobile · **13 years**, Ubisoft to a platform acquired by Animoca

One band, roughly 120px, replacing five cards worth roughly 900px. Every
figure is already on the live page. Nothing new is claimed.

## Under the grid

> Want the detail on any of these? **Get the services PDF →**
> Or just tell me what's going on. **Let's talk →**

---

## Alternatives on the one line per card

The recommended set answers "what is it". The strongest alternative answers
"is this me", which is a different and often better hook.

| | Approach | Example (Sentiment SOS) | Best for |
|---|---|---|---|
| **A** *(recommended)* | What it is | "Emergency work for a community that has turned on you in public." | A reader comparing five offers. Parallel and scannable. |
| **B** | The trigger | "Your community has turned on you in public, and it's getting worse." | A reader who already has the problem. Converts harder, reads less evenly across five cards. |
| **C** | The payoff | "Keep the customers a blow-up would cost you." | Skim-reading. Weakest of the three here: five payoff lines start to sound like five promises. |

**I recommend A**, with one exception: **use B for Sentiment SOS.** It is the
only offer bought in a panic, and a panicking reader is scanning for their own
situation, not for a category. Mixing one card is worth it.

Both A and B are in the tick lists' voice. C is the copy just cut.

---

## What this depends on, and what it costs

**The PDF does not exist yet.** Do not ship the "Get the services PDF" link
until it does, or it is a promise the page cannot keep. Everything cut here
is the natural contents of it: the Need-it-when lines, the full What-you-get
paragraphs, the four Fan Engine phases, and the five proof cards in full. That
is roughly 700 words, which is a tidy two-page leave-behind, and it is already
written. **Flag: this is a real dependency, not a nice-to-have.**

**The SEO cost is real and worth naming.** `/services` drops from 954 indexable
words to about 450. That is still above Energize at 249, and the page keeps its
h1, its meta, its Service JSON-LD and its internal links, so nothing structural
breaks. But it does thin the site's most commercial page, and the honest
long-term answer is still option 8 in the decision doc: **one page per offer**,
where each of the five gets its own title, its own meta, its own case study and
its own 400 words. This draft makes that easier rather than harder, because
each card becomes the summary that would sit on the index.

**Three things must not be lost in the build**, all of them still true:

- `/ai` deep-links to `/services#sentiment-sos` and `#fan-moments`. Keep both
  ids on the cards.
- The per-offer contact routing (`?intent=consulting&need=…`) already works and
  is what makes a card-as-link worth doing. Keep the five `need` keys.
- `/fan-led-growth` has only two inbound links from this page's HTML. Do not
  drop the hero backlink.

## What I would not do

**Do not put the proof numbers on the cards at large size.** Tried and
rejected today, correctly: five big figures compete with each other, and the
card stops being a card and starts being a scoreboard.
