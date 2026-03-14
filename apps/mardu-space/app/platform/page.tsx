import CTASection from '@/components/utilities/cta-section';
import HeroSection from '@/components/utilities/hero-section';
import MediaPlaceholder from '@/components/utilities/media-placeholder';
import SplitContent from '@/components/utilities/split-content';
import { platformFeatures, platformViews } from '@/data/platform-page';

const heroDescription = (
  <>
    <p className="mb-4 text-lg font-medium">
      WebQ verbindet Sicherheitskontrolle und operative Verwaltung in einer Oberfläche.
    </p>
    <p>
      Die Software führt Geräte, Nutzer, Freigaben und Nachweise zusammen. So bleibt nicht nur
      sichtbar, wer was darf, sondern auch, wie Hardware, Regeln und Betrieb tatsächlich
      zusammenspielen.
    </p>
  </>
);

const introDescription = (
  <>
    <p className="text-balance">
      WebQ ist die zentrale Oberfläche hinter der Hardware. Hier laufen Gerätezustände,
      Zugriffsregeln, Qualifikationen und Protokolle zusammen.
    </p>
    <ul className="mt-10 list-inside list-disc space-y-6">
      <li>Geräte, Nutzer und Rollen in einer Oberfläche verwalten</li>
      <li>Freigaben nach Person, Gruppe, Zeit und Zugangspunkt modellieren</li>
      <li>Ereignisse, Zustände und Änderungen nachvollziehbar prüfen</li>
    </ul>
  </>
);

const introItems = [
  {
    title: 'Geräteverwaltung',
    description: 'Status, Firmware und Provisionierung zentral im Blick behalten.',
  },
  {
    title: 'Zugriffssteuerung',
    description: 'Regeln und Berechtigungen präzise statt pauschal vergeben.',
  },
  {
    title: 'Sicherheit & Audit',
    description: 'Passkeys, 2FA, Sessions und Logs in einer Oberfläche bündeln.',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection
        title="Software für Geräte, Freigaben und nachvollziehbaren Betrieb"
        description={heroDescription}
        overline="Software"
        buttonText="Konfigurator starten"
        buttonHref="/configurator"
        secondaryButtonText="Kontakt"
        secondaryButtonHref="/contact"
        imageSrc="/gateway/mounted.jpg"
        imageAlt="mardu Hardware im Werkstattkontext"
      />

      <section className="section-hairline">
        <SplitContent
          eyebrow="WebQ"
          title="Die Verwaltungsoberfläche hinter der Hardware"
          description={introDescription}
          sideTitle="Was Betreiber hier steuern"
          items={introItems}
        />
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Kernfunktionen, die sich im Alltag auszahlen
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              Statt einzelne Screens aufzuzählen, fasst WebQ die wichtigsten Verwaltungsaufgaben in
              wenige klar lesbare Produktblöcke zusammen.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.id} className="border border-black/10 bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center border border-black/10 bg-background">
                      <Icon className="h-5 w-5 text-foreground/72" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/72 md:text-base">
                    {feature.description}
                  </p>
                  <p className="mt-4 border-t border-black/8 pt-4 text-sm leading-relaxed text-foreground/58">
                    {feature.proof}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Produkt-Tour durch die wichtigsten Views
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              Für finale Screens fehlen aktuell noch die Marketing-Assets. Die Platzhalter halten
              Layout und Story stabil, bis echte UI-Views vorliegen.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {platformViews.map((view) => (
              <MediaPlaceholder
                key={view.id}
                badge={view.badge}
                title={view.title}
                description={view.description}
                aspectRatioClassName="aspect-[5/4]"
                className="min-h-[20rem]"
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Live sehen, wie WebQ Geräte, Nutzer und Zutritte zusammenführt."
        description="Nutzen Sie den Konfigurator für eine erste Einordnung oder sprechen Sie direkt mit uns über Hardware, Verwaltungslogik und passende Produktstufen."
        primaryButtonText="Konfigurator starten"
        primaryButtonHref="/configurator"
        secondaryButtonText="Kontakt aufnehmen"
        secondaryButtonHref="/contact"
      />
    </main>
  );
}
