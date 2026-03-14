import type { CollectionConfig, CollectionSlug } from 'payload';

export const ContactLeads: CollectionConfig = {
  slug: 'contact-leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'site', 'source', 'createdAt'],
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
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'contact-form',
      options: [
        { label: 'Kontaktformular', value: 'contact-form' },
        { label: 'Konfigurator', value: 'configurator' },
        { label: 'Admin Software', value: 'admin-software' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'consent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'newsletterOptIn',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'config',
      type: 'json',
    },
    {
      name: 'newsletterSubscriber',
      type: 'relationship',
      relationTo: 'newsletter-subscribers' as unknown as CollectionSlug,
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
