import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type ScenarioBlock = {
  title: string;
  description: string | ReactNode;
};

export type ScenarioHighlight = {
  title: string;
  description: string | ReactNode;
};

interface ScenarioGridProps {
  title: string;
  leftTitle: string;
  leftBlocks: ScenarioBlock[];
  rightHighlights: ScenarioHighlight[];
  className?: string;
}

export default function ScenarioGrid({
  title,
  leftTitle,
  leftBlocks,
  rightHighlights,
  className,
}: ScenarioGridProps) {
  return (
    <section className={cn('py-16 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <Card className="rounded-3xl bg-card shadow-sm h-full overflow-hidden border-none">
          <CardHeader className="p-6">
            <CardTitle className="text-lg md:text-xl font-semibold leading-tight text-primary">
              {leftTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              {leftBlocks.map((block, idx) => (
                <div key={`${block.title}-${idx}`} className="space-y-2">
                  <h4 className="font-semibold text-primary text-base md:text-lg">{block.title}</h4>
                  <div className="text-sm md:text-base text-foreground leading-relaxed">
                    {typeof block.description === 'string' ? (
                      <p>{block.description}</p>
                    ) : (
                      block.description
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {rightHighlights.map((highlight, idx) => (
            <Card
              key={`${highlight.title}-${idx}`}
              className="rounded-3xl bg-card shadow-sm overflow-hidden transition-shadow duration-300 border-none hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-1.5 self-stretch bg-accent rounded-full shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold leading-tight text-primary mb-3">
                      {highlight.title}
                    </h4>
                    <div className="text-sm md:text-base text-foreground leading-relaxed">
                      {typeof highlight.description === 'string' ? (
                        <p>{highlight.description}</p>
                      ) : (
                        highlight.description
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
