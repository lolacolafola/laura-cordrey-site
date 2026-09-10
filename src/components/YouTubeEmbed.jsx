import { useState } from 'react'
import './YouTubeEmbed.css'

/* Click-to-load YouTube. Added 10 Sep 2026.
 *
 * WHY THIS EXISTS, and it is not performance. A plain <iframe src="youtube.com
 * /embed/…"> contacts Google and lets YouTube set its cookies as soon as the
 * frame loads. `loading="lazy"` only delays that until the video nears the
 * viewport: it is the reader SCROLLING that triggers it, not any choice they
 * make. Under ePrivacy and the CNIL's reading, those are non-essential
 * third-party cookies being set without prior consent, which is the thing a
 * cookie banner exists to obtain.
 *
 * Rendering a thumbnail until someone clicks means no contact with Google at
 * all until a deliberate act. No cookies are set on a passive page view, so
 * there is nothing to ask consent for, so the site needs no banner. That is the
 * whole point: this component is what keeps a consent banner off the site.
 *
 * The site already did this on /speaking and /about, which each grew their own
 * version. The case study pages were the ones still loading on scroll, and they
 * are where the videos actually live. This is the shared version; those two
 * still have their own and can be moved onto it whenever they are next touched.
 *
 * Only the thumbnail comes from Google before a click, from i.ytimg.com, which
 * is a static image CDN and already allowed in the img-src of public/_headers.
 * `referrerPolicy="no-referrer"` keeps the page URL out of that request.
 *
 * Hover honesty (CLAUDE.md): the poster is a <button> and clicking it does the
 * thing the play triangle promises. */

const idFrom = (embed) => {
  // Accepts a full embed URL and returns the bare id, keeping any params
  // (start=, rel=) so a clip that begins partway through still does.
  const m = String(embed).match(/\/embed\/([^?&/]+)(\?.*)?/)
  return m ? { id: m[1], params: m[2] || '' } : null
}

export default function YouTubeEmbed({ embed, title, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)
  const parsed = idFrom(embed)

  // An embed URL we cannot parse falls back to the old direct iframe rather
  // than rendering nothing. A missing video is a worse failure than a cookie.
  if (!parsed) {
    return (
      <iframe
        src={embed}
        title={title || ''}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    )
  }

  const { id, params } = parsed

  if (playing) {
    const sep = params ? '&' : '?'
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}${params}${sep}autoplay=1&rel=0&modestbranding=1`}
        title={title || ''}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      className={`ytf ${className}`.trim()}
      onClick={() => setPlaying(true)}
      aria-label={title ? `Play video: ${title}` : 'Play video'}
    >
      {/* maxresdefault does not exist for every video and 404s to a grey
        * placeholder, so a failure falls back to hqdefault, which always
        * exists. alt is empty on purpose: the figcaption beside it carries the
        * meaning, and the button's aria-label already names the video, so alt
        * text here would be read out twice. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/${thumbFailed ? 'hqdefault' : 'maxresdefault'}.jpg`}
        onError={() => setThumbFailed(true)}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <span className="ytf__play" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  )
}
