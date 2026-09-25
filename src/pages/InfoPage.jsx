import { useState } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Plane, PlaneTakeoff, PlaneLanding, QrCode, ExternalLink, ShieldCheck, CheckCircle2, Luggage, AlertCircle, Sparkles, ChevronDown } from "lucide-react";

export default function InfoPage() {
  const { flights } = useContent();
  const t = useT();

  const [visitJapanOpen, setVisitJapanOpen] = useState(true);

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto space-y-6">
      {/* ── Encabezado ────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          Planificación Aérea
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
          Vuelos & Llegada a Japón
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Guía de vuelos internacionales, conexiones domésticas para Okinawa y Hokkaido, y trámites de aduana con Visit Japan Web.
        </p>
      </div>

      {/* ── Visit Japan Web (Guía Oficial de Aduana & QR) ────── */}
      <div
        className="rounded-2xl border overflow-hidden shadow-xs"
        style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
      >
        <div
          onClick={() => setVisitJapanOpen(!visitJapanOpen)}
          className="p-5 flex items-start justify-between gap-3 cursor-pointer transition-colors hover:bg-neutral-50"
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(188, 71, 73, 0.12)", color: "var(--shu)" }}
            >
              <QrCode size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-display text-lg font-bold" style={{ color: "var(--indigo)" }}>
                  Visit Japan Web (Trámite Oficial de Entrada)
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                  <ShieldCheck size={12} /> Oficial Digital Agency Japan
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 m-0 leading-relaxed">
                Registro digital obligatorio del Gobierno de Japón para agilizar inmigración y aduanas sin rellenar formularios de papel en el avión.
              </p>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 shrink-0 text-neutral-400 ${visitJapanOpen ? "rotate-180" : ""}`}
          />
        </div>

        {visitJapanOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-neutral-150 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <p className="font-bold text-xs text-neutral-800 m-0 mb-1">1. Registro previo</p>
                <p className="text-xs text-neutral-600 m-0 leading-relaxed">
                  Crea tu cuenta en la web oficial 1–2 semanas antes de volar con tus datos de pasaporte y número de vuelo.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <p className="font-bold text-xs text-neutral-800 m-0 mb-1">2. Obtención de QRs</p>
                <p className="text-xs text-neutral-600 m-0 leading-relaxed">
                  Genera el código QR de Inmigración (Disembarkation) y el código QR de Declaración de Aduanas.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <p className="font-bold text-xs text-neutral-800 m-0 mb-1">3. Fast Track en Narita</p>
                <p className="text-xs text-neutral-600 m-0 leading-relaxed">
                  Al aterrizar, escanea los códigos en los quioscos electrónicos del aeropuerto para pasar el control en minutos.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
              <p className="text-xs text-neutral-500 m-0">
                💡 Guarda una captura de pantalla de los dos códigos QR en la galería de fotos por si no tienes conexión al aterrizar.
              </p>
              <a
                href="https://services.digital.go.jp/visit-japan-web-es/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-xs"
                style={{ background: "var(--shu)" }}
              >
                <span>Acceder a Visit Japan Web</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Vuelos Internacionales (España ↔ Japón) ──────────── */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold flex items-center gap-2" style={{ color: "var(--indigo)" }}>
          <Plane size={18} />
          Vuelos Internacionales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tarjeta Ida */}
          <div
            className="rounded-2xl p-5 border shadow-xs"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1" style={{ background: "rgba(29,53,87,0.1)", color: "var(--indigo)" }}>
                <PlaneTakeoff size={13} /> Vuelo de Ida (Día 1)
              </span>
              <span className="text-xs text-neutral-500 font-medium">España → Tokio</span>
            </div>

            <h3 className="font-display text-base font-bold m-0 mb-1 text-neutral-900">
              Madrid (MAD) / Barcelona (BCN) → Tokio Narita (NRT)
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Vuelo directo con Iberia (14h) o con escala única en Oriente Medio (Qatar Airways / Emirates, aprox. 16h–17h total). Llegada al Aeropuerto de Narita o Haneda el Día 1.
            </p>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Aerolíneas sugeridas:</span>
                <span className="font-semibold">Iberia, Qatar Airways, Emirates</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Duración estimada:</span>
                <span className="font-semibold">14h – 17h (según escala)</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Precio orientativo:</span>
                <span className="font-semibold text-emerald-700">800€ – 1.050€ ida/vuelta</span>
              </div>
            </div>

            <a
              href="https://www.google.com/travel/flights?q=flights+from+Madrid+to+Tokyo"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold inline-flex items-center gap-1 text-indigo-700 hover:underline"
            >
              <span>Buscar vuelos de ida en Google Flights</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Tarjeta Regreso */}
          <div
            className="rounded-2xl p-5 border shadow-xs"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1" style={{ background: "rgba(188,71,73,0.1)", color: "var(--shu)" }}>
                <PlaneLanding size={13} /> Vuelo de Regreso (Día 13/14)
              </span>
              <span className="text-xs text-neutral-500 font-medium">Tokio → España</span>
            </div>

            <h3 className="font-display text-base font-bold m-0 mb-1 text-neutral-900">
              Tokio Narita (NRT) → Madrid / Barcelona
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Vuelo de regreso internacional saliendo desde Narita tras el enlace doméstico desde Hokkaido y la noche de despedida en Tokio.
            </p>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Traslado al aeropuerto:</span>
                <span className="font-semibold">Narita Express (JR N'EX, 58 min)</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Antelación recomendada:</span>
                <span className="font-semibold">3 horas antes en la terminal</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span className="text-neutral-500">Duty Free:</span>
                <span className="font-semibold text-emerald-700">Compras de dulces Omiyage</span>
              </div>
            </div>

            <a
              href="https://www.google.com/travel/flights?q=flights+from+Tokyo+to+Madrid"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold inline-flex items-center gap-1 text-indigo-700 hover:underline"
            >
              <span>Buscar vuelos de regreso en Google Flights</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Vuelos Domésticos de la Ruta (Okinawa & Hokkaido) ─── */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold flex items-center gap-2" style={{ color: "var(--indigo)" }}>
          <Sparkles size={18} style={{ color: "var(--shu)" }} />
          Vuelos Domésticos de la Ruta (4 Conexiones)
        </h2>

        <div className="rounded-2xl border overflow-hidden shadow-xs" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
          <div className="p-4 bg-neutral-50 border-b border-neutral-200">
            <p className="text-xs sm:text-sm text-neutral-600 m-0 leading-relaxed">
              Para enlazar los extremos del archipiélago (el sur subtropical de Okinawa y el norte salvaje de Hokkaido) sin perder días enteros en trenes, la ruta integra cuatro vuelos domésticos rápidos y económicos:
            </p>
          </div>

          <div className="divide-y divide-neutral-200">
            {(flights.domesticFlights || []).map((df, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      Vuelo {i + 1}
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-neutral-900 m-0">
                      {df.route}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 m-0">
                    {df.note} · Operado por: <span className="font-semibold text-neutral-700">{df.operators}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-sm sm:text-base text-emerald-700 m-0">
                    {df.approxPrice}
                  </p>
                  <p className="text-[11px] text-neutral-400 m-0 font-medium">
                    {df.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Consejos Clave para Volar a Japón ─────────────────── */}
      <div className="rounded-2xl p-5 border space-y-3" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
        <h3 className="font-display text-base font-bold text-neutral-900 m-0 flex items-center gap-2">
          <Luggage size={18} style={{ color: "var(--indigo)" }} />
          Normativa de Equipaje y Consejos Aéreos
        </h3>
        <ul className="text-xs sm:text-sm text-neutral-600 space-y-2 m-0 pl-4 list-disc leading-relaxed">
          <li>
            <strong>Powerbanks y baterías de litio:</strong> Deben viajar obligatoriamente en el equipaje de mano. Está prohibido facturarlas en bodega.
          </li>
          <li>
            <strong>Medicamentos:</strong> Japón tiene normativas muy estrictas contra medicamentos que contengan pseudoefedrina (algunos antigripales europeos). Lleva solo medicación de uso personal con prospecto.
          </li>
          <li>
            <strong>Asientos para ver el Monte Fuji:</strong> En el vuelo de aproximación a Tokio (si aterriza de día por Narita o Haneda), los asientos en la ventanilla izquierda (lado A) suelen permitir divisar la cima nevada del volcán si no hay nubes.
          </li>
        </ul>
      </div>
    </div>
  );
}
