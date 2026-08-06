import type { Metadata } from 'next';
import { SolutionsPage as SolutionsPageContent } from '@/features/solutions/solutions-page';

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

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SolutionsPageContent />
    </main>
  );
}
