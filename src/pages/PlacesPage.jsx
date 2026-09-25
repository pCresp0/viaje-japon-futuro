import { useState } from "react";
import { MapPin, Utensils, Mountain, Compass, Sparkles, Building, Trees } from "lucide-react";
import GuideCard from "../components/GuideCard";
import { useT, useContent } from "../i18n/LanguageContext";

// Lugares que tienen guía detallada disponible (id del lugar → id de la guía)
const guideFor = {
  senso: "senso-ji",
  meiji: "meiji-jingu",
  nikko: "nikko",
  fuji: "fuji",
  osaka: "osaka",
  shibuya: "shibuya",
  shinjuku: "shinjuku",
  harajuku: "harajuku",
};

/** Categorías y paradas destacadas de la ruta futura de 13 etapas */
const places = [
  {
    category: "Templos, Santuarios y Patrimonio UNESCO",
    icon: MapPin,
    color: "#bc4749",
    items: [
      { id: "senso", name: "Senso-ji (Asakusa)", city: "Tokio", stage: 2, desc: "El templo budista más venerado de Tokio, presidido por la linterna gigante de Kaminarimon." },
      { id: "meiji", name: "Meiji Jingu", city: "Tokio", stage: 2, desc: "Santuario sintoísta imperial envuelto en un bosque sagrado de 70.000 árboles milenarios." },
      { id: "nikko", name: "Santuario Toshogu & Rinno-ji", city: "Nikko", stage: 3, desc: "Mausoleo de Tokugawa Ieyasu, cumbre del arte y talla en madera dorada en plena naturaleza." },
      { id: "kamakura-buda", name: "Gran Buda Kotoku-in & Hachimangu", city: "Kamakura", stage: 4, desc: "Colosal estatua de bronce al aire libre del siglo XIII y la capital del primer shogunato." },
      { id: "osaka-castillo", name: "Castillo de Osaka & Santuario Namba Yasaka", city: "Osaka", stage: 7, desc: "Símbolo de la unificación militar de Toyotomi Hideyoshi y el impactante santuario cabeza de león." },
      { id: "itsukushima", name: "Santuario Itsukushima & Daisho-in", city: "Miyajima", stage: 8, desc: "El gran torii rojo flotante sobre la marea del mar interior de Seto y el místico Daisho-in." },
      { id: "shuri", name: "Castillo de Shuri & Santuario Naminoue", city: "Okinawa (Naha)", stage: 10, desc: "Cuna del antiguo Reino independiente de Ryukyu, con arquitectura y murallas de piedra coralina." },
      { id: "hokkaido-jingu", name: "Santuario Hokkaido Jingu", city: "Sapporo", stage: 12, desc: "El mayor santuario de la isla septentrional, rodeado por los bosques del Parque Maruyama." },
    ],
  },
  {
    category: "Naturaleza Salvaje, Montaña y Playas",
    icon: Mountain,
    color: "#457b9d",
    items: [
      { id: "fuji", name: "Cima del Monte Fuji (3.776 m)", city: "Monte Fuji", stage: 5, desc: "El volcán sagrado de Japón. Ascenso por la ruta Yoshida para contemplar el amanecer Goraiko." },
      { id: "kegon", name: "Cascadas Kegon & Lago Chuzenji", city: "Nikko", stage: 3, desc: "Una de las tres cataratas más bellas de Japón, con casi 100 metros de caída de agua volcánica." },
      { id: "enoshima", name: "Isla de Enoshima & Vistas del Fuji", city: "Kamakura / Shonan", stage: 4, desc: "Acantilados marinos, santuarios en cuevas y miradores de la costa con el perfil del Fuji al fondo." },
      { id: "misen", name: "Monte Misen (Mirador Mar de Seto)", city: "Miyajima", stage: 9, desc: "Cima sagrada con vistas panorámicas de las islas del mar interior y fuego sagrado encendido por Kobo Daishi." },
      { id: "arrecifes-okinawa", name: "Arrecifes de Coral & Aguas Turquesa", city: "Okinawa", stage: 10, desc: "Playas tropicales con aguas cristalinas para snorkel y avistamiento de fauna marina autóctona." },
      { id: "iriomote-jungla", name: "Río Urauchi & Jungla Virgen", city: "Isla de Iriomote", stage: 11, desc: "Parque Nacional en la isla más salvaje de Japón: manglares, cascadas y hábitat del gato leopardo." },
      { id: "moiwa", name: "Monte Moiwa & Mirador Nocturno", city: "Sapporo", stage: 12, desc: "Teleférico a la cima para contemplar una de las mejores tres vistas nocturnas de Japón." },
    ],
  },
  {
    category: "Iconos Urbanos y Miradores Vanguardistas",
    icon: Building,
    color: "#1d3557",
    items: [
      { id: "shibuya", name: "Cruce Scramble & Shibuya Sky", city: "Tokio", stage: 2, desc: "El cruce peatonal más transitado del planeta y la terraza panorámica a 230 metros de altura." },
      { id: "shinjuku", name: "Rascacielos & Callejón Omoide Yokocho", city: "Tokio", stage: 2, desc: "Contraste entre los colosos de cristal de Shinjuku y los diminutos puestos de yakitori tradicionales." },
      { id: "dotonbori", name: "Distrito Dotonbori & Shinsekai", city: "Osaka", stage: 6, desc: "Epicentro gastronómico y nocturno de Kansai, con el histórico cartel de Glico Man y la torre Tsutenkaku." },
      { id: "hiroshima-paz", name: "Cúpula de la Bomba Atómica & Parque de la Paz", city: "Hiroshima", stage: 8, desc: "Monumento Patrimonio de la Humanidad en memoria de las víctimas y alegato mundial por la paz." },
      { id: "odori-sapporo", name: "Parque Odori & Torre de Televisión", city: "Sapporo", stage: 12, desc: "Bulevar verde que vertebra el centro neurálgico de la capital de Hokkaido." },
      { id: "canal-otaru", name: "Canal Histórico & Farolas de Gas", city: "Otaru", stage: 13, desc: "Almacenes de ladrillo y piedra reconvertidos en cafeterías, talleres de vidrio y cajas de música." },
    ],
  },
  {
    category: "Gastronomía Regional y Mercados Típicos",
    icon: Utensils,
    color: "#2e7d5b",
    items: [
      { id: "tsukiji", name: "Mercado Exterior de Tsukiji & Ramen", city: "Tokio", stage: 1, desc: "Puestos callejeros de marisco a la plancha, brochetas de wagyu y auténtico ramen de caldo tonkotsu." },
      { id: "yuba-nikko", name: "Yuba de Nikko (Piel de tofu artesano)", city: "Nikko", stage: 3, desc: "Manjar culinario budista servido en múltiples texturas: rollos fritos, caldo y sashimi de soja." },
      { id: "shirasu-kamakura", name: "Shirasu Don (Pescadito de Enoshima)", city: "Kamakura", stage: 4, desc: "Cuenco de arroz cubierto con diminuto pescado blanco fresco capturado en la bahía de Sagami." },
      { id: "takoyaki-osaka", name: "Takoyaki & Okonomiyaki de Kansai", city: "Osaka", stage: 6, desc: "Bolitas calientes rellenas de pulpo y tortillas japonesas preparadas al momento sobre la plancha teppan." },
      { id: "hiroshima-okonomiyaki", name: "Okonomiyaki estilo Hiroshima (con fideos)", city: "Hiroshima", stage: 8, desc: "Versión en capas con abundante col fresca, fideos yakisoba y salsa dulce con huevo frito." },
      { id: "ostras-miyajima", name: "Ostras Asadas & Momiji Manju", city: "Miyajima", stage: 9, desc: "Ostras gigantes del mar interior abiertas a la parrilla y bizcochitos en forma de hoja de arce." },
      { id: "okinawa-soba", name: "Okinawa Soba & Cerdo Rafute", city: "Okinawa", stage: 10, desc: "Fideos gruesos de trigo en caldo de cerdo y bonito seco con panceta melosa estofada en awamori." },
      { id: "ramen-sapporo", name: "Miso Ramen & Cangrejo de Hokkaido", city: "Sapporo", stage: 12, desc: "Caldo espeso aromatizado con pasta de miso tostado, maíz, mantequilla y marisco septentrional." },
    ],
  },
];

function sortByStage(items) {
  return [...items].sort((a, b) => {
    const da = a.stage == null ? 999 : a.stage;
    const db = b.stage == null ? 999 : b.stage;
    return da - db;
  });
}

export default function PlacesPage() {
  const t = useT();
  const { days } = useContent();

  const dayByNum = Object.fromEntries(days.map((d) => [d.num, d]));

  function stageLabel(stageNum) {
    if (stageNum == null) return null;
    const d = dayByNum[stageNum];
    if (!d) return `Etapa ${stageNum}`;
    return `Etapa ${stageNum}`;
  }

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("places.eyebrow") || "Destinos y Experiencias"}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("places.title") || "Lugares Clave de la Ruta"}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5, marginBottom: 0 }}>
          Selección temática de templos, maravillas naturales, miradores futuristas y gastronomía regional organizada según las 13 etapas del viaje.
        </p>
      </div>

      {/* Featured Route Highlights Banner */}
      <div
        className="rounded-2xl p-5 mb-7 border"
        style={{
          background: "linear-gradient(135deg, rgba(29,53,87,0.06) 0%, rgba(188,71,73,0.06) 100%)",
          borderColor: "rgba(29,53,87,0.18)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} style={{ color: "var(--shu)" }} />
          <h3 className="font-bold text-sm" style={{ color: "var(--indigo)", margin: 0 }}>
            Hitos Imprescindibles de la Expedición
          </h3>
        </div>
        <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
          Este viaje conecta los santuarios de montaña más venerados (<strong>Nikko Toshogu</strong> y <strong>Kamakura</strong>), la cima del <strong>Monte Fuji</strong> al amanecer, el torii marino de <strong>Miyajima</strong>, el salto subtropical a las islas de <strong>Okinawa e Iriomote</strong>, y la indómita naturaleza de <strong>Hokkaido</strong>. Cada lugar cuenta con consejos de visita y contexto histórico.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {places.map((category, catIdx) => {
          const Icon = category.icon;
          const items = sortByStage(category.items);

          return (
            <div
              key={catIdx}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
            >
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ background: category.color }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: "white" }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>
                    {category.category}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "white",
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.18)",
                    padding: "3px 9px",
                    borderRadius: 20,
                  }}
                >
                  {items.length}
                </span>
              </div>

              {items.map((place, idx) => {
                const when = stageLabel(place.stage);
                return (
                  <div
                    key={place.id}
                    style={{ borderTop: idx > 0 ? "1px solid var(--line)" : "none" }}
                  >
                    <div className="px-5 py-4">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
                        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                          {place.name}
                        </p>
                        {when && (
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded"
                            style={{ background: "rgba(188,71,73,0.1)", color: "var(--shu)" }}
                          >
                            {when}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 4 }}>
                        📍 {place.city}
                      </p>
                      <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5, margin: 0, opacity: 0.85 }}>
                        {place.desc}
                      </p>

                      {guideFor[place.id] && (
                        <div style={{ marginTop: 12 }}>
                          <GuideCard id={guideFor[place.id]} accent={category.color} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

