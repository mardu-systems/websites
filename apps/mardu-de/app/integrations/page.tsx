import type { IntegrationListItemDto } from '@mardu/content-core';
import { isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import { LockKeyhole } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  IntegrationsDirectory,
  type IntegrationsDirectoryItem,
} from '@/components/integrations/integrations-directory';
import { MARDU_FAVICON_PATH } from '@/lib/brand-assets';
import { getIntegrations } from '@/lib/integrations';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Integrationen',
  description:
    'Mardu verbindet Zutritt, Maschinen, Identitäten und Prozesse über offene Standards und bestehende Systeme.',
  alternates: {
    canonical: '/integrations',
  },
  openGraph: {
    title: 'Integrationen | Mardu',
    description:
      'Systeme, die miteinander arbeiten: Identität, Automation, Organisation und Abrechnung zentral verbinden.',
    url: '/integrations',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrationen | Mardu',
    description:
      'Systeme, die miteinander arbeiten: Identität, Automation, Organisation und Abrechnung zentral verbinden.',
  },
};

const CURATED_INTEGRATIONS = [
  { slug: 'ldap', logoSrc: '/integrations/logos/ldap.png' },
  { slug: 'oidc', logoSrc: '/integrations/logos/openid.svg' },
  { slug: 'microsoft-entra-id', logoSrc: '/integrations/logos/microsoft.svg' },
  { slug: 'mqtt', logoSrc: '/integrations/logos/mqtt.svg' },
  { slug: 'easyverein', logoSrc: '/integrations/logos/easyverein.ico' },
  { slug: 'stripe', logoSrc: '/integrations/logos/stripe.svg' },
] as const;

const SYSTEM_GROUPS = [
  { index: '02', title: 'Identität & Zugriff', count: 3 },
  { index: '03', title: 'Automation & IoT', count: 4 },
  { index: '04', title: 'Verwaltung & Organisation', count: 3 },
  { index: '05', title: 'Finanzen & Abrechnung', count: 1 },
] as const;

const toDirectoryItem = (item: IntegrationListItemDto): IntegrationsDirectoryItem => ({
  title: item.title,
  slug: item.slug,
  shortDescription: item.shortDescription,
  status: item.status,
  logoSrc: item.logoUrl,
  href: `/integrations/${item.slug}`,
});

const buildDirectoryItems = (items: IntegrationListItemDto[]): IntegrationsDirectoryItem[] => {
  const itemsBySlug = new Map(items.map((item) => [item.slug, item]));
  const curatedSlugs = new Set<string>(CURATED_INTEGRATIONS.map((item) => item.slug));

  const curated = CURATED_INTEGRATIONS.flatMap((presentation) => {
    const item = itemsBySlug.get(presentation.slug);
    return item
      ? [{ ...toDirectoryItem(item), logoSrc: presentation.logoSrc ?? item.logoUrl }]
      : [];
  });

  const remaining: IntegrationsDirectoryItem[] = [];

  for (const item of items) {
    if (!curatedSlugs.has(item.slug)) {
      remaining.push(toDirectoryItem(item));
    }
  }

  return [...curated, ...remaining];
};

export default async function IntegrationsPage() {
  if (!(await isIntegrationsEnabled('mardu-de'))) {
    notFound();
  }

  const result = await getIntegrations({ limit: 100, sort: 'featured' });
  const directoryItems = buildDirectoryItems(result.items);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-hairline">
        <div className="mardu-container grid gap-6 py-7 md:py-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 xl:px-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-mardu-purple">
              [01] Integrationen
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.75rem,4.5vw,4rem)] font-normal leading-[0.96] tracking-[-0.045em]">
              <span className="block">Systeme, die</span>
              <span className="block">miteinander arbeiten.</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/72 md:text-base">
              Verbinde Zutritt, Maschinen, Identitäten und Prozesse mit Standards wie LDAP, OIDC,
              MQTT, ModBus, MCP sowie Plattformen wie n8n, Stripe und easyVerein.
            </p>
          </div>

          <div className="relative aspect-[2/1] min-h-58 overflow-hidden lg:-mr-8 xl:-mr-10">
            <Image
              src="/integrations/workshop-access-line-art.png"
              alt="Person authentifiziert sich am Zugang zu einer vernetzten Werkstatt"
              fill
              priority
              className="object-contain object-center"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="systemlandschaft-heading"
        className="section-hairline pb-5 pt-4 md:pb-6"
      >
        <h2 id="systemlandschaft-heading" className="sr-only">
          Mardu Systemlandschaft
        </h2>
        <div className="mardu-container">
          <div className="relative mx-auto lg:w-[78%]">
            <div className="relative flex min-h-10 items-center justify-between bg-[#101010] px-5 text-[10px] uppercase tracking-[0.045em] text-white md:px-24 md:text-[11px]">
              <span>Mardu – Identitäts- und Zugriffsplattform</span>
              <span className="hidden items-center gap-2 text-white/86 sm:flex">
                Einheitlicher Zugriff, Richtlinien &amp; Audit
                <LockKeyhole aria-hidden="true" className="size-3.5 stroke-[1.5]" />
              </span>
              <span className="absolute left-1/2 top-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-mardu-purple md:size-13">
                <Image
                  src={MARDU_FAVICON_PATH}
                  alt=""
                  width={34}
                  height={34}
                  className="size-7 brightness-0 invert md:size-8"
                />
              </span>
            </div>

            <div className="relative grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
              {SYSTEM_GROUPS.map((group) => (
                <div
                  key={group.index}
                  className="relative min-h-21 border-border px-3 pb-3 pt-6 sm:border-r sm:last:border-r-0 lg:min-h-22 lg:px-2 lg:pt-7"
                >
                  <span className="absolute left-1/2 top-0 hidden h-4 w-px -translate-x-1/2 bg-foreground/35 lg:block" />
                  <span className="absolute left-1/2 top-3 hidden size-2 -translate-x-1/2 bg-mardu-purple lg:block" />
                  <p className="font-mono text-[10px] text-mardu-purple">[{group.index}]</p>
                  <h3 className="mt-1 text-sm font-normal leading-tight">{group.title}</h3>
                  <p className="mt-1 text-sm text-foreground/58">
                    {group.count} {group.count === 1 ? 'Integration' : 'Integrationen'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <IntegrationsDirectory items={directoryItems} />
    </main>
  );
}
