import type { CollectionConfig } from 'payload';

export const PreorderRequests: CollectionConfig = {
  slug: 'preorder-requests',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'site', 'status', 'createdAt'],
    group: 'CRM / Leads',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'site',
          type: 'select',
          required: true,
          defaultValue: 'mardu-de',
          admin: { width: '50%' },
          options: [
            { label: 'mardu.de', value: 'mardu-de' },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'received',
      admin: { position: 'sidebar' },
      options: [{ label: 'Received', value: 'received' }],
    },
    {
      name: 'emailDeliveryStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      admin: { position: 'sidebar', readOnly: true },
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
};
