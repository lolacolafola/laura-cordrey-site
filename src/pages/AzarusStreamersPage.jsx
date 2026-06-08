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
      role: 'VP Marketing',
      market: 'USA',
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
            <span className="marker">Azarus &middot; USA &middot; 2021&ndash;2022</span>
          </div>
          <h1 className="delta__cover-title">
            Scaling <mark>Azarus</mark> through streamers.
          </h1>
          <p className="delta__cover-lede">
            Three escalating streamer campaigns scaled Azarus&rsquo;s US
            presence. A coordinated League of Legends launch,{' '}
            <mark>title sponsorship of the first Streamer Awards</mark>,
            and the same playbook on Amouranth&rsquo;s Streamer Royale.
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      {/* The Streamer Awards official banner — art-deco logo on navy,
          "RECOGNIZE THE BEST OF LIVE STREAMING" tagline. Leads with the
          flagship campaign of the case study. Uses --contain so the
          tagline at the bottom isn't clipped by the default 21:9
          object-fit:cover crop (image is natively ~1.88:1). */}
      <figure className="delta__hero delta__hero--contain">
        <img
          src={BASE + 'case-studies/azarus-streamer-awards-banner.png'}
          alt="The Streamer Awards official banner — art-deco gold-on-navy logo with the tagline 'Recognize the best of live streaming' — the flagship event Azarus title-sponsored in March 2022"
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
            <span className="delta__stat-value">20%</span>
            <span className="marker delta__stat-label">Viewer &rarr; member &middot; proven twice</span>
          </li>
          <li>
            <span className="delta__stat-value">~½</span>
            <span className="marker delta__stat-label">Industry CCV cost &middot; creator program</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] THE BRIEF ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; Where it started</span>
          <h2 className="delta__section-title">A product that worked. Time to scale it.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Azarus was a <strong>native Twitch overlay</strong>. An
            interactive layer that ran inside the Twitch player, with
            trivia, polls and challenges built on top of live streams.
            Backed by{' '}
            <strong>Galaxy Digital, Animoca Brands and Kleiner
            Perkins</strong>, the tagline was{' '}
            <em>
              &ldquo;Turn passive viewers into active participants.&rdquo;
            </em>
          </p>
          <p>
            The product worked. Real engagement, early streamer
            relationships, proof of concept. What it didn&rsquo;t have
            yet was <strong>scale</strong>. The platform needed{' '}
            <mark>top US streamers running the overlay live, week after
            week</mark>, in front of the audiences it was built for.
          </p>
          <p>
            That&rsquo;s where I came in.
          </p>
        </div>
      </section>

      {/* Riot's official League of Legends key art — visual anchor for the
          campaign. Lives between sections so it spans full container width
          rather than getting trapped in the section's 2-col grid. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/azarus-league-of-legends-banner.webp'}
          alt="League of Legends official key art — champion ensemble (Lux, Jinx, Yasuo, Blitzcrank) with the LEAGUE OF LEGENDS wordmark — the game Azarus integrated for Campaign 1"
        />
      </figure>

      {/* ─── [02] CAMPAIGN 1 — THE LOL LAUNCH ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; Campaign 1: the LoL launch</span>
          <h2 className="delta__section-title">A coordinated US push for League of Legends.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Azarus was shipping{' '}
            <strong>Twitch overlay support for League of Legends</strong>.
            I paired the product launch with a coordinated US streamer
            push to increase brand awareness. I negotiated talent through{' '}
            <strong>AFK</strong> and <strong>BEN Agency</strong> to
            secure top LoL streamers (<strong>Caedrel, CookieLoLxx,
            IMLS, lol_Nemesis, Tarzaned</strong>). Over{' '}
            <mark>10M viewers reached</mark>, shooting our{' '}
            <mark>MAU up by 80%</mark>.
          </p>
        </div>
      </section>

      {/* ─── EXPANSION PROOF CALLOUT ──────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">League of Legends</span>
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
          <span className="marker">[03] &middot; Campaign 2: the big swing</span>
          <h2 className="delta__section-title">The first Streamer Awards.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            In <strong>March 2022</strong>, QTCinderella and Maya Higa
            were launching the first <mark>Streamer Awards</mark> on
            Twitch. An awards show built for streaming, by streamers.{' '}
            <em>The streaming world&rsquo;s Oscars</em>, eventually.
          </p>
          <p>
            I secured the title sponsorship: a{' '}
            <mark>6-figure deal</mark>, the biggest brand bet Azarus had
            made. With it came every major streamer&rsquo;s community
            tuning in on Twitch for one night.
          </p>
          <p>
            Plus the prize pool to back it:{' '}
            <mark>5M+ AZA credits (~$50,000 in value)</mark> for fans to
            win during the broadcast, redeemable in the Azarus Store
            across <mark>35,000+ items</mark>.
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
          Red carpet, first Streamer Awards. Mizkif, Emiru and others
          on the read-out.
        </figcaption>
      </figure>

      {/* ─── [04] CAMPAIGN 2 — WHAT I SHIPPED ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; Campaign 2: what was shipped</span>
          <h2 className="delta__section-title">A gamified engagement layer, built for the broadcast.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Our overlay was built <em>for the show</em>.
          </p>
          <p>
            <mark>14 award categories. ~65 nominee streamers.</mark>{' '}
            Bespoke trivia questions for fans, pushed live with the
            event product team.
          </p>
          <p>
            On the night, a team member was{' '}
            <strong>inside the production room</strong> with the
            broadcast crew, firing live questions in real time based on
            what was unfolding on stage. The sponsorship didn&rsquo;t
            sit on top of the show. It became part of it.
          </p>
          <p>
            I also wrote the <strong>on-air callout</strong> the
            presenters read out, and the{' '}
            <strong>marketing materials</strong> around the sponsorship.
            The audience didn&rsquo;t just see the Azarus overlay; they
            heard our framing too.
          </p>
          <blockquote className="delta__press-quote">
            <p>
              &ldquo;Azarus turns livestreams into a digital arena and
              our trivia game for The Streamer Awards is a truly
              tailored experience for viewers to play along to the live
              show.&rdquo;
            </p>
            <cite>
              Laura Cordrey, VP Marketing, Azarus.{' '}
              <a
                href="https://www.gamespress.com/Azarus-Brings-Trivia-Game-To-The-Streamer-Awards"
                target="_blank"
                rel="noopener noreferrer"
              >
                Games Press, March 2022
              </a>
              .
            </cite>
          </blockquote>
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
          Maya Higa and QTCinderella on stage. The night the Azarus
          overlay ran live under the broadcast.
        </figcaption>
      </figure>

      {/* ─── [05] CAMPAIGN 2 — THE RESULT AND THE CRASH ────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; Campaign 2: the results</span>
          <h2 className="delta__section-title">The demand: confirmed.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <mark>500K peak concurrent viewers</mark> tuned in on the
            Streamer Awards Twitch livestream.{' '}
            <mark>90% engagement rate</mark> with the Azarus overlay
            during the broadcast. <mark>20% of players</mark> made an
            account on the website to redeem their winnings.
          </p>
          <p>
            But the servers crashed.
          </p>
          <p>
            The campaign was such a success that we weren&rsquo;t
            prepared. With the audience so eager to redeem their
            winnings, the <mark>20% who got through</mark> could have
            been much higher.
          </p>
          <p>
            <strong>Demand confirmed. Support needed improving.</strong>
          </p>
        </div>
      </section>

      {/* ─── THE PROOF CALLOUT ────────────────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Streamer Awards</span>
          <p className="delta__result-value">
            <mark>Crashed the servers</mark>
          </p>
          <p className="delta__result-caption">
            <strong>500K showed up. The servers couldn&rsquo;t.</strong>
          </p>
        </div>
      </aside>

      {/* Streamer Royale official lineup banner — Amouranth front and
          centre with the 16-streamer cohort, STREAMER ROYALE wordmark.
          Lives between sections so it spans full container width. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/azarus-streamer-royale-lineup.jpg'}
          alt="Streamer Royale official lineup banner — Amouranth, JennaLynnMeowri, Mizkif and the 16-streamer cohort with the STREAMER ROYALE wordmark"
        />
      </figure>

      {/* ─── [06] CAMPAIGN 3 — STREAMER ROYALE ─────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; Campaign 3: running it back</span>
          <h2 className="delta__section-title">Streamer Royale: same engine, different stage.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Two months later, <mark>May 28, 2022</mark>.
          </p>
          <p>
            Streamer Royale, a physical-challenge event on{' '}
            <mark>Amouranth&rsquo;s</mark> Twitch channel.{' '}
            <strong>16 streamers</strong>, kneeboarding, obstacle
            courses, head-to-head over five hours of live competition.
          </p>
          <p>
            We built new mechanics for the format.{' '}
            <strong>30+ live questions</strong> across four styles, plus
            a <mark>polling-to-revive mechanic</mark> that let the
            audience vote eliminated contestants back into the finale.
          </p>
          <p>
            <strong>The result:</strong> <mark>275K unique viewers</mark>.{' '}
            <mark>134K hours watched</mark>.{' '}
            <mark>60K unique Azarus users</mark> on the day.{' '}
            <em>Servers held.</em>
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
          <h2 className="delta__section-title">What kept the platform scaling.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Underneath the three campaigns, two streams of work kept the
            platform compounding.
          </p>
          <p>
            <strong>An always-on US creator overlay program.</strong>{' '}
            Invite-only partnerships at a{' '}
            <mark>monthly flat rate per streamer</mark>, live on their
            normal channels. <strong>KingGeorge</strong> (Rainbow Six
            Siege, ~1M followers). <strong>lol_Nemesis</strong> (League
            of Legends, ~600K followers). Others across Valorant and
            Apex as we brought more supported games to the platform.
          </p>
          <p>
            Effective viewer cost: <mark>~$1.70</mark> vs{' '}
            <mark>$2.50&ndash;$3.50</mark> industry. Flat-rate
            contracting means the platform compounds, not billable
            hours.
          </p>
          <p>
            <strong>A cross-platform launch with Meta.</strong> I project
            managed the launch of Azarus on{' '}
            <mark>Facebook Gaming</mark> with the Meta teams.{' '}
            <mark>~100 streamers</mark> in the Beta. Proof the playbook
            wasn&rsquo;t Twitch-dependent.
          </p>
        </div>
      </section>

      {/* ─── FB GAMING BETA LOCKUP PLATE ──────────────────────── */}
      {/* Azarus × Facebook Gaming launch lockup — official partnership
          artwork for the Beta rollout. Meta blue palette, brand co-mark. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/azarus-facebook-gaming-beta-lockup.png'}
          alt="Azarus × Facebook Gaming Beta launch lockup — the official partnership artwork featuring the Facebook Gaming wordmark and Azarus mark on Meta blue, with 'BETA' beneath"
        />
        <figcaption className="container">
          Azarus &times; Facebook Gaming. The official Beta partnership
          lockup.
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
            The work was three escalating streamer campaigns. A
            coordinated League of Legends launch (<mark>+80% MAU</mark>).
            Title sponsorship of the first
            Streamer Awards (<mark>500K viewers, 90% engagement
            rate</mark>). The same playbook on Amouranth&rsquo;s
            Streamer Royale (<mark>275K viewers, 60K Azarus users</mark>).
            Running alongside: an always-on US creator program at
            roughly half the industry viewer cost, and a
            project-managed launch of Azarus on Facebook Gaming with{' '}
            <mark>~100 streamers</mark> in the Beta.
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
            <strong>1. <mark>Demand is bigger than the build</mark>.</strong>{' '}
            90% engaged with the overlay. The audience showed up bigger
            than anyone projected. Build infrastructure for the upside,
            not the projection.
          </p>
          <p>
            <strong>2. <mark>Three campaigns escalate, one engine
            compounds</mark>.</strong> LoL proved the model. Streamer
            Awards proved it at scale. Streamer Royale proved it was
            repeatable. Each campaign earned the right to the next.
          </p>
          <p>
            <strong>3. <mark>Preplan around the subject, react in real
            time</mark>.</strong> Trivia tied to the show&rsquo;s
            content gets you most of the way. The live reactive layer,
            questions fired in real time as the show unfolds, is what
            pushes engagement to its ceiling.
          </p>
          <p>
            A growth engine, built for livestreams.
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
