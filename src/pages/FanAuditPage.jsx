import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, SITE_URL } from '../lib/seo.js'
import QuizReveal from '../components/QuizReveal.jsx'
import ResultContactForm from '../components/ResultContactForm.jsx'
import useCardActions from '../hooks/useCardActions.js'
import './FanAuditPage.css'


// Inline sparkle used on every screen's eyebrow. Line-icon, 24×24 viewBox,
// stroke=currentColor so page CSS colors it (red on cream, gold on dark).
const Sparkle = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)

// ─── Live edition — 10 questions across Brand/Product/Community/Growth + gate ──
const LQ = [
  { d: 'Brand',     q: 'How much does your brand and positioning shape what you build?', a: [
    'Little. The roadmap is set by requests, competitors, and internal calls.',
    'Some. Brand guides our messaging, but product decisions are made separately.',
    'A lot. Our positioning sets the product priorities, and their order.',
  ]},
  { d: 'Brand',     q: 'Which is closest to your brand today?', a: [
    'A visual identity: name, logo, look.',
    'A defined positioning and voice, applied consistently.',
    'Real brand equity: a meaning customers identify with and choose you for.',
  ]},
  { d: 'Product',   q: 'After someone signs up, what gets them to their first win?', a: [
    "Basic setup and a welcome email, then they're mostly on their own.",
    'A standard onboarding flow everyone goes through.',
    'We drive them to a specific first "wow" moment.',
  ]},
  { d: 'Product',   q: "What's the main reason your users come back?", a: [
    'They need the product, so they return when they need it.',
    'We prompt them: emails, notifications, offers.',
    'The product has built-in reasons to return.',
  ]},
  { d: 'Community', q: 'What best describes your community?', a: [
    'Social channels and an audience, but no real community.',
    'We actively manage a community across our socials and a hosted space.',
    "We've identified our top cohort and engage with them directly to turn them into advocates.",
  ]},
  { d: 'Community', q: 'How do you gather and use what customers tell you?', a: [
    'Mainly when they complain or leave.',
    'We collect feedback (surveys, reviews, support) and read it.',
    'We gather it on a cadence, surveys, workshops, programs, sentiment, and it shapes what we build.',
  ]},
  { d: 'Growth',    q: 'If you paused paid acquisition for a quarter, what would happen?', a: [
    'New growth would mostly stop.',
    'It would drop a lot, but not to zero.',
    'It would continue from non-paid sources at a meaningful level.',
  ]},
  { d: 'Growth',    q: 'How much do customers promote you on their own?', a: [
    "Rarely, or not in a way we'd notice.",
    'Now and then, mostly our most enthusiastic customers.',
    'Regularly and unprompted: they bring people in, talk us up online (reviews, Reddit), and make content about us (UGC).',
  ]},
  { d: 'Growth',    q: "What's your referral program like?", a: [
    "We don't have one.",
    "It happens informally, but we don't track or reward it.",
    'A standing program we track and reward.',
  ]},
  { d: 'Gate',      q: 'If I asked you to put a number on any answer above, could you?', a: [
    'Not really. It would be a gut estimate.',
    'For some, not all.',
    "Yes, with baselines we'd stand behind.",
  ], gate: true },
]

// ─── Pre-launch edition — 5 checks with Fuel as the gate ──────────────────────
const C = [
  { key: 'Brand',     label: 'Something to be a fan of', q: 'Before the product exists, is there something people can be a fan of: a story, an identity, a point of view?', a: [
    'Not yet. We have a product idea, but nothing bigger to rally around.',
    'A clear positioning and voice, so people get what we stand for.',
    "A story people already repeat and identify with, before they've even used it.",
  ]},
  { key: 'Product',   label: 'A reason to stay, and early status', q: "Once someone's in, what brings them back, and what do they get for being early?", a: [
    "Not defined yet. We're hoping the product is sticky enough on its own.",
    'A first win and a reason to return are designed, on paper.',
    "The return loop is designed and being early earns real status or rewards, and we've tested people come back.",
  ]},
  { key: 'Community', label: 'A founding cohort, not a list', q: "Have you built a founding group of real people you're in relationship with, not just an email list?", a: [
    'No, or just an anonymous list of sign-ups.',
    'A space exists (a Discord, a group chat) with some early people in it.',
    'A named founding cohort we talk to directly, shaping it and ready to advocate at launch.',
  ]},
  { key: 'Growth',    label: 'Demand that recruits more demand', q: 'Is your early demand built to grow itself, with a reason for people to bring others?', a: [
    'No waitlist, or one with no reason for anyone to share it.',
    "A waitlist that's growing, but mostly from us pushing it.",
    'A waitlist that grows itself: referrals, queue-jumping, or founding perks that make people bring others.',
  ]},
  { key: 'Fuel',      label: 'Your route to first fans', gate: true,
    help: 'Your route can be an audience you already own (a following, list, or community), a channel that carries you (content, SEO, product virality), or someone who puts you in front of theirs (a creator, partner or press). Paid ads count too, but they stop when you stop paying.',
    q: 'When you launch, how will new people actually find you, and how ready is that route?', a: [
    "No real route yet. We'd lean on paid ads, or we're still figuring out how people find us.",
    "A route we're building or in talks on, but nothing proven or committed yet.",
    "A route that's ready and doesn't cost us for every new person: owned, working, or committed.",
  ]},
]

const LDISC = ['Brand', 'Product', 'Community', 'Growth']
const DISCIPLINES = ['Brand', 'Product', 'Community', 'Growth']
const PRIORITY = ['Fuel', 'Brand', 'Community', 'Product', 'Growth']
const LEVEL_WORD = ['Just a plan', 'Some proof', 'Locked in']

const TIER_COPY = {
  Untapped: 'Growth yet to come from fans.',
  Earned: "Growth you're earning.",
  Compounding: 'Growth that compounds.',
}
const R_HEAD = {
  Untapped: "There's a fan engine here you haven't built yet.",
  Earned: 'Your engine is turning. Make it compound.',
  Compounding: 'You own the engine. Widen the lead.',
}
const LEAK_COPY = {
  Brand: "Your brand isn't yet steering what you build, so there's room to give fans something to rally around.",
  Product: "The product doesn't yet earn its own return visits, so there's room to turn usage into loyalty.",
  Community: "People buy but don't yet feel part of anything, so there's room to turn customers into a community that brings others.",
  Growth: "The goodwill is there but untapped, so there's room to turn it into reach you don't pay for.",
}
const MOVE_COPY = {
  Brand: 'let your brand set the roadmap, not the other way round. When what you stand for decides what you build, fans have something to attach to.',
  Product: 'put one real reason to return inside the product itself, so it earns repeat use instead of buying it back with reminders.',
  Community: 'make listening to your community a standing habit, so you catch sentiment before it turns, not after.',
  Growth: 'make it easy and worth it for fans to bring others, so word of mouth becomes a channel you can count on.',
}

const REFRAME = {
  Brand: "There's no story for fans to rally around yet, just a product.",
  Product: 'You can get people in, but nothing yet makes them stay, or rewards them for being early.',
  Community: "You've got sign-ups, but no founding group who feel part of it.",
  Growth: "Demand isn't set up to recruit more demand, so every new fan is one you chase.",
  Fuel: "You're building the engine before securing what feeds it.",
}
const GATE_WHY = {
  Brand: "Fans attach to a meaning, not a feature list. Without one, there's nothing to be loyal to.",
  Product: "If the loop doesn't hold, every fan you bring in leaks straight back out.",
  Community: 'A list is contacts; a founding cohort is people who show up and bring others. Only one compounds.',
  Growth: "If your waitlist can't grow itself, you're back to paying for every new name.",
  Fuel: 'A fully built engine with no fuel is still empty. This is the one to solve first.',
}
const MOVE_PRE = {
  Brand: "give people something to belong to before launch: a point of view, a name, a world they'd want in on.",
  Product: "design one real reason to return, and make being early count, status or rewards latecomers can't get.",
  Community: "recruit a small founding cohort you're in real relationship with, and give them a role in shaping the launch.",
  Growth: 'give your early demand a built-in reason to share: move up the queue, unlock perks, earn founding status.',
  Fuel: 'lock one real route to your first fans, owned, proven, or committed, before you build further.',
}
const LABEL_OF = Object.fromEntries(C.map((c) => [c.key, c.label]))

function listAnd(a) {
  if (a.length === 1) return a[0]
  if (a.length === 2) return a[0] + ' and ' + a[1]
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]
}
const byPriority = (keys) => PRIORITY.filter((k) => keys.indexOf(k) >= 0)

export default function FanAuditPage() {
  useDocumentMeta({
    title: 'The Fan Score™ · Are your customers fans? · Laura Cordrey',
    description:
      'Find out how many of your customers would stay, spend more and recommend you, and the one move that would grow the number. Two minutes.',
    canonical: pageUrl('/fan-score'),
    ogType: 'website',
  })

  const [screen, setScreen] = useState('intro')

  useEffect(() => { window.scrollTo(0, 0) }, [screen])

  return (
    <div className="fa-page">
      <div className="fa-sheet">
        {screen === 'intro' && <IntroScreen onStart={() => setScreen('gate')} />}
        {screen === 'gate' && <GateScreen onLive={() => setScreen('liveQuiz')} onPre={() => setScreen('preIntro')} onBack={() => setScreen('intro')} />}
        {(screen === 'liveQuiz' || screen === 'liveReveal' || screen === 'liveResult') && (
          <LiveFlow screen={screen} setScreen={setScreen} />
        )}
        {(screen === 'preIntro' || screen === 'preQuiz' || screen === 'preReveal' || screen === 'preResult') && (
          <PreFlow screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  )
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <section className="fa-rel">
      <div className="fa-fig"><Sparkle /><span>The Fan Score<span className="tm">™</span></span></div>
      {/* Was "How fan-led is your growth?" over "Paid growth stops the moment
        * you stop paying. Fan-led growth keeps going." Changed 23 Jul 2026.
        * The old H1 asked the visitor to rate themselves on a category they
        * had not been introduced to, and on a scale only the quiz can supply,
        * so it asked the same question the tool answers and added nothing.
        * Before the CTA the screen never said "customer" once.
        *
        * The lede now previews the four dimensions the quiz actually covers
        * (Brand, Product, Community, Growth) so the H1 cannot promise
        * narrower than the tool delivers. The paid-growth line is not lost,
        * it belongs on the result screen where there is a number to act on. */}
      <h1 className="fa-h1">Are your customers fans, or just customers?</h1>
      <p className="fa-lede">Fans stay, spend more, and bring you new customers. This looks at what turns one into the other: your brand, your product, your community, and where your growth actually comes from.</p>
      <p className="fa-introget">A few honest questions. Two minutes to your result and the one move to grow it.</p>
      <button className="fa-btn" onClick={onStart}>Get my Fan Score<span className="tm">™</span></button>
      <p className="fa-introskip" style={{ margin: '14px 0 0', fontSize: '.95rem', opacity: 0.75 }}>
        Prefer to skip to the numbers?{' '}
        <Link to="/fan-value" style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Fan Value: what are your fans worth? <span aria-hidden="true">→</span>
        </Link>
      </p>
      <div className="fa-fold">
        <span className="fa-foldkick"><Sparkle />The person behind it</span>
        <p className="fa-foldbio">
          I spent thirteen years turning audiences into fans at Ubisoft, Amazon Games and BlaBlaCar, then as VP Marketing of a US startup acquired by Animoca. I built what I learned into the Fan Engine<span className="tm">™</span>, my framework for fan-led growth. This Fan Score is part of it.
        </p>
        <div className="fa-foldsign">Laura Cordrey · The Fan Engine<span className="tm">™</span></div>
      </div>
    </section>
  )
}

function GateScreen({ onLive, onPre, onBack }) {
  return (
    <section className="fa-rel">
      <div className="fa-qtag">First things first</div>
      <h2 className="fa-qtxt">Is your product live, with real users yet?</h2>
      <button className="fa-choice" onClick={onLive}>
        Yes, we're live
        <small>People are using it. You can answer questions about how they behave.</small>
      </button>
      <button className="fa-choice" onClick={onPre}>
        Not yet, we're pre-launch
        <small>Still building, or about to launch. We'll check if you're ready to build for fans instead.</small>
      </button>
      <button className="fa-back" onClick={onBack}>← Back</button>
    </section>
  )
}

// ─── Live edition — quiz, reveal, result ─────────────────────────────────────

function LiveFlow({ screen, setScreen }) {
  const [ans, setAns] = useState(() => new Array(LQ.length).fill(null))
  const [cur, setCur] = useState(0)

  const restart = () => setScreen('intro')

  const selectAnswer = (i) => {
    const next = ans.slice(); next[cur] = i; setAns(next)
    setTimeout(() => {
      if (cur < LQ.length - 1) setCur(cur + 1)
      else setScreen('liveReveal')
    }, 180)
  }

  const back = () => {
    if (cur > 0) setCur(cur - 1)
    else setScreen('gate')
  }

  const scored = useMemo(() => scoreLive(ans), [ans])

  if (screen === 'liveQuiz') {
    return <LiveQuiz cur={cur} ans={ans} onSelect={selectAnswer} onBack={back} />
  }
  if (screen === 'liveReveal') {
    return <QuizReveal onDone={() => setScreen('liveResult')} />
  }
  return <LiveResult scored={scored} restart={restart} />
}

function scoreLive(ans) {
  const filled = ans.every((v) => v !== null)
  if (!filled) return null
  let core = 0
  LQ.forEach((it, i) => { if (!it.gate) core += ans[i] + 1 })
  let owned = Math.round(((core - 9) / 18) * 100)
  if (owned < 0) owned = 0; if (owned > 100) owned = 100
  const rented = 100 - owned
  const tier = core <= 14 ? 'Untapped' : core <= 20 ? 'Earned' : 'Compounding'
  const gate = ans[9] + 1
  const paidAns = ans[6]

  const discAvg = (d) => {
    const v = []
    LQ.forEach((it, i) => { if (it.d === d && !it.gate) v.push(ans[i] + 1) })
    return v.reduce((a, b) => a + b, 0) / v.length
  }
  const levelWord = (avg) => avg < 1.67 ? 'Untapped' : avg < 2.34 ? 'Earned' : 'Compounding'
  const disciplines = LDISC.map((d) => {
    const avg = discAvg(d)
    return {
      key: d,
      avg,
      truePct: Math.round(((avg - 1) / 2) * 100),
      wpct: Math.max(Math.round(((avg - 1) / 2) * 100), 6),
      lc: avg < 1.67 ? 1 : avg < 2.34 ? 2 : 3,
      lw: levelWord(avg),
    }
  })
  const lowVal = Math.min(...disciplines.map((x) => x.avg))
  const tied = disciplines.filter((x) => Math.abs(x.avg - lowVal) < 0.001).map((x) => x.key)
  const startPillar = byPriority(tied)[0] || tied[0]

  // The strongest discipline, for the share card. Same tie-break as the weakest
  // so the two are chosen consistently. Presentation only — no scoring uses it.
  const highVal = Math.max(...disciplines.map((x) => x.avg))
  const topTied = disciplines.filter((x) => Math.abs(x.avg - highVal) < 0.001).map((x) => x.key)
  const topPillar = byPriority(topTied)[0] || topTied[0]

  const whyLine = paidAns === 0
    ? "You told us: pause paid, and your growth would mostly stop. That's the gap your fans can close."
    : paidAns === 1
    ? 'You told us: without paid, your growth would drop a lot. Your fans can carry more of it.'
    : 'You told us: your growth would mostly hold without paid. Rare. Now widen the lead.'

  return { core, owned, rented, tier, gate, disciplines, tied, startPillar, topPillar, whyLine, lowVal }
}

function LiveQuiz({ cur, ans, onSelect, onBack }) {
  const item = LQ[cur]
  const segs = ['Brand', 'Product', 'Community', 'Growth', 'Proof']
  const activeSeg = item.gate ? 'Proof' : item.d
  const ci = segs.indexOf(activeSeg)
  return (
    <section className="fa-rel">
      <div className="fa-stepper">
        {segs.map((s, i) => (
          <div key={s} className={`fa-seg${i < ci ? ' fa-seg--done' : i === ci ? ' fa-seg--active' : ''}`}>{s}</div>
        ))}
      </div>
      <div className="fa-pbar"><i style={{ width: (cur / LQ.length) * 100 + '%' }} /></div>
      <div className="fa-qnum">Question {cur + 1} of {LQ.length}</div>
      <h2 className="fa-qtxt">{item.q}</h2>
      <div>
        {item.a.map((txt, i) => (
          <button
            key={i}
            className={`fa-opt${ans[cur] === i ? ' fa-opt--sel' : ''}`}
            onClick={() => onSelect(i)}
          >{txt}</button>
        ))}
      </div>
      <button className="fa-back" onClick={onBack}>← Back</button>
    </section>
  )
}

function LiveResult({ scored, restart }) {
  const cardRef = useRef(null)
  const card = useCardActions(cardRef, 'fan-score.png')
  if (!scored) return null

  const { owned, rented, tier, gate, disciplines, tied, startPillar, topPillar, whyLine } = scored
  const tierSlug = tier.toLowerCase() // 'untapped' | 'earned' | 'compounding'

  // Page copy only. The card no longer carries the opportunity — see the note
  // beside fa-cleak below.
  const leakMain = tied.length === 1
    ? <><b>{tier === 'Compounding' ? 'Widen the lead' : 'Your biggest opportunity'}: {startPillar}.</b> {LEAK_COPY[startPillar]}</>
    : (() => {
        const pctMin = Math.round(((scored.lowVal - 1) / 2) * 100)
        return <><b>{listAnd(tied)} are level-pegging at {pctMin}% fan-led.</b> They build on each other, so start with the earliest: {startPillar}. {LEAK_COPY[startPillar]}</>
      })()

  const noteText = gate === 1
    ? "This is your read on your own business, so treat it as directional, not measured. You couldn't prove it either way yet, and that's the point: the full engagement baselines every line with real data. Benchmarks: top fans spend 66 to 80% more, stay 2 to 3 times longer, and refer around 4 times more (Bain, Nielsen, HBR, Wharton)."
    : 'A directional read from a self-assessment, not a measured figure. The full engagement baselines every line with real data. Benchmarks: top fans spend 66 to 80% more, stay 2 to 3 times longer, and refer around 4 times more (Bain, Nielsen, HBR, Wharton).'

  return (
    <section className={`fa-rel fa-result fa-result--${tierSlug}`}>
      {/* Dark reveal band (bleeds to sheet edges) */}
      <div className="fa-reveal">
        <div className="fa-reveal__glow" aria-hidden="true" />
        <div className="fa-reveal__inner">
          <div className="fa-fig fa-fig--band"><Sparkle />The Fan Score</div>
          <div className="fa-tier">Your result · {tier}</div>
          <div className="fa-numblock">
            <div className="fa-bignum__halo" aria-hidden="true" />
            <div className="fa-bignum">{owned}%</div>
            <div className="fa-numside">fan-led<br /><span>{rented}% still untapped</span></div>
          </div>
          <div className="fa-splitbar fa-splitbar--band">
            <i className="fa-splitbar__fan" style={{ width: owned + '%' }} />
          </div>
          <div className="fa-splitlegend fa-splitlegend--band">
            <span className="fa-splitlegend__fan">{owned}% fan-led</span>
            <span className="fa-splitlegend__rented">{rented}% untapped</span>
          </div>
          <h2 className="fa-rhead">{R_HEAD[tier]}</h2>
          <p className="fa-why">{whyLine}</p>
          {gate === 1 && <div><span className="fa-stamp fa-stamp--band">Unverified · self-assessed</span></div>}
          <TierStrip tier={tier} />
        </div>
      </div>

      {/* Light body: what's driving it, leak, move, CTA */}
      <div className="fa-sectlbl fa-sectlbl--drive">What's driving it</div>
      <p className="fa-hmdesc">Each discipline on the same scale. The tinted track is the room still to build; the fill is fan-led growth you already have.</p>
      <div className="fa-dcards">
        {disciplines.map((d) => (
          <div className="fa-dcard" key={d.key}>
            <div className="fa-dcard__top">
              <span className="fa-dcard__nm">{d.key}</span>
              <span className="fa-dcard__pc">{d.truePct}%</span>
            </div>
            <div className="fa-dcard__track">
              <i style={{ width: d.wpct + '%' }} />
            </div>
            <div className="fa-dcard__lvl">{d.lw}</div>
          </div>
        ))}
      </div>
      <div className="fa-leakbox">{leakMain}</div>

      <div className="fa-sectlbl fa-sectlbl--drive fa-sectlbl--spaced">Your move</div>
      <p className="fa-movebox"><b>Start here:</b> {MOVE_COPY[startPillar]}</p>

      {/* One primary per screen, and it is the money, not the call. A score is
          not yet a buying moment; a number in pounds is. This is the deliberate
          exception to the site rule that "Let's talk" is the only primary —
          the conversation is carried by the form below instead. */}
      <div className="fa-sectlbl fa-sectlbl--next">Where to next</div>
      <div className="fa-cta">
        <Link className="fa-btn" to={`/fan-value?score=${owned}`}>
          See what your fans are worth</Link>
      </div>
      <p className="fa-ctatail">
        Your percentage is the diagnosis. The number is what it’s costing you.
      </p>

      <div className="fa-cardwrap">
        <div className="fa-cardcap">Share your result</div>
        <div className={`fa-card fa-card--${tierSlug}`} ref={cardRef}>
          <div className="fa-card__glow" aria-hidden="true" />
          <div className="fa-ce"><Sparkle />The Fan Score</div>
          <div className="fa-ct">{tier} · {TIER_COPY[tier]}</div>
          <div className="fa-cbig">{owned}%</div>
          <div className="fa-csub">of my growth is fan-led</div>
          <div className="fa-cbars">
            {disciplines.map((d) => (
              <div className="fa-cbar" key={d.key}>
                <span className="fa-cl">{d.key}</span>
                <span className="fa-ctr"><span className="fa-cfl" style={{ width: d.wpct + '%' }} /></span>
                <span className="fa-cpct">{d.truePct}%</span>
              </div>
            ))}
          </div>
          {/* The card names the strongest discipline, not the weakest. This is
              the artefact that gets posted to a network including the
              visitor's employer and investors, and nobody broadcasts their
              soft spot. The opportunity and the starting point are on the
              page above, where they are read by the person who can act. */}
          <div className="fa-cleak">Strongest: <b>{topPillar}</b></div>
          <div className="fa-cfoot"><span>Check yours · {SITE_URL.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}</span><span>The Fan Engine™</span></div>
        </div>
        <div className="fa-cta">
          <button className="fa-btn fa-btn--ghost" onClick={card.share} disabled={card.busy}>
            {card.busy ? 'Preparing…' : 'Share my result'}</button>
          <button className="fa-btn fa-btn--ghost" onClick={card.download}>Download card as image</button>
          <button className="fa-back" onClick={restart}>Retake the Fan Score</button>
        </div>
        {(card.error || card.note) && (
          <div className="fa-fldnote" role="status">{card.error || card.note}</div>
        )}
      </div>

      <ResultContactForm
        tool="fan-score"
        score={`${owned}% fan-led · ${tier}`}
        onDownload={card.downloadCard}
      />

      <p className="fa-note">{noteText}</p>
      <div className="fa-sign">Laura Cordrey · The Fan Engine<span className="tm">™</span></div>
    </section>
  )
}

function TierStrip({ tier }) {
  const idx = { Untapped: 0, Earned: 1, Compounding: 2 }[tier]
  const stages = ['Untapped', 'Earned', 'Compounding']
  const captions = ['not built yet', 'it comes free', 'it multiplies']
  return (
    <div className="fa-ladder">
      {stages.map((label, i) => {
        const state = i < idx ? 'cleared' : i === idx ? 'here' : 'next'
        const cap = state === 'cleared' ? 'cleared' : state === 'here' ? "you're here" : captions[i]
        return (
          <div key={label} className="fa-ladder__row">
            <div className={`fa-ladder__step fa-ladder__step--${state}`}>
              <b>{label}</b>
              <span>{cap}</span>
            </div>
            {i < stages.length - 1 && <span className="fa-ladder__arr" aria-hidden="true">→</span>}
          </div>
        )
      })}
    </div>
  )
}

// ─── Pre-launch edition — intro, 5-check quiz, verdict result ────────────────

function PreFlow({ screen, setScreen }) {
  const [ans, setAns] = useState(() => new Array(C.length).fill(null))
  const [cur, setCur] = useState(0)

  const restart = () => setScreen('intro')

  const startQuiz = () => { setAns(new Array(C.length).fill(null)); setCur(0); setScreen('preQuiz') }

  const selectAnswer = (i) => {
    const next = ans.slice(); next[cur] = i; setAns(next)
    setTimeout(() => {
      if (cur < C.length - 1) setCur(cur + 1)
      else setScreen('preReveal')
    }, 180)
  }

  const back = () => {
    if (cur > 0) setCur(cur - 1)
    else setScreen('gate')
  }

  const scored = useMemo(() => scorePre(ans), [ans])

  if (screen === 'preIntro') {
    return (
      <section className="fa-rel">
        <div className="fa-fig"><Sparkle /><span>The Fan Score<span className="tm">™</span> · Pre-launch edition</span></div>
        <h1 className="fa-h1">You're pre-launch, so let's not fake a growth score.</h1>
        <p className="fa-lede">With no users yet, a "% fan-led" number would just be guessing. Instead, 5 quick questions on whether you're ready to build an engine fans will power, and whether you've got the fuel to feed it.</p>
        {/* Was "No numbers needed. A minute or two." True — nothing in either
            edition asks for a figure — but the lede directly above has already
            said a "% fan-led" number would be guessing, so the promise landed
            twice. "Nothing to prepare" answers the objection the lede leaves
            open: whether you need to go and dig anything out first. */}
        <p className="fa-introget">Nothing to prepare. A minute or two.</p>
        <hr className="fa-rule" />
        <div className="fa-actionrow">
          <button className="fa-btn" onClick={startQuiz}>Check my readiness</button>
          <button className="fa-back" onClick={() => setScreen('gate')}>← Back</button>
        </div>
      </section>
    )
  }
  if (screen === 'preQuiz') {
    const item = C[cur]
    return (
      <section className="fa-rel">
        <div className="fa-pbar"><i style={{ width: (cur / C.length) * 100 + '%' }} /></div>
        <div className="fa-qnum">Check {cur + 1} of {C.length}</div>
        <div className={`fa-qtag${item.gate ? ' fa-qtag--gate' : ''}`}>
          {item.gate ? 'The gate · ' + item.label : item.label}
        </div>
        <h2 className="fa-qtxt">{item.q}</h2>
        {item.help && <p className="fa-qhelp">{item.help}</p>}
        <div>
          {item.a.map((txt, i) => (
            <button
              key={i}
              className={`fa-opt${ans[cur] === i ? ' fa-opt--sel' : ''}`}
              onClick={() => selectAnswer(i)}
            >{txt}</button>
          ))}
        </div>
        <button className="fa-back" onClick={back}>← Back</button>
      </section>
    )
  }
  if (screen === 'preReveal') {
    return <QuizReveal onDone={() => setScreen('preResult')} />
  }
  return <PreResult scored={scored} restart={restart} />
}

function scorePre(ans) {
  const filled = ans.every((v) => v !== null)
  if (!filled) return null
  const lvls = {}
  C.forEach((c, i) => { lvls[c.key] = ans[i] + 1 })
  const discMin = Math.min(...DISCIPLINES.map((k) => lvls[k]))
  const fuelLv = lvls['Fuel']
  const effective = Math.min(fuelLv, discMin)
  const atMin = byPriority(Object.keys(lvls).filter((k) => lvls[k] === effective))
  const binding = atMin[0]
  const verdict = effective === 1 ? 'Not ready yet' : effective === 2 ? 'Nearly there' : 'Ready to build'
  return { lvls, discMin, fuelLv, effective, atMin, binding, verdict }
}

function PreResult({ scored, restart }) {
  const cardRef = useRef(null)
  const card = useCardActions(cardRef, 'fan-engine-readiness.png')
  if (!scored) return null
  const { lvls, fuelLv, effective, atMin, binding, verdict } = scored

  // Tier slugs share the LiveResult tier system:
  // effective 1 → red (untapped) · 2 → gold (earned) · 3 → oxblood (compounding)
  const tierSlug = effective === 1 ? 'untapped' : effective === 2 ? 'earned' : 'compounding'
  const cardTierSlug = tierSlug

  const reframeText = effective === 3
    ? "You've got something to feed the engine, and an engine worth feeding. Now build, in the order these checks point to."
    : REFRAME[binding]

  const stages = [
    ['Not ready yet', 'a gap to close'],
    ['Nearly there', 'almost there'],
    ['Ready to build', 'feed the engine'],
  ]

  const fuelSub = fuelLv === 3 ? 'ready to feed the engine' : fuelLv === 2 ? 'not locked yet' : 'no route yet'

  const gateBox = (() => {
    if (effective === 3) return <><b>Nothing's holding you back.</b> The engine's built and the fuel is lined up. Your job now is the build order, hardest-earned part first.</>
    if (atMin.length === 1) {
      return binding === 'Fuel'
        ? <><b>Fix this first: Fuel, your route to first fans.</b> {GATE_WHY.Fuel}</>
        : <><b>Fix this first: {LABEL_OF[binding]}.</b> {GATE_WHY[binding]} Everything else waits on this one.</>
    }
    const tiedLabels = atMin.map((k) => LABEL_OF[k])
    const areWord = atMin.length === 2 ? 'are both' : 'are all'
    const weakWord = effective === 1 ? 'still just a plan' : 'not locked in yet'
    return <><b>{listAnd(tiedLabels)} {areWord} {weakWord}.</b> They stack, so start with the one that gates the rest, <b>{LABEL_OF[binding]}</b>. {GATE_WHY[binding]}</>
  })()

  const otherOpen = byPriority(Object.keys(lvls).filter((k) => lvls[k] < 3 && atMin.indexOf(k) < 0))
  const lockedIn = byPriority(Object.keys(lvls).filter((k) => lvls[k] === 3))
  const alsoParts = []
  if (effective !== 3) {
    if (otherOpen.length) alsoParts.push(<span key="open">Also still open, once that’s moving: <b>{listAnd(otherOpen.map((k) => LABEL_OF[k]))}</b>. </span>)
    if (lockedIn.length) alsoParts.push(<span key="lock">Already locked in: {listAnd(lockedIn.map((k) => LABEL_OF[k]))}.</span>)
  }

  const moveText = effective === 3
    ? 'move into the build with a measurement baseline from day one, so the full Fan Score has real numbers the moment you launch.'
    : MOVE_PRE[binding]

  const cLeak = effective === 3
    ? <b>Ready to build</b>
    : <>Fix first: <b>{binding === 'Fuel' ? 'Fuel · route to fans' : LABEL_OF[binding]}</b></>

  const hereIdx = effective - 1

  return (
    <section className={`fa-rel fa-result fa-result--${tierSlug}`}>
      <div className="fa-reveal">
        <div className="fa-reveal__glow" aria-hidden="true" />
        <div className="fa-reveal__inner">
          <div className="fa-fig fa-fig--band"><Sparkle />The Fan Score · Pre-launch</div>
          <div className="fa-verdictlbl">Your verdict</div>
          <div className="fa-verdict">{verdict}.</div>
          <p className="fa-reframe">{reframeText}</p>
          <div><span className="fa-stamp fa-stamp--band">Directional read · self-assessed</span></div>

          <div className="fa-ladder">
            {stages.map(([label, cap], i) => {
              const state = i < hereIdx ? 'cleared' : i === hereIdx ? 'here' : 'next'
              const capText = state === 'cleared' ? 'cleared' : state === 'here' ? "you're here" : cap
              return (
                <div key={label} className="fa-ladder__row">
                  <div className={`fa-ladder__step fa-ladder__step--${state}`}>
                    <b>{label}</b>
                    <span>{capText}</span>
                  </div>
                  {i < stages.length - 1 && <span className="fa-ladder__arr" aria-hidden="true">→</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="fa-sectlbl fa-sectlbl--drive">Where you stand</div>

      <div className={`fa-gate-row fa-gate-row--lv${fuelLv}`}>
        <div className="fa-gate-row__lab">
          <em>The gate · fuel</em>
          <span>Your route to first fans</span>
        </div>
        <div className="fa-gate-row__lv">
          <span className={`fa-pill fa-pill--lv${fuelLv}`}>{LEVEL_WORD[fuelLv - 1]}</span>
          <em>{fuelSub}</em>
        </div>
      </div>

      <div className="fa-rcards">
        {DISCIPLINES.map((k) => {
          const lv = lvls[k]
          return (
            <div className="fa-rcard" key={k}>
              <div className="fa-rcard__top">
                <span className={`fa-rcard__dot fa-rcard__dot--lv${lv}`} />
                <span className="fa-rcard__nm">{LABEL_OF[k]}</span>
              </div>
              <div className="fa-rcard__pill">
                <span className={`fa-pill fa-pill--lv${lv}`}>{LEVEL_WORD[lv - 1]}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="fa-leakbox">{gateBox}</div>
      {alsoParts.length > 0 && <div className="fa-alsoline">{alsoParts}</div>}

      <div className="fa-sectlbl fa-sectlbl--drive fa-sectlbl--spaced">The one move</div>
      <p className="fa-movebox"><b>Start here:</b> {moveText}</p>

      {/* No Fan Value cross-sell here: pre-launch has no revenue to model. The
          form below is this screen's primary, so no filled button competes
          with it above. */}
      <p className="fa-ctatail fa-ctatail--lead">
        This is the pre-launch reality check. The full engagement begins the day you go live.
      </p>

      <div className="fa-cardwrap">
        <div className="fa-cardcap">Share your result</div>
        <div className={`fa-card fa-card--${cardTierSlug}`} ref={cardRef}>
          <div className="fa-card__glow" aria-hidden="true" />
          <div className="fa-ce"><Sparkle />The Fan Score · Pre-launch</div>
          <div className="fa-cbigw">{verdict}.</div>
          <div className="fa-csub">where I'm at before launch</div>
          <div className="fa-cbars">
            {['Fuel', ...DISCIPLINES].map((k) => {
              const lv = lvls[k]
              const w = Math.max(Math.round(((lv - 1) / 2) * 100), 8)
              return (
                <div className="fa-cbar" key={k}>
                  <span className="fa-cl">{k === 'Fuel' ? 'Fuel · route to fans' : LABEL_OF[k]}</span>
                  <span className="fa-ctr"><span className={`fa-cfl fa-cfl--lv${lv}`} style={{ width: w + '%' }} /></span>
                  <span className="fa-cpct">{LEVEL_WORD[lv - 1]}</span>
                </div>
              )
            })}
          </div>
          <div className="fa-cleak">{cLeak}</div>
          <div className="fa-cfoot"><span>Check yours · {SITE_URL.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}</span><span>The Fan Engine™</span></div>
        </div>
        <div className="fa-cta">
          <button className="fa-btn fa-btn--ghost" onClick={card.share} disabled={card.busy}>
            {card.busy ? 'Preparing…' : 'Share my result'}</button>
          <button className="fa-btn fa-btn--ghost" onClick={card.download}>Download card as image</button>
          <button className="fa-back" onClick={restart}>Retake the Fan Score</button>
        </div>
        {(card.error || card.note) && (
          <div className="fa-fldnote" role="status">{card.error || card.note}</div>
        )}
      </div>

      <ResultContactForm
        tool="fan-score"
        score={`pre-launch · ${verdict}`}
        onDownload={card.downloadCard}
      />

      <p className="fa-note">
        This is the directional, self-assessed edition of the Fan Score, not a growth score. It's only as honest as the evidence behind each answer, so treat it as a starting point, best confirmed in a call. Re-run it monthly. The full engagement begins the day you go live.
      </p>
      <div className="fa-sign">Laura Cordrey · The Fan Engine<span className="tm">™</span></div>
    </section>
  )
}
