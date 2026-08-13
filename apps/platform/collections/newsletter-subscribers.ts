import type { CollectionConfig } from 'payload';

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: {
    singular: 'Newsletter-Abonnement',
    plural: 'Newsletter-Abonnements',
  },
  defaultSort: '-updatedAt',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'site', 'role', 'status', 'twentySyncStatus', 'updatedAt'],
    group: 'CRM / Leads',
    listSearchableFields: ['email', 'firstName', 'lastName', 'company'],
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
          name: 'firstName',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'lastName',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
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
          name: 'company',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'subscriptionKey',
      type: 'text',
      unique: true,
      required: true,
      index: true,
      admin: {
        description: 'Eindeutiger Hash/Schlüssel zur Identifikation des Abonnements.',
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
                { label: 'Ausstehend', value: 'pending' },
                { label: 'Synchronisiert', value: 'synced' },
                { label: 'Fehlgeschlagen', value: 'failed' },
                { label: 'Übersprungen', value: 'skipped' },
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
      options: [{ label: 'mardu.de', value: 'mardu-de' }],
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'newsletter',
      admin: { position: 'sidebar' },
      options: [{ label: 'Newsletter', value: 'newsletter' }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Ausstehend', value: 'pending' },
        { label: 'Bestätigt', value: 'confirmed' },
        { label: 'Abgemeldet', value: 'unsubscribed' },
      ],
    },
    {
      name: 'consentModel',
      type: 'select',
      defaultValue: 'double-opt-in',
      admin: { position: 'sidebar', readOnly: true },
      options: [{ label: 'Double Opt-in', value: 'double-opt-in' }],
    },
    {
      name: 'confirmedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Zeitpunkt der Double-Opt-in Bestätigung.',
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: { position: 'sidebar', readOnly: true, description: 'Zeitpunkt der Abmeldung.' },
    },
    {
      name: 'lastConfirmationSentAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Letzter Versand der DOI-E-Mail.',
      },
    },
  ],
};
