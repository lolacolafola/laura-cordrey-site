import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import { SIREN, ADDRESS, PHONE, VAT, HOST, IDENTITY_READY } from '../data/legalIdentity.js'
/* Shares /privacy's stylesheet on purpose. These are the site's only two plain
 * legal pages, they have identical needs — long body text on cream, no art
 * direction — and two legal pages that looked different would be a worse
 * outcome than a prefix that reads `pv-` on both. One stylesheet means they
 * cannot drift apart. */
import './PrivacyPage.css'

/* /legal — mentions légales. Added 10 Sep 2026.
 *
 * WHY IT EXISTS, and why it is not the privacy notice. France's LCEN requires a
 * professional website to identify who publishes it: name, address, contact,
 * registration number, the publication director, and the host's details. That
 * is a different obligation from the GDPR privacy notice at /privacy, which is
 * about what happens to a visitor's data. The site had neither until this week;
 * /privacy closed the first gap and this closes the second.
 *
 * On whether it is worth doing at all — Laura asked, reasonably, whether other
 * consultants actually bother. In France it is close to universal: "Mentions
 * légales" in the footer is a standard convention on French business sites in a
 * way it is not in the UK or US. Enforcement against a one-person consultancy is
 * unlikely, but the audience here is consumer brands with procurement and legal
 * functions, and a missing legal notice is the kind of thing those teams notice.
 * The practical argument is stronger than the legal one.
 *
 * NOT LEGAL ADVICE. This is a plain, proportionate notice for a sole trader with
 * a brochure site and two forms. Worth a lawyer's eye before it is relied on.
 *
 * Every fact comes from src/data/legalIdentity.js, shared with /privacy so the
 * SIREN cannot differ between them. Nothing here is guessed: the host's address
 * was read off Netlify's own terms, and the rest is null until Laura supplies
 * it. `npm run privacy:check` fails the build while this page is reachable and
 * incomplete. */

export default function LegalPage() {
  useDocumentMeta({
    title: 'Legal notice · Laura Cordrey',
    description:
      'Who publishes this site, how to make contact, and who hosts it. Mentions légales for lauracordrey.com.',
    canonical: pageUrl('legal'),
    ogType: 'website',
    /* No noindex, deliberately. useDocumentMeta has no such option, so passing
     * one would have been silently dropped and left a comment claiming a
     * behaviour the site does not have. It also has to be in the sitemap
     * regardless: scripts/prerender.mjs takes its routes from dist/sitemap.xml,
     * and _redirects ends in a strict `/* -> /404.html 404`, so a route absent
     * from the sitemap gets no file and 404s. Indexed at low priority, same as
     * /privacy. */
  })

  return (
    <div className="pv-page on-light">
      <div className="pv-container">
        {import.meta.env.DEV && !IDENTITY_READY && (
          <p className="pv-todo">
            Not ready to publish. Missing:{' '}
            {[
              SIREN === null && 'SIREN',
              ADDRESS === null && 'address',
              PHONE === null && 'phone',
              VAT === null && 'VAT status',
            ].filter(Boolean).join(', ')}
            . Fill these in at src/data/legalIdentity.js.
          </p>
        )}

        <span className="pv-kick">Mentions légales</span>
        <h1 className="pv-title">Who publishes this site.</h1>
        <p className="pv-lede">
          The information French law asks a professional website to make
          available. If you are looking for what happens to the details you send
          me, that is the <Link to="/privacy">privacy notice</Link>.
        </p>

        <h2 className="pv-h2">Publisher</h2>
        {/* A micro-entreprise has no separate legal personality, so there is no
          * company to name here and no RCS entry: the publisher is Laura
          * herself, and the SIREN is what identifies her professionally.
          *
          * On the address: LCEN expects the address of the establishment, and
          * for a sole trader working from home that is, by default, where she
          * lives. Publishing it is a real and permanent exposure. A
          * domiciliation address is the ordinary way out of this and is what
          * most micro-entrepreneurs with a public site use. Laura's call, and
          * the reason ADDRESS is a constant she fills rather than something
          * assumed here. */}
        <p>
          This site is published by <strong>Laura Cordrey</strong>, working as a
          sole trader (micro-entreprise) registered in France
          {SIREN ? <>, SIREN {SIREN}</> : null}.
        </p>
        {ADDRESS ? <p>{ADDRESS}</p> : null}
        <p>
          Contact: <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>
          {PHONE ? <> · {PHONE}</> : null}
        </p>
        <p>
          Director of publication: <strong>Laura Cordrey</strong>.
        </p>

        {/* Renders ONLY when there is a VAT number to publish, which is the
          * only thing LCEN asks for and only from a publisher who is assujetti.
          * `false` means under the franchise en base: no number exists, the
          * requirement does not apply, and nothing appears. `null` means
          * unanswered and blocks the build. See legalIdentity.js for why the
          * "TVA non applicable, art. 293 B" line is deliberately NOT here: it
          * belongs on invoices, and on a page like this it only broadcasts a
          * turnover figure. */}
        {VAT ? (
          <>
            <h2 className="pv-h2">VAT</h2>
            <p>Intracommunity VAT number: {VAT}.</p>
          </>
        ) : null}

        <h2 className="pv-h2">Hosting</h2>
        {/* Address read off Netlify's own Terms of Use rather than copied from
          * another site's notice; see the note in legalIdentity.js. */}
        <p>
          This site is hosted by <strong>{HOST.name}</strong>, {HOST.address}.{' '}
          <a href={HOST.url} target="_blank" rel="noreferrer">{HOST.url.replace('https://', '')}</a>
        </p>

        <h2 className="pv-h2">Content</h2>
        {/* Deliberately not a wall of "all rights reserved, any reproduction is
          * strictly forbidden". Laura's business runs on her writing being read
          * and passed around. A notice that threatens the reader for quoting her
          * works against the thing the site is for. This states authorship,
          * which is the claim that matters, and is the same claim the site makes
          * about the Fan Engine. */}
        <p>
          The writing, images and the methods described on this site are Laura
          Cordrey&rsquo;s own work, except where a client&rsquo;s name, logo or
          footage appears, which remains theirs. Quote it, link to it and share
          it. Ask me first before republishing a piece in full.
        </p>

        <div className="pv-box">
          <p>
            <strong>Something wrong on this page</strong>, or a question about
            the site:{' '}
            <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>.
          </p>
          <p>
            Want to talk about working together?{' '}
            <Link to="/contact">Use the contact form</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
