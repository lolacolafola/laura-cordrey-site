import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Azarus · Ad platform pivot — bespoke case study page.
 *
 * Spine: streamer proof point set up the pivot → from Twitch overlay to gamified
 * ad platform → format designed and tested with streamer community → brand
 * advertisers locked at $2 CPI → token launch → acquired by Animoca Brands.
 *
 * Structure: cover + 4-stat row + 7 numbered sections + CTA.
 *   [01] Where it started               the overlay had a ceiling
 *   [02] The pivot                       from overlay to gamified ad platform
 *                                        (+ overlay-games banner + tech stack)
 *   [03] The format                      built end-to-end, tested with streamers first
 *                                        (+ how-to-play YouTube embed)
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
            From Twitch overlay to gamified ad platform. I designed the
            format, tested it with the streamer community, and locked{' '}
            <mark>Ubisoft and Logitech</mark> at <mark>$2 CPI</mark>.
            In parallel, transformed the in-game currency into a
            tradeable token. Acquired by{' '}
            <mark>Animoca Brands</mark> in October 2023.
          </p>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* The Overlay Games Company positioning banner — the brand
          statement of the pivot. Natively wide; --contain so the
          AZARUS wordmark + tagline stay centred without crop. */}
      <figure className="delta__hero delta__hero--contain">
        <img
          src={BASE + 'case-studies/azarus-overlay-games-banner.jpeg'}
          alt="Azarus repositioning banner — the AZARUS wordmark with the new tagline 'The Overlay Games Company' on a purple gradient with floating confetti, the brand statement of the pivot"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">$2</span>
            <span className="marker delta__stat-label">CPI &middot; launch campaigns</span>
          </li>
          <li>
            <span className="delta__stat-value">Ubisoft + Logitech</span>
            <span className="marker delta__stat-label">Launch advertisers</span>
          </li>
          <li>
            <span className="delta__stat-value">Coinbase + Crypto.com</span>
            <span className="marker delta__stat-label">$AZA listings</span>
          </li>
          <li>
            <span className="delta__stat-value">Acquired</span>
            <span className="marker delta__stat-label">Animoca Brands &middot; Oct 2023</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] &middot; Where it started</span>
          <h2 className="delta__section-title">The overlay had a ceiling.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            After the{' '}
            <Link to="/work/azarus" className="accent">
              Streamer Awards
            </Link>
            , Azarus had proof of engagement at scale. But the Twitch
            overlay format had a ceiling. The total addressable market
            for an overlay-only product was capped by the Twitch viewer
            base and the friction of a browser extension.
          </p>
          <p>
            Three things needed to change: the product surface (something
            brands could buy at scale), the pricing model (something
            brands recognised), and the capital structure (something
            that aligned the streamers, viewers and platform with
            growth).
          </p>
          <p>
            I led the pivot.
          </p>
        </div>
      </section>

      {/* ─── [02] THE PIVOT ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] &middot; The pivot</span>
          <h2 className="delta__section-title">From overlay to gamified ad platform.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            We took the engagement mechanic that had worked on the
            Streamer Awards (live, gamified, audience playing along) and
            reshaped it as a <mark>brand-advertising format</mark>.
            Brands buy CPI-priced engagement, not banner space.
            Streamers run the gamified ad live on their channel. Viewers
            play, earn rewards, redeem in the Azarus Store.
          </p>
          <p>
            The repositioning landed in October 2022:{' '}
            <strong>The Overlay Games&trade; Company</strong>. I
            directed the website redesign that carried it.
          </p>
          <p>
            The platform connected five parties: brands, streamers,
            viewers, game makers and digital asset providers. Every
            transaction routed attention to revenue, and revenue back
            into engagement.
          </p>
        </div>
      </section>

      {/* The overlay game technology stack diagram — five-party value
          flow with Attention loops connecting brands, streamers,
          viewers, game makers and digital asset providers. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/azarus-overlay-tech-stack.jpeg'}
          alt="Azarus Overlay Game Technology Stack diagram — central Azarus mark surrounded by five connected nodes (Viewers, Streamers, Game Makers, Sponsors, Digital Assets Providers) with Attention loops between them"
        />
        <figcaption className="container">
          The Overlay Game Technology Stack. Every party in the loop.
        </figcaption>
      </figure>

      {/* ─── [03] THE FORMAT ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] &middot; The format</span>
          <h2 className="delta__section-title">Built end-to-end. Tested with my streamer community.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            I designed the gamified ad format end-to-end. From the
            moment a viewer joined the stream to the moment they
            collected their reward, every step was built to convert
            attention into engagement, then engagement into a reason to
            come back.
          </p>
          <p>
            Before any brand was approached, I ran the{' '}
            <mark>September 2022 Alpha</mark> and the{' '}
            <mark>October 2022 Halloween Beta</mark> live with streamers
            from the creator community I had built. Same talent from the
            always-on creator program covered in the{' '}
            <Link to="/work/azarus" className="accent">
              previous case study
            </Link>
            . The format had to prove out with players first.
          </p>
          <p>
            The pitch artefact: a fully-rendered mock campaign using
            Coca-Cola brand identity as visual shorthand. Not a real
            client. A way for any advertiser to see themselves inside
            the format before signing.
          </p>
        </div>
      </section>

      {/* How-to-play walkthrough video — Laura's voiceover, video
          direction by Gabriel. Shows the gamified ad mechanic
          end-to-end. Thumbnail-style YouTube link rather than an inline
          iframe (cleaner editorial flow, lazy-loads on click). */}
      <section className="delta__video-section delta__video-section--continuation container">
        <span className="marker">Watch the format</span>
        <p className="delta__video-context">
          The full walkthrough of the gamified ad mechanic. Voiceover by
          me; video direction by Gabriel.
        </p>
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
      </section>

      {/* Go Live with Azarus Trivia creative — the streamer-facing
          recruitment artefact that brought the format into channels.
          Sits between the format section and the brand campaigns to
          show the GTM craft that ran alongside the strategy. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/azarus-go-live-trivia.jpeg'}
          alt="Go Live with Azarus Trivia marketing creative — bold TRIVIA wordmark with a treasure chest, gold coins flying, and the Azarus logo at the bottom"
        />
        <figcaption className="container">
          The creative I shipped to recruit streamers into the format.
        </figcaption>
      </figure>

      {/* ─── [04] CAMPAIGN 1: UBISOFT × BRAWLHALLA ───────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] &middot; Campaign 1</span>
          <h2 className="delta__section-title">Ubisoft &times; Brawlhalla.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Ubisoft signed for Brawlhalla. Live on{' '}
            <strong>Xenrichan</strong> on{' '}
            <mark>November 17, 2022</mark>. <mark>$2 CPI</mark>.
          </p>
          <p>
            The CPI benchmark came from our ex-Amazon sales team,
            drawing on Amazon&rsquo;s gaming-ad data. Azarus was
            competing on quality at a premium price, not on volume at a
            discount.
          </p>
        </div>
      </section>

      {/* Brawlhalla launch loop — short autoplay-muted clip Gabriel
          produced for the social announcement. Used as visual
          punctuation for the Ubisoft launch. */}
      <figure className="delta__plate delta__plate--full">
        <video
          src={BASE + 'case-studies/azarus-brawlhalla-loop-01.mp4'}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Azarus × Ubisoft Brawlhalla launch loop — looping animation of the gamified ad creative"
        />
        <figcaption className="container">
          Azarus &times; Ubisoft Brawlhalla. Launch loop.
        </figcaption>
      </figure>

      {/* ─── [05] CAMPAIGN 2: LOGITECH × ELAINAEXE ──────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] &middot; Campaign 2</span>
          <h2 className="delta__section-title">Logitech &times; ElainaExe.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            Logitech signed in parallel. Live on{' '}
            <strong>ElainaExe</strong>. Same <mark>$2 CPI</mark>.
          </p>
          <p>
            One talent agency described the rate as{' '}
            <em>&ldquo;much higher than anything they have done in the
            past.&rdquo;</em> Premium pricing holding under brand-side
            procurement, not just on the deck.
          </p>
        </div>
      </section>

      {/* Logitech launch loop — short autoplay-muted clip Gabriel
          produced for the social announcement. */}
      <figure className="delta__plate delta__plate--full">
        <video
          src={BASE + 'case-studies/azarus-logitech-trivia-loop.mp4'}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Azarus × Logitech launch loop — looping animation of the gamified ad creative"
        />
        <figcaption className="container">
          Azarus &times; Logitech. Launch loop.
        </figcaption>
      </figure>

      {/* ─── [06] THE TOKEN ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] &middot; The token</span>
          <h2 className="delta__section-title">From AZA Credits to a tradeable token.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            AZA Credits already existed inside the overlay. Players
            earned them by playing, redeemed them in the Azarus Store.
            The token launch made the credits <mark>tradeable</mark>,
            and routed every advertiser dollar across streamers,
            players, platform and a community treasury.
          </p>
          <p>
            I led the <mark>$AZA token launch</mark> end-to-end: brand,
            whitepaper, GTM, comms. And supported listings on{' '}
            <mark>Coinbase</mark> and <mark>Crypto.com</mark>.
          </p>
          <p>
            Token work is brand work. Same product-launch playbook as
            any other launch. The regulatory work layered on top.
          </p>
        </div>
      </section>

      {/* $AZA tokenomics chart — distribution donut + vesting schedule.
          Total supply 1B, 4-year vesting. The on-record artefact of
          the alignment thesis. */}
      <figure className="delta__plate delta__plate--natural">
        <img
          src={BASE + 'case-studies/azarus-aza-tokenomics.jpeg'}
          alt="$AZA Tokenomics chart — distribution donut showing Stream DAOs 30%, Team 16%, Liquidity Reserve 15%, Ecosystem Fund 15%, Equity Holders Reserve 14.7%, Marketing 5%, Advisors 4%, AZA Credit Holders 0.3%, plus a 4-year distribution schedule line chart"
        />
        <figcaption className="container">
          $AZA tokenomics. 1B total supply, 4-year vesting.
        </figcaption>
      </figure>

      {/* ─── [07] THE TAKEAWAY ───────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] &middot; The takeaway</span>
          <h2 className="delta__section-title">The engagement engine became a business.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            Brand advertisers at premium CPI. A tradeable token aligning
            streamers, players, platform and treasury with growth.
            Hundreds of thousands of active players. Acquired by{' '}
            <mark>Animoca Brands</mark> in October 2023.
          </p>
          <p>
            <strong>One engine. Three surfaces.</strong> The format I
            built, the brand advertisers it served, and the token that
            funded it.
          </p>
          <p>
            <strong>Three takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Earn the right to pivot</mark>.</strong>{' '}
            Without the Streamer Awards proof point, no advertiser
            conversation. The big swings unlock the next chapter; the
            quiet work between them earns the right to take them.
          </p>
          <p>
            <strong>2. <mark>Premium pricing beats discount pricing
            if the format earns it</mark>.</strong> $2 CPI was above
            industry. Brands paid because the engagement justified it,
            not because the volume did.
          </p>
          <p>
            <strong>3. <mark>Token work is brand work</mark>.</strong>{' '}
            The same product-launch playbook ran for $AZA as for any
            other launch. The regulatory work layered on top. Web3
            doesn&rsquo;t need a separate playbook; it needs the same
            one, with care added.
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
