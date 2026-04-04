'use client';

import * as React from 'react';
import type { CatalogFeatureGroupDto, CatalogSpecGroupDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@mardu/ui/components/accordion';

export interface CatalogFeatureSpecSectionsProps {
  featureGroups: CatalogFeatureGroupDto[];
  specGroups: CatalogSpecGroupDto[];
}

export function CatalogFeatureSpecSections({
  featureGroups,
  specGroups,
}: CatalogFeatureSpecSectionsProps) {
  const [expandedSpecs, setExpandedSpecs] = React.useState<string[]>(
    specGroups.map((group) => group.title),
  );
  const hasSingleGenericFeatureGroup =
    featureGroups.length === 1 &&
    ['features', 'funktionen', 'eigenschaften', 'funktionen und eigenschaften'].includes(
      featureGroups[0]?.title.trim().toLowerCase() ?? '',
    );

  return (
    <>
      {featureGroups.length > 0 ? (
        <section className="section-hairline">
          <div className="mardu-container py-20 md:py-24">
            <Overline className="mb-3">Funktionen</Overline>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
              <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                Funktionen und Eigenschaften
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
                Keine Datenwand ohne Einordnung, sondern die Punkte, die im Betrieb wirklich relevant
                sind.
              </p>
            </div>

            <div className="mt-8 divide-y divide-black/8 border-y border-black/8">
              {featureGroups.map((group) => (
                <div
                  key={group.title}
                  className={
                    hasSingleGenericFeatureGroup
                      ? 'py-8'
                      : 'grid gap-8 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start'
                  }
                >
                  {!hasSingleGenericFeatureGroup ? (
                    <h3 className="text-[clamp(1.4rem,2.5vw,2.1rem)] font-semibold tracking-[-0.03em] text-foreground">
                      {group.title}
                    </h3>
                  ) : null}
                  <ul className="space-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {specGroups.length > 0 ? (
        <section className="section-hairline">
          <div className="mardu-container py-20 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.33fr_0.67fr] lg:items-start">
              <div className="space-y-3">
                <Overline>Technische Daten</Overline>
                <h2 className="headline-balance text-[clamp(2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.04em] text-foreground">
                  Technische Daten
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
                  <button
                    type="button"
                    className="text-primary transition-colors hover:text-primary/80"
                    onClick={() => setExpandedSpecs(specGroups.map((group) => group.title))}
                  >
                    Alles erweitern
                  </button>
                  <span className="text-foreground/28">/</span>
                  <button
                    type="button"
                    className="text-primary transition-colors hover:text-primary/80"
                    onClick={() => setExpandedSpecs([])}
                  >
                    Alles zusammenklappen
                  </button>
                </div>

                <Accordion
                  type="multiple"
                  value={expandedSpecs}
                  onValueChange={setExpandedSpecs}
                  className="w-full border-t border-black/8"
                >
                  {specGroups.map((group) => (
                    <AccordionItem
                      key={group.title}
                      value={group.title}
                      className="border-b border-black/8"
                    >
                      <AccordionTrigger className="py-7 text-left text-[clamp(1.25rem,2.2vw,1.95rem)] font-semibold tracking-[-0.03em] text-foreground hover:no-underline">
                        {group.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-8">
                        <dl className="grid gap-y-4 md:grid-cols-[0.34fr_0.66fr] md:gap-x-6">
                          {group.specs.map((spec) => (
                            <React.Fragment key={`${group.title}-${spec.label}`}>
                              <dt className="text-base font-semibold text-foreground md:text-[1.02rem]">
                                {spec.label}
                              </dt>
                              <dd className="text-base leading-relaxed text-foreground/82 md:text-[1.02rem]">
                                {spec.value}
                              </dd>
                            </React.Fragment>
                          ))}
                        </dl>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
