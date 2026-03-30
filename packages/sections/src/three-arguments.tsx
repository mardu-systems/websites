'use client';

import Image from 'next/image';
import React from 'react';
import { cn } from '@mardu/ui/lib/utils';
import BentoCard from '@mardu/ui/components/bento-card';

export type ArgumentItem = {
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  iconSrc?: string;
};

export interface ThreeArgumentsProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  items: ArgumentItem[];
  className?: string;
}

export default function ThreeArguments({
  eyebrow = 'Vorteile',
  title = '3 gute Vorteile',
  items,
  className = '',
}: ThreeArgumentsProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="mb-9 flex items-end justify-between gap-6">
          <h2 className="text-[clamp(1.7rem,3.1vw,3rem)] leading-[1.06] tracking-[-0.02em]">{title}</h2>
          {eyebrow ? (
            <p className="hidden text-xs uppercase tracking-[0.18em] text-foreground/45 md:block">
              {eyebrow}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((it, idx) => {
            const iconNode = it.icon ? (
              it.icon
            ) : it.iconSrc ? (
              <Image src={it.iconSrc} alt={it.title} width={64} height={64} className="size-14 object-contain" />
            ) : null;

            return (
              <BentoCard
                key={idx}
                title={it.title}
                description={it.description}
                icon={iconNode}
                className="h-full"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
