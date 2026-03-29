import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@mardu/ui/components/card';
import { cn } from '@mardu/ui/lib/utils';

export interface ScenarioBlock {
  title: string;
  description: string | ReactNode;
}

export interface ScenarioHighlight {
  title: string;
  description: string | ReactNode;
}

/**
 * Props contract for the two-column scenario comparison section.
 */
export interface ScenarioGridProps {
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
    <section className={cn('mx-auto w-full max-w-7xl px-6 py-16 md:px-8', className)}>
      <h2 className="mb-10 text-center text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      <div className="grid items-stretch gap-8 md:grid-cols-2 lg:gap-12">
        <Card className="h-full overflow-hidden rounded-3xl border-none bg-card shadow-sm">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-semibold leading-tight text-primary md:text-xl">
              {leftTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              {leftBlocks.map((block, index) => (
                <div key={`${block.title}-${index}`} className="space-y-2">
                  <h4 className="text-base font-semibold text-primary md:text-lg">{block.title}</h4>
                  <div className="text-sm leading-relaxed text-foreground md:text-base">
                    {typeof block.description === 'string' ? <p>{block.description}</p> : block.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {rightHighlights.map((highlight, index) => (
            <Card
              key={`${highlight.title}-${index}`}
              className="overflow-hidden rounded-3xl border-none bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 shrink-0 self-stretch rounded-full bg-accent" aria-hidden="true" />
                  <div>
                    <h4 className="mb-3 text-lg font-semibold leading-tight text-primary md:text-xl">
                      {highlight.title}
                    </h4>
                    <div className="text-sm leading-relaxed text-foreground md:text-base">
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
