import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are now generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* US Mobile — bespoke case study page.
 *
 * Structure: cover + 4-stat row + 9 numbered sections + CTA.
 *   [01] Where it started      community-brand context
 *   [02] The opportunity       the SIM kit insight + test thesis
 *   [03] The bundle            what was in the $129 VIP package (+ carousel)
 *   [04] The pre-launch funnel email → game → code → countdown → VIP landing
 *                              (+ "Demand signal" stat callout)
 *   [05] The cap               250 units by design
 *   [06] The drop              sold out in three hours
 *                              (+ "The proof" stat callout)
 *   [07] What fans did         CEO Reddit, Stetson, network banner, fleece (+ carousel)
 *   [08] Celebrating Dark Star Madison Ave launch event (+ carousel)
 *   [09] The takeaway          hypothesis → result → prediction → synthesis
 *
 * Reuses the .delta__* class system from the Delta page. The visual
 * grammar (hairline dividers, plate widths, video frame, brand carousel,
 * stat callouts) is now a shared case-study system, not Delta-specific.
 */
export default function UsMobilePage() {
  useDocumentMeta({
    title: 'US Mobile Dark Star · Fandom is purchasing power · $32K in 3 hours · Case study by Laura Cordrey',
    description:
      'I designed a $129 limited-edition VIP fan bundle around US Mobile’s Dark Star launch. Sold out in 3 hours — $32K in revenue, 6-figure upside on the table. Proof that superfans will pay to be early, rare, and relevant. Fandom is purchasing power.',
    canonical: pageUrl('work/us-mobile-dark-star'),
    ogImage: assetUrl('case-studies/us-mobile-dark-star-banner.png'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'us-mobile-dark-star',
      title: 'US Mobile Dark Star — fandom is purchasing power',
      description:
        '$129 limited-edition VIP bundle, 250 units, sold out in 3 hours. $32K closed, 6-figure upside left on the table. Proof that fan-led growth converts to revenue.',
      image: 'case-studies/us-mobile-dark-star-banner.png',
      datePublished: '2024-08-15',
      client: 'US Mobile',
      role: 'Head of Community',
      market: 'US',
      sector: 'Telco',
      about: ['Fan-Led Growth', 'Premium Drops', 'Dark Star', 'Gamification', 'Community Monetisation'],
      keywords: ['fandom is purchasing power', 'premium drop', 'limited edition', 'US Mobile', 'Dark Star', 'gamified pre-launch funnel'],
      principles: [
        'Don’t cap for unexpected success',
        'Your superfans are your top spenders',
        'Gamify the portal to entry',
      ],
      faqItems: [
        {
          question: 'How should you plan operations for a premium fan drop?',
          answer:
            'Don’t cap for unexpected success. The 3-hour sell-out of the Dark Star VIP bundle suggested the drop could have done 3–4x more, well into 6 figures. CEO calls were the scaling bottleneck, not demand. Build your ops for the upside, not the baseline.',
        },
        {
          question: 'Will a community’s most engaged users pay premium prices for limited drops?',
          answer:
            'Yes. Your superfans are your top spenders. 250 units of a $129 SIM kit that had previously been free sold out in 3 hours. Your most engaged users will pay to be early, rare, and relevant — they want a piece of the moment, not just the product.',
        },
        {
          question: 'How do you build a premium drop funnel that converts?',
          answer:
            'Gamify the portal to entry. When something is scarce, make access just a little harder. For US Mobile Dark Star: a game to get the access code, an email pre-launch, a countdown page, then the scarcity reveal. Those mechanics drove the interest — the drop itself just collected the demand.',
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
            <span className="marker">US Mobile &middot; US &middot; 2024</span>
          </div>
          <h1 className="delta__cover-title">
            Selling <mark>Dark Star</mark>.
          </h1>
          <p className="delta__cover-lede">
            A controlled test of US Mobile&rsquo;s core community purchasing
            power. I designed a $129 limited-edition fan bundle, built the
            gamified pre-launch funnel, and sold out in three hours.
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      {/* Wide banner (2940x1664). No --contain so it fills edge-to-edge.
          object-position nudged up slightly so the wordmark sits closer
          to the visual center of the cropped banner. */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/us-mobile-dark-star-banner.png'}
          alt="Dark Star — US Mobile&rsquo;s premium plan banner, a moody black sphere on a starfield with the Dark Star wordmark, cinematic widescreen treatment"
          style={{ objectPosition: '50% 55%' }}
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">$32K</span>
            <span className="marker delta__stat-label">Sales in 3 hrs</span>
          </li>
          <li>
            <span className="delta__stat-value">250</span>
            <span className="marker delta__stat-label">VIP bundles, sold out</span>
          </li>
          <li>
            <span className="delta__stat-value">80%</span>
            <span className="marker delta__stat-label">Pre-launch email open rate</span>
          </li>
          <li>
            <span className="delta__stat-value">35%</span>
            <span className="marker delta__stat-label">Pre-launch email CTOR</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] · Where it started</span>
          <h2 className="delta__section-title">A community-first telco.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            US Mobile is a community-first telco. The{' '}
            <strong>r/USMobile subreddit</strong> has 33K+ active members,
            the CEO replies to threads personally, and word of mouth carries
            the brand.
          </p>
        </div>
      </section>

      {/* ─── [02] THE OPPORTUNITY ─────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] · The opportunity</span>
          <h2 className="delta__section-title">A SIM kit, given away.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            US Mobile was about to launch <strong>Dark Star</strong>, a new
            premium plan. The community was paying attention.
          </p>
          <p>
            While working on the launch plan, I saw an opportunity. US
            Mobile&rsquo;s SIM kits were being given away for free. They
            were beautifully made, and the company was paying to produce
            and ship every single one. I wanted to{' '}
            <mark>test whether the core community would pay</mark> for
            one. From there, a $129 VIP bundle was created.
          </p>
        </div>
      </section>

      {/* ─── [03] THE BUNDLE ──────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] · The bundle</span>
          <h2 className="delta__section-title">$129. What you got.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            What was inside wasn&rsquo;t for sale anywhere else: access,
            recognition, a one-of-one moment.
          </p>
          <p>
            <strong>The SIM kit.</strong> Two-week early access to Dark
            Star. A 12-month QCI&nbsp;8 upgrade. A custom{' '}
            <strong>&ldquo;Dark Star&rdquo; network banner</strong> on the
            buyer&rsquo;s phone in place of the usual carrier name. A{' '}
            <strong>US Mobile × The North Face® fleece</strong>{' '}
            embroidered with the buyer&rsquo;s initials. A signed letter.
          </p>
          <p>
            And a <mark>15-minute Zoom with the CEO</mark>.
          </p>
        </div>
      </section>

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/us-mobile-vip-bundle.png',
              alt: 'US Mobile Dark Star VIP Early Access Bundle product photograph — Dark Star branded SIM kit packaging, the SIM card with Dark Star artwork, and an exclusive Dark Star × The North Face® quarter-zip fleece, with a Limited Quantities badge',
              caption:
                'The $129 Dark Star VIP Bundle. Limited-edition SIM kit. Exclusive Dark Star × The North Face® fleece.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-ceo-letter.png',
              alt: 'Signed letter from US Mobile CEO Ahmed Khattak inside the Dark Star VIP Bundle — personally addressed thank-you, hand-numbered 002 of 250',
              caption:
                'A personally signed letter from CEO Ahmed Khattak inside every bundle. Hand-numbered 002 of 250.',
            },
          ]}
        />
      </div>

      {/* ─── [04] PRE-LAUNCH FUNNEL ──────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] · The pre-launch funnel</span>
          <h2 className="delta__section-title">A gamified runway.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            A limited drop only works if there&rsquo;s a queue. We built
            the pre-launch funnel to manufacture one, and to drive FOMO
            around something that had never been done before and was
            deliberately scarce.
          </p>
          <p>
            <strong>A Dark Star teaser landing</strong> with a countdown
            to buy. An <strong>arcade-style email game</strong> that earned
            an <mark>80% open rate</mark> and <mark>35% CTOR</mark>.
            Playing the game gave you a unique code, and the code was the
            only way to unlock the VIP bundle landing page.{' '}
            <strong>50K+ pre-launch visitors</strong> flowed through the
            funnel before the bundle ever went on sale.
          </p>
          <p>
            <a
              href="https://www.usmobile.com/videogame"
              target="_blank"
              rel="noreferrer"
              className="marker delta__play-link"
            >
              Play the original Dark Star game <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      </section>

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/us-mobile-darkstar-email.png',
              alt: 'Dark Star pre-launch email from Team at US Mobile — "Have what it takes to join the Dark Side?" with a pixel-art START button and a Let’s go! CTA',
              caption:
                'The pre-launch email that kicked off the funnel. 80% open rate, 35% CTOR.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-game.png',
              alt: 'Dark Star arcade-style game — pixel-art spaceship navigating a starfield with a dark planet, Level 1 onscreen',
              caption:
                'The arcade-style game built into the funnel. Beating it returned a unique code.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-code-page.png',
              alt: 'Dark Star code-entry page — minimalist black UI with a Get Unlock Code form and a sign-up input',
              caption:
                'The code page. Only people who beat the game could unlock the VIP bundle landing.',
            },
            {
              src: 'case-studies/us-mobile-dark-star.png',
              alt: 'US Mobile Dark Star teaser landing page with countdown timer',
              caption:
                'The Dark Star teaser landing. Countdown to buy, building 50K+ pre-launch visitors.',
            },
            {
              src: 'case-studies/us-mobile-vip-landing.png',
              alt: 'US Mobile $129 VIP Early Access Bundle landing page — the unlocked purchase moment',
              caption:
                'The purchase frame. Unlocked by the code, this is where the $129 VIP Bundle was bought. Capped at 250 units. Sold out in three hours.',
            },
          ]}
        />
      </div>

      {/* ─── STATS CALL-OUT — demand signal ─────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">Demand signal</span>
          <p className="delta__result-value">
            <mark>50K+ visitors</mark>
          </p>
          <p className="delta__result-caption">
            Through the gamified pre-launch funnel before a single bundle
            went on sale. 80% email open rate. 35% CTOR.
          </p>
        </div>
      </aside>

      {/* ─── [05] THE CAP ────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] · The cap</span>
          <h2 className="delta__section-title">250 units. By design.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            We capped the run at <mark>250</mark> to keep it a clean
            test. Anything bigger and we&rsquo;d be running a launch, not
            an experiment.
          </p>
          <p>
            The cap also had a real-world enforcer: every bundle came with
            a <strong>15-minute Zoom with the CEO</strong>, and there are
            only so many of those a CEO can do. Operational scarcity met
            test discipline.
          </p>
        </div>
      </section>

      {/* ─── [06] THE DROP ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] · The drop</span>
          <h2 className="delta__section-title">Sold out in three hours.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The bundle went live. The funnel did its job. The 250 units sold
            in under three hours. <mark>$32K in sales</mark> for a product
            that has always been given away free.
          </p>
        </div>
      </section>

      {/* ─── STATS CALL-OUT — the receipt ────────────────────── */}
      <aside className="delta__result">
        <div className="container delta__result-inner">
          <span className="marker delta__result-kicker">The proof</span>
          <p className="delta__result-value">
            <mark>$32K in 3 hours</mark>
          </p>
          <p className="delta__result-caption">
            From a SIM kit that has always been given away free. Same
            product. Reframed.
          </p>
        </div>
      </aside>

      {/* ─── [07] WHAT FANS DID ──────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[07] · What fans did</span>
          <h2 className="delta__section-title">The bundle did the marketing.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The CEO&rsquo;s launch post on{' '}
            <a
              href="https://www.reddit.com/r/USMobile/comments/1e469qn/dark_star_is_here_but_how_did_it_all_begin/"
              target="_blank"
              rel="noreferrer"
              className="delta__play-link"
            >
              r/USMobile
            </a>{' '}
            drove <mark>450+ comments</mark>. His follow-up edit said it
            cleanest: &ldquo;<em>we are sold out, this is insane</em>.&rdquo;
          </p>
          <p>
            The 250 buyers didn&rsquo;t go quiet either. They unboxed the
            fleece on X, posted the embroidered initials, the signed letter
            and the &ldquo;Dark Star&rdquo; network banner on their phones.
            The drop fed itself.
          </p>
        </div>
      </section>

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/us-mobile-ceo-reddit-edit.png',
              alt: 'Screenshot of the US Mobile CEO Ahmed Khattak’s Reddit launch post for the Dark Star VIP Bundle on r/USMobile, with the appended Edit 1 reading ‘We are sold out. This is insane. We thought these would last for a few days but they are gone within 3 hours of release’',
              caption:
                'The CEO’s own “we are sold out, this is insane” edit on the r/USMobile launch post. Three hours from drop to sold-out.',
            },
            {
              src: 'case-studies/us-mobile-stetson-tweet.png',
              alt: 'Stetson Doggett, a leading US telco influencer and founder of BestPhonePlans.net, unboxing the US Mobile × The North Face quarter-zip fleece on X — one of 450+ unprompted fan posts after the Dark Star drop',
              caption:
                'Stetson Doggett, a leading US telco influencer, unboxing the fleece on X. One of 450+ unprompted fan posts after the drop.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-network-banner-fan.jpg',
              alt: 'Fan-shared iPhone lock screen on r/USMobile showing the custom “Dark Star” carrier name in the top-left corner instead of US Mobile, with full signal bars',
              caption:
                'A fan’s phone showing the custom “Dark Star” network banner instead of the usual carrier name. Shared back to r/USMobile.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-fleece-reddit.png',
              alt: 'r/USMobile post titled "DarkStar VIP Fleece is Awesome" by anthonysredditname — a thank-you to US Mobile staff who tracked the buyer down after a house move so the fleece could be delivered. A community reply underneath reads "Ohhh so jealous — I’d be a walking billboard for them."',
              caption:
                '“DarkStar VIP Fleece is Awesome.” A buyer thanks US Mobile for chasing them down to deliver after a move. The reply underneath: “I’d be a walking billboard for them.”',
            },
          ]}
        />
      </div>

      {/* ─── [08] CELEBRATING DARK STAR — Madison Ave event ──── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[08] · Celebrating Dark Star</span>
          <h2 className="delta__section-title">Countdown to blastoff.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            With the bundle sold out and the launch landing, we marked the
            moment in person. I produced a Dark Star launch event at the{' '}
            <strong>US Mobile office on Madison Avenue, New York</strong>.
          </p>
          <p>
            <strong>200+ attendees</strong>, including AT&T executives,
            the US Mobile team, key community members, influencers, and
            friends and family. Dark Star went live with a presentation
            from the leadership team and a countdown to celebrate.
          </p>
        </div>
      </section>

      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/us-mobile-darkstar-event-01-stage.jpg',
              alt: 'US Mobile COO Michael Melmed on stage at the Dark Star launch event, presenting in front of screens reading "Beyond 10 Years" and "DARK STAR"',
              caption:
                'COO Michael Melmed opening the launch with the leadership presentation. Beyond 10 Years. Dark Star.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-event-02-mic.jpg',
              alt: 'US Mobile CEO Ahmed Khattak speaking with a microphone in front of a Dark Star screen at the launch event, talking to the room',
              caption:
                'CEO Ahmed Khattak talking to the room. The leadership presentation in full flow.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-event-03-confetti.jpg',
              alt: 'Confetti raining down at the Dark Star launch event as the team raises their phones to mark the product going live',
              caption:
                'Confetti drop. Dark Star is live.',
            },
            {
              src: 'case-studies/us-mobile-darkstar-event-04-fleece.jpg',
              alt: 'The US Mobile team and attendees celebrating after Dark Star goes live',
              caption: 'Team celebration after the countdown.',
            },
          ]}
        />
      </div>

      {/* ─── [09] TAKEAWAY ───────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[09] · The takeaway</span>
          <h2 className="delta__section-title">Thesis proved.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            <strong>Hypothesis:</strong> with enough FOMO, US Mobile&rsquo;s
            core community would pay full price for a product that&rsquo;s
            always been free.
          </p>
          <p>
            <strong>Result:</strong> $32K made from a controlled test.
            Sold out in three hours.
          </p>
          <p>
            <strong>Prediction:</strong> <mark>six figures per future
            premium drop</mark> using the same mechanic, with the demand
            curve already mapped. Confirmed: fandom is purchasing power.
          </p>
          <p>
            <strong>Three key takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Don&rsquo;t cap for unexpected success</mark>.</strong>{' '}
            The 3-hour sell-out tells you the VIP bundle could have done
            3&ndash;4x more, well into 6 figures. Calls with the CEO, while
            a nice idea, were the scaling bottleneck. Build your ops for
            the upside, not the baseline.
          </p>
          <p>
            <strong>2. <mark>Your superfans are your top spenders</mark>.</strong>{' '}
            Your most engaged users will pay to be early, rare, and
            relevant. Selling 250 units of a
            $129 SIM kit that was previously free wasn&rsquo;t a fluke.
            It was hardcore fans of the brand wanting a piece of
            the moment.
          </p>
          <p>
            <strong>3. <mark>Gamify the portal to entry</mark>.</strong>{' '}
            When something is scarce, make the access just a little
            harder. The game to get your code, the email pre-launch,
            the countdown page, the scarcity reveal. Those drove the
            interest. The drop itself did the rest.
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
