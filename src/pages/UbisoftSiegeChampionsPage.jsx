import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Ubisoft · Siege Champions Program — bespoke case study page.
 *
 * Structure: cover + 4-stat row + 9 numbered sections + CTA.
 *   [01] Where it started      after Delta, the model needed to scale
 *   [02] The opportunity       Rainbow Six Siege — 70M+ players, creator-led community
 *   [03] The program           Siege Champions: invite-only, 200 members, 18 markets
 *   [04] The mechanic          seasonal cadence + perks + Twitch Drop charms (+ carousel)
 *                              (+ "Demand signal" stat callout)
 *   [05] Season 1 results      Y6S1: 6M views, 2.4M hours, 393K interactions, $0 spend
 *                              (+ "The proof" stat callout)
 *   [06] What members did      BikiniBodhi 1.3M-view Crimson Heist video, creator content
 *   [07] The legacy            now among the rarest skins in Siege (+ carousel of proof)
 *                              (+ "The legacy" stat callout)
 *   [08] By end of year 1      50M+ UGC views, 87% activations, 83% sentiment
 *   [09] The takeaway          three repeatable learnings
 *
 * Reuses the .delta__* class system. Same visual grammar as the Delta
 * and US Mobile bespoke pages.
 */
export default function UbisoftSiegeChampionsPage() {
  useDocumentMeta({
    title: 'Ubisoft Siege Champions Program · A fan-powered growth engine, at scale · Case study by Laura Cordrey',
    description:
      'Siege Champions: I took the Delta Company playbook and scaled it through Rainbow Six Siege. 200 invite-only creators across 18 markets reached 50M+ eyeballs in year one — zero media spend. Fan-led growth, engineered to compound across seasonal drops.',
    canonical: pageUrl('work/ubisoft-siege-champions'),
    ogImage: assetUrl('case-studies/ubisoft-siege-champions-program-banner.png'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'ubisoft-siege-champions',
      title: 'Siege Champions Program — a fan-powered growth engine at scale',
      description:
        '200 invite-only creators across 18 markets drove 50M+ UGC views in year one with $0 media spend. The Delta Company playbook applied to Rainbow Six Siege.',
      image: 'case-studies/ubisoft-siege-champions-program-banner.png',
      datePublished: '2021-01-15',
      about: ['Fan-Led Growth', 'Creator Programs', 'Ubisoft', 'Rainbow Six Siege', 'Community Advocacy'],
      keywords: ['fan-powered growth engine', 'creator program', 'Ubisoft', 'Rainbow Six Siege', 'community advocacy'],
      principles: [
        'Build with the existing structure, not against it',
        'Exclusivity plus early access creates coordinated pulsepoints',
        'It is a scalable playbook',
      ],
      faqItems: [
        {
          question: 'How do you scale a community advocacy program through a major live-service game?',
          answer:
            'Build with the existing structure, not against it. Rainbow Six Siege already ran a seasonal release cadence. The Siege Champions program rode that cycle and amplified every drop, instead of carving out separate marketing moments that competed with the game’s own rhythm.',
        },
        {
          question: 'What drives organic creator content around a product launch?',
          answer:
            'Exclusivity plus early access creates coordinated pulsepoints. Invite-only status combined with first-look material gives creators a natural reason to publish during the moments that matter most. The result is a coordinated content pulse around every drop, without paying for media.',
        },
        {
          question: 'Can a fan-led growth program scale across different game IPs?',
          answer:
            'Yes. The same playbook that built Delta Company also built Siege Champions and Assassin’s Creed Mentors Guild. The model travels — a fan-powered growth engine that drives reach, engagement and advocacy paid media cannot manufacture.',
        },
      ],
    }),
  })

  return (
    <article className="delta">
      {/* ─── MASTHEAD ─────────────────────────────────────────── */}
      <div className="container delta__masthead">
        <Link to="/work" className="marker delta__back">
          <span aria-hidden="true">&larr;</span> All work
        </Link>
      </div>

      {/* ─── COVER ────────────────────────────────────────────── */}
      <header className="delta__cover">
        <div className="container">
          <div className="delta__case-meta">
            <span className="marker delta__case-kicker">Case study</span>
            <span className="marker">Ubisoft · 2020–2021 · Global</span>
          </div>
          <h1 className="delta__cover-title">
            Building <mark>Siege Champions Program</mark>.
          </h1>
          <p className="delta__cover-lede">
            Community creators at scale. An invite-only program for
            Rainbow Six Siege, rolled out from my tried-and-tested
            blueprint. 200 creators across 18 markets.{' '}
            <mark>Paid in status, not dollars.</mark>
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      {/* Official Siege Champions Program key art — two operators in
          program skins with the program logo. The actual program brand
          asset, replacing the earlier wordmark-on-black placeholder. */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/ubisoft-siege-champions-program-banner.png'}
          alt="Siege Champions Program — official key art with two operators in program skins, the SIEGE CHAMPIONS PROGRAM logo, and a vivid coloured-spray backdrop"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">50M+</span>
            <span className="marker delta__stat-label">UGC views, year one</span>
          </li>
          <li>
            <span className="delta__stat-value">200</span>
            <span className="marker delta__stat-label">Invite-only members</span>
          </li>
          <li>
            <span className="delta__stat-value">18</span>
            <span className="marker delta__stat-label">Markets</span>
          </li>
          <li>
            <span className="delta__stat-value">$0</span>
            <span className="marker delta__stat-label">Media spend</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] · Where it started</span>
          <h2 className="delta__section-title">The blueprint came first.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            I launched <strong>Delta Company</strong> first: a community
            advocacy program for Tom&nbsp;Clancy&rsquo;s Ghost Recon
            Breakpoint. <mark>The first of its kind at Ubisoft, and for
            any major AAA title.</mark> Delta proved a hand-picked
            group of community members could become both a marketing
            channel and a product-support layer in a moment of crisis.
          </p>
          <p>
            That became <mark>the blueprint</mark> I rolled out to Rainbow
            Six Siege, with tweaks to improve the model along the way.
            The same blueprint later powered Assassin&rsquo;s Creed&rsquo;s
            Mentors Guild, where I delivered the strategy.
          </p>
          <p>
            <Link to="/work/ubisoft-delta-company" className="marker delta__play-link">
              See the Delta Company case study <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ─── RAINBOW SIX KEY ART (between [01] and [02]) ─────── */}
      {/* Cinematic break: the game the Siege Champions program was built around. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/rainbow-six-siege-key-art.jpg'}
          alt="Tom Clancy's Rainbow Six Siege key art — two operators in tactical gear against a fiery battle scene"
        />
        <figcaption className="container">
          Tom Clancy&rsquo;s Rainbow Six Siege — the AAA title the program
          was built around.
        </figcaption>
      </figure>

      {/* ─── [02] THE OPPORTUNITY ─────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] · The opportunity</span>
          <h2 className="delta__section-title">A creator-led community at scale.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Rainbow Six Siege was a different beast. A{' '}
            <strong>70M+ player AAA live game</strong> with a seasonal
            release cadence, a competitive scene, and one critical
            characteristic: content creators were already shaping the
            conversation.
          </p>
          <p>
            Streamers, YouTubers and video-makers had become the loudest
            voices in the community. The opportunity was to formalise that
            into a structured program — and treat creators as media
            partners, not influencers to pay.
          </p>
        </div>
      </section>

      {/* ─── [03] THE PROGRAM ─────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] · The program</span>
          <h2 className="delta__section-title">Siege Champions.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            In collaboration with the Studio team, Siege Champions came
            to life: invite-only, <mark>200 members across 18 markets</mark>,
            the majority video content creators and streamers, alongside
            cosplayers and artists. Bespoke onboarding, a brand identity,
            and a clear value exchange between members and the studio.
          </p>
          <p>
            Members got perks money normally can&rsquo;t buy: early build
            access, exclusive in-game skins and charms designed for the
            program, dedicated studio engagement. In return, they
            brought their passion, and their audiences.
          </p>
          <p>
            Behind the scenes, I worked with{' '}
            <strong>Ubisoft&rsquo;s legal teams</strong> on the
            program&rsquo;s compliance infrastructure: member NDAs at
            onboarding, data protection for the application and member
            data, and{' '}
            <strong>jurisdiction-specific processes for EU (GDPR)
            versus NA</strong>. The legal bar held across all 18 markets.
          </p>
        </div>
      </section>

      {/* ─── SOCIAL VIDEO GRID (moved up from [04]) ───────────── */}
      {/* The four-item social set showing what members got. */}
      <div className="delta__social-grid delta__social-grid--four">
        <video
          src={BASE + 'case-studies/ubisoft-siege-champions-rook-dark.mp4'}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Rainbow Six Siege Siege Champions Program social asset — exclusive Rook character skin reveal, dark cinematic version"
        />
        <video
          src={BASE + 'case-studies/ubisoft-siege-champions-social-smg.mp4'}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Rainbow Six Siege Siege Champions Program social asset — exclusive SMG weapon skin reveal"
        />
        <video
          src={BASE + 'case-studies/ubisoft-siege-champions-social-charm-members.mp4'}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Rainbow Six Siege Siege Champions Program social asset — exclusive members-only charm reveal"
        />
        <video
          src={BASE + 'case-studies/ubisoft-siege-champions-commspirit-dark.mp4'}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Rainbow Six Siege Siege Champions Program social asset — Community Spirit Twitch Drop giveaway charm reveal, dark cinematic version"
        />
        <p className="delta__social-credit">
          The four exclusive in-game items made for program members —
          Rook skin, SMG, members charm, giveaway charm. Video assets
          created by <strong>Gabriel Virata Alves</strong>.
        </p>
      </div>

      {/* ─── DEMAND SIGNAL CALLOUT — proof the program had appeal ─ */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Demand signal</span>
          <p className="delta__result-value">
            <mark>100% recruitment targets met</mark>
          </p>
          <p className="delta__result-caption">
            Every seat filled. 200 members across 18 markets, the majority
            content creators and streamers, the people already shaping the
            Rainbow Six Siege conversation.
          </p>
        </div>
      </aside>

      {/* ─── [04] THE MECHANIC ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] · The mechanic</span>
          <h2 className="delta__section-title">One pulsepoint per season.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Siege runs a seasonal release cadence. The program
            concentrated all member activity into one moment per
            season. What I call a <mark>pulsepoint</mark>.
          </p>
          <p>
            At every pulsepoint, members got{' '}
            <strong>the same treatment as press</strong>: dev team
            briefings, early build access, content packs, PR-ready
            assets. At launch, every member also received{' '}
            <strong>two exclusive Twitch Drop charms</strong> to give
            away to their audiences.
          </p>
          <p>
            Exclusivity + early access + a giveaway lever ={' '}
            <mark>a coordinated creator sprint timed to the seasonal
            hype window.</mark>
          </p>
        </div>
      </section>

      {/* ─── [05] FIRST PULSEPOINT RESULTS ────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] · First pulsepoint</span>
          <h2 className="delta__section-title">The mechanic worked.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            That pulsepoint? <strong>Operation Crimson Heist, Y6S1</strong>.
            The mechanic&rsquo;s first run.
          </p>
          <p>
            On a paid-media basis, those numbers are a{' '}
            <strong>six-figure media spend</strong>. We didn&rsquo;t
            spend it. The value exchange did the work.
          </p>
        </div>
      </section>

      {/* ─── STATS CALL-OUT — the proof ───────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">The proof</span>
          <p className="delta__result-value">
            <mark>Six figures in earned media. $0 spent.</mark>
          </p>
          <p className="delta__result-caption">
            6M video views, 2.4M live watch-hours, 393K interactions.
            All from one pulsepoint.
          </p>
        </div>
      </aside>

      {/* ─── [06] BY END OF YEAR 1 (year wrap) ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] · By end of year 1</span>
          <h2 className="delta__section-title">The full-year picture.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            One season was the proof. The full year was the playbook in
            action.
          </p>
          <p>
            <strong>50M+ UGC views</strong> across the program.{' '}
            <strong>87% activations held</strong> across the four seasons.{' '}
            <strong>90% member engagement</strong> rate inside activations.{' '}
            <strong>83% average positive sentiment</strong> from internal
            surveys.
          </p>
          <p>
            A repeatable media-channel model for creators, artists and
            cosplayers. Ready to run again.
          </p>
        </div>
      </section>

      {/* ─── COMMUNITY ROUND-UP CAROUSEL (between [06] and [07]) ── */}
      {/* Fan art made by program members — what 50M+ UGC views actually
          looked like. Same pattern as Delta Company's fan UGC carousel. */}
      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-bloodhound.png',
              alt: 'Fan art of a basset hound dressed as a noble lord on a red throne, with the SIEGE CHAMPIONS PROGRAM logo',
              caption:
                'By Bloodhound. Member of the Siege Champions Program.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-kuroninji.png',
              alt: 'Cosplay photograph of a Siege operator in tactical gear and helmet against a purple-blue gradient backdrop with the SIEGE CHAMPIONS PROGRAM logo',
              caption:
                'Cosplay by KuroNinji. Member of the Siege Champions Program.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-katamari.png',
              alt: 'Fan art of an operator in a tactical mask and glasses holding a wax-sealed Siege Champions Program invite letter',
              caption:
                'By Kalamri. Member of the Siege Champions Program.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-absoluteaj.png',
              alt: 'YouTube video thumbnail by AbsoluteAJ titled &lsquo;I AM A SIEGE CHAMPION — Rainbow Six Champions Program&rsquo;, featuring the official Siege Champions key art',
              caption:
                'Video by AbsoluteAJ. “I AM A SIEGE CHAMPION.” Member of the Siege Champions Program.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-redlolirani.png',
              alt: 'Cosplay photograph of a Siege operator with blonde hair and goggles, in tactical gear with American flag patch, against a desert backdrop with the SIEGE CHAMPIONS PROGRAM logo',
              caption:
                'Cosplay by Redlolirani. Member of the Siege Champions Program.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-fan-art-muffled.png',
              alt: 'Anime-style fan art of a blonde character in a cardigan holding a handgun, with the SIEGE CHAMPIONS PROGRAM logo on a soft purple backdrop',
              caption:
                'By Muffled. Member of the Siege Champions Program.',
            },
          ]}
        />
      </div>

      {/* ─── [07] THE LEGACY ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] · The legacy</span>
          <h2 className="delta__section-title">Among the rarest skins in Siege.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Years on, the community is{' '}
            <mark>still talking about it</mark>. The program&rsquo;s
            exclusive skins and charms are some of the rarest items in
            Siege.
          </p>
          <p>
            A top r/Rainbow6 post calls the bundle{' '}
            <em>&ldquo;The Rarest Skin Bundle in Siege — even rarer than
            the Board Game skins.&rdquo;</em>
          </p>
        </div>
      </section>

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/ubisoft-siege-champions-reddit-post-full.png',
              alt: 'Full r/Rainbow6 post by u/GridlockAssMyFav titled &lsquo;Siege Champions Program — The Rarest Skin Bundle in Siege (Even Rarer Than the Board Game Skins)&rsquo;',
              caption:
                'r/Rainbow6 community thread, two years after the program shipped.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-rarest-skin-reddit-body.png',
              alt: 'r/Rainbow6 post body text describing the Siege Champions Program as an invite-only 2021 program, with secondary-market resale prices of ~20K credits for the headgear, ~40K for the uniform, ~100K for the weapon skin',
              caption:
                'The text, in full.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-ingame-headgear.webp',
              alt: 'In-game inventory preview of the Siege Champions Program Rook headgear — Y6S1, Epic rarity',
              caption:
                'The members-only Rook headgear, as it appears in-game. Siege Champions Program · Y6S1 · Epic.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-ingame-uniform.webp',
              alt: 'In-game inventory preview of the Siege Champions Program uniform — Y6S1, Epic rarity, with the SIEGE chest insignia',
              caption:
                'The members-only uniform, as it appears in-game. SIEGE chest insignia. Y6S1 · Epic.',
            },
            {
              src: 'case-studies/ubisoft-siege-champions-ingame-mp5.webp',
              alt: 'In-game inventory preview of the Siege Champions Program MP5 weapon skin — Y6S1, Epic rarity',
              caption:
                'The members-only MP5 weapon skin, as it appears in-game. Siege Champions Program · Y6S1 · Epic.',
            },
          ]}
        />
      </div>

      {/* ─── RATIO CALLOUT — exclusivity (Delta-style striped band) ─ */}
      <aside className="delta__ratio">
        <div className="container delta__ratio-inner">
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">200</span>
            <span className="marker delta__ratio-label">Program members</span>
          </div>
          <span className="delta__ratio-divider" aria-hidden="true">/</span>
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">70,000,000</span>
            <span className="marker delta__ratio-label">Rainbow Six Siege players</span>
          </div>
          <p className="delta__ratio-caption">
            Members got skins and charms no one else in the community
            could own. <mark>FOMO and major show-off status.</mark>
          </p>
        </div>
      </aside>

      {/* ─── [08] THE TAKEAWAY ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] · The takeaway</span>
          <h2 className="delta__section-title">Built to scale.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            Siege Champions took the Delta Company playbook and ran it
            through one of the biggest competitive shooters on the
            planet. <mark>200 creators reaching 50 million eyeballs</mark>{' '}
            through their own authentic tone of voice. A fan-powered
            growth engine, at scale.
          </p>
          <p>
            <strong>Three key takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Build with the existing structure, not
            against it</mark>.</strong> Siege already ran a seasonal
            release cadence. The program rode that cycle, amplifying
            every drop instead of carving out separate moments.
          </p>
          <p>
            <strong>2. <mark>Exclusivity + early access creates
            coordinated pulsepoints</mark>.</strong> Invite-only status
            plus first-look material creates natural content windows
            during the moments that matter most.
          </p>
          <p>
            <strong>3. <mark>It&rsquo;s a scalable playbook</mark>.</strong>{' '}
            What worked at Delta Company worked at Siege Champions
            worked at Assassin&rsquo;s Creed&rsquo;s Mentors Guild. A
            win-win strategy that drives reach, engagement, and advocacy
            money can&rsquo;t buy.
          </p>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="delta__cta">
        <div className="container delta__cta-inner">
          <span className="marker">Want this for your brand?</span>
          <h2 className="delta__cta-title">
            Let&rsquo;s build one <mark>just like it</mark>.
          </h2>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary btn--lg"
          >
            Book a 30-min call <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </article>
  )
}
