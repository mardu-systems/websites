'use client';

import {
  type EmbeddableAccessLogRow,
  EmbeddableAccessLogTable,
  type EmbeddableDeviceRow,
  EmbeddableDeviceTable,
  type EmbeddableUserRow,
  EmbeddableUserTable,
} from './embeddable/data-table/table-presets';
import styles from './permissions-embedded-preview.module.css';

export type PermissionsPreviewVariant = 'identities' | 'events' | 'access-points';

const sharedTableProps = {
  density: 'compact' as const,
  pageSize: 7,
  theme: 'dark' as const,
};

const identityRows = [
  {
    id: 'laura-schmidt',
    userName: 'laura.schmidt@mardu.de',
    firstName: 'Laura',
    lastName: 'Schmidt',
    email: 'laura.schmidt@mardu.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 2,
  },
  {
    id: 'aylin-demir',
    userName: 'aylin.demir@mardu.de',
    firstName: 'Aylin',
    lastName: 'Demir',
    email: 'aylin.demir@mardu.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 1,
  },
  {
    id: 'paul-richter',
    userName: 'paul.richter@partner.de',
    firstName: 'Paul',
    lastName: 'Richter',
    email: 'paul.richter@partner.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 1,
  },
  {
    id: 'clara-stein',
    userName: 'clara.stein@mardu.de',
    firstName: 'Clara',
    lastName: 'Stein',
    email: 'clara.stein@mardu.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 0,
  },
  {
    id: 'jonas-vogel',
    userName: 'jonas.vogel@mardu.de',
    firstName: 'Jonas',
    lastName: 'Vogel',
    email: 'jonas.vogel@mardu.de',
    emailConfirmed: true,
    status: 'inactive',
    tagCount: 1,
  },
  {
    id: 'mara-hoffmann',
    userName: 'mara.hoffmann@mardu.de',
    firstName: 'Mara',
    lastName: 'Hoffmann',
    email: 'mara.hoffmann@mardu.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 2,
  },
  {
    id: 'noah-wagner',
    userName: 'noah.wagner@mardu.de',
    firstName: 'Noah',
    lastName: 'Wagner',
    email: 'noah.wagner@mardu.de',
    emailConfirmed: true,
    status: 'active',
    tagCount: 0,
  },
] satisfies readonly EmbeddableUserRow[];

const eventRows = [
  {
    id: 'event-1',
    occurredAt: '12.08.2026 · 10:42',
    status: 'granted',
    accessPoint: 'CNC-Fräse 02',
    device: 'Terminal M-204',
    requester: 'Aylin Demir',
    detail: 'Rolle und Einweisung gültig',
  },
  {
    id: 'event-2',
    occurredAt: '12.08.2026 · 09:18',
    status: 'granted',
    accessPoint: 'Werkstatt Haupteingang',
    device: 'Schließzylinder T-12',
    requester: 'Laura Schmidt',
    detail: 'Zeitfenster gültig',
  },
  {
    id: 'event-3',
    occurredAt: '12.08.2026 · 08:51',
    status: 'denied',
    accessPoint: 'Schaltschrank Labor',
    device: 'Terminal M-117',
    requester: 'Paul Richter',
    detail: 'Vier-Augen-Freigabe fehlt',
  },
  {
    id: 'event-4',
    occurredAt: '11.08.2026 · 17:26',
    status: 'ended',
    accessPoint: 'Lasercutter',
    device: 'Terminal M-088',
    requester: 'Clara Stein',
    detail: 'Nutzung regulär beendet',
  },
  {
    id: 'event-5',
    occurredAt: '11.08.2026 · 15:04',
    status: 'active',
    accessPoint: 'Zufahrt Süd',
    device: 'Torsteuerung G-03',
    requester: 'Lieferdienst Nord',
    detail: 'Temporäre Zufahrt aktiv',
  },
  {
    id: 'event-6',
    occurredAt: '11.08.2026 · 14:39',
    status: 'granted',
    accessPoint: 'Materialausgabe',
    device: 'Schließfach S-14',
    requester: 'Mara Hoffmann',
    detail: 'Projektfreigabe gültig',
  },
  {
    id: 'event-7',
    occurredAt: '11.08.2026 · 13:12',
    status: 'denied',
    accessPoint: 'CNC-Fräse 02',
    device: 'Terminal M-204',
    requester: 'Jonas Vogel',
    detail: 'Einweisung abgelaufen',
  },
] satisfies readonly EmbeddableAccessLogRow[];

const accessPointRows = [
  {
    id: 'access-1',
    name: 'CNC-Fräse 02',
    type: 'Maschine',
    status: 'online',
    location: 'Metallwerkstatt',
    lastSeen: 'vor 1 Minute',
    firmware: '3.8.2',
  },
  {
    id: 'access-2',
    name: 'Werkstatt Haupteingang',
    type: 'Schließzylinder',
    status: 'online',
    location: 'Gebäude 2',
    lastSeen: 'vor 2 Minuten',
    firmware: '2.4.1',
  },
  {
    id: 'access-3',
    name: 'Zufahrt Süd',
    type: 'Torsteuerung',
    status: 'online',
    location: 'Außengelände',
    lastSeen: 'vor 4 Minuten',
    firmware: '3.7.9',
  },
  {
    id: 'access-4',
    name: 'Lasercutter',
    type: 'Maschine',
    status: 'maintenance',
    location: 'Digitale Fertigung',
    lastSeen: 'vor 18 Minuten',
    firmware: '3.8.2',
  },
  {
    id: 'access-5',
    name: 'Materialausgabe',
    type: 'Schließfach',
    status: 'online',
    location: 'Materiallager',
    lastSeen: 'vor 7 Minuten',
    firmware: '2.4.1',
  },
  {
    id: 'access-6',
    name: 'Schranke Nord',
    type: 'Schranke',
    status: 'offline',
    location: 'Parkplatz',
    lastSeen: 'vor 3 Stunden',
    firmware: '3.6.5',
  },
  {
    id: 'access-7',
    name: 'Elektroniklabor',
    type: 'Tür',
    status: 'online',
    location: 'Gebäude 1',
    lastSeen: 'vor 1 Minute',
    firmware: '2.4.1',
  },
] satisfies readonly EmbeddableDeviceRow[];

function PreviewTable({ variant }: { variant: PermissionsPreviewVariant }) {
  if (variant === 'identities') {
    return (
      <EmbeddableUserTable
        {...sharedTableProps}
        title="Benutzer"
        description="Identitäten und Zugangs-Tags zentral verwalten."
        data={identityRows}
      />
    );
  }

  if (variant === 'events') {
    return (
      <EmbeddableAccessLogTable
        {...sharedTableProps}
        title="Freigaben"
        description="Entscheidungen mit Zeitpunkt und Kontext nachvollziehen."
        data={eventRows}
      />
    );
  }

  return (
    <EmbeddableDeviceTable
      {...sharedTableProps}
      title="Zugangspunkte"
      description="Maschinen, Türen und Tore in einer Übersicht."
      data={accessPointRows}
    />
  );
}

export function PermissionsEmbeddedPreview({ variant }: { variant: PermissionsPreviewVariant }) {
  return (
    <div className={styles.stage}>
      <div className={styles.scaledTable}>
        <PreviewTable variant={variant} />
      </div>
    </div>
  );
}
