import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import { Overline } from "@mardu/ui/components/typography";
import { cn } from "@mardu/ui/lib/utils";

export type EditorialStatusAction = {
  href: string;
  label: string;
  icon?: ReactNode;
  download?: boolean;
  external?: boolean;
};

export type EditorialStatusPageProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  iconClassName?: string;
  details?: ReactNode;
  primaryAction: EditorialStatusAction;
  secondaryAction?: EditorialStatusAction;
  className?: string;
};

function StatusAction({
  action,
  variant,
}: {
  action: EditorialStatusAction;
  variant: "primary" | "secondary";
}) {
  if (action.download || action.external) {
    return (
      <EditorialActionButton
        render={
          <a
            href={action.href}
            download={action.download || undefined}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
          />
        }
        priority={variant}
        icon={action.icon}
      >
        {action.label}
      </EditorialActionButton>
    );
  }

  return (
    <EditorialActionButton
      render={<Link href={action.href} />}
      priority={variant}
      icon={action.icon}
    >
      {action.label}
    </EditorialActionButton>
  );
}

/**
 * Shared full-page result pattern for confirmations, errors and completed flows.
 * The consuming app owns the copy, icon and destinations; this component owns
 * the page landmark, hierarchy, spacing and action treatment.
 */
export function EditorialStatusPage({
  eyebrow,
  title,
  description,
  icon,
  iconClassName,
  details,
  primaryAction,
  secondaryAction,
  className,
}: EditorialStatusPageProps) {
  return (
    <main className={cn("min-h-screen bg-background", className)}>
      <section className="mardu-container flex min-h-[calc(100svh-4rem)] items-center py-12 md:min-h-[calc(100svh-5rem)] md:py-16">
        <div className="mx-auto w-full max-w-3xl border-y border-border py-10 md:py-14">
          <div
            className={cn(
              "mb-7 inline-flex size-14 items-center justify-center rounded-full bg-muted text-foreground",
              iconClassName,
            )}
            aria-hidden="true"
          >
            {icon}
          </div>

          <div className="space-y-4">
            <Overline variant="editorial">{eyebrow}</Overline>
            <h1 className="headline-balance max-w-[18ch] text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[0.96] tracking-[-0.04em] text-foreground">
              {title}
            </h1>
            <div className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {typeof description === "string" ? (
                <p>{description}</p>
              ) : (
                description
              )}
            </div>
          </div>

          {details ? <div className="mt-8">{details}</div> : null}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <StatusAction action={primaryAction} variant="primary" />
            {secondaryAction ? (
              <StatusAction action={secondaryAction} variant="secondary" />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
