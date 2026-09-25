# 🗻 Viaje a Japón — Guía y Planificador de la Gran Ruta Futura 🇯🇵

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2e7d5b?style=for-the-badge&logo=github)](https://pcresp0.github.io/viaje-japon-futuro/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-100%25_Offline-1D3557?style=for-the-badge&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Leaflet](https://img.shields.io/badge/Leaflet-Vector_Maps-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

> 🌐 **Aplicación web en producción:** [https://pcresp0.github.io/viaje-japon-futuro/](https://pcresp0.github.io/viaje-japon-futuro/)

Aplicación web progresiva (**PWA**), interactiva, *mobile-first* y **100% disponible sin conexión a internet**, diseñada expresamente para la planificación y realización de la **gran expedición futura por Japón**: una ruta transversal de **13 etapas memorables** que recorre el archipiélago de norte a sur, desde las cumbres de Hokkaido y el sagrado Monte Fuji hasta los arrecifes subtropicales de Okinawa y la jungla virgen de Iriomote.

Esta plataforma reúne en un único lugar interactivo todo lo necesario para preparar y vivir el viaje: el **itinerario etapa por etapa**, el **mapa vectorial interactivo** con el trazado geográfico, recomendaciones de vuelos y transportes (Shinkansen, pases regionales y ferris), las 7 bases estratégicas de alojamiento, guías gastronómicas y culturales, y herramientas prácticas con persistencia local.

---

## 🗺️ La Gran Ruta de 13 Etapas

La expedición está estructurada en **6 bloques regionales** diseñados con un orden geográfico y logístico óptimo:

| Etapa | Bloque Regional | Destinos Principales | Hito Destacado | Base de Alojamiento |
| :---: | :--- | :--- | :--- | :--- |
| **1** | 🗼 **Kanto** | Narita (NRT) → Tokio | Aterrizaje, Narita Express y cena de bienvenida | 🏨 Hotel en Tokio |
| **2** | 🗼 **Kanto** | Tokio (Asakusa, Shibuya, Harajuku) | Templo Senso-ji, Meiji Jingu y mirador Shibuya Sky | 🏨 Hotel en Tokio |
| **3** | 🗼 **Kanto** | Excursión de día completo a Nikko | Santuario Toshogu UNESCO, cascadas Kegon y lago Chuzenji | 🏨 Hotel en Tokio |
| **4** | 🗼 **Kanto** | Excursión a Kamakura & Enoshima | Gran Buda Kotoku-in, santuarios en cuevas y vistas del Fuji | 🏨 Hotel en Tokio *(Takkyubin a Osaka)* |
| **5** | 🗻 **Monte Fuji** | Tokio → 5ª Estación → 8ª Estación | Ascenso por la ruta Yoshida hasta los 3.400 m | 🛖 Refugio Yamagoya (Fuji) |
| **6** | 🏯 **Kansai** | Cumbre Fuji (3.776 m) → Osaka | Amanecer *Goraiko* en el cráter, descenso y noche en Dotonbori | 🏨 Hotel en Osaka |
| **7** | 🏯 **Kansai** | Osaka histórica y moderna | Castillo de Osaka, santuario Namba Yasaka y Shinsekai | 🏨 Hotel en Osaka |
| **8** | ⛩️ **Chugoku** | Osaka → Hiroshima → Isla de Miyajima | Parque y Cúpula de la Paz, ferry y gran torii flotante | ⛩️ Ryokan en Miyajima |
| **9** | ⛩️ **Chugoku** | Miyajima (Monte Misen) → Vuelo Sur | Teleférico al Monte Misen, templos y vuelo a Okinawa | ✈️ Tránsito / Base Okinawa |
| **10** | 🌺 **Okinawa** | Naha & Playas de Ryukyu | Castillo de Shuri, calle Kokusai-dori y snorkel en arrecifes | 🏨 Hotel en Naha (Okinawa) |
| **11** | 🌺 **Okinawa** | Isla salvaje de Iriomote | Parque Nacional Yaeyama, río Urauchi y manglares | 🏕️ Eco-lodge en Iriomote |
| **12** | ❄️ **Hokkaido** | Vuelo a Sapporo (Hokkaido) | Parque Odori, Miso Ramen en Susukino y Monte Moiwa | 🏨 Hotel en Sapporo |
| **13** | ❄️ **Hokkaido / Kanto** | Excursión a Otaru → Tokio / Vuelo | Canal histórico de Otaru, almacenes de piedra y vuelo de vuelta | ✈️ Vuelo internacional de regreso |

---

## 📱 Módulos y Funcionalidades de la Aplicación

### 1. 🗓️ Itinerario Completo (Doble Vista)
- **Modo Detallado:** Horarios orientativos, conexiones de transporte recomendadas, avisos clave de logística, billetes recomendados y contexto histórico de cada parada.
- **Modo Vista Rápida (Timeline):** Diagrama visual tipo mapa de metro para consultar de un vistazo los hitos del día.
- **Exportación a PDF:** Generador de documento imprimible y guardable en el dispositivo para llevar en mano.

### 2. 🗺️ Mapa Vectorial Interactivo (Leaflet)
- **26 Paradas Geolocalizadas:** Marcadores con coordenadas exactas distribuidos por todo Japón.
- **Trazado de Ruta:** Polilínea continua que une visualmente las 13 etapas a través de la geografía insular.
- **Filtros Dinámicos:** Selector para aislar regiones concretas o ver todas las etapas simultáneamente.
- **Navegación Cruzada:** Botones directos para saltar del mapa al día correspondiente del itinerario y viceversa.

### 3. 📅 Calendario & Exportador `.ICS`
- **Cronograma de la Expedición:** Cuadrícula de 2 semanas con código de colores por región y etiquetas de alojamiento.
- **Exportación Universal:** Descarga en un clic de archivo de calendario compatible con **Apple Calendar (iPhone / Mac)** y **Google Calendar**.

### 4. 🧭 Explorador de Etapas (`Inicio` / `Hoy`)
- **Modo Planificación:** Selector dinámico de etapas para explorar en profundidad cualquier día del itinerario sin esperar a fechas reales de viaje.
- **Dashboard de Bienvenida:** Métricas clave de la expedición (13 jornadas, 6 regiones, 7 alojamientos base) con accesos directos al mapa y transportes.

### 5. ✈️ Vuelos Internacionales y Domésticos
- **Vuelo Internacional:** Información de rutas desde España (Madrid/Barcelona) hacia Tokio (Narita o Haneda) con escalas recomendadas.
- **Los 4 Vuelos Domésticos Esenciales:**
  1. *Kansai / Hiroshima → Okinawa (Naha)*
  2. *Okinawa (Naha) → Ishigaki (Puerta de Iriomote)*
  3. *Okinawa / Ishigaki → Sapporo New Chitose (Hokkaido)*
  4. *Sapporo → Tokio (Narita / Haneda)*
- **Visit Japan Web:** Instrucciones paso a paso para tramitar el registro oficial de Inmigración y Aduanas con código QR.

### 6. 🏨 Las 7 Bases de Alojamiento
- **Guía de Alojamientos:** Tipologías de hospedaje (Business hotels urbanos, refugio Yamagoya en Fuji, Ryokans centenarios con cena Kaiseki y eco-lodges en la jungla).
- **Cultura Onsen:** Normas de etiqueta en aguas termales japonesas (lavado previo, gestión de tatuajes, protocolo de toallas).
- **Takkyubin:** Guía del servicio de reenvío de maletas pesadas entre hoteles para viajar ligero en etapas de montaña.

### 7. 🚅 Transportes, Shinkansen y Pases
- **Trenes Bala (Shinkansen):** Líneas Tokaido y Sanyo (Nozomi, Hikari), reserva de asientos y compra anticipada mediante SmartEX.
- **Análisis de Rentabilidad JR Pass:** Comparativa financiera detallada que demuestra por qué comprar billetes punto a punto y pases regionales es más económico que el pase nacional tras la subida de tarifas.
- **Pases Locales:** Tobu Nikko Pass, Osaka Metro Day Pass y ferris de Miyajima e Iriomote.
- **IC Cards Digitales:** Instrucciones para dar de alta Suica o Pasmo directamente en Apple Wallet o Google Pay.

### 8. 💰 Presupuesto Estimado y Transparente
- **Desglose por Categorías:** Vuelos internacionales e internos (~1.150€), transportes por tierra y mar (~480€), 13 noches de alojamiento (~980€), alimentación y restaurantes (~650€), entradas y actividades (~340€), seguro y conectividad (~150€).
- **Presupuesto Total Estimado:** ~3.750€ por persona (con opción de optimización en hoteles y billetes anticipados).

### 9. ⛩️ Destinos y Experiencias (`Lugares`)
- Catálogo clasificado en cuatro grandes categorías:
  - *Templos, Santuarios y Patrimonio de la Humanidad (UNESCO)*
  - *Naturaleza Salvaje, Montaña y Playas*
  - *Iconos Urbanos y Miradores Vanguardistas*
  - *Gastronomía Regional y Mercados Típicos*
- Fichas culturales *"Saber más"* con historia, curiosidades y consejos prácticos.

### 10. 🍜 Gastronomía y Guía Konbini
- **Platos Emblemáticos:** Yuba artesana en Nikko, Takoyaki en Osaka, Okonomiyaki estilo Hiroshima, ostras a la brasa en Miyajima, sopa de Okinawa y el legendario Miso Ramen con cangrejo en Hokkaido.
- **Supervivencia en Konbini:** Cómo aprovechar al máximo 7-Eleven, Lawson y FamilyMart (onigiris, platos preparados, desayunos tempranos y cajeros Seven Bank).

### 11. 📜 Historia de Japón con Audioguía (Text-to-Speech)
- **Periodos Históricos:** Desde el periodo Jomon y la era Heian hasta la Restauración Meiji y el Japón contemporáneo.
- **Reproductor de Voz Nativo:** Botón para escuchar cada capítulo narrado por la voz sintética del sistema operativo, sin consumir datos de red.
- **Recursos Multimedia:** Podcasts recomendados, documentales de YouTube y clásicos literarios.

### 12. 🌦️ Meteorología Offline-Friendly
- Conexión con la API meteorológica de Open-Meteo para las ciudades de la ruta (Tokio, Nikko, Monte Fuji, Osaka, Hiroshima, Okinawa, Sapporo).
- Caché local automática de 12 horas para consultar temperaturas y previsión sin conexión.

### 13. 🗣️ Frases Útiles y Etiqueta
- Frases esenciales en japonés con kanji/kana, transcripción en rōmaji y traducción.
- Botones de audio para escuchar la pronunciación real en japonés mediante síntesis de voz nativa.

### 14. 🔍 Buscador Global Reactivo
- Motor de indexación instantáneo que busca en tiempo real en todo el contenido (lugares, hoteles, transportes, historia, preparativos).
- Al seleccionar un resultado, navega a la sección exacta, abre el acordeón o tarjeta correspondiente y resalta el elemento con una pulsación dorada.

### 15. 🌐 Multi-idioma Nativo (4 Idiomas)
- Arquitectura i18n reactiva con soporte completo para:
  - 🇪🇸 **Español** (idioma principal)
  - 🇬🇧 **English**
  - 🇫🇷 **Français**
  - 🇵🇭 **Tagalog**
- Sincronización instantánea de toda la interfaz y los datos del viaje al cambiar de idioma.

---

## 🏛️ Arquitectura Técnica

El proyecto ha sido concebido bajo el principio de **cero dependencia de internet durante el viaje**:

```
┌────────────────────────────────────────────────────────┐
│                   Cliente (Navegador)                   │
├────────────────────────────┬───────────────────────────┤
│    React 19 + Tailwind v4  │  Leaflet Vector Maps      │
├────────────────────────────┴───────────────────────────┤
│            Single Source of Truth (SSOT)               │
│   src/data/ (trip, pendingDays, guides, history...)    │
├────────────────────────────────────────────────────────┤
│          Service Worker (Vite PWA / Workbox)           │
│     Precache de HTML, CSS, JS, imágenes e iconos       │
├────────────────────────────────────────────────────────┤
│              Almacenamiento Local (Storage)             │
│        Preferencias de idioma, checklist de tareas     │
└────────────────────────────────────────────────────────┘
```

1. **Jamstack Estático:** No requiere backend ni base de datos en servidor. Todo el contenido reside en módulos JavaScript fuertemente estructurados.
2. **PWA (Progressive Web App):** Tras la primera visita, el Service Worker descarga y almacena en caché la totalidad de los recursos. La aplicación carga en menos de 50 ms incluso en modo avión.
3. **Optimización de Assets:** Uso de fuentes del sistema y formatos modernos de compresión (`.webp`).

---

## 📴 Instalación en Dispositivos Móviles (PWA)

Al cumplir con los estándares PWA, la web se puede instalar como aplicación nativa sin pasar por tiendas de aplicaciones:

### En iPhone / iPad (Safari):
1. Accede a [https://pcresp0.github.io/viaje-japon-futuro/](https://pcresp0.github.io/viaje-japon-futuro/) en Safari.
2. Pulsa el botón **Compartir** (icono de cuadrado con flecha hacia arriba).
3. Selecciona **"Añadir a la pantalla de inicio"**.

### En Android (Chrome):
1. Accede a la URL en Chrome.
2. Pulsa en el menú de tres puntos (**⋮**) arriba a la derecha.
3. Selecciona **"Instalar aplicación"** o **"Añadir a la pantalla principal"**.

---

## 🚀 Desarrollo y Despliegue

### Requisitos previos:
- Node.js 18+ y npm instalados.

### 1. Clonar el repositorio:
```bash
git clone https://github.com/pCresp0/viaje-japon-futuro.git
cd viaje-japon-futuro
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Servidor de desarrollo local:
```bash
npm run dev
```

### 4. Compilación para producción:
```bash
npm run build
```

### Automatizaciones y Flujos de GitHub Actions (CI/CD):
El repositorio cuenta con 4 flujos de trabajo automatizados en `.github/workflows/`:
1. **Despliegue a GitHub Pages** ([`deploy.yml`](.github/workflows/deploy.yml)): Cada `push` a la rama `main` compila y publica automáticamente la versión más reciente en GitHub Pages.
2. **Sincronización diaria con develop** ([`sync-develop.yml`](.github/workflows/sync-develop.yml)): A última hora del día (23:50 CEST), si se han producido commits en `main`, fusiona automáticamente los cambios hacia la rama `develop`.
3. **Backup diario de ramas** ([`daily-backup.yml`](.github/workflows/daily-backup.yml)): A las 23:55 CEST, si hubo actividad en `main`, genera una rama de seguridad con la nomenclatura `Backup_YYYYMMDD_XCommits`.
4. **Registro automático de cambios** ([`update-changelog.yml`](.github/workflows/update-changelog.yml)): Registra cada commit subido a `main` en el archivo `CHANGELOG_AUTO.md` sin requerir mantenimiento manual.

---

## 📄 Licencia y Créditos

- **Desarrollado por:** Pablo Crespo Bellido
- **Tecnologías:** React, Vite, Tailwind CSS, Leaflet, Lucide Icons, Vite PWA.
- **Cartografía:** Datos de OpenStreetMap y renderizado con Leaflet.
- **Meteorología:** API abierta de Open-Meteo.

*Planificador interactivo para la gran expedición a Japón 🇯🇵*

