import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Services v4 — a short "work with me" page, benchmarked against
 * April Dunford's consulting page: one paragraph per offer, one CTA
 * per offer, proof inside the offer, methodology detail on /methodology
 * not here. Copy source: content/copy/copy-services-v4.md. */

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Work with me · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'How to work with me: the Fan Engine (my flagship fan-led growth system), Sentiment SOS when your community turns, Fan Moments for launches and drops, and senior consulting. Start with a call or your free Fan Score.',
    canonical: pageUrl('services'),
    ogType: 'website',
    jsonLd: serviceJsonLd(),
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="services-hero">
        <div className="container services-hero__inner">
          <span className="marker">Work with me</span>
          <h1 className="services-hero__title">
            Four ways to grow with the{' '}
            <em className="accent">fans you already have</em>.
          </h1>
          <p className="services-hero__lede">
            Build the whole engine, or just the one part holding you back.
            Every way in ends in growth you can measure.
          </p>
          <div className="services-hero__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
            <Link to="/fan-led-growth-audit" className="btn btn--ghost btn--lg">
              Get your free Fan Score <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 01 · THE FAN ENGINE (flagship) ───────────────────── */}
      <section className="svc svc--flagship" id="fan-engine">
        <div className="container svc__inner">
          <span className="marker">01 · The flagship</span>
          <h2 className="svc__title">
            The Fan <em className="accent">Engine</em>.
          </h2>
          <p className="svc__body">
            Growth leaning on paid while your fans sit idle? A community
            everyone loves but nobody can put a number on? The Fan Engine
            connects brand, product, community and growth into{' '}
            <mark>one system, powered by your own fans</mark> and measured
            end to end.
          </p>
          <p className="svc__body">
            It starts with a diagnostic on your real data: your Fan Score,
            your Fan Value in your own numbers, and a prioritized plan built
            around your business, that you can run with or without me. Then
            we build what matters most.
          </p>
          <p className="svc__proof">
            The playbook behind <mark>60M+ UGC views at zero media spend</mark>{' '}
            at Ubisoft, and a <mark>$32K drop that sold out in under three
            hours</mark> at US Mobile.
          </p>
          <p className="svc__meta marker">
            Fixed-fee diagnostic first · then fixed-scope sprints, scoped to
            your brand · pricing on request
          </p>
          <div className="svc__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
              Book a call about the Engine <span aria-hidden="true">→</span>
            </a>
            <Link to="/methodology" className="svc__more">
              How the Engine works <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 02 · SENTIMENT SOS ───────────────────────────────── */}
      <section className="svc svc--alt" id="sentiment-sos">
        <div className="container svc__inner">
          <span className="marker">02 · When it can&rsquo;t wait</span>
          <h2 className="svc__title">
            Sentiment <em className="accent">SOS</em>.
          </h2>
          <p className="svc__body">
            Reviews turned? Community frustrated, every update landing worse
            than the last? I turn what your community is saying into{' '}
            <mark>one recovery roadmap</mark>: the product fixes and the
            communications that address what is actually driving it. Not a
            listening report. A plan your team can ship, built on the system
            I ran for a 15-million-player live-service community.
          </p>
          <p className="svc__meta marker">
            Moves: positive sentiment · review scores · churn · support load
          </p>
          <p className="svc__meta marker">
            Bounded and fast · project-priced · pricing on request
          </p>
          <div className="svc__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
              It&rsquo;s urgent. Book now <span aria-hidden="true">→</span>
            </a>
            <span className="svc__note">
              Skip the quiz. If your community is turning, we talk this week.
            </span>
          </div>
        </div>
      </section>

      {/* ─── 03 · FAN MOMENTS ─────────────────────────────────── */}
      <section className="svc" id="fan-moments">
        <div className="container svc__inner">
          <span className="marker">03 · The big swing</span>
          <h2 className="svc__title">
            Fan <em className="accent">Moments</em>.
          </h2>
          <p className="svc__body">
            A launch, a drop, a reveal on the calendar that has to land? I
            design the moment end to end and build the advocacy in, so it{' '}
            <mark>travels on your fans instead of your media budget</mark>,
            and leaves you with more fans than you started with. Measurement
            is wired in, so you know what the moment was worth.
          </p>
          <p className="svc__meta marker">
            Moves: launch revenue · sell-through · earned reach · new fans
          </p>
          <p className="svc__meta marker">
            Fixed-scope project, priced per moment · pricing on request
          </p>
          <div className="svc__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
              Talk about your moment <span aria-hidden="true">→</span>
            </a>
            <Link to="/work" className="svc__more">
              See moments I&rsquo;ve built <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 04 · CONSULTING ──────────────────────────────────── */}
      <section className="svc svc--alt" id="consulting">
        <div className="container svc__inner">
          <span className="marker">04 · Advisory</span>
          <h2 className="svc__title">
            <em className="accent">Consulting</em>.
          </h2>
          <p className="svc__body">
            Have the team to build, but want senior direction so they build
            the right things? I set the fan-led growth strategy, review the
            work in flight, and upskill your team to run it without me.{' '}
            <mark>Your team ships, measured against the numbers a board
            cares about</mark>.
          </p>
          <p className="svc__meta marker">
            Moves: LTV:CAC · cohort retention · % organic-sourced growth
          </p>
          <p className="svc__meta marker">
            Strategy sprint or ongoing advisory · pricing on request
          </p>
          <div className="svc__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
              Talk about consulting <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── NOT SURE + CLOSE ─────────────────────────────────── */}
      <section className="services-close">
        <div className="container services-close__inner">
          <p className="services-close__notsure">
            Not sure which fits? That is what the free{' '}
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer">intro call</a>{' '}
            is for. No pitch, a straight read.
          </p>
          <h2 className="services-close__title">
            What&rsquo;s your <em className="accent">fandom</em> worth?
          </h2>
          <p className="services-close__line">
            Take the two-minute Fan Score, or size the money with the Fan
            Value calculator. Then let&rsquo;s build the engine that
            captures it.
          </p>
          <div className="services-close__ctas">
            <Link to="/fan-led-growth-audit" className="btn btn--primary btn--lg">
              Get your free Fan Score <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-led-growth-value-model" className="btn btn--ghost btn--lg">
              Size your Fan Value <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
