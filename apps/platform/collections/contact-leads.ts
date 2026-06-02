import type { CollectionConfig, CollectionSlug } from 'payload';

export const ContactLeads: CollectionConfig = {
  slug: 'contact-leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'site', 'source', 'twentySyncStatus', 'createdAt'],
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
          name: 'name',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'company',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'config',
      type: 'json',
      admin: {
        description: 'Vollständige JSON-Konfiguration (z. B. aus dem Produktkonfigurator).',
      },
    },
    {
      name: 'newsletterSubscriber',
      type: 'relationship',
      relationTo: 'newsletter-subscribers' as unknown as CollectionSlug,
      admin: {
        description: 'Verknüpftes Newsletter-Abonnement.',
      },
    },
    {
      type: 'collapsible',
      label: 'Twenty CRM Sync-Daten (Schreibgeschützt)',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'twentySyncStatus',
              type: 'select',
              required: true,
              defaultValue: 'pending',
              admin: { readOnly: true, width: '50%' },
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
              admin: { readOnly: true, width: '50%' },
            },
          ],
        },
        {
          name: 'twentyLastError',
          type: 'textarea',
          admin: { readOnly: true },
        },
      ],
    },
    // Sidebar fields
    {
      name: 'site',
      type: 'select',
      required: true,
      defaultValue: 'mardu-de',
      admin: { position: 'sidebar' },
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
      admin: { position: 'sidebar' },
      options: [
        { label: 'Kontaktformular', value: 'contact-form' },
        { label: 'Konfigurator', value: 'configurator' },
        { label: 'Admin Software', value: 'admin-software' },
      ],
    },
    {
      name: 'consent',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Einwilligung in Datenschutzerklärung erteilt.' },
    },
    {
      name: 'newsletterOptIn',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Wunsch für Newsletter-Anmeldung geäußert.' },
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
