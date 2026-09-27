import { useState, useEffect, useCallback } from "react";
import { getTripStatus, todayISO, diffDays } from "./date";

export const CITY_COORDS = {
  "Tokio": { lat: 35.6895, lon: 139.6917, name: "Tokio" },
  "Nikko": { lat: 36.758, lon: 139.5989, name: "Nikkō" },
  "Kamakura": { lat: 35.3167, lon: 139.5361, name: "Kamakura" },
  "Fuji": { lat: 35.3606, lon: 138.7274, name: "Monte Fuji" },
  "Osaka": { lat: 34.6937, lon: 135.5023, name: "Osaka" },
  "Kumano Kodo": { lat: 33.8402, lon: 135.7739, name: "Kumano Kodō" },
  "Nachi": { lat: 33.6706, lon: 135.8906, name: "Nachi Katsuura" },
  "Hiroshima": { lat: 34.3928, lon: 132.4526, name: "Hiroshima" },
  "Miyajima": { lat: 34.2959, lon: 132.3197, name: "Isla de Miyajima" },
  "Okinawa": { lat: 26.217, lon: 127.7195, name: "Okinawa (Naha)" },
  "Iriomote": { lat: 24.3333, lon: 123.8167, name: "Isla de Iriomote" },
  "Sapporo": { lat: 43.0598, lon: 141.3533, name: "Sapporo (Hokkaido)" }
};

export const CITY_DISPLAY_NAMES = {
  "Tokio": "Tokio",
  "Nikko": "Nikkō",
  "Kamakura": "Kamakura",
  "Fuji": "Mte. Fuji",
  "Osaka": "Osaka",
  "Kumano Kodo": "Kumano Kodō",
  "Nachi": "Nachi",
  "Hiroshima": "Hiroshima",
  "Miyajima": "Miyajima",
  "Okinawa": "Okinawa",
  "Iriomote": "Iriomote",
  "Sapporo": "Sapporo",
};

export const DAY_CITIES = {
  1: ["Tokio"],
  2: ["Tokio"],
  3: ["Nikko", "Tokio"],
  4: ["Kamakura", "Tokio"],
  5: ["Fuji"],
  6: ["Fuji", "Osaka"],
  7: ["Osaka"],
  8: ["Kumano Kodo"],
  9: ["Nachi"],
  10: ["Hiroshima"],
  11: ["Miyajima", "Hiroshima"],
  12: ["Okinawa"],
  13: ["Iriomote"],
  14: ["Sapporo"],
  15: ["Sapporo", "Tokio"]
};

export const STATIC_CITY_WEATHER = {
  "Tokio": { high: 28, low: 20, rain: 20, sky: "sun", condition: "Soleado y agradable" },
  "Nikko": { high: 22, low: 14, rain: 35, sky: "partly", condition: "Templado en montaña" },
  "Kamakura": { high: 27, low: 21, rain: 25, sky: "partly", condition: "Brisa marina costera" },
  "Fuji": { high: 14, low: 5, rain: 30, sky: "cloud", condition: "Frío en altitud" },
  "Osaka": { high: 30, low: 22, rain: 20, sky: "sun", condition: "Cálido y animado" },
  "Kumano Kodo": { high: 25, low: 17, rain: 45, sky: "rain", condition: "Humedad y lluvia mística" },
  "Nachi": { high: 26, low: 18, rain: 40, sky: "partly", condition: "Brisa de cascada y costa" },
  "Hiroshima": { high: 29, low: 20, rain: 20, sky: "sun", condition: "Soleado y despejado" },
  "Miyajima": { high: 28, low: 20, rain: 25, sky: "sun", condition: "Brisa marina en bahía" },
  "Okinawa": { high: 31, low: 26, rain: 30, sky: "partly", condition: "Tropical y soleado" },
  "Iriomote": { high: 31, low: 25, rain: 35, sky: "partly", condition: "Cálido selvático" },
  "Sapporo": { high: 22, low: 13, rain: 25, sky: "partly", condition: "Fresco y otoñal" },
};

function getSkyFromWMO(code) {
  if (code === 0) return "sun";
  if (code === 1 || code === 2) return "partly";
  if (code === 3 || code === 45 || code === 48) return "cloud";
  return "rain";
}

function getConditionFromWMO(code) {
  if (code === 0) return "Soleado";
  if (code === 1 || code === 2) return "Parcialmente nublado";
  if (code === 3 || code === 45 || code === 48) return "Nublado";
  if (code >= 51 && code <= 67) return "Lluvia";
  if (code >= 71 && code <= 86) return "Nieve/Lluvia";
  if (code >= 95) return "Tormenta";
  return "Variable";
}

const CACHE_KEY = "jp_weather_forecast_cache_v3";
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

export const DAY_DATE_MAP = {
  1: { date: "2026-09-07", label: "7 Sept" },
  2: { date: "2026-09-08", label: "8 Sept" },
  3: { date: "2026-09-09", label: "9 Sept" },
  4: { date: "2026-09-10", label: "10 Sept" },
  5: { date: "2026-09-11", label: "11 Sept" },
  6: { date: "2026-09-12", label: "12 Sept" },
  7: { date: "2026-09-13", label: "13 Sept" },
  8: { date: "2026-09-14", label: "14 Sept" },
  9: { date: "2026-09-15", label: "15 Sept" },
  10: { date: "2026-09-16", label: "16 Sept" },
  11: { date: "2026-09-17", label: "17 Sept" },
  12: { date: "2026-09-18", label: "18 Sept" },
  13: { date: "2026-09-19", label: "19 Sept" },
  14: { date: "2026-09-20", label: "20 Sept" },
  15: { date: "2026-09-21", label: "21 Sept" },
};

export async function fetchLiveWeatherMap() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          return data;
        }
      }
    }

    const cities = Object.keys(CITY_COORDS);
    const lats = cities.map(c => CITY_COORDS[c].lat).join(",");
    const lons = cities.map(c => CITY_COORDS[c].lon).join(",");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const raw = await res.json();
    const arr = Array.isArray(raw) ? raw : [raw];

    const weatherMap = {};
    cities.forEach((city, idx) => {
      weatherMap[city] = arr[idx].daily;
    });

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: weatherMap
        }));
      } catch (e) {
        console.warn("Could not save weather cache", e);
      }
    }

    return weatherMap;
  } catch (err) {
    console.warn("Using offline / fallback weather", err);
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached).data;
        }
      } catch (e) { /* ignore */ }
    }
    return null;
  }
}

export function useTodayWeatherForecast() {
  return useDayWeatherForecast(null);
}

/**
 * Igual que useTodayWeatherForecast, pero para un día concreto del viaje
 * (no necesariamente "hoy"). Si dayNum es null, usa el día activo del
 * viaje tal cual hacía la función original.
 */
export function useDayWeatherForecast(dayNum) {
  const [liveMap, setLiveMap] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) return JSON.parse(cached).data;
      } catch (e) { /* ignore */ }
    }
    return null;
  });
  const [loading, setLoading] = useState(!liveMap);

  useEffect(() => {
    let mounted = true;
    fetchLiveWeatherMap().then(data => {
      if (mounted && data) {
        setLiveMap(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  let activeDayNum = dayNum;
  let tripPhase = "during";
  if (activeDayNum == null) {
    const status = getTripStatus();
    tripPhase = status.phase;
    if (status.phase === "during") {
      activeDayNum = status.dayNum ?? 1;
    } else if (status.phase === "after") {
      activeDayNum = 15;
    } else {
      // Before trip: preview Day 1
      activeDayNum = 1;
    }
  }

  const cityKeys = DAY_CITIES[activeDayNum] || ["Tokio"];
  const isDisplacement = cityKeys.length > 1;

  const dayInfo = DAY_DATE_MAP[activeDayNum] || { date: "2026-09-07", label: "7 Sept" };
  const targetDateStr = dayInfo.date;
  const dateLabel = dayInfo.label;

  const citiesWeather = cityKeys.map(cityKey => {
    const fallback = STATIC_CITY_WEATHER[cityKey] || { high: 28, low: 20, rain: 20, sky: "partly", condition: "Parcialmente nublado" };
    const displayName = CITY_DISPLAY_NAMES[cityKey] || cityKey;

    if (!liveMap || !liveMap[cityKey]) {
      return {
        cityKey,
        displayName,
        rain: fallback.rain,
        high: fallback.high,
        low: fallback.low,
        sky: fallback.sky,
        condition: fallback.condition,
        isLive: false,
      };
    }

    const cityDaily = liveMap[cityKey];
    let dateIdx = cityDaily.time ? cityDaily.time.indexOf(targetDateStr) : -1;
    // If target trip date is not in the 16-day window (e.g. testing before Sept 2026), use today's forecast (index 0)
    if (dateIdx === -1) dateIdx = 0;

    const rain = cityDaily.precipitation_probability_max?.[dateIdx] ?? fallback.rain;
    const high = cityDaily.temperature_2m_max?.[dateIdx] != null ? Math.round(cityDaily.temperature_2m_max[dateIdx]) : fallback.high;
    const low = cityDaily.temperature_2m_min?.[dateIdx] != null ? Math.round(cityDaily.temperature_2m_min[dateIdx]) : fallback.low;
    const wmo = cityDaily.weathercode?.[dateIdx];
    const sky = wmo != null ? getSkyFromWMO(wmo) : fallback.sky;
    const condition = wmo != null ? getConditionFromWMO(wmo) : fallback.condition;

    return {
      cityKey,
      displayName,
      rain,
      high,
      low,
      sky,
      condition,
      isLive: true,
    };
  });

  return {
    loading,
    dayNum: activeDayNum,
    dateLabel,
    targetDateStr,
    isDisplacement,
    citiesWeather,
    phase: tripPhase,
  };
}
