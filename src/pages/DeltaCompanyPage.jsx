import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css'

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Delta Company — bespoke case study page.
 * Structure ports Laura's Wix Ubisoft case study page top-to-bottom:
 * cover · overview · strategy (clusters) · brand · tools · how-it-works ·
 * UbiE3 launch · expanding the universe (goodies + in-game) · feedback loop.
 */

export default function DeltaCompanyPage() {
  useDocumentMeta({
    title: 'Delta Company · Ubisoft Creator Advocacy Program · Case Study by Laura Cordrey',
    description:
      'How I designed and launched Delta Company — a first-of-its-kind creator advocacy program at Ubisoft. Unveiled live on the E3 2019 stage. 5 community clusters, 14 languages, 130 invited members, 60M+ UGC reach.',
    canonical: '/work/delta-company',
  })

  return (
    <article className="delta">
      {/* ─── MASTHEAD ─────────────────────────────────────────── */}
      <div className="container delta__masthead">
        <Link to="/work" className="marker delta__back">
          <span aria-hidden="true">←</span> All work
        </Link>
        <span className="marker">Ubisoft · 2018 — 2020</span>
      </div>

      {/* ─── COVER ────────────────────────────────────────────── */}
      <header className="delta__cover">
        <div className="container">
          <span className="marker delta__case-kicker">Case study · Vol. 01</span>
          <h1 className="delta__cover-title">
            Creating <mark>Delta Company.</mark>
          </h1>
          <p className="delta__cover-lede">
            A first-of-its-kind creator advocacy program at Ubisoft.
            My idea. My program. My launch. Unveiled live on the
            E3 stage to millions of viewers.
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/delta/01-delta-badge-hero.png'}
          alt="The Tom Clancy's Ghost Recon Delta Company badge — the brand mark Laura designed for the program"
        />
      </figure>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">10M+</span>
            <span className="marker delta__stat-label">UGC views from members</span>
          </li>
          <li>
            <span className="delta__stat-value">50% → 80%</span>
            <span className="marker delta__stat-label">Sentiment swing<br />(neg → pos, post-Breakpoint)</span>
          </li>
          <li>
            <span className="delta__stat-value">130</span>
            <span className="marker delta__stat-label">Invited members</span>
          </li>
          <li>
            <span className="delta__stat-value">14</span>
            <span className="marker delta__stat-label">Languages</span>
          </li>
        </ul>
      </section>

      {/* ─── OVERVIEW ─────────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] · An overview</span>
          <h2 className="delta__section-title">Delta Company.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Delta Company is the first creator advocacy program of its kind
            for both Ubisoft and the wider gaming industry — creating a
            stronger link between gaming studios and their core community.
            A genuine win-win: members get behind-the-scenes access to the
            games they love; studios get a continuous stream of considered
            community feedback and UGC.
          </p>
          <p>
            Available worldwide, this was the <strong>first Ubisoft
            program accessible in 14 languages</strong> — opening it to
            non-English speaking candidates for the first time. By launch,
            central and local Ubisoft teams across markets were running
            events, workshops, playtests and early-capture sessions with
            their 130 invited members.
          </p>
        </div>
      </section>

      {/* ─── GAME ART (Ghost Recon Breakpoint) ────────────────── */}
      <figure className="delta__plate">
        <img
          src={BASE + 'case-studies/delta/02-ghost-recon-keyart.jpg'}
          alt="Tom Clancy's Ghost Recon Breakpoint key art — the game Delta Company was built around"
        />
        <figcaption className="container">
          Tom Clancy&rsquo;s Ghost Recon Breakpoint — the AAA Ubisoft title
          Delta Company was built around.
        </figcaption>
      </figure>

      {/* ─── STRATEGY: GETTING TO DELTA ───────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] · The strategy</span>
          <h2 className="delta__section-title">Getting to Delta.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The gaming community is made up of multiple player-types with
            very different passion drivers: artists, cosplayers, explorers,
            feedback specialists, tournament players — the list goes on.
          </p>
          <p>
            <strong>I wanted to find an efficient way to speak with each
            of these audiences and engage them on their terms.</strong>
          </p>
          <p>
            So I built Delta Company around <mark>five distinct
            clusters</mark>, each targeting a different player and
            community-member type. The structure didn&rsquo;t just
            facilitate recruitment and engagement — it gave every member
            a clear role and a strong sense of belonging within the
            program.
          </p>
        </div>
      </section>

      <figure className="delta__plate delta__plate--light">
        <img
          src={BASE + 'case-studies/delta/03-five-clusters.png'}
          alt="The five Delta Company detachments — Company Comms, Special Activities, Mission Intel, Team Operations, Tactical Assault"
        />
        <figcaption className="container">
          The five detachments — Company Comms, Special Activities,
          Mission Intel, Team Operations, Tactical Assault — each one
          designed for a different community archetype.
        </figcaption>
      </figure>

      {/* ─── BRAND ────────────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] · The brand</span>
          <h2 className="delta__section-title">The Delta brand.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The brand was a vital part of the project. It needed to
            compliment the game it was created for — Ghost Recon
            Breakpoint — and stand strong as a brand in its own right.
          </p>
          <p>
            I led the brief and worked with the internal Ubisoft design
            team behind the Ghost Recon Breakpoint brand to produce key
            art and multiple logo lockups. Final brand designed in close
            collaboration with Diana Da Costa.
          </p>
        </div>
      </section>

      <figure className="delta__plate delta__plate--light">
        <img
          src={BASE + 'case-studies/delta/04-brand-variations.png'}
          alt="Delta Company brand lockups — primary logo, circular badge variants and isolated mark across black and white treatments"
        />
        <figcaption className="container">
          Brand lockups — primary logo, circular badge, and isolated
          mark — in monochrome treatments to flex across game UI,
          merch and marketing.
        </figcaption>
      </figure>

      {/* ─── TOOLS / WEBSITE ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] · The tools</span>
          <h2 className="delta__section-title">Keeping things organised.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Delta Company needed to be visible, easy to understand and
            easy to manage. I worked with the internal IT team to
            commission a dedicated website for the program — homepage,
            FAQ and application form — all <strong>localised in 14
            languages</strong>. A custom back-end let regional teams
            manage their own applications.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS (recruitment video) ─────────────────── */}
      <section className="delta__video-section container">
        <div className="delta__section-head">
          <span className="marker">[05] · How it works</span>
          <h2 className="delta__section-title">A deep-dive explanation.</h2>
        </div>
        <p className="delta__video-context">
          Video is the easiest format to digest, so I produced a
          &ldquo;How it Works&rdquo; explainer to sit on the Delta
          Company homepage. This became the main recruitment and
          marketing asset for the program launch.
        </p>
        <div className="delta__video-frame">
          <iframe
            src="https://www.youtube.com/embed/qFMQEaAKtO8"
            title="Delta Company — How it Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* ─── UBIE3 LAUNCH ─────────────────────────────────────── */}
      <section className="delta__section delta__section--launch container">
        <div className="delta__section-head">
          <span className="marker">[06] · Going live</span>
          <h2 className="delta__section-title">UbiE3 presentation.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <mark>Go big or go home.</mark> That was the mindset when it
            came to announcing Delta Company to the world. With a slot on
            the biggest stage in gaming, the program was revealed live at
            UbiE3 2019 — to millions of viewers.
          </p>
          <p>
            I worked with branding agency <strong>Takeoff</strong> to
            produce the E3 stage assets and the community segment of
            the broader Ghost Recon presentation.
          </p>
        </div>
      </section>

      {/* ─── E3 SEGMENT VIDEO — full-width banner moment ────── */}
      <figure className="delta__video-banner">
        <div className="delta__video-banner-frame">
          <iframe
            src="https://www.youtube.com/embed/F5g7fOzxGYY"
            title="UbiE3 2019 — Community Segment + Delta Company reveal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <figcaption className="container delta__video-banner-caption">
          The full Ghost Recon community segment from UbiE3 2019. I
          announced the key community feedback being implemented in
          the game, then revealed Delta Company for the first time.
        </figcaption>
      </figure>

      {/* ─── Laura on stage — smaller plate after the video ──── */}
      <figure className="delta__plate">
        <img
          src={BASE + 'case-studies/delta/05-laura-e3-stage.jpg'}
          alt="Laura Cordrey on the UbiE3 2019 stage in Los Angeles, presenting Delta Company in front of the cluster detachment badges"
        />
        <figcaption className="container">
          On the UbiE3 stage in Los Angeles, with the five detachment
          badges projected behind me.
        </figcaption>
      </figure>

      {/* ─── THE MERCH BOX ────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] · The merch box</span>
          <h2 className="delta__section-title">A welcome they could hold.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Communities love goodies. I worked with internal merchandising
            teams to design a custom Delta Company goodie box — sent to
            every new member as their official welcome.
          </p>
          <p>
            <strong>Branded box. Beanie. Flask. Badges. T-shirts.</strong>{' '}
            Plus Ghost Recon Breakpoint marketing materials. The kind of
            unboxing that makes someone feel like they&rsquo;re joining
            something — because they are.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="delta__gallery delta__gallery--three">
          <figure>
            <img
              src={BASE + 'case-studies/ubisoft-delta-pr-pack-real.jpg'}
              alt="Delta Company creator pack — flask, badges and key tag laid out alongside Ghost Recon Breakpoint art"
              loading="lazy"
            />
            <figcaption className="marker">Flask, badges, key tag.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/08-goodie-box-shelf1.jpg'}
              alt="Delta Company goodie box — first shelf reveal with branded beanie"
              loading="lazy"
            />
            <figcaption className="marker">First reveal — beanie + box.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/09-goodie-box-full.jpg'}
              alt="Delta Company goodie box — full kit with t-shirts, beanie, flask, badges and Ghost Recon Breakpoint art"
              loading="lazy"
            />
            <figcaption className="marker">The full spread.</figcaption>
          </figure>
        </div>
      </div>

      {/* ─── EXCLUSIVITY RATIO (interstitial banner) ──────────── */}
      <aside className="delta__ratio">
        <div className="container delta__ratio-inner">
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">130</span>
            <span className="marker delta__ratio-label">Invited members</span>
          </div>
          <span className="delta__ratio-divider" aria-hidden="true">/</span>
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">15,000,000</span>
            <span className="marker delta__ratio-label">Ghost Recon players</span>
          </div>
          <p className="delta__ratio-caption">
            <mark>The kind of exclusivity money cannot buy.</mark>
          </p>
        </div>
      </aside>

      {/* ─── IN-GAME CUSTOMISATIONS ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] · In-game</span>
          <h2 className="delta__section-title">Exclusivity worn in-game.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Inside Ghost Recon Breakpoint, members received{' '}
            <strong>Delta-branded customisations</strong> for their
            characters and vehicles. T-shirts, patches, branded cars —
            all members-only.
          </p>
          <p>
            Walk into any Ghost Recon lobby and you might cross paths
            with a stranger wearing one. That tiny visible signal told
            <strong> the other 14,999,870 players</strong> the wearer
            was inside something they couldn&rsquo;t buy their way into.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="delta__gallery delta__gallery--three">
          <figure>
            <img
              src={BASE + 'case-studies/delta/10-character-delta-tshirt.jpg'}
              alt="In-game character wearing a Delta Company branded t-shirt — exclusive Ghost Recon Breakpoint customisation for members"
              loading="lazy"
            />
            <figcaption className="marker">Members&rsquo; in-game branded tee.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/07-branded-car-in-game.png'}
              alt="In-game Delta Company branded car — exclusive vehicle customisation for members"
              loading="lazy"
            />
            <figcaption className="marker">A members-only branded car.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/11-character-delta-hat.png'}
              alt="In-game character wearing a Delta Company branded cap and carrying a Delta-stencilled weapon — exclusive Ghost Recon Breakpoint customisations for members"
              loading="lazy"
            />
            <figcaption className="marker">Delta cap + branded weapon — members only.</figcaption>
          </figure>
        </div>
      </div>

      {/* ─── FEEDBACK LOOP / RESULTS ──────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[09] · The outcome</span>
          <h2 className="delta__section-title">A feedback loop.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            When Ghost Recon Breakpoint launched badly — community
            sentiment <mark>50% negative</mark> out of the gate — Delta
            Company became the feedback engine that turned it around.
            Within months, sentiment was <mark>80% positive</mark>.
          </p>
          <p>
            On the way, it took members on a journey that produced
            educated, considered UGC at scale — Studio and community in
            real partnership. The kind of content money cannot buy.
          </p>
        </div>
      </section>

      {/* ─── 10M UGC RESULT BANNER ───────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">The receipt</span>
          <p className="delta__result-value">
            <mark>10M+ UGC views</mark>
          </p>
          <p className="delta__result-caption">
            From program members alone. From 130 people. The kind of
            distribution most paid campaigns never reach.
          </p>
        </div>
      </aside>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="delta__cta">
        <div className="container delta__cta-inner">
          <span className="marker">Want a Delta Company for your brand?</span>
          <h2 className="delta__cta-title">
            Let&rsquo;s build one <mark>just like it.</mark>
          </h2>
          <div className="delta__cta-buttons">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary btn--lg"
            >
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
            <Link to="/work" className="btn btn--ghost btn--lg">
              More work
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
