'use client';

import Image from 'next/image';
import { CheckCircle, Cpu, Network, ShieldCheck } from 'lucide-react';

import HardwareFeatureBlock from '@/components/utilities/hardware-feature-block';
import HardwareVariantCompare from '@/components/utilities/hardware-variant-compare';
import MediaPlaceholder from '@/components/utilities/media-placeholder';
import { useRecaptcha } from '@mardu/lead-core/recaptcha';
import { CTASection, Faq, HeroSection, InfoGrid, SplitContent } from '@mardu/sections';
import {
  hardwareFaqItems,
  hardwareFeatureBlocks,
  hardwareTrustItems,
  hardwareVariants,
} from '@/data/hardware-page';

const heroDescription = (
  <>
    <p className="mb-4 text-lg font-medium">
      Für Türen, Tore, Maschinen und Zonen, an denen Regeln wirklich gelten müssen.
    </p>
    <p>
      Hardware ist in mardu.space nicht nur Gehäuse und Elektronik. Sie ist die Ebene, auf der aus
      einer Regel in der Software eine reale Freigabe vor Ort wird.
    </p>
  </>
);

const systemOverviewDescription = (
  <>
    <p className="text-balance">
      Zugriffspunkte, Gateways und Maschinenanbindung arbeiten nicht isoliert. Sie greifen in das
      Regelwerk der Software ein und melden Zustände zurück in dieselbe Plattform.
    </p>
    <ul className="mt-10 list-inside list-disc space-y-6">
      <li>Zugriffspunkte identifizieren Personen und schalten lokal</li>
      <li>Gateways koordinieren Regeln, Netz und lokale Verfügbarkeit</li>
      <li>WebQ und Integrationen halten Entscheidungen, Logs und Zustände zusammen</li>
    </ul>
  </>
);

const systemOverviewItems = [
  {
    title: 'Zugriffspunkt',
    description: 'Liest Identität vor Ort und schaltet Tür oder Maschine direkt frei.',
    icon: ShieldCheck,
  },
  {
    title: 'Gateway',
    description: 'Koordiniert Netz, Regeln und lokalen Betrieb pro Standort oder Gebäude.',
    icon: Network,
  },
  {
    title: 'Plattform',
    description: 'Verbindet Freigaben, Rollen, Zustände und Logs in einer verwaltbaren Oberfläche.',
    icon: Cpu,
  },
];

const trustGridItems = hardwareTrustItems.map((item) => ({
  title: item.title,
  icon: item.icon,
  features: [{ label: 'Nutzen', description: item.description }],
}));

export default function Page() {
  const executeRecaptcha = useRecaptcha();

  return (
    <main className="min-h-screen bg-background">
      <HeroSection
        title="Wie mardu.space Freigaben vor Ort technisch durchsetzt"
        description={heroDescription}
        overline="Hardware"
        buttonText="Plattform ansehen"
        buttonHref="/platform"
        secondaryButtonText="Produkte ansehen"
        secondaryButtonHref="/products"
        imageSrc="/gateway/mounted.jpg"
        imageAlt="Montiertes Gateway in einer Werkstatt"
      />

      <section className="section-hairline">
        <SplitContent
          title="Wie Zugriffspunkt, Gateway und Software zusammenarbeiten"
          eyebrow="Systemaufbau"
          description={systemOverviewDescription}
          sideTitle="Drei Rollen, ein Ablauf"
          sideIcon={CheckCircle}
          items={systemOverviewItems}
          variant="plain"
        />
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              Hardware, die im Betrieb Wert schafft
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              Diese Abschnitte erklären nicht nur einzelne Geräte. Sie zeigen, wie Hardware,
              Software, Integrationen und passende Produkte im Betrieb zusammenwirken.
            </p>
          </div>

          <div className="grid gap-5">
            {hardwareFeatureBlocks.map((block, index) => (
              <HardwareFeatureBlock key={block.id} block={block} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-hairline">
        <HardwareVariantCompare
          eyebrow="Produktstufen"
          title="Drei Ausbaustufen für unterschiedliche technische Ausgangslagen"
          description="Nicht jede Umgebung braucht dieselbe Tiefe im Systemaufbau. Die Produktstufen helfen dabei, aus Schaltpunkten, Vernetzung und Betriebsanspruch die passende Basis zu wählen."
          variants={hardwareVariants}
        />
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                Inside the Hardware
              </p>
              <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                Eigenentwickelte Hardware für den realen Betrieb
              </h2>
              <p className="max-w-[58ch] text-sm leading-relaxed text-foreground/72 md:text-base">
                Innenansichten und Baugruppen sind hier kein Selbstzweck. Sie zeigen, dass die
                Hardware für Integration, Wartbarkeit und belastbare Einbindung in reale Umgebungen
                gebaut wurde.
              </p>
              <ul className="space-y-3 border-t border-black/8 pt-5">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>
                    Innenleben und Gehäuse sind Teil der Produktqualität, nicht nur der Optik.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>
                    Die Hardware ist auf robuste Integration mit Regeln, Netz und Plattform
                    ausgelegt.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>
                    Technische Details werden nur so weit gezeigt, wie sie Vertrauen und Einordnung
                    verbessern.
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.12fr_0.88fr]">
              <div className="relative aspect-[16/11] overflow-hidden border border-black/10 bg-card">
                <Image
                  src="/gateway/inside.jpg"
                  alt="Innenansicht des Gateways"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <MediaPlaceholder
                badge="PCB"
                title="Platine / Baugruppe"
                description="Platzhalter für eine saubere Board- oder PCB-Ansicht, sobald das finale Detailmotiv vorliegt."
                aspectRatioClassName="aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-hairline">
        <InfoGrid
          eyebrow="Vertrauenselemente"
          title="Worauf Betreiber bei der Hardware vertrauen können"
          intro="Die Hardware schafft belastbare Freigaben vor Ort und bindet sie sauber in Software, Betrieb und Administration ein."
          items={trustGridItems}
          variant="cards"
        />
      </section>

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              FAQ zur Hardware, Einführung und Variantenwahl
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              Die wichtigsten Fragen zur Einordnung, Installation und Auswahl der passenden
              Produktstufe.
            </p>
          </div>
          <Faq items={hardwareFaqItems} variant="lined" />
        </div>
      </section>

      <CTASection
        title="Wenn die Hardware-Frage geklärt ist, wird das Projekt deutlich konkreter."
        description="Gehen Sie als Nächstes in die Plattform- oder Software-Seite, wenn Sie das Regelwerk besser verstehen möchten, oder direkt in den Konfigurator für ein erstes Setup."
        primaryButtonText="Konfigurator starten"
        primaryButtonHref="/configurator"
        secondaryButtonText="Zur Software"
        secondaryButtonHref="/verwaltungssoftware"
        newsletterDialog={{ getRequestToken: executeRecaptcha }}
      />
    </main>
  );
}
