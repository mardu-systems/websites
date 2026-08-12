import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import { EditorialPageHero } from "@mardu/ui/components/editorial-page-hero";
import { EditorialAccent, Overline } from "@mardu/ui/components/typography";
import { cn } from "@mardu/ui/lib/utils";
import type { BrandAssetsPageProps } from "./brand-assets-page";
import EditorialFaqSection from "./editorial-faq-section";

export function EditorialBrandAssetsPage({
  content,
  className,
}: BrandAssetsPageProps) {
  return (
    <main
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      <EditorialPageHero
        eyebrow={`[01] ${content.eyebrow}`}
        title={
          <>
            Markenressourcen von der{" "}
            <EditorialAccent>Mardu GmbH.</EditorialAccent>
          </>
        }
        description={content.description}
        className="xl:py-32"
      />

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
                <EditorialAccent className="text-white/88">
                  helle und dunkle Flächen.
                </EditorialAccent>
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
            Hinweise zur <EditorialAccent>Verwendung.</EditorialAccent>
          </>
        }
        items={content.usageRules.map((rule) => ({
          question: rule.question,
          answer: <p>{rule.answer}</p>,
        }))}
      />

      <section className="py-16 md:py-24" aria-labelledby="brand-contact">
        <div className="mardu-container grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:gap-18">
          <Overline variant="editorial">[04] {content.contactEyebrow}</Overline>
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
            <EditorialActionButton render={<Link href={content.contactHref} />}>
              {content.contactCtaLabel}
            </EditorialActionButton>
          </div>
        </div>
      </section>
    </main>
  );
}
