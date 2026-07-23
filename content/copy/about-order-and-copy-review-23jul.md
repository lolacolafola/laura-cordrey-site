# /about — section order and copy review, 23 Jul 2026

Two questions: should Storytelling be first, and does the copy hold up.

Short answers: **no, it shouldn't**, and **the copy is strong but repeats itself
in four places** — two of them in the same section.

---

## Part 1 — Section order

### Current

| # | Section | Ground | Height | Proof |
|---|---|---|---|---|
| 0 | Hero, full-bleed E3 photograph | black | 804px | logo strip |
| 1 | **Storytelling & world-building** | bone | **544px** | 3 AAA worlds / 22 markets |
| 2 | Community building & sentiment | grey `#2D2723` | **1080px** | 85% sentiment / 15M players |
| 3 | Go big or go home | espresso | 490px | 10M watching / 500K reached |
| 4 | How I work now | bone | 507px | — |
| 5 | Speaking teaser | dark | 1666px | — |
| 6 | Close | oxblood | 485px | — |

### Your instinct is right. Four reasons.

**1. It's the weakest differentiator, in the strongest position.** "Everything I
build starts with story" is a sentence almost any marketer could write. The
section immediately after it contains a claim almost nobody can make: holding a
15-million-player community at 85% positive sentiment. The page currently opens
its argument with the most generic thing it has to say.

**2. The proof is credentials, not outcomes.** "3 AAA worlds" and "22 markets"
say *where she has been*. "85% across 15M players", "10M watching", "500K at
once" say *what happened because she was there*. The page front-loads the
CV numbers and back-loads the results.

**3. It doesn't answer the question the hero just raised.** The hero says
*"Fan-led growth wasn't a job ten years ago. I made it one."* That is a big
claim, and the reader's next thought is "prove it." Storytelling doesn't;
community does, with numbers attached.

**4. The hero photograph belongs to section 3.** The page opens full-bleed on
the E3 stage, then talks about storytelling for a screen and a half, then
reaches "I unveiled my own fan program live on the E3 stage" three sections
later. The image writes a cheque the third section cashes.

There is a real argument for the current order — story is the foundation, and it
is chronologically first (BlaBlaCar, then Ubisoft). But that's an argument about
how the work is built, not about what a stranger needs in the first ten seconds.

### Recommended order

**Hero → Community → Storytelling → Big moments → How I work → Speaking → Close**

A straight swap of 1 and 2. Why not move Community first *and* demote
Storytelling further:

- Community first leads on the sharpest, best-evidenced, most differentiated
  claim, and it carries the AI line (*"It's the very thing AI products will need
  most"*) which matters now that AI companies are an active segment.
- Storytelling second still reads as the foundation, just after the proof that
  the foundation produced something.
- Big moments stays third, which is where it does the most work: it ends the
  trio on 10M watching and E3, and it hands straight to the Speaking teaser
  ("On the big stages"). That adjacency is currently interrupted by "How I work
  now". Moving Big moments to the end of the trio makes that hand-off almost
  seamless.

### ⚠️ This is a design change, not a copy move

Worth being straight about before anyone starts: **the two sections are not
interchangeable blocks.**

- **Section 2 has a different layout.** It's the mirrored image-split
  (`about-imgsplit`) with the radar tower plate on the left. Section 1 is the
  standard two-column `about-eng` layout. Swapping content between them means
  moving the layout, not just the words.
- **The tower plate is built for a dark ground.** Its SVG uses gold strokes
  (`rgba(212,200,150,…)`) on `#1B1512`. On bone it would disappear.
- **The ground rhythm was deliberate.** A comment in `AboutPage.css` records
  that bone was put at section 1 specifically so the page wasn't "three dark
  grounds in a row before the page offered any relief."

So the swap has to take the grounds with it, giving:

> black photo hero → grey `#2D2723` → bone → espresso → bone → dark → oxblood

That's one dark-to-dark adjacency, at the very top. I think it's fine, and
arguably better: the hero is a full-bleed *photograph*, not a flat dark panel,
so photo-into-dark-editorial reads as a deliberate cinematic move rather than as
three flat darks stacked. Light relief arrives one screen later than it does now.

**Every `<mark>` on both bands must be re-measured after the swap** — that's the
failure this site has hit four times. Storytelling's mark moving from bone to
`#2D2723` is exactly the case CLAUDE.md flags as having bitten twice on this
page already (`#C8362B` on `#2D2723` measures 2.82, under the 3.0 minimum). It
will need `#E4695E`, and the muted body copy will need `#B8AEA2`.

---

## Part 2 — Copy review

### 🔴 "Go big or go home" is used twice in one 490px section

It's the kicker **and** the last three words of the body, in bold. In a section
that's only 490px tall, both are on screen at once.

Keep the body sign-off, which lands. Change the kicker, whose job is to say what
the section is about:

| | Current | Suggested |
|---|---|---|
| Kicker | Go big or go home | **Launches & live moments** |
| Body ending | …**Go big or go home.** | unchanged |

That also makes the kicker match its two siblings, which are both descriptive
("Storytelling & world-building", "Community building & sentiment") rather than
attitudinal. Right now one of the three is a different kind of thing.

### 🔴 "people fall for" is used twice, two screens apart

- Hero lede: "I build **the brand people fall for**, and the Fan Engine™…"
- Storytelling h2: "I build **worlds people fall for**."

Same verb, same phrase, same construction, both introducing a section. The
second one lands as an echo rather than as a new idea. Since the hero has first
claim, change the h2. It also has the weakest heading of the three:

| Option | Heading | Why |
|---|---|---|
| **A (recommended)** | **I build worlds people want to live in.** | Keeps "worlds", drops the collision, and it's the actual distinction the body already draws ("want to live in it, not just pass through a funnel") |
| B | I make people care before they buy. | Sharper, more commercial, but abandons the world-building idea |
| C | Story first, funnel second. | Punchiest, most quotable, but reads as a slogan next to two headings that are statements |

A is the safest and reuses a phrase already in the body.

### 🟡 "Trusted with the big moment" is the vaguest of the three headings

Compare the trio:

- "I build worlds people fall for." — active, first person
- "I catch a community before it turns." — active, first person, specific
- "Trusted with the big moment." — passive, no subject, and doesn't say by whom

The body underneath is much better than the heading ("Hand me your biggest brand
moment, the launch, the drop, the thing everyone will be watching"). Suggested:

> **They hand me the biggest moment.**

Or, closer to the body's own imperative: **"Hand me the biggest moment."** That
one is a genuine differentiator in three words and matches the first-person
active voice of its two siblings.

### 🟡 "I bring people in" means two different things on one page

- Storytelling: "That's why **I bring people in** across brand, events and
  product" — here it means bringing *audiences* into the world.
- How I work now: "When a build calls for a specialist, **I bring one in**" —
  here it means hiring *contractors*.

Two screens apart, same phrase, opposite referents. The storytelling one is the
one to change, because the second is unambiguous in context. Suggested: "That's
why the work runs across brand, events and product…"

### 🟡 Hero sub has an ambiguous antecedent

> "**I've built it** from nothing and at millions of users, over thirteen
> years…"

"It" could be the brand, the Fan Engine™, or fan-led growth. The preceding
sentence contains all three. Suggested: **"I've built fan-led growth from
nothing and at millions of users, over thirteen years…"** — which also repeats
the target phrase once more for a reader still deciding what this site is about.

### 🟢 Worth a decision, not necessarily a change

**"Experience makes the work good. AI makes it fast."** It's the best-written
line on the page and I'd be reluctant to lose it. But it is the only place the
site describes AI as *her tooling*, and it sits on a site actively pitching AI
companies as *clients*. A buyer skimming could read it as "she uses AI to do the
work," which is a mixed signal at a premium price point. It's defensible and
honest, and it's a real differentiator against slower agencies. Flagging it as a
positioning call rather than a copy error.

**The close is the vaguest of the site's three closes.**

- Homepage: "Tell me about your brand."
- /services: "What's your fanbase worth?"
- /about: "Want to build something fans can't stop talking about?"

The other two ask for something or point at money. This one asks a rhetorical
question that's easy to answer "no, thanks" to in your head. Given /about's job
is the person rather than the offer, that may be deliberate. If it ever gets
revisited: **"Want fans who do the selling?"** keeps the register and picks up
the homepage's own promise.

---

## Suggested order of work

1. **The four copy fixes.** All are small, none depend on the reorder: the
   duplicate "Go big or go home", the "people fall for" collision, "Trusted
   with", and the "I bring people in" ambiguity.
2. **The hero "it".** One word, removes a real ambiguity.
3. **The section swap**, as a separate change, with the mark contrast
   re-measured on both bands afterwards.

The copy fixes are safe to do now. The swap is worth doing but it needs the
layout and the tower plate moved with it, so it deserves its own pass rather
than being bundled in.

---

## Addendum, same day — the "twenty-two markets" line

Laura, on the storytelling body: *"I don't get why we say 22 markets here."*

Right, and for two separate reasons.

**1. The pull directly below it already is that number.**

> Body: "…script-to-screen production and content across **twenty-two markets**."
> Pull, two lines under it: "**22** · BlaBlaCar markets where I ran content and community"

The pulls exist to carry the numbers. When the prose says the number first, the
pull stops reading as proof and starts reading as filler. One of the two had to
go, and the pull is the better home: it has room for the context ("where I ran
content and community") that the prose clause didn't give it.

**2. It's the wrong kind of fact for this section.**

The paragraph is an argument about craft — what makes someone fall for a world
and want to live in it rather than pass through a funnel. Market count is reach
and operations. Ending a craft argument on a distribution stat is a
non-sequitur, and because it's the last clause it's the thing the reader carries
out of the beat.

### Applied

| | |
|---|---|
| Before | That's why the work runs across brand, events and product, from naming and positioning to script-to-screen production and content across twenty-two markets. |
| After | So the work runs across brand, events and product, from naming and positioning through to script-to-screen production. |

Also changed "That's why" to "So". "That's why" promises a causal link — *this is
the reason the work spans those disciplines* — which the list underneath doesn't
actually deliver. "So" claims less and is honest about the join.

The sentence now ends on script-to-screen production, which is concrete,
genuinely rare in a growth consultant, and belongs to the argument being made.

### One related thing, not changed

That sentence is still a capability list, and **"How I work now" further down the
page covers the same ground**: *"I run my own practice end to end: strategy,
positioning, brand, product, and the code to ship it."* Two sections telling the
reader what disciplines she spans.

I've left it, because in the storytelling section the list is doing a different
job — it's showing the range that world-building *requires*, not advertising
services. But if this page ever needs to lose more weight, that's the next
sentence to look at, not a new one to find.
