import { useState } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { getTripStatus } from "../utils/date";
import DayCard from "../components/DayCard";
import { Info, Compass, Sparkles } from "lucide-react";

export default function Home({ onGoToDay }) {
  const { tripMeta, days, blocks } = useContent();
  const t = useT();
  const status = getTripStatus();
  const [selectedStageNum, setSelectedStageNum] = useState(1);

  const blockMap = Object.fromEntries((blocks || []).map((b) => [b.id, b]));
  const currentDay = days.find((d) => d.num === selectedStageNum) || days[0];

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-5">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{tripMeta.subtitle}</p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
          {status.phase === "planning" ? "Explorador de Etapas" : t("nav.hoy")}
        </h1>
      </div>

      {status.phase === "planning" && (
        <>
          <div
            className="rounded-2xl p-4 mb-5 flex gap-3 items-start"
            style={{ background: "rgba(29,53,87,0.06)", border: "1px solid rgba(29,53,87,0.15)" }}
          >
            <Compass size={20} style={{ color: "var(--indigo)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)", margin: "0 0 4px" }}>
                Planificación del Viaje · Previsualización de Etapa
              </p>
              <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>
                Selecciona cualquiera de las <strong>13 etapas de la ruta</strong> para explorar el itinerario detallado, horarios recomendados, avisos clave y contexto cultural de cada jornada.
              </p>
            </div>
          </div>

          {/* Stage pills selector */}
          <div className="mb-6 overflow-x-auto pb-2 flex gap-2 no-scrollbar">
            {days.map((stage) => {
              const isSelected = stage.num === selectedStageNum;
              const blockColor = blockMap[stage.block]?.color || "#bc4749";

              return (
                <button
                  key={stage.num}
                  onClick={() => setSelectedStageNum(stage.num)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
                  style={{
                    background: isSelected ? blockColor : "var(--paper-raised)",
                    color: isSelected ? "#ffffff" : "var(--ink)",
                    border: `1px solid ${isSelected ? blockColor : "var(--line)"}`,
                    boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                  }}
                >
                  <span>Etapa {stage.num}</span>
                  <span className="opacity-80 font-normal">({stage.cities.split("→")[0].split("(")[0].trim()})</span>
                </button>
              );
            })}
          </div>

          {currentDay && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow" style={{ color: "var(--ink-soft)", margin: 0 }}>
                  Detalle de la Etapa {currentDay.num} de 13
                </p>
                {onGoToDay && (
                  <button
                    type="button"
                    onClick={() => onGoToDay(currentDay.num)}
                    className="text-xs font-semibold"
                    style={{ color: "var(--shu)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    Ver en Itinerario ↗
                  </button>
                )}
              </div>
              <DayCard day={currentDay} defaultOpenHistory={true} />
            </div>
          )}
        </>
      )}

      {status.phase === "before" && (
        <>
          <div
            className="rounded-2xl p-4 mb-5 flex gap-3 items-start"
            style={{ background: "rgba(29,53,87,0.08)", border: "1px solid rgba(29,53,87,0.18)" }}
          >
            <Info size={18} style={{ color: "var(--indigo)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)", margin: "0 0 4px" }}>
                {t("today.previewTitle")}
              </p>
              <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }} dangerouslySetInnerHTML={{ __html: t("today.previewDesc") }} />
            </div>
          </div>

          {days[0] && (
            <div>
              <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
                {t("today.exampleDay1")}
              </p>
              <DayCard day={days[0]} defaultOpenHistory={false} />
            </div>
          )}
        </>
      )}

      {status.phase === "during" && status.dayNum && (
        <div>
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
            {t("today.todayDay")} {status.dayNum}
          </p>
          <DayCard day={days.find((d) => d.num === status.dayNum) || days[0]} defaultOpenHistory={false} />
        </div>
      )}

      {status.phase === "after" && (
        <div style={{
          background: "linear-gradient(135deg, var(--indigo) 0%, rgba(29,53,87,0.85) 100%)",
          borderRadius: 16, padding: 32, textAlign: "center", color: "white",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 8 }}>{t("today.endThanks")}</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
            {t("today.endMessage")}
          </p>
        </div>
      )}
    </div>
  );
}

