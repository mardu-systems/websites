'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Settings, Sparkles } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import { ScrollReveal } from '@mardu/ui/components/motion/scroll-reveal';
import { Overline } from '@mardu/ui/components/typography';
import MediaPlaceholder from '@/components/utilities/media-placeholder';

interface ConfiguratorTeaserProps {
  className?: string;
}

export default function ConfiguratorTeaser({ className }: ConfiguratorTeaserProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        <ScrollReveal>
          <div className="relative overflow-hidden border border-black/10 bg-card">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-linear-to-l from-muted/40 to-transparent" />
            <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-4 h-40 w-40 rounded-full bg-foreground/[0.03] blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 md:p-12 lg:p-20 items-center">
              <div className="space-y-8">
                <Overline className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                  Interaktiver Konfigurator
                </Overline>

                <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                  Der schnellste Weg zu einer belastbaren Erstplanung
                </h2>

                <p className="max-w-xl text-lg leading-relaxed text-foreground/72">
                  Erfassen Sie Zugänge, Maschinen und Rahmenbedingungen in wenigen Schritten und
                  schaffen Sie eine belastbare Grundlage für ein erstes Angebot.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['Zugänge', 'Türen, Tore und Zonen grob erfassen'],
                    ['Maschinen', 'Freigaben und Leistungsbedarf skizzieren'],
                    ['Anfrage', 'Kontaktdaten direkt mit übergeben'],
                  ].map(([label, copy]) => (
                    <div key={label} className="border border-black/10 bg-background/70 p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                        {label}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-foreground/76">{copy}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button asChild size="lg" className="touch-manipulation">
                    <Link href="/configurator">
                      Konfiguration starten
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end relative">
                <motion.div
                  className={cn(
                    'relative flex w-[20rem] max-w-full flex-col overflow-hidden border border-black/10 bg-background shadow-none md:w-[29rem] -rotate-[2.5deg]',
                    !shouldReduceMotion &&
                      'hover:rotate-0 transition-transform duration-500 ease-out motion-reduce:transition-none',
                  )}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                >
                  <div className="flex h-12 items-center gap-2 border-b border-black/8 bg-muted/30 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  <div className="flex-1 space-y-5 bg-background p-6">
                    <div className="border border-black/10 bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                            Schritt 1
                          </div>
                          <div className="mt-2 text-sm font-medium text-foreground">
                            Wie viele Zugangspunkte sollen gesichert werden?
                          </div>
                        </div>
                        <div className="border border-black/10 bg-background px-3 py-2 text-lg font-semibold tabular-nums text-foreground">
                          5
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="border border-black/10 bg-muted/20 p-4">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                          Maschinen
                        </div>
                        <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                          12
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden bg-black/8">
                          <div className="h-full w-2/3 bg-foreground" />
                        </div>
                      </div>
                      <div className="border border-black/10 bg-muted/20 p-4">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/48">
                          Zugänge
                        </div>
                        <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                          7
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden bg-black/8">
                          <div className="h-full w-[45%] bg-foreground" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {['RFID', 'App', 'Zeitregeln'].map((item) => (
                        <div
                          key={item}
                          className="inline-flex items-center gap-2 border border-black/10 bg-card px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground/64"
                        >
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="absolute -bottom-5 -left-4 -z-10 h-[92%] w-[92%] border border-black/8 bg-muted/20 rotate-[5deg]" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
