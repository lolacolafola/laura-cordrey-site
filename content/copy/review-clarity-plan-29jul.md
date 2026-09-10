# Review: "Site clarity: making the detail reachable"

Date: 29 July 2026
Reviews: the clarity plan of 29 July (the reviewer-feedback document).
Question asked: is the "no System 1 rewrite" call right, especially on /services?

**Verdict in one line: the plan's finding is correct, its diagnosis is wrong, and
the System 1 exclusion should be reversed. Laura's instinct is right.**

Written after reading `src/pages/ServicesPage.jsx`, `src/pages/ServicesPage.css`,
`src/pages/HomePage.jsx`, `src/pages/HomePage.css` and `src/components/Layout.jsx`
in the repo on 29 July. The plan itself flagged that /services was described
secondhand and should be checked against the code before anything changes. It
was, and three of its factual premises do not hold.

---

## 1 · What the code actually says

### The click affordance on /services is already built

The plan's Pass 1 item 1 asks for a persistent click affordance, a whole-card
hit target, and a subtle hover. All three already ship.

| Plan asks for | Already in the code |
|---|---|
| Persistent arrow or "Read more", not hover-only | A plus icon, always rendered, `opacity: 0.5` at rest, going to 1 on hover (`ServicesPage.css:917`, `:927`) |
| Whole card is the click target | The entire face is a `<button>`, and the plus sits inside it rather than being a second target (`ServicesPage.jsx:259-293`) |
| Subtle hover consistent with the site | A ground-tint change per tone, no lift, no new pattern (`ServicesPage.css:936-938`) |
| One teaser line per card | Already there, one per offer, on the face (`ServicesPage.jsx` `teaser` field) |

So Pass 1 items 1 and 2 are close to a no-op. Building them would mean adding a
second affordance next to one that already exists and already failed.

**This matters, because it means the affordance theory is disproven, not
untested.** The reviewer looked at a card with a persistent plus, a hover
response and a teaser line, and did not click. Making the plus louder is
prescribing more of the thing that did not work.

### Everything concrete on /services is behind the accordion

Each offer carries: `need` (the diagnosis), `get` (the deliverable), `payoff`,
`proofFig` and `proofRest` (a named client and a number), and `meta` (the
duration and pricing basis). That is a genuinely strong set of five, and the plan
is right that it exists.

It is all inside `svc-row__panel`, which is CSS-hidden at rest. Every row starts
closed (`ServicesPage.jsx:189`).

So the plan's line "Services likewise carries durations on all five offers" is
true in the source and false on the screen. **A reader who does not click sees
zero numbers, zero client names and zero durations on the site's commercial
page.** What they see is five kickers, five titles and five teaser lines.

This is the finding, stated more precisely than the plan states it.

### The homepage offer cards hide their own copy behind hover, and do not click

This is the part the plan misses entirely, and it is the strongest evidence for
Laura's position.

`.svcard` is a plain `<div>` that navigates nowhere. Its description copy is
`opacity: 0` with `grid-template-rows: 0fr` at rest and opens only on
`:hover` (`HomePage.css:237-251`). It is a documented, deliberate exception to
hover honesty, with a `(hover: none)` and `prefers-reduced-motion` block that
opens the copy from the start on touch (`HomePage.css:298-305`). The reasoning
is sound and the touch fallback is correct.

But the consequence on a desktop, which is where this reviewer read the site, is
that "Three ways I help" renders at rest as:

> 01 · The Fan Engine™ · The method I built
> 02 · Fix one thing now · Move fast on one problem
> 03 · Advisory · Expertise on call

Fifteen words. That is the whole of what the homepage says about what Laura
does, unless the reader hovers. And if they do hover, read it, and want more, the
card is not a link. The only exit is one text link under the group.

A reader who skims the homepage and comes away saying "I don't understand what
you actually do" has described this section accurately. He is not reporting a
failure of comprehension. He is reporting what was on the screen.

*(Small correctness note: the JSX comment above this section at
`HomePage.jsx:487` says "Each card is a real `<Link>`, so hover motion is
honest". That is stale. The CSS note at `HomePage.css:216` is the accurate one.
Worth fixing so the next person does not trust it.)*

---

## 2 · On System 1, which is the question asked

**Laura is right, and the plan's own reasoning contains the counter-argument.**

The plan rejects a System 1 pass as "a whole-site job triggered by one
skim-level reaction to one line", then, three lines later, concedes: "If a
language pass ever happens it is capped at the three homepage cards and the five
service cards."

That carve-out is exactly the surface Laura is pointing at. So the disagreement
is not really about whether System 1 applies. It is about whether that work is
part of this job or a separate decision. It is part of this job, for one reason:

**The card face is not decorated by its language. It is made of its language.**

The plan splits the problem into an affordance fix (Pass 1) and a numbers fix
(Pass 2), and treats language as a third, optional thing. But a closed accordion
row has no content except its language. There is nothing else on it to fix. Once
the affordance is confirmed as already built, "make the card face work" and
"rewrite the card face" are the same sentence.

The reviewer gave the causal chain himself, and it is a content statement, not an
affordance one:

> "there was so limited text in each of your 5 subsets that I didn't even think
> to click on it"

Not "I could not tell it was clickable." He read the face, judged it complete,
and moved on. A plus icon does not fix that. A face that opens a loop does.

### Where the teasers actually sit today

| Offer | Teaser on the face | Reads as |
|---|---|---|
| The Fan Engine™ | "The whole engine, powered by your fans." | Abstract. Restates the title in metaphor. No picture forms. |
| Sentiment SOS | "When your community turns, move fast." | Concrete and good. This one works. |
| Fan Programs | "Your users bring you the next ones." | Concrete. Works. |
| Fan Moments | "Give your best customers something to feel." | Abstract. "Something" is a placeholder where the deliverable should be. |
| Advisory | "One decision, or an embedded role." | Abstract. Describes a contract shape, not an outcome. |

Three of five are abstract, and the two abstract ones sit on the flagship and on
the offer with the best proof on the page (a drop that sold out at $32K in under
three hours, 450+ unprompted fan posts). That proof is one click away and reads
as nothing at rest.

This is a System 1 problem in the precise sense: the face gives the reader
nothing to picture, so nothing fires, so no click.

### The one part of the plan's rejection that is right

There are two different things filed under "System 1" and the plan collapses
them:

- **The reviewer's vague "vocabulary is too fancy in a bunch of places", with no
  lines named.** The plan is correct to park this. It is not actionable and it
  invites a whole-site rewrite off one comment. Leave it.
- **Making the card face concrete enough that a skimmer forms a picture in under
  a second.** This is the finding itself, on the ten surfaces that carry the
  offer. It is actionable now.

The plan rejected the first and accidentally took the second with it. Keep the
first rejection. Reverse the second.

---

## 2b · The mismatch with the reference site (added 29 July)

Laura, 29 July: the homepage cards are modelled on Anastasia's homepage cards,
**but what the reviewer was praising was Anastasia's services page, and hers is
very detailed.**

That is the finding, stated at its root. Two different pages on the reference
site do two different jobs:

| | Anastasia's site | This site |
|---|---|---|
| Homepage offer cards | Minimal, pattern borrowed | Minimal. Borrowed correctly. |
| Services page | **Very detailed, laid out openly** | **Minimal at rest. All detail behind an accordion.** |

The homepage minimalism is not a mistake. It is only safe on the reference site
**because the services page is where the detail lives.** A short homepage card is
a promise that there is more one click away, and on Anastasia's site that promise
is kept by a long, open, counted services page.

This site borrowed the minimalism onto both pages. So the promise is made twice
and kept nowhere. **There is no page on this site where a reader can see what
Laura delivers without clicking something.** The reviewer clicked neither, which
is why he formed his verdict on the homepage and the two tools.

That is not a copy problem or an affordance problem. It is a missing floor.

### What this does to the recommendation

It raises the question the plan never asks: **should the /services rows still
start closed at all?**

The closed default was set on 22 July so the stack would read "as a deliberate
menu rather than as an empty page" (`ServicesPage.jsx:180-188`). That was a
reasonable call about how the page *looks*. The evidence now is about what the
page *does*, and it points the other way: the model Laura is aiming at is a long
detailed services page, and the accordion is fighting the model.

Three options, in ascending order of change:

- **A. Keep the accordion, promote the concrete fields onto the face.** Move
  `meta` (the duration) and `proofFig` (the number and the client) so they are
  permanently visible on all five, and rewrite the teaser. Cheapest, keeps every
  rule in the file intact, and closes most of the gap.
- **B. Open the rows by default.** Reverts the 22 July call. Makes /services long
  and detailed, like the reference. Keeps the accordion machinery, so deep links,
  prerendering and comparison all still work.
- **C. Drop the accordion.** Biggest change, most like the reference site, and
  the most work.

**Recommendation: A, and read Anastasia's services page before deciding whether
to go on to B.** A is a day's work, breaks nothing, and is worth doing whichever
way B goes. B is a genuine judgment call about page length that should be made
against the actual reference rather than against a description of it.

The URL is now the blocking input. It was open question 1 in the plan and it
still is.

---

## 3 · The consolidation this produces

The useful consequence of all the above is that the plan's two passes collapse
into one edit.

Pass 2 says: add counts and a named artifact to the five services. But if those
numbers go where the other numbers already are, inside the panel, they change
nothing for the reader who never opens the panel. The reader the whole document
is about.

**So the numbers and the language are the same edit, and both belong on the
closed face.** One line per offer that is concrete, countable and visible without
a click.

Shape, not content, exactly as the plan proposes: a count, a duration, and the
name of the thing that lands on the table. That is a scoping promise, and it
answers Laura's own objection, recorded in the plan, that she cannot know how
each engagement will go before running it. Committing to eight sessions does not
commit to what is said in them.

Rough test of the shape, using facts already in `ServicesPage.jsx` so nothing new
is invented:

> **Fan Moments** · Give your best customers something to feel.
> From 2 weeks. One built moment, measured. *(US Mobile: sold out in under 3 hours.)*

Every element there is already on the page. It is behind a click.

**The numbers themselves still need Laura.** That part of the plan stands: every
figure becomes a promise she has to honour on a call. Nothing gets invented, and
a placeholder gets flagged rather than guessed.

---

## 4 · Revised shape of the work

Not a rewrite of the plan, a re-cut of it.

**Pass 1 (half a day, no copy sign-off needed)**
1. Verify the /services affordance rather than rebuild it. The realistic change
   is raising the resting plus from `opacity: 0.5`, and nothing else. Test on a
   real phone.
2. Fix the homepage offer cards. This is the bigger miss and it is not in the
   plan.

   **Revised 29 July, after Laura confirmed the pattern is borrowed from
   Anastasia's site: the interaction stays exactly as it is.** The hover
   reveal, the touch fallback and the non-linked card are all untouched. This
   drops the layout problem recorded at `HomePage.css:231-234`, where the three
   bottom-anchored titles stop aligning if the copy is made permanently
   visible.

   The fix is the six lines that are already permanently visible, which
   currently spend two of themselves saying the same thing twice:

   | | Title | Kicker | Reads as |
   |---|---|---|---|
   | 01 | The Fan Engine™ | The method I built | Kicker earns its place. It says the method is hers. |
   | 02 | Fix one thing now | Move fast on one problem | Restatement. Two lines, one idea. |
   | 03 | Advisory | Expertise on call | Near restatement. Both name the format, neither names the outcome. |

   So a third of the resting copy is spent twice. Rewriting those two kickers
   to carry a concrete outcome costs nothing structurally, keeps the borrowed
   pattern intact, and roughly doubles what a skimmer gets without hovering.
   This folds into item 6 and is the same System 1 edit.
3. Nav: add Method between "Why fans" and "Work". Agreed with the plan, no
   change. Six items and a CTA is a real mobile question, so check the drawer.
4. Homepage work tiles get a process line. Agreed with the plan, no change.

**Pass 2 (copy, needs Laura, and this is where System 1 comes back in)**
5. Rewrite the five /services card faces so each carries a concrete teaser plus
   one line of shape: a count, a duration, a named artifact. The Fan Engine,
   Fan Moments and Advisory need the most work. Sentiment SOS and Fan Programs
   are close already.
6. The three homepage cards get the same treatment, one line, once item 2 above
   has made them visible at rest.

The System 1 pass is item 5 and item 6. It is not a separate project and it is
not a whole-site job. It is the same ten card faces the plan already
ring-fenced, edited once instead of twice.

**Everything in the plan's "Do not change" list stands, unchanged.** No case
study pages, no Fan Score or Fan Value logic, no palette or typography, no
redesign, no segment variants, no new pages, no ICP narrowing.

---

## 5 · What has not changed about the closing argument

The plan's last section is right and should survive this review intact:
distribution is the constraint, not perfection. This re-cut does not make the job
bigger. It makes it one pass of build and one pass of copy instead of two passes
of build plus a deferred language decision that would have come back anyway.

Ship it, then stop building and go and sell.

---

## Flagged, needs Laura before anything ships

- **Every number in item 5 and item 6.** Nothing invented. See the plan's own
  open question 2.
- **The reference site is Anastasia's**, per Laura on 29 July. That closes the
  plan's open question 1, which had it wrong as Winston Francois. The homepage
  offer cards were modelled on it. **The URL is still needed**, because it is
  the clearest existing model for what "counted" looks like and it should be
  read before item 5 is drafted.
- **The homepage hover exception** is Laura's own call, made twice (removed 23
  July during the consistency audit, restored the same day at her request), and
  it is borrowed from the reference site above. Item 2 below is therefore
  narrowed: **do not change the interaction.** See the revision under item 2.
- **ICP narrowing** stays parked, as in the plan. Nothing here narrows the copy.

## Minor, while in these files

- `HomePage.jsx:487` comment says the cards are `<Link>`s. They are not. Stale.
- `ServicesPage.jsx:14` comment says "Six offers as cards". There are five.
- `ServicesPage.jsx:33-34` still states the "flagship opens by default" rule,
  which is explicitly superseded at `:180-188`. Two contradicting rules in one
  file.
