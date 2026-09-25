import { useState, useEffect, useRef } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { mapsUrl } from "../utils/maps";
import { MapPin, Phone, KeyRound, CalendarCheck, CalendarX, BedDouble, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from "lucide-react";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { getDefaultTripDay, getHotelForDay } from "../utils/date";

function Field({ label, children, mono = false }) {
  if (!children) return null;
  return (
    <div>
      <p style={{
        fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase",
        letterSpacing: "0.06em", marginBottom: 3, fontWeight: 600,
      }}>
        {label}
      </p>
      <div style={{
        fontSize: mono ? 14 : 13.5,
        fontWeight: mono ? 700 : 500,
        color: "var(--ink)",
        margin: 0,
        fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit",
        lineHeight: 1.4,
      }}>
        {children}
      </div>
    </div>
  );
}

const getHeaderColor = (city) => {
  if (!city) return "var(--indigo)";
  const c = city.toLowerCase();
  if (c.includes("tokio") || c.includes("tokyo")) return "var(--indigo)";
  if (c.includes("fuji")) return "#457b9d";
  if (c.includes("osaka")) return "var(--shu)";
  if (c.includes("miyajima") || c.includes("hiroshima")) return "#c9a227";
  if (c.includes("okinawa") || c.includes("iriomote")) return "#2e7d5b";
  if (c.includes("sapporo") || c.includes("hokkaido")) return "#3a506b";
  return "var(--indigo)";
};

function HotelCard({ stay, index, anchorId, defaultExpanded = false }) {
  const hotel = stay.options[0];
  const t = useT();
  const { highlightId } = useHighlight();
  const isHighlighted = anchorId && highlightId === anchorId;
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(defaultExpanded || index === 0);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setExpanded(true);
      const timer = window.setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isHighlighted]);

  if (!hotel) return null;

  const mapQuery = hotel.address
    ? `${hotel.name}, ${hotel.address}`
    : `${hotel.name}, ${stay.city}, Japan`;
    
  const headerBg = getHeaderColor(stay.city);

  return (
    <article
      id={anchorId}
      ref={cardRef}
      className={"rounded-2xl overflow-hidden border shadow-xs transition-all" + (isHighlighted ? " search-highlight-pulse" : "")}
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      {/* Header */}
      <div 
        className="px-5 py-4 cursor-pointer transition-colors hover:opacity-95" 
        style={{ background: headerBg, color: "white" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span style={{ fontSize: 11, opacity: 0.9, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 700 }}>
                Base {index + 1} · {stay.city}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                {stay.nights}
              </span>
            </div>
            <h3 className="font-display text-xl mt-0.5 leading-tight text-white font-bold" style={{ margin: 0 }}>
              {hotel.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <a
              href={mapsUrl(mapQuery)}
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-colors shadow-xs"
              style={{ background: "rgba(255,255,255,0.22)", color: "white", textDecoration: "none" }}
            >
              <MapPin size={13} /> Maps
            </a>
            <div className="p-1 rounded-full bg-white/15">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-5 space-y-4">
          {/* Horarios Check-in / Check-out */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="rounded-xl p-3" style={{ background: "rgba(46,125,91,0.08)" }}>
              <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "#2e7d5b" }}>
                <CalendarCheck size={14} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Check-in estimado
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>
                {hotel.checkIn || "A partir de 15:00"}
              </p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(188,71,73,0.08)" }}>
              <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "var(--shu)" }}>
                <CalendarX size={14} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Check-out estimado
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>
                {hotel.checkOut || "Hasta 10:00 o 11:00"}
              </p>
            </div>
          </div>

          {/* Habitaciones y servicios */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 14 }}>
            {hotel.rooms && (
              <div className="flex gap-2">
                <BedDouble size={15} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
                <Field label="Alojamiento & Estilo">{hotel.rooms}</Field>
              </div>
            )}
            {hotel.onsen && (
              <div className="flex gap-2">
                <span style={{ fontSize: 15, lineHeight: 1, marginTop: 2, opacity: hotel.onsen.has ? 1 : 0.45 }}>♨️</span>
                <Field label="Onsen / Baño tradicional">
                  {hotel.onsen.has ? hotel.onsen.hours : "Baño privado en habitación"}
                </Field>
              </div>
            )}
            {hotel.address && (
              <div className="flex gap-2" style={{ gridColumn: "1 / -1" }}>
                <MapPin size={15} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
                <Field label="Ubicación">{hotel.address}</Field>
              </div>
            )}
          </div>

          {hotel.note && (
            <div className="rounded-xl p-3.5" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)" }}>
              <p className="text-xs leading-relaxed m-0 text-neutral-800">
                💡 <strong className="text-neutral-900">Consejo logístico:</strong> {hotel.note}
              </p>
            </div>
          )}

          {/* Precio estimado */}
          {hotel.total && (
            <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--line)" }}>
              <span className="text-xs text-neutral-500 font-medium">Presupuesto orientativo:</span>
              <span className="font-display text-base font-bold text-emerald-700">
                {hotel.total}
              </span>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function HotelsPage() {
  const { stays } = useContent();
  const t = useT();

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto space-y-6">
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          Alojamiento de la Ruta
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
          Bases y Hoteles Recomendados
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Las 7 bases estratégicas de alojamiento para las 13 etapas de la ruta por Japón: zonas óptimas, tipología de estancia y logística de equipaje.
        </p>
      </div>

      {/* ── Guía de Tipos de Alojamiento en Japón ──────────────── */}
      <div className="rounded-2xl p-5 border space-y-3" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
        <h3 className="font-display text-base font-bold text-neutral-900 m-0 flex items-center gap-2">
          <Sparkles size={18} style={{ color: "var(--shu)" }} />
          Tipologías de Alojamiento en esta Ruta
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <p className="font-bold text-xs text-neutral-800 m-0 mb-1">🏢 Business Hotel</p>
            <p className="text-xs text-neutral-600 m-0 leading-relaxed">
              Modernos y ultra limpios en Tokio, Osaka y Sapporo (Dormy Inn, Candeo). Habitaciones compactas con onsen panorámico.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <p className="font-bold text-xs text-neutral-800 m-0 mb-1">⛩️ Ryokan con Onsen</p>
            <p className="text-xs text-neutral-600 m-0 leading-relaxed">
              Posada tradicional en Miyajima con tatami, puertas shoji, futón en el suelo y exquisita cena kaiseki de temporada.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <p className="font-bold text-xs text-neutral-800 m-0 mb-1">🗻 Refugio Yamagoya</p>
            <p className="text-xs text-neutral-600 m-0 leading-relaxed">
              En alta montaña en el Monte Fuji a más de 3.000m: literas de madera con mantas térmicas y cena caliente de curry japonés.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <p className="font-bold text-xs text-neutral-800 m-0 mb-1">🌴 Eco-Lodge / Resort</p>
            <p className="text-xs text-neutral-600 m-0 leading-relaxed">
              En Okinawa e Iriomote integrados en la naturaleza subtropical, junto a playas de aguas turquesa o selva virgen.
            </p>
          </div>
        </div>
      </div>

      {/* ── Lista de Bases de Alojamiento ─────────────────────── */}
      <div className="space-y-4">
        {stays.map((stay, i) => (
          <HotelCard 
            key={stay.id} 
            stay={stay} 
            index={i} 
            anchorId={slug("hotel", stay.id)} 
            defaultExpanded={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
