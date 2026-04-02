import { getSiteFlagDefinitions } from '@mardu/site-config';

const siteFlags = getSiteFlagDefinitions('mardu-space');

export const blog = siteFlags.blog;
export const integrations = siteFlags.integrations;
