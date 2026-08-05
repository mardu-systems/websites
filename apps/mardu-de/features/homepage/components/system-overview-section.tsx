import { BadgeCheck, Boxes, ContactRound, MonitorCog } from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { mediaBriefs, systemLayers } from '../homepage-content';
import { HomepageMediaPlaceholder } from './homepage-media-placeholder';

const layerIcons = [ContactRound, BadgeCheck, Boxes, MonitorCog] as const;

export function SystemOverviewSection() {
  return (
    <section id="system" className="scroll-mt-24 border-b border-border py-16 md:py-24">
      <div className="mardu-container">
        <SectionIntro
          eyebrow="[01] Das Mardu-System"
          title={
            <>
              Das Ökosystem für{' '}
              <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
                Zutritt und Zugriff.
              </em>{' '}
              In einem System.
            </>
          }
          intro={
            <p>
              Eine Identität wird zur gemeinsamen Sprache für Maschine, Tür und Schranke. Mardu
              prüft nicht nur, wer vor einem Zugang steht, sondern{' '}
              <strong className="font-medium text-foreground/82">
                ob Nutzung, Ort und Zeitpunkt zusammenpassen.
              </strong>
            </p>
          }
          layout="stacked"
          className="mb-12 lg:mb-14"
          titleClassName="mardu-homepage-section-title max-w-[18ch]"
          introClassName="text-base"
          eyebrowClassName="text-xs text-mardu-purple"
        />

        <div className="grid border-y border-border xl:grid-cols-[0.61fr_0.39fr]">
          <ol className="grid md:grid-cols-2 xl:grid-cols-4 xl:border-r xl:border-border">
            {systemLayers.map((item, index) => {
              const Icon = layerIcons[index] ?? Boxes;

              return (
                <li
                  key={item.index}
                  className="relative flex flex-col border-b border-border p-5 md:p-6 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 xl:min-h-[31rem] xl:border-b-0 xl:border-r xl:border-border xl:last:border-r-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-mardu-purple">[{item.index}]</span>
                    <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 max-w-[14ch] text-[1.375rem] font-light leading-tight tracking-[-0.02em] md:mt-10">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-snug text-muted-foreground md:mt-auto md:pt-10 md:leading-relaxed">
                    {item.description}
                  </p>
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

          <HomepageMediaPlaceholder
            brief={mediaBriefs.accessPanorama}
            className="min-h-[31rem] border-0"
          />
        </div>
      </div>
    </section>
  );
}
