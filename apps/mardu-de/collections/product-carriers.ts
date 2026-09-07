import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const ProductCarriers: CollectionConfig = {
  slug: 'product-carriers',
  labels: {
    singular: 'Produktträger',
    plural: 'Produktträger',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sortOrder', 'updatedAt'],
    group: 'Katalog',
    listSearchableFields: ['name', 'slug'],
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
      type: 'row',
      fields: [
        {
          name: 'name',
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
            description: 'Wird automatisch aus dem Namen generiert.',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) => {
                if (typeof value === 'string' && value.length > 0) {
                  return formatSlug(value);
                }
                if (typeof data?.name === 'string') {
                  return formatSlug(data.name);
                }
                return value;
              },
            ],
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Eine kurze Beschreibung des Mobilfunknetz-Betreibers/Carriers.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visualLabel',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Optisches Label im Frontend.',
            placeholder: 'z. B. „Deutsche Telekom“',
          },
        },
        {
          name: 'technologyLabel',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Netzwerktechnologie-Etikett.',
            placeholder: 'z. B. „Telekom M2M“',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Das Betreiber-Logo (Upload).' },
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: { width: '50%', description: 'Alternative externe Bild-URL.' },
        },
      ],
    },
    {
      name: 'imageAlt',
      type: 'text',
      admin: {
        description: 'Alternativtext für das Betreiber-Logo.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Niedrigere Zahlen werden zuerst angezeigt.',
      },
    },
    {
      ...buildSiteVisibilityField(['mardu-de']),
      admin: { position: 'sidebar' },
    },
  ],
};
