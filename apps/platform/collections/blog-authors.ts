import type { CollectionConfig } from 'payload';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const BlogAuthors: CollectionConfig = {
  slug: 'blog-authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Blog',
  },
  access: {
    read: () => true,
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
      type: 'row',
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
            description: 'Optimales Format: Quadratisch (z. B. 400x400 Pixel).',
          },
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Die berufliche Bezeichnung oder Rolle des Autors.',
            placeholder: 'z. B. „Lead Architect“ oder „Fachredakteur“',
          },
        },
      ],
    },
  ],
};
