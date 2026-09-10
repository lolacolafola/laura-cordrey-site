/* The facts that identify Laura as a business, in one place.
 *
 * Created 10 Sep 2026. Two pages need these — /privacy names the data
 * controller, /legal is the LCEN mentions légales — and SIREN appears on both.
 * Filling the same number into two files is how they drift, so both import
 * from here.
 *
 * ⚠️ NOTHING IN HERE MAY BE GUESSED. Every value is a fact about how Laura is
 * registered, and a wrong one on a legal page is worse than a missing one.
 * `null` means "not yet supplied" and is what the build guard keys off; it also
 * makes the page render without the claim rather than with a placeholder.
 *
 * Fill these in and both pages complete at once:
 *
 *   SIREN    — the 9-digit micro-entreprise number. A micro-entreprise has no
 *              separate legal personality, so there is no company to name: this
 *              is what identifies Laura in her professional capacity.
 *   ADDRESS  — the address of the establishment. LCEN expects one. A
 *              domiciliation address is normal and keeps a home address off a
 *              public page; see the note in LegalPage.jsx.
 *   PHONE    — LCEN lists a telephone number for professional publishers. If
 *              Laura would rather not publish one, that is a considered
 *              decision to take with a lawyer, not a field to leave blank by
 *              accident, which is why it is `null` and not simply omitted.
 *   VAT      — the intracommunity VAT number, or `false` if she is under the
 *              franchise en base and therefore not liable. `false` renders the
 *              standard "TVA non applicable, article 293 B du CGI" line.
 *
 * These two are /privacy only, and both were answered by Laura on 10 Sep 2026.
 */
/* 934 824 525. Taken from the URL of Laura's own Pappers entry, which she sent
 * on 10 Sep 2026: pappers.fr/entreprise/cordrey-laura-934824525. Pappers blocks
 * automated fetches, so the number was read off the slug rather than the page
 * body. ⚠️ Worth Laura eyeballing the grouped form below once, since it is the
 * one digit-for-digit fact on two legal pages. */
export const SIREN = '934 824 525'
/* From the RNE entry Laura sent on 10 Sep 2026 (Pappers, RNE updated
 * 10/09/2026). Set in sentence case rather than the registry's ALL CAPS, which
 * is a storage convention, not how an address is written.
 *
 * This is her registered establishment address and it is ALREADY PUBLIC: the
 * RNE is a public register and Pappers republishes it under "Adresse complète".
 * Putting it here adds no exposure that does not already exist, which was the
 * whole basis for the recommendation to include it. If Laura ever wants it off
 * this page, the move that actually helps is changing what is REGISTERED — a
 * domiciliation address updates the register, so Pappers and this page are
 * fixed together. Removing it from here alone changes nothing. */
export const ADDRESS = '50 rue Rodier, 75009 Paris, France'
/* `null` = not yet decided and blocks the build. `false` = a considered
 * decision not to publish one, and the page simply omits it. LCEN does list a
 * telephone number for professional publishers, so `false` is a small, knowing
 * gap rather than an oversight, which is exactly the distinction worth keeping
 * in the type. */
/* `false`, not a number: Laura has not published one, and Pappers holds her
 * phone behind a login, so there is nothing to put here. LCEN does list a
 * telephone number for professional publishers, so this is a small, knowing gap
 * rather than an oversight — which is exactly why the constant distinguishes
 * `false` (decided against) from `null` (not yet considered). Give me a number
 * any time and it renders beside the email. */
export const PHONE = false
export const VAT = null

export const RETENTION = 'two years from our last contact'
export const EXPORT_TOOL = false

/* The host, which LCEN requires by name, address and telephone.
 *
 * Verified 10 Sep 2026 against Netlify's own Terms of Use, section 14, rather
 * than taken from another site's mentions légales: a search turned up four
 * different Netlify addresses in circulation (44 Montgomery St, 2325 3rd St,
 * 512 2nd St and this one), because the company has moved and other people's
 * legal notices have copied whichever was current when they wrote them. The
 * primary source is the only one worth trusting.
 * https://www.netlify.com/legal/terms-of-use/
 *
 * If the site ever moves off Netlify, this block moves with it. */
export const HOST = {
  name: 'Netlify, Inc.',
  address: '101 2nd Street, San Francisco, CA 94105-2239, United States',
  url: 'https://www.netlify.com',
}

/* True only when every fact a public legal page asserts is present. */
export const IDENTITY_READY =
  SIREN !== null && ADDRESS !== null && PHONE !== null && VAT !== null
