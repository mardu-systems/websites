import type { SolutionDetailDto } from '@mardu/content-core';

export interface SolutionExplorerViewModel {
  id: string;
  index: string;
  slug: string;
  navigationLabel: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  applications: readonly string[];
  benefits: readonly string[];
  perspectiveTitle: string;
  perspectiveBody: string;
}

export function createSolutionExplorerItems(
  solutions: readonly SolutionDetailDto[],
): readonly SolutionExplorerViewModel[] {
  return solutions.map((solution, itemIndex) => ({
    id: solution.id,
    index: String(itemIndex + 1).padStart(2, '0'),
    slug: solution.slug,
    navigationLabel: solution.badge ?? solution.title,
    title: solution.title,
    summary: solution.summary,
    imageUrl: solution.imageUrl,
    imageAlt: solution.imageAlt,
    applications: solution.contentBlocks.map((block) => block.title),
    benefits: solution.features?.map((feature) => feature.title) ?? [],
    perspectiveTitle: solution.problemTitle,
    perspectiveBody: solution.problemBody,
  }));
}

export const solutionsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Maschinenfreigaben, Türen, Tore und weitere Zugangspunkte mit einer zentralen Berechtigungsstruktur – passend zu',
  descriptionEmphasis: 'Menschen, Qualifikationen und realen Betriebsabläufen.',
} as const;
