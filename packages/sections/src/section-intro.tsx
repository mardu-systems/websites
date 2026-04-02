import type { ReactNode } from 'react';
import { cn } from '@mardu/ui/lib/utils';

export interface SectionIntroProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  className?: string;
  titleClassName?: string;
  introClassName?: string;
  eyebrowClassName?: string;
  layout?: 'split' | 'stacked';
  balanceTitle?: boolean;
}

export function SectionIntro({
  eyebrow,
  title,
  intro,
  className,
  titleClassName,
  introClassName,
  eyebrowClassName,
  layout = 'split',
  balanceTitle = true,
}: SectionIntroProps) {
  if (!eyebrow && !title && !intro) {
    return null;
  }

  if (layout === 'stacked') {
    return (
      <div className={cn('mb-10 space-y-4', className)}>
        {eyebrow ? (
          <p className={cn('text-xs uppercase tracking-[0.18em] text-foreground/46', eyebrowClassName)}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2
            className={cn(
              'max-w-4xl text-[clamp(1.95rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground',
              balanceTitle && 'headline-balance',
              titleClassName,
            )}
          >
            {title}
          </h2>
        ) : null}
        {intro ? (
          <div className={cn('max-w-[42rem] text-sm leading-relaxed text-foreground/68 md:text-base', introClassName)}>
            {typeof intro === 'string' ? <p>{intro}</p> : intro}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mb-8 grid gap-5 md:mb-10 md:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.78fr)] md:items-start',
        className,
      )}
    >
      <div className="space-y-4">
        {eyebrow ? (
          <p className={cn('text-xs uppercase tracking-[0.18em] text-foreground/46', eyebrowClassName)}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2
            className={cn(
              'max-w-[12ch] text-[clamp(2rem,5vw,4.25rem)] leading-[0.94] tracking-[-0.05em] text-foreground',
              balanceTitle && 'text-balance md:headline-balance md:max-w-none md:leading-[1.02] md:tracking-[-0.03em]',
              titleClassName,
            )}
          >
            {title}
          </h2>
        ) : null}
      </div>
      {intro ? (
        <div
          className={cn(
            'max-w-[38ch] text-sm leading-relaxed text-foreground/68 md:justify-self-end md:text-base',
            introClassName,
          )}
        >
          {typeof intro === 'string' ? <p>{intro}</p> : intro}
        </div>
      ) : null}
    </div>
  );
}
