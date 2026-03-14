import type { IntegrationCategoryDto, IntegrationProtocolDto, IntegrationStatus } from '@/types/api/integrations';
import Link from 'next/link';

const STATUS_ITEMS: Array<{ label: string; value: '' | IntegrationStatus }> = [
  { label: 'Alle', value: '' },
  { label: 'Available', value: 'available' },
  { label: 'Beta', value: 'beta' },
  { label: 'Planned', value: 'planned' },
];

type FiltersProps = {
  query: string;
  category: string;
  protocol: string;
  status: '' | IntegrationStatus;
  sort: string;
  categories: IntegrationCategoryDto[];
  protocols: IntegrationProtocolDto[];
};

const toHref = (params: {
  q?: string;
  category?: string;
  protocol?: string;
  status?: string;
  sort?: string;
  page?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set('q', params.q);
  if (params.category) searchParams.set('category', params.category);
  if (params.protocol) searchParams.set('protocol', params.protocol);
  if (params.status) searchParams.set('status', params.status);
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.page) searchParams.set('page', params.page);

  const qs = searchParams.toString();
  return qs.length > 0 ? `/integrations?${qs}` : '/integrations';
};

export function IntegrationsFilters({
  query,
  category,
  protocol,
  status,
  sort,
  categories,
  protocols,
}: FiltersProps) {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden h-fit border border-black/10 bg-white/45 p-4 lg:block">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">Kategorien</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={toHref({ q: query, protocol, status, sort })}
              className={`border px-2 py-1 text-xs ${category ? 'border-black/20 text-foreground/65' : 'border-black/45 text-foreground'}`}
            >
              Alle
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={toHref({ q: query, category: item.slug, protocol, status, sort })}
                className={`border px-2 py-1 text-xs ${category === item.slug ? 'border-black/45 text-foreground' : 'border-black/20 text-foreground/65'}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">Protokolle</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={toHref({ q: query, category, status, sort })}
              className={`border px-2 py-1 text-xs ${protocol ? 'border-black/20 text-foreground/65' : 'border-black/45 text-foreground'}`}
            >
              Alle
            </Link>
            {protocols.map((item) => (
              <Link
                key={item.id}
                href={toHref({ q: query, category, protocol: item.slug, status, sort })}
                className={`border px-2 py-1 text-xs ${protocol === item.slug ? 'border-black/45 text-foreground' : 'border-black/20 text-foreground/65'}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <form action="/integrations" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_190px]">
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="protocol" value={protocol} />
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="sort" value={sort} />
          <input
            type="search"
            name="q"
            placeholder="Integrationen durchsuchen"
            defaultValue={query}
            className="h-12 border border-black/15 bg-white/70 px-4 text-sm"
          />
          <select name="sort" defaultValue={sort} className="h-12 border border-black/15 bg-white/70 px-3 text-sm">
            <option value="featured">Empfohlen</option>
            <option value="alphabetical">Alphabetisch</option>
            <option value="latest">Neueste</option>
          </select>
          <button type="submit" className="h-12 border border-black/20 bg-foreground px-4 text-sm text-background">
            Filtern
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={toHref({
                q: query,
                category,
                protocol,
                status: item.value,
                sort,
              })}
              className={`border px-3 py-1.5 text-xs uppercase tracking-[0.12em] ${status === item.value ? 'border-black/45 bg-white/80 text-foreground' : 'border-black/20 text-foreground/65'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
