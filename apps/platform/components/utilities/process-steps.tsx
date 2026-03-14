import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type StepItem = {
  title: string;
  description: string | ReactNode;
};

interface ProcessStepsProps {
  title?: string;
  steps: StepItem[];
  className?: string;
}

export default function ProcessSteps({ title, steps, className }: ProcessStepsProps) {
  return (
    <section className={cn('py-20 px-6 md:px-8 max-w-7xl mx-auto w-full', className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center text-primary">{title}</h2>
      )}
      <div className="relative border-l-[3px] border-primary/10 ml-4 md:ml-6 md:pl-12 space-y-12">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-10 md:pl-0">
            {/* Circle on the line */}
            <div className="absolute -left-[13.5px] md:-left-[61.5px] top-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-[10px] font-bold ring-[6px] ring-background shadow-sm">
              {idx + 1}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-primary">{step.title}</h3>
              <div className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
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
    </section>
  );
}
