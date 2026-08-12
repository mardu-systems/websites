import { WhitepaperSection } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitepaper',
  description:
    'Whitepaper für Werkstatt-, Labor- und Hochschulverantwortliche: Zutritt, Maschinenfreigabe und Qualifikationen nachvollziehbar organisieren.',
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-background">
      <EditorialPageHero
        eyebrow="[WHITEPAPER]"
        title={
          <>
            Zutritt und Maschinenfreigabe <EditorialAccent>klar organisieren.</EditorialAccent>
          </>
        }
        description="Ein Praxisleitfaden für Unternehmenswerkstätten, Hochschulen, Labore und offene Werkstätten."
      />

      <div className="pb-20 md:pb-24">
        <WhitepaperSection
          title="Whitepaper: Sicherheit & Organisation"
          description="Wie Werkstattleitungen und Sicherheitsverantwortliche Zutritt, Maschinenfreigaben und Unterweisungen nachvollziehbar organisieren – von der Identität bis zum realen Zugangspunkt."
          benefits={[
            'Personenbezogene und zeitlich definierte Berechtigungen nachvollziehbar abbilden',
            'Vergabe, Anpassung und Entzug von Rechten zentral organisieren',
            'Vorhandene Identitäten und reale Betriebsabläufe einbeziehen',
            'Unterweisungen und Ereignisse sauber dokumentieren',
          ]}
          variant="editorial-index"
        />
      </div>
    </main>
  );
}
