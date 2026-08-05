import type { Metadata } from 'next';
import { SolutionsPage as SolutionsPageContent } from '@/features/solutions/solutions-page';

export const metadata: Metadata = {
  title: 'Lösungen',
  description:
    'Branchenlösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume auf mardu.space.',
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Lösungen | mardu.space',
    description:
      'Branchenlösungen für Werkstätten, Labore, Hochschulen, Makerspaces und technische Betriebsräume auf mardu.space.',
    url: '/solutions',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SolutionsPageContent />
    </main>
  );
}
