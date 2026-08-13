import { MoreHorizontal, Plus, PlusCircle, RefreshCcw, Settings2 } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  EmbeddableDataTable,
  type EmbeddableDataTableProps,
  EmbeddableTableBadge,
  EmbeddableTableButton,
  type EmbeddableTableColumn,
  EmbeddableTableVerifiedMark,
} from './embeddable-data-table';

type PresetSharedProps<TData> = Omit<
  EmbeddableDataTableProps<TData>,
  'columns' | 'getRowId' | 'title' | 'caption' | 'toolbarFilters' | 'toolbarActions'
> & {
  title?: ReactNode;
  caption?: string;
  onReload?: () => void;
  onAdd?: () => void;
  onViewOptions?: () => void;
  onFilter?: () => void;
  onRowAction?: (row: TData) => void;
};

export interface EmbeddableUserRow {
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailConfirmed?: boolean;
  status: 'active' | 'inactive';
  tagCount?: number;
}

export interface EmbeddableDeviceRow {
  id: string;
  name: string;
  type?: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  location?: string;
  lastSeen?: string;
  firmware?: string;
}

export interface EmbeddableAccessLogRow {
  id: string;
  occurredAt: string;
  status: 'granted' | 'denied' | 'active' | 'ended';
  accessPoint: string;
  device?: string;
  requester?: string;
  detail?: string;
}

function PresetToolbar({
  filterLabel,
  addLabel,
  onReload,
  onAdd,
  onViewOptions,
  onFilter,
}: {
  filterLabel: string;
  addLabel: string;
  onReload?: () => void;
  onAdd?: () => void;
  onViewOptions?: () => void;
  onFilter?: () => void;
}) {
  return {
    filters: (
      <EmbeddableTableButton icon={<PlusCircle />} onClick={onFilter}>
        {filterLabel}
      </EmbeddableTableButton>
    ),
    actions: (
      <>
        <EmbeddableTableButton icon={<RefreshCcw />} onClick={onReload}>
          Neu laden
        </EmbeddableTableButton>
        <EmbeddableTableButton icon={<Plus />} variant="default" onClick={onAdd}>
          {addLabel}
        </EmbeddableTableButton>
        <EmbeddableTableButton icon={<Settings2 />} onClick={onViewOptions}>
          Ansicht
        </EmbeddableTableButton>
      </>
    ),
  };
}

function getUserColumns(
  onRowAction?: (row: EmbeddableUserRow) => void,
): readonly EmbeddableTableColumn<EmbeddableUserRow>[] {
  return [
    {
      id: 'userName',
      header: 'Benutzername',
      accessor: 'userName',
      priority: 'primary',
      sortable: true,
      width: '21%',
      render: (row) => <span style={{ fontWeight: 500 }}>{row.userName}</span>,
    },
    {
      id: 'firstName',
      header: 'Vorname',
      accessor: 'firstName',
      priority: 'secondary',
      sortable: true,
      width: '8%',
    },
    {
      id: 'lastName',
      header: 'Nachname',
      accessor: 'lastName',
      priority: 'secondary',
      sortable: true,
      width: '9%',
    },
    {
      id: 'email',
      header: 'E-Mail',
      accessor: 'email',
      priority: 'tertiary',
      sortable: true,
      width: '25%',
      render: (row) => (
        <span style={{ display: 'inline-flex', minWidth: 0, alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.email || '—'}</span>
          {row.emailConfirmed === false ? null : <EmbeddableTableVerifiedMark />}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Aktiv',
      accessor: 'status',
      priority: 'primary',
      sortable: true,
      width: '8.5%',
      render: (row) => (
        <EmbeddableTableBadge tone={row.status === 'active' ? 'success' : 'neutral'}>
          {row.status === 'active' ? 'Aktiv' : 'Inaktiv'}
        </EmbeddableTableBadge>
      ),
    },
    {
      id: 'tags',
      header: 'Tags',
      accessor: (row) => row.tagCount ?? 0,
      priority: 'secondary',
      sortable: true,
      sortValue: (row) => row.tagCount ?? 0,
      width: '18%',
      render: (row) => (
        <EmbeddableTableButton compact>
          {row.tagCount
            ? `${row.tagCount} ${row.tagCount === 1 ? 'Zugangs-Tag' : 'Zugangs-Tags'}`
            : 'Neuen Zugangs-Tag anlernen'}
        </EmbeddableTableButton>
      ),
    },
    {
      id: 'actions',
      header: '',
      priority: 'primary',
      align: 'end',
      width: '3rem',
      render: (row) => (
        <EmbeddableTableButton
          icon={<MoreHorizontal />}
          variant="ghost"
          iconOnly
          ariaLabel={`Aktionen für ${row.userName}`}
          onClick={onRowAction ? () => onRowAction(row) : undefined}
        />
      ),
    },
  ];
}

function getDeviceColumns(
  onRowAction?: (row: EmbeddableDeviceRow) => void,
): readonly EmbeddableTableColumn<EmbeddableDeviceRow>[] {
  return [
    {
      id: 'name',
      header: 'Gerät',
      accessor: 'name',
      priority: 'primary',
      sortable: true,
      render: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span>,
    },
    {
      id: 'type',
      header: 'Typ',
      accessor: 'type',
      priority: 'secondary',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      priority: 'primary',
      render: (row) => {
        const tones = {
          online: 'success',
          offline: 'neutral',
          maintenance: 'warning',
          error: 'danger',
        } as const;
        const labels = {
          online: 'Online',
          offline: 'Offline',
          maintenance: 'Wartung',
          error: 'Fehler',
        } as const;
        return (
          <EmbeddableTableBadge tone={tones[row.status]}>{labels[row.status]}</EmbeddableTableBadge>
        );
      },
    },
    {
      id: 'location',
      header: 'Standort',
      accessor: 'location',
      priority: 'secondary',
      sortable: true,
    },
    {
      id: 'lastSeen',
      header: 'Zuletzt gesehen',
      accessor: 'lastSeen',
      priority: 'tertiary',
      sortable: true,
    },
    {
      id: 'firmware',
      header: 'Firmware',
      accessor: 'firmware',
      priority: 'tertiary',
    },
    {
      id: 'actions',
      header: '',
      priority: 'primary',
      align: 'end',
      width: '3rem',
      render: (row) => (
        <EmbeddableTableButton
          icon={<MoreHorizontal />}
          variant="ghost"
          iconOnly
          ariaLabel={`Aktionen für ${row.name}`}
          onClick={onRowAction ? () => onRowAction(row) : undefined}
        />
      ),
    },
  ];
}

function getAccessLogColumns(
  onRowAction?: (row: EmbeddableAccessLogRow) => void,
): readonly EmbeddableTableColumn<EmbeddableAccessLogRow>[] {
  return [
    {
      id: 'occurredAt',
      header: 'Zeitpunkt',
      accessor: 'occurredAt',
      priority: 'secondary',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      priority: 'primary',
      render: (row) => {
        const tones = {
          granted: 'success',
          denied: 'danger',
          active: 'info',
          ended: 'neutral',
        } as const;
        const labels = {
          granted: 'Erlaubt',
          denied: 'Abgelehnt',
          active: 'Aktiv',
          ended: 'Beendet',
        } as const;
        return (
          <EmbeddableTableBadge tone={tones[row.status]}>{labels[row.status]}</EmbeddableTableBadge>
        );
      },
    },
    {
      id: 'accessPoint',
      header: 'Zutrittspunkt',
      accessor: 'accessPoint',
      priority: 'primary',
      sortable: true,
    },
    {
      id: 'device',
      header: 'Gerät',
      accessor: 'device',
      priority: 'secondary',
      sortable: true,
    },
    {
      id: 'requester',
      header: 'Benutzer',
      accessor: 'requester',
      priority: 'tertiary',
      sortable: true,
    },
    {
      id: 'detail',
      header: 'Details',
      accessor: 'detail',
      priority: 'tertiary',
    },
    {
      id: 'actions',
      header: '',
      priority: 'primary',
      align: 'end',
      width: '3rem',
      render: (row) => (
        <EmbeddableTableButton
          icon={<MoreHorizontal />}
          variant="ghost"
          iconOnly
          ariaLabel="Protokollaktionen"
          onClick={onRowAction ? () => onRowAction(row) : undefined}
        />
      ),
    },
  ];
}

export function EmbeddableUserTable({
  title = 'Benutzer',
  description = 'Übersicht über Benutzerkonten und deren Details.',
  caption = 'Benutzerübersicht',
  search = { placeholder: 'Suchen…' },
  pageSize = 10,
  selectable = true,
  onReload,
  onAdd,
  onViewOptions,
  onFilter,
  onRowAction,
  ...props
}: PresetSharedProps<EmbeddableUserRow>) {
  const toolbar = PresetToolbar({
    filterLabel: 'Aktiv',
    addLabel: 'Benutzer hinzufügen',
    onReload,
    onAdd,
    onViewOptions,
    onFilter,
  });

  return (
    <EmbeddableDataTable
      {...props}
      title={title}
      description={description}
      caption={caption}
      columns={getUserColumns(onRowAction)}
      getRowId={(row) => row.id}
      search={search}
      pageSize={pageSize}
      selectable={selectable}
      toolbarFilters={toolbar.filters}
      toolbarActions={toolbar.actions}
    />
  );
}

export function EmbeddableDeviceTable({
  title = 'Geräte',
  description = 'Verwalte Geräte, Status und Firmware dieses Projekts.',
  caption = 'Geräteübersicht',
  search = { placeholder: 'Suchen…' },
  pageSize = 10,
  selectable = true,
  onReload,
  onAdd,
  onViewOptions,
  onFilter,
  onRowAction,
  ...props
}: PresetSharedProps<EmbeddableDeviceRow>) {
  const toolbar = PresetToolbar({
    filterLabel: 'Status',
    addLabel: 'Gerät hinzufügen',
    onReload,
    onAdd,
    onViewOptions,
    onFilter,
  });

  return (
    <EmbeddableDataTable
      {...props}
      title={title}
      description={description}
      caption={caption}
      columns={getDeviceColumns(onRowAction)}
      getRowId={(row) => row.id}
      search={search}
      pageSize={pageSize}
      selectable={selectable}
      toolbarFilters={toolbar.filters}
      toolbarActions={toolbar.actions}
    />
  );
}

export function EmbeddableAccessLogTable({
  title = 'Zugriffsprotokoll',
  description = 'Prüfe Zutrittsereignisse, Status und beteiligte Geräte.',
  caption = 'Übersicht der Zugriffsereignisse',
  search = { placeholder: 'Suchen…' },
  pageSize = 10,
  selectable = false,
  onReload,
  onViewOptions,
  onFilter,
  onRowAction,
  ...props
}: PresetSharedProps<EmbeddableAccessLogRow>) {
  const toolbar = PresetToolbar({
    filterLabel: 'Status',
    addLabel: 'Exportieren',
    onReload,
    onViewOptions,
    onFilter,
  });

  return (
    <EmbeddableDataTable
      {...props}
      title={title}
      description={description}
      caption={caption}
      columns={getAccessLogColumns(onRowAction)}
      getRowId={(row) => row.id}
      search={search}
      pageSize={pageSize}
      selectable={selectable}
      toolbarFilters={toolbar.filters}
      toolbarActions={toolbar.actions}
    />
  );
}
