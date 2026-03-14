import type { LucideIcon } from 'lucide-react';
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
 * DTO for a visible product view or placeholder on the `/platform` page.
 */
export interface PlatformViewDto {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
}

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

export const platformViews: PlatformViewDto[] = [
  {
    id: 'devices-overview',
    eyebrow: 'View 01',
    title: 'Geräteübersicht',
    description:
      'Platzhalter für einen echten Screen mit Gerätestatus, letzter Aktivität, Firmware und Provisionierung.',
    badge: 'UI',
  },
  {
    id: 'access-rules',
    eyebrow: 'View 02',
    title: 'Zugriffsregeln',
    description:
      'Platzhalter für eine Ansicht mit Freigaben, Bedingungen, Zeitfenstern und beteiligten Akteuren.',
    badge: 'Rules',
  },
  {
    id: 'users-security',
    eyebrow: 'View 03',
    title: 'Benutzer & Sicherheit',
    description:
      'Platzhalter für Rollenverwaltung, Passkeys, 2FA und zentrale Sicherheitsoptionen.',
    badge: 'Security',
  },
];
