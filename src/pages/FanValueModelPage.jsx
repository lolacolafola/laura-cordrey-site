import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import './FanValueModelPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

// Line-icon set matching the handoff: 24×24 viewBox, stroke=currentColor,
// round caps. Colored red via CSS on the parent.
const Sparkle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)
const Rocket = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)
const Chevron = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

// Chart. 24-month projection. Paid = linear, Fan = gentle exponential.
// Land the fan endpoint only ~20–25% above paid at month 24 — do not steepen.
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
  const W = 700, H = 270
  const pad = { l: 64, r: 46, t: 14, b: 28 }
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
        <line x1={pad.l} y1={gy} x2={W - pad.r} y2={gy} stroke="rgba(21,17,15,.08)" />
        <text x={pad.l - 8} y={gy + 4} textAnchor="end" fontSize="10.5" fill="#6B6157" fontFamily="Manrope">{fmtK(gv)}</text>
      </g>,
    )
  }

  const xTicks = [0, 12, 24].map((mm) => (
    <text
      key={`x${mm}`}
      x={X(mm)}
      y={H - 8}
      textAnchor={mm === 24 ? 'end' : mm === 0 ? 'start' : 'middle'}
      fontSize="10.5"
      fill="#6B6157"
      fontFamily="Manrope"
    >
      {mm === 0 ? 'now' : `month ${mm}`}
    </text>
  ))

  return (
    <svg viewBox="0 0 700 270" preserveAspectRatio="xMidYMid meet" className="fvm-chart__svg" role="img" aria-label="Paid only versus fan-led growth over 24 months">
      {gridlines}
      {xTicks}
      <path d={areaD} fill="#D4C896" opacity="0.28" />
      <path d={line(paid)} fill="none" stroke="#B8AE9C" strokeWidth="2.5" />
      <path d={line(fan)} fill="none" stroke="#C8362B" strokeWidth="3" strokeLinecap="round" />
      <circle cx={X(N)} cy={Y(fan[N])} r="4.5" fill="#C8362B" />
    </svg>
  )
}

export default function FanValueModelPage() {
  useDocumentMeta({
    title: 'What your fans are worth · Laura Cordrey',
    description:
      'A quick estimate of what fan-led growth is worth to your brand each year, built from published benchmarks. Conservative, and it shows its work.',
    canonical: pageUrl('/fan-led-growth-value-model'),
    ogType: 'website',
  })

  const [currency, setCurrency] = useState('$')
  const [bizType, setBizType] = useState('txn')
  const [rev, setRev] = useState(5000000)
  const [acq, setAcq] = useState(800000)
  const [r0, setR0] = useState(30)
  const [bring0, setBring0] = useState('') // blank allowed
  const [liftPts, setLiftPts] = useState(6)
  const [spendPct, setSpendPct] = useState(10)
  const [fanN, setFanN] = useState(14)
  const [assumOpen, setAssumOpen] = useState(false)
  const [arpu, setArpu] = useState('') // blank allowed
  const [cac, setCac] = useState('')   // blank allowed
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

    return {
      fmt, fmtK,
      revN, acqN, r0N, bring0N, bizSub,
      appliedLift, bringLift,
      stay, spend, saved, emv, total,
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

  return (
    <div className="fvm-page">
      <div className="fvm-card">
        {/* Top bar: brand eyebrow + currency picker */}
        <div className="fvm-topbar">
          <span className="fvm-eyebrow-brand">
            <Sparkle />
            <span>Fan-led growth</span>
          </span>
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

        {/* Hero */}
        <h1 className="fvm-h1">What your fans<br />are worth.</h1>
        <p className="fvm-hook">
          You know product-led growth. This is <mark>fan-led growth</mark>.
        </p>
        <p className="fvm-lede">
          Put in the numbers you already know. I project the three ways fans grow you:
          they stay, they spend more, and they bring the next wave, all from published
          benchmarks. Conservative, and it shows its work.
        </p>

        <hr className="fvm-rule" />

        {/* Inputs */}
        <div>
          <div className="fvm-eyebrow-section">Your numbers today</div>
          <div className="fvm-eyebrow-section__sub">Just what you already have to hand. I handle the rest.</div>

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
              From programs &amp; advocacy today
              <span className="fvm-row__sub">Optional: referrals, reviews, word of mouth you can already see. Leave blank if none.</span>
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
                aria-label="From programs and advocacy today"
              />
              <i className="fvm-row__pfx">%</i>
            </span>
          </div>
        </div>

        <hr className="fvm-rule" />

        {/* Result */}
        <div>
          <div className="fvm-eyebrow-engine">
            <Rocket />
            <span>The Fan Engine</span>
          </div>
          <div className="fvm-result__context">
            For a <b>{derived.fmt(derived.revN)}</b> brand, fan-led growth could be worth about
          </div>
          <div className="fvm-result__tag">Estimate · conservative benchmarks</div>
          <div className="fvm-bignum">
            <div className="fvm-bignum__halo" aria-hidden="true" />
            <div className="fvm-bignum__val">{derived.fmt(derived.total)}</div>
          </div>
          <div className="fvm-result__sub">
            a year, as your fans stay, spend more, and bring the next wave.
          </div>
          <div className="fvm-pills">
            <span className="fvm-pill">Stay</span>
            <span className="fvm-pill">Spend</span>
            <span className="fvm-pill">Bring</span>
          </div>

          <p className="fvm-breakdown">
            <b>Stay:</b> {derived.fmt(derived.stay)} kept from customers who buy again (a +{derived.appliedLift} point retention lift).<sup>1</sup>{' '}
            <b>Spend:</b> {derived.fmt(derived.spend)} from fans spending more, a blended +{spendPct}% across your repeat customers.<sup>2</sup>{' '}
            <b>Bring:</b> {derived.fmt(derived.saved)} in acquisition-equivalent value from programs and organic advocacy, the customers fans bring that you would otherwise pay to acquire ({derived.bringPhrase}).<sup>3</sup>
            {emvOn && (
              <>{' '}<b>Earned media:</b> {derived.fmt(derived.emv)} you did not buy.</>
            )}
          </p>
          <div className="fvm-breakdown__cap">
            Superscripts estimated from published benchmarks, shown in "How I worked this out" below.
          </div>
        </div>

        <hr className="fvm-rule fvm-rule--tight" />

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
            How I worked this out
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

              {/* Advanced sub-block */}
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

        {/* Chart */}
        <div className="fvm-chart">
          <div className="fvm-chart__eyebrow">Paid only vs fan-led</div>
          <div className="fvm-chart__title">Same spend. Different shape.</div>
          <div className="fvm-chart__desc">
            Paid grows in a straight line: each month you buy roughly the same customers.
            Fan-led curves upward, because the ones you keep bring the next, so it compounds.
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

        {/* CTA */}
        <div className="fvm-cta">
          <div className="fvm-cta__q">
            A ballpark to start. My full Fan Engine audit sizes it on your real numbers.
          </div>
          <a href={CALENDLY_URL} className="fvm-btn" target="_blank" rel="noopener noreferrer">
            Book a call <span className="fvm-btn__arrow" aria-hidden="true">→</span>
          </a>
          <p className="fvm-seclink">
            <Link to="/fan-led-growth-audit">Or see how fan-powered you are today →</Link>
          </p>
        </div>

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

        <div className="fvm-sig">Laura Cordrey · The Fan Engine</div>
      </div>
    </div>
  )
}
