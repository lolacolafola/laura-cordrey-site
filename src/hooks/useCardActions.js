import { useCallback, useRef, useState } from 'react'

// Bundled, not fetched: the enforcing CSP in public/_headers allows scripts from
// 'self' only, so a CDN <script> injection is blocked in production. Lazy so the
// initial page load still doesn't pay for it.
function loadHtml2Canvas() {
  return import('html2canvas').then((m) => m.default)
}

/* Download and share for a result card, shared by both Fan Score editions so
 * the two never drift apart.
 *
 * Returns:
 *   download  — save the PNG. Throws nothing; sets `error` instead.
 *   downloadCard — same, but throws, so a caller can tell success from failure
 *                  (the result-page contact form needs to report accurately).
 *   share     — native share sheet where it is supported, otherwise save the
 *               image and copy the page URL.
 *   busy, note, error — UI state.
 *
 * The share control is always rendered, never hidden and never inert: where
 * navigator.share cannot take a file, it still does something useful and says
 * which. LinkedIn is deliberately absent — its share URL accepts a link, never
 * an attached image, so a "share to LinkedIn" button could not post the card
 * and would be a promise the page cannot keep.
 */
export default function useCardActions(cardRef, filename) {
  const [error, setError] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)

  const renderCanvas = useCallback(async () => {
    const h2c = await loadHtml2Canvas()
    if (!h2c) throw new Error('html2canvas unavailable')
    if (!cardRef.current) throw new Error('card not mounted')
    return h2c(cardRef.current, { backgroundColor: null, scale: 2, logging: false })
  }, [cardRef])

  // Throws on failure, so callers that need to know can catch.
  const downloadCard = useCallback(async () => {
    const canvas = await renderCanvas()
    const a = document.createElement('a')
    a.download = filename
    a.href = canvas.toDataURL('image/png')
    a.click()
  }, [renderCanvas, filename])

  const download = useCallback(async () => {
    setError(''); setNote('')
    try {
      await downloadCard()
    } catch {
      setError('Could not generate the image. Screenshot the card to share it.')
    }
  }, [downloadCard])

  const share = useCallback(async () => {
    if (busyRef.current) return
    busyRef.current = true
    setBusy(true)
    setError(''); setNote('')

    let file
    try {
      const canvas = await renderCanvas()
      const blob = await new Promise((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('no blob'))), 'image/png')
      })
      file = new File([blob], filename, { type: 'image/png' })
    } catch {
      setError('Could not generate the image. Screenshot the card to share it.')
      busyRef.current = false; setBusy(false)
      return
    }

    // Feature detect properly: navigator.share exists on some desktop browsers
    // that cannot take files, so canShare({ files }) is the real gate.
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file] })
        busyRef.current = false; setBusy(false)
        return // the sheet is its own confirmation
      } catch (err) {
        // Cancelling the sheet is not a failure, and must not silently trigger
        // the fallback download the visitor just backed out of.
        if (err && err.name === 'AbortError') {
          busyRef.current = false; setBusy(false)
          return
        }
        // Anything else: fall through and do the useful thing instead.
      }
    }

    const a = document.createElement('a')
    a.download = filename
    a.href = URL.createObjectURL(file)
    a.click()
    URL.revokeObjectURL(a.href)

    let copied
    try {
      await navigator.clipboard.writeText(window.location.href)
      copied = true
    } catch {
      copied = false
    }
    setNote(copied ? 'Card saved. Link copied.' : 'Card saved.')
    busyRef.current = false; setBusy(false)
  }, [renderCanvas, filename])

  return { download, downloadCard, share, busy, note, error }
}
