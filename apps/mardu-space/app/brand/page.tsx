import type { Metadata } from 'next';
import Image from 'next/image';
import { Overline } from '@mardu/ui/components/typography';
import Faq, { type FaqItem } from '@/components/utilities/faq';

export const metadata: Metadata = {
  title: 'Brand Assets',
  description: 'Logos und Assets von mardu.space zum Download.',
  alternates: {
    canonical: '/brand',
  },
  openGraph: {
    title: 'Brand Assets | mardu.space',
    description: 'Logos und Assets von mardu.space zum Download.',
    url: '/brand',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Brand Assets | mardu.space',
    description: 'Logos und Assets von mardu.space zum Download.',
  },
};

export default function BrandPage() {
  const brandFaqItems: FaqItem[] = [
    {
      question: 'Welches Logo nutze ich auf hellem Hintergrund?',
      answer: (
        <p>
          Auf hellen oder papierartigen Hintergründen bitte die Variante{' '}
          <strong>marduspace_logo_bg_white.svg</strong> verwenden. Diese Datei ist fuer weisse
          oder helle Hintergruende vorgesehen.
        </p>
      ),
    },
    {
      question: 'Welches Logo nutze ich auf dunklem Hintergrund?',
      answer: (
        <p>
          Auf dunklen oder schwarzen Flaechen bitte die Variante{' '}
          <strong>marduspace_logo_bg_black.svg</strong> verwenden. Diese Datei ist fuer dunkle
          Hintergruende vorgesehen.
        </p>
      ),
    },
    {
      question: 'Darf ich Farben, Proportionen oder Abstände verändern?',
      answer: (
        <p>
          Nein. Das Logo sollte nicht verzerrt, umgefärbt oder in seinen Proportionen verändert
          werden. Bitte ausreichend Freiraum um das Logo lassen und nur die bereitgestellten
          Varianten verwenden.
        </p>
      ),
    },
    {
      question: 'Welches Format sollte ich bevorzugen?',
      answer: (
        <p>
          Wenn möglich SVG verwenden. Das Format bleibt in Presse, Web und Präsentationen scharf
          skalierbar. Rasterformate nur nutzen, wenn SVG technisch nicht unterstützt wird.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-10 pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] text-foreground">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Brand</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Brand Assets
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            Hier findest du Logos von mardu.space zur Verwendung in Presse und Marketingmaterialien.
          </p>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-2 md:pt-10">
          <a href="/marduspace_logo_bg_white.svg" download className="group space-y-4">
            <div className="border border-black/10 bg-card p-8">
              <Image
                src="/marduspace_logo_bg_white.svg"
                alt="mardu.space Logo fuer weissen Hintergrund"
                width={240}
                height={120}
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="text-sm underline underline-offset-3 group-hover:text-foreground/72">
              Download Logo fuer weissen Hintergrund (SVG)
            </p>
          </a>

          <a href="/marduspace_logo_bg_black.svg" download className="group space-y-4">
            <div className="border border-black/10 bg-foreground p-8">
              <Image
                src="/marduspace_logo_bg_black.svg"
                alt="mardu.space Logo fuer schwarzen Hintergrund"
                width={240}
                height={120}
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="text-sm underline underline-offset-3 group-hover:text-foreground/72">
              Download Logo fuer schwarzen Hintergrund (SVG)
            </p>
          </a>
        </div>

        <div className="pt-12 md:pt-16">
          <div className="max-w-3xl space-y-3">
            <Overline>Hinweise</Overline>
            <h2 className="headline-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Nutzung der Brand Assets
            </h2>
            <p className="text-base leading-relaxed text-foreground/72">
              Kurz zusammengefasst, welche Logo-Variante wann eingesetzt werden sollte.
            </p>
          </div>

          <Faq items={brandFaqItems} className="pt-8 md:pt-10" />
        </div>
      </section>
    </main>
  );
}
