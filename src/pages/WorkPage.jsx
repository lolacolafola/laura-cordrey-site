import { useState } from 'react'
import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, workIndexJsonLd } from '../lib/seo.js'
// The h1 below was carrying clamp(1.8rem,3.2vw,2.75rem) inline, which is
// character-for-character the shared T.h2. CLAUDE.md: import the scale, never
// re-declare it per page — that is exactly how it drifted once before. Same
// rendered value, now sourced from one place.
import { HEAD_W, T } from '../lib/scale.js'
import '../styles/shared.css' // shared .work-card / .work-grid / .section-head styles

// CONTACT_URL and the react-router Link import went with the hero CTA on
// 22 Jul 2026. This page no longer links to /contact directly; the nav, the
// footer and every case study it points at all do.

// Derive unique sector list from the data — order = first-seen across the
// case-study array so editorial control stays in caseStudies.js.
const SECTORS = Array.from(
  new Set(caseStudies.flatMap((cs) => cs.sectors || []))
)

export default function WorkPage() {
  const [active, setActive] = useState('All')

  useDocumentMeta({
    title: 'Case Studies · Fan-led growth work by Laura Cordrey',
    // Trimmed from 176 chars on 22 Jul 2026: the tail was past the ~160 Google
    // shows, so the last two case studies were never visible. Also retargeted
    // from "fan-led growth work" to the problem phrasing people search for.
    description:
      'Thirteen years of turning customers into fans: Ubisoft Delta Company and Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, Claw Mobile.',
    canonical: pageUrl('work'),
    ogType: 'website',
    jsonLd: workIndexJsonLd({ caseStudies }),
  })

  const filtered =
    active === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => (cs.sectors || []).includes(active))

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────
        * Stripped back on 22 Jul 2026, per Laura: eyebrow, one small résumé
        * line, the filter choices. Nothing else.
        *
        * This page was carrying a full hero: an 89px "Receipts, not a résumé."
        * lockup beside a 58-word paragraph and a CTA. On an index page that is
        * the wrong shape. Every other page opens with a big statement, so
        * /work opened like all the others and then made you scroll past it to
        * reach the thing you came for. Here the work IS the hero, and the
        * header's only job is to say what this is and let you filter it.
        *
        * The h1 is kept, and kept as the only one on the page, because the
        * build prerenders every route and the SEO audit checks for exactly one
        * h1 per snapshot. It is just no longer at hero scale: 41px, the same
        * T.h2 step the rest of the site uses for section heads, so it reads as
        * a label rather than a headline.
        *
        * The eyebrow went back to "Selected Work · 2013-2026" on Laura's call.
        * "Receipts, not a résumé" was moved up here when the lockup was cut,
        * on the reasoning that the line was too good to lose; she does not
        * like it, and a line nobody wants is not worth keeping for the pun.
        * What was there before is plain, says what the page is, and carries
        * the date range, which is the useful part.
        *
        * The "Let's talk" CTA went with the lockup. It is in the nav, in the
        * footer, and at the foot of every case study this page links to, so a
        * fourth instance above the fold was asking before showing anything. */}
      {/* The red radial halo top-right came out on 22 Jul 2026, per Laura.
        * It was sized for the old hero: a 760px glow behind an 89px headline
        * and a two-column lockup. Against a 375px header it had nothing left
        * to sit behind, so it read as a red smudge above the cards rather
        * than as lighting. The cards carry their own artwork; the header does
        * not need a light source. */}
      <section style={{ position: 'relative', background: '#0E0B09', color: '#EFE9DC', overflow: 'hidden' }}>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,64px) clamp(32px,4vw,48px)' }}>
          <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700, marginBottom: 'clamp(14px,1.8vw,20px)' }}>
            Selected Work · 2013–2026
          </span>

          {/* The one line. Keeps the sector words the old paragraph carried
            * ("fan-led growth", "gaming", "mobility", "telco") because those
            * are what this page ranks on; drops the three proof numbers, which
            * are all restated on the cards directly below it. */}
          {/* 30ch + text-wrap: balance, per Laura 23 Jul 2026, to pull "and
            * telco" up onto the second line. It was 26ch, which wrapped to
            * three lines with "and telco." stranded alone on the third.
            *
            * The width alone cannot do it. Greedy wrapping at any width that
            * fits "across AAA gaming, mobility and telco." on line 2 (767px)
            * also fits "across" on line 1 (776px) — a 9px window, far too
            * fragile to ship, and it would flip on any font-loading or browser
            * difference. `balance` asks the browser to even the two lines
            * instead, which lands on exactly the wanted break and holds at
            * 28ch, 30ch and 34ch rather than at one knife-edge value.
            *
            * Degrades safely: without balance support it wraps greedily to
            * "…growth across / AAA gaming, mobility and telco." Still two
            * lines, still "and telco" on the second, just a different split.
            * Same property the /services h2 already uses. */}
          <h1 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.12, letterSpacing: '-.025em', margin: 0, maxWidth: '30ch', textWrap: 'balance' }}>
            Thirteen years of fan-led growth across AAA gaming, mobility and&nbsp;telco.
          </h1>

          {/* Added 23 Jul 2026. The page was 261 words, nearly all of it inside
            * the cards, with no sentence of its own saying what the work is —
            * thin for the page twelve others link to as the proof.
            *
            * This does NOT reinstate the paragraph that was cut above. That one
            * restated the cards' proof numbers, which is why it went. This says
            * what the seven have in common, which the cards cannot say
            * individually, and names no figures at all.
            *
            * It also deliberately carries no count. A first draft opened
            * "Seven builds"; Laura cut it. Right, and it would have been a
            * number to remember to update the day an eighth case study lands.
            *
            * Sits between the h1 and the filters so it is read before the page
            * turns into a control surface. Measured 9.95 on the #0E0B09 band.
            *
            * 58ch, widened from 54ch on 23 Jul 2026 per Laura, to break after
            * "care," and carry "it returned" up onto the second line. 54ch ran
            * to three lines and left "it returned." alone on the last. At 58ch
            * it is exactly two:
            *   Different products, same job every time: find the people who already care,
            *   build something worth their word of mouth, and prove what it returned.
            * Unlike the h1 above, this one needed no `balance` — greedy
            * wrapping lands on the wanted break by itself. 62ch overshoots and
            * pulls "build" up, so this is a real ceiling, not a round number. */}
          <p style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(239,233,220,.78)', maxWidth: '58ch', margin: 'clamp(16px,2vw,22px) 0 0' }}>
            Different products, same job every time: find the people who already
            care, build something worth their word of mouth, and prove what
            it&nbsp;returned.
          </p>

          {/* Filters sit inside the header band so they read as part of the
            * header stratum, not a separate section on the light ground. */}
          <div className="work-filters" role="tablist" aria-label="Filter case studies by sector" style={{ marginTop: 'clamp(28px,3.4vw,40px)', marginBottom: 0 }}>
            {['All', ...SECTORS].map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active === s}
                className={`btn btn--pill ${active === s ? 'btn--primary' : 'btn--ghost'}`}
                onClick={() => setActive(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GRID · dark ground, hairline top ─────────────────
        * Case-study cards live on the same dark ground as the hero (no
        * light/dark snap); a single hairline separates the two strata. */}
      <section style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(28px,3vw,40px) clamp(24px,5vw,64px) clamp(48px,6vw,80px)' }}>
          <div className="work-grid">
            {filtered.map((cs) => (
              <WorkCard key={cs.id} caseStudy={cs} slot="work" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
