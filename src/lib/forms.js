// Shared form backend config — Netlify Forms.
//
// Submissions POST to '/' as application/x-www-form-urlencoded with a
// `form-name` field. The form names + fields are registered at deploy time
// by the hidden static forms in index.html ("contact" and "fan-score");
// fields not registered there are silently dropped by Netlify, so keep
// index.html in sync with anything submitted here.
// Submissions land in the Netlify dashboard under Site → Forms.
export const FORM_ENDPOINT = '/'

// Serialize a flat payload object for Netlify (urlencoded, form-name first).
export function encodeNetlifyForm(formName, payload) {
  const params = new URLSearchParams()
  params.append('form-name', formName)
  for (const [k, v] of Object.entries(payload)) {
    if (v !== undefined && v !== null) params.append(k, String(v))
  }
  return params.toString()
}

// Fire-and-forget lead delivery. Never blocks or breaks the visitor's flow:
// failures are swallowed (the visitor still gets their result).
// `payload.form` selects the registered Netlify form (Fan Score passes
// form: 'fan-score'); the rest of the payload goes through as fields.
export function postLead(payload) {
  try {
    const { form = 'fan-score', ...fields } = payload
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeNetlifyForm(form, fields),
    }).catch(() => {})
  } catch {
    /* no-op */
  }
}
