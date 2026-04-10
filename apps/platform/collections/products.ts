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
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'availability', 'featured', 'sortOrder', 'updatedAt'],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
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
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'overview',
      type: 'textarea',
      required: true,
    },
    {
      name: 'detailMarkdown',
      type: 'textarea',
    },
    {
      name: 'breadcrumbLabel',
      type: 'text',
    },
    {
      name: 'priceFromLabel',
      type: 'text',
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Lead Time',
          value: 'lead-time',
        },
        {
          label: 'Project',
          value: 'project',
        },
      ],
    },
    {
      name: 'availabilityLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'imageAlt',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'priceFrom',
      type: 'number',
    },
    {
      name: 'variants',
      type: 'relationship',
      relationTo: 'product-variants',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'product-technologies',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'carriers',
      type: 'relationship',
      relationTo: 'product-carriers',
      hasMany: true,
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
    {
      name: 'featureGroups',
      type: 'array',
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
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    buildSiteVisibilityField(['mardu-space']),
  ],
};
