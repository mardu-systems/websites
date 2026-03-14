import { CheckCircle, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type SplitContentItem = {
  title: string;
  description: string | ReactNode;
  icon?: LucideIcon;
};

interface SplitContentProps {
  title: string;
  eyebrow?: string;
  description: ReactNode;
  sideTitle?: string;
  sideIcon?: LucideIcon;
  items: SplitContentItem[];
  className?: string;
  reverse?: boolean;
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
}: SplitContentProps) {
  return (
    <section className={cn('relative overflow-hidden py-16 w-full bg-primary', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 opacity-70 mask-[radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute -top-24 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col gap-3 mb-8 md:mb-12">
          {eyebrow ? (
            <div>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/15">
                {eyebrow}
              </Badge>
            </div>
          ) : null}
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-balance">
            {title}
          </h2>
        </div>
        <div
          className={cn(
            'grid gap-10 md:grid-cols-2 lg:gap-16 items-start',
            reverse && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
          )}
        >
          <div className={cn('text-base md:text-lg leading-relaxed opacity-95 space-y-4', reverse && 'md:order-2')}>
            {description}
          </div>
          <Card
            className={cn(
              'rounded-3xl overflow-hidden border border-white/10 supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_40px_rgba(0,0,0,0.28)] transition-transform duration-200 will-change-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5',
              'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0',
              reverse && 'md:order-1',
            )}
          >
            {sideTitle && (
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl font-semibold flex items-center gap-3 text-primary">
                  <SideIcon className="text-primary w-5 h-5" aria-hidden="true" />
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
                      <ItemIcon className="shrink-0 text-primary w-5 h-5 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1">
                        <h4 className="font-semibold text-primary text-base md:text-lg">
                          {item.title}
                        </h4>
                        <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}
