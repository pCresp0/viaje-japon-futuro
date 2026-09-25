import { useContent, useT } from "../i18n/LanguageContext";
import { useState } from "react";
import { ChevronDown, Wallet, Calculator, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import JrPassAnalysis from "../components/JrPassAnalysis";

export default function BudgetPage() {
  const { budget } = useContent();
  const t = useT();
  const [openCategory, setOpenCategory] = useState(0);

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto space-y-6">
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          Planificación Financiera
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
          Presupuesto Estimado del Viaje
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-neutral-500 leading-relaxed">
          {budget.note}
        </p>
      </div>

      {/* ── Banner de Total por Persona ───────────────────────── */}
      <div
        className="rounded-2xl p-6 sm:p-7 text-center shadow-md relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)", color: "white" }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-3 border border-white/20">
          <Wallet size={13} style={{ color: "#fef08a" }} /> Estimación Total Completa
        </div>
        <p className="font-display text-4xl sm:text-5xl font-bold my-1 text-yellow-300">
          {budget.totalPerPerson}
        </p>
        <p className="text-xs sm:text-sm text-white/75 mt-2 m-0 max-w-lg mx-auto">
          Incluye vuelos internacionales, 4 vuelos domésticos (Okinawa y Hokkaido), 12 noches de alojamiento, trenes Shinkansen, ferris, comidas y actividades.
        </p>
      </div>

      {/* ── Desglose por Categorías ───────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900 m-0 flex items-center gap-2">
          <Calculator size={18} style={{ color: "var(--shu)" }} />
          Desglose por Partidas
        </h2>

        <div className="space-y-3">
          {budget.categories.map((c, index) => {
            const isOpen = openCategory === index;
            return (
              <Highlightable key={c.title} id={slug("budget", index)}>
                <div
                  className="rounded-2xl overflow-hidden border shadow-xs transition-all"
                  style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenCategory(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 border-none cursor-pointer bg-transparent flex items-center justify-between gap-3 hover:bg-neutral-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-bold text-base m-0 text-neutral-900">
                        {c.title}
                      </p>
                      <p className="text-xs text-neutral-500 m-0 mt-0.5">
                        Estimación: <strong className="text-neutral-700">{c.perPerson}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-display font-bold text-base text-emerald-700">
                        {c.perPerson}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform text-neutral-400 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {isOpen && c.items && c.items.length > 0 && (
                    <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-neutral-150 space-y-2.5">
                      {c.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                          <div>
                            <p className="font-semibold text-xs sm:text-sm text-neutral-800 m-0">
                              {item.label}
                            </p>
                            {item.note && (
                              <p className="text-xs text-neutral-500 m-0 mt-0.5">
                                {item.note}
                              </p>
                            )}
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-neutral-900 shrink-0">
                            {item.cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Highlightable>
            );
          })}
        </div>
      </div>

      {/* ── Análisis del JR Pass ─────────────────────────────── */}
      <JrPassAnalysis />
    </div>
  );
}
