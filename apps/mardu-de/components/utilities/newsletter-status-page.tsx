import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowLeft, CheckCircle2, MailWarning, XCircle } from 'lucide-react';
import { Overline } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

type NewsletterStatusVariant = 'confirm' | 'unsubscribe';
type NewsletterStatusState = 'success' | 'missing-token' | 'invalid-token' | 'error';

const STATUS_COPY: Record<
  NewsletterStatusVariant,
  Record<
    NewsletterStatusState,
    {
      overline: string;
      title: string;
      description: string;
      icon: ComponentType<{ className?: string }>;
      iconClassName: string;
    }
  >
> = {
  confirm: {
    success: {
      overline: 'Newsletter',
      title: 'Anmeldung erfolgreich bestätigt',
      description:
        'Vielen Dank. Ihre Newsletter-Anmeldung wurde bestätigt und in unserem System übernommen.',
      icon: CheckCircle2,
      iconClassName: 'text-emerald-600',
    },
    'missing-token': {
      overline: 'Newsletter',
      title: 'Bestätigungslink unvollständig',
      description:
        'Der Link enthält keinen Token. Öffnen Sie den vollständigen Link aus Ihrer E-Mail erneut.',
      icon: MailWarning,
      iconClassName: 'text-amber-600',
    },
    'invalid-token': {
      overline: 'Newsletter',
      title: 'Bestätigungslink ungültig',
      description:
        'Der Link ist ungültig oder abgelaufen. Fordern Sie bitte eine neue Newsletter-Anmeldung an.',
      icon: XCircle,
      iconClassName: 'text-destructive',
    },
    error: {
      overline: 'Newsletter',
      title: 'Bestätigung derzeit nicht möglich',
      description:
        'Die Verarbeitung konnte nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.',
      icon: XCircle,
      iconClassName: 'text-destructive',
    },
  },
  unsubscribe: {
    success: {
      overline: 'Newsletter',
      title: 'Abmeldung erfolgreich',
      description:
        'Sie wurden vom Newsletter abgemeldet. Sie erhalten künftig keine Newsletter-E-Mails mehr.',
      icon: CheckCircle2,
      iconClassName: 'text-emerald-600',
    },
    'missing-token': {
      overline: 'Newsletter',
      title: 'Abmeldelink unvollständig',
      description:
        'Der Link enthält keinen Token. Öffnen Sie den vollständigen Link aus Ihrer E-Mail erneut.',
      icon: MailWarning,
      iconClassName: 'text-amber-600',
    },
    'invalid-token': {
      overline: 'Newsletter',
      title: 'Abmeldelink ungültig',
      description:
        'Der Link ist ungültig oder abgelaufen. Falls nötig, melden Sie sich erneut über den Newsletter ab.',
      icon: XCircle,
      iconClassName: 'text-destructive',
    },
    error: {
      overline: 'Newsletter',
      title: 'Abmeldung derzeit nicht möglich',
      description:
        'Die Verarbeitung konnte nicht abgeschlossen werden. Bitte versuchen Sie es später erneut.',
      icon: XCircle,
      iconClassName: 'text-destructive',
    },
  },
};

function normalizeStatus(status: string | string[] | undefined): NewsletterStatusState {
  const value = Array.isArray(status) ? status[0] : status;
  if (
    value === 'success' ||
    value === 'missing-token' ||
    value === 'invalid-token' ||
    value === 'error'
  ) {
    return value;
  }
  return 'error';
}

type NewsletterStatusPageProps = {
  variant: NewsletterStatusVariant;
  searchParams?: Record<string, string | string[] | undefined>;
};

export function NewsletterStatusPage({ variant, searchParams }: NewsletterStatusPageProps) {
  const status = normalizeStatus(searchParams?.status);
  const content = STATUS_COPY[variant][status];
  const Icon = content.icon;

  return (
    <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container flex min-h-[calc(100vh-var(--app-header-height,64px)-env(safe-area-inset-top))] items-center py-8 md:py-10">
        <div className="mx-auto max-w-3xl border border-border/70 bg-card p-6 shadow-sm md:p-10">
          <div className="mb-6 inline-flex h-14 w-14 rounded-2xl items-center justify-center bg-muted">
            <Icon className={`h-7 w-7 ${content.iconClassName}`} />
          </div>

          <div className="space-y-4">
            <Overline>{content.overline}</Overline>
            <h1 className="headline-balance text-[clamp(1.9rem,4vw,3.1rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {content.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
              {content.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/">Zur Startseite</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#contact" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Zurück zum Newsletter
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
