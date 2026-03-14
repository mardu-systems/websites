'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const featureMap = React.useMemo(() => {
    const m = new Map<string, Feature>();
    for (const f of features) m.set(f.id, f);
    return m;
  }, [features]);

  const activeFeatures = React.useMemo(() => {
    const ids = scenario?.featureIds ?? [];
    return ids
      .map((id) => featureMap.get(id))
      .filter(Boolean)
      .slice(0, 8) as Feature[];
  }, [scenario, featureMap]);

  if (!scenario) return null;

  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      <Tabs value={selectedId} onValueChange={setSelected} className="w-full">
        {/* TOP: Bild startet erst ab Subheading-Höhe */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT ROW 1: Eyebrow + Heading */}
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              {eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{heading}</h2>
          </div>

          {/* LEFT ROW 2: Subheading + 3 selectable points */}
          <div className="space-y-6 lg:col-start-1 lg:row-start-2">
            {subheading ? (
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
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
                    'rounded-2xl px-4 py-3',
                    'border border-border/40 bg-card/60',
                    'hover:bg-card transition-colors',
                    'data-[state=active]:bg-card data-[state=active]:border-border',
                    'data-[state=active]:shadow-sm',
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-primary">{s.label}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{s.teaser}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* RIGHT ROW 2: Image (aligned with subheading row) */}
          <div className="w-full lg:col-start-2 lg:row-start-2">
            {scenarios.map((s) => (
              <TabsContent key={s.id} value={s.id} className="m-0">
                <div className="rounded-3xl overflow-hidden border border-border/40 bg-card shadow-sm">
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

        {/* BOTTOM: 8 Feature tiles (switch with selection) */}
        <div className="mt-5 rounded-3xl bg-muted/30 border border-border/40 overflow-hidden">
          <div className="p-6 pt-5">
            <div className="grid gap-6 md:gap-0 md:grid-cols-4">
              {activeFeatures.map((f, idx) => (
                <div
                  key={f.id}
                  className={cn(
                    'md:px-5 md:py-2',
                    'md:border-l md:border-border/40',
                    idx % 4 === 0 && 'md:border-l-0',
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="font-medium text-primary">{f.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </section>
  );
}
