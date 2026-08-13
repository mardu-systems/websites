import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Produktkategorie',
    plural: 'Produktkategorien',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'sortOrder', 'updatedAt'],
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
      name: 'eyebrow',
      type: 'text',
      admin: {
        placeholder: 'z. B. „Unsere mardu Produktfamilie“',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Eine kurze Beschreibung der Kategorie für Übersichtsseiten und Metadaten.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Das Kategorie-Bild (Upload).' },
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Alternative externe Bild-URL.',
            placeholder: '/category.webp',
          },
        },
      ],
    },
    {
      name: 'imageAlt',
      type: 'text',
      admin: {
        description: 'Alternativtext für das Kategorie-Bild.',
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        description: 'Verknüpfte Produkte dieser Kategorie.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Hebt diese Kategorie auf der Übersichtsseite hervor.',
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
