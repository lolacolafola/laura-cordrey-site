// Speaking data — shared between AboutPage (teaser) and SpeakingPage
// (full reel). Edit YouTube IDs and captions here; both pages pick them up.
//
// Card pattern (matches .work-card on Home/Work):
//   venue    → brand · project chip above the headline (marker style)
//   headline → deliverable / format name (display type)
//   detail   → short 1-2 line hook, no flouncy language

export const speakingSections = [
  {
    key: 'stage',
    title: 'Stage',
    eyebrow: 'Live keynote',
    clips: [
      {
        youtube: 'P2tOLL_sAYk',
        venue: 'Ubisoft · Ghost Recon Breakpoint · E3 2019',
        headline: 'Live stage unveil',
        detail:
          'Delta Company revealed live on the E3 stage to millions of viewers.',
      },
    ],
  },
  {
    key: 'studio',
    title: 'Studio & TV',
    eyebrow: 'On camera, broadcast',
    clips: [
      {
        youtube: 'ufsGn7eXY3k',
        venue: 'Xbox · Ghost Recon Wildlands · Inside Xbox',
        headline: 'Live TV interview',
        detail: 'On camera in Seattle for a content update. Live, no second takes.',
      },
      {
        youtube: 'G3WB7DDHLTE',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'PvP behind-the-scenes',
        detail: 'On camera alongside the dev team. Produced by Ubisoft PR.',
      },
    ],
  },
  {
    key: 'livestream',
    title: 'Livestream',
    eyebrow: 'I host',
    clips: [
      {
        youtube: 'P2NYC5cQIZA',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'World-premiere announce',
        detail: 'Part of the core team on the global announce livestream.',
      },
      {
        youtube: 'Ga1VpVtXQsM',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'Release-day community stream',
        detail:
          'I hosted. Live demos and a PvP match with the Delta Company crew.',
      },
    ],
  },
  {
    key: 'produced',
    title: 'Produced & voiced',
    eyebrow: 'Both sides of the camera',
    clips: [
      {
        youtube: 'XiIiqCktG2g',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'Delta Company announcement video',
        detail:
          'Produced end-to-end: storyboard, script, frames, assets, edit. Presented on camera.',
      },
      {
        youtube: 'bSeCQshpJVY',
        venue: 'Ubisoft · Ghost Recon Wildlands',
        headline: 'First-anniversary recap',
        detail: 'Community-moments compilation. Produced and voiced.',
      },
      {
        youtube: 'F5g7fOzxGYY',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'A Community Journey to the Ghost Experience',
        detail:
          'Behind-the-scenes documentary on the Ghost Experience update. Produced and on camera.',
      },
      {
        youtube: '34AzFfo7C6E',
        venue: 'Azarus · Game ad platform',
        headline: 'How-It-Works explainer',
        detail:
          'Walks advertisers through Azarus’s gamified ad format. Used across product, sales and marketing.',
      },
    ],
  },
]

// Derived: first clip from Stage / Studio / Livestream — used by
// AboutPage as the 3-up teaser gallery.
export const featuredSpeaking = speakingSections
  .filter((s) => ['stage', 'studio', 'livestream'].includes(s.key))
  .map((s) => ({ ...s.clips[0], format: s.title }))

// Voice over example — a video Laura made for another company.
export const voiceOverExample = {
  youtube: null,
  title: 'Voice over example',
  detail:
    'A brand film I narrated for another company. Native English, fluent French. Recorded studio or remote.',
}

// Text-only list of appearances beyond the videos above.
export const appearances = [
  { event: 'Inside Xbox', context: 'Live TV interview · Ghost Recon Wildlands content drop', year: '2018' },
  { event: 'Walmart · Target · GameStop & more', context: 'Retail buy-in pitches ahead of Ghost Recon Breakpoint launch · Montreal', year: '2018' },
  { event: 'E3 2019 · Ubisoft Press Conference', context: 'Live stage · Delta Company global unveil', year: '2019' },
  { event: 'Ghost Recon Breakpoint · World Premiere', context: 'Global announce livestream · core presentation team', year: '2019' },
  { event: 'Sales team onboarding · San Diego', context: 'Ghost Recon Breakpoint storytelling and live demo for the sales team', year: '2019' },
  { event: 'Ubisoft community events · Sydney, London, Santiago, Paris', context: 'On-stage community presentations alongside local fan events', year: '2019' },
]
