import type { CatalogCarrierDto, CatalogCategoryDto, CatalogTechnologyDto } from '@mardu/content-core';

export const catalogCategories: CatalogCategoryDto[] = [
  {
    id: 'access-points',
    slug: 'access-points',
    name: 'Zugriffspunkte',
    eyebrow: 'Schalten vor Ort',
    description:
      'Lesen Identität lokal aus und setzen Regeln an Tür, Tor oder Maschine in eine belastbare Freigabe um.',
    imageUrl: '/device/tor-2.jpg',
    imageAlt: 'Zugriffspunkt für Tür oder Maschine',
    featured: true,
    productIds: ['access-point-nfc', 'schuetz-modul-32a'],
  },
  {
    id: 'gateways',
    slug: 'gateways',
    name: 'Gateways & Steuerung Module',
    eyebrow: 'Netz und Koordination',
    description:
      'Verbindet Regeln, Geräte, Integrationen und lokalen Betrieb zu einer stabilen Infrastruktur pro Standort oder Gebäude.',
    imageUrl: '/gateway/mounted.jpg',
    imageAlt: 'Montiertes Mardu IP500 Gateway',
    featured: true,
    productIds: ['gateway-pro'],
  },
  {
    id: 'credentials',
    slug: 'credentials',
    name: 'NFC-Tags & Schlüsselkarte',
    eyebrow: 'Identifikation',
    description:
      'Als Schlüsselanhänger oder als Karte für dein Potmonete Mardu NFC-Tags für dein Betrieb.',
    imageUrl: '/device/render.png',
    imageAlt: 'Produktvisual für Identifikations- und Credential-Bereich',
    featured: true,
    productIds: ['nfc-tag-mifare', 'nfc-card-mifare'],
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Zubehör & Erweiterungen',
    eyebrow: 'Erweitern statt komplett neu kaufen',
    description:
      'Schütze, Relais und Ergänzungen, um Maschinen und Türen in die Infrastruktur sauber einzubinden.',
    imageUrl: '/configurator/32a.jpg',
    imageAlt: 'Leistungsstarke Maschinenanbindung und Zubehör',
    productIds: ['schuetz-modul-32a'],
  },
  {
    id: 'bundles',
    slug: 'bundles',
    name: 'Starter-Sets',
    eyebrow: 'Schneller Einstieg',
    description:
      'Vorkuratierte Kombinationen für die ersten Türen, Maschinen und Sclüsselkarten, damit Projekte schneller greifbar werden.',
    imageUrl: '/_A7_9094_quer.jpg',
    imageAlt: 'Mardu Hardware im Werkstattbetrieb',
    productIds: ['starter-kit-workshop'],
  },
];

export const catalogTechnologies: CatalogTechnologyDto[] = [
  {
    id: 'nfc',
    slug: 'nfc',
    name: 'NFC',
    description: 'Für kurze, robuste Identifikation direkt am Leser oder Träger.',
    imageUrl: '/logos/NFC.svg',
    imageAlt: 'NFC Technologie-Logo',
    visualLabel: 'NFC',
  },
  {
    id: 'mifare',
    slug: 'mifare',
    name: 'NXP Mifare Ev2-3',
    description: 'Bewährte Identifikation und Kopierschutz für Schlüsselkarten',
    imageUrl: '/logos/MIFARE.svg',
    imageAlt: 'Mifare Technologie-Logo',
    visualLabel: 'MIFARE',
  },
  {
    id: 'bluetooth-le',
    slug: 'bluetooth-le',
    name: 'Bluetooth LE',
    description: 'Für mobile Keys, App-basierte Übergaben und betreute oder temporäre Freigaben.',
    imageUrl: '/logos/Bluetooth.svg',
    imageAlt: 'Bluetooth LE Technologie-Logo',
    visualLabel: 'BLE',
  },
  {
    id: 'ip500',
    slug: 'ip500',
    name: 'IP500',
    description: 'Funkbasierte Gebäude- und Gerätekommunikation für stabile lokale Freigabelogik.',
    imageUrl: '/logos/ip500.svg',
    imageAlt: 'IP500 Technologie-Logo',
    visualLabel: 'IP500',
  },
  {
    id: 'app-key',
    slug: 'app-key',
    name: 'App Key',
    description: 'Digitale Schlüsselübergabe für betreute, temporäre oder mobile Berechtigungen.',
    visualLabel: 'APP',
  },
];

export const catalogCarriers: CatalogCarrierDto[] = [
  {
    id: 'nfc-tag',
    slug: 'nfc-tag',
    name: 'NFC-Tag',
    description: 'Kompakter Träger für Werkstatt, Labor und Gerätefreigabe.',
    technologyLabel: 'NFC / RFID',
    visualLabel: 'TAG',
  },
  {
    id: 'access-card',
    slug: 'access-card',
    name: 'Key Card',
    description: 'Klassische Kartenausgabe für Nutzergruppen, Kurse und Standorte.',
    technologyLabel: 'RFID / NFC',
    visualLabel: 'CARD',
  },
  {
    id: 'key-fob',
    slug: 'key-fob',
    name: 'Key Fob',
    description: 'Robuster Schlüsselanhänger für stark beanspruchte Nutzung im Alltag.',
    technologyLabel: 'RFID / NFC',
    visualLabel: 'FOB',
  },
  {
    id: 'digital-key',
    slug: 'digital-key',
    name: 'Digital Key',
    description: 'Mobil vergebbare Berechtigungen für temporäre oder betreute Zugänge.',
    technologyLabel: 'Bluetooth LE / App Key',
    visualLabel: 'APP',
  },
];
