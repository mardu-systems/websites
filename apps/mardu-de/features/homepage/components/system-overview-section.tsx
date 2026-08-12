import { BadgeCheck, Boxes, ContactRound, MonitorCog } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { systemLayers } from '../homepage-content';
import { SystemProductFamilyVisual } from './system-product-family-visual';

const layerIcons = [ContactRound, BadgeCheck, Boxes, MonitorCog] as const;

export function SystemOverviewSection() {
  return (
    <section id="system" className="scroll-mt-24 border-b border-border py-16 md:py-20">
      <div className="mardu-container">
        <ScrollReveal distance={32}>
          <SectionIntro
            eyebrow="[01] Das Mardu-System"
            title={
              <>
                Eine Identität. <EditorialAccent>Klare Regeln.</EditorialAccent> Jeder Zugang.
              </>
            }
            intro={
              <p>
                Eine Identität wird zur gemeinsamen Sprache für Maschine, Tür und Schranke. Mardu
                prüft, ob Person, Qualifikation, Ort und Zeit zusammenpassen.
              </p>
            }
            layout="stacked"
            className="mb-12 lg:mb-14"
            titleClassName="mardu-homepage-section-title max-w-[18ch]"
            introClassName="text-base"
            eyebrowClassName="text-xs text-mardu-purple"
          />
        </ScrollReveal>

        <div className="grid border-y border-border xl:grid-cols-[0.61fr_0.39fr]">
          <ol className="grid md:grid-cols-2 xl:grid-cols-4 xl:border-r xl:border-border">
            {systemLayers.map((item, index) => {
              const Icon = layerIcons[index] ?? Boxes;

              return (
                <li
                  key={item.index}
                  className="relative flex min-h-48 flex-col border-b border-border p-5 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 xl:min-h-[21rem] xl:border-b-0 xl:border-r xl:border-border xl:last:border-r-0"
                >
                  <ScrollReveal className="flex h-full flex-col" delay={index * 0.09} distance={30}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-mardu-purple">[{item.index}]</span>
                      <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 max-w-[14ch] text-xl font-light leading-tight tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-auto md:pt-6">
                      {item.description}
                    </p>
                  </ScrollReveal>
                  {index < systemLayers.length - 1 ? (
                    <span
                      className="absolute -right-2 top-1/2 z-10 hidden size-4 items-center justify-center bg-background text-xs text-mardu-purple xl:flex"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <SystemProductFamilyVisual />
        </div>
      </div>
    </section>
  );
}
