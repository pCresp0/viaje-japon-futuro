export const stops = [
  // ── DÍA 1: Llegada a Japón y traslado a Tokio ─────────────────────
  {
    id: "narita-airport", name: "Aeropuerto Internacional de Narita (NRT)", city: "Chiba / Tokio",
    lat: 35.7719, lng: 140.3929,
    emoji: "🛬", color: "#1d3557",
    day: "Día 1",
    detail: "Aterrizaje en Japón, aduanas con QR de Visit Japan Web y tren Narita Express / Skyliner a Tokio.",
  },
  {
    id: "tokyo-base", name: "Hotel Base Tokio (Shinjuku / Asakusa)", city: "Tokio",
    lat: 35.6909, lng: 139.7003,
    emoji: "🏨", color: "#1d3557",
    day: "Días 1, 2, 3, 4",
    detail: "Alojamiento base para los primeros 4 días: check-in, descanso y cena de bienvenida.",
  },

  // ── DÍA 2: Tokio imprescindible: Iconos, templos y miradores ──────
  {
    id: "sensoji", name: "Templo Senso-ji & Kaminarimon", city: "Tokio",
    lat: 35.7148, lng: 139.7967,
    emoji: "⛩️", color: "#1d3557",
    day: "Día 2",
    detail: "El templo más antiguo y venerado de Tokio, puerta de la gran linterna roja y calle Nakamise.",
  },
  {
    id: "meiji-jingu", name: "Santuario Meiji Jingu & Bosque de Yoyogi", city: "Tokio",
    lat: 35.6764, lng: 139.6993,
    emoji: "🌲", color: "#1d3557",
    day: "Día 2",
    detail: "Oasis sagrado de 70.000 árboles milenarios y gran torii de madera en mitad de la metrópoli.",
  },
  {
    id: "shibuya-scramble", name: "Cruce de Shibuya & Mirador Shibuya Sky", city: "Tokio",
    lat: 35.6595, lng: 139.7005,
    emoji: "🚦", color: "#1d3557",
    day: "Día 2",
    detail: "El cruce peatonal más transitado del mundo, estatua de Hachiko y vistas 360° desde 229m de altura.",
  },
  {
    id: "shinjuku-omoide", name: "Omoide Yokocho & Mirador del TMG", city: "Tokio",
    lat: 35.6931, lng: 139.6997,
    emoji: "🏮", color: "#1d3557",
    day: "Día 2",
    detail: "Callejones estrechos de yakitori a la brasa bajo los neones y mirador gratuito del rascacielos TMG.",
  },

  // ── DÍA 3: Excursión a Nikko: Mausoleo de Ieyasu y cascadas ────────
  {
    id: "nikko-shinkyo", name: "Puente Sagrado Shinkyo", city: "Nikko",
    lat: 36.7533, lng: 139.6041,
    emoji: "🌉", color: "#c9a227",
    day: "Día 3",
    detail: "Pasarela ceremonial de madera bermellón sobre el río Daiya a la entrada del recinto sagrado.",
  },
  {
    id: "nikko-toshogu", name: "Santuario Toshogu (Mausoleo de Ieyasu)", city: "Nikko",
    lat: 36.7581, lng: 139.5989,
    emoji: "🏯", color: "#c9a227",
    day: "Día 3",
    detail: "Patrimonio UNESCO: Puerta Yomeimon con 500 tallas doradas, los Tres Monos Sabios y Nemuri-neko.",
  },
  {
    id: "nikko-kegon", name: "Cataratas Kegon & Lago Chuzenji", city: "Nikko",
    lat: 36.7380, lng: 139.5020,
    emoji: "🌊", color: "#c9a227",
    day: "Día 3",
    detail: "Impresionante salto vertical de 97 metros y lago volcánico a los pies del monte sagrado Nantai.",
  },

  // ── DÍA 4: Tokio alternativo y escapada costera a Kamakura ────────
  {
    id: "kamakura-daibutsu", name: "Gran Buda Daibutsu de Kamakura (Kotoku-in)", city: "Kamakura",
    lat: 35.3168, lng: 139.5357,
    emoji: "🗿", color: "#2e7d5b",
    day: "Día 4",
    detail: "Colosal estatua de bronce de 13,35 m fundida en 1252, meditando al aire libre frente al cielo.",
  },
  {
    id: "kamakura-hasedera", name: "Templo Hasedera & Bahía Sagami", city: "Kamakura",
    lat: 35.3125, lng: 139.5331,
    emoji: "🌸", color: "#2e7d5b",
    day: "Día 4",
    detail: "Estatua de Kannon de once rostros, terrazas ajardinadas y vistas panorámicas al océano Pacífico.",
  },
  {
    id: "tokyo-akihabara", name: "Akihabara Electric Town", city: "Tokio",
    lat: 35.6997, lng: 139.7714,
    emoji: "👾", color: "#1d3557",
    day: "Día 4",
    detail: "La meca mundial de la cultura pop, tiendas de figuras de coleccionismo, arcades y electrónica retro.",
  },

  // ── DÍA 5: Ascensión al Monte Fuji: De Tokio a la cumbre (3.776 m) ──
  {
    id: "fuji-5th-station", name: "5ª Estación Fuji Subaru Line (2.300 m)", city: "Monte Fuji",
    lat: 35.3948, lng: 138.7328,
    emoji: "🚌", color: "#457b9d",
    day: "Día 5",
    detail: "Inicio del sendero Yoshida, compra del bastón de peregrino (kongo-zue) y aclimatación a la altitud.",
  },
  {
    id: "fuji-summit", name: "Cumbre del Monte Fuji & Pico Kengamine (3.776 m)", city: "Monte Fuji",
    lat: 35.3606, lng: 138.7274,
    emoji: "🗻", color: "#457b9d",
    day: "Día 5",
    detail: "Amanecer sagrado Goraiko sobre el mar de nubes y circuito Ohachi-meguri alrededor del cráter volcánico.",
  },

  // ── DÍA 6: Monte Fuji → Osaka clásico: Castillo y Dotonbori ───────
  {
    id: "osaka-castle", name: "Castillo de Osaka & Murallas defensivas", city: "Osaka",
    lat: 34.6873, lng: 135.5262,
    emoji: "🏯", color: "#bc4749",
    day: "Día 6",
    detail: "Fortaleza feudal de Toyotomi Hideyoshi, fosos de piedra ciclópeos y remates dorados de Shachihoko.",
  },
  {
    id: "osaka-dotonbori", name: "Canal Dotonbori & Letrero Glico Man", city: "Osaka",
    lat: 34.6687, lng: 135.5013,
    emoji: "🐙", color: "#bc4749",
    day: "Día 6",
    detail: "El corazón nocturno de Kansai: festín de Takoyaki recién hecho, brochetas Kushikatsu y neones gigantes.",
  },

  // ── DÍA 7: Templos ocultos y misterios de Osaka ───────────────────
  {
    id: "namba-yasaka", name: "Santuario Namba Yasaka (Cabeza de León)", city: "Osaka",
    lat: 34.6619, lng: 135.4968,
    emoji: "🦁", color: "#bc4749",
    day: "Día 7",
    detail: "Pabellón monumental con forma de cabeza de león de 12 metros con las fauces abiertas para devorar la mala suerte.",
  },
  {
    id: "kuromon-market", name: "Mercado Kuromon Ichiba", city: "Osaka",
    lat: 34.6659, lng: 135.5065,
    emoji: "🍣", color: "#bc4749",
    day: "Día 7",
    detail: "'La despensa de Osaka': brochetas de Wagyu A5 a la brasa, vieiras a la plancha y sashimi fresco.",
  },
  {
    id: "umeda-sky", name: "Mirador Umeda Sky Building (173 m)", city: "Osaka",
    lat: 34.7053, lng: 135.4900,
    emoji: "🏙️", color: "#bc4749",
    day: "Día 7",
    detail: "Escaleras mecánicas flotantes suspendidas entre dos rascacielos y terraza panorámica sobre la bahía.",
  },

  // ── DÍA 8: Osaka → Hiroshima y Nagasaki: Memoria de paz ───────────
  {
    id: "hiroshima-peace-park", name: "Parque y Museo Memorial de la Paz", city: "Hiroshima",
    lat: 34.3928, lng: 132.4526,
    emoji: "🕊️", color: "#1b263b",
    day: "Día 8",
    detail: "Cenotafio en memoria de las víctimas, Llama de la Paz y monumento de las mil grullas de Sadako Sasaki.",
  },
  {
    id: "hiroshima-genbaku", name: "Cúpula de la Bomba Atómica (Genbaku Dome)", city: "Hiroshima",
    lat: 34.3955, lng: 132.4536,
    emoji: "🏛️", color: "#1b263b",
    day: "Día 8",
    detail: "Edificio preservado en su ruina exacta desde el 6 de agosto de 1945, símbolo universal de abolición nuclear.",
  },
  {
    id: "okonomimura", name: "Okonomimura (El pueblo del Okonomiyaki)", city: "Hiroshima",
    lat: 34.3917, lng: 132.4611,
    emoji: "🥢", color: "#1b263b",
    day: "Día 8",
    detail: "Edificio de 4 plantas con decenas de pequeños mostradores de okonomiyaki artesanal por capas con fideos yakisoba.",
  },

  // ── DÍA 9: Isla sagrada de Miyajima: Torii flotante y Monte Misen ─
  {
    id: "miyajima-itsukushima", name: "Santuario Itsukushima & Gran Torii Flotante", city: "Miyajima",
    lat: 34.2958, lng: 132.3197,
    emoji: "⛩️", color: "#e63946",
    day: "Día 9",
    detail: "Maravilla sobre pilotes en el mar interior de Seto: torii bermellón flotante en pleamar y transitable en bajamar.",
  },
  {
    id: "miyajima-misen", name: "Monte Misen & Templo Reikado (535 m)", city: "Miyajima",
    lat: 34.2797, lng: 132.3197,
    emoji: "⛰️", color: "#e63946",
    day: "Día 9",
    detail: "Cumbre sagrada con vistas de 360°, la llama eterna de 1.200 años encendida por Kobo Daishi y ciervos en libertad.",
  },

  // ── DÍA 10: Hacia el sur subtropical: Okinawa y Archipiélago Ryukyu 
  {
    id: "okinawa-shuri", name: "Castillo de Shuri (Gusuku Imperial)", city: "Naha (Okinawa)",
    lat: 26.2170, lng: 127.7195,
    emoji: "🏯", color: "#2e7d5b",
    day: "Día 10",
    detail: "El corazón palaciego del milenario Reino de Ryukyu, fusionando arquitectura china y sintoísta japonesa.",
  },
  {
    id: "okinawa-kokusai", name: "Calle Kokusai-dori & Mercado Makishi", city: "Naha (Okinawa)",
    lat: 26.2153, lng: 127.6853,
    emoji: "🌺", color: "#2e7d5b",
    day: "Día 10",
    detail: "La vibrante arteria de Naha: pescado tropical, licor Awamori tradicional, Okinawa Soba y algas Umi-budo.",
  },

  // ── DÍA 11: Isla salvaje de Iriomote: Dark Sky Park y manglares ───
  {
    id: "iriomote-park", name: "Parque Nacional Iriomote (Dark Sky Park)", city: "Isla de Iriomote",
    lat: 24.3333, lng: 123.8333,
    emoji: "✨", color: "#2e7d5b",
    day: "Día 11",
    detail: "Primer Dark Sky Park de Asia: nula contaminación lumínica para observar la Vía Láctea y la Cruz del Sur sobre el mar.",
  },
  {
    id: "iriomote-pinaisara", name: "Cascada Pinaisara (55 m) & Kayak en Manglares", city: "Isla de Iriomote",
    lat: 24.4000, lng: 123.8167,
    emoji: "🚣", color: "#2e7d5b",
    day: "Día 11",
    detail: "Ruta guiada en kayak por estuarios selváticos y trekking hacia la mayor cascada de Okinawa.",
  },

  // ── DÍA 12: Gran extensión norte: Hokkaido, Sapporo y naturaleza ──
  {
    id: "sapporo-odori", name: "Parque Odori & Torre del Reloj", city: "Sapporo (Hokkaido)",
    lat: 43.0601, lng: 141.3533,
    emoji: "🗼", color: "#3a506b",
    day: "Día 12",
    detail: "El gran pulmón verde de la capital norteña y la arquitectura colonial de madera de la era Meiji.",
  },
  {
    id: "sapporo-nijo", name: "Mercado Nijo & Callejón Ganso Ramen Yokocho", city: "Sapporo (Hokkaido)",
    lat: 43.0583, lng: 141.3578,
    emoji: "🍜", color: "#3a506b",
    day: "Día 12",
    detail: "Donburi de cangrejo de aguas frías y huevas de salmón (ikura), y el legendario ramen con caldo espeso de pasta de miso.",
  },

  // ── DÍA 13: Regreso a Tokio, noche de despedida y vuelo de vuelta ─
  {
    id: "tokyo-ginza", name: "Compras de despedida (Ginza / Don Quijote)", city: "Tokio",
    lat: 35.6719, lng: 139.7640,
    emoji: "🛍️", color: "#1b263b",
    day: "Día 13",
    detail: "Últimas compras de souvenirs (omiyage), gran banquete final japonés y traslado a Narita para volar a casa.",
  },
];

export const filterData = {
  hoteles: [
    { id: "h-tokio", name: "Hotel Base Tokio (Shinjuku / Asakusa)", day: "Días 1–4", lat: 35.6909, lng: 139.7003, emoji: "🏨", color: "#1d3557", detail: "Base inicial de 4 noches en Kanto" },
    { id: "h-fuji", name: "Refugio Yamagoya Monte Fuji (3.200 m)", day: "Día 5", lat: 35.3680, lng: 138.7300, emoji: "🛏️", color: "#457b9d", detail: "Pernocta en alta montaña antes de cumbre" },
    { id: "h-osaka", name: "Hotel Base Osaka (Namba / Umeda)", day: "Días 6–7", lat: 34.6680, lng: 135.5000, emoji: "🏨", color: "#bc4749", detail: "Base en Kansai para gastronomía y castillos" },
    { id: "h-miyajima", name: "Ryokan Tradicional con Onsen en Miyajima", day: "Días 8–9", lat: 34.2980, lng: 132.3200, emoji: "♨️", color: "#e63946", detail: "Noche mágica en la isla sagrada con vistas al torii" },
    { id: "h-okinawa", name: "Hotel Costero en Naha & Eco-Lodge en Iriomote", day: "Días 10–11", lat: 26.2170, lng: 127.6800, emoji: "🌴", color: "#2e7d5b", detail: "Aguas turquesa de Ryukyu y reserva Dark Sky" },
    { id: "h-sapporo", name: "Hotel en Sapporo Centro (Hokkaido)", day: "Día 12", lat: 43.0600, lng: 141.3500, emoji: "🏨", color: "#3a506b", detail: "Base alpina para explorar Hokkaido y su gastronomía" },
    { id: "h-narita", name: "Hotel de Despedida en Tokio / Narita", day: "Día 13", lat: 35.7700, lng: 140.3900, emoji: "🛫", color: "#1b263b", detail: "Última noche antes del vuelo internacional" },
  ],
  excursiones: [
    { id: "e-nikko", name: "Excursión a Nikko (Toshogu y Kegon)", day: "Día 3", lat: 36.7581, lng: 139.5989, emoji: "🏯", color: "#c9a227", detail: "Patrimonio UNESCO y naturaleza sagrada alpina" },
    { id: "e-kamakura", name: "Escapada a Kamakura (Gran Buda)", day: "Día 4", lat: 35.3168, lng: 139.5357, emoji: "🗿", color: "#2e7d5b", detail: "Templos medievales samurái y costa de Sagami" },
    { id: "e-fuji", name: "Ascensión a la Cumbre del Monte Fuji", day: "Día 5", lat: 35.3606, lng: 138.7274, emoji: "🗻", color: "#457b9d", detail: "Amanecer sagrado Goraiko a 3.776 metros" },
    { id: "e-miyajima", name: "Isla de Miyajima y Monte Misen", day: "Día 9", lat: 34.2958, lng: 132.3197, emoji: "⛩️", color: "#e63946", detail: "Torii flotante, teleférico panorámico y llama eterna" },
    { id: "e-iriomote", name: "Parque Nacional Iriomote & Selva", day: "Día 11", lat: 24.3333, lng: 123.8333, emoji: "✨", color: "#2e7d5b", detail: "Dark Sky Park internacional y kayak por manglares" },
  ],
  transportes: [
    { id: "t-narita", name: "Aeropuerto Internacional Narita", day: "Días 1 y 13", lat: 35.7719, lng: 140.3929, emoji: "✈️", color: "#1d3557", detail: "Vuelos internacionales y tren Narita Express / Skyliner" },
    { id: "t-shinjuku-bus", name: "Terminal Busta Shinjuku", day: "Día 5", lat: 35.6888, lng: 139.7005, emoji: "🚌", color: "#457b9d", detail: "Autobús directo a la 5ª Estación del Monte Fuji" },
    { id: "t-shinkansen-osaka", name: "Estación Shin-Osaka (Shinkansen)", day: "Días 6–8", lat: 34.7335, lng: 135.5003, emoji: "🚄", color: "#bc4749", detail: "Tren bala Tokaido y Sanyo hacia Kansai y Chugoku" },
    { id: "t-ferry-miyajima", name: "Muelle de Ferry Miyajimaguchi", day: "Día 9", lat: 34.3117, lng: 132.3040, emoji: "⛴️", color: "#e63946", detail: "Ferry JR hacia la isla sagrada con vistas al torii" },
    { id: "t-naha-airport", name: "Aeropuerto de Naha (Okinawa)", day: "Días 10–11", lat: 26.1958, lng: 127.6458, emoji: "🛫", color: "#2e7d5b", detail: "Vuelos domésticos a Ryukyu y monorraíl Yui Rail" },
    { id: "t-sapporo-airport", name: "Aeropuerto Sapporo New Chitose (CTS)", day: "Días 12–13", lat: 42.7752, lng: 141.6923, emoji: "❄️", color: "#3a506b", detail: "Conexión aérea hacia Hokkaido y tren rápido JR Airport" },
  ],
};

export const mapLabels = {
  ubicacionesClave: "Ubicaciones clave",
  mapaDeLaRuta: "Mapa de la ruta",
  descRuta: "etapas principales en orden cronológico del viaje de norte a sur.",
  descHoteles: "Bases y alojamientos recomendados a lo largo de la ruta.",
  descExcursiones: "Ascensiones y excursiones imprescindibles de la aventura.",
  descTransportes: "Nodos de conexión, aeropuertos y estaciones de alta velocidad.",
  filterRuta: "Ruta completa",
  filterHoteles: "Hoteles",
  filterExcursiones: "Excursiones",
  filterTransportes: "Transportes",
  filterDias: "Etapas",
  descDias: "elige una etapa para ver sus paradas en el mapa.",
  todosLosDias: "Todas",
  diaLabel: "Etapa",
  parada: "PARADA",
  no: "Nº",
  abrirGoogleMaps: "Abrir en Google Maps ↗",
  verEnItinerario: "Ver en itinerario",
  verEnGoogleMaps: "Ver en Google Maps",
  paradasOrden: "etapas · en orden de la ruta",
  ubicaciones: "ubicaciones",
};
