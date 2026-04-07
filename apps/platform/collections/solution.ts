import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

// ToDo: Fix and support full Solutions
const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const SolutionPosts: CollectionConfig = {
  slug: 'solution-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'publishedAt', 'updatedAt'],
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
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc?.featured || !doc?.id) {
          return doc;
        }

        await req.payload.update({
          collection: 'solutions',
          where: {
            and: [
              {
                id: {
                  not_equals: doc.id,
                },
              },
              {
                featured: {
                  equals: true,
                },
              },
            ],
          },
          data: {
            featured: false,
          },
        });

        return doc;
      },
    ],
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 320,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    buildSiteVisibilityField(),
  ],
};
