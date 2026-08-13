"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { cn } from "@mardu/ui/lib/utils";
import type {
  FooterAiSummaryLinkDto,
  FooterSocialIcon,
  FooterSocialLinkDto,
  LayoutLinkDto,
} from "./dto";

const SOCIAL_ICONS: Record<
  FooterSocialIcon,
  React.ComponentType<{ className?: string }>
> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  phone: Phone,
};

const AI_SUMMARY_MARKS: Record<
  FooterAiSummaryLinkDto["provider"],
  { src: string; className?: string }
> = {
  claude: { src: "/ai-summary/claude.svg" },
  chatgpt: { src: "/ai-summary/chatgpt.svg", className: "brightness-0 invert" },
  perplexity: { src: "/ai-summary/perplexity.svg" },
};

function isExternalHref(href: string, external?: boolean) {
  return external ?? /^[a-z][a-z\d+.-]*:/i.test(href);
}

function opensInNewTab(href: string) {
  return /^https?:\/\//i.test(href);
}

export function FooterLink({
  link,
  className,
  children,
}: {
  link: LayoutLinkDto;
  className?: string;
  children?: React.ReactNode;
}) {
  if (isExternalHref(link.href, link.external)) {
    const newTab = opensInNewTab(link.href);
    return (
      <a
        href={link.href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children ?? link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {children ?? link.label}
    </Link>
  );
}

export function FooterSocialLink({
  link,
  theme,
  variant = "default",
}: {
  link: FooterSocialLinkDto;
  theme: "dark" | "light";
  variant?: "default" | "editorial-index";
}) {
  const Icon = SOCIAL_ICONS[link.icon];
  const newTab = opensInNewTab(link.href);
  const className =
    variant === "editorial-index"
      ? "inline-flex size-11 items-center justify-center border border-white/18 text-white/72 transition-colors hover:border-[var(--footer-accent,#b9a7ff)] hover:text-[var(--footer-accent,#b9a7ff)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
      : theme === "dark"
        ? "inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white/90 transition-colors hover:bg-white hover:text-neutral-950"
        : "inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-black/4 text-foreground/80 transition-colors hover:bg-black hover:text-white";
  const icon = <Icon className="size-3.5" />;

  if (isExternalHref(link.href, link.external)) {
    return (
      <a
        href={link.href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={link.label}
        title={link.label}
      >
        {icon}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      aria-label={link.label}
      title={link.label}
    >
      {icon}
    </Link>
  );
}

export function FooterAiSummaryLinks({
  links,
  variant = "default",
}: {
  links: ReadonlyArray<FooterAiSummaryLinkDto>;
  variant?: "default" | "editorial-index";
}) {
  if (links.length === 0) return null;

  return (
    <div className="mt-4 border-t border-white/14 pt-4">
      <p className="mb-2 text-[0.6875rem] tracking-[0.08em] text-white/60">
        KI-Zusammenfassung
      </p>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const { className: imageClassName, src } =
            AI_SUMMARY_MARKS[link.provider];
          const className =
            variant === "editorial-index"
              ? "inline-flex size-9 items-center justify-center text-white/72 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
              : "inline-flex size-10 items-center justify-center text-white/90 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white";

          return (
            <li key={`${link.provider}:${link.href}`}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={link.label}
                title={link.label}
              >
                <Image
                  src={src}
                  alt=""
                  width={16}
                  height={16}
                  className={cn("h-4 w-auto object-contain", imageClassName)}
                  style={{ width: "auto" }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function useScrollToTop() {
  return React.useCallback(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, []);
}
