export const tripMeta = {
  title: "Trip to Japan",
  subtitle: "13-Stage Route: Kanto, Fuji, Kansai, Chugoku, Okinawa & Hokkaido",
  welcomeParagraphs: [
    "Welcome to the interactive platform for our <strong>upcoming future trip to Japan</strong>! This web app is a living project in <strong>active development</strong>, designed as the digital command center to plan, budget, and document our next expedition across the Japanese archipelago across <strong>13 memorable stages</strong>.",
    "From ancient temples and futuristic skylines in Tokyo, the sacred grandeur of Nikko and Kamakura, to summiting <strong>Mount Fuji</strong> (3,776 m) at dawn. Continuing to vibrant Osaka, the historical memory of Hiroshima and the floating torii gate of holy Miyajima island; then flying south to the turquoise waters and starry skies of Okinawa and Iriomote, culminating in the wild alpine nature and world-class cuisine of Hokkaido.",
    "<strong>Project Status & Purpose:</strong> It serves as a working laboratory and digital roadmap prior to departure: consolidating itineraries under active construction, budget projections, bullet train (Shinkansen) schedules, domestic flights, ferries, and strategic accommodation bases. Content is continuously refined and expanded as bookings and schedules solidify.",
    "The application is built with a <strong>100% offline (PWA)</strong> architecture: once loaded, it works anywhere (on flights, high-speed trains, or mountaintops) without cellular data. Enjoy exploring the interactive map, itinerary drafts, and following the journey's preparation!",
    "You can switch languages anytime (Spanish, English, French, Tagalog) using the selector above."
  ],
  about: {
    title: "About the web",
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "Designed to <strong>never rely on internet during the trip</strong>. On high-speed trains, high mountains, or remote islands, the app keeps running 100% as a client-side PWA."
      },
      {
        icon: "🗺️",
        title: "13-Stage Route & Interactive Map",
        text: "All 13 stages connected with a lightweight Leaflet vector map, stage filters, and geographic route polyline across Japan."
      },
      {
        icon: "🗓️",
        title: "Dual Itinerary (Detailed & Quick View)",
        text: "Switch between in-depth stage guides (schedules, context, lore, transport) and quick metro-style timeline views, with direct map links and PDF export."
      },
      {
        icon: "🚅",
        title: "Transit, Bullet Trains & Passes",
        text: "Full transport breakdown: Narita Express, Tokaido/Sanyo Shinkansen, regional passes (Tobu Nikko Pass, Osaka Metro, Miyajima Ferry), digital IC card (Suica/Pasmo), and Takkyubin luggage shipping."
      },
      {
        icon: "🏨",
        title: "Recommended Bases & Lodging",
        text: "Guides for all 7 route hubs (Tokyo, Mount Fuji mountain hut, Osaka, Miyajima ryokan, Okinawa, Iriomote, and Sapporo) with onsen info and booking tips."
      },
      {
        icon: "📜",
        title: "History, Documentaries & Podcasts",
        text: "Rich multimedia section with chronological history, native Text-to-Speech audio player, podcasts, and documentaries."
      },
      {
        icon: "🔍",
        title: "Smart Global Search",
        text: "Instant reactive search indexing all places, transit, foods, history, and pop culture highlights."
      },
      {
        icon: "🌦️",
        title: "Real-Time Weather with Cache",
        text: "Open-Meteo forecasts for all route stops with 12-hour local caching for offline consultation."
      },
      {
        icon: "💰",
        title: "Estimated Budget & Planning Checklist",
        text: "Financial breakdown by category and persistent chronological preparation checklists in <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Native Multi-Language (4 Languages)",
        text: "Full native support for <strong>Spanish, English, French, and Tagalog</strong>."
      }
    ],
    github: "View source code on GitHub"
  }
};

export const flights = {
  out: {
    label: "Outbound International Flight",
    text: "International flight from home to Tokyo Narita (NRT) or Haneda (HND). Direct options or single connection via Middle East or Europe.",
  },
  back: {
    label: "Inbound International Flight",
    text: "Return international flight departing from Tokyo Narita (NRT) after the domestic connection from Hokkaido.",
  },
};

export const blocks = [
  {
    id: "kanto",
    title: "Kanto: Tokyo, Nikko & Kamakura",
    sleepSummary: "Base in Tokyo (4 nights)",
    bestArea: "Shinjuku for transport hubs, or Asakusa/Ueno for traditional charm and quick Nikko connection.",
  },
  {
    id: "fuji",
    title: "Mount Fuji Summit",
    sleepSummary: "Mountain hut (Yamagoya) at 7th or 8th station (1 night)",
    bestArea: "Reserved hut on Yoshida Trail for sunrise at 3,776m.",
  },
  {
    id: "kansai",
    title: "Kansai: Classic Osaka & Shrines",
    sleepSummary: "Base in Osaka (2 nights)",
    bestArea: "Namba / Dotonbori for food & nightlife, or Umeda for Shinkansen connections.",
  },
  {
    id: "chugoku",
    title: "Chugoku: Hiroshima & Miyajima",
    sleepSummary: "Hiroshima / Ryokan on Miyajima island (2 nights)",
    bestArea: "Traditional ryokan on Miyajima island to enjoy the illuminated floating torii gate after day crowds depart.",
  },
  {
    id: "okinawa",
    title: "Ryukyu Islands: Okinawa & Iriomote",
    sleepSummary: "Naha & Eco-lodge in Iriomote (2 nights)",
    bestArea: "Naha center near Kokusai-dori and eco-lodge in the subtropical jungle of Iriomote.",
  },
  {
    id: "hokkaido",
    title: "Wild Hokkaido & Tokyo Farewell",
    sleepSummary: "Sapporo (1 night) and Tokyo / Narita (1 night)",
    bestArea: "Central Sapporo near Odori Park, and Tokyo or Narita airport hotel.",
  },
];

export const stays = [
  {
    city: "Tokyo",
    nights: "Days 1 to 4 (4 nights)",
    options: [
      {
        name: "Tokyo Base Hotel (Shinjuku / Asakusa / Ueno)",
        total: "Approx. €110–€160 / night",
        note: "Ideal base to explore Tokyo and make day trips to Nikko and Kamakura without changing hotels. Ship big luggage to Osaka via Takkyubin on Day 4.",
      }
    ]
  },
  {
    city: "Mount Fuji",
    nights: "Day 5 (1 night)",
    options: [
      {
        name: "Yamagoya Mountain Hut (7th or 8th Station)",
        total: "Approx. €70–€95 / person (dinner & breakfast included)",
        note: "Essential high-mountain experience to rest before the nighttime summit climb to 3,776m.",
      }
    ]
  },
  {
    city: "Osaka",
    nights: "Days 6 & 7 (2 nights)",
    options: [
      {
        name: "Osaka Base Hotel (Namba / Dotonbori / Umeda)",
        total: "Approx. €95–€140 / night",
        note: "Receive forwarded luggage here. Enjoy Dotonbori street food, Osaka Castle, and hidden shrines.",
      }
    ]
  },
  {
    city: "Hiroshima & Miyajima",
    nights: "Days 8 & 9 (2 nights)",
    options: [
      {
        name: "Traditional Ryokan on Miyajima Island / Hotel at Hiroshima Station",
        total: "Approx. €130–€220 / night (Ryokan with onsen & kaiseki dinner)",
        note: "Staying on Miyajima island allows enjoying the serene illuminated torii gate when day-trippers leave.",
      }
    ]
  },
  {
    city: "Okinawa & Yaeyama",
    nights: "Days 10 & 11 (2 nights)",
    options: [
      {
        name: "Naha Hotel (Night 10) & Iriomote Eco-Lodge (Night 11)",
        total: "Approx. €110–€170 / night",
        note: "Turquoise coral waters, certified Dark Sky Park stargazing, and mangrove kayaking.",
      }
    ]
  },
  {
    city: "Sapporo (Hokkaido)",
    nights: "Day 12 (1 night)",
    options: [
      {
        name: "Sapporo City Center Hotel (Odori / Susukino)",
        total: "Approx. €85–€130 / night",
        note: "Hokkaido food capital: miso ramen, fresh snow crab, and Sapporo beer.",
      }
    ]
  },
  {
    city: "Tokyo / Narita",
    nights: "Day 13 (Farewell night)",
    options: [
      {
        name: "Farewell Hotel in Tokyo or Narita Airport Hotel",
        total: "Approx. €90–€140 / night",
        note: "Souvenir shopping in Ginza, farewell banquet, and easy access to Narita for the flight home.",
      }
    ]
  },
];

export const transports = [
  { name: "Narita Express (N'EX) / Keisei Skyliner", desc: "Fast airport express train to Tokyo station, Shinjuku, or Ueno." },
  { name: "Tokyo Subway & JR Yamanote Line", desc: "Subway 24/48/72h pass + digital Suica card on phone." },
  { name: "Tobu Limited Express Spacia X", desc: "Scenic express train for Nikko World Heritage day trip." },
  { name: "JR Yokosuka & Enoden Electric Railway", desc: "Direct train to Kamakura Great Buddha and coastal retro train." },
  { name: "Highway Express Bus to Mount Fuji", desc: "Direct bus from Busta Shinjuku to Fuji Subaru 5th Station (2,300m)." },
  { name: "Bus + Tokaido Shinkansen (Hikari / Nozomi)", desc: "High-speed bullet train from Mishima Station to Shin-Osaka." },
  { name: "Osaka Metro Lines (Midosuji & Tanimachi)", desc: "Urban subway lines across Namba, Tennoji, and Umeda." },
  { name: "Sanyo Shinkansen to Hiroshima + Hiroden Tram", desc: "Bullet train west to Hiroshima (1h 25m) and historic tram." },
  { name: "JR Sanyo Line + JR West Miyajima Ferry", desc: "Short train and scenic ferry directly curving past the floating torii." },
  { name: "Domestic Flight to Okinawa + Yui Rail", desc: "Flight to Naha Airport and elevated monorail into the city." },
  { name: "Flight to Ishigaki + High-speed Ferry to Iriomote", desc: "Hop to Yaeyama archipelago and wilderness national park." },
  { name: "Domestic Flight to Sapporo + JR Rapid Airport", desc: "Northward flight to Hokkaido and express train to Sapporo." },
  { name: "Domestic Flight Sapporo to Tokyo + Narita Express", desc: "Return to capital, farewell dinner, and airport transfer." },
];

export const budget = {
  totalPerPerson: "€3,750",
  totalGroup: "€3,750 / traveler (complete estimate)",
  note: "Comprehensive and realistic estimate for the full 13-stage journey including all flights, lodging, high-speed rail, dining, and activities.",
};
