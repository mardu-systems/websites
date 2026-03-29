import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { Overline } from '@mardu/ui/components/typography';

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
    <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container w-full py-12 md:py-16">
        <header className="max-w-3xl space-y-4 pb-8">
          <Overline>Kontakt</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Lass uns über dein{' '}
            <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
              Projekt sprechen.
            </em>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            Melde dich bei uns – wir antworten so schnell wie möglich.
          </p>
        </header>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6 pt-2 text-base leading-relaxed text-foreground/85">
            <p>Du hast Fragen oder möchtest uns besuchen? Melde dich gerne bei uns.</p>
            <div className="space-y-1">
              <p>
                <strong>Mardu GmbH</strong>
                <br />
                Alter Schlachthof 39
                <br />
                76131 Karlsruhe
                <br />
                Deutschland
              </p>
              <p>
                {/* Telefon: <a href="tel:015202189213" className="underline">015202189213</a><br/> */}
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
                Mit dem Auto erreichst du uns über die Durlacher Allee. Folge der Beschilderung
                zum Alten Schlachthof und nutze die Parkplätze auf dem Gelände.
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
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
