import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

export const ProductVariants: CollectionConfig = {
  slug: 'product-variants',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'sortOrder', 'updatedAt'],
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
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: { width: '50%', description: 'Eindeutiger URL-Slug dieser Variante.' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Kurze Zusammenfassung der Variante für Vergleichstabellen.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceFromLabel',
          type: 'text',
          admin: { width: '50%', placeholder: 'z. B. „Ab 799 €“' },
        },
        {
          name: 'availabilityLabel',
          type: 'text',
          admin: { width: '50%', placeholder: 'z. B. „Sofort lieferbar“' },
        },
      ],
    },
    {
      name: 'recommendation',
      type: 'text',
      admin: {
        description: 'Zusatzhinweis oder Empfehlungs-Label.',
        placeholder: 'z. B. „Bestseller“ oder „Empfehlung“',
      },
    },
    {
      name: 'attributes',
      type: 'array',
      labels: {
        singular: 'Attribut',
        plural: 'Attribute',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: 'z. B. Ladeleistung' },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: 'z. B. 22 kW' },
            },
          ],
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
          admin: { width: '50%', description: 'Das Varianten-Bild (Upload).' },
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
