import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { Overline } from '@/components/ui/typography';
import { getContactPageContext, type ContactPageSearchParamsDto } from '@/lib/contact-page-context';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktiere das Team von mardu.space und erfahre, wie du uns im Alten Schlachthof erreichst.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Kontakt | mardu.space',
    description:
      'Kontaktiere das Team von mardu.space und erfahre, wie du uns im Alten Schlachthof erreichst.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kontakt | mardu.space',
    description:
      'Kontaktiere das Team von mardu.space und erfahre, wie du uns im Alten Schlachthof erreichst.',
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<ContactPageSearchParamsDto>;
}) {
  const resolvedSearchParams = await searchParams;
  const context = getContactPageContext(resolvedSearchParams);

  return (
    <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container w-full py-12 md:py-16">
        <header className="max-w-3xl space-y-4 pb-8">
          <Overline>{context.overline}</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            {context.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {context.description}
          </p>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6 pt-2 text-base leading-relaxed text-foreground/85">
            <p>{context.intro}</p>
            <div className="space-y-1">
              <p>
                <strong>Mardu GmbH</strong>
                <br />
                A1
                <br />
                Alter Schlachthof 39
                <br />
                76131 Karlsruhe
                <br />
                Deutschland
              </p>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@mardu.de" className="underline underline-offset-3">
                  info@mardu.de
                </a>
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-[-0.01em]">Anfahrt</h2>
              <p>
                Unser Büro befindet sich im Kreativpark Alter Schlachthof in Karlsruhe. Die
                Straßenbahnhaltestellen Tullastraße sowie Gottesauer Platz/BGV (Linien 1 und 2)
                liegen nur wenige Minuten zu Fuß entfernt.
              </p>
              <p>
                Mit dem Auto erreichst du uns über die Durlacher Allee. Folge der Beschilderung zum
                Alten Schlachthof und nutze die Parkplätze auf dem Gelände.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-[-0.01em]">Schreib uns</h2>
              <p>
                Gib uns einfach deine Kontaktdaten und eine kurze Beschreibung deines Vorhabens.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <ContactForm
              source={context.source}
              initialMessage={context.initialMessage}
              submitLabel={context.submitLabel}
              successMessage={context.successMessage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
