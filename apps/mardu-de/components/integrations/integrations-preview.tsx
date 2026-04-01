import { IntegrationCard } from '@mardu/integrations-ui';
import { isIntegrationsEnabled } from '@mardu/site-config';
import { Overline } from '@mardu/ui/components/typography';
import { getFeaturedIntegrations } from '@/lib/integrations';
import Link from 'next/link';

export async function IntegrationsPreview() {
  if (!isIntegrationsEnabled('mardu-de')) {
    return null;
  }

  const items = await getFeaturedIntegrations(6);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-hairline py-12 md:py-16" id="integrationen">
      <div className="mardu-container">
        <Overline>Integrationen</Overline>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(2rem,4.2vw,3.8rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Beliebte Integrationen
          </h2>
          <Link href="/integrations" className="text-sm underline underline-offset-4">
            Alle Integrationen ansehen
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <IntegrationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
