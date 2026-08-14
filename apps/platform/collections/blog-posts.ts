import type { CollectionConfig } from 'payload';
import { buildSiteVisibilityField } from '@mardu/content-core';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

import { MermaidDiagram } from '../blocks/mermaid-diagram';

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blogbeitrag',
    plural: 'Blogbeiträge',
  },
  defaultSort: '-updatedAt',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'publishedAt', 'updatedAt'],
    group: 'Blog',
    listSearchableFields: ['title', 'slug', 'excerpt'],
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
          collection: 'blog-posts',
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
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { width: '60%' },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            width: '40%',
            description: 'Wird automatisch aus dem Titel generiert.',
          },
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
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: {
        description:
          'Kurzer, prägnanter Anreißer für Suchergebnisse und Listen (max. 320 Zeichen).',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Das Hauptbild des Blog-Beitrag. Empfohlen: 16:9 Querformat, mind. 1200px Breite.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [MermaidDiagram] }),
        ],
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Datum und Uhrzeit der Veröffentlichung.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'blog-authors',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      ...buildSiteVisibilityField(),
      admin: {
        position: 'sidebar',
        description: 'Steuert auf welchen Frontends dieser Inhalt sichtbar ist.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Hebt diesen Beitrag als Hauptbeitrag auf der Startseite hervor.',
      },
    },
  ],
};
