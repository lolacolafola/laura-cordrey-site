import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import { SIREN, RETENTION, EXPORT_TOOL } from '../data/legalIdentity.js'
import './PrivacyPage.css'

/* /privacy — added 19 Aug 2026.
 *
 * WHY IT EXISTS. The site collects personal data through two Netlify Forms
 * (contact and fan-score) and had no privacy notice of any kind. Flagged by
 * Michael on 18 Aug and confirmed against the code: no route, no component, no
 * footer link. It is the only compliance exposure on the site.
 *
 * EVERYTHING FACTUAL HERE WAS READ OUT OF THE CODEBASE, not assumed:
 *   - Form fields: the hidden registration forms in index.html, which are the
 *     authoritative list of what Netlify accepts.
 *   - Third parties: public/_headers. The enforcing CSP is an exact inventory
 *     of every origin the browser may talk to, so nothing can be transferring
 *     data that is not named in it. Those origins are Google Fonts
 *     (fonts.googleapis.com, fonts.gstatic.com), YouTube (www.youtube.com,
 *     i.ytimg.com) and self. That is the complete list.
 *   - No analytics: there is no tag anywhere, and connect-src is 'self'.
 *
 * ⚠️ THREE FACTS ARE STILL MISSING. They are hoisted into named constants
 * directly below this comment (SIREN, RETENTION, EXPORT_TOOL) rather than left
 * inline in the prose. The page must not go live until all three are filled in.
 * The August draft listed four; jurisdiction is now resolved to France, and
 * with it the supervisory authority as the CNIL.
 *
 * THIS IS A PLAIN-LANGUAGE NOTICE, NOT LEGAL ADVICE. It is proportionate to a
 * one-person consultancy with two forms and no tracking, which is what Michael
 * described as sufficient. If Laura wants certainty, a lawyer should read it.
 *
 * NOT in the nav. It belongs in the footer with the other utility routes, which
 * is where a reader looks for it. */

/* Shown as "Last updated". Set this to the date the page actually goes live. */
const UPDATED = '10 September 2026'

/* The identity facts moved to src/data/legalIdentity.js on 10 Sep 2026, when
 * /legal was added. SIREN appears on both pages, and filling the same number
 * into two files is how they end up disagreeing. See that file for what each
 * value is and why none of them may be guessed.
 *
 * RESOLVED since the August draft: jurisdiction. Laura is resident in France,
 * stated in the 10 Sep review handover and corroborated by the site footer's
 * own "Paris · Working globally". That settles the supervisory authority as the
 * CNIL, so that placeholder is gone from the copy below. */
const READY = SIREN !== null && RETENTION !== null && EXPORT_TOOL !== null

export default function PrivacyPage() {
  useDocumentMeta({
    title: 'Privacy · Laura Cordrey',
    description:
      'What happens to the information you send through this site: what is collected, who processes it, how long it is kept, and how to have it deleted.',
    canonical: pageUrl('privacy'),
    ogType: 'website',
  })

  return (
    <div className="pv-page on-light">
      <div className="pv-container">
        {/* Dev-only, and deliberately impossible to miss. A real visitor must
          * never see it, which is why it is gated on import.meta.env.DEV rather
          * than rendered for everyone: a half-finished privacy notice is worse
          * than a missing one, but a scary banner on a live legal page is worse
          * than both. The build-time guard in scripts/privacy-check.mjs is what
          * actually stops it shipping. */}
        {import.meta.env.DEV && !READY && (
          <p className="pv-todo">
            Not ready to publish. Missing:{' '}
            {[
              SIREN === null && 'SIREN',
              RETENTION === null && 'retention period',
              EXPORT_TOOL === null && 'CRM/email export answer',
            ].filter(Boolean).join(', ')}
            . Fill these in at the top of PrivacyPage.jsx.
          </p>
        )}
        <span className="pv-kick">Privacy</span>
        <h1 className="pv-title">What happens to what you send me.</h1>
        <p className="pv-lede">
          This site is run by one person. It sets no tracking cookies, runs no
          analytics and shows no advertising. The only personal data it holds is
          what you type into a form and send me.
        </p>
        <p className="pv-updated">Last updated {UPDATED}</p>

        <h2 className="pv-h2">Who is responsible</h2>
        {/* Laura, 20 Aug: "I don't have a legal entity do I? or is it my micro
          * entreprise?" A micro-entreprise has NO separate legal personality —
          * it is a tax and social-contribution regime for a sole trader, not a
          * company. So there is no entity to name: the controller is Laura
          * herself, as a natural person, and the business registration number
          * is what identifies her in that capacity.
          *
          * GDPR Art. 13 requires the controller's identity and CONTACT DETAILS.
          * It does not require a postal address specifically, so an email
          * address that actually reaches her satisfies it. That matters here:
          * a sole trader working from home should not have to publish a home
          * address to run a contact form.
          *
          * ⚠️ SEPARATE OBLIGATION, NOT HANDLED BY THIS PAGE: if Laura is in
          * France, the LCEN requires "mentions légales" — name, address,
          * contact, SIREN, and the host's name and address. That is a different
          * requirement from this privacy notice and it does generally expect an
          * address. Many micro-entrepreneurs use a domiciliation address rather
          * than their home. Worth checking before assuming this page covers
          * everything. */}
        <p>
          I am. This site is run by me personally, Laura Cordrey, as a sole
          trader registered in France
          {SIREN ? <> (SIREN {SIREN})</> : null}. There is no company behind
          it. You can reach me about anything on this page at{' '}
          <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>.
        </p>

        <h2 className="pv-h2">What I collect, and only when you send it</h2>
        <p>
          Nothing on this site collects personal data in the background. Two
          forms collect it, and both only when you choose to submit them.
        </p>
        <p>
          <strong>The contact form.</strong> Your name, email address,
          organisation and message. It also records which page you came from,
          which of my services you selected and any timeline or event details
          you filled in, so I can answer you properly rather than asking you to
          repeat yourself.
        </p>
        <p>
          <strong>The Fan Score form.</strong> Your name and email address,
          along with the score and edition your answers produced, so I can send
          you the result.
        </p>
        <p>
          The Fan Score and Fan Value tools themselves run entirely in your
          browser. Your answers and the numbers you enter are not sent anywhere
          unless you fill in one of the forms above.
        </p>

        <h2 className="pv-h2">Why I hold it, and on what basis</h2>
        <p>
          To reply to you and, if it goes that way, to talk about working
          together. The lawful basis is legitimate interest: you contacted me
          about my services, and answering you is the thing you asked for. I do
          not add you to a mailing list, and I do not send marketing you did not
          ask for.
        </p>

        <h2 className="pv-h2">Who else can see it</h2>
        <p>
          <strong>Netlify</strong> hosts this site and processes the forms. Form
          submissions are stored in Netlify and emailed to me. Like any web
          host, Netlify also records standard server information such as your IP
          address when you load a page.
        </p>
        <p>
          <strong>Google Fonts.</strong> This site loads its typeface from
          Google, which means your browser contacts Google and Google receives
          your IP address on every page you view. No cookie is set by this.
        </p>
        {/* CORRECTED 10 Sep 2026. The August draft said "Nothing loads from
          * YouTube until you click play." That was not true and this is a legal
          * notice, so it could not stand. CaseStudyCinematic.jsx renders a
          * plain <iframe src="youtube.com/embed/…">, not a click-to-load
          * thumbnail. `loading="lazy"` defers the request until the video
          * approaches the viewport, but it is the browser scrolling that
          * triggers it, not the reader pressing anything — and YouTube can set
          * its cookies at that moment. The embeds also use youtube.com rather
          * than youtube-nocookie.com, so the cookie wording is right.
          *
          * If Laura would rather this paragraph said the original thing, the
          * fix is a click-to-load facade in CaseStudyCinematic.jsx, not a
          * change to this sentence. */}
        <p>
          <strong>YouTube.</strong> A few case study pages embed YouTube videos.
          The embed loads when you scroll down to it, not only when you press
          play, and from that point YouTube may set cookies and receive
          information about your visit.
        </p>
        {EXPORT_TOOL ? (
          <p>
            <strong>{EXPORT_TOOL}.</strong> I copy enquiries into {EXPORT_TOOL}{' '}
            so I can keep track of a conversation over time. It holds the same
            details you sent me, and nothing more.
          </p>
        ) : null}
        <p>
          I do not sell your data, and I do not share it with anyone else.
        </p>

        <h2 className="pv-h2">Cookies</h2>
        <p>
          This site sets no cookies of its own. There is no analytics, no
          advertising and no tracking, which is why you have not been asked to
          accept anything. The only cookies that can appear are YouTube&rsquo;s,
          on the few case study pages that embed a video.
        </p>

        <h2 className="pv-h2">How long I keep it</h2>
        <p>
          I keep what you send me for {RETENTION || 'as long as it is useful'},
          then delete it. You can ask me to delete it sooner at any time, and I
          will.
        </p>

        <h2 className="pv-h2">Your rights</h2>
        <p>
          You can ask me to show you what I hold about you, correct it, delete
          it, or send it to you in a portable form. You can also object to my
          holding it at all. Email me and I will action it, and I will not ask
          you why.
        </p>
        {/* Resolved 10 Sep 2026. The August draft left this open because Laura
          * had said "Europe" rather than "France", and two people assuming the
          * CNIL does not make it a fact. The review handover states her
          * residency directly, and the site's own footer says Paris, so the
          * authority is settled. A complainant may also go to their own
          * national authority, which is their right under the GDPR regardless
          * of where I am, so both routes are named. */}
        <p>
          If you think I have handled your data badly, you can complain to your
          own national data protection authority, or to the CNIL, which is the
          French regulator and the one that supervises me. I would rather you
          told me first so I can put it right.
        </p>

        <h2 className="pv-h2">Changes</h2>
        <p>
          If this notice changes, the date at the top changes with it. There is
          no archive of previous versions, because there has only ever been this
          one.
        </p>

        <div className="pv-box">
          <p>
            <strong>Any question about your data</strong>, or a request to see
            or delete it:{' '}
            <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>.
          </p>
          <p>
            Wanting to talk about something other than privacy?{' '}
            <Link to="/contact">Use the contact form</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
