import { HeroHeadline } from '@mardu/ui/components/typography';

export function IntegrationsHero({
  available,
  beta,
  planned,
}: {
  available: number;
  beta: number;
  planned: number;
}) {
  return (
    <section className="section-hairline pt-10 md:pt-16">
      <div className="mardu-container grid gap-6 md:grid-cols-[1fr_360px] md:items-end">
        <div>
          <HeroHeadline
            prefix="Mardu"
            emphasis="Integrationen"
            suffix="für offene Systeme"
            className="text-[clamp(2rem,4vw,4.1rem)]"
          />
          <p className="mt-4 max-w-3xl text-lg text-foreground/75">
            Verbinde Zutritt, Maschinen, Identitäten und Prozesse mit Standards wie LDAP, OIDC,
            MQTT, ModBus, MCP sowie Plattformen wie n8n, Node-RED, Stripe und EasyVerein.
          </p>
        </div>
        <div className="border border-black/10 bg-white/55 p-4 text-sm text-foreground/70">
          <p>
            <strong>{available}</strong> verfügbar · <strong>{beta}</strong> in Beta ·{' '}
            <strong>{planned}</strong> geplant
          </p>
        </div>
      </div>
    </section>
  );
}
