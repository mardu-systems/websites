import { getPlatformSolutionDetails } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const site = 'mardu-de' as const;

export const getSolutionDetails = async () => getPlatformSolutionDetails(getPlatformOrigin(), site);
