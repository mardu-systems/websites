import { getPlatformSolutionDetails } from '@mardu/content-core';
import { getContentOrigin } from '@/lib/content-origin';

const site = 'mardu-de' as const;

export const getSolutionDetails = async () => getPlatformSolutionDetails(getContentOrigin(), site);
