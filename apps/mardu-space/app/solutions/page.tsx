import type { Metadata } from 'next';
import { CTASection } from '@mardu/sections';
import { SolutionsGrid, SolutionsHero } from '@mardu/solutions-ui';
import { getSolutionListItems } from '@/data/solutions';

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

const solutions = getSolutionListItems();

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SolutionsHero
        eyebrow="Lösungen"
        title="Branchenlösungen für reale Betriebsmodelle"
        highlights={[
          'Werkstätten',
          'Labore',
          'Hochschulen',
          'Makerspaces',
          'Technische Betriebsräume',
        ]}
      />

      <SolutionsGrid
        eyebrow="Branchen"
        title="Wo Mardu im Alltag wirklich ansetzt"
        intro="Jede Lösung zeigt dieselbe Grundidee in einem anderen Kontext: weniger Schlüssel- und Sonderprozesslogik, mehr klare Freigaben, sichtbare Verantwortung und ein ruhigerer Betrieb."
        items={solutions}
        buildHref={(solution) => `/solutions/${solution.slug}`}
      />

      <CTASection
        title="Noch nicht sicher, welche Lösung am besten passt?"
        description="Dann starten Sie nicht mit einer festen Produktauswahl, sondern mit einer strukturierten Einordnung Ihres Betriebsmodells. Daraus ergibt sich, welche Zutritts- und Freigabelogik wirklich sinnvoll ist."
        primaryButtonText="Konfigurator starten"
        primaryButtonHref="/configurator"
        secondaryButtonText="Kontakt aufnehmen"
        secondaryButtonHref="/contact?source=contact-form"
      />
    </main>
  );
}
