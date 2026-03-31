import type { IntegrationStatus } from '@mardu/content-core';

const STATUS_LABELS: Record<IntegrationStatus, string> = {
  available: 'Available',
  beta: 'Beta',
  planned: 'Planned',
};

const STATUS_CLASSNAMES: Record<IntegrationStatus, string> = {
  available: 'border-emerald-600/40 bg-emerald-500/8 text-emerald-700',
  beta: 'border-amber-600/40 bg-amber-500/8 text-amber-700',
  planned: 'border-slate-500/40 bg-slate-500/8 text-slate-700',
};

export function IntegrationStatusBadge({ status }: { status: IntegrationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${STATUS_CLASSNAMES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
