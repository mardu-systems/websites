import type { Metadata } from 'next';
import { SolutionsPage as SolutionsPageContent } from '@/features/solutions/solutions-page';
import { createSolutionExplorerItems } from '@/features/solutions/solutions-page-content';
import { getSolutionDetails } from '@/lib/solutions';
import { createPageMetadata } from '@/lib/seo';
import { isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Lösungen',
  description:
    'Mardu-Lösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume.',
  path: '/solutions',
});

export default async function SolutionsPage({
  searchParams,
}: {
  searchParams: Promise<{ solution?: string | string[] }>;
}) {
  const requestedSolution = (await searchParams).solution;
  const initialSlug = typeof requestedSolution === 'string' ? requestedSolution : undefined;
  const [solutions, integrationsEnabled] = await Promise.all([
    getSolutionDetails(),
    isIntegrationsEnabled('mardu-de'),
  ]);
  const items = createSolutionExplorerItems(solutions);

  return (
    <main className="min-h-screen bg-background">
      <SolutionsPageContent
        items={items}
        integrationsEnabled={integrationsEnabled}
        initialSlug={initialSlug}
      />
    </main>
  );
}
