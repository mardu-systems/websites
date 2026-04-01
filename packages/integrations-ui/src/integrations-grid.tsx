import type { IntegrationListItemDto } from "@mardu/content-core";
import { IntegrationCard } from "./integration-card";

export interface IntegrationsGridProps {
  items: IntegrationListItemDto[];
  emptyState?: React.ReactNode;
  hrefBase?: string;
  buildHref?: (item: IntegrationListItemDto) => string;
}

export function IntegrationsGrid({
  items,
  emptyState,
  hrefBase,
  buildHref,
}: IntegrationsGridProps) {
  if (items.length === 0) {
    return (
      <div className="border border-dashed border-black/20 bg-white/35 p-8 text-center text-foreground/70">
        {emptyState ?? "Keine Integrationen für diese Filter gefunden."}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <IntegrationCard
          key={item.id}
          item={item}
          hrefBase={hrefBase}
          buildHref={buildHref}
        />
      ))}
    </div>
  );
}
