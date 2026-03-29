'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@mardu/ui/lib/utils';

export type FoerderItem = {
  href: string;
  src: string;
  alt: string;
  width?: number;
  className?: string;
};

type Props = {
  title?: React.ReactNode;
  items: FoerderItem[];
  description?: React.ReactNode;
  className?: string;
};

export default function Foerderung({
  title = 'Gefördert durch',
  items,
  description,
  className = '',
}: Props) {
  return (
    <section id="foerderung" className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.7rem)] leading-[1.08] tracking-[-0.015em]">{title}</h2>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Institutionen</p>
        </div>

        {description ? (
          <div className="mb-8 max-w-4xl text-sm leading-relaxed text-foreground/72 md:text-base">{description}</div>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-20 md:gap-16">
          {items.map((it, idx) => (
            <Link
              key={idx}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
                className={cn('flex items-center touch-manipulation', it.className)}
              aria-label={it.alt}
            >
              <Image
                src={it.src}
                alt={it.alt}
                    width={it.width ?? 140}
                    height={20}
                    className="object-contain"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
