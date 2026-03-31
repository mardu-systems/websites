import { IntegrationsFilters } from '@/components/integrations/integrations-filters';
import { IntegrationsGrid } from '@/components/integrations/integrations-grid';
import { IntegrationsHero } from '@/components/integrations/integrations-hero';
import { IntegrationsPagination } from '@/components/integrations/integrations-pagination';
import { Overline } from '@mardu/ui/components/typography';
import { getIntegrationCategories, getIntegrations, getIntegrationProtocols } from '@/lib/integrations';
import type { IntegrationSort, IntegrationStatus } from '@mardu/content-core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrationen',
  description:
    'Entdecke verfügbare, geplante und Beta-Integrationen für Identität, Automation, OT/IoT und Business-Tools.',
  alternates: {
    canonical: '/integrations',
  },
  openGraph: {
    title: 'Integrationen | Mardu',
    description:
      'Entdecke verfügbare, geplante und Beta-Integrationen für Identität, Automation, OT/IoT und Business-Tools.',
    url: '/integrations',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrationen | Mardu',
    description:
      'Entdecke verfügbare, geplante und Beta-Integrationen für Identität, Automation, OT/IoT und Business-Tools.',
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const asString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
};

const asPositiveNumber = (value: string | string[] | undefined): number | undefined => {
  const parsed = Number(asString(value));

  if (!Number.isFinite(parsed) || parsed < 1) {
    return undefined;
  }

  return Math.floor(parsed);
};

const asStatus = (value: string): '' | IntegrationStatus => {
  if (value === 'available' || value === 'beta' || value === 'planned') {
    return value;
  }

  return '';
};

const asSort = (value: string): IntegrationSort => {
  if (value === 'alphabetical' || value === 'latest') {
    return value;
  }

  return 'featured';
};

export default async function IntegrationsPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const q = asString(resolvedSearchParams.q).trim();
  const category = asString(resolvedSearchParams.category).trim();
  const protocol = asString(resolvedSearchParams.protocol).trim();
  const status = asStatus(asString(resolvedSearchParams.status).trim());
  const sort = asSort(asString(resolvedSearchParams.sort).trim());
  const page = asPositiveNumber(resolvedSearchParams.page);

  const [categories, protocols, result] = await Promise.all([
    getIntegrationCategories(),
    getIntegrationProtocols(),
    getIntegrations({ q, category, protocol, status: status || undefined, sort, page }),
  ]);

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <IntegrationsHero
        available={result.statusCounts.available}
        beta={result.statusCounts.beta}
        planned={result.statusCounts.planned}
      />

      <section className="section-hairline mt-10 py-10 md:mt-14 md:py-14">
        <div className="mardu-container">
          <Overline>Integrationskatalog</Overline>
          <h1 className="mt-2 text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Alle Integrationen
          </h1>

          <p className="mt-4 text-sm text-foreground/65">{result.total} Integrationen gefunden</p>

          <IntegrationsFilters
            query={q}
            category={category}
            protocol={protocol}
            status={status}
            sort={sort}
            categories={categories}
            protocols={protocols}
          />

          <div className="mt-8 md:mt-10">
            <IntegrationsGrid items={result.items} />
            <IntegrationsPagination
              page={result.page}
              totalPages={result.totalPages}
              q={q}
              category={category}
              protocol={protocol}
              status={status}
              sort={sort}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
