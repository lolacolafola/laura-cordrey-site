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
    id: 'delta-company',
    company: 'Ubisoft · Delta Company',
    headline: 'First-of-its-kind creator program',
    hook: 'My idea. My program. My launch — live on the E3 stage.',
    tldr: 'I designed and launched Delta Company — a first-of-its-kind creator advocacy program at Ubisoft. Unveiled live on the E3 2019 stage. 5 community clusters, 14 languages, 130 invited members, 60M+ UGC reach.',
    year: '2018–2020',
    role: 'International Community Developer',
    accent: '#4A5D3F',
    tags: ['Creator Programs', 'Community', 'Brand', 'Live Launch'],
    stats: [
      { value: '10M+',      label: 'UGC views from program members' },
      { value: '50% → 80%', label: 'Sentiment swing (neg → pos, post-Breakpoint)' },
      { value: '130',       label: 'Invited members' },
      { value: '14',        label: 'Languages' },
    ],
    challenge: 'Ubisoft’s Ghost Recon community had millions of players but no system to deepen the relationship with the studio.',
    approach: 'Built Delta Company — a first-of-its-kind creator advocacy program structured around 5 community clusters (artists, cosplayers, explorers, feedback specialists, tournament players). Designed the brand with the internal Ghost Recon Breakpoint design team and Diana Da Costa. Commissioned a dedicated website in 14 languages with custom application back-end. Produced a How-it-Works recruitment video. Unveiled live on the UbiE3 2019 stage with Takeoff agency assets. Shipped a members-only goodie box and in-game customisations.',
    takeaway: '10M+ UGC views from program members alone — from just 130 people. A continuous stream of considered, educated content showing Studio and community in real partnership. The kind of distribution money cannot buy. The program became the blueprint for Ubisoft’s subsequent creator programs across multiple franchises.',
    media: {
      image: 'case-studies/delta/01-delta-badge-hero.png',
      imageAlt: 'Delta Company badge on a Ghost Recon Breakpoint backdrop — the brand mark Laura designed for the first-of-its-kind creator advocacy program at Ubisoft',
      youtube: 'F5g7fOzxGYY',
      videoTitle: 'UbiE3 2019 — Community segment + Delta Company reveal',
      videoDescription: 'The full Ghost Recon community segment where Laura unveiled Delta Company live on the UbiE3 2019 stage.',
    },
  },
  {
    id: 'ubisoft',
    company: 'Ubisoft',
    headline: '$500K+ in earned media value',
    hook: 'Zero ad spend. 60M+ organic views.',
    tldr: 'I designed a community creator program at Ubisoft that generated <mark>$500K+ in earned media value</mark> across 18 markets \u2014 turning players into the company\u2019s most valuable marketing channel, with zero ad spend.',
    year: '2018\u20132022',
    role: 'Community Strategy & Creator Programs',
    accent: '#E8A020',
    tags: ['Creator Programs', 'Community', 'Global Scale'],
    stats: [
      { value: '60M+', label: 'Organic UGC views' },
      { value: '$0', label: 'Ad spend' },
      { value: '85%', label: 'Positive sentiment' },
      { value: '500+', label: 'Community leaders' },
    ],
    challenge:
      'Ubisoft had massive playerbases and no system to activate them as a growth channel.',
    approach:
      'I designed Delta Company with 5 community clusters (artists, cosplayers, explorers, feedback specialists, tournament players). Launched at E3 2019 to 10M+ viewers. 10K US applications for 5\u201310 spots. When Breakpoint launched badly I pivoted the program into a feedback engine (50% negative \u2192 80% positive sentiment). Scaled to 3 franchises. Then I proved it was repeatable: built the R6 Siege Community Creator Program (150+ invite-only creators, 6M video views, 2.4M live watch hours, 393K interactions \u2014 Season 1 alone, $0 media spend).',
    takeaway:
      'I built the system that turned Ubisoft\u2019s players into their most valuable marketing channel. Then I proved it was repeatable across multiple franchises.',
    media: {
      image: 'case-studies/ubisoft-banner.png',
      imageAlt: 'Ubisoft brand mark \u2014 the publisher Laura built the Delta Company creator program for across 18 markets and three franchises',
      heroBackground: 'white',
      // cardImage: optional override for the work-grid thumbnail.
      // Add a campaign-asset path here when one is curated; otherwise the
      // article hero (above) is reused.
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
    gallery: [
      {
        src: 'case-studies/ubisoft-siege-champions.png',
        alt: 'R6 Siege Champions Program \u2014 Ubisoft creator program artwork from the program Laura designed',
        caption: 'R6 Siege Champions Program \u2014 the creator program I built to scale community-led growth across three franchises.',
      },
      {
        src: 'case-studies/ubisoft-delta-pr-pack-real.jpg',
        alt: 'Delta Company creator pack for Tom Clancy\u2019s Ghost Recon Breakpoint \u2014 green flask, badges, key tag and merch laid out',
        caption: 'The Delta Company creator pack I designed \u2014 limited-edition kit shipped to invited community leaders for Tom Clancy\u2019s Ghost Recon: Breakpoint.',
      },
      {
        src: 'case-studies/ubisoft-delta-seasonal.png',
        alt: 'Delta Company seasonal program structure diagram \u2014 community leader activations across a season',
        caption: 'Delta Company \u2014 the seasonal program structure I built across community leader activations.',
      },
      {
        src: 'case-studies/ubisoft-delta-always-on.png',
        alt: 'Delta Company always-on program metrics \u2014 recruitment, activations, satisfaction, membership KPIs',
        caption: 'The always-on program: how I measured recruitment, activations, satisfaction and membership month over month.',
      },
      {
        src: 'case-studies/ubisoft-siege-pr-pack.png',
        alt: 'R6 Siege Champions Program PR pack \u2014 limited-edition merch sent to invited creators',
        caption: 'R6 Siege Champions Program PR pack \u2014 invite-only merch sent to the 150+ Season 1 creators.',
      },
    ],
  },
  {
    id: 'us-mobile',
    company: 'US Mobile',
    headline: '$32K revenue in 3 hours',
    hook: 'From a free SIM kit to a $129 fan bundle.',
    tldr: 'I designed a $129 VIP fan bundle and launched the gamified \u201cClaw Mobile\u201d brand campaign at US Mobile \u2014 generating <mark>$32K in revenue in three hours</mark> and reducing CAC by 38%.',
    year: '2023\u20132024',
    role: 'Fractional Growth & Community Lead',
    accent: '#4BBFB0',
    tags: ['Revenue', 'Gamification', 'PLG'],
    stats: [
      { value: '$32.25K', label: 'Revenue in 3 hrs' },
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
      image: 'case-studies/us-mobile.png',
      imageAlt: 'US Mobile brand mark \u2014 the company where Laura designed the $129 VIP fan bundle and led the Dark Star and Claw Mobile launches',
      heroBackground: 'white',
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
    id: 'blablacar',
    company: 'BlaBlaCar',
    headline: '0 \u2192 1M members',
    hook: '\u20AC5 CAC. 22 markets. One creative system.',
    tldr: 'I helped grow BlaBlaCar\u2019s UK presence <mark>from 0 to 1M members at \u20AC5 CAC</mark> \u2014 by building the UK community from scratch, fixing brand operations, and pioneering a first-person smartphone storytelling system that scaled across 22 markets.',
    year: '2014\u20132017',
    role: 'UK Community Lead \u2192 Brand & Design',
    accent: '#5B9BD5',
    tags: ['Cold Start', 'Community', 'Brand', 'Ops'],
    stats: [
      { value: '1M', label: 'UK members from 0' },
      { value: '\u20AC5', label: 'CAC (quarterly avg.)' },
      { value: '\u221290%', label: 'Ad-hoc design requests' },
      { value: '22', label: 'Markets served' },
    ],
    challenge:
      'UK launch \u2014 no brand recognition, culture sceptical of carpooling.',
    approach:
      'I built the UK community from scratch (social, CRM, meetups). Secured Live Nation festival partnerships. Got promoted to the Brand & Design team \u2014 ran a SWOT review and reduced ad-hoc design requests by 90%. Got promoted again \u2014 pioneered first-person smartphone narrative storytelling and built a template system that scaled across 22 markets.',
    quote: {
      text: 'Laura is a start-up swiss knife\u2026 with some extra fun.',
      name: 'Nicolas Brusson',
      title: 'CEO of BlaBlaCar',
    },
    takeaway:
      'Three promotions in four years. I launched a market, fixed the ops, and built the creative engine.',
    media: {
      image: 'case-studies/blablacar.jpg',
      imageAlt: 'BlaBlaCar brand still — the carpooling platform Laura launched in the UK and grew from 0 to 1M members at €5 CAC',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
    gallery: [
      {
        src: 'case-studies/blablacar-but-first-coffee.jpg',
        alt: 'BlaBlaCar first-person smartphone storytelling — “But. First. Coffee.” in-car still',
        caption: 'The first-person smartphone storytelling system I built — one creative idea, remade in every market.',
      },
      {
        src: 'case-studies/blablacar-road-trip.jpg',
        alt: 'Four friends laughing in a car — a still from BlaBlaCar’s first-person smartphone storytelling system',
        caption: 'Four friends, one ride. The first-person storytelling system, captured on a smartphone, designed to be remade in every market.',
      },
      {
        src: 'case-studies/blablacar-woman-and-dog.jpg',
        alt: 'Woman with a small white dog in a BlaBlaCar carpool',
        caption: 'The story isn’t the journey — it’s who you meet on it.',
      },
      {
        src: 'case-studies/blablacar-passenger-reading.jpg',
        alt: 'Passenger reading a book in the front seat of a BlaBlaCar ride',
        caption: 'Quiet moments between strangers — captured raw, lived-in, on a phone.',
      },
      {
        src: 'case-studies/blablacar-fail-learn-succeed.jpg',
        alt: 'BlaBlaCar brand poster — “Fail. Learn. Succeed.” in coral and teal',
        caption: 'The brand system I built: confident type, BlaBlaCar coral, no stock photography.',
      },
    ],
  },
  {
    id: 'azarus',
    company: 'Azarus',
    headline: '90% engagement rate',
    hook: 'Title-sponsored the first Streamer Awards. Crashed our own servers.',
    tldr: 'I landed Azarus title sponsorship of the inaugural Streamer Awards (now the streaming world\u2019s Oscars) and shipped a bespoke live game overlay for the broadcast \u2014 turning 500K passive viewers into active participants at a <mark>90% live engagement rate</mark>, with 20% converting to Azarus members on the spot.',
    year: '2021\u20132022',
    role: 'VP Community & Partnerships',
    accent: '#A47BFF',
    tags: ['Live Event', 'Brand Sponsorship', 'Interactive Creative'],
    stats: [
      { value: '90%', label: 'Live engagement rate' },
      { value: '500K', label: 'Peak live viewers' },
      { value: '20%', label: 'Viewer \u2192 member conversion' },
      { value: '1st', label: 'Edition of the Streamer Awards' },
    ],
    challenge:
      'A Twitch overlay product with reach but no proof of mass interactivity at scale. Azarus needed a moment that would prove its core thesis \u2014 that audiences will actively play, not just watch \u2014 in front of an audience that mattered to the streaming world.',
    approach:
      'I secured title sponsorship of the inaugural Streamer Awards (the show that has since become the streaming world\u2019s Oscars) and shipped a bespoke live game overlay built for the broadcast itself. Viewers played alongside the show in real time, with 500K tuning in at peak, 90% actively engaging with the overlay during the live stream, and 20% of them converting from passive viewers into Azarus members on the spot.',
    takeaway:
      'I proved mass interactivity on the biggest stage in streaming. So many people played at once that we crashed our own servers mid-broadcast \u2014 not the validation we planned, but maybe the most honest one. The proof point unlocked the company\u2019s next chapter: the pivot to a gamified ad platform (covered in its own file).',
    media: {
      image: 'case-studies/azarus.png',
      imageAlt: 'Azarus brand mark \u2014 the company where Laura led the product pivot and the 2022 Streamer Awards launch',
      heroBackground: 'white',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'azarus-game-ads',
    company: 'Azarus',
    headline: '$2 CPI on a brand-new ad format',
    hook: 'Pivoted Azarus from Twitch overlay into a gamified ad platform.',
    tldr: 'I led Azarus through a product pivot from Twitch overlay into a gamified ad platform — delivering interactive ad campaigns for Ubisoft and Logitech at <mark>$2 cost-per-install and 90% engagement</mark>, growing MAU 80%, and launching the $AZA token (Coinbase + Crypto.com listings) along the way.',
    year: '2022\u20132023',
    role: 'Head of Growth \u2192 VP Marketing',
    accent: '#7C5BFF',
    tags: ['Product Pivot', 'Gamified Ads', 'Enterprise Sales', 'Token Launch'],
    stats: [
      { value: '$2', label: 'CPI on launch campaigns' },
      { value: '90%', label: 'Engagement rate' },
      { value: '+80%', label: 'MAU growth' },
      { value: '$AZA', label: 'Token \u2014 listed on Coinbase & Crypto.com' },
    ],
    challenge:
      'After the Streamer Awards proof point (covered in its own file), Azarus had validated the engagement thesis but still needed a sustainable revenue model. The Twitch-overlay format capped the addressable market. We had to ship a new product surface and prove it could carry a real ad business, fast.',
    approach:
      'I led the pivot from Twitch overlay into a gamified ad platform: ads that audiences played, not skipped. Built the brand-side sales motion alongside the product and landed Ubisoft and Logitech as launch advertisers, shipping interactive game-ad campaigns that hit a 90% engagement rate at a $2 cost-per-install. I negotiated six-figure influencer partnerships to fuel acquisition. In parallel, I led the launch of the $AZA token end-to-end \u2014 brand, white paper, comms \u2014 securing listings on Coinbase and Crypto.com, and shaping the investor narrative around the new business model.',
    takeaway:
      'A new product surface, two flagship brand advertisers proving the gamified-ad model at $2 CPI and 90% engagement, +80% MAU growth, and a token launch on the two biggest exchanges. I turned an engagement thesis into a revenue model and an investable story.',
    media: {
      // Reusing the Azarus brand mark until pivot-specific assets land
      // (e.g. Chrome extension UI, Ubisoft / Logitech ad creative stills).
      image: 'case-studies/azarus.png',
      imageAlt: 'Azarus brand mark \u2014 the company where Laura led the pivot to a gamified ad platform',
      heroBackground: 'white',
      youtube: null,
      videoTitle: null,
      videoDescription: null,
    },
  },
  {
    id: 'blablacar-festivals',
    company: 'BlaBlaCar',
    headline: 'Live Nation Official Ridesharing Partner',
    hook: 'Branded parking zones at the UK\u2019s biggest festivals.',
    tldr: 'I made BlaBlaCar the <mark>UK\u2019s first Official Ridesharing Partner of Live Nation</mark> \u2014 securing branded festival parking at Latitude, Leeds and Reading, and contributing to growing UK members from 0 to 1M.',
    year: '2014\u20132016',
    role: 'UK Community & Partnerships',
    accent: '#F4B53A',
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
      // Substitute BlaBlaCar campaign asset \u2014 swap for an actual festival photo when available.
      image: 'case-studies/blablacar-festivals.jpg',
      imageAlt: 'BlaBlaCar in-car driver campaign asset \u2014 part of the brand system Laura built around the UK festivals partnership era',
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
    year: '2023\u20132024',
    role: 'Brand Campaign Producer',
    accent: '#FF6B5B',
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
