import {
  getPlatformSolutionBySlug,
  getPlatformSolutions,
  getPlatformSolutionSlugs,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const site = 'mardu-space' as const;

export const getSolutions = async () => getPlatformSolutions(getPlatformOrigin(), site);

export const getSolutionBySlug = async (slug: string) =>
  getPlatformSolutionBySlug(getPlatformOrigin(), site, slug);

export const getSolutionSlugs = async () =>
  getPlatformSolutionSlugs(getPlatformOrigin(), site);
