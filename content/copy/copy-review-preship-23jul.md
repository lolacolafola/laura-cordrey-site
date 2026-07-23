# Final copy review before ship — 23 Jul 2026

Scope: every user-visible string across `src/pages/`, `src/components/Layout.jsx`,
`src/lib/seo.js`, `src/data/`, `index.html`. Reviewed against the naming rules
and voice rules in `CLAUDE.md`.

**STATUS, 23 Jul 2026:** §1, §1b, §2, §3, §5 and §6 are **applied**. §4 (pricing)
is **deliberately not applied** — Laura is leaving the price off the Services
page for now. Nothing in this review is still open.

Sections below are kept in their original "found" wording so the reasoning
survives; see the per-section status lines.

**Not in scope, and not touched:** the untracked media at the repo root (the
`.mp4`s, `.gif`s, `bla_bla_car_pattern.png`, the BlaBlaCar stills) and the three
older untracked docs in `content/copy/`. Those stay where they are; whether they
belong in the repo is a separate call.

---

## 1. Trademark drift — the naming rule is broken in 9 places

`CLAUDE.md`: *"It is never 'the Engine'. It is always the Fan Engine, and it
always carries the ™."* The good news first: **zero instances of "the Engine"**
site-wide. The bare-name rule is what has slipped, and it has slipped
specifically in plain strings — meta, JSON-LD, nav labels — which is exactly the
layer the rule calls out.

| File | Line | Current | Should be |
|---|---|---|---|
| `src/components/Layout.jsx` | 42 | `'The Fan Engine'` (footer link) | `The Fan Engine™` |
| `src/lib/seo.js` | 25 | `…the Fan Engine that turns communities…` | `Fan Engine™` |
| `src/lib/seo.js` | 33 | `'the Fan Engine'` (`knowsAbout`) | `Fan Engine™` |
| `src/lib/seo.js` | 254 | `name: 'the Fan Engine'` (DefinedTerm) | `Fan Engine™` |
| `src/lib/seo.js` | 262 | `…using the Fan Engine` (HowTo name) | `Fan Engine™` |
| `src/pages/MethodologyPage.jsx` | 94 | `'The Fan Engine · The method · …'` | `The Fan Engine™ · …` |
| `src/pages/MethodologyPage.jsx` | 96 | `The Fan Engine turns customers into fans` | `Fan Engine™` |
| `src/pages/ServicesPage.jsx` | 160 | `…Fan Moments, the Fan Engine, or advisory` | `Fan Engine™` |
| `src/pages/AboutPage.jsx` | 40 | `the Fan Engine that turns brand love…` | `Fan Engine™` |
| `src/pages/FaqPage.jsx` | 67 | `FAQ · Fan-led growth, the Fan Engine, and how I work` | `Fan Engine™` |

The DefinedTerm and HowTo entries are the ones I'd fix first. They are the
literal machine-readable assertion of what the method is called, and they
currently assert a name without the mark.

**Watch the title lengths when you add the character.** `FaqPage` is at 68 chars
before the ™; adding it makes it 69. It needs a rewrite either way (see §6).

### 1b. Fan Score and Fan Value carry the ™ on the homepage only

Same rule, same paragraph of `CLAUDE.md`. Right now:

- **With ™:** `HomePage.jsx` (both tool cards), `FanValueModelPage.jsx:241`
  (`The Fan Value Model™`).
- **Without:** the nav and footer (`Fan Score`, `Fan Value`), `/fan-engine`
  close ("Take the 2-min Fan Score"), `/services` finale ("Take the 2-minute Fan
  Score", "Size your Fan Value"), `/faq` (×3), and `/fan-score` itself
  ("The Fan Score · Pre-launch edition").

So a visitor meets the mark once, on the homepage, and never again — including
on the tool's own page. Either the mark travels or it doesn't; on the current
split it reads as an inconsistency rather than a mark.

Note also **"Fan Value" vs "the Fan Value Model"**. `CLAUDE.md` names the
canonical thing as the *Fan Value Model*. The nav, the homepage card and the
`/services` finale all shorten it to "Fan Value". If the short form is
deliberate, it's worth writing that into `CLAUDE.md` so it stops reading as
drift; if it isn't, the nav is the place to fix it.

---

## 2. "Fan Signal Index" is an orphan

`src/pages/FaqPage.jsx:37` — *"Week two: the audit and the Fan Signal Index built
on your data."*

This is the only occurrence of that phrase anywhere on the site. It is
capitalised like a product, sits next to two real products (Fan Score, Fan
Value), and has no page, no definition and no second mention. A reader who wants
to know what it is has nowhere to go, and an answer engine quoting this FAQ will
propagate a term the site can't back up.

Two clean options:
- **Cut it.** *"Week two: the audit, built on your data, so we know who your fans
  actually are."* Nothing is lost — the sentence already explains itself.
- **Or make it real**, with at least one supporting mention on `/fan-engine`
  where the four-week shape is described.

I'd cut it. Three named IP assets is already a lot to carry; a fourth that
appears once is a liability, not an asset.

---

## 3. Sentiment SOS quotes two different speeds on two different pages

> **RESOLVED AND APPLIED — Laura, 23 Jul 2026.** It is genuinely **five days to
> two weeks and beyond**, depending on the urgency and the size of the need.
> So this was never one number written two ways: it is a range, and both pages
> were quoting a single point on it.
>
> That makes `/services` wrong at **both** ends. "1 to 2 weeks" hid the five-day
> path (understating how fast she can move, on the one offer where speed is the
> entire proposition) and it capped a job that can legitimately run longer.
>
> Applied:
> - `/services` timing line: `1 to 2 weeks` → **`From 5 days · Scoped to the
>   urgency and the size`**, which also puts it in the same "From X · Scoped to
>   Y" family as Fan Programs and Fan Moments.
> - `/services` "What you get" now ends: *"Five days when it is contained, longer
>   when it runs deep or wide."*
> - `/faq` now ends: *"Five days is the contained case. Something deeper or wider
>   runs to two weeks and beyond, and I'll tell you which one you have on the
>   intake call."* (That sentence was written "I will tell you" and picked up its
>   contraction later the same day in the §5 pass.)
>
> **Do not put a fixed duration back on the Services card.** The range is the
> honest answer and the two pages now carry the same one.


- `/services` (`ServicesPage.jsx:91,95`): *"the real cause found in days, a fix
  shipped across product and community in one to two weeks"* · meta: **"1 to 2
  weeks"**.
- `/faq` (`FaqPage.jsx:49`): *"One intake call, then five days: … and hand you a
  build-ready recovery plan."*

These aren't strictly contradictory — five days to a plan, one to two weeks to a
shipped fix — but nothing on either page says so, and both are front doors for
the same urgent buyer. Someone comparing them sees "five days" and "two weeks"
and has to work out which is the promise.

~~Suggested fix, on the FAQ, which is the one that reads as the full answer:~~

> ~~That is Sentiment SOS, and it is built for this week, not next quarter. One
> intake call, then five days to a build-ready recovery plan across product,
> comms and community, message drafts included. The fix ships inside two weeks.~~

**Superseded.** That draft assumed the two numbers were a fixed sequence. They
are not — they are the ends of a range that moves with the job. See the
resolution note at the top of this section for what actually shipped. Worth
keeping as a reminder that "reconcile the two numbers" was the wrong frame: the
question to ask was *which number is true*, and the answer was *both, sometimes*.

---

## 4. The Advisory price is on the FAQ and nowhere else

> **NOT APPLIED — Laura's call, 23 Jul 2026.** The price is off the Services
> page on purpose for now. The FAQ keeps the $750, the Advisory card keeps
> "Priced per session or an ongoing embedded role". Do not "fix" this in a
> later pass; it is a decision, not drift.


`/faq` states **"A 2-hour advisory session is $750."** `/services` Advisory says
only *"Priced per session or an ongoing embedded role."*

Not an error, but the commercial page is quieter about price than the FAQ, which
is backwards: the buyer reading the Advisory card is closer to buying. A named
number is also the single strongest de-risking device on that card, and it's
already public. Suggest the Advisory `meta` becomes:

> `From $750 for a 2-hour session · or an ongoing embedded role`

**Flag for confirmation before it ships:** $750 is a live commercial claim and it
currently exists in exactly one place. Confirm it's current before it goes onto a
second page.

---

## 5. Voice: the forms and the FAQ don't contract, the rest of the site does

> **APPLIED IN FULL — Laura, 23 Jul 2026.** Both the contact form and the FAQ.
>
> On the open question of whether the FAQ's formal register was deliberate: it
> was not. The file header cited `copy-decks/copy-faq-v1.md` as its source and
> **no such file exists anywhere in the repo** — so there was no deck recording
> a decision, and nothing else in `content/` mentions register at all. Treated as
> drift and contracted. The stale deck reference has been removed from the file
> header and replaced with a note recording this decision, so the question does
> not get re-opened from scratch next time.
>
> Contractions do not harm the AEO job either — an answer engine quoting
> "I'd rather tell you what we can't measure than claim what we didn't cause"
> quotes it just as happily, and it is a better sentence.
>
> One implementation note worth keeping: the FAQ answers are single-quoted JS
> strings that **also feed the FAQPage JSON-LD**, so an ASCII apostrophe would
> terminate the string. All contractions use the typographic ’ (U+2019), which
> `ServicesPage.jsx` already does for the same reason. Verified after the change
> that the schema text still matches the on-page text exactly.


The site's voice is contracted and spoken — *"I'll tell you honestly"*, *"that's
with me"*, *"you're getting"*, *"don't have the team"*. Two areas break it, and
they break it consistently enough that it reads as a different writer.

**Contact form** (`ContactPage.jsx`):

| Line | Current | Suggested |
|---|---|---|
| 130 | `What is going on?` | `What's going on?` |
| 142 | `Message received. I will get back to you within one working day.` | `Message received. I'll get back to you within one working day.` |
| 155 | `Please add your name, email and a message.` | fine as is |
| 314 | `Now, it is urgent` | `Now, it's urgent` |
| 375 | `A few lines on what you are after.` | `A few lines on what you're after.` |

Line 130 is the sharpest of these: the lede directly above it already says
*"Tell me what's going on"*, contracted, and then the field label under it says
*"What is going on?"*, uncontracted. Same words, two registers, two inches apart.

**FAQ** (`FaqPage.jsx`) is uncontracted almost throughout — *"I am not your
person"*, *"That is the point"*, *"It is the fastest way"*, *"that is the
difference"*, *"Fans mostly do not show up"*, *"what we cannot measure"*, *"what
we did not cause"*. This may well be deliberate: uncontracted prose reads more
formal and more quotable, and this page's second job is being cited by answer
engines. If so, leave it, and it's worth a line in `CLAUDE.md` saying so — right
now it looks like drift rather than a decision. If it isn't deliberate, the
last one is the one I'd change first, because it's the emotional peak of the
page:

> I'd rather tell you what we can't measure than claim what we didn't cause.

That sentence is the best line on the FAQ and the contractions make it land
harder.

---

## 6. Repetition and small mechanics

**"Within one working day" appears three times on one screen** of `/contact`:
the reassurance line (208), the submit note (395), and the success body
(139/141/142). Two of those are visible simultaneously, above and below the same
form. Cut the submit note (395) to *"Goes straight to my inbox."* — the promise
is already made at the top of the page and repeated on success, which is the
moment it actually reassures.

**Em dash in a visible string** — the voice rule says none.
- `src/data/caseStudiesCinematic.js:514` — *"cost per acquisition — a quarterly
  average across 22 markets"*. Use a colon.
- `index.html:25` — `og:image:alt` reads `Laura Cordrey — Fan-led growth for
  consumer brands`. The site's separator everywhere else is `·`. Use that.

**Six case-study titles run past the 60-char SERP window:**

| Page | Chars |
|---|---|
| `AzarusGameAdsPage` | 86 |
| `DeltaCompanyPage` | 80 |
| `AzarusStreamersPage` | 75 |
| `UbisoftSiegeChampionsPage` | 74 |
| `ClawMobilePage` | 66 |
| `UsMobilePage` | 65 |

All six end in `· Laura Cordrey`, which is what gets truncated — so the byline is
lost on precisely the pages where the client name is the draw. Descriptions are
all fine (142–157). Every non-case-study page is inside 60 already, so this is a
contained fix.

**Adjacent, not copy, but in the same meta block:** all seven case-study pages
pass a *relative* `canonical` (`'/work/ubisoft-delta-company'` etc.) where every
other page uses `pageUrl(...)`. `useDocumentMeta` feeds the same value to
`og:url`, and `og:url` has to be absolute. Worth fixing in the same pass.

---

## 7. Things I checked and found clean

- **"the Engine"** — zero instances site-wide. The hard rule holds.
- **"a AAA live-service game"** (`AIPage.jsx:142,160`, `speaking.js:100`) — correct
  and consistent. AAA is read "triple-A", so "a" is right. No change.
- **The pre-launch Fan Score the FAQ promises twice** genuinely exists and is
  reachable from the `/fan-score` picker ("Not yet, we're pre-launch").
- **Five stages vs four phases** — `/fan-engine` teaches five fan stages
  (Activation, Habit, Belonging, Identity, Advocacy), `/services` teaches four
  engagement phases (The picture, The build, The tracking, Every quarter). These
  are different axes, not a contradiction, and the JSON-LD matches the page. Soft
  note only: nothing tells the reader they're different axes, so someone reading
  both in one session may try to map them onto each other.
- **Meta description lengths** — every page inside 160.
- **Proof figures** — the repeated ones agree across pages (85% / 15M players,
  60M+ views, 50M+ Siege, $32K US Mobile drop, 10M E3, 500K broadcast, 22
  markets, thirteen years).
- **Deep links** — every `?need=` key in `ServicesPage.jsx` matches a
  `consulting_need` option in `ContactPage.jsx` exactly.

---

## What was actually applied, 23 Jul 2026

**§1 — trademark pass (11 fixes, not the 10 found).** The review missed one:
`index.html` also carried a bare "the Fan Engine" in `<meta name="keywords">`.
Caught by checking the built HTML rather than the source, which is the check
worth keeping: `grep` over `dist/**/index.html` for `Fan Engine` not followed by
the mark. It now returns nothing across all 19 routes.

**§1b — Fan Score / Fan Value.** Applied as *first and most prominent use per
page*, not every occurrence. Marking all ~20 repeats inside the `/fan-score`
quiz flow would have been visually heavy and isn't what the convention asks for.
So: meta titles, the footer, the primary CTA and the first in-body mention carry
the mark; incidental repeats on result and retake screens don't.

Two things worth knowing about how this landed:
- **The footer needed JSX, not a bare character.** Setting the labels to the
  string `'Fan Score™'` rendered the ™ at full 12.48px against 12.48px link
  text, which sat heavy in the row. They now carry `<span className="tm">`, which
  renders at 9px — so `footerLinks` holds JSX and the map keys off `n.to`
  instead of `n.label`.
- **`/fan-value`'s title went 1 char over** once the mark was added (63). Trimmed
  the leading "The" to bring it to 59.

**§2 — "Fan Signal Index" cut.** The FAQ answer now reads *"Week two: the audit,
built on your data, so we know who your fans actually are."* Verified the FAQPage
JSON-LD still matches the on-page text exactly, which is the constraint the file
comment calls out.

**§6:**
- Six case-study titles cut to 45–59 chars, all keeping `· Laura Cordrey`.
- Both visible em dashes gone (the CAC caption takes a colon; `og:image:alt`
  takes the site's `·`).
- `/contact` submit note cut to "Goes straight to my inbox." — "within one
  working day" now appears once per screen instead of twice.
- All seven case-study pages moved from a relative `canonical` to
  `pageUrl('work/…')`, so `canonical` and `og:url` are both absolute.

**Verified:** `npm run build` passes, 19/19 routes prerender. Across the built
site — no bare "Fan Engine", no "the Engine", every title ≤60, every description
≤160, every `og:url` absolute. Checked in the browser: the footer renders 11
unique links with the ™ at 9px, the `/services` finale marks inherit their
parent colour (so no contrast change on oxblood) and don't overflow their
buttons, and the FAQ schema still mirrors the page.

## Still open

Nothing. All six sections are resolved: five applied, one (§4, pricing)
deliberately declined. See the per-section notes.

<details><summary>Original open list, kept for the record</summary>


- ~~§3~~ — **done**, see the resolution note in that section. The two pages now
  carry the same range.
- ~~§5~~ — **done**. The FAQ's register turned out not to be a decision (the
  copy deck it cited does not exist), so it was treated as drift and contracted.
- **§4** — closed, deliberately. See the note in that section.

</details>

## Suggested order

1. §1 + §1b — the trademark pass. It's the rule Laura wrote down, and it's a
   mechanical fix.
2. §2 — cut "Fan Signal Index".
3. ~~§3 — reconcile the two Sentiment SOS speeds.~~ Done.
4. §6 — six titles, two em dashes, one repeated promise, seven canonicals.
5. §4 — the Advisory price, once the $750 is confirmed current.
6. ~~§5 — the contraction pass.~~ Done.
