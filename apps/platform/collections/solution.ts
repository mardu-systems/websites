import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: {
    singular: 'Lösung',
    plural: 'Lösungen',
  },
  defaultSort: '-updatedAt',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'publishedAt', 'updatedAt'],
    group: 'Katalog',
    listSearchableFields: ['title', 'slug', 'summary'],
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
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc?.featured || !doc?.id) {
          return doc;
        }

        await req.payload.update({
          collection: 'solutions',
          where: {
            and: [
              {
                id: {
                  not_equals: doc.id,
                },
              },
              {
                featured: {
                  equals: true,
                },
              },
            ],
          },
          data: {
            featured: false,
          },
        });

        return doc;
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basisdaten',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: '50%',
                    description: 'Wird automatisch aus dem Titel generiert.',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, data }) => {
                        if (typeof value === 'string' && value.length > 0) {
                          return formatSlug(value);
                        }
                        if (typeof data?.title === 'string') {
                          return formatSlug(data.title);
                        }
                        return value;
                      },
                    ],
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Enterprise“' },
                },
                {
                  name: 'themeTone',
                  type: 'select',
                  admin: { width: '50%', description: 'Visueller Farbton für die Seite.' },
                  options: [
                    { label: 'Forest', value: 'forest' },
                    { label: 'Sand', value: 'sand' },
                    { label: 'Mist', value: 'mist' },
                    { label: 'Clay', value: 'clay' },
                    { label: 'Ink', value: 'ink' },
                  ],
                },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              admin: { placeholder: 'z. B. „Maßgeschneiderte Ladelösungen“' },
            },
            {
              name: 'summary',
              type: 'textarea',
              admin: { description: 'Kurze Beschreibung für Lösungs-Übersichten.' },
            },
            {
              name: 'detailMarkdown',
              type: 'textarea',
              admin: { description: 'Ausführliche Beschreibung im Markdown-Format.' },
            },
          ],
        },
        {
          label: 'Hero & Problem',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              admin: { placeholder: 'Überschrift im Hero-Bereich (Standard: Titel)' },
            },
            {
              name: 'heroIntro',
              type: 'textarea',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Hero-Bild (Upload).' },
                },
                {
                  name: 'heroImageUrl',
                  type: 'text',
                  admin: { width: '50%', description: 'Alternative externe Hero-Bild-URL.' },
                },
              ],
            },
            {
              name: 'heroImageAlt',
              type: 'text',
            },
            {
              name: 'problemTitle',
              type: 'text',
              admin: { placeholder: 'z. B. „Die Herausforderung“' },
            },
            {
              name: 'problemBody',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Features & Blöcke',
          fields: [
            {
              name: 'features',
              type: 'array',
              labels: {
                singular: 'Feature',
                plural: 'Features',
              },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'contentBlocks',
              type: 'array',
              labels: {
                singular: 'Inhaltsblock',
                plural: 'Inhaltsblöcke',
              },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'eyebrow',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'body',
                  type: 'textarea',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'imageUrl',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'imageAlt',
                      type: 'text',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'imageSide',
                      type: 'select',
                      admin: { width: '50%', description: 'Ausrichtung des Bildes.' },
                      options: [
                        { label: 'Links', value: 'left' },
                        { label: 'Rechts', value: 'right' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Medien & CTAs',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'imageAlt',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Jetzt beraten lassen“' },
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „/kontakt“' },
                },
              ],
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      ...buildSiteVisibilityField(['mardu-de']),
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
