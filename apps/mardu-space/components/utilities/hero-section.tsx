'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@mardu/ui/lib/utils';
import type { MouseEvent } from 'react';
import { HeroHeadline, Overline } from '@mardu/ui/components/typography';
import { Button } from '@mardu/ui/components/button';
import { ArrowRight } from 'lucide-react';

export interface HeroSectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  onPlayClick?: () => void;
  variant?: 'default' | 'landing';
  overline?: string;
  emphasis?: string;
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  className = '',
  buttonText,
  buttonHref = '/contact',
  secondaryButtonText,
  secondaryButtonHref,
  mediaType = 'image',
  videoUrl,
  onPlayClick,
  variant = 'default',
  overline,
  emphasis,
}: HeroSectionProps) {
  void onPlayClick;

  const scrollToProducts = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    const section = document.getElementById('produkte');
    if (!section) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', '#produkte');
  };

  if (variant === 'default') {
    return (
      <section className={cn('relative overflow-hidden border-b border-black/8 py-20 md:py-24', className)}>
        <div className="mardu-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            {overline ? <Overline>{overline}</Overline> : null}
            <h1 className="headline-balance max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {title}
            </h1>
            <div className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {description}
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {buttonText ? (
                <Link href={buttonHref}>
                  <Button>
                    {buttonText}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : null}
              {secondaryButtonText && secondaryButtonHref ? (
                <Link href={secondaryButtonHref}>
                  <Button variant="outline">{secondaryButtonText}</Button>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden border border-black/10 bg-card">
            {mediaType === 'video' && videoUrl ? (
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={imageAlt}
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'relative flex min-h-screen items-center overflow-hidden border-b border-black/8 py-20 md:py-24',
        className,
      )}
    >
      <div className="mardu-container relative grid w-full gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="relative space-y-7">
          <Image
            src="/landing/Ellipse.png"
            alt=""
            width={3945}
            height={1991}
            aria-hidden
            className="pointer-events-none absolute -left-24 -z-10 w-[170%] max-w-none opacity-65 md:-left-28 lg:w-[150%]"
          />
          <Overline>{overline ?? 'Engineering Access Platform'}</Overline>
          <div className="relative isolate inline-block">
            <div className="absolute -left-2 top-[16%] z-0 h-[42%] w-[58%] bg-[repeating-linear-gradient(135deg,rgba(31,41,55,0.14)_0,rgba(31,41,55,0.14)_1px,transparent_1px,transparent_9px)] opacity-35" />
            {emphasis ? (
              <HeroHeadline prefix={title} emphasis={emphasis} className="relative z-10" />
            ) : (
              <h1 className="headline-balance relative z-10 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[0.94] tracking-[-0.03em] text-foreground">
                {title}
              </h1>
            )}
          </div>
          <div className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {description}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {buttonText ? (
              <Link href={buttonHref}>
                <Button>
                  {buttonText}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            ) : null}
            {secondaryButtonText && secondaryButtonHref ? (
              <Link href={secondaryButtonHref}>
                <Button variant="outline">{secondaryButtonText}</Button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <Link
            href="#produkte"
            onClick={scrollToProducts}
            className="group relative block aspect-[16/11] overflow-hidden border border-black/12 bg-card"
            aria-label="Zu den Produktlösungen mardu.space scrollen"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/44 via-black/10 to-transparent" />
            <div className="absolute left-4 top-4 border border-white/45 bg-black/38 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white">
              mardu.space
            </div>
            <p className="absolute bottom-4 left-4 max-w-[36ch] text-sm text-white/95 group-hover:text-white">
              Digitale Zutritts- und Maschinenfreigabe für Werkstätten, Labore und Makerspaces.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
