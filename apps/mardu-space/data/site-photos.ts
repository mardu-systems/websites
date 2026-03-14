/**
 * Route metadata for a photo that is already rendered somewhere in the product UI.
 * This keeps the Fotos page limited to assets that visitors can actually see on the live site.
 */
export type SitePhotoUsage = {
  label: string;
  href: string;
};

/**
 * Curated DTO for photographic assets that are already used in the UI.
 * Non-photo assets such as logos, icons, cutouts, favicons, or decorative graphics stay excluded.
 */
export type SitePhotoAsset = {
  src: string;
  alt: string;
  title: string;
  description: string;
  usedOn: SitePhotoUsage[];
};

export const sitePhotoAssets: SitePhotoAsset[] = [
  {
    src: '/_A7_9094_quer.jpg',
    alt: 'mardu.space-System in einer Werkstatt',
    title: 'Werkstattansicht',
    description: 'Leitmotiv der Startseite und gleichzeitig Hero-Motiv im Hardware-Bereich.',
    usedOn: [
      { label: 'Startseite', href: '/' },
      { label: 'Hardware', href: '/system' },
    ],
  },
  {
    src: '/gateway/mounted.jpg',
    alt: 'Gateway und Zugriffspunkt in der Werkstatt',
    title: 'Gateway montiert',
    description:
      'Zentrales Hardware-Motiv für die Systemseite und Produktdarstellung des Gateways.',
    usedOn: [{ label: 'Hardware', href: '/system' }],
  },
  {
    src: '/gateway/inside.jpg',
    alt: 'Innenleben des Gateways',
    title: 'Gateway innen',
    description: 'Detailaufnahme des geöffneten Gateways auf der Hardware-Seite.',
    usedOn: [{ label: 'Hardware', href: '/system' }],
  },
  {
    src: '/device/tor-2.jpg',
    alt: 'Innenleben des Gateways',
    title: 'Zugriffspunkt Detail',
    description: 'Produktfoto des Zugriffspunkts innerhalb der Hardware-Präsentation.',
    usedOn: [{ label: 'Hardware', href: '/system' }],
  },
  {
    src: '/configurator/32a.jpg',
    alt: 'Drehstrom-Stecker',
    title: 'Drehstrom',
    description:
      'Visual für Drehstrom-Maschinen im Konfigurator und in den Einsatzszenarien der Startseite.',
    usedOn: [
      { label: 'Startseite', href: '/' },
      { label: 'Konfigurator', href: '/configurator' },
    ],
  },
  {
    src: '/configurator/schuko.jpg',
    alt: 'Schuko-Stecker',
    title: 'Schuko',
    description: 'Motiv für einphasige Maschinen im Konfigurator und auf der Startseite.',
    usedOn: [
      { label: 'Startseite', href: '/' },
      { label: 'Konfigurator', href: '/configurator' },
    ],
  },
  {
    src: '/configurator/tuer.jpg',
    alt: 'Elektrische Tür',
    title: 'Türzugang',
    description: 'Türmotiv für den Konfigurator.',
    usedOn: [{ label: 'Konfigurator', href: '/configurator' }],
  },
  {
    src: '/configurator/tor.jpg',
    alt: 'Elektrisches Tor',
    title: 'Torzugang',
    description:
      'Motiv für Tore und Schranken im Konfigurator und in den Einsatzszenarien der Startseite.',
    usedOn: [
      { label: 'Startseite', href: '/' },
      { label: 'Konfigurator', href: '/configurator' },
    ],
  },
  {
    src: '/configurator/fridge.jpg',
    alt: 'Getränkekühlschrank',
    title: 'Getränkekühlschrank',
    description: 'Szenariofoto für den optionalen Kühlschrank-Anwendungsfall im Konfigurator.',
    usedOn: [{ label: 'Konfigurator', href: '/configurator' }],
  },
  {
    src: '/configurator/device.jpg',
    alt: 'Zentrales Freigabegerät',
    title: 'Zentrale Freigabe',
    description: 'Visual für zentrale Freigabesysteme im Konfigurator.',
    usedOn: [{ label: 'Konfigurator', href: '/configurator' }],
  },
];
