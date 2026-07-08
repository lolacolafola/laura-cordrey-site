import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import './AIPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* /ai — point-of-view / thought-piece landing.
 *
 * Editorial essay in a narrow reading column (680px), then a wide four-moves
 * card band (1160px), then a narrow closing block with a soft text-link CTA.
 * The alternation between narrow prose and wide card band is the design.
 *
 * Copy is final (7 Jul handoff). Voice: first person, plain, confident.
 * No em dashes. No KPI banner (client-rejected: numbers stated in prose,
 * not surfaced as stats). */

const fourMoves = [
  {
    n: '01',
    cat: 'Distribution',
    title: 'Recommended by the models',
    body: 'When someone asks an AI what to use, you want to be the answer. Models learn from what real users write online, so fan advocacy is now distribution.',
  },
  {
    n: '02',
    cat: 'Sentiment',
    title: 'Sentiment you can move',
    body: 'Improve how your brand is talked about in comments, threads and communities. A bad release does not clear when you ship the next one, it carries, so you want to be moving it on purpose. It is the same signal both buyers and models read about you.',
  },
  {
    n: '03',
    cat: 'Advocacy',
    title: 'Advocacy that writes',
    body: 'Build programs that get fans writing about you in reviews, posts and articles, not only making videos. Text is what AI reads.',
  },
  {
    n: '04',
    cat: 'Operations',
    title: 'Run it like a live service',
    body: 'Manage your AI community the way I ran games with millions of players: real-time, close to the product, ready before sentiment turns.',
  },
]

export default function AIPage() {
  useDocumentMeta({
    title: 'Fan-led growth for AI · Laura Cordrey',
    description:
      'A point of view on running an AI company like a AAA live-service game. Fan-led growth as distribution, sentiment, advocacy and operations for the crowd around your model.',
    canonical: pageUrl('ai'),
    ogType: 'article',
  })

  return (
    <div className="ai-page">
      {/* ─── OPENING · essay (narrow reading column, red halo) ─── */}
      <section className="ai-open">
        <div aria-hidden="true" className="ai-open__halo" />
        <div className="ai-col">
          <span className="ai-eyebrow">A point of view · Fan-led growth for AI</span>
          <h1 className="ai-headline">
            How to run an AI company like a AAA{' '}
            <mark>live-service game.</mark>
          </h1>
          <p className="ai-p">
            Every few weeks, an AI company ships. A new model, a new capability, a visible public drop. Within the hour, the internet has decided how it feels, in comments, threads, reviews and posts. Some of it is delight. Some of it is a pile-on.
          </p>
          <p className="ai-p">
            I&rsquo;ve seen this movie before. At Ubisoft I ran the community for Ghost Recon, a 15-million-player live game, and held it at 85% positive sentiment through the launches and the rough patches. For its next release I built the game&rsquo;s first global fan advocacy program, Delta Company, and unveiled it live on the E3 stage.
          </p>
          <p className="ai-p">
            AI products now work the same way. What grows a game community grows the crowd around a model, and it just doesn&rsquo;t have a name in AI yet.
          </p>
          <p className="ai-p ai-lead">
            Here&rsquo;s where it pays off, and what it looks like in practice.
          </p>
        </div>
      </section>

      {/* ─── FOUR MOVES · wide card band (1160px container) ─── */}
      <section className="ai-cards">
        <div className="ai-wrap">
          <header className="ai-cards__head">
            <span className="ai-eyebrow">The four moves</span>
            <h2 className="ai-cards__title">
              Where fan-led growth pays off for AI
            </h2>
          </header>
          <ol className="ai-cards__grid" aria-label="The four moves">
            {fourMoves.map((m) => (
              <li key={m.n} className="ai-card">
                <span className="ai-card__num">
                  <span className="ai-card__num-i">{m.n}</span>
                  <b> · {m.cat}</b>
                </span>
                <h3 className="ai-card__ttl">{m.title}</h3>
                <p className="ai-card__body">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── CLOSE · essay + soft text-link CTA ─── */}
      <section className="ai-close">
        <div className="ai-col">
          <p className="ai-p">
            None of this is a support function. It&rsquo;s growth. The AI companies that treat the crowd around their model as an engine, not a cost, will pull ahead in a way the others can&rsquo;t buy back.
          </p>
          <p className="ai-p">
            No one has built this for AI products at scale yet. I&rsquo;ve built the closest thing there is, I&rsquo;m AI-native, and I saw it coming early. I&rsquo;d rather build the first real version with a team shipping models than write about it from the outside: I&rsquo;d set up the system, and bring the people to run it.
          </p>
          <span aria-hidden="true" className="ai-rule" />
          <p className="ai-p ai-lead">
            This is new ground. <mark>Who wants to build it with me?</mark>
          </p>
          <p className="ai-cta-line">
            If that&rsquo;s you,{' '}
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="ai-cta-link">
              let&rsquo;s talk.
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
