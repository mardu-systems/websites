// roadmap-timeline.tsx
import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Card, CardContent } from '@mardu/ui/components/card';
import { Badge } from '@mardu/ui/components/badge';
import { LucideIcon } from 'lucide-react';
import { Overline } from '@mardu/ui/components/typography';

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
  eyebrow?: ReactNode;
  title?: string; // section title
  intro?: ReactNode;
  items: RoadmapMilestone[];
  className?: string;
  compact?: boolean; // tighter spacing
  variant?: 'default' | 'plain';
}

export default function RoadmapTimeline({
  eyebrow,
  title,
  intro,
  items,
  className,
  compact = false,
  variant = 'default',
}: RoadmapTimelineProps) {
  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
      {title ? (
        intro ? (
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:items-start">
            <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {title}
            </h2>
            <div className="text-sm leading-relaxed text-foreground/68 md:text-base">
              {typeof intro === 'string' ? <p>{intro}</p> : intro}
            </div>
          </div>
        ) : (
          <h2 className="mb-10 text-center text-3xl font-bold text-primary md:text-4xl">{title}</h2>
        )
      ) : null}

      <div className={cn('relative', compact ? 'space-y-5' : 'space-y-7')}>
        {/* vertical line */}
        <div
          className={cn(
            'absolute left-[18px] top-0 bottom-0 w-px',
            variant === 'plain' ? 'bg-black/10' : 'bg-primary/10',
          )}
          aria-hidden="true"
        />

        {items.map((m, idx) => (
          <div key={`${m.title}-${idx}`} className="relative flex gap-6 md:gap-8">
            {/* timeline column */}
            <div className="w-11 shrink-0">
              <div>
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center text-xs font-semibold shadow-sm',
                    variant === 'plain'
                      ? 'rounded-full bg-foreground text-background ring-[6px] ring-[color:var(--paper)]'
                      : 'rounded-full bg-primary text-primary-foreground ring-[6px] ring-background',
                  )}
                >
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
                    <h3
                      className={cn(
                        'text-lg md:text-xl',
                        variant === 'plain'
                          ? 'font-semibold tracking-[-0.01em] text-foreground'
                          : 'font-semibold text-primary',
                      )}
                    >
                      {m.title}
                    </h3>
                    {m.note && (
                      <div
                        className={cn(
                          'mt-1 text-xs font-semibold uppercase',
                          variant === 'plain'
                            ? 'tracking-[0.16em] text-foreground/50'
                            : 'tracking-wide text-primary/70',
                        )}
                      >
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
                          'relative h-full',
                          variant === 'plain'
                            ? 'border border-black/10 bg-card shadow-none'
                            : 'rounded-3xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-md',
                          compact && variant !== 'plain' && 'shadow-none hover:shadow-sm',
                        )}
                      >
                        {topRight && (
                          <div className={cn('absolute', compact ? 'top-4 right-4' : 'top-6 right-6')}>
                            {variant === 'plain' ? (
                              <div className="border border-black/10 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/62">
                                {topRight}
                              </div>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-primary/20 border-0 rounded-full px-3 py-1 text-xs font-semibold"
                              >
                                {topRight}
                              </Badge>
                            )}
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
                                compact ? 'text-base md:text-lg' : 'text-lg md:text-xl',
                                variant === 'plain'
                                  ? 'font-semibold tracking-[-0.01em] text-foreground'
                                  : 'font-semibold text-primary',
                              )}
                            >
                              {c.title}
                            </div>
                          )}

                          <div
                            className={cn(
                              c.title ? (compact ? 'mt-3' : 'mt-4') : null,
                              variant === 'plain'
                                ? 'leading-relaxed text-foreground/72'
                                : 'text-muted-foreground leading-relaxed',
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
