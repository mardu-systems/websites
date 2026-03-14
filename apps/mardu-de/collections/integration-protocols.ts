import type { CollectionConfig } from 'payload';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const IntegrationProtocols: CollectionConfig = {
  slug: 'integration-protocols',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'badgeStyle', 'sortOrder', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
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

            if (typeof data?.title === 'string') {
              return formatSlug(data.title);
            }

            return value;
          },
        ],
      },
    },
    {
      name: 'badgeStyle',
      type: 'select',
      defaultValue: 'neutral',
      options: [
        {
          label: 'Neutral',
          value: 'neutral',
        },
        {
          label: 'Success',
          value: 'success',
        },
        {
          label: 'Warn',
          value: 'warn',
        },
        {
          label: 'Info',
          value: 'info',
        },
      ],
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
};
