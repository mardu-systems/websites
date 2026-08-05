export interface IntegrationsHeroProps {
  available: number;
  beta: number;
  planned: number;
  title?: React.ReactNode;
  intro?: React.ReactNode;
}

export function IntegrationsHero({
  available,
  beta,
  planned,
  title,
  intro,
}: IntegrationsHeroProps) {
  return (
    <section className="section-hairline pt-10 md:pt-16">
      <div className="mardu-container grid gap-6 md:grid-cols-[1fr_360px] md:items-end">
        <div>
          {title}
          {intro ? (
            <div className="mt-4 max-w-3xl text-lg text-foreground/75">
              {intro}
            </div>
          ) : null}
        </div>
        <div className="border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p>
            <strong>{available}</strong> verfügbar · <strong>{beta}</strong> in
            Beta · <strong>{planned}</strong> geplant
          </p>
        </div>
      </div>
    </section>
  );
}
