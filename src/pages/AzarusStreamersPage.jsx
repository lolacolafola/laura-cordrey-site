import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Azarus · Streamer-led growth — bespoke case study page.
 *
 * Structure: cover + 4-stat row + 8 numbered sections + CTA.
 *   [01] Where it started      overlay product, no proof at scale
 *   [02] The expansion play    coordinated streamer campaign on LoL launch → +80% MAU
 *                              (+ "Expansion proof" stat callout)
 *   [03] The always-on engine  invite-only overlay partnerships, ~half industry CCV cost
 *   [04] The big swing         title sponsorship of the inaugural Streamer Awards
 *   [05] What I shipped        65 streamers, 14 categories, embedded live-ops production
 *                              (+ ratio callout: 200 / 500K)
 *   [06] The result + crash    90% engagement, 20% conversion, servers down
 *                              (+ "The proof" stat callout)
 *   [07] Running it back       Streamer Royale on Amouranth — controlled replication
 *   [08] The takeaway          three principles + fan-powered growth close
 *
 * Reuses the .delta__* class system. Same visual grammar as Delta /
 * Siege / Dark Star / BlaBlaCar bespoke pages.
 */
export default function AzarusStreamersPage() {
  useDocumentMeta({
    title: 'Azarus · Streamer-led growth · 500K viewers, 90% engagement, servers crashed · Case study by Laura Cordrey',
    description:
      'Activated Azarus on streamers in four months as Head of Growth. Three motions: a coordinated LoL launch (+80% MAU), always-on creator overlay partnerships at half industry CCV cost, and title sponsorship of the inaugural Streamer Awards — 500K viewers, 90% engagement, servers crashed. Replicated on Streamer Royale two months later.',
    canonical: pageUrl('work/azarus'),
    ogImage: assetUrl('case-studies/azarus-overlay-banner.jpeg'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'azarus',
      title: 'Azarus — streamer-led growth, three motions, one engine',
      description:
        'Three streamer-led growth motions at Azarus in four months: coordinated LoL launch (+80% MAU), always-on creator overlay, and title sponsorship of the inaugural Streamer Awards (500K viewers, 90% engagement, 20% conversion, servers crashed). Replicated on Streamer Royale.',
      image: 'case-studies/azarus-overlay-banner.jpeg',
      datePublished: '2022-05-28',
      about: ['Fan-Led Growth', 'Streamer Programs', 'Live Event Sponsorship', 'Twitch', 'Interactive Overlays', 'Azarus'],
      keywords: ['streamer-led growth', 'Streamer Awards', 'Streamer Royale', 'QTCinderella', 'Amouranth', 'Twitch overlay', 'gamified livestream', 'creator program'],
      principles: [
        'Engagement is the thesis. Conversion is the infrastructure',
        'One playbook, three motions',
        'Custom mechanics per format beat generic overlays',
      ],
      faqItems: [
        {
          question: 'How do you prove mass interactivity on a Twitch overlay at scale?',
          answer:
            'You sponsor the moment that matters. Title sponsorship of the inaugural Streamer Awards (QTCinderella + Maya Higa, March 2022) put the Azarus overlay in front of 500K peak concurrent viewers. 90% engaged with the overlay during the broadcast. 20% converted into Azarus members on the spot — and the servers crashed because we’d built for the audience we expected, not the one that showed up. The honest validation.',
        },
        {
          question: 'How do you grow a Twitch product through streamers without paying for media?',
          answer:
            'Three motions, one engine. Live event sponsorships for proof (Streamer Awards, Streamer Royale). Always-on creator overlay partnerships for retention (KingGeorge, lol_Nemesis, others at ~$1.70 per concurrent viewer vs $2.50–$3.50 industry). Coordinated streamer campaigns for platform expansion — every time we added a supported game, we paired it with an invite-only streamer push. The League of Legends launch alone drove +80% MAU growth.',
        },
        {
          question: 'What makes a live event sponsorship convert at scale?',
          answer:
            'Format-specific design. We didn’t drop a generic overlay onto the Streamer Awards broadcast — we built one for it: 14 award categories, ~65 nominee streamers, hundreds of fan-specific deep-cut trivia questions, with a team member embedded in the production room firing live questions in real time. The sponsorship became part of the show, not a banner on it.',
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
            <span className="marker">Azarus &middot; 2021&ndash;2022 &middot; Global</span>
          </div>
          <h1 className="delta__cover-title">
            Activating <mark>Azarus</mark>.
          </h1>
          <p className="delta__cover-lede">
            Streamer-led growth at scale. Three motions in four months &mdash; a
            coordinated game launch, always-on creator partnerships, and{' '}
            <mark>title sponsorship of the inaugural Streamer Awards</mark>.
            Servers crashed.
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      {/* Cinematic Azarus marketing banner — a Twitch viewer playing the
          Azarus overlay live on stream (LoL community), with the AZARUS
          logo and overlay UI visible. Uses --contain so the AZARUS logo
          in the top-right corner doesn't get clipped by the default 21:9
          object-fit:cover crop (image is natively 2:1). */}
      <figure className="delta__hero delta__hero--contain">
        <img
          src={BASE + 'case-studies/azarus-overlay-banner.jpeg'}
          alt="Azarus marketing banner — a viewer playing the Azarus interactive Twitch overlay on a League of Legends stream, with the AZARUS logo and the trivia overlay UI visible on the monitor"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">500K</span>
            <span className="marker delta__stat-label">Peak concurrent viewers</span>
          </li>
          <li>
            <span className="delta__stat-value">90%</span>
            <span className="marker delta__stat-label">Live engagement rate</span>
          </li>
          <li>
            <span className="delta__stat-value">20%</span>
            <span className="marker delta__stat-label">Viewer &rarr; member conversion</span>
          </li>
          <li>
            <span className="delta__stat-value">+80%</span>
            <span className="marker delta__stat-label">MAU growth (LoL launch)</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; Where it started</span>
          <h2 className="delta__section-title">A product with reach, not proof.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Azarus was an{' '}
            <strong>interactive Twitch overlay</strong> &mdash; a browser
            extension that layered trivia, polls and challenges on top of
            live streams. The company line, used everywhere from press
            releases to the product page:{' '}
            <em className="accent">
              &ldquo;Turn passive viewers into active participants.&rdquo;
            </em>
          </p>
          <p>
            The product worked. What it didn&rsquo;t have was{' '}
            <mark>proof at scale</mark>. Streamer relationships and a
            steady drip of installs &mdash; but nothing that made a brand or
            a CMO sit up. To unlock the next chapter (bigger brand deals,
            a real ad business, a token launch) we needed evidence the
            format scaled. Not stories that it worked.
          </p>
          <p>
            I came in as <strong>Head of Growth in December 2021</strong>.
            Four months to make the case.
          </p>
        </div>
      </section>

      {/* ─── [02] THE EXPANSION PLAY ──────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; The expansion play</span>
          <h2 className="delta__section-title">A coordinated launch, every time.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The first motion was platform expansion. Every time we added
            a new supported game to the Azarus overlay &mdash;{' '}
            <strong>League of Legends</strong>, Valorant, Apex Legends &mdash;
            we paired it with a coordinated streamer campaign. Invite
            creators in that community, ship the overlay support on
            their channels, ride the surge.
          </p>
          <p>
            The League of Legends launch campaign drove a{' '}
            <mark>+80% MAU lift</mark> on the Azarus platform. One
            coordinated push, one new game, an 80% jump in the active
            member base.
          </p>
          <p>
            The lesson: streamer-led expansion isn&rsquo;t a press
            release. It&rsquo;s a logistics exercise. Get the right
            creators live with the right product on the right week, and
            the audience moves with them.
          </p>
        </div>
      </section>

      {/* ─── EXPANSION PROOF CALLOUT ──────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Expansion proof</span>
          <p className="delta__result-value">
            <mark>+80% MAU from one coordinated push</mark>
          </p>
          <p className="delta__result-caption">
            League of Legends added to the supported game lineup, paired
            with an invite-only streamer launch campaign. The platform
            grew with the audience.
          </p>
        </div>
      </aside>

      {/* ─── [03] THE ALWAYS-ON ENGINE ────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] &middot; The always-on engine</span>
          <h2 className="delta__section-title">Half the industry rate, twice the loyalty.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            In parallel ran the steady-state motion &mdash; invite-only
            creator overlay partnerships, live on streamers&rsquo;
            channels during their normal streams.{' '}
            <strong>KingGeorge</strong> (Rainbow Six Siege, ~1M
            followers). <strong>lol_Nemesis</strong> (League of Legends,
            ~600K followers). Others across Valorant and Apex. Audiences
            played the overlay during regular streams; AZA credits
            accrued; the player base compounded.
          </p>
          <p>
            Cost basis:{' '}
            <mark>~$1.70 per concurrent viewer</mark>. Industry average
            for equivalent streamer sponsorships sat at{' '}
            <mark>$2.50&ndash;$3.50</mark>. We acquired audience at
            roughly half what the rest of the market paid.
          </p>
          <p>
            The always-on engine wasn&rsquo;t headline-grabbing. It was
            the base load &mdash; the bit that made the platform exist
            between the big moments.
          </p>
        </div>
      </section>

      {/* ─── [04] THE BIG SWING ───────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; The big swing</span>
          <h2 className="delta__section-title">The inaugural Streamer Awards.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            In <strong>March 2022</strong>, QTCinderella was launching the
            first-ever{' '}
            <mark>Streamer Awards</mark> on Twitch with Maya Higa &mdash;
            an awards show built for streaming, by streamers.{' '}
            <em className="accent">The streaming world&rsquo;s Oscars</em>,
            eventually.
          </p>
          <p>
            I went after the title sponsorship. And won it.
          </p>
          <p>
            A <mark>6-figure deal</mark> &mdash; the biggest brand bet
            Azarus had made &mdash; and it gave us the audience we needed.
            Every major streamer&rsquo;s community tuning in at the same
            time, all on Twitch, for one night.
          </p>
        </div>
      </section>

      {/* ─── [05] WHAT I SHIPPED ──────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; What I shipped</span>
          <h2 className="delta__section-title">A bespoke overlay, operated from inside the show.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            We didn&rsquo;t drop a generic overlay onto the broadcast. We
            built one <em className="accent">for the show</em>.
          </p>
          <p>
            <mark>14 award categories. ~65 nominee streamers.
            Hundreds of bespoke trivia questions</mark> &mdash;
            fan-specific deep cuts. <em>What is aceu&rsquo;s cat&rsquo;s
            name? Which professional team first signed TenZ? What does
            HasanAbi refer to his community as?</em> The kind of
            questions only a real fan could answer. The audience felt
            seen.
          </p>
          <p>
            The prize pool was{' '}
            <mark>5M+ AZA credits (~$50,000 in value)</mark>, redeemable
            in the Azarus Store for premium games like Horizon Forbidden
            West and OlliOlli World, and in-game currencies for Fortnite
            and GTA Online.
          </p>
          <p>
            And on the night, a team member was{' '}
            <strong>inside the production room</strong> with the
            broadcast crew, firing live questions in real time based on
            what was actually unfolding on stage. The sponsorship
            didn&rsquo;t sit on top of the show. It became part of it.
          </p>
        </div>
      </section>

      {/* ─── RATIO CALLOUT — exclusivity at scale ──────────────── */}
      <aside className="delta__ratio">
        <div className="container delta__ratio-inner">
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">65</span>
            <span className="marker delta__ratio-label">Nominee streamers</span>
          </div>
          <span className="delta__ratio-divider" aria-hidden="true">/</span>
          <div className="delta__ratio-stat">
            <span className="delta__ratio-value">500,000</span>
            <span className="marker delta__ratio-label">Peak concurrent viewers</span>
          </div>
          <p className="delta__ratio-caption">
            One overlay, designed and operated live for every nominee
            and every audience tuning in at the same time.{' '}
            <mark>The night the sponsorship became co-production.</mark>
          </p>
        </div>
      </aside>

      {/* ─── [06] THE RESULT AND THE CRASH ────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; The result &mdash; and the crash</span>
          <h2 className="delta__section-title">Engagement is the thesis. Conversion is the infrastructure.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <mark>500K peak concurrent viewers</mark> tuned in.{' '}
            <mark>90% of them engaged</mark> with the overlay during the
            broadcast. <mark>20% converted</mark> into Azarus members on
            the spot.
          </p>
          <p>
            And our servers crashed.
          </p>
          <p>
            The 90% engagement rate told us the thesis was right. The
            crash told us we&rsquo;d built infrastructure for the wrong
            demand. The 20% conversion isn&rsquo;t a weak number &mdash;
            it&rsquo;s a function of what the crash cost us. Without
            the cap, conversion would have been higher.{' '}
            <em className="accent">The engagement is the proof of the
            underlying behaviour. The conversion is the proof we&rsquo;d
            under-built.</em>
          </p>
          <p>
            It was the honest validation. Not the one we planned, but
            maybe the most useful one. It told us exactly what to build
            next.
          </p>
        </div>
      </section>

      {/* ─── THE PROOF CALLOUT ────────────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">The proof</span>
          <p className="delta__result-value">
            <mark>500K &middot; 90% &middot; 20% &middot; servers down</mark>
          </p>
          <p className="delta__result-caption">
            Mass interactivity, validated on the biggest stage in
            streaming. And the operational ceiling exposed in the same
            broadcast.
          </p>
        </div>
      </aside>

      {/* ─── [07] RUNNING IT BACK — STREAMER ROYALE ────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] &middot; Running it back</span>
          <h2 className="delta__section-title">Streamer Royale &mdash; same engine, no crash.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Two months later, <mark>May 28, 2022</mark>. Same playbook,
            different format.
          </p>
          <p>
            Streamer Royale was a physical-challenge event on{' '}
            <mark>Amouranth&rsquo;s</mark> Twitch channel &mdash;{' '}
            <strong>16 streamers</strong>, kneeboarding, obstacle
            courses, head-to-head competition over 5h 20m.
            JennaLynnMeowri won.
          </p>
          <p>
            We built new mechanics for the format.{' '}
            <strong>30+ live questions</strong> across four styles
            (challenge-attentive, streamer trivia, polling, neutral). A{' '}
            <mark>polling-to-revive mechanic</mark> &mdash; the audience
            voted eliminated contestants back into the finale,
            controlling the show&rsquo;s narrative. A random-player
            selector for a signed-jersey giveaway with full legal T&amp;Cs.
            Same live-ops discipline: team member embedded with
            production, firing questions on the fly.
          </p>
          <p>
            <strong>The result:</strong>{' '}
            <mark>31,458 peak viewers</mark>, <mark>275,377 unique
            viewers</mark>, <mark>134,191 hours watched</mark>,{' '}
            <mark>59,900 unique Azarus users</mark> on the day. And
            critically: <em className="accent">servers held</em>. We
            built for the upside the second time.
          </p>
          <p>
            Different host, different format, different audience. Same
            engine working under it.
          </p>
        </div>
      </section>

      {/* ─── [08] THE TAKEAWAY ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] &middot; The takeaway</span>
          <h2 className="delta__section-title">Built to activate.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            Streamer-led growth, proven across three motions:{' '}
            <mark>+80% MAU</mark> from a coordinated game-launch
            campaign. <mark>~$1.70 CCV</mark> on the always-on creator
            overlay (half the industry rate).{' '}
            <mark>500K viewers, 90% engagement, 20% conversion</mark> on
            the Streamer Awards &mdash; and a controlled replication two
            months later that didn&rsquo;t crash.
          </p>
          <p>
            <strong>The next chapter</strong> &mdash; turning the
            engagement engine into a monetisable ad platform &mdash;
            became possible because of this proof.{' '}
            <Link to="/work/azarus-game-ads" className="marker delta__play-link">
              See the Azarus ad platform case study <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
          <p>
            <strong>Three key takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Engagement is the thesis. Conversion is
            the infrastructure</mark>.</strong> 90% played, 20%
            converted. The gap was server capacity, not interest. Build
            ops for the upside, not the baseline. Most engagement
            campaigns fail because they&rsquo;re built for the audience
            they expect, not the one that actually shows up.
          </p>
          <p>
            <strong>2. <mark>One playbook, three motions</mark>.</strong>{' '}
            Live events for proof. Always-on overlay for retention.
            Game-launch campaigns for expansion. Streamers do all three
            &mdash; if you build the platform behind them. Most brands
            pick one and call it a creator strategy.
          </p>
          <p>
            <strong>3. <mark>Custom mechanics per format beat generic
            overlays</mark>.</strong> Trivia per nominee for awards.
            Polling-to-revive for competition. Live questions fired from
            inside the production room. Format-specific design is the
            difference between sponsorship and{' '}
            <em className="accent">co-production</em>.
          </p>
          <p>
            A fan-powered growth engine &mdash; built on streamers.
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
