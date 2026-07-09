import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import './FaqPage.css'

const CONTACT_URL = '/contact?intent=consulting'

/* /faq: two jobs. (1) AEO: direct answers with FAQPage JSON-LD so answer
 * engines have a citable source. (2) Sales: objections handled before the
 * call. Answers stay under ~90 words; keep in sync with Services and the
 * internal pricing sheet. Copy source: copy-decks/copy-faq-v1.md. */

const FAQS = [
  {
    q: 'What is fan-led growth?',
    a: 'Fan-led growth is growth powered by the customers you already have. Instead of renting attention through paid ads, you build the conditions for customers to become fans: people who stay longer, spend more, and bring the next customer with them. Paid acquisition is a meter you feed. A fan-led growth engine is an asset you own. The system I build to do this is the Fan Engine: brand, product, community and growth run as one system, measured against the numbers a board cares about.',
  },
  {
    q: 'How is this different from hiring a community manager or agency?',
    a: 'A community manager runs a space. A community agency runs campaigns in it. I build the engine around it: the brand story fans belong to, the product loops that bring them back, the community structure, the advocacy programs, and the measurement spine that ties each part to revenue. Every engagement includes baselines and quarterly re-measurement, so "the community is doing well" becomes a number, not a feeling.',
  },
  {
    q: 'Who do you work with?',
    a: 'Consumer and consumer-tech brands with a real user base: gaming, entertainment, telco, subscription products, and AI companies with passionate communities. The work is remote-first and I run engagements with US and European teams.',
  },
  {
    q: 'Who is this NOT for?',
    a: 'If you want someone to run your paid media, I am not your person. If your product has no users yet, start with the free pre-launch edition of the Fan Score rather than an engagement. And if you want a community as a cost centre with no revenue expectations, we would frustrate each other.',
  },
  {
    q: 'What does it cost?',
    a: 'A 2-hour advisory session is $750. Bigger engagements (the Fan Engine, Sentiment SOS, Fan Moments) are fixed-fee, priced per scope after a call, so you know the number before we start. AI companies can ask about founding-partner terms while those slots last.',
  },
  {
    q: 'What happens in the first month of the Fan Engine?',
    a: 'Four weeks, four outputs. Week one: access and interviews. Week two: the audit and the Fan Signal Index built on your data, so we know who your fans actually are. Week three: your Fan Value calculated on your real numbers. Week four: a six-month plan, first sprint scoped with owners and targets. You end the month knowing what your fandom is worth and exactly what we build first.',
  },
  {
    q: 'How do you find the fans in our userbase?',
    a: 'With your data, not a survey. Every customer is scored on the three behaviours that define a fan: they stay (retention), they pay (spend), and they bring more (referrals, content, community activity). The top scorers are your fans. That score becomes your baseline, and we re-measure it quarterly, so you can watch the fan segment grow and see what it spends.',
  },
  {
    q: 'Can you prove any of this moves revenue?',
    a: 'That is the point of the measurement spine. Baselines before builds, cohorts and holdouts where your data allows them, and limits named out loud when attribution has them. Fans mostly do not show up click-by-click; they show up in cohort comparisons, referral history and "how did you hear about us." I would rather tell you what we cannot measure than claim what we did not cause.',
  },
  {
    q: 'Our community is turning on us right now. How fast can you start?',
    a: 'That is Sentiment SOS, and it is built for this week, not next quarter. One intake call, then five days: I read everything raw, separate the loud from the many, and hand you a build-ready recovery plan across product, comms and community, with message drafts included.',
  },
  {
    q: 'Do you just do strategy, or do you build?',
    a: 'I build. The strategy comes with the programs, the copy direction, the funnels and the measurement, shipped. Where a build needs specialists, I bring them and direct the work. This site is the proof: I designed and built it myself, end to end.',
  },
  {
    q: 'What is the Fan Score?',
    a: 'A free two-minute self-assessment that tells you how fan-powered your growth is today and where the biggest untapped opportunity sits. It is the fastest way to see whether this whole approach is relevant to you. There is a pre-launch edition if you have no users yet.',
  },
  {
    q: 'Why "fans" and not "customers" or "community"?',
    a: 'A customer bought something. A community member belongs somewhere. A fan is a community member with the volume turned up: identity, passion, advocacy. Fans are the ones who bring others, and that is the difference between a cost centre and a growth engine.',
  },
]

export default function FaqPage() {
  useDocumentMeta({
    title: 'FAQ · Fan-led growth, the Fan Engine, and how I work · Laura Cordrey',
    description:
      'Direct answers: what fan-led growth is, how the Fan Engine works, what it costs, how fans are found and measured, and how fast Sentiment SOS can start.',
    canonical: pageUrl('faq'),
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  })

  return (
    <div className="faq-page">
      <div className="faq-container">
        <span className="faq-eyebrow">Questions, answered plainly</span>
        <h1 className="faq-title">
          Everything people ask <span className="faq-title__mark">before they ask me.</span>
        </h1>

        <dl className="faq-list">
          {FAQS.map((f) => (
            <div className="faq-item" key={f.q}>
              <dt className="faq-q">{f.q}</dt>
              <dd className="faq-a">{f.a}</dd>
            </div>
          ))}
        </dl>

        <div className="faq-close">
          <p className="faq-close__lede">Question not here?</p>
          <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
            Ask me directly <span aria-hidden="true">→</span>
          </Link>
          <p className="faq-close__alt">
            Or start with the free <Link to="/fan-led-growth-audit">2-minute Fan Score</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
