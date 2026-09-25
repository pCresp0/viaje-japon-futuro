export const tripMeta = {
  title: "Biyahe sa Hapon",
  subtitle: "13-Yugtong Ruta: Kanto, Fuji, Kansai, Chugoku, Okinawa & Hokkaido",
  welcomeParagraphs: [
    "Maligayang pagdating sa interactive na plataporma para sa aming <strong>darating na biyahe sa Hapon</strong>! Ang web app na ito ay isang aktibong proyekto na <strong>patuloy na binubuo at pinapaganda</strong> bilang command center upang planuhin, tantyahin ang badyet, at idokumento ang aming susunod na ekspedisyon sa <strong>13 kahanga-hangang yugto</strong>.",
    "Mula sa mga sinaunang templo at modernong gusali sa Tokyo, ang kabanalan ng Nikko at Kamakura, hanggang sa pag-akyat sa <strong>Mount Fuji</strong> (3,776 m) sa bukang-liwayway. Patungo sa masiglang Osaka, kasaysayan ng Hiroshima at lumulutang na torii sa banal na isla ng Miyajima; paglipad patungo sa malinaw na dagat ng Okinawa at Iriomote, at pagtatapos sa kalikasan at masarap na pagkain ng Hokkaido.",
    "<strong>Katayuan ng Proyekto:</strong> Nagsisilbi itong live na gabay bago ang biyahe: patuloy na inaayos ang mga yugto, iskedyul ng Shinkansen, domestic flights, ferries, at pagpili ng mga hotel at ryokan. Regular na ina-update ang bawat bahagi habang natutukoy ang mga pinal na detalye.",
    "Gumagana ang app nang <strong>100% offline (PWA)</strong>: kapag na-load na, magagamit ito kahit saan (sa eroplano, bullet train, o sa tuktok ng bundok) nang walang koneksyon sa internet. Huwag mag-atubiling tuklasin ang mapa at ang mga ruta habang binubuo ang plano!",
    "Maaari mong palitan ang wika anumang oras (Espanyol, Ingles, Pranses, Tagalog) gamit ang selector sa itaas."
  ],
  about: {
    title: "Tungkol sa Website",
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "Idinisenyo upang <strong>hindi umasa sa internet habang naglalakbay</strong>. Sa bullet train, sa bundok, o sa malalayong isla, gumagana pa rin ang app bilang isang client-side PWA."
      },
      {
        icon: "🗺️",
        title: "13-Yugtong Ruta & Interactive na Mapa",
        text: "Lahat ng 13 yugto ay nakakabit sa mapa gamit ang Leaflet, may filter bawat yugto at buong linya ng ruta sa buong Hapon."
      },
      {
        icon: "🗓️",
        title: "Dalawahang Itinerary (Detalyado & Mabilisang Tingin)",
        text: "Pumili sa pagitan ng detalyadong gabay (oras, konteksto, transportasyon) at mabilisang metro-style timeline, may direktang link sa mapa at PDF export."
      },
      {
        icon: "🚅",
        title: "Transportasyon, Shinkansen & Pases",
        text: "Kumpletong gabay: Narita Express, Tokaido/Sanyo Shinkansen, regional passes (Tobu Nikko Pass, Osaka Metro, Miyajima Ferry), digital Suica card, at pagpapadala ng bagahe (Takkyubin)."
      },
      {
        icon: "🏨",
        title: "Mga Inirekumendang Tuluyan",
        text: "Gabay para sa 7 base (Tokyo, refuge sa Mount Fuji, Osaka, ryokan sa Miyajima, Okinawa, Iriomote, at Sapporo) na may onsen at payo sa pag-book."
      },
      {
        icon: "📜",
        title: "Kasaysayan, Dokumentaryo & Podcasts",
        text: "Kumpletong seksyon ng kultura na may kasaysayan, Text-to-Speech audio player, podcasts, at dokumentaryo."
      },
      {
        icon: "🔍",
        title: "Matalinong Paghahanap (Global Search)",
        text: "Mabilis na search engine na naghahanap sa lahat ng lugar, transportasyon, pagkain, at kultura."
      },
      {
        icon: "🌦️",
        title: "Panahon sa Tunay na Oras",
        text: "Pagtataya ng panahon mula sa Open-Meteo para sa lahat ng lungsod na may 12-oras na offline cache."
      },
      {
        icon: "💰",
        title: "Tinatayang Badyet & Checklist",
        text: "Kalkulasyon ng gastos bawat kategorya at checklist ng paghahanda na nai-save sa <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Apat na Katutubong Wika",
        text: "Buong suporta para sa <strong>Espanyol, Ingles, Pranses, at Tagalog</strong>."
      }
    ],
    github: "Tingnan ang source code sa GitHub"
  }
};

export const flights = {
  out: {
    label: "Papasok na Pandaigdigang Lipad",
    text: "Pandaigdigang lipad papuntang Tokyo Narita (NRT) o Haneda (HND). Direktang lipad o may koneksyon sa Gitnang Silangan o Europa.",
  },
  back: {
    label: "Pauwing Pandaigdigang Lipad",
    text: "Pauwing pandaigdigang lipad mula Tokyo Narita (NRT) pagkatapos ng domestic flight mula Hokkaido.",
  },
};

export const blocks = [
  {
    id: "kanto",
    title: "Kanto: Tokyo, Nikko & Kamakura",
    sleepSummary: "Base sa Tokyo (4 na gabi)",
    bestArea: "Shinjuku para sa transportasyon, o Asakusa/Ueno para sa tradisyunal na ganda.",
  },
  {
    id: "fuji",
    title: "Tuktok ng Mount Fuji",
    sleepSummary: "Mountain hut (Yamagoya) sa ika-7 o ika-8 istasyon (1 gabi)",
    bestArea: "Naka-book na kubo sa Yoshida Trail para sa pagsikat ng araw sa 3,776m.",
  },
  {
    id: "kansai",
    title: "Kansai: Tradisyonal na Osaka & Templo",
    sleepSummary: "Base sa Osaka (2 gabi)",
    bestArea: "Namba / Dotonbori para sa pagkain at gabi, o Umeda para sa Shinkansen.",
  },
  {
    id: "chugoku",
    title: "Chugoku: Hiroshima & Miyajima",
    sleepSummary: "Hiroshima / Ryokan sa isla ng Miyajima (2 gabi)",
    bestArea: "Tradisyunal na ryokan sa Miyajima para sa tahimik na gabi kasama ang lumulutang na torii.",
  },
  {
    id: "okinawa",
    title: "Isla ng Ryukyu: Okinawa & Iriomote",
    sleepSummary: "Naha & Eco-lodge sa Iriomote (2 gabi)",
    bestArea: "Naha center at eco-lodge sa kagubatan ng Iriomote.",
  },
  {
    id: "hokkaido",
    title: "Wild Hokkaido & Pamamaalam sa Tokyo",
    sleepSummary: "Sapporo (1 gabi) at Tokyo / Narita (1 gabi)",
    bestArea: "Sentro ng Sapporo malapit sa Odori Park, at hotel sa Tokyo o paliparan ng Narita.",
  },
];

export const stays = [
  {
    city: "Tokyo",
    nights: "Araw 1 hanggang 4 (4 na gabi)",
    options: [
      {
        name: "Tokyo Base Hotel (Shinjuku / Asakusa / Ueno)",
        total: "Tinatayang €110–€160 / gabi",
        note: "Magandang base para sa Tokyo, Nikko at Kamakura nang hindi lumilipat ng hotel.",
      }
    ]
  },
  {
    city: "Mount Fuji",
    nights: "Araw 5 (1 gabi)",
    options: [
      {
        name: "Yamagoya Mountain Hut (Ika-7 o Ika-8 Istasyon)",
        total: "Tinatayang €70–€95 / tao (kasama ang hapunan at almusal)",
        note: "Mahalagang karanasan upang magpahinga bago ang pag-akyat sa tuktok sa hatinggabi.",
      }
    ]
  },
  {
    city: "Osaka",
    nights: "Araw 6 & 7 (2 gabi)",
    options: [
      {
        name: "Osaka Base Hotel (Namba / Dotonbori / Umeda)",
        total: "Tinatayang €95–€140 / gabi",
        note: "Tanggapin ang mga ipinadalang maleta rito. Subukan ang street food sa Dotonbori.",
      }
    ]
  },
  {
    city: "Hiroshima & Miyajima",
    nights: "Araw 8 & 9 (2 gabi)",
    options: [
      {
        name: "Tradisyunal na Ryokan sa Isla ng Miyajima / Hotel sa Hiroshima Station",
        total: "Tinatayang €130–€220 / gabi (Ryokan na may onsen at kaiseki dinner)",
        note: "Ang pagtulog sa Miyajima ay nagbibigay-daan upang makita ang lumulutang na torii sa gabi nang mapayapa.",
      }
    ]
  },
  {
    city: "Okinawa & Yaeyama",
    nights: "Araw 10 & 11 (2 gabi)",
    options: [
      {
        name: "Hotel sa Naha (Gabi 10) & Eco-Lodge sa Iriomote (Gabi 11)",
        total: "Tinatayang €110–€170 / gabi",
        note: "Turquoise na tubig, stargazing sa Dark Sky Park, at pamamangka sa mangrove.",
      }
    ]
  },
  {
    city: "Sapporo (Hokkaido)",
    nights: "Araw 12 (1 gabi)",
    options: [
      {
        name: "Hotel sa Sentro ng Sapporo (Odori / Susukino)",
        total: "Tinatayang €85–€130 / gabi",
        note: "Kabisera ng masasarap na pagkain: miso ramen, alimango at serbesa ng Sapporo.",
      }
    ]
  },
  {
    city: "Tokyo / Narita",
    nights: "Araw 13 (Huling gabi)",
    options: [
      {
        name: "Huling Hotel sa Tokyo o Hotel malapit sa Narita Airport",
        total: "Tinatayang €90–€140 / gabi",
        note: "Pamimili ng pasalubong sa Ginza, huling hapunan, at madaling biyahe papuntang Narita.",
      }
    ]
  },
];

export const transports = [
  { name: "Narita Express (N'EX) / Keisei Skyliner", desc: "Mabilis na tren mula sa paliparan patungong Tokyo, Shinjuku, o Ueno." },
  { name: "Tokyo Subway & JR Yamanote Line", desc: "24/48/72h subway pass at digital Suica card sa cellphone." },
  { name: "Tobu Limited Express Spacia X", desc: "Magandang tren para sa day trip sa Nikko World Heritage." },
  { name: "Linyang JR Yokosuka & Enoden Retro Train", desc: "Direktang tren papuntang Kamakura Great Buddha at tabing-dagat." },
  { name: "Express Bus papuntang Mount Fuji", desc: "Direktang bus mula Busta Shinjuku hanggang 5th Station (2,300m)." },
  { name: "Bus + Tokaido Shinkansen (Hikari / Nozomi)", desc: "Bullet train mula Mishima Station patungong Shin-Osaka." },
  { name: "Mga Linya ng Subway sa Osaka", desc: "Subway sa buong Namba, Tennoji, at Umeda." },
  { name: "Sanyo Shinkansen papuntang Hiroshima + Hiroden Tram", desc: "Bullet train pakanluran sa Hiroshima (1h 25m) at lumang tram." },
  { name: "Linyang JR Sanyo + JR West Miyajima Ferry", desc: "Maikling tren at magandang ferry na dumadaan sa tapat ng torii." },
  { name: "Domestic Flight papuntang Okinawa + Yui Rail", desc: "Lipad sa Naha Airport at monorail papasok sa lungsod." },
  { name: "Lipad sa Ishigaki + Mabilis na Ferry sa Iriomote", desc: "Pagpunta sa Yaeyama archipelago at pambansang parke." },
  { name: "Domestic Flight sa Sapporo + JR Rapid Airport", desc: "Lipad pahilaga sa Hokkaido at express train papuntang Sapporo." },
  { name: "Lipad Sapporo pabalik sa Tokyo + Narita Express", desc: "Pagbabalik sa kabisera, huling hapunan, at biyahe sa paliparan." },
];

export const budget = {
  totalPerPerson: "€3,750",
  totalGroup: "€3,750 / manlalakbay (kumpletong pagtatantya)",
  note: "Makatotohanang pagtatantya para sa buong 13-yugtong biyahe kasama ang mga lipad, tuluyan, bullet train, pagkain, at pasyalan.",
};
