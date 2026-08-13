# Embeddable Mardu Data Table

Kopierbarer Tabellen-Core für React, Vite und Next.js. Card, Header, Toolbar, Tabelle, Status, Auswahl und Pagination verwenden dieselben Maße und Design-Tokens wie das Mardu-Dashboard.

## Voraussetzungen

Der Ordner benötigt nur React und `lucide-react`:

```bash
bun add lucide-react
# oder: npm install lucide-react
```

## Benutzer-Tabelle einbetten

Für das fertige Mockup reichen zwei Zeilen:

```tsx
import { MarduUserTableMockup } from './data-table';

export function Demo() {
  return <MarduUserTableMockup />;
}
```

Mit eigenen Daten:

```tsx
import { EmbeddableUserTable, type EmbeddableUserRow } from './data-table';

const users: readonly EmbeddableUserRow[] = [
  {
    id: '1',
    userName: 'clara.stein@demo.mardu.local',
    firstName: 'Clara',
    lastName: 'Stein',
    email: 'clara.stein@demo.mardu.local',
    emailConfirmed: true,
    status: 'active',
    tagCount: 0,
  },
];

export function UserPreview() {
  return <EmbeddableUserTable data={users} theme="dark" />;
}
```

Ohne Callbacks bleiben „Neu laden“, „Benutzer hinzufügen“, „Ansicht“, Tags und Zeilenaktionen reine Mockup-Elemente. Suche, Sortierung, Auswahl und Pagination funktionieren lokal.

Callbacks können später schrittweise gekoppelt werden:

```tsx
<EmbeddableUserTable
  data={users}
  onReload={() => reloadUsers()}
  onAdd={() => openCreateDialog()}
  onViewOptions={() => openColumnPicker()}
  onRowAction={(row) => openMenu(row.id)}
/>
```

Weitere fertige Presets:

```tsx
<EmbeddableDeviceTable data={devices} theme="dark" />
<EmbeddableAccessLogTable data={accessLogs} theme="dark" />
```

## Beliebige Tabelle definieren

```tsx
import {
  EmbeddableDataTable,
  EmbeddableTableBadge,
  EmbeddableTableButton,
  type EmbeddableTableColumn,
} from './data-table';
import { PlusCircle, Settings2 } from 'lucide-react';

interface ProjectRow {
  id: string;
  name: string;
  owner: string;
  active: boolean;
}

const columns: readonly EmbeddableTableColumn<ProjectRow>[] = [
  {
    id: 'name',
    header: 'Projekt',
    accessor: 'name',
    priority: 'primary',
    sortable: true,
  },
  {
    id: 'owner',
    header: 'Verantwortlich',
    accessor: 'owner',
    priority: 'secondary',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'active',
    priority: 'primary',
    render: (row) => (
      <EmbeddableTableBadge tone={row.active ? 'success' : 'neutral'}>
        {row.active ? 'Aktiv' : 'Inaktiv'}
      </EmbeddableTableBadge>
    ),
  },
];

export function ProjectTable({ data }: { data: readonly ProjectRow[] }) {
  return (
    <EmbeddableDataTable
      title="Projekte"
      description="Projektstatus und Verantwortlichkeiten."
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      search={{ placeholder: 'Suchen…' }}
      toolbarFilters={<EmbeddableTableButton icon={<PlusCircle />}>Status</EmbeddableTableButton>}
      toolbarActions={<EmbeddableTableButton icon={<Settings2 />}>Ansicht</EmbeddableTableButton>}
      selectable
      pageSize={10}
      theme="dark"
    />
  );
}
```

## Responsive Spalten

- `primary`: immer sichtbar
- `secondary`: ab 560 px sichtbar
- `tertiary`: ab 860 px sichtbar

## Styling

Die Standardwerte entsprechen direkt den Mardu-Tokens. Pro Einbettung können sie überschrieben werden:

```css
.myTable {
  --edt-primary: #2563eb;
  --edt-primary-foreground: #ffffff;
  --edt-card: #ffffff;
  --edt-foreground: #121212;
  --edt-border: #dbe1ea;
}
```

## Ordner kopieren

```text
data-table/
├── embeddable-data-table.tsx
├── embeddable-data-table.module.css
├── demo-data.ts
├── mardu-user-table-mockup.tsx
├── table-presets.tsx
├── index.ts
└── README.md
```

Nicht enthalten sind API-Aufrufe, Server-Pagination, Dialoge, Menüs und Datenmutation. Im Mardu-Hauptprojekt bleibt dafür die vorhandene TanStack-`DataTable` zuständig.
