import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  items: InfoGridItem[];
  columns?: number;
  className?: string;
}

export default function InfoGrid({ title, items, columns = 4, className }: InfoGridProps) {
  const gridCols =
    {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">{title}</h2>
      )}
      <div className={`grid gap-8 lg:gap-12 ${gridCols}`}>
        {items.map((item, idx) => (
          // Using Card for semantics but stripping visual defaults for a list-like appearance
          <Card key={idx} className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 pt-0 border-b border-primary/10 mb-2">
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="text-accent w-7 h-7" />}
                <CardTitle className="font-bold text-xl text-primary">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <ul className="space-y-6">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="space-y-1">
                    <strong className="block text-primary font-bold text-sm uppercase tracking-wider">
                      {feature.label}
                    </strong>
                    <div className="text-muted-foreground text-[15px] leading-relaxed">
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
        ))}
      </div>
    </section>
  );
}
