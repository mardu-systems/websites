import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  Network,
  ScanLine,
  UsersRound,
} from 'lucide-react';

import MediaPlaceholder from '@/components/utilities/media-placeholder';
import CTASectionWithRecaptcha from '@/components/utilities/cta-section-with-recaptcha';
import { Button } from '@mardu/ui/components/button';
import { NoiseAuroraBackground } from '@mardu/ui/components/noise-aurora';
import { Overline } from '@mardu/ui/components/typography';
import { SplitContent } from '@mardu/sections';
import {
  administrationCta,
  administrationGrowthPillars,
  administrationHero,
  administrationStorySections,
  type AdministrationStorySectionDto,
} from '@/data/administration-page';

export const metadata: Metadata = {
  title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln',
  description:
    'Externe Marketing-Seite für die Verwaltungssoftware von mardu.space: weniger Verwaltungsaufwand, mehr Kontrolle und klarere Prozesse für Nutzer, Standorte und Zutritte.',
  alternates: {
    canonical: '/verwaltungssoftware',
  },
  openGraph: {
    title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln | mardu.space',
    description:
      'Die zentrale Verwaltungsapp für Nutzer, Zutrittspunkte, Gruppen und Tags. Für Entscheider, die Prozesse vereinfachen und skalierbar aufstellen wollen.',
    url: '/verwaltungssoftware',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln | mardu.space',
    description: 'Die zentrale Verwaltungsapp für Nutzer, Zutrittspunkte, Gruppen und Tags.',
  },
};

function SoftwareHeroVisual() {
  return (
    <div className="relative overflow-hidden border border-black/12 bg-card p-5 md:p-6">
      <NoiseAuroraBackground tone="indigo-amber" intensity="soft" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3 border border-white/40 bg-white/85 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">WebQ Admin</p>
            <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
              Zentrale Verwaltungsapp
            </p>
          </div>
          <div className="inline-flex items-center gap-2 border border-emerald-600/15 bg-emerald-500/8 px-3 py-1 text-xs text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            Operativ nutzbar
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center border border-black/10 bg-card">
                    <UsersRound className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Nutzerverwaltung</p>
                    <p className="text-xs text-foreground/55">Status, Gruppen und Tags</p>
                  </div>
                </div>
                <div className="text-right text-xs text-foreground/55">
                  <p>1.284 Nutzer</p>
                  <p>24 neue heute</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Anna Keller', meta: 'Standort Karlsruhe', tag: 'Produktion' },
                  { name: 'Murat Demir', meta: 'Externer Dienstleister', tag: 'Besuch' },
                  { name: 'Team Labor Nord', meta: 'Gruppenzuordnung aktiv', tag: 'Labor' },
                ].map((entry) => (
                  <div
                    key={entry.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border border-black/8 bg-card/70 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{entry.name}</p>
                      <p className="text-xs text-foreground/55">{entry.meta}</p>
                    </div>
                    <span className="border border-black/10 bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-foreground/58">
                      {entry.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <HeroSignalCard
                icon={Network}
                eyebrow="Integrationen"
                title="Quellen anbinden"
                description="Bestehende Nutzerquellen statt Doppelpflege."
              />
              <HeroSignalCard
                icon={KeyRound}
                eyebrow="Freigaben"
                title="Regeln zentral steuern"
                description="Nach Person, Bereich und Zeit statt pauschal."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center border border-black/10 bg-card">
                  <BadgeCheck className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Freigabestatus</p>
                  <p className="text-xs text-foreground/55">Personen, Bereiche und Bedingungen</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ['Nutzergruppe Werkstatt', 'Zugang Gebäude A', 'Mo-Fr 06:00-22:00'],
                  ['Lehrstuhl Metall', 'Labor Nord', 'nur mit aktiver Qualifikation'],
                  ['Service-Team', 'Tor 3', 'zeitgesteuerte Freigabe'],
                ].map(([actor, target, rule]) => (
                  <div key={`${actor}-${target}`} className="border border-black/8 bg-card/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{actor}</p>
                      <ArrowRight className="h-4 w-4 text-foreground/35" aria-hidden="true" />
                      <p className="text-sm text-foreground/72">{target}</p>
                    </div>
                    <p className="mt-2 text-xs text-foreground/55">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 bg-background/92 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                Gruppen & Tags
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="border border-black/8 bg-card/70 p-3">
                  <p className="text-sm font-medium text-foreground">9 Nutzergruppen</p>
                  <p className="mt-1 text-xs text-foreground/55">Regeln zentral statt einzeln.</p>
                </div>
                <div className="border border-black/8 bg-card/70 p-3">
                  <p className="text-sm font-medium text-foreground">Tag-Ausgabe in 3 Schritten</p>
                  <p className="mt-1 text-xs text-foreground/55">Anlegen, zuordnen, bestätigen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSignalCard({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center border border-black/10 bg-card">
          <Icon className="h-4 w-4 text-foreground/70" aria-hidden="true" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">{eyebrow}</p>
      </div>
      <p className="mt-3 text-sm font-semibold tracking-[-0.01em] text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/60">{description}</p>
    </div>
  );
}

function StoryVisual({ section }: { section: AdministrationStorySectionDto }) {
  switch (section.media.kind) {
    case 'user-management':
      return <UserManagementVisual section={section} />;
    case 'integration-flow':
      return <IntegrationFlowVisual section={section} />;
    case 'access-rules':
      return <AccessRulesVisual section={section} />;
    case 'group-management':
      return <GroupManagementVisual section={section} />;
    case 'tag-enrollment':
      return <TagEnrollmentVisual section={section} />;
    default:
      return (
        <MediaPlaceholder
          badge={section.media.badge}
          title={section.media.title}
          description={section.media.description}
          className="min-h-[22rem]"
          aspectRatioClassName="aspect-[6/5]"
        />
      );
  }
}

function VisualFrame({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border border-black/10 bg-card">
      <div className="absolute inset-0 bg-linear-to-br from-background via-card to-muted/30" />
      <div className="relative p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex border border-black/10 bg-background px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground/50">
              {badge}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
              {title}
            </h3>
            <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-foreground/66">
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProductScreenshot({
  badge,
  title,
  description,
  src,
  alt,
  sizes,
}: {
  badge: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <VisualFrame badge={badge} title={title} description={description}>
      <div className="overflow-hidden border border-black/8 bg-black">
        <div className="relative aspect-[16/10] w-full">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
    </VisualFrame>
  );
}

function UserManagementVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/benutzerverwaltung.png"
      alt="Benutzerverwaltung mit Benutzerliste, Aktivstatus und Tag-Zuweisungen"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function IntegrationFlowVisual({ section }: { section: AdministrationStorySectionDto }) {
  const sources = ['Directory', 'HR-System', 'Gastdaten'];
  const targets = ['Nutzer', 'Gruppen', 'Freigaben'];

  return (
    <VisualFrame
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
    >
      <div className="grid gap-4 lg:grid-cols-[0.95fr_auto_1.05fr] lg:items-center">
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source} className="border border-black/8 bg-background px-4 py-3">
              <p className="text-sm font-medium text-foreground">{source}</p>
              <p className="text-xs text-foreground/55">Bestehende Quelle</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background">
            <Network className="h-5 w-5 text-foreground/65" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-3">
          {targets.map((target) => (
            <div key={target} className="border border-black/8 bg-background px-4 py-3">
              <p className="text-sm font-medium text-foreground">{target}</p>
              <p className="text-xs text-foreground/55">Direkt in der Verwaltungsapp nutzbar</p>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function AccessRulesVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/zugriffsprotokolle.png"
      alt="Zugriffsprotokolle mit Entscheidungen, Verläufen und Zutrittspunkten"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function GroupManagementVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/zutrittspunkte-und-geraete.png"
      alt="Verwaltung der Zutrittspunkte und Geräte als strukturierte Grundlage für Gruppen und Regeln"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function TagEnrollmentVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <VisualFrame
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['01', 'Tag erfassen', 'Neuen Tag scannen oder anlegen.'],
          ['02', 'Person zuweisen', 'Direkt dem richtigen Nutzer zuordnen.'],
          ['03', 'Freigabe prüfen', 'Zuordnung bestätigen und dokumentieren.'],
        ].map(([step, title, description]) => (
          <div key={step} className="border border-black/8 bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                Step {step}
              </span>
              <ScanLine className="h-4 w-4 text-foreground/40" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/62">{description}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

function StorySection({
  section,
  reverse = false,
}: {
  section: AdministrationStorySectionDto;
  reverse?: boolean;
}) {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-20 md:py-24">
        <div
          className={`grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,1.05fr)] lg:items-center ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}
        >
          <div className="space-y-6">
            <Overline>{section.eyebrow}</Overline>
            <h2 className="headline-balance max-w-3xl text-[clamp(1.8rem,3.7vw,3rem)] leading-[1.04] tracking-[-0.03em] text-foreground">
              {section.title}
            </h2>
            <div className="max-w-[58ch] space-y-3 text-base leading-relaxed text-foreground/74 md:text-[1.05rem]">
              {section.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="grid gap-3 border-t border-black/8 pt-5 sm:grid-cols-2">
              {section.benefits.map((benefit) => (
                <li key={benefit.title} className="border border-black/8 bg-card/65 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-foreground/62"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground md:text-base">
                        {benefit.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/64">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <StoryVisual section={section} />
        </div>
      </div>
    </section>
  );
}

function CoreBenefitsSection() {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-14 md:py-16">
        <div className="mb-8 flex flex-col gap-3 lg:max-w-2xl">
          <Overline>Kernvorteile</Overline>
          <h2 className="headline-balance text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] tracking-[-0.03em] text-foreground">
            Was die Software heute konkret vereinfacht
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {administrationHero.keyFigures.map((figure) => (
            <article key={figure.label} className="border border-black/10 bg-card p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                {figure.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {figure.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/64">
                {figure.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VerwaltungsoftwarePage() {
  const storyOrder = ['users', 'tags', 'groups', 'rules', 'directories'];
  const orderedSections = storyOrder
    .map((id) => administrationStorySections.find((section) => section.id === id))
    .filter((section): section is AdministrationStorySectionDto => Boolean(section));

  const growthItems = administrationGrowthPillars.map((pillar) => ({
    title: pillar.title,
    icon: pillar.icon,
    description: (
      <>
        <p>{pillar.description}</p>
        <p className="mt-2 text-foreground/56">{pillar.proof}</p>
      </>
    ),
  }));

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-black/8 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,170,98,0.16),transparent_28%),radial-gradient(circle_at_100%_20%,rgba(71,95,255,0.12),transparent_28%)]" />
        <div className="mardu-container relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="space-y-6">
            <Overline>{administrationHero.overline}</Overline>
            <h1 className="headline-balance max-w-4xl text-[clamp(2.2rem,4.7vw,4.6rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {administrationHero.title}
            </h1>
            <div className="max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {administrationHero.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={administrationHero.primaryCtaHref}>
                  {administrationHero.primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#nutzerverwaltung">
                  Produkt ansehen
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <SoftwareHeroVisual />
        </div>
      </section>

      <CoreBenefitsSection />

      {orderedSections.map((section, index) => (
        <div key={section.id} id={section.id === 'users' ? 'nutzerverwaltung' : undefined}>
          <StorySection section={section} reverse={index % 2 === 1} />
        </div>
      ))}

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <SplitContent
            eyebrow="Zukunftsfähigkeit"
            title="Heute nutzbar, später sauber erweiterbar"
            description={
              <>
                <p className="text-balance">
                  Die Verwaltungsapp soll heute Ordnung schaffen und später anschlussfähig bleiben.
                </p>
                <p className="mt-4">
                  Wenn weitere Nutzerquellen, Standorte oder automatisierte Abläufe dazukommen, muss
                  die Struktur nicht neu gedacht werden.
                </p>
              </>
            }
            sideTitle="Worauf die Basis vorbereitet ist"
            items={growthItems}
            variant="plain"
          />
        </div>
      </section>

      <CTASectionWithRecaptcha
        title={administrationCta.title}
        description={administrationCta.description}
        primaryButtonText={administrationCta.primaryButtonText}
        primaryButtonHref={administrationCta.primaryButtonHref}
        secondaryButtonText={administrationCta.secondaryButtonText}
        secondaryButtonHref={administrationCta.secondaryButtonHref}
      />
    </main>
  );
}
