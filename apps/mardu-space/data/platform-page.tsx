import type { LucideIcon } from 'lucide-react';
import type { EditorialPanelItem } from '@mardu/sections';
import { Activity, KeyRound, LockKeyhole, MapPinned, Server, UsersRound } from 'lucide-react';

/**
 * DTO for a sellable WebQ capability block on the `/platform` page.
 * Each block translates a real product area into one clear business outcome.
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
 * The page owns copy and media selection, while `@mardu/sections` owns layout and styling.
 */
export type PlatformEditorialPanelsDto = [
  EditorialPanelItem,
  EditorialPanelItem,
  EditorialPanelItem,
];

export const platformFeatures: PlatformFeatureDto[] = [
  {
    id: 'devices',
    title: 'Geräte zentral verwalten',
    description:
      'Status, Firmware, Provisionierung und Erreichbarkeit lassen sich in einer Oberfläche überwachen und steuern.',
    proof: 'Geeignet für operative Kontrolle statt verteilter Einzeltools.',
    icon: Server,
  },
  {
    id: 'access',
    title: 'Zugriffe präzise steuern',
    description:
      'Freigaben lassen sich nach Person, Gruppe, Zeitfenster und Zugangspunkt modellieren statt pauschal vergeben.',
    proof: 'Besonders wertvoll für Maschinen, Türen, Tore und qualifikationsabhängige Freigaben.',
    icon: KeyRound,
  },
  {
    id: 'users',
    title: 'Benutzer und Rollen sauber organisieren',
    description:
      'Konten, Zuständigkeiten und Berechtigungen bleiben für Betrieb, Security und Administration nachvollziehbar.',
    proof: 'Hilft dort, wo viele Beteiligte in einem gemeinsamen System koordiniert werden.',
    icon: UsersRound,
  },
  {
    id: 'security',
    title: 'Sicherheit integriert statt nachgerüstet',
    description: '2FA, Passkeys, Sitzungen und Freigaberegeln greifen in einem System ineinander.',
    proof: 'Reduziert Reibung für Nutzer und hält Sicherheitslogik zentral pflegbar.',
    icon: LockKeyhole,
  },
  {
    id: 'audit',
    title: 'Betrieb nachvollziehbar machen',
    description:
      'Ereignisse, Zustände und Änderungen werden dort sichtbar, wo Entscheidungen getroffen werden.',
    proof: 'Unterstützt Audit, Nachweis und störungsarmen Betrieb.',
    icon: Activity,
  },
  {
    id: 'zones',
    title: 'Komplexe Standorte einfach abbilden',
    description:
      'Zonen, Access Points und standortspezifische Regeln lassen sich ohne unübersichtliche Sonderlogik verwalten.',
    proof: 'Sinnvoll für Gebäude, Werkstätten, Campusse und verteilte Schaltpunkte.',
    icon: MapPinned,
  },
];

export const platformEditorialPanels: PlatformEditorialPanelsDto = [
  {
    id: 'webq-overview',
    badge: 'Software',
    title: 'WebQ bündelt Betrieb und Freigaben.',
    description:
      'Nutzer, Geräte, Rollen und Ereignisse laufen in einer Oberfläche zusammen statt in separaten Tools zu verschwinden.',
    imageSrc: '/verwaltungssoftware/benutzerverwaltung.png',
    imageAlt: 'WebQ Oberfläche mit Benutzerverwaltung und zentralem Überblick',
    theme: 'dark',
    accentTone: 'emerald',
  },
  {
    id: 'access-rules',
    badge: 'Freigaben',
    title: 'Regeln bleiben präzise statt pauschal.',
    description:
      'Zeitfenster, Bedingungen und Verantwortlichkeiten lassen sich so modellieren, wie reale Zutrittslogik tatsächlich funktioniert.',
    imageSrc: '/verwaltungssoftware/zugriffsprotokolle.png',
    imageAlt: 'WebQ Oberfläche mit Zugriffsprotokollen und nachvollziehbaren Ereignissen',
    theme: 'light',
    accentTone: 'amber',
  },
  {
    id: 'device-visibility',
    badge: 'Infrastruktur',
    title: 'Geräte und Zutrittspunkte bleiben sichtbar.',
    description:
      'Status, Zuordnung und technische Sichtbarkeit landen dort, wo Security, Betrieb und Administration Entscheidungen treffen.',
    imageSrc: '/verwaltungssoftware/zutrittspunkte-und-geraete.png',
    imageAlt: 'WebQ Oberfläche mit Zutrittspunkten und verwalteten Geräten',
    theme: 'light',
    accentTone: 'sky',
  },
];
