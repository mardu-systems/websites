import type { Metadata } from 'next';
import NewsletterSignupForm from '@/components/utilities/newsletter-signup-form';

export const metadata: Metadata = {
  title: 'Newsletter abonnieren',
  description:
    'Abonnieren Sie den Mardu Newsletter und erhalten Sie Updates zu Zutrittssteuerung, Maschinenfreigabe und Produktneuheiten.',
  alternates: {
    canonical: '/newsletter',
  },
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-border py-16 md:py-24">
        <div className="mardu-container grid min-w-0 gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-18">
          <header className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">[NEWSLETTER]</p>
            <h1 className="mt-6 max-w-[15ch] text-[var(--font-size-h1-fluid)] font-light leading-[0.98] tracking-[-0.04em] text-foreground">
              Neues von Mardu{' '}
              <em className="font-serif font-normal italic tracking-[-0.025em] text-mardu-purple">
                direkt per E-Mail.
              </em>
            </h1>
            <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              Ausgewählte Einblicke zu Maschinenfreigabe, physischen Zugängen, Integrationen und
              aktuellen Entwicklungen.
            </p>
          </header>

          <div className="min-w-0 border-t border-border">
            <div className="border-b border-border py-6">
              <p className="font-mono text-xs tracking-[0.14em] text-mardu-purple">[01] Anmeldung</p>
              <h2 className="mt-4 text-2xl font-light tracking-[-0.025em] text-foreground">
                Newsletter abonnieren
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Nach dem Absenden erhalten Sie eine E-Mail zur Bestätigung Ihrer Anmeldung.
              </p>
            </div>

            <NewsletterSignupForm variant="editorial-index" />
          </div>
        </div>
      </section>
    </main>
  );
}
