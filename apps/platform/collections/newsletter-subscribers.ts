import type { CollectionConfig } from 'payload';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'subscriptionKey',
    defaultColumns: ['email', 'site', 'role', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'subscriptionKey',
      type: 'text',
      unique: true,
      required: true,
      index: true,
    },
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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'newsletter',
      options: [
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Whitepaper', value: 'whitepaper' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'consentModel',
      type: 'select',
      defaultValue: 'double-opt-in',
      options: [{ label: 'Double Opt-in', value: 'double-opt-in' }],
    },
    {
      name: 'confirmedAt',
      type: 'date',
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
    },
    {
      name: 'lastConfirmationSentAt',
      type: 'date',
    },
    {
      name: 'twentySyncStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Synced', value: 'synced' },
        { label: 'Failed', value: 'failed' },
        { label: 'Skipped', value: 'skipped' },
      ],
    },
    {
      name: 'twentyLastSyncedAt',
      type: 'date',
    },
    {
      name: 'twentyLastError',
      type: 'textarea',
    },
  ],
};
