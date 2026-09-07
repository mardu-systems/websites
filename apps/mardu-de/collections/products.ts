import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produkt',
    plural: 'Produkte',
  },
  defaultSort: 'sortOrder',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'availability', 'featured', 'sortOrder', 'updatedAt'],
    group: 'Katalog',
    listSearchableFields: ['name', 'slug', 'tagline', 'summary'],
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
          label: 'Basisdaten',
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
              type: 'row',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Der smarte Allrounder“' },
                },
                {
                  name: 'badge',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Neu“ oder „Bestpreis“' },
                },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'z. B. „Mehr Power, weniger Sorgen“',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Kurze Produktzusammenfassung für Übersichtslisten.',
              },
            },
            {
              name: 'overview',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Detaillierterer Produktüberblick für den Hero-Bereich.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'detailMarkdown',
              type: 'textarea',
              admin: {
                description: 'Umfangreiche Produktdetails in Markdown-Format.',
              },
            },
          ],
        },
        {
          label: 'Eigenschaften & Preise',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'priceFrom',
                  type: 'number',
                  admin: { width: '50%', description: 'Netto-Einstiegspreis in Euro.' },
                },
                {
                  name: 'priceFromLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Ab 799 €“' },
                },
              ],
            },
            {
              name: 'featureGroups',
              type: 'array',
              labels: {
                singular: 'Feature-Gruppe',
                plural: 'Feature-Gruppen',
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
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'item',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'specGroups',
              type: 'array',
              labels: {
                singular: 'Spezifikations-Gruppe',
                plural: 'Spezifikations-Gruppen',
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
                  name: 'specs',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Medien & Beziehungen',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Das Haupt-Produktbild (Upload).' },
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
                description: 'Alternativtext für das Haupt-Produktbild.',
              },
            },
            {
              name: 'breadcrumbLabel',
              type: 'text',
              admin: {
                placeholder: 'Standardmäßig Name',
              },
            },
            {
              name: 'variants',
              type: 'relationship',
              relationTo: 'product-variants',
              hasMany: true,
              admin: {
                description: 'Verknüpfte Varianten dieses Produkts.',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'product-categories',
              hasMany: true,
              required: true,
              minRows: 1,
              admin: {
                description: 'Kategorien, denen das Produkt zugeordnet ist.',
              },
            },
            {
              name: 'technologies',
              type: 'relationship',
              relationTo: 'product-technologies',
              hasMany: true,
              required: false,
              admin: {
                description: 'Unterstützte Technologien.',
              },
            },
            {
              name: 'carriers',
              type: 'relationship',
              relationTo: 'product-carriers',
              hasMany: true,
              admin: {
                description: 'Unterstützte Mobilfunk-Provider.',
              },
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              admin: {
                description: 'Ähnliche Produkte als Empfehlung.',
              },
            },
          ],
        },
        {
          label: 'Marketing & Texte',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryCtaLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Jetzt anfragen“' },
                },
                {
                  name: 'secondaryCtaLabel',
                  type: 'text',
                  admin: { width: '50%', placeholder: 'z. B. „Datenblatt herunterladen“' },
                },
              ],
            },
            {
              name: 'technologiesHeading',
              type: 'text',
            },
            {
              name: 'technologiesIntro',
              type: 'textarea',
            },
            {
              name: 'carriersHeading',
              type: 'text',
            },
            {
              name: 'carriersIntro',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'available',
      admin: { position: 'sidebar' },
      options: [
        {
          label: 'Verfügbar',
          value: 'available',
        },
        {
          label: 'Auf Anfrage',
          value: 'lead-time',
        },
        {
          label: 'Projektgeschäft',
          value: 'project',
        },
      ],
    },
    {
      name: 'availabilityLabel',
      type: 'text',
      required: true,
      admin: { position: 'sidebar' },
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      ...buildSiteVisibilityField(['mardu-de']),
      admin: { position: 'sidebar' },
    },
  ],
};
