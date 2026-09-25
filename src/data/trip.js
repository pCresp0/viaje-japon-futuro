// Datos del viaje — Guía y Planificación de la Ruta Futura a Japón
import { pendingDays } from "./pendingDays";

export const tripMeta = {
  title: "Viaje a Japón",
  subtitle: "Ruta de 13 Etapas: Kanto, Fuji, Kansai, Chugoku, Okinawa y Hokkaido",
  status: "planning",
  people: 2,
  welcomeParagraphs: [
    "¡Bienvenidos a la plataforma interactiva del <strong>futuro viaje a Japón</strong>! Esta aplicación web es un proyecto vivo y en <strong>continuo desarrollo</strong>, concebido como el centro de operaciones digital para diseñar, presupuestar y coordinar nuestra próxima gran expedición nipona a lo largo de <strong>13 etapas memorables</strong>.",
    "Desde los templos milenarios y los rascacielos vanguardistas de Tokio, la majestuosidad sagrada de Nikko y Kamakura, hasta coronar el <strong>Monte Fuji</strong> (3.776 m) al amanecer. Continuando hacia la vibrante Osaka, la memoria histórica de Hiroshima y el torii flotante de la isla sagrada de Miyajima; para después volar hacia las aguas turquesa y el cielo estrellado de Okinawa e Iriomote, culminando en la indómita naturaleza y gastronomía de Hokkaido.",
    "<strong>¿Por qué esta web y en qué estado se encuentra?</strong> Funciona como un banco de pruebas y cuaderno de bitácora previo a la partida: reúne el itinerario en construcción, los cálculos de presupuesto estimado, las simulaciones de conexiones en tren bala (Shinkansen), vuelos internos, ferris y las bases de alojamiento sugeridas. Todo el contenido se amplía y se revisa con regularidad a medida que se fijan fechas definitivas y nuevas ideas.",
    "Además, la aplicación está programada con arquitectura <strong>100% offline (PWA)</strong>: una vez cargada, puede consultarse en cualquier momento y lugar (en pleno vuelo, en los trenes bala o en las cumbres montañosas) sin requerir conexión a internet. ¡Explora las secciones, interactúa con el mapa y acompáñanos durante el proceso de planificación!",
    "Puedes cambiar el idioma de la aplicación en cualquier momento (Español, English, Français, Tagalog) utilizando el selector superior."
  ],
  about: {
    title: "Sobre la web",
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "Esta aplicación web ha sido diseñada para <strong>no depender de internet durante el viaje</strong>. En trenes bala, alta montaña o zonas rurales, la app sigue funcionando al 100%. Sigue una arquitectura de <strong>Single Source of Truth (SSOT)</strong> en el cliente, empaquetada como PWA con Service Worker (Workbox)."
      },
      {
        icon: "🗺️",
        title: "Ruta Completa de 13 Etapas & Mapa Interactivo",
        text: "Las 13 etapas de la aventura enlazadas geográficamente con un <strong>mapa vectorial interactivo (Leaflet)</strong>, con filtros por etapa y región, y trazado completo de la ruta por todo Japón."
      },
      {
        icon: "🗓️",
        title: "Itinerario Doble (Detallado & Vista Rápida)",
        text: "Cada etapa cuenta con dos modos: <strong>Detalle completo</strong> (con horarios, consejos, advertencias y contexto histórico) y <strong>Vista rápida</strong>, además de acceso directo al mapa y exportación a PDF."
      },
      {
        icon: "🚅",
        title: "Guía de Transportes, Pases & Shinkansen",
        text: "Explicación detallada de todas las conexiones: Narita Express, trenes bala Shinkansen (Nozomi/Hikari), pases regionales (Tobu Nikko Pass, Osaka Metro, Ferry Miyajima), tarjeta Suica digital y envío de maletas Takkyubin."
      },
      {
        icon: "🏨",
        title: "Bases y Alojamientos Recomendados",
        text: "Guía práctica de las 7 bases del itinerario (Tokio, refugio en Monte Fuji, Osaka, ryokan en Miyajima, Okinawa, Iriomote y Sapporo) con tipos de habitación, onsens y consejos de reserva."
      },
      {
        icon: "📜",
        title: "Historia de Japón, Documentales, Podcasts y Libros",
        text: "Sección cultural multimedia con <strong>Historia cronológica</strong> y reproductor de voz Text-to-Speech nativo, podcasts recomendados, documentales en vídeo y libros esenciales."
      },
      {
        icon: "🔍",
        title: "Buscador Global Inteligente",
        text: "Motor de búsqueda reactivo que indexa instantáneamente todo el contenido (lugares, hoteles, transportes, historia, gastronomía, frikadas), resaltando visualmente el resultado exacto."
      },
      {
        icon: "🌦️",
        title: "Meteorología en Tiempo Real con Caché",
        text: "Integración con la API de Open-Meteo para las ciudades del itinerario (Tokio, Nikko, Fuji, Osaka, Hiroshima, Okinawa, Sapporo), con guardado en caché local para consultar el tiempo sin conexión."
      },
      {
        icon: "💰",
        title: "Presupuesto Estimado y Tareas Persistentes",
        text: "Desglose financiero por categorías (vuelos, transportes, hoteles, comidas, actividades) y checklist cronológico de preparativos guardado en <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Multi-idioma Nativo (4 idiomas)",
        text: "Arquitectura i18n con soporte completo para <strong>Español, English, Français y Tagalog</strong>, sincronizada en todos los apartados."
      }
    ],
    github: "Ver código fuente en GitHub"
  }
};

// Vuelos internacionales y domésticos recomendados para la ruta
export const flights = {
  booking: { ref: "EN PLANIFICACIÓN", agencyRef: "Ruta Japón", pin: "----" },
  price: { perPerson: "~850€–1.050€", total: "Estimado por persona", people: 1 },
  out: {
    dir: "out",
    label: "Vuelo Internacional de Ida",
    date: "A definir (Planificación)",
    text: "Vuelo internacional desde España (Madrid Barajas / Barcelona El Prat) con destino al Aeropuerto Internacional de Narita (NRT) o Tokio Haneda (HND). Vuelo directo con Iberia o con escala única en Oriente Medio (Qatar Airways / Emirates) o Europa.",
    flightNumber: "Vuelo Internacional a Tokio (NRT / HND)",
    leg1: {
      number: "Vuelo Internacional",
      operator: "Iberia / Qatar Airways / Emirates",
      aircraft: "Airbus A350-900 / Boeing 787 Dreamliner",
      duration: "Aprox. 14h–16h",
      route: "España → Tokio (NRT / HND)",
      depTime: "Salida",
      arrTime: "Llegada (+1 día)",
      trackUrl: "https://www.google.com/travel/flights",
    },
    depart: { city: "Madrid (MAD) / Barcelona (BCN)", time: "Fecha de salida", terminal: "T4 / T1" },
    arrive: { city: "Tokio Narita (NRT) / Haneda (HND)", time: "Día 1", terminal: "T1 / T2 / T3" },
    totalDuration: "14h–16h",
    layover: {
      city: "Vuelo directo o escala",
      airport: "Hub internacional",
      duration: "2h–3h",
      terminal: "Terminal de tránsito",
      connection: "En vuelos con escala, el equipaje facturado viaja directo a Japón sin necesidad de recogerlo en la escala.",
    },
  },
  back: {
    dir: "back",
    label: "Vuelo Internacional de Regreso",
    date: "Día 13 / 14",
    text: "Vuelo internacional de regreso a casa desde Tokio Narita (NRT) o Tokio Haneda (HND) tras el vuelo doméstico de conexión desde Hokkaido.",
    flightNumber: "Vuelo Internacional de Retorno",
    leg1: {
      number: "Vuelo Internacional",
      operator: "Iberia / Qatar Airways / Emirates",
      duration: "Aprox. 15h–18h",
      route: "Tokio (NRT/HND) → España",
      depTime: "Tarde / Noche",
      arrTime: "Llegada",
      trackUrl: "https://www.google.com/travel/flights",
    },
    depart: { city: "Tokio Narita (NRT)", time: "Día 13/14", terminal: "T2 / T1" },
    arrive: { city: "Madrid / Barcelona", time: "Llegada", terminal: "T4 / T1" },
    totalDuration: "15h–18h",
    layover: {
      city: "Tránsito",
      airport: "Hub internacional",
      duration: "2h–3h",
      terminal: "Terminal de tránsito",
      connection: "Tiempo para compras libres de impuestos (Duty Free) de recuerdos y dulces tradicionales en Narita antes del embarque.",
    },
  },
  domesticFlights: [
    {
      route: "Hiroshima (HIJ) / Osaka (KIX) → Okinawa (Naha - OKA)",
      duration: "1h 55m",
      operators: "ANA / JAL / Peach",
      approxPrice: "60€–90€",
      note: "Conexión directa entre Kansai/Chugoku y el archipiélago subtropical de Ryukyu.",
    },
    {
      route: "Okinawa (Naha - OKA) → Ishigaki (ISG) [Archipiélago Yaeyama]",
      duration: "55m",
      operators: "JTA / ANA",
      approxPrice: "40€–60€",
      note: "Vuelo corto panorámico sobre los atolones de coral hacia la puerta de Iriomote.",
    },
    {
      route: "Okinawa (Naha/Ishigaki) → Sapporo New Chitose (CTS) [Hokkaido]",
      duration: "3h 15m (o escala en Tokio)",
      operators: "ANA / JAL / Skymark",
      approxPrice: "85€–120€",
      note: "El gran salto norte-sur desde las islas subtropicales hasta la frontera alpina.",
    },
    {
      route: "Sapporo New Chitose (CTS) → Tokio Haneda / Narita (HND/NRT)",
      duration: "1h 40m",
      operators: "ANA / JAL / Jetstar",
      approxPrice: "45€–70€",
      note: "Vuelo de retorno a la capital para la noche de despedida y enlace internacional.",
    },
  ],
};

// Bloques temáticos y regionales de la ruta
export const blocks = [
  {
    id: "kanto",
    emoji: "🗼",
    title: "Kanto: Tokio, Nikko y Kamakura",
    color: "#1D3557", // azul índigo
    days: [1, 2, 3, 4],
    sleepSummary: "Base en Tokio (4 noches)",
    bestArea: "Shinjuku por máxima conectividad, o Asakusa/Ueno por encanto tradicional y conexión rápida a Nikko.",
  },
  {
    id: "fuji",
    emoji: "🗻",
    title: "Monte Fuji y Cumbre",
    color: "#457B9D", // azul montaña
    days: [5],
    sleepSummary: "Refugio Yamagoya en 7ª u 8ª estación del Fuji (1 noche)",
    bestArea: "Refugio reservado con antelación en la ruta Yoshida para presenciar el amanecer Goraiko a 3.776m.",
  },
  {
    id: "kansai",
    emoji: "🏯",
    title: "Kansai: Osaka clásica y templos",
    color: "#BC4749", // rojo torii
    days: [6, 7],
    sleepSummary: "Base en Osaka (2 noches)",
    bestArea: "Namba / Dotonbori para vida nocturna y gastronomía, o Umeda para conexiones Shinkansen.",
  },
  {
    id: "chugoku",
    emoji: "⛩️",
    title: "Chugoku: Hiroshima y Miyajima",
    color: "#C9A227", // oro / ámbar
    days: [8, 9],
    sleepSummary: "Hiroshima / Ryokan en Miyajima (2 noches)",
    bestArea: "Ryokan tradicional en la isla de Miyajima para disfrutar de la marea nocturna y el monte Misen.",
  },
  {
    id: "okinawa",
    emoji: "🌺",
    title: "Islas Ryukyu: Okinawa e Iriomote",
    color: "#2E7D5B", // verde esmeralda
    days: [10, 11],
    sleepSummary: "Naha y Eco-lodge en Iriomote (2 noches)",
    bestArea: "Naha centro (cerca de Kokusai-dori) y resort o eco-lodge integrado en la selva de Iriomote.",
  },
  {
    id: "hokkaido",
    emoji: "❄️",
    title: "Hokkaido & Despedida en Tokio",
    color: "#3A506B", // azul alpino
    days: [12, 13],
    sleepSummary: "Sapporo (1 noche) y Tokio / Narita (1 noche)",
    bestArea: "Sapporo centro cerca de Odori o Susukino, y hotel en Tokio o junto al aeropuerto de Narita.",
  },
];

// Asignación de bloque a cada día
const blockForDay = (num) => {
  if (num <= 4) return "kanto";
  if (num === 5) return "fuji";
  if (num <= 7) return "kansai";
  if (num <= 9) return "chugoku";
  if (num <= 11) return "okinawa";
  return "hokkaido";
};

// Las 13 etapas de la ruta futura
export const days = pendingDays.es.map((d) => ({
  ...d,
  block: blockForDay(d.num),
}));

// Alojamientos recomendados para las 7 bases de la ruta
export const stays = [
  {
    id: "tokio",
    city: "Tokio",
    nights: "Días 1 al 4 (4 noches)",
    afterDay: 1,
    options: [
      {
        name: "Hotel Base Tokio (Zona Shinjuku / Asakusa / Ueno)",
        total: "Aprox. 110€–160€ / noche",
        paid: false,
        address: "Shinjuku / Asakusa / Ueno, Tokio, Japón",
        phone: "+81 3 0000 0000",
        checkIn: "Día 1 · 15:00",
        checkOut: "Día 5 · 10:00",
        rooms: "Habitación doble o triple según viajeros",
        guests: "A definir según grupo",
        cancel: "Recomendado con opción de cancelación gratuita",
        onsen: { has: true, hours: "Cadenas recomendadas con onsen: Dormy Inn, Candeo Hotels o Hotel Gracery." },
        note: "Base idónea para explorar Tokio y realizar las excursiones de día completo a Nikko y Kamakura sin cambiar de hotel. La noche del Día 4, enviar maletas grandes a Osaka por Takkyubin.",
      },
    ],
  },
  {
    id: "fuji",
    city: "Monte Fuji",
    nights: "Día 5 (1 noche)",
    afterDay: 5,
    options: [
      {
        name: "Refugio de Montaña Yamagoya (7ª u 8ª Estación)",
        total: "Aprox. 70€–95€ / persona (con cena caliente y desayuno)",
        paid: false,
        address: "Ruta Yoshida, Monte Fuji (3.000m–3.400m), Prefectura de Yamanashi, Japón",
        phone: "+81 555 00 0000",
        checkIn: "Día 5 · 16:00–18:00",
        checkOut: "Día 6 · 01:00 am (salida nocturna hacia la cumbre)",
        rooms: "Literas tradicionales de madera con mantas térmicas compartidas",
        guests: "A definir según grupo",
        cancel: "Sujeto a la política del refugio (reserva online obligatoria al abrir temporada)",
        onsen: { has: false, hours: "En alta montaña no hay agua corriente ni duchas; llevar toallitas húmedas biodegradables." },
        note: "Experiencia imprescindible de alta montaña para descansar unas horas antes de emprender el tramo final con frontales y contemplar el amanecer sagrado (Goraiko) a 3.776m.",
      },
    ],
  },
  {
    id: "osaka",
    city: "Osaka",
    nights: "Días 6 y 7 (2 noches)",
    afterDay: 6,
    options: [
      {
        name: "Hotel Base Osaka (Zona Namba / Dotonbori / Umeda)",
        total: "Aprox. 95€–140€ / noche",
        paid: false,
        address: "Namba / Chuo-ku, Osaka, Japón",
        phone: "+81 6 0000 0000",
        checkIn: "Día 6 · 15:00",
        checkOut: "Día 8 · 10:00",
        rooms: "Habitación confortable con baño privado",
        guests: "A definir según grupo",
        cancel: "Cancelación gratuita recomendada",
        onsen: { has: true, hours: "Hoteles recomendados con baños termales: Onyado Nono Namba Natural Hot Spring." },
        note: "Aquí recibes las maletas grandes enviadas desde Tokio. Disfruta de la gastronomía callejera de Dotonbori, el castillo de Osaka y sus templos insólitos.",
      },
    ],
  },
  {
    id: "miyajima",
    city: "Hiroshima & Miyajima",
    nights: "Días 8 y 9 (2 noches)",
    afterDay: 8,
    options: [
      {
        name: "Ryokan Tradicional en Isla de Miyajima / Hotel en Hiroshima Station",
        total: "Aprox. 130€–220€ / noche (Ryokan tradicional con cena kaiseki)",
        paid: false,
        address: "Miyajima-cho, Hatsukaichi, Hiroshima, Japón",
        phone: "+81 829 00 0000",
        checkIn: "Día 8 · 15:00",
        checkOut: "Día 10 · 10:00",
        rooms: "Habitación japonesa tradicional con tatami, puertas shoji y futón",
        guests: "A definir según grupo",
        cancel: "Consultar política del establecimiento",
        onsen: { has: true, hours: "Baños de aguas termales con vistas a la bahía y al mar interior de Seto." },
        note: "Pernoctar en la isla de Miyajima es una de las experiencias cumbres del viaje: permite contemplar el gran torii iluminado de noche en absoluta tranquilidad cuando zarpa el último ferry de turistas.",
      },
    ],
  },
  {
    id: "okinawa",
    city: "Okinawa & Archipiélago Yaeyama",
    nights: "Días 10 y 11 (2 noches)",
    afterDay: 10,
    options: [
      {
        name: "Hotel en Naha (Noche 10) & Eco-Lodge en Iriomote/Ishigaki (Noche 11)",
        total: "Aprox. 110€–170€ / noche",
        paid: false,
        address: "Naha / Isla de Iriomote, Prefectura de Okinawa, Japón",
        phone: "+81 98 0000 0000",
        checkIn: "15:00",
        checkOut: "11:00",
        rooms: "Habitaciones costeras / cabañas integradas en la selva subtropical",
        guests: "A definir según grupo",
        cancel: "Cancelación flexible recomendada",
        onsen: { has: false, hours: "Piscina o acceso directo a playas vírgenes y cielos oscuros protegidos." },
        note: "Inmersión en la cultura del antiguo Reino Ryukyu, aguas turquesa cristalinas, observación astronómica en el Dark Sky Park internacional y rutas en kayak por manglares.",
      },
    ],
  },
  {
    id: "hokkaido",
    city: "Sapporo (Hokkaido)",
    nights: "Día 12 (1 noche)",
    afterDay: 12,
    options: [
      {
        name: "Hotel en Sapporo Centro (Zona Parque Odori / Susukino)",
        total: "Aprox. 85€–130€ / noche",
        paid: false,
        address: "Chuo-ku, Sapporo, Hokkaido, Japón",
        phone: "+81 11 0000 0000",
        checkIn: "Día 12 · 15:00",
        checkOut: "Día 13 · 10:00",
        rooms: "Habitación funcional y moderna",
        guests: "A definir según grupo",
        cancel: "Cancelación gratuita recomendada",
        onsen: { has: true, hours: "Baños de aguas termales en el hotel o excursión cercana a Jozankei Onsen." },
        note: "Capital del gran norte japonés, paraíso gastronómico del ramen de miso, el marisco fresco de aguas frías en el Mercado Nijo y la famosa cerveza Sapporo.",
      },
    ],
  },
  {
    id: "tokio-despedida",
    city: "Tokio / Narita",
    nights: "Día 13 (Noche de despedida o enlace a Narita)",
    afterDay: 13,
    options: [
      {
        name: "Hotel en Tokio Centro o Hotel de Aeropuerto en Narita",
        total: "Aprox. 90€–140€ / noche",
        paid: false,
        address: "Ginza / Tokyo Station / Narita Airport, Japón",
        phone: "+81 3 0000 0000",
        checkIn: "Día 13 · 15:00",
        checkOut: "Día de salida internacional",
        rooms: "Habitación cómoda con espacio para organizar maletas y compras",
        guests: "A definir según grupo",
        cancel: "Cancelación gratuita",
        onsen: { has: false, hours: "" },
        note: "Últimas compras de souvenirs (omiyage) en Don Quijote o Ginza, gran banquete de despedida (sukiyaki o wagyu) y conexión directa en Narita Express para el vuelo de regreso.",
      },
    ],
  },
];

// Transportes y conexiones para las 13 etapas de la ruta
export const transports = [
  {
    day: 1,
    kind: "train",
    name: "Tren Narita Express (JR N'EX) o Keisei Skyliner",
    type: "Tren Express de Aeropuerto",
    route: "Narita Airport (NRT) → Tokyo Station / Shinjuku / Ueno",
    duration: "36 min – 58 min",
    time: "Frecuente (cada 30 min)",
    jpy: 3250,
    real: 20,
    reserved: true,
    desc: "Tren directo desde la estación subterránea de Narita Airport. Conexión rápida y cómoda con espacio reservado para maletas grandes.",
  },
  {
    day: 2,
    kind: "metro",
    name: "Metro de Tokio (Tokyo Subway & Línea JR Yamanote)",
    type: "Red de Metro y Cercanías",
    route: "Asakusa ↔ Harajuku ↔ Shibuya ↔ Shinjuku",
    duration: "5 – 25 min por trayecto",
    time: "Todo el día",
    jpy: 800,
    real: 5,
    desc: "La mejor opción es el pase Tokyo Subway Ticket 24h (~800¥) combinado con la tarjeta IC Suica en el móvil para la línea circular Yamanote.",
  },
  {
    day: 3,
    kind: "train",
    name: "Tobu Limited Express Spacia X / Revaty",
    type: "Tren Express Panorámico",
    route: "Tobu-Asakusa (Tokio) ↔ Tobu-Nikko",
    duration: "1h 50m (sin transbordos)",
    time: "Salida recomendada 07:50 o 08:30",
    jpy: 3500,
    real: 22,
    desc: "Excursión a Nikko con el pase Tobu Nikko World Heritage Area Pass. Incluye el tren de ida y vuelta y los autobuses ilimitados por la zona monumental.",
  },
  {
    day: 4,
    kind: "train",
    name: "Línea JR Yokosuka & Ferrocarril Eléctrico Enoden",
    type: "Tren de Cercanías & Tren Histórico",
    route: "Tokio / Shinjuku ↔ Kamakura ↔ Hase",
    duration: "55 min (Tokio-Kamakura) + 10 min (Enoden)",
    time: "Frecuente",
    jpy: 1900,
    real: 12,
    desc: "Tren directo a Kamakura para ver el Gran Buda de bronce Kotoku-in. A la vuelta a Tokio, enviar maletas grandes a Osaka por Takkyubin.",
  },
  {
    day: 5,
    kind: "bus",
    name: "Autobús Express Busta Shinjuku → Monte Fuji",
    type: "Autobús de Montaña de Alta Capacidad",
    route: "Shinjuku Expressway Bus Terminal ↔ 5ª Estación Fuji Subaru Line",
    duration: "2h 20m",
    time: "Salidas recomendadas 06:45, 07:45 o 08:45",
    jpy: 3800,
    real: 24,
    desc: "Acceso directo por carretera hasta los 2.300 metros de altitud para iniciar la ascensión a pie por la ruta Yoshida hacia el refugio.",
  },
  {
    day: 6,
    kind: "shinkansen",
    name: "Bus Fujikyu + Shinkansen Tokaido (Hikari / Nozomi)",
    type: "Tren Bala de Alta Velocidad (Shinkansen)",
    route: "Fuji 5ª Estación → Estación Mishima → Shin-Osaka",
    duration: "1h 45m bus + 1h 50m Shinkansen",
    time: "Mediodía (tras descenso del Fuji)",
    jpy: 12800,
    real: 80,
    desc: "Enlace rápido desde el Monte Fuji hacia Kansai. Llegada a Osaka a primera hora de la tarde y check-in en el hotel.",
  },
  {
    day: 7,
    kind: "metro",
    name: "Metro de Osaka (Líneas Midosuji y Tanimachi)",
    type: "Red de Metro Urbano",
    route: "Namba ↔ Tennoji ↔ Umeda",
    duration: "5 – 15 min",
    time: "Todo el día",
    jpy: 650,
    real: 4.5,
    desc: "Pase de un día Osaka 1-Day Pass (Enjoy Eco Card) para visitar Namba Yasaka, el templo Isshin-ji, el Mercado Kuromon y Umeda Sky.",
  },
  {
    day: 8,
    kind: "shinkansen",
    name: "Shinkansen Sanyo (Nozomi / Sakura) + Tranvía Hiroden",
    type: "Tren Bala Shinkansen & Tranvía Histórico",
    route: "Shin-Osaka → Hiroshima Station (1h 25m) + Tranvía a Cúpula Atómica",
    duration: "1h 25m tren bala + 15 min tranvía",
    time: "Salida matinal (08:00 – 09:00)",
    jpy: 10500,
    real: 68,
    desc: "Tren bala ultrarrápido al oeste de Japón. En Hiroshima el tranvía urbano Hiroden conecta con el Parque de la Paz.",
  },
  {
    day: 9,
    kind: "ferry",
    name: "Línea JR Sanyo + Ferry JR West Miyajima",
    type: "Tren de Cercanías & Ferry Panorámico",
    route: "Hiroshima Station → Miyajimaguchi (28 min) + Ferry a la Isla (10 min)",
    duration: "38 min total",
    time: "Ferry cada 15 min",
    jpy: 720,
    real: 5,
    desc: "El ferry de JR navega haciendo una curva especial frente al Gran Torii Flotante para la mejor panorámica desde el agua.",
  },
  {
    day: 10,
    kind: "plane",
    name: "Vuelo Doméstico a Okinawa + Monorraíl Yui Rail",
    type: "Vuelo Interior & Monorraíl",
    route: "Hiroshima (HIJ) / Osaka (KIX) → Naha Airport (OKA) → Centro de Naha",
    duration: "1h 55m vuelo + 15 min monorraíl",
    time: "Mañana",
    jpy: 12000,
    real: 75,
    desc: "Vuelo hacia el archipiélago subtropical de Ryukyu. El monorraíl elevado conecta el aeropuerto directo con Kokusai-dori y el Castillo Shuri.",
  },
  {
    day: 11,
    kind: "ferry",
    name: "Vuelo Naha → Ishigaki + Ferry Rápido a Isla de Iriomote",
    type: "Vuelo Interinsular & Ferry Rápido de Alta Velocidad",
    route: "Naha (OKA) → Ishigaki (ISG) (55 min) + Ferry a Puerto de Iriomote (45 min)",
    duration: "1h 40m trayecto",
    time: "Mañana",
    jpy: 9500,
    real: 60,
    desc: "Traslado al Japón más salvaje y virgen. Reserva Dark Sky Park internacional para observación de estrellas y kayak por manglares.",
  },
  {
    day: 12,
    kind: "plane",
    name: "Vuelo Doméstico hacia Hokkaido + Tren Rápido JR Airport",
    type: "Vuelo Interior & Tren Rápido",
    route: "Okinawa / Tokio → Sapporo New Chitose (CTS) → Sapporo Station",
    duration: "Vuelo doméstico + 37 min tren JR",
    time: "Mañana",
    jpy: 14500,
    real: 90,
    desc: "Salto al gran norte de Japón. Tren rápido directo desde el aeropuerto New Chitose al corazón de Sapporo.",
  },
  {
    day: 13,
    kind: "plane",
    name: "Vuelo Sapporo → Tokio + Narita Express",
    type: "Vuelo Interior & Tren Narita Express",
    route: "Sapporo (CTS) → Tokio (HND/NRT) → Narita Airport (NRT)",
    duration: "1h 40m vuelo + 58 min tren N'EX",
    time: "Tarde / Noche",
    jpy: 10000,
    real: 65,
    desc: "Regreso a la capital para compras de última hora (omiyage), cena de despedida y traslado a Narita para el vuelo internacional.",
  },
];

// Presupuesto estimado por viajero para la ruta de 13 etapas
export const budget = {
  people: 1,
  totalPerPerson: "3.750€",
  totalGroup: "3.750€ / viajero (estimación completa)",
  note: "Presupuesto orientativo y realista para la ruta completa de 13 días, incluyendo vuelos internacionales, vuelos domésticos, alojamientos, transportes de alta velocidad, comidas y actividades.",
  categories: [
    {
      title: "Vuelos Internacionales (España ↔ Japón)",
      total: "950€",
      perPerson: "950€",
      items: [
        { label: "Vuelo ida y vuelta Madrid/Barcelona - Tokio (NRT/HND)", cost: "850€–1.050€", note: "Reserva recomendada con 3–6 meses de antelación." },
      ],
    },
    {
      title: "Vuelos y Conexiones Domésticas (Okinawa & Hokkaido)",
      total: "260€",
      perPerson: "260€",
      items: [
        { label: "Vuelo Kansai/Hiroshima → Okinawa (Naha)", cost: "75€", note: "Vuelo directo de 1h 55m" },
        { label: "Vuelo Naha → Ishigaki (Yaeyama / Iriomote)", cost: "50€", note: "Salto interinsular de 55m" },
        { label: "Vuelo Okinawa → Sapporo New Chitose", cost: "95€", note: "Enlace norte-sur" },
        { label: "Vuelo Sapporo → Tokio", cost: "40€", note: "Vuelo de retorno a la capital" },
      ],
    },
    {
      title: "Alojamientos (12 noches)",
      total: "1.100€",
      perPerson: "1.100€",
      items: [
        { label: "Tokio (4 noches iniciales)", cost: "320€ (~80€/noche compartida)", note: "Shinjuku o Asakusa" },
        { label: "Refugio Monte Fuji (1 noche)", cost: "85€", note: "Yamagoya con cena y desayuno" },
        { label: "Osaka (2 noches)", cost: "150€ (~75€/noche)", note: "Namba / Umeda" },
        { label: "Ryokan tradicional en Miyajima / Hiroshima (2 noches)", cost: "240€", note: "Con onsen y cena kaiseki" },
        { label: "Okinawa e Iriomote (2 noches)", cost: "170€", note: "Hotel costero y eco-lodge" },
        { label: "Sapporo, Hokkaido (1 noche)", cost: "65€", note: "Centro de Sapporo" },
        { label: "Tokio final (1 noche de despedida)", cost: "70€", note: "Cerca de estación o aeropuerto" },
      ],
    },
    {
      title: "Transportes Terrestres y Pases Regionales",
      total: "420€",
      perPerson: "420€",
      items: [
        { label: "Narita Express / Skyliner (Ida y Vuelta)", cost: "40€", note: "Conexión rápida al aeropuerto" },
        { label: "Tokyo Subway 72h + Tarjeta IC Suica urbana", cost: "35€", note: "Desplazamientos en Tokio" },
        { label: "Tobu Nikko Pass World Heritage Area", cost: "25€", note: "Tren express y bus ilimitado en Nikko" },
        { label: "Trenes JR y Enoden a Kamakura", cost: "15€", note: "Excursión costera" },
        { label: "Autobús Express Busta Shinjuku → Monte Fuji 5ª Estación", cost: "24€", note: "Subida al Fuji" },
        { label: "Shinkansen Tokaido (Mishima → Osaka)", cost: "80€", note: "Tren bala tras el Fuji" },
        { label: "Metro de Osaka (Pases 1-Day)", cost: "10€", note: "Moverse por Osaka" },
        { label: "Shinkansen Sanyo (Osaka → Hiroshima)", cost: "65€", note: "Tren bala hacia Chugoku" },
        { label: "Ferry JR a Miyajima + Tranvía Hiroden", cost: "8€", note: "Visita al torii flotante" },
        { label: "Ferry rápido Ishigaki ↔ Isla de Iriomote", cost: "30€", note: "Archipiélago Yaeyama" },
        { label: "JR Rapid Airport (Sapporo ↔ Aeropuerto Chitose)", cost: "16€", note: "Tren rápido de Hokkaido" },
        { label: "Envío de equipaje Takkyubin (2 envíos de maleta grande)", cost: "40€", note: "Tokio → Osaka y Hiroshima → Tokio" },
      ],
    },
    {
      title: "Gastronomía y Comidas (13 días)",
      total: "650€",
      perPerson: "650€ (~50€/día)",
      items: [
        { label: "Desayunos en Konbini / cafeterías (13 días)", cost: "100€ (~7€/día)", note: "Onigiris, café, fruta, repostería" },
        { label: "Almuerzos en ruta (Ramen, Soba, Udon, Donburi)", cost: "195€ (~15€/día)", note: "Comida informal y rápida de calidad" },
        { label: "Cenas especiales e Izakayas (Sukiyaki, Wagyu, Sushi, Ostras)", cost: "355€ (~27€/día)", note: "Disfrutar de la cultura izakaya, Dotonbori y Sapporo" },
      ],
    },
    {
      title: "Entradas, Actividades y Visitas",
      total: "210€",
      perPerson: "210€",
      items: [
        { label: "Mirador Shibuya Sky / Umeda Sky", cost: "25€", note: "Vistas panorámicas 360°" },
        { label: "Santuarios de Nikko (Toshogu + Rinnoji)", cost: "12€", note: "Patrimonio de la Humanidad" },
        { label: "Gran Buda Kotoku-in y Hasedera (Kamakura)", cost: "6€", note: "Templos de Kamakura" },
        { label: "Tasa oficial de escalada Monte Fuji", cost: "18€", note: "Tasa de preservación y acceso" },
        { label: "Castillo de Osaka y Museo Memorial Hiroshima", cost: "6€", note: "Entradas históricas" },
        { label: "Teleférico Monte Misen (Miyajima)", cost: "13€", note: "Panorámica del mar interior" },
        { label: "Tour en kayak por manglares y cascada en Iriomote", cost: "50€", note: "Excursión en la naturaleza" },
        { label: "Museos, templos y jardines varios", cost: "40€", note: "Fondo para visitas espontáneas" },
        { label: "Batería de souvenirs y recuerdos (Omiyage)", cost: "40€", note: "Dulces típicos, amuletos omamori" },
      ],
    },
    {
      title: "Seguro de Viaje y Conectividad eSIM",
      total: "110€",
      perPerson: "110€",
      items: [
        { label: "Seguro de viaje con alta cobertura médica internacional", cost: "75€", note: "Cobertura IATI / Chapka / Heymondo con cancelación" },
        { label: "eSIM con datos móviles ilimitados (15 días)", cost: "35€", note: "Holafly / Airalo / Ubigi" },
      ],
    },
    {
      title: "Fondo de Contingencia e Imprevistos",
      total: "150€",
      perPerson: "150€",
      items: [
        { label: "Monedero de emergencia / imprevistos", cost: "150€", note: "Taxis imprevistos, compras no planificadas, suplementos" },
      ],
    },
  ],
};
