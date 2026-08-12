import type { Metadata } from 'next';
import { EditorialAccent, Overline } from '@mardu/ui/components/typography';
import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import NewsletterSignupForm from '@/components/utilities/newsletter-signup-form';

export const metadata: Metadata = {
  title: 'Newsletter abonnieren',
  description:
    'Abonniere den Mardu Newsletter und erhalte Updates zu Zutrittssteuerung, Maschinenfreigabe und Produktneuheiten.',
  alternates: {
    canonical: '/newsletter',
  },
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen">
      <EditorialPageHero
        eyebrow="[NEWSLETTER]"
        title={
          <>
            Neues von Mardu <EditorialAccent>direkt per E-Mail.</EditorialAccent>
          </>
        }
        description="Ausgewählte Einblicke zu Maschinenfreigabe, physischen Zugängen, Integrationen und aktuellen Entwicklungen."
      />

      <section
        className="border-b border-border py-16 md:py-24"
        aria-labelledby="newsletter-form-title"
      >
        <div className="mardu-container grid min-w-0 gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-18">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <Overline variant="editorial">[01] Anmeldung</Overline>
            <h2
              id="newsletter-form-title"
              className="mt-6 max-w-[17ch] text-[clamp(2.35rem,4vw,3.75rem)] font-light leading-[1] tracking-[-0.035em] text-foreground"
            >
              Regelmäßig informiert, ohne Informationsflut.
            </h2>
            <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              Nach dem Absenden erhältst du eine E-Mail zur Bestätigung deiner Anmeldung.
            </p>
          </div>

          <div className="min-w-0 border-t border-border">
            <div className="border-b border-border py-6">
              <Overline variant="editorial" className="tracking-[0.14em]">
                Formular
              </Overline>
              <h2 className="mt-4 text-2xl font-light tracking-[-0.025em] text-foreground">
                Newsletter abonnieren
              </h2>
            </div>

            <NewsletterSignupForm variant="editorial-index" />
          </div>
        </div>
      </section>
    </main>
  );
}
