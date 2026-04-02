import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import * as flags from '../../../../flags';

/**
 * Vercel Flags discovery endpoint for the mardu.de project.
 * Exposes the app-local flag definitions to Flags Explorer.
 */
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
