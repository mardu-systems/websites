import Image from "next/image";
import type { CatalogTechnologyDto } from "@mardu/content-core";
import { CatalogSectionHeader } from "./catalog-section-header";

export interface CatalogTechnologyGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CatalogTechnologyDto[];
}

export function CatalogTechnologyGrid({
  eyebrow,
  title,
  description,
  items,
}: CatalogTechnologyGridProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-hairline">
      <div className="mardu-container py-16 md:py-24">
        <CatalogSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-black/10 bg-card p-6"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-border bg-card p-6">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-5"
                  />
                ) : (
                  <div className="text-4xl font-semibold tracking-[-0.04em] text-foreground/28">
                    {item.visualLabel || item.name.slice(0, 3)}
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-2">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/72 md:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
