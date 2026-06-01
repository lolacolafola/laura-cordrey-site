import { useEffect } from 'react'

// Sets <title>, meta description, canonical, OG tags, and (optional) JSON-LD
// for the active route. Cleans up JSON-LD on unmount so we don't leak schema
// blocks when navigating between pages.
export default function useDocumentMeta({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'article',
  jsonLd,
} = {}) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    const setMeta = (selector, attr, value) => {
      if (value == null) return null
      let el = document.head.querySelector(selector)
      const created = !el
      if (!el) {
        el = document.createElement('meta')
        const [, key, name] = selector.match(/\[(.+?)="(.+?)"\]/) || []
        if (key && name) el.setAttribute(key, name)
        document.head.appendChild(el)
      }
      const prev = el.getAttribute(attr)
      el.setAttribute(attr, value)
      return { el, prev, created }
    }

    const setLink = (rel, href) => {
      if (!href) return null
      let el = document.head.querySelector(`link[rel="${rel}"]`)
      const created = !el
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      const prev = el.getAttribute('href')
      el.setAttribute('href', href)
      return { el, prev, created }
    }

    const tracked = [
      setMeta('meta[name="description"]', 'content', description),
      setMeta('meta[property="og:title"]', 'content', title),
      setMeta('meta[property="og:description"]', 'content', description),
      setMeta('meta[property="og:type"]', 'content', ogType),
      setMeta('meta[property="og:url"]', 'content', canonical),
      setMeta('meta[property="og:image"]', 'content', ogImage),
      setMeta('meta[name="twitter:card"]', 'content', ogImage ? 'summary_large_image' : 'summary'),
      setMeta('meta[name="twitter:title"]', 'content', title),
      setMeta('meta[name="twitter:description"]', 'content', description),
      setMeta('meta[name="twitter:image"]', 'content', ogImage),
      setLink('canonical', canonical),
    ].filter(Boolean)

    let jsonLdEl = null
    if (jsonLd) {
      jsonLdEl = document.createElement('script')
      jsonLdEl.type = 'application/ld+json'
      jsonLdEl.dataset.routeJsonLd = 'true'
      jsonLdEl.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(jsonLdEl)
    }

    return () => {
      document.title = prevTitle
      tracked.forEach((t) => {
        if (!t) return
        if (t.created) {
          t.el.parentNode?.removeChild(t.el)
        } else if (t.prev != null) {
          if (t.el.tagName === 'LINK') t.el.setAttribute('href', t.prev)
          else t.el.setAttribute('content', t.prev)
        }
      })
      if (jsonLdEl) jsonLdEl.parentNode?.removeChild(jsonLdEl)
    }
  }, [title, description, canonical, ogImage, ogType, JSON.stringify(jsonLd)])
}
