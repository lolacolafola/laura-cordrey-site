import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import { postLead } from '../lib/forms.js'
import { HEAD_W, T, SECTION_PAD, INNER } from '../lib/scale.js'
import Eyebrow from '../components/Eyebrow.jsx'
import './HomePage.css'

const CONTACT_URL = '/contact?intent=consulting'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// ─── Hero portrait switch ────────────────────────────────────────────────
// null → centred, type-led hero (current: there is no hero-grade portrait in
// the library yet, and a weak one costs more than no image at all).
//
// To add one when the shoot happens, set this to a path under /public, e.g.
//   const HERO_PORTRAIT = 'portraits/laura-hero.jpg'
// That single line switches the hero to copy-left / portrait-right and
// left-aligns the copy. Nothing else needs changing. Use a 4:5 portrait.
const HERO_PORTRAIT = null

/* Homepage — lighter rebuild (21 Jul 2026, branch `homepage-lighter`).
 *
 * Structure, 8 beats:
 *   Hero > Trusted by > About > Three ways I help > Selected work
 *   > Speaking > In their words > Tools > Let's talk
 *
 * What changed and why. Feedback was that the page felt dense. Measured
 * against anastasiashtompel.com the cause was NOT small type — this page's
 * headings were 36-60% LARGER. It was four other things:
 *   1. Weight — every heading at 800. Now 700 (see HEAD_W).
 *   2. No hierarchy release — seven h2s within shouting distance of the
 *      hero. The hero-to-section ratio was 1.5x; it is now ~2.4x, so
 *      sections genuinely recede and the eye gets somewhere to rest.
 *   3. Word count — 1,083 words vs the benchmark's 752. The two education
 *      sections ("What it is", "Why fans", "Why you're here", ~500 words of
 *      six + four cards) are cut. /methodology and /ai carry that argument
 *      now, and the hero's second CTA routes there.
 *   4. Card-grid monotony — four consecutive "kicker > h2 > lede > grid of
 *      bordered cards" sections. Broken up by the full-bleed speaking band
 *      and the centred testimonial.
 *
 * Type scale lives in T below rather than being re-typed inline per section,
 * which is what made the previous version hard to restyle.
 */

// Type scale, section padding and the inner measure now live in
// src/lib/scale.js so other pages share them rather than copying them. Values
// are unchanged; see that file for why it was extracted.

const CLIENT_LOGOS = [
  { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 118 },
  { src: 'logos/amazon-game-studios.png', alt: 'Amazon Game Studios', maxw: 108 },
  { src: 'logos/blablacar-vert.png', alt: 'BlaBlaCar', maxw: 118 },
  { src: 'logos/us-mobile-mark.png', alt: 'US Mobile', maxw: 118 },
  { src: 'logos/azarus-vert.png', alt: 'Azarus / Animoca', maxw: 118 },
]

// Three ways in. Each card carries its own brand ground (gold, espresso,
// cream) rather than decoration: the gold card is the flagship offer,
// and the three grounds give hierarchy and variety with nothing invented.
//
// The card itself is NOT a link. "Fix one thing now" covers three separate
// services, so a single card-wide click target could not honestly resolve to
// one destination. Each card carries a real button instead.
//
// The cards carry no CTA of their own. One button sits underneath the group
// instead, because "Fix one thing now" covers three separate services and a
// per-card link could not resolve to a single honest destination.
const WAYS = [
  // The kicker was 'Build the whole engine' until 22 Jul 2026, which described
  // the deliverable and said nothing about whose method it is. The \u2122 was
  // carrying the entire ownership signal on its own, and a trademark symbol is
  // a legal mark, not something a skimming reader decodes as "she invented
  // this".
  //
  // The KICKER is where this had to change, not the copy: title and kicker are
  // the permanent layer, and .svcard-copy only opens on hover (and on touch /
  // reduced-motion, where it is open from the start). Ownership stated only in
  // the copy would be invisible to everyone who does not hover.
  //
  // Wording matches what the page already says twice further down, "a method
  // of my own" and "one method I built", so the card stops being the one place
  // the authorship goes missing.
  //
  // DO NOT write that the Fan Engine is trademarked, registered, or protected.
  // A first draft of this card said "I built it, named it and trademarked it";
  // Laura caught it. The mark is not registered. The claim to make is
  // AUTHORSHIP, which is true and is the whole point: she built the method.
  // Nothing about registration, and nothing about what does or does not exist
  // elsewhere.
  //
  // Nor "and named", nor "My own method, built from scratch" at all. Three
  // drafts kept adding a sentence to the copy to say what the KICKER already
  // says, on a layer most readers never open. "The method I built" sits above
  // the copy, permanently visible, and does the whole job. The copy went back
  // to describing the offer, which is its actual job.
  {
    no: '01',
    tone: 'gold',
    title: 'The Fan Engine',
    kicker: 'The method I built',
    copy: 'The full build. Brand, product, community and growth run as one system, plugged into your company and measured end to end. For teams ready to own their growth, not rent it.',
  },
  {
    no: '02',
    tone: 'espresso',
    title: 'Fix one thing now',
    kicker: 'Move fast on one problem',
    copy: 'One thing, moved fast: a sentiment turnaround, a fan or referral programme, or a launch moment that converts. With the baselines to prove it worked.',
  },
  {
    no: '03',
    tone: 'cream',
    title: 'Advisory',
    kicker: 'Expertise on call',
    copy: 'Senior fan-led growth leadership without the full-time hire. In the room when you need it, as much or as little as you need.',
  },
]

// Three headline wins. The fourth (Azarus +80% MAU) moved to /work to keep
// this band at three — part of the density cut.
const CASES = [
  { value: 'Sold out', unit: '', label: 'a $129 fan drop, in under 3 hours', client: 'US Mobile', img: 'case-studies/homepage/hp-kpi-us-mobile-sim.png', alt: 'US Mobile Dark Star drop' },
  { value: '60M+', unit: '', label: 'UGC reach, at $0 media spend', client: 'Ubisoft', img: 'case-studies/homepage/hp-kpi-ubi.jpg', alt: 'Ubisoft creator programs' },
  // "across" dropped: the label needed 270px against 289px available, so it
  // wrapped on any window under ~1196px. Grid rows are equal height, so that
  // one wrap made all three cards taller. Now ~225px, in line with the other
  // two, which hold one line down to ~950px.
  { value: '85%', unit: '', label: 'positive sentiment, 15M players', client: 'Ghost Recon', img: 'case-studies/homepage/hp-kpi-ghost-recon.jpg', alt: 'Ghost Recon community' },
]

export default function HomePage() {
  // The live homepage. Full SEO: real title, canonical to "/", author schema.
  useDocumentMeta({
    // Retargeted 22 Jul 2026. The old title sold "Fan-Led Growth Consultant",
    // a term with no commercial search demand whose SERP is ceiling fans and
    // the UK football fan-led review. This one leads with the problem people
    // actually search for. Client order is US-first: Ubisoft and Amazon Games
    // carry the most recognition with a US buyer, and names at the front
    // survive truncation. Description held under 160 chars so the client list
    // stays inside the visible window in search results and link previews.
    title: 'Laura Cordrey | I turn your customers into fans',
    description:
      "Your customers are worth more than you're getting. I turn them into fans who stay, spend more and bring others in. Ubisoft, Amazon Games, US Mobile, BlaBlaCar.",
    canonical: pageUrl(''),
    ogType: 'website',
    jsonLd: authorJsonLd(),
  })

  // Entrance visuals, fired once when an element first scrolls into view:
  // the tool gauge draws itself and its bars rise, and a sheen sweeps across
  // each service card.
  //
  // The sheen is deliberately NOT on hover. A light sweep is the strongest
  // "click me" cue there is, and the service cards do not navigate, so on
  // hover it would promise something the card cannot deliver. On entrance it
  // is ambient motion, which the design rules allow anywhere.
  //
  // Skipped entirely under prefers-reduced-motion.
  const revealRef = useRef(null)
  useEffect(() => {
    const el = revealRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Replays a tool card's CSS visualisation: the gauge draw and the bar
    // rise, keyed off .is-live. `restart` (hover) clears and re-adds the class
    // on the next frame to run it from the top; entrance just adds it once.
    // Guarded so a rapid re-hover does not stutter.
    //
    // The number is deliberately NOT animated: counting it up read as too much
    // motion. The gauge and bars carry it.
    const fireViz = (tool, restart) => {
      if (restart) {
        if (tool.dataset.replaying) return
        tool.dataset.replaying = '1'
        tool.classList.remove('is-live')
        void tool.offsetWidth // reflow so the removal commits before re-add
        window.setTimeout(() => { delete tool.dataset.replaying }, 1400)
      }
      tool.classList.add('is-live')
    }

    // Service-card sheen still fires once on entrance only (see the .svcard
    // note): a sweep is a "click me" cue and those cards do not navigate.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          if (e.target.classList.contains('tool')) fireViz(e.target, false)
          else e.target.classList.add('is-live')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.35 }
    )
    el.querySelectorAll('.tool, .svcard').forEach((t) => io.observe(t))

    // Hover replays the whole visualisation. Honest under the hover rule: the
    // card FRAME never moves, so nothing lifts or scales toward the cursor and
    // no false "clickable" promise is made. The button inside is the target.
    const tools = [...el.querySelectorAll('.tool')]
    const enter = (e) => fireViz(e.currentTarget, true)
    tools.forEach((t) => t.addEventListener('pointerenter', enter))

    return () => {
      io.disconnect()
      tools.forEach((t) => t.removeEventListener('pointerenter', enter))
    }
  }, [])

  // Scroll-reveal: any [data-rev] element below the fold starts hidden and reveals once it scrolls in.
  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const h0 = window.innerHeight || 800
    const els = root.querySelectorAll('[data-rev]')
    els.forEach((el) => {
      if (el.getBoundingClientRect().top >= h0 * 0.9) el.classList.add('cin-hide')
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('cin-hide')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Homepage contact form. Posts to the existing Netlify `contact` form using
  // a strict subset of its registered fields (name, email, message, intent,
  // source_page, bot-field) — so index.html needs no new registration.
  // The full branching form still lives on /contact for qualified enquiries.
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '', 'bot-field': '' })
  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    if (form['bot-field']) return // honeypot tripped, drop silently
    postLead({
      form: 'contact',
      name: form.name,
      email: form.email,
      message: form.message,
      intent: 'consulting',
      source_page: 'homepage',
    })
    setSent(true)
  }

  return (
    <div
      ref={(n) => { rootRef.current = n; revealRef.current = n }}
      className="cinv2"
      style={{
        background: '#15110F',
        color: '#EFE9DC',
        fontFamily: 'Manrope, system-ui, sans-serif',
        fontWeight: 500,
        lineHeight: 1.55,
      }}
    >
      {/* ─── 1 · HERO ─── */}
      <section id="top" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#0E0B09' }}>
        {/* Two glows, both warm, both off-centre so the hero has a light
          * source rather than a vignette. Raised from .15/.07: at those values
          * they read as a rendering artefact rather than a deliberate glow.
          * The ceiling is contrast, not taste — the cream headline and the red
          * `stay, pay, bring more` sit on top of the red one, and every point
          * of alpha lifts the ground under them.
          *
          * Measured on the composited ground, worst point under each word:
          *   cream h1        13.85  (needs 3.0 at 84px)
          *   mark "stay"      3.43
          *   mark "pay"       3.24  ← worst
          *   mark "bring more" 3.27
          *   lede 16.8px     14.51  (needs 4.5)
          * On the flat #0E0B09 the marks measured 3.75. The glow spends most
          * of that headroom: .26 is near the ceiling, and .30+ puts "pay"
          * under 3.0. If this needs to go brighter, the marks move to
          * #E4695E first (the known-good red on dark), not the glow. */}
        <div className="heroglow" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '78vw', height: '78vw', maxWidth: 900, maxHeight: 900, background: 'radial-gradient(circle,rgba(200,54,43,.26) 0%,rgba(200,54,43,.08) 45%,rgba(200,54,43,0) 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-25%', left: '-12%', width: '62vw', height: '62vw', maxWidth: 720, maxHeight: 720, background: 'radial-gradient(circle,rgba(212,200,150,.13) 0%,rgba(212,200,150,.04) 45%,rgba(212,200,150,0) 68%)', pointerEvents: 'none' }} />

        {/* Type-led hero. Centred deliberately: left-aligned copy with an
          * empty right half read as "the image failed to load" rather than
          * "text-only by design". Centring removes the hole, so nothing looks
          * missing, and lets the hook run bigger and wider.
          *
          * TO ADD A PORTRAIT LATER: set HERO_PORTRAIT at the top of this file
          * to an image path. That is the only change needed — the layout
          * switches to copy-left / portrait-right and the copy left-aligns.
          * No redesign. */}
        <div
          className={HERO_PORTRAIT ? 'hero-split' : 'hero-centred'}
          // Top padding clears the fixed 69px nav and keeps a ~50px gap above
          // the eyebrow. The old 52-80px worked at /home-v2 (solid nav + a
          // page-offset), but as the real homepage the nav floats over the
          // hero with no offset, so this padding is the only clearance. The
          // 116px floor protects short screens.
          style={{ position: 'relative', ...INNER, padding: 'clamp(116px,13.5vh,144px) clamp(20px,5vw,64px) clamp(40px,4.5vw,60px)' }}
        >
          <div className="hero-copy">
            <Eyebrow>Fan-led growth for consumer brands</Eyebrow>
            <h1 style={{ fontWeight: HEAD_W, fontSize: T.h1, lineHeight: 1.0, letterSpacing: '-.032em', margin: 'clamp(18px,2.4vw,26px) 0 0', maxWidth: '17ch' }}>
              Fans who <mark>stay</mark>, <mark>pay</mark>,<br />and <mark>bring more</mark>.
            </h1>
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(239,233,220,.8)', maxWidth: '52ch', margin: 'clamp(20px,2.6vw,28px) 0 0' }}>
              The customers you already paid for are worth far more than you&rsquo;re getting. I build the belonging and advocacy that turn them into fans, so they stay, spend more, and bring new customers with them.
            </p>

            {/* The signature line — "Laura Cordrey · Fan-led growth expert" —
              * was cut 23 Jul 2026 on feedback Laura received. It sat four
              * lines under an eyebrow already reading "Fan-led growth for
              * consumer brands", so the hero said "fan-led growth" twice in
              * its two smallest pieces of type and the second one read as a
              * restatement of the first. The name is in the nav and the
              * footer; the expertise is the whole page.
              *
              * Its only CSS rule (.cinv2 .hero-centred .hero-sig) went with
              * it — .hero-sig has no other user. */}

            <div style={{ marginTop: 'clamp(26px,3.2vw,36px)' }}>
              <a href="#contact" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, background: '#C8362B', color: '#FCFAF3', fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease' }}>
                Get in touch
              </a>
            </div>
          </div>

          {HERO_PORTRAIT && (
            <figure className="hero-portrait" style={{ margin: 0 }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 3, overflow: 'hidden', background: '#15110F', borderTop: '3px solid #C8362B' }}>
                <img src={BASE + HERO_PORTRAIT} alt="Laura Cordrey" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </figure>
          )}
        </div>

        {/* ─── 2 · TRUSTED BY ───
          * Inside the hero section, not after it. Matching the background was
          * not enough on its own: the hero carries two radial glows, so a
          * separate sibling underneath sat on flat #0E0B09 and read as a
          * different colour. As a child it shares the ground and the glows. */}
        <div className="logoband" style={{ position: 'relative', ...INNER, padding: '0 clamp(20px,5vw,64px) clamp(34px,4vw,52px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px,1.8vw,20px)' }}>
          {/* The small gold rule from the design system
            * (.about-strip__clients::before in shared.css): 48x1px --edge,
            * the editorial break that sits above a credentials strip. */}
          <span aria-hidden="true" style={{ display: 'block', width: 48, height: 1, background: 'var(--edge)' }} />
          {/* Cowork's label. "Thirteen years..." was here, but the About
            * section opens with "Thirteen years building brand, community and
            * growth" two screens later, so it read as a repeat. */}
          <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 700 }}>
            Trusted by teams at
          </span>
          {/* Logos down from 46px to 36px, in proportion with the hook coming
            * down from 102px to 84px: they are a supporting credential, not a
            * second headline. */}
          <ul className="logoshelf" style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%', maxWidth: 700, display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', alignItems: 'center', justifyItems: 'center', gap: 'clamp(12px,2vw,24px)' }}>
            {CLIENT_LOGOS.map((l) => (
              <li key={l.alt} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', opacity: .72 }}>
                <img src={BASE + l.src} alt={l.alt} style={{ maxHeight: 36, maxWidth: Math.round(l.maxw * 0.8), width: 'auto', objectFit: 'contain' }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 3 · ABOUT ─── */}
      <section id="about" className="on-light" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div className="grid-2" style={{ ...INNER, padding: SECTION_PAD, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5.5vw,72px)', alignItems: 'center' }}>
          <div data-rev>
            <Eyebrow tone="deep">The person behind it</Eyebrow>
            {/* First person, to match the copy under it. "Meet Laura" was
              * third person sitting on top of "I've worked the whole machine",
              * so the section changed voice halfway down. */}
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0', color: '#15110F' }}>
              Hi, I&rsquo;m Laura.
            </h2>
            {/* Option D, content/copy/copy-homepage-v2-about.md. Cowork's
              * sequencing (past > now > two-beat close) with "I've worked the
              * whole machine" rescued from the live homepage: the roster says
              * where she has been, that line says what she can see. The
              * remaining texture ("complicated tech, crowded roadmaps...")
              * stays on /about. Region claim confirmed by Laura 21 Jul 2026. */}
            <p style={{ fontSize: T.lede, lineHeight: 1.65, color: '#4A423B', margin: 'clamp(18px,2.2vw,24px) 0 0', maxWidth: '46ch' }}>
              Thirteen years building brand, community and growth where fans are loudest, for global brands and startups across North America and EMEA: Ubisoft, Amazon Games and BlaBlaCar, then VP Marketing of a US startup acquired by Animoca. I&rsquo;ve&nbsp;worked the whole machine.
            </p>
            <p style={{ fontSize: T.lede, lineHeight: 1.65, color: '#15110F', fontWeight: 600, margin: 'clamp(18px,2vw,24px) 0 0', maxWidth: '46ch' }}>
              Now I run my own consultancy for fan-led growth, bringing what worked in those rooms together with a method of my own: the <mark>Fan Engine<span className="tm">™</span></mark>. Your fans do the selling. I can prove the&nbsp;return.
            </p>
            <div style={{ marginTop: 'clamp(22px,2.6vw,30px)' }}>
              <Link to="/about" className="btnink" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '.98rem', padding: '14px 26px', borderRadius: 3, textDecoration: 'none' }}>
                More about me
              </Link>
            </div>
          </div>
          {/* 4:5 as on the original homepage: taller and narrower suits a
            * standing figure. Capped at 400px so it does not fill the whole
            * column — at full column width the 4:5 ratio made it ~675px tall,
            * which towered over the text beside it. */}
          <figure data-rev style={{ margin: '0 auto', width: '100%', maxWidth: 400 }}>
            {/* No red top rule: it is a photograph, the image is the content.
              * A rule on a photo adds nothing, same call as the work cards. */}
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 3, overflow: 'hidden', background: '#15110F' }}>
              {/* The mic shot rather than the E3 stage one: its dark ground and
                * warm browns sit in the espresso/red/cream palette, where the
                * E3 frame's green and tan backdrop fought it. */}
              <img src={BASE + 'portraits/laura-ubi-xp-2019-v2.jpeg'} alt="Laura Cordrey speaking at Ubisoft XP 2019" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%', display: 'block' }} />
            </div>
          </figure>
        </div>
      </section>

      {/* ─── 4 · THREE WAYS I HELP ───
        * Flip cards. Each card is a real <Link>, so hover motion is honest
        * (CLAUDE.md design rules): it moves under the cursor and it navigates
        * on click. Keyboard focus flips the card too. Both faces are in the
        * DOM for prerender/SEO. Under (hover:none) and reduced-motion the
        * flip is disabled and the back face stacks below the front. */}
      <section id="services" style={{ background: '#1F1A17' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ textAlign: 'center', maxWidth: '58ch', margin: '0 auto clamp(34px,4vw,52px)' }}>
            <Eyebrow>Three ways I help</Eyebrow>
            <hr style={{ width: 46, height: 3, background: '#C8362B', border: 'none', margin: '14px auto 20px' }} />
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(239,233,220,.74)', margin: 0 }}>
              It runs on one method I built: the Fan Engine. Take the whole thing, or fix one part.
            </p>
          </div>

          <div className="svc-grid">
            {WAYS.map((w) => (
              <div key={w.no} className={`svcard svcard--${w.tone}`} data-rev>
                {/* Nothing ever fades OUT. The number, title and kicker are
                  * permanent; the copy simply appears beneath them. It holds
                  * its layout space at rest so the card never resizes, which
                  * means no overlap is possible and nothing has to be timed
                  * against anything else. */}
                <span className="svcard-no">{w.no}</span>
                <div className="svcard-body">
                  <span className="svcard-title">{w.title}</span>
                  <span className="svcard-kicker">{w.kicker}</span>
                  <span className="svcard-copy"><span>{w.copy}</span></span>
                </div>
              </div>
            ))}
          </div>

          {/* The section's single CTA, a real button under the group rather
            * than one per card. The three cards describe the offers; this is
            * the one place to go for all of them. */}
          <div data-rev style={{ textAlign: 'center', marginTop: 'clamp(32px,4vw,46px)' }}>
            <Link to="/services" className="tlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#D4C896', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.03em', textDecoration: 'none', borderBottom: '1px solid rgba(212,200,150,.3)', paddingBottom: 3 }}>
              See all services <span className="ar" aria-hidden>→</span>
            </Link>
          </div>

          {/* No second link to /fan-led-growth under "See all services". This
            * section gets one exit, and it is the services one. "Why fans" is
            * the first nav item on every page, so the route stays one click
            * away; /methodology carries the remaining body link. */}
        </div>
      </section>

      {/* ─── 5 · SELECTED WORK ─── */}
      <section className="on-light" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,48px)' }}>
            <Eyebrow tone="deep">Selected work</Eyebrow>
            <hr style={{ width: 46, height: 3, background: '#C8362B', border: 'none', margin: '14px auto 20px' }} />
            {/* Was "My biggest wins, so far." Laura, 23 Jul 2026: "they are not
              * necessarily my biggest, just some of my best." She is right, and
              * it is an accuracy problem rather than a tone one.
              *
              * "Biggest" claims a ranking this band cannot support. A $129 drop
              * at $32K is not the biggest thing on this site by revenue — /work
              * carries a platform acquired by Animoca, 500K peak viewers and
              * 50M+ on Siege. And the CASES array above says outright that a
              * fourth card was moved to /work "to keep this band at three", so
              * these are a SELECTION, not a top three.
              *
              * "Best" is subjective, so it is always defensible, and "some of"
              * says selection out loud. "So far" is Laura's and stays; it adds
              * the note that the list is still growing.
              *
              * It briefly read "Some of my best, so far." — "work" was dropped
              * to avoid echoing the "Selected work" eyebrow above. Laura asked
              * for it back for clarity and she was right; that objection was
              * the /about echo rule applied where it does not fit.
              *
              * The /about echoes were distinctive PHRASES repeated in prominent
              * positions ("people fall for" in a lede and an h2, "Go big or go
              * home" as both kicker and sign-off). "Work" is a generic noun,
              * and the site already repeats those between eyebrow and heading
              * without any trouble: "Community building & sentiment" over "I
              * catch a community before it turns", "Speaking" over "A key
              * speaker at…".
              *
              * Clarity wins the trade. "Some of my best" leaves "best" dangling
              * — best what? — and that bites hardest when the heading is read
              * out of context: skimming past a small uppercase eyebrow, or a
              * screen reader jumping heading to heading. */}
            {/* textWrap balance + the nbsp both earn their place. Adding
              * "work" pushed this to two lines on mobile and it broke as
              * "Some of my best work, so / far." — splitting "so far" and
              * orphaning "far." on its own line. The nbsp keeps "so far"
              * whole; balance evens the two lines instead of filling the
              * first and dumping the remainder. Same pair of properties the
              * /work h1 uses. */}
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 0, color: '#15110F', textWrap: 'balance' }}>
              Some of my best work, so&nbsp;far.
            </h2>
          </div>

          {/* Static cards, not links. Each shows a single brand's headline
            * stat but the only destination is the /work index, so a per-card
            * link promised a case study it could not deliver, which confused
            * a visitor. The one route out is the "See all work" link below.
            * Being non-links, they also drop the hover motion (hover honesty). */}
          {/* Capped narrower and centred, like the tools grid, so the cards
            * read a touch smaller and in step with the rest of the page rather
            * than the widest thing on it. Everything scales proportionally. */}
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(14px,1.6vw,20px)', maxWidth: 960, margin: '0 auto' }}>
            {CASES.map((c) => (
              <div key={c.client} className="casec" data-rev>
                <figure style={{ margin: 0, aspectRatio: '16 / 10', overflow: 'hidden', background: '#15110F' }}>
                  <img src={BASE + c.img} alt={c.alt} loading="lazy" />
                </figure>
                <div style={{ padding: 'clamp(18px,1.8vw,24px)', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {/* Trimmed to sit on the now-smaller card: clamp(1.5rem,2.3vw,
                    * 2rem) was carried at full size while the cards shrank
                    * (viewport-based, not card-based), so it read proportionally
                    * large. Now ~25.6px at 1280 vs the old 29px. */}
                  <span style={{ fontWeight: HEAD_W, fontSize: 'clamp(1.35rem,2vw,1.7rem)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#C8362B' }}>{c.value}</span>
                  <span style={{ fontSize: '.92rem', color: '#4A423B', fontWeight: 600, lineHeight: 1.42 }}>{c.label}</span>
                  <span style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#5E564E', fontWeight: 700, marginTop: 3 }}>{c.client}</span>
                </div>
              </div>
            ))}
          </div>

          <div data-rev style={{ textAlign: 'center', marginTop: 'clamp(26px,3.2vw,38px)' }}>
            <Link to="/work" className="tlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#8E2520', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.03em', textDecoration: 'none', borderBottom: '1px solid rgba(200,54,43,.32)', paddingBottom: 3 }}>
              See all work <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6 · SPEAKING ───
        * Adapted from the /speaking video hero: same E3 stage clip, run
        * full-bleed behind a scrim as Cowork proposed, reduced to one
        * confident statement. Breaks the run of card grids. */}
      <section className="speak" id="speaking">
        <div className="speak-bg" aria-hidden="true">
          <video
            src={BASE + 'speaking/laura-e3-stage-wide.mp4'}
            poster={BASE + 'speaking/laura-e3-stage-wide-poster.jpg'}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="speak-scrim" aria-hidden="true" />
        {/* data-rev was missing here, which is why this was the one section
          * that did not fade up like the rest of the page. */}
        <div data-rev className="speak-copy" style={{ ...INNER, position: 'relative', zIndex: 2, padding: 'clamp(84px,10vw,132px) clamp(20px,5vw,64px)', maxWidth: 760, textAlign: 'center' }}>
          <span className="speak-eyebrow"><Eyebrow>Speaking</Eyebrow></span>
          <hr style={{ width: 46, height: 3, background: '#C8362B', border: 'none', margin: '14px auto 20px' }} />
          <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.08, letterSpacing: '-.028em', margin: '0 auto 14px', maxWidth: '20ch', color: '#EFE9DC' }}>
            A key speaker at the industry&rsquo;s biggest events.
          </h2>
          {/* Non-breaking space in "E3 main", per Laura 23 Jul 2026, to carry
            * "E3" onto the second line. It was breaking as "…including on the
            * E3 / main stage.", which left E3 hanging at the end of a long line
            * and orphaned "main stage." underneath. Now "…including on the /
            * E3 main stage.", so the phrase stays whole and the short centred
            * second line closes the sentence cleanly.
            *
            * Not text-wrap: balance here. Balance also moves E3 down, but it
            * does it by evening the lines — "I have presented my own fan-led /
            * projects, including on the E3 main stage." — which leaves the
            * second line longer than the first and reads bottom-heavy under a
            * centred heading. The nbsp keeps the intended shape. */}
          <p style={{ fontSize: T.lede, lineHeight: 1.6, color: '#EFE9DC', margin: '0 auto clamp(24px,3vw,32px)', maxWidth: '46ch' }}>
            I have presented my own fan-led projects, including on the E3&nbsp;main stage.
          </p>
          <Link to="/speaking" className="btnink" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, textDecoration: 'none' }}>
            See my talks
          </Link>
        </div>
      </section>

      {/* ─── 7 · IN THEIR WORDS ─── */}
      <section className="on-light" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div data-rev style={{ ...INNER, padding: SECTION_PAD, maxWidth: 760, textAlign: 'center' }}>
          <Eyebrow tone="deep">In their words</Eyebrow>
          <hr style={{ width: 46, height: 3, background: '#C8362B', border: 'none', margin: '14px auto 24px' }} />
          <blockquote style={{ margin: 0, padding: 0 }}>
            <p style={{ fontWeight: HEAD_W, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', letterSpacing: '-.02em', lineHeight: 1.25, color: '#15110F', margin: 0, textWrap: 'pretty' }}>
              &ldquo;Laura is a <mark>start-up swiss knife</mark> &hellip; with some extra fun!&rdquo;
            </p>
          </blockquote>
          <div style={{ marginTop: 'clamp(20px,2.4vw,28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <img src={BASE + 'portraits/nicolas-brusson.png'} alt="Nicolas Brusson" loading="lazy" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flex: 'none', boxShadow: '0 0 0 1px rgba(21,17,15,.16)' }} />
            <span style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontSize: '.95rem', fontWeight: 700, color: '#15110F', lineHeight: 1.3 }}>Nicolas Brusson</span>
              <span style={{ display: 'block', fontSize: '.88rem', fontWeight: 600, color: '#5E564E', lineHeight: 1.3 }}>Co-founder &amp; CEO, BlaBlaCar</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─── 8 · TOOLS ───
        * Gold section. The rule and the card top-borders are --edge rather
        * than --accent, so the red count here drops from five elements to
        * two (the CTAs). That fixes "too much red" at the source instead of
        * by weakening the buttons, and gives the section its own identity as
        * the IP tools. Red stays reserved for actions. */}
      <section id="tools" style={{ background: '#15110F', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ textAlign: 'center', maxWidth: '54ch', margin: '0 auto clamp(34px,4vw,48px)' }}>
            <Eyebrow>Want to take the first step on your own?</Eyebrow>
            <hr style={{ width: 46, height: 3, background: 'var(--edge)', border: 'none', margin: '14px auto 20px' }} />
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(239,233,220,.74)', margin: 0 }}>
              Two quick ways to see where you stand with fan-led growth.
            </p>
          </div>

          <div className="tools-grid">
            {/* Fan Score */}
            <div className="tool" data-rev>
              <div className="tool-viz">
                <span className="tool-kick">Two minutes</span>
                <div className="gauge">
                  <svg viewBox="0 0 200 118" fill="none" aria-hidden="true">
                    <path d="M16 100 A84 84 0 0 1 184 100" stroke="rgba(239,233,220,.12)" strokeWidth="14" strokeLinecap="round" />
                    <path className="gauge-fill" d="M16 100 A84 84 0 0 1 184 100" stroke="url(#fsg)" strokeWidth="14" strokeLinecap="round" strokeDasharray="163 264" />
                    <defs>
                      <linearGradient id="fsg" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#8E2520" />
                        <stop offset="1" stopColor="#C8362B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="gauge-num">62<span>/100</span></div>
                </div>
                <div className="tool-cap" style={{ marginTop: 14 }}>An example fan-led growth score</div>
              </div>
              <div className="tool-body">
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: '0 0 8px', color: '#EFE9DC' }}>Fan Score</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.6, color: 'rgba(239,233,220,.72)', margin: '0 0 22px' }}>
                  A quick score of where you stand with fan-led growth, and where you are leaking it.
                </p>
                <Link to="/fan-score" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#C8362B', color: '#FCFAF3', fontWeight: 700, fontSize: '.96rem', padding: '13px 24px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease', marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Take the quiz
                </Link>
              </div>
            </div>

            {/* Fan Value */}
            <div className="tool" data-rev>
              <div className="tool-viz">
                <span className="tool-kick">One number</span>
                {/* Static: counting the number up read as too much motion.
                  * The gauge and bars carry the entrance and hover animation. */}
                <div className="val-num">$560<span className="k">K</span></div>
                <div className="tool-cap">Estimated annual value</div>
                <div className="bars" aria-hidden="true">
                  <i style={{ height: '32%' }} /><i style={{ height: '50%' }} /><i style={{ height: '66%' }} /><i style={{ height: '84%' }} /><i style={{ height: '100%' }} />
                </div>
              </div>
              <div className="tool-body">
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: '0 0 8px', color: '#EFE9DC' }}>Fan Value</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.6, color: 'rgba(239,233,220,.72)', margin: '0 0 22px' }}>
                  What is your fanbase actually worth? On conservative benchmarks, a $5M brand lands near $560K a year.
                </p>
                <Link to="/fan-value" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#C8362B', color: '#FCFAF3', fontWeight: 700, fontSize: '.96rem', padding: '13px 24px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease', marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Run the numbers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9 · LET'S TALK ───
        * Cowork's close, matched: eyebrow, gold rule, "Tell me about your
        * brand.", the one lead line, and the LinkedIn line. Nothing added.
        * Only the form is wired up for real. */}
      <section className="contact-red" id="contact" style={{ color: '#FBF4E6' }}>
        <div className="contact-grid" style={{ ...INNER, padding: 'clamp(72px,9vw,110px) clamp(20px,5vw,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(36px,5vw,60px)', alignItems: 'start' }}>
          {/* Cowork's layout, but the site's own colours on the red ground:
            * #F2D79A gold and #FBF4E6 cream, which is what the live close
            * uses. Cowork's #D4C896 / #EFE9DC are the on-espresso pair and go
            * muddy against oxblood. */}
          <div data-rev>
            <span style={{ display: 'block', fontSize: T.marker, letterSpacing: '.26em', textTransform: 'uppercase', color: '#F2D79A', fontWeight: 700 }}>Let&rsquo;s talk</span>
            <hr style={{ width: 52, height: 4, background: '#F2D79A', border: 'none', margin: '14px 0 26px' }} />
            {/* T.h2close, not a bespoke clamp, since 22 Jul 2026.
              *
              * This was clamp(1.7rem,3.2vw,2.4rem), which resolves to 38.4px at
              * 1280 against a section h2 of 41px: the closing headline was the
              * SMALLEST h2 on the page, so the homepage ended quieter than its
              * own middle. The shared scale has always had an h2close for
              * exactly this ("the close still gets to shout") and this page was
              * the one not using it.
              *
              * Checked before changing, because a 60px headline in a 496px
              * column beside a form sounds like a crowding problem: it isn't.
              * The copy column runs 218px against the form's 349px, so there is
              * 131px of slack. At 60px the column grows to 306px, still 43px
              * shorter than the form beside it. It breaks cleanly too:
              * "Tell me about / your brand.", no widow. */}
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2close, lineHeight: 1.08, letterSpacing: '-.028em', margin: '0 0 16px', color: '#FBF4E6' }}>
              Tell me about your brand.
            </h2>
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(251,244,230,.86)', maxWidth: '40ch', margin: '0 0 22px' }}>
              I&rsquo;ll tell you honestly whether fan-led growth is the lever for you.
            </p>
            <p style={{ fontSize: '.9rem', color: 'rgba(251,244,230,.82)', fontWeight: 600, margin: 0 }}>
              Or find me on <a href={LINKEDIN_URL} className="oxlink">LinkedIn</a>.
            </p>
          </div>

          <div data-rev>
            {sent ? (
              <div className="contact-done" role="status">
                <span style={{ display: 'block', fontWeight: HEAD_W, fontSize: '1.3rem', letterSpacing: '-.02em', color: '#15110F', marginBottom: 8 }}>Thank you, that&rsquo;s with me.</span>
                <span style={{ fontSize: '.98rem', color: '#4A423B', fontWeight: 500 }}>I read every message myself and I&rsquo;ll come back to you within one working day.</span>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="cform" noValidate={false}>
                {/* Honeypot — must stay visually hidden and unlabelled for humans. */}
                <input type="text" name="bot-field" value={form['bot-field']} onChange={onField('bot-field')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <input type="text" name="name" required placeholder="Your name" aria-label="Your name" value={form.name} onChange={onField('name')} />
                <input type="email" name="email" required placeholder="Email" aria-label="Email" value={form.email} onChange={onField('email')} />
                <textarea name="message" required placeholder="What are you working on?" aria-label="What are you working on" value={form.message} onChange={onField('message')} />
                <button type="submit" className="btnsend btnink">Send</button>
                {/* Route to the branching form for anyone with a specific
                  * brief. This short form only captures name/email/message,
                  * so /contact is where need, timeline and the speaking
                  * fields get asked. */}
                <span style={{ fontSize: '.84rem', color: 'rgba(251,244,230,.8)', fontWeight: 600 }}>
                  Something specific in mind? Use the <Link to={CONTACT_URL} className="oxlink">full contact form</Link>.
                </span>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
