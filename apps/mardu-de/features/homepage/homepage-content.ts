import type { HeaderNavLinkDto } from '@mardu/layout/types';
import type { StickyStoryItem } from '@mardu/sections';

export interface HomepageNavigationItem extends HeaderNavLinkDto {
  index: string;
  description: string;
}

export interface HomepageTextItem {
  title: string;
  description: string;
}

export interface HomepageNumberedItem extends HomepageTextItem {
  index: string;
}

export interface HomepageLinkedNumberedItem extends HomepageNumberedItem {
  href: string;
}

export interface HomepageStatusItem extends HomepageTextItem {
  status?: string;
}

export interface HomepageMediaBrief {
  index: string;
  type: 'Fotografie' | 'Produktrendering' | 'Infografik' | 'Interface-Motion';
  title: string;
  brief: string;
  format: string;
}

export const homepageNavigation: ReadonlyArray<HomepageNavigationItem> = [
  { type: 'link', index: '01', label: 'System', description: 'Alles verbunden', href: '#system' },
  {
    type: 'link',
    index: '02',
    label: 'Zugänge',
    description: 'Maschine bis Schranke',
    href: '#zugaenge',
  },
  {
    type: 'link',
    index: '03',
    label: 'Berechtigungen',
    description: 'Identität & Regeln',
    href: '#berechtigungen',
  },
  {
    type: 'link',
    index: '04',
    label: 'Nutzen',
    description: 'Steuern & verstehen',
    href: '#nutzen',
  },
  {
    type: 'link',
    index: '05',
    label: 'Einsatzbereiche',
    description: 'Lehre & Betrieb',
    href: '#einsatzbereiche',
  },
  {
    type: 'link',
    index: '06',
    label: 'Integration',
    description: 'Bestand anbinden',
    href: '#integration',
  },
  {
    type: 'link',
    index: '07',
    label: 'Einführung',
    description: 'Schrittweise starten',
    href: '#einfuehrung',
  },
  {
    type: 'link',
    index: '08',
    label: 'Kontakt',
    description: 'Standortgespräch',
    href: '#kontakt',
  },
];

export const homepageHero = {
  primaryAction: { label: 'Jetzt beraten lassen', href: '/contact' },
  secondaryAction: { label: 'System verstehen', href: '#system' },
  rotatingAccessPoints: ['Maschine', 'Tür', 'Schranke', 'Werkstatt'],
  trustSignals: ['DSGVO im Projekt', 'Schrittweise nachrüstbar', 'Designed in Germany'],
} as const;

export const customerProof = {
  label: 'Kunden & Partner',
  description:
    'Gemeinsam mit Hochschulen und Technologiepartnern für den realen Betrieb entwickelt.',
  partners: [
    {
      name: 'Karlsruher Institut für Technologie',
      logoSrc: '/partners/kit.svg',
      width: 130,
      height: 75,
      presentation: 'monochrome',
    },
    {
      name: 'FH Aachen',
      logoSrc: '/partners/fh-aachen.svg',
      width: 88,
      height: 300,
      presentation: 'rotated-monochrome',
    },
    {
      name: 'Hochschule Osnabrück',
      logoSrc: '/partners/hochschule-osnabrueck.svg',
      width: 450,
      height: 135,
      presentation: 'monochrome',
    },
    {
      name: 'ARTandTECH.space',
      logoSrc: '/partners/artandtech-space.svg',
      width: 1000,
      height: 543,
      presentation: 'monochrome',
    },
    {
      name: 'FH Münster',
      logoSrc: '/partners/fh-muenster.svg',
      width: 316,
      height: 49,
      presentation: 'monochrome',
    },
    {
      name: 'RISE – StartUp!Lab der Hochschule Osnabrück',
      logoSrc: '/partners/rise-hochschule-osnabrueck.svg',
      width: 450,
      height: 135,
      presentation: 'monochrome',
    },
    {
      name: 'siganet',
      logoSrc: '/partners/siganet.svg',
      width: 212,
      height: 49,
      presentation: 'monochrome',
    },
    {
      name: 'TCC – The Cloud Company',
      logoSrc: '/partners/tcc.svg',
      width: 180,
      height: 180,
      presentation: 'native-square',
    },
  ],
  links: [
    { index: '01', label: 'Lösungen', href: '/solutions' },
    { index: '02', label: 'Produkte', href: '/products' },
    { index: '03', label: 'Projekt besprechen', href: '/contact' },
  ],
} as const;

export const fundingProof = {
  label: 'Gefördert durch',
  description:
    'Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und Klimaschutz über den Europäischen Sozialfonds Plus (ESF Plus) das Programm Existenzgründungen aus der Wissenschaft (EXIST) in Deutschland.',
  logos: [
    {
      src: '/logos/bmwk.svg',
      alt: 'Bundesministerium für Wirtschaft und Klimaschutz',
      width: 537,
      height: 267,
    },
    {
      src: '/logos/eu_esf.svg',
      alt: 'Kofinanziert von der Europäischen Union – Europäischer Sozialfonds Plus',
      width: 301,
      height: 274,
    },
    {
      src: '/logos/exist.svg',
      alt: 'EXIST – Existenzgründungen aus der Wissenschaft',
      width: 354,
      height: 224,
    },
  ],
} as const;

export const systemLayers: ReadonlyArray<HomepageNumberedItem> = [
  {
    index: '01',
    title: 'Eine Identität',
    description: 'Ausweis, Tag oder angebundenes Identitätssystem ordnen eine Person eindeutig zu.',
  },
  {
    index: '02',
    title: 'Klare Regeln',
    description:
      'Rollen, Qualifikationen, Bereiche und Zeitfenster bestimmen die vorgesehene Berechtigung.',
  },
  {
    index: '03',
    title: 'Viele Zugänge',
    description:
      'Mardu bringt die Entscheidung an Maschine, Tür, Tor, Schranke oder einen weiteren Zugangspunkt.',
  },
  {
    index: '04',
    title: 'Zentrale Übersicht',
    description:
      'Verantwortliche verwalten Ressourcen, Zustände und vorgesehene Ereignisse an einer Stelle.',
  },
];

export const permissionsStory: ReadonlyArray<StickyStoryItem> = [
  {
    id: 'identities',
    index: '01',
    label: 'Identitäten',
    title: 'Menschen, Rollen und Qualifikationen zentral verwalten.',
    description:
      'Personen, Identmedien, Rollen und Qualifikationen werden an einer Stelle gepflegt.',
    emphasis: 'Eine Änderung wirkt bis zur physischen Freigabe.',
    imageSrc: '/verwaltungssoftware/benutzerverwaltung.png',
    imageAlt: 'Mardu-Verwaltungssoftware mit Benutzerkonten und zugeordneten Identmedien',
  },
  {
    id: 'events',
    index: '02',
    label: 'Ereignisse',
    title: 'Zugriffe nachvollziehen, statt Listen abzugleichen.',
    description: 'Freigaben und abgelehnte Zugriffe werden mit dem vorgesehenen Kontext sichtbar.',
    emphasis: 'Verantwortliche sehen, was wann an welchem Zugangspunkt passiert ist.',
    imageSrc: '/verwaltungssoftware/zugriffsprotokolle.png',
    imageAlt: 'Mardu-Verwaltungssoftware mit Zugriffsprotokollen und Ereignissen',
  },
  {
    id: 'access-points',
    index: '03',
    label: 'Infrastruktur',
    title: 'Geräte und Zugangspunkte gemeinsam im Blick behalten.',
    description:
      'Maschinen, Türen, Tore und weitere Ressourcen bleiben Teil derselben Verwaltungsstruktur.',
    emphasis: 'So wird aus einzelnen Geräten ein steuerbares System.',
    imageSrc: '/verwaltungssoftware/zutrittspunkte-und-geraete.png',
    imageAlt: 'Mardu-Verwaltungssoftware mit verwalteten Geräten und Zugangspunkten',
  },
];

export const accessAreas: ReadonlyArray<
  HomepageStatusItem & {
    index: string;
    label: string;
    imageSrc: string;
    imageAlt: string;
    imageCredit?: { label: string; href: string };
  }
> = [
  {
    index: '01',
    label: 'Kernanwendung',
    title: 'Maschinen & Anlagen',
    description:
      'Maschinenfreigaben werden mit Identität, Einweisung, Rolle und Zeitregeln verbunden. Die technische Einbindung wird für jede Anlage geprüft.',
    imageSrc: '/landing/mardu-modern-cnc.webp',
    imageAlt: 'Mardu-Terminal an einer modernen CNC-Maschine',
  },
  {
    index: '02',
    label: 'Zutritt',
    title: 'Türen & Räume',
    description:
      'Gebäude, Werkstätten, Labore und einzelne Bereiche lassen sich in dieselbe Berechtigungsstruktur einordnen.',
    imageSrc: '/landing/mardu-gebaeudezugang-tuere.webp',
    imageAlt: 'Elektronischer Schließzylinder an einem Gebäudeeingang',
  },
  {
    index: '03',
    label: 'Zufahrt',
    title: 'Tore & Schranken',
    description:
      'Fahrzeug- und Lieferzugänge können nach Person, Rolle, Bereich oder vorgesehenem Zeitfenster organisiert werden.',
    imageSrc: '/configurator/tor.jpg',
    imageAlt: 'Mardu-Zugangsterminal an einem Zufahrtstor',
  },
  {
    index: '04',
    label: 'Erweiterbar',
    title: 'Schließfächer & Ressourcen',
    description:
      'Auch Schließfächer und weitere elektrisch schaltbare Ressourcen können Teil derselben Berechtigungslogik werden.',
    imageSrc: '/landing/modern-secure-lockers.webp',
    imageAlt: 'Moderne nummerierte Schließfächer in einem Innenraum',
    imageCredit: {
      label: 'Foto: Jakub Zerdzicki · Pexels',
      href: 'https://www.pexels.com/photo/secure-lockers-in-a-modern-indoor-facility-36598736/',
    },
  },
];

export const permissionSteps: ReadonlyArray<HomepageNumberedItem> = [
  {
    index: '01',
    title: 'Identifizieren',
    description: 'Person oder Fahrzeug am Zugang eindeutig zuordnen.',
  },
  {
    index: '02',
    title: 'Voraussetzungen prüfen',
    description: 'Rolle, Qualifikation, Bereich und Zeitfenster berücksichtigen.',
  },
  {
    index: '03',
    title: 'Freigeben',
    description: 'Den vorgesehenen Zugang organisatorisch schalten oder ablehnen.',
  },
  {
    index: '04',
    title: 'Dokumentieren',
    description: 'Ereignisse und Zustände entsprechend dem vereinbarten Zweck bereitstellen.',
  },
];

export const benefitItems: ReadonlyArray<HomepageStatusItem> = [
  {
    title: 'Zugänge steuern',
    description:
      'Berechtigungen werden nicht mehr getrennt für Schlüssel, Listen, Maschinen und Räume organisiert.',
  },
  {
    title: 'Nutzung ermöglichen',
    description:
      'Berechtigte Personen erhalten den vorgesehenen Zugang selbstständig, soweit Betriebs- und Aufsichtskonzept dies erlauben.',
  },
  {
    title: 'Überblick behalten',
    description:
      'Ressourcen, Regeln und Ereignisse werden zentral sichtbar. Auslastungs-, Energie- und Anomalieauswertungen bleiben ein gesonderter Pilot.',
    status: 'Datenpilot',
  },
];

export const useCases: ReadonlyArray<HomepageLinkedNumberedItem> = [
  {
    index: '01',
    title: 'Unternehmenswerkstätten',
    description:
      'Maschinen, Räume und Rollen werden zu einem nachvollziehbaren Werkstattbetrieb verbunden.',
    href: '/solutions/unternehmenswerkstaetten',
  },
  {
    index: '02',
    title: 'Labore',
    description:
      'Zutritt, Gerätefreigaben und wechselnde Nutzergruppen laufen kontrolliert zusammen.',
    href: '/solutions/labore',
  },
  {
    index: '03',
    title: 'Hochschulen & Universitäten',
    description:
      'Campus, Fachbereiche, Werkstätten und Spezialräume folgen einer gemeinsamen Zugriffslogik.',
    href: '/solutions/hochschulen-und-universitaeten',
  },
  {
    index: '04',
    title: 'Makerspaces & offene Werkstätten',
    description:
      'Einweisungen und Maschinenfreigaben ermöglichen Nutzung auch ohne permanente Aufsicht.',
    href: '/solutions/makerspaces-und-offene-werkstaetten',
  },
];

export const retrofitPoints = [
  'Maschine oder Zugangspunkt technisch und organisatorisch prüfen',
  'Schnittstelle, Schutzkonzept und gewünschtes Verhalten klären',
  'Vorhandene Identmedien und Systeme nach technischer Prüfung einbinden',
  'Ausfallverhalten, Zuständigkeiten und Datenzweck vorab festlegen',
] as const;

export const rolloutSteps: ReadonlyArray<HomepageNumberedItem> = [
  {
    index: '01',
    title: 'Anwendungsfall wählen',
    description: 'Einen repräsentativen Zugangspunkt und die beteiligten Rollen festlegen.',
  },
  {
    index: '02',
    title: 'Passung prüfen',
    description: 'Technik, Abläufe und Verantwortlichkeiten vorab klären.',
  },
  {
    index: '03',
    title: 'Pilot betreiben',
    description: 'Freigaben und Ausfallverhalten im Alltag prüfen.',
  },
  {
    index: '04',
    title: 'Gezielt erweitern',
    description: 'Erst nach der Auswertung weitere Ressourcen anbinden.',
  },
];

export const mediaBriefs = {
  accessPanorama: {
    index: 'P02',
    type: 'Produktrendering',
    title: 'Vier Zugangspunkte, eine Produktfamilie',
    brief:
      'Freigestellte 3D-Szene mit Mardu-Terminal an Maschine, Schließzylinder, Torsteuerung und Schranke.',
    format: 'Panorama · 16:7 · transparenter Hintergrund',
  },
  permissionDiagram: {
    index: 'P03',
    type: 'Interface-Motion',
    title: 'Berechtigung wird am Ort der Nutzung wirksam',
    brief:
      'Kurze Interface-Sequenz: Person auswählen, Regel zuordnen, Zugangspunkt aktivieren und Status am Gerät sehen.',
    format: 'Loop · 4:3 · ohne Ton',
  },
  operationsDashboard: {
    index: 'P04',
    type: 'Infografik',
    title: 'Ressourcen und Ereignisse im Überblick',
    brief:
      'Keine Fantasie-KPI: nur verifizierbare Zustände, Berechtigungen und illustrative Pilotdaten für Nutzung und Energie.',
    format: 'Dashboard-Ausschnitt · 16:10',
  },
  useCaseScene: {
    index: 'P05',
    type: 'Fotografie',
    title: 'Ein Standort, mehrere Nutzergruppen',
    brief:
      'Studierende, Werkstattteam und Lieferverkehr in einer glaubwürdigen Campus- oder Betriebsumgebung mit Mardu-Zugangspunkten.',
    format: 'Querformat · 16:9 · dokumentarisch',
  },
  retrofitExplodedView: {
    index: 'P06',
    type: 'Infografik',
    title: 'Nachrüstung ohne falsches Universalversprechen',
    brief:
      'Explosionsansicht einer geprüften Anbindung: Identmedium, Mardu-Hardware, Schnittstelle, Bestandssteuerung und Verantwortungsgrenze.',
    format: 'Technische Grafik · 4:3',
  },
  rolloutMap: {
    index: 'P07',
    type: 'Infografik',
    title: 'Vom Pilot zur Standortstruktur',
    brief:
      'Isometrische Standortkarte mit einem markierten Pilotbereich und späteren Erweiterungen an Maschine, Tür und Schranke.',
    format: 'Isometrie · 3:2 · Halftone-Akzent',
  },
  contactScene: {
    index: 'P08',
    type: 'Fotografie',
    title: 'Standortgespräch in der Werkstatt',
    brief:
      'Mardu-Team und Betreiber direkt an einer Anlage; sachlich, nahbar und ohne gestellte Händedruck-Szene.',
    format: 'Querformat · 3:2 · Reportage',
  },
} as const satisfies Record<string, HomepageMediaBrief>;

export const faqItems = [
  {
    question: 'Welche Zugänge kann Mardu steuern?',
    answer:
      'Im Mittelpunkt stehen Maschinen und Anlagen. Zusätzlich können Türen, Tore, Schranken und weitere elektrisch schaltbare Zugangspunkte angebunden werden. Ob eine Einbindung passt, wird für die konkrete Ressource geprüft.',
  },
  {
    question: 'Funktioniert Mardu mit jeder Maschine?',
    answer:
      'Nein. Maschinentyp, vorhandene Steuerung, elektrische Einbindung, Schutzkonzept und gewünschter Ablauf müssen geprüft werden. Erst danach lässt sich der sinnvolle Umfang bestimmen.',
  },
  {
    question: 'Können vorhandene Ausweise genutzt werden?',
    answer:
      'Je nach Karten-, Leser- und Identitätssystem können vorhandene Identmedien eingebunden werden. Die konkrete Kompatibilität und benötigten Schnittstellen prüfen wir für den Standort.',
  },
  {
    question: 'Ist Mardu eine sicherheitsgerichtete Steuerung?',
    answer:
      'Nein. Mardu ist ein organisatorisches Freigabe- und Zugangssystem. Es ersetzt weder Not-Halt und Schutzeinrichtungen noch praktische Unterweisung, Gefährdungsbeurteilung oder erforderliche Aufsicht.',
  },
  {
    question: 'Was passiert bei Netzwerk-, Server- oder Funkproblemen?',
    answer:
      'Das vorgesehene Verhalten hängt von Betriebsmodell, lokaler Architektur und Ressource ab. Zulässige Zustände und Rückfallebenen werden vor der Einführung festgelegt und geprüft.',
  },
  {
    question: 'Welche Daten werden protokolliert?',
    answer:
      'Das richtet sich nach dem vereinbarten Zweck. Rollen, Zugriffe, Aufbewahrung und Löschung werden im Projekt konkretisiert. Auswertungen zu Energie, Auslastung oder Auffälligkeiten sind kein pauschal aktivierter Standard.',
  },
] as const;
