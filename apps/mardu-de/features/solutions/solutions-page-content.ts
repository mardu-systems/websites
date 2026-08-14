import type {
  SolutionContentBlockDto,
  SolutionDetailDto,
  SolutionFeatureDto,
} from '@mardu/content-core';

export interface SolutionExplorerViewModel {
  id: string;
  index: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  updatedAt?: string;
  heroTitle: string;
  heroIntro: string;
  heroImageUrl: string;
  heroImageAlt: string;
  applications: readonly SolutionContentBlockDto[];
  benefits: readonly SolutionFeatureDto[];
  perspectiveTitle: string;
  perspectiveBody: string;
  detailMarkdown?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function createSolutionExplorerItems(
  solutions: readonly SolutionDetailDto[],
): readonly SolutionExplorerViewModel[] {
  return solutions.map((solution, itemIndex) => ({
    id: solution.id,
    index: String(itemIndex + 1).padStart(2, '0'),
    slug: solution.slug,
    title: solution.title,
    tagline: solution.tagline,
    summary: solution.summary,
    ...(solution.updatedAt ? { updatedAt: solution.updatedAt } : {}),
    heroTitle: solution.heroTitle,
    heroIntro: solution.heroIntro,
    heroImageUrl: solution.heroImageUrl,
    heroImageAlt: solution.heroImageAlt,
    applications: solution.contentBlocks,
    benefits: solution.features ?? [],
    perspectiveTitle: solution.problemTitle,
    perspectiveBody: solution.problemBody,
    ...(solution.detailMarkdown ? { detailMarkdown: solution.detailMarkdown } : {}),
    ...(solution.ctaLabel ? { ctaLabel: solution.ctaLabel } : {}),
    ...(solution.ctaHref ? { ctaHref: solution.ctaHref } : {}),
  }));
}

export const solutionsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Maschinenfreigaben, Türen, Tore und weitere Zugangspunkte mit einer zentralen Berechtigungsstruktur – passend zu',
  descriptionEmphasis: 'Menschen, Qualifikationen und realen Betriebsabläufen.',
} as const;
