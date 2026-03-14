import type { CollectionConfig } from 'payload';

const MAX_FEATURED = 8;

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'availabilityStatus', 'featured', 'sortOrder', 'updatedAt'],
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

        const featuredDocs = await req.payload.find({
          collection: 'integrations',
          where: {
            featured: {
              equals: true,
            },
          },
          sort: '-updatedAt',
          limit: 200,
          pagination: false,
          depth: 0,
        });

        if (featuredDocs.docs.length <= MAX_FEATURED) {
          return doc;
        }

        const idsToUnset = featuredDocs.docs
          .slice(MAX_FEATURED)
          .map((item) => item.id)
          .filter((value): value is number => typeof value === 'number');

        if (idsToUnset.length === 0) {
          return doc;
        }

        await req.payload.update({
          collection: 'integrations',
          where: {
            id: {
              in: idsToUnset,
            },
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
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 220,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'availabilityStatus',
      type: 'select',
      required: true,
      defaultValue: 'planned',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Beta',
          value: 'beta',
        },
        {
          label: 'Planned',
          value: 'planned',
        },
      ],
    },
    {
      name: 'vendor',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'integration-categories',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'protocols',
      type: 'relationship',
      relationTo: 'integration-protocols',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'comingAt',
      type: 'date',
    },
    {
      name: 'docsUrl',
      type: 'text',
    },
    {
      name: 'requestUrl',
      type: 'text',
    },
    {
      name: 'useCases',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'supportedActions',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'compatibilityNotes',
      type: 'textarea',
    },
  ],
};
