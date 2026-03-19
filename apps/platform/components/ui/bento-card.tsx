// @ts-nocheck
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BentoCardProps = {
  title: string;
  description: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export default function BentoCard({ title, description, icon, className }: BentoCardProps) {
  return (
    <article
      className={cn('border border-black/10 bg-white/40 p-6 backdrop-blur-[2px]', className)}
    >
      {icon ? <div className="mb-6 text-foreground/80">{icon}</div> : null}
      <h3 className="mb-3 text-xl leading-tight tracking-[-0.01em]">{title}</h3>
      <div className="text-sm leading-relaxed text-foreground/70">{description}</div>
    </article>
  );
}
