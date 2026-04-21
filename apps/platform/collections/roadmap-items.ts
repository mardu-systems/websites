import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const RoadmapItems: CollectionConfig = {
  slug: 'roadmap-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'phaseLabel', 'timeLabel', 'status', 'sortOrder', 'updatedAt'],
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
      name: 'summary',
      type: 'textarea',
      maxLength: 240,
    },
    {
      name: 'phaseLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'timeLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'status',
      type: 'select',
      enumName: 'enum_roadmap_items_roadmap_status',
      required: true,
      defaultValue: 'planned',
      options: [
        {
          label: 'Geplant',
          value: 'planned',
        },
        {
          label: 'In Arbeit',
          value: 'in-progress',
        },
        {
          label: 'Beta',
          value: 'beta',
        },
        {
          label: 'Abgeschlossen',
          value: 'done',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'software',
      options: [
        {
          label: 'Software',
          value: 'software',
        },
        {
          label: 'Hardware',
          value: 'hardware',
        },
        {
          label: 'Plattform',
          value: 'platform',
        },
        {
          label: 'Integrationen',
          value: 'integrations',
        },
      ],
    },
    {
      name: 'bodyMarkdown',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Markdown-Inhalt für die öffentliche Roadmap. Listen und kurze Absätze werden direkt auf mardu.space dargestellt.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    buildSiteVisibilityField(['mardu-space']),
  ],
};
