// Speaking + produced data — shared across pages.
//
// speakingSections powers /speaking (curated flagship clips per format —
// one per section, deliberately tight so the page reads as a booking
// pitch, not an archive).
//
// producedSections powers /produced (the video reel — scripts / storyboards
// / voice work). Not linked from top nav; footer + inline pointer only.
//
// featuredSpeaking (below) is a derived trio for the AboutPage teaser.
//
// Card fields (used by both):
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
        start: 335, // Laura's segment starts at 5:35 in the full E3 video
        venue: 'Ubisoft · Ghost Recon Breakpoint · E3 2019',
        headline: 'Live stage unveil',
        detail:
          'Delta Company revealed live on the E3 stage to millions of viewers.',
      },
    ],
  },
  {
    key: 'studio',
    title: 'Studio',
    eyebrow: 'On camera, produced',
    clips: [
      {
        youtube: 'P2NYC5cQIZA',
        venue: 'Ubisoft · Ghost Recon Breakpoint',
        headline: 'World-premiere announce',
        detail: 'On camera as part of the core team on the global announce.',
      },
    ],
  },
  {
    key: 'live',
    title: 'Live',
    eyebrow: 'On air, no second takes',
    clips: [
      {
        youtube: 'ufsGn7eXY3k',
        start: 3592,
        venue: 'Xbox · Ghost Recon Wildlands · Inside Xbox',
        headline: 'Live TV interview',
        detail: 'Live on camera in Seattle for a Ghost Recon content update.',
      },
    ],
  },
  // The `livestream` section (Ga1VpVtXQsM, "Release-day community stream")
  // was removed on 22 Jul 2026. Laura: "the livestream video doesn't need to
  // be shown, it's not my best." It was the third of three tiles on
  // /speaking's on-stage strand, so the slot went to the World-premiere
  // announce below, which had been sitting in the data unshown.
]

// producedSections — the /produced page. Two strands: Range (work outside
// the Ubisoft/Ghost Recon world) and Depth (three years running the
// Ghost Recon franchise's fan-facing content end to end).
export const producedSections = [
  {
    key: 'range',
    title: 'Range',
    eyebrow: 'Beyond the franchise',
    intro: 'Produced work for clients outside gaming and adjacent to it.',
    clips: [
      {
        youtube: 'RsimGZVWlsU',
        venue: 'US Mobile · 2024 · non-gaming client',
        headline: 'Claw, the Mint parody',
        detail:
          'A stunt brand campaign for US Mobile. Fake Hugh Jackman, viral cut, 55% watched past 15 seconds.',
        kicker: 'Viral · Produced · creative',
      },
      {
        youtube: '34AzFfo7C6E',
        venue: 'Azarus · used across product, sales & marketing',
        headline: 'How Azarus works',
        detail:
          'Explainer for a gamified ad platform. I produced and voiced it, walking advertisers through the format.',
        kicker: 'Adtech · Produced · on camera',
      },
    ],
  },
  {
    key: 'depth',
    title: 'Depth',
    eyebrow: 'Ghost Recon, end to end',
    intro:
      'Three years producing and voicing the fan-facing content for a AAA franchise. Script, storyboard, frames, voice, edit.',
    clips: [
      {
        youtube: 'XiIiqCktG2g',
        venue: 'Breakpoint · storyboard to edit',
        headline: 'Delta Company announce',
        detail:
          'Produced end to end: storyboard, script, frames, assets, edit. On camera as presenter.',
        kicker: 'Produced end to end',
      },
      {
        youtube: 'F5g7fOzxGYY',
        venue: 'Breakpoint · the Ghost Experience',
        headline: 'A Community Journey',
        detail:
          'Behind-the-scenes documentary on the Ghost Experience update. Produced and on camera.',
        kicker: 'Documentary · on camera',
      },
      {
        youtube: 'bSeCQshpJVY',
        venue: 'Wildlands · community moments',
        headline: 'First-anniversary recap',
        detail: 'Community-moments compilation. Produced, voiced, on camera.',
        kicker: 'Produced & voiced',
      },
    ],
  },
]

// Derived trio for the AboutPage teaser gallery.
//
// Order is explicit rather than a .filter() over speakingSections, because a
// filter returns source order and the order here is a deliberate editorial
// call: Laura asked on 22 Jul 2026 for Inside Xbox and the announce to swap,
// so the live TV moment sits second and the announce closes the row.
// Changing the order of speakingSections must not silently re-order this.
const FEATURED_KEYS = ['stage', 'live', 'studio']
export const featuredSpeaking = FEATURED_KEYS.map((k) => {
  const s = speakingSections.find((x) => x.key === k)
  return { ...s.clips[0], format: s.title }
})

// Voice over example — a video Laura made for another company.
export const voiceOverExample = {
  youtube: null,
  title: 'Voice over example',
  detail:
    'A brand film I narrated for another company. Native English, fluent French. Recorded studio or remote.',
}

// Text-only list of appearances beyond the videos above.
// The "Selected appearances" table below the video tiles. Deliberately
// excludes Inside Xbox — that's the "Live TV interview" tile on the
// on-stage strand, and duplicating it here would read as filler. E3 stays
// in because Laura wants Los Angeles named as a stop on the tour, even
// though Delta Company is also the flagship video above.
export const appearances = [
  { event: 'Walmart · Target · GameStop & more', context: 'Retail buy-in pitches ahead of Ghost Recon Breakpoint launch · Montreal', year: '2018' },
  { event: 'Ghost Recon Breakpoint · World Premiere', context: 'Global announce livestream · core presentation team', year: '2019' },
  { event: 'E3 · Ubisoft Press Conference', context: 'Live stage · Delta Company global unveil · Los Angeles', year: '2019' },
  { event: 'Ubisoft spokesperson · Ghost Recon Breakpoint press tour', context: 'Press appearances and interviews · international', year: '2019' },
  { event: 'Sales team onboarding · San Diego', context: 'Ghost Recon Breakpoint storytelling and live demo for the sales team', year: '2019' },
  { event: 'Ubisoft community events · Sydney, London, Santiago, Paris', context: 'On-stage community presentations alongside local fan events', year: '2019' },
]
