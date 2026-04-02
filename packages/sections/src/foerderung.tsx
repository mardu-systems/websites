import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@mardu/ui/lib/utils';
import { SectionIntro } from './section-intro';

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
      <div className="mardu-container">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          intro={description}
          className="mb-8 md:mb-10"
          titleClassName="text-[clamp(1.95rem,4vw,3.35rem)]"
        />

        <div
          className={cn(
            'border-t border-black/8 pt-8 md:pt-10',
            'grid items-center justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3',
            spacing === 'compact' ? 'md:gap-10' : 'md:gap-12',
          )}
        >
          {items.map((it, idx) => (
            <Link
              key={idx}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex min-h-24 items-center justify-center px-4 opacity-88 transition-opacity hover:opacity-100',
                it.className,
              )}
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
