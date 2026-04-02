import type { Metadata } from 'next';
import NewsletterSignupForm from '@/components/utilities/newsletter-signup-form';
import { Button } from '@mardu/ui/components/button';
import Link from 'next/link';

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
    <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-10 md:py-14">
        <div className="mx-auto max-w-3xl border border-border/70 bg-card p-6 shadow-sm md:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/46">Newsletter</p>
            <h1 className="headline-balance text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.96] tracking-[-0.03em] text-foreground">
              Updates von Mardu direkt per E-Mail
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/72 md:text-lg">
              Erhalten Sie Einblicke zu Zutrittssteuerung, Maschinenfreigabe, Produktneuheiten und
              ausgewählten Entwicklungen rund um Mardu.
            </p>
          </div>

          <div className="mt-8">
            <NewsletterSignupForm />
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/#contact">Zurück zur Startseite</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
