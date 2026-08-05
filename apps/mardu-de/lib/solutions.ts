import {
  getPlatformSolutionBySlug,
  getPlatformSolutions,
  getPlatformSolutionSlugs,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import {
  getSolutionBySlug as getLocalSolutionBySlug,
  getSolutionListItems as getLocalSolutionListItems,
  getSolutionSlugs as getLocalSolutionSlugs,
} from '@/data/solutions';

const site = 'mardu-space' as const;

/** Returns published solution teasers and falls back to the app-owned editorial content. */
export const getSolutions = async () => {
  try {
    const remoteSolutions = await getPlatformSolutions(getPlatformOrigin(), site);
    return remoteSolutions.length > 0 ? remoteSolutions : getLocalSolutionListItems();
  } catch {
    return getLocalSolutionListItems();
  }
};

/** Resolves one published solution without allowing an unavailable CMS to break its route. */
export const getSolutionBySlug = async (slug: string) => {
  try {
    return (
      (await getPlatformSolutionBySlug(getPlatformOrigin(), site, slug)) ??
      getLocalSolutionBySlug(slug)
    );
  } catch {
    return getLocalSolutionBySlug(slug);
  }
};

/** Returns all published route slugs, using the local catalogue when the CMS has none. */
export const getSolutionSlugs = async () => {
  try {
    const remoteSlugs = await getPlatformSolutionSlugs(getPlatformOrigin(), site);
    return remoteSlugs.length > 0 ? remoteSlugs : getLocalSolutionSlugs();
  } catch {
    return getLocalSolutionSlugs();
  }
};
