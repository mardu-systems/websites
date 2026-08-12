"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@mardu/ui/lib/utils";

export type HeroMediaBadgePosition =
  "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type HeroMediaDescriptionPosition = "bottom-left" | "bottom-right";

export type HeroImageMedia = {
  type: "image";
  src: string;
  alt: string;
};

export type HeroVideoMedia = {
  type: "video";
  src: string;
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
};

export type HeroEmbedMedia = {
  type: "embed";
  src: string;
  title: string;
};

export type HeroCardMedia = HeroImageMedia | HeroVideoMedia | HeroEmbedMedia;

/** Render-ready DTO for a linked media card in a landing hero. */
export interface HeroMediaCardConfig {
  href: string;
  ariaLabel: string;
  media: HeroCardMedia;
  badge?: ReactNode;
  description?: ReactNode;
  scrollTargetId?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  mediaClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  badgePosition?: HeroMediaBadgePosition;
  descriptionPosition?: HeroMediaDescriptionPosition;
}

const badgePositionClasses: Record<HeroMediaBadgePosition, string> = {
  "top-left": "left-4 top-4",
  "top-right": "right-4 top-4",
  "bottom-left": "left-4 bottom-4",
  "bottom-right": "right-4 bottom-4",
};

const descriptionPositionClasses: Record<HeroMediaDescriptionPosition, string> =
  {
    "bottom-left": "left-4 bottom-4 text-left",
    "bottom-right": "right-4 bottom-4 ml-auto text-right",
  };

function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  targetId?: string,
) {
  if (
    !targetId ||
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

  const section = document.getElementById(targetId);
  if (!section) return;

  const prefersReduced = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  section.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
  window.history.replaceState(null, "", `#${targetId}`);
}

function LandingMedia({
  card,
  defaultSizes,
}: {
  card: HeroMediaCardConfig;
  defaultSizes: string;
}) {
  const { media } = card;

  if (media.type === "embed") {
    return (
      <iframe
        src={media.src}
        className={cn("absolute inset-0 h-full w-full", card.mediaClassName)}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={media.title}
      />
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        muted={media.muted ?? true}
        autoPlay={media.autoPlay ?? true}
        loop={media.loop ?? true}
        playsInline={media.playsInline ?? true}
        controls={media.controls ?? false}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          card.mediaClassName,
        )}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={card.priority}
      sizes={card.sizes ?? defaultSizes}
      className={cn("object-cover", card.mediaClassName ?? card.imageClassName)}
    />
  );
}

export function HeroMediaCard({
  card,
  defaultSizes,
}: {
  card: HeroMediaCardConfig;
  defaultSizes: string;
}) {
  const badgePosition = card.badgePosition ?? "top-left";
  const descriptionPosition = card.descriptionPosition ?? "bottom-left";
  const descriptionNeedsOffset =
    Boolean(card.badge) &&
    badgePosition === descriptionPosition &&
    badgePosition.startsWith("bottom");

  return (
    <Link
      href={card.href}
      onClick={(event) => scrollToSection(event, card.scrollTargetId)}
      className={cn(
        "group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-black/15 bg-card",
        card.className,
      )}
      aria-label={card.ariaLabel}
    >
      <LandingMedia card={card} defaultSizes={defaultSizes} />
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t from-black/44 via-black/10 to-transparent",
          card.overlayClassName,
        )}
      />
      {card.badge ? (
        <div
          className={cn(
            "absolute z-10 border border-white/45 bg-black/38 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white",
            badgePositionClasses[badgePosition],
          )}
        >
          {card.badge}
        </div>
      ) : null}
      {card.description ? (
        <div
          className={cn(
            "absolute z-10 max-w-[34ch] text-sm text-white/95 transition-colors group-hover:text-white",
            descriptionPositionClasses[descriptionPosition],
            descriptionNeedsOffset && "bottom-15",
          )}
        >
          {typeof card.description === "string" ? (
            <p>{card.description}</p>
          ) : (
            card.description
          )}
        </div>
      ) : null}
    </Link>
  );
}
