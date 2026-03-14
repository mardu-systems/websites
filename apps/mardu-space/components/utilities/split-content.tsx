import { CheckCircle, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Overline } from '@/components/ui/typography';

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
    <section className={cn('relative w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        <div className="mb-8 flex flex-col gap-3 md:mb-12">
          {eyebrow ? <Overline>{eyebrow}</Overline> : null}
          <h2 className="headline-balance max-w-4xl text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
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
              'max-w-2xl space-y-5 text-base leading-relaxed text-foreground/76 md:text-lg',
              reverse && 'md:order-2',
            )}
          >
            {description}
          </div>
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
                  <li key={`${item.title}-${idx}`} className="flex gap-4 items-start border-b border-black/6 pb-5 last:border-b-0 last:pb-0">
                    <ItemIcon className="mt-0.5 h-5 w-5 shrink-0 text-foreground/65" aria-hidden="true" />
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                        {item.title}
                      </h4>
                      <div className="text-sm leading-relaxed text-foreground/70 md:text-base">
                        {typeof item.description === 'string' ? <p>{item.description}</p> : item.description}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
