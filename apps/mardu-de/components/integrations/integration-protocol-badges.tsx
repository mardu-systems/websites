import type { IntegrationProtocolDto } from '@/types/api/integrations';

const STYLE_CLASSES: Record<IntegrationProtocolDto['badgeStyle'], string> = {
  neutral: 'border-black/20 text-foreground/70',
  success: 'border-emerald-600/45 text-emerald-700',
  warn: 'border-amber-600/45 text-amber-700',
  info: 'border-sky-600/45 text-sky-700',
};

export function IntegrationProtocolBadges({
  protocols,
  compact,
}: {
  protocols: IntegrationProtocolDto[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {protocols.map((protocol) => (
        <span
          key={protocol.id}
          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] ${STYLE_CLASSES[protocol.badgeStyle]} ${compact ? '' : 'bg-white/50'}`}
        >
          {protocol.title}
        </span>
      ))}
    </div>
  );
}
