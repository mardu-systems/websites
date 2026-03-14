// roadmap-timeline.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export type RoadmapCard = {
  description: string | ReactNode;
  icon?: LucideIcon;
  badge?: string; // optional small label, e.g. "Q4 2025"
  title?: string;
};

export type RoadmapMilestone = {
  title: string; // label next to the dot, e.g. "Analyse"
  time?: string; // shown under the dot, e.g. "Q4 2025", "2 Wochen"
  note?: string; // small label above the cards, e.g. "Quick Win"
  cards: RoadmapCard[]; // right side cards
};

export interface RoadmapTimelineProps {
  title?: string; // section title
  items: RoadmapMilestone[];
  className?: string;
  compact?: boolean; // tighter spacing
}

export default function RoadmapTimeline({
  title,
  items,
  className,
  compact = false,
}: RoadmapTimelineProps) {
  return (
    <section className={cn('w-full', className)}>
      {title && (
        <h2 className="headline-balance mb-10 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
      )}

      <div className={cn('relative', compact ? 'space-y-5' : 'space-y-7')}>
        <div
          className="absolute bottom-0 left-[18px] top-0 w-px bg-black/10"
          aria-hidden="true"
        />

        {items.map((m, idx) => (
          <div key={`${m.title}-${idx}`} className="relative flex gap-6 md:gap-8">
            <div className="w-11 shrink-0">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background ring-[6px] ring-[color:var(--paper)]">
                  {idx + 1}
                </div>
              </div>
            </div>

            <div className="flex-1 pb-2">
              <div className={cn('space-y-3', compact && 'space-y-2')}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground md:text-xl">
                      {m.title}
                    </h3>
                    {m.note && (
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">
                        {m.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className={cn('grid gap-6', m.cards.length > 1 ? 'md:grid-cols-2' : '')}>
                  {m.cards.map((c, cIdx) => {
                    const topRight = c.badge ?? m.time;

                    return (
                      <Card
                        key={`${c.title ?? 'card'}-${cIdx}`}
                        className={cn(
                          'relative h-full border border-black/10 bg-card shadow-none',
                        )}
                      >
                        {topRight && (
                          <div className={cn('absolute', compact ? 'top-4 right-4' : 'top-6 right-6')}>
                            <div className="border border-black/10 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/62">
                              {topRight}
                            </div>
                          </div>
                        )}

                        <CardContent
                          className={cn(
                            compact ? 'p-6' : 'p-8',
                            topRight ? (compact ? 'pr-20' : 'pr-24') : null,
                          )}
                        >
                          {c.title && (
                            <div
                              className={cn(
                                'font-semibold tracking-[-0.01em] text-foreground',
                                compact ? 'text-base md:text-lg' : 'text-lg md:text-xl',
                              )}
                            >
                              {c.title}
                            </div>
                          )}

                          <div
                            className={cn(
                              c.title ? (compact ? 'mt-3' : 'mt-4') : null,
                              'leading-relaxed text-foreground/72',
                              compact ? 'text-sm' : 'text-sm md:text-base',
                              '[&_ul]:my-0 [&_ul]:pl-5 [&_ol]:my-0 [&_ol]:pl-5 [&_p]:my-0',
                            )}
                          >
                            {typeof c.description === 'string' ? <p>{c.description}</p> : c.description}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
