import type { FaqItem } from '@mardu/sections';
import type { LucideIcon } from 'lucide-react';
import { Activity, Boxes, Cpu, Network, ShieldCheck, Smartphone, Wifi } from 'lucide-react';

/**
 * DTO for a sellable hardware capability block on the `/system` page.
 */
export interface HardwareFeatureBlockDto {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholder?: {
    badge: string;
    title: string;
    description: string;
    icon?: LucideIcon;
  };
}

/**
 * DTO for comparing the available hardware product tiers.
 */
export interface HardwareVariantDto {
  id: string;
  name: string;
  badge?: string;
  tier: string;
  summary: string;
  suitableFor: string[];
  strengths: string[];
  recommendation?: string;
}

/**
 * DTO for compact trust signals on the hardware page.
 */
export interface HardwareTrustItemDto {
  title: string;
  icon: LucideIcon;
  description: string;
}

export const hardwareFeatureBlocks: HardwareFeatureBlockDto[] = [
  {
    id: 'access-point',
    eyebrow: 'Zugriffspunkt',
    title: 'Die lokale Entscheidung passiert direkt am Zugriffspunkt',
    description:
      'Der Zugriffspunkt liest Identität vor Ort und setzt die Entscheidung aus dem Regelwerk direkt an Tür, Tor oder Maschine um. Dadurch bleibt die Freigabe nicht organisatorisch, sondern wird technisch wirksam.',
    points: [
      'identifiziert Nutzer per NFC-Tags, Smartcards oder Smartphone (App Key)',
      'schaltet Maschinen und Zutrittspunkte lokal über verbaute Relais/Schütze',
      'meldet Ereignisse und Zustände zurück in die WebQ-Verwaltungsplattform',
    ],
    ctaLabel: 'Zum Access Point Pro',
    ctaHref: '/products/access-point-pro',
    imageSrc: '/device/tor-2.jpg',
    imageAlt: 'Zugriffspunkt für Türen und Maschinen',
  },
  {
    id: 'gateway',
    eyebrow: 'Gateway',
    title: 'Das Gateway hält Regeln, Netz und lokalen Betrieb zusammen',
    description:
      'Das Gateway spannt das IP500- und BLE-Netzwerk auf und verbindet Zugriffspunkte mit der Plattform. Es hält Freigaben verfügbar, koordiniert Kommunikation und hostet die lokale Datenbank für maximale Stabilität.',
    points: [
      'verwaltet das gesamte Mesh-Netzwerk pro Gebäude oder Standort',
      'hält Berechtigungen lokal verfügbar (Offline-Fähigkeit)',
      'bildet das Herzstück des Systems für hochverfügbare Cluster (HA-Ready)',
    ],
    ctaLabel: 'Zum Gateway Pro',
    ctaHref: '/products/gateway-pro',
    imageSrc: '/gateway/mounted.jpg',
    imageAlt: 'Montiertes Gateway in einer Werkstatt',
  },
  {
    id: 'offline',
    eyebrow: 'Betrieb',
    title: 'Auch bei Störungen muss die Freigabelogik tragen',
    description:
      'Mardu Hardware funktioniert auch im Worst-Case: Bei einem Server- oder Internetausfall arbeiten die Geräte dank lokaler Zwischenspeicherung im Mesh-Netzwerk einfach weiter.',
    points: [
      'Dezentrale Speicherung der Freigaben auf Gateways und Access Points',
      'Selbstheilendes Mesh-Netzwerk gleicht den Ausfall einzelner Knoten aus',
      'Volle Kontrolle über sicherheitskritische Maschinen – jederzeit',
    ],
    ctaLabel: 'Zur Plattformübersicht',
    ctaHref: '/platform',
    imageSrc: '/_A7_9094_quer.jpg',
    imageAlt: 'mardu Hardware im Werkstattkontext',
  },
  {
    id: 'software-view',
    eyebrow: 'Verwaltung',
    title: 'Hardware bleibt mit Software und Integrationen verbunden',
    description:
      'Infrastruktur wird in der Software sichtbar. Über die WebQ-Plattform verwalten Sie alle Hardwarekomponenten, verteilen Rollen und können Hochschulsysteme (SSO, UniNow) anbinden.',
    points: [
      'Gerätezustände in Echtzeit im Browser einsehen',
      'Regeln und Freigaben per Klick zentral verteilen',
      'Protokolle auswerten und Audits rechtssicher dokumentieren',
    ],
    ctaLabel: 'Zur Software-Seite',
    ctaHref: '/verwaltungssoftware',
    placeholder: {
      badge: 'UI',
      title: 'WebQ Hardware-Status',
      description:
        'Platzhalter für einen echten Status- oder Verwaltungs-Screen, der Hardwarezustände und Freigaben zeigt.',
      icon: Smartphone,
    },
  },
];

export const hardwareVariants: HardwareVariantDto[] = [
  {
    id: 'software-only',
    name: 'Mardu QR (Software-Integration)',
    tier: 'Einfachster Einstieg',
    summary: 'Für Maschinenfreigabe über Smartphone ohne unsere Steuerungs-Hardware.',
    suitableFor: [
      'bereits vorhandene Schaltschränke und Hardware',
      'Smartphone-App/QR-Code-Identifikation',
      'SaaS-Nutzung unserer WebQ-Plattform',
    ],
    strengths: ['kein Hardware-Umbau nötig', 'schnell ausrollbar', 'günstiger Einstiegspreis'],
  },
  {
    id: 'ble-standard',
    name: 'BLE Standard',
    tier: 'Wirtschaftliche Vernetzung',
    summary: 'Bluetooth LE Mesh für typische Distanzen und Werkstätten.',
    suitableFor: ['Makerspaces', 'kleinere Ausbildungswerkstätten', 'Standard-Bürogebäude'],
    strengths: [
      'stabile BLE-Vernetzung bis 10m',
      'hervorragendes Preis-Leistungs-Verhältnis',
      'kompatibel mit Smart Akteur, Zylinder & Tags',
    ],
  },
  {
    id: 'ip500-pro',
    name: 'IP500 Pro',
    badge: 'Empfohlen',
    tier: 'Für professionelle Industrie-Umgebungen',
    summary: 'Selbstheilendes Dualband-Mesh mit maximaler Reichweite und VdS-Sicherheit.',
    suitableFor: [
      'große Produktionshallen und Hochschul-Campusse',
      'Altbauten mit dicken Wänden',
      'hochverfügbare Enterprise-Szenarien',
    ],
    strengths: ['höchste Durchdringung', 'Dualband (Sub-GHz & 2.4GHz)', 'maximale Ausfallsicherheit'],
    recommendation:
      'Für alle Umgebungen, in denen ein Störungsfall keine Option ist. Durch das IP500-Protokoll spart man sich aufwändige Kabelverlegung und sichert maximale Stabilität ab.',
  },
];

export const hardwareTrustItems: HardwareTrustItemDto[] = [
  {
    title: 'Offline weiter nutzbar',
    icon: ShieldCheck,
    description: 'Lokale Berechtigungen auf dem Gateway helfen, auch bei Netzwerkstörungen sicher weiterzuarbeiten.',
  },
  {
    title: 'Kabelloses Mesh (IP500/BLE)',
    icon: Wifi,
    description: 'Zwei starke Funkstandards sparen die teure Verkabelung von Türen und Maschinen im Bestand.',
  },
  {
    title: 'Nachvollziehbare Freigaben',
    icon: Activity,
    description:
      'Rechte und Hardware-Ereignisse greifen lückenlos in der Plattform ineinander (Audit-Ready).',
  },
  {
    title: 'Für Industrie & Makerspaces',
    icon: Cpu,
    description: 'Vom einfachen 40A Schütz an der Drehbank bis zum ausgedehnten Hochschul-Campus.',
  },
  {
    title: 'Netz passend zur Umgebung',
    icon: Network,
    description:
      'Mardu QR für reines SaaS, BLE-Standard für Kompaktheit, IP500 Pro für höchste Belastbarkeit.',
  },
  {
    title: 'Eigenentwickelte Hardware',
    icon: Boxes,
    description:
      'Zugriffspunkte und Gateways "Made in Germany" – ausgelegt auf robusten und sicheren Dauerbetrieb.',
  },
];

export const hardwareFaqItems: FaqItem[] = [
  {
    question: 'Wann reicht Mardu QR (Software-Integration)?',
    answer:
      'Mardu QR ist perfekt, wenn Sie bereits smarte Steuerungen oder Hardware besitzen und nur unsere Plattform (WebQ) zur Maschinenfreigabe via Smartphone-Scan nutzen möchten.',
  },
  {
    question: 'Wann ist BLE Standard sinnvoll?',
    answer:
      'Basic BLE ist sinnvoll für Makerspaces oder kleine Vereinswerkstätten, in denen die Distanz zwischen den Geräten maximal 10 Meter beträgt und ein solides Preis-Leistungs-Verhältnis wichtig ist.',
  },
  {
    question: 'Wann sollte man IP500 Pro wählen?',
    answer:
      'Das IP500-Mesh-Netzwerk durchdringt problemlos dicke Wände in Altbauten und überbrückt sehr weite Distanzen in großen Werkhallen. Zudem ist das Funksystem VdS-abgenommen, was es besonders für Versicherungsfragen interessant macht.',
  },
  {
    question: 'Funktioniert die Hardware auch ohne Internetverbindung?',
    answer:
      'Ja. Berechtigungen und Logs werden lokal auf den Gateways und Access Points zwischengespeichert. Bei einem Ausfall bleibt die Sicherheit stets erhalten und berechtigte Nutzer können weiterarbeiten.',
  },
  {
    question: 'Wie viele Zugriffspunkte und Gateways braucht man typischerweise?',
    answer: (
      <>
        Das hängt von den Räumlichkeiten ab. Oft reicht ein Gateway pro Etage oder Werkstatt aus. Wir empfehlen unseren{' '}
        <a href="/configurator" className="text-primary hover:underline">
          Konfigurator
        </a>{' '}
        oder ein kurzes Gespräch, um den genauen Bedarf passend zur Funktechnologie zu ermitteln. Bei höchster Redundanz verbauen wir z.B. 2 Gateways pro Gebäude.
      </>
    ),
  },
  {
    question: 'Lässt sich das System an meine Hochschule / Universität anbinden?',
    answer:
      'Absolut. Wir haben Mardu von Beginn an für Schnittstellen konzipiert. Anbindungen an Single Sign-On (SSO) Systeme, LDAP oder Hochschul-Apps wie UniNow stehen auf unserer Roadmap, um doppelte Pflege von Studierendendaten zu verhindern.',
  },
  {
    question: 'Kann ich die Mardu Access Points selbst installieren?',
    answer:
      'Sie erhalten von uns einen klaren Schaltplan, vorkonfigurierte SD-Karten (bei SPS-Lösungen) und die Geräte. Den Einbau der 40A-Schütze oder der reinen APs in den Schaltschrank sollte jedoch immer Ihr zertifizierter Haus-Elektriker übernehmen.',
  },
];
