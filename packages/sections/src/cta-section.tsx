"use client";

import Image from "next/image";
import Link from "next/link";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import { cn } from "@mardu/ui/lib/utils";
import { CtaNewsletterDialog } from "./cta-newsletter-dialog";
import type { CTASectionProps } from "./cta-section-contract";

export default function CTASection({
  title,
  description,
  primaryButtonText,
  primaryActionSlot,
  secondaryButtonText,
  primaryButtonHref,
  secondaryButtonHref,
  eyebrow = "Nächster Schritt",
  backgroundImageSrc = "/landing/granieBackground.png",
  secondaryActionSlot,
  newsletterDialog,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("section-hairline py-18 md:py-24", className)}>
      <div className="relative overflow-hidden border border-black/20 p-8 md:p-12">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority={false}
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(9,12,24,0.11)_0%,rgba(12,15,26,0.38)_40%,rgba(12,15,26,0.12)_100%)]" />
        <div className="absolute inset-y-0 right-[8%] w-[22%] bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_12px)] opacity-35" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55">
            {eyebrow}
          </p>
          <h2 className="headline-balance text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-white">
            {title}
          </h2>
          <div className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-white/82 md:text-lg">
            {description}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            {primaryActionSlot ? (
              primaryActionSlot
            ) : primaryButtonHref ? (
              <EditorialActionButton
                render={<Link href={primaryButtonHref} />}
                tone="dark"
              >
                {primaryButtonText}
              </EditorialActionButton>
            ) : (
              <CtaNewsletterDialog
                config={newsletterDialog}
                triggerLabel={primaryButtonText}
              />
            )}

            {secondaryActionSlot ? (
              secondaryActionSlot
            ) : secondaryButtonText && secondaryButtonHref ? (
              <EditorialActionButton
                render={<Link href={secondaryButtonHref} />}
                priority="secondary"
                tone="dark"
              >
                {secondaryButtonText}
              </EditorialActionButton>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export type {
  CTASectionNewsletterDialogProps,
  CTASectionProps,
} from "./cta-section-contract";
