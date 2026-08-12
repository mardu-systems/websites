import type { ComponentType } from "react";
import { ArrowLeft, CheckCircle2, MailWarning, XCircle } from "lucide-react";
import { EditorialStatusPage } from "./editorial-status-page";

type NewsletterStatusVariant = "confirm" | "unsubscribe";
type NewsletterStatusState =
  "success" | "missing-token" | "invalid-token" | "error";

type NewsletterStatusCopy = {
  overline: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
};

const STATUS_COPY: Record<
  NewsletterStatusVariant,
  Record<NewsletterStatusState, NewsletterStatusCopy>
> = {
  confirm: {
    success: {
      overline: "Newsletter",
      title: "Anmeldung erfolgreich bestätigt",
      description:
        "Vielen Dank. Deine Newsletter-Anmeldung wurde bestätigt und in unserem System übernommen.",
      icon: CheckCircle2,
      iconClassName: "text-emerald-600",
    },
    "missing-token": {
      overline: "Newsletter",
      title: "Bestätigungslink unvollständig",
      description:
        "Der Link enthält keinen Token. Öffne den vollständigen Link aus deiner E-Mail erneut.",
      icon: MailWarning,
      iconClassName: "text-amber-600",
    },
    "invalid-token": {
      overline: "Newsletter",
      title: "Bestätigungslink ungültig",
      description:
        "Der Link ist ungültig oder abgelaufen. Fordere bitte eine neue Newsletter-Anmeldung an.",
      icon: XCircle,
      iconClassName: "text-destructive",
    },
    error: {
      overline: "Newsletter",
      title: "Bestätigung derzeit nicht möglich",
      description:
        "Die Verarbeitung konnte nicht abgeschlossen werden. Bitte versuche es später erneut.",
      icon: XCircle,
      iconClassName: "text-destructive",
    },
  },
  unsubscribe: {
    success: {
      overline: "Newsletter",
      title: "Abmeldung erfolgreich",
      description:
        "Du wurdest vom Newsletter abgemeldet. Du erhältst künftig keine Newsletter-E-Mails mehr.",
      icon: CheckCircle2,
      iconClassName: "text-emerald-600",
    },
    "missing-token": {
      overline: "Newsletter",
      title: "Abmeldelink unvollständig",
      description:
        "Der Link enthält keinen Token. Öffne den vollständigen Link aus deiner E-Mail erneut.",
      icon: MailWarning,
      iconClassName: "text-amber-600",
    },
    "invalid-token": {
      overline: "Newsletter",
      title: "Abmeldelink ungültig",
      description:
        "Der Link ist ungültig oder abgelaufen. Falls nötig, melde dich erneut über den Newsletter ab.",
      icon: XCircle,
      iconClassName: "text-destructive",
    },
    error: {
      overline: "Newsletter",
      title: "Abmeldung derzeit nicht möglich",
      description:
        "Die Verarbeitung konnte nicht abgeschlossen werden. Bitte versuche es später erneut.",
      icon: XCircle,
      iconClassName: "text-destructive",
    },
  },
};

function normalizeStatus(
  status: string | string[] | undefined,
): NewsletterStatusState {
  const value = Array.isArray(status) ? status[0] : status;
  if (
    value === "success" ||
    value === "missing-token" ||
    value === "invalid-token" ||
    value === "error"
  ) {
    return value;
  }
  return "error";
}

export type NewsletterStatusPageProps = {
  variant: NewsletterStatusVariant;
  searchParams?: Record<string, string | string[] | undefined>;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function NewsletterStatusPage({
  variant,
  searchParams,
  primaryHref = "/",
  primaryLabel = "Zur Startseite",
  secondaryHref = "/#contact",
  secondaryLabel = "Zurück zum Newsletter",
}: NewsletterStatusPageProps) {
  const status = normalizeStatus(searchParams?.status);
  const content = STATUS_COPY[variant][status];
  const Icon = content.icon;

  return (
    <EditorialStatusPage
      eyebrow={content.overline}
      title={content.title}
      description={content.description}
      icon={<Icon className="size-7" />}
      iconClassName={content.iconClassName}
      primaryAction={{ href: primaryHref, label: primaryLabel }}
      secondaryAction={{
        href: secondaryHref,
        label: secondaryLabel,
        icon: <ArrowLeft className="size-4" aria-hidden="true" />,
      }}
    />
  );
}
