import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { Overline } from "@mardu/ui/components/typography";
import { cn } from "@mardu/ui/lib/utils";
import EditorialFaqSection from "./editorial-faq-section";
import Faq from "./faq";

export type BrandAssetDownloadDto = {
  id: string;
  fileName: string;
  href: string;
  previewSrc: string;
  previewAlt: string;
  previewSurface: "light" | "dark";
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
  /**
   * Visual presentation of the resource page. `editorial-index` follows the numbered,
   * high-contrast Mardu marketing layout while `default` preserves the compact docs layout.
   */
  variant?: "default" | "editorial-index";
};

function EditorialBrandAssetsPage({
  content,
  className,
}: BrandAssetsPageProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] text-foreground",
        className,
      )}
    >
      <section className="border-b border-border py-16 md:py-24 xl:py-32">
        <div className="mardu-container grid gap-12 xl:grid-cols-[0.62fr_0.38fr] xl:items-end xl:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mardu-purple">
              [01] {content.eyebrow}
            </p>
            <h1 className="mt-7 max-w-[15ch] text-[clamp(3rem,5vw,3.75rem)] font-light leading-[0.94] tracking-[-0.04em]">
              Markenressourcen von der{" "}
              <em className="font-serif font-normal italic tracking-[-0.025em] text-mardu-purple">
                Mardu GmbH.
              </em>
            </h1>
          </div>
          <p className="max-w-[38rem] text-base leading-relaxed text-muted-foreground xl:pb-2">
            {content.description}
          </p>
        </div>
      </section>

      <section
        className="bg-[#111111] py-16 text-white md:py-24"
        aria-labelledby="brand-downloads"
      >
        <div className="mardu-container">
          <div className="grid gap-8 border-b border-white/18 pb-10 md:grid-cols-[0.28fr_0.72fr] md:pb-14">
            <p className="text-xs uppercase tracking-[0.18em] text-white/58">
              [02] {content.downloadsEyebrow}
            </p>
            <div className="max-w-3xl">
              <h2
                id="brand-downloads"
                className="text-[clamp(2.2rem,4.6vw,4.5rem)] font-light leading-[0.96] tracking-[-0.035em]"
              >
                Logo-Dateien für{" "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-white/88">
                  helle und dunkle Flächen.
                </em>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/62">
                {content.downloadsDescription}
              </p>
            </div>
          </div>

          <div className="grid border-b border-white/18 lg:grid-cols-2">
            {content.downloads.map((asset, index) => (
              <a
                key={asset.id}
                href={asset.href}
                download
                className="group flex min-w-0 flex-col border-white/18 py-8 first:border-b lg:min-h-[31rem] lg:border-r lg:px-10 lg:first:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-white/55">
                  <span>
                    [0{index + 1}] {asset.fileName}
                  </span>
                  <Download
                    className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "mt-8 flex min-h-56 flex-1 items-center border border-white/16 p-7 md:p-10",
                    asset.previewSurface === "dark"
                      ? "bg-[#181821]"
                      : "bg-[#f4f4f4]",
                  )}
                >
                  <Image
                    src={asset.previewSrc}
                    alt={asset.previewAlt}
                    width={720}
                    height={320}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-[36rem] text-sm leading-relaxed text-white/62">
                    {asset.description}
                  </p>
                  <span className="flex items-center gap-3 text-sm text-white">
                    Herunterladen
                    <span className="flex size-9 items-center justify-center rounded-full bg-white text-[#111111]">
                      <ArrowUpRight
                        className="size-4 transition-transform duration-200 group-hover:rotate-45"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <EditorialFaqSection
        eyebrow={`[03] ${content.usageEyebrow}`}
        titleId="brand-usage"
        title={
          <>
            Hinweise zur{" "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-foreground/88">
              Verwendung.
            </em>
          </>
        }
        items={content.usageRules.map((rule) => ({
          question: rule.question,
          answer: <p>{rule.answer}</p>,
        }))}
      />

      <section className="py-16 md:py-24" aria-labelledby="brand-contact">
        <div className="mardu-container grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:gap-18">
          <p className="text-xs uppercase tracking-[0.18em] text-mardu-purple">
            [04] {content.contactEyebrow}
          </p>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2
                id="brand-contact"
                className="mardu-homepage-section-title max-w-[18ch]"
              >
                {content.contactTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {content.contactDescription}
              </p>
            </div>
            <Button
              asChild
              className="group h-12 rounded-none border-y border-border bg-transparent px-0 text-base font-normal text-foreground shadow-none hover:border-primary hover:bg-transparent hover:text-primary"
            >
              <Link href={content.contactHref}>
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mardu-purple text-white"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-3.5 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
                </span>
                {content.contactCtaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function BrandAssetsPage({
  content,
  className,
  variant = "default",
}: BrandAssetsPageProps) {
  if (variant === "editorial-index") {
    return <EditorialBrandAssetsPage content={content} className={className} />;
  }

  return (
    <main
      className={cn(
        "min-h-screen bg-background pb-10 pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] text-foreground",
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
              <a
                key={asset.id}
                href={asset.href}
                download
                className="group space-y-4"
              >
                <div
                  className={cn(
                    "border border-black/10 p-8",
                    asset.previewSurface === "dark"
                      ? "bg-foreground"
                      : "bg-card",
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
                  <p className="text-sm font-semibold text-foreground">
                    {asset.fileName}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/72">
                    {asset.description}
                  </p>
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
                <Link href={content.contactHref}>
                  {content.contactCtaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const sharedBrandAssetCopy = {
  eyebrow: "Brand",
  title: "Markenressourcen",
  downloadsEyebrow: "Downloads",
  downloadsTitle: "Logo-Dateien",
  usageEyebrow: "Nutzungsregeln",
  usageTitle: "Hinweise zur Verwendung",
  usageDescription:
    "Ein paar kurze Hinweise helfen dabei, dass die Marke über alle Kanäle hinweg konsistent und gut wiedererkennbar bleibt.",
  usageRules: [
    {
      question: "Welche Logo-Variante nutze ich auf hellem Hintergrund?",
      answer:
        "Für helle, weiße oder papierartige Hintergründe passt in der Regel die helle Variante am besten.",
    },
    {
      question: "Welche Logo-Variante nutze ich auf dunklem Hintergrund?",
      answer:
        "Für dunkle oder schwarze Flächen passt in der Regel die dunkle Variante am besten.",
    },
    {
      question: "Darf ich Farben, Proportionen oder Abstände verändern?",
      answer:
        "Am besten bleibt das Logo in Farbe, Form und Proportion unverändert. Ein wenig Freiraum um die Marke sorgt zusätzlich für ein sauberes Erscheinungsbild.",
    },
    {
      question: "Welches Dateiformat sollte ich bevorzugen?",
      answer:
        "Wenn es technisch gut passt, ist SVG meist die beste Wahl. Das Format bleibt in Web, Präsentationen und Presseunterlagen sauber skalierbar und scharf.",
    },
  ],
  contactEyebrow: "Freigabe",
  contactTitle: "Fragen zur Nutzung oder zu Sonderformaten",
  contactDescription:
    "Wenn du die Marke in einem besonderen Kontext einsetzen möchtest oder zusätzliche Formate brauchst, gib uns einfach kurz Bescheid.",
  contactCtaLabel: "Kontaktiere uns",
};

export const marduBrandAssetsPageContent: BrandAssetsPageContentDto = {
  ...sharedBrandAssetCopy,
  description:
    "Hier findest du die Logos von Mardu für Presse, Partnerkommunikation und Marketingmaterialien.",
  downloadsDescription:
    "Hier liegen die freigegebenen Logo-Dateien von Mardu. Beide Varianten sind als SVG angelegt und für unterschiedliche Hintergründe gedacht.",
  downloads: [
    {
      id: "logo-light",
      fileName: "Logo.svg",
      href: "/logos/Logo.svg",
      previewSrc: "/logos/Logo.svg",
      previewAlt: "Mardu Logo für helle Hintergründe",
      previewSurface: "light",
      downloadLabel: "Logo für helle Hintergründe herunterladen",
      description:
        "Diese Variante passt am besten auf helle, weiße oder papierartige Flächen.",
    },
    {
      id: "logo-dark",
      fileName: "LogoWeiss.svg",
      href: "/logos/LogoWeiss.svg",
      previewSrc: "/logos/LogoWeiss.svg",
      previewAlt: "Mardu Logo für dunkle Hintergründe",
      previewSurface: "dark",
      downloadLabel: "Logo für dunkle Hintergründe herunterladen",
      description:
        "Diese Variante funktioniert am besten auf dunklen oder schwarzen Flächen.",
    },
  ],
  contactHref: "mailto:info@mardu.de?subject=Anfrage%20zu%20Brand%20Assets",
};
