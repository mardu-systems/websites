import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Overline } from '@mardu/ui/components/typography';

export type InfoGridItem = {
  title: string;
  icon?: LucideIcon;
  features: {
    label: string;
    description: string | ReactNode;
  }[];
};

interface InfoGridProps {
  title?: string;
  eyebrow?: string;
  items: InfoGridItem[];
  columns?: number;
  className?: string;
}

export default function InfoGrid({ title, eyebrow, items, columns = 4, className }: InfoGridProps) {
  const gridCols =
    {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-2',
    }[columns] || 'md:grid-cols-2';

  return (
    <section className={cn('w-full py-16 md:py-18', className)}>
      <div className="mardu-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        {title && (
          <div className="mb-7 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)] lg:items-start">
            <h2 className="headline-balance max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {title}
            </h2>
            <p className="max-w-xl pt-1 text-sm leading-relaxed text-foreground/68 md:text-base">
              Die Plattform verbindet Identität, Freigabe, Protokollierung und technische
              Durchsetzung in einem zusammenhängenden System statt in isolierten Einzelbausteinen.
            </p>
          </div>
        )}
        <div className={`grid gap-4 lg:gap-5 ${gridCols}`}>
          {items.map((item) => (
            <section
              key={item.title}
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
                {item.features.map((feature) => (
                  <li key={`${item.title}-${feature.label}`} className="space-y-1">
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
          ))}
        </div>
      </div>
    </section>
  );
}
