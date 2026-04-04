import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface CatalogBreadcrumbItem {
  label: string;
  href?: string;
}

export interface CatalogBreadcrumbsProps {
  items: CatalogBreadcrumbItem[];
  className?: string;
}

export function CatalogBreadcrumbs({ items, className }: CatalogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-foreground/58">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/72">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
