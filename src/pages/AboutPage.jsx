import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { featuredSpeaking } from '../data/speaking.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import '../styles/shared.css'
import './AboutPage.css'

const CONTACT_URL = '/contact?intent=consulting'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// The `disciplines` list that used to live here was removed with the "Four
// disciplines, one engine" section on 22 Jul 2026 (see the note where that
// section was). The canonical version is the schematic on /fan-engine.

// Speaking teaser — 3 cards derived from src/data/speaking.js so the About
// page and /speaking never drift apart. YouTube maxres thumbnails act as
// the still; the whole card links to /speaking (not the individual clip)
// so the CTA to see the full reel stays clear.
const talks = featuredSpeaking

// Selected experience — where the fan-led growth work was actually done.
const experience = [
  { src: 'logos/blablacar-vert.png',        alt: 'BlaBlaCar', maxw: 108 },
  { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 108 },
  { src: 'logos/amazon-game-studios.png',   alt: 'Amazon Games', maxw: 96 },
  { src: 'logos/azarus-vert.png',           alt: 'Azarus / Animoca', maxw: 108 },
  { src: 'logos/us-mobile-mark.png',        alt: 'US Mobile', maxw: 108 },
]

export default function AboutPage() {
  // One clip playing at a time, mirroring SpeakingPage. Starting a second
  // clip unmounts the first iframe, so nothing keeps playing off-screen.
  const [playingId, setPlayingId] = useState(null)

  useDocumentMeta({
    title: 'About · Laura Cordrey · Fan-led growth for consumer brands',
    description:
      "I build fan-led growth: the Fan Engine that turns brand love into growth you can measure. Thirteen years across gaming, entertainment and live service.",
    canonical: pageUrl('about'),
    ogType: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          ...authorJsonLd(),
          mainEntityOfPage: pageUrl('about'),
          worksFor: {
            '@type': 'Organization',
            name: 'Laura Cordrey · Fan-Led Growth Consulting',
            url: pageUrl(''),
          },
          alumniOf: [
            { '@type': 'Organization', name: 'Ubisoft' },
            { '@type': 'Organization', name: 'BlaBlaCar' },
            { '@type': 'Organization', name: 'Amazon Games' },
            { '@type': 'Organization', name: 'Azarus' },
            { '@type': 'Organization', name: 'US Mobile' },
          ],
        },
        {
          '@type': 'AboutPage',
          '@id': pageUrl('about'),
          name: 'About Laura Cordrey',
          mainEntity: { '@type': 'Person', name: 'Laura Cordrey', url: pageUrl('') },
        },
      ],
    },
  })

  // Art plates animate via `.artplay` toggled on first view. Unobserve after
  // so the intro pass doesn't replay on scroll-back. Static under
  // prefers-reduced-motion (handled in AboutPage.css).
  useEffect(() => {
    const plates = document.querySelectorAll('.about-artplate')
    if (!plates.length) return
    if (!('IntersectionObserver' in window)) {
      plates.forEach((p) => p.classList.add('artplay'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('artplay')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.3 })
    plates.forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* Full-bleed since 22 Jul 2026, per Laura. The image is the ground, not
        * a column: it covers the whole header and a two-axis scrim carries the
        * copy on the left and the logo strip along the bottom.
        *
        * This suits the asset far better than the half-column it replaced. The
        * E3 still is 1024x683 landscape; cropping it into a tall 560x841 slot
        * threw away 55% of the frame and upscaled what was left. Full-bleed
        * uses the whole frame, and the scrim covers the softness that a 1.25x
        * upscale would otherwise show. */}
      <header className="about-hero">
        <div className="about-hero__media">
          <img
            src={BASE + 'portraits/laura-e3-stage.jpg'}
            alt="Laura Cordrey on stage at E3 2019, unveiling Ghost Recon Breakpoint's Delta Company"
            loading="eager"
          />
        </div>
        <div className="container">
          {/* The "About" eyebrow and its hairline came off on 22 Jul 2026.
            * It was the page's own nav label repeated back at a reader who had
            * just clicked "About" and could still see it underlined in the
            * header, so it carried no information and cost a row at the most
            * expensive point on the page.
            *
            * This is NOT the same element as the /services eyebrow, which
            * Laura flagged in the same breath: that one reads "Work with me",
            * which is editorial framing rather than the nav label ("Services"),
            * so it earns its row and stays. Same treatment, different job. */}
          <div className="about-hero__col">
            <h1 className="about-hero__title">
              Fan-led growth wasn&rsquo;t a job ten years ago.{' '}
              <mark>I made it one</mark>.
            </h1>
            <p className="about-intro__lede">
              I build <mark>the brand people fall for</mark>, and the Fan
              Engine<span className="tm">™</span> that turns that love into
              growth you can measure: higher retention, higher lifetime value,
              and the reach you&rsquo;d otherwise pay for.
            </p>
            <p className="about-intro__sub">
              I&rsquo;ve built it from nothing and at millions of users, over
              thirteen years in games, entertainment and live service, where
              fans are loudest and feedback is instant.
            </p>
          </div>

          {/* In-hero proof strip, matching the homepage logoband: same 48x1
            * gold rule, same .72rem/.2em label, and the same logo sizing
            * (36px cap, maxw x0.8, 0.72 opacity, 700px shelf). These were
            * running at maxw x1.0 with no height cap and a 920px shelf, which
            * is why they read bigger here than on the homepage. */}
          <div className="about-proof">
            <span className="about-proof__rule" aria-hidden="true" />
            <span className="about-proof__kick">
              Thirteen years building fan-led growth
            </span>
            <ul className="about-proof__logos" aria-label="Brands where Laura has run fan-led growth">
              {experience.map((l) => (
                <li key={l.alt} className="about-proof__cell">
                  <img
                    src={BASE + l.src}
                    alt={l.alt}
                    style={{ maxHeight: 36, maxWidth: Math.round(l.maxw * 0.8) }}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
            <p className="about-proof__note">
              Full history{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">on LinkedIn</a>
              , see the <Link to="/work">case studies</Link>.
            </p>
          </div>
        </div>
      </header>

      {/* The "The gap I'm building for" manifesto band was cut on 22 Jul 2026,
        * 981px of it. It made the same argument /fan-led-growth already makes
        * in its "What to do about it" section, down to the shape of the claim:
        * that no one team owns brand, product, community and growth, so the
        * work has no owner and reads as optional. Two pages were running the
        * same argument, and of the two, the one whose job IS the argument is
        * /fan-led-growth. That page is also the one with a real search job
        * ("what is fan-led growth" has no competing definition), so the
        * argument belongs where a stranger will land on it.
        *
        * Its one sharper line, "Paid is a discipline. Fandom isn't, yet.",
        * moved to /fan-led-growth rather than being lost. Its one genuinely
        * about-Laura claim, that she has built in all four disciplines, moved
        * down into "How I work now" on this page, which is the section about
        * her practice. Nothing was deleted outright. */}

      {/* ─── STORY 01 · STORYTELLING (bone) ───────────────────
        * On bone since 22 Jul 2026, per Laura. With the hero now a full-bleed
        * photograph on near-black and the community story on #2D2723, this
        * band sitting on the default dark made three dark grounds in a row
        * before the page offered any relief. Bone here puts the first
        * light/dark snap at the second section, and the sequence reads
        * black · bone · brown · oxblood · bone · dark · oxblood. */}
      <section className="about-band about-band--bone">
        <div className="container about-eng">
          <div className="about-eng__left">
            <span className="about-eng__kick">Storytelling &amp; world-building</span>
            <h2 className="about-eng__title">
              I build worlds people <mark>fall for</mark>.
            </h2>
          </div>
          <div className="about-eng__right">
            <p>
              Everything I build starts with story. I learned storytelling in
              marketing at <strong>BlaBlaCar</strong>, and world-building at{' '}
              <strong>Ubisoft</strong>: what makes people fall for a world and
              want to live in it, not just pass through a funnel. That&rsquo;s
              why I bring people in across brand, events and product, from
              naming and positioning to script-to-screen production and content
              across twenty-two markets.
            </p>
            <div className="about-pulls">
              <div className="about-pull">
                <b>3</b>
                <span>AAA worlds shaped: Assassin&rsquo;s Creed, Ghost Recon, Rainbow Six Siege</span>
              </div>
              <div className="about-pull">
                <b>22</b>
                <span>BlaBlaCar markets where I ran content and community</span>
              </div>
            </div>
          </div>
        </div>
        {/* The 21:9 art plate that closed this section was cut on 22 Jul
          * 2026, 507px of it. It sat BELOW the copy, so every pixel of it was
          * added to the page height, and its caption ("The worlds behind the
          * work · Ubisoft · BlaBlaCar · live service") restated the section
          * heading and the two proof numbers directly above it.
          *
          * The tower plate in the next section is deliberately kept. That one
          * sits BESIDE the copy in the 5fr/7fr split, so it costs nothing it
          * does not already occupy, and its caption carries proof that appears
          * nowhere else on the band (15M players, 85% positive). Additive
          * decoration goes; structural art stays. */}
      </section>

      {/* ─── STORY 02 · COMMUNITY — image LEFT, editorial RIGHT ──
        * Fix 4: true mirror. Watchtower plate anchors the LEFT (4:5),
        * editorial (kicker, red-marked title, prose, side-by-side pulls)
        * on the RIGHT. Breaks the three-in-a-row identical skeleton. */}
      <section className="about-band about-band--grey">
        <div className="container about-imgsplit">
          <figure className="about-artplate about-artplate--tower" aria-hidden="true">
            <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" className="about-artplate__svg">
              <defs>
                <radialGradient id="about-cgB" cx="50%" cy="50%" r="60%">
                  <stop offset="0" stopColor="rgba(212,200,150,.1)" />
                  <stop offset="1" stopColor="rgba(212,200,150,0)" />
                </radialGradient>
                <linearGradient id="about-wgB" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(212,200,150,.16)" />
                  <stop offset="1" stopColor="rgba(212,200,150,0)" />
                </linearGradient>
              </defs>
              <rect width="480" height="600" fill="#1B1512" />
              <rect width="480" height="600" fill="url(#about-cgB)" />
              <g className="a-rings" fill="none" stroke="rgba(212,200,150,.3)" strokeWidth="1">
                <circle cx="240" cy="310" r="62" />
                <circle cx="240" cy="310" r="112" />
                <circle cx="240" cy="310" r="162" />
                <circle cx="240" cy="310" r="212" />
              </g>
              <g stroke="rgba(212,200,150,.45)" strokeWidth="1">
                <line x1="452.0" y1="310.0" x2="440.0" y2="310.0" /><line x1="444.8" y1="364.9" x2="439.0" y2="363.3" />
                <line x1="423.6" y1="416.0" x2="418.4" y2="413.0" /><line x1="389.9" y1="459.9" x2="381.4" y2="451.4" />
                <line x1="346.0" y1="493.6" x2="343.0" y2="488.4" /><line x1="294.9" y1="514.8" x2="293.3" y2="509.0" />
                <line x1="240.0" y1="522.0" x2="240.0" y2="510.0" /><line x1="185.1" y1="514.8" x2="186.7" y2="509.0" />
                <line x1="134.0" y1="493.6" x2="137.0" y2="488.4" /><line x1="90.1" y1="459.9" x2="98.6" y2="451.4" />
                <line x1="56.4" y1="416.0" x2="61.6" y2="413.0" /><line x1="35.2" y1="364.9" x2="41.0" y2="363.3" />
                <line x1="28.0" y1="310.0" x2="40.0" y2="310.0" /><line x1="35.2" y1="255.1" x2="41.0" y2="256.7" />
                <line x1="56.4" y1="204.0" x2="61.6" y2="207.0" /><line x1="90.1" y1="160.1" x2="98.6" y2="168.6" />
                <line x1="134.0" y1="126.4" x2="137.0" y2="131.6" /><line x1="185.1" y1="105.2" x2="186.7" y2="111.0" />
                <line x1="240.0" y1="98.0" x2="240.0" y2="110.0" /><line x1="294.9" y1="105.2" x2="293.3" y2="111.0" />
                <line x1="346.0" y1="126.4" x2="343.0" y2="131.6" /><line x1="389.9" y1="160.1" x2="381.4" y2="168.6" />
                <line x1="423.6" y1="204.0" x2="418.4" y2="207.0" /><line x1="444.8" y1="255.1" x2="439.0" y2="256.7" />
              </g>
              <path d="M16,310 H464 M240,86 V534" stroke="rgba(212,200,150,.14)" strokeWidth="1" />
              <g className="a-node" fill="#D4C896">
                <circle cx="297.9" cy="312.2" r="1.2" opacity="0.52" /><circle cx="282.9" cy="299.0" r="2.1" opacity="0.59" />
                <circle cx="266.1" cy="247.8" r="3.0" opacity="0.65" /><circle cx="143.9" cy="158.3" r="2.1" opacity="0.65" />
                <circle cx="39.6" cy="331.4" r="2.8" opacity="0.86" /><circle cx="137.7" cy="398.3" r="2.3" opacity="0.87" />
                <circle cx="143.2" cy="327.4" r="1.9" opacity="0.36" /><circle cx="260.0" cy="481.5" r="1.6" opacity="0.44" />
                <circle cx="403.4" cy="228.0" r="2.9" opacity="0.32" /><circle cx="95.7" cy="252.7" r="1.1" opacity="0.82" />
                <circle cx="336.6" cy="278.1" r="2.0" opacity="0.51" /><circle cx="253.6" cy="417.4" r="2.6" opacity="0.55" />
                <circle cx="269.3" cy="287.5" r="2.1" opacity="0.42" /><circle cx="240.6" cy="178.5" r="1.3" opacity="0.53" />
                <circle cx="347.4" cy="326.3" r="1.9" opacity="0.34" /><circle cx="259.5" cy="298.5" r="1.3" opacity="0.83" />
                <circle cx="115.5" cy="191.8" r="2.6" opacity="0.60" /><circle cx="175.1" cy="349.6" r="1.1" opacity="0.59" />
                <circle cx="232.9" cy="335.7" r="2.2" opacity="0.82" /><circle cx="359.4" cy="456.9" r="2.4" opacity="0.57" />
                <circle cx="261.4" cy="403.2" r="1.7" opacity="0.86" /><circle cx="206.2" cy="274.9" r="1.1" opacity="0.69" />
                <circle cx="153.9" cy="263.5" r="1.4" opacity="0.31" /><circle cx="228.1" cy="139.9" r="1.6" opacity="0.50" />
                <circle cx="308.9" cy="474.1" r="1.5" opacity="0.76" /><circle cx="114.8" cy="321.7" r="1.3" opacity="0.64" />
                <circle cx="191.1" cy="329.2" r="1.9" opacity="0.71" /><circle cx="231.3" cy="388.5" r="1.6" opacity="0.55" />
                <circle cx="273.2" cy="289.4" r="2.0" opacity="0.46" /><circle cx="289.3" cy="369.1" r="1.7" opacity="0.51" />
                <circle cx="213.3" cy="228.6" r="1.7" opacity="0.84" /><circle cx="327.5" cy="230.8" r="2.5" opacity="0.55" />
                <circle cx="94.8" cy="256.6" r="1.4" opacity="0.69" /><circle cx="275.2" cy="221.6" r="2.6" opacity="0.46" />
                <circle cx="198.6" cy="440.7" r="1.5" opacity="0.31" /><circle cx="155.1" cy="302.3" r="1.3" opacity="0.37" />
                <circle cx="371.1" cy="333.4" r="1.4" opacity="0.86" /><circle cx="343.4" cy="237.1" r="2.1" opacity="0.76" />
                <circle cx="292.8" cy="283.5" r="1.1" opacity="0.87" /><circle cx="216.5" cy="316.8" r="1.0" opacity="0.89" />
                <circle cx="191.0" cy="285.8" r="2.0" opacity="0.86" /><circle cx="365.3" cy="348.5" r="1.8" opacity="0.51" />
                <circle cx="295.5" cy="471.2" r="2.9" opacity="0.39" /><circle cx="221.5" cy="292.9" r="1.4" opacity="0.82" />
                <circle cx="98.2" cy="167.2" r="2.0" opacity="0.76" /><circle cx="151.7" cy="261.3" r="2.1" opacity="0.85" />
              </g>
              <g className="a-sweep">
                <path d="M240,310 L452,310 A212,212 0 0 0 412.5,186.8 Z" fill="url(#about-wgB)" />
                <line x1="240" y1="310" x2="452" y2="310" stroke="rgba(212,200,150,.6)" strokeWidth="1.2" />
              </g>
              <g className="a-red" fill="#C8362B">
                <circle cx="330" cy="212" r="4.4" />
                <circle cx="352" cy="230" r="2.6" />
                <circle cx="314" cy="196" r="2.2" />
              </g>
              <circle cx="330" cy="212" r="14" fill="none" stroke="#C8362B" strokeWidth="1" className="a-blipring" />
              <circle cx="240" cy="310" r="3" fill="#D4C896" />
            </svg>
            <figcaption className="about-artplate__cap">
              <b>Community, read in real time</b>
              <span>Ubisoft · 15M players · 85% positive</span>
            </figcaption>
          </figure>
          <div className="about-imgsplit__content">
            <span className="about-eng__kick">Community building &amp; sentiment</span>
            <h2 className="about-eng__title">
              I catch a community <mark>before it turns</mark>.
            </h2>
            <p>
              Live games taught me that a 15-million-player community can turn
              in a day. I held mine at an average of 85% positive sentiment
              through launches, updates and rough patches, by reading the
              signals in real time and acting early.
            </p>
            <p>
              Steering a community&rsquo;s mood is a craft, and an
              early-warning system.{' '}
              <strong>
                It&rsquo;s the very thing AI products will need most, and
                I&rsquo;ve run it at the scale of a live game.
              </strong>
            </p>
            <div className="about-pulls">
              <div className="about-pull">
                <b>85%</b>
                <span>average positive sentiment, held through launches and rough patches</span>
              </div>
              <div className="about-pull">
                <b>15M</b>
                <span>players in the live-service community I steered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORY 03 · BIG MOMENTS (oxblood) ─────────────────── */}
      <section className="about-band about-band--ox">
        <div className="container about-eng">
          <div className="about-eng__left">
            <span className="about-eng__kick">Go big or go home</span>
            <h2 className="about-eng__title">
              Trusted with <mark className="about-eng__mark--cream">the big moment</mark>.
            </h2>
          </div>
          <div className="about-eng__right">
            <p>
              Hand me your biggest brand moment, the launch, the drop, the
              thing everyone will be watching, and I&rsquo;ll deliver it with a
              cool head. I unveiled my own fan program live on the E3 stage,
              with 10 million watching, and I&rsquo;ve run live game
              partnerships seen by 500,000 at once.{' '}
              <strong>Go big or go home.</strong>
            </p>
            <div className="about-pulls">
              <div className="about-pull">
                <b>10M</b>
                <span>watching my fan program unveiled live on the E3 stage</span>
              </div>
              <div className="about-pull">
                <b>500K</b>
                <span>reached at once on a single live game broadcast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW I WORK NOW ─────────────────────────────────────
        * On bone since 22 Jul 2026. It used to be a dark band with the bone
        * "Four disciplines" section under it; with that section cut, this and
        * the speaking teaser were two dark bands in a row. The teaser's card
        * captions are built for a dark ground, so this is the one that moves. */}
      <section className="about-band about-band--bone">
        <div className="container">
          <div className="section-head">
            <span className="marker">How I work now</span>
            <h2 className="section-head__title">Independent, senior, shipping.</h2>
          </div>
          <div className="about-magic">
            <p>
              I run my own practice end to end: strategy, positioning, brand,
              product, and the code to ship it. When a build calls for a
              specialist, I bring one in and direct the work. And I&rsquo;m
              building fan engagement, not just advising on it, in{' '}
              <mark>fractional leadership roles inside startups</mark>.
            </p>
            {/* Moved here from the manifesto band when that was cut on 22 Jul
              * 2026. It is the one claim in that section that was about Laura
              * rather than about the argument, and this is the section about
              * her practice. */}
            <p>
              Brand, product, community and growth: I&rsquo;ve built in all
              four, which is what lets me wire them into one engine and put a
              number on the whole thing.
            </p>
            <p className="about-magic__tail">
              Experience makes the work good. AI makes it fast.
            </p>
          </div>
        </div>
      </section>

      {/* The "Four disciplines, one engine" section was cut on 22 Jul 2026.
        * Brand / Product / Community / Growth with a note each is already the
        * schematic on /fan-engine and the spine of /services, so three pages
        * were teaching the same four words. Its claim ("I've built in all
        * four, which is what lets me wire them into one engine") survives as
        * the second paragraph of "How I work now" directly above. */}

      {/* ─── SPEAKING TEASER ──────────────────────────────────── */}
      <section className="about-band">
        <div className="container">
          <div className="section-head">
            <span className="marker">Keynote &amp; public speaking</span>
            <h2 className="section-head__title">
              On the <mark>big stages</mark>.
            </h2>
          </div>
          {/* These were <Link to="/speaking"> wrapping a thumbnail with a play
            * button on it. Laura, 22 Jul 2026: "you can't play the videos, it
            * takes you to the speaking page, that's not great." She is right,
            * and it is the hover-honesty rule in its strongest form: a play
            * button is not decoration, it is a promise about what a click
            * does. Clicking now plays, in place, exactly as /speaking does.
            *
            * Same one-at-a-time state as SpeakingPage: starting a clip stops
            * whichever was running. The route out to /speaking is still there
            * as the "More keynote speaking" link under the row, which is a
            * text link and so promises navigation rather than playback. */}
          <ul className="about-talks">
            {talks.map((t) => (
              <li key={t.youtube}>
                <div className="about-talk">
                  <div className="about-talk__thumb">
                    {playingId === t.youtube ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${t.youtube}?autoplay=1&rel=0&modestbranding=1${t.start ? `&start=${t.start}` : ''}`}
                        title={t.headline}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        className="about-talk__btn"
                        onClick={() => setPlayingId(t.youtube)}
                        aria-label={`Play: ${t.headline}`}
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${t.youtube}/maxresdefault.jpg`}
                          alt=""
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <span className="about-talk__play" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                  <span className="about-talk__cap">
                    <span className="about-talk__venue">{t.venue}</span>
                    <span className="about-talk__title">{t.headline}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="about-talks__foot">
            <Link to="/speaking" className="about-txtlink">
              More keynote speaking <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINALE (oxblood, centered) ───────────────────────── */}
      <section className="about-band about-band--ox about-close">
        <div className="about-halo about-halo--bl" aria-hidden="true" />
        {/* The two gold sparkles came off on 22 Jul 2026, finishing the job
          * started on /services the same day. They were only ever on these two
          * closes, so once /services dropped them this page was the last
          * holdout and they read as a leftover rather than a motif. Either
          * everywhere or nowhere; nowhere, because a two-page motif is not a
          * motif. The halo stays on both: it is a soft gradient wash, not a
          * mark. */}
        <div className="container about-close__inner">
          <span className="marker about-close__kick">Work with me</span>
          <h2 className="about-close__title">
            Want to build something fans can&rsquo;t stop talking about?
          </h2>
          <p className="about-close__line">
            If you have a fanbase, or the makings of one, there&rsquo;s
            measurable growth in it waiting to be built.
          </p>
          <div className="about-close__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg about-close__primary">
              Let’s talk</Link>
            <Link to="/work" className="about-txtlink about-txtlink--cream">
              See the case studies <span aria-hidden="true">→</span>
            </Link>
            <Link to="/speaking" className="about-txtlink about-txtlink--cream">
              Watch me speak <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
