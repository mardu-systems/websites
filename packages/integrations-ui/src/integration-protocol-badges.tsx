import type { IntegrationProtocolDto } from "@mardu/content-core";
import { Badge } from "@mardu/ui/components/badge";

const BADGE_VARIANTS = {
  neutral: "outline",
  success: "default",
  warn: "destructive",
  info: "secondary",
} as const satisfies Record<
  IntegrationProtocolDto["badgeStyle"],
  "default" | "secondary" | "destructive" | "outline"
>;

export interface IntegrationProtocolBadgesProps {
  protocols: IntegrationProtocolDto[];
  compact?: boolean;
}

export function IntegrationProtocolBadges({
  protocols,
  compact,
}: IntegrationProtocolBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {protocols.map((protocol) => (
        <Badge
          key={protocol.id}
          variant={BADGE_VARIANTS[protocol.badgeStyle]}
          className={compact ? "px-1.5" : undefined}
        >
          {protocol.title}
        </Badge>
      ))}
    </div>
  );
}
