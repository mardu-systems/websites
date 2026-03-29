'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@mardu/ui/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@mardu/ui/components/tabs';
import { Overline } from '@mardu/ui/components/typography';

export type Feature = {
  id: string;
  title: string;
  description: string;
};

export type Scenario = {
  id: string; // stable key
  label: string; // "Benutzer & Rollen"
  teaser: string; // subheading für den auswählbaren Punkt
  imageSrc: string; // right side image
  imageAlt: string;

  featureIds: string[]; // pick any 0..n features; rendered max 8
};

type Props = {
  eyebrow?: string; // "Use case"
  heading: string; // "Einsatzszenarien"
  subheading?: string;

  scenarios: Scenario[];
  features: Feature[];

  defaultScenarioId?: string;
  className?: string;

  // optional controlled
  value?: string;
  onValueChange?: (id: string) => void;
};

export default function ScenarioShowcase({
  eyebrow = 'Use case',
  heading,
  subheading,
  scenarios,
  features,
  defaultScenarioId,
  className,
  value,
  onValueChange,
}: Props) {
  const first = scenarios[0]?.id;
  const initial = defaultScenarioId ?? first;

  const [internal, setInternal] = React.useState<string>(initial);
  const selectedId = value ?? internal;

  const setSelected = React.useCallback(
    (id: string) => {
      onValueChange?.(id);
      if (!onValueChange) setInternal(id);
    },
    [onValueChange],
  );

  const scenario = React.useMemo(
    () => scenarios.find((s) => s.id === selectedId) ?? scenarios[0],
    [scenarios, selectedId],
  );

  if (!scenario) return null;

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
      <Tabs value={selectedId} onValueChange={setSelected} className="w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="lg:col-start-1 lg:row-start-1">
            <Overline className="mb-3">{eyebrow}</Overline>
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {heading}
            </h2>
          </div>

          <div className="space-y-6 lg:col-start-1 lg:row-start-2">
            {subheading ? (
              <p className="max-w-prose text-sm leading-relaxed text-foreground/72 md:text-base">
                {subheading}
              </p>
            ) : null}

            <TabsList className="h-auto w-full flex flex-col items-stretch bg-transparent p-0 gap-3">
              {scenarios.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className={cn(
                    'w-full justify-start text-left whitespace-normal',
                    'min-h-11 px-4 py-4 touch-manipulation',
                    'border border-black/10 bg-card',
                    'hover:bg-background transition-colors',
                    'data-[state=active]:bg-background data-[state=active]:border-foreground/18',
                    'data-[state=active]:shadow-none',
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold tracking-[-0.01em] text-foreground">{s.label}</div>
                    <div className="text-sm leading-relaxed text-foreground/65">{s.teaser}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="w-full lg:col-start-2 lg:row-start-2">
            {scenarios.map((s) => (
              <TabsContent key={s.id} value={s.id} className="m-0">
                <div className="overflow-hidden border border-black/10 bg-card shadow-none">
                  <div className="relative w-full aspect-16/10">
                    <Image
                      src={s.imageSrc}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority={s.id === initial}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden border border-black/10 bg-muted/35">
          <div className="p-6 pt-5">
            <div className="mb-5 border-b border-black/8 pb-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                Funktionsumfang
              </p>
            </div>
            <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
              {features.map((f, idx) => (
                <div
                  key={f.id}
                  className={cn(
                    'space-y-1.5 border-black/8 px-0 py-4 md:px-5 md:py-4',
                    'border-t md:border-t',
                    idx === 0 && 'border-t-0',
                    idx === 1 && 'md:border-t-0',
                    idx < 4 && 'xl:border-t-0',
                    idx % 4 !== 0 && 'xl:border-l',
                    idx % 2 !== 0 && 'md:border-l xl:border-l',
                  )}
                >
                  <div className="font-medium text-foreground">{f.title}</div>
                  <div className="text-sm leading-relaxed text-foreground/65">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
      </div>
    </section>
  );
}
