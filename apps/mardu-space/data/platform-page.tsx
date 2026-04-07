import type { LucideIcon } from 'lucide-react';
import type { EditorialLinkPanelItem, EditorialPanelItem } from '@mardu/sections';
import { Activity, KeyRound, LockKeyhole, MapPinned, Server, UsersRound, Wifi, Smartphone, Radio } from 'lucide-react';

/**
 * DTO for a sellable WebQ capability block on the `/platform` page.
 */
export interface PlatformFeatureDto {
  id: string;
  title: string;
  description: string;
  proof: string;
  icon: LucideIcon;
}

/**
 * DTO tuple for the editorial product-story section on the `/platform` page.
 */
export type PlatformEditorialPanelsDto = [
  EditorialPanelItem,
  EditorialPanelItem,
  EditorialPanelItem,
];

/**
 * DTO tuple for the 2-panel editorial link stage on the `/platform` page.
 */
export type PlatformEditorialLinkPanelsDto = [
  EditorialLinkPanelItem,
  EditorialLinkPanelItem,
];

/**
 * DTO for Network topologies (IP500 vs BLE).
 */
export interface PlatformNetworkDto {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
}

export const platformFeatures: PlatformFeatureDto[] = [
  {
    id: 'identity',
    title: 'Sicherheit durch echte Qualifikation',
    description:
      'Berechtigungen sind personenbezogen, nicht geteilt. Einweisungen werden bei jedem Maschinenstart oder Zutrittsversuch aktiv überprüft.',
    proof: 'Erhöht die Sicherheit und verhindert Stilllegungen durch Fehlbedienungen.',
    icon: UsersRound,
  },
  {
    id: 'rules',
    title: 'Zutritt ohne permanente Aufsicht',
    description:
      'Geregeltes Arbeiten auch am Wochenende oder am Abend. Nur Nutzer mit einer gültigen Freigabe können Maschinen starten oder Räume betreten.',
    proof: 'Ideal für Makerspaces, Universitäten und offene Werkstätten.',
    icon: KeyRound,
  },
  {
    id: 'hardware',
    title: 'Kabellose Vernetzung (IP500 & BLE)',
    description:
      'Unsere Hardware lässt sich in Bestandsgebäude leicht nachrüsten. Das Mesh-Netzwerk garantiert einen stabilen Betrieb auch durch Wände hindurch.',
    proof: 'Spart teure Verkabelung in Altbauten und großen Werkhallen.',
    icon: Wifi,
  },
  {
    id: 'integrations',
    title: 'Einfache Integration (SSO & UniNow)',
    description:
      'Wir integrieren uns in Ihre bestehende Infrastruktur: Single Sign-On (SSO) oder Campus-Apps wie UniNow für Hochschulen stehen auf der Roadmap.',
    proof: 'Reduziert den administrativen Aufwand auf ein Minimum.',
    icon: LockKeyhole,
  },
  {
    id: 'audit',
    title: 'Volle Übersicht für die Leitungsebene',
    description:
      'Protokolle, Maschinenzustände und Zugriffsrechte sind auf einen Blick einsehbar. Sie müssen nicht permanent vor Ort sein, um die Kontrolle zu behalten.',
    proof: 'Vereinfacht Audits und den Nachweis der Aufsichtspflicht.',
    icon: Activity,
  },
  {
    id: 'products',
    title: 'Digitale Identifikation via App oder NFC',
    description:
      'Nutzer authentifizieren sich wahlweise per Smartphone (QR-Code / App Key), per NFC-Tag oder Smartcard direkt am Gerät.',
    proof: 'Flexible Handhabung für feste Teams oder wechselnde Semesterrollen.',
    icon: Smartphone,
  },
];

export const platformNetworks: PlatformNetworkDto[] = [
  {
    id: 'ip500',
    title: 'IP500: Das Industrie-Mesh für extreme Reichweiten',
    description: 'Das IP500 Funk-Protokoll bildet ein selbstheilendes Dualband-Mesh (Sub-GHz und 2,4 GHz). Es ist VdS-abgenommen und wurde für hochsichere Gebäudeautomation entwickelt.',
    benefits: [
      'Extrem hohe Reichweite und Wändedurchdringung (Ideal für Altbau/Industrie)',
      'Dualband-Mesh für Ausfallsicherheit und Selbstheilung',
      'VdS-Zertifiziert – relevant für den Versicherungsschutz',
      'Einsatz in Pro-Geräten: Gateway Pro, Access Point Pro, Smart Akteur Pro'
    ],
    icon: Radio,
  },
  {
    id: 'ble',
    title: 'Bluetooth LE: Der effiziente Standard',
    description: 'Die Bluetooth Low Energy (BLE) Lösung baut ebenfalls ein zuverlässiges Mesh-Netzwerk auf und eignet sich perfekt für normale Distanzen und kompakte Installationen.',
    benefits: [
      'Reichweiten von bis zu 10m von Gerät zu Gerät',
      'Direkte Smartphone-Integration (App Key)',
      'Kosteneffizient für Standard-Werkstätten und Vereinsräume',
      'Einsatz in Standard-Geräten: Gateway, Access Point, Smart Akteur, Schließzylinder'
    ],
    icon: Wifi,
  }
];

export const platformEditorialPanels: PlatformEditorialPanelsDto = [
  {
    id: 'webq-overview',
    badge: 'Software (WebQ)',
    title: 'Nutzer, Rollen und Qualifikationen zentral steuern.',
    description:
      'Hier pflegen Sie Berechtigungen und Einweisungen digital. Das System prüft diese in Echtzeit und übersetzt sie in echte Freigaben an den Maschinen.',
    imageSrc: '/verwaltungssoftware/benutzerverwaltung.png',
    imageAlt: 'WebQ Oberfläche mit Benutzerverwaltung und zentralem Überblick',
    theme: 'dark',
    accentTone: 'emerald',
  },
  {
    id: 'access-rules',
    badge: 'Regelwerk',
    title: 'Verantwortung und Nachweise sicher dokumentieren.',
    description:
      'Zeitfenster, Bedingungen und Protokolle werden transparent erfasst. Das System sorgt dafür, dass Ihre Aufsichtspflicht stets erfüllt und nachweisbar bleibt.',
    imageSrc: '/verwaltungssoftware/zugriffsprotokolle.png',
    imageAlt: 'WebQ Oberfläche mit Zugriffsprotokollen und nachvollziehbaren Ereignissen',
    theme: 'light',
    accentTone: 'amber',
  },
  {
    id: 'device-visibility',
    badge: 'Infrastruktur',
    title: 'Geräte und Zutrittspunkte im Blick behalten.',
    description:
      'Gateways und Access Points setzen die Rechte lokal um. Selbst bei Serverausfall oder Störungen bleiben die Zutrittspunkte verlässlich steuerbar.',
    imageSrc: '/verwaltungssoftware/zutrittspunkte-und-geraete.png',
    imageAlt: 'WebQ Oberfläche mit Zutrittspunkten und verwalteten Geräten',
    theme: 'light',
    accentTone: 'sky',
  },
];

export const platformEditorialLinkPanels: PlatformEditorialLinkPanelsDto = [
  {
    id: 'operations-view',
    badge: 'Software',
    title: 'So steuern Sie Regeln und Personen.',
    description:
      'Erfahren Sie, wie Sie Einweisungen verwalten, Integrationen (SSO, UniNow) einrichten und den Überblick über Ihren Makerspace behalten.',
    href: '/verwaltungssoftware',
    ctaLabel: 'Zur Software',
    ariaLabel: 'Mehr über die Verwaltungsoberfläche WebQ erfahren',
    pattern: {
      glyph: 'chevron',
      density: 'default',
      anchor: 'top-left',
      fade: 'diagonal',
      tone: 'mixed',
    },
  },
  {
    id: 'system-view',
    badge: 'Hardware',
    title: 'So werden Freigaben vor Ort umgesetzt.',
    description:
      'Entdecken Sie, wie Access Points, Schütze und IP500-Gateways Ihre Maschinen sicher schalten – auch ohne Aufsichtsperson.',
    href: '/system',
    ctaLabel: 'Zur Hardware',
    ariaLabel: 'Mehr über den Systemaufbau erfahren',
    align: 'right',
    pattern: {
      glyph: 'v',
      density: 'compact',
      anchor: 'bottom-right',
      fade: 'vertical',
      tone: 'mixed',
    },
  },
];
