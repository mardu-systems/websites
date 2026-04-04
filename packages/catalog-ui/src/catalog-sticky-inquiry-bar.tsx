import Link from 'next/link';
import { Button } from '@mardu/ui/components/button';

export interface CatalogStickyInquiryBarProps {
  title: string;
  priceFromLabel?: string;
  inquiryHref: string;
  inquiryLabel?: string;
  configuratorHref?: string;
  configuratorLabel?: string;
}

export function CatalogStickyInquiryBar({
  title,
  priceFromLabel,
  inquiryHref,
  inquiryLabel = 'Angebot anfragen',
  configuratorHref,
  configuratorLabel = 'Konfigurator',
}: CatalogStickyInquiryBarProps) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-black/10 bg-background/95 backdrop-blur">
      <div className="mardu-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground md:text-base">{title}</p>
          <p className="text-sm text-foreground/58">
            {priceFromLabel ? `Richtpreis ab ${priceFromLabel}` : 'Preis auf Anfrage'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={inquiryHref}>{inquiryLabel}</Link>
          </Button>
          {configuratorHref ? (
            <Button asChild variant="outline">
              <Link href={configuratorHref}>{configuratorLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
