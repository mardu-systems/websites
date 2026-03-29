import { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { Overline } from '@mardu/ui/components/typography';

export type StepItem = {
  title: string;
  description: string | ReactNode;
};

interface ProcessStepsProps {
  title?: string;
  eyebrow?: string;
  steps: StepItem[];
  className?: string;
}

export default function ProcessSteps({ title, eyebrow, steps, className }: ProcessStepsProps) {
  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
      {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
      {title && (
        <h2 className="headline-balance mb-14 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
      )}
      <div className="relative ml-4 space-y-12 border-l border-black/12 md:ml-6 md:pl-12">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-10 md:pl-0">
            <div className="absolute -left-[13.5px] top-1 flex h-6 w-6 items-center justify-center border border-black/12 bg-foreground text-[10px] font-bold text-background ring-[6px] ring-[color:var(--paper)] md:-left-[61.5px]">
              {idx + 1}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{step.title}</h3>
              <div className="max-w-3xl text-lg leading-relaxed text-foreground/72">
                {typeof step.description === 'string' ? (
                  <p>{step.description}</p>
                ) : (
                  step.description
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
