# Game plan: nav label, orphan fix, homepage retarget
**Date:** 22 Jul 2026
**Status:** for review. Nothing built yet.
**Source:** [seo-audit-nav-and-targeting-22jul.md](seo-audit-nav-and-targeting-22jul.md)

## The one-line version

`/fan-led-growth` is the only page on the site with a realistic job of being found by a stranger, and right now nothing links to it and its nav label uses a term strangers don't know. Six edits fix that. No merge, no new pages, no rewrite.

**Decided:** nav label is "Why fans". Fan Engine page stays separate and stays out of the nav.

---

## The six edits

Each one is listed with the exact file, the exact current text, and the exact proposed text, so you can approve or reject them individually. Nothing here is bundled.

---

### Edit 1. Nav label
**File:** `src/components/Layout.jsx:15`
**Approval needed:** none, already decided

Current:
```js
{ key: 'flg', label: 'Fan-Led Growth', path: '/fan-led-growth', isHash: false },
```

Proposed:
```js
{ key: 'flg', label: 'Why fans', path: '/fan-led-growth', isHash: false },
```

The comment block above it (lines 10 to 13) says "Fan-Led Growth leads" and needs updating to match.

**Nav becomes:** Why fans · Work · Services · Speaking · About · [Get in touch]

**Side effect:** the nav gets *shorter*, not longer. "Why fans" is 8 characters against "Fan-Led Growth" at 14. So the Speaking question is no longer forced by width. It becomes a pure preference call, and my recommendation is **leave Speaking in the header** unless you want it de-emphasised for your own reasons.

---

### Edit 2. Homepage title and description
**File:** `src/pages/HomePage.jsx:111-113`
**Approval needed: yes, voice**

Current title:
> `Laura Cordrey | Fan-Led Growth Consultant for Consumer Brands`

Proposed title:
> `Laura Cordrey | I turn your customers into fans`

46 characters, inside the 50 to 60 window Google displays.

Current description (151 chars, correctly sized):
> "Laura Cordrey builds fan-led growth for consumer brands. Thirteen years turning customers into fans across Ubisoft, BlaBlaCar, US Mobile, Amazon Games."

Proposed description (159 chars):
> "Your customers are worth more than you're getting. I turn them into fans who stay, spend more and bring others in. Ubisoft, BlaBlaCar, US Mobile, Amazon Games."

Keeps the problem-first opening, which is the point of the change, and keeps the client names inside the visible window, which is the point of the current one. Built from the existing homepage hero lede, so it introduces no new claim.

**Correction, 22 Jul:** the first draft of this plan proposed a 224-character version. That was wrong. Google truncates display at roughly 160 characters, which would have pushed "Ubisoft, BlaBlaCar, US Mobile, Amazon Games" past the cut and made the most persuasive part of the description invisible. Laura caught it. Length is not a ranking factor, so a long description carries no penalty, but everything past the cut cannot earn a click. Keep descriptions at or under about 160.

**Nothing visible on the page changes.** This is the browser tab title and the Google result. Your H1 stays "Fans who stay, pay, and bring more".

---

### Edits 3 to 6. The four inbound links

This is the important one. These four links are what actually make the page findable.

The wording of each anchor matters, because anchor text tells Google what the destination page is about. Every one below is phrased like something a person would search for, and every one reads as a normal sentence rather than a keyword drop.

#### Edit 3. From the homepage
**File:** `src/pages/HomePage.jsx`
**Approval needed: yes, placement is a design call**

Your hero lede already contains the exact phrase, at line 271:

> "I build the belonging and advocacy that **turn them into fans**, so they stay, spend more, and bring new customers with them."

**Option A:** make "turn them into fans" an inline link. Best possible placement for search, since it's high on your strongest page with ideal anchor text. Costs you a competing click target next to your hero CTA.

**Option B:** leave the hero alone, add a standalone text link lower down (near the services band or the proof section) reading "How customers become fans →".

**My recommendation: Option B.** A link inside a hero lede pulls against the hero's own call to action, and the search gain over Option B is small. Your call.

#### Edit 4. From the Fan Engine page
**File:** `src/pages/MethodologyPage.jsx:352`
**Approval needed: yes, wording**

There's already a link there: "See the case studies →". Add a second alongside it.

Proposed anchor: **"Why fans grow a business →"**

This is the return path. Someone reading the method who wants the argument behind it can get back to it. Right now that journey is one-way.

#### Edit 5. From Services
**File:** `src/pages/ServicesPage.jsx:50-52`
**Approval needed: yes, this adds a sentence to your copy**

Current lede:
> "Make the userbase you already paid for worth more. Protect it, grow off it, deepen it, or build the whole system that does all three."

Proposed, one sentence added:
> "Make the userbase you already paid for worth more. Protect it, grow off it, deepen it, or build the whole system that does all three. New here? Start with [why fans are worth building](/fan-led-growth)."

Alternative if you'd rather not add a sentence: link the existing phrase "worth more" instead. Weaker anchor text, zero copy change.

#### Edit 6. From the FAQ
**File:** `src/pages/FaqPage.jsx:16`
**Approval needed: no, this is a link only, no wording change**

The answer to "What is fan-led growth?" already contains the phrase:

> "...you build the conditions for **customers to become fans**: people who stay longer, spend more..."

Make that phrase a link to `/fan-led-growth`. No copy change at all.

---

## What I am deliberately not doing

| Not doing | Why |
|---|---|
| Merging FLG and Fan Engine | Different jobs. FLG gets found by strangers, Fan Engine explains to people already interested. Nobody searches "Fan Engine", so the two never compete. |
| Renaming the `/fan-led-growth` URL | The slug is a weak ranking factor. A rename costs a second 301 redirect and resets what little history the page has. Not worth it. |
| Putting Fan Engine in the nav | It's reached from the FLG page, which is the right order: agree fans matter, then see the method. |
| Touching `/about`, `/work`, `/services` titles | They all lead with "fan-led growth" too, but they aren't acquisition pages. Revisit once the two priority pages have settled. |
| Deploying | Netlify auto-build is off. Nothing goes live without you triggering it. |

---

## Sequence and verification

1. Make edits 1, 2 and 6 first. These need no design judgement and no new copy.
2. Run the site locally and check the nav with "Why fans" in place. Screenshot at desktop and mobile widths.
3. You pick Option A or B for edit 3, and approve or reject the added sentence in edit 5.
4. Make edits 3, 4 and 5.
5. Re-run and screenshot the changed sections.
6. Re-run the prerender build so the new titles and links land in the static HTML. **This step is not optional.** Prerendering is what makes the meta changes visible to crawlers.
7. Commit, with the noreply author and committer.
8. **Stop.** No push, no deploy, until you say so.

Estimated: about an hour of work, plus your review time between steps 2 and 3.

---

## What this will and won't do

**Will:** make `/fan-led-growth` reachable and legible to a crawler, and point your homepage at a phrase people actually search for.

**Won't:** produce measurable traffic on its own. Two things still block that, and neither is in this plan:

- **The site isn't live with these changes.** Everything shipped today sits on `origin/main` undeployed. One manual Netlify deploy is still outstanding.
- **There's no measurement.** No SEO tool is authorised on this session and I don't know whether Google Search Console is set up. Without one of those, there is no way to tell whether any of this worked. Getting a tool connected is a bigger lever than any single edit in this document.

---

## Open questions for you

1. Edit 3: Option A (inline link in the hero lede) or Option B (standalone link lower down)?
2. Edit 5: add the sentence, or link "worth more" instead?
3. Speaking: stays in the header? The width argument for moving it has gone away.
4. Is Google Search Console set up for lauracordrey.com? If not, that's worth doing before rather than after.
