import { IntegrationStatusBadge } from '@/components/integrations/integration-status-badge';
import type { IntegrationDetailDto } from '@/types/api/integrations';

export function IntegrationDetailSidebar({ integration }: { integration: IntegrationDetailDto }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <div className="border border-black/10 bg-white/65 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Status</p>
        <div className="mt-3">
          <IntegrationStatusBadge status={integration.status} />
        </div>

        {integration.comingAt ? (
          <p className="mt-3 text-sm text-foreground/65">
            Geplant ab{' '}
            {new Date(integration.comingAt).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        ) : null}
      </div>

      <div className="border border-black/10 bg-white/65 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Kategorien</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {integration.categories.map((category) => (
            <span
              key={category.id}
              className="border border-black/20 px-2 py-1 text-xs uppercase tracking-[0.12em] text-foreground/70"
            >
              {category.title}
            </span>
          ))}
        </div>
      </div>

      {integration.compatibilityNotes ? (
        <div className="border border-black/10 bg-white/65 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Kompatibilität</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/72">{integration.compatibilityNotes}</p>
        </div>
      ) : null}
    </aside>
  );
}
