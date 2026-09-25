import { useLang } from "../i18n/LanguageContext";
import { pendingDays } from "../data/pendingDays";
import FutureTripsMap from "../components/FutureTripsMap";

export default function MapPage({ onGoToDay, initialDay }) {
  const { lang } = useLang();
  const days = pendingDays[lang] || pendingDays.es;

  const selectedDayItem = initialDay != null ? days.find((d) => d.num === initialDay) : null;
  const selectedId = selectedDayItem ? selectedDayItem.id : null;

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          {lang === "en" ? "Interactive Geography" : lang === "fr" ? "Géographie Interactive" : lang === "tl" ? "Interactive na Heograpiya" : "Geografía Interactiva"}
        </p>
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--indigo)", margin: 0 }}>
          {lang === "en" ? "Route Map across Japan" : lang === "fr" ? "Carte de la Route à Travers le Japon" : lang === "tl" ? "Mapa ng Ruta sa Buong Hapon" : "Mapa de la Ruta por Japón"}
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0" }}>
          {lang === "en"
            ? "Interactive map featuring all 13 stages, key waypoints, and the recommended travel route from Hokkaido to Okinawa."
            : lang === "fr"
            ? "Carte interactive avec les 13 étapes, les points d'intérêt et l'itinéraire recommandé d'Hokkaido à Okinawa."
            : lang === "tl"
            ? "Interactive na mapa na may 13 yugto, mga pangunahing lugar, at inirekumendang ruta mula Hokkaido hanggang Okinawa."
            : "Mapa interactivo con las 13 etapas, puntos clave y la ruta geográfica recomendada de norte a sur, desde Hokkaido hasta Okinawa."}
        </p>
      </div>

      <FutureTripsMap
        days={days}
        selectedId={selectedId}
        onGoToItinerary={(idOrNum) => {
          if (onGoToDay) {
            const num = typeof idOrNum === "number" ? idOrNum : days.find((d) => d.id === idOrNum)?.num;
            if (num != null) onGoToDay(num);
          }
        }}
        lang={lang}
      />
    </div>
  );
}
