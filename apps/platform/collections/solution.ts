import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const Solutions: CollectionConfig = {
  slug: 'solutions',
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
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'themeTone',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    {
      name: 'heroTitle',
      type: 'text',
    },
    {
      name: 'heroIntro',
      type: 'textarea',
    },
    {
      name: 'problemTitle',
      type: 'text',
    },
    {
      name: 'problemBody',
      type: 'textarea',
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaHref',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contentBlocks',
      type: 'array',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'body',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageSide',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
    buildSiteVisibilityField(),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
