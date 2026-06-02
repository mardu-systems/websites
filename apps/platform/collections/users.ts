import type { CollectionConfig } from 'payload';
import { OidcSessionStrategy } from '../lib/payload-sso-strategy.ts';

export const Users: CollectionConfig = {
  slug: 'users',
  lockDocuments: false,
  admin: {
    useAsTitle: 'email',
    group: 'System',
  },
  auth: {
    strategies: [OidcSessionStrategy],
  },
  fields: [],
};
