import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, methodologyJsonLd } from '../lib/seo.js'
import './MethodologyPage.css'

const CONTACT_URL = '/contact?intent=consulting'

/* /fan-engine — The Fan Engine. Cinematic dark-band design, ported from the
 * v6 comp. Renamed from /methodology on 22 Jul 2026 so the URL says what the
 * page is; /methodology 301s here.
 *
 * SIX full-bleed bands:
 *   1. Hero       : deep ground, split layout, engine emblem right
 *   2. Method     : warm dark card ground, signature schematic
 *   3. Journey    : bone ground, quiet five-stage list
 *   4. Engagement : espresso ground, gold card, the route to /services
 *   5. Measured   : deep ground, honest method + scoreboard
 *   6. Close      : oxblood finale, cream CTA
 *
 * Engagement sits at 5, after Measured. It was briefly moved to 4 (straight
 * after the stages) on 23 Jul 2026 because the card sat at 69% of the page and
 * Laura flagged it as far down. She then settled it the other way: it belongs
 * after "How I prove it".
 *
 * That is the right call, and the reason is the proof strip. It was cut from
 * the Measured band the same day, so with the card at 4 a reader met the offer
 * having seen no evidence at all — the method, the stages, then the ask, with
 * every proof point after it. Proof earns the right to ask. The card is lower
 * down as a result, and the close carries a text link for anyone who skips.
 *
 * The old band 2, "The problem", was cut: it restated /fan-led-growth almost
 * line for line, so anyone arriving from there read the same argument twice
 * before reaching anything new. This page now opens on the Fan Engine itself.
 *
 * Copy is final and verbatim from the comp. No em dashes, no figure
 * labels, no compare-down framing. */

const BrandIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)
const ProductIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
)
const CommunityIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
)
const GrowthIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
)

const disciplines = [
  {
    icon: <BrandIcon />,
    word: 'Brand',
    note: 'The foundation. Story, identity and the moments that create connection and belonging.',
  },
  {
    icon: <ProductIcon />,
    word: 'Product',
    note: 'The loops. Progression, rewards and gamification: the habit that earns the next visit.',
  },
  {
    icon: <CommunityIcon />,
    word: 'Community',
    note: 'Belonging. The spaces and rituals that make fans part of something bigger.',
  },
  {
    icon: <GrowthIcon />,
    word: 'Growth',
    note: 'Advocacy. Belonging turned into reach: referrals, creators, UGC and earned media.',
  },
]

/* Rewritten 23 Jul 2026, Laura's words. The previous bodies were longer and
 * each carried a caveat or an aside ("without a discount every time", "in it
 * with each other and with you") that explained the stage instead of naming it.
 * These name it. Read down, they now form a sentence: come back, keep coming
 * back, find your people, become who you are, bring the next ones.
 *
 * NOTE: these bodies also feed the HowTo steps in methodologyJsonLd, so the
 * schema follows automatically. Do not let the two drift.
 *
 * Two small corrections to the handwritten versions: "a part of they see
 * themselves" -> "a part of how they see themselves", and "Fans now. bring in
 * new fans, a rediuced CAC" -> one sentence with the typo fixed. */
const stages = [
  { num: '01', name: 'Activation.', body: 'A first win that makes them want to come back.' },
  { num: '02', name: 'Habit.', body: 'A reason to come back on their own.' },
  { num: '03', name: 'Belonging.', body: 'Finding your crew to connect with.' },
  { num: '04', name: 'Identity.', body: 'Your brand becomes a part of how they see themselves.' },
  { num: '05', name: 'Advocacy.', body: 'Fans now bring in new fans, and a reduced CAC.' },
]

/* Levelled 23 Jul 2026. Laura: "The KPIs are all different in terms of length
 * etc." Measured at 1440 the labels ran 1/1/2/1 lines and the bodies 1/2/2/3,
 * so the row read ragged. "Organic and earned growth up" was the only label
 * that wrapped, and my own rewrite of the AI body the hour before had made it
 * the longest of the four.
 *
 * Now every label fits one line and the bodies sit within about ten characters
 * of each other, so the four columns bottom out together. Meaning is unchanged:
 * "organic" keeps the common term and the body carries the earned-media half. */
const scoreboard = [
  { label: 'Retention up', body: 'the customers you paid to win stay with you.' },
  { label: 'LTV:CAC up', body: 'fans spend more, so each one you buy is worth more.' },
  { label: 'Organic growth up', body: 'fans bring others, and make the content that markets you.' },
  { label: 'Recommended by AI', body: 'the models read what your fans wrote, and repeat it.' },
]

export default function MethodologyPage() {
  useDocumentMeta({
    title: 'The Fan Engine™ · The method · Laura Cordrey',
    description:
      "You're sitting on more fandom than you can prove or bank. The Fan Engine™ turns customers into fans, and proves what they're worth.",
    canonical: pageUrl('fan-engine'),
    // DefinedTerm + HowTo over the five stages. methodologyJsonLd has existed
    // in seo.js since the page was built and was never called from anywhere, so
    // the page that defines the method was shipping no schema for it at all.
    //
    // The builder wants { name, text } per stage; the page's array is
    // { num, name, body }, hence the map. Trailing full stops are stripped —
    // "Activation." reads as a heading on the page, but a DefinedTerm step name
    // should be the bare term.
    jsonLd: methodologyJsonLd({
      stages: stages.map((s) => ({
        name: s.name.replace(/\.$/, ''),
        text: s.body,
      })),
    }),
  })

  return (
    <div className="meth-page">
      {/* 1. HERO (split: headline left, engine emblem right) */}
      <section className="meth-band meth-band--hero">
        <div aria-hidden="true" className="meth-hero__halo" />
        <div className="meth-container meth-hero__grid">
          <div>
            <span className="meth-eyebrow meth-eyebrow--gold">The method</span>
            <h1 className="meth-h1">
              The <mark>Fan Engine<span className="tm">™</span></mark>.
            </h1>
            <p className="meth-hero__lede">
              You're sitting on more fandom than you can see, prove, or bank.
              The Fan Engine<span className="tm">™</span> is the system I build to turn customers into fans,
              and to prove what they're worth.
            </p>
            {/* The disqualifier that sat here was cut on 23 Jul 2026, Laura's
              * call: "not sure that's helpful."
              *
              * It read "Not the fit if what you need is a one-off spike this
              * quarter. Fan-led growth compounds, which takes a few quarters,
              * not a few weeks." The instinct that kept it was sound — a page
              * that says who it is not for is worth more than one that doesn't
              * — but the HERO is the wrong place for it. It was the third
              * paragraph on the page, disqualifying a reader before they had
              * been told what the thing is.
              *
              * The disqualifier is not lost. /faq carries "Who is this NOT
              * for?" in full, which is where someone actively checking whether
              * they are a fit will look for it. */}
            {/* No CTA pair here. It was the same two buttons the close already
              * carries, and readers now arrive from /fan-led-growth already
              * sold on why this matters, so the page should get to the
              * schematic rather than ask for a decision in its first screen. */}
          </div>

          <div className="meth-hero__plate">
            <svg viewBox="0 0 440 440" className="meth-hero__emblem fe-float" aria-hidden="true">
              <defs>
                <radialGradient id="feGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0" stopColor="rgba(200,54,43,.2)" />
                  <stop offset="1" stopColor="rgba(200,54,43,0)" />
                </radialGradient>
                <radialGradient id="feCore" cx="50%" cy="44%" r="66%">
                  <stop offset="0" stopColor="#1F1A17" />
                  <stop offset=".58" stopColor="#241D19" />
                  <stop offset="1" stopColor="#8E2520" />
                </radialGradient>
              </defs>
              <rect width="440" height="440" fill="url(#feGlow)" />
              <circle cx="220" cy="220" r="188" fill="none" stroke="rgba(212,200,150,.12)" strokeWidth="1" strokeDasharray="5 16" />
              <circle cx="220" cy="220" r="152" fill="none" stroke="rgba(212,200,150,.2)" strokeWidth="1" strokeDasharray="2 20" />
              <g stroke="rgba(200,54,43,.3)" strokeWidth="1.4">
                <line x1="220" y1="220" x2="220" y2="89" />
                <line x1="220" y1="220" x2="351" y2="220" />
                <line x1="220" y1="220" x2="220" y2="351" />
                <line x1="220" y1="220" x2="89" y2="220" />
              </g>
              <circle cx="220" cy="220" r="66" fill="url(#feCore)" stroke="rgba(212,200,150,.5)" strokeWidth="1.5" />
              <g transform="translate(205,193) scale(1.25)" fill="none" stroke="#C8362B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </g>
              <text x="220" y="242" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="10.5" fontWeight="800" letterSpacing="2" fill="#D4C896">
                FAN ENGINE<tspan fontSize="6" dy="-4" letterSpacing="0">™</tspan>
              </text>
              <circle cx="220" cy="66" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(210.2,56.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
              </g>
              <circle cx="374" cy="220" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(364.2,210.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
              </g>
              <circle cx="220" cy="374" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(210.2,364.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </g>
              <circle cx="66" cy="220" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(56.2,210.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </g>
            </svg>
            <span className="meth-hero__plate-cap">Four disciplines, one spine</span>
          </div>
        </div>
      </section>

      {/* "The problem" band was cut on 22 Jul 2026. It restated what
        * /fan-led-growth already says, line for line: "the growth you already
        * paid for" against that page's "the growth you already own", the
        * leaking-bucket paragraph against its rent-versus-own hero, "no one
        * owns it" against its "no single team owns it: brand, product and
        * community each hold a piece", and "who this is for" against its whole
        * four-card section. A reader arriving from that page was being told
        * the same thing twice before reaching anything new.
        *
        * The one line it had that the other page does not — the disqualifier,
        * "not the fit if what you need is a one-off spike" — moved up into
        * the hero rather than being lost.
        *
        * The page now runs hero > schematic, which is what someone who came
        * here for the Fan Engine actually wants. */}

      {/* 2. THE METHOD (signature schematic) */}
      <section className="meth-band meth-band--method">
        <div className="meth-container">
          <div className="meth-narrow meth-narrow--wide">
            <div className="meth-sechead">
              <span className="meth-sechead__num">01</span>
              <span className="meth-eyebrow meth-eyebrow--gold">The method</span>
            </div>
            <h2 className="meth-h2">
              Four disciplines. <mark>One spine.</mark>
            </h2>
            {/* The two ledes here were merged into one on 22 Jul 2026 (copy
              * reduction): the first defined fan-led growth, which the reader
              * has just been told on /fan-led-growth, the page nearly all of
              * this page's traffic arrives from. */}
            <p className="meth-lede">
              I run all four disciplines as one connected engine, not four
              separate workstreams. Thirteen years across brand, product,
              community and growth means I see where growth leaks between the
              teams and close it, and put a number on every part,
              so&nbsp;what&nbsp;you&nbsp;build&nbsp;can&nbsp;be&nbsp;tracked.
            </p>
          </div>

          <div className="meth-schematic">
            <span className="meth-eyebrow meth-eyebrow--gold meth-schematic__label">The Fan Engine<span className="tm">™</span></span>

            <div className="meth-schematic__grid">
              {disciplines.map((d) => (
                <div className="meth-schematic__cell" key={d.word}>
                  {d.icon}
                  <span className="meth-schematic__word">{d.word}</span>
                  <span className="meth-schematic__note">{d.note}</span>
                </div>
              ))}
            </div>

            <div aria-hidden="true" className="meth-schematic__wiring" />

            <div className="meth-schematic__spine">
              <span className="meth-schematic__spine-name">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <span className="meth-schematic__spine-title">
                  Measurement <span className="meth-schematic__spine-sub">&middot; the spine</span>
                </span>
              </span>
              <span className="meth-schematic__spine-desc">The KPI tree that ties every part to a number</span>
            </div>

            <div className="meth-schematic__output">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="12" x2="18" y2="12" />
                <polyline points="12 6 18 12 12 18" />
              </svg>
              Growth that compounds, not spend that leaks.
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE JOURNEY (quiet list) */}
      <section className="meth-band meth-band--journey">
        <div className="meth-container">
          <div className="meth-narrow">
            <div className="meth-sechead meth-sechead--onbone">
              <span className="meth-sechead__num">02</span>
              <span className="meth-eyebrow meth-eyebrow--ink">What it builds</span>
            </div>
            <h2 className="meth-h2 meth-h2--onbone">What the engine builds for your customer.</h2>
            <p className="meth-lede meth-lede--onbone">
              {/* Second sentence rewritten 23 Jul 2026; Laura flagged it as odd
                * and it was. It read "Real people don't climb them in a tidy
                * line, so treat it as a map, not a formula" — four metaphors in
                * one sentence (stages, climbing, a tidy line, a map, a formula),
                * and it hedged the model in the same breath as presenting it.
                * The honest point underneath is worth keeping, so it stays, in
                * one image and without the apology. */}
              {/* One sentence, 23 Jul 2026. This carried a second sentence
                * that hedged the model right after presenting it: first "Real
                * people don't climb them in a tidy line, so treat it as a map,
                * not a formula" (four metaphors), then my shorter "Not everyone
                * moves through them in order." Laura's call: neither is needed.
                * Readers know a model is a model; saying so undercuts it.
                *
                * The nbsps keep "a first purchase" and "bringing others in"
                * whole so the single sentence reads in phrases. */}
              The four disciplines move a customer from a&nbsp;first&nbsp;purchase
              to bringing&nbsp;others&nbsp;in, through five stages.
            </p>
          </div>

          <ol className="meth-stages">
            {stages.map((s) => (
              <li className="meth-stages__item" key={s.name}>
                <span className="meth-stages__num">{s.num}</span>
                <h3 className="meth-stages__name">{s.name}</h3>
                <p className="meth-stages__body">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="meth-loop">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9" />
              <polyline points="3 3 3 8 8 8" />
            </svg>
            <span className="meth-loop__note">
              Advocacy feeds back to activation: the engine brings you new
              customers, so it grows itself.
            </span>
          </div>

          {/* The pull-quote that closed this band was cut on 22 Jul 2026. Its
            * first half restated the loop note directly above it, and its
            * second half ("I show it moving in the numbers") is the headline
            * of the section immediately below. */}
        </div>
      </section>


      {/* 4. MEASURED (how I prove it) */}
      <section className="meth-band meth-band--measured">
        <div className="meth-container">
          <div className="meth-narrow meth-narrow--wide">
            <div className="meth-sechead">
              <span className="meth-sechead__num">03</span>
              <span className="meth-eyebrow meth-eyebrow--gold">How I prove it</span>
            </div>
            <h2 className="meth-h2">
              Measurable, and <mark>measured honestly</mark>.
            </h2>
            <p className="meth-lede">
              {/* "instead of last-click guesses" cut 23 Jul 2026, per Laura.
                * It was the one compare-down in the sentence — defining the
                * work against how other people do it rather than saying what
                * this is — and the voice rules call that out. "Track real
                * cohorts" is the claim; the swipe added nothing to it. */}
              Fan-led growth gets called unmeasurable. It isn&rsquo;t. I set a
              baseline before I start, track real cohorts, and I&rsquo;m honest
              about what can&rsquo;t be pinned down.
            </p>
          </div>

          {/* The three-stat proof strip that sat here was cut on 23 Jul 2026,
            * Laura's call, and the reason is worth keeping.
            *
            * This band argues "Measurable, and measured honestly": baselines,
            * real cohorts, being straight about what cannot be pinned down.
            * The strip answered with three campaign OUTCOMES (50M+ views, $32K
            * in three hours, +80% MAU). Those evidence results, not rigour, so
            * they were the wrong kind of proof for the claim above them. The
            * scoreboard below IS the right kind, and it was already there.
            *
            * They were also duplicative: 50M+ and $32K each appear on the
            * homepage, /services and their own case study, and +80% on
            * /fan-led-growth and /work. This was their fourth or fifth outing.
            *
            * The two links stay. "See the case studies" is the route for anyone
            * who wants receipts, and "Why fans grow a business" is the return
            * path to /fan-led-growth that is otherwise nav-only. */}
          {/* Two ways on from the proof: the work, or the argument behind it.
              The second is the return path to /fan-led-growth, which until now
              was only reachable from the nav. Sits here rather than in the
              close, so it doesn't pull against the diagnostic CTA. */}
          <p className="meth-proofstrip__more">
            <Link to="/work">See the case studies <span aria-hidden="true">→</span></Link>
            <span className="meth-proofstrip__sep" aria-hidden="true">·</span>
            <Link to="/fan-led-growth">Why fans grow a business <span aria-hidden="true">→</span></Link>
          </p>

          <div className="meth-measured__blocks">
            <div className="meth-measured__block">
              <span className="meth-eyebrow meth-eyebrow--gold">The scoreboard: numbers you already track</span>
              <p className="meth-measured__body">
                You don&rsquo;t need new fan metrics. Fan-led growth moves the
                ones your team already reports:
              </p>
              <ul className="meth-scoreboard">
                {scoreboard.map((s) => (
                  <li className="meth-scoreboard__item" key={s.label}>
                    <span className="meth-scoreboard__label">{s.label}</span>
                    <span className="meth-scoreboard__body">{s.body}</span>
                  </li>
                ))}
              </ul>
              <p className="meth-measured__body">
                When these move together, your paid spend compounds instead of leaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE ENGAGEMENT — added 23 Jul 2026.
        *
        * Laura: "we don't have the fan engine service on here!! big miss ...
        * I think we need a much stronger click to the service tbh." The page
        * had no link to /services at all; a text link in the close row was the
        * first fix and it was too quiet for the job. This band is the strong
        * one: the reader has just been through the method and the proof, and
        * this is the first thing they meet afterwards.
        *
        * GOLD on purpose, and it is a site rule rather than a new choice. Gold
        * is the flagship's colour on the homepage "three ways I help" card and
        * on the /services Fan Engine row, which carries the comment "Gold is
        * the flagship's colour on the homepage cards too, so the Fan Engine
        * reading gold here completes a rule the site already had." A light gold
        * card on this dark band is also the highest-contrast thing on the page,
        * which is what "stronger click" needs.
        *
        * The four phase labels and the duration are lifted verbatim from the
        * /services offer so the two cannot drift. It deliberately does NOT
        * repeat the phase descriptions or the proof — this is the trailer, and
        * /services is the page. */}
      <section className="meth-band meth-band--engagement">
        <div className="meth-container">
          <div className="meth-engage">
            <div className="meth-engage__head">
              <span className="meth-engage__kick">The engagement</span>
              <h2 className="meth-engage__title">
                Build the Fan Engine<span className="tm">&trade;</span> with me.
              </h2>
              <p className="meth-engage__lede">
                The whole system, built into your business and measured end to
                end. Four phases, in this order.
              </p>
            </div>
            <ol className="meth-engage__phases">
              <li><span>01</span>The picture</li>
              <li><span>02</span>The build</li>
              <li><span>03</span>The tracking</li>
              <li><span>04</span>Every quarter</li>
            </ol>
            <div className="meth-engage__foot">
              <span className="meth-engage__meta">
                6 to 8 weeks to build, then ongoing &middot; Priced per engagement
              </span>
              <Link to="/services#fan-engine" className="meth-engage__cta">
                <span>See the Fan Engine<span className="tm">&trade;</span> engagement &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSE (oxblood finale) */}


      <section className="meth-band meth-band--close">
        <div aria-hidden="true" className="meth-close__glow" />
        <div className="meth-container meth-close">
          <span className="meth-eyebrow meth-eyebrow--brightgold">See where your engine stands</span>
          <h2 className="meth-close__title">
            A short diagnostic shows you which part of your engine to{' '}
            <span className="meth-close__hl">build first</span>.
          </h2>
          <p className="meth-close__lede">
            The Fan Score<span className="tm">™</span> takes two minutes and
            shows where your fan-led growth is already worth more than you're
            counting.
          </p>
          <div className="meth-ctas">
              {/* ™ added 23 Jul 2026: the identical button on /services
                * carries it and this one did not. Label wrapped in one
                * span because .btn is a flex container with a gap —
                * unwrapped, the gap opens either side of the mark. */}
            <Link to="/fan-score" className="btn btn--lg meth-close__cta">
              <span>Take the 2-min Fan Score<span className="tm">™</span></span>
            </Link>
            <Link to={CONTACT_URL} className="btn btn--ghost btn--lg meth-close__ghost">
              Let’s talk
            </Link>
          </div>
            {/* Link to the ENGAGEMENT, added 23 Jul 2026. Laura: "we don't
              * have the fan engine service on here!! big miss". Right — this
              * page had NO link to /services at all, verified against the built
              * HTML. Someone just walked through the method could take a quiz
              * or open a contact form, but had no way to see what buying it
              * looks like: phases, duration, proof, price framing. First in the
              * row because it is the closest next step for a convinced reader. */}
          <p className="meth-close__back">
              Or <Link to="/services#fan-engine">see the Fan Engine<span className="tm">™</span> engagement &rarr;</Link>
              {' '}&middot;{' '}
              <Link to="/work">see the work first &rarr;</Link>
            {' '}&middot;{' '}
            <Link to="/ai">fan-led growth for AI &rarr;</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
