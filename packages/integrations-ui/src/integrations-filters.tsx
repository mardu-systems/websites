import type {
  IntegrationCategoryDto,
  IntegrationProtocolDto,
  IntegrationStatus,
} from "@mardu/content-core";
import { Badge } from "@mardu/ui/components/badge";
import { Button } from "@mardu/ui/components/button";
import { Input } from "@mardu/ui/components/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@mardu/ui/components/native-select";
import Link from "next/link";

const STATUS_ITEMS: Array<{ label: string; value: "" | IntegrationStatus }> = [
  { label: "Alle", value: "" },
  { label: "Available", value: "available" },
  { label: "Beta", value: "beta" },
  { label: "Planned", value: "planned" },
];

export interface IntegrationsFiltersProps {
  query: string;
  category: string;
  protocol: string;
  status: "" | IntegrationStatus;
  sort: string;
  categories: IntegrationCategoryDto[];
  protocols: IntegrationProtocolDto[];
  action?: string;
  basePath?: string;
  buildHref?: (params: {
    q?: string;
    category?: string;
    protocol?: string;
    status?: string;
    sort?: string;
    page?: string;
  }) => string;
}

const defaultHref = (
  basePath: string,
  params: {
    q?: string;
    category?: string;
    protocol?: string;
    status?: string;
    sort?: string;
    page?: string;
  },
) => {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set("q", params.q);
  if (params.category) searchParams.set("category", params.category);
  if (params.protocol) searchParams.set("protocol", params.protocol);
  if (params.status) searchParams.set("status", params.status);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.page) searchParams.set("page", params.page);

  const qs = searchParams.toString();
  return qs.length > 0 ? `${basePath}?${qs}` : basePath;
};

export function IntegrationsFilters({
  query,
  category,
  protocol,
  status,
  sort,
  categories,
  protocols,
  action = "/integrations",
  basePath = "/integrations",
  buildHref,
}: IntegrationsFiltersProps) {
  const toHref = (params: {
    q?: string;
    category?: string;
    protocol?: string;
    status?: string;
    sort?: string;
    page?: string;
  }) => buildHref?.(params) ?? defaultHref(basePath, params);

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden h-fit border border-border bg-card p-4 lg:block">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">
            Kategorien
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              render={
                <Link href={toHref({ q: query, protocol, status, sort })} />
              }
              variant={category ? "outline" : "default"}
            >
              Alle
            </Badge>
            {categories.map((item) => (
              <Badge
                key={item.id}
                render={
                  <Link
                    href={toHref({
                      q: query,
                      category: item.slug,
                      protocol,
                      status,
                      sort,
                    })}
                  />
                }
                variant={category === item.slug ? "default" : "outline"}
              >
                {item.title}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">
            Protokolle
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              render={
                <Link href={toHref({ q: query, category, status, sort })} />
              }
              variant={protocol ? "outline" : "default"}
            >
              Alle
            </Badge>
            {protocols.map((item) => (
              <Badge
                key={item.id}
                render={
                  <Link
                    href={toHref({
                      q: query,
                      category,
                      protocol: item.slug,
                      status,
                      sort,
                    })}
                  />
                }
                variant={protocol === item.slug ? "default" : "outline"}
              >
                {item.title}
              </Badge>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <form
          action={action}
          className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_190px]"
        >
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="protocol" value={protocol} />
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="sort" value={sort} />
          <Input
            type="search"
            name="q"
            placeholder="Integrationen durchsuchen"
            defaultValue={query}
            className="h-12"
          />
          <NativeSelect name="sort" defaultValue={sort} className="h-12 w-full">
            <NativeSelectOption value="featured">Empfohlen</NativeSelectOption>
            <NativeSelectOption value="alphabetical">
              Alphabetisch
            </NativeSelectOption>
            <NativeSelectOption value="latest">Neueste</NativeSelectOption>
          </NativeSelect>
          <Button type="submit" size="lg" className="h-12">
            Filtern
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_ITEMS.map((item) => (
            <Badge
              key={item.label}
              render={
                <Link
                  href={toHref({
                    q: query,
                    category,
                    protocol,
                    status: item.value,
                    sort,
                  })}
                />
              }
              variant={status === item.value ? "default" : "outline"}
            >
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
