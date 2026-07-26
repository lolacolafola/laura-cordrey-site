import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { postLead } from '../lib/forms.js'
import './ResultContactForm.css'

const CONTACT_URL = '/contact?intent=consulting'

// The short form that sits under a tool result. Posts to the registered
// `contact` Netlify form using a subset of its fields, plus `tool` and `score`
// so a tool enquiry is distinguishable from a homepage one in the inbox.
//
// `onDownload` is optional: Fan Score has a card to hand over, Fan Value does
// not. When it is present, sending the form also downloads the card.
export default function ResultContactForm({ tool, score, onDownload }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', 'bot-field': '' })
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [dlNote, setDlNote] = useState('')
  // State is too slow to gate a double click: both clicks read the same stale
  // `busy` before React re-renders and disables the button, which sends the
  // enquiry twice and downloads two files. A ref updates synchronously.
  const busyRef = useRef(false)

  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (form['bot-field']) return // honeypot tripped, drop silently
    if (busyRef.current) return
    busyRef.current = true
    setBusy(true)

    // The card is the courtesy, the message is the valuable half. Generate
    // first so the file lands while they are still looking at the button, but
    // never let a failure here stop the enquiry going out.
    if (onDownload) {
      try {
        await onDownload()
        setDlNote('Your card has downloaded.')
      } catch {
        setDlNote('The card image could not be generated, so screenshot it instead.')
      }
    }

    const name = form.name.trim()
    postLead({
      form: 'contact',
      name,
      email: form.email.trim(),
      message: form.message.trim(),
      intent: 'consulting',
      source_page: tool,
      tool,
      score,
      _subject: `[${tool}] ${name} · ${score}`,
    })

    setSent(true)
    setBusy(false)
  }

  if (sent) {
    return (
      <div className="rcf">
        <div className="rcf__done" role="status">
          <span className="rcf__donehead">Your enquiry is in.</span>
          <span className="rcf__donebody">
            I read every one myself and will follow up within one working day to set up a call.
          </span>
          {dlNote && <span className="rcf__donenote">{dlNote}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="rcf">
      <h2 className="rcf__head">Want to talk about this result?</h2>
      <p className="rcf__lede">
        Tell me what you make of it and I&rsquo;ll come back to you.
      </p>
      <form onSubmit={onSubmit} className="rcf__form">
        {/* Honeypot — must stay visually hidden and unlabelled for humans. */}
        <input
          type="text" name="bot-field" value={form['bot-field']} onChange={onField('bot-field')}
          tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <input
          className="rcf__fld" type="text" name="name" required
          placeholder="Your name" aria-label="Your name"
          autoComplete="name" value={form.name} onChange={onField('name')}
        />
        <input
          className="rcf__fld" type="email" name="email" required
          placeholder="Email" aria-label="Email"
          autoComplete="email" value={form.email} onChange={onField('email')}
        />
        <textarea
          className="rcf__fld rcf__fld--area" name="message" required
          placeholder="Anything surprise you?" aria-label="Anything surprise you?"
          value={form.message} onChange={onField('message')}
        />
        <button className="rcf__send" type="submit" disabled={busy}>
          {busy ? 'Sending…' : 'Send'}
        </button>
        {onDownload && (
          <p className="rcf__note">Your card downloads when you send this.</p>
        )}
        <p className="rcf__trust">
          I read every message myself and I&rsquo;ll come back to you within one working day.
        </p>
        <p className="rcf__alt">
          Something specific in mind? Use the <Link to={CONTACT_URL} className="rcf__link">full contact form</Link>.
        </p>
      </form>
    </div>
  )
}
