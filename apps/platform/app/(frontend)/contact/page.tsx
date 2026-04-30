import type { Metadata } from 'next';
import { ContactPageSection } from '@mardu/sections';
import ContactForm from '@/components/forms/contact';
import { getSiteConfig } from '@mardu/site-config';

const siteConfig = getSiteConfig('platform');

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

export default function ContactPage() {
  return (
    <ContactPageSection
      overline="Kontakt"
      title={
        <>
          Lass uns über dein{' '}
          <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
            Projekt sprechen.
          </em>
        </>
      }
      description="Melde dich bei uns – wir antworten so schnell wie möglich."
      details={{
        intro: 'Du hast Fragen oder möchtest uns besuchen? Melde dich gerne bei uns.',
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
              <a href={`mailto:${siteConfig.supportEmail}`} className="underline underline-offset-3">
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
      form={<ContactForm submit action="/api/contact" extra={{ source: 'contact-form' }} layout="card" />}
    />
  );
}
