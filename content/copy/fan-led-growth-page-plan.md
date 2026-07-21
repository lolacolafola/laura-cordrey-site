# /fan-led-growth — new overview page

Branch: `homepage-lighter`
Date: 21 Jul 2026
Status: built, preview only (noindex, not in sitemap)

## Why this page exists

Cowork's simplified nav leads with a **Fan-led growth** item. Laura chose "a
new overview page" as its destination rather than pointing it at
`/methodology`.

The content problem solved itself: the homepage rebuild cut three sections
whose entire job was explaining what fan-led growth is and why it works. That
is exactly what this page needs to be. **Nothing here is newly written.** Every
line is lifted verbatim from the live homepage (`src/pages/HomePage.jsx` on
`main`), so no new claims are introduced and nothing needs fact-checking.

## Structure and provenance

| Section | Source on the live homepage |
|---|---|
| Hero: "Fans are the growth you already own." | "What it is", section 2 |
| "You've been renting your growth." + "Growth you own, not rent." pull quote | "What it is", section 2 |
| The connective paragraph ending "an engine you own" | "What it is", section 2 |
| "You don't buy fans. You earn them." + 6 benefit cards | "Why fans", section 3 |
| Fan Value estimate card ($560K for a $5M brand) | "Why fans", section 3 |
| "However you got here, fans are the next step." + 4 situation cards | "Why you're here", section 4 |
| Closing CTA row | "Why you're here", section 4 |

The six benefit cards (`whyFans`) and four situation cards (`situations`) are
imported as-is, icons included.

## What this fixes

Cutting those sections was the single biggest lever on homepage density
(~500 words, ten cards). The open worry was that the argument for fan-led
growth disappeared with them. It now has a dedicated home, reachable from the
first item in the nav, which is a better place for it than buried three
screens down a homepage.

## Deliberately not in the sitemap

Like `/home-v2`, this is preview-only until the v2 direction is decided:
- Not in `public/sitemap.xml`, so `scripts/prerender.mjs` skips it
- `noindex, nofollow` and a self-referencing canonical set at runtime

It overlaps `/methodology` in places. If v2 ships, that overlap needs a
decision: either `/methodology` becomes the deeper "how I run it" page with
this as the plain-language front door, or the two merge. **Flagged, not
resolved.**

## Nav

Applied to `/home-v2` and `/fan-led-growth` only. The live nav is untouched.

Cowork's nav, followed exactly:

> Fan-led growth · Work · Services · Speaking · About · **[Get in touch]**

Dropped versus the live nav: Home (the logo does it), Method, AI, Fan Score,
and the LinkedIn icon. Fan Score keeps its homepage Tools section, the close,
and the footer. AI and Method keep their footer links.
