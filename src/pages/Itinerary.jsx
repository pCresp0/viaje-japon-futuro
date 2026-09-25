import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Compass, MapPin, FileDown, Loader2, LayoutList, List } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { pendingDays, futureLocationCoords } from "../data/pendingDays";
import PlaceText from "../components/PlaceText";
import FutureTripsPrintView from "../components/FutureTripsPrintView";

export default function Itinerary({ openDay, setOpenDay, quickView, setQuickView, onGoToMapDay }) {
  const { lang } = useLang();
  const days = pendingDays[lang] || pendingDays.es;

  const [openId, setOpenId] = useState(() => {
    if (openDay != null) {
      const match = days.find((d) => d.num === openDay || d.id === openDay);
      return match ? match.id : null;
    }
    return null;
  });
  const [exporting, setExporting] = useState(false);
  const dayRefs = useRef({});

  // Sync external openDay changes (from search or other navigation)
  useEffect(() => {
    if (openDay != null) {
      const match = days.find((d) => d.num === openDay || d.id === openDay);
      if (match) {
        setOpenId(match.id);
        const t = window.setTimeout(() => {
          const el = dayRefs.current[match.id] || document.getElementById(`future-day-${match.id}`);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
        return () => window.clearTimeout(t);
      }
    }
  }, [openDay, days]);

  useEffect(() => {
    if (!openId) return;
    const t = window.setTimeout(() => {
      const el = dayRefs.current[openId] || document.getElementById(`future-day-${openId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [openId]);

  function handleExportPdf() {
    setExporting(true);
    window.setTimeout(() => {
      window.print();
      setExporting(false);
    }, 100);
  }

  const handleViewOnMap = (dayNumOrId) => {
    const num = typeof dayNumOrId === "number" ? dayNumOrId : days.find((d) => d.id === dayNumOrId)?.num;
    if (onGoToMapDay && num != null) {
      onGoToMapDay(num);
    }
  };

  const handleToggleDay = (id) => {
    const nextId = openId === id ? null : id;
    setOpenId(nextId);
    if (setOpenDay) {
      const match = days.find((d) => d.id === nextId);
      setOpenDay(match ? match.num : null);
    }
  };

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
            {lang === "en" ? "13-Stage Route" : lang === "fr" ? "Itinéraire en 13 Étapes" : lang === "tl" ? "13-Yugtong Ruta" : "Ruta de 13 Etapas"}
          </p>
          <div className="flex items-center gap-2">
            <Compass size={22} style={{ color: "var(--indigo)" }} />
            <h1 className="font-display text-2xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
              {lang === "en" ? "Complete Route Itinerary" : lang === "fr" ? "Itinéraire Complet de la Route" : lang === "tl" ? "Kumpletong Itinerary ng Ruta" : "Itinerario de la Ruta"}
            </h1>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0" }}>
            {lang === "en"
              ? "13 complete days with international flights and connections: Kanto, Mount Fuji, Kansai, Hiroshima & Miyajima, Ryukyu Islands (Okinawa & Iriomote) and Hokkaido."
              : lang === "fr"
              ? "13 jours complets avec liaisons et vols : Kanto, Mont Fuji, Kansai, Hiroshima & Miyajima, Îles Ryukyu (Okinawa & Iriomote) et Hokkaido."
              : lang === "tl"
              ? "13 kumpletong araw na may flights at connections: Kanto, Mount Fuji, Kansai, Hiroshima & Miyajima, Ryukyu Islands (Okinawa & Iriomote) at Hokkaido."
              : "13 días completos con vuelos internacionales y conexiones: Kanto, Monte Fuji, Kansai, Hiroshima y Miyajima, Islas Ryukyu (Okinawa e Iriomote) y Hokkaido."}
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          disabled={exporting}
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold cursor-pointer shadow-xs transition-opacity hover:opacity-90 active:scale-95"
          style={{ background: "var(--indigo)", color: "white", border: "none" }}
          title={lang === "en" ? "Export PDF Guide" : lang === "fr" ? "Exporter le guide PDF" : lang === "tl" ? "I-export ang PDF Guide" : "Exportar guía PDF"}
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          <span>{lang === "en" ? "Export PDF" : lang === "fr" ? "Exporter PDF" : lang === "tl" ? "Export PDF" : "Exportar PDF"}</span>
        </button>
      </div>

      {/* ── Toggle vista rápida / completa ────────────────────── */}
      <div
        className="flex items-center gap-1 rounded-full p-1 mb-4"
        style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", width: "fit-content" }}
      >
        <button
          onClick={() => setQuickView && setQuickView(false)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          style={{
            background: !quickView ? "var(--indigo)" : "transparent",
            color: !quickView ? "white" : "var(--ink-soft)",
            border: "none",
          }}
        >
          <LayoutList size={13} />
          {lang === "en" ? "Detailed View" : lang === "fr" ? "Vue Détaillée" : lang === "tl" ? "Detalyadong Tingin" : "Detalle completo"}
        </button>
        <button
          onClick={() => setQuickView && setQuickView(true)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          style={{
            background: quickView ? "var(--shu)" : "transparent",
            color: quickView ? "white" : "var(--ink-soft)",
            border: "none",
          }}
        >
          <List size={13} />
          {lang === "en" ? "Quick Timeline" : lang === "fr" ? "Vue Rapide" : lang === "tl" ? "Mabilisang Timeline" : "Línea de etapas"}
        </button>
      </div>

      <FutureTripsPrintView days={days} lang={lang} />

      {/* ── Vista Rápida (Timeline de Etapas) ──────────────────── */}
      {quickView ? (
        <div className="space-y-3">
          {days.map((d, index) => {
            const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#e63946" };
            return (
              <div
                key={d.id}
                id={`quick-day-${d.num || index + 1}`}
                className="rounded-2xl p-4 border transition-all"
                style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
              >
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold text-white shadow-xs shrink-0"
                      style={{ background: meta.color }}
                    >
                      {d.num || index + 1}
                    </span>
                    <div>
                      <p className="font-display font-bold text-base m-0 leading-tight" style={{ color: "var(--ink)" }}>
                        {d.title}
                      </p>
                      <p className="text-xs m-0 mt-0.5" style={{ color: "var(--ink-soft)" }}>
                        {d.cities}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewOnMap(d.num || index + 1)}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      style={{ background: "rgba(29,53,87,0.08)", color: "var(--indigo)", border: "1px solid rgba(29,53,87,0.18)" }}
                    >
                      <MapPin size={12} />
                      <span>{lang === "en" ? "Map" : lang === "fr" ? "Carte" : lang === "tl" ? "Mapa" : "Ver mapa"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setQuickView(false);
                        handleToggleDay(d.id);
                      }}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer text-white"
                      style={{ background: "var(--shu)", border: "none" }}
                    >
                      <span>{lang === "en" ? "Open" : lang === "fr" ? "Ouvrir" : lang === "tl" ? "Buksan" : "Abrir"}</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-xs leading-relaxed m-0 text-neutral-600 line-clamp-2">
                  {d.summary}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Vista Detallada (Acordeón de Etapas) ─────────────── */
        <div className="space-y-3">
          {days.map((d, index) => {
            const isOpen = openId === d.id;
            const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#e63946" };

            return (
              <div
                key={d.id}
                id={`future-day-${d.id}`}
                ref={(el) => (dayRefs.current[d.id] = el)}
                className="itinerary-day-anchor"
              >
                {isOpen ? (
                  <article
                    className="rounded-2xl overflow-hidden border shadow-sm transition-all"
                    style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
                  >
                    {/* Header con el color de la etapa */}
                    <header
                      className="px-5 pt-5 pb-4 flex items-start justify-between gap-3 text-white"
                      style={{ background: meta.color }}
                    >
                      <div>
                        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.92)" }}>
                          {meta.emoji} {lang === "en" ? `Day ${d.num || index + 1}` : lang === "fr" ? `Jour ${d.num || index + 1}` : lang === "tl" ? `Araw ${d.num || index + 1}` : `Día ${d.num || index + 1}`} · {d.cities}
                        </p>
                        <PlaceText
                          as="h2"
                          text={d.title}
                          className="font-display text-2xl text-white mt-1 leading-tight font-bold m-0"
                          linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
                        />
                        <PlaceText
                          as="p"
                          text={d.cities}
                          className="text-white/85 text-sm mt-1 m-0"
                          linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
                        />
                      </div>

                      <div className="shrink-0 mt-0.5 flex items-center gap-1.5 sm:gap-2">
                        {/* Botón Ver mapa */}
                        <button
                          type="button"
                          onClick={() => handleViewOnMap(d.num || index + 1)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(4px)",
                          }}
                          title={lang === "en" ? "View on map" : lang === "fr" ? "Voir sur la carte" : lang === "tl" ? "Tingnan sa mapa" : "Ver en mapa"}
                        >
                          <MapPin size={13} />
                          <span className="hidden sm:inline">
                            {lang === "en" ? "Map" : lang === "fr" ? "Carte" : lang === "tl" ? "Mapa" : "Ver mapa"}
                          </span>
                        </button>

                        {/* Botón Cerrar (colapsar) */}
                        <button
                          type="button"
                          onClick={() => handleToggleDay(d.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                          }}
                          title={lang === "en" ? "Close" : lang === "fr" ? "Fermer" : lang === "tl" ? "Isara" : "Cerrar día"}
                          aria-label="Cerrar día"
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>
                    </header>

                    {/* Cuerpo de la ficha de día */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Contexto del viaje */}
                      <div
                        className="text-xs p-3 rounded-xl border flex items-start gap-2.5"
                        style={{
                          background: "var(--paper)",
                          borderColor: "var(--line)",
                          color: "var(--ink-soft)",
                        }}
                      >
                        <span className="text-base shrink-0 leading-none">💡</span>
                        <span className="leading-relaxed">
                          <strong style={{ color: "var(--ink)" }}>
                            {lang === "en" ? "Context:" : lang === "fr" ? "Contexte :" : lang === "tl" ? "Konteksto:" : "Contexto:"}
                          </strong>{" "}
                          {d.reason}
                        </span>
                      </div>

                      {/* Resumen */}
                      <PlaceText
                        as="p"
                        text={d.summary}
                        className="text-sm leading-relaxed m-0"
                        style={{ color: "var(--ink)" }}
                        linkStyle={{ color: "var(--shu)" }}
                      />

                      {/* Historia y contexto */}
                      {d.history && (
                        <div
                          className="p-3.5 rounded-xl border"
                          style={{
                            background: "var(--paper)",
                            borderColor: "var(--line)",
                          }}
                        >
                          <p
                            className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                            style={{ color: "var(--shu)", letterSpacing: "0.01em" }}
                          >
                            📜 {lang === "en" ? "History & Context" : lang === "fr" ? "Histoire & Contexte" : lang === "tl" ? "Kasaysayan at Konteksto" : "Historia y contexto"}
                          </p>
                          <PlaceText
                            as="p"
                            text={d.history}
                            className="text-[13.5px] leading-[1.65] m-0"
                            style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                            linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                          />
                        </div>
                      )}

                      {/* Secciones del día / Itinerario paso a paso */}
                      <div className="pt-2 space-y-4">
                        {d.schedule.map((item, i) => (
                          <div key={i}>
                            <p
                              className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                              style={{
                                color: "var(--shu)",
                                letterSpacing: "0.01em",
                              }}
                            >
                              {item.time}
                            </p>
                            <PlaceText
                              as="p"
                              text={item.text}
                              className="text-[13.5px] leading-[1.65] m-0"
                              style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                              linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Presupuesto y logística */}
                      {d.money && (
                        <div className="pt-3.5 mt-2 border-t" style={{ borderColor: "var(--line)" }}>
                          <p className="text-xs sm:text-[13px] leading-relaxed m-0" style={{ color: "var(--ink-soft)" }}>
                            💰 <strong style={{ color: "var(--ink)" }}>{lang === "en" ? "Estimated budget:" : lang === "fr" ? "Budget estimé :" : lang === "tl" ? "Tinatayang badyet:" : "Presupuesto estimado:"}</strong> {d.money}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                ) : (
                  <button
                    onClick={() => handleToggleDay(d.id)}
                    className="w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all hover:border-[var(--shu)]"
                    style={{
                      background: "var(--paper-raised)",
                      border: "1px solid var(--line)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-bold text-white shadow-xs"
                      style={{ background: meta.color }}
                    >
                      {d.num || index + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[15px] font-medium truncate" style={{ color: "var(--ink)" }}>
                        <span style={{ color: meta.color, fontWeight: 700, marginRight: 6 }}>
                          {lang === "en" ? `Day ${d.num || index + 1}:` : lang === "fr" ? `Jour ${d.num || index + 1} :` : lang === "tl" ? `Araw ${d.num || index + 1}:` : `Día ${d.num || index + 1}:`}
                        </span>
                        <PlaceText
                          as="span"
                          text={d.title}
                          linkStyle={{ color: "var(--shu)" }}
                        />
                      </span>
                      <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                        {d.cities}
                      </span>
                    </span>
                    <ChevronRight size={18} style={{ color: "var(--ink-soft)" }} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
