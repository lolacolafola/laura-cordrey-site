import { useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Click-to-load YouTube embed. First paint is the thumbnail (free, fast).
   On click we mount the YouTube iframe with autoplay so playback starts in
   the website frame instead of opening youtube.com in a new tab. */
function YouTubeEmbed({ videoId, title, thumbAlt }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <div className="delta__video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="delta__video-frame delta__video-thumbnail"
      aria-label={title}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={thumbAlt}
      />
      <span className="delta__video-thumbnail-play" aria-hidden="true">&#9654;</span>
    </button>
  )
}

/* US Mobile · Claw Mobile — bespoke case study page.
 *
 * Spine: challenger brand vs. Mint Mobile → fake-Jackman concept hijacks
 * the US Mobile spot to launch a fake competing network (Claw Mobile) →
 * spoof microsite + CEO reveal landing page commit the bit in-world →
 * Meta campaign held attention past the 15-second hook (55%) →
 * organic Reddit pickup.
 *
 * Voice & Scope: Laura led the campaign (creative direction, strategy,
 * oversight). Luna agency filmed and produced. She did NOT produce
 * end-to-end — earlier copy claimed "I produced... script development,
 * casting, the shoot, the granular post-production craft (edit, sound,
 * colour, VFX)" which overstated. Lede and section openers must
 * reflect "I led, Luna filmed and produced." See docs/case-study-rules.md
 * for the full ruleset.
 *
 * Structure: cover + 4-stat row + 6 numbered sections + CTA.
 *   [01] The brief                      super carrier needs a super hero
 *   [02] The concept                    fourth-wall break + super-hero vs. mutant
 *                                       (+ main film YouTube embed)
 *   [03] More from the campaign         three supporting cuts as a YouTube grid
 *   [04] The world                      easter-egg microsite + Ahmed's clap-back LP
 *                                       (+ microsite screen recording)
 *   [05] The result                     55% past 15s on Meta + organic Reddit
 *                                       (+ 55% callout)
 *   [06] The takeaway                   commit to the bit, and the bit pays back
 *
 * Reuses the .delta__* class system. Same visual grammar as the other
 * bespoke case study pages.
 */
export default function ClawMobilePage() {
  useDocumentMeta({
    title: 'US Mobile · Claw Mobile · A stunt brand campaign · Case study by Laura Cordrey',
    description:
      'A stunt brand campaign for US Mobile against Mint Mobile. I led the campaign, Luna filmed and produced. A fake Hugh Jackman hijacks the US Mobile spot to launch his own competing network (Claw Mobile), a real spoof site lives the storyline, and the US Mobile CEO claps back. 55% of viewers stuck past the 15-second mark on Meta; hundreds of organic Reddit comments.',
    canonical: pageUrl('work/claw-mobile'),
    ogImage: assetUrl('case-studies/claw-mobile-card.jpg'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'claw-mobile',
      title: 'US Mobile: a stunt brand campaign against Mint Mobile',
      description:
        'A stunt brand campaign for US Mobile against Mint Mobile. I led the campaign, Luna filmed and produced. A fake Hugh Jackman hijacks the US Mobile spot to launch his own competing network (Claw Mobile), a real spoof site lives the storyline in-world, and the US Mobile CEO claps back. 55% of viewers stuck past the 15-second mark on Meta; hundreds of organic Reddit comments.',
      image: 'case-studies/claw-mobile-card.jpg',
      datePublished: '2024-12-31',
      client: 'US Mobile',
      role: 'Brand Campaign Lead',
      market: 'USA',
      sector: 'Telco',
      about: ['Brand Campaign', 'Stunt Creative', 'Cultural Moment'],
      keywords: [
        'Claw Mobile',
        'US Mobile',
        'Mint Mobile parody',
        'stunt brand campaign',
        'fake Hugh Jackman',
        'spoof microsite',
        'Meta campaign',
      ],
      principles: [
        'Build the world around the joke',
        'Disruptor energy beats discount energy',
      ],
      faqItems: [
        {
          question: 'What was the Claw Mobile campaign for US Mobile?',
          answer:
            'A stunt brand campaign positioning US Mobile against Mint Mobile. Instead of a normal celebrity endorsement for US Mobile, a fake Hugh Jackman hijacks the spot to launch his own competing network, Claw Mobile. The bit is committed to in-world with a real spoof microsite and a US Mobile CEO reveal landing page where the actual CEO claps back at the fake Jackman.',
        },
        {
          question: 'Who led the campaign?',
          answer:
            'Laura Cordrey led the campaign as Brand Campaign Lead: creative direction, strategy and oversight. Luna agency filmed and produced. The film delivered four cuts; the spoof microsite and CEO reveal landing page extended the bit beyond the spot.',
        },
        {
          question: 'What were the results?',
          answer:
            '55% of viewers stuck past the 15-second mark on Meta. The hook earned the attention it needed to land the reveal. The campaign also generated hundreds of organic Reddit comments, an unpaid signal that the joke travelled.',
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
            <span className="marker">US Mobile &middot; USA &middot; 2024</span>
          </div>
          <h1 className="delta__cover-title">
            <mark>US Mobile</mark>: a Mint Mobile parody.
          </h1>
          <p className="delta__cover-lede">
            With <mark>Deadpool &amp; Wolverine</mark> in cinemas, US
            Mobile hired (a fake) Hugh Jackman to take on Mint
            Mobile&rsquo;s Ryan Reynolds. The bit: a full parody
            network, built for community delight.
          </p>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* The YouTube card frame: fake Hugh Jackman with cardboard
          claws + Claw Mobile logo + security tackle on the right. The
          stunt in one image. */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/claw-mobile-card.jpg'}
          alt="Claw Mobile stunt film thumbnail: a fake Hugh Jackman with cardboard Wolverine claws and a wide-eyed expression in front of the Claw Mobile logo, with security tackling another version of the character on the right"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      {/* Both confirmed by Laura as sourced campaign data:
          55% past 15s on Meta + hundreds of Reddit comments organic.
          Plus the operational scale (4 films delivered, 1 spoof
          network launched). */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">55%</span>
            <span className="marker delta__stat-label">Past 15s &middot; Meta</span>
          </li>
          <li>
            <span className="delta__stat-value">100s</span>
            <span className="marker delta__stat-label">Reddit comments &middot; organic</span>
          </li>
          <li>
            <span className="delta__stat-value">4</span>
            <span className="marker delta__stat-label">Films delivered</span>
          </li>
          <li>
            <span className="delta__stat-value">1</span>
            <span className="marker delta__stat-label">Spoof network launched</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] THE BRIEF ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; The brief</span>
          <h2 className="delta__section-title">Up against Mint Mobile.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            US Mobile had just become a &lsquo;super carrier&rsquo;.
            With{' '}
            <Link to="/work/us-mobile-dark-star" className="accent">
              Dark Star
            </Link>{' '}
            added, they now ran on all three major US carrier networks.
          </p>
          <p>
            Mint Mobile owned the celebrity-endorsed playbook in US
            telco with Ryan Reynolds. The brief: we wanted our own.
          </p>
          <p>
            I led the campaign and worked with Luna agency to bring it
            to life, from creative ideation, scripting and audition
            reels through post-production and final delivery.
          </p>
        </div>
      </section>

      {/* Ryan Reynolds as Mint Mobile's "Owner & User" — the
          celebrity-endorsed playbook in one frame, the play we were
          counter-positioning against. Natural aspect (no forced ratio,
          no crop). */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/claw-mobile-mint-ryan-reynolds.png'}
          alt="Mint Mobile press image: Ryan Reynolds standing in a navy bomber jacket and jeans against a mint-green background, with the Mint Mobile wordmark logo behind him"
        />
        <figcaption className="container">
          Ryan Reynolds as Mint Mobile&rsquo;s &ldquo;Owner &amp;
          User&rdquo;. The celebrity-endorsed playbook in one frame.
        </figcaption>
      </figure>

      {/* ─── [02] THE CONCEPT ─────────────────────────────────── */}
      {/* Split section: para 1 sets up the cultural-timing thesis, the
          Deadpool & Wolverine poster punctuates it, then the
          continuation block lands the layered super-hero/mutant gag. */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; The concept</span>
          <h2 className="delta__section-title">A fake Jackman hijacks the spot.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The goal: ride Deadpool &amp; Wolverine, where Jackman takes
            on Reynolds, and run the same play against Mint. The real
            Hugh Jackman was out of budget, so we cast a fake one.
          </p>
        </div>
      </section>

      {/* Deadpool & Wolverine official poster — the cultural moment
          the bit was timed to. Marvel Studios artwork; used as
          editorial reference, no commercial use. Natural aspect so the
          poster shows uncropped. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/claw-mobile-deadpool-wolverine-poster.webp'}
          alt="Deadpool & Wolverine official Marvel Studios movie poster: Wolverine in yellow with claws extended, Deadpool in red with sword and pistol, against a white background with the Marvel Studios lockup and 'DEADPOOL & WOLVERINE' title"
        />
        <figcaption className="container">
          Deadpool &amp; Wolverine in cinemas. The cultural moment
          behind the bit.
        </figcaption>
      </figure>

      <section className="delta__section delta__section--continuation container">
        <div className="delta__section-body">
          <p>
            The hero film: fake Jackman, alone to camera. He opens as
            Wolverine, then pivots to pitch his own network. Ryan
            Reynolds gets called out by name. Claw Mobile gets planted
            as the new player in town, with &lsquo;razor-sharp
            connectivity and ferocious data speeds&rsquo;. Sign-off:
            don&rsquo;t settle for minty freshness, go for the claws.
          </p>
        </div>
      </section>

      {/* Main film — the stunt itself, on YouTube. Thumbnail-style
          link rather than an inline iframe so the page loads light
          (matches the Azarus how-to-play pattern). */}
      <section className="delta__video-section delta__video-section--continuation container">
        <YouTubeEmbed
          videoId="bsLHDOlcgcY"
          title="Claw Mobile stunt film"
          thumbAlt="Claw Mobile stunt film. YouTube thumbnail."
        />
        <p className="delta__video-context">
          Claw Mobile. The stunt film. Led by me, filmed and produced
          by <strong>Luna</strong>.
        </p>
      </section>

      {/* ─── [03] MORE FROM THE CAMPAIGN ──────────────────────── */}
      {/* Three supporting films delivered alongside the main stunt,
          captured via clickable YouTube thumbnails so the page stays
          light. Captions are sourced from Laura's own descriptions of
          each cut. */}
      <section className="delta__films-grid container">
        <div className="delta__section-head delta__films-grid-head">
          <span className="marker">[03] &middot; More from the campaign</span>
          <h2 className="delta__section-title">Three more films.</h2>
        </div>
        <div className="delta__films-grid-inner">
          <figure className="delta__films-cell">
            <YouTubeEmbed
              videoId="O9IGCpzi6P4"
              title="Claw Mobile backstage cut"
              thumbAlt="Claw Mobile backstage cut. YouTube thumbnail."
            />
            <figcaption>
              Behind the scenes. The fake-Jackman bit falls apart on
              set, legal panics, and the team accidentally lands the
              real pitch: a super carrier on all three networks.
            </figcaption>
          </figure>
          <figure className="delta__films-cell">
            <YouTubeEmbed
              videoId="RsimGZVWlsU"
              title="Claw Mobile features-shred cut"
              thumbAlt="Claw Mobile features-shred cut. YouTube thumbnail."
            />
            <figcaption>
              Ahmed starts reading US Mobile&rsquo;s long feature list.
              Fake Jackman, tired of being underused, shreds it with
              his claws. Sign-off: &lsquo;tell that to my two
              Tonys&rsquo;.
            </figcaption>
          </figure>
          <figure className="delta__films-cell">
            <YouTubeEmbed
              videoId="9B6Ogshm5Ho"
              title="Claw Mobile super-hero vs. mutant cut"
              thumbAlt="Claw Mobile super-hero vs. mutant cut. YouTube thumbnail."
            />
            <figcaption>
              Ahmed the real CEO tries to land the pitch. Fake Jackman
              keeps making it about Wolverine. Ahmed wins the gag:
              Wolverine isn&rsquo;t a super hero, he&rsquo;s a mutant.
              US Mobile is the only super carrier.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── 55% RESULT CALLOUT ───────────────────────────────── */}
      {/* Proof beat punctuating the films section before the
          world-building of [04] begins. */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Hook held</span>
          <p className="delta__result-value">
            <mark>55% past 15s</mark>
          </p>
          <p className="delta__result-caption">
            Past the point where most paid social gets scrolled.
          </p>
        </div>
      </aside>

      {/* ─── [04] THE WORLD ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; Campaign storytelling</span>
          <h2 className="delta__section-title">Committing to the bit.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            I extended the gag with a community easter egg: anyone
            hunting for{' '}
            <mark>Claw Mobile</mark> landed on a spoof site &lsquo;built
            by the star himself&rsquo;, deliberately shoddy by design.
            From there, a custom landing page redirected back to{' '}
            <strong>Ahmed</strong>, US Mobile&rsquo;s real CEO, and the
            real deals (vs. the fake).
          </p>
          <p>
            A fun interaction for fans of the brand that sparked lively
            conversation.
          </p>
        </div>
      </section>

      {/* Microsite screen recording — the spoof Claw Mobile site
          flowing into Ahmed's real-CEO reveal LP. Click-to-play with
          native HTML5 controls so users can step through the bit
          themselves (no autoplay; muted for accessibility). The .mp4
          needs to be (re)added by Laura into public/case-studies/. */}
      <figure className="delta__plate delta__plate--natural delta__plate--narrow">
        <video
          src={BASE + 'case-studies/claw-mobile-microsite-recording.mp4'}
          poster={BASE + 'case-studies/claw-mobile-spoof-lp.png'}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label="Screen recording of the Claw Mobile spoof landing page flowing into the US Mobile CEO reveal LP"
        />
        <figcaption className="container">
          The spoof site and the real-CEO reveal LP. Press play to walk
          the bit.
        </figcaption>
      </figure>

      {/* ─── [05] THE RESULT ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; The result</span>
          <h2 className="delta__section-title">The joke landed.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            On Meta, the hook held: <mark>55% past 15s</mark>. On
            Reddit, it ran without us: hundreds of comments. Claws out
            for Mint Mobile.
          </p>
        </div>
      </section>

      {/* ─── [06] THE TAKEAWAY ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; The takeaway</span>
          <h2 className="delta__section-title">Commit to the bit, and the bit pays back.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            Four films, a spoof network, the CEO clap-back. All of it
            for less than the cost of one real celebrity.
          </p>
          <p>
            <strong>1. <mark>Money doesn&rsquo;t buy attention. The joke does</mark>.</strong>{' '}
            Mint Mobile has Ryan Reynolds. We couldn&rsquo;t afford the
            real Hugh Jackman, so we cast a fake one. The leverage was
            the script, not the star.
          </p>
          <p>
            <strong>2. <mark>A stunt needs a world to live in</mark>.</strong>{' '}
            One spot gets scrolled. The spoof microsite, the CEO
            clap-back LP, and the four cuts gave the audience a universe
            to keep poking at. That&rsquo;s what bought the Reddit
            thread.
          </p>
          <p>
            <strong>3. <mark>Cultural timing is free distribution</mark>.</strong>{' '}
            Deadpool &amp; Wolverine was in cinemas. We didn&rsquo;t
            sponsor it, we sat in its slipstream.
          </p>
          <p>
            The audience kept it going.
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
            rel="noopener noreferrer"
            className="btn btn--accent delta__cta-btn"
          >
            Book a call
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>
    </article>
  )
}
