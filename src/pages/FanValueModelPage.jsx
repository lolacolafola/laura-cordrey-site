import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import ResultContactForm from '../components/ResultContactForm.jsx'
import AnimatedNumber from '../components/AnimatedNumber.jsx'
import './FanValueModelPage.css'

const FANSCORE_URL = '/fan-score'

const Sparkle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)
const Chevron = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
)
const Arrow = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

// Chart. 24-month projection. Paid = linear, Fan = gentle exponential.
// Dark palette to sit inside the reveal band.
function Chart({ rev, uplift, fmtK }) {
  const N = 24
  const paidAnnual = 0.06
  const fanAnnual = paidAnnual + uplift
  const R = Math.max(rev, 1)
  const paid = []
  const fan = []
  for (let m = 0; m <= N; m++) {
    paid.push(R * (1 + paidAnnual * (m / 12)))
    fan.push(R * Math.pow(1 + fanAnnual, m / 12))
  }
  const W = 700, H = 280
  const pad = { l: 64, r: 46, t: 14, b: 34 }
  const all = fan.concat(paid)
  const max = Math.max(...all) * 1.06
  const min = Math.min(...all) * 0.94
  const X = (i) => pad.l + (W - pad.l - pad.r) * (i / N)
  const Y = (v) => H - pad.b - (H - pad.t - pad.b) * ((v - min) / (max - min))
  const line = (a) => a.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ')
  const areaD =
    line(fan) +
    ' L' + X(N).toFixed(1) + ' ' + Y(paid[N]).toFixed(1) + ' ' +
    paid.slice().reverse().map((v, i) => 'L' + X(N - i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ') +
    ' Z'

  const gridlines = []
  for (let t = 0; t <= 3; t++) {
    const gv = min + (max - min) * (t / 3)
    const gy = Y(gv)
    gridlines.push(
      <g key={`g${t}`}>
        <line x1={pad.l} y1={gy} x2={W - pad.r} y2={gy} stroke="rgba(239,233,220,.10)" />
        <text x={pad.l - 8} y={gy + 4} textAnchor="end" fontSize="10.5" fill="#8A8078" fontFamily="Manrope">{fmtK(gv)}</text>
      </g>,
    )
  }

  const xTicks = [0, 12, 24].map((mm) => (
    <text
      key={`x${mm}`}
      x={X(mm)}
      y={H - 10}
      textAnchor={mm === 24 ? 'end' : mm === 0 ? 'start' : 'middle'}
      fontSize="10.5"
      fill="#8A8078"
      fontFamily="Manrope"
    >
      {mm === 0 ? 'now' : `month ${mm}`}
    </text>
  ))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="fvm-chart__svg" role="img" aria-label="Paid only versus fan-led growth over 24 months">
      {gridlines}
      {xTicks}
      <path d={areaD} fill="rgba(224,87,75,.14)" />
      <path d={line(paid)} fill="none" stroke="#B8AE9C" strokeWidth="2.5" />
      <path d={line(fan)} fill="none" stroke="#E0574B" strokeWidth="3" strokeLinecap="round" />
      <circle cx={X(N)} cy={Y(fan[N])} r="4.5" fill="#E0574B" />
      <circle cx={X(N)} cy={Y(paid[N])} r="4" fill="#B8AE9C" />
    </svg>
  )
}

// Verdict copy keyed to Fan Score buckets (audit tiers: Untapped / Earned / Compounding).
function readinessVerdict(score) {
  if (score >= 70) return { lead: 'Mostly.', body: 'You capture most of it already. The gain left is in making it compound.', tone: 'oxblood' }
  if (score >= 40) return { lead: 'In part.', body: 'You capture some of it already, but a good share is still on the table.', tone: 'gold' }
  return { lead: 'Not yet.', body: 'You are not set up to capture it, so most of it stays on the table.', tone: 'red' }
}

export default function FanValueModelPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const rawScore = params.get('score')
  const parsedScore = rawScore != null ? Math.max(0, Math.min(100, parseInt(rawScore, 10))) : null
  const arrivedFromAudit = Number.isFinite(parsedScore)
  const auditScore = arrivedFromAudit ? parsedScore : null

  useDocumentMeta({
    title: 'Fan Value Model™ · What your fans are worth · Laura Cordrey',
    description:
      'A conservative estimate of what your customers are worth once they become fans, built from published benchmarks. It shows its work.',
    canonical: pageUrl('/fan-value'),
    ogType: 'website',
  })

  const [currency, setCurrency] = useState('$')
  const [bizType, setBizType] = useState('txn')
  const [rev, setRev] = useState(5000000)
  const [acq, setAcq] = useState(800000)
  const [r0, setR0] = useState(30)
  const [bring0, setBring0] = useState('')
  const [liftPts, setLiftPts] = useState(6)
  const [spendPct, setSpendPct] = useState(10)
  const [fanN, setFanN] = useState(14)
  // Open by default: the sliders are the proof this is a model and not a
  // marketing quiz, so they are the thing to lead with, not a footnote to open.
  const [assumOpen, setAssumOpen] = useState(true)
  const [arpu, setArpu] = useState('')
  const [cac, setCac] = useState('')
  const [emvOn, setEmvOn] = useState(false)
  const [views, setViews] = useState(10000000)
  const [cpm, setCpm] = useState(10)

  const digits = (v) => ('' + v).replace(/[^0-9]/g, '')

  const setBizTxn = () => { setBizType('txn'); setR0(30) }
  const setBizSub = () => { setBizType('sub'); setR0(80) }

  const derived = useMemo(() => {
    const fmt = (n) => currency + Math.round(n).toLocaleString()
    const fmtK = (n) => {
      n = Math.round(n)
      const a = Math.abs(n)
      if (a >= 1e6) return currency + (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
      if (a >= 1e3) return currency + Math.round(n / 1e3) + 'K'
      return currency + n
    }

    const revN = +rev || 0
    const acqN = +acq || 0
    const r0N = +r0 || 0
    const bring0N = bring0 === '' ? 0 : (+bring0 || 0)
    const bizSub = bizType === 'sub'
    const ceiling = bizSub ? 95 : 65

    const appliedLift = Math.min(liftPts, Math.max(0, ceiling - r0N))
    const bringLift = Math.min(fanN, Math.max(0, 100 - bring0N))

    const stay = revN * (appliedLift / 100)
    const spend = revN * (r0N / 100) * (spendPct / 100)
    const saved = acqN * (bringLift / 100)
    const emv = emvOn ? ((+views || 0) / 1000) * (+cpm || 0) : 0
    const total = stay + spend + saved + emv

    const arpuN = +arpu || 0
    const cacN = +cac || 0
    const showLtv = arpuN > 0 && cacN > 0
    let ra0Str = '', raNStr = '', ltv0Str = '', ltvNStr = '', cac0Str = '', cacNStr = ''
    if (showLtv) {
      const life = 1 / (1 - Math.min(r0N / 100, 0.95))
      const newR = Math.min(0.95, (r0N + appliedLift) / 100)
      const newLife = 1 / (1 - newR)
      const ltv0 = arpuN * life
      const ltvN = arpuN * (1 + spendPct / 100) * newLife
      const newCac = cacN * (1 - bringLift / 100)
      const ra0 = ltv0 / cacN
      const raN = ltvN / (newCac || 1)
      ra0Str = ra0.toFixed(1) + ':1'
      raNStr = raN.toFixed(1) + ':1'
      ltv0Str = fmt(ltv0)
      ltvNStr = fmt(ltvN)
      cac0Str = fmt(cacN)
      cacNStr = fmt(newCac)
    }

    const uplift = total / Math.max(revN, 1)
    const fanEnd = revN * Math.pow(1 + 0.06 + uplift, 2)
    const paidEnd = revN * (1 + 0.06 * 2)

    // NEW: split value into "new revenue" (stay + spend, added to top line) vs
    // "ad budget saved" (bring + emv, value you would otherwise have paid for).
    const newRevenue = stay + spend
    const adSaved = saved + emv
    const monthly = total / 12
    const pct = (part) => (total > 0 ? (part / total) * 100 : 0)

    return {
      fmt, fmtK,
      revN, acqN, r0N, bring0N, bizSub,
      appliedLift, bringLift,
      stay, spend, saved, emv, total,
      newRevenue, adSaved, monthly,
      stayPct: pct(stay),
      spendPct: pct(spend),
      bringPct: pct(saved + emv),
      showLtv, ra0Str, raNStr, ltv0Str, ltvNStr, cac0Str, cacNStr,
      uplift, fanEnd, paidEnd,
      bringPhrase:
        bring0N > 0
          ? `a +${bringLift}% lift, on top of the ${bring0N}% you already get`
          : `a +${bringLift}% lift`,
    }
  }, [currency, bizType, rev, acq, r0, bring0, liftPts, spendPct, fanN, emvOn, views, cpm, arpu, cac])

  const retLabel = derived.bizSub ? 'Annual retention rate' : 'Repeat purchase rate'
  const retSup = derived.bizSub
    ? 'The share of customers you keep each year.'
    : 'The share of your customers who buy again.'

  const verdict = arrivedFromAudit ? readinessVerdict(auditScore) : null

  return (
    <div className="fvm-page">
      <div className="fvm-card">
        {/* From-audit path shows a chip; cold arrival shows a full-width bar in
            the same slot prompting the visitor to take the quiz first. */}
        {arrivedFromAudit ? (
          <div className="fvm-arrival" role="note">
            <Arrow />
            <span>From your Fan Score<span className="tm">™</span> · <b>{auditScore}%</b></span>
          </div>
        ) : (
          <div className="fvm-coldbar">
            <span className="fvm-coldbar__txt">Fan Score<span className="tm">™</span>: how fan-led is your growth?</span>
            <Link className="fvm-coldbar__link" to={FANSCORE_URL}>
              Take the quiz <span className="fvm-btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <div className="fvm-topbar">
          <span className="fvm-eyebrow-brand">
            <Sparkle />
            <span>The Fan Value Model<span className="tm">™</span></span>
          </span>
        </div>

        {/* "What is the fan gap worth to you?" went 23 Jul 2026. "The fan gap"
            appeared exactly once on the whole site, here, in the largest type on
            the page, and was never defined anywhere. This wording matches the
            cross-link from the Fan Score, the page title, and the homepage
            promise, so the same tool is now described the same way everywhere. */}
        <h1 className="fvm-h1">What are your<br />fans worth?</h1>
        <p className="fvm-hook">
          The growth is already in your <mark>userbase</mark>. Here&rsquo;s what it&rsquo;s worth.
        </p>
        <p className="fvm-lede">
          Put in a few numbers you already have, and I&rsquo;ll show you what your fans
          are worth: what you gain when they stay, spend more, and bring you new customers.
          The estimate is conservative, and every assumption behind it is yours to change.
        </p>

        <hr className="fvm-rule" />

        {/* Inputs */}
        <div>
          <div className="fvm-numhead">
            <div>
              <div className="fvm-eyebrow-section">Your numbers today</div>
              <div className="fvm-eyebrow-section__sub">Just what you already have to hand. I handle the rest.</div>
            </div>
            <label className="fvm-cur">
              Your currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="fvm-cur__select"
              >
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
              </select>
            </label>
          </div>

          <div className="fvm-biztoggle" role="tablist" aria-label="Business type">
            <button
              type="button"
              role="tab"
              aria-selected={!derived.bizSub}
              className={`fvm-biztoggle__btn${!derived.bizSub ? ' is-on' : ''}`}
              onClick={setBizTxn}
            >Transactional</button>
            <button
              type="button"
              role="tab"
              aria-selected={derived.bizSub}
              className={`fvm-biztoggle__btn${derived.bizSub ? ' is-on' : ''}`}
              onClick={setBizSub}
            >Subscription</button>
          </div>

          <div className="fvm-row">
            <label className="fvm-row__label">Annual revenue</label>
            <span className="fvm-row__val">
              <i className="fvm-row__pfx">{currency}</i>
              <input
                value={derived.revN ? derived.revN.toLocaleString() : ''}
                onChange={(e) => setRev(+digits(e.target.value) || 0)}
                inputMode="numeric"
                className="fvm-input fvm-input--money"
                aria-label="Annual revenue"
              />
            </span>
          </div>

          <div className="fvm-row">
            <label className="fvm-row__label">
              Annual acquisition spend
              <span className="fvm-row__sub">What you pay to win new customers.</span>
            </label>
            <span className="fvm-row__val">
              <i className="fvm-row__pfx">{currency}</i>
              <input
                value={derived.acqN ? derived.acqN.toLocaleString() : ''}
                onChange={(e) => setAcq(+digits(e.target.value) || 0)}
                inputMode="numeric"
                className="fvm-input fvm-input--money"
                aria-label="Annual acquisition spend"
              />
            </span>
          </div>

          <div className="fvm-row">
            <label className="fvm-row__label">
              {retLabel}
              <span className="fvm-row__sub">{retSup}</span>
            </label>
            <span className="fvm-row__val">
              <input
                type="number"
                value={r0}
                onChange={(e) => setR0(e.target.value === '' ? 0 : +e.target.value)}
                min="0"
                max="95"
                className="fvm-input fvm-input--pct"
                aria-label={retLabel}
              />
              <i className="fvm-row__pfx">%</i>
            </span>
          </div>

          <div className="fvm-row">
            <label className="fvm-row__label">
              Growth from referrals &amp; word of mouth
              <span className="fvm-row__sub">Optional. The share you already get from advocacy today. Leave blank if none.</span>
            </label>
            <span className="fvm-row__val">
              <input
                type="number"
                value={bring0}
                onChange={(e) => setBring0(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="fvm-input fvm-input--pct"
                aria-label="From referrals and word of mouth today"
              />
              <i className="fvm-row__pfx">%</i>
            </span>
          </div>
        </div>

        {/* ─── Dark reveal band (bleeds to card edges) ─────────── */}
        <div className="fvm-reveal">
          <div className="fvm-reveal__glow" aria-hidden="true" />
          <div className="fvm-reveal__inner">
            <div className="fvm-eyebrow-band">
              <Sparkle />
              <span>The opportunity, in money</span>
            </div>
            <div className="fvm-reveal__context">
              For a <b>{derived.fmtK(derived.revN)}</b> brand, fan-led growth could be worth about
            </div>
            <div className="fvm-reveal__tag">Estimate · conservative benchmarks</div>
            <div className="fvm-bignum">
              <div className="fvm-bignum__halo" aria-hidden="true" />
              <div className="fvm-bignum__val">
                <AnimatedNumber value={derived.total} format={derived.fmtK} />
                <span className="fvm-bignum__unit">/ yr</span>
              </div>
            </div>
            <p className="fvm-reveal__sub">
              a year, as your fans stay, spend more, and bring you new customers. Your revenue and spend, lifted by conservative benchmarks.
            </p>

            {/* Split: new revenue vs ad budget saved */}
            <div className="fvm-split">
              <div className="fvm-split__col">
                <div className="fvm-split__num">{derived.fmtK(derived.newRevenue)}</div>
                <div className="fvm-split__lbl">new revenue</div>
              </div>
              <div className="fvm-split__col fvm-split__col--r">
                <div className="fvm-split__num fvm-split__num--gold">{derived.fmtK(derived.adSaved)}</div>
                <div className="fvm-split__lbl fvm-split__lbl--muted">in ad budget saved</div>
              </div>
            </div>

            {/* Composition bar */}
            <div className="fvm-comp" aria-hidden="true">
              <div className="fvm-comp__seg fvm-comp__seg--stay" style={{ width: `${derived.stayPct}%` }} />
              <div className="fvm-comp__seg fvm-comp__seg--spend" style={{ width: `${derived.spendPct}%` }} />
              <div className="fvm-comp__gap" />
              <div className="fvm-comp__seg fvm-comp__seg--bring" style={{ width: `${derived.bringPct}%` }} />
            </div>
            <div className="fvm-comp__legend">
              <span className="fvm-comp__item">
                <i className="fvm-comp__dot fvm-comp__dot--stay" />
                <span className="fvm-comp__stack">
                  <b>Stay {derived.fmtK(derived.stay)}</b>
                  <em>they stay longer</em>
                </span>
              </span>
              <span className="fvm-comp__item">
                <i className="fvm-comp__dot fvm-comp__dot--spend" />
                <span className="fvm-comp__stack">
                  <b>Spend {derived.fmtK(derived.spend)}</b>
                  <em>they spend more</em>
                </span>
              </span>
              <span className="fvm-comp__item">
                <i className="fvm-comp__dot fvm-comp__dot--bring" />
                <span className="fvm-comp__stack">
                  <b className="fvm-comp__muted">Bring {derived.fmtK(derived.adSaved)}</b>
                  <em>they refer others</em>
                </span>
              </span>
            </div>
            <p className="fvm-comp__split">
              New revenue: Stay + Spend = <b>{derived.fmtK(derived.newRevenue)}</b>
              <span className="fvm-comp__splitdot" aria-hidden="true"> · </span>
              Ad budget saved: Bring = <b>{derived.fmtK(derived.saved)}</b>
              {emvOn && derived.emv > 0 && (
                <>
                  <span className="fvm-comp__splitdot" aria-hidden="true"> · </span>
                  Earned media: <b>{derived.fmtK(derived.emv)}</b>
                </>
              )}
            </p>
            <div className="fvm-comp__cap">
              New revenue is the cash your fans add by staying and spending more. Ad budget saved is what you don&rsquo;t spend when their referrals bring in customers you&rsquo;d otherwise pay to acquire.
            </div>

            {/* Chart on dark */}
            <div className="fvm-chart">
              <div className="fvm-chart__eyebrow">Paid only vs fan-led</div>
              <div className="fvm-chart__title">Same spend. Different shape.</div>
              <div className="fvm-chart__desc">
                Both lines start at your {derived.fmtK(derived.revN)}. Paid grows in a straight line: each month you buy roughly the same customers. Fan-led curves up, because the ones you keep bring the next, so it compounds.
              </div>
              <div className="fvm-chart__legend">
                <span><i className="fvm-swatch fvm-swatch--paid" />Paid only</span>
                <span><i className="fvm-swatch fvm-swatch--fan" />Fan-led</span>
              </div>
              <Chart rev={derived.revN} uplift={derived.uplift} fmtK={derived.fmtK} />
              <div className="fvm-chart__gap">
                By month 24, fan-led tracks to about <b>{derived.fmtK(derived.fanEnd)}</b> a year against{' '}
                <b>{derived.fmtK(derived.paidEnd)}</b> on paid alone. Illustrative.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom light section: pills, method, readiness, CTA */}
        <div className="fvm-pills">
          <span className="fvm-pill">≈ {derived.fmtK(derived.monthly)} / month</span>
          <span className="fvm-pill">Stay + Spend + Bring{emvOn ? ' + EMV' : ''}</span>
        </div>
        <p className="fvm-breakdown">
          Every lever is capped and conservative, with the benchmark behind each one alongside it.
        </p>

        {/* Assumptions accordion */}
        <div className="fvm-accord">
          <button
            type="button"
            onClick={() => setAssumOpen((v) => !v)}
            className="fvm-accord__toggle"
            aria-expanded={assumOpen}
          >
            <span className={`fvm-accord__chev${assumOpen ? ' is-open' : ''}`}>
              <Chevron />
            </span>
            Try your own assumptions
          </button>
          {assumOpen && (
            <div className="fvm-accord__body">
              <p className="fvm-accord__intro">
                Conservative defaults from published research. Drag if you know your own numbers.
              </p>

              <div className="fvm-slider">
                <label>Fans stay (retention lift)</label>
                <input type="range" min="0" max="15" value={liftPts} onChange={(e) => setLiftPts(+e.target.value)} />
                <b>+{liftPts} pts</b>
              </div>
              <div className="fvm-slider__note">
                Loyalty and retention programs lift repeat purchasing 30 to 60% (industry benchmarks).
              </div>

              <div className="fvm-slider">
                <label>Fans spend more (AOV)</label>
                <input type="range" min="0" max="40" value={spendPct} onChange={(e) => setSpendPct(+e.target.value)} />
                <b>+{spendPct}%</b>
              </div>
              <div className="fvm-slider__note">
                Gallup: fully engaged customers spend around 23% more. Applied as a lower blended lift across all repeat customers, since only some become fans.
              </div>

              <div className="fvm-slider">
                <label>Fans bring more</label>
                <input type="range" min="0" max="30" value={fanN} onChange={(e) => setFanN(+e.target.value)} />
                <b>+{fanN}%</b>
              </div>
              <div className="fvm-slider__note">
                Wharton: referral and ambassador programs reach 20 to 35%; Nielsen: word of mouth around 14%. AI-driven referral is emerging and not yet counted.
              </div>

              <div className="fvm-adv">
                <div className="fvm-adv__intro">
                  See it as LTV:CAC (optional). Add your unit economics and I show the ratio move, using your real numbers.
                </div>
                <div className="fvm-adv__row">
                  <label>Annual value per customer</label>
                  <span className="fvm-adv__val">
                    <i className="fvm-adv__pfx">{currency}</i>
                    <input
                      type="text" inputMode="numeric"
                      value={arpu === '' ? '' : (+arpu).toLocaleString()}
                      onChange={(e) => setArpu(digits(e.target.value))}
                      placeholder="e.g. 250" className="fvm-input fvm-input--adv"
                    />
                  </span>
                </div>
                <div className="fvm-adv__row">
                  <label>Cost to acquire one (CAC)</label>
                  <span className="fvm-adv__val">
                    <i className="fvm-adv__pfx">{currency}</i>
                    <input
                      type="text" inputMode="numeric"
                      value={cac === '' ? '' : (+cac).toLocaleString()}
                      onChange={(e) => setCac(digits(e.target.value))}
                      placeholder="e.g. 80" className="fvm-input fvm-input--adv"
                    />
                  </span>
                </div>
                {derived.showLtv && (
                  <div className="fvm-ltv">
                    <div className="fvm-ltv__title">Your unit economics</div>
                    <div className="fvm-ltv__sub">
                      What each customer is worth, and what it costs to win one, today and with fan-led growth.
                    </div>
                    <div className="fvm-ltv__grid">
                      <div />
                      <div className="fvm-ltv__col">Today</div>
                      <div className="fvm-ltv__col">Fan-led</div>

                      <div className="fvm-ltv__lbl">
                        LTV:CAC ratio
                        <span className="fvm-ltv__hint">higher is healthier</span>
                      </div>
                      <div className="fvm-ltv__now">{derived.ra0Str}</div>
                      <div className="fvm-ltv__new">{derived.raNStr}</div>

                      <div className="fvm-ltv__lbl">
                        Lifetime value
                        <span className="fvm-ltv__hint">revenue per customer</span>
                      </div>
                      <div className="fvm-ltv__now">{derived.ltv0Str}</div>
                      <div className="fvm-ltv__new">{derived.ltvNStr}</div>

                      <div className="fvm-ltv__lbl">
                        Blended CAC
                        <span className="fvm-ltv__hint">cost to win one</span>
                      </div>
                      <div className="fvm-ltv__now">{derived.cac0Str}</div>
                      <div className="fvm-ltv__new">{derived.cacNStr}</div>
                    </div>
                  </div>
                )}

                <label className="fvm-emv-check">
                  <input
                    type="checkbox"
                    checked={emvOn}
                    onChange={(e) => setEmvOn(e.target.checked)}
                  />{' '}
                  Add earned media (the reach your fans create)
                </label>
                {emvOn && (
                  <>
                    <div className="fvm-adv__row fvm-adv__row--top">
                      <label>Annual earned views</label>
                      <input
                        type="text" inputMode="numeric"
                        value={views ? views.toLocaleString() : ''}
                        onChange={(e) => setViews(+digits(e.target.value) || 0)}
                        className="fvm-input fvm-input--adv fvm-input--wide"
                      />
                    </div>
                    <div className="fvm-adv__row">
                      <label>
                        Your paid CPM
                        <span className="fvm-adv__sub">What 1,000 paid impressions cost you.</span>
                      </label>
                      <span className="fvm-adv__val">
                        <i className="fvm-adv__pfx">{currency}</i>
                        <input
                          type="text" inputMode="numeric"
                          value={cpm ? cpm.toLocaleString() : ''}
                          onChange={(e) => setCpm(+digits(e.target.value) || 0)}
                          className="fvm-input fvm-input--adv"
                        />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Readiness module: only fires on the from-audit path — cold arrival
            already got its "take the quiz" prompt at the top of the page. */}
        {arrivedFromAudit && (
          <div className={`fvm-ready fvm-ready--${verdict.tone}`}>
            <div className="fvm-ready__eyebrow">
              Can you capture that {derived.fmtK(derived.total)} today?
            </div>
            <div className="fvm-ready__row">
              <div className="fvm-ready__badge">
                <div className="fvm-ready__num">{auditScore}%</div>
                <div className="fvm-ready__lbl">Fan Score<span className="tm">™</span></div>
              </div>
              <p className="fvm-ready__verdict">
                <b>{verdict.lead}</b> {verdict.body}
              </p>
            </div>
          </div>
        )}

        {/* Final CTA. The form is this screen's primary action, so no filled
            button competes with it above — a number in pounds is the buying
            moment, and the reply should start here rather than a page away. */}
        <div className="fvm-cta">
          <p className="fvm-cta__eyebrow">The Fan Engine<span className="tm">™</span></p>
          <p className="fvm-cta__q">
            My flagship system is how you build the engine that captures this. Tell me your numbers and I&rsquo;ll baseline it on them.
          </p>
        </div>

        <ResultContactForm
          tool="fan-value"
          score={`${derived.fmtK(derived.total)} / yr`}
        />

        {/* Footnotes */}
        <p className="fvm-foot">
          <b>How this works.</b> Three levers, the ways fans grow you. <b>Stay</b> = revenue × the retention lift.<sup>1</sup>{' '}
          <b>Spend</b> = your repeat revenue × a blended spend lift, kept below the per-fan benchmark because only some customers become fans.<sup>2</sup>{' '}
          <b>Bring</b> = the acquisition cost you would otherwise pay for the extra customers fans bring, a blended-CAC improvement, not a cut to today's budget.<sup>3</sup>{' '}
          Earned media = views ÷ 1,000 × your CPM.{' '}
          <b>Unit economics</b> use a standard subscription shortcut: lifetime value = your value per customer ÷ (1 − retention), then lifted by the spend slider. Blended CAC = your cost to acquire × (1 − share fans bring). LTV:CAC is those two divided.<sup>4</sup>{' '}
          Each lever is an annual estimate against its own base, and they are added as directional figures rather than a compounded P&amp;L. Every lever is capped and conservative, and the exact figure is confirmed against your real numbers in a diagnostic. The chart is an illustrative 24-month projection.
          <br /><br />
          <span className="fvm-foot__cites">
            <sup>1</sup> Loyalty and retention programs lift repeat purchasing 30 to 60% (industry benchmarks). &nbsp;
            <sup>2</sup> Gallup: fully engaged customers spend around 23% more, applied here as a lower blended lift across all repeat customers. &nbsp;
            <sup>3</sup> Wharton: referral and ambassador programs reach 20 to 35%; Nielsen: word of mouth around 14%, valued at the acquisition cost you would otherwise pay. AI-driven referral is emerging and not yet counted. &nbsp;
            <sup>4</sup> Lifetime value uses the standard subscription shortcut, ARPU ÷ (1 − retention), applied across both business types as a directional simplification. Blended CAC treats fan-driven customers as zero cost; real-world program overhead nudges it slightly higher.
          </span>
        </p>

        <div className="fvm-sig">Laura Cordrey · The Fan Engine<span className="tm">™</span></div>
      </div>
    </div>
  )
}
