import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Overline } from '@mardu/ui/components/typography';

export type StepItem = {
  title: string;
  description: string | ReactNode;
};

export interface ProcessStepsProps {
  title?: string;
  eyebrow?: ReactNode;
  steps: StepItem[];
  className?: string;
  variant?: 'default' | 'plain';
}

export default function ProcessSteps({
  title,
  eyebrow,
  steps,
  className,
  variant = 'default',
}: ProcessStepsProps) {
  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-content-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        {title ? (
          <h2 className="headline-balance mb-14 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
        ) : null}
        <div
          className={cn(
            'relative ml-4 space-y-12 md:ml-6 md:pl-12',
            variant === 'plain' ? 'border-l border-black/12' : 'border-l-[3px] border-primary/10',
          )}
        >
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-10 md:pl-0">
              <div
                className={cn(
                  'absolute -left-[13.5px] top-1 flex h-6 w-6 items-center justify-center text-[10px] font-bold shadow-sm md:-left-[61.5px]',
                  variant === 'plain'
                    ? 'border border-black/12 bg-foreground text-background ring-[6px] ring-[color:var(--paper)]'
                    : 'rounded-full bg-accent text-accent-foreground ring-[6px] ring-background',
                )}
              >
                {idx + 1}
              </div>

              <div className="space-y-3">
                <h3
                  className={cn(
                    'text-2xl',
                    variant === 'plain'
                      ? 'font-semibold tracking-[-0.02em] text-foreground'
                      : 'font-bold text-primary',
                  )}
                >
                  {step.title}
                </h3>
                <div
                  className={cn(
                    'max-w-3xl text-lg leading-relaxed',
                    variant === 'plain' ? 'text-foreground/72' : 'text-muted-foreground',
                  )}
                >
                  {typeof step.description === 'string' ? <p>{step.description}</p> : step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
