import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Azarus · Ad platform pivot — bespoke case study page.
 *
 * Spine: streamer proof point set up the pivot → from Twitch overlay to gamified
 * ad platform → format designed and tested with the creator community → brand
 * advertisers locked at $2 CPI → token launch → acquired by Animoca Brands.
 *
 * Voice & Scope: Laura led the product pivot, the gamified ad format, and the
 * marketing around it. She did NOT close the Ubisoft and Logitech deals — the
 * ex-Amazon sales team did. On $AZA: listings, comms, partner onboarding —
 * NOT the full token build. Lede and section openers must reflect this.
 * "Led" not "designed solo". "Drove" not "built end-to-end" on crypto. See
 * docs/case-study-rules.md for the full ruleset.
 *
 * Structure: cover + 4-stat row + 7 numbered sections + CTA.
 *   [01] Where it started               engagement at scale, no monetization
 *   [02] The pivot                       from overlay to gamified ad platform
 *                                        (+ how-to-play YouTube embed)
 *   [03] Tested first                    proven with streamers first
 *                                        (+ Coca-Cola mock campaign demo)
 *   [04] Campaign 1                      Ubisoft × Brawlhalla, $2 CPI
 *                                        (+ Brawlhalla autoplay loops)
 *   [05] Campaign 2                      Logitech × ElainaExe, in parallel
 *                                        (+ Logitech autoplay loops)
 *   [06] The token                       $AZA: alignment, in code
 *                                        (+ tokenomics chart)
 *   [07] The takeaway                    the engagement engine became a business
 *
 * Reuses the .delta__* class system. Same visual grammar as the
 * streamer-led Azarus case study at /work/azarus.
 */
export default function AzarusGameAdsPage() {
  useDocumentMeta({
    title: 'Azarus · Pivoting to a gamified ad platform · Acquired by Animoca, Oct 2023 · Case study by Laura Cordrey',
    description:
      'Pivoted Azarus from a Twitch overlay product into a gamified ad platform. Designed the gamified ad format end-to-end, ran the Alpha and Beta with the streamer community, locked Ubisoft and Logitech as launch advertisers at $2 CPI, and led the $AZA token launch (Coinbase + Crypto.com listings). Acquired by Animoca Brands in October 2023.',
    canonical: pageUrl('work/azarus-game-ads'),
    ogImage: assetUrl('case-studies/azarus-overlay-games-banner.jpeg'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'azarus-game-ads',
      title: 'Azarus — pivoting from Twitch overlay to gamified ad platform, sold to Animoca',
      description:
        'I pivoted Azarus from a Twitch overlay product into a gamified ad platform. Designed the gamified ad format end-to-end, ran the Alpha and Halloween Beta with streamers from the community program I had built, locked Ubisoft and Logitech as launch advertisers at $2 CPI, and led the $AZA token launch (Coinbase and Crypto.com listings). Azarus was acquired by Animoca Brands in October 2023.',
      image: 'case-studies/azarus-overlay-games-banner.jpeg',
      datePublished: '2023-10-01',
      client: 'Azarus',
      role: 'VP Marketing',
      market: 'USA',
      sector: 'Gaming · Web3',
      about: ['Product Pivot', 'Gamified Advertising', 'Token Launch', 'Brand Partnerships', 'Web3'],
      keywords: ['gamified ads', '$AZA token', 'Coinbase listing', 'Brawlhalla', 'Ubisoft', 'Logitech', 'Animoca Brands acquisition', 'live engagement platform'],
      principles: [
        'Earn the right to pivot',
        'Premium pricing beats discount pricing if the format earns it',
        'Token work is brand work, not crypto work',
      ],
      faqItems: [
        {
          question: 'How do you pivot a Twitch product into a gamified ad platform?',
          answer:
            'You earn the right to pivot first. The Streamer Awards proof point (500K viewers, 90% engagement) gave the advertiser conversation. We reshaped the engagement mechanic from streamer overlay into a brand-advertising format: brands buy CPI-priced engagement, streamers run the gamified ad live on their channel, viewers play and earn rewards. The format was designed end-to-end, then tested with the streamer community before any brand was approached.',
        },
        {
          question: 'How did Azarus lock Ubisoft and Logitech as launch advertisers?',
          answer:
            'A fully-rendered mock campaign using Coca-Cola brand identity as visual shorthand. Not a real client, a way for any advertiser to see themselves inside the format. Ubisoft signed for Brawlhalla (live on Xenrichan, November 2022). Logitech signed in parallel (live on ElainaExe). Both at $2 CPI, benchmarked against Amazon gaming-ad data by our ex-Amazon sales team.',
        },
        {
          question: 'Why a token launch alongside the ad platform?',
          answer:
            'Alignment. The $AZA token routed every advertiser dollar across streamers, players, platform and a community treasury. Brands purchased $AZA to run campaigns; the same token rewarded the streamers and players who made the platform work. Same product-launch playbook as any other launch, with regulatory care added. Listed on Coinbase and Crypto.com.',
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
            <span className="marker">Azarus &middot; USA &middot; 2022&ndash;2023</span>
          </div>
          <h1 className="delta__cover-title">
            Pivoting <mark>Azarus</mark>.
          </h1>
          <p className="delta__cover-lede">
            The pivot from Twitch overlay to gamified ad platform for
            sponsoring brands. I led the front-end product overhaul and
            the GTM. Campaigns with Ubisoft and Logitech averaged{' '}
            <mark>$2 CPI</mark>. $AZA listed on Coinbase and Crypto.com.
            Acquired by Animoca Brands in October 2023.
          </p>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* The Overlay Games Company positioning banner — the brand
          statement of the pivot. 16:9, fills the hero edge-to-edge. */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/azarus-game-ads-card.png'}
          alt="Azarus repositioning banner — the AZARUS wordmark with the tagline 'The Overlay Games™ Company' on a dark background with purple and red gradient lighting"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      {/* Four stats. Scale first (4M+ viewers, $2M+ prizes — tenure-era
          press-release figures confirmed by Laura, see commit f0de8c8),
          then the commercial proof ($2 CPI, $AZA). Narrative: at scale →
          monetized. The Animoca acquisition close lives in the lede and
          [07] rather than the stat row. */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">4M+</span>
            <span className="marker delta__stat-label">Viewers participated</span>
          </li>
          <li>
            <span className="delta__stat-value">$2M+</span>
            <span className="marker delta__stat-label">Prizes distributed to fans</span>
          </li>
          <li>
            <span className="delta__stat-value">$2 CPI</span>
            <span className="marker delta__stat-label">Launch campaigns &middot; Ubisoft + Logitech</span>
          </li>
          <li>
            <span className="delta__stat-value">$AZA</span>
            <span className="marker delta__stat-label">Token launch &middot; Coinbase + Crypto.com listings</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; Where it started</span>
          <h2 className="delta__section-title">Engagement at scale. No monetization.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            At the time, Azarus was a browser overlay on Twitch. The{' '}
            <Link to="/work/azarus" className="accent">
              Streamer Awards
            </Link>{' '}
            had proved the engagement model worked. What it hadn&rsquo;t
            solved was monetization: for the company, for the streamers
            running the overlay, or for the brands trying to reach them.
          </p>
          <p>
            That was the pivot.
          </p>
        </div>
      </section>

      {/* ─── [02] THE PIVOT ───────────────────────────────────── */}
      {/* Strategic move: format mechanic + Oct 2022 repositioning + team.
          The how-to-play YouTube video closes the section. The beta
          proof and the Coca-Cola pitch artefact live in [03] now. */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; The pivot</span>
          <h2 className="delta__section-title">From overlay to gamified ad platform.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            I led the team that reshaped Azarus as a{' '}
            <mark>gamified advertising format</mark>. Brands buy
            CPI-priced engagement, not banner space.
          </p>
          <p>
            The repositioning landed in October 2022:{' '}
            <strong>The Overlay Games&trade; Company</strong>. My team
            delivered it: 8 people across brand, community, game design
            and comms.
          </p>
        </div>
      </section>

      {/* How-to-play walkthrough video — credit caption sits BELOW the
          video (Laura's rule). Thumbnail-style YouTube link rather than
          an inline iframe (cleaner editorial flow, lazy-loads on click). */}
      <section className="delta__video-section delta__video-section--continuation container">
        <a
          href="https://www.youtube.com/watch?v=34AzFfo7C6E"
          target="_blank"
          rel="noreferrer"
          className="delta__video-frame delta__video-thumbnail"
          aria-label="Watch the Azarus gamified ad format walkthrough on YouTube"
        >
          <img
            src="https://i.ytimg.com/vi/34AzFfo7C6E/maxresdefault.jpg"
            alt="Azarus gamified ad format walkthrough — YouTube thumbnail"
          />
          <span className="delta__video-thumbnail-play" aria-hidden="true">▶</span>
        </a>
        <p className="delta__video-context">
          Explanation video storyboarded by me with my VO.
          Post-production and animation by{' '}
          <strong>Gabriel Virata Alves</strong>.
        </p>
      </section>

      {/* ─── [03] PROVEN WITH STREAMERS FIRST ─────────────────── */}
      {/* The de-risking story: Alpha + Halloween Beta with the creator
          community before any brand was approached, plus the Coca-Cola
          mock campaign as the pitch artefact. Coca-Cola demo loop
          closes the section. */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] &middot; From alpha to demo</span>
          <h2 className="delta__section-title">Proven with streamers first.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            We moved forward with a trivia ad game format: a countdown
            to bring players in and increase the prize pool; three
            rounds of trivia about the sponsoring brand; the brand ad
            plays; players press to collect their winnings at the end.
            Attention held to the very last beat. That&rsquo;s the
            value behind the CPI.
          </p>
        </div>
      </section>

      {/* Go Live with Azarus Trivia marketing creative — punctuates the
          format choice before the stress-test paragraph. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/azarus-go-live-trivia.jpeg'}
          alt="Go Live with Azarus Trivia marketing creative — bold TRIVIA wordmark with a treasure chest, gold coins flying, and the Azarus logo at the bottom"
        />
        <figcaption className="container">
          Go Live with Azarus Trivia. Marketing creative.
        </figcaption>
      </figure>

      <section className="delta__section delta__section--continuation container">
        <div className="delta__section-body">
          <p>
            Before pitching to brands I wanted to stress-test the
            format. We designed and tested an Alpha and Beta with the{' '}
            <Link to="/work/azarus" className="accent">
              always-on creator community
            </Link>{' '}
            we had built.
          </p>
          <p>
            Their feedback helped us shape the final demo, a
            fully-rendered mock campaign using Coca-Cola, to enable
            potential sponsors to picture themselves in the campaign.
            This is what the sales team used to secure our first
            sponsoring brands.
          </p>
        </div>
      </section>

      {/* Coca-Cola mock campaign demo — fully-rendered pitch artefact
          using Coca-Cola brand identity as visual shorthand (not a real
          client). The "cola one" Laura referenced; lives in the public
          folder as azarus-game-demo.mp4 (~205MB, autoplay-muted-loop
          per the Brawlhalla/Logitech convention; consider a compressed
          variant later). */}
      <figure className="delta__plate delta__plate--full">
        <video
          src={BASE + 'case-studies/azarus-game-demo.mp4'}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Azarus gamified ad mock campaign — a fully-rendered demo using Coca-Cola brand identity as visual shorthand, the pitch artefact shown to advertisers"
        />
        <figcaption className="container">
          The mock campaign I shipped to pitch advertisers. Coca-Cola as
          visual shorthand. Any brand could see themselves inside it.
        </figcaption>
      </figure>

      {/* ─── [04] CAMPAIGN 1: UBISOFT × BRAWLHALLA ───────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; Campaign 1</span>
          <h2 className="delta__section-title">Azarus &times; Ubisoft.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The campaign was built around Ubisoft&rsquo;s new character
            launch in Brawlhalla, with a trivia round, advertisement,
            and winnings collection at the end. Streamed with our
            streamers from our always-on creator program.
          </p>
        </div>
      </section>

      {/* Brawlhalla campaign carousel — social asset (Gabriel's launch
          loop) first, then the livestream proof (Xenrichan on Twitch). */}
      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/azarus-brawlhalla-loop-01.mp4',
              alt: 'Azarus × Ubisoft Brawlhalla launch loop — looping animation of the gamified ad creative',
              caption:
                'Azarus × Ubisoft Brawlhalla. Launch loop made by Gabriel Virata Alves.',
            },
            {
              src: 'case-studies/azarus-brawlhalla-xenrichan-stream.mp4',
              alt: 'Xenrichan streaming the Azarus × Ubisoft Brawlhalla gamified ad live on her channel',
              caption: 'Live on Xenrichan. The campaign running in stream.',
            },
          ]}
        />
      </div>

      {/* ─── [05] CAMPAIGN 2: LOGITECH × BLACK FRIDAY ───────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; Campaign 2</span>
          <h2 className="delta__section-title">Azarus &times; Logitech.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Our next campaign landed on Black Friday with Logitech,
            streamed by the same always-on creator program. Across both
            campaigns, we averaged <mark>$2 CPI</mark>.
          </p>
        </div>
      </section>

      {/* Logitech campaign carousel — livestream proof (ElainaExe) first
          per Laura's call, then the social asset (Gabriel's launch loop). */}
      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/azarus-logitech-elainaexe.mp4',
              alt: 'ElainaExe streaming the Azarus × Logitech gamified ad live on her channel',
              caption: 'Live on ElainaExe. The campaign running in stream.',
            },
            {
              src: 'case-studies/azarus-logitech-logos-loop.mp4',
              alt: 'Azarus × Logitech launch loop — looping animation of the gamified ad creative',
              caption:
                'Azarus × Logitech. Launch loop made by Gabriel Virata Alves.',
            },
          ]}
        />
      </div>

      {/* ─── CPI RESULT CALLOUT ─────────────────────────────── */}
      {/* Banner proof beat between the two campaigns and the token:
          the $2 CPI averaged across both Ubisoft and Logitech runs.
          Above industry. Same delta__result pattern as the streamer
          page. */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Both campaigns</span>
          <p className="delta__result-value">
            <mark>$2 CPI</mark>
          </p>
          <p className="delta__result-caption">
            Averaged across Ubisoft and Logitech. Above industry.
          </p>
        </div>
      </aside>

      {/* ─── [06] THE TOKEN ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; The token</span>
          <h2 className="delta__section-title">From AZA Credits to a tradeable token.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            AZA Credits lived inside the overlay as an internal
            currency. We turned them into a crypto token, routing every
            advertiser dollar across streamers, players, platform and
            community treasury. Alignment, not just incentives.
          </p>
          <p>
            My contribution: branding, listings, comms and partner
            onboarding. $AZA went live on <mark>Coinbase</mark> and{' '}
            <mark>Crypto.com</mark>.
          </p>
        </div>
      </section>

      {/* $AZA "now available" live loop — public-facing launch creative
          (swapped in for the tokenomics chart, which may have shown
          internal-only distribution numbers). */}
      <figure className="delta__plate delta__plate--full">
        <video
          src={BASE + 'case-studies/azarus-azacoin-live-logos-loop.mp4'}
          autoPlay
          loop
          muted
          playsInline
          aria-label="$AZA token launch loop — animated creative announcing $AZA is now live, with Coinbase and Crypto.com exchange logos"
        />
        <figcaption className="container">
          $AZA token launch loop. Made by{' '}
          <strong>Gabriel Virata Alves</strong>.
        </figcaption>
      </figure>

      {/* ─── [07] THE TAKEAWAY ───────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] &middot; The takeaway</span>
          <h2 className="delta__section-title">A consumer product, pivoted into a B2B brand business.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            The Ubisoft and Logitech campaigns kicked off a format
            Azarus went on to scale, including an official Twitch
            partnership and an acquisition by{' '}
            <mark>Animoca Brands</mark> in October 2023. 4M+ viewers
            participated, $2M+ in prizes distributed.{' '}
            <strong>Game ads: proved.</strong>
          </p>
          <p>
            <strong>Three takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Build community programs as testing
            infrastructure</mark>.</strong> The always-on creator
            program I had built doubled as the talent for the Alpha and
            Halloween Beta, then ran the brand campaigns live. Same
            investment, two returns: the testing rig and the channel.
          </p>
          <p>
            <strong>2. <mark>Stress-test small before swinging
            big</mark>.</strong> We tested the format with the creator
            community before any brand saw it. Their feedback shaped
            the demo. By the time the sales team pitched, the format
            had already proven out with players.
          </p>
          <p>
            <strong>3. <mark>Brands want new ways to sell their
            products</mark>.</strong> Ubisoft and Logitech were excited
            to try the gamified ad format. Brand teams are ready to
            innovate when a fresh way to reach buyers shows up.
          </p>
          <p>
            An engagement engine, sold.
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
