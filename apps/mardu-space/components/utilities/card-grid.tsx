import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@mardu/ui/components/card';
import { Overline } from '@mardu/ui/components/typography';

export type CardItem = {
  title: string;
  description: string | ReactNode;
  icon?: LucideIcon;
  badge?: string;
  list?: string[];
  className?: string;
};

interface CardGridProps {
  title?: string;
  eyebrow?: string;
  items: CardItem[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'outline' | 'muted';
  className?: string;
}

export default function CardGrid({
  title,
  eyebrow,
  items,
  columns = 3,
  variant = 'default',
  className,
}: CardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        {title && (
          <h2 className="headline-balance mb-10 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
        )}
        <div className={cn('grid gap-8 items-stretch', gridCols)}>
          {items.map((item, idx) => (
            <Card
              key={`${item.title}-${idx}`}
              className={cn(
                'h-full overflow-hidden border border-black/10 shadow-none',
                idx === 0 ? 'bg-linear-to-br from-muted/55 via-card to-card' : 'bg-card',
                variant === 'outline' && 'bg-card/80',
                variant === 'muted' && 'bg-muted/45',
                item.className,
              )}
            >
              <CardHeader className="relative border-b border-black/8 p-6">
                <div className="flex items-center gap-4">
                  {item.icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/10 bg-background">
                      <item.icon className="h-5 w-5 text-foreground/75" aria-hidden="true" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                      Fokus {idx + 1}
                    </span>
                    <CardTitle className="text-lg font-semibold leading-tight tracking-[-0.01em] text-foreground md:text-xl">
                      {item.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {item.badge ? (
                  <p className="mb-4 pt-6 text-[11px] uppercase tracking-[0.18em] text-foreground/50">
                    {item.badge}
                  </p>
                ) : (
                  <div className="pt-6" />
                )}
                <div className="text-sm leading-relaxed text-foreground/75 md:text-base">
                  {typeof item.description === 'string' ? (
                    <p>{item.description}</p>
                  ) : (
                    item.description
                  )}
                </div>
                {item.list && (
                  <ul className="mt-5 list-inside list-disc space-y-2 text-sm text-foreground/75 md:text-base">
                    {item.list.map((li, lIdx) => (
                      <li key={lIdx}>{li}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
