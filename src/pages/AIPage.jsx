import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* /ai — Fan-led growth for AI. This page carries the full AI section that
 * used to live on the homepage: intro headline, the four discipline cards
 * (Distribution, Sentiment, Advocacy, Operations), and the oxblood
 * "who wants to build it with me" call-to-arms. The homepage keeps a
 * two-column teaser that links here. */

const aiPoints = [
  { idx: '01 · Distribution', title: 'Recommended by the models',  copy: 'When someone asks an AI what to use, you want to be the answer. Models learn from what real users write online, so fan advocacy is now distribution.' },
  { idx: '02 · Sentiment',    title: 'Sentiment you can move',     copy: 'Improve how your brand is talked about in comments, threads and communities. That is the same signal both buyers and models read about you.' },
  { idx: '03 · Advocacy',     title: 'Advocacy that writes',       copy: 'Build programs that get fans writing about you in reviews, posts and articles, not only making videos. Text is what AI reads.' },
  { idx: '04 · Operations',   title: 'Run it like a live service', copy: 'Manage your AI community the way I ran games with millions of players: real-time, close to the product, ready before sentiment turns.' },
]

const SECTION_PAD = 'clamp(72px, 9vw, 128px) clamp(20px, 5vw, 64px)'
const INNER = { maxWidth: 1280, margin: '0 auto', width: '100%' }

export default function AIPage() {
  useDocumentMeta({
    title: 'Fan-led growth for AI · Laura Cordrey',
    description:
      'AI communities behave like live-service game communities: passionate, loud, one model update from turning. I build the same fan-led growth engine for the people around your model. Distribution, sentiment, advocacy and operations for AI products.',
    canonical: pageUrl('ai'),
    ogType: 'website',
  })

  return (
    <section style={{ position: 'relative', background: '#0E0B09', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-26%', right: '-8%', width: '48vw', height: '48vw', maxWidth: 620, maxHeight: 620, background: 'radial-gradient(circle,rgba(200,54,43,.18) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', ...INNER, padding: SECTION_PAD }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(20px,2.6vw,30px)', maxWidth: '56ch' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, border: '1px solid rgba(200,54,43,.4)', borderRadius: 999, padding: '8px 16px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C8362B' }} />
            New · Fan-led growth for AI
          </span>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.02, letterSpacing: '-.03em', margin: 0 }}>
            AI communities behave like the live-service game communities I ran at Ubisoft: passionate, loud, <mark>one model update from turning</mark>.
          </h1>
          <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0, maxWidth: '48ch' }}>
            The same engine that keeps fans of a game works for the people around your model. And right now it pays off in places that matter more than ever.
          </p>
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(16px,2vw,24px)', marginTop: 'clamp(40px,5vw,68px)' }}>
          {aiPoints.map((p) => (
            <div key={p.idx} className="aic" style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#241D19', border: '1px solid rgba(239,233,220,.14)', borderRadius: 3, padding: 'clamp(26px,3vw,40px)' }}>
              <span style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>{p.idx}</span>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>{p.title}</h2>
              <p style={{ fontSize: 'clamp(.98rem,1.2vw,1.12rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.8)', margin: 0 }}>{p.copy}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(36px,4.5vw,60px)', background: 'linear-gradient(150deg,#A12A1E,#6E1B13)', border: '1px solid rgba(251,244,230,.22)', borderRadius: 3, padding: 'clamp(32px,4.2vw,56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(24px,3vw,40px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '48ch' }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.05, letterSpacing: '-.025em', margin: 0, color: '#FBF4E6' }}>
              This is new ground. <mark style={{ color: '#F2D79A' }}>Who wants to build it with me?</mark>
            </h2>
            <p style={{ fontSize: 'clamp(1.04rem,1.4vw,1.24rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0 }}>
              No one has run fan-led growth for AI products at scale yet. I have run it for live-service games with millions of players, the closest thing there is. If you are shipping a model and want to get ahead of this, let&rsquo;s try it together.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btncream" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FBF4E6', color: '#15110F', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #FBF4E6', textDecoration: 'none' }}>
              Book a 30-min call <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
