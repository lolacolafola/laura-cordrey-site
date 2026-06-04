import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
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
    title: 'Delta Company · Ubisoft’s first community advocacy program · Case study by Laura Cordrey',
    description:
      'Delta Company: the fan-led growth engine I designed and launched at Ubisoft. 130 invited members across 5 community clusters and 14 languages drove 10M+ UGC views — zero paid media. Unveiled live on the UbiE3 2019 stage. The blueprint Ubisoft replicated across franchises.',
    canonical: pageUrl('work/ubisoft-delta-company'),
    ogImage: assetUrl('case-studies/delta/01-delta-badge-hero.png'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'ubisoft-delta-company',
      title: 'Delta Company — Ubisoft’s first community advocacy program',
      description:
        'A fan-led growth engine designed for Ubisoft’s Ghost Recon Breakpoint community. 130 invited members across 5 clusters drove 10M+ UGC views with zero paid media. Unveiled on the UbiE3 2019 stage.',
      image: 'case-studies/delta/01-delta-badge-hero.png',
      datePublished: '2019-06-10',
      client: 'Ubisoft',
      role: 'Community Developer',
      market: 'Global',
      sector: 'Gaming',
      about: ['Fan-Led Growth', 'Community Advocacy Programs', 'Ghost Recon Breakpoint', 'Creator Programs'],
      keywords: ['fan-led growth', 'community advocacy program', 'Ubisoft', 'Ghost Recon Breakpoint', 'UbiE3 2019'],
      principles: [
        'Design the program as a sub-brand',
        'Design for personas, not the average',
        'Build the legal layer in',
      ],
      faqItems: [
        {
          question: 'How should you brand a community advocacy program inside a major game IP?',
          answer:
            'Design the program as a sub-brand. Logo, identity, language, ritual. Built inside the parent IP universe (Ghost Recon Breakpoint, in Delta Company’s case) with its own identity layer that pulls members deeper into the game rather than alongside it.',
        },
        {
          question: 'How do you structure a community advocacy program to serve different fan types?',
          answer:
            'Design for personas, not the average. Delta Company was built around 5 distinct community clusters — creators, artists, cosplayers, feedback specialists, tournament players — each with its own brief and benefits. Designing for the average flattens what makes each persona valuable.',
        },
        {
          question: 'What legal infrastructure does a global community advocacy program need?',
          answer:
            'Member NDAs at onboarding, GDPR-compliant data protection for the application and member data, and jurisdiction-specific processes for EU versus NA. The legal bar has to hold in every market. Compliance infrastructure is what lets the model scale across markets, safely.',
        },
      ],
    }),
  })

  return (
    <article className="delta">
      {/* ─── MASTHEAD ─────────────────────────────────────────── */}
      <div className="container delta__masthead">
        <Link to="/work" className="marker delta__back">
          <span aria-hidden="true">←</span> All work
        </Link>
      </div>

      {/* ─── COVER ────────────────────────────────────────────── */}
      <header className="delta__cover">
        <div className="container">
          <div className="delta__case-meta">
            <span className="marker delta__case-kicker">Case study</span>
            <span className="marker">Ubisoft · Global · 2019–2020</span>
          </div>
          <h1 className="delta__cover-title">
            Creating <mark>Delta Company</mark>.
          </h1>
          <p className="delta__cover-lede">
            I created a first-of-its-kind community advocacy program at
            Ubisoft, built as part of my community strategy for the launch
            of Tom&nbsp;Clancy&rsquo;s Ghost&nbsp;Recon Breakpoint.
            Unveiled live on the E3 stage to millions of viewers.
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
            <span className="delta__stat-value">5</span>
            <span className="marker delta__stat-label">Community clusters</span>
          </li>
          <li>
            <span className="delta__stat-value">14</span>
            <span className="marker delta__stat-label">Languages</span>
          </li>
          <li>
            <span className="delta__stat-value">130</span>
            <span className="marker delta__stat-label">Spots available</span>
          </li>
          <li>
            <span className="delta__stat-value">10M+</span>
            <span className="marker delta__stat-label">UGC views from members</span>
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
            Delta Company is the first community advocacy program of its kind
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
            very different passion drivers: creators (content &amp;
            livestreaming), artists, cosplayers, feedback specialists,
            tournament players — the list goes on.
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
            program, in line with the military branding of the game.
          </p>
        </div>
      </section>

      {/* Takeoff agency recruitment video — used on the E3 stage and in launch comms.
          TODO(laura): drop the file in public/case-studies/delta/ and update the src below. */}
      <figure className="delta__plate">
        <video
          className="delta__cluster-video"
          src={BASE + 'case-studies/delta/clusters-takeoff.mp4'}
          poster={BASE + 'case-studies/delta/03-five-clusters.png'}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Delta Company cluster reveal — animation produced with Takeoff agency, used on the UbiE3 stage and in launch comms"
        />
        <figcaption className="container">
          The cluster reveal animation — produced with Takeoff agency for
          the UbiE3 stage and the program launch comms.
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

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/delta/04-brand-variations.png',
              alt: 'Delta Company brand lockups — primary logo, circular badge variants and isolated mark across black and white treatments',
              caption: 'Brand lockups — primary logo, circular badge, and isolated mark — in monochrome treatments to flex across game UI, merch and marketing.',
            },
            {
              src: 'case-studies/delta/03-five-clusters.png',
              alt: 'The five Delta Company detachments — Company Comms, Special Activities, Mission Intel, Team Operations, Tactical Assault',
              caption: 'The five detachment logos — Company Comms, Special Activities, Mission Intel, Team Operations, Tactical Assault — each designed for a different community archetype.',
            },
          ]}
        />
      </div>

      {/* ─── UBIE3 LAUNCH (came first chronologically) ────────── */}
      <section className="delta__section delta__section--launch container">
        <div className="delta__section-head">
          <span className="marker">[04] · Going live</span>
          <h2 className="delta__section-title">UbiE3 presentation.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <mark>Go big or go home</mark>. That was the mindset when it
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

      {/* ─── Laura on stage — sets visual context for the reveal ── */}
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

      {/* E3 reveal video — flush with the stage photo above, no divider. */}
      <section className="delta__video-section delta__video-section--continuation container">
        <span className="marker">Watch the unveil</span>
        <p className="delta__video-context">
          The Ghost Recon community segment from UbiE3 2019 — Laura
          announcing the key community feedback being implemented in the
          game, then revealing Delta Company live to millions of viewers.
        </p>
        <a
          href="https://www.youtube.com/watch?v=P2tOLL_sAYk"
          target="_blank"
          rel="noreferrer"
          className="delta__video-frame delta__video-thumbnail"
          aria-label="Watch the Ghost Recon Breakpoint E3 2019 conference presentation on YouTube"
        >
          <img
            src="https://i.ytimg.com/vi/P2tOLL_sAYk/maxresdefault.jpg"
            alt="Ghost Recon Breakpoint E3 2019 Conference Presentation — official Ubisoft YouTube upload thumbnail"
          />
          <span className="delta__video-thumbnail-play" aria-hidden="true">▶</span>
        </a>
      </section>

      {/* ─── HOW IT WORKS (recruitment video) ─────────────────── */}
      <section className="delta__video-section delta__video-section--breathe container">
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* ─── ORGANISATION / WEBSITE (was [04] Tools) ──────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] · Organisation</span>
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
          <p>
            I also worked with <strong>Ubisoft&rsquo;s legal teams</strong>{' '}
            to set up the program&rsquo;s compliance infrastructure:
            member NDAs at onboarding, data protection for the
            application and member data, and{' '}
            <strong>jurisdiction-specific processes for EU (GDPR)
            versus NA</strong>. The legal bar held in every market.
          </p>
        </div>
      </section>

      {/* ─── STATS CALL-OUT — US application demand ───────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Demand signal</span>
          <p className="delta__result-value">
            <mark>10K applications</mark>
          </p>
          <p className="delta__result-caption">
            From the USA alone. For 130 invite-only spots.
          </p>
        </div>
      </aside>

      {/* ─── THE MERCH BOX ────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] · The welcome pack</span>
          <h2 className="delta__section-title">FOMO they could show off.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Communities love goodies. Every new Delta member received a
            three-part welcome pack: a custom physical merch box,
            exclusive in-game customisations, and the game itself.
          </p>
          <p>
            <strong>Branded box. Beanie. Flask. Badges. T-shirts.</strong>{' '}
            Plus Ghost Recon Breakpoint marketing materials.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="delta__gallery delta__gallery--three">
          <figure>
            <img
              src={BASE + 'case-studies/ubisoft-delta-pr-pack-real.jpg'}
              alt="Delta Company welcome pack — green flask, badges and key tag laid out alongside Ghost Recon Breakpoint art"
              loading="lazy"
            />
            <figcaption className="marker">Flask, badges, key tag.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/06-merch-beanie.png'}
              alt="Delta Company welcome pack — branded beanie and flask inside the open box with Ghost Recon Breakpoint art"
              loading="lazy"
            />
            <figcaption className="marker">Beanie + flask + badges.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/07-merch-spread.png'}
              alt="Delta Company welcome pack — full spread with two branded t-shirts, beanie, branded box and flask kit"
              loading="lazy"
            />
            <figcaption className="marker">The full spread.</figcaption>
          </figure>
        </div>
      </div>

      {/* In-game customisations — second half of the welcome pack story. */}
      <section className="delta__section delta__section--continuation container">
        <div className="delta__section-head" aria-hidden="true" />
        <div className="delta__section-body">
          <p>
            Inside Ghost Recon Breakpoint, members received{' '}
            <strong>Delta-branded customisations</strong> for their
            characters and vehicles. T-shirts, patches, branded cars —
            all members-only.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="delta__gallery delta__gallery--three">
          <figure>
            <img
              src={BASE + 'case-studies/delta/08-ingame-tshirt.jpg'}
              alt="In-game character wearing a Delta Company branded t-shirt — exclusive Ghost Recon Breakpoint customisation for members"
              loading="lazy"
            />
            <figcaption className="marker">Members&rsquo; in-game branded tee.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/09-ingame-car.jpg'}
              alt="In-game Delta Company branded car driving through Ghost Recon Breakpoint terrain — members-only vehicle customisation"
              loading="lazy"
            />
            <figcaption className="marker">A members-only branded car.</figcaption>
          </figure>
          <figure>
            <img
              src={BASE + 'case-studies/delta/10-ingame-cap-weapon.png'}
              alt="In-game character wearing a Delta Company branded cap and carrying a Delta-stencilled weapon — exclusive Ghost Recon Breakpoint customisations for members"
              loading="lazy"
            />
            <figcaption className="marker">Delta cap + branded weapon.</figcaption>
          </figure>
        </div>
      </div>

      {/* Welcome-pack closer — the metaverse moment. */}
      <section className="delta__section delta__section--continuation container">
        <div className="delta__section-head" aria-hidden="true" />
        <div className="delta__section-body">
          <p>
            The welcome pack was adored by fans — streaming in their
            physical Delta t-shirts while their in-game characters wore
            the exact same one. <mark>True metaverse</mark>.
          </p>
        </div>
      </section>

      {/* ─── STATS CALL-OUT — exclusivity ratio banner ────────── */}
      <aside className="delta__ratio">
        <div className="container delta__ratio-inner">
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">130</span>
            <span className="marker delta__ratio-label">Program members</span>
          </div>
          <span className="delta__ratio-divider" aria-hidden="true">/</span>
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">15,000,000</span>
            <span className="marker delta__ratio-label">Ghost Recon players</span>
          </div>
          <p className="delta__ratio-caption">
            The kind of exclusivity that drives <mark>FOMO and major
            show-off status</mark> for members.
          </p>
        </div>
      </aside>

      {/* ─── [09] GHOST EXPERIENCE — the loop, working ────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] · The loop, in action</span>
          <h2 className="delta__section-title">How Delta saved the game.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            When Ghost Recon Breakpoint launched, the wider community
            wasn&rsquo;t satisfied with the direction. Sentiment across
            the {' '}<strong>15M-strong Ghost Recon community</strong>{' '}
            sank to <mark>50% negative</mark>.
          </p>
          <p>
            Delta Company was the answer Ubisoft already had in the
            room. By design, the program selected for the deepest,
            most-knowledgeable players — and each member had{' '}
            <strong>their own influence over their own community</strong>.
            They weren&rsquo;t generic playtesters. They were the
            people other players already listened to.
          </p>
          <p>
            The program was pivoted into a feedback engine. Workshops,
            playtests and early-capture sessions ran between Delta
            members and the Studio — and the feedback fed directly into
            the <strong>Ghost Experience</strong> live update, a
            top-to-bottom re-tuning of the game shaped by what members
            had told us. Then those same members carried the story
            back to their communities.
          </p>
          <p>
            Sentiment climbed to {' '}<mark>80% positive</mark>. A
            community-led save of a major AAA launch.
          </p>
        </div>
      </section>

      {/* Ghost Experience video — visually part of [08], no divider above. */}
      <section className="delta__video-section delta__video-section--continuation container">
        <span className="marker">A community journey</span>
        <p className="delta__video-context">
          A behind-the-scenes documentary <strong>I produced</strong> on
          the Ghost Experience update — the live re-tuning of Ghost Recon
          Breakpoint, directly shaped by Delta Company member feedback.
        </p>
        <div className="delta__video-frame">
          <iframe
            src="https://www.youtube.com/embed/F5g7fOzxGYY"
            title="A Community Journey to the Ghost Experience — Tom Clancy's Ghost Recon Breakpoint"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>


      {/* ─── [09] WORLD TOUR — community events after the save ──── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[09] · On tour</span>
          <h2 className="delta__section-title">A standing invitation.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            With the program proven and the community back on side,
            Ubisoft began running in-person community events around the
            world. Delta Company members had{' '}
            <strong>a standing invitation</strong> to attend and
            participate at every one.
          </p>
          <p>
            Birmingham, Sydney, Paris — and onwards. Members met the
            Studio in person, met each other, and carried the story back
            to their communities with the kind of texture only physical
            events can produce. <mark>Digital advocates became in-person
            ambassadors</mark>.
          </p>
        </div>
      </section>

      <figure className="delta__plate">
        <img
          src={BASE + 'case-studies/delta/13-ubisoft-experience-poster.avif'}
          alt="Official Ubisoft Experience 2019 poster — neon &lsquo;Experience&rsquo; sign on a graffiti wall, with the three host cities Sydney, Paris and Birmingham listed below"
        />
        <figcaption className="container">
          The official Ubisoft Experience 2019 poster — Sydney, Paris
          and Birmingham, the events Delta members were flown to.
        </figcaption>
      </figure>

      <figure className="delta__plate">
        <img
          src={BASE + 'case-studies/delta/fans/ComDevsUbiXP.jpg'}
          alt="Laura Cordrey on stage at the Paris 2019 Ubisoft Experience with two Delta Company members, in front of the Delta Company logo"
        />
        <figcaption className="container">
          On stage at the Paris 2019 Ubisoft Experience — where Delta
          members joined us to talk about their experience.
        </figcaption>
      </figure>

      {/* ─── [10] TAKEAWAY ────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[10] · The takeaway</span>
          <h2 className="delta__section-title">A whole universe.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            Delta Company wasn&rsquo;t just a feedback loop. It was the
            cosplayers, the artists, the tournament players, the
            streamers, the video-makers. <mark>A whole universe of
            fan-led content built around the game</mark>.
          </p>
          <p>
            <strong>Not a dollar changed hands.</strong> No paid creators,
            no media spend, no sponsored posts. This was built on
            respect, support and pure brand love. Studio and community
            meeting as equals. Earned, not paid for. A fan-powered
            growth engine, structured to scale.
          </p>
          <p>
            <strong>Three key takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Design the program as a sub-brand</mark>.</strong>{' '}
            Logo, identity, language, ritual. Built inside the Ghost
            Recon Breakpoint universe, with its own identity layer that
            pulled members deeper into the game.
          </p>
          <p>
            <strong>2. <mark>Design for personas, not the average</mark>.</strong>{' '}
            Five detachments mapped to five community archetypes:
            cosplayers, video-makers, strategists, competitive players,
            comms. Each with their own brief, their own brand.
          </p>
          <p>
            <strong>3. <mark>Build the legal layer in</mark>.</strong>{' '}
            NDAs, data protection, jurisdiction-specific process.
            Compliance infrastructure is what lets you scale across
            markets, safely.
          </p>
        </div>
      </section>

      {/* Fan UGC carousel — proof of the "whole universe" claim above. */}
      <div className="container delta__fan-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/delta/fans/image0.jpg',
              alt: 'Delta Company members gathered at the Ghost Recon Breakpoint booth — ten community members posing together in branded gear',
              caption: 'Delta members in the wild — the program in person, at the booth.',
            },
            {
              src: 'case-studies/delta/fans/EIeDXghX0AEY945.jpg',
              alt: 'Hooded, masked Ghost Recon cosplayer with rifle — high-art photograph by Mademoiselle Bellec',
              caption: 'Cosplay as photography — shot by member Mademoiselle Bellec.',
            },
            {
              src: 'case-studies/delta/fans/EJBtWpTXYAAmlI3.jpg',
              alt: 'Brother vs Brother — a fan-made digital art composition depicting Ghost Recon Breakpoint protagonists facing off',
              caption: 'Fan art — "Brother vs Brother", made by a member.',
            },
            {
              src: 'case-studies/delta/fans/EJfvV_AU8AIAsfF.jpg',
              alt: 'Fan-made YouTube video thumbnail — "Beginners Guide to Base Jumping" by NGN, a Delta Company creator',
              caption: 'Fan video — "Beginners Guide to Base Jumping" by member channel NGN.',
            },
            {
              src: 'case-studies/delta/fans/EHeMce6XkAAJuLI.jpg',
              alt: 'Ghost Recon cosplayer carrying a wounded teammate over their shoulder — dramatic action photograph',
              caption: 'A cosplay action shot — staged by members for the community.',
            },
            {
              src: 'case-studies/delta/fans/EDe8lJCWkAAY0Eh.jpg',
              alt: 'Five Delta Company members in branded t-shirts and caps posing together, one holding a replica weapon',
              caption: 'Delta members in branded kit — a community within a community.',
            },
          ]}
        />
      </div>

      {/* ─── 10M UGC RESULT BANNER ───────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">The proof</span>
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
          <span className="marker">Want this for your brand?</span>
          <h2 className="delta__cta-title">
            Let&rsquo;s build one <mark>just like it</mark>.
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
