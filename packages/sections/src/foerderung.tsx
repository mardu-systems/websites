'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@mardu/ui/lib/utils';
import {Overline} from "@mardu/ui";

export type FoerderItem = {
  href: string;
  src: string;
  alt: string;
  width?: number;
  className?: string;
};

type Props = {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  items: FoerderItem[];
  description?: React.ReactNode;
  className?: string;
  sectionId?: string;
  spacing?: 'default' | 'compact';
};

export default function Foerderung({
  eyebrow = 'Institutionen',
  title = 'Gefördert durch',
  items,
  description,
  className = '',
  sectionId = 'foerderung',
  spacing = 'default',
}: Props) {
  return (
    <section id={sectionId} className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-content-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        <h2 className="headline-balance mb-12 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
          {title}
        </h2>

        {description ? (
          <div className="mb-8 max-w-4xl text-sm leading-relaxed text-foreground/72 md:text-base">{description}</div>
        ) : null}

        <div
          className={cn(
            'flex flex-wrap items-center justify-center md:gap-16',
            spacing === 'compact' ? 'gap-14' : 'gap-20',
          )}
        >
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
