// Speaking data — shared between AboutPage (teaser) and SpeakingPage
// (full reel). Edit YouTube IDs and captions here; both pages pick them up.

// Featured 3 — one per format. About page shows these as a teaser
// gallery; SpeakingPage uses them as the hero reel.
export const featuredSpeaking = [
  {
    format: 'Stage',
    youtube: 'P2tOLL_sAYk',
    headline: 'Live stage presentation',
    venue: 'E3 2019 · Ubisoft press conference · Los Angeles',
    detail:
      'I designed Delta&nbsp;Company, a <mark>first-of-its-kind community advocacy program</mark> at Ubisoft, and unveiled it live on the E3 stage to millions of viewers. Go-big-or-go-home launch strategy, executed on the biggest stage in gaming.',
  },
  {
    format: 'Studio',
    youtube: 'ufsGn7eXY3k',
    headline: 'Live studio interview',
    venue: 'Inside Xbox · Seattle',
    detail:
      'I travelled to Seattle for a live <strong>Inside Xbox</strong> segment to detail a new content update for Ghost&nbsp;Recon Wildlands. On-camera, live, no second takes.',
  },
  {
    format: 'Livestream',
    youtube: 'P2NYC5cQIZA',
    headline: 'Livestream I produced',
    venue: 'Ghost Recon Breakpoint · World-premiere announce',
    detail:
      'Part of the core team to present <strong>Ghost Recon Breakpoint</strong> in the world-premiere announce livestream. The launch moment that opened the franchise to a new generation of fans.',
  },
]

// Spokesperson reel — additional on-camera clips. Drop YouTube IDs in
// as they become available.
export const spokespersonReel = [
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
]

// Videos Laura produced AND spoke on (both roles, same project).
export const producedSpokeOn = [
  { youtube: null, caption: 'Produced & narrated · TBD' },
  { youtube: null, caption: 'Produced & narrated · TBD' },
  { youtube: null, caption: 'Produced & narrated · TBD' },
]

// Voice over example — a video Laura made for another company.
export const voiceOverExample = {
  youtube: null,
  title: 'Voice over example',
  detail:
    'A brand film I narrated for another company. Native English, fluent French. Recorded studio or remote.',
}

// Text-only list of appearances beyond the 3 featured clips. Add more
// here freely.
export const appearances = [
  { event: 'E3 2019 · Ubisoft Press Conference', context: 'Live stage · Delta Company global unveil · 10M+ viewers', year: '2019' },
  { event: 'Inside Xbox', context: 'Live TV interview · Ghost Recon Wildlands content drop', year: '2019' },
  { event: 'Ghost Recon Breakpoint · World Premiere', context: 'Global announce livestream · core presentation team', year: '2019' },
  { event: 'PlayStation Showcase appearances', context: 'On-camera segments · franchise updates', year: '2018–2021' },
  { event: 'Walmart · Target · GameStop pitches', context: 'Retail buy-in pitches for Ubisoft franchises', year: '2018–2021' },
  { event: 'R6 Siege Champions Program reveal', context: 'Community livestream host · 150+ creator program launch', year: '2021' },
  { event: 'Assassin’s Creed advocacy program', context: 'Community-facing presentations · brand updates', year: '2020' },
  { event: 'Ubisoft brand spokesperson', context: '20+ global press, TV and live events across 4 years', year: '2018–2022' },
]
