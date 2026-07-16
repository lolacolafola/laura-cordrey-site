import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { FORM_ENDPOINT, encodeNetlifyForm } from '../lib/forms.js'
import { pageUrl } from '../lib/seo.js'
import './ContactPage.css'

const HELLO_EMAIL = 'hello@lauracordrey.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const VALID_INTENTS = ['consulting', 'speaking', 'other']

/* /contact — intent-first contact form per 8 Jul handoff.
 *
 * One entry point. Reader picks Hire me (consulting) / Book me (speaking)
 * / Something else (other), then progressively discloses the fields that
 * matter for that lane. Deep-linkable via ?intent=speaking so speaking
 * CTAs across the site can pre-open the speaking branch.
 *
 * Backend: submit is currently console.log with a payload shaped for
 * later wiring. See TODO in onSubmit — swap for Formspree / a serverless
 * function / an existing endpoint. Honeypot (company_url) is present;
 * enforce server-side too when wiring. */

// Small stroke-based icons — sitewide red-line convention.
const BriefcaseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)
const MicIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
)
const CheckIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-6" />
  </svg>
)

const VALID_NEEDS = {
  'ai-pilot': 'Fan-led growth for AI: a founding-partner pilot',
  'sos': 'Sentiment SOS: my community is turning',
  'engine': 'The Fan Engine: I want the whole system',
}

function useInitialNeed() {
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('need')
  return (q && VALID_NEEDS[q]) || ''
}

function useInitialIntent() {
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('intent')
  return VALID_INTENTS.includes(q) ? q : null
}

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact · Laura Cordrey',
    description:
      'Hire me for a growth problem, or book me for a stage. One intent-first form. I read every message and reply within two working days.',
    canonical: pageUrl('contact'),
    ogType: 'website',
  })

  const initialIntent = useInitialIntent()
  const initialNeed = useInitialNeed()
  const [intent, setIntent] = useState(initialIntent)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)
  const sourcePage = typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct'

  // If the URL adds ?intent=X after mount (e.g. same-page nav from a CTA),
  // keep local intent in sync so deep-links work end-to-end.
  useEffect(() => {
    if (initialIntent && initialIntent !== intent && !submitted) {
      setIntent(initialIntent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIntent])

  const pick = (val) => {
    setIntent(val)
    setSubmitted(false)
    setError(null)
  }

  const isConsulting = intent === 'consulting'
  const isSpeaking = intent === 'speaking'
  const hasIntent = !!intent

  const orgLabel = isSpeaking ? 'Event or organisation' : 'Company'
  const msgLabel = isConsulting
    ? 'What is going on?'
    : isSpeaking
    ? 'Anything else about the event?'
    : 'Your message'
  const submitLabel = isConsulting
    ? 'Send enquiry'
    : isSpeaking
    ? 'Send booking request'
    : 'Send message'
  const successMsg = isConsulting
    ? 'Your enquiry is in. I read every one myself and will come back within two working days.'
    : isSpeaking
    ? 'Your booking request is in. I reply to speaking enquiries within two working days, usually sooner.'
    : 'Message received. I will get back to you within two working days.'

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    // Honeypot: bots fill this, humans never see it. Drop silently.
    if ((fd.get('company_url') || '').toString().trim()) return

    const name = (fd.get('name') || '').toString().trim()
    const email = (fd.get('email') || '').toString().trim()
    const message = (fd.get('message') || '').toString().trim()
    if (!name || !email || !message) {
      setError('Please add your name, email and a message.')
      return
    }
    if (isSpeaking && !(fd.get('event_date') || '').toString().trim()) {
      setError('For a speaking booking, a date (even tentative) helps me reply fast.')
      return
    }

    const payload = Object.fromEntries(fd.entries())
    delete payload.company_url
    payload.intent = intent
    payload.source_page = sourcePage
    payload._subject = `[${intent}] ${name} · lauracordrey.com contact form`

    setSending(true)
    setError(null)
    // Netlify Forms: urlencoded POST to '/' with form-name; the "contact"
    // form + fields are registered by the hidden static form in index.html.
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeNetlifyForm('contact', payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`submit failed: ${res.status}`)
        setSubmitted(true)
      })
      .catch(() => {
        setError(
          `Something went wrong sending this. Please email me directly at ${HELLO_EMAIL}, or try again in a minute.`,
        )
      })
      .finally(() => setSending(false))
  }

  const reset = () => {
    setSubmitted(false)
    setError(null)
    if (formRef.current) formRef.current.reset()
  }

  return (
    <div className="contact-page">
      <div aria-hidden="true" className="contact-page__halo" />
      <div className="contact-container">
        <span className="contact-eyebrow">Work with me</span>
        <h1 className="contact-title">
          Tell me what you <span className="contact-title__mark">need</span>.
        </h1>
        <p className="contact-lede">
          Two ways in. Hire me for a growth problem, or book me for a stage. Pick one and I will ask only what I need to reply well.
        </p>

        {submitted ? (
          <div className="contact-success" role="status" aria-live="polite">
            <span className="contact-success__icon"><CheckIcon /></span>
            <h2 className="contact-success__title">Got it. Thank you.</h2>
            <p className="contact-success__body">{successMsg}</p>
            <button type="button" className="contact-success__reset" onClick={reset}>
              Send another message
            </button>
          </div>
        ) : (
          <>
            <p className="contact-picker__label">This is about</p>
            <div className="contact-picker">
              <button
                type="button"
                className={`contact-picker__btn${isConsulting ? ' is-active' : ''}`}
                onClick={() => pick('consulting')}
                aria-pressed={isConsulting}
              >
                <span className="contact-picker__icon" aria-hidden="true"><BriefcaseIcon /></span>
                <span className="contact-picker__ttl">Hire me</span>
                <span className="contact-picker__sub">Growth work: a 2-hour session, or a full engagement.</span>
              </button>
              <button
                type="button"
                className={`contact-picker__btn${isSpeaking ? ' is-active' : ''}`}
                onClick={() => pick('speaking')}
                aria-pressed={isSpeaking}
              >
                <span className="contact-picker__icon" aria-hidden="true"><MicIcon /></span>
                <span className="contact-picker__ttl">Book me</span>
                <span className="contact-picker__sub">To speak: a keynote, panel, host slot, or broadcast.</span>
              </button>
            </div>
            <button
              type="button"
              className={`contact-picker__other${intent === 'other' ? ' is-active' : ''}`}
              onClick={() => pick('other')}
              aria-pressed={intent === 'other'}
            >
              Something else? Press, a partnership, or a question.
            </button>

            <form ref={formRef} onSubmit={onSubmit} autoComplete="on" className="contact-form">
              {/* Honeypots — off-screen, invisible to humans, catch bots.
                  company_url is checked client-side (drop before send);
                  bot-field is Netlify's server-side honeypot (submissions
                  with it filled are discarded by Netlify). */}
              <div aria-hidden="true" className="contact-form__honeypot">
                <label>
                  Leave this field empty
                  <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
                </label>
                <label>
                  Also leave this empty
                  <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {hasIntent && (
                <div className="contact-form__fields">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      Name <span className="contact-field__req">*</span>
                    </label>
                    <input id="contact-name" type="text" name="name" placeholder="Your name" required />
                  </div>

                  <div className="contact-field__row">
                    <div className="contact-field">
                      <label htmlFor="contact-email">
                        Email <span className="contact-field__req">*</span>
                      </label>
                      <input id="contact-email" type="email" name="email" placeholder="you@company.com" required />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-org">{orgLabel}</label>
                      <input id="contact-org" type="text" name="organisation" placeholder="Where you work" />
                    </div>
                  </div>

                  {isConsulting && (
                    <div className="contact-branch">
                      <p className="contact-branch__eyebrow">Your growth problem</p>
                      <div className="contact-field">
                        <label htmlFor="contact-need">
                          What is closest to what you need? <span className="contact-field__hint">(we refine on a call)</span>
                        </label>
                        <select id="contact-need" name="consulting_need" className="contact-select" defaultValue={initialNeed}>
                          <option value="">Choose one</option>
                          <option>A 2-hour session: one problem, worked live</option>
                          <option>Sentiment SOS: my community is turning</option>
                          <option>Fan Moments: I have a big moment coming</option>
                          <option>The Fan Engine: I want the whole system</option>
                          <option value="Fan-led growth for AI: a founding-partner pilot">Fan-led growth for AI: a founding-partner pilot</option>
                          <option>Not sure yet, help me scope it</option>
                        </select>
                      </div>
                      <div className="contact-field">
                        <label htmlFor="contact-timeline">Timeline</label>
                        <select id="contact-timeline" name="consulting_timeline" className="contact-select">
                          <option value="">Choose one</option>
                          <option>Now, it is urgent</option>
                          <option>This quarter</option>
                          <option>Exploring, no fixed date</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {isSpeaking && (
                    <div className="contact-branch">
                      <p className="contact-branch__eyebrow">Your event</p>
                      <div className="contact-field__row">
                        <div className="contact-field">
                          <label htmlFor="contact-event-date">
                            Event date <span className="contact-field__req">*</span>{' '}
                            <span className="contact-field__hint">(or best estimate)</span>
                          </label>
                          <input
                            id="contact-event-date"
                            type="text"
                            name="event_date"
                            placeholder="e.g. 14 Nov 2026, or Q1 tentative"
                          />
                        </div>
                        <div className="contact-field">
                          <label htmlFor="contact-event-format">Format</label>
                          <select id="contact-event-format" name="event_format" className="contact-select">
                            <option value="">Choose one</option>
                            <option>Keynote</option>
                            <option>Fireside or panel</option>
                            <option>Host or MC</option>
                            <option>Broadcast or on camera</option>
                            <option>Virtual</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="contact-field__row">
                        <div className="contact-field">
                          <label htmlFor="contact-event-loc">
                            Location <span className="contact-field__hint">(city, or Virtual)</span>
                          </label>
                          <input
                            id="contact-event-loc"
                            type="text"
                            name="event_location"
                            placeholder="London, Paris, New York"
                          />
                        </div>
                        <div className="contact-field">
                          <label htmlFor="contact-event-budget">
                            Speaker budget <span className="contact-field__hint">(optional)</span>
                          </label>
                          <select id="contact-event-budget" name="event_budget" className="contact-select">
                            <option value="">Prefer to discuss</option>
                            <option>Under £2k</option>
                            <option>£2k–£5k</option>
                            <option>£5k–£10k</option>
                            <option>£10k+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="contact-field">
                    <label htmlFor="contact-msg">
                      {msgLabel} <span className="contact-field__req">*</span>
                    </label>
                    <textarea
                      id="contact-msg"
                      name="message"
                      rows={5}
                      placeholder="A few lines on what you are after."
                      required
                    />
                  </div>

                  {error && (
                    <p className="contact-error" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="contact-submit">
                    <button type="submit" className="btn btn--primary btn--lg contact-submit__btn" disabled={sending}>
                      {sending ? 'Sending…' : submitLabel} <span aria-hidden="true">→</span>
                    </button>
                    <p className="contact-submit__note">
                      Goes straight to my inbox. I read every one and reply within two working days.
                    </p>
                  </div>
                </div>
              )}
            </form>

            <p className="contact-fallback">
              Prefer to skip the form?{' '}
              <a href={`mailto:${HELLO_EMAIL}`}>Email me</a> or{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                reach me on LinkedIn
              </a>
              .
            </p>
          </>
        )}

        <p className="contact-privacy">
          Every enquiry lands in one inbox, tagged by intent so speaking and growth requests are sorted on arrival.
        </p>
      </div>
    </div>
  )
}
