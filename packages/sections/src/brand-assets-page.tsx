import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mardu/ui/components/button';
import { Overline } from '@mardu/ui/components/typography';
import { cn } from '@mardu/ui/lib/utils';
import Faq from './faq';

export type BrandAssetDownloadDto = {
  id: string;
  fileName: string;
  href: string;
  previewSrc: string;
  previewAlt: string;
  previewSurface: 'light' | 'dark';
  downloadLabel: string;
  description: string;
};

export type BrandAssetUsageRuleDto = {
  question: string;
  answer: string;
};

export type BrandAssetsPageContentDto = {
  eyebrow: string;
  title: string;
  description: string;
  downloadsEyebrow: string;
  downloadsTitle: string;
  downloadsDescription: string;
  downloads: ReadonlyArray<BrandAssetDownloadDto>;
  usageEyebrow: string;
  usageTitle: string;
  usageDescription: string;
  usageRules: ReadonlyArray<BrandAssetUsageRuleDto>;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  contactCtaLabel: string;
  contactHref: string;
};

export type BrandAssetsPageProps = {
  content: BrandAssetsPageContentDto;
  className?: string;
};

export function BrandAssetsPage({ content, className }: BrandAssetsPageProps) {
  return (
    <main
      className={cn(
        'min-h-screen bg-background pb-10 pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] text-foreground',
        className,
      )}
    >
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>{content.eyebrow}</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            {content.title}
          </h1>
          <p className="text-base leading-relaxed text-foreground/72 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className="pt-12 md:pt-14">
          <div className="max-w-3xl space-y-3">
            <Overline>{content.downloadsEyebrow}</Overline>
            <h2 className="headline-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {content.downloadsTitle}
            </h2>
            <p className="text-base leading-relaxed text-foreground/72">
              {content.downloadsDescription}
            </p>
          </div>

          <div className="grid gap-8 pt-8 md:grid-cols-2 md:pt-10">
            {content.downloads.map((asset) => (
              <a key={asset.id} href={asset.href} download className="group space-y-4">
                <div
                  className={cn(
                    'border border-black/10 p-8',
                    asset.previewSurface === 'dark' ? 'bg-foreground' : 'bg-card',
                  )}
                >
                  <Image
                    src={asset.previewSrc}
                    alt={asset.previewAlt}
                    width={240}
                    height={120}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">{asset.fileName}</p>
                  <p className="text-sm leading-relaxed text-foreground/72">{asset.description}</p>
                  <p className="text-sm underline underline-offset-3 group-hover:text-foreground/72">
                    {asset.downloadLabel}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-12 md:pt-16">
          <div className="max-w-3xl space-y-3">
            <Overline>{content.usageEyebrow}</Overline>
            <h2 className="headline-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {content.usageTitle}
            </h2>
            <p className="text-base leading-relaxed text-foreground/72">
              {content.usageDescription}
            </p>
          </div>

          <Faq
            items={content.usageRules.map((rule) => ({
              question: rule.question,
              answer: <p>{rule.answer}</p>,
            }))}
            variant="lined"
            className="pt-8 md:pt-10"
          />
        </div>

        <div className="pt-12 md:pt-16">
          <div className="max-w-3xl rounded-3xl border border-border/70 bg-card p-6 md:p-8">
            <div className="space-y-3">
              <Overline>{content.contactEyebrow}</Overline>
              <h2 className="headline-balance text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
                {content.contactTitle}
              </h2>
              <p className="text-base leading-relaxed text-foreground/72">
                {content.contactDescription}
              </p>
            </div>

            <div className="pt-6">
              <Button asChild>
                <Link href={content.contactHref}>{content.contactCtaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const sharedBrandAssetCopy = {
  eyebrow: 'Brand',
  title: 'Markenressourcen',
  downloadsEyebrow: 'Downloads',
  downloadsTitle: 'Logo-Dateien',
  usageEyebrow: 'Nutzungsregeln',
  usageTitle: 'Hinweise zur Verwendung',
  usageDescription:
    'Ein paar kurze Hinweise helfen dabei, dass die Marke über alle Kanäle hinweg konsistent und gut wiedererkennbar bleibt.',
  usageRules: [
    {
      question: 'Welche Logo-Variante nutze ich auf hellem Hintergrund?',
      answer:
        'Für helle, weiße oder papierartige Hintergründe passt in der Regel die helle Variante am besten.',
    },
    {
      question: 'Welche Logo-Variante nutze ich auf dunklem Hintergrund?',
      answer:
        'Für dunkle oder schwarze Flächen passt in der Regel die dunkle Variante am besten.',
    },
    {
      question: 'Darf ich Farben, Proportionen oder Abstände verändern?',
      answer:
        'Am besten bleibt das Logo in Farbe, Form und Proportion unverändert. Ein wenig Freiraum um die Marke sorgt zusätzlich für ein sauberes Erscheinungsbild.',
    },
    {
      question: 'Welches Dateiformat sollte ich bevorzugen?',
      answer:
        'Wenn es technisch gut passt, ist SVG meist die beste Wahl. Das Format bleibt in Web, Präsentationen und Presseunterlagen sauber skalierbar und scharf.',
    },
  ],
  contactEyebrow: 'Freigabe',
  contactTitle: 'Fragen zur Nutzung oder zu Sonderformaten',
  contactDescription:
    'Wenn du die Marke in einem besonderen Kontext einsetzen möchtest oder zusätzliche Formate brauchst, gib uns einfach kurz Bescheid.',
  contactCtaLabel: 'Kontaktiere uns',
};

export const marduSpaceBrandAssetsPageContent: BrandAssetsPageContentDto = {
  ...sharedBrandAssetCopy,
  description:
    'Hier findest du die Logos von mardu.space für Presse, Partnerkommunikation und Marketingmaterialien.',
  downloadsDescription:
    'Hier liegen die freigegebenen Logo-Dateien von mardu.space. Beide Varianten sind als SVG angelegt und für unterschiedliche Hintergründe gedacht.',
  downloads: [
    {
      id: 'logo-light',
      fileName: 'marduspace_logo_bg_white.svg',
      href: '/marduspace_logo_bg_white.svg',
      previewSrc: '/marduspace_logo_bg_white.svg',
      previewAlt: 'mardu.space Logo für helle Hintergründe',
      previewSurface: 'light',
      downloadLabel: 'Logo für helle Hintergründe herunterladen',
      description:
        'Diese Variante passt am besten auf helle, weiße oder papierartige Flächen.',
    },
    {
      id: 'logo-dark',
      fileName: 'marduspace_logo_bg_black.svg',
      href: '/marduspace_logo_bg_black.svg',
      previewSrc: '/marduspace_logo_bg_black.svg',
      previewAlt: 'mardu.space Logo für dunkle Hintergründe',
      previewSurface: 'dark',
      downloadLabel: 'Logo für dunkle Hintergründe herunterladen',
      description:
        'Diese Variante funktioniert am besten auf dunklen oder schwarzen Flächen.',
    },
  ],
  contactHref: 'mailto:info@mardu.space?subject=Anfrage%20zu%20Brand%20Assets',
};

export const marduBrandAssetsPageContent: BrandAssetsPageContentDto = {
  ...sharedBrandAssetCopy,
  description:
    'Hier findest du die Logos von Mardu für Presse, Partnerkommunikation und Marketingmaterialien.',
  downloadsDescription:
    'Hier liegen die freigegebenen Logo-Dateien von Mardu. Beide Varianten sind als SVG angelegt und für unterschiedliche Hintergründe gedacht.',
  downloads: [
    {
      id: 'logo-light',
      fileName: 'Logo.svg',
      href: '/logos/Logo.svg',
      previewSrc: '/logos/Logo.svg',
      previewAlt: 'Mardu Logo für helle Hintergründe',
      previewSurface: 'light',
      downloadLabel: 'Logo für helle Hintergründe herunterladen',
      description:
        'Diese Variante passt am besten auf helle, weiße oder papierartige Flächen.',
    },
    {
      id: 'logo-dark',
      fileName: 'LogoWeiss.svg',
      href: '/logos/LogoWeiss.svg',
      previewSrc: '/logos/LogoWeiss.svg',
      previewAlt: 'Mardu Logo für dunkle Hintergründe',
      previewSurface: 'dark',
      downloadLabel: 'Logo für dunkle Hintergründe herunterladen',
      description:
        'Diese Variante funktioniert am besten auf dunklen oder schwarzen Flächen.',
    },
  ],
  contactHref: 'mailto:info@mardu.de?subject=Anfrage%20zu%20Brand%20Assets',
};
