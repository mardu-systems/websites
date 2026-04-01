import type { IntegrationListItemDto } from "@mardu/content-core";
import Image from "next/image";
import Link from "next/link";
import { IntegrationProtocolBadges } from "./integration-protocol-badges";
import { IntegrationStatusBadge } from "./integration-status-badge";

export interface IntegrationCardProps {
  item: IntegrationListItemDto;
  href?: string;
  hrefBase?: string;
  buildHref?: (item: IntegrationListItemDto) => string;
}

export function IntegrationCard({
  item,
  href,
  hrefBase = "/integrations",
  buildHref,
}: IntegrationCardProps) {
  const itemHref = href ?? buildHref?.(item) ?? `${hrefBase}/${item.slug}`;

  return (
    <article className="group border border-black/12 bg-white/45 p-4 transition-colors hover:bg-white/65">
      <Link href={itemHref} className="block">
        <div className="flex items-start gap-3">
          {item.logoUrl ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white">
              <Image
                src={item.logoUrl}
                alt={item.logoAlt || item.title}
                fill
                className="object-contain p-2"
                sizes="56px"
              />
            </div>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white text-sm font-medium text-foreground/55">
              {item.title.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl leading-[1.06] tracking-[-0.02em] text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-foreground/75">
              {item.shortDescription}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <IntegrationStatusBadge status={item.status} />
          {item.vendor ? (
            <span className="text-xs text-foreground/55">{item.vendor}</span>
          ) : null}
        </div>

        <div className="mt-3">
          <IntegrationProtocolBadges protocols={item.protocols} compact />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.categories.map((category) => (
            <span
              key={category.id}
              className="inline-flex border border-black/20 px-1.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-foreground/62"
            >
              {category.title}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm font-medium text-foreground/80 underline decoration-black/25 underline-offset-4 group-hover:decoration-black/50">
          Mehr erfahren
        </p>
      </Link>
    </article>
  );
}
