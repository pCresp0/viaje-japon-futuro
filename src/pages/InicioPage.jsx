import { useContent, useT } from "../i18n/LanguageContext";
import { Compass, Map, Plane, ArrowRight, Sparkles, ShieldCheck, Hammer, ListChecks } from "lucide-react";
import { tabs as navTabs } from "../components/Nav";

export default function InicioPage({ onNavigate }) {
  const { tripMeta, blocks } = useContent();
  const t = useT();

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      {/* ── Encabezado & Contexto de Proyecto ──────────────────── */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5" style={{ background: "rgba(188, 71, 73, 0.12)", color: "var(--shu)" }}>
            ⛩️ Futura Expedición a Japón
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5" style={{ background: "rgba(201, 162, 39, 0.16)", color: "#855808" }}>
            <Hammer size={12} /> Web en Desarrollo Activo
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold" style={{ color: "var(--indigo)", margin: 0, lineHeight: 1.2 }}>
          {tripMeta.title}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
          {tripMeta.subtitle}
        </p>
      </div>

      {/* ── Tarjeta Destacada: Proyecto en Desarrollo Activo ───────── */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl border transition-all" style={{
        background: "linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(255, 255, 255, 0.95) 100%)",
        borderColor: "rgba(232, 183, 74, 0.55)",
        boxShadow: "0 4px 18px rgba(188, 71, 73, 0.05)"
      }}>
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "linear-gradient(135deg, #e8b74a, #d49520)", color: "white" }}>
            <Hammer size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <h3 className="font-display text-base font-bold m-0" style={{ color: "var(--indigo)" }}>
                Planificador de Viaje Futuro · Web en Construcción
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: "rgba(201, 162, 39, 0.22)", color: "#855808" }}>
                Work in Progress
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-3">
              Esta web es el <strong>centro de operaciones y cuaderno de bitácora digital</strong> para un <strong>futuro viaje a Japón</strong>. El proyecto está actualmente en <strong>fase activa de planificación y desarrollo</strong>: estamos diseñando las 13 etapas, investigando conexiones de tren bala Shinkansen, vuelos internos y ferris, seleccionando alojamientos estratégicos y calculando presupuestos de referencia.
            </p>

            {/* Chips de estado del proyecto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2.5 border-t border-amber-200/70">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span><strong>13 Etapas:</strong> Trazado y ruta base definidos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span><strong>Logística:</strong> En investigación continua</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
                <span><strong>App PWA:</strong> 100% offline para el viaje</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Banner de Presentación & Métricas de la Ruta ─────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)",
          borderRadius: 20, padding: "26px 28px", color: "white",
          boxShadow: "0 6px 24px rgba(15, 31, 53, 0.28)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Badge decorativo */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5" style={{ background: "rgba(232,183,74,0.2)", color: "#fef08a", border: "1px solid rgba(232,183,74,0.35)" }}>
              <Sparkles size={13} /> Planificación Oficial · Futuro Viaje en Desarrollo
            </span>
            <span className="text-xs text-white/70 font-medium inline-flex items-center gap-1">
              <ShieldCheck size={14} style={{ color: "#7ae0ad" }} /> 100% Offline Ready
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-white leading-tight">
            13 Etapas de Norte a Sur por Japón
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed mb-6">
            Kanto (Tokio, Nikko, Kamakura) → Cumbre del Monte Fuji (3.776 m) → Kansai (Osaka) → Chugoku (Hiroshima y Miyajima) → Islas Ryukyu (Okinawa e Iriomote) → Hokkaido (Sapporo) → Tokio.
          </p>

          {/* Estadísticas de la ruta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
              <p className="font-display text-2xl font-bold text-yellow-300 m-0">13</p>
              <p className="text-[11px] text-white/75 font-semibold uppercase tracking-wider m-0 mt-0.5">Etapas</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
              <p className="font-display text-2xl font-bold text-emerald-300 m-0">6</p>
              <p className="text-[11px] text-white/75 font-semibold uppercase tracking-wider m-0 mt-0.5">Regiones</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
              <p className="font-display text-2xl font-bold text-sky-300 m-0">7</p>
              <p className="text-[11px] text-white/75 font-semibold uppercase tracking-wider m-0 mt-0.5">Bases</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
              <p className="font-display text-2xl font-bold text-rose-300 m-0">3.776m</p>
              <p className="text-[11px] text-white/75 font-semibold uppercase tracking-wider m-0 mt-0.5">Monte Fuji</p>
            </div>
          </div>

          {/* Botones de acción directa */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate?.("itinerario")}
              className="px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
              style={{ background: "var(--shu)", color: "white", border: "none" }}
            >
              <Compass size={17} />
              <span>Ver Itinerario Completo</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onNavigate?.("mapa")}
              className="px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <Map size={17} />
              <span>Mapa Interactivo</span>
            </button>
            <button
              onClick={() => onNavigate?.("pendientes")}
              className="px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95 text-white/90 hover:text-white"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <ListChecks size={16} />
              <span>Estado de Tareas</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Las 5 Grandes Regiones de la Ruta ─────────────────── */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Las 5 grandes regiones de la ruta</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(blocks || []).map((b) => (
            <div
              key={b.id}
              onClick={() => onNavigate?.("itinerario")}
              className="p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-sm hover:border-[var(--shu)]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl leading-none">{b.emoji}</span>
                <span className="font-display font-bold text-sm" style={{ color: b.color || "var(--indigo)" }}>
                  {b.title}
                </span>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed m-0 mb-2.5">
                {b.bestArea}
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 pt-2 border-t border-neutral-100">
                <span>{b.sleepSummary}</span>
                <span style={{ color: b.color || "var(--shu)" }}>Ver etapas →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Qué es esto / Guía para el viaje ──────────────────── */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Guía del viaje</p>
        <div className="rounded-2xl p-5 space-y-4 shadow-xs" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          {tripMeta.welcomeParagraphs?.map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.65, margin: 0 }} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </section>

      {/* ── Apartados principales ─────────────────────────────── */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.mainSections") || "Apartados de la guía"}</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}>
          {navTabs.filter(s => s.id !== "inicio").map((s) => {
            const Icon = s.icon;
            let iconColor = "var(--indigo)";
            if (["vuelos", "itinerario", "pendientes", "lugares"].includes(s.id)) iconColor = "#bc4749";
            if (["hoteles", "mapa", "preparativos"].includes(s.id)) iconColor = "#2e7d5b";
            if (["comidas", "presupuesto", "calendario"].includes(s.id)) iconColor = "#c9a227";

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate?.(s.id)}
                className="rounded-xl p-3.5 text-left flex gap-3 items-start transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "var(--paper-raised)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: `${iconColor}14`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: iconColor }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{t(s.labelKey)}</p>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4, margin: "3px 0 0" }}>{t(s.descKey)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Acceso Rápido a Vuelos & Llegada ──────────────────── */}
      <section>
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Vuelos & Llegada internacional</p>
        <div className="rounded-2xl p-5 shadow-xs" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2" style={{ color: "var(--shu)" }}>
              <Plane size={16} />
              <p className="eyebrow" style={{ margin: 0 }}>España ↔ Japón + Vuelos Domésticos</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(46,125,91,0.12)", color: "#2e7d5b" }}>
              ✓ En Planificación
            </span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
            Madrid / Barcelona ⇄ Tokio Narita (NRT) / Haneda (HND)
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
            Guía de aerolíneas recomendadas, aduanas con el código QR oficial de Visit Japan Web y enlaces aéreos domésticos a Okinawa y Hokkaido.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("vuelos")}
            className="mt-3 text-sm font-semibold inline-flex items-center gap-1 cursor-pointer"
            style={{ color: "var(--shu)", background: "none", border: "none", padding: 0 }}
          >
            Consultar guía de vuelos ↗
          </button>
        </div>
      </section>
    </div>
  );
}
