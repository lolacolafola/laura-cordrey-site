import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { featuredSpeaking } from '../data/speaking.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import '../styles/shared.css'
import './AboutPage.css'

const CONTACT_URL = '/contact?intent=consulting'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// Four disciplines, run as one Fan Engine — Measurement is the spine, not
// a 5th pillar. Icons per the 6 Jul design handoff: sparkle / repeat /
// user-plus / megaphone, mapped to Brand / Product / Community / Growth.
const disciplines = [
  {
    key: 'brand',
    title: 'Brand',
    note: 'Build the story that turns customers into fans.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
      </svg>
    ),
  },
  {
    key: 'product',
    title: 'Product',
    note: 'Design the wow moments that bring fans back.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    key: 'community',
    title: 'Community',
    note: 'Build a space where fans belong.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    key: 'growth',
    title: 'Growth',
    note: "Earn the reach you'd otherwise pay for.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
]

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
  useDocumentMeta({
    title: 'About · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      "I build fan-led growth for fan-driven brands: the brand they fall for, and the Fan Engine that turns that love into growth you can measure. Thirteen years across gaming, entertainment and live service.",
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
      <header className="about-hero">
        {/* Fix 3: soft red halo behind the portrait column. One restrained
          * focal device so the top of the page isn't dead-flat. */}
        <span className="about-hero__halo" aria-hidden="true" />
        <div className="container">
          <div className="about-hero__top">
            <span className="marker">About</span>
          </div>
          <div className="about-hero__grid">
            <div className="about-hero__col">
              <h1 className="about-hero__title">
                Fan-led growth wasn&rsquo;t a job ten years ago.{' '}
                <mark>I made it one</mark>.
              </h1>
              <p className="about-intro__lede">
                I build fan-led growth for fan-driven brands:{' '}
                <mark>the brand they fall for</mark>, and the Fan Engine that
                turns that love into growth you can measure.
              </p>
            </div>
            <figure className="about-hero__portrait">
              <img
                src={BASE + 'portraits/laura-ubi-xp-2019-v2.jpeg'}
                alt="Laura Cordrey speaking on stage at Ubisoft XP 2019"
                loading="eager"
              />
            </figure>
          </div>
          <div className="about-intro">
            <p className="about-intro__sub">
              Lower acquisition cost, higher retention, the reach you&rsquo;d
              otherwise pay for. I&rsquo;ve built from nothing and I&rsquo;ve
              built from millions: thirteen years of it, most of it in gaming,
              entertainment and live service, where fans are loudest and
              feedback lands in real time.
            </p>
          </div>

          {/* In-hero proof strip — clients sit alongside the promise, not
              buried at the bottom of the page. Mirrors the homepage pattern. */}
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
                    style={{ maxWidth: l.maxw }}
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

      {/* ─── THE GAP · manifesto opener (bone) ─────────────────
        * Fix 1: flipped from --deep to --bone. First dark/light snap
        * now arrives at §2, not §5, so the top half stops reading as
        * three quiet dark blocks in a row. */}
      <section className="about-band about-band--bone about-manifesto">
        <div className="container about-manifesto__inner">
          <span className="marker about-manifesto__kick">The gap I&rsquo;m building for</span>
          <h2 className="about-manifesto__title">
            Paid is a discipline. <mark>Fandom isn&rsquo;t</mark>, yet.
          </h2>
          <div className="about-manifesto__body">
            <p>
              Paid acquisition got the budgets, the teams, the dashboards. The
              other half of growth, keeping the fans you have and turning them
              into the ones who bring the next wave, got none of that.{' '}
              <strong>So it looks optional. It isn&rsquo;t. It just never had
              an owner.</strong>
            </p>
            <p>
              That&rsquo;s what I build: fan-led growth as a structured engine,
              measured in your numbers.{' '}
              <strong>Your fans do the selling. I can prove the return.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY 01 · STORYTELLING ──────────────────────────── */}
      <section className="about-band">
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
              want to live in it, not just pass through a funnel.
            </p>
            <p>
              That&rsquo;s why I bring people in across brand, events and
              product: naming and positioning, script-to-screen production,
              content across BlaBlaCar&rsquo;s twenty-two markets. The story
              underneath is what makes it hold.
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
        {/* §3 art plate — 21:9 cinematic close, full container width.
          * Animates via .artplay class added by IntersectionObserver on first
          * view (see useEffect at page root). Static under reduced-motion. */}
        <div className="container about-artplate-wrap">
          <figure className="about-artplate about-artplate--wide" aria-hidden="true">
              <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" className="about-artplate__svg">
                <defs>
                  <linearGradient id="about-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2A1912" />
                    <stop offset=".5" stopColor="#1A1310" />
                    <stop offset="1" stopColor="#100C0A" />
                  </linearGradient>
                  <radialGradient id="about-pg" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="rgba(200,54,43,.5)" />
                    <stop offset="1" stopColor="rgba(200,54,43,0)" />
                  </radialGradient>
                  <radialGradient id="about-planet" cx="38%" cy="32%" r="75%">
                    <stop offset="0" stopColor="#E8534A" />
                    <stop offset=".55" stopColor="#C8362B" />
                    <stop offset="1" stopColor="#741D14" />
                  </radialGradient>
                </defs>
                <rect width="840" height="360" fill="url(#about-sky)" />
                <g className="a-stars" fill="#D4C896">
                  <circle cx="0" cy="97" r="1.4" opacity="0.43" /><circle cx="316" cy="36" r="1.7" opacity="0.61" />
                  <circle cx="446" cy="48" r="0.6" opacity="0.82" /><circle cx="756" cy="84" r="0.8" opacity="0.42" />
                  <circle cx="158" cy="60" r="0.6" opacity="0.82" /><circle cx="449" cy="156" r="1.4" opacity="0.30" />
                  <circle cx="453" cy="24" r="1.5" opacity="0.58" /><circle cx="396" cy="83" r="0.8" opacity="0.26" />
                  <circle cx="19" cy="184" r="1.6" opacity="0.80" /><circle cx="479" cy="142" r="1.2" opacity="0.49" />
                  <circle cx="316" cy="49" r="0.9" opacity="0.70" /><circle cx="306" cy="10" r="1.1" opacity="0.36" />
                  <circle cx="381" cy="61" r="0.7" opacity="0.30" /><circle cx="829" cy="101" r="0.6" opacity="0.95" />
                  <circle cx="364" cy="130" r="0.7" opacity="0.63" /><circle cx="836" cy="35" r="1.3" opacity="0.53" />
                  <circle cx="369" cy="138" r="0.7" opacity="0.82" /><circle cx="677" cy="18" r="0.5" opacity="0.34" />
                  <circle cx="535" cy="70" r="0.8" opacity="0.60" /><circle cx="438" cy="19" r="1.7" opacity="0.49" />
                  <circle cx="645" cy="49" r="1.3" opacity="0.89" /><circle cx="392" cy="82" r="1.6" opacity="0.58" />
                  <circle cx="821" cy="59" r="1.5" opacity="0.86" /><circle cx="624" cy="103" r="1.5" opacity="0.62" />
                  <circle cx="258" cy="64" r="0.9" opacity="0.56" /><circle cx="476" cy="121" r="0.6" opacity="0.59" />
                  <circle cx="383" cy="2" r="1.3" opacity="0.52" /><circle cx="375" cy="173" r="0.7" opacity="0.55" />
                  <circle cx="246" cy="76" r="0.8" opacity="0.51" /><circle cx="597" cy="173" r="0.5" opacity="0.58" />
                  <circle cx="690" cy="99" r="0.7" opacity="0.53" /><circle cx="108" cy="150" r="1.0" opacity="0.30" />
                  <circle cx="502" cy="62" r="0.8" opacity="0.52" /><circle cx="264" cy="114" r="0.7" opacity="0.45" />
                  <circle cx="831" cy="36" r="1.3" opacity="0.61" /><circle cx="659" cy="24" r="0.9" opacity="0.41" />
                  <circle cx="251" cy="31" r="1.6" opacity="0.76" /><circle cx="495" cy="96" r="1.1" opacity="0.51" />
                  <circle cx="246" cy="72" r="1.0" opacity="0.55" /><circle cx="270" cy="65" r="0.6" opacity="0.76" />
                  <circle cx="344" cy="2" r="0.9" opacity="0.63" /><circle cx="161" cy="161" r="1.6" opacity="0.93" />
                  <circle cx="667" cy="43" r="1.1" opacity="0.39" /><circle cx="732" cy="150" r="1.7" opacity="0.49" />
                  <circle cx="528" cy="125" r="1.6" opacity="0.34" /><circle cx="571" cy="184" r="1.7" opacity="0.34" />
                  <circle cx="310" cy="7" r="1.2" opacity="0.37" /><circle cx="424" cy="29" r="1.5" opacity="0.43" />
                  <circle cx="182" cy="62" r="1.4" opacity="0.54" /><circle cx="804" cy="106" r="1.0" opacity="0.70" />
                  <circle cx="787" cy="91" r="1.1" opacity="0.31" /><circle cx="633" cy="28" r="1.2" opacity="0.67" />
                  <circle cx="289" cy="72" r="0.8" opacity="0.82" /><circle cx="405" cy="120" r="1.1" opacity="0.29" />
                  <circle cx="529" cy="125" r="0.7" opacity="0.81" /><circle cx="179" cy="9" r="1.1" opacity="0.77" />
                  <circle cx="810" cy="99" r="0.6" opacity="0.70" /><circle cx="320" cy="92" r="0.9" opacity="0.52" />
                  <circle cx="710" cy="157" r="1.6" opacity="0.64" /><circle cx="44" cy="136" r="0.8" opacity="0.68" />
                </g>
                <g className="a-shoot">
                  <line x1="380" y1="46" x2="434" y2="20" stroke="#EFE9DC" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="380" cy="46" r="1.7" fill="#EFE9DC" />
                </g>
                <g className="a-shoot2">
                  <line x1="200" y1="96" x2="248" y2="72" stroke="#D4C896" strokeWidth="1.2" strokeLinecap="round" opacity=".85" />
                  <circle cx="200" cy="96" r="1.4" fill="#D4C896" />
                </g>
                <circle cx="618" cy="126" r="195" fill="url(#about-pg)" />
                <g className="a-sun">
                  <ellipse cx="618" cy="126" rx="112" ry="27" fill="none" stroke="#D4C896" strokeWidth=".8" opacity=".28" transform="rotate(-14 618 126)" />
                  <circle cx="618" cy="126" r="58" fill="url(#about-planet)" />
                  <path d="M564,112 Q618,130 672,108" stroke="rgba(21,17,15,.28)" strokeWidth="5" fill="none" />
                  <path d="M567,140 Q618,155 670,136" stroke="rgba(21,17,15,.22)" strokeWidth="4" fill="none" />
                  <ellipse cx="618" cy="126" rx="94" ry="21" fill="none" stroke="#D4C896" strokeWidth="1.6" opacity=".55" transform="rotate(-14 618 126)" />
                </g>
                <path d="M0,236 Q120,200 240,226 T480,222 T700,240 T840,226 V360 H0 Z" fill="#3A2820" />
                <path d="M0,282 Q170,244 340,272 T680,270 T840,262 V360 H0 Z" fill="#271B16" />
                <path d="M0,322 Q200,296 420,314 T840,310 V360 H0 Z" fill="#171110" />
                <g className="a-contour" stroke="#D4C896" fill="none" strokeWidth="1" opacity=".5">
                  <path d="M470,262 Q560,246 660,258 T840,252" />
                  <path d="M490,276 Q580,262 680,272 T840,268" />
                  <path d="M510,292 Q600,280 700,288 T840,284" />
                  <path d="M470,306 Q590,296 720,304 T840,300" />
                  <ellipse cx="702" cy="250" rx="46" ry="9" />
                  <ellipse cx="702" cy="250" rx="28" ry="5.5" />
                  <ellipse cx="702" cy="250" rx="12" ry="2.6" />
                </g>
                <g className="a-contour" stroke="#D4C896" strokeWidth="1" opacity=".55">
                  <path d="M515,236 H525 M520,231 V241" />
                  <path d="M607,220 H617 M612,215 V225" />
                  <path d="M757,238 H767 M762,233 V243" />
                  <path d="M695,298 H705 M700,293 V303" />
                  <path d="M815,272 H825 M820,267 V277" />
                </g>
                <g className="a-fig">
                  <ellipse cx="301" cy="311" rx="20" ry="2.6" fill="rgba(0,0,0,.4)" />
                  <circle cx="301" cy="291" r="2.8" fill="#0B0807" />
                  <path d="M298,295 q3,-2 6,0 l1.4,16 h-8.8 z" fill="#0B0807" />
                  <path d="M304.6,293.5 q1.8,7 1.6,17" stroke="rgba(232,83,74,.85)" strokeWidth="1" fill="none" />
                </g>
                <g className="a-ember" fill="#D4C896">
                  <circle cx="180" cy="281" r="1.6" opacity="0.74" /><circle cx="315" cy="307" r="2.0" opacity="0.53" />
                  <circle cx="377" cy="307" r="0.8" opacity="0.32" /><circle cx="377" cy="286" r="1.3" opacity="0.57" />
                  <circle cx="456" cy="288" r="1.5" opacity="0.36" /><circle cx="503" cy="302" r="2.0" opacity="0.52" />
                  <circle cx="208" cy="279" r="2.0" opacity="0.78" /><circle cx="344" cy="272" r="2.0" opacity="0.70" />
                  <circle cx="331" cy="271" r="0.9" opacity="0.76" /><circle cx="440" cy="309" r="1.7" opacity="0.73" />
                  <circle cx="233" cy="281" r="0.9" opacity="0.45" /><circle cx="278" cy="279" r="1.7" opacity="0.66" />
                  <circle cx="274" cy="279" r="1.7" opacity="0.61" /><circle cx="382" cy="302" r="1.8" opacity="0.43" />
                </g>
              </svg>
              <figcaption className="about-artplate__cap">
                <b>The worlds behind the work</b>
                <span>Ubisoft · BlaBlaCar · live service</span>
              </figcaption>
            </figure>
          </div>
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
              in a day. I held it at an average of 85% positive sentiment
              through launches, updates and the rough patches, by reading the
              signals in real time and acting before it turned.
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
                <span>average positive sentiment held across launches and rough patches</span>
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
              thing everyone will be watching, and I&rsquo;ll deliver it with
              a cool head. I created my own fan program and unveiled it live
              on the E3 stage, with 10 million watching, and I&rsquo;ve run
              live game partnerships on a broadcast seen by 500,000 at once.{' '}
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

      {/* ─── HOW I WORK NOW ───────────────────────────────────── */}
      <section className="about-band">
        <div className="container">
          <div className="section-head">
            <span className="marker">How I work now</span>
            <h2 className="section-head__title">Independent, senior, shipping.</h2>
          </div>
          <div className="about-magic">
            <p>
              I run my own practice end to end: strategy, positioning, brand,
              product, and the code to ship it. When a build calls for a
              specialist, I bring one in and direct the work. And I&rsquo;m not
              just advising on fan engagement, I&rsquo;m building it, as{' '}
              <mark>Fractional Head of Brand &amp; Growth at Magic</mark>, a
              fan engagement platform.
            </p>
            <p className="about-magic__tail">
              Experience makes the work good. AI makes it fast.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOUR DISCIPLINES (bone) ──────────────────────────── */}
      <section className="about-band about-band--bone">
        <div className="container">
          <div className="section-head">
            <span className="marker">Four disciplines, one engine</span>
            <h2 className="section-head__title">
              I don&rsquo;t own one topic. <mark>I own four.</mark>
            </h2>
          </div>
          <ol className="about-disc" aria-label="The four disciplines">
            {disciplines.map((d) => (
              <li className="about-disc__item" key={d.key}>
                <span className="about-disc__icon">{d.icon}</span>
                <h3 className="about-disc__title">{d.title}</h3>
                <p className="about-disc__note">{d.note}</p>
              </li>
            ))}
          </ol>
          <p className="about-disc__close">
            I&rsquo;ve built in all four.{' '}
            <strong>
              That&rsquo;s what lets me wire them into one engine and put a
              number on the whole thing.
            </strong>
          </p>
        </div>
      </section>

      {/* ─── SPEAKING TEASER ──────────────────────────────────── */}
      <section className="about-band">
        <div className="container">
          <div className="section-head">
            <span className="marker">Keynote &amp; public speaking</span>
            <h2 className="section-head__title">
              On the <mark>big stages</mark>.
            </h2>
          </div>
          <ul className="about-talks">
            {talks.map((t) => (
              <li key={t.youtube}>
                <Link to="/speaking" className="about-talk">
                  <div className="about-talk__thumb">
                    <img
                      src={`https://i.ytimg.com/vi/${t.youtube}/maxresdefault.jpg`}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="about-talk__play" aria-hidden="true" />
                  </div>
                  <span className="about-talk__cap">
                    <span className="about-talk__venue">{t.venue}</span>
                    <span className="about-talk__title">{t.headline}</span>
                  </span>
                </Link>
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
        <div className="about-sparkles about-sparkles--gold" aria-hidden="true">
          <span className="about-sparkle">✦</span>
          <span className="about-sparkle">✦</span>
        </div>
        <div className="container about-close__inner">
          <span className="marker about-close__kick">Let&rsquo;s talk</span>
          <h2 className="about-close__title">
            Want to build something fans can&rsquo;t stop talking about?
          </h2>
          <p className="about-close__line">
            If you have a fanbase, or the makings of one, there&rsquo;s
            measurable growth in it waiting to be built.
          </p>
          <div className="about-close__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg about-close__primary">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
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
