import { getContent, contentEs } from "./content";
import { frikSections } from "./frikadas";
import { geekStops } from "./popCulture";
import { stopSectionId } from "./geekRouteMap";
import { categories as phraseCategories, etiquette } from "../pages/PhrasesPage";
import { sections as prepSections } from "../pages/PrepPage";
import { emergencyNumbers, embassy } from "../pages/EmergencyPage";
import { slug } from "../utils/slug";
import { konbiniChains } from "./konbiniGuide";

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[·•]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Alias de ciudades que la mayoría de gente de fuera de España escribe
// en su grafía inglesa. El contenido de la app está en español
// ("Kioto", "Tokio"), pero si un amigo del grupo busca "Kyoto" o
// "Tokyo" (muy probable si tiene la app en inglés/tagalo, o
// simplemente está acostumbrado a esa grafía) el buscador debe
// encontrar igualmente hoteles, comidas, clima, mapa... no sólo las
// entradas del itinerario que ya tenían el alias a mano.
const CITY_ALIASES = [
  ["kioto", "kyoto"],
  ["tokio", "tokyo"],
];

function withCityAliases(text) {
  const n = normalize(text);
  const extra = [];
  for (const [es, alt] of CITY_ALIASES) {
    if (n.includes(es)) extra.push(alt);
    if (n.includes(alt)) extra.push(es);
  }
  return extra;
}

function entry({ id, title, subtitle, category, tab, day, terms, targetId }) {
  const base = [title, subtitle, ...(terms || [])].filter(Boolean).join(" ");
  const aliasTerms = withCityAliases(base);
  const keywords = normalize([base, ...aliasTerms].join(" "));
  return { id, title, subtitle, category, tab, day, keywords, targetId };
}

function buildSearchIndex(lang) {
  const content = lang && lang !== "es" ? getContent(lang) : contentEs;
  const {
    flights, stays, days, transports, budget, foods, guides, guidesByDay,
    pendingItems, historyPeriods, furtherReading, mapStops, weatherData, dailyWeather,
  } = content;

  const items = [];

  // ── Apartados y Subapartados de Navegación ───────────────────────
  const navSections = [
    {
      id: "nav-pendientes",
      title: "Cosas pendientes",
      subtitle: "Checklist de tareas antes y durante el viaje",
      category: "Apartados",
      tab: "pendientes",
      terms: ["pendientes", "cosas pendientes", "checklist", "tareas", "antes de viajar", "durante el viaje", "to do", "por hacer"],
    },
    {
      id: "nav-itinerario-hoy",
      title: "Itinerario · Día actual",
      subtitle: "Plan del día en curso del viaje",
      category: "Apartados",
      tab: "itinerario",
      terms: ["hoy", "dia actual", "dia de hoy", "today", "itinerario hoy"],
    },
    {
      id: "nav-calendario",
      title: "Calendario",
      subtitle: "Planificación global de septiembre 2026",
      category: "Apartados",
      tab: "calendario",
      terms: ["calendario", "calendar", "fechas", "septiembre", "dias", "distribucion", "plan", "planificacion"],
    },
    {
      id: "nav-itinerario",
      title: "Itinerario",
      subtitle: "Ruta detallada día a día con horarios y actividades",
      category: "Apartados",
      tab: "itinerario",
      terms: ["itinerario", "planning", "ruta", "dias", "horarios", "cronograma", "visitas", "plan", "planificacion"],
    },
    {
      id: "nav-mapa",
      title: "Mapa",
      subtitle: "Mapa interactivo con todas las paradas y rutas",
      category: "Apartados",
      tab: "mapa",
      terms: ["mapa", "map", "localizaciones", "ubicaciones", "pines", "gps", "puntos de interes", "plan", "planificacion"],
    },
    {
      id: "nav-vuelos",
      title: "Vuelos",
      subtitle: "Billetes de avión, horarios y escalas (Qatar / Madrid / Narita)",
      category: "Apartados",
      tab: "vuelos",
      terms: ["vuelos", "vuelo", "avion", "billetes avion", "qatar", "escalas", "madrid", "narita", "doha", "viaje"],
    },
    {
      id: "nav-hoteles",
      title: "Hoteles",
      subtitle: "Alojamientos, confirmaciones, direcciones y check-in",
      category: "Apartados",
      tab: "hoteles",
      terms: ["hoteles", "hotel", "alojamiento", "alojamientos", "ryokan", "minshuku", "reserva hotel", "booking", "check in", "check out", "viaje"],
    },
    {
      id: "nav-transportes",
      title: "Transportes",
      subtitle: "Billetes, trayectos, Shinkansen, Suica y trenes",
      category: "Apartados",
      tab: "transportes",
      terms: ["transportes", "transporte", "tren", "trenes", "shinkansen", "tren bala", "billetes", "trayectos", "jr pass", "suica", "metro", "bus", "viaje"],
    },
    {
      id: "nav-lugares",
      title: "Lugares",
      subtitle: "Guía de templos, barrios, miradores y atracciones",
      category: "Apartados",
      tab: "lugares",
      terms: ["lugares", "que ver", "atracciones", "templos", "santuarios", "barrios", "visitas", "turismo", "monumentos", "guia"],
    },
    {
      id: "nav-comidas",
      title: "Comidas y Konbinis",
      subtitle: "Guía gastronómica, restaurantes y qué comprar en cada konbini/market",
      category: "Apartados",
      tab: "comidas",
      terms: ["comidas", "comida", "gastronomia", "platos", "restaurantes", "que comer", "ramen", "sushi", "dulces", "guia", "konbini", "konbinis", "supermercado", "supermercados", "market", "markets", "7-eleven", "familymart", "lawson", "ministop", "don quijote"],
    },
    {
      id: "nav-clima",
      title: "Clima",
      subtitle: "Previsión meteorológica en vivo y webcams del Monte Fuji",
      category: "Apartados",
      tab: "clima",
      terms: ["clima", "tiempo", "temperatura", "temperaturas", "lluvia", "prevision", "meteorologia", "monte fuji", "webcam", "guia"],
    },
    {
      id: "nav-historia",
      title: "Historia de Japón",
      subtitle: "Periodos históricos, samuráis, templos y cultura",
      category: "Apartados",
      tab: "historia",
      terms: ["historia", "cultura", "samurais", "periodos", "edo", "meiji", "shogun", "historia japon", "guia"],
    },
    {
      id: "nav-frases",
      title: "Frases",
      subtitle: "Diccionario de japonés básico y normas de etiqueta",
      category: "Apartados",
      tab: "frases",
      terms: ["frases", "idioma", "japones", "vocabulario", "diccionario", "palabras", "etiqueta", "modales", "expresiones", "guia"],
    },
    {
      id: "nav-preparativos",
      title: "Preparativos",
      subtitle: "Maleta, enchufes, seguro de viaje, eSIM y tarjetas",
      category: "Apartados",
      tab: "preparativos",
      terms: ["preparativos", "maleta", "equipaje", "esim", "internet", "seguro", "enchufes", "adaptador", "dinero", "tarjetas", "preparacion"],
    },
    {
      id: "nav-presupuesto",
      title: "Presupuesto",
      subtitle: "Desglose de gastos, conversor y control de costes",
      category: "Apartados",
      tab: "presupuesto",
      terms: ["presupuesto", "gastos", "dinero", "costes", "precios", "euros", "yenes", "cuanto cuesta", "pagos", "preparacion"],
    },
    {
      id: "nav-herramientas",
      title: "Herramientas",
      subtitle: "Conversor de divisas, propinas y calculadora horaria",
      category: "Apartados",
      tab: "herramientas",
      terms: ["herramientas", "utilidades", "conversor", "calculadora", "divisas", "cambio divisa", "hora", "horaria", "util"],
    },
    {
      id: "nav-emergencias",
      title: "Emergencias",
      subtitle: "Teléfonos de urgencia, embajada, hospitales y policía",
      category: "Apartados",
      tab: "emergencias",
      terms: ["emergencias", "urgencias", "embajada", "policia", "ambulancia", "medico", "hospital", "seguro emergencia", "110", "119", "util", "utilidades"],
    },
    {
      id: "nav-frikadas",
      title: "Frikadas y Pop",
      subtitle: "Tiendas frikis, anime, Pokémon, Ghibli, Akihabara y Nintendo",
      category: "Apartados",
      tab: "frikadas",
      terms: ["frikadas", "anime", "manga", "pokemon", "ghibli", "akihabara", "nintendo", "videojuegos", "compras", "otaku"],
    },
    {
      id: "nav-about",
      title: "Sobre la web",
      subtitle: "Información técnica, créditos y soporte PWA",
      category: "Apartados",
      tab: "about",
      terms: ["sobre la web", "about", "creditos", "info app", "version", "pwa"],
    },
    {
      id: "nav-futuro-viajes",
      title: "Viajes futuros: Itinerario",
      subtitle: "Nikko, Fuji, Hiroshima, Hokkaido, Okinawa e ideas para la próxima vez",
      category: "Apartados",
      tab: "futuro-viajes",
      terms: ["viajes futuros", "itinerario futuro", "nikko", "hokkaido", "okinawa", "iriomote", "fuji hiking", "hiroshima", "nagasaki", "proximo viaje", "ideas"],
    },
    {
      id: "nav-futuro-mapa",
      title: "Viajes futuros: Mapa",
      subtitle: "Mapa con los 7 destinos para futuras aventuras en Japón",
      category: "Apartados",
      tab: "futuro-mapa",
      terms: ["mapa viajes futuros", "mapa futuro", "mapa nikko", "mapa hokkaido", "mapa okinawa", "mapa fuji", "mapa iriomote", "mapa miyajima"],
    },
  ];

  for (const n of navSections) {
    items.push(entry(n));
  }

  // ── Vuelos y Visit Japan Web ──────────────────────────────────────
  items.push(entry({
    id: "visit-japan-web",
    title: "Visit Japan Web · QR de Inmigración y Aduanas",
    subtitle: "Registro digital de entrada a Japón y aduanas",
    category: "Vuelos",
    tab: "vuelos",
    targetId: "visit-japan-qr-card",
    terms: [
      "visit japan web", "visit japan", "qr", "qr aduana", "qr inmigracion",
      "inmigracion", "aduanas", "pasaporte", "entrada japon", "desembarco",
    ],
  }));
  items.push(entry({
    id: "flight-out",
    title: `Vuelo ida · ${flights.out.flightNumber}`,
    subtitle: "España → Tokio (Narita / Haneda)",
    category: "Vuelos",
    tab: "vuelos",
    targetId: "flight-outbound-card",
    terms: [
      "vuelo", "ida", "vuelo internacional", "madrid", "barcelona",
      "narita", "nrt", "haneda", "hnd", "escala",
      flights.booking.ref, "billete avion",
    ],
  }));
  items.push(entry({
    id: "flight-back",
    title: `Vuelo vuelta · ${flights.back.flightNumber}`,
    subtitle: "Tokio (Narita / Haneda) → España",
    category: "Vuelos",
    tab: "vuelos",
    targetId: "flight-return-card",
    terms: [
      "vuelo", "vuelta", "qatar", "iberia", "qr809", "qr6952",
      "narita", "doha", "madrid", flights.booking.ref, "yqxpve", flights.booking.pin,
    ],
  }));
  items.push(entry({
    id: "flight-booking",
    title: `Reserva vuelo · ${flights.booking.ref}`,
    subtitle: `PIN ${flights.booking.pin} · ${flights.price.perPerson}/persona · ${flights.price.total}`,
    category: "Presupuesto",
    tab: "presupuesto",
    targetId: "budget-flights-booking",
    terms: [
      "reserva", "booking", "referencia", "pin", "pnr", flights.booking.ref, "yqxpve",
      flights.booking.pin, "40-892227078", "2534", "vuelos", "qatar", "precio vuelo",
    ],
  }));

  // ── Hoteles ───────────────────────────────────────────────────────
  for (const stay of stays) {
    for (const opt of stay.options) {
      const terms = [
        stay.city, opt.name, opt.confirmation, opt.pin, opt.address, opt.phone,
        "hotel", "alojamiento", "check-in", "check-out", "reserva",
      ].filter(Boolean);
      items.push(entry({
        id: `hotel-${stay.id}`,
        title: opt.name,
        subtitle: [
          stay.city,
          opt.confirmation ? `Conf. ${opt.confirmation}` : null,
          opt.pin ? `PIN ${opt.pin}` : null,
        ].filter(Boolean).join(" · "),
        category: "Hoteles",
        tab: "hoteles",
        targetId: slug("hotel", stay.id),
        terms,
      }));
    }
  }

  // ── Días del itinerario (ciudades / títulos + schedule) ─────────────
  for (const d of days) {
    // Extraemos todo el texto de las entradas del schedule para indexar
    // horarios, transportes, restaurantes, visitas, hoteles, etc.
    const scheduleTerms = (d.schedule || []).flatMap((s) => [
      s.time,
      // Limpiar markdown y URLs del texto
      (s.text || "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/https?:\/\/[^\s)]+/g, "")
        .replace(/\n/g, " "),
    ]).filter(Boolean);

    items.push(entry({
      id: `day-${d.num}`,
      title: `Día ${d.num} · ${d.title}`,
      subtitle: `${d.cities} · ${d.date}`,
      category: "Itinerario",
      tab: "itinerario",
      day: d.num,
      targetId: slug("itinerary-day", d.num),
      terms: [
        d.title, d.cities, d.summary, `dia ${d.num}`, `día ${d.num}`,
        d.weekday, d.date, d.history,
        ...scheduleTerms,
      ],
    }));
  }

  // Lugares clave → día concreto (primera aparición en guidesByDay)
  const placeToDay = {};
  for (const [dayStr, ids] of Object.entries(guidesByDay)) {
    const n = parseInt(dayStr, 10);
    for (const gid of ids) {
      if (placeToDay[gid] == null) placeToDay[gid] = n;
    }
  }
  // Aliases extra ciudad → etapa
  const cityDayHints = [
    { terms: ["narita", "tokio", "tokyo", "llegada", "n'ex", "skyliner"], day: 1, title: "Llegada a Tokio", subtitle: "Etapa 1 · Narita → Tokio" },
    { terms: ["tokio", "tokyo", "asakusa", "senso-ji", "shibuya", "shibuya sky", "harajuku", "meiji jingu", "shinjuku"], day: 2, title: "Tokio imprescindible", subtitle: "Etapa 2 · Templos y rascacielos" },
    { terms: ["nikko", "toshogu", "spacia", "chuzenji", "kegon", "shinkyo", "tobu"], day: 3, title: "Nikkō", subtitle: "Etapa 3 · Templos y naturaleza Patrimonio UNESCO" },
    { terms: ["kamakura", "daibutsu", "gran buda", "enoden", "enoshima", "hasedera"], day: 4, title: "Kamakura & Enoshima", subtitle: "Etapa 4 · Templos costeros y Gran Buda" },
    { terms: ["fuji", "monte fuji", "fujisan", "yoshida", "refugio", "ascension", "cima", "5 estacion"], day: 5, title: "Monte Fuji (Ascensión)", subtitle: "Etapa 5 · Subida hacia el refugio" },
    { terms: ["fuji", "osaka", "dotonbori", "shin-osaka", "shinkansen", "amanecer"], day: 6, title: "Fuji y traslado a Osaka", subtitle: "Etapa 6 · Descenso y Shinkansen" },
    { terms: ["osaka", "castillo de osaka", "shinsekai", "umeda", "namba", "kuromon", "takoyaki"], day: 7, title: "Osaka", subtitle: "Etapa 7 · Metrópoli de Kansai" },
    { terms: ["kumano", "kumano kodo", "hongu", "nakahechi", "yunomine", "onsen", "hosshinmon-oji"], day: 8, title: "Kumano Kodō", subtitle: "Etapa 8 · Peregrinación sagrada" },
    { terms: ["nachi", "nachi taisha", "cascada nachi", "seiganto-ji", "kii-katsuura", "daimon-zaka"], day: 9, title: "Nachi & Costa Kii", subtitle: "Etapa 9 · La gran cascada sagrada" },
    { terms: ["hiroshima", "paz", "cupula", "genbaku", "museo de la paz", "shinkansen sanyo"], day: 10, title: "Hiroshima", subtitle: "Etapa 10 · Memoria de la Paz" },
    { terms: ["miyajima", "itsukushima", "torii flotante", "misen", "ciervos", "ferry"], day: 11, title: "Isla de Miyajima", subtitle: "Etapa 11 · Santuario sobre el mar" },
    { terms: ["okinawa", "naha", "shuri", "kokusai-dori", "playas", "yui rail", "ryukyu"], day: 12, title: "Okinawa", subtitle: "Etapa 12 · Archipiélago subtropical" },
    { terms: ["iriomote", "ishigaki", "manglares", "kayak", "dark sky", "pinaisara", "naturaleza"], day: 13, title: "Isla de Iriomote", subtitle: "Etapa 13 · Naturaleza virgen y manglares" },
    { terms: ["sapporo", "hokkaido", "susukino", "moerenuma", "odori", "ramen miso"], day: 14, title: "Sapporo & Hokkaido", subtitle: "Etapa 14 · La gran isla del norte" },
    { terms: ["otaru", "tokio", "despedida", "omiyage", "regreso", "narita"], day: 15, title: "Despedida & Regreso", subtitle: "Etapa 15 · Otaru / Tokio y vuelo de vuelta" },
  ];
  for (const c of cityDayHints) {
    items.push(entry({
      id: `place-day-${c.title}`,
      title: c.title,
      subtitle: c.subtitle,
      category: "Itinerario",
      tab: "itinerario",
      day: c.day,
      targetId: slug("itinerary-day", c.day),
      terms: c.terms,
    }));
  }

  for (const [gid, dayNum] of Object.entries(placeToDay)) {
    const g = guides[gid];
    if (!g) continue;
    items.push(entry({
      id: `guide-day-${gid}`,
      title: g.name,
      subtitle: `Etapa ${dayNum} · ${g.tagline || "Guía del lugar"}`,
      category: "Itinerario",
      tab: "itinerario",
      day: dayNum,
      targetId: slug("guide", gid),
      terms: [g.name, g.jp, gid.replace(/-/g, " "), g.tagline],
    }));
  }

  // ── Transportes ───────────────────────────────────────────────────
  for (const t of transports) {
    const routeText = t.route || (t.from && t.to ? `${t.from} → ${t.to}` : t.name);
    items.push(entry({
      id: `transport-${t.day}-${slug(t.name)}`,
      title: t.name,
      subtitle: `${routeText}${typeof t.day === "number" ? ` · Etapa ${t.day}` : ""}`,
      category: "Transportes",
      tab: "transportes",
      day: typeof t.day === "number" ? t.day : undefined,
      targetId: slug("transport", t.day),
      terms: [
        t.name, routeText, t.type, t.desc, t.note,
        "tren", "bus", "shinkansen", "avion", "ferry", "transporte",
      ].filter(Boolean),
    }));
  }
  items.push(entry({
    id: "suica",
    title: "Tarjeta Suica / Pasmo",
    subtitle: "Metro, tren local y buses",
    category: "Transportes",
    tab: "transportes",
    targetId: "suica-guide",
    terms: ["suica", "pasmo", "ic card", "metro", "recarga", "apple pay", "google pay"],
  }));
  items.push(entry({
    id: "smart-ex",
    title: "App Smart EX (Shinkansen)",
    subtitle: "Reserva de trenes bala",
    category: "Transportes",
    tab: "transportes",
    targetId: "smart-ex-guide",
    terms: ["smart ex", "shinkansen", "tren bala", "billetes", "reserva"],
  }));
  items.push(entry({
    id: "takkyubin",
    title: "Envío de Maletas Takkyubin",
    subtitle: "Yamato Transport · viajar ligero",
    category: "Transportes",
    tab: "transportes",
    targetId: "takkyubin-guide",
    terms: ["takkyubin", "maletas", "equipaje", "yamato", "kuroneko", "enviar maletas"],
  }));
  items.push(entry({
    id: "jr-pass",
    title: "JR Pass",
    subtitle: "¿Merece la pena? · análisis en Presupuesto",
    category: "Presupuesto",
    tab: "presupuesto",
    targetId: "jr-pass-analysis",
    terms: ["jr pass", "japan rail pass", "pase jr", "merece", "compensa"],
  }));

  // ── Comidas ───────────────────────────────────────────────────────
  for (const f of foods) {
    items.push(entry({
      id: `food-${f.id}`,
      title: f.name,
      subtitle: f.where || "Comida típica",
      category: "Comidas",
      tab: "comidas",
      targetId: slug("food", f.id),
      terms: [f.name, f.jp, f.desc, f.where, f.id],
    }));
  }

  // ── Konbinis & Markets ─────────────────────────────────────────────
  for (const chain of konbiniChains) {
    items.push(entry({
      id: `konbini-${chain.id}`,
      title: `${chain.name} · Guía de compra`,
      subtitle: chain.badge,
      category: "Comidas",
      tab: "comidas",
      targetId: `konbini-${chain.id}`,
      terms: [
        chain.name,
        chain.jp,
        "konbini",
        "market",
        "tienda",
        "supermercado",
        chain.specialty,
        chain.bestFor,
        chain.vibe,
      ],
    }));

    chain.items.forEach((item, idx) => {
      items.push(entry({
        id: `konbini-item-${chain.id}-${idx}`,
        title: `${item.name} (${chain.name})`,
        subtitle: `${item.price} · ${item.tag}`,
        category: "Comidas",
        tab: "comidas",
        targetId: slug("konbini", `${chain.id}-${idx}`),
        terms: [
          item.name,
          item.jp,
          item.desc,
          item.tip,
          item.highlight,
          chain.name,
          "konbini",
          "market",
        ],
      }));
    });
  }

  // ── Lugares (guías detalladas) ──────────────────────────────────
  for (const [gid, g] of Object.entries(guides)) {
    const secTerms = (g.sections || []).flatMap((s) => [s.title, s.body]);
    const curTerms = g.curiosities || [];
    items.push(entry({
      id: `lugar-${gid}`,
      title: g.name,
      subtitle: g.tagline || "Lugar del viaje",
      category: "Lugares",
      tab: "lugares",
      targetId: slug("guide", gid),
      terms: [
        g.name,
        g.jp,
        gid.replace(/-/g, " "),
        g.tagline,
        g.founded,
        g.wiki,
        g.tip,
        ...secTerms,
        ...curTerms,
      ].filter(Boolean),
    }));
  }

  // ── Frikadas ──────────────────────────────────────────────────────
  // Un resultado por tema para que una búsqueda lleve directamente al
  // apartado correcto, tanto si se busca una franquicia como un personaje,
  // lugar, tienda o término concreto de cultura pop. targetId apunta
  // siempre al acordeón de la SECCIÓN (no al item suelto dentro), que es
  // lo que FrikadasPage sabe abrir automáticamente.
  const franchiseTerms = {
    pokemon: ["pokemon", "pokémon", "pikachu", "mewtwo", "ho oh", "ho-oh", "lugia", "raikou", "entei", "suicune", "johto", "ciudad iris", "ecruteak", "torre campana", "torre quemada", "ciudad malva", "violet city", "bellsprout", "campana", "pokemon center", "pokecenter"],
    digimon: ["digimon", "digimon adventure", "agumon", "gabumon", "tai", "taichi", "matt", "yamato", "patamon", "gatomon", "pumpkinmon", "gotsumon", "odaiba", "digimundo"],
    dragonball: ["dragon ball", "dragonball", "goku", "son goku", "vegeta", "bulma", "toriyama", "akira toriyama", "kamehameha", "namek", "saiyan", "shonen jump"],
    doraemon: ["doraemon", "nobita", "dorayaki", "fujiko f fujio", "puerta magica", "dokodemo door", "kawasaki"],
    shinchan: ["shin chan", "shinchan", "crayon shin chan", "crayon shin-chan", "shinnosuke", "nohara", "kasukabe"],
    tekken: ["tekken", "heihachi", "kazuya", "jin kazama", "mishima", "mishima zaibatsu", "bandai namco", "arcade", "maquinas recreativas"],
    nintendo: ["nintendo", "mario", "super mario", "zelda", "link", "kirby", "splatoon", "animal crossing", "pokemon", "game boy", "switch", "hanafuda", "nintendo museum", "nintendo tokyo", "nintendo kyoto"],
    ghibli: ["ghibli", "studio ghibli", "miyazaki", "totoro", "chihiro", "el viaje de chihiro", "mononoke", "howl", "castillo ambulante", "kiki", "ghibli park", "museo ghibli", "mitaka"],
    godzilla: ["godzilla", "gojira", "kaiju", "toho", "kabukicho", "kabukichō", "hotel gracery", "shinjuku"],
  };
  for (const section of frikSections) {
    const anchorId = slug("frikadas", section.id);
    for (const [index, item] of section.items.entries()) {
      items.push(entry({
        id: `frikada-${section.id}-${index}`,
        title: `${section.label} · ${item.title}`,
        subtitle: "Frikadas",
        category: "Frikadas",
        tab: "frikadas",
        targetId: anchorId,
        terms: [section.label, section.intro, item.title, item.body, ...(franchiseTerms[section.id] || [])],
      }));
    }
  }
  for (const stop of geekStops) {
    const sectionId = stopSectionId[stop.id];
    items.push(entry({
      id: `frikada-ruta-${stop.id}`,
      title: `${stop.franchise} · ${stop.title}`,
      subtitle: `Frikadas · Día ${stop.day} · ${stop.place}`,
      category: "Frikadas",
      tab: "frikadas",
      day: stop.day,
      targetId: sectionId ? slug("frikadas", sectionId) : undefined,
      terms: [stop.franchise, stop.title, stop.place, stop.relation, stop.plan, stop.access, "frikadas", "friki", "freak", "anime", "manga", "videojuegos", "juegos"],
    }));
  }

  // ── Historia de Japón ────────────────────────────────────────────
  for (const period of historyPeriods) {
    const seeOnTripNotes = (period.seeOnTrip || []).map((r) => {
      const pName = guides[r.id]?.name || r.place || r.id;
      return `${pName} ${r.note || ""}`;
    });
    items.push(entry({
      id: `history-${period.id}`,
      title: `${period.title} (${period.era})`,
      subtitle: `Historia de Japón · ${period.era}`,
      category: "Historia",
      tab: "historia",
      targetId: slug("history", period.id),
      terms: [
        period.title,
        period.era,
        period.summary,
        period.imageCaption,
        ...(period.content || []).flatMap((block) => [block.heading, block.text]),
        ...seeOnTripNotes,
        "historia", "periodo", "era", "japon", "cronologia", "arte",
      ].filter(Boolean),
    }));
  }

  for (const kind of ["books", "podcasts", "documentaries"]) {
    for (const item of furtherReading[kind] || []) {
      const sub = kind === "books" ? "Libro recomendado" : kind === "podcasts" ? "Podcast recomendado" : "Documental recomendado";
      items.push(entry({
        id: `history-${kind}-${item.title}`,
        title: item.title,
        subtitle: `${sub} · ${item.author || item.show || item.channel || "Historia"}`,
        category: "Historia",
        tab: "historia",
        targetId: slug("history", kind, item.title),
        terms: [
          item.title,
          item.author,
          item.show,
          item.channel,
          item.dayBadge,
          item.note,
          item.description,
          item.text,
          "historia", "japon", "cultura", kind,
        ].filter(Boolean),
      }));
    }
  }

  // ── Descargas en PDF ──────────────────────────────────────────────
  items.push(entry({
    id: "pdf-itinerario",
    title: "Exportar Guía Completa en PDF",
    subtitle: "Itinerario completo (Días 0–15) + todos los anexos para imprimir o guardar",
    category: "Itinerario",
    tab: "itinerario",
    terms: ["pdf", "descargar", "imprimir", "guia pdf", "itinerario pdf", "exportar", "papel", "offline", "documento"],
  }));
  items.push(entry({
    id: "pdf-historia",
    title: "Exportar Historia de Japón en PDF",
    subtitle: "12 periodos históricos, obras de arte y recomendaciones de lectura",
    category: "Historia",
    tab: "historia",
    terms: ["pdf", "descargar", "imprimir", "historia pdf", "guia historia", "cultura pdf", "exportar", "arte pdf"],
  }));

  // ── Clima, mapa y presupuesto ─────────────────────────────────────
  for (const weather of weatherData) {
    items.push(entry({
      id: `weather-${weather.city}`,
      title: `Clima en ${weather.city}`,
      subtitle: `${weather.condition} · ${weather.min}–${weather.max} °C`,
      category: "Clima",
      tab: "clima",
      targetId: slug("weather", weather.city),
      terms: [weather.city, weather.condition, weather.precip, "temperatura", "lluvia", "humedad", "septiembre"],
    }));
  }
  for (const weather of dailyWeather) {
    items.push(entry({
      id: `weather-day-${weather.day}`,
      title: `Tiempo · Día ${weather.day} · ${weather.city}`,
      subtitle: `${weather.condition} · ${weather.low}–${weather.high} °C · ${weather.rain}% lluvia`,
      category: "Clima",
      tab: "clima",
      day: weather.day,
      targetId: slug("weather-day", weather.day),
      terms: [weather.city, weather.condition, `dia ${weather.day}`, "temperatura", "lluvia", "paraguas"],
    }));
  }
  for (const stop of mapStops) {
    items.push(entry({
      id: `map-${stop.id}`,
      title: stop.name,
      subtitle: `Mapa · ${stop.day} · ${stop.city}`,
      category: "Mapa",
      tab: "mapa",
      targetId: slug("map", stop.id),
      terms: [stop.name, stop.city, stop.detail, stop.day, "mapa", "ubicacion", "ubicación"],
    }));
  }
  for (const [index, category] of budget.categories.entries()) {
    items.push(entry({
      id: `budget-${index}`,
      title: category.title,
      subtitle: `Presupuesto · ${category.total}`,
      category: "Presupuesto",
      tab: "presupuesto",
      targetId: slug("budget", index),
      terms: [category.title, category.total, ...(category.details || []), "presupuesto", "coste", "precio", "euros"],
    }));
  }

  // ── Frases, preparativos y emergencias ─────────────────────────────
  // Estas tres páginas todavía no forman parte del sistema de contenido
  // multiidioma (viven en el propio componente .jsx, no en /data), así
  // que se siguen indexando en español independientemente del idioma
  // activo — es justo lo mismo que la página en sí muestra hoy.
  for (const category of phraseCategories) {
    for (const phrase of category.phrases) {
      items.push(entry({
        id: `phrase-${category.id}-${phrase.romaji}`,
        title: phrase.es,
        subtitle: `Frases · ${phrase.romaji} · ${phrase.jp}`,
        category: "Frases",
        tab: "frases",
        targetId: slug("phrase", category.id, phrase.romaji),
        terms: [category.title, phrase.es, phrase.romaji, phrase.jp, "japones", "japonés"],
      }));
    }
  }
  for (const rule of etiquette) {
    items.push(entry({
      id: `etiquette-${rule.title}`,
      title: rule.title,
      subtitle: "Etiqueta en Japón",
      category: "Frases",
      tab: "frases",
      targetId: slug("etiquette", rule.title),
      terms: [rule.title, rule.text, "etiqueta", "costumbres"],
    }));
  }
  for (const section of prepSections) {
    for (const item of section.items) {
      items.push(entry({
        id: `prep-${item.id}`,
        title: item.text,
        subtitle: `Preparativos · ${section.title}`,
        category: "Preparativos",
        tab: "preparativos",
        targetId: slug("prep", item.id),
        terms: [section.title, item.id, item.text, "maleta", "checklist"],
      }));
    }
  }
  items.push(entry({
    id: "prep-esim-holafly",
    title: "eSIM Internacional · Conexión a Internet en Japón",
    subtitle: "Instalación previa y activación automática al aterrizar",
    category: "Preparativos",
    tab: "preparativos",
    targetId: "prep-esim",
    terms: ["esim", "ubigi", "holafly", "airalo", "internet", "datos", "movil", "conexion", "roaming", "qr esim"],
  }));
  for (const emergency of emergencyNumbers) {
    items.push(entry({
      id: `emergency-${emergency.number}`,
      title: `${emergency.label} · ${emergency.number}`,
      subtitle: emergency.note,
      category: "Emergencias",
      tab: "emergencias",
      targetId: slug("emergency", emergency.number),
      terms: [emergency.label, emergency.number, emergency.note, "emergencia", "urgencia"],
    }));
  }
  items.push(entry({
    id: "emergency-insurance",
    title: "Seguro de viaje · Heymondo (Póliza 2368219)",
    subtitle: "IMA Ibérica Asistencia · +34 91 353 63 23",
    category: "Emergencias",
    tab: "emergencias",
    targetId: "emergency-insurance",
    terms: [
      "seguro", "seguro de viaje", "heymondo", "mondo", "póliza", "poliza", "2368219",
      "asistencia medica", "asistencia médica", "ima iberica", "ima ibérica", "airhelp",
      "913536323", "913536324", "gastos medicos", "repatriacion", "equipaje", "cobertura",
    ],
  }));
  items.push(entry({
    id: "emergency-embassy",
    title: embassy.name,
    subtitle: embassy.emergencyPhone,
    category: "Emergencias",
    tab: "emergencias",
    targetId: "emergency-embassy",
    terms: [embassy.name, embassy.address, embassy.phone, embassy.emergencyPhone, embassy.note, "consulado", "emergencia consular"],
  }));

  // ── Pendientes ────────────────────────────────────────────────────
  for (const p of pendingItems) {
    items.push(entry({
      id: `pending-${p.id}`,
      title: p.title,
      subtitle: p.deadline || "Pendiente",
      category: "Pendientes",
      tab: "pendientes",
      targetId: slug("pending", p.id),
      terms: [p.title, p.detail, p.deadline, p.id],
    }));
  }

  // ── Herramientas ──────────────────────────────────────────────────
  items.push(entry({
    id: "cambio",
    title: "Cambio de divisas",
    subtitle: "Euro ↔ Yen · tipo de cambio",
    category: "Herramientas",
    tab: "herramientas",
    terms: [
      "cambio", "divisas", "yen", "jpy", "eur", "euro", "convertidor",
      "tipo de cambio", "cambio de moneda", "dinero",
    ],
  }));
  items.push(entry({
    id: "hora",
    title: "Hora local Japón / España",
    subtitle: "Diferencia horaria",
    category: "Herramientas",
    tab: "herramientas",
    terms: ["hora", "horario", "jst", "japon", "españa", "diferencia horaria", "reloj"],
  }));

  // ── Frases (selección útil) ───────────────────────────────────────
  const phraseHits = [
    { title: "¿Dónde está el baño?", terms: ["baño", "aseo", "toilet", "toire"] },
    { title: "La cuenta, por favor", terms: ["cuenta", "pagar", "okaikei", "factura"] },
    { title: "Muchas gracias (Arigatou)", terms: ["gracias", "arigatou", "arigato"] },
    { title: "Perdón / Sumimasen", terms: ["perdon", "perdón", "sumimasen", "disculpe"] },
    { title: "Hola / Konnichiwa", terms: ["hola", "konnichiwa"] },
    { title: "Itadakimasu / antes de comer", terms: ["itadakimasu", "comer", "restaurante"] },
  ];
  for (const ph of phraseHits) {
    items.push(entry({
      id: `phrase-${ph.title}`,
      title: ph.title,
      subtitle: "Frases útiles",
      category: "Frases",
      tab: "frases",
      terms: ph.terms,
    }));
  }

  // ── Clima ─────────────────────────────────────────────────────────
  items.push(entry({
    id: "clima",
    title: "Clima en septiembre",
    subtitle: "Previsión y consejos de ropa",
    category: "Clima",
    tab: "clima",
    terms: ["clima", "tiempo", "lluvia", "temperatura", "paraguas", "humedad", "septiembre"],
  }));

  // ── Emergencias ───────────────────────────────────────────────────
  items.push(entry({
    id: "emergencia-110",
    title: "Policía · 110",
    subtitle: "Emergencias en Japón",
    category: "Emergencias",
    tab: "emergencias",
    terms: ["110", "policia", "policía", "emergencia"],
  }));
  items.push(entry({
    id: "emergencia-119",
    title: "Ambulancia / Bomberos · 119",
    subtitle: "Emergencias médicas o incendios",
    category: "Emergencias",
    tab: "emergencias",
    terms: ["119", "ambulancia", "bomberos", "medico", "médico", "hospital"],
  }));
  items.push(entry({
    id: "embajada",
    title: "Embajada de España en Tokio",
    subtitle: "Contacto consular",
    category: "Emergencias",
    tab: "emergencias",
    targetId: "emergency-embassy",
    terms: ["embajada", "consulado", "españa", "roppongi"],
  }));

  // ── Preparativos ──────────────────────────────────────────────────
  items.push(entry({
    id: "prep",
    title: "Preparativos / maleta",
    subtitle: "Ropa, documentos, chubasquero…",
    category: "Preparativos",
    tab: "preparativos",
    terms: ["maleta", "ropa", "chubasquero", "pasaporte", "checklist", "preparativos", "equipaje"],
  }));

  return items;
}

// Un índice por idioma, calculado sólo la primera vez que se pide.
const indexCache = new Map();
export function getSearchIndex(lang = "es") {
  const key = lang || "es";
  if (!indexCache.has(key)) {
    indexCache.set(key, buildSearchIndex(key));
  }
  return indexCache.get(key);
}

// Compatibilidad con quien siga importando `searchIndex` directamente
// (índice en español, comportamiento previo).
export const searchIndex = getSearchIndex("es");

// ── Tolerancia mínima a erratas ──────────────────────────────────────
// Distancia de edición (Levenshtein) acotada: sólo se usa como último
// recurso, cuando la búsqueda normal no encuentra nada, y sólo compara
// contra el título del resultado (no contra el blob entero de keywords,
// que sería carísimo y generaría muchísimo ruido).
function levenshtein(a, b) {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = Array.from({ length: bl + 1 }, (_, i) => i);
  for (let i = 1; i <= al; i++) {
    const cur = [i];
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[bl];
}

function fuzzyMatches(query, title) {
  const tn = normalize(title);
  const words = tn.split(" ");
  // Tolerancia: 1 error para palabras cortas/medias, 2 para las largas.
  const maxDist = query.length >= 7 ? 2 : 1;
  return words.some((w) => w.length >= 3 && levenshtein(query, w) <= maxDist);
}

// Lista de sugerencias rápidas para mostrar en el panel vacío
export const QUICK_SUGGESTIONS = [
  { label: "Konbinis & Markets", query: "konbini" },
  { label: "Famichiki / 7-Eleven", query: "famichiki" },
  { label: "Fushimi Inari", query: "fushimi" },
  { label: "eSIM / Holafly", query: "holafly" },
  { label: "Historia de Japón", query: "historia" },
  { label: "Descargar PDF", query: "pdf" },
  { label: "Nozomi 53", query: "nozomi" },
  { label: "Billetes de tren", query: "billete" },
  { label: "Hotel Kioto", query: "keihan" },
  { label: "Monte Fuji", query: "fuji" },
  { label: "Shinkansen", query: "shinkansen" },
  { label: "Narita Express", query: "narita express" },
  { label: "Magome", query: "magome" },
  { label: "Check-in", query: "check-in" },
  { label: "Suica", query: "suica" },
  { label: "Seguro", query: "heymondo" },
  { label: "Visit Japan Web", query: "visit japan" },
  { label: "Pokémon", query: "pokemon" },
  { label: "Nikko", query: "nikko" },
];

export function searchGlobal(query, { limit = 15, minChars = 3, lang = "es" } = {}) {
  const q = normalize(query);
  if (q.length < minChars) return [];

  const index = getSearchIndex(lang);
  const scored = [];
  for (const item of index) {
    if (!item.keywords.includes(q)) {
      // also allow multi-token: all tokens must match
      const tokens = q.split(" ").filter((t) => t.length >= 2);
      if (tokens.length > 1 && tokens.every((t) => item.keywords.includes(t))) {
        scored.push({ item, score: 50 + tokens.length * 5 });
      }
      continue;
    }
    // Prefer title matches
    const titleN = normalize(item.title);
    let score = 10;
    if (titleN.startsWith(q)) score += 40;
    else if (titleN.includes(q)) score += 25;
    if (normalize(item.subtitle).includes(q)) score += 8;
    // Boost booking codes / exact-ish ids
    if (/^\d{4,}$/.test(q) || /^qr\d/i.test(q) || /^12go/i.test(q)) score += 30;
    scored.push({ item, score });
  }

  // Si no hay ni un solo resultado, se intenta con tolerancia a erratas
  // (p. ej. "shibuia" -> "Shibuya") antes de rendirse.
  if (scored.length === 0 && q.length >= 4) {
    for (const item of index) {
      if (fuzzyMatches(q, item.title)) {
        scored.push({ item, score: 5 });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"));

  // Deduplicar por id, y repartir entre categorías: sin esto, una
  // búsqueda amplia ("kioto") puede llenar los 12 huecos sólo con
  // Itinerario y dejar fuera el hotel o el clima de esa misma ciudad,
  // aunque también coincidan. Primera pasada: máx. 3 por categoría en
  // orden de puntuación; segunda pasada: rellenar lo que quede sin ese
  // límite, para no perder resultados si hay pocas categorías distintas.
  const seen = new Set();
  const perCategoryCount = new Map();
  const PER_CATEGORY_CAP = 3;
  const out = [];

  for (const { item } of scored) {
    if (out.length >= limit) break;
    if (seen.has(item.id)) continue;
    const count = perCategoryCount.get(item.category) || 0;
    if (count >= PER_CATEGORY_CAP) continue;
    seen.add(item.id);
    perCategoryCount.set(item.category, count + 1);
    out.push(item);
  }
  if (out.length < limit) {
    for (const { item } of scored) {
      if (out.length >= limit) break;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
  }

  return out;
}
