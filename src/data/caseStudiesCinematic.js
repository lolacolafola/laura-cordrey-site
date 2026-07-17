// Cinematic case-study content — drives <CaseStudyCinematic study={…} />.
//
// One entry per study, in display order (drives studyNum). Each:
//   { id, name, skin, accent, hero, blocks }
//   skin   — 'dark' or 'light' (controls body skin; hero is always dark)
//   accent — per-study colour
//   blocks — ordered layout blocks (see CaseStudyCinematic.jsx for types)
//
// Block copy may contain inline <mark> (accent) and <strong>.
// Asset paths use Vite BASE so they resolve under the configured base path.

const BASE = import.meta.env.BASE_URL
const P = (s) => BASE + 'case-studies/' + s
const S = (s) => BASE + 'speaking/' + s

// Slug ↔ id mapping. Keep in sync with App.jsx routes.
const ROUTE = {
  'us-mobile': '/case-studies/us-mobile-dark-star',
  'claw': '/case-studies/claw-mobile',
  'azarus-streamers': '/case-studies/azarus',
  'azarus-ads': '/case-studies/azarus-game-ads',
  'siege': '/case-studies/ubisoft-siege-champions',
  'delta': '/case-studies/ubisoft-delta-company',
  'blablacar': '/case-studies/blablacar-storytelling',
}

// Rewrite prototype-style "#study-foo" anchors to real /work routes.
const xref = (href) => {
  if (!href || href.charAt(0) !== '#') return href
  const id = href.replace(/^#study-/, '')
  return ROUTE[id] || href
}

const orderedStudies = [
  /* ── 01 · US MOBILE · DARK STAR ── */
  {
    id: 'us-mobile', name: 'US Mobile', skin: 'dark', accent: '#4BBFB0',
    hero: {
      meta: 'US Mobile · USA · 2024',
      eyebrow: 'Case study · Revenue',
      title: 'Dark Star.',
      lede: 'Turned a free SIM kit into a $129 limited-edition fan bundle. Sold out in under three hours.',
      img: P('us-mobile/us-mobile-dark-star-banner.png'),
      imgAlt: 'US Mobile Dark Star wordmark on a black starfield',
    },
    blocks: [
      { type: 'statement', text: 'A flagship SIM kit, given away for free. I made the case it was worth $129, and fans proved it.' },
      { type: 'stats', items: [
        { value: '$32K', label: 'Sales, under 3 hrs' },
        { value: '250', label: 'VIP bundles, sold out' },
        { value: '80%', label: 'Pre-launch email opens' },
        { value: '450+', label: 'Reddit comments at launch' },
      ] },
      { type: 'section', kicker: '[01] · The opportunity', title: 'A $0 product worth $129.',
        body: [
          'US Mobile is a community-driven challenger with a fiercely active Reddit following. But the flagship SIM Kit was being given away free, so I saw the chance to turn it into core-community money around the Dark Star launch.',
          'The $129 bundle stacked it high: a limited-edition SIM kit, two weeks’ early access, a free 12-month plan upgrade, an exclusive in-app network badge, a US Mobile × The North Face® fleece with personalised initials, a signed letter, and a 15-minute Zoom with the CEO.',
        ] },
      { type: 'carousel', aspect: '1/1', itemW: 'min(78vw,560px)', contain: true, items: [
        { src: P('us-mobile/us-mobile-vip-bundle.png'), cap: 'The $129 Dark Star VIP Bundle, capped at 250 units.' },
        { src: P('us-mobile/us-mobile-vip-landing.png'), cap: 'The VIP Early Access Bundle landing page.' },
      ] },
      { type: 'splitmedia', vcenter: true, framed: true,
        kicker: '[02] · The build', title: 'A gamified pre-launch funnel.',
        body: ['50K+ visitor landing pages, an arcade-style game (80% open, 35% CTOR) that drove the waitlist, then a hard cap at 250 units. I produced the Madison Avenue launch event, 200+ attendees including AT&T execs.'],
        images: [{ src: P('us-mobile/us-mobile-darkstar-email-copy.png') }],
        caption: 'The launch email. Play your way to an early-access code.',
        link: { href: 'https://www.usmobile.com/videogame', text: 'Play the game' } },
      { type: 'result', tight: true, kicker: 'The result', value: 'Sold out',
        caption: '$32K of VIP bundles gone in under three hours. 450+ unprompted fan posts.' },
      { type: 'splitmedia', divider: true, vcenter: true,
        splitCols: 'minmax(0,0.58fr) minmax(0,1.42fr)',
        kicker: '[03] · The reaction', title: 'It made a buzz online.',
        body: ['The bundle sold itself. Owners posted their unboxings unprompted, 450+ comments at launch, and the $129 fan drop turned into its own marketing channel.'],
        images: [{ src: P('us-mobile/us-mobile-stetson-tweet.png') }],
        caption: 'Creator Stetson Doggett on X, showing off his Dark Star VIP bundle: the North Face quarter-zip and signed CEO letter. “Crazy there are only 250 of these.”' },
      { type: 'takeaway', kicker: '[04] · The takeaway', title: 'Fans will pay.',
        lede: 'A community-first company can monetise its fans directly. The CEO’s “we are sold out, this is insane” became its own marketing moment.',
        principles: [
          { num: '01', head: 'Design for superfans.', body: 'The same SIM kit that was free, reframed as a $129 limited drop. The product didn’t change, its meaning did.' },
          { num: '02', head: 'FOMO is the product.', body: 'Limited availability turned a purchase into a status badge, and the fear of missing it drove the rush.' },
          { num: '03', head: 'Gamify the funnel.', body: 'A web game turned the waitlist into play, earning your way to an early-access code. More fun than a standard sign-up form.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 02 · CLAW MOBILE ── */
  {
    id: 'claw', name: 'Claw Mobile', skin: 'light', accent: '#FF6B5B',
    hero: {
      meta: 'US Mobile · USA · 2024',
      eyebrow: 'Case study · Brand campaign',
      title: 'A Mint Mobile parody.',
      lede: 'With Deadpool & Wolverine in cinemas, US Mobile hired a fake Hugh Jackman to take on Mint Mobile. The bit: a full parody network, built for community delight.',
      img: P('claw-mobile/claw-mobile-card.jpg'),
    },
    blocks: [
      { type: 'statement', text: 'Mint Mobile had Ryan Reynolds. We couldn’t afford the real Hugh Jackman, so we cast a fake one. The leverage was the script, not the star.' },
      { type: 'stats', items: [
        { value: '55%', label: 'Past 15s · Meta' },
        { value: '100s', label: 'Reddit comments · organic' },
        { value: '4', label: 'Films delivered' },
        { value: '1', label: 'Spoof network launched' },
      ] },
      { type: 'section', kicker: '[01] · The bit', title: 'Up against Mint Mobile.',
        body: [
          'US Mobile had just become a ‘super carrier’, with Dark Star added, they now ran on all three major US carrier networks. Mint Mobile owned the celebrity-endorsed playbook in US telco with Ryan Reynolds. The brief: we wanted our own.',
          'So we rode Deadpool & Wolverine, where Jackman takes on Reynolds, and ran the same play against Mint. The real Hugh Jackman was out of budget, so we cast a fake one. I led the campaign with Luna agency, from creative ideation and scripting through post-production and final delivery.',
        ],
        link: { href: '#study-us-mobile', text: 'See the Dark Star case study' } },
      { type: 'carousel', contain: true, items: [
        { src: P('claw-mobile/claw-mobile-mint-ryan-reynolds.png'), cap: 'Ryan Reynolds as Mint Mobile’s “Owner & User”. The celebrity-endorsed playbook in one frame.' },
        { src: P('claw-mobile/claw-mobile-deadpool-wolverine-poster.webp'), cap: 'Deadpool & Wolverine in cinemas. The cultural moment behind the bit.' },
      ] },
      { type: 'statement', text: 'The hero film: fake Jackman, alone to camera. He opens as Wolverine, then pivots to pitch his own network, ‘razor-sharp connectivity and ferocious data speeds’. Sign-off: don’t settle for minty freshness, go for the claws.' },
      { type: 'video', embed: 'https://www.youtube.com/embed/bsLHDOlcgcY',
        caption: 'Claw Mobile. The stunt film. Led by me, filmed and produced by Luna.' },
      { type: 'result', kicker: 'Hook held', value: '55%',
        caption: 'past the 15-second mark on Meta. Past the point where most paid social gets scrolled.' },
      { type: 'videogrid', eyebrow: '[02] · More from the campaign', title: 'Three more films.',
        videos: [
          { embed: 'https://www.youtube.com/embed/O9IGCpzi6P4', cap: 'Behind the scenes. The fake-Jackman bit falls apart on set, legal panics, and the team accidentally lands the real pitch: a super carrier on all three networks.' },
          { embed: 'https://www.youtube.com/embed/RsimGZVWlsU', cap: 'Ahmed starts reading US Mobile’s long feature list. Fake Jackman, tired of being underused, shreds it with his claws. Sign-off: ‘tell that to my two Tonys’.' },
          { embed: 'https://www.youtube.com/embed/9B6Ogshm5Ho', cap: 'Ahmed, the real CEO, tries to land the pitch. Fake Jackman keeps making it about Wolverine. Ahmed wins the gag: Wolverine isn’t a super hero, he’s a mutant. US Mobile is the only super carrier.' },
        ] },
      { type: 'splitmedia', divider: true, carousel: true, carAspect: '3/4', vcenter: true,
        kicker: '[03] · Campaign storytelling', title: 'Committing to the bit.',
        body: [
          'I extended the gag with a community easter egg: anyone hunting for Claw Mobile landed on a spoof site ‘built by the star himself’, deliberately shoddy by design. A custom landing page redirected back to Ahmed, US Mobile’s real CEO, and the real deals.',
          'A fun interaction for fans of the brand that sparked lively conversation.',
        ],
        images: [
          { src: P('claw-mobile/claw-mobile-spoof-lp.png'), cap: 'The spoof site, deliberately shoddy, “built by the star himself.”' },
          { src: P('claw-mobile/claw-mobile-real-ceo-lp.png'), cap: 'The reveal: a landing page redirecting back to Ahmed, the real CEO, and the real deals.' },
        ] },
      { type: 'section', divider: true, kicker: '[04] · The result', title: 'The joke landed.',
        body: ['On Meta, the hook held: 55% past 15s. On Reddit, it ran without us: hundreds of comments. Claws out for Mint Mobile.'] },
      { type: 'takeaway', kicker: '[05] · The takeaway', title: 'Commit to the bit, and the bit pays back.',
        lede: 'Four films, a spoof network, the CEO clap-back. All of it for less than the cost of one real celebrity.',
        principles: [
          { num: '01', head: 'Money doesn’t buy attention. The joke does.', body: 'Mint Mobile has Ryan Reynolds. We cast a fake Jackman. The leverage was the script, not the star.' },
          { num: '02', head: 'A stunt needs a world to live in.', body: 'The spoof microsite, the CEO clap-back LP, and the four cuts gave the audience a universe to keep poking at. That’s what bought the Reddit thread.' },
          { num: '03', head: 'Cultural timing is free distribution.', body: 'Deadpool & Wolverine was in cinemas. We didn’t sponsor it, we sat in its slipstream.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 03 · AZARUS · STREAMERS ── */
  {
    id: 'azarus-streamers', name: 'Azarus · Streamers', skin: 'dark', accent: '#A47BFF',
    hero: {
      meta: 'Azarus · USA · 2021–2022',
      eyebrow: 'Case study · Streamer-led growth',
      title: 'Scaling Azarus through streamers.',
      lede: 'Three escalating streamer campaigns that scaled Azarus’s US presence, and became its growth foundation.',
      img: P('azarus/azarus-streamer-hero-34043544.jpg'),
    },
    blocks: [
      { type: 'statement', text: 'Cracking the US market with streamer-led growth.' },
      { type: 'stats', items: [
        { value: '+80%', label: 'MAU lift · LoL launch' },
        { value: '500K', label: 'Peak viewers · Streamer Awards' },
        { value: '20%', label: 'Viewer → member · proven twice' },
        { value: '~100', label: 'Streamers · Facebook Gaming Beta' },
      ] },
      { type: 'section', kicker: '[01] · Where it started', title: 'A product that worked. Time to scale it.',
        body: [
          'Azarus was a native Twitch overlay, trivia, polls and challenges built on top of live streams, backed by Galaxy Digital, Animoca Brands and Kleiner Perkins. The tagline: “Turn passive viewers into active participants.”',
          'The product worked. What it didn’t have yet was scale, top US streamers running it live, week after week, in front of the audiences it was built for. That’s where I came in.',
        ] },
      { type: 'splitmedia', divider: true, kicker: '[02] · Campaign 1: the LoL launch', title: 'A coordinated US push for League of Legends.',
        caption: 'League of Legends. The game Azarus integrated for Campaign 1.',
        images: [{ src: P('azarus/azarus-league-of-legends-banner.webp') }],
        body: ['I paired the LoL overlay launch with a coordinated US streamer push, Caedrel, CookieLoLxx, lol_Nemesis, Tarzaned and more, booked through AFK and BEN Agency. 10M+ viewers reached. MAU up 80%.'] },
      { type: 'result', tight: true, kicker: 'League of Legends', value: '+80% MAU', caption: 'From one coordinated pulsepoint.' },
      { type: 'splitmedia', divider: true, kicker: '[03] · Campaign 2: the big swing', title: 'The first Streamer Awards.',
        caption: 'Maya Higa and QTCinderella on stage. The night the Azarus overlay ran live over the broadcast.',
        images: [{ src: P('azarus/azarus-streamer-awards-presenters.png') }],
        body: [
          'March 2022: I secured the title sponsorship of the first Streamer Awards, a 6-figure deal, plus a 5M+ AZA prize pool (~$50K) for fans to win live.',
          'The overlay was built for the show: 14 categories, ~65 nominee streamers, a team member inside the production room firing trivia in real time. Not a banner on the broadcast, part of it.',
        ] },
      { type: 'quote',
        quote: 'Azarus turns livestreams into a digital arena, and our trivia game for The Streamer Awards is a truly tailored experience for viewers to play along to the live show.',
        cite: 'Laura Cordrey, VP Marketing, Azarus.',
        link: { href: 'https://www.gamespress.com/Azarus-Brings-Trivia-Game-To-The-Streamer-Awards', text: 'Games Press, March 2022' } },
      { type: 'result', tight: true, kicker: 'Streamer Awards', value: 'Crashed the servers',
        caption: '500K peak viewers, 90% engaged, 20% redeemed, then the servers gave out. We weren’t prepared for our own success.' },
      { type: 'splitmedia', divider: true, kicker: '[04] · Campaign 3: running it back', title: 'Streamer Royale: same engine, different stage.',
        caption: 'Streamer Royale. Amouranth and the 16-streamer cohort.',
        images: [{ src: P('azarus/azarus-streamer-royale-lineup.jpg') }],
        body: ['Two months later the same playbook ran back on Amouranth’s Streamer Royale, 16 streamers, a polling-to-revive twist. This time the servers held. Same engine, different stage.'] },
      { type: 'result', tight: true, kicker: 'Streamer Royale', value: '60K',
        caption: 'Azarus players on the day, from 275K viewers, and the servers held this time.' },
      { type: 'splitmedia', divider: true, kicker: '[05] · In parallel', title: 'A cross-platform launch with Meta.',
        caption: 'Azarus × Facebook Gaming. The official Beta partnership lockup.',
        images: [{ src: P('azarus/azarus-facebook-gaming-beta-lockup.png') }],
        body: ['Alongside the campaigns, I project managed the launch of Azarus onto Facebook Gaming with the Meta teams, ~100 streamers in the Beta. The same engine, a different platform: proof the playbook wasn’t Twitch-dependent.'] },
      { type: 'result', tight: true, kicker: 'Facebook Gaming', value: '~100', caption: 'streamers in the Facebook Gaming Beta, launched with Meta.' },
      { type: 'takeaway', kicker: '[06] · The takeaway', title: 'Three campaigns, one engine.',
        lede: 'The relationships built across these three moments became Azarus’s US growth foundation.',
        principles: [
          { num: '01', head: 'Demand is bigger than the build.', body: '90% engaged, the audience showed up bigger than anyone projected. Build for the upside, not the projection.' },
          { num: '02', head: 'Three campaigns escalate, one engine compounds.', body: 'LoL proved the model. Streamer Awards proved it at scale. Streamer Royale proved it repeatable.' },
          { num: '03', head: 'Preplan, then react in real time.', body: 'Trivia tied to the show gets you most of the way. Questions fired live as it unfolds push engagement to its ceiling.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 04 · AZARUS · ADS ── */
  {
    id: 'azarus-ads', name: 'Azarus · Ads', skin: 'dark', accent: '#7C5BFF',
    hero: {
      meta: 'Azarus · USA · 2022–2023',
      eyebrow: 'Case study · Product pivot',
      title: 'Pivoting Azarus.',
      lede: 'The pivot from Twitch overlay to gamified ad platform. Ubisoft and Logitech at $2 CPI. $AZA listed on Coinbase and Crypto.com. Acquired by Animoca Brands in October 2023.',
      img: P('azarus/azarus-ads-hero-gemini.png'),
    },
    blocks: [
      { type: 'statement', text: 'Engagement was proven. Monetization wasn’t. That was the pivot.' },
      { type: 'stats', items: [
        { value: '4M+', label: 'Viewers participated' },
        { value: '$2M+', label: 'Prizes distributed to fans' },
        { value: '$2 CPI', label: 'Launch campaigns · Ubisoft + Logitech' },
        { value: '$AZA', label: 'Token launch · Coinbase + Crypto.com' },
      ] },
      { type: 'section', kicker: '[01] · Where it started', title: 'Engagement at scale. No monetization.',
        body: ['Azarus was a browser overlay on Twitch. The Streamer Awards had proved the engagement model worked. What it hadn’t solved was monetization: not for the company, the streamers running the overlay, or the brands trying to reach them. That was the pivot.'],
        link: { href: '#study-azarus-streamers', text: 'See the Streamer Awards case study' } },
      { type: 'band', contain: true, src: P('azarus/azarus-overlay-games-banner.jpeg'),
        link: { href: 'https://www.youtube.com/watch?v=34AzFfo7C6E', text: 'Watch my explainer video for the gamified ad format' } },
      { type: 'section', kicker: '[02] · The pivot', title: 'From overlay to gamified ad platform.',
        body: ['I led the team that reshaped Azarus as a gamified advertising format: brands buy CPI-priced engagement, not banner space. The repositioning landed in October 2022 as The Overlay Games™ Company, delivered by a team of 8 across brand, community, game design and comms.'] },
      { type: 'video', src: P('azarus/azarus-game-demo shorter.mp4'),
        caption: 'The gamified ad demo we built to sell the format to brands. Storyboarded by me, with my VO.' },
      { type: 'section', kicker: '[03] · Proven first', title: 'Tested with streamers before any brand.',
        body: [
          'The format: a countdown to pull players in, three rounds of brand trivia, the brand ad, then players collect their winnings. Attention held to the last beat. That’s the value behind the CPI.',
          'Before pitching brands, I stress-tested it through an Alpha and Beta with the always-on creator community, then shipped a fully-rendered mock campaign (Coca-Cola as visual shorthand) for the sales team to pitch with.',
        ] },
      { type: 'band', contain: true, narrow: true, src: P('azarus/azarus-go-live-trivia.jpeg'),
        caption: 'Go Live with Azarus Trivia. The format in marketing creative.' },
      { type: 'section', kicker: '[04] · The launch advertisers', title: 'Ubisoft and Logitech, at $2 CPI.',
        body: ['Ubisoft built a campaign around a new Brawlhalla character (trivia, ad, winnings), live on Xenrichan. Logitech ran Black Friday, live on ElainaExe. Both streamed through the always-on creator program. Across both, we averaged $2 CPI: above industry, because engagement justified it.'] },
      { type: 'result', tight: true, kicker: 'Both campaigns', value: '$2 CPI', caption: 'Averaged across Ubisoft and Logitech. Above industry.' },
      { type: 'loops', items: [
        { src: P('azarus/azarus-brawlhalla-loop-01.mp4'), cap: 'Azarus × Ubisoft Brawlhalla. Launch loop by Gabriel Virata Alves.' },
        { src: P('azarus/azarus-logitech-logos-loop.mp4'), cap: 'Azarus × Logitech. Black Friday launch loop by Gabriel Virata Alves.' },
      ] },
      { type: 'section', divider: true, kicker: '[05] · The token', title: 'From AZA Credits to $AZA crypto.',
        body: ['AZA Credits lived inside the overlay as an internal currency. We turned them into $AZA, routing every advertiser dollar across streamers, players, platform and a community treasury. Alignment, not just incentives. My part: branding, listings, comms and partner onboarding. $AZA went live on Coinbase and Crypto.com.'] },
      { type: 'loops', small: true, items: [
        { src: P('azarus/azarus-azacoin-live-logos-loop.mp4'), cap: '$AZA live on Coinbase and Crypto.com. Loop by Gabriel Virata Alves.' },
      ] },
      { type: 'result', tight: true, kicker: 'The outcome', value: 'Animoca', caption: 'Acquired by Animoca Brands in October 2023.' },
      { type: 'scale', kicker: 'Before the acquisition', title: 'Where Azarus got to.',
        lede: 'The platform reached this on Twitch through 2022, the year before the Animoca acquisition.',
        items: [
          { value: '31.9M', label: 'Views' },
          { value: '18.5M', label: 'Unique viewers' },
          { value: '5.7M', label: 'Unique players' },
          { value: '199.7M', label: 'Clicks' },
          { value: '86%', label: 'Avg. engagement, interactive ad campaigns (Q4)' },
          { value: '122', label: 'Active channels' },
        ],
        source: 'Source: Azarus internal, Twitch Tracker and Twitch Developer Analytics, 2023. Full-year 2022.' },
      { type: 'takeaway', kicker: '[06] · The takeaway', title: 'A consumer product, pivoted into a B2B business.',
        lede: 'The engagement engine became a business investors would back, and buy.',
        principles: [
          { num: '01', head: 'Build community programs as testing infrastructure.', body: 'The always-on creator program doubled as the Alpha/Beta talent, then ran the brand campaigns live. Same investment, two returns.' },
          { num: '02', head: 'Stress-test small before swinging big.', body: 'We proved the format with players before any brand saw it. By pitch time, it had already worked.' },
          { num: '03', head: 'Brands want new ways to reach buyers.', body: 'Ubisoft and Logitech jumped at a fresh format. Premium pricing follows when engagement earns it.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 05 · SIEGE CHAMPIONS ── */
  {
    id: 'siege', name: 'Siege Champions', skin: 'dark', accent: '#7CBCC9',
    hero: {
      meta: 'Ubisoft · Global · 2020–2021',
      eyebrow: 'Case study · Creator program',
      title: 'Building Siege Champions.',
      lede: 'Community creators at scale. An invite-only program for Rainbow Six Siege, rolled out from my tried-and-tested blueprint. 200 creators across 18 markets. Paid in status, not dollars.',
      img: P('ubisoft-siege/ubisoft-siege-champions-hero.jpg'),
    },
    blocks: [
      { type: 'statement', text: 'The Delta blueprint came first. This is what happened when I ran it again, through one of the biggest competitive shooters on the planet.' },
      { type: 'stats', items: [
        { value: '50M+', label: 'UGC views, year one' },
        { value: '200', label: 'Invite-only members' },
        { value: '$500K+', label: 'Est. earned media value' },
        { value: '$0', label: 'Media spend' },
      ] },
      { type: 'section', kicker: '[01] · The blueprint', title: 'The blueprint came first.',
        body: ['I launched Delta Company first: a community advocacy program for Ghost Recon Breakpoint. The first of its kind at Ubisoft, and for any major AAA title. That became the blueprint I rolled out to Rainbow Six Siege, with tweaks to improve the model along the way.'],
        link: { href: '/case-studies/ubisoft-delta-company', text: 'See the Delta Company case study' } },
      { type: 'band', contain: true, src: P('ubisoft-siege/rainbow-six-siege-key-art.jpg'),
        caption: 'Tom Clancy’s Rainbow Six Siege. The AAA title the program was built around.' },
      { type: 'section', kicker: '[02] · The opportunity', title: 'A creator-led community at scale.',
        body: ['Rainbow Six Siege was a different beast: a 70M+ player live game with a seasonal cadence and a competitive scene. One thing stood out, creators were already shaping the conversation. Streamers, YouTubers and video-makers were the loudest voices in the community. The move was to treat them as media partners, not influencers to pay.'] },
      { type: 'band', contain: true, src: P('ubisoft-siege/ubisoft-siege-champions-program-banner.png'),
        caption: 'The Siege Champions Program key art. The program brand identity, built with the Studio team.' },
      { type: 'section', kicker: '[03] · The program', title: 'Siege Champions.',
        body: [
          'Invite-only, 200 members across 18 markets: video creators and streamers, alongside cosplayers and artists. Bespoke onboarding, a brand identity, and a clear value exchange. Members got perks money can’t buy: early build access, exclusive in-game skins and charms designed for the program.',
          'Behind the scenes, I built the legal layer with Ubisoft’s teams: member NDAs, data protection, and jurisdiction-specific GDPR and NA processes. The compliance bar held across all 18 markets.',
        ] },
      { type: 'rewards', light: true,
        eyebrow: 'What members got',
        title: 'Paid in status, not dollars.',
        lead: 'Members got perks money can’t buy. A physical welcome pack, and exclusive in-game items designed with the Studio team: a Rook operator skin, an SMG weapon skin, a members charm, and a Twitch Drop giveaway charm. Items no one outside the 200 could own.',
        goodiesLabel: 'The physical welcome pack',
        goodies: [
          { src: P('ubisoft-siege/ubisoft-siege-champions-goodies-01.png'), cap: 'The welcome box, with a custom Siege Champions LED sign.' },
          { src: P('ubisoft-siege/ubisoft-siege-champions-goodies-02.png'), cap: 'A program-branded HyperX headset.' },
        ],
        itemsLabel: 'In the game',
        credit: 'The four exclusive in-game items made for members: Rook skin, SMG, members charm, and giveaway charm. Video assets by Gabriel Virata Alves.',
        items: [
          { src: P('ubisoft-siege/ubisoft-siege-champions-social-rook.mp4') },
          { src: P('ubisoft-siege/ubisoft-siege-champions-social-smg.mp4') },
          { src: P('ubisoft-siege/ubisoft-siege-champions-social-charm-members.mp4') },
          { src: P('ubisoft-siege/ubisoft-siege-champions-social-charm-giveaway.mp4') },
        ] },
      { type: 'ratio', a: { value: '200', label: 'Program members' }, b: { value: '70,000,000', label: 'Rainbow Six Siege players' },
        caption: 'Skins and charms no one else could own. FOMO and major show-off status.' },
      { type: 'section', kicker: '[04] · The mechanic', title: 'One pulsepoint per season.',
        body: [
          'Siege runs a seasonal release cadence, so the program concentrated all member activity into one moment per season: a pulsepoint.',
          'At every pulsepoint, members got the same treatment as press, dev briefings, early build access, content packs, plus two exclusive Twitch Drop charms to give away. Exclusivity, early access and a giveaway lever made a coordinated creator sprint, timed to the seasonal hype window.',
        ] },
      { type: 'result', tight: true, kicker: 'First pulsepoint · Crimson Heist Y6S1', value: '$0 spent',
        caption: '6M video views, 2.4M live watch-hours, 393K interactions. On a paid-media basis, a six-figure spend. We didn’t spend it.' },
      { type: 'section', divider: true, kicker: '[05] · Year one, in full', title: 'The playbook in action.',
        body: ['50M+ UGC views across the program. 87% of activations held across four seasons. 90% member engagement inside activations. 83% average positive sentiment. A repeatable media channel for creators, artists and cosplayers.'] },
      { type: 'seasons', items: [
        { src: P('ubisoft-siege/ubisoft-siege-champions-s1-crimson-heist.webp'), cap: 'Y6S1 · Crimson Heist. The first pulsepoint.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-s2-north-star.jpeg'), cap: 'Y6S2 · North Star.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-s3-crystal-guard.avif'), cap: 'Y6S3 · Crystal Guard.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-s4-highcal.png'), cap: 'Y6S4 · High Calibre.' },
      ] },
      { type: 'splitmedia', divider: true, mediaWide: true, vcenter: true,
        kicker: '[06] · The legacy', title: 'Among the rarest skins in Siege.',
        caption: 'r/Rainbow6: “The Rarest Skin Bundle in Siege.” Two years after the program shipped.',
        images: [{ src: P('ubisoft-siege/ubisoft-siege-champions-reddit-post-full.png') }],
        body: ['Years on, the community is still talking about it. The program’s exclusive skins and charms are some of the rarest items in Siege.'] },
      { type: 'intro', divider: true, eyebrow: 'Made by members', title: 'A whole universe of fan-made work.' },
      { type: 'filmstrip', contain: true, items: [
        { src: P('ubisoft-siege/ubisoft-siege-champions-fan-art-bloodhound.png'), cap: 'By Bloodhound. Member of the Siege Champions Program.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-fan-art-kuroninji.png'), cap: 'Cosplay by KuroNinji. Member of the Siege Champions Program.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-fan-art-katamari.png'), cap: 'By Kalamri. Member of the Siege Champions Program.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-creator-bikinibodhi.png'), cap: 'Video by BikiniBodhi, to 1.5M subscribers. 1.3M views on the Crimson Heist drop.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-fan-art-redlolirani.png'), cap: 'Cosplay by Redlolirani. Member of the Siege Champions Program.' },
        { src: P('ubisoft-siege/ubisoft-siege-champions-fan-art-muffled.png'), cap: 'By Muffled. Member of the Siege Champions Program.' },
      ] },
      { type: 'takeaway', kicker: '[07] · The takeaway', title: 'The blueprint scaled.',
        lede: '200 creators reaching 50 million eyeballs through their own authentic tone of voice. A fan-led growth engine, at scale.',
        principles: [
          { num: '01', head: 'Build with the existing structure, not against it.', body: 'Siege already ran a seasonal release cadence. The program rode that cycle, amplifying every drop instead of carving out separate moments.' },
          { num: '02', head: 'Exclusivity + early access creates coordinated pulsepoints.', body: 'Invite-only status plus first-look material creates natural content windows during the moments that matter most.' },
          { num: '03', head: 'It’s a scalable playbook.', body: 'What worked at Delta Company worked at Siege Champions worked at the Assassin’s Creed Mentors Guild. A win-win that drives reach, engagement, and advocacy.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 06 · DELTA COMPANY ── */
  {
    id: 'delta', name: 'Delta Company', skin: 'dark', accent: '#7BA24E',
    hero: {
      meta: 'Ubisoft · Global · 2019–2020',
      eyebrow: 'Case study · Fan-led growth',
      title: 'Creating Delta Company.',
      lede: 'A first-of-its-kind community advocacy program at Ubisoft, unveiled live on the E3 stage to millions. I’d already kept sentiment high on the live game, Ghost Recon Wildlands, and was prepping the next, Breakpoint.',
      img: P('ubisoft-delta/05-laura-e3-stage.jpg'),
    },
    blocks: [
      { type: 'statement', text: 'Paid media buys reach. Delta earned it, and Ubisoft ran the same blueprint for years.' },
      { type: 'stats', items: [
        { value: '5', label: 'Community clusters' },
        { value: '14', label: 'Languages' },
        { value: '10M+', label: 'UGC views from members' },
        { value: '$100K+', label: 'Est. earned media value' },
      ] },
      { type: 'section', kicker: '[01] · The program', title: 'Delta Company.',
        body: [
          'A first-of-its-kind community advocacy program at Ubisoft. The first offered in 14 languages, open worldwide to 130 invited members across five distinct clusters.',
          'The gaming community isn’t one audience: creators, artists, cosplayers, feedback specialists, tournament players, each with a clear role, in line with the military branding of the game.',
        ] },
      { type: 'band', src: P('ubisoft-delta/02-ghost-recon-keyart.jpg'),
        caption: 'Tom Clancy’s Ghost Recon Breakpoint. The AAA title Delta Company was built around.' },
      { type: 'splitmedia', invert: true, mediaWide: true, tightBottom: true,
        kicker: '[02] · The brand', title: 'The Delta brand.',
        caption: 'The Delta logo animation.',
        images: [
          { src: P('ubisoft-delta/delta-logo-animation.mp4') },
          { src: P('ubisoft-delta/01-delta-badge-hero.png') },
          { src: P('ubisoft-delta/04-brand-variations.png') },
          { src: P('ubisoft-delta/03-five-clusters.png') },
        ],
        body: ['It had to complement Ghost Recon Breakpoint and stand on its own. I led the brief with Ubisoft’s internal team: key art and multiple lockups, with Diana Da Costa. The brand animations were made by Takeoff agency in Paris for the E3 stage assets.'] },
      { type: 'loops', padTop: 'clamp(40px,6vw,72px)', padBottom: 'clamp(80px,10vw,128px)', items: [
        { src: P('ubisoft-delta/clusters-takeoff.mp4'), cap: 'The five-cluster reveal.' },
        { src: P('ubisoft-delta/delta-map-animation.mp4'), cap: '“Worldwide.” A globe sweep across every country Delta Company was open in.' },
      ] },
      { type: 'stagehero', kicker: '[03] · Going live', title: 'UbiE3, on the biggest stage.',
        video: S('laura-e3-stage-wide.mp4'), poster: S('laura-e3-stage-wide-poster.jpg'),
        body: ['Delta was revealed live at UbiE3 2019 to millions of viewers. I worked with agency Takeoff on the stage assets and the community segment of the Ghost Recon presentation.'],
        link: { href: 'https://www.youtube.com/watch?v=P2tOLL_sAYk', text: 'Watch the full video here' } },
      { type: 'result', tight: true, kicker: 'Demand signal', value: '10K', caption: 'applications from the USA alone. For 130 invite-only spots.' },
      { type: 'intro', lead: 'A welcome pack fans showed off. Physical merch, in-game gear, the same Delta tee on their body and their character, developed with internal merch and studio teams. True metaverse.' },
      { type: 'filmstrip', contain: true, items: [
        { src: P('ubisoft-delta/ubisoft-delta-pr-pack-real.jpg'), cap: 'The physical welcome box: flask, badges, key tag.' },
        { src: P('ubisoft-delta/06-merch-beanie.png'), cap: 'Branded Delta merch: the members’ beanie.' },
        { src: P('ubisoft-delta/EDe8lJCWkAAY0Eh.jpg'), cap: 'Members in their Delta tees, out in the community.' },
        { src: P('ubisoft-delta/08-ingame-tshirt.jpg'), cap: 'The same tee, worn in-game.' },
        { src: P('ubisoft-delta/09-ingame-car.jpg'), cap: 'A members-only in-game vehicle.' },
        { src: P('ubisoft-delta/10-ingame-cap-weapon.png'), cap: 'In-game cap and weapon charm, made for members.' },
      ] },
      { type: 'ratio', a: { value: '130', label: 'Program members' }, b: { value: '15,000,000', label: 'Ghost Recon players' },
        caption: 'Exclusivity that drives FOMO and major show-off status.' },
      { type: 'section', kicker: '[04] · The loop, in action', title: 'How Delta saved the game.',
        body: [
          'At launch, sentiment across the 15M-strong community sank to 50% negative. Delta was the answer Ubisoft already had in the room: the deepest, most-trusted players.',
          'The program pivoted into a feedback engine feeding the Ghost Experience update, a top-to-bottom re-tuning shaped by members. Sentiment climbed back to over 80% positive.',
        ],
        link: { href: 'https://www.youtube.com/watch?v=F5g7fOzxGYY', text: 'Watch a behind-the-scenes video I produced on the Ghost Experience update' } },
      { type: 'intro', divider: true, eyebrow: '[05] · Made by members', title: 'A whole universe of fan-made work.' },
      { type: 'filmstrip', contain: true, items: [
        { src: P('ubisoft-delta/image0.jpg'), cap: 'Delta members in the wild. The program in person, at the booth.' },
        { src: P('ubisoft-delta/EIeDXghX0AEY945.jpg'), cap: 'Cosplay as photography. Shot by member Mademoiselle Bellec.' },
        { src: P('ubisoft-delta/EJBtWpTXYAAmlI3.jpg'), cap: 'Fan art. “Brother vs Brother”, made by a member.' },
        { src: P('ubisoft-delta/EJfvV_AU8AIAsfF.jpg'), cap: 'Fan video, by member channel NGN.' },
        { src: P('ubisoft-delta/EHeMce6XkAAJuLI.jpg'), cap: 'A cosplay action shot, staged by members.' },
      ] },
      { type: 'proof', kicker: 'The proof', value: '10M+', sub: 'UGC views, generated by program members',
        caption: 'From just 130 invited members. Earned, not bought.' },
      { type: 'takeaway', kicker: '[06] · The takeaway', title: 'This became the blueprint.',
        lede: 'I build systems that scale: the same model powered Ubisoft’s biggest community programs, and became the Fan Engine I run today.',
        principles: [
          { num: '01', head: 'Design it as a sub-brand.', body: 'Logo, identity, language, ritual, built inside the game’s universe so it pulled members deeper in.' },
          { num: '02', head: 'Structure and motivations.', body: 'Split your audience by user type, then give each both cross-cutting and unique motivations to pull the most out of every one.' },
          { num: '03', head: 'Build the legal layer in.', body: 'NDAs, data protection, EU/NA process. Compliance is what lets the model scale safely.' },
        ] },
      { type: 'cta' },
    ],
  },

  /* ── 07 · BLABLACAR ── */
  {
    id: 'blablacar', name: 'BlaBlaCar', skin: 'light', accent: '#2F6BD8',
    hero: {
      meta: 'BlaBlaCar · UK & Global · 2013–2016',
      eyebrow: 'Case study · Brand & Storytelling',
      title: 'Storytelling as growth.',
      lede: 'Where I learned storytelling, and turned it into growth. I helped launch the UK from zero, ran the brand’s presence at the country’s biggest festivals, then built the first-person storytelling system that carried one brand across 22 markets, at a €5 CAC.',
      img: P('blablacar/blablacar-covoiturage-festival-banner.webp'),
      imgAlt: 'Four people laughing and playing a ukulele in a car, BlaBlaCar first-person brand content',
    },
    blocks: [
      { type: 'statement', text: 'BlaBlaCar was growing fast across 22 markets, each telling its own story. I saw a way to align them behind one, told first-person by the people actually in the car.' },
      { type: 'stats', items: [
        { value: '0 → 1M', label: 'UK members, team launch' },
        { value: '€5', label: 'Cost per acquisition' },
        { value: '22', label: 'Markets, one brand' },
        { value: '90%', label: 'Fewer design requests' },
      ] },
      { type: 'section', kicker: '[01] · The opportunity', title: 'One story, 22 markets.',
        body: [
          'BlaBlaCar was growing at an exponential rate: new markets, new teams, dozens of social accounts, and content requests piling up. Every market was telling its own version of the brand.',
          'That was the opening. One story, told consistently and in the fans’ own voice, would travel further than 22 of them. And in the UK, a whole market was there to be built from scratch, with growth that cost less than throwing money at ads.',
        ] },
      { type: 'section', kicker: '[02] · The UK, from zero', title: 'Making carpooling part of the culture.',
        body: [
          'I joined in 2014 on the four-person team that launched the UK market. Carpooling with strangers was not yet a normal thing to do here, so the job was cultural before it was commercial.',
          'BlaBlaCar became Live Nation’s first ever Official Ridesharing Partner, across Latitude, Leeds and Reading. I handled the on-site presence and the communications around it, end to end: a team of 20 across the three festivals, 300-space priority-parking zones, the BlaBla Tents, a photobooth built into a functioning Mini, and a live ride board that paired 150+ post-its.',
          'Aggregate footprint: 2,200+ rides offered, 530+ cars in our priority lots, 3,000+ branded backpacks in attendees’ hands.',
        ] },
      { type: 'carousel', contain: true, items: [
        { src: P('blablacar/blablacar-tent.png'), cap: 'The BlaBla Tent at Latitude, Leeds and Reading. Branded inflatable dome, flags, deckchairs, the Mini photobooth, the lot.' },
        { src: P('blablacar/laura-tent-team-police.jpg'), cap: 'Running the team at Leeds. Police joined in for the fun.' },
        { src: P('blablacar/blablacar-priority-parking.jpeg'), cap: 'Members in the priority-parking lot at Latitude. Parked together, right by the entrance.' },
        { src: P('blablacar/blablacar-tweet-reading.png'), cap: 'Live Nation promoting BlaBlaCar on their own channels. @OfficialRandL: “Driving to Leeds Festival? Offer your ride on #BlaBlaCar and get FREE PRIORITY PARKING!”' },
        { src: P('blablacar/blablacar-ticket-winner.jpeg'), cap: 'A winner in the lot. Two weekend tickets to the next Latitude, drawn from everyone who used the priority parking.' },
      ] },
      { type: 'result', kicker: 'The behaviour change', value: '50%+',
        caption: 'of priority-parking users said they wouldn’t have rideshared without the partnership. The activation changed how people behaved.' },
      { type: 'section', divider: true, kicker: '[03] · The move', title: 'Real moments, not perfect gram.',
        body: [
          'In 2016 I moved to the central Brand and Design team as Global Brand Content Manager. There I rebuilt how BlaBlaCar told its story: first-person, shot on a phone, real carpool moments (laughing, singing, the view out the window) instead of polished “perfect gram” ads.',
          'I led with organic storytelling to build trust and demand, then layered paid on top of an audience that already wanted us. That brought acquisition to a €5 CAC.',
        ] },
      { type: 'quote',
        quote: 'BlaBlaCar is all about stories. Every shared ride is a human connection, so I built the brand to sound like one.',
        cite: 'Laura Cordrey, Global Brand Content Manager, BlaBlaCar.' },
      { type: 'result', kicker: 'The result', value: '€5',
        caption: 'cost per acquisition, organic first and paid second. Trust built the demand, so every paid pound went further.' },
      { type: 'section', kicker: '[04] · The rollout', title: 'One brand, 22 markets.',
        body: [
          'I rolled one consistent brand across all 22 markets with a content system local teams could run themselves. It cut design requests by 90% while holding the KPIs, and kept the brand recognisable in every market.',
        ] },
      { type: 'takeaway', kicker: '[05] · The takeaway', title: 'Storytelling is growth.',
        lede: 'This is where I learned that storytelling is growth, not decoration. Real, first-person content built trust, trust built demand, and demand made every paid pound go further. It is the foundation of how I work now.',
        principles: [
          { num: '01', head: 'Lead organic, layer paid.', body: 'Stories earned the trust and the demand first. Paid then amplified an audience that already wanted us, which is what took acquisition to a €5 CAC.' },
          { num: '02', head: 'First person beats polish.', body: 'Real carpool moments shot on a phone outperformed the perfect gram. People believe the person in the passenger seat, not the ad.' },
          { num: '03', head: 'One brand, run locally.', body: 'A content system let 22 markets tell the same story in their own voice, and cut design requests by 90% while holding the KPIs.' },
        ] },
      { type: 'cta' },
    ],
  },
]

// Resolve internal cross-study anchors so links go to real /work routes.
orderedStudies.forEach((s) => {
  s.blocks.forEach((b) => {
    if (b.link && b.link.href) b.link = { ...b.link, href: xref(b.link.href) }
  })
})

const SLUG_TO_ID = {
  'us-mobile-dark-star': 'us-mobile',
  'claw-mobile': 'claw',
  'azarus': 'azarus-streamers',
  'azarus-game-ads': 'azarus-ads',
  'ubisoft-siege-champions': 'siege',
  'ubisoft-delta-company': 'delta',
  'blablacar-storytelling': 'blablacar',
}

export function getCinematicStudy(slug) {
  const id = SLUG_TO_ID[slug] || slug
  const idx = orderedStudies.findIndex((s) => s.id === id)
  if (idx < 0) return null
  const s = orderedStudies[idx]
  return { ...s, studyNum: String(idx + 1).padStart(2, '0') }
}

// Prev/next neighbours for the in-study footer. Wraps around the list so
// readers always land on another case study rather than a dead end.
export function getStudyNeighbours(slug) {
  const id = SLUG_TO_ID[slug] || slug
  const idx = orderedStudies.findIndex((s) => s.id === id)
  if (idx < 0) return { prev: null, next: null }
  const n = orderedStudies.length
  const at = (i) => {
    const s = orderedStudies[(i + n) % n]
    return { name: s.name, route: ROUTE[s.id] }
  }
  return { prev: at(idx - 1), next: at(idx + 1) }
}

export const allCinematicStudies = orderedStudies
