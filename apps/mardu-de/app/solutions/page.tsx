import type { Metadata } from 'next';
import { SolutionsPage as SolutionsPageContent } from '@/features/solutions/solutions-page';
import { createSolutionExplorerItems } from '@/features/solutions/solutions-page-content';
import { getSolutionDetails } from '@/lib/solutions';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Lösungen',
  description:
    'Mardu-Lösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume.',
  path: '/solutions',
});

export default async function SolutionsPage() {
  const items = createSolutionExplorerItems(await getSolutionDetails());

  return (
    <main className="min-h-screen bg-background">
      <SolutionsPageContent items={items} />
    </main>
  );
}
