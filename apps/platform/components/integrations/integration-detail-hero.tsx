import { IntegrationProtocolBadges } from '@/components/integrations/integration-protocol-badges';
import { IntegrationStatusBadge } from '@/components/integrations/integration-status-badge';
import type { IntegrationDetailDto } from '@/types/api/integrations';
import Image from 'next/image';

export function IntegrationDetailHero({ integration }: { integration: IntegrationDetailDto }) {
  return (
    <header className="relative overflow-hidden border border-black/8 bg-gradient-to-r from-white via-white to-[color:var(--paper)] p-6 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-center">
        <div>
          <h1 className="headline-balance font-serif text-[clamp(2.2rem,4.5vw,5rem)] leading-[0.94] tracking-[-0.03em] text-foreground">
            {integration.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/75">
            {integration.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <IntegrationStatusBadge status={integration.status} />
            {integration.vendor ? <span className="text-sm text-foreground/60">{integration.vendor}</span> : null}
          </div>
          <div className="mt-4">
            <IntegrationProtocolBadges protocols={integration.protocols} />
          </div>
        </div>

        {integration.heroImageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden border border-black/10 bg-white/70">
            <Image
              src={integration.heroImageUrl}
              alt={integration.heroImageAlt || integration.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 280px"
            />
          </div>
        ) : integration.logoUrl ? (
          <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-md border border-black/10 bg-white p-4">
            <Image
              src={integration.logoUrl}
              alt={integration.logoAlt || integration.title}
              fill
              className="object-contain p-5"
              sizes="160px"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
