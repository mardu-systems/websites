import { createFlagsDiscoveryEndpoint } from 'flags/next';
import { getProviderData } from '@flags-sdk/vercel';
import * as flags from '../../../../flags';

/**
 * Vercel Flags discovery endpoint for the mardu.space project.
 * Exposes the app-local flag definitions to Flags Explorer.
 */
export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
