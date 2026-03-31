import { CheckCircle, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@mardu/ui/components/card';
import { Badge } from '@mardu/ui/components/badge';
import { Overline } from '@mardu/ui/components/typography';

export type SplitContentItem = {
  title: string;
  description: string | ReactNode;
  icon?: LucideIcon;
};

export interface SplitContentProps {
  title: string;
  eyebrow?: string;
  description: ReactNode;
  sideTitle?: string;
  sideIcon?: LucideIcon;
  items: SplitContentItem[];
  className?: string;
  reverse?: boolean;
  variant?: 'immersive' | 'plain';
}

export default function SplitContent({
  title,
  eyebrow,
  description,
  sideTitle,
  sideIcon: SideIcon = CheckCircle,
  items,
  className,
  reverse = false,
  variant = 'immersive',
}: SplitContentProps) {
  return (
    <section
      className={cn(
        'relative w-full',
        variant === 'immersive' ? 'overflow-hidden bg-primary py-16' : 'py-20 md:py-24',
        className,
      )}
    >
      {variant === 'immersive' ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-70 mask-[radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
            <div className="absolute -top-24 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.06),transparent_60%)]" />
          </div>
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
      ) : null}
      <div
        className={cn(
          variant === 'immersive' ? 'max-w-7xl mx-auto px-6 md:px-8' : 'mardu-container',
        )}
      >
        <div className="flex flex-col gap-3 mb-8 md:mb-12">
          {eyebrow ? (
            <div>
              {variant === 'immersive' ? (
                <Badge variant="secondary" className="bg-white/10 text-white border-white/15">
                  {eyebrow}
                </Badge>
              ) : (
                <Overline>{eyebrow}</Overline>
              )}
            </div>
          ) : null}
          <h2
            className={cn(
              'text-balance',
              variant === 'immersive'
                ? 'text-3xl sm:text-4xl md:text-5xl leading-tight font-bold'
                : 'headline-balance max-w-4xl text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-foreground',
            )}
          >
            {title}
          </h2>
        </div>
        <div
          className={cn(
            'grid gap-10 md:grid-cols-2 lg:gap-16 items-start',
            reverse && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
          )}
        >
          <div
            className={cn(
              reverse && 'md:order-2',
              variant === 'immersive'
                ? 'space-y-4 text-base leading-relaxed opacity-95 md:text-lg'
                : 'max-w-2xl space-y-5 text-base leading-relaxed text-foreground/76 md:text-lg',
            )}
          >
            {description}
          </div>
          {variant === 'immersive' ? (
            <Card
              className={cn(
                'rounded-3xl overflow-hidden border border-white/10 supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_40px_rgba(0,0,0,0.28)] transition-transform duration-200 will-change-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0',
                reverse && 'md:order-1',
              )}
            >
              {sideTitle && (
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-primary md:text-xl">
                    <SideIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {sideTitle}
                  </CardTitle>
                </CardHeader>
              )}
              <CardContent>
                <ul className="space-y-6">
                  {items.map((item, idx) => {
                    const ItemIcon = item.icon ?? CheckCircle;

                    return (
                      <li key={`${item.title}-${idx}`} className="flex gap-4 items-start">
                        <ItemIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-primary md:text-lg">
                            {item.title}
                          </h4>
                          <div className="text-sm leading-relaxed text-muted-foreground md:text-base">
                            {typeof item.description === 'string' ? (
                              <p>{item.description}</p>
                            ) : (
                              item.description
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <div className={cn('border-t border-black/8 pt-6', reverse && 'md:order-1')}>
              {sideTitle ? (
                <div className="mb-6 flex items-center gap-3">
                  <SideIcon className="h-5 w-5 text-foreground/70" aria-hidden="true" />
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground md:text-xl">
                    {sideTitle}
                  </h3>
                </div>
              ) : null}
              <ul className="space-y-6">
                {items.map((item, idx) => {
                  const ItemIcon = item.icon ?? CheckCircle;

                  return (
                    <li
                      key={`${item.title}-${idx}`}
                      className="flex gap-4 items-start border-b border-black/6 pb-5 last:border-b-0 last:pb-0"
                    >
                      <ItemIcon className="mt-0.5 h-5 w-5 shrink-0 text-foreground/65" aria-hidden="true" />
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                          {item.title}
                        </h4>
                        <div className="text-sm leading-relaxed text-foreground/70 md:text-base">
                          {typeof item.description === 'string' ? (
                            <p>{item.description}</p>
                          ) : (
                            item.description
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
