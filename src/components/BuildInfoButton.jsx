import { useState, useRef } from "react";
import { X, Clock, RefreshCw } from "lucide-react";
import changelogRaw from "../../CHANGELOG_AUTO.md?raw";

const LONG_PRESS_MS = 700;

/**
 * Bandera de Japón centrada en la cabecera móvil.
 * - Toque rápido: recarga la web entera (equivale a "ir a inicio" +
 *   refrescar, ya que al recargar la app vuelve a su estado por
 *   defecto: itinerario, día de hoy).
 * - Pulsación mantenida (>500ms): muestra, con el fondo difuminado
 *   (igual que el buscador), una tarjeta con el registro completo de
 *   cambios subidos a main -- generado solo por la GitHub Action en
 *   cada push, sin importar el entorno usado para subirlo.
 */
export default function BuildInfoButton() {
  const [showInfo, setShowInfo] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pressTimer = useRef(null);
  const longPressFired = useRef(false);

  const buildDate = new Date(typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : Date.now());
  const formattedBuild = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).format(buildDate);

  // Extraer solo las líneas de viñeta ("- **...**") del changelog, más
  // recientes primero (el archivo las añade en orden cronológico).
  const changelogEntries = changelogRaw
    .split("\n")
    .filter((line) => line.trim().startsWith("- "))
    .reverse();

  const handleClick = (e) => {
    e.preventDefault();
    if (longPressFired.current) {
      longPressFired.current = false;
      return;
    }
    hardRefresh();
  };

  const startPress = () => {
    longPressFired.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      setShowInfo(true);
    }, LONG_PRESS_MS);
  };

  const endPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  };

  const cancelPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  };

  const hardRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      // 1. Desregistrar todos los Service Workers activos
      if ("serviceWorker" in navigator) {
        const registrations = await Promise.race([
          navigator.serviceWorker.getRegistrations(),
          new Promise((resolve) => setTimeout(() => resolve([]), 1200)),
        ]);
        await Promise.all(registrations.map((r) => r.unregister()));
      }
      // 2. Eliminar toda la caché de la Cache Storage API
      if ("caches" in window) {
        const keys = await Promise.race([
          caches.keys(),
          new Promise((resolve) => setTimeout(() => resolve([]), 1200)),
        ]);
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      // 3. Limpiar almacenamiento local y de sesión
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.warn("Storage clear error:", e);
      }
    } catch (err) {
      console.error("Error al limpiar caché:", err);
    } finally {
      // 4. Recargar limpiamente en la ruta actual con parámetro anti-caché
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("nocache", Date.now().toString());
      window.location.replace(currentUrl.toString());
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowInfo(true);
        }}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchCancel={cancelPress}
        disabled={refreshing}
        title="Clic: limpiar toda la caché y actualizar la web | Mantener pulsado: registro de cambios"
        aria-label="Limpiar caché y recargar web (clic) o ver cambios (mantener pulsado)"
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: 28, lineHeight: 1, padding: 6,
          flexShrink: 0,
          background: "transparent", border: "none",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {refreshing ? (
          <RefreshCw size={26} color="#fff" className="animate-spin" />
        ) : (
          "🇯🇵"
        )}
      </button>

      {refreshing && (
        <div
          className="fixed top-14 md:top-20 left-1/2 -translate-x-1/2 z-[999] px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #1d3557, #12213a)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <RefreshCw size={15} className="animate-spin text-amber-300" />
          <span>Borrando caché y actualizando...</span>
        </div>
      )}

      {showInfo && (
        <div
          className="fixed inset-0 z-[998] flex items-start justify-center px-3"
          style={{
            paddingTop: "calc(var(--mobile-topbar, 56px) + 10px)",
            backgroundColor: "rgba(20, 25, 35, 0.28)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation: "fadeIn 0.15s ease-out",
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="w-full rounded-2xl overflow-hidden shadow-xl flex flex-col"
            style={{
              background: "var(--paper-raised)", border: "1px solid var(--line)",
              maxWidth: 480, maxHeight: "78vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: "var(--shu-darker)" }}>
              <div className="flex items-center gap-2">
                <Clock size={16} color="#fff" />
                <p className="text-[13px] font-bold text-white m-0">Registro de cambios de la web</p>
              </div>
              <button onClick={() => setShowInfo(false)} style={{ color: "rgba(255,255,255,0.85)" }}>
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-3 shrink-0" style={{ borderBottom: "1px solid var(--line)" }}>
              <p className="text-[11px] m-0" style={{ color: "var(--ink-soft)" }}>Última versión desplegada:</p>
              <p className="font-display font-extrabold text-[18px] m-0" style={{ color: "var(--ink)" }}>
                {formattedBuild}
              </p>
            </div>

            <div className="overflow-y-auto px-4 py-3 min-h-0">
              {changelogEntries.length > 0 ? (
                <ul className="space-y-2.5 list-none m-0 p-0">
                  {(() => {
                    let prevDate = null;
                    const items = [];
                    changelogEntries.forEach((entry, i) => {
                      const clean = entry.replace(/^- /, "");
                      const match = clean.match(/^\*\*(.+?)\*\*(.*)$/);
                      const timestamp = match ? match[1] : null;
                      const rest = match ? match[2] : clean;
                      const dateOnly = timestamp ? timestamp.slice(0, 10) : null;
                      if (dateOnly && prevDate && dateOnly !== prevDate) {
                        items.push(
                          <li key={`div-${i}`} aria-hidden="true" className="list-none" style={{ borderTop: "1px solid var(--line)" }} />
                        );
                      }
                      if (dateOnly) prevDate = dateOnly;
                      items.push(
                        <li key={i} className="flex gap-2 text-[12.5px] leading-snug" style={{ color: "var(--ink)" }}>
                          <span style={{ color: "var(--ink-soft)", flexShrink: 0 }}>•</span>
                          <span>
                            {timestamp ? (
                              <>
                                <strong style={{ fontSize: 13.5, fontWeight: 800, color: "var(--ink)" }}>{timestamp}</strong>
                                {rest}
                              </>
                            ) : (
                              clean
                            )}
                          </span>
                        </li>
                      );
                    });
                    return items;
                  })()}
                </ul>
              ) : (
                <p className="text-[12.5px] m-0" style={{ color: "var(--ink-soft)" }}>
                  Todavía no hay entradas registradas -- se irán añadiendo solas en cada push a main.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
