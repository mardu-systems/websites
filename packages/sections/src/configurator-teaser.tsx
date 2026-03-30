'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Settings, Sparkles } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { Overline } from '@mardu/ui/components/typography';

export interface ConfiguratorTeaserFeature {
  title: string;
  description: string;
}

export interface ConfiguratorTeaserStat {
  label: string;
  value: string;
  progress?: number;
}

export interface ConfiguratorTeaserProps {
  className?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  highlights?: ConfiguratorTeaserFeature[];
  previewEyebrow?: ReactNode;
  previewTitle?: ReactNode;
  previewDescription?: ReactNode;
  previewStats?: ConfiguratorTeaserStat[];
  previewTags?: string[];
}

const DEFAULT_HIGHLIGHTS: ConfiguratorTeaserFeature[] = [
  { title: 'Zugänge', description: 'Türen, Tore und Zonen grob erfassen' },
  { title: 'Maschinen', description: 'Freigaben und Leistungsbedarf skizzieren' },
  { title: 'Rahmen', description: 'Nutzer, Rollen und Betriebsmodell einordnen' },
];

const DEFAULT_PREVIEW_STATS: ConfiguratorTeaserStat[] = [
  { label: 'Maschinen', value: '12', progress: 66 },
  { label: 'Zugänge', value: '7', progress: 45 },
];

export default function ConfiguratorTeaser({
  className,
  eyebrow = (
    <>
      <Settings className="w-3.5 h-3.5" aria-hidden="true" />
      Interaktiver Konfigurator
    </>
  ),
  title = 'Der schnellste Weg zu einer belastbaren Erstplanung',
  description = 'Erfassen Sie Zugänge, Maschinen und Rahmenbedingungen in wenigen Schritten und schaffen Sie eine belastbare Grundlage für ein erstes Angebot.',
  ctaLabel = 'Konfigurator starten',
  ctaHref = '/configurator',
  highlights = DEFAULT_HIGHLIGHTS,
  previewEyebrow = 'Live-Vorschau',
  previewTitle = 'Typische erste Projektaufnahme',
  previewDescription = 'Die Inhalte hier sind nur exemplarisch. Das Package liefert bewusst render-nahe Props, damit jede Site ihre eigenen Zahlen, Labels und Storys einsetzen kann.',
  previewStats = DEFAULT_PREVIEW_STATS,
  previewTags = ['RFID', 'App', 'Zeitregeln'],
}: ConfiguratorTeaserProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        <ScrollReveal>
          <div className="relative overflow-hidden border border-black/10 bg-card">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-linear-to-l from-muted/40 to-transparent" />
            <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-4 h-40 w-40 rounded-full bg-foreground/[0.03] blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-20">
              <div className="space-y-8">
                <Overline className="flex items-center gap-2">{eyebrow}</Overline>

                <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                  {title}
                </h2>

                <div className="max-w-xl text-lg leading-relaxed text-foreground/72">
                  {typeof description === 'string' ? <p>{description}</p> : description}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item.title} className="border border-black/10 bg-background/70 p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                        {item.title}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-foreground/74">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button asChild>
                    <Link href={ctaHref}>
                      {ctaLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <motion.div
                  className="relative z-10 border border-black/10 bg-background p-4 md:p-5"
                  animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  <div className="border border-black/10 bg-card p-5 md:p-6">
                    {previewEyebrow ? (
                      <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                        {previewEyebrow}
                      </p>
                    ) : null}
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
                      {previewTitle}
                    </h3>
                    <div className="mt-3 text-sm leading-relaxed text-foreground/68 md:text-base">
                      {typeof previewDescription === 'string' ? (
                        <p>{previewDescription}</p>
                      ) : (
                        previewDescription
                      )}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {previewStats.map((item) => (
                        <div key={item.label} className="border border-black/10 bg-muted/20 p-4">
                          <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                            {item.label}
                          </div>
                          <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                            {item.value}
                          </div>
                          <div className="mt-3 h-1.5 overflow-hidden bg-black/8">
                            <div
                              className="h-full bg-foreground"
                              style={{ width: `${item.progress ?? 50}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {previewTags.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {previewTags.map((item) => (
                          <div
                            key={item}
                            className="inline-flex items-center gap-2 border border-black/10 bg-card px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground/64"
                          >
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            {item}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>

                <div className="absolute -bottom-5 -left-4 -z-10 h-[92%] w-[92%] rotate-[5deg] border border-black/8 bg-muted/20" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
