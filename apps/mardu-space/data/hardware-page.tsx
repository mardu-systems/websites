import type { FaqItem } from '@mardu/sections';
import type { LucideIcon } from 'lucide-react';
import { Activity, Boxes, Cpu, Network, ShieldCheck, Smartphone, Wifi } from 'lucide-react';

/**
 * DTO for a sellable hardware capability block on the `/system` page.
 * Each block pairs one clear outcome with proof points and either a real image or placeholder.
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
 * The focus is buyer orientation first, not protocol detail.
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
    title: 'Zugriffe lokal und zuverlässig schalten',
    description:
      'Der Zugriffspunkt liest Identität vor Ort und schaltet Türen oder Maschinen direkt frei. Damit wird aus einer Regel im System eine belastbare Aktion im Betrieb.',
    points: [
      'identifiziert Nutzer per Karte, NFC oder App-Anbindung',
      'schaltet Maschinen und Zutrittspunkte lokal statt nur organisatorisch',
      'bleibt Teil einer nachvollziehbaren Freigabelogik mit klaren Regeln',
    ],
    imageSrc: '/device/tor-2.jpg',
    imageAlt: 'Zugriffspunkt für Türen und Maschinen',
  },
  {
    id: 'gateway',
    eyebrow: 'Gateway',
    title: 'Hardware zentral koordinieren',
    description:
      'Das Gateway verbindet Zugriffspunkte, Regeln und lokalen Betrieb. Es hält Freigaben verfügbar, koordiniert das Netz und schafft eine belastbare Basis für anspruchsvollere Umgebungen.',
    points: [
      'verwaltet Netz und Kommunikation pro Standort oder Gebäude',
      'hält Berechtigungen lokal verfügbar für stabilen Betrieb',
      'schafft die Grundlage für zentrale Steuerung, Monitoring und Auswertung',
    ],
    imageSrc: '/gateway/mounted.jpg',
    imageAlt: 'Montiertes Gateway in einer Werkstatt',
  },
  {
    id: 'offline',
    eyebrow: 'Betrieb',
    title: 'Auch bei Ausfällen weiter arbeitsfähig',
    description:
      'Hardware muss nicht nur im Normalfall funktionieren. Sie muss auch unter Last, bei Störungen oder ohne Internet verlässlich weiterlaufen.',
    points: [
      'Offline-Caching hält Freigaben lokal vor',
      'robuste Freigabelogik reduziert manuelle Ausnahmen im Alltag',
      'geeignet für Türen, Tore, Maschinen und Zonen mit unterschiedlichen Anforderungen',
    ],
    imageSrc: '/_A7_9094_quer.jpg',
    imageAlt: 'mardu Hardware im Werkstattkontext',
  },
  {
    id: 'software-view',
    eyebrow: 'Verwaltung',
    title: 'Mit Software und Betrieb verbunden',
    description:
      'Die Hardware arbeitet nicht isoliert. Status, Regeln und Entscheidungen werden in WebQ sichtbar und für Betrieb, Security und Administration nachvollziehbar.',
    points: [
      'Gerätezustände und Infrastruktur zentral im Blick behalten',
      'Regeln und Freigaben ohne Medienbruch anpassen',
      'Ereignisse und Zustände dort prüfen, wo Entscheidungen fallen',
    ],
    ctaLabel: 'Zur Software-Seite',
    ctaHref: '/platform',
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
    id: 'light',
    name: 'Light',
    tier: 'Einfachster Einstieg',
    summary: 'Für einfache, klar abgegrenzte Schaltpunkte.',
    suitableFor: [
      'einzelne Türen, Tore oder Relais',
      'einfache Schaltpunkte',
      'kleine Umgebungen mit wenig Komplexität',
    ],
    strengths: ['günstiger Einstieg', 'schnell umsetzbar', 'bewusst einfach gehalten'],
  },
  {
    id: 'basic',
    name: 'Basic',
    tier: 'Wirtschaftlicher Standard',
    summary: 'Für vernetzte, aber überschaubare Umgebungen.',
    suitableFor: ['kleinere Werkstätten', 'Makerspaces', 'überschaubare Gebäude und Flächen'],
    strengths: [
      'gutes Verhältnis aus Preis und Funktion',
      'vernetzte Freigaben möglich',
      'für viele Standardfälle passend',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Empfohlen',
    tier: 'Für professionelle Umgebungen',
    summary: 'Für professionelle und belastbare Installationen.',
    suitableFor: [
      'Unternehmen und professionelle Werkstätten',
      'größere Gebäude, Hallen oder Außenbereiche',
      'Installationen mit höherem Anspruch an Stabilität',
    ],
    strengths: ['höchste Robustheit', 'besser planbar', 'empfohlen für professionelle Umgebungen'],
    recommendation:
      'Für die meisten professionellen Umgebungen die richtige Wahl, wenn Zuverlässigkeit wichtiger ist als der niedrigste Preis.',
  },
];

export const hardwareTrustItems: HardwareTrustItemDto[] = [
  {
    title: 'Offline weiter nutzbar',
    icon: ShieldCheck,
    description: 'Lokale Berechtigungen helfen, auch bei Internetstörungen weiterzuarbeiten.',
  },
  {
    title: 'Nachvollziehbare Freigaben',
    icon: Activity,
    description:
      'Hardware, Regeln und Ereignisse greifen zusammen statt in getrennten Einzelsystemen zu laufen.',
  },
  {
    title: 'Geeignet für reale Infrastrukturen',
    icon: Network,
    description:
      'Türen, Tore, Zonen und Maschinen lassen sich in einem konsistenten Hardwarekonzept zusammenführen.',
  },
  {
    title: 'Für anspruchsvolle Geräteklassen',
    icon: Cpu,
    description: 'Vom Zutrittspunkt bis zur Maschinenfreigabe für leistungsstärkere Verbraucher.',
  },
  {
    title: 'Netz passend zur Umgebung',
    icon: Wifi,
    description:
      'Light für einfache Schaltpunkte, Basic für wirtschaftliche Vernetzung, Pro für mehr Stabilität und Belastbarkeit.',
  },
  {
    title: 'Eigenentwickelte Hardware',
    icon: Boxes,
    description:
      'Innenleben, Aufbau und Integration sind auf realen Betrieb statt auf reine Demooptik ausgelegt.',
  },
];

export const hardwareFaqItems: FaqItem[] = [
  {
    question: 'Wann reicht Light?',
    answer:
      'Light passt, wenn ein einzelner Schaltpunkt einfach per QR-Code freigegeben werden soll und keine volle Rollen-, Karten- oder Netzlogik nötig ist.',
  },
  {
    question: 'Wann ist Basic sinnvoll?',
    answer:
      'Basic ist sinnvoll, wenn mehrere Zugänge oder Maschinen digital verwaltet werden sollen, die Umgebung aber überschaubar bleibt und das Preis-Leistungs-Verhältnis im Vordergrund steht.',
  },
  {
    question: 'Wann sollte man Pro wählen?',
    answer:
      'Pro ist die richtige Wahl, wenn Gebäude, Hallen oder Außenbereiche anspruchsvoller sind, mehr Geräte vernetzt werden und der Betrieb langfristig robust und planbar bleiben soll.',
  },
  {
    question: 'Warum ist Pro empfohlen?',
    answer:
      'Weil bei professionellen Zutritts- und Freigabeumgebungen meist nicht die billigste Technik entscheidet, sondern wie belastbar sich die Installation im Gebäude und im Alltag verhält. Genau dort ist Pro klar im Vorteil.',
  },
  {
    question: 'Wie viele Zugriffspunkte und Gateways braucht man typischerweise?',
    answer: (
      <>
        Das hängt von Türen, Toren, Maschinen und Zonen ab. Mit dem{' '}
        <a href="/configurator" className="text-primary hover:underline">
          Konfigurator
        </a>{' '}
        lässt sich der Bedarf früh strukturieren und für ein erstes Gespräch greifbar machen.
      </>
    ),
  },
  {
    question: 'Funktioniert die Hardware auch ohne Internetverbindung?',
    answer:
      'Ja. Berechtigungen können lokal vorgehalten werden, damit der Betrieb auch bei Internetausfall kontrolliert weiterlaufen kann.',
  },
  {
    question: 'Welche Komponenten gehören zu welcher Umgebung?',
    answer:
      'Typischerweise besteht ein Setup aus mindestens einem Gateway und mehreren Zugriffspunkten. Welche Kombination sinnvoll ist, hängt von Fläche, Infrastruktur und Anzahl der zu schaltenden Türen oder Maschinen ab.',
  },
  {
    question: 'Wann passt die Light-Version mit QR-Code?',
    answer:
      'Sie passt für einfachere Schaltpunkte, an denen ein elektronisches Schütz oder Relais freigegeben werden soll, ohne die volle Rollen-, Karten- oder Ausweislogik der größeren Produktstufen aufzubauen.',
  },
  {
    question: 'Wo finde ich technische Unterschiede im Detail?',
    answer:
      'Auf dieser Seite steht die Einordnung im Vordergrund. Technische Unterschiede und Funkdetails sollten nur in einer separaten Detailseite, einem Datenblatt oder einem Download-Vergleich vertieft werden.',
  },
  {
    question: 'Wie läuft Inbetriebnahme und Integration grob ab?',
    answer:
      'Zunächst werden Umgebung, Schaltpunkte und Anforderungen aufgenommen. Danach folgen Auswahl der passenden Produktstufe, Montage, Konfiguration und Einbindung in die Verwaltungs- und Regelstruktur.',
  },
  {
    question: 'Kann ich die Hardware zusammen mit WebQ betreiben?',
    answer:
      'Ja. Die Hardware ist dafür gedacht, Zustände, Freigaben und Entscheidungen mit der Verwaltungsoberfläche zusammenzuführen, statt als isolierte Einzellösung zu arbeiten.',
  },
];
