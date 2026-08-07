import type * as React from "react";

/**
 * Optional CMS reference fields that keep the DTOs Payload-ready without
 * coupling this package to any concrete Payload collection or fetch workflow.
 */
export interface PayloadReferenceDto {
  slug?: string;
  documentId?: string;
  cmsKey?: string;
}

/**
 * Hard-linked layout navigation item. Consumers provide concrete hrefs today,
 * while optional CMS fields make later Payload mapping straightforward.
 */
export interface LayoutLinkDto extends PayloadReferenceDto {
  label: string;
  href: string;
  external?: boolean;
  /** Optional two-digit label used by editorial index navigation. */
  index?: string;
  /** Optional explanatory line rendered below an editorial navigation label. */
  description?: string;
}

/**
 * Optional media descriptor for future mega-menu or CMS-driven navigation.
 */
export interface HeaderNavImageDto {
  src: string;
  alt?: string;
  aspect?: "wide" | "square";
}

/**
 * Optional hero descriptor for future mega-menu variants.
 */
export interface HeaderNavHeroDto {
  src: string;
  alt?: string;
  caption?: string;
}

/**
 * One item inside a future mega-menu group.
 */
export interface HeaderNavMegaItemDto extends LayoutLinkDto {
  image?: HeaderNavImageDto;
  badge?: string;
}

/**
 * Current flat navigation link used by both sites.
 */
export interface HeaderNavLinkDto extends LayoutLinkDto {
  type: "link";
}

/**
 * Payload-ready navigation group for future mega-menu expansion.
 */
export interface HeaderNavMegaGroupDto extends PayloadReferenceDto {
  type: "mega";
  label: string;
  hero?: HeaderNavHeroDto;
  items: ReadonlyArray<HeaderNavMegaItemDto>;
}

/**
 * Shared header navigation contract. Today both apps use `type: "link"`.
 */
export type HeaderNavItemDto = HeaderNavLinkDto | HeaderNavMegaGroupDto;

/**
 * Backwards-compatible aliases for app-local imports that previously lived in
 * duplicated `types/header.ts` files.
 */
export type NavItem = HeaderNavMegaItemDto;
export type MegaGroup = HeaderNavMegaGroupDto;
export type SimpleLink = HeaderNavLinkDto;
export type NavEntry = HeaderNavItemDto;

/**
 * Meetergo prefill payload kept intentionally permissive because the upstream
 * scheduler accepts free-form string keys.
 */
export interface MeetergoPrefillDto {
  firstname?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  timezone?: string;
  locale?: string;
  [key: string]: string | undefined;
}

/**
 * Header CTA configuration. `mode: "meetergo"` preserves the current modal
 * scheduler behavior, while `mode: "link"` renders a normal link CTA.
 */
export interface HeaderCtaDto extends LayoutLinkDto {
  mode?: "link" | "meetergo";
  prefill?: MeetergoPrefillDto;
}

/**
 * Shared branding inputs for the header logo/home link.
 */
export interface SiteHeaderBrandingDto {
  homeHref: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  /** Optional image asset that replaces the mobile menu and close glyphs. */
  mobileMenuIconSrc?: string;
}

/**
 * Public API for the shared header component.
 */
export interface SiteHeaderProps {
  brand: SiteHeaderBrandingDto;
  items: ReadonlyArray<HeaderNavItemDto>;
  cta?: HeaderCtaDto;
  /** Keeps the shared default header or enables the numbered Mardu editorial layout. */
  variant?: "default" | "editorial-index";
  navigationLabel?: string;
  menuOpenLabel?: string;
  menuCloseLabel?: string;
}

/**
 * Supported icon keys for shared footer social links.
 */
export type FooterSocialIcon =
  | "instagram"
  | "linkedin"
  | "github"
  | "mail"
  | "phone";

/**
 * Footer social link DTO. The icon key keeps the DTO serializable and easy to
 * map from Payload later.
 */
export interface FooterSocialLinkDto extends LayoutLinkDto {
  icon: FooterSocialIcon;
}

/**
 * Supported providers for an externally generated AI summary of the current website.
 */
export type FooterAiSummaryProvider = "claude" | "chatgpt" | "perplexity";

/**
 * Footer link to an AI provider with a prefilled prompt for a website summary.
 * The consumer owns the prompt, source URL, and external target URL.
 */
export interface FooterAiSummaryLinkDto extends LayoutLinkDto {
  provider: FooterAiSummaryProvider;
}

/**
 * Optional non-link footer interactions such as opening cookie settings.
 */
export interface FooterActionDto extends PayloadReferenceDto {
  id: string;
  label: string;
}

/**
 * Shared footer branding inputs.
 */
export interface SiteFooterBrandingDto {
  homeHref: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  /** Optional standalone wordmark used for the interactive editorial footer finish. */
  wordmarkSrc?: string;
  copyrightName: string;
}

/**
 * Public API for the shared footer component.
 */
export interface SiteFooterProps {
  brand: SiteFooterBrandingDto;
  description?: string;
  primaryActionSlot?: React.ReactNode;
  navLinks?: ReadonlyArray<LayoutLinkDto>;
  metaLinks?: ReadonlyArray<LayoutLinkDto>;
  socialLinks?: ReadonlyArray<FooterSocialLinkDto>;
  /** Optional external links for AI-generated summaries of the site. */
  aiSummaryLinks?: ReadonlyArray<FooterAiSummaryLinkDto>;
  actions?: ReadonlyArray<FooterActionDto>;
  onAction?: (actionId: string) => void;
  theme?: "dark" | "light";
  /** Keeps the shared default footer or enables the compact editorial layout. */
  variant?: "default" | "editorial-index";
}

/**
 * Public API for the shared shell component.
 */
export interface SiteShellProps {
  children: React.ReactNode;
  header: SiteHeaderProps;
  footer: SiteFooterProps;
  disabled?: boolean;
  contentTheme?: "light" | "dark";
}
