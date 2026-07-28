import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import './AIPage.css'

const CONTACT_URL = '/contact?intent=consulting&need=ai-pilot'
const HELLO_EMAIL = 'hello@lauracordrey.com'

/* /ai — point-of-view / thought-piece landing.
 *
 * Direction "Cinematic bands" (1a) per 8 Jul handoff. Six full-bleed
 * bands, each a distinct ground so the page reads to the site's
 * dark → warm-grey → dark → deep → bone → oxblood rhythm.
 *
 * Copy is final and verbatim (see handoff). No em dashes. No KPI
 * banner; the 15M/85%/E3 numbers appear only inside the deliberately
 * restrained proof row in the credibility band. Ambient motion is
 * decorative only and disables under prefers-reduced-motion. */

const fourMoves = [
  {
    n: '01',
    cat: 'Distribution',
    title: 'Recommended by the models',
    body: 'When someone asks an AI what to use, you want to be the answer. Models learn from what real users write on Reddit, in forums, reviews and threads, so earning that advocacy is now distribution.',
  },
  {
    n: '02',
    cat: 'Sentiment',
    title: 'Sentiment you can move',
    body: 'The point is not a dashboard. Listen to the sentiment, read it against your product roadmap and business goals, turn it into usable recommendations that improve the product, then communicate the changes back to the community the right way.',
  },
  {
    n: '03',
    cat: 'Feedback',
    title: 'A feedback corps from your power users',
    body: 'Find the power users already inside your userbase and turn them into a trained feedback corps. They pressure-test releases early and surface issues before they spread, so you get signal you can act on.',
  },
  {
    n: '04',
    cat: 'Operations',
    title: 'Run it like a live service',
    body: 'Manage your AI community the way I ran games with millions of players: real-time, close to the product, ready before sentiment turns.',
  },
]

/* Small red Lucide-style line icons for the "Why I am AI-native" band.
 * 24×24 viewBox, stroke-width 1.6, round caps/joins (per handoff). */
const CodeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)
const SparkleIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
    <path d="M19 15l.9 2.4L22 18l-2.1.6L19 21l-.9-2.4L16 18l2.1-.6z" />
    <path d="M5 3l.6 1.4L7 5l-1.4.6L5 7l-.6-1.4L3 5l1.4-.6z" />
  </svg>
)
const RocketIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const aiNative = [
  {
    icon: <CodeIcon />,
    title: 'This whole site',
    body: 'I designed and built this site end to end, myself. What you are reading is the proof.',
  },
  {
    icon: <SparkleIcon />,
    title: 'Tools, agents and skills',
    body: 'I build my own AI tools, agents and skills to do the work, not slideware about them.',
  },
  {
    icon: <RocketIcon />,
    title: 'Building it for real',
    /* "I saw this coming early." cut 23 Jul 2026, per Laura. The sentence
     * before it is a verifiable fact — a founding role at an AI-driven startup
     * for fan engagement — and it makes the point on its own. "I saw this
     * coming early" is self-congratulation about that fact rather than more
     * evidence for it, and it is the kind of claim a reader can only take on
     * trust. Same instinct as dropping "biggest" on the homepage: the fact
     * carries more weight than the boast about the fact. */
    body: 'Part-time founding role at an AI-driven startup for fan engagement.',
  },
]

/* Radar plate — the "sentiment you can move / monitor in real time"
 * visual for the AI hero. Concentric gold rings, rotating red sweep
 * wedge, pulsing red blips, red center dot. All decoration — animation
 * hooks handled in AIPage.css, disabled under prefers-reduced-motion. */
function RadarPlate() {
  return (
    <div className="ai-radar" aria-hidden="true">
      <svg viewBox="0 0 420 420" className="ai-radar__svg">
        <defs>
          <linearGradient id="ai-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(200,54,43,0)" />
            <stop offset="1" stopColor="rgba(200,54,43,.38)" />
          </linearGradient>
          <radialGradient id="ai-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="rgba(200,54,43,.22)" />
            <stop offset="1" stopColor="rgba(200,54,43,0)" />
          </radialGradient>
        </defs>
        <rect width="420" height="420" fill="url(#ai-glow)" />
        {/* Concentric gold rings */}
        <g fill="none" stroke="rgba(212,200,150,.20)" strokeWidth="1">
          <circle cx="210" cy="210" r="60" />
          <circle cx="210" cy="210" r="115" />
          <circle cx="210" cy="210" r="170" />
        </g>
        {/* Crosshair lines */}
        <g stroke="rgba(212,200,150,.14)" strokeWidth="1">
          <line x1="10" y1="210" x2="410" y2="210" />
          <line x1="210" y1="10" x2="210" y2="410" />
        </g>
        {/* Rotating red sweep — wedge + leading spoke */}
        <g className="ai-radar__sweep">
          <path d="M210,210 L390,210 A180,180 0 0 0 356.5,102.5 Z" fill="url(#ai-sweep)" />
          <line x1="210" y1="210" x2="390" y2="210" stroke="rgba(200,54,43,.55)" strokeWidth="1.4" />
        </g>
        {/* Pulsing red blips */}
        <g className="ai-radar__blips" fill="#E0574B">
          <circle cx="285" cy="140" r="4.5" />
          <circle cx="140" cy="300" r="3.6" />
          <circle cx="325" cy="255" r="3.2" />
          <circle cx="170" cy="150" r="4" />
        </g>
        {/* Center dot */}
        <circle cx="210" cy="210" r="5" fill="#C8362B" />
      </svg>
    </div>
  )
}

export default function AIPage() {
  useDocumentMeta({
    title: 'Fan-led growth for AI · Laura Cordrey',
    description:
      'A point of view on running an AI company like a AAA live-service game: distribution, sentiment, feedback and operations for the crowd around your model.',
    canonical: pageUrl('ai'),
    ogType: 'article',
  })

  const BASE = import.meta.env.BASE_URL

  return (
    <div className="ai-page">
      {/* ─── 1 · HERO BAND (deep #0E0B09) ────────────────────
        * Two columns: left = eyebrow + H1 + lead paragraph + Button;
        * right = animated radar plate. Ambient red halo top-right. */}
      <section className="ai-band ai-band--hero">
        <div aria-hidden="true" className="ai-band__halo ai-band__halo--hero" />
        <div className="ai-container ai-hero__grid">
          <div className="ai-hero__body">
            <span className="ai-eyebrow ai-eyebrow--gold">A point of view · Fan-led growth for AI</span>
            <h1 className="ai-h1">
              How to run an AI company like a AAA{' '}
              <mark>live-service game.</mark>
            </h1>
            <p className="ai-lead-p">
              Every few weeks an AI company ships, and within the hour the internet has decided how it feels. I ran that exact problem for 15-million-player live games. It has a playbook, it just does not have a name in AI yet.
            </p>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg ai-hero__cta">
              Let&rsquo;s build it together</Link>
          </div>
          <div className="ai-hero__plate">
            <RadarPlate />
          </div>
        </div>
      </section>

      {/* ─── 2 · CREDIBILITY BAND (warm grey #2D2723) ──────
        * Two columns: left = framed E3 photo with caption strip;
        * right = eyebrow + H2 + prose + Ubisoft logo + restrained
        * 3-cell proof row (15M / 85% / E3). Not a KPI banner. */}
      <section className="ai-band ai-band--cred">
        <div className="ai-container ai-cred__grid">
          <figure className="ai-cred__photo">
            <img
              src={BASE + 'portraits/laura-e3.jpg'}
              alt="Laura Cordrey on stage at Ubisoft E3 2019 in Los Angeles"
              loading="lazy"
            />
            <figcaption className="ai-cred__cap">E3 2019 · Los Angeles</figcaption>
          </figure>
          <div className="ai-cred__body">
            <span className="ai-eyebrow ai-eyebrow--gold">I have seen this movie before</span>
            <h2 className="ai-h2">
              The same signal that grows a game community grows the crowd around a model.
            </h2>
            <p className="ai-body-p">
              At Ubisoft I ran the community for Ghost Recon, held it at high positive sentiment through launches and rough patches, then built the first global fan advocacy program for its next release and unveiled it live on the E3 stage. AI products now work the same way.
            </p>
            <div className="ai-cred__source">
              <img
                src={BASE + 'logos/ubisoft-horizontal-white.png'}
                alt="Ubisoft"
                className="ai-cred__logo"
                loading="lazy"
              />
              <span className="ai-cred__where">Where I ran it</span>
            </div>
            <ol className="ai-cred__proof" aria-label="Ghost Recon community leadership">
              <li>
                <b>15M</b>
                <span>players in the live community I managed</span>
              </li>
              <li>
                <b>85%</b>
                <span>positive sentiment held through launches</span>
              </li>
              <li>
                <b>E3</b>
                <span>stage unveil of a first-of-its-kind program</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ─── 3 · FOUR MOVES (dark #15110F) ─────────────────
        * 2×2 grid; cards have a persistent 2px red top-accent bar
        * (per handoff, not just on hover). Hover: lift + gold border. */}
      <section className="ai-band ai-band--moves">
        <div className="ai-container">
          <header className="ai-moves__head">
            <span className="ai-eyebrow ai-eyebrow--gold">The four moves</span>
            <h2 className="ai-h2 ai-moves__title">
              Where fan-led growth pays off for AI
            </h2>
          </header>
          <ol className="ai-moves__grid" aria-label="The four moves">
            {fourMoves.map((m) => (
              <li key={m.n} className="ai-card">
                <span className="ai-card__num">
                  <span className="ai-card__num-i">{m.n}</span>
                  <b> · {m.cat}</b>
                </span>
                <h3 className="ai-card__ttl">{m.title}</h3>
                <p className="ai-card__body">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 4 · WHY I AM AI-NATIVE (deep dark #0E0B09) ────
        * 3-column grid of icon cards. Establishes AI-native creds
        * beyond the sentiment/community claim above. */}
      <section className="ai-band ai-band--native">
        <div className="ai-container">
          <header className="ai-native__head">
            <span className="ai-eyebrow ai-eyebrow--gold">Why I am AI-native</span>
            <h2 className="ai-h2 ai-native__title">
              I do not just advise on this. <mark>I build with it.</mark>
            </h2>
          </header>
          <ol className="ai-native__grid" aria-label="Why I am AI-native">
            {aiNative.map((p) => (
              <li key={p.title} className="ai-icard">
                <span className="ai-icard__icon" aria-hidden="true">{p.icon}</span>
                <h3 className="ai-icard__ttl">{p.title}</h3>
                <p className="ai-icard__body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 5 · MANIFESTO (bone #EFE9DC) ───────────────────
        * Editorial ink-on-bone moment before the finale. */}
      <section className="ai-band ai-band--manifesto">
        <div className="ai-container ai-manifesto">
          <span className="ai-eyebrow ai-eyebrow--red">Not a support function</span>
          {/* Explicit break after "cost.", per Laura, and it has to be
            * explicit. The box here refuses to widen — measured 496px against
            * a 640px parent and a 579px max-width, and neither raising
            * max-width to 40ch nor turning off the inherited text-wrap: balance
            * moved it. So no width setting can produce the wanted break, and a
            * <br> is the honest tool rather than a fight with the box.
            *
            * Hidden below 720px (see .ai-manifesto__brk): forcing this break on
            * a phone would put "It is growth." alone under a two-line first
            * sentence. There it wraps naturally. */}
          <h2 className="ai-h2 ai-manifesto__title">
            None of this is a cost.<br className="ai-manifesto__brk" /> It is <mark>growth.</mark>
          </h2>
          <div className="ai-manifesto__body">
            <p>
              The AI companies that treat the crowd around their model as a growth engine, not a cost, will pull ahead in a way the others cannot buy back.
            </p>
            <p>
            {/* Rewritten twice on 23 Jul 2026.
                *
                * The original opened on three claims that could not be stood
                * behind: "No one has built this for AI products at scale yet"
                * (about everyone else), "I have built the closest thing there
                * is" (a superlative with nothing under it), and "I saw it
                * coming early" (the same self-congratulation cut from the
                * AI-native card the same hour).
                *
                * My first rewrite led with the real numbers but kept the
                * industry claim, reworded as "No one has run it inside an AI
                * company yet". Laura: "I cant claim this i dont know if its
                * true." She was right and I should have caught it, having just
                * flagged the same claim one sentence earlier.
                *
                * The second pass turns it positive, per Laura, and that also
                * removes a duplication: the founding-partner section below
                * already carries the honest version in full ("I have not yet
                * run it inside an AI company, and I am not going to pretend
                * otherwise"), so this paragraph was running the same
                * credential-then-gap beat twice on one page. The disclosure
                * belongs there, next to the terms it justifies; this paragraph
                * states the opportunity instead.
                *
                * It stops short of asking. The finale h2 is already "Who wants
                * to build it with me?" — asking here as well would spend the
                * invitation twice.
                *
                * Third correction: the positive pass left "rather than from the
                * outside" hanging. In the original that clause completed "than
                * WRITE about it from the outside" — drop the writing half and
                * "the outside" has nothing to contrast with, so it read as
                * "build from the outside". Laura: "what does this mean?" It
                * meant nothing. "Inside a team shipping models" carries the
                * embedded idea on its own, so the clause is gone rather than
                * repaired. */}
              I have run this at the scale of a live game: a 15-million-player community, read in real time and held at 85% positive through launches and rough patches. The opportunity now is to build that for AI, inside a team shipping&nbsp;models.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5b · HOW WE'D WORK TOGETHER (espresso) ────────
        * The offer stack: AI is an audience, not a new offer. Three ways
        * in, same jobs as the services page. Keep in sync with /services. */}
      <section className="ai-band ai-band--offers">
        <div className="ai-container">
          <div className="ai-moves__head">
            <span className="ai-eyebrow ai-eyebrow--gold">How we&rsquo;d work together</span>
            <h2 className="ai-h2 ai-moves__title">
              Three ways in, in the order <mark>most AI companies start.</mark>
            </h2>
          </div>
          <ol className="ai-offers__list">
            <li>
              <div className="ai-card">
              <span className="ai-card__num">01</span>
              <h3 className="ai-card__ttl">AI Sentiment SOS</h3>
              <p className="ai-card__body">
                When your community turns on a release, a price change or a deprecation, I read what they are actually saying, find the signal, and hand you a build-ready plan across product, comms and community. The fastest way to stop the bleed, and the work I have done longest.
              </p>
              </div>
            </li>
            <li>
              <div className="ai-card">
              <span className="ai-card__num">02</span>
              <h3 className="ai-card__ttl">The Fan-Led Growth Engine, for AI</h3>
              <p className="ai-card__body">
                Once the fire is out, I build the thing that stops it recurring: the developer and power-user community, the advocacy and ambassador programs, the sentiment defence, all instrumented to adoption and retention.
              </p>
              </div>
            </li>
            <li>
              <div className="ai-card">
              <span className="ai-card__num">03</span>
              <h3 className="ai-card__ttl">Fan Moments</h3>
              <p className="ai-card__body">
                {/* Expanded 23 Jul 2026, per Laura: "dont hesitate to talk about
                  * creator programs here and ugc, very powerful now for AI." Right,
                  * and it is where her proof is strongest: the creator programs are
                  * the Ubisoft work (50M+ UGC views on Siege, Delta Company across
                  * 14 languages), and UGC being what the models read is the argument
                  * the top of this page already makes in "Recommended by the models".
                  * This was the thinnest of the three cards and said the least about
                  * what she actually does. Names no figures — those live on /work
                  * and /services. */}
                A model release or a developer-conference moment your community actually feels. Creator programs and ambassador cohorts around it, so the people with their own audiences turn up early and bring theirs. The UGC that comes out of it is what your next users read, and what the models read too.
              </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ─── 5c · FOUNDING-PARTNER OFFER (espresso, gold card) ─
        * The honest pitch: gaming proof, no AI track record claimed,
        * pioneer terms in exchange for building the case study together. */}
      <section id="founding" className="ai-band ai-band--founding">
        <div className="ai-container">
          <div className="ai-founding__card">
            <span className="ai-eyebrow ai-eyebrow--gold">The founding-partner offer</span>
            <h2 className="ai-h2 ai-founding__title">
              I&rsquo;m taking on a small number of <mark>founding AI partners.</mark>
            </h2>
            <p className="ai-founding__body">
              I have run this playbook at the largest scale in gaming. I have not yet run it inside an AI company, and I am not going to pretend otherwise. So I am taking on a few founding partners at pioneer terms: you get senior, hands-on fan-led growth you could not hire fast enough, and we build the case study together.
            </p>
            <p className="ai-founding__body">
              If you are an AI company between Series A and C, with a passionate user base and no senior community or advocacy leader yet, this is built for you.
            </p>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg ai-founding__cta">
              Talk about a founding-partner pilot</Link>
          </div>
        </div>
      </section>

      {/* ─── 6 · FINALE (oxblood #A12A1E) ──────────────────
        * Gold radial glow from the bottom, bright-gold eyebrow +
        * marked H2, cream primary button, email fallback. */}
      <section className="ai-band ai-band--finale">
        <div aria-hidden="true" className="ai-band__glow ai-band__glow--gold" />
        <div className="ai-container ai-finale">
          <span className="ai-eyebrow ai-eyebrow--brightgold">This is new ground</span>
          <h2 className="ai-finale__title">
            Who wants to build it <mark>with me?</mark>
          </h2>
          <Link to={CONTACT_URL} className="btn btn--lg ai-finale__cta">
            Let&rsquo;s talk</Link>
          <p className="ai-finale__mail">
            Or email <a href={`mailto:${HELLO_EMAIL}`}>{HELLO_EMAIL}</a>
          </p>
        </div>
      </section>
    </div>
  )
}
