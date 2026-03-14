// roadmap-timeline.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">{title}</h2>
      )}

      <div className={cn('relative', compact ? 'space-y-5' : 'space-y-7')}>
        {/* vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px bg-primary/10"
          aria-hidden="true"
        />

        {items.map((m, idx) => (
          <div key={`${m.title}-${idx}`} className="relative flex gap-6 md:gap-8">
            {/* timeline column */}
            <div className="w-11 shrink-0">
              <div>
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shadow-sm ring-[6px] ring-background">
                  {idx + 1}
                </div>
              </div>
            </div>

            {/* content column */}
            <div className="flex-1 pb-2">
              <div className={cn('space-y-3', compact && 'space-y-2')}>
                {/* milestone header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary">{m.title}</h3>
                    {m.note && (
                      <div className="mt-1 text-xs font-semibold tracking-wide uppercase text-primary/70">
                        {m.note}
                      </div>
                    )}
                  </div>
                </div>

                {/* right cards */}
                <div className={cn('grid gap-6', m.cards.length > 1 ? 'md:grid-cols-2' : '')}>
                  {m.cards.map((c, cIdx) => {
                    const topRight = c.badge ?? m.time;

                    return (
                      <Card
                        key={`${c.title ?? 'card'}-${cIdx}`}
                        className={cn(
                          'relative rounded-3xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-md h-full',
                          compact && 'shadow-none hover:shadow-sm',
                        )}
                      >
                        {topRight && (
                          <div className={cn('absolute', compact ? 'top-4 right-4' : 'top-6 right-6')}>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20 border-0 rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              {topRight}
                            </Badge>
                          </div>
                        )}

                        <CardContent
                          className={cn(
                            compact ? 'p-6' : 'p-8',
                            topRight ? (compact ? 'pr-20' : 'pr-24') : null,
                          )}
                        >
                          {c.title && (
                            <div className={cn('font-semibold text-primary', compact ? 'text-base md:text-lg' : 'text-lg md:text-xl')}>
                              {c.title}
                            </div>
                          )}

                          <div
                            className={cn(
                              c.title ? (compact ? 'mt-3' : 'mt-4') : null,
                              'text-muted-foreground leading-relaxed',
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
