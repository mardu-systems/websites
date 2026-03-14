import type { CollectionConfig } from 'payload';

export const PreorderRequests: CollectionConfig = {
  slug: 'preorder-requests',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'site', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'site',
      type: 'select',
      required: true,
      defaultValue: 'mardu-de',
      options: [
        { label: 'mardu.de', value: 'mardu-de' },
        { label: 'mardu.space', value: 'mardu-space' },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'received',
      options: [{ label: 'Received', value: 'received' }],
    },
    {
      name: 'emailDeliveryStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
};
