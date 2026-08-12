import {
  BadgeCheck,
  CalendarClock,
  ContactRound,
  FileClock,
  KeyRound,
  Network,
  RefreshCw,
  ScanLine,
} from 'lucide-react';
import { SectionIntro } from '@mardu/sections';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { EditorialAccent } from '@mardu/ui/components/typography';
import { featureItems } from '../homepage-content';

const featureIcons = [
  ContactRound,
  KeyRound,
  CalendarClock,
  BadgeCheck,
  Network,
  ScanLine,
  RefreshCw,
  FileClock,
] as const;

export function FeatureCollectionSection() {
  return (
    <section
      id="features"
      aria-label="Mardu-Funktionsübersicht"
      className="scroll-mt-20 border-b border-border bg-card py-16 md:py-20"
    >
      <div className="mardu-container">
        <ScrollReveal distance={30}>
          <SectionIntro
            eyebrow="Funktionsübersicht"
            title={
              <>
                Was Mardu verbindet. <EditorialAccent>Was im Betrieb zählt.</EditorialAccent>
              </>
            }
            intro={
              <p>
                Von permission-basiertem RBAC bis zu signierten OTA-Updates: zentrale Funktionen für
                physische Zugänge in einer gemeinsamen Plattform.
              </p>
            }
            layout="stacked"
            className="mb-12 lg:mb-14"
            titleClassName="mardu-homepage-section-title max-w-[18ch]"
            introClassName="text-base"
            eyebrowClassName="text-xs text-mardu-purple"
          />
        </ScrollReveal>

        <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((item, index) => {
            const Icon = featureIcons[index] ?? BadgeCheck;

            return (
              <article
                key={item.title}
                className="border-b border-border p-5 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-last-child(-n+4)]:border-b-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <Icon className="size-6 text-mardu-purple" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-light leading-tight tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
