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
    label: 'Einführung',
    description: 'Schrittweise starten',
    href: '#einfuehrung',
  },
  {
    type: 'link',
    index: '07',
    label: 'Kontakt',
    description: 'Standortgespräch',
    href: '#kontakt',
  },
];

export const homepageHero = {
  primaryAction: { label: 'Standort besprechen', href: '/contact' },
  secondaryAction: { label: 'So funktioniert Mardu', href: '#system' },
  rotatingAccessPoints: ['Maschine', 'Tür', 'Schranke', 'Werkstatt'],
  trustSignals: [
    {
      label: 'Verk.-SichPfl.',
      title: 'Verkehrssicherungspflicht',
    },
    {
      label: 'BetrSichV',
      title: 'Betriebssicherheitsverordnung',
    },
    {
      label: 'DGUV',
      title: 'Vorgaben der Deutschen Gesetzlichen Unfallversicherung',
    },
    {
      label: 'DSGVO',
      title: 'Datenschutz-Grundverordnung',
    },
    {
      label: 'Nachrüstbar',
      title: 'Schrittweise nachrüstbar',
    },
    {
      label: 'Designed in Germany',
      title: 'Designed in Germany',
    },
  ],
} as const;

export const customerProof = {
  label: 'Kunden & Partner',
  description:
    'Gemeinsam mit Kunden, Hochschulen und Technologiepartnern für den Betrieb entwickelt.',
  partners: [
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
    {
      name: 'KIT-Gründerschmiede',
      logoSrc: '/partners/kit-gruenderschmiede.png',
      width: 1564,
      height: 346,
      presentation: 'monochrome',
    },
    {
      name: 'SmartCityHouse Osnabrück',
      logoSrc: '/partners/smartcityhouse-osnabrueck.jpg',
      width: 701,
      height: 317,
      presentation: 'light-background-monochrome',
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
    title: 'Identität zuordnen',
    description:
      'Ausweis, Zugangs-Tag oder angebundenes Identitätssystem ordnen Zugriffe eindeutig einer Person zu.',
  },
  {
    index: '02',
    title: 'Regeln prüfen',
    description:
      'Rollen, Qualifikationen, Bereiche und Zeitfenster bestimmen, welcher Zugriff vorgesehen ist.',
  },
  {
    index: '03',
    title: 'Freigabe wirkt vor Ort',
    description: 'Die geprüfte Entscheidung wirkt an Maschine, Tür, Tor oder Schranke.',
  },
  {
    index: '04',
    title: 'Ressourcen zentral überblicken',
    description: 'Verantwortliche verwalten Ressourcen, Zustände und Ereignisse an einer Stelle.',
  },
];

export const permissionsStory: ReadonlyArray<StickyStoryItem> = [
  {
    id: 'identities',
    index: '01',
    label: 'Identitäten',
    title: 'Menschen, Rollen und Qualifikationen an einem Ort.',
    description: 'Personen, Identmedien, Rollen und Qualifikationen werden zentral gepflegt.',
    emphasis: 'Änderungen gelten sofort am Zugangspunkt.',
    imageSrc: '/verwaltungssoftware/benutzerverwaltung.png',
    imageAlt: 'Mardu-Verwaltungssoftware mit Benutzerkonten und zugeordneten Identmedien',
  },
  {
    id: 'events',
    index: '02',
    label: 'Ereignisse',
    title: 'Jeder Zugriff bleibt nachvollziehbar.',
    description: 'Freigaben und abgelehnte Zugriffe werden mit ihrem Kontext sichtbar.',
    emphasis: 'Verantwortliche sehen, was wann an welchem Zugangspunkt passiert ist.',
    imageSrc: '/verwaltungssoftware/zugriffsprotokolle.png',
    imageAlt: 'Mardu-Verwaltungssoftware mit Zugriffsprotokollen und Ereignissen',
  },
  {
    id: 'access-points',
    index: '03',
    label: 'Infrastruktur',
    title: 'Alle Zugangspunkte. Eine Übersicht.',
    description:
      'Maschinen, Türen, Tore und weitere Ressourcen bleiben Teil derselben Verwaltungsstruktur.',
    emphasis: 'Aus Einzellösungen wird ein gemeinsames System.',
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
    title: 'Qualifikation steuert Maschinenfreigaben',
    description:
      'Identität, Einweisung, Rolle und Zeitfenster bestimmen, wer eine Maschine einschalten und nutzen darf.',
    imageSrc: '/landing/mardu-modern-cnc.webp',
    imageAlt: 'Mardu-Terminal an einer modernen CNC-Maschine',
  },
  {
    index: '02',
    label: 'Zutritt',
    title: 'Ein Schließsystem arbeitet mit anderen Systemen zusammen',
    description:
      'Türen und Bereiche werden gemeinsam verwaltet. Bestehende Identitäts-, Gebäude- und Drittsysteme lassen sich über Schnittstellen anbinden.',
    imageSrc: '/landing/mardu-gebaeudezugang-tuere.webp',
    imageAlt: 'Elektronischer Schließzylinder an einem Gebäudeeingang',
  },
  {
    index: '03',
    label: 'Zufahrt',
    title: 'Rollen und Zeiten steuern Zufahrten',
    description:
      'Fahrzeug- und Lieferzugänge können nach Person, Rolle, Bereich oder vorgesehenem Zeitfenster organisiert werden.',
    imageSrc: '/configurator/tor.jpg',
    imageAlt: 'Mardu-Zugangsterminal an einem Zufahrtstor',
  },
  {
    index: '04',
    label: 'Erweiterbar',
    title: 'Eine Logik für weitere Ressourcen',
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
    title: 'Nur passende Personen kommen weiter',
    description:
      'Unterweisungen, Qualifikationen, Rollen und Zeitregeln entscheiden gemeinsam, ob eine Maschine oder Tür freigegeben wird.',
  },
  {
    title: 'Mehr Nutzung. Weniger Routine.',
    description:
      'Berechtigte Personen nutzen vorgesehene Ressourcen selbstständig. Kritische Freigaben können bei Bedarf ein Vier-Augen-Prinzip verlangen.',
  },
  {
    title: 'Nachweise statt Listen',
    description:
      'Freigaben, abgelehnte Zugriffe und vereinbarte Nutzungszeiten werden zentral nachvollziehbar – für interne Compliance, Aufsicht und Versicherung.',
    status: 'Compliance',
  },
];

export const useCases: ReadonlyArray<HomepageLinkedNumberedItem> = [
  {
    index: '01',
    title: 'Unternehmenswerkstätten',
    description:
      'Integrationen zu Identitäts-, Zutritts- und Verwaltungssystemen binden bestehende Infrastruktur ein.',
    href: '/solutions#solution-tab-unternehmenswerkstaetten',
  },
  {
    index: '02',
    title: 'Labore',
    description:
      'Rollen, Qualifikationen und Buchungen bestimmen, wer wann welche Maschine nutzen darf.',
    href: '/solutions#solution-tab-labore',
  },
  {
    index: '03',
    title: 'Hochschulen & Universitäten',
    description:
      'Studierende, Beschäftigte, Lehrende und externe Nutzergruppen greifen mit passenden Rollen und Rechten auf gemeinsam genutzte Ressourcen zu.',
    href: '/solutions#solution-tab-hochschulen-und-universitaeten',
  },
  {
    index: '04',
    title: 'Makerspaces & offene Werkstätten',
    description:
      'Längere Öffnungszeiten werden leichter planbar; dokumentierte Einweisungen, Freigaben und Zuständigkeiten schaffen Klarheit in rechtlichen Graubereichen.',
    href: '/solutions#solution-tab-makerspaces-und-offene-werkstaetten',
  },
];

export const rolloutSteps: ReadonlyArray<HomepageNumberedItem> = [
  {
    index: '01',
    title: 'Pilotbereich auswählen',
    description:
      'Wir wählen eine repräsentative Maschine, Tür oder Zufahrt und legen Nutzergruppen, Betriebszeiten und Erfolgskriterien fest.',
  },
  {
    index: '02',
    title: 'Technik und Regeln vorbereiten',
    description:
      'Wir prüfen Schnittstellen, Identmedien und das Sicherheitskonzept und bilden Rollen, Qualifikationen und Zuständigkeiten ab.',
  },
  {
    index: '03',
    title: 'Im Betrieb erproben',
    description:
      'Der Zugangspunkt läuft im Alltag. Wir prüfen Freigaben, Ausnahmen und Ausfallverhalten anhand der vereinbarten Kriterien.',
  },
  {
    index: '04',
    title: 'Rollout entscheiden',
    description:
      'Wir werten den Pilot aus, schärfen Regeln nach und planen gezielt weitere Ressourcen, Bereiche oder Standorte.',
  },
];

export const complianceProofs: ReadonlyArray<HomepageNumberedItem> = [
  {
    index: '01',
    title: 'Qualifikationen im Blick',
    description:
      'Gültigkeiten von Einweisungen und Qualifikationen bleiben zentral nachvollziehbar.',
  },
  {
    index: '02',
    title: 'Entscheidungen dokumentiert',
    description:
      'Erteilte und abgelehnte Freigaben werden mit Zeitpunkt und Zugangspunkt protokolliert.',
  },
  {
    index: '03',
    title: 'Nachweise bereitstellen',
    description:
      'Gefilterte Protokolle lassen sich für interne Prüfungen, Aufsicht und Versicherungen bereitstellen.',
  },
];

export const featureItems: ReadonlyArray<HomepageTextItem> = [
  {
    title: 'Identitäten & RBAC',
    description:
      'Nutzer, Gruppen und Rollen mit permission-basiertem RBAC und effektiven Rechten verwalten.',
  },
  {
    title: 'SSO & sichere Anmeldung',
    description: 'LDAP, OIDC, Passkeys/WebAuthn und TOTP samt Sitzungswiderruf zentral steuern.',
  },
  {
    title: 'Freigaben & Zeitpläne',
    description:
      'Berechtigungen für Personen, Gruppen oder Zugangs-Tags mit Gültigkeit und mehreren Zeitfenstern definieren.',
  },
  {
    title: 'Kompetenzen & Badges',
    description:
      'OpenBadges und lokale Kompetenzcodes als prüfbare Bedingung in Zugriffsentscheidungen einsetzen.',
  },
  {
    title: 'Access Points & Reader',
    description:
      'Maschinen, Türen, Zonen und Reader verwalten, gruppieren und Geräten eindeutig zuordnen.',
  },
  {
    title: 'Sicheres Tag-Enrollment',
    description:
      'DESFire-Tags per Smartphone, QR-Auftrag und kurzlebigem Enrollment-Token beschreiben.',
  },
  {
    title: 'Geräte & OTA-Updates',
    description:
      'Firmwarestände, Heartbeats und Gerätezustände überwachen; signierte Updates per OTA verteilen.',
  },
  {
    title: 'Audit & Echtzeit',
    description:
      'Zugriffe mit Reason Codes protokollieren und Zustände über MQTT sowie SignalR übertragen.',
  },
];

export const mediaBriefs = {
  accessPanorama: {
    index: 'P02',
    type: 'Produktrendering',
    title: 'Maschine, Tür, Tor. Eine Produktfamilie.',
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
  rolloutMap: {
    index: 'P06',
    type: 'Infografik',
    title: 'Vom Pilot zur Standortstruktur',
    brief:
      'Isometrische Standortkarte mit einem markierten Pilotbereich und späteren Erweiterungen an Maschine, Tür und Schranke.',
    format: 'Isometrie · 3:2 · Halftone-Akzent',
  },
  contactScene: {
    index: 'P07',
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
      'Mardu steuert CNC-Maschinen, Werkstattmaschinen, Türen, Tore, Schranken, Zufahrten, Schließfächer und weitere elektrisch schaltbare Ressourcen. Bestehende Steuerungen, Identmedien und Drittsysteme lassen sich je nach Schnittstelle einbinden.',
  },
  {
    question: 'Funktioniert Mardu mit jeder Maschine?',
    answer:
      'Grundsätzlich lässt sich Mardu an viele Maschinen anbinden; der konkrete Umfang hängt von Steuerung und Einsatzkontext ab. Mardu kann beispielsweise einen einfachen Schlüsselschalter ersetzen und nur die Bedienfreigabe steuern, ohne die gesamte Maschine auszuschalten. Schutzkonzept und sicherheitsgerichtete Funktionen bleiben davon unberührt.',
  },
  {
    question: 'Können vorhandene Ausweise genutzt werden?',
    answer:
      'Oft ja. Welche Identmedien eingebunden werden können, hängt vom Karten-, Leser- und Identitätssystem ab. Kompatibilität und Schnittstellen prüfen wir für den Standort.',
  },
  {
    question: 'Ist Mardu eine sicherheitsgerichtete Steuerung?',
    answer:
      'Nein. Mardu ist die Plattform, die Listen und manuelle Freigaben ersetzt, Qualifikationen prüfbar macht und Zugangsregeln am Nutzungspunkt durchsetzt. Damit hilft Mardu zu verhindern, dass beliebige Personen Maschinen einschalten. Mardu bleibt ein Werkzeug im organisatorischen Schutzkonzept: Unterweisungen, Gefährdungsbeurteilungen und erforderliche Aufsicht kann es weder durchführen noch ersetzen; Not-Halt und Schutzeinrichtungen übernimmt es ebenfalls nicht.',
  },
  {
    question: 'Was passiert bei Netzwerk-, Server- oder Funkproblemen?',
    answer:
      'Freigaben laufen lokal auf der Mardu-Basisstation oder einem lokalen Server und bleiben damit unabhängig von einer dauerhaften Internetverbindung. Das vermaschte IP500-Funknetz kann Daten über alternative Funkwege weiterleiten. Zusätzliche Mardu-Gateways schaffen Redundanz und können Verfügbarkeit sowie Ausfallsicherheit erhöhen. Zulässige Zustände und Rückfallebenen legen wir je Ressource fest.',
  },
  {
    question: 'Warum nutzt Mardu IP500 statt Werkstatt-WLAN?',
    answer:
      'Bei Freigaben zählt nicht eine hohe Datenrate, sondern dass wenige, entscheidende Daten zuverlässig ankommen. Deshalb ist Mardu nicht vom Werkstatt-WLAN abhängig, sondern nutzt ein eigenes IP500-Mesh auf 868 MHz und 2,4 GHz. Die vermaschte, verschlüsselte Kommunikation kann Daten über alternative Funkwege weiterreichen und schafft so eine robuste Grundlage für Maschinen- und Türfreigaben.',
  },
  {
    question: 'Wie unterstützt Mardu bei Betreiberpflichten und Nachweisen?',
    answer:
      'Mardu macht nachvollziehbar, wer wann mit welcher Qualifikation eine Freigabe erhalten oder nicht erhalten hat. Protokolle lassen sich filtern, exportieren und als Bericht für interne Prüfungen, Aufsicht, Versicherungen oder DGUV-Nachweise bereitstellen. So bleiben Entscheidungen belegbar, statt in Listen und Einzelabsprachen zu verschwinden. Gefährdungsbeurteilung, Rechtsberatung und Schutzeinrichtungen bleiben Aufgabe der Verantwortlichen.',
  },
  {
    question: 'Welche Daten werden protokolliert?',
    answer:
      'Protokolliert werden nur die für den vereinbarten Zweck benötigten Daten. Rollen, Zugriffe, Aufbewahrung und Löschung werden projektbezogen festgelegt. Auswertungen zu Energie oder Auslastung sind kein pauschal aktivierter Standard.',
  },
] as const;
