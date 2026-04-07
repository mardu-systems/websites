import type { Metadata } from 'next';
import { ContactPageSection } from '@mardu/sections';
import { getContactPageContext, type ContactPageSearchParamsDto } from '@/lib/contact-page-context';
import ContactForm from '@/components/forms/contact';

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
    <ContactPageSection
      overline={context.overline}
      title={context.title}
      description={context.description}
      details={{
        intro: context.intro,
        companyBlock: (
          <>
            <p>
              <strong>Mardu GmbH</strong>
              <br />
              Alter Schlachthof 39 A1
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
          </>
        ),
        travelTitle: 'Anfahrt',
        travelContent: (
          <>
            <p>
              Unser Büro befindet sich im Kreativpark Alter Schlachthof in Karlsruhe. Die
              Straßenbahnhaltestellen Tullastraße sowie Gottesauer Platz/BGV (Linien 1 und 2)
              liegen nur wenige Minuten zu Fuß entfernt.
            </p>
            <p>
              Mit dem Auto erreichst du uns über die Durlacher Allee. Folge der Beschilderung zum
              Alten Schlachthof und nutze die Parkplätze auf dem Gelände.
            </p>
          </>
        ),
        contactTitle: 'Schreib uns',
        contactContent:
          'Gib uns einfach deine Kontaktdaten und eine kurze Beschreibung deines Vorhabens.',
      }}
      form={
        <ContactForm
          submit
          action="/api/contact"
          extra={{
            source: context.source,
            ...(context.config ? { config: context.config } : {}),
          }}
          layout="card"
          initialMessage={context.initialMessage}
          submitLabel={context.submitLabel}
          successMessage={context.successMessage}
        />
      }
    />
  );
}
