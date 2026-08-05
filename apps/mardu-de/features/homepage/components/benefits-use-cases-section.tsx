import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChartNoAxesCombined, ListTree, UnlockKeyhole } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { benefitItems, mediaBriefs, useCases } from '../homepage-content';
import { HomepageMediaPlaceholder } from './homepage-media-placeholder';

const benefitIcons = [ListTree, UnlockKeyhole, ChartNoAxesCombined] as const;

export function BenefitsUseCasesSection() {
  return (
    <>
      <section id="nutzen" className="scroll-mt-24 border-b border-border bg-card py-16 md:py-24">
        <div className="mardu-container">
          <div className="grid gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:items-end lg:gap-16">
            <SectionIntro
              eyebrow="[04] Nutzen im Betrieb"
              title={
                <>
                  Infrastruktur zugänglich machen.{' '}
                  <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                    Kontrolle behalten.
                  </em>
                </>
              }
              intro={
                <p>
                  Mardu reduziert getrennte Verwaltungswege und schafft eine gemeinsame Sicht auf
                  Identitäten, Ressourcen und Berechtigungen.{' '}
                  <strong className="font-medium text-foreground/82">
                    Mehr Nutzung wird möglich, ohne organisatorische Regeln unsichtbar zu machen.
                  </strong>
                </p>
              }
              layout="stacked"
              titleClassName="mardu-homepage-section-title max-w-[16ch]"
              introClassName="text-base"
              eyebrowClassName="text-xs text-mardu-purple"
            />
            <HomepageMediaPlaceholder brief={mediaBriefs.operationsDashboard} compact />
          </div>

          <div className="mt-14 grid border-y border-border lg:grid-cols-3">
            {benefitItems.map((item, index) => {
              const Icon = benefitIcons[index] ?? ListTree;

              return (
                <article
                  key={item.title}
                  className="border-b border-border py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-9 lg:last:border-r-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 items-center justify-center border border-border text-mardu-purple">
                      <Icon className="size-5 stroke-[1.5]" aria-hidden="true" />
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">[0{index + 1}]</span>
                      {item.status ? (
                        <span className="border border-mardu-purple/25 px-2 py-1 text-xs text-mardu-purple">
                          {item.status}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <h3 className="mt-9 text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[28rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="einsatzbereiche" className="scroll-mt-24 border-b border-border py-16 md:py-24">
        <div className="mardu-container">
          <SectionIntro
            eyebrow="[05] Einsatzbereiche"
            title={
              <>
                Lösungen für Ihren{' '}
                <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                  Anwendungsfall.
                </em>
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
              <article
                key={item.index}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-7 md:px-7 md:odd:border-r lg:px-9 lg:py-8"
              >
                <span className="text-xs text-muted-foreground">[{item.index}]</span>
                <div>
                  <h3 className="max-w-[23rem] text-[1.375rem] font-light leading-tight tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-9 inline-flex min-h-11 items-center gap-3 border-b border-border text-base transition-colors hover:border-mardu-purple hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
          >
            Einsatzbereich besprechen
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
