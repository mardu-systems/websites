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
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sortOrder', 'updatedAt'],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'visualLabel',
      type: 'text',
    },
    {
      name: 'technologyLabel',
      type: 'text',
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
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    buildSiteVisibilityField(['mardu-space']),
  ],
};
