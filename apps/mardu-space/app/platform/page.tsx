import CTASectionWithRecaptcha from '@/components/utilities/cta-section-with-recaptcha';
import {
  EditorialLinkPanelsSection,
  EditorialPanelsSection,
  HeroSection,
  SplitContent,
} from '@mardu/sections';
import {
  platformEditorialLinkPanels,
  platformEditorialPanels,
  platformFeatures,
  platformNetworks,
} from '@/data/platform-page';

const heroDescription = (
  <>
    <p className="mb-4 text-lg font-medium">
      Die Plattform ist die Klammer zwischen Software, Hardware, Integrationen und Produkten.
    </p>
    <p>
      Hier wird sichtbar, wie aus Identität, Regel und lokaler Entscheidung ein belastbarer
      Betriebsablauf wird. Nicht als abstraktes Architekturdiagramm, sondern so, wie Werkstätten,
      Makerspaces, Labore und Hochschulumgebungen tatsächlich organisiert werden müssen.
    </p>
  </>
);

const introDescription = (
  <>
    <p className="text-balance">
      Sicherheit darf kein Widerspruch zur freien und kreativen Entfaltung sein. Die Plattform erklärt nicht nur einzelne Funktionen. Sie zeigt den Weg von der Person über
      die Regel bis zur tatsächlichen Freigabe an Tür, Tor oder Maschine.
    </p>
    <ul className="mt-10 list-inside list-disc space-y-6">
      <li>Software steuert Personen, Qualifikationen und Regeln (z. B. über UniNow oder SSO-Integrationen)</li>
      <li>Hardware setzt diese Entscheidungen lokal, kabellos und verlässlich um</li>
      <li>Integrationen und Produkte machen daraus ein belastbares Projektbild – ideal für Makerspaces und Hochschulen</li>
    </ul>
  </>
);

const introItems = [
  {
    title: 'Software',
    description: 'WebQ verwaltet Nutzer, Rollen, Qualifikationen, Regeln und Nachweise. Integrationen via API möglich.',
  },
  {
    title: 'Hardware',
    description: 'Zugriffspunkte, Gateways und Maschinenanbindung setzen Freigaben vor Ort um. (VdS-Zertifiziert, IP500 oder BLE)',
  },
  {
    title: 'Integrationen & Produkte',
    description: 'Bestehende Systeme und passende Komponenten werden in ein gemeinsames Setup übersetzt.',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection
        title="Wie Software, Hardware und Integrationen in mardu.space zusammenspielen"
        description={heroDescription}
        overline="Plattform"
        buttonText="Whitepaper ansehen"
        buttonHref="/whitepaper"
        secondaryButtonText="Produkte ansehen"
        secondaryButtonHref="/products"
        imageSrc="/gateway/mounted.jpg"
        imageAlt="mardu Hardware im Werkstattkontext"
      />

      <section className="section-hairline">
        <SplitContent
          eyebrow="Gesamtlogik"
          title="Vom Nutzer bis zur lokalen Freigabe läuft alles durch dieselbe Plattformlogik"
          description={introDescription}
          sideTitle="Drei Ebenen, ein System"
          items={introItems}
          variant="plain"
        />
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Kernfunktionen, die sich im Alltag auszahlen
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              Mardu sorgt für Sicherheit ohne permanente Aufsicht. Diese Blöcke zeigen, welche Rolle die Plattform
              im Zusammenspiel mit Hardware, Integrationen und realen Betriebsabläufen (z.B. Makerspaces) übernimmt.
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

      <section className="section-hairline bg-black/5">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-12">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Kabellose Mesh-Netzwerke für jede Reichweite
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/72">
              Je nach Anforderung setzen wir auf zwei ausfallsichere, kabellose Mesh-Technologien, um selbst in Altbauten oder großen Werkhallen eine störungsfreie Übertragung zu garantieren.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {platformNetworks.map((network) => {
              const Icon = network.icon;

              return (
                <article key={network.id} className="flex flex-col border border-black/10 bg-background p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black/5">
                    <Icon className="h-7 w-7 text-foreground/80" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground mb-4">
                    {network.title}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/80 mb-6">
                    {network.description}
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-foreground mb-3">Vorteile & Anwendungsbereiche</h4>
                    <ul className="list-inside list-disc space-y-2 text-sm text-foreground/70">
                      {network.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EditorialPanelsSection
        eyebrow="Systemblick"
        title="Drei Blickwinkel auf dasselbe System"
        intro="Die Plattform wird erst dann verständlich, wenn Software, Regeln und technische Infrastruktur gemeinsam betrachtet werden."
        items={platformEditorialPanels}
      />

      <EditorialLinkPanelsSection
        eyebrow="Weiter vertiefen"
        title="Von hier aus geht es in die Systemebenen"
        intro="Diese Kapitel zeigen das Zusammenspiel noch genauer: einmal aus Sicht des operativen Regelwerks und einmal aus Sicht der Hardware vor Ort."
        items={platformEditorialLinkPanels}
      />

      <CTASectionWithRecaptcha
        title="Die Plattform macht erst im Projektkontext wirklich Sinn."
        description="Wenn Sie klären möchten, welche Software-, Hardware- und Produktkombination zu Ihrem Betrieb oder Makerspace passt, gehen wir das gemeinsam durch."
        primaryButtonText="Konfigurator starten"
        primaryButtonHref="/configurator"
        secondaryButtonText="Kontakt aufnehmen"
        secondaryButtonHref="/contact"
      />
    </main>
  );
}
