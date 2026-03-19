// @ts-nocheck
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type HeroHeadlineProps = {
  prefix: string;
  emphasis: string;
  suffix?: string;
  className?: string;
};

export function HeroHeadline({ prefix, emphasis, suffix, className }: HeroHeadlineProps) {
  return (
    <h1
      className={cn(
        'headline-balance text-[clamp(2.25rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-foreground',
        className,
      )}
    >
      {prefix}{' '}
      <em className="font-serif italic font-normal tracking-[-0.02em] text-foreground/90">
        {emphasis}
      </em>
      {suffix ? ` ${suffix}` : ''}
    </h1>
  );
}

type OverlineProps = {
  children: ReactNode;
  className?: string;
};

export function Overline({ children, className }: OverlineProps) {
  return (
    <p className={cn('text-xs uppercase tracking-[0.2em] text-foreground/55', className)}>
      {children}
    </p>
  );
}
