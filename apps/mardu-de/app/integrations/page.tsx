import { INTEGRATION_STATUS_LABELS } from '@mardu/integrations-ui';
import type { IntegrationListItemDto } from '@mardu/content-core';
import { isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import { LockKeyhole } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EditorialPageHero } from '@mardu/ui/components/editorial-page-hero';
import { EditorialAccent } from '@mardu/ui/components/typography';
import {
  IntegrationsDirectory,
  type IntegrationsDirectoryItem,
} from '@/components/integrations/integrations-directory';
import { MARDU_FAVICON_PATH } from '@/lib/brand-assets';
import { getIntegrations } from '@/lib/integrations';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const integrationsMetadata: Metadata = createPageMetadata({
  title: 'Integrationen',
  description:
    'Mardu verbindet Zutritt, Maschinen, Identitäten und Prozesse über offene Standards und bestehende Systeme.',
  path: '/integrations',
  socialTitle: 'Integrationen | Mardu',
});

export async function generateMetadata(): Promise<Metadata> {
  if (!(await isIntegrationsEnabled('mardu-de'))) {
    return { title: 'Integrationen nicht gefunden', robots: { index: false, follow: false } };
  }

  return integrationsMetadata;
}

const CURATED_INTEGRATION_SLUGS = [
  'ldap',
  'openid-connect',
  'microsoft-entra-id',
  'mqtt',
  'easyverein',
  'stripe',
] as const;

const SYSTEM_GROUPS = [
  { index: '01', status: 'available' },
  { index: '02', status: 'beta' },
  { index: '03', status: 'planned' },
] as const;

const toDirectoryItem = (item: IntegrationListItemDto): IntegrationsDirectoryItem => ({
  title: item.title,
  slug: item.slug,
  shortDescription: item.shortDescription,
  status: item.status,
  categories: item.categories.map(({ slug, title }) => ({ slug, title })),
  logoSrc: item.logoUrl,
  href: `/integrations/${item.slug}`,
});

const buildDirectoryItems = (items: IntegrationListItemDto[]): IntegrationsDirectoryItem[] => {
  const itemsBySlug = new Map(items.map((item) => [item.slug, item]));
  const curatedSlugs = new Set<string>(CURATED_INTEGRATION_SLUGS);

  const curated = CURATED_INTEGRATION_SLUGS.flatMap((slug) => {
    const item = itemsBySlug.get(slug);
    return item ? [toDirectoryItem(item)] : [];
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

  const result = await getIntegrations({ limit: 400, sort: 'alphabetical' });
  const directoryItems = buildDirectoryItems(result.items);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <EditorialPageHero
        eyebrow="[03 / INTEGRATIONEN]"
        title={
          <>
            Systeme, die <EditorialAccent>miteinander arbeiten.</EditorialAccent>
          </>
        }
        description="Verbinde Mardu über OIDC, LDAP, MQTT, REST und MCP mit deinen Systemen. Entdecke verfügbare Integrationen, Beta-Anbindungen und geplante Erweiterungen."
        media={
          <div className="relative h-20 overflow-hidden md:h-24 xl:h-20">
            <Image
              src="/integrations/workshop-access-line-art.png"
              alt="Person authentifiziert sich am Zugang zu einer vernetzten Werkstatt"
              fill
              priority
              className="object-contain object-center"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>
        }
      />

      <section aria-labelledby="systemlandschaft-heading" className="py-12 md:py-16">
        <h2 id="systemlandschaft-heading" className="sr-only">
          Integrationen nach Verfügbarkeit
        </h2>
        <div className="mardu-container">
          <div className="relative mx-auto lg:w-[78%]">
            <div className="relative flex min-h-10 items-center justify-between bg-[#101010] px-5 text-[10px] uppercase tracking-[0.045em] text-white md:px-24 md:text-[11px]">
              <span className="pr-16 sm:pr-0">Mardu – Identitäts- und Zugriffsplattform</span>
              <span className="hidden items-center gap-2 text-white/86 sm:flex">
                Berechtigungen, Freigaben &amp; Protokolle
                <LockKeyhole aria-hidden="true" className="size-3.5 stroke-[1.5]" />
              </span>
              <span className="absolute right-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center bg-mardu-purple sm:left-1/2 sm:right-auto sm:-translate-x-1/2 md:size-13">
                <Image
                  src={MARDU_FAVICON_PATH}
                  alt=""
                  width={34}
                  height={34}
                  className="size-7 brightness-0 invert md:size-8"
                />
              </span>
            </div>

            <div className="relative grid border-b border-border sm:grid-cols-3">
              {SYSTEM_GROUPS.map((group) => (
                <div
                  key={group.index}
                  className="relative min-h-21 border-border px-3 pb-3 pt-6 sm:border-r sm:last:border-r-0 lg:min-h-22 lg:px-2 lg:pt-7"
                >
                  <span className="absolute left-1/2 top-0 hidden h-4 w-px -translate-x-1/2 bg-foreground/35 lg:block" />
                  <span className="absolute left-1/2 top-3 hidden size-2 -translate-x-1/2 bg-mardu-purple lg:block" />
                  <p className="font-mono text-[10px] text-mardu-purple">[{group.index}]</p>
                  <h3 className="mt-1 text-sm font-normal leading-tight">
                    {INTEGRATION_STATUS_LABELS[group.status]}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/58">
                    {result.statusCounts[group.status]}{' '}
                    {result.statusCounts[group.status] === 1 ? 'Integration' : 'Integrationen'}
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
