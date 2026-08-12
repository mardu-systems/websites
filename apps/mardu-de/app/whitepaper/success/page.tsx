import { ArrowLeft, CheckCircle2, Download, FileText, MailWarning } from 'lucide-react';
import { EditorialStatusPage } from '@mardu/sections';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Whitepaper Download',
  description: 'Status des persönlichen Mardu-Whitepaper-Downloads.',
  path: '/whitepaper/success',
  index: false,
});

export default async function WhitepaperSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <EditorialStatusPage
        eyebrow="Whitepaper"
        title="Download-Link unvollständig"
        description="Der Link enthält keinen Download-Token. Öffne bitte den vollständigen Link aus deiner E-Mail erneut."
        icon={<MailWarning className="size-7" />}
        iconClassName="text-amber-600"
        primaryAction={{ href: '/whitepaper', label: 'Whitepaper erneut anfordern' }}
        secondaryAction={{
          href: '/',
          label: 'Zur Startseite',
          icon: <ArrowLeft className="size-4" aria-hidden="true" />,
        }}
      />
    );
  }

  const downloadUrl = `/api/whitepaper/download?token=${encodeURIComponent(token)}`;

  return (
    <EditorialStatusPage
      eyebrow="Whitepaper"
      title="Dein Whitepaper ist bereit."
      description="Deine E-Mail-Adresse wurde bestätigt. Du kannst den Praxisleitfaden jetzt herunterladen."
      icon={<CheckCircle2 className="size-7" />}
      iconClassName="text-emerald-600"
      details={
        <div className="flex max-w-xl items-start gap-4 border-y border-border py-5">
          <FileText className="mt-0.5 size-5 shrink-0 text-mardu-purple" aria-hidden="true" />
          <div>
            <h2 className="font-medium text-foreground">Whitepaper 2026</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Digitale Zutritts- und Maschinenfreigabe. Der Download-Link wurde dir zusätzlich per
              E-Mail zugesendet.
            </p>
          </div>
        </div>
      }
      primaryAction={{
        href: downloadUrl,
        label: 'Jetzt herunterladen',
        icon: <Download className="size-4" aria-hidden="true" />,
        download: true,
      }}
      secondaryAction={{
        href: '/',
        label: 'Zur Startseite',
        icon: <ArrowLeft className="size-4" aria-hidden="true" />,
      }}
    />
  );
}
