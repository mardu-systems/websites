import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const ProductTechnologies: CollectionConfig = {
  slug: 'product-technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sortOrder', 'updatedAt'],
    group: 'Katalog',
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
        description: 'Eine kurze Beschreibung der Technologie für Übersichtsseiten.',
      },
    },
    {
      name: 'visualLabel',
      type: 'text',
      admin: {
        description: 'Optisches Label, das im Frontend über dem Bild dargestellt wird.',
        placeholder: 'z. B. „LTE-M / NB-IoT“',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Das Technologie-Bild (Upload).' },
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
        description: 'Alternativtext für das Bild.',
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
