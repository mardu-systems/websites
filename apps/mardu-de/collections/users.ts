import type { CollectionConfig } from 'payload';
import { OidcSessionStrategy } from '../lib/payload-sso-strategy.ts';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  lockDocuments: false,
  admin: {
    useAsTitle: 'email',
    group: 'System',
    listSearchableFields: ['email'],
  },
  auth: {
    strategies: [OidcSessionStrategy],
  },
  fields: [],
};
