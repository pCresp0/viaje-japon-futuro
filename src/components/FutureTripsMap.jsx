import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Compass, Calendar, ExternalLink, MapPin } from "lucide-react";
import { futureLocationCoords } from "../data/pendingDays";
import PlaceText from "./PlaceText";

function createIcon(emoji, color, order, isFocus = false, isNeighbor = false, isDimmed = false) {
  const size = isFocus ? 44 : isNeighbor ? 38 : isDimmed ? 26 : 40;
  const pinHeight = size + 6;
  const badgeSize = isFocus ? 22 : isNeighbor ? 19 : 18;
  const opacity = isDimmed ? 0.35 : 1;

  return L.divIcon({
    html: `
      <div style="position: relative; width: ${size}px; height: ${pinHeight}px; opacity: ${opacity}; transition: all 0.25s ease;">
        <div style="
          width: ${size}px; height: ${size}px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: ${isFocus ? "3.5px solid #ffffff" : "2.5px solid #ffffff"};
          box-shadow: ${isFocus ? "0 4px 18px rgba(0,0,0,0.5), 0 0 0 3px rgba(188,71,73,0.4)" : "0 2px 8px rgba(0,0,0,0.3)"};
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="transform: rotate(45deg); font-size: ${isFocus ? 18 : isDimmed ? 12 : 16}px; line-height: 1;">${emoji}</span>
        </div>
        ${order ? `
        <div style="
          position: absolute; top: -6px; right: -6px;
          width: ${badgeSize}px; height: ${badgeSize}px;
          background: ${isFocus ? "#bc4749" : "#1d3557"};
          color: white;
          border: 2px solid white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: ${isFocus ? 11 : 9.5}px; font-weight: 800;
          font-family: -apple-system, sans-serif;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
        ">${order}</div>
        ` : ''}
      </div>
    `,
    className: "",
    iconSize: [size, pinHeight],
    iconAnchor: [size / 2, pinHeight - 2],
    popupAnchor: [0, -pinHeight + 2],
  });
}

function MapController({ targetMarker, allMarkers, isSingleDay, activeMovementPoints }) {
  const map = useMap();

  // Force Leaflet to compute the correct pixel geometry on mount & tab activation
  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 80);
    const t2 = setTimeout(() => map.invalidateSize(), 300);
    const t3 = setTimeout(() => map.invalidateSize(), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [map]);

  useEffect(() => {
    map.invalidateSize();
    if (isSingleDay && activeMovementPoints && activeMovementPoints.length > 1) {
      // Ajustar encuadre abarcando el corredor de movimiento (de dónde vienes, dónde estás y a dónde vas)
      const bounds = L.latLngBounds(activeMovementPoints.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [55, 55], maxZoom: 10 });
    } else if (isSingleDay && targetMarker) {
      map.flyTo([targetMarker.lat, targetMarker.lng], 9.5, {
        duration: 0.8,
      });
    } else if (allMarkers && allMarkers.length > 0) {
      const bounds = L.latLngBounds(allMarkers.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 11 });
    }
  }, [map, targetMarker, allMarkers, isSingleDay, activeMovementPoints]);

  return null;
}

const TILE_PROVIDERS = {
  osm: {
    id: "osm",
    label: "🗺️ OSM",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abc",
    maxZoom: 19,
  },
  topo: {
    id: "topo",
    label: "🏔️ Topo",
    name: "Esri Relieve",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Esri, USGS, METI',
    subdomains: "abc",
    maxZoom: 19,
  },
  sat: {
    id: "sat",
    label: "🛰️ Satélite",
    name: "Esri Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; USGS, AEX, GeoEye',
    subdomains: "abc",
    maxZoom: 18,
  },
};

export default function FutureTripsMap({ days, selectedId, onSelectDay, onGoToItinerary, lang }) {
  const [filter, setFilter] = useState("ruta"); // "ruta" | "dias"
  const [subDay, setSubDay] = useState(null); // null = todos, or number 1..15
  const [activeId, setActiveId] = useState(selectedId || null);
  const markerRefs = useRef({});

  // Default to Topo so terrain, relief and mountains are highlighted by default
  const [tileStyle, setTileStyle] = useState(() => {
    try {
      const saved = localStorage.getItem("japan_map_layer");
      if (saved && TILE_PROVIDERS[saved]) return saved;
    } catch {
      // ignore
    }
    return "topo";
  });

  const activeTile = TILE_PROVIDERS[tileStyle] || TILE_PROVIDERS.topo;

  const handleSwitchTile = (styleId) => {
    setTileStyle(styleId);
    try {
      localStorage.setItem("japan_map_layer", styleId);
    } catch {
      // ignore
    }
  };

  // Merge days with coordinates: exactly 1 point per future day
  const markers = useMemo(() => {
    return days.map((d, index) => {
      const coords = futureLocationCoords[d.id] || { lat: 35.6762, lng: 139.6503, emoji: "📍", color: "#e63946" };
      return {
        ...d,
        ...coords,
        order: index + 1,
      };
    });
  }, [days]);

  const selectedMarker = markers.find((m) => m.id === activeId);
  const selectedDayMarker = subDay != null ? markers.find((m) => m.order === subDay) : selectedMarker;

  useEffect(() => {
    if (selectedId) {
      const match = markers.find((m) => m.id === selectedId);
      if (match) {
        setFilter("dias");
        setSubDay(match.order);
        setActiveId(selectedId);
        setTimeout(() => {
          if (markerRefs.current[selectedId]) {
            markerRefs.current[selectedId].openPopup();
          }
        }, 150);
      }
    }
  }, [selectedId, markers]);

  const handleMarkerClick = (id) => {
    setActiveId(id);
    const match = markers.find((m) => m.id === id);
    if (match && filter === "dias") {
      setSubDay(match.order);
    }
    if (onSelectDay) onSelectDay(id);
  };

  const handleCardClick = (id) => {
    setActiveId(id);
    const match = markers.find((m) => m.id === id);
    if (match && filter === "dias") {
      setSubDay(match.order);
    }
    if (markerRefs.current[id]) {
      markerRefs.current[id].openPopup();
    }
  };

  const isDaysFilter = filter === "dias";
  const isRutaFilter = filter === "ruta";
  const isSingleDay = isDaysFilter && subDay != null;

  const prevDayMarker = isSingleDay && subDay > 1 ? markers.find((m) => m.order === subDay - 1) : null;
  const nextDayMarker = isSingleDay && subDay < markers.length ? markers.find((m) => m.order === subDay + 1) : null;

  const activeMovementPoints = useMemo(() => {
    if (!isSingleDay || !selectedDayMarker) return [];
    const pts = [];
    if (prevDayMarker) pts.push(prevDayMarker);
    pts.push(selectedDayMarker);
    if (nextDayMarker) pts.push(nextDayMarker);
    return pts;
  }, [isSingleDay, selectedDayMarker, prevDayMarker, nextDayMarker]);

  // Precalcular los tramos de desplazamiento entre días consecutivos con información de transporte
  const routeSegments = useMemo(() => {
    const list = [];
    for (let i = 0; i < markers.length - 1; i++) {
      const from = markers[i];
      const to = markers[i + 1];
      const fromOrder = from.order;
      const toOrder = to.order;

      const isFlight =
        (fromOrder === 11 && toOrder === 12) || // Miyajima -> Okinawa
        (fromOrder === 13 && toOrder === 14) || // Iriomote -> Hokkaido
        (fromOrder === 14 && toOrder === 15);   // Hokkaido -> Tokyo

      const isFerry = fromOrder === 12 && toOrder === 13; // Okinawa -> Iriomote

      let transportLabel = lang === "en" ? "JR Train / Subway / Shinkansen" : lang === "fr" ? "Train JR / Métro / Shinkansen" : lang === "tl" ? "JR Train / Subway" : "Tren JR / Metro / Shinkansen";
      let transportIcon = "🚆";

      if (isFlight) {
        transportLabel = lang === "en" ? "Domestic direct flight" : lang === "fr" ? "Vol direct intérieur" : lang === "tl" ? "Domestic flight" : "Vuelo doméstico directo";
        transportIcon = "✈️";
      } else if (isFerry) {
        transportLabel = lang === "en" ? "High-speed ferry / Island boat" : lang === "fr" ? "Ferry rapide / Bateau" : lang === "tl" ? "Speed ferry" : "Ferry de alta velocidad / Barco";
        transportIcon = "⛴️";
      } else if (fromOrder === 5 && toOrder === 6) {
        transportLabel = lang === "en" ? "Tokaido Shinkansen (Fuji ➔ Osaka)" : "Shinkansen Tokaido (Monte Fuji ➔ Osaka)";
        transportIcon = "🚄";
      } else if (fromOrder === 7 && toOrder === 8) {
        transportLabel = lang === "en" ? "Kuroshio Express + Local Bus (Osaka ➔ Kumano Kodo)" : "Tren Kuroshio + Bus local (Osaka ➔ Kumano Kodo)";
        transportIcon = "🚆";
      } else if (fromOrder === 8 && toOrder === 9) {
        transportLabel = lang === "en" ? "Nakahechi Trail / Kumano Kotsu Bus (Hongu ➔ Nachi)" : "Senda Nakahechi / Bus Kumano Kotsu (Hongu ➔ Nachi)";
        transportIcon = "🥾";
      } else if (fromOrder === 9 && toOrder === 10) {
        transportLabel = lang === "en" ? "Kuroshio Express + Sanyo Shinkansen (Kii-Katsuura ➔ Hiroshima)" : "Tren Kuroshio + Shinkansen Sanyo (Kii-Katsuura ➔ Hiroshima)";
        transportIcon = "🚄";
      } else if (fromOrder === 10 && toOrder === 11) {
        transportLabel = lang === "en" ? "JR Sanyo Line + JR Miyajima Ferry" : "Tren JR Sanyo + Ferry JR Miyajima";
        transportIcon = "⛴️";
      }

      list.push({
        id: `seg-${fromOrder}-${toOrder}`,
        from,
        to,
        fromOrder,
        toOrder,
        isFlight,
        isFerry,
        transportLabel,
        transportIcon,
        positions: [
          [from.lat, from.lng],
          [to.lat, to.lng],
        ],
      });
    }
    return list;
  }, [markers, lang]);

  return (
    <div className="space-y-3">
      {/* Selector de modo principal: Ruta completa vs Por días */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <button
          onClick={() => {
            setFilter("ruta");
            setSubDay(null);
          }}
          className="px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: isRutaFilter ? "var(--shu)" : "var(--paper-raised)",
            color: isRutaFilter ? "#fff" : "var(--ink)",
            border: isRutaFilter ? "1px solid var(--shu-deep)" : "1px solid var(--line)",
            boxShadow: isRutaFilter ? "0 2px 8px rgba(185, 28, 28, 0.25)" : "none",
          }}
        >
          <Compass size={15} />
          <span>{lang === "en" ? "Full route" : lang === "fr" ? "Itinéraire complet" : lang === "tl" ? "Buong Ruta" : "Ruta completa"}</span>
        </button>

        <button
          onClick={() => {
            setFilter("dias");
            if (subDay == null) setSubDay(1);
          }}
          className="px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: isDaysFilter ? "var(--shu)" : "var(--paper-raised)",
            color: isDaysFilter ? "#fff" : "var(--ink)",
            border: isDaysFilter ? "1px solid var(--shu-deep)" : "1px solid var(--line)",
            boxShadow: isDaysFilter ? "0 2px 8px rgba(185, 28, 28, 0.25)" : "none",
          }}
        >
          <Calendar size={15} />
          <span>{lang === "en" ? "By days" : lang === "fr" ? "Par jours" : lang === "tl" ? "Bawat Araw" : "Por días"}</span>
        </button>
      </div>

      {/* Sub-selector de días cuando está activo "Por días" */}
      {isDaysFilter && (
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          <button
            onClick={() => {
              setSubDay(null);
              setActiveId(null);
            }}
            className="px-3 py-1.5 rounded-full transition-all cursor-pointer font-semibold shadow-xs"
            style={{
              fontSize: 12.5,
              backgroundColor: subDay == null ? "var(--indigo)" : "var(--paper-raised)",
              color: subDay == null ? "#fff" : "var(--ink-soft)",
              border: subDay == null ? "1px solid var(--indigo)" : "1px solid var(--line)",
            }}
          >
            {lang === "en" ? "All days" : lang === "fr" ? "Tous les jours" : lang === "tl" ? "Lahat ng araw" : "Todos los días"}
          </button>
          {markers.map((m) => {
            const isSelected = subDay === m.order;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSubDay(m.order);
                  setActiveId(m.id);
                  setTimeout(() => {
                    if (markerRefs.current[m.id]) {
                      markerRefs.current[m.id].openPopup();
                    }
                  }, 120);
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs"
                style={{
                  fontSize: 12.5,
                  backgroundColor: isSelected ? "var(--indigo)" : "var(--paper-raised)",
                  color: isSelected ? "#fff" : "var(--ink-soft)",
                  border: isSelected ? "1px solid var(--indigo)" : "1px solid var(--line)",
                }}
              >
                <span>{m.emoji}</span>
                <span>{lang === "en" ? `Day ${m.order}` : lang === "fr" ? `Jour ${m.order}` : lang === "tl" ? `Araw ${m.order}` : `Día ${m.order}`}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Ficha destacada del día seleccionado en "Por días" */}
      {isSingleDay && selectedDayMarker && (
        <div className="rounded-2xl p-4 border shadow-xs transition-all" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="eyebrow m-0" style={{ color: "var(--shu)" }}>
              {selectedDayMarker.emoji} {lang === "en" ? `Day ${selectedDayMarker.order}` : lang === "fr" ? `Jour ${selectedDayMarker.order}` : lang === "tl" ? `Araw ${selectedDayMarker.order}` : `Día ${selectedDayMarker.order}`} · {selectedDayMarker.cities}
            </p>
            <button
              onClick={() => onGoToItinerary(selectedDayMarker.id)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              style={{ background: "var(--shu)", color: "#fff", border: "none" }}
            >
              <span>{lang === "en" ? "View in itinerary" : lang === "fr" ? "Voir dans l'itinéraire" : lang === "tl" ? "Tingnan sa itinerary" : "Ver en el itinerario"}</span>
              <ExternalLink size={12} />
            </button>
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--indigo)", fontFamily: "var(--font-display)", margin: "0 0 6px 0" }}>
            {selectedDayMarker.title}
          </p>
          <PlaceText
            as="p"
            text={selectedDayMarker.summary}
            className="text-sm leading-relaxed m-0"
            style={{ color: "var(--ink)" }}
            linkStyle={{ color: "var(--shu)" }}
          />

          {/* Barra de desplazamiento: De dónde vienes y hacia dónde te mueves */}
          <div className="mt-3.5 p-3 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs" style={{ background: "rgba(29, 53, 87, 0.03)", borderColor: "var(--line)" }}>
            {/* Origen previo */}
            {prevDayMarker ? (
              <button
                type="button"
                onClick={() => {
                  setSubDay(prevDayMarker.order);
                  setActiveId(prevDayMarker.id);
                }}
                className="flex items-center gap-2.5 text-left p-2 rounded-lg transition-all hover:bg-black/5 cursor-pointer flex-1"
                style={{ border: "1px solid var(--line)", background: "var(--paper-raised)" }}
              >
                <span className="text-xl">⬅️</span>
                <div className="min-w-0">
                  <p className="eyebrow m-0 text-[10px]" style={{ color: "#2e7d5b" }}>
                    {lang === "en" ? `Coming from (Day ${prevDayMarker.order})` : lang === "fr" ? `Arrivée depuis (Jour ${prevDayMarker.order})` : lang === "tl" ? `Galing sa (Araw ${prevDayMarker.order})` : `Vienes de (Día ${prevDayMarker.order})`}
                  </p>
                  <p className="text-xs font-bold truncate m-0" style={{ color: "var(--indigo)" }}>
                    {prevDayMarker.cities.split("→")[0].trim() || prevDayMarker.title}
                  </p>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2.5 p-2 rounded-lg flex-1 opacity-70" style={{ border: "1px dashed var(--line)", background: "var(--paper-raised)" }}>
                <span className="text-xl">🛬</span>
                <div>
                  <p className="eyebrow m-0 text-[10px]" style={{ color: "var(--ink-soft)" }}>
                    {lang === "en" ? "First Stage" : lang === "fr" ? "Première étape" : lang === "tl" ? "Unang Yugto" : "Primera etapa"}
                  </p>
                  <p className="text-xs font-bold m-0" style={{ color: "var(--ink)" }}>
                    {lang === "en" ? "International Arrival" : lang === "fr" ? "Arrivée internationale" : lang === "tl" ? "Pagdating sa Japan" : "Aterrizaje en Japón (Narita)"}
                  </p>
                </div>
              </div>
            )}

            {/* Trayecto / Transporte central */}
            <div className="flex flex-col items-center justify-center px-2 py-1 text-center shrink-0">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: "rgba(188,71,73,0.12)", color: "var(--shu)" }}>
                {lang === "en" ? `Day ${selectedDayMarker.order}` : lang === "fr" ? `Jour ${selectedDayMarker.order}` : lang === "tl" ? `Araw ${selectedDayMarker.order}` : `Día ${selectedDayMarker.order}`}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium mt-0.5">
                {selectedDayMarker.cities}
              </span>
            </div>

            {/* Siguiente destino */}
            {nextDayMarker ? (
              <button
                type="button"
                onClick={() => {
                  setSubDay(nextDayMarker.order);
                  setActiveId(nextDayMarker.id);
                }}
                className="flex items-center justify-end gap-2.5 text-right p-2 rounded-lg transition-all hover:bg-black/5 cursor-pointer flex-1"
                style={{ border: "1px solid var(--line)", background: "var(--paper-raised)" }}
              >
                <div className="min-w-0">
                  <p className="eyebrow m-0 text-[10px]" style={{ color: "var(--shu)" }}>
                    {lang === "en" ? `Next stage (Day ${nextDayMarker.order})` : lang === "fr" ? `Étape suivante (Jour ${nextDayMarker.order})` : lang === "tl" ? `Susunod (Araw ${nextDayMarker.order})` : `Siguiente etapa (Día ${nextDayMarker.order})`}
                  </p>
                  <p className="text-xs font-bold truncate m-0" style={{ color: "var(--indigo)" }}>
                    {nextDayMarker.cities.split("→")[0].trim() || nextDayMarker.title}
                  </p>
                </div>
                <span className="text-xl">➡️</span>
              </button>
            ) : (
              <div className="flex items-center justify-end gap-2.5 p-2 rounded-lg flex-1 opacity-70" style={{ border: "1px dashed var(--line)", background: "var(--paper-raised)" }}>
                <div className="text-right">
                  <p className="eyebrow m-0 text-[10px]" style={{ color: "var(--ink-soft)" }}>
                    {lang === "en" ? "Final Stage" : lang === "fr" ? "Dernière étape" : lang === "tl" ? "Huling Yugto" : "Etapa final"}
                  </p>
                  <p className="text-xs font-bold m-0" style={{ color: "var(--ink)" }}>
                    {lang === "en" ? "Return Flight" : lang === "fr" ? "Vol de retour" : lang === "tl" ? "Flight pauwi" : "Vuelo de regreso"}
                  </p>
                </div>
                <span className="text-xl">🛫</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map view matching MapPage styling */}
      <div
        className="rounded-2xl overflow-hidden border shadow-sm relative"
        style={{
          borderColor: "var(--line)",
          height: 520,
          position: "relative",
          isolation: "isolate",
          background: "#d4dadc",
        }}
      >
        {/* Layer style switcher */}
        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1000 }}>
          <div
            className="flex items-center gap-1 p-1 rounded-full shadow-md"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid var(--line)",
              backdropFilter: "blur(6px)",
            }}
          >
            {Object.values(TILE_PROVIDERS).map((p) => {
              const active = tileStyle === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSwitchTile(p.id)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: active ? "var(--indigo)" : "transparent",
                    color: active ? "#ffffff" : "var(--ink-soft)",
                    boxShadow: active ? "0 1px 4px rgba(29, 53, 87, 0.25)" : "none",
                  }}
                  title={p.name}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <MapContainer
          center={[36.2, 138.25]}
          zoom={5}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            key={activeTile.id}
            url={activeTile.url}
            attribution={activeTile.attribution}
            subdomains={activeTile.subdomains || "abc"}
            maxZoom={activeTile.maxZoom || 19}
            eventHandlers={{
              tileerror: () => {
                if (tileStyle !== "osm") {
                  handleSwitchTile("osm");
                }
              },
            }}
          />

          {/* 1. Modo Ruta Completa o "Todos los días": Líneas continuas entre días con halo blanco */}
          {!isSingleDay && routeSegments.map((seg) => (
            <span key={seg.id}>
              {/* Halo blanco de contraste para que resalte sobre cualquier mapa */}
              <Polyline
                positions={seg.positions}
                pathOptions={{
                  color: "#ffffff",
                  weight: 6.5,
                  opacity: 0.9,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
              {/* Línea temática de ruta */}
              <Polyline
                positions={seg.positions}
                pathOptions={{
                  color: seg.isFlight ? "#0284c7" : seg.isFerry ? "#0d9488" : "#bc4749",
                  weight: 3.8,
                  opacity: 0.95,
                  dashArray: seg.isFlight ? "8, 8" : seg.isFerry ? "4, 6" : undefined,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              >
                <Tooltip sticky>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "2px 4px" }}>
                    <strong style={{ color: "var(--indigo)" }}>{seg.transportIcon} Día {seg.fromOrder} ➔ Día {seg.toOrder}</strong>
                    <div style={{ fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>
                      {seg.from.cities.split("→")[0].trim() || seg.from.title} ➔ {seg.to.cities.split("→")[0].trim() || seg.to.title}
                    </div>
                    <div style={{ color: "#5a6070", fontSize: 11, marginTop: 1 }}>
                      {seg.transportLabel}
                    </div>
                  </div>
                </Tooltip>
              </Polyline>
            </span>
          ))}

          {/* 2. Modo Por Día (día concreto seleccionado): Trazado enfocado de desplazamiento */}
          {isSingleDay && (
            <>
              {/* Ruta global de fondo atenuada para contexto geográfico */}
              <Polyline
                positions={markers.map((s) => [s.lat, s.lng])}
                pathOptions={{
                  color: "#1d3557",
                  weight: 2.5,
                  opacity: 0.25,
                  dashArray: "6, 6",
                }}
              />

              {/* Línea de llegada: Desde dónde vienes (Día previo ➔ Día actual) */}
              {prevDayMarker && selectedDayMarker && (
                <>
                  <Polyline
                    positions={[[prevDayMarker.lat, prevDayMarker.lng], [selectedDayMarker.lat, selectedDayMarker.lng]]}
                    pathOptions={{
                      color: "#ffffff",
                      weight: 8,
                      opacity: 0.95,
                      lineCap: "round",
                    }}
                  />
                  <Polyline
                    positions={[[prevDayMarker.lat, prevDayMarker.lng], [selectedDayMarker.lat, selectedDayMarker.lng]]}
                    pathOptions={{
                      color: "#2e7d5b", // Verde bosque: Origen/Llegada
                      weight: 4.5,
                      opacity: 1,
                      dashArray: "6, 6",
                      lineCap: "round",
                    }}
                  >
                    <Tooltip permanent direction="center">
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#2e7d5b", background: "#fff", padding: "1px 6px", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                        ⬅️ Vienes de Día {prevDayMarker.order} ({prevDayMarker.cities.split("→")[0].trim()})
                      </div>
                    </Tooltip>
                  </Polyline>
                </>
              )}

              {/* Línea de salida: Hacia dónde te mueves (Día actual ➔ Día siguiente) */}
              {nextDayMarker && selectedDayMarker && (
                <>
                  <Polyline
                    positions={[[selectedDayMarker.lat, selectedDayMarker.lng], [nextDayMarker.lat, nextDayMarker.lng]]}
                    pathOptions={{
                      color: "#ffffff",
                      weight: 8,
                      opacity: 0.95,
                      lineCap: "round",
                    }}
                  />
                  <Polyline
                    positions={[[selectedDayMarker.lat, selectedDayMarker.lng], [nextDayMarker.lat, nextDayMarker.lng]]}
                    pathOptions={{
                      color: "#bc4749", // Rojo shu: Destino siguiente
                      weight: 4.5,
                      opacity: 1,
                      dashArray: "8, 6",
                      lineCap: "round",
                    }}
                  >
                    <Tooltip permanent direction="center">
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#bc4749", background: "#fff", padding: "1px 6px", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                        ➡️ Hacia Día {nextDayMarker.order} ({nextDayMarker.cities.split("→")[0].trim()})
                      </div>
                    </Tooltip>
                  </Polyline>
                </>
              )}
            </>
          )}

          <MapController
            targetMarker={selectedDayMarker}
            allMarkers={markers}
            isSingleDay={isSingleDay}
            activeMovementPoints={activeMovementPoints}
          />

          {markers.map((m) => {
            const isFocus = isSingleDay && m.order === subDay;
            const isNeighbor = isSingleDay && (m.order === subDay - 1 || m.order === subDay + 1);
            const isDimmed = isSingleDay && !isFocus && !isNeighbor;
            return (
              <Marker
                key={m.id}
                ref={(ref) => {
                  if (ref) markerRefs.current[m.id] = ref;
                }}
                position={[m.lat, m.lng]}
                icon={createIcon(m.emoji, m.color, m.order, isFocus, isNeighbor, isDimmed)}
                eventHandlers={{
                  click: () => handleMarkerClick(m.id),
                }}
                zIndexOffset={isFocus ? 1000 : isNeighbor ? 500 : 0}
              >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 200, maxWidth: 280 }}>
                  <p style={{ fontSize: 11, color: m.color, fontWeight: 700, marginBottom: 2 }}>
                    #{m.order} · {m.cities}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "var(--indigo)" }}>
                    {m.title}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 8 }}>
                    {m.summary.slice(0, 140)}...
                  </p>
                  <button
                    onClick={() => onGoToItinerary(m.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white transition-opacity cursor-pointer"
                    style={{
                      background: "var(--shu)",
                      border: "none",
                    }}
                  >
                    <span>{lang === "en" ? "View in Itinerary" : lang === "fr" ? "Voir dans l'itinéraire" : lang === "tl" ? "Tingnan sa Itinerary" : "Ver en el itinerario"}</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        </MapContainer>
      </div>

      {/* Grid de destinos (visible en Ruta Completa o cuando se eligen Todos los días) */}
      {(!isSingleDay) && (
        <div className="pt-1">
          <p className="eyebrow mb-2" style={{ color: "var(--shu)" }}>
            {lang === "en" ? `${displayedMarkers.length} Destinations on the Map` : lang === "fr" ? `${displayedMarkers.length} Destinations sur la carte` : lang === "tl" ? `${displayedMarkers.length} Destinasyon sa Mapa` : `${displayedMarkers.length} Destinos en el mapa`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {markers.map((m) => {
            const isSelected = activeId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => handleCardClick(m.id)}
                className="p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer"
                style={{
                  background: isSelected ? "var(--paper-raised)" : "var(--paper)",
                  borderColor: isSelected ? "var(--shu)" : "var(--line)",
                  boxShadow: isSelected ? "0 2px 10px rgba(185, 28, 28, 0.15)" : "none",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: m.color }}
                      >
                        {m.order}
                      </span>
                      <span className="text-base">{m.emoji}</span>
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--paper-raised)", color: "var(--ink-soft)", border: "1px solid var(--line)" }}>
                      {m.cities.split(",")[0]}
                    </span>
                  </div>

                  <p className="font-display font-bold text-[14px] leading-tight mb-1" style={{ color: "var(--ink)" }}>
                    {m.title}
                  </p>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--ink-soft)" }}>
                    {m.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t" style={{ borderColor: "var(--line)" }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(m.id);
                    }}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--indigo)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <MapPin size={12} />
                    <span>{lang === "en" ? "Focus on map" : lang === "fr" ? "Centrer sur la carte" : lang === "tl" ? "Tingnan sa mapa" : "Centrar en mapa"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGoToItinerary(m.id);
                    }}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--shu)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <span>{lang === "en" ? "Details →" : lang === "fr" ? "Détails →" : lang === "tl" ? "Detalye →" : "Ver detalles →"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
);
}
