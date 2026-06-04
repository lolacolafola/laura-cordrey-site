// Single source of truth for case studies.
// Used by HomePage teasers, the /case-studies index, and /case-studies/:slug articles.
//
// Per study:
//   media.image    — article hero image (in /public). Brand logo banner for now.
//   media.imageAlt — descriptive alt text (include client + scene for SEO)
//   media.heroBackground — set to 'white' for logos-on-bone treatment.
//
//   media.cardImage / cardImageAlt — default thumbnail used by WorkCard on any
//     page where no slot-specific override is set.
//   media.homeImage / homeImageAlt — homepage-grid-specific thumbnail.
//   media.workImage / workImageAlt — /work-index-specific thumbnail.
//     Cascade in WorkCard: slot-specific → cardImage → image.
//
//   media.youtube  — YouTube video ID (not full URL). Renders as click-to-play with VideoObject schema.
//   media.videoTitle / videoDescription — for VideoObject schema
//   year           — visible in editorial byline + freshness signal
//   role           — your role in the masthead strip
//   accent         — hex used for kicker/divider per study (keeps each spread distinct)

const caseStudies = [
  {
    id: 'ubisoft-delta-company',
    company: 'Ubisoft · Delta Company',
    headline: 'First-of-its-kind community program',
    hook: 'First-of-its-kind community advocacy program. Unveiled live on the E3 stage.',
    tldr: 'I designed and launched Delta Company — a first-of-its-kind community advocacy program at Ubisoft. Unveiled live on the E3 2019 stage. 5 community clusters, 14 languages, 130 invited members, 60M+ UGC reach.',
    year: '2019–2020',
    role: 'International Community Developer',
    accent: '#4A5D3F',
    sectors: ['Gaming'],
    tags: ['Community Programs', 'Advocacy', 'Brand', 'Live Launch'],
    stats: [
      { value: '5',    label: 'Community clusters' },
      { value: '14',   label: 'Languages' },
      { value: '130',  label: 'Spots available' },
      { value: '10M+', label: 'UGC views from program members' },
    ],
    challenge: 'Ubisoft’s Ghost Recon community had millions of players but no system to deepen the relationship with the studio.',
    approach: 'Built Delta Company — a first-of-its-kind community advocacy program structured around 5 community clusters (creators, artists, cosplayers, feedback specialists, tournament players). Designed the brand with the internal Ghost Recon Breakpoint design team and Diana Da Costa. Commissioned a dedicated website in 14 languages with custom application back-end. Produced a How-it-Works recruitment video. Unveiled live on the UbiE3 2019 stage with Takeoff agency assets. Shipped a members-only goodie box and in-game customisations.',
    takeaway: '10M+ UGC views from program members alone — from just 130 people. A continuous stream of considered, educated content showing Studio and community in real partnership. The kind of distribution money cannot buy. The program became the blueprint for Ubisoft’s subsequent community programs across multiple franchises.',
    media: {
      image: 'case-studies/delta/01-delta-badge-hero.png',
      imageAlt: 'Delta Company badge on a Ghost Recon Breakpoint backdrop — the brand mark Laura designed for the first-of-its-kind community advocacy program at Ubisoft',
      youtube: 'F5g7fOzxGYY',
      videoTitle: 'UbiE3 2019 — Community segment + Delta Company reveal',
      videoDescription: 'The full Ghost Recon community segment where Laura unveiled Delta Company live on the UbiE3 2019 stage.',
    },
  },
  {
    id: 'ubisoft-siege-champions',
    company: 'Ubisoft \u00b7 Siege Champions',
    headline: '50M+ UGC views, $0 spend',
    hook: 'My community advocacy playbook, scaled to creators. 50M+ UGC views, zero media spend.',
    tldr: 'I scaled Ubisoft\u2019s community advocacy model into an invite-only creator program for Rainbow Six Siege \u2014 200 members across 18 markets, <mark>50M+ UGC views in year one</mark>, $0 media spend.',
    year: '2020\u20132021',
    role: 'Sr. Community Engagement Manager',
    accent: '#7CBCC9',
    sectors: ['Gaming'],
    tags: ['Creator Programs', 'Community', 'AAA Gaming'],
    stats: [
      { value: '50M+', label: 'UGC views, year one' },
      { value: '200',  label: 'Invite-only members' },
      { value: '18',   label: 'Markets' },
      { value: '$0',   label: 'Media spend' },
    ],
    media: {
      // Single source of truth \u2014 hero and card image.
      // Official program banner: wordmark on dark cinematic backdrop.
      // Official Siege Champions Program key art (two operators in
      // program skins with the program logo + vivid spray backdrop).
      image: 'case-studies/ubisoft-siege-champions-program-banner.png',
      imageAlt: 'Siege Champions Program \u2014 official key art with two operators in program skins, the SIEGE CHAMPIONS PROGRAM logo, and a vivid coloured-spray backdrop',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'us-mobile-dark-star',
    company: 'US Mobile · Dark Star',
    headline: '$32K revenue in 3 hours',
    hook: 'Fans paid $129 for a limited-edition bundle. Sold out in three hours.',
    tldr: 'I designed a $129 VIP fan bundle and launched the gamified \u201cClaw Mobile\u201d brand campaign at US Mobile \u2014 generating <mark>$32K in revenue in three hours</mark> and reducing CAC by 38%.',
    year: '2024',
    role: 'Fractional Growth & Community Lead',
    accent: '#4BBFB0',
    sectors: ['Telco'],
    tags: ['Revenue', 'Gamification', 'PLG'],
    stats: [
      { value: '$32K', label: 'Sales in 3 hrs' },
      { value: '250', label: 'VIP bundles \u2014 sold out' },
      { value: '80%', label: 'Pre-launch email open rate' },
      { value: '35%', label: 'Pre-launch email CTOR' },
    ],
    challenge:
      '$54M ARR, 200K subs, 100% YoY growth \u2014 but the flagship SIM Kit was being given away for free. As Head of Community, I saw the chance to turn it into core-community money: package the kit as a limited-edition bundle around the Dark Star launch and prove fans would pay.',
      approach:
      'I spotted the opportunity: the SIM kit was being given away for $0. I made the case to charge $129 for it as a limited-edition VIP Early Access Bundle around the Dark Star launch \u2014 limited-edition SIM kit, two-week early access, free 12-month QCI 8 upgrade, exclusive in-app network badge, a US Mobile \u00D7 The North Face\u00AE fleece with personalised initials, a signed letter and a 15-minute Zoom with the CEO. I built the gamified pre-launch funnel (50K+ visitor landing pages, an arcade-style email game that earned 80% open rate and 35% CTOR), then capped the run at 250 units (the CEO can only take so many Zoom calls). I also produced the Madison Avenue, New York launch event to bring the product moment to life IRL \u2014 200+ attendees including AT&T execs.',
    takeaway:
      'I closed $32.25K in three hours, sold out, 450+ Reddit comments and unprompted fan posts on X (\u201ccrazy there are only 250 of these\u201d). The CEO\u2019s \u201cwe are sold out, this is insane\u201d edit became its own marketing moment \u2014 and proved a community-first company can monetise its fans directly.',
    media: {
      // Single source of truth \u2014 doubles as article hero and card image.
      image: 'case-studies/us-mobile-dark-star-banner.png',
      imageAlt: 'Dark Star \u2014 US Mobile\u2019s premium plan banner, a moody black sphere on a starfield with the Dark Star wordmark, cinematic widescreen treatment',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
    gallery: [
      {
        src: 'case-studies/us-mobile-vip-bundle.png',
        alt: 'US Mobile Dark Star VIP Early Access Bundle \u2014 SIM kit + North Face fleece packshot',
        caption: 'The $129 Dark Star VIP Bundle I designed \u2014 limited-edition SIM kit, exclusive Dark Star fleece, $32K sold in three hours.',
      },
      {
        src: 'case-studies/us-mobile-dark-star.png',
        alt: 'US Mobile Dark Star launch teaser landing page with countdown timer',
        caption: 'The Dark Star teaser landing I shipped \u2014 the countdown that drove 50K+ pre-launch visitors.',
      },
      {
        src: 'case-studies/us-mobile-email-game.png',
        alt: 'US Mobile arcade-style pre-launch email game START screen',
        caption: 'The arcade-style pre-launch email game I built \u2014 80% open rate, 35% CTOR.',
      },
      {
        src: 'case-studies/us-mobile-vip-landing.png',
        alt: 'US Mobile $129 VIP Early Access Bundle landing page',
        caption: '$129 VIP Early Access Bundle landing page \u2014 capped at 250 units, sold out in 3 hours.',
      },
      {
        src: 'case-studies/us-mobile-stetson-tweet.png',
        alt: 'Stetson Doggett unboxing the US Mobile North Face quarter-zip fleece on X',
        caption: 'One of 450+ unprompted fan posts after launch. The bundle did the marketing.',
      },
    ],
  },
  {
    id: 'azarus',
    company: 'Azarus \u00b7 Streamer-led growth',
    headline: '500K viewers, 90% engagement, servers crashed',
    hook: 'Title-sponsored the inaugural Streamer Awards. Crashed our own servers.',
    tldr: 'I activated Azarus on streamers through three motions: a coordinated <mark>League of Legends launch campaign that drove +80% MAU growth</mark>, an always-on creator overlay across R6, Apex and Valorant at ~half industry CPC, and title sponsorship of the inaugural Streamer Awards \u2014 <mark>500K peak viewers, 90% engagement, 20% converted into members on the spot</mark>, servers crashed.',
    year: '2021\u20132022',
    role: 'Head of Growth',
    accent: '#A47BFF',
    sectors: ['Gaming', 'Web3'],
    tags: ['Streamer Programs', 'Live Event Sponsorship', 'Brand Activation', 'Interactive Creative'],
    stats: [
      { value: '500K', label: 'Peak concurrent viewers' },
      { value: '90%',  label: 'Live engagement rate' },
      { value: '20%',  label: 'Viewer \u2192 member conversion' },
      { value: '+80%', label: 'MAU growth (LoL launch)' },
    ],
    challenge:
      'A Twitch overlay product with reach but no proof of mass interactivity at scale. Azarus needed evidence that the format scaled \u2014 not stories that it worked \u2014 to unlock bigger brand deals, the gamified ad pivot, and a token launch. I had four months as Head of Growth to make the case.',
    approach:
      'I activated Azarus on streamers through three motions running in parallel. First, the expansion play: every new supported game (League of Legends, Valorant, Apex Legends) shipped with a coordinated streamer campaign \u2014 the LoL push alone drove +80% MAU growth. Second, the always-on engine: invite-only creator overlay partnerships across Rainbow Six Siege, LoL, Valorant and Apex (KingGeorge, lol_Nemesis, others) at ~$1.70 cost-per-viewer versus a $2.50\u2013$3.50 industry rate. Third, the big swing: I landed title sponsorship of the inaugural Streamer Awards (QTCinderella + Maya Higa, March 2022) and shipped a bespoke trivia overlay built for the broadcast \u2014 14 categories, ~65 nominee streamers, hundreds of fan-specific deep-cut questions, with a team member embedded in the production room firing live questions in real time. Two months later I ran the playbook again on Amouranth\u2019s channel for the Streamer Royale: different format, same engine, servers held.',
    takeaway:
      'Three motions, one engine, proven at scale. 500K viewers, 90% engaged, 20% converted on the Streamer Awards \u2014 servers crashed because we\u2019d built for the audience we expected, not the one that showed up. 4.4M total viewers reached across four months. Three principles: engagement is the thesis, conversion is the infrastructure (build ops for the upside); one playbook, three motions (live events for proof, always-on for retention, game-launch for expansion); custom mechanics per format beat generic overlays (sponsorship becomes co-production). The proof point unlocked the next chapter \u2014 the pivot to a gamified ad platform.',
    media: {
      image: 'case-studies/azarus.png',
      imageAlt: 'Azarus brand mark \u2014 the company where Laura activated streamer-led growth and title-sponsored the inaugural Streamer Awards',
      heroBackground: 'white',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'azarus-game-ads',
    company: 'Azarus · Ad platform',
    headline: 'Pivoted into a gamified ad platform, sold to Animoca',
    hook: 'Pivoted Azarus into a gamified ad platform. Acquired by Animoca Brands in October 2023.',
    tldr: 'I pivoted Azarus from a Twitch overlay product into a gamified advertising platform — designed the gamified ad format end-to-end, ran the Alpha and Beta with streamers from the community program I’d built, locked <mark>Ubisoft and Logitech as launch advertisers at $2 CPI</mark>, and led the $AZA token launch (Coinbase + Crypto.com listings). Azarus was acquired by Animoca Brands in October 2023.',
    year: '2022\u20132023',
    role: 'VP Marketing',
    accent: '#7C5BFF',
    sectors: ['Gaming', 'Web3'],
    tags: ['Product Pivot', 'Gamified Ads', 'Enterprise Sales', 'Token Launch', 'Web3'],
    stats: [
      { value: '$2',   label: 'CPI on launch campaigns' },
      { value: '2',    label: 'Brand advertisers (Ubisoft + Logitech)' },
      { value: '2',    label: 'Exchange listings ($AZA)' },
      { value: 'Acq.', label: 'Acquired by Animoca Brands \u00b7 Oct 2023' },
    ],
    challenge:
      'The Streamer Awards proved the engagement thesis at scale \u2014 but the Twitch-overlay format capped the addressable market. To grow into a business investors would back and brands would fund, Azarus needed a different surface, a different pricing model, and capital aligned with the people who made the platform work.',
    approach:
      'Funding-and-alignment first: we structured the $AZA token around a four-way value split \u2014 brands purchased AZA to run campaigns, allocated across streamers (creators), players (audience), Azarus (platform), and a community treasury (long-term incentives and governance). Turning every advertiser dollar into shared upside. Product next: I took ownership of game design and built the gamified ad format end-to-end \u2014 Livestream entry \u2192 Players Joining \u2192 Countdown \u2192 Question \u2192 Result \u2192 Star Award \u2192 AZA Tally \u2192 Brand Video \u2192 AzaCoin Collect \u2192 Audience Credits. We tested it through the September 2022 Azarus Alpha with streamers from the creator community I\u2019d built, then the Halloween Beta in October 2022. The pitch artefact: a fully-rendered mock campaign using Coca-Cola\u2019s brand identity as recognisable visual shorthand \u2014 not a real client, a proof of concept that let any advertiser see themselves in the format. It opened the door to the launch advertisers: Ubisoft signed for Brawlhalla (live on streamer Xenrichan, Nov 2022), Logitech signed in parallel (live on ElainaExe). Both hit $2 CPI \u2014 pricing benchmarked by our ex-Amazon sales team from Amazon\u2019s gaming-ad data, and described by one talent agency as "much higher than anything they have done in the past." Azarus was competing on quality at a premium price point, not on cost. In parallel I led the $AZA token launch end-to-end \u2014 brand, whitepaper, GTM, comms \u2014 and supported listings on Coinbase and Crypto.com. I also directed a full website redesign repositioning Azarus from "Twitch overlay" to "gamified engagement / Web3 platform", and supported the CEO on investor relations.',
    takeaway:
      'The engagement engine became a business. Brand advertisers at premium CPI. A tradeable token aligning streamers, players, platform and treasury with growth. Hundreds of thousands of active players. Acquired by Animoca Brands in October 2023. Three principles: earn the right to pivot (no Streamer Awards proof point, no advertiser conversation); premium pricing beats discount pricing if the format earns it ($2 CPI was higher than industry \u2014 brands paid because engagement justified it); token work is brand work, not crypto work (same product-launch playbook with regulatory care added).',
    media: {
      // Reusing the Azarus brand mark until pivot-specific assets land
      // (Brawlhalla / Logitech campaign screens, AzaCoin launch creative).
      image: 'case-studies/azarus.png',
      imageAlt: 'Azarus brand mark \u2014 the company where Laura led the pivot from Twitch overlay to gamified ad platform, locked Ubisoft and Logitech as launch advertisers at $2 CPI, launched $AZA, and saw Azarus acquired by Animoca Brands',
      heroBackground: 'white',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'blablacar-live-nation',
    company: 'BlaBlaCar \u00b7 Live Nation',
    headline: 'Live Nation Official Ridesharing Partner',
    hook: 'Live Nation\u2019s first ever Official Ridesharing Partner. Three festivals on the ground.',
    tldr: 'How I ran BlaBlaCar UK\u2019s partnerships with Live Nation as their <mark>first Official Ridesharing Partner</mark>: priority parking, on-site festival activation, and helping people get home across Latitude, Leeds and Reading.',
    year: '2013\u20132016',
    role: 'UK Community Manager',
    accent: '#F4B53A',
    sectors: ['Mobility'],
    tags: ['Partnerships', 'Brand Activation', 'Grassroots'],
    stats: [
      { value: '3', label: 'Major festivals' },
      { value: '300+', label: 'Branded parking spots' },
      { value: '20m\u00B2', label: 'On-site community tent' },
      { value: '1M', label: 'UK members (contributed)' },
    ],
    challenge:
      'The UK market had zero brand recognition for BlaBlaCar. We needed high-visibility, trust-building activations to reach a sceptical audience.',
    approach:
      'I secured Live Nation as Official Ridesharing Partner \u2014 unprecedented for a carpooling platform. Designed and ran the on-site presence end-to-end: 300+ branded parking spots and a 20m\u00B2 community tent across Latitude, Leeds and Reading, plus on-site activations and community meetups. I paired the festival footprint with grassroots CRM (35% open rate, 12% CTR, best in company at the time) and social community building.',
    takeaway:
      'I turned festivals into a trust-building channel that made carpooling feel culturally normal in the UK. The kind of work that doesn\u2019t show up in dashboards but changes how people feel about your brand.',
    media: {
      image: 'case-studies/blablacar-livenation-banner-yellow.png',
      imageAlt: 'BlaBlaCar \u00d7 Live Nation brand lockup on yellow',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'claw-mobile',
    company: 'US Mobile',
    headline: '55% made it past the hook',
    hook: 'A stunt brand campaign for US Mobile. Mint Mobile parody. A fake Hugh Jackman.',
    tldr: 'I produced \u201cClaw Mobile\u201d for US Mobile \u2014 a stunt brand campaign parodying Mint Mobile complete with a fake Hugh Jackman, a spoof blog and CEO reveal landing pages. On Meta, <mark>55% of viewers stuck past the 15-second mark</mark>. On Reddit, it generated its own organic traction.',
    year: '2024',
    role: 'Brand Campaign Producer',
    accent: '#FF6B5B',
    sectors: ['Telco'],
    tags: ['Brand Campaign', 'Stunt Creative', 'Cultural Moment'],
    stats: [
      { value: '55%', label: 'Video view-through rate (Meta)' },
      { value: '4', label: 'Films delivered' },
      { value: '1', label: 'Spoof network launched' },
      { value: '1', label: 'Fake Hugh Jackman' },
    ],
    challenge:
      'US Mobile needed a brand moment that could punch above its weight against incumbents like Mint Mobile \u2014 disruptor energy, not category playbook. The brief: make people talk, then make them switch.',
    approach:
      'I produced \u201cClaw Mobile\u201d with Luna agency end-to-end \u2014 a Mint Mobile parody where, instead of doing a normal celebrity endorsement for US Mobile, a fake Hugh Jackman hijacks the spot to launch his own competing network: \u201cClaw Mobile.\u201d I played fully into the bit: stood up a real Claw Mobile spoof site that lived the storyline in-world, then routed visitors to a custom landing page where the actual US Mobile CEO claps back at the fake Jackman\u2019s lame attempt \u2014 the moment of brand reveal. I worked the full production arc: script development, casting, the shoot, the granular post-production craft (edit, sound, colour, VFX), all the way to final delivery. I built the surrounding creative system around the film: paid social cuts, organic teaser drops, and a press angle designed for screenshot-ability.',
    takeaway:
      'On Meta, 55% of viewers stuck past the 15-second mark \u2014 the joke landed and the hook worked. Plus its own organic traction on Reddit. The kind of brand moment that gets shared, screenshotted, and remembered \u2014 proof that a challenger brand can make incumbents react instead of the other way around.',
    media: {
      // Logo kept as a fallback poster; YouTube hero takes precedence when set.
      image: 'case-studies/us-mobile.png',
      imageAlt: 'US Mobile brand mark \u2014 the company Laura produced the Claw Mobile stunt campaign for',
      heroBackground: 'white',
      youtube: 'bsLHDOlcgcY',
      videoTitle: 'Claw Mobile \u2014 the stunt film',
      videoDescription: 'The stunt brand film for US Mobile, parodying Mint Mobile.',
    },
    additionalVideos: [
      {
        id: 'O9IGCpzi6P4',
        title: 'Claw Mobile \u2014 backstage',
        caption: 'Backstage: the team regretting their decisions.',
      },
      {
        id: 'RsimGZVWlsU',
        title: 'Claw Mobile \u2014 supporting cut',
        caption: 'Supporting asset.',
      },
      {
        id: '9B6Ogshm5Ho',
        title: 'Claw Mobile \u2014 supporting cut',
        caption: 'Supporting asset.',
      },
    ],
  },
]

export default caseStudies
