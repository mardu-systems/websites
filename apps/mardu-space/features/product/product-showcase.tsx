'use client';

import { Button } from '@/components/ui/button';
import * as React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import NewsletterButton from '@/components/utilities/newsletter-button';

export type ProductAdvertisementProps = {
  leftImageSrc: string;
  leftImageAlt: string;
  topMiddleImageSrc: string;
  topMiddleImageAlt: string;
  textImageSrc: string;
  textImageAlt: string;
  title?: string;
  description?: string;
  price?: string;
  priceNote?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
  variant?: 1 | 2;

  /** <- Neu: beliebige Inhalte wie FeatureList, Badges, FAQs etc. */
  children?: React.ReactNode;
};

const AREAS = {
  1: {
    left: {
      frame: { left: '0%', top: '0%', width: '44%', height: '100%' },
      poly: '0% 0%, 100% 0%, 50% 100%, 0% 100%',
    },
    middle: {
      frame: { left: '22%', top: '0%', width: '30%', height: '100%' },
      poly: '0% 100%, 36.7% 50%, 100% 100%',
    },
    right: {
      frame: { left: '75%', top: '0%', width: '25%', height: '100%' },
      poly: '0% 100%, 100% 44%, 100% 100%',
    },
    mobileHero: {
      frame: { left: '0%', top: '0%', width: '100%', height: '100%' },
      poly: '0% 10%, 100% 0%, 100% 90%, 0% 100%',
    },
  },
  2: {
    left: {
      frame: { left: '0%', top: '0%', width: '44%', height: '100%' },
      poly: '0% 0%, 50% 0%, 100% 100%, 0% 100%',
    },
    middle: {
      frame: { left: '22%', top: '0%', width: '30%', height: '100%' },
      poly: '0% 0%, 36.7% 50%, 100% 0%',
    },
    right: {
      frame: { left: '75%', top: '0%', width: '25%', height: '100%' },
      poly: '0% 0%, 100% 44%, 100% 0%',
    },
    mobileHero: {
      frame: { left: '0%', top: '0%', width: '100%', height: '100%' },
      poly: '0% 0%, 90% 0%, 100% 100%, 10% 100%',
    },
  },
} as const;

type Area = { frame: { left: string; top: string; width: string; height: string }; poly: string };

/** ===== Desktop Poly Image ===== */
function PolyImage({
  src,
  alt,
  area,
  objectPosition,
  z = 0,
  className,
}: {
  src: string;
  alt: string;
  area: Area;
  objectPosition?: string;
  z?: number;
  className?: string;
}) {
  const { frame, poly } = area;
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('absolute bg-no-repeat bg-cover', className)}
      style={{
        left: frame.left,
        top: frame.top,
        width: frame.width,
        height: frame.height,
        clipPath: `polygon(${poly})`,
        WebkitClipPath: `polygon(${poly})`,
        backgroundImage: `url(${src})`,
        backgroundPosition: objectPosition,
        zIndex: z,
      }}
    />
  );
}

/** ===== Mobile Layout (< md) ===== */
function MobileShowcase({
  leftImageSrc,
  leftImageAlt,
  topMiddleImageSrc,
  topMiddleImageAlt,
  textImageSrc,
  textImageAlt,
  title,
  description,
  price,
  priceNote,
  ctaLabel,
  onCtaClick,
  children,
  variant = 1,
}: ProductAdvertisementProps) {
  const A = AREAS[variant];
  const { frame, poly } = A.mobileHero;

  return (
    <section className="lg:hidden relative mt-10">
      <div className="relative w-full space-y-6">
        <div className="relative z-10 max-w-[40ch] mx-6">
          <h2 className="text-3xl leading-tight text-neutral-900 uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-3 text-lg leading-snug text-neutral-800">
            {description}
          </p>
        </div>

        {/* Hintergrund Hero-Image */}
        <Image
          src={leftImageSrc}
          alt={leftImageAlt}
          width={1920}
          height={1080}
          aria-label={leftImageAlt}
          style={{
            left: frame.left,
            top: frame.top,
            clipPath: `polygon(${poly})`,
            WebkitClipPath: `polygon(${poly})`,
          }}
        />
      </div>
      {/* Content-Slot (mobil) */}
      <div className="px-4 py-6">{children}</div>

      {/* Produktbild-Ausschnitt */}
      <div className="relative my-6 w-full h-40 overflow-hidden rounded-xl">
        <Image
          src={textImageSrc}
          alt={textImageAlt}
          fill
          className="object-contain object-center"
          aria-label={textImageAlt}
        />
      </div>

      {/* Zweites Bild (nur 1/8 Screenhöhe) */}
      <div className="relative w-full h-[16.5vh] overflow-hidden">
        <Image
          src={topMiddleImageSrc}
          alt={topMiddleImageAlt}
          fill
          className="object-cover object-center"
          aria-label={topMiddleImageAlt}
        />
      </div>

      <div className="mx-auto flex justify-center items-center px-4 mt-3 max-w-7xl">
        <NewsletterButton primaryButtonText="Vormerken" />
      </div>
    
    </section>
  );
}

/** ===== Desktop Layout (>= md) ===== */
function DesktopShowcase(props: ProductAdvertisementProps) {
  const {
    leftImageSrc,
    leftImageAlt,
    topMiddleImageSrc,
    topMiddleImageAlt,
    textImageSrc,
    textImageAlt,
    title,
    description,
    price,
    priceNote,
    ctaLabel,
    onCtaClick,
    className,
    variant = 1,
    children,
  } = props;

  const A = AREAS[variant];

  return (
    <section className={cn('relative mx-auto hidden h-screen overflow-hidden lg:block', className)}>
      {/* Hintergrundbilder */}
      <PolyImage
        src={leftImageSrc}
        alt={leftImageAlt}
        area={A.left}
        objectPosition="center"
        z={0}
      />
      <PolyImage
        src={topMiddleImageSrc}
        alt={topMiddleImageAlt}
        objectPosition="80% 10%"
        area={A.middle}
        z={0}
      />

      {/* Content-Grid */}
      <div className="relative z-20 grid h-full grid-rows-[auto,1fr,auto] px-6 lg:pl-[40%] lg:pb-28">
        {/* Header */}
        <header className="pt-[7%] text-center">
          {title && (
            <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl uppercase tracking-wide">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-[65ch] text-lg text-neutral-700 leading-snug">
              {description}
            </p>
          )}
        </header>

        {/* Mitte: optionaler Content + Bild */}
        <div className="grid grid-rows-[auto,1fr] items-center gap-6">
          {children && <div className="max-w-[80ch] mx-auto">{children}</div>}
          {textImageSrc && (
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                src={textImageSrc}
                alt={textImageAlt}
                fill
                className="object-contain"
                sizes="(min-width: 1536px) 48vw, (min-width: 1280px) 54vw, (min-width: 1024px) 60vw, 90vw"
                priority
              />
            </div>
          )}
        </div>

        {/* Footer: Preis + CTA */}
        <footer className="relative z-30 mb-12 text-center lg:sticky lg:bottom-0 lg:inset-x-0">
          <div className="flex flex-col items-center gap-3">
            {price && (
              <div>
                <div className="text-5xl font-extrabold tracking-tight">{price}</div>
                <div className="text-sm text-neutral-600">inkl. MwSt.</div>
                {priceNote && <div className="mt-1 text-xs text-neutral-500">{priceNote}</div>}
              </div>
            )}
            <NewsletterButton primaryButtonText="Vormerken" />
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function ProductShowcase(props: ProductAdvertisementProps) {
  return (
    <div className={cn('relative w-full', props.className)}>
      <MobileShowcase {...props} />
      <DesktopShowcase {...props} />
    </div>
  );
}
