import type { Block } from 'payload';

export const MermaidDiagram: Block = {
  slug: 'mermaidDiagram',
  interfaceName: 'MermaidDiagramBlock',
  labels: {
    singular: 'Mermaid-Diagramm',
    plural: 'Mermaid-Diagramme',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Kurzer sichtbarer Titel des Diagramms.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Beschreibt die Aussage und den Datenfluss für Screenreader und den Fehlerzustand.',
      },
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Mermaid-Quelltext, zum Beispiel ein flowchart oder sequenceDiagram.',
        rows: 16,
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optionale Bildunterschrift unter dem Diagramm.',
      },
    },
  ],
};
