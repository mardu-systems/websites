import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@mardu/ui/components/card';
import { cn } from '@mardu/ui/lib/utils';
import { SectionIntro } from './section-intro';

export type InfoGridItem = {
  title: string;
  icon?: LucideIcon;
  features: {
    label: string;
    description: string | ReactNode;
  }[];
};

export interface InfoGridProps {
  title?: string;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  items: InfoGridItem[];
  columns?: number;
  className?: string;
  variant?: 'default' | 'cards';
}

export default function InfoGrid({
  title,
  eyebrow,
  intro,
  items,
  columns = 4,
  className,
  variant = 'default',
}: InfoGridProps) {
  const gridCols =
    {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        {title || intro || eyebrow ? (
          <SectionIntro
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            className="mb-7"
            titleClassName="max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)]"
            introClassName="max-w-xl pt-1"
            layout={intro ? 'split' : 'stacked'}
          />
        ) : null}
        <div className={cn('grid', variant === 'cards' ? 'gap-4 lg:gap-5' : 'gap-8 lg:gap-12', gridCols)}>
          {items.map((item, idx) =>
            variant === 'cards' ? (
              <section
                key={idx}
                className="border border-black/10 bg-card/90 px-5 py-5 shadow-none md:px-6 md:py-6"
              >
              <div className="flex items-center gap-3">
                {item.icon ? (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 bg-background">
                    <item.icon className="h-4 w-4 text-foreground/72" />
                  </div>
                ) : null}
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
                  {item.title}
                </h3>
              </div>

              <ul className="mt-4 space-y-3 border-t border-black/8 pt-4">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="space-y-1">
                    <strong className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/46">
                      {feature.label}
                    </strong>
                    <div className="max-w-[34ch] text-sm leading-relaxed text-foreground/72">
                      {typeof feature.description === 'string' ? (
                        <span>{feature.description}</span>
                      ) : (
                        feature.description
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              </section>
            ) : (
              <Card key={idx} className="border-none bg-transparent shadow-none">
                <CardHeader className="mb-2 border-b border-primary/10 px-0 pt-0">
                  <div className="flex items-center gap-3">
                    {item.icon ? <item.icon className="h-7 w-7 text-accent" /> : null}
                    <CardTitle className="text-xl font-bold text-primary">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-0">
                  <ul className="space-y-6">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="space-y-1">
                        <strong className="block text-sm font-bold uppercase tracking-wider text-primary">
                          {feature.label}
                        </strong>
                        <div className="text-[15px] leading-relaxed text-muted-foreground">
                          {typeof feature.description === 'string' ? (
                            <span>{feature.description}</span>
                          ) : (
                            feature.description
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
