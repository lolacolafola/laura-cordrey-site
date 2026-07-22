# Light vs dark for "thought piece" pages — critique of the idea

Date: 22 Jul 2026
Status: critique + recommendation. Pilot built on `/fan-led-growth` only.

Laura's proposal: make the thought-piece pages light where the homepage is
dark, so they stop feeling like the homepage. Her report: *"if I arrive on this
page I think I'm back on the HP."*

---

## The diagnosis is right, and the problem is bigger than one page

I measured the ground colour of the first viewport on all twelve routes:

| Ground | Routes |
|---|---|
| **Dark** (`#0E0B09` / `#15110F`) | `/` · `/fan-led-growth` · `/methodology` · `/services` · `/about` · `/speaking` · `/work` · `/faq` · `/ai` |
| **Cream** (`#EFE9DC` / `#FCFAF3`) | `/contact` · `/fan-score` · `/fan-value` |

**Nine of twelve pages open on the same ground.** This isn't a `/fan-led-growth`
problem, it's a site-wide one: the site currently has no way of telling you what
kind of page you have landed on.

And the two "different" darks aren't different. Measured as RGB distance:

| Pair | Distance | Verdict |
|---|---|---|
| `#0E0B09` vs `#15110F` — the two darks | **11** | not a difference |
| `#EFE9DC` vs `#FCFAF3` — the two creams | **31** | barely a difference |
| `#2D2723` espresso vs `#15110F` | **38** | not enough to be a third ground |
| **dark `#15110F` vs cream `#EFE9DC`** | **369** | the only real signal available |

So the instinct is not just right, it is the *only* strong lever in the palette.
Light versus dark is the one axis with enough range to say "different kind of
page" before a visitor has read a word. Anything subtler than that has already
been tried in this palette and does nothing.

## But cream already means something

This is the real cost, and it's worth naming clearly. The three cream pages are
`/contact`, `/fan-score` and `/fan-value` — which is *exactly* the set of
interactive pages. Right now the site reads:

> **dark = something you read · cream = something you use**

Moving thought pieces to cream overloads that. It also spends Laura's brightest,
highest-attention ground on long reads, when it is currently reserved for
conversion moments.

**My view: take the cost anyway.** Three reasons:

1. The tools re-identify themselves within about a second regardless of ground —
   you land on `/fan-value` and there are sliders, on `/fan-score` and there's a
   quiz. Content disambiguates them faster than colour does.
2. Long-form reading genuinely belongs on light ground. That is the editorial
   convention because it holds up better over hundreds of words.
3. There is no third option. The measurements above rule out espresso and a
   second cream. It's cream or nothing.

## The part the colour flip will NOT fix

Being straight about this: `/fan-led-growth` feels like the homepage partly
because **I made it so yesterday.** The brief then was "align it with the rest of
the site", and I matched the homepage hero exactly — same centred layout, same
gold eyebrow, same 84px `h1` with a red `mark`, same lede beneath it, same dark
ground. Structurally it *is* the homepage hero.

Flip only the ground and it will read as *the homepage in light mode*. The
architecture has to change too. So the proposal should be a mode, not a colour:

**Editorial mode = light ground + an editorial hero + a remapped accent.**

- **Light ground.** Cream dominant, with one or two dark bands as inversions
  rather than the other way round.
- **Editorial hero.** Left-aligned, not centred. The centred hero is the
  homepage's signature and should stay unique to it. Keep the large `h1` — the
  hierarchy release we just fixed is worth keeping — but set it in ink on cream
  rather than cream on ink.
- **Remapped accent.** This one is forced, not stylistic: **gold `#D4C896`
  measures 1.39:1 on cream.** It is unusable there, and the gold eyebrow I
  applied yesterday cannot come along. The site's existing red is only 4.32:1 at
  eyebrow size, itself under the 4.5 minimum. The clean answer is already in
  `tokens.css`: **`--accent-deep #8E2520` measures 7.13:1 on cream, 8.26 on
  bone.** Use it for small text on light grounds.

## Which pages are "thought pieces"

Needs Laura's call. My read:

| Page | Editorial (light)? | Why |
|---|---|---|
| `/fan-led-growth` | **Yes** | the definitional essay, the front door |
| `/methodology` | **Yes** | the long explanation of the method |
| `/ai` | **Yes** | a point of view piece |
| `/about` | Probably | a personal narrative, reads like an essay |
| `/faq` | Probably | long-form reading, and light suits a reference page |
| `/work` · `/services` · `/speaking` | **No** | portfolio, offer and credential pages. These are showcase, and dark is doing real work for the imagery |
| `/` | **No** | dark is the homepage's signature. Protecting it is the whole point |

That split would leave: homepage and showcase pages dark, thought pieces light,
tools light-and-interactive. Three legible categories instead of one.

## Risks worth holding

- **Cream fatigue.** If nine dark pages become five dark and seven light, the
  homepage's dark stops being a signature and becomes just another option. The
  split above deliberately keeps a solid dark block.
- **The two creams are 31 apart**, which is not enough to separate "thought
  piece cream" from "tool cream" on its own. Don't rely on it.
- **Every existing light-ground element needs a contrast re-check**, not just
  the eyebrow. Gold is the obvious casualty; there will be others.

---

## Recommendation

**Do it — as a mode, not a repaint, and pilot it on one page first.**

1. Build `/fan-led-growth` in editorial mode. One page, fully reversible, and
   it's the page already in flight.
2. Look at it next to the homepage. If the "am I back on the homepage?" reaction
   is gone, roll the mode out to `/methodology` and `/ai`.
3. Only then decide on `/about` and `/faq`.

The thing to judge on the pilot is not whether the page is pretty. It is
whether, two seconds after landing, you know you are somewhere else.

---

## PILOT BUILT — `/fan-led-growth`, 22 Jul 2026

**73% of the page is now light.** Band sequence, top to bottom:

| Band | Ground | |
|---|---|---|
| 1. What it is | cream `#EFE9DC` | hero, left-aligned |
| 2. The evidence | bone `#FCFAF3` | hairline top and bottom |
| 3. Why fans | cream | six cards in bone |
| 4. What to do about it | **dark `#15110F`** | inversion — the Fan Engine moment |
| 5. Who it's for | cream | four cards in bone |
| 6. Where to start | **deep `#0E0B09`** | inversion — the close |

Two dark bands, both earned: the Fan Engine hand-off and the close. On an
otherwise light page the close's dark ground does the work the homepage needs a
full red band for.

The hero pull-quote ("Growth you own, not rent.") stays a dark card and is now
the strongest single object on the page — an inversion inside an inversion.

### Two invisible-text bugs the contrast audit caught

Both were caused by the same thing, and it's the trap in any ground flip: the
page root now sets `color: #15110F`, so **every dark band has to re-declare its
text colour or it inherits ink onto near-black.**

- **"Knowing fans matter is the easy part."** — the whole handoff heading, ink
  on `#15110F`. Contrast **1.0:1**. Completely invisible.
- **"Growth you own, not rent."** — the hero pull-quote, same cause, **1.1:1**.

Fixed by setting `color` on the dark `<section>` elements themselves rather than
relying on inheritance. Worth knowing before rolling the mode out to
`/methodology` and `/ai`: audit contrast after the flip, don't assume.

### Accent remap applied

- Eyebrows on light grounds → `deep #8E2520` (**7.13:1**). The gold I applied
  yesterday measures **1.39:1** on cream and could not come along.
- `Eyebrow` gained a third tone. The component now documents which tone belongs
  on which ground, with the measurements, so this can't be got wrong by eye.
- The pull-quote's "own" → `#E4695E`, a lighter red that passes on the dark card
  where `#C8362B` does not.

### Left standing, deliberately: a site-wide accent problem

`--accent #C8362B` fails AA as small text **on both grounds** — 4.32:1 on cream,
3.59:1 on dark. It affects the red primary button ("See what your fans are
worth") and the inline `<mark>` highlights, on this page and on **every other
page including the homepage**. I have not touched it: changing the primary red
is a brand decision, not a page fix.

The fix, when you want it, is the pair already proven on this page:
`#8E2520` for small red text on light, `#E4695E` on dark. Large display text
(the `mark` in an `h1`) is fine as-is at 3.0.

### Verified

Lint clean. `npm run build` snapshots 19/19 routes; the FLG snapshot holds 706
words, JSON-LD intact (DefinedTerm, WebPage, FAQPage), zero baked-in hidden
state. No horizontal overflow at 375px; hero left-aligned, all three grids and
both close CTAs collapse to one column. Contrast audit re-run after the fixes:
only the known site-wide `--accent` cases remain.

### Next, if you like it

Roll the mode to `/methodology` and `/ai` (both currently dark, both clearly
thought pieces), then decide on `/about` and `/faq`. Leave `/work`,
`/services`, `/speaking` and the homepage dark so the split stays legible.
