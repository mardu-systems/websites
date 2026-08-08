import type { Metadata } from 'next';
import { SolutionsPage as SolutionsPageContent } from '@/features/solutions/solutions-page';
import { createSolutionExplorerItems } from '@/features/solutions/solutions-page-content';
import { getSolutionDetails } from '@/lib/solutions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lösungen',
  description:
    'Mardu-Lösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Lösungen | Mardu',
    description:
      'Mardu-Lösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume.',
    url: '/solutions',
    type: 'website',
  },
};

export default async function SolutionsPage() {
  const items = createSolutionExplorerItems(await getSolutionDetails());

  return (
    <main className="min-h-screen bg-background">
      <SolutionsPageContent items={items} />
    </main>
  );
}
