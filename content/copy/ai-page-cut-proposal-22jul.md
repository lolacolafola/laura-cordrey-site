# /ai: the cut to a pitch page

**Written:** 22 Jul 2026
**Decision it implements:** Laura is actively pitching AI companies, so `/ai`
keeps its URL and becomes a link sent into a conversation rather than a page
browsed from the footer. Target roughly 350 to 400 words, from 807.
**Status:** proposal, not applied. The structural cuts are costed and ready.
The rewritten lines need Laura's eye before they go in, because this is the
page that speaks in the most first-person voice on the site.

Companion to `plan-remaining-pages-22jul.md`. The type and contrast rebuild on
this page is already done and committed (`d82928f`, `2ffbbac`); this is the
copy layer only.

---

## The page as it stands, measured

807 words, 5,739px, eight bands.

| Band | Words | Height | Verdict |
|---|---|---|---|
| hero · "How to run an AI company like a AAA live service" | 65 | 761 | **keep** |
| cred · "The same signal that grows a game community" | 97 | 714 | **keep** |
| moves · "Where fan-led growth pays off for AI" | 173 | 871 | **keep, trim** |
| native · "I do not just advise on this. I build with AI" | 75 | 537 | **fold** |
| manifesto · "None of this is a cost. It is growth." | 88 | 567 | **cut** |
| offers · "Three ways in, in the order most AI companies need them" | 139 | 703 | **cut** |
| founding · "I'm taking on a small number of founding partners" | 107 | 625 | **keep** |
| finale · "Who wants to build it with me?" | 16 | 544 | **keep** |

## What goes, and why

### Cut: the manifesto band, 88 words, 567px

"None of this is a cost. It is growth." is an argument about fan-led growth in
general, not about AI. It is the same argument `/fan-led-growth` exists to
make, and that page now carries the sharpened version of it after the `/about`
manifesto moved there in `d82928f`. Three pages making one argument was the
problem on `/about`; it is the same problem here.

### Cut: the offers band, 139 words, 703px

"Three ways in, in the order most AI companies need them" is an offer ladder.
`/services` is the offer page, and it was rebuilt in `51bfe9e` into six colour
rows that open in place, which is a better version of exactly this. A prospect
who wants the ladder should land on the page that maintains it, not on a
parallel copy that will drift the first time pricing moves.

**This is the strongest cut of the two.** A duplicated offer list is not just
length, it is a maintenance trap: the day the Fan Engine engagement changes
shape, one of these two pages will quietly be wrong.

### Fold: the AI-native band, 75 words to about 25, 537px to roughly 120

"I do not just advise on this. I build with AI" is real and it is
differentiating, but it does not need its own band on a page this short. It
becomes two sentences at the end of the cred section, where the rest of the
"why me" material already sits.

### Trim: the four moves, 173 words to about 110

Keep all four moves. They are the substance of the page and the reason an AI
company would read past the hero. Trim each card's body by roughly a third;
they currently explain the mechanism where naming the outcome would do.

## What that lands

| | Now | After |
|---|---|---|
| Words | 807 | **~400** |
| Height | 5,739px | **~4,050px** |
| Bands | 8 | 5 |

Roughly 350 is reachable by also trimming the hero, but the hero is the part a
sent link is judged on in four seconds, so it is the last place to save words.
400 in five bands is the better trade.

## What must not be cut

**The founding-partner honesty.** The page says Laura has not run this inside
an AI company and will not pretend otherwise, and offers pioneer terms on that
basis. It is tempting to soften that on a shorter page. It should not be
touched. It is the most credible paragraph on the site, it pre-empts the exact
objection every reader will already have formed, and a version of this page
that quietly drops it becomes a page making an unbacked claim.

**The cred proof.** 15M players, 85% sentiment. It is the only thing on the
page that is not a projection.

## Open question for Laura

The page currently reads as a *site* page: it argues, it offers, it closes. A
page you send into a live conversation can assume the conversation. If the
context is always "we spoke, here is the detail", the hero could drop the
scene-setting entirely and open on the four moves, which would take this under
300 words without losing anything a reader in that situation needs.

That depends on how you actually use the link, which I do not know. If it also
has to work cold, from the footer or a LinkedIn post, keep the hero as is.
