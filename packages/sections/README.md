# `@mardu/sections`

Shared content sections for multiple Mardu frontends.

## Public API

- `WhitepaperSection`
- `Gallery`
- `ScenarioGrid`
- `FeatureList`
- `ThreeArguments`
- `Faq`
- `FeatureSection`
- `ConfiguratorTeaser`
- `RoadmapTimeline`
- `CardGrid`
- `InfoGrid`
- `HeroSection`
- `DualImageSection`
- `SplitContent`
- `TripleImageSection`
- `Foerderung`
- `NewsletterStatusPage`
- `ProcessSteps`
- `ScenarioShowcase`
- `ContactPageSection`
- `CTASection`
- `EditorialPanelsSection`

## `WhitepaperSection` contract

- Props:
  - `title?: string`
  - `description?: string`
  - `benefits?: string[]`
  - `coverImageSrc?: string`
  - `eyebrow?: string`
  - `requestUrl?: string`
  - `submitLabel?: string`
  - `submitPendingLabel?: string`
  - `consentLabel?: string`
  - `successTitle?: string`
  - `successDescription?: string`
  - `onSubmitRequest?: (payload: WhitepaperLeadRequestDto) => Promise<void>`
  - `className?: string`
- Behavior:
  - defaults to `POST /api/whitepaper/request`, but the endpoint can be overridden
  - alternatively accepts an app-owned `onSubmitRequest` handler
  - shows a success dialog after a successful request
  - contains no site-specific branding, fetch ownership, or DTO validation logic

## `HeroSection` contract

- Props:
  - `variant?: 'default' | 'landing'`
  - `overline?: ReactNode`
  - `title: string`
  - `emphasis?: string`
  - `description: ReactNode`
  - `buttonText?: string`
  - `buttonHref?: string`
  - `secondaryButtonText?: string`
  - `secondaryButtonHref?: string`
  - `imageSrc: string`
  - `imageAlt: string`
  - `mediaCards?: HeroMediaCard[]`
  - `backgroundImageSrc?: string`
- Behavior:
  - `default` renders a classic text + media hero
  - `landing` renders one or two configurable media cards instead of hardcoded product teasers
  - one media card renders as a single large hero medium
  - two media cards render as an overlapping editorial stack on larger screens and a simple vertical stack on small screens
  - in-page scroll behavior is opt-in via `HeroMediaCard.scrollTargetId`
- `HeroMediaCard`:
  - `href: string`
  - `ariaLabel: string`
  - `media?: HeroCardMedia`
  - `imageSrc?: string`
  - `imageAlt?: string`
  - `badge?: ReactNode`
  - `description?: ReactNode`
  - `scrollTargetId?: string`
  - `priority?: boolean`
  - `sizes?: string`
  - `className?: string`
  - `mediaClassName?: string`
  - `imageClassName?: string`
  - `overlayClassName?: string`
  - `badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
  - `descriptionPosition?: 'bottom-left' | 'bottom-right'`
- `HeroCardMedia`:
  - `{ type: 'image'; src: string; alt: string }`
  - `{ type: 'video'; src: string; poster?: string; muted?: boolean; autoPlay?: boolean; loop?: boolean; playsInline?: boolean; controls?: boolean }`
  - `{ type: 'embed'; src: string; title: string }`
- Notes:
  - `media` is the preferred API for landing cards
  - `imageSrc` and `imageAlt` remain supported as a compatibility fallback for existing image cards
  - badge and description positioning stay card-owned so apps can place labels differently for primary vs. secondary cards

## Shared section API notes

- `ConfiguratorTeaser` now accepts render-ready teaser DTOs for highlights, preview stats, preview tags, CTA and labels instead of fixed configurator copy.
- `CardGrid` supports `eyebrow` plus `itemMetaLabel` so index labels like `Fokus 1` stay app-configurable.
- `Faq` supports `variant: 'default' | 'lined'` for card-style vs. bordered editorial layouts.
- `FeatureSection` accepts `ctaSlot` so app-specific CTA UI stays outside the package.
- `Foerderung` supports `spacing: 'default' | 'compact'` for denser logo rows.
- `InfoGrid` supports `variant: 'default' | 'cards'` plus `eyebrow` and `intro`.
- `ProcessSteps` supports `variant: 'default' | 'plain'`.
- `RoadmapTimeline` supports `variant: 'default' | 'plain'` plus `eyebrow` and `intro`.
- `SplitContent` supports `variant: 'immersive' | 'plain'` so `mardu-space` can keep a light editorial layout without a local fork.
- `FeatureSection`, `ThreeArguments`, `TripleImageSection`, `Foerderung`, `InfoGrid`, `ProcessSteps` and `RoadmapTimeline` expose eyebrow/intro metadata so the same layouts can tell different stories without forking the component.
- `NewsletterStatusPage` keeps the newsletter semantics, but primary and secondary action links are now configurable.
- `ContactPageSection` standardizes the `/contact` page shell while the consuming app still owns the actual form renderer and submit route.
- `CTASection` standardizes the large conversion block near the end of a page. The package owns the shared layout and optional newsletter dialog, while the app still owns hard links and any custom secondary action UI.
- `CTASection` keeps the `mardu.de` visual baseline as the default and only exposes small hooks for routing, custom secondary actions and optional request tokens.
- `EditorialPanelsSection` provides an editorial 3-panel product-story layout with render-ready media DTOs, so apps can supply their own copy and screenshots without forking the composition.

## `EditorialPanelsSection` contract

- Props:
  - `eyebrow?: string`
  - `title: string`
  - `intro?: string`
  - `items: [EditorialPanelItem, EditorialPanelItem, EditorialPanelItem]`
  - `className?: string`
- `EditorialPanelItem`:
  - `id: string`
  - `badge: string`
  - `title: string`
  - `description: string`
  - `imageSrc: string`
  - `imageAlt: string`
  - `theme?: 'dark' | 'light'`
  - `imageObjectPosition?: string`
  - `accentTone?: 'emerald' | 'amber' | 'sky' | 'stone'`
- Behavior:
  - renders exactly 3 tall product-story panels to preserve the intended editorial rhythm
  - each panel keeps copy short and image-led, with media anchored to the lower area
  - `theme` controls dark vs. light panel treatment without app-owned layout overrides
  - `accentTone` only adjusts subtle atmosphere, not the core composition or hierarchy

## `CTASection` contract

- Props:
  - `title: string`
  - `description: ReactNode`
  - `primaryButtonText: string`
  - `secondaryButtonText?: string`
  - `primaryButtonHref?: string`
  - `secondaryButtonHref?: string`
  - `eyebrow?: string`
  - `backgroundImageSrc?: string`
  - `secondaryActionSlot?: ReactNode`
  - `newsletterDialog?: CTASectionNewsletterDialogProps`
  - `className?: string`
- `CTASectionNewsletterDialogProps`:
  - `requestUrl?: string`
  - `requestRole?: 'newsletter' | 'whitepaper'`
  - `dialogTitle?: string`
  - `dialogDescription?: string`
  - `submitLabel?: string`
  - `submitPendingLabel?: string`
  - `successMessage?: string`
  - `errorMessage?: string`
  - `consentLabel?: ReactNode`
  - `getRequestToken?: (action: string) => Promise<string | null>`
- Behavior:
  - if `primaryButtonHref` is set, the primary action is a hard link
  - otherwise the section opens the shared newsletter dialog and posts to `requestUrl`
  - `secondaryActionSlot` is the escape hatch for app-owned actions like Meetergo
  - the default styling and dialog flow follow the previous `mardu.de` CTA section

## Shared section DTOs

- `WhitepaperLeadRequestDto`
- `GalleryImage` / `GalleryProps`
- `ScenarioBlock` / `ScenarioHighlight` / `ScenarioGridProps`
- `FeatureListItemDef` / `FeatureListProps`
- `ArgumentItem` / `ThreeArgumentsProps`
- `FaqItem` / `FaqProps`
- `FeatureSectionProps`
- `ConfiguratorTeaserProps`
- `RoadmapCard` / `RoadmapMilestone` / `RoadmapTimelineProps`
- `CardItem` / `CardGridProps`
- `InfoGridItem` / `InfoGridProps`
- `HeroMediaCard` / `HeroSectionProps`
- `ImageCardProps` / `DualImageSectionProps`
- `SplitContentItem` / `SplitContentProps`
- `TripleImageCardProps` / `TripleImageSectionProps`
- `FoerderItem`
- `NewsletterStatusPageProps`
- `StepItem` / `ProcessStepsProps`
- `Feature` / `Scenario` / `ScenarioShowcaseProps`
- `ContactPageDetailsDto` / `ContactPageSectionProps`
- `CTASectionNewsletterDialogProps` / `CTASectionProps`
- `EditorialPanelItem` / `EditorialPanelsSectionProps`

These DTOs are intentionally render-ready. Routing, fetching, and CMS mapping stay in the consuming app or in upstream core packages.
