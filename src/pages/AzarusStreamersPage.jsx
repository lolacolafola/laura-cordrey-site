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
 * Spine: PMF brief → three escalating US streamer campaigns → background
 * credibility (always-on creator program + Facebook Gaming launch) → closer.
 *
 * Structure: cover + 4-stat row + 8 numbered sections + CTA.
 *   [01] The brief                      PMF, ready to scale, first US streamer relationships
 *   [02] Campaign 1 — LoL launch        coordinated US streamer push → +80% MAU
 *                                       (+ "Expansion proof" callout)
 *   [03] Campaign 2 — the big swing     title sponsorship of the inaugural Streamer Awards
 *   [04] Campaign 2 — what I shipped    65 streamers, 14 categories, embedded live-ops
 *                                       (+ ratio callout: 65 / 500K)
 *   [05] Campaign 2 — result + crash    90% engagement, 20% conversion, servers down
 *                                       (+ "The proof" callout)
 *   [06] Campaign 3 — Streamer Royale   controlled replication on Amouranth, no crash
 *   [07] In parallel                    always-on US creator program + Facebook Gaming launch
 *                                       (+ FB Gaming Beta lockup plate)
 *   [08] The takeaway                   three campaigns, one engine, US growth foundation
 *
 * Reuses the .delta__* class system. Same visual grammar as Delta /
 * Siege / Dark Star / BlaBlaCar bespoke pages.
 */
export default function AzarusStreamersPage() {
  useDocumentMeta({
    title: 'Azarus · Three streamer campaigns, one engine · 500K viewers, servers crashed · Case study by Laura Cordrey',
    description:
      'Scaled Azarus’s US streamer presence through three escalating campaigns: a coordinated League of Legends launch (+80% MAU), title sponsorship of the inaugural Streamer Awards (500K peak viewers, 90% engaged, servers crashed), and a controlled replication on Amouranth’s Streamer Royale. In parallel: an always-on US creator overlay program at half industry CCV cost, and project managed launch of Azarus on Facebook Gaming with Meta.',
    canonical: pageUrl('work/azarus'),
    ogImage: assetUrl('case-studies/azarus-overlay-banner.jpeg'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'azarus',
      title: 'Azarus — three streamer campaigns, one engine, US growth foundation',
      description:
        'Three escalating US streamer campaigns at Azarus: a coordinated League of Legends launch (+80% MAU), title sponsorship of the inaugural Streamer Awards (500K viewers, 90% engagement, 20% conversion, servers crashed), and a controlled replication on Amouranth’s Streamer Royale. Plus an always-on US creator overlay program at half industry CCV cost and project-managed launch of Azarus on Facebook Gaming with Meta.',
      image: 'case-studies/azarus-overlay-banner.jpeg',
      datePublished: '2022-05-28',
      client: 'Azarus',
      role: 'Head of Growth',
      market: 'US',
      sector: 'Gaming · Web3',
      about: ['Fan-Led Growth', 'Streamer Programs', 'Live Event Sponsorship', 'Twitch', 'Facebook Gaming', 'Interactive Overlays'],
      keywords: ['streamer-led growth', 'Streamer Awards', 'Streamer Royale', 'QTCinderella', 'Amouranth', 'Twitch overlay', 'Facebook Gaming', 'Meta partnership', 'creator program'],
      principles: [
        'Engagement is the thesis. Conversion is the infrastructure',
        'Three campaigns escalate, one engine compounds',
        'Custom mechanics per format beat generic overlays',
      ],
      faqItems: [
        {
          question: 'How do you scale a Twitch product through streamers in the US?',
          answer:
            'Three escalating campaigns, one engine. Start with a coordinated game-launch push (League of Legends drove +80% MAU). Bet bigger on a live-event moment that matters (title sponsorship of the inaugural Streamer Awards — 500K peak viewers, 90% engaged, 20% converted on the spot, servers crashed). Then prove the playbook isn’t a one-off by replicating it in a different format (Amouranth’s Streamer Royale, two months later, no crash). The streamer relationships built across the three campaigns become the platform’s long-term US growth foundation.',
        },
        {
          question: 'What makes a live event sponsorship convert at scale?',
          answer:
            'Format-specific design. We didn’t drop a generic overlay onto the Streamer Awards broadcast — we built one for it: 14 award categories, ~65 nominee streamers, hundreds of fan-specific deep-cut trivia questions, with a team member embedded in the production room firing live questions in real time. The sponsorship became part of the show, not a banner on it.',
        },
        {
          question: 'How do you run an always-on creator program at less than industry CCV cost?',
          answer:
            'Invite-only, monthly flat rate per streamer, deep partnerships rather than transactional sponsorships. At Azarus the always-on US creator program ran with KingGeorge (Rainbow Six Siege, ~1M followers), lol_Nemesis (League of Legends, ~600K followers) and others across Valorant and Apex, with an effective concurrent-viewer cost of ~$1.70 against an industry rate of $2.50–$3.50. Flat-rate contracting means the platform compounds, not the streamer’s billable hours.',
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
            <span className="marker">Azarus &middot; US &middot; 2021&ndash;2022</span>
          </div>
          <h1 className="delta__cover-title">
            Activating <mark>Azarus</mark>.
          </h1>
          <p className="delta__cover-lede">
            Three escalating streamer campaigns scaled Azarus&rsquo;s US
            presence &mdash; a coordinated League of Legends launch,{' '}
            <mark>title sponsorship of the inaugural Streamer Awards</mark>,
            and a controlled replication on Amouranth&rsquo;s Streamer
            Royale.
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
            <span className="delta__stat-value">+80%</span>
            <span className="marker delta__stat-label">MAU lift &middot; LoL launch</span>
          </li>
          <li>
            <span className="delta__stat-value">500K</span>
            <span className="marker delta__stat-label">Peak viewers &middot; Streamer Awards</span>
          </li>
          <li>
            <span className="delta__stat-value">90%</span>
            <span className="marker delta__stat-label">Engagement &middot; Streamer Awards</span>
          </li>
          <li>
            <span className="delta__stat-value">20%</span>
            <span className="marker delta__stat-label">Viewer &rarr; member &middot; Streamer Awards</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] THE BRIEF ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; The brief</span>
          <h2 className="delta__section-title">PMF, ready to scale.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Azarus was an{' '}
            <strong>interactive Twitch overlay</strong> &mdash; a browser
            extension layering trivia, polls and challenges on top of
            live streams. Backed by{' '}
            <strong>Galaxy Digital, Animoca Brands and Kleiner
            Perkins</strong>. By November 2022 the platform had
            delivered{' '}
            <mark>4M+ viewers participating in Azarus Challenges and
            $2M+ in prizes distributed</mark>, across a store of
            35,000+ digital items. The tagline, everywhere from press
            to the product page:{' '}
            <em className="accent">
              &ldquo;Turn passive viewers into active participants.&rdquo;
            </em>
          </p>
          <p>
            Product worked. Real engagement, real streamer
            relationships, <mark>product-market fit</mark>. What it
            needed next was <strong>scale</strong> &mdash; US streamer
            relationships that would carry the platform forward.
          </p>
          <p>
            I came in as <strong>Head of Growth in December 2021</strong>.
            The brief: secure Azarus&rsquo;s first US streamer
            relationships at scale and prove the format moved an
            audience. Four months.
          </p>
        </div>
      </section>

      {/* ─── [02] CAMPAIGN 1 — THE LOL LAUNCH ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; Campaign 1 &mdash; the LoL launch</span>
          <h2 className="delta__section-title">A coordinated US push for League of Legends.</h2>
        </div>
        {/* Riot's official League of Legends key art — visual anchor
            for the campaign. Same pattern as the Ubisoft case studies:
            show the game in question, inside the relevant section. */}
        <figure className="delta__plate delta__plate--full">
          <img
            src={BASE + 'case-studies/azarus-league-of-legends-banner.webp'}
            alt="League of Legends official key art — champion ensemble (Lux, Jinx, Yasuo, Blitzcrank) with the LEAGUE OF LEGENDS wordmark — the game Azarus integrated for Campaign 1"
          />
        </figure>
        <div className="delta__section-body">
          <p>
            Azarus was shipping overlay support for{' '}
            <strong>League of Legends</strong>. I paired the product
            launch with a <mark>coordinated US streamer push</mark>{' '}
            &mdash; negotiated talent through{' '}
            <strong>AFK</strong> and <strong>BEN Agency</strong> to ship
            overlay support on top LoL channels (Caedrel, CookieLoLxx,
            IMLS, lol_Nemesis, Tarzaned), reaching{' '}
            <mark>tens of millions of viewers</mark> across the cohort.
            Live <strong>Feb 1, 2022</strong>.
          </p>
          <p>
            The result: a <mark>+80% MAU lift</mark> on the Azarus
            platform from one coordinated campaign.
          </p>
        </div>
      </section>

      {/* ─── EXPANSION PROOF CALLOUT ──────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Campaign 1 proof</span>
          <p className="delta__result-value">
            <mark>+80% MAU</mark>
          </p>
          <p className="delta__result-caption">
            From one pulsepoint.
          </p>
        </div>
      </aside>

      {/* ─── [03] CAMPAIGN 2 — THE BIG SWING ──────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] &middot; Campaign 2 &mdash; the big swing</span>
          <h2 className="delta__section-title">The inaugural Streamer Awards.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            In <strong>March 2022</strong>, QTCinderella and Maya Higa
            were launching the first-ever <mark>Streamer Awards</mark>{' '}
            on Twitch &mdash; an awards show built for streaming, by
            streamers.{' '}
            <em className="accent">The streaming world&rsquo;s Oscars</em>,
            eventually.
          </p>
          <p>
            I secured the title sponsorship &mdash; a{' '}
            <mark>6-figure deal</mark>, the biggest brand bet Azarus had
            made &mdash; and with it, every major streamer&rsquo;s
            community tuning in on Twitch for one night.
          </p>
        </div>
      </section>

      {/* ─── STREAMER AWARDS RED CARPET PLATE ─────────────────── */}
      {/* Pre-show on the red carpet — Mizkif reading nominee cards
          with Emiru and others. Documents the scale of the event
          Azarus title-sponsored. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/azarus-streamer-awards-red-carpet.png'}
          alt="Red carpet at the inaugural Streamer Awards — Mizkif reading nominee announcement cards with Emiru and other streamers in front of the Streamer Awards step-and-repeat backdrop"
        />
        <figcaption className="container">
          Red carpet, inaugural Streamer Awards &mdash; Mizkif, Emiru
          and others on the read-out.
        </figcaption>
      </figure>

      {/* ─── [04] CAMPAIGN 2 — WHAT I SHIPPED ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; Campaign 2 &mdash; what I shipped</span>
          <h2 className="delta__section-title">A bespoke overlay, operated from inside the show.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            We didn&rsquo;t drop a generic overlay onto the broadcast. We
            built one <em className="accent">for the show</em>.
          </p>
          <p>
            <mark>14 award categories. ~65 nominee streamers.</mark>{' '}
            Bespoke trivia questions for fans, pushed live with the
            event product team.
          </p>
          <p>
            Prize pool: <mark>5M+ AZA credits (~$50,000 in value)</mark>,
            redeemable in the Azarus Store for an array of games and
            gaming products.
          </p>
          <p>
            On the night, a team member was{' '}
            <strong>inside the production room</strong> with the
            broadcast crew, firing live questions in real time based on
            what was unfolding on stage. The sponsorship didn&rsquo;t
            sit on top of the show. It became part of it.
          </p>
        </div>
      </section>

      {/* ─── PRIZE POOL CALLOUT — same shape as Campaign proofs ── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Prize pool</span>
          <p className="delta__result-value">
            <mark>5M AZA</mark>
          </p>
          <p className="delta__result-caption">
            How much was up for grabs during the broadcast for fans to
            win. (~$50K in value.)
          </p>
        </div>
      </aside>

      {/* ─── STREAMER AWARDS PRESENTERS PLATE ─────────────────── */}
      {/* Maya Higa and QTCinderella on stage at the inaugural Streamer
          Awards podium — the live moment the bespoke Azarus overlay
          ran underneath. Visual punctuation for the "sponsorship became
          co-production" line above. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/azarus-streamer-awards-presenters.png'}
          alt="Maya Higa and QTCinderella presenting on stage at the inaugural Streamer Awards podium, STREAMER backdrop behind them"
        />
        <figcaption className="container">
          Maya Higa and QTCinderella on stage &mdash; the night the
          Azarus overlay ran live under the broadcast.
        </figcaption>
      </figure>

      {/* ─── [05] CAMPAIGN 2 — THE RESULT AND THE CRASH ────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; Campaign 2 &mdash; the result and the crash</span>
          <h2 className="delta__section-title">Engagement is the thesis. Conversion is the infrastructure.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <mark>500K peak concurrent viewers</mark> tuned in.{' '}
            <mark>90% engaged</mark> with the overlay during the
            broadcast. <mark>20% converted</mark> into Azarus members on
            the spot.
          </p>
          <p>
            And the servers crashed.
          </p>
          <p>
            The 90% engagement was the thesis confirmed. The crash was
            infrastructure built for the wrong demand. The 20%
            isn&rsquo;t a weak conversion &mdash; it&rsquo;s the ceiling
            the crash imposed on it.{' '}
            <em className="accent">Engagement was the proof of the
            behaviour. Conversion was the proof we&rsquo;d
            under-built.</em>
          </p>
          <p>
            The honest validation &mdash; not the one we planned, but the
            one that told us exactly what to build next.
          </p>
        </div>
      </section>

      {/* ─── THE PROOF CALLOUT ────────────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Campaign 2 proof</span>
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

      {/* ─── [06] CAMPAIGN 3 — STREAMER ROYALE ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; Campaign 3 &mdash; running it back</span>
          <h2 className="delta__section-title">Streamer Royale &mdash; same engine, no crash.</h2>
        </div>
        {/* Streamer Royale official lineup banner — Amouranth front
            and centre with the 16-streamer cohort, STREAMER ROYALE
            wordmark. Same pattern as the LoL banner inside [02]:
            show the event before the body explains it. */}
        <figure className="delta__plate delta__plate--full">
          <img
            src={BASE + 'case-studies/azarus-streamer-royale-lineup.jpg'}
            alt="Streamer Royale official lineup banner — Amouranth, JennaLynnMeowri, Mizkif and the 16-streamer cohort with the STREAMER ROYALE wordmark"
          />
        </figure>
        <div className="delta__section-body">
          <p>
            Two months later, <mark>May 28, 2022</mark>. Same playbook,
            different format.
          </p>
          <p>
            Streamer Royale &mdash; a physical-challenge event on{' '}
            <mark>Amouranth&rsquo;s</mark> Twitch channel.{' '}
            <strong>16 streamers</strong>, kneeboarding, obstacle
            courses, head-to-head over 5h 20m.
          </p>
          <p>
            We built new mechanics for the format.{' '}
            <strong>30+ live questions</strong> across four styles. A{' '}
            <mark>polling-to-revive mechanic</mark> that let the audience
            vote eliminated contestants back into the finale. A
            random-player jersey giveaway with full legal T&amp;Cs. Same
            live-ops discipline &mdash; team member embedded with
            production, firing questions on the fly.
          </p>
          <p>
            <strong>The result:</strong>{' '}
            <mark>275,377 unique viewers</mark>,{' '}
            <mark>134,191 hours watched</mark>,{' '}
            <mark>59,900 unique Azarus users</mark> on the day.{' '}
            <em className="accent">Servers held.</em> We built for the
            upside the second time.
          </p>
          <p>
            Different host, different format, different audience. Same
            engine.
          </p>
        </div>
      </section>

      {/* ─── [07] IN PARALLEL ─────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] &middot; In parallel</span>
          <h2 className="delta__section-title">What ran alongside the campaigns.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Two streams of work ran underneath the three campaigns.
            Neither was headline-grabbing. Both kept the platform
            scaling between the big moments.
          </p>
          <p>
            <strong>An always-on US creator overlay program.</strong>{' '}
            Invite-only partnerships at a{' '}
            <mark>monthly flat rate per streamer</mark>, live on their
            normal channels. <strong>KingGeorge</strong> (Rainbow Six
            Siege, ~1M followers). <strong>lol_Nemesis</strong> (League
            of Legends, ~600K followers). Others across Valorant and
            Apex. Effective CCV: <mark>~$1.70</mark> vs{' '}
            <mark>$2.50&ndash;$3.50</mark> industry &mdash; roughly half
            what the market paid, because flat-rate contracting means
            the platform compounds, not billable hours.
          </p>
          <p>
            <strong>A cross-platform launch with Meta.</strong> I project
            managed the launch of Azarus on{' '}
            <mark>Facebook Gaming</mark> end-to-end &mdash; Meta
            partnership rollout, Beta cohort onboarding, streamer
            activation across <strong>Valorant</strong> and{' '}
            <strong>Apex</strong>, launch comms across LinkedIn,
            Facebook, Twitter and the blog. <mark>~100 streamers</mark>{' '}
            in the Beta. Proof the playbook wasn&rsquo;t
            Twitch-dependent.
          </p>
        </div>
      </section>

      {/* ─── FB GAMING BETA LOCKUP PLATE ──────────────────────── */}
      {/* Azarus × Facebook Gaming launch lockup — official partnership
          artwork for the Beta rollout. Meta blue palette, brand co-mark. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/azarus-facebook-gaming-beta-lockup.png'}
          alt="Azarus × Facebook Gaming Beta launch lockup — the official partnership artwork featuring the Facebook Gaming wordmark and Azarus mark on Meta blue, with 'BETA' beneath"
        />
        <figcaption className="container">
          Azarus &times; Facebook Gaming &mdash; the official Beta
          partnership lockup. I project managed the launch end-to-end:
          Meta partnership rollout, Beta cohort, comms across LinkedIn,
          Facebook, Twitter and the blog.
        </figcaption>
      </figure>

      {/* ─── [08] THE TAKEAWAY ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] &middot; The takeaway</span>
          <h2 className="delta__section-title">Three campaigns, one engine.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            The brief was Azarus&rsquo;s first US streamer relationships
            at scale. The work was three escalating campaigns &mdash; the{' '}
            <mark>League of Legends launch (+80% MAU)</mark>, title
            sponsorship of{' '}
            <mark>the inaugural Streamer Awards (500K viewers, 90%
            engaged, 20% converted, servers crashed)</mark>, and a
            controlled replication on{' '}
            <mark>Amouranth&rsquo;s Streamer Royale</mark>. Running
            alongside: an always-on US creator program at half industry
            CCV, and a project-managed launch of Azarus on Facebook
            Gaming with ~100 streamers in the Beta.
          </p>
          <p>
            <strong>Three campaigns. One engine.</strong> The streamer
            relationships built across these moments became
            Azarus&rsquo;s US growth foundation.
          </p>
          <p>
            <strong>Three takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Engagement is the thesis. Conversion is
            the infrastructure</mark>.</strong> 90% played, 20%
            converted. The gap was server capacity, not interest. Build
            ops for the upside.
          </p>
          <p>
            <strong>2. <mark>Three campaigns escalate, one engine
            compounds</mark>.</strong> LoL proved the model. Streamer
            Awards proved it at scale. Streamer Royale proved it was
            repeatable. Each campaign earned the right to the next.
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
