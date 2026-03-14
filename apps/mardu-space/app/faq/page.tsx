import type { Metadata } from 'next';
import Faq from '@/components/utilities/faq';
import { faqItems } from '@/data/faq-items';
import { Overline } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Häufige Fragen rund um mardu.space beantwortet.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | mardu.space',
    description: 'Häufige Fragen rund um mardu.space beantwortet.',
    url: '/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ | mardu.space',
    description: 'Häufige Fragen rund um mardu.space beantwortet.',
  },
};

export default function FaqPage() {
  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Produkt</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            FAQ
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            Häufige Fragen rund um mardu.space beantwortet.
          </p>
        </div>

        <Faq items={faqItems} className="pt-8 md:pt-10" />
      </section>
    </main>
  );
}
