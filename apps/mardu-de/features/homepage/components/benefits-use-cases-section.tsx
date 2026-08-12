import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { benefitItems, useCases } from '../homepage-content';
import { BenefitHalftoneVisual } from './benefit-halftone-visual';
import { BenefitLiftCard } from './benefit-lift-card';

const benefitModelUrls = [
  '/models/benefits/qualification-check.glb',
  '/models/benefits/supervision-lock.glb',
  '/models/benefits/evidence-proof.glb',
] as const;

const benefitModelLabels = [
  'Interaktives 3D-Häkchen für eine bestätigte Qualifikation',
  'Interaktives 3D-Schloss für kontrollierte Freigaben',
  'Interaktives 3D-Diagramm für nachvollziehbare Nachweise',
] as const;

export function BenefitsUseCasesSection() {
  return (
    <>
      <section id="nutzen" className="scroll-mt-24 border-b border-border bg-card py-16 md:py-20">
        <div className="mardu-container">
          <div className="max-w-[46rem]">
            <SectionIntro
              eyebrow="[04] Nutzen im Betrieb"
              title={
                <>
                  Mehr Nutzung. <EditorialAccent>Weniger Freigabe-Routine.</EditorialAccent>
                </>
              }
              intro={
                <p>
                  Mardu verbindet Qualifikationen mit Maschinen- und Türfreigaben. So sinkt die
                  manuelle Freigaberoutine, ohne Gefährdungsbeurteilung oder Schutzeinrichtungen zu
                  ersetzen.
                </p>
              }
              layout="stacked"
              titleClassName="mardu-homepage-section-title max-w-[16ch]"
              introClassName="text-base"
              eyebrowClassName="text-xs text-mardu-purple"
            />
          </div>

          <div className="mt-14 grid border-y border-border lg:grid-cols-3">
            {benefitItems.map((item, index) => {
              return (
                <BenefitLiftCard
                  key={item.title}
                  index={index}
                  className="relative border-b border-border py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:last:border-r-0"
                >
                  <div>
                    <div className="flex h-8 items-start justify-end gap-3">
                      <span className="text-xs text-muted-foreground">[0{index + 1}]</span>
                      {item.status ? (
                        <span className="border border-mardu-purple/25 px-2 py-1 text-xs text-mardu-purple">
                          {item.status}
                        </span>
                      ) : null}
                    </div>
                    <div
                      aria-label={benefitModelLabels[index]}
                      className="relative mx-auto size-60 overflow-visible sm:size-64"
                      role="img"
                    >
                      <BenefitHalftoneVisual modelUrl={benefitModelUrls[index]} />
                    </div>
                  </div>
                  <h3 className="mx-auto mt-7 max-w-[20rem] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[20rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </BenefitLiftCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="einsatzbereiche" className="scroll-mt-24 border-b border-border py-16 md:py-20">
        <div className="mardu-container">
          <SectionIntro
            eyebrow="[05] Einsatzbereiche"
            title={
              <>
                Für Werkstatt, Labor <EditorialAccent>und Campus.</EditorialAccent>
              </>
            }
            layout="stacked"
            className="mb-12 lg:mb-14"
            titleClassName="mardu-homepage-section-title max-w-[18ch]"
            eyebrowClassName="text-xs text-mardu-purple"
          />

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            <figure className="relative min-h-80 overflow-hidden bg-neutral-200 sm:min-h-[28rem]">
              <Image
                src="/landing/mardu-gebaeudezugang-tuere.webp"
                alt="Elektronischer Mardu-Schließzylinder an einem Gebäudeeingang"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </figure>
            <figure className="relative min-h-80 overflow-hidden bg-neutral-200 sm:min-h-[28rem]">
              <Image
                src="/landing/campus-architecture-berlin.webp"
                alt="Moderne Hochschularchitektur als beispielhafte Umgebung für gemeinsam genutzte Infrastruktur"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-3 right-3 bg-black/55 px-2.5 py-1.5 text-xs leading-none text-white/78 backdrop-blur-sm">
                Foto: Marcus Lenk · Pexels
              </figcaption>
            </figure>
          </div>

          <div className="mt-4 grid border-t border-border md:grid-cols-2">
            {useCases.map((item) => (
              <Link
                key={item.index}
                href={item.href}
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple md:px-7 md:odd:border-r lg:px-9 lg:py-8"
              >
                <span className="text-xs text-muted-foreground">[{item.index}]</span>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[23rem] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/solutions"
            className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-border text-base transition-colors hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
          >
            Alle Lösungen ansehen
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
