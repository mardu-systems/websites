import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Eine sachliche Beschreibung des Bildes für Barrierefreiheit (Screenreader) und Suchmaschinen (SEO).',
        placeholder: 'z. B. „Eine mardu Ladestation an einer grauen Wand“',
      },
    },
  ],
};
