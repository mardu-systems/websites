import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageKind', 'updatedAt'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'select',
              required: true,
              unique: true,
              index: true,
              options: [
                {
                  label: 'Datenschutz',
                  value: 'privacy',
                },
                {
                  label: 'Impressum',
                  value: 'publisher',
                },
              ],
            },
            {
              name: 'pageKind',
              type: 'select',
              required: true,
              defaultValue: 'privacy',
              options: [
                {
                  label: 'Datenschutz',
                  value: 'privacy',
                },
                {
                  label: 'Impressum',
                  value: 'publisher',
                },
              ],
            },
            {
              name: 'summary',
              type: 'textarea',
              maxLength: 240,
            },
            {
              name: 'updatedLabel',
              type: 'text',
            },
            {
              name: 'contentMarkdown',
              type: 'textarea',
              required: true,
            },
            buildSiteVisibilityField(['mardu-de', 'mardu-space', 'platform']),
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'Meta Title',
              type: 'text',
            },
            {
              name: 'seoDescription',
              label: 'Meta Description',
              type: 'textarea',
              maxLength: 320,
            },
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
