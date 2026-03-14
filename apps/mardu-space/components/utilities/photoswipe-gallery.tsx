'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { cn } from '@/lib/utils';

/**
 * Render-ready DTO for the PhotoSwipe gallery.
 * Width and height are required so PhotoSwipe can calculate the lightbox layout up front.
 */
export type PhotoSwipeGalleryItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
  usedOn: Array<{
    label: string;
    href: string;
  }>;
};

export type PhotoSwipeGalleryProps = {
  items: PhotoSwipeGalleryItem[];
  className?: string;
};

export default function PhotoSwipeGallery({ items, className }: PhotoSwipeGalleryProps) {
  const rawId = useId();
  const galleryId = `photos-${rawId.replace(/:/g, '')}`;
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: 'a[data-pswp-width]',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();
    return () => {
      lightbox.destroy();
    };
  }, [galleryId]);

  return (
    <div
      id={galleryId}
      ref={galleryRef}
      className={cn('grid gap-6 sm:grid-cols-2 xl:grid-cols-3', className)}
    >
      {items.map((item, index) => (
        <article
          key={item.src}
          className="group overflow-hidden border border-black/10 bg-card transition-colors hover:border-foreground/18"
        >
          <a
            href={item.src}
            data-pswp-width={item.width}
            data-pswp-height={item.height}
            data-cropped="true"
            aria-label={`${item.title} in voller Groesse oeffnen`}
            className="block"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted/40">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 3}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </a>

          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.usedOn.map((usage) => (
                <Link
                  key={`${item.src}-${usage.href}`}
                  href={usage.href}
                  className="border border-black/10 px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:border-foreground/18 hover:text-foreground"
                >
                  {usage.label}
                </Link>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
