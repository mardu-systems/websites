import { embeddableDemoUsers } from './demo-data';
import { EmbeddableUserTable } from './table-presets';

export interface MarduUserTableMockupProps {
  className?: string;
  title?: string;
  description?: string;
}

/**
 * UI-identische Benutzerverwaltung mit lokalen Beispieldaten.
 *
 * Ohne Callbacks bleiben mutierende Bedienelemente rein visuell. Suche,
 * Sortierung, Auswahl und Pagination funktionieren lokal.
 */
export function MarduUserTableMockup({
  className,
  title = 'Benutzer',
  description = 'Übersicht über Benutzerkonten und deren Details.',
}: MarduUserTableMockupProps) {
  return (
    <EmbeddableUserTable
      className={className}
      title={title}
      description={description}
      data={embeddableDemoUsers}
      theme="dark"
      density="compact"
      pageSize={10}
    />
  );
}
