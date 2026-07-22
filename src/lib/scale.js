// Shared page scale — the "lighter rebuild" type system.
//
// Extracted from HomePage.jsx on 22 Jul 2026. It had been copy-pasted into
// FanLedGrowthPage.jsx, and the copy drifted: FLG's `h1` silently held the
// `h2close` value, so that page opened at section volume with no hierarchy
// release. Worse, a round of homepage breathing-room work (22 Jul) could not
// reach it, because the values it tuned lived in a duplicate.
//
// Anything tuned here now reaches every page that imports it. If you are about
// to paste this block into a new page, import it instead.
//
// The rationale for the values themselves lives in the HomePage.jsx header
// comment: headings at 700 not 800, and a hero-to-section ratio near 2x so
// sections genuinely recede and the eye gets somewhere to rest.

export const HEAD_W = 700

export const T = {
  h1: 'clamp(2.8rem, 6.6vw, 5.25rem)',    // ~84px at 1280
  h2: 'clamp(1.8rem, 3.2vw, 2.75rem)',    // ~44px at 1280
  h2close: 'clamp(2.4rem, 5vw, 3.75rem)', // the close still gets to shout
  h3: 'clamp(1.15rem, 1.6vw, 1.4rem)',
  lede: 'clamp(1.05rem, 1.3vw, 1.22rem)',
  body: 'clamp(.95rem, 1.05vw, 1.04rem)',
  marker: '.74rem',
}

export const SECTION_PAD = 'clamp(64px, 7.5vw, 108px) clamp(20px, 5vw, 64px)'

export const INNER = { maxWidth: 1180, margin: '0 auto', width: '100%' }

// Card grids are capped narrower than INNER and centred, so a row of cards is
// never the widest element on the page. Set on the homepage work cards (960)
// and tools grid (940) on 22 Jul; the cards read in step with the page rather
// than out-weighing the copy they support.
//
// Longhand margins on purpose: a `margin: '0 auto'` shorthand in here would
// silently clobber a `marginTop` set alongside it at the call site, because
// React writes both and the shorthand resets the other edges.
export const GRID_CAP = { maxWidth: 960, marginLeft: 'auto', marginRight: 'auto' }
