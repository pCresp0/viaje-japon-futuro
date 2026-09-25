# 🗻 Viaje a Japón — Planificador de la Ruta Futura 🇯🇵

🌐 **Web en directo (GitHub Pages):** [https://pcresp0.github.io/viaje-japon-futuro/](https://pcresp0.github.io/viaje-japon-futuro/)

Guía de viaje interactiva, *mobile-first* e instalable como **Progressive Web App (PWA)**, diseñada a medida para la planificación y realización de la **gran expedición futura por Japón** a lo largo de **13 etapas inolvidables** que recorren el archipiélago de norte a sur.

Esta aplicación reúne todo lo necesario para preparar y disfrutar del viaje: el **itinerario etapa por etapa**, el **mapa interactivo** con el trazado geográfico, las recomendaciones de vuelos y transportes (Shinkansen, pases regionales y ferris), las bases de alojamiento, guías culturales y gastronómicas, y herramientas prácticas 100% disponibles **sin conexión a internet**.

---

## 🏛️ Arquitectura de la Solución

El proyecto nace con un objetivo claro: **Cero latencia, cero caídas y disponibilidad offline total**. En trenes bala, alta montaña (como el ascenso al Fuji) o zonas rurales de Japón, la app sigue funcionando al 100%.

1. **Client-Side Rendering estático (SSOT):** Todos los datos de las 13 etapas, alojamientos, vuelos, transportes y guías residen en el cliente (`src/data/trip.js`, `pendingDays.js`, `history.js`, `guides.js`).
2. **Offline-First (PWA):** `vite-plugin-pwa` (Workbox) genera un *Service Worker* que almacena en caché todos los activos de la aplicación para consulta instantánea offline.
3. **Persistencia local:** Las tareas de preparativos y la selección de idioma se conservan en el `localStorage` del dispositivo.

---

## 🛠️ Tecnologías Utilizadas

- **React 19 + Vite 8:** Rendimiento extremo con compilación ultrarrápida y componentes modulares.
- **Tailwind CSS v4 + Vanilla CSS Tokens:** Diseño visual premium, responsive y adaptado a móviles (*Safe Area Insets*, estética japonesa moderna).
- **Sistema Multi-idioma Propio (i18n):** Soporte sincronizado para Español 🇪🇸, English 🇬🇧, Français 🇫🇷 y Tagalog 🇵🇭.
- **Leaflet (Mapas Vectoriales):** Mapa interactivo de todo Japón con 26 paradas clave, trazado de la ruta y filtrado por etapas y regiones.
- **Web Speech API:** Reproducción Text-to-Speech nativa en las secciones de historia y cultura.
- **Lucide React:** Iconografía moderna y ligera optimizada por *tree-shaking*.

---

## ✨ Estructura de la Ruta (13 Etapas)

1. **Kanto (Días 1 a 4):** Llegada a Narita/Tokio, Asakusa, Shibuya, Shinjuku, excursión sagrada a Nikko y día en Kamakura & Enoshima.
2. **Fuji (Día 5):** Ascenso por la ruta Yoshida al Monte Fuji (3.776 m) y noche en refugio Yamagoya.
3. **Kansai (Días 6 y 7):** Amanecer Goraiko en la cumbre, descenso, traslado a Osaka y exploración de Dotonbori y Castillo de Osaka.
4. **Chugoku (Días 8 y 9):** Shinkansen a Hiroshima (Parque de la Paz) y ferry a la isla sagrada de Miyajima (torii flotante y Monte Misen).
5. **Islas Ryukyu / Okinawa (Días 10 y 11):** Vuelo sur a Okinawa, Castillo Shuri, playas de arrecife y selva virgen del Parque Nacional de Iriomote.
6. **Hokkaido & Retorno (Días 12 y 13):** Salto septentrional a Sapporo y canal de Otaru, con enlace de vuelta a Tokio para el vuelo internacional.

---

## 📴 Instalación como App (PWA)

Al ser una Progressive Web App, se instala directamente desde el navegador:

- **En iPhone (Safari):** Botón *Compartir* → *"Añadir a la pantalla de inicio"*.
- **En Android (Chrome):** Menú (⋮) → *"Instalar aplicación"* o *"Añadir a pantalla principal"*.

---

## 🚀 Despliegue y Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Servidor local de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---
*Planificador interactivo para la expedición a Japón 🇯🇵*

