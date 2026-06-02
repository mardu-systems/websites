import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageKind', 'updatedAt'],
    group: 'System',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return true;
      }

      return {
        _status: {
          equals: 'published',
        },
      };
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'slug',
                  type: 'select',
                  required: true,
                  unique: true,
                  index: true,
                  admin: { width: '50%' },
                  options: [
                    {
                      label: 'Datenschutz',
                      value: 'privacy',
                    },
                    {
                      label: 'Impressum',
                      value: 'publisher',
                    },
                  ],
                },
                {
                  name: 'pageKind',
                  type: 'select',
                  required: true,
                  defaultValue: 'privacy',
                  admin: { width: '50%' },
                  options: [
                    {
                      label: 'Datenschutz',
                      value: 'privacy',
                    },
                    {
                      label: 'Impressum',
                      value: 'publisher',
                    },
                  ],
                },
              ],
            },
            {
              name: 'summary',
              type: 'textarea',
              maxLength: 240,
              admin: {
                description: 'Eine kurze Beschreibung der Seite für Listenansichten und interne Zwecke (max. 240 Zeichen).',
              },
            },
            {
              name: 'updatedLabel',
              type: 'text',
              admin: {
                description: 'Aktualisierungslabel, das auf der Seite angezeigt wird.',
                placeholder: 'z. B. „Stand: Januar 2026“',
              },
            },
            {
              name: 'contentMarkdown',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Der rechtliche Hauptinhalt der Seite im Markdown-Format (GFM).',
              },
            },
            buildSiteVisibilityField(['mardu-de', 'mardu-space', 'platform']),
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'Meta Title',
              type: 'text',
            },
            {
              name: 'seoDescription',
              label: 'Meta Description',
              type: 'textarea',
              maxLength: 320,
            },
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
