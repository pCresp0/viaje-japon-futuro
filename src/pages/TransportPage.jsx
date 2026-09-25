import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap, Clock, Smartphone, CreditCard, ChevronDown, Ticket, Plane, Ship, Luggage, ExternalLink, Sparkles } from "lucide-react";
import { Highlightable, useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

function iconForKind(kind) {
  if (kind === "bus") return Bus;
  if (kind === "shinkansen") return Zap;
  if (kind === "plane") return Plane;
  if (kind === "ferry") return Ship;
  return Train;
}

function colorForKind(kind) {
  if (kind === "shinkansen") return "#bc4749";
  if (kind === "plane") return "#1d3557";
  if (kind === "bus") return "#457b9d";
  if (kind === "ferry") return "#2e7d5b";
  return "#c9a227";
}

export default function TransportPage({ onNavigate }) {
  const { transports, days, blocks } = useContent();
  const t = useT();
  const { highlightId } = useHighlight();
  const [activeTab, setActiveTab] = useState("trayectos");

  const [suicaOpen, setSuicaOpen] = useState(false);
  const [smartExOpen, setSmartExOpen] = useState(false);
  const [takkyubinOpen, setTakkyubinOpen] = useState(false);

  useEffect(() => {
    if (!highlightId) return;
    if (highlightId.startsWith("transport-")) {
      setActiveTab("trayectos");
    } else if (highlightId.startsWith("pass-") || highlightId.startsWith("suica-")) {
      setActiveTab("pases");
    }
  }, [highlightId]);

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto space-y-6">
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          Movilidad & Conexiones
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
          Guía de Transportes por Japón
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Trenes bala Shinkansen, tarjetas IC en el móvil, pases regionales, vuelos domésticos y gestión de equipaje Takkyubin.
        </p>
      </div>

      {/* ── Selector de Pestañas ──────────────────────────────── */}
      <div
        className="flex items-center gap-1 rounded-full p-1 border shadow-xs"
        style={{ background: "var(--paper-raised)", borderColor: "var(--line)", width: "fit-content" }}
      >
        <button
          onClick={() => setActiveTab("trayectos")}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer"
          style={{
            background: activeTab === "trayectos" ? "var(--indigo)" : "transparent",
            color: activeTab === "trayectos" ? "white" : "var(--ink-soft)",
            border: "none",
          }}
        >
          <Train size={14} />
          Conexiones por Etapa (13)
        </button>
        <button
          onClick={() => setActiveTab("pases")}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer"
          style={{
            background: activeTab === "pases" ? "var(--shu)" : "transparent",
            color: activeTab === "pases" ? "white" : "var(--ink-soft)",
            border: "none",
          }}
        >
          <Ticket size={14} />
          Pases, Tarjetas IC & Maletas
        </button>
      </div>

      {/* ── Pestaña 1: Conexiones de las 13 Etapas ────────────── */}
      {activeTab === "trayectos" && (
        <div className="space-y-4">
          {transports.map((tr) => {
            const Icon = iconForKind(tr.kind);
            const badgeColor = colorForKind(tr.kind);
            const dayObj = days.find((d) => d.num === tr.day);

            return (
              <Highlightable key={tr.day} id={slug("transport", tr.day)}>
                <div
                  className="rounded-2xl border p-4 sm:p-5 transition-all shadow-xs"
                  style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs"
                        style={{ background: badgeColor }}
                      >
                        <Icon size={19} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                            Etapa {tr.day} {dayObj ? `· ${dayObj.cities}` : ""}
                          </span>
                          <span className="text-xs font-semibold text-neutral-500">
                            {tr.type}
                          </span>
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 m-0 mt-0.5">
                          {tr.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-auto sm:ml-0">
                      <p className="font-display font-bold text-sm sm:text-base text-emerald-700 m-0">
                        ~{tr.real}€ <span className="text-xs text-neutral-400 font-normal">(¥{tr.jpy?.toLocaleString()})</span>
                      </p>
                      <p className="text-[11px] text-neutral-500 m-0 flex items-center gap-1 justify-end font-medium">
                        <Clock size={11} /> {tr.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs sm:text-sm text-neutral-700 space-y-1.5">
                    <p className="m-0 leading-relaxed">
                      <strong>Trayecto:</strong> {tr.route}
                    </p>
                    <p className="m-0 leading-relaxed text-neutral-600">
                      {tr.desc}
                    </p>
                  </div>
                </div>
              </Highlightable>
            );
          })}
        </div>
      )}

      {/* ── Pestaña 2: Pases, Tarjeta IC & Logística ───────────── */}
      {activeTab === "pases" && (
        <div className="space-y-4">
          {/* Tarjeta Suica / Pasmo en el móvil */}
          <div className="rounded-2xl border p-5 shadow-xs" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
            <div
              onClick={() => setSuicaOpen(!suicaOpen)}
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 m-0">
                    Tarjeta IC Digital (Suica / Pasmo) en el Móvil
                  </h3>
                  <p className="text-xs text-neutral-500 m-0 mt-0.5">
                    El método de pago imprescindible para transportes urbanos, konbinis y máquinas de vending.
                  </p>
                </div>
              </div>
              <ChevronDown size={18} className={`transition-transform text-neutral-400 ${suicaOpen ? "rotate-180" : ""}`} />
            </div>

            {suicaOpen && (
              <div className="mt-4 pt-4 border-t border-neutral-200 text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
                <p>
                  <strong>En iPhone (Apple Wallet):</strong> Abre la app <em>Cartera</em> → pulsa el botón <strong>+</strong> → selecciona <em>Tarjeta de transporte</em> → busca <em>Japón</em> → elige <strong>Suica</strong> o <strong>Pasmo</strong>. Se añade al instante y se recarga con tarjeta de débito/crédito (Mastercard o AMEX recomendadas) sin comisiones. Al pasar por los tornos del metro o pagar en un 7-Eleven, solo tienes que acercar la parte superior del iPhone al lector; funciona incluso con el teléfono apagado o sin batería (Modo Express).
                </p>
                <p>
                  <strong>En teléfonos Android (no japoneses):</strong> Debido a que los Android vendidos fuera de Japón no incorporan el chip FeliCa de hardware, la app digital puede no estar disponible. En ese caso, adquiere la tarjeta física <strong>Welcome Suica</strong> en las máquinas expendedoras de JR East al aterrizar en el Aeropuerto de Narita.
                </p>
              </div>
            )}
          </div>

          {/* Análisis del Japan Rail Pass (Nacional) */}
          <div className="rounded-2xl border p-5 shadow-xs" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Ticket size={20} />
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 m-0">
                  ¿Merece la pena el Japan Rail Pass (Nacional)?
                </h3>
                <p className="text-xs text-neutral-500 m-0 mt-0.5">
                  Análisis económico tras la subida de tarifas de octubre de 2023.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-700 space-y-2 leading-relaxed">
              <p className="m-0">
                <strong>Veredicto para esta ruta: ❌ NO sale a cuenta comprar el JR Pass nacional de 7 o 14 días.</strong>
              </p>
              <p className="m-0 text-neutral-600">
                El JR Pass nacional de 7 días cuesta actualmente <strong>50.000 ¥ (~315 €)</strong> y el de 14 días <strong>80.000 ¥ (~505 €)</strong>. En nuestra ruta de 13 etapas, los desplazamientos en tren bala Shinkansen principales (Mishima → Osaka y Osaka → Hiroshima) suman aprox. <strong>23.300 ¥ (~148 €)</strong>.
              </p>
              <p className="m-0 text-neutral-600">
                La estrategia más económica y flexible es comprar <strong>billetes individuales de Shinkansen en SmartEX</strong> con antelación, combinados con la tarjeta Suica digital y pases regionales específicos (como el <strong>Tobu Nikko Pass</strong> de ~25 €).
              </p>
            </div>
          </div>

          {/* Smart EX para Shinkansen */}
          <div className="rounded-2xl border p-5 shadow-xs" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
            <div
              onClick={() => setSmartExOpen(!smartExOpen)}
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 m-0">
                    SmartEX: Reserva Oficial de Shinkansen Online
                  </h3>
                  <p className="text-xs text-neutral-500 m-0 mt-0.5">
                    Cómo reservar asientos en el tren bala Nozomi desde el móvil.
                  </p>
                </div>
              </div>
              <ChevronDown size={18} className={`transition-transform text-neutral-400 ${smartExOpen ? "rotate-180" : ""}`} />
            </div>

            {smartExOpen && (
              <div className="mt-4 pt-4 border-t border-neutral-200 text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
                <p>
                  <strong>SmartEX</strong> es la web y aplicación oficial de JR Central y JR West para reservar trenes bala de las líneas Tokaido y Sanyo Shinkansen (Tokio, Kioto, Osaka, Hiroshima).
                </p>
                <ul className="pl-4 list-disc space-y-1">
                  <li>Permite elegir asientos en ventanilla o pasillo con antelación de hasta 30 días.</li>
                  <li>Puedes vincular el billete directamente al identificador de tu tarjeta Suica digital: al llegar a la estación, simplemente apoyas el iPhone en el torno del Shinkansen y se emite un pequeño resguardo de asiento en papel automáticamente.</li>
                  <li>Evita hacer colas en las ventanillas de las estaciones.</li>
                </ul>
                <a
                  href="https://smart-ex.jp/en/index.php"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:underline pt-1"
                >
                  <span>Web oficial de SmartEX en inglés</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>

          {/* Envío de equipaje Takkyubin (Yamato Transport) */}
          <div className="rounded-2xl border p-5 shadow-xs" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
            <div
              onClick={() => setTakkyubinOpen(!takkyubinOpen)}
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <Luggage size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 m-0">
                    Servicio Takkyubin: Envío de Maletas Hotel a Hotel
                  </h3>
                  <p className="text-xs text-neutral-500 m-0 mt-0.5">
                    El secreto japonés para viajar ligero en alta montaña y trenes bala.
                  </p>
                </div>
              </div>
              <ChevronDown size={18} className={`transition-transform text-neutral-400 ${takkyubinOpen ? "rotate-180" : ""}`} />
            </div>

            {takkyubinOpen && (
              <div className="mt-4 pt-4 border-t border-neutral-200 text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
                <p>
                  El servicio de paquetería <strong>Yamato Transport (Black Cat)</strong> permite enviar maletas de gran tamaño de un hotel a otro en cualquier lugar de Japón por aproximadamente <strong>2.000 ¥ (~13 €)</strong> por maleta.
                </p>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <p className="font-bold text-neutral-800 m-0">¿Cómo se utiliza en esta ruta?</p>
                  <p className="m-0 text-neutral-600">
                    La mañana del <strong>Día 4 en Tokio</strong>, entregas las maletas grandes en la recepción de tu hotel indicando el nombre y dirección del hotel de Osaka. Al día siguiente subes al Monte Fuji solo con una mochila de senderismo ligera, y al llegar a Osaka el Día 6 tus maletas ya te estarán esperando en la habitación.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
