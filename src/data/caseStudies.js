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
//
// ORDER: grouped by client, groups ordered by strength and recency.
// Opens on hard revenue (US Mobile), peaks on the Animoca acquisition
// (Azarus), closes on the earliest work (BlaBlaCar).

const caseStudies = [
  {
    id: 'us-mobile-dark-star',
    company: 'US Mobile · Dark Star',
    headline: '$32K revenue in under three hours',
    hook: 'Turned US Mobile’s free SIM kit into a $129 limited-edition fan bundle. Sold out in under three hours.',
    tldr: 'I designed a $129 VIP fan bundle and launched the gamified “Claw Mobile” brand campaign at US Mobile, generating <mark>$32K in revenue in under three hours</mark> and reducing CAC by 38%.',
    year: '2024',
    role: 'Fractional Growth & Community Lead',
    accent: '#4BBFB0',
    sectors: ['Telco'],
    tags: ['Revenue', 'Gamification', 'PLG'],
    stats: [
      { value: '$32K', label: 'Sales, under 3 hrs' },
      { value: '250', label: 'VIP bundles — sold out' },
      { value: '80%', label: 'Pre-launch email open rate' },
      { value: '35%', label: 'Pre-launch email CTOR' },
    ],
    challenge:
      '$54M ARR, 200K subs, 100% YoY growth, but the flagship SIM Kit was being given away for free. As Head of Community, I saw the chance to turn it into core-community money: package the kit as a limited-edition bundle around the Dark Star launch and prove fans would pay.',
      approach:
      'I spotted the opportunity: the SIM kit was being given away for $0. I made the case to charge $129 for it as a limited-edition VIP Early Access Bundle around the Dark Star launch: limited-edition SIM kit, two-week early access, free 12-month QCI 8 upgrade, exclusive in-app network badge, a US Mobile × The North Face® fleece with personalised initials, a signed letter and a 15-minute Zoom with the CEO. I built the gamified pre-launch funnel (50K+ visitor landing pages, an arcade-style email game that earned 80% open rate and 35% CTOR), then capped the run at 250 units (the CEO can only take so many Zoom calls). I also produced the Madison Avenue, New York launch event to bring the product moment to life IRL — 200+ attendees including AT&T execs.',
    takeaway:
      'I closed $32.25K in under three hours, sold out, 450+ Reddit comments and unprompted fan posts on X (“crazy there are only 250 of these”). The CEO’s “we are sold out, this is insane” edit became its own marketing moment, and proved a community-first company can monetise its fans directly.',
    media: {
      // Single source of truth — doubles as article hero and card image.
      image: 'case-studies/us-mobile-dark-star-banner.png',
      imageAlt: 'Dark Star — US Mobile’s premium plan banner, a moody black sphere on a starfield with the Dark Star wordmark, cinematic widescreen treatment',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
    gallery: [
      {
        src: 'case-studies/us-mobile-vip-bundle.png',
        alt: 'US Mobile Dark Star VIP Early Access Bundle — SIM kit + North Face fleece packshot',
        caption: 'The $129 Dark Star VIP Bundle I designed — limited-edition SIM kit, exclusive Dark Star fleece, $32K sold in three hours.',
      },
      {
        src: 'case-studies/us-mobile-dark-star.png',
        alt: 'US Mobile Dark Star launch teaser landing page with countdown timer',
        caption: 'The Dark Star teaser landing I shipped — the countdown that drove 50K+ pre-launch visitors.',
      },
      {
        src: 'case-studies/us-mobile-email-game.png',
        alt: 'US Mobile arcade-style pre-launch email game START screen',
        caption: 'The arcade-style pre-launch email game I built — 80% open rate, 35% CTOR.',
      },
      {
        src: 'case-studies/us-mobile-vip-landing.png',
        alt: 'US Mobile $129 VIP Early Access Bundle landing page',
        caption: '$129 VIP Early Access Bundle landing page — capped at 250 units, sold out in 3 hours.',
      },
      {
        src: 'case-studies/us-mobile-stetson-tweet.png',
        alt: 'Stetson Doggett unboxing the US Mobile North Face quarter-zip fleece on X',
        caption: 'One of 450+ unprompted fan posts after launch. The bundle did the marketing.',
      },
    ],
  },
  {
    id: 'claw-mobile',
    company: 'US Mobile · Claw Mobile',
    headline: '55% made it past the hook',
    hook: 'A stunt brand campaign for US Mobile. Mint Mobile parody, fake Hugh Jackman, 55% watched past 15 seconds.',
    tldr: 'I produced “Claw Mobile” for US Mobile: a stunt brand campaign parodying Mint Mobile complete with a fake Hugh Jackman, a spoof blog and CEO reveal landing pages. On Meta, <mark>55% of viewers stuck past the 15-second mark</mark>. On Reddit, it generated its own organic traction.',
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
      'US Mobile needed a brand moment that could punch above its weight against incumbents like Mint Mobile — disruptor energy, not category playbook. The brief: make people talk, then make them switch.',
    approach:
      'I produced “Claw Mobile” with Luna agency end-to-end — a Mint Mobile parody where, instead of doing a normal celebrity endorsement for US Mobile, a fake Hugh Jackman hijacks the spot to launch his own competing network: “Claw Mobile.” I played fully into the bit: stood up a real Claw Mobile spoof site that lived the storyline in-world, then routed visitors to a custom landing page where the actual US Mobile CEO claps back at the fake Jackman’s lame attempt — the moment of brand reveal. I worked the full production arc: script development, casting, the shoot, the granular post-production craft (edit, sound, colour, VFX), all the way to final delivery. I built the surrounding creative system around the film: paid social cuts, organic teaser drops, and a press angle designed for screenshot-ability.',
    takeaway:
      'On Meta, 55% of viewers stuck past the 15-second mark — the joke landed and the hook worked. Plus its own organic traction on Reddit. The kind of brand moment that gets shared, screenshotted, and remembered — proof that a challenger brand can make incumbents react instead of the other way around.',
    media: {
      // Card pulled from the Claw Mobile YouTube thumbnail
      // (https://i.ytimg.com/vi/bsLHDOlcgcY/maxresdefault.jpg) so the
      // hero + work card both show the fake-Hugh-Jackman stunt frame
      // instead of the US Mobile brand mark.
      image: 'case-studies/claw-mobile-card.jpg',
      imageAlt: 'Claw Mobile stunt film thumbnail — a fake Hugh Jackman with cardboard Wolverine claws and a wide-eyed expression in front of the Claw Mobile logo, with security tackling another version of the character on the right',
      youtube: 'bsLHDOlcgcY',
      videoTitle: 'Claw Mobile — the stunt film',
      videoDescription: 'The stunt brand film for US Mobile, parodying Mint Mobile.',
    },
    additionalVideos: [
      {
        id: 'O9IGCpzi6P4',
        title: 'Claw Mobile — backstage',
        caption: 'Backstage: the team regretting their decisions.',
      },
      {
        id: 'RsimGZVWlsU',
        title: 'Claw Mobile — supporting cut',
        caption: 'Supporting asset.',
      },
      {
        id: '9B6Ogshm5Ho',
        title: 'Claw Mobile — supporting cut',
        caption: 'Supporting asset.',
      },
    ],
  },
  {
    id: 'azarus',
    company: 'Azarus · Streamer-led growth',
    headline: '500K viewers, 90% engagement, servers crashed',
    hook: 'Title sponsorship of the first Streamer Awards. 500K viewers, 90% engagement, crashed our own servers.',
    tldr: 'I activated Azarus on streamers through three motions: a coordinated <mark>League of Legends launch campaign that drove +80% MAU growth</mark>, an always-on creator overlay across R6, Apex and Valorant at ~half industry CPC, and title sponsorship of the first Streamer Awards. <mark>500K peak viewers, 90% engagement, 20% converted into members on the spot</mark>, servers crashed.',
    year: '2021–2022',
    role: 'Head of Growth',
    accent: '#A47BFF',
    sectors: ['Gaming', 'Web3'],
    tags: ['Streamer Programs', 'Live Event Sponsorship', 'Brand Activation', 'Interactive Creative'],
    stats: [
      { value: '500K', label: 'Peak concurrent viewers' },
      { value: '90%',  label: 'Live engagement rate' },
      { value: '20%',  label: 'Viewer → member conversion' },
      { value: '+80%', label: 'MAU growth (LoL launch)' },
    ],
    challenge:
      'A Twitch overlay product with reach but no proof of mass interactivity at scale. Azarus needed evidence that the format scaled — not stories that it worked — to unlock bigger brand deals, the gamified ad pivot, and a token launch. I had four months as Head of Growth to make the case.',
    approach:
      'I activated Azarus on streamers through three motions running in parallel. First, the expansion play: every new supported game (League of Legends, Valorant, Apex Legends) shipped with a coordinated streamer campaign — the LoL push alone drove +80% MAU growth. Second, the always-on engine: invite-only creator overlay partnerships across Rainbow Six Siege, LoL, Valorant and Apex (KingGeorge, lol_Nemesis, others) at ~$1.70 cost-per-viewer versus a $2.50–$3.50 industry rate. Third, the big swing: I landed title sponsorship of the inaugural Streamer Awards (QTCinderella + Maya Higa, March 2022) and shipped a bespoke trivia overlay built for the broadcast — 14 categories, ~65 nominee streamers, hundreds of fan-specific deep-cut questions, with a team member embedded in the production room firing live questions in real time. Two months later I ran the playbook again on Amouranth’s channel for the Streamer Royale: different format, same engine, servers held.',
    takeaway:
      'Three motions, one engine, proven at scale. 500K viewers, 90% engaged, 20% converted on the Streamer Awards — servers crashed because we’d built for the audience we expected, not the one that showed up. 4.4M total viewers reached across four months. Three principles: engagement is the thesis, conversion is the infrastructure (build ops for the upside); one playbook, three motions (live events for proof, always-on for retention, game-launch for expansion); custom mechanics per format beat generic overlays (sponsorship becomes co-production). The proof point unlocked the next chapter — the pivot to a gamified ad platform.',
    media: {
      image: 'case-studies/azarus-streamer-awards-banner.png',
      imageAlt: 'The Streamer Awards official banner — art-deco gold-on-navy logo with the tagline “Recognize the best of live streaming” — the flagship event Azarus title-sponsored in March 2022',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'azarus-game-ads',
    company: 'Azarus · Game ad platform',
    headline: 'Pivoted into a gamified ad platform, sold to Animoca',
    hook: 'Pivoted Azarus into a gamified ad platform. Ubisoft and Logitech as launch advertisers; acquired by Animoca.',
    tldr: 'I pivoted Azarus from a Twitch overlay product into a gamified advertising platform: designed the gamified ad format end-to-end, ran the Alpha and Beta with streamers from the community program I’d built, locked <mark>Ubisoft and Logitech as launch advertisers at $2 CPI</mark>, and led the $AZA token launch (Coinbase + Crypto.com listings). Azarus was acquired by Animoca Brands in October 2023.',
    year: '2022–2023',
    role: 'VP Marketing',
    accent: '#7C5BFF',
    sectors: ['Gaming', 'Web3'],
    tags: ['Product Pivot', 'Gamified Ads', 'Enterprise Sales', 'Token Launch', 'Web3'],
    stats: [
      { value: '$2',   label: 'CPI on launch campaigns' },
      { value: '2',    label: 'Brand advertisers (Ubisoft + Logitech)' },
      { value: '2',    label: 'Exchange listings ($AZA)' },
      { value: 'Acq.', label: 'Acquired by Animoca Brands · Oct 2023' },
    ],
    challenge:
      'The Streamer Awards proved the engagement thesis at scale — but the Twitch-overlay format capped the addressable market. To grow into a business investors would back and brands would fund, Azarus needed a different surface, a different pricing model, and capital aligned with the people who made the platform work.',
    approach:
      'Funding-and-alignment first: we structured the $AZA token around a four-way value split — brands purchased AZA to run campaigns, allocated across streamers (creators), players (audience), Azarus (platform), and a community treasury (long-term incentives and governance). Turning every advertiser dollar into shared upside. Product next: I took ownership of game design and built the gamified ad format end-to-end — Livestream entry → Players Joining → Countdown → Question → Result → Star Award → AZA Tally → Brand Video → AzaCoin Collect → Audience Credits. We tested it through the September 2022 Azarus Alpha with streamers from the creator community I’d built, then the Halloween Beta in October 2022. The pitch artefact: a fully-rendered mock campaign using Coca-Cola’s brand identity as recognisable visual shorthand — not a real client, a proof of concept that let any advertiser see themselves in the format. It opened the door to the launch advertisers: Ubisoft signed for Brawlhalla (live on streamer Xenrichan, Nov 2022), Logitech signed in parallel (live on ElainaExe). Both hit $2 CPI — pricing benchmarked by our ex-Amazon sales team from Amazon’s gaming-ad data, and described by one talent agency as "much higher than anything they have done in the past." Azarus was competing on quality at a premium price point, not on cost. In parallel I led the $AZA token launch end-to-end — brand, whitepaper, GTM, comms — and supported listings on Coinbase and Crypto.com. I also directed a full website redesign repositioning Azarus from "Twitch overlay" to "gamified engagement / Web3 platform", and supported the CEO on investor relations.',
    takeaway:
      'The engagement engine became a business. Brand advertisers at premium CPI. A tradeable token aligning streamers, players, platform and treasury with growth. Hundreds of thousands of active players. Acquired by Animoca Brands in October 2023. Three principles: earn the right to pivot (no Streamer Awards proof point, no advertiser conversation); premium pricing beats discount pricing if the format earns it ($2 CPI was higher than industry — brands paid because engagement justified it); token work is brand work, not crypto work (same product-launch playbook with regulatory care added).',
    media: {
      image: 'case-studies/azarus-overlay-games-banner.jpeg',
      imageAlt: 'Azarus repositioning banner — the AZARUS wordmark with the tagline "The Overlay Games Company" on a purple gradient with floating confetti, the brand statement of the pivot Laura led',
      heroBackground: 'transparent',
      // Bespoke card thumbnail (960×540) supplied by Laura for the
      // /work index. Sized so the key visual sits cleanly inside the
      // 4:3 card crop.
      cardImage: 'case-studies/azarus-game-ads-card.png',
      cardImageAlt: 'Azarus game ads case study card thumbnail',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'ubisoft-siege-champions',
    company: 'Ubisoft · Siege Champions',
    headline: '50M+ UGC views, $0 spend',
    hook: 'Community advocacy, scaled to creators. 50M+ UGC views in year one, zero media spend.',
    tldr: 'I scaled Ubisoft’s community advocacy model into an invite-only creator program for Rainbow Six Siege: 200 members across 18 markets, <mark>50M+ UGC views in year one</mark>, $0 media spend.',
    year: '2020–2021',
    role: 'Sr. Community Engagement Manager',
    accent: '#7CBCC9',
    sectors: ['Gaming'],
    tags: ['Creator Programs', 'Community', 'AAA Gaming'],
    stats: [
      { value: '50M+', label: 'UGC views, year one' },
      { value: '200',  label: 'Invite-only members' },
      { value: '$500K+', label: 'Est. earned media value' },
      { value: '$0',   label: 'Media spend' },
    ],
    media: {
      // Single source of truth — hero and card image.
      // Official program banner: wordmark on dark cinematic backdrop.
      // Official Siege Champions Program key art (two operators in
      // program skins with the program logo + vivid spray backdrop).
      image: 'case-studies/ubisoft-siege-champions-program-banner.png',
      imageAlt: 'Siege Champions Program — official key art with two operators in program skins, the SIEGE CHAMPIONS PROGRAM logo, and a vivid coloured-spray backdrop',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'ubisoft-delta-company',
    company: 'Ubisoft · Delta Company',
    headline: 'Ubisoft’s first-of-its-kind community program',
    hook: 'A first-of-its-kind community advocacy program at Ubisoft, pioneering for AAA titles. 10M+ UGC views from members, unveiled live on the E3 stage.',
    tldr: 'I designed and launched Delta Company: a first-of-its-kind community advocacy program at Ubisoft, pioneering for AAA titles. Unveiled live on the E3 2019 stage. 5 community clusters, 14 languages, 130 invited members, 10M+ UGC views from members.',
    year: '2019–2020',
    role: 'International Community Developer',
    accent: '#4A5D3F',
    sectors: ['Gaming'],
    tags: ['Community Programs', 'Advocacy', 'Brand', 'Live Launch'],
    stats: [
      { value: '5',    label: 'Community clusters' },
      { value: '14',   label: 'Languages' },
      { value: '$100K+', label: 'Est. earned media value' },
      { value: '10M+', label: 'UGC views from program members' },
    ],
    challenge: 'Ubisoft’s Ghost Recon community had millions of players but no system to deepen the relationship with the studio.',
    approach: 'Built Delta Company: a first-of-its-kind community advocacy program at Ubisoft, pioneering for AAA titles, structured around 5 community clusters (creators, artists, cosplayers, feedback specialists, tournament players). Designed the brand with the internal Ghost Recon Breakpoint design team and Diana Da Costa. Commissioned a dedicated website in 14 languages with custom application back-end. Produced a How-it-Works recruitment video. Unveiled live on the UbiE3 2019 stage with Takeoff agency assets. Shipped a members-only goodie box and in-game customisations.',
    takeaway: '10M+ UGC views from program members alone — from just 130 people. A continuous stream of considered, educated content showing Studio and community in real partnership. The kind of distribution money cannot buy. The program became the blueprint for Ubisoft’s subsequent community programs across multiple franchises.',
    media: {
      image: 'case-studies/delta/01-delta-badge-hero.png',
      imageAlt: 'Delta Company badge on a Ghost Recon Breakpoint backdrop. The brand mark Laura designed for a first-of-its-kind community advocacy program at Ubisoft, pioneering for AAA titles.',
      cardImageScale: 1.15,
      youtube: 'F5g7fOzxGYY',
      videoTitle: 'UbiE3 2019 — Community segment + Delta Company reveal',
      videoDescription: 'The full Ghost Recon community segment where Laura unveiled Delta Company live on the UbiE3 2019 stage.',
    },
  },
  {
    id: 'blablacar-live-nation',
    company: 'BlaBlaCar · Live Nation',
    headline: 'Live Nation Official Ridesharing Partner',
    hook: 'Live Nation’s first ever Official Ridesharing Partner. 300+ parking spots across Latitude, Leeds and Reading.',
    tldr: 'How I ran BlaBlaCar UK’s partnerships with Live Nation as their <mark>first Official Ridesharing Partner</mark>: priority parking, on-site festival activation, and helping people get home across Latitude, Leeds and Reading.',
    year: '2013–2016',
    role: 'UK Community Manager',
    accent: '#F4B53A',
    sectors: ['Mobility'],
    tags: ['Partnerships', 'Brand Activation', 'Grassroots'],
    stats: [
      { value: '3', label: 'Major festivals' },
      { value: '300+', label: 'Branded parking spots' },
      { value: '20m²', label: 'On-site community tent' },
      { value: '1M', label: 'UK members (contributed)' },
    ],
    challenge:
      'The UK market had zero brand recognition for BlaBlaCar. We needed high-visibility, trust-building activations to reach a sceptical audience.',
    approach:
      'I secured Live Nation as Official Ridesharing Partner — unprecedented for a carpooling platform. Designed and ran the on-site presence end-to-end: 300+ branded parking spots and a 20m² community tent across Latitude, Leeds and Reading, plus on-site activations and community meetups. I paired the festival footprint with grassroots CRM (35% open rate, 12% CTR, best in company at the time) and social community building.',
    takeaway:
      'I turned festivals into a trust-building channel that made carpooling feel culturally normal in the UK. The kind of work that doesn’t show up in dashboards but changes how people feel about your brand.',
    media: {
      image: 'case-studies/blablacar-livenation-banner-yellow.png',
      imageAlt: 'BlaBlaCar × Live Nation brand lockup on yellow',
      // Bespoke card thumbnail (960×540) supplied by Laura for the
      // /work index.
      cardImage: 'case-studies/blablacar-live-nation-card.png',
      cardImageAlt: 'BlaBlaCar × Live Nation case study card thumbnail',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
]

export default caseStudies
