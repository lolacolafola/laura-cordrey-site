import { Link } from 'react-router-dom'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { assetUrl, pageUrl, caseStudyJsonLd } from '../lib/seo.js'
import './HomePage.css' // .btn shared styles
import './DeltaCompanyPage.css' // shared case-study CSS (delta__ classes are generic)

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* BlaBlaCar · Live Nation — bespoke case study page.
 *
 * Structure: cover + 4-stat row + 7 numbered sections + CTA.
 *   [01] Where it started      UK launch, no brand recognition
 *   [02] The opportunity       Festivals as a trust-building channel
 *   [03] The deal              Official Ridesharing Partner of Live Nation
 *   [04] The activation        Branded parking, 20m² community tent, meetups
 *   [05] The CRM layer         Grassroots email — 35% open, 12% CTR
 *   [06] The outcome           Contributed to 0→1M UK members
 *   [07] The takeaway          Culture-normalising play, not a dashboard play
 *
 * Reuses the .delta__* class system from the Delta page.
 */
export default function BlaBlaCarLiveNationPage() {
  useDocumentMeta({
    title: 'BlaBlaCar × Live Nation · Live Nation’s first ever Official Ridesharing Partner · Fan-led growth on the ground · Case study by Laura Cordrey',
    description:
      'I made BlaBlaCar Live Nation’s first ever Official Ridesharing Partner — branded parking and a 20m² community tent at Latitude, Leeds and Reading. 50%+ of priority-parking users said they wouldn’t have rideshared without the partnership. Driving growth, one new fan at a time.',
    canonical: pageUrl('work/blablacar-live-nation'),
    ogImage: assetUrl('case-studies/blablacar-livenation-banner-yellow.png'),
    ogType: 'article',
    jsonLd: caseStudyJsonLd({
      slug: 'blablacar-live-nation',
      title: 'BlaBlaCar × Live Nation — fan-led growth, on the ground',
      description:
        'Live Nation’s first ever Official Ridesharing Partner. Festival activation at Latitude, Leeds and Reading drove a 50%+ behaviour change in rideshare uptake — the activation didn’t just put the brand in front of people, it changed how they behaved.',
      image: 'case-studies/blablacar-livenation-banner-yellow.png',
      datePublished: '2016-09-01',
      about: ['Fan-Led Growth', 'Brand Activation', 'Partnerships', 'BlaBlaCar', 'Live Nation', 'Festivals'],
      keywords: ['fan-led growth on the ground', 'brand activation', 'festival sponsorship', 'BlaBlaCar', 'Live Nation', 'partnerships'],
      principles: [
        'Sponsor trust, don’t buy it',
        'Solve the logistics, win the brand moment',
        'Build community on the ground',
      ],
      faqItems: [
        {
          question: 'How do you build brand trust for an unknown product in a new market?',
          answer:
            'Sponsor trust, don’t buy it. Becoming Live Nation’s first ever Official Ridesharing Partner transferred their brand authority to BlaBlaCar overnight — worth more than fighting to earn that trust through paid media equivalent spend.',
        },
        {
          question: 'How do you turn a sponsorship deal into measurable behaviour change?',
          answer:
            'Solve the logistics, win the brand moment. 300+ branded priority-parking spaces at Latitude, Leeds and Reading delivered a real festival-goer problem: getting in and out quickly. 50%+ of priority-parking users said they wouldn’t have rideshared without the partnership. The activation didn’t just put the brand in front of people — it changed how they behaved.',
        },
        {
          question: 'How do you build community for an online product?',
          answer:
            'On the ground. A 20m² BlaBla Tent at every festival, an on-site team, and grassroots community meetups made the brand tangible at the moment of need. Digital can’t replicate the human-to-human first impression earned in a high-energy environment like a festival.',
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
            <span className="marker">BlaBlaCar &middot; 2013–2016 &middot; United Kingdom</span>
          </div>
          <h1 className="delta__cover-title">
            <mark>BlaBlaCar × Live Nation</mark>: Official Ridesharing Partner.
          </h1>
          <p className="delta__cover-lede">
            How I ran BlaBlaCar UK&rsquo;s partnerships with Live Nation
            as their first Official Ridesharing Partner. Priority parking,
            on-site festival activation, bringing BlaBlaCar to festivals
            and helping people get home. Three times over, across three
            of the UK&rsquo;s biggest festivals:{' '}
            <strong>Latitude, Leeds and Reading</strong>.
          </p>
        </div>
      </header>

      {/* ─── HERO IMAGE ───────────────────────────────────────── */}
      {/* Brand-lockup hero: BlaBlaCar × Live Nation on BlaBlaCar brand blue.
          No --contain — the banner fills edge-to-edge as a full-bleed
          title card between the dark cover and the page body. */}
      <figure className="delta__hero">
        <img
          src={BASE + 'case-studies/blablacar-livenation-banner-yellow.png'}
          alt="BlaBlaCar × Live Nation brand lockup on yellow: navy BlaBlaCar logo above, red Live Nation wordmark below, separated by a navy X"
        />
      </figure>

      {/* ─── STATS (4 max — brand rule) ───────────────────────── */}
      <section className="container delta__stats">
        <ul>
          <li>
            <span className="delta__stat-value">1st</span>
            <span className="marker delta__stat-label">Official Ridesharing Partner of Live Nation, UK</span>
          </li>
          <li>
            <span className="delta__stat-value">2,200+</span>
            <span className="marker delta__stat-label">Rides offered via the partnership</span>
          </li>
          <li>
            <span className="delta__stat-value">50%+</span>
            <span className="marker delta__stat-label">Wouldn’t have rideshared without the partnership</span>
          </li>
          <li>
            <span className="delta__stat-value">20</span>
            <span className="marker delta__stat-label">Team members managed on-site</span>
          </li>
        </ul>
      </section>

      {/* ─── [01] WHERE IT STARTED ───────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[01] · Where it started</span>
          <h2 className="delta__section-title">Launching a new behaviour.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            BlaBlaCar had a working app for carpooling. What it needed
            in the UK was the cultural backdrop where ridesharing with
            strangers felt normal. The job was on the second half:{' '}
            <strong>making it feel like something people already did</strong>.
          </p>
          <p>
            Which meant going to the places where culture already lived.
          </p>
        </div>
      </section>

      {/* ─── [02] THE OPPORTUNITY ─────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[02] · The opportunity</span>
          <h2 className="delta__section-title">Festivals as a trust channel.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            UK festivals are a cultural mass-moment: tens of thousands of
            people, all making the same logistics problem (how do I get
            to the middle of a field with seven friends).
          </p>
          <p>
            The offer was practical. Carpool to the festival, and your
            parking was right at the entrance: no 30-minute trek across
            a muddy field with your tent and gear. Once you were in,
            branded goodies, a place to meet your fellow ridesharers,
            and help organising the ride home.{' '}
            <mark>Small wins, stacked.</mark>
          </p>
        </div>
      </section>

      {/* ─── BLABLA TENT PLATE (between [02] and [03]) ─────────── */}
      {/* The BlaBla Tent at Latitude — close-up of the branded
          inflatable dome that anchored the on-site presence. */}
      <figure className="delta__plate delta__plate--full">
        <img
          src={BASE + 'case-studies/blablacar-tent.png'}
          alt="The BlaBla Tent on-site at Latitude — branded inflatable dome with flags, deckchairs and the BlaBlaCar UK team"
        />
        <figcaption className="container">
          The BlaBla Tent at Latitude. Branded inflatable dome, flags,
          deckchairs, the lot.
        </figcaption>
      </figure>

      {/* ─── [03] THE DEAL ────────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[03] · The deal</span>
          <h2 className="delta__section-title">First-of-its-kind in the UK.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            BlaBlaCar became the{' '}
            <strong>UK&rsquo;s first Official Ridesharing Partner of Live
            Nation</strong>, unprecedented for a carpooling platform at
            the time. The partnership covered three of the biggest
            festivals on the calendar:{' '}
            <strong>Latitude, Leeds and Reading</strong>.
          </p>
          <p>
            What we got: presence on each festival&rsquo;s website,
            social cross-promotion, newsletter mentions, an exclusive
            priority-parking zone, and an on-site tent at each of
            Latitude, Leeds and Reading.{' '}
            <strong>Negotiated and delivered.</strong>
          </p>
          <p className="delta__scope-note" style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--ink-muted)' }}>
            My scope: end-to-end festival liaising with Live Nation, the
            priority-parking program, on-site tent activation design and
            preparation, on-site team management (20 people on the
            ground, with Reading and Leeds running concurrently under my
            supervision), the email and blog content, and post-festival
            reporting back to Live Nation. The paid-marketing layer sat
            with the team.
          </p>
        </div>
      </section>

      {/* ─── PARTNERSHIP RECEIPTS CAROUSEL ────────────────────── */}
      {/* Live Nation actually promoting BlaBlaCar on their own channels —
          proves the deliverables list in [03] wasn't just on paper. */}
      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/blablacar-tweet-reading.png',
              alt: 'Official @OfficialRandL (Reading & Leeds Fest) Twitter post promoting BlaBlaCar priority parking',
              caption:
                '@OfficialRandL: “Driving to Leeds Festival? Offer your ride on #BlaBlaCar and get FREE PRIORITY PARKING!”',
            },
            {
              src: 'case-studies/blablacar-tweet-latitude.png',
              alt: 'Official @LatitudeFest Twitter post promoting BlaBlaCar with the line: Driving to Latitude Festival? Offer your ride on #BlaBlaCar and get FREE PRIORITY PARKING!',
              caption:
                '@LatitudeFest ran the same playbook. Same offer, same free-priority-parking hook.',
            },
            {
              src: 'case-studies/blablacar-latitude-website.png',
              alt: 'BlaBlaCar listed on the official Latitude Festival website travel page, alongside Wellcome Trust and National Express',
              caption:
                'Featured on the official Latitude 2015 travel page, alongside Wellcome Trust and National Express.',
            },
          ]}
        />
      </div>

      {/* ─── [04] THE ACTIVATION ──────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[04] · The activation</span>
          <h2 className="delta__section-title">Branded parking, a tent, and people.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            <strong>Year one</strong>, I ran just <strong>Latitude</strong>:
            testing the model, capturing learnings, building the
            playbook. <strong>Year two</strong>, the remit expanded.{' '}
            <mark>Latitude, Leeds and Reading, all three under my
            supervision</mark>, with Leeds and Reading running
            concurrently on the same August bank-holiday weekend.
          </p>
          <p>
            I designed and ran the on-site presence end-to-end, managing
            a <strong>team of 20</strong> on the ground.
          </p>
          <p>
            <strong>300-space priority-parking zones at each festival</strong>{' '}
            (900+ branded spots across the summer), reserved for
            BlaBlaCar carpoolers, with branded signage directing cars in
            from the festival gates. <strong>BlaBla Tents</strong> as
            the on-site home for activations and meetups: a 10×10m
            footprint at Latitude, 5×5m at Leeds and Reading. Animated
            by massage therapists and facepainters on rolling shifts, a
            photobooth built into a functioning Mini (camera in the
            front, prints in the boot), and a low-tech offline
            ride-matching board that paired 150+ post-its for rides in
            and out.
          </p>
          <p>
            <strong>The room we were activating in:</strong> each
            festival drew <mark>45K–100K people</mark>. That was the
            cultural scale the partnership plugged us into.
          </p>
          <p>
            <strong>What we actually engaged, per festival:</strong>{' '}
            <strong>1,000+ tent visitors</strong> (by branded merch
            distributed), <strong>760+ people through priority parking</strong>,
            plus <strong>50+ on-site testimonials</strong> captured
            across the summer.
          </p>
          <p>
            <strong>Aggregate footprint across the season:</strong>{' '}
            <mark>2,200+ rides</mark> offered to and from the festivals
            via BlaBlaCar, <strong>530+ cars parked</strong> in our
            priority lots, and <strong>3,000+ branded backpacks</strong>{' '}
            in attendees&rsquo; hands.
          </p>
        </div>
      </section>

      {/* ─── CAUSATION CALLOUT (between [04] and [05]) ───────── */}
      <section className="delta__section container">
        <div
          className="delta__section-body delta__section-body--takeaway"
          style={{ gridColumn: '1 / -1', maxWidth: '72ch', margin: '0 auto' }}
        >
          <p>
            <span className="marker" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
              The behaviour change
            </span>
            From the post-festival member survey at Reading:{' '}
            <mark>50%+ of priority-parking users said they
            wouldn&rsquo;t have rideshared to the festival without
            the partnership.</mark> The activation didn&rsquo;t just
            put the brand in front of people. It changed how they behaved.
          </p>
        </div>
      </section>

      {/* ─── ACTIVATION CAROUSEL ──────────────────────────────── */}
      {/* On-the-ground craft + receipts of being there.
          Laura photos at positions 1, 5, 9 to avoid clustering. */}
      <div className="container delta__brand-carousel">
        <ArticleCarousel
          items={[
            {
              src: 'case-studies/laura-tent-team-police.jpg',
              alt: 'Laura with her on-site team in BlaBlaCar tees and the local UK police, in front of the BlaBla Tent at a UK festival, megaphone in hand',
              caption:
                'Running the team on the ground at Leeds. Police joined in for the fun.',
            },
            {
              src: 'case-studies/blablacar-ride-board.png',
              alt: 'The offline ride-matching board on-site at a festival, OFFERS column on the left, REQUESTS column on the right, BlaBlaCar-branded tape framing',
              caption:
                'The ride board. Low-tech, high-engagement. OFFERS / REQUESTS columns, paired in person.',
            },
            {
              src: 'case-studies/blablacar-ride-board-closeup.png',
              alt: 'Attendee at the ride-matching board using their phone, OFFER A RIDE sign visible',
              caption:
                'Members in the funnel. ~150 post-its across the three festivals. Real matches made in person.',
            },
            {
              src: 'case-studies/laura-latitude-map.jpg',
              alt: 'Selfie of Laura at Latitude Festival holding the official 2015 festival map on a clipboard',
              caption:
                'Day one, Latitude 2015. Festival map on the clipboard, ground ops mode on.',
            },
            {
              src: 'case-studies/blablacar-parking-pass.png',
              alt: 'A festival-goer in their car holding a BlaBlaCar priority parking pass and map',
              caption:
                'The pass in use. 305 priority-parking passes sent to UK members, for Latitude alone.',
            },
            {
              src: 'case-studies/blablacar-wristbands.png',
              alt: 'BlaBla branded wristbands being tied on festival attendees\' wrists',
              caption:
                'Brand-in-hand at Reading. 3,000+ branded backpacks, 400+ wristbands, hats. The brand walked the festival on its own.',
            },
            {
              src: 'case-studies/blablacar-photobooth-strip.png',
              alt: 'Output strip from the Reading Coco Mini Photo Booth, two photos of festival-goers in costumes inside a functioning Mini, with #BlaBlaCar branding and Reading 2015 footer',
              caption:
                'The Mini photobooth output. Festival-goers sat inside a functioning Mini; the camera in front took two photos that printed in the boot. Branded, shareable, theirs to keep.',
            },
            {
              src: 'case-studies/laura-tent-vibe.jpg',
              alt: 'Laura at the BlaBla Tent in a BlaBlaCar tee and flower crown, festival in full swing behind her',
              caption:
                'The other side of running the activation: actually being there, in it, with the members.',
            },
          ]}
        />
      </div>

      {/* ─── [05] THE OUTCOME ─────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[05] · The outcome</span>
          <h2 className="delta__section-title">Carpooling, made normal.</h2>
        </div>
        <div className="delta__section-body">
          <p>
            The Live Nation partnership wasn&rsquo;t the only thing that
            took BlaBlaCar from <mark>0 to 1M UK members</mark>, but it
            was the moment carpooling started to feel culturally normal
            here. The festival presence stopped strangers thinking{' '}
            <em>&ldquo;is this safe?&rdquo;</em> and started them
            thinking <em>&ldquo;how do I get a lift to next year&rsquo;s
            Reading?&rdquo;</em>
          </p>
        </div>
      </section>

      {/* ─── [06] THE TAKEAWAY ────────────────────────────────── */}
      <section className="delta__section container">
        <div className="delta__section-head">
          <span className="marker">[06] · The takeaway</span>
          <h2 className="delta__section-title">Driving culture through community work.</h2>
        </div>
        <div className="delta__section-body delta__section-body--takeaway">
          <p>
            The festivals chapter of BlaBlaCar&rsquo;s UK story: brand
            awareness and community building, on the ground. A
            partnership with Live Nation, priority parking at the gates,
            three festivals, and the results to support it:{' '}
            <mark>50%+ of priority-parking users said they wouldn&rsquo;t
            have rideshared without the partnership.</mark> Driving
            growth, one new fan at a time.
          </p>
          <p>
            <strong>Three key takeaways:</strong>
          </p>
          <p>
            <strong>1. <mark>Sponsor trust, don&rsquo;t buy it</mark>.</strong>{' '}
            Live Nation&rsquo;s brand authority transferred to BlaBlaCar
            through the partnership. That&rsquo;s worth more than
            fighting to earn that trust through paid media.
          </p>
          <p>
            <strong>2. <mark>Solve the logistics, win the brand
            moment</mark>.</strong> Festival-goers had a real travel
            problem. BlaBlaCar became the answer, embedded in the
            cultural moment they were already invested in.
          </p>
          <p>
            <strong>3. <mark>Build community on the ground</mark>.</strong>{' '}
            Branded parking, the BlaBla Tent, the team. The brand became
            tangible at the moment of need, and a place of rest in a
            high-energy environment. Festival-goers left with a positive first
            impression of BlaBlaCar. Human to human. Digital can&rsquo;t
            replicate that.
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
