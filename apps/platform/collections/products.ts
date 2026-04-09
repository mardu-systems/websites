import type { CollectionConfig } from 'payload';

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
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'product-technologies',
      hasMany: true,
    },
    {
      name: 'carriers',
      type: 'relationship',
      relationTo: 'product-carriers',
      hasMany: true,
    },
    {
      name: 'featureGroups',
      type: 'array',
      fields: [
        {
          name: 'groupName',
          type: 'text',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
