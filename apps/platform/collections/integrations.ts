import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const MAX_FEATURED = 8;

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'availabilityStatus', 'featured', 'sortOrder', 'updatedAt'],
    group: 'Integrationen',
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

        const featuredDocs = await req.payload.find({
          collection: 'integrations',
          where: {
            featured: {
              equals: true,
            },
          },
          sort: '-updatedAt',
          limit: 200,
          pagination: false,
          depth: 0,
        });

        if (featuredDocs.docs.length <= MAX_FEATURED) {
          return doc;
        }

        const idsToUnset = featuredDocs.docs
          .slice(MAX_FEATURED)
          .map((item) => item.id)
          .filter((value): value is number => typeof value === 'number');

        if (idsToUnset.length === 0) {
          return doc;
        }

        await req.payload.update({
          collection: 'integrations',
          where: {
            id: {
              in: idsToUnset,
            },
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
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              maxLength: 220,
              admin: {
                description: 'Kurzbeschreibung für Listenansichten (max. 220 Zeichen).',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Technische Details',
          fields: [
            {
              name: 'protocols',
              type: 'relationship',
              relationTo: 'integration-protocols',
              hasMany: true,
              required: true,
              minRows: 1,
            },
            {
              name: 'useCases',
              type: 'array',
              labels: {
                singular: 'Use Case',
                plural: 'Use Cases',
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
              ],
            },
            {
              name: 'supportedActions',
              type: 'array',
              labels: {
                singular: 'Aktion',
                plural: 'Aktionen',
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
              ],
            },
            {
              name: 'compatibilityNotes',
              type: 'textarea',
              admin: {
                description: 'Besondere Hinweise zur Kompatibilität dieser Integration.',
              },
            },
          ],
        },
        {
          label: 'Verbindungen & Links',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'vendor',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. mardu GmbH' },
                },
                {
                  name: 'docsUrl',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'https://docs.mardu.de/...' },
                },
              ],
            },
            {
              name: 'requestUrl',
              type: 'text',
              admin: {
                placeholder: 'https://...',
                description: 'URL, um die Integration anzufordern, falls nicht direkt verfügbar.',
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'availabilityStatus',
      type: 'select',
      required: true,
      defaultValue: 'planned',
      admin: { position: 'sidebar' },
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Beta',
          value: 'beta',
        },
        {
          label: 'Planned',
          value: 'planned',
        },
      ],
    },
    {
      name: 'comingAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'integration-categories',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      ...buildSiteVisibilityField(),
      admin: { position: 'sidebar' },
    },
  ],
};
