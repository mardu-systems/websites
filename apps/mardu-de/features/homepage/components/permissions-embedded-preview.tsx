'use client';

import { useState } from 'react';
import {
  EmbeddableDataTable,
  EmbeddableTableBadge,
  type EmbeddableTableBadgeTone,
  type EmbeddableTableColumn,
} from './embeddable/data-table/embeddable-data-table';

export type PermissionsPreviewVariant = 'identities' | 'events' | 'access-points';

type PreviewStatus = 'Aktiv' | 'Erlaubt' | 'Läuft ab' | 'Abgelehnt' | 'Offline';

interface PreviewRow {
  id: string;
  primary: string;
  secondary: string;
  tertiary: string;
  status: PreviewStatus;
}

interface PreviewConfig {
  title: string;
  description: string;
  columns: readonly [string, string, string];
  searchPlaceholder: string;
  rows: readonly PreviewRow[];
}

const previewConfigs: Record<PermissionsPreviewVariant, PreviewConfig> = {
  identities: {
    title: 'Identitäten',
    description: 'Personen, Rollen und Qualifikationen',
    columns: ['Person', 'Rolle', 'Qualifikation'],
    searchPlaceholder: 'Personen durchsuchen …',
    rows: [
      {
        id: 'laura-schmidt',
        primary: 'Laura Schmidt',
        secondary: 'Werkstattleitung',
        tertiary: 'Maschineneinweisung',
        status: 'Aktiv',
      },
      {
        id: 'aylin-demir',
        primary: 'Aylin Demir',
        secondary: 'Metallwerkstatt',
        tertiary: 'CNC-Fräse',
        status: 'Aktiv',
      },
      {
        id: 'paul-richter',
        primary: 'Paul Richter',
        secondary: 'Externer Techniker',
        tertiary: 'Elektrofachkraft',
        status: 'Läuft ab',
      },
      {
        id: 'clara-stein',
        primary: 'Clara Stein',
        secondary: 'Labor',
        tertiary: 'Laserschutz',
        status: 'Aktiv',
      },
    ],
  },
  events: {
    title: 'Freigaben',
    description: 'Aktuelle Entscheidungen mit Kontext',
    columns: ['Person', 'Zugangspunkt', 'Regel'],
    searchPlaceholder: 'Freigaben durchsuchen …',
    rows: [
      {
        id: 'event-1',
        primary: 'Aylin Demir',
        secondary: 'CNC-Fräse 02',
        tertiary: 'Rolle + Einweisung gültig',
        status: 'Erlaubt',
      },
      {
        id: 'event-2',
        primary: 'Laura Schmidt',
        secondary: 'Werkstatt Haupteingang',
        tertiary: 'Mo–Fr · 06:00–20:00',
        status: 'Erlaubt',
      },
      {
        id: 'event-3',
        primary: 'Paul Richter',
        secondary: 'Schaltschrank Labor',
        tertiary: 'Vier-Augen-Prinzip fehlt',
        status: 'Abgelehnt',
      },
      {
        id: 'event-4',
        primary: 'Clara Stein',
        secondary: 'Lasercutter',
        tertiary: 'Qualifikation bis 31.08.',
        status: 'Läuft ab',
      },
    ],
  },
  'access-points': {
    title: 'Zugangspunkte',
    description: 'Maschinen, Türen und Tore im Überblick',
    columns: ['Zugangspunkt', 'Bereich', 'Letzte Entscheidung'],
    searchPlaceholder: 'Zugangspunkte durchsuchen …',
    rows: [
      {
        id: 'access-1',
        primary: 'CNC-Fräse 02',
        secondary: 'Metallwerkstatt',
        tertiary: 'Aylin Demir · 10:42',
        status: 'Aktiv',
      },
      {
        id: 'access-2',
        primary: 'Werkstatt Haupteingang',
        secondary: 'Gebäude 2',
        tertiary: 'Laura Schmidt · 09:18',
        status: 'Aktiv',
      },
      {
        id: 'access-3',
        primary: 'Zufahrt Süd',
        secondary: 'Außengelände',
        tertiary: 'Lieferdienst · 08:55',
        status: 'Aktiv',
      },
      {
        id: 'access-4',
        primary: 'Schließfach 14',
        secondary: 'Materiallager',
        tertiary: 'Keine Verbindung',
        status: 'Offline',
      },
    ],
  },
};

const statusTone: Record<PreviewStatus, EmbeddableTableBadgeTone> = {
  Aktiv: 'success',
  Erlaubt: 'success',
  'Läuft ab': 'warning',
  Abgelehnt: 'danger',
  Offline: 'neutral',
};

function createColumns(config: PreviewConfig): readonly EmbeddableTableColumn<PreviewRow>[] {
  return [
    {
      id: 'primary',
      header: config.columns[0],
      accessor: 'primary',
      priority: 'primary',
      sortable: true,
      width: '30%',
    },
    {
      id: 'secondary',
      header: config.columns[1],
      accessor: 'secondary',
      priority: 'primary',
      sortable: true,
      width: '25%',
    },
    {
      id: 'tertiary',
      header: config.columns[2],
      accessor: 'tertiary',
      priority: 'secondary',
      width: '25%',
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      priority: 'primary',
      width: '20%',
      render: (row) => (
        <EmbeddableTableBadge tone={statusTone[row.status]}>{row.status}</EmbeddableTableBadge>
      ),
    },
  ];
}

export function PermissionsEmbeddedPreview({ variant }: { variant: PermissionsPreviewVariant }) {
  const config = previewConfigs[variant];
  const [selectedRow, setSelectedRow] = useState<PreviewRow | null>(null);

  return (
    <div className="h-full bg-[#171820] p-3 sm:p-4">
      <EmbeddableDataTable
        className="h-full"
        title={config.title}
        description={config.description}
        caption={`${config.title}: ${config.description}`}
        data={config.rows}
        columns={createColumns(config)}
        getRowId={(row) => row.id}
        theme="dark"
        density="compact"
        search={{ placeholder: config.searchPlaceholder }}
        onRowClick={setSelectedRow}
        getRowLabel={(row) => `${row.primary} öffnen`}
        footer={
          selectedRow ? (
            <span className="text-xs">Ausgewählt: {selectedRow.primary}</span>
          ) : undefined
        }
      />
    </div>
  );
}
