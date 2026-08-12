"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@mardu/ui/lib/utils";
import { HeroHeadline, Overline } from "@mardu/ui/components/typography";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import { HeroMediaCard, type HeroMediaCardConfig } from "./hero-media-card";

export type {
  HeroCardMedia,
  HeroEmbedMedia,
  HeroImageMedia,
  HeroMediaBadgePosition,
  HeroMediaDescriptionPosition,
  HeroVideoMedia,
} from "./hero-media-card";

export type HeroSectionVariant = "default" | "landing";
export type HeroMediaCard = HeroMediaCardConfig;

export interface HeroSectionProps {
  title: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  mediaType?: "image" | "video";
  videoUrl?: string;
  onPlayClick?: () => void;
  variant?: HeroSectionVariant;
  overline?: ReactNode;
  emphasis?: string;
  backgroundImageSrc?: string;
  mediaCards?: HeroMediaCardConfig[];
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  className = "",
  buttonText,
  buttonHref = "/contact",
  secondaryButtonText,
  secondaryButtonHref,
  mediaType = "image",
  videoUrl,
  onPlayClick,
  variant = "default",
  overline,
  emphasis,
  backgroundImageSrc = "/landing/Ellipse.png",
  mediaCards,
}: HeroSectionProps) {
  void onPlayClick;

  const heroCopy = (
    <div className="relative space-y-7">
      <Image
        src={backgroundImageSrc}
        alt=""
        width={3945}
        height={1991}
        aria-hidden
        className="pointer-events-none absolute -left-24 -z-10 w-[170%] max-w-none opacity-65 md:-left-28 lg:w-[150%]"
      />
      {overline ? <Overline>{overline}</Overline> : null}
      <div className="relative isolate inline-block">
        <div className="absolute -left-2 top-[16%] z-0 h-[42%] w-[58%] bg-[repeating-linear-gradient(135deg,rgba(31,41,55,0.14)_0,rgba(31,41,55,0.14)_1px,transparent_1px,transparent_9px)] opacity-35" />
        {emphasis ? (
          <HeroHeadline
            prefix={title}
            emphasis={emphasis}
            className="relative z-10"
          />
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
          <EditorialActionButton render={<Link href={buttonHref} />}>
            {buttonText}
          </EditorialActionButton>
        ) : null}
        {secondaryButtonText && secondaryButtonHref ? (
          <EditorialActionButton
            render={<Link href={secondaryButtonHref} />}
            priority="secondary"
          >
            {secondaryButtonText}
          </EditorialActionButton>
        ) : null}
      </div>
    </div>
  );

  if (variant === "default") {
    return (
      <section
        className={cn(
          "relative overflow-hidden border-b border-black/8 py-20 md:py-24",
          className,
        )}
      >
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
                <EditorialActionButton render={<Link href={buttonHref} />}>
                  {buttonText}
                </EditorialActionButton>
              ) : null}
              {secondaryButtonText && secondaryButtonHref ? (
                <EditorialActionButton
                  render={<Link href={secondaryButtonHref} />}
                  priority="secondary"
                >
                  {secondaryButtonText}
                </EditorialActionButton>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden border border-black/10 bg-card">
            {mediaType === "video" && videoUrl ? (
              <div className="relative aspect-16/10 w-full">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={imageAlt}
                />
              </div>
            ) : (
              <div className="relative aspect-16/10 w-full">
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

  const landingCards = mediaCards?.length
    ? mediaCards.slice(0, 2)
    : [
        {
          href: "#produkte",
          scrollTargetId: "produkte",
          ariaLabel: imageAlt,
          priority: true,
          media:
            mediaType === "video" && videoUrl
              ? { type: "embed" as const, src: videoUrl, title: imageAlt }
              : { type: "image" as const, src: imageSrc, alt: imageAlt },
        },
      ];

  const topCard = landingCards[0];
  const bottomCard = landingCards[1];
  const hasSingleCard = landingCards.length === 1 && topCard;

  if (hasSingleCard && topCard) {
    return (
      <section
        className={cn(
          "relative flex min-h-screen items-center overflow-hidden border-b border-black/8 py-20 md:py-24",
          className,
        )}
      >
        <div className="mardu-container relative grid w-full gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          {heroCopy}
          <div className="relative">
            <HeroMediaCard
              card={topCard}
              defaultSizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center overflow-hidden border-b border-black/8 py-20 md:py-24",
        className,
      )}
    >
      <div className="mardu-container relative grid w-full gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {heroCopy}

        <div className="relative overflow-visible">
          <div className="relative grid gap-4 md:min-h-152 md:pb-4">
            {topCard ? (
              <HeroMediaCard
                card={{
                  ...topCard,
                  className: cn(
                    "relative z-20 md:absolute md:right-0 md:top-2 md:w-[88%] md:rotate-[0.8deg]",
                    topCard.className,
                  ),
                }}
                defaultSizes="(max-width: 1024px) 100vw, 48vw"
              />
            ) : null}

            {bottomCard ? (
              <HeroMediaCard
                card={{
                  ...bottomCard,
                  className: cn(
                    "relative z-10 md:absolute md:bottom-0 md:left-0 md:w-[82%] md:-rotate-[1.2deg]",
                    bottomCard.className,
                  ),
                }}
                defaultSizes="(max-width: 1024px) 100vw, 42vw"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
