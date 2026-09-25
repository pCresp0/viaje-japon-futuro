import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useContent, useT } from "../i18n/LanguageContext";
import DayCard from "../components/DayCard";
import { X, CalendarPlus, Download, ExternalLink, MapPin } from "lucide-react";
import { downloadIcsCalendar } from "../utils/exportCalendar";
import { getTripStatus } from "../utils/date";
import { QuickDayCard } from "../components/ItineraryQuickView";

const blockEmoji = {
  kanto: "🗼",
  fuji: "🗻",
  kansai: "🏯",
  chugoku: "⛩️",
  okinawa: "🌺",
  hokkaido: "❄️",
};

const stageHighlights = {
  1: { highlight: "🛬 Llegada Narita & Shinjuku", stay: "🏨 Base Tokio" },
  2: { highlight: "⛩️ Senso-ji & Shibuya Sky", stay: "🏨 Base Tokio" },
  3: { highlight: "🌲 Nikko Toshogu & Kegon", stay: "🏨 Base Tokio" },
  4: { highlight: "🗿 Gran Buda de Kamakura", stay: "🏨 Base Tokio" },
  5: { highlight: "🗻 Ascenso Monte Fuji (3.776m)", stay: "🛖 Refugio Yamagoya" },
  6: { highlight: "🌅 Amanecer Fuji & Osaka", stay: "🏨 Base Osaka" },
  7: { highlight: "🏯 Castillo Osaka & Dotonbori", stay: "🏨 Base Osaka" },
  8: { highlight: "🕊️ Hiroshima & Ferry Miyajima", stay: "⛩️ Ryokan Miyajima" },
  9: { highlight: "⛰️ Monte Misen & Vuelo Sur", stay: "✈️ Naha (Okinawa)" },
  10: { highlight: "🌺 Naha, Shuri & Playas Ryukyu", stay: "🏨 Base Okinawa" },
  11: { highlight: "🌿 Manglares & Selva Iriomote", stay: "🏕️ Eco-lodge Iriomote" },
  12: { highlight: "❄️ Sapporo, Odori & Susukino", stay: "🏨 Base Sapporo" },
  13: { highlight: "⚓ Canal Otaru & Vuelo Vuelta", stay: "✈️ Vuelo Retorno" },
};

export default function CalendarPage({ onGoToMapDay }) {
  const { days, blocks } = useContent();
  const t = useT();
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedDayNum, setSelectedDayNum] = useState(1);
  const [detailMode, setDetailMode] = useState(false);

  const tripStatus = getTripStatus();
  const todayDayNum = tripStatus.phase === "during" ? tripStatus.dayNum : null;

  const dayByNum = Object.fromEntries(days.map((d) => [d.num, d]));
  const blockMap = Object.fromEntries((blocks || []).map((b) => [b.id, b]));

  const selectedDay = selectedDayNum !== null ? dayByNum[selectedDayNum] : null;

  // Lock body scroll while the mobile modal is open
  useEffect(() => {
    if (selectedDay && window.innerWidth < 1024) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedDay]);

  return (
    <div style={{ display: "flex", height: "100%", gap: 16 }}>
      {/* Calendar grid — left side */}
      <div className="flex-1 px-4 pt-3 pb-12 overflow-y-auto" style={{ maxWidth: "none" }}>
        {/* title + export button */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
              {t("calendar.eyebrow") || "Cronograma de la Ruta"}
            </p>
            <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
              {t("calendar.title") || "Calendario de las 13 Etapas"}
            </h2>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.6 }}>
              Visualización cronológica de la expedición a través de Japón: 13 jornadas temáticas organizadas por regiones, de Tokio a Hokkaido pasando por Fuji, Kansai y Okinawa.
            </p>
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all hover:opacity-90 mt-1"
            style={{
              background: "var(--shu)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(188,71,73,0.3)",
            }}
          >
            <CalendarPlus size={15} />
            <span>Exportar .ICS</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {Array.isArray(blocks) &&
            blocks.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border"
                style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: b.color }} />
                <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>
                  {blockEmoji[b.id] || b.emoji} {b.title}
                </span>
              </div>
            ))}
        </div>

        {/* Expedition Stage Grid (2 weeks layout: Stage 1 to 13) */}
        <div
          className="rounded-2xl overflow-hidden border mb-8"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center justify-between"
            style={{ borderColor: "var(--line)", background: "var(--paper)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
              Esquema de las 13 Etapas del Viaje
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
              13 días · 6 regiones · 7 alojamientos
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: 1,
              background: "var(--line)",
            }}
          >
            {days.map((stage) => {
              const blockData = blockMap[stage.block];
              const color = blockData ? blockData.color : "#bc4749";
              const isSelected = stage.num === selectedDayNum;
              const isToday = stage.num === todayDayNum;
              const meta = stageHighlights[stage.num];

              return (
                <button
                  key={stage.num}
                  onClick={() => {
                    setSelectedDayNum(stage.num);
                    setDetailMode(false);
                  }}
                  className={`p-3 text-left transition-all ${isToday ? "today-pulse-ring" : ""}`}
                  style={{
                    background: isSelected ? `${color}25` : "var(--paper-raised)",
                    borderTop: `3px solid ${color}`,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: isSelected ? `inset 0 0 0 2px ${color}` : "none",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="inline-block px-1.5 py-0.5 rounded text-white"
                        style={{ fontSize: 9, fontWeight: 800, background: color, letterSpacing: "0.04em" }}
                      >
                        ETAPA {stage.num}
                      </span>
                      <span style={{ fontSize: 14 }}>{blockEmoji[stage.block] || blockData?.emoji}</span>
                    </div>

                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.25,
                        fontWeight: 700,
                        color: "var(--ink)",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {stage.title}
                    </p>
                  </div>

                  {meta && (
                    <div className="space-y-1 mt-2 pt-2 border-t" style={{ borderColor: "var(--line)" }}>
                      <div
                        className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded truncate"
                        style={{ background: "rgba(0,0,0,0.04)", color: "var(--ink)" }}
                      >
                        {meta.highlight}
                      </div>
                      <div className="text-[9px] font-medium opacity-85 truncate" style={{ color: "var(--ink-soft)" }}>
                        {meta.stay}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stages Timeline / List view */}
        <div className="space-y-3">
          <h3 className="font-display text-lg" style={{ color: "var(--indigo)" }}>
            Resumen de Etapas y Conexiones
          </h3>
          <div className="space-y-2.5">
            {days.map((stage) => {
              const blockData = blockMap[stage.block];
              const color = blockData ? blockData.color : "#bc4749";
              const isSelected = stage.num === selectedDayNum;
              const meta = stageHighlights[stage.num];

              return (
                <div
                  key={stage.num}
                  onClick={() => setSelectedDayNum(stage.num)}
                  className="p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-black/5"
                  style={{
                    background: isSelected ? `${color}10` : "var(--paper-raised)",
                    borderColor: isSelected ? color : "var(--line)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                      style={{ background: color }}
                    >
                      {stage.num}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate" style={{ color: "var(--ink)", margin: 0 }}>
                        {stage.title}
                      </p>
                      <p className="text-xs text-soft truncate" style={{ margin: 0 }}>
                        {stage.cities}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 shrink-0 text-right">
                    {meta && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/5" style={{ color: "var(--ink)" }}>
                        {meta.stay}
                      </span>
                    )}
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${color}20`, color }}>
                      {blockData?.title?.split(":")[0] || stage.block}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Day detail panel — right side (desktop only, fixed width) */}
      {selectedDay && (
        <div
          data-detail-panel
          style={{
            display: "flex",
            width: 380,
            flexDirection: "column",
            background: "var(--paper-raised)",
            overflowY: "auto",
            height: "fit-content",
            maxHeight: "calc(100% - 32px)",
            margin: "16px 16px 16px 0",
            borderRadius: 24,
            border: "1px solid var(--line)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {!detailMode ? (
            <QuickDayCard
              day={selectedDay}
              blockColor={blockMap[selectedDay.block]?.color || "#1d3557"}
              onShowFullDay={() => setDetailMode(true)}
              onClose={() => setSelectedDayNum(null)}
              onViewMap={onGoToMapDay}
              standalone={true}
            />
          ) : (
            <div style={{ padding: 20 }}>
              <DayCard
                day={selectedDay}
                defaultOpenHistory={true}
                onClose={() => setSelectedDayNum(null)}
                onShowQuickView={() => setDetailMode(false)}
                onViewMap={() => onGoToMapDay?.(selectedDay.num)}
              />
            </div>
          )}
        </div>
      )}

      {/* Mobile modal overlay for day detail */}
      {selectedDay &&
        createPortal(
          <div data-mobile-modal className="modal-overlay" onClick={() => setSelectedDayNum(null)}>
            <div
              className="modal-sheet"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                maxHeight: "85vh",
              }}
            >
              {!detailMode ? (
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <QuickDayCard
                    day={selectedDay}
                    blockColor={blockMap[selectedDay.block]?.color || "#1d3557"}
                    onShowFullDay={() => setDetailMode(true)}
                    onClose={() => setSelectedDayNum(null)}
                    onViewMap={onGoToMapDay}
                    standalone={true}
                  />
                </div>
              ) : (
                <div style={{ padding: "16px 16px 24px", overflowY: "auto", flex: 1 }}>
                  <DayCard
                    day={selectedDay}
                    defaultOpenHistory={true}
                    onClose={() => setSelectedDayNum(null)}
                    onShowQuickView={() => setDetailMode(false)}
                    onViewMap={() => onGoToMapDay?.(selectedDay.num)}
                  />
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Export Calendar Modal */}
      {showExportModal &&
        createPortal(
          <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
            <div
              className="modal-sheet p-6"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 440, borderRadius: 24, background: "var(--paper-raised)" }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <CalendarPlus size={22} style={{ color: "var(--shu)" }} />
                  <h3 className="font-bold text-lg" style={{ color: "var(--ink)", margin: 0 }}>
                    Exportar calendario del viaje
                  </h3>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border"
                  style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink-soft)" }}
                >
                  <X size={16} />
                </button>
              </div>

              <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 18, lineHeight: 1.5 }}>
                Añade automáticamente las 13 etapas del viaje con sus descripciones, ciudades y planes a tu aplicación de calendario favorita.
              </p>

              <div className="space-y-3 mb-4">
                {/* Apple Calendar / iCal */}
                <button
                  onClick={() => {
                    downloadIcsCalendar(days);
                    setShowExportModal(false);
                  }}
                  className="w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all hover:bg-black/5"
                  style={{ background: "var(--paper)", borderColor: "var(--line)" }}
                >
                  <span className="text-2xl shrink-0">🍏</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                      Apple Calendar (iPhone / Mac)
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)", margin: 0 }}>
                      Descarga el archivo .ics y lo abre directamente en iCal.
                    </p>
                  </div>
                  <Download size={18} style={{ color: "var(--indigo)" }} />
                </button>

                {/* Google Calendar */}
                <button
                  onClick={() => {
                    downloadIcsCalendar(days);
                    window.open("https://calendar.google.com/calendar/u/0/r/settings/export", "_blank");
                    setShowExportModal(false);
                  }}
                  className="w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all hover:bg-black/5"
                  style={{ background: "var(--paper)", borderColor: "var(--line)" }}
                >
                  <span className="text-2xl shrink-0">🌐</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                      Google Calendar
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)", margin: 0 }}>
                      Descarga el archivo .ics para importarlo en Google Calendar.
                    </p>
                  </div>
                  <ExternalLink size={18} style={{ color: "var(--forest)" }} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

