import type { Metadata } from 'next';
import { ContactPageSection } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import ContactForm from '@/components/forms/contact';
import { getSiteConfig } from '@mardu/site-config';
import { parseCatalogInquiryContext } from '@/lib/catalog';

const siteConfig = getSiteConfig('mardu-de');

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktiere das Team der Mardu GmbH und erfahre, wie du uns im Alten Schlachthof erreichst.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Kontakt | Mardu',
    description:
      'Kontaktiere das Team der Mardu GmbH und erfahre, wie du uns im Alten Schlachthof erreichst.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kontakt | Mardu',
    description:
      'Kontaktiere das Team der Mardu GmbH und erfahre, wie du uns im Alten Schlachthof erreichst.',
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const inquiryContext = parseCatalogInquiryContext(await searchParams);

  return (
    <ContactPageSection
      overline="Kontakt"
      title={
        <>
          Lass uns über dein <EditorialAccent>Projekt sprechen.</EditorialAccent>
        </>
      }
      description="Melde dich bei uns – wir antworten so schnell wie möglich."
      details={{
        intro: null,
        addressTitle: 'Adresse',
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
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="underline underline-offset-3"
              >
                {siteConfig.supportEmail}
              </a>
              <br />
              Telefon:{' '}
              <a href={siteConfig.contactPhoneHref} className="underline underline-offset-3">
                {siteConfig.contactPhone}
              </a>
            </p>
          </>
        ),
        travelTitle: 'Anfahrt',
        travelContent: (
          <>
            <p>
              Unser Büro befindet sich im Kreativpark Alter Schlachthof in Karlsruhe. Die
              Straßenbahnhaltestellen Tullastraße sowie Gottesauer Platz/BGV (Linien 1 und 2) liegen
              nur wenige Minuten zu Fuß entfernt.
            </p>
            <p>
              Mit dem Auto erreichst du uns über die Durlacher Allee. Folge der Beschilderung zum
              Alten Schlachthof und nutze die Parkplätze auf dem Gelände.
            </p>
          </>
        ),
        contactTitle: 'Beratung',
        contactContent:
          'Gib uns einfach deine Kontaktdaten und eine kurze Beschreibung deines Vorhabens – das Formular steht auf der rechten Seite bereit.',
      }}
      formTitle="Kontaktformular"
      form={
        <div className="contact-editorial-form">
          <ContactForm
            submit
            action="/api/contact"
            extra={{
              source: 'contact-form',
              ...(inquiryContext ? { config: inquiryContext } : {}),
            }}
            initialMessage={
              inquiryContext
                ? `Ich interessiere mich für ${inquiryContext.productName} und wünsche eine Beratung.`
                : undefined
            }
            layout="plain"
          />
        </div>
      }
    />
  );
}
