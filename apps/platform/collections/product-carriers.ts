import type { CollectionConfig } from 'payload';

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
  ],
};
