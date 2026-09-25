export const tripMeta = {
  title: "Voyage au Japon",
  subtitle: "Itinéraire en 13 Étapes : Kanto, Fuji, Kansai, Chugoku, Okinawa & Hokkaido",
  welcomeParagraphs: [
    "Bienvenue sur la plateforme interactive de notre <strong>futur voyage au Japon</strong> ! Cette application web est un projet vivant et en <strong>développement continu</strong>, conçue comme le centre opérationnel digital pour préparer, budgétiser et coordonner notre prochaine expédition à travers <strong>13 étapes mémorables</strong>.",
    "Des temples séculaires et gratte-ciel futuristes de Tokyo, la majesté sacrée de Nikko et Kamakura, jusqu'à l'ascension du <strong>Mont Fuji</strong> (3 776 m) à l'aube. En continuant vers l'effervescence d'Osaka, la mémoire d'Hiroshima et le torii flottant de l'île sacrée de Miyajima ; puis envol vers les eaux turquoise et le ciel étoilé d'Okinawa et Iriomote, avant de culminer dans la nature sauvage et la gastronomie d'Hokkaido.",
    "<strong>État d'avancement du projet :</strong> Le site sert de laboratoire et de carnet de bord interactif : itinéraires en cours d'élaboration, estimations budgétaires, liaisons en Shinkansen, vols intérieurs, ferries et sélection d'hébergements stratégiques. Le contenu est régulièrement affiné et enrichi.",
    "L'application fonctionne <strong>100% hors-ligne (PWA)</strong> : une fois chargée, elle peut être consultée n'importe où (en plein vol, en train à grande vitesse ou en altitude) sans connexion internet. Explorez les sections, testez la carte et suivez les préparatifs !",
    "Vous pouvez changer de langue à tout moment (Espagnol, Anglais, Français, Tagalog) via le sélecteur supérieur."
  ],
  about: {
    title: "À propos du site",
    features: [
      {
        icon: "📡",
        title: "100% Hors-Ligne par Conception",
        text: "Conçu pour <strong>ne jamais dépendre d'Internet pendant le voyage</strong>. Dans les trains à grande vitesse, en haute montagne ou sur des îles isolées, l'application fonctionne à 100% en tant que PWA côté client."
      },
      {
        icon: "🗺️",
        title: "Itinéraire de 13 Étapes & Carte Interactive",
        text: "Les 13 étapes reliées avec une carte vectorielle interactive Leaflet, filtres par étape et tracé géographique complet."
      },
      {
        icon: "🗓️",
        title: "Double Itinéraire (Détaillé & Vue Rapide)",
        text: "Passez d'un guide détaillé par étape à une vue synthétique façon ligne de métro, avec liens directs vers la carte et export PDF."
      },
      {
        icon: "🚅",
        title: "Transports, Shinkansen & Pass",
        text: "Détail de toutes les liaisons : Narita Express, Shinkansen Tokaido/Sanyo, pass régionaux (Tobu Nikko Pass, Osaka Metro, Ferry Miyajima), carte Suica numérique et livraison de bagages Takkyubin."
      },
      {
        icon: "🏨",
        title: "Hébergements & Bases Conseillées",
        text: "Guides des 7 points de chute (Tokyo, refuge du Mont Fuji, Osaka, ryokan à Miyajima, Okinawa, Iriomote et Sapporo) avec onsen et conseils de réservation."
      },
      {
        icon: "📜",
        title: "Histoire, Documentaires & Podcasts",
        text: "Section culturelle complète avec histoire chronologique, lecteur audio Text-to-Speech intégré, podcasts et documentaires."
      },
      {
        icon: "🔍",
        title: "Recherche Globale Intelligente",
        text: "Moteur de recherche réactif indexant instantanément lieux, transports, gastronomie, histoire et culture pop."
      },
      {
        icon: "🌦️",
        title: "Météo en Temps Réel avec Cache",
        text: "Prévisions Open-Meteo pour toutes les villes de la route avec mise en cache locale de 12 heures pour consultation hors-ligne."
      },
      {
        icon: "💰",
        title: "Budget Estimé & Liste de Préparatifs",
        text: "Détail des coûts par catégorie et liste chronologique de tâches persistantes dans <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Multilingue Natif (4 Langues)",
        text: "Prise en charge intégrale de <strong>l'espagnol, l'anglais, le français et le tagalog</strong>."
      }
    ],
    github: "Voir le code source sur GitHub"
  }
};

export const flights = {
  out: {
    label: "Vol International Aller",
    text: "Vol international au départ de chez vous vers Tokyo Narita (NRT) ou Haneda (HND). Vols directs ou avec escale unique.",
  },
  back: {
    label: "Vol International Retour",
    text: "Vol international retour au départ de Tokyo Narita (NRT) après le vol intérieur de correspondance depuis Hokkaido.",
  },
};

export const blocks = [
  {
    id: "kanto",
    title: "Kanto : Tokyo, Nikko & Kamakura",
    sleepSummary: "Base à Tokyo (4 nuits)",
    bestArea: "Shinjuku pour les transports, ou Asakusa/Ueno pour le charme traditionnel et l'accès direct à Nikko.",
  },
  {
    id: "fuji",
    title: "Sommet du Mont Fuji",
    sleepSummary: "Refuge de montagne (Yamagoya) à la 7e ou 8e station (1 nuit)",
    bestArea: "Refuge réservé sur la voie Yoshida pour admirer le lever de soleil Goraiko à 3 776 m.",
  },
  {
    id: "kansai",
    title: "Kansai : Osaka classique & Sanctuaires",
    sleepSummary: "Base à Osaka (2 nuits)",
    bestArea: "Namba / Dotonbori pour la gastronomie nocturne, ou Umeda pour les Shinkansen.",
  },
  {
    id: "chugoku",
    title: "Chugoku : Hiroshima & Miyajima",
    sleepSummary: "Hiroshima / Ryokan sur l'île de Miyajima (2 nuits)",
    bestArea: "Ryokan traditionnel sur l'île de Miyajima pour profiter du torii flottant illuminé après le départ des touristes d'un jour.",
  },
  {
    id: "okinawa",
    title: "Îles Ryukyu : Okinawa & Iriomote",
    sleepSummary: "Naha & Éco-lodge à Iriomote (2 nuits)",
    bestArea: "Naha centre près de Kokusai-dori et éco-lodge dans la jungle subtropicale d'Iriomote.",
  },
  {
    id: "hokkaido",
    title: "Hokkaido Sauvage & Adieux à Tokyo",
    sleepSummary: "Sapporo (1 nuit) et Tokyo / Narita (1 nuit)",
    bestArea: "Centre de Sapporo près du parc Odori, et hôtel à Tokyo ou près de l'aéroport de Narita.",
  },
];

export const stays = [
  {
    city: "Tokyo",
    nights: "Jours 1 à 4 (4 nuits)",
    options: [
      {
        name: "Hôtel Base Tokyo (Shinjuku / Asakusa / Ueno)",
        total: "Env. 110€–160€ / nuit",
        note: "Base idéale pour explorer Tokyo et faire des excursions à Nikko et Kamakura sans changer d'hôtel.",
      }
    ]
  },
  {
    city: "Mont Fuji",
    nights: "Jour 5 (1 nuit)",
    options: [
      {
        name: "Refuge de Montagne Yamagoya (7e ou 8e Station)",
        total: "Env. 70€–95€ / personne (dîner et petit-déjeuner inclus)",
        note: "Expérience indispensable en haute montagne pour se reposer avant l'ascension nocturne vers le cratère.",
      }
    ]
  },
  {
    city: "Osaka",
    nights: "Jours 6 & 7 (2 nuits)",
    options: [
      {
        name: "Hôtel Base Osaka (Namba / Dotonbori / Umeda)",
        total: "Env. 95€–140€ / nuit",
        note: "Récupération des valises expédiées depuis Tokyo. Dégustation de street food à Dotonbori et visite du château.",
      }
    ]
  },
  {
    city: "Hiroshima & Miyajima",
    nights: "Jours 8 & 9 (2 nuits)",
    options: [
      {
        name: "Ryokan Traditionnel à Miyajima / Hôtel à Hiroshima Station",
        total: "Env. 130€–220€ / nuit (Ryokan avec onsen et dîner kaiseki)",
        note: "Dormir sur l'île de Miyajima permet de contempler le grand torii illuminé le soir en toute sérénité.",
      }
    ]
  },
  {
    city: "Okinawa & Yaeyama",
    nights: "Jours 10 & 11 (2 nuits)",
    options: [
      {
        name: "Hôtel à Naha (Nuit 10) & Éco-Lodge à Iriomote (Nuit 11)",
        total: "Env. 110€–170€ / nuit",
        note: "Eaux turquoise coralliennes, observation des étoiles au Dark Sky Park et kayak dans les mangroves.",
      }
    ]
  },
  {
    city: "Sapporo (Hokkaido)",
    nights: "Jour 12 (1 nuit)",
    options: [
      {
        name: "Hôtel au Centre de Sapporo (Odori / Susukino)",
        total: "Env. 85€–130€ / nuit",
        note: "Capitale gourmande d'Hokkaido : ramen au miso, crabe des neiges et bière de Sapporo.",
      }
    ]
  },
  {
    city: "Tokyo / Narita",
    nights: "Jour 13 (Nuit d'adieu)",
    options: [
      {
        name: "Hôtel à Tokyo ou Hôtel près de l'Aéroport de Narita",
        total: "Env. 90€–140€ / nuit",
        note: "Achats de souvenirs à Ginza, grand banquet d'adieu et accès facile à Narita pour le vol retour.",
      }
    ]
  },
];

export const transports = [
  { name: "Narita Express (N'EX) / Keisei Skyliner", desc: "Train express direct depuis l'aéroport vers Tokyo, Shinjuku ou Ueno." },
  { name: "Métro de Tokyo & Ligne JR Yamanote", desc: "Pass 24/48/72h pour le métro et carte Suica numérique sur smartphone." },
  { name: "Tobu Limited Express Spacia X", desc: "Train express panoramique pour l'excursion à Nikko (Patrimoine Mondial)." },
  { name: "Ligne JR Yokosuka & Train rétro Enoden", desc: "Train direct pour le Grand Bouddha de Kamakura et balade côtière." },
  { name: "Bus Express vers le Mont Fuji", desc: "Bus direct depuis Busta Shinjuku jusqu'à la 5e station Fuji Subaru (2 300 m)." },
  { name: "Bus + Shinkansen Tokaido (Hikari / Nozomi)", desc: "Train à grande vitesse depuis la gare de Mishima jusqu'à Shin-Osaka." },
  { name: "Lignes de Métro d'Osaka", desc: "Métro urbain à travers Namba, Tennoji et Umeda." },
  { name: "Shinkansen Sanyo vers Hiroshima + Tram Hiroden", desc: "Train express vers Hiroshima (1h 25m) et tramway historique." },
  { name: "Ligne JR Sanyo + Ferry JR West Miyajima", desc: "Court trajet en train et ferry panoramique passant devant le torii flottant." },
  { name: "Vol Domestique vers Okinawa + Yui Rail", desc: "Vol vers l'aéroport de Naha et monorail suspendu vers le centre-ville." },
  { name: "Vol vers Ishigaki + Ferry Rapide vers Iriomote", desc: "Traversée vers l'archipel Yaeyama et le parc national sauvage." },
  { name: "Vol Domestique vers Sapporo + JR Rapid Airport", desc: "Envol vers Hokkaido et train rapide vers le centre de Sapporo." },
  { name: "Vol Sapporo vers Tokyo + Narita Express", desc: "Retour dans la capitale, dîner d'adieu et transfert vers Narita." },
];

export const budget = {
  totalPerPerson: "3 750 €",
  totalGroup: "3 750 € / voyageur (estimation complète)",
  note: "Estimation réaliste pour l'ensemble du voyage de 13 étapes comprenant vols, hébergements, trains à grande vitesse, repas et visites.",
};
