import { WhitepaperSection } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitepaper',
  description:
    'Whitepaper für Werkstatt-, Labor- und Hochschulverantwortliche: Zutritt, Maschinenfreigabe und Qualifikationen nachvollziehbar organisieren.',
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border py-16 md:py-24">
        <div className="mardu-container grid min-w-0 gap-12 xl:grid-cols-[0.62fr_0.38fr] xl:items-end xl:gap-20">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">[WHITEPAPER]</p>
            <h1 className="mt-6 max-w-[15ch] text-[var(--font-size-h1-fluid)] font-light leading-[0.98] tracking-[-0.04em] text-foreground">
              Zutritt und Maschinenfreigabe <EditorialAccent>klar organisieren.</EditorialAccent>
            </h1>
          </div>
          <p className="max-w-[38rem] text-base leading-relaxed text-muted-foreground xl:pb-1">
            Ein Praxisleitfaden für Unternehmenswerkstätten, Hochschulen, Labore und offene
            Werkstätten.
          </p>
        </div>
      </section>

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
