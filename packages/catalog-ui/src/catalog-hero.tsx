import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@mardu/ui/components/button";
import { EditorialPageHero } from "@mardu/ui/components/editorial-page-hero";

export interface CatalogHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function CatalogHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: CatalogHeroProps) {
  return (
    <EditorialPageHero
      eyebrow={`[${(eyebrow ?? "Produkte").toUpperCase()}]`}
      title={title}
      description={description}
      actions={
        primaryCta || secondaryCta ? (
          <>
            {primaryCta ? (
              <Button render={<Link href={primaryCta.href} />} size="lg">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                render={<Link href={secondaryCta.href} />}
                variant="outline"
                size="lg"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </>
        ) : null
      }
    />
  );
}
