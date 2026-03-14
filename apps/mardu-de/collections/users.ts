import type { CollectionConfig } from 'payload';
import { OidcSessionStrategy } from '../lib/payload-sso-strategy.ts';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    strategies: [OidcSessionStrategy],
  },
  fields: [],
};
