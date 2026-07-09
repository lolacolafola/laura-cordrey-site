// Shared form backend config.
//
// Create a form at https://formspree.io (free tier is fine), then replace
// YOUR_FORM_ID with the ID Formspree gives you (e.g. 'mgvyzabc').
// Every submission on the site (contact form, Fan Score leads) delivers to
// the inbox you configure in the Formspree dashboard.
export const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

// Fire-and-forget lead delivery. Never blocks or breaks the visitor's flow:
// failures are swallowed (the visitor still gets their result).
export function postLead(payload) {
  try {
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {})
  } catch {
    /* no-op */
  }
}
