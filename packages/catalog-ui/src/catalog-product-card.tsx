import Image from 'next/image';
import Link from 'next/link';
import type { CatalogProductListItemDto } from '@mardu/content-core';
import { Badge } from '@mardu/ui/components/badge';
import { Button } from '@mardu/ui/components/button';

export interface CatalogProductCardProps {
  product: CatalogProductListItemDto;
  href: string;
}

export function CatalogProductCard({ product, href }: CatalogProductCardProps) {
  return (
    <article className="flex h-full flex-col border border-black/10 bg-card">
      <Link href={href} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-black/8 bg-background">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-5xl font-semibold tracking-[-0.04em] text-foreground/22">
              {product.name.slice(0, 2)}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{product.categoryName}</Badge>
          <Badge variant="secondary">{product.availabilityLabel}</Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
            <Link href={href} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm font-medium text-foreground/82 md:text-base">{product.tagline}</p>
          <p className="text-sm leading-relaxed text-foreground/72 md:text-base">
            {product.summary}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.technologies.slice(0, 3).map((technology) => (
              <span
                key={technology.id}
                className="inline-flex border border-black/8 bg-background px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-foreground/54"
              >
                {technology.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-black/8 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">Ab</p>
              <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                {product.priceFromLabel || 'Auf Anfrage'}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={href}>Details ansehen</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
