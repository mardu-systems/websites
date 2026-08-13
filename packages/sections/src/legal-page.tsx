import type { LegalPageDto } from "@mardu/content-core";
import { cn } from "@mardu/ui/lib/utils";
import Markdown from "react-markdown";

export type LegalPageProps = {
  page: LegalPageDto;
  className?: string;
  eyebrow?: string;
};

const LEGACY_PUBLISHER_SECTIONS = [
  "EU-Streitschlichtung",
  "Haftung für Inhalte",
  "Haftung für Links",
];

function getVisibleLegalMarkdown(page: LegalPageDto) {
  if (page.pageKind !== "publisher") {
    return page.contentMarkdown;
  }

  const contentWithCurrentEditorialResponsibility =
    page.contentMarkdown.replace(
      /\n(?:---\n+)?## Verantwortlich für den Inhalt nach § 55 Abs\. 2 RStV \/ MStV[\s\S]*?(?=\n(?:---\n+)?## |$)/i,
      "\n\n## Verantwortlich für journalistisch-redaktionelle Inhalte\n\nVerantwortlich gemäß § 18 Abs. 2 MStV:\n\nLuca Schöneberg und Erik Frey · Mardu GmbH · Alter Schlachthof 39 A1 · 76131 Karlsruhe\n",
    );

  return LEGACY_PUBLISHER_SECTIONS.reduce(
    (content, heading) =>
      content.replace(
        new RegExp(
          `\\n(?:---\\n+)?## ${heading}[\\s\\S]*?(?=\\n(?:---\\n+)?## |$)`,
          "gi",
        ),
        "\n",
      ),
    contentWithCurrentEditorialResponsibility,
  );
}

export function LegalPage({ page, className, eyebrow }: LegalPageProps) {
  const visibleContentMarkdown = getVisibleLegalMarkdown(page);

  return (
    <main
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      <section className="border-b border-border py-14 md:py-20">
        <div className="mardu-container min-w-0">
          <div className="min-w-0 max-w-4xl">
            {eyebrow ? (
              <p className="mb-8 font-mono text-xs tracking-[0.14em] text-mardu-purple">
                [{eyebrow}]
              </p>
            ) : null}
            <h1 className="headline-balance break-words text-[clamp(2.25rem,8vw,5rem)] font-light leading-[0.94] tracking-[-0.045em] text-foreground hyphens-auto">
              {page.title}
            </h1>
            {page.updatedLabel ? (
              <p className="mt-4 font-mono text-xs tracking-[0.12em] text-foreground/55">
                Stand: {page.updatedLabel}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mardu-container min-w-0">
          <article className="prose prose-base w-full min-w-0 max-w-[52rem] [overflow-wrap:anywhere] prose-headings:scroll-mt-28 prose-headings:font-sans prose-headings:font-normal prose-headings:tracking-[-0.025em] prose-h2:mt-14 prose-h2:border-t prose-h2:border-border prose-h2:pt-8 prose-h2:text-[clamp(1.75rem,3vw,2.5rem)] prose-h2:leading-tight prose-h3:mt-10 prose-h3:text-[1.35rem] prose-h3:leading-tight prose-p:leading-[1.75] prose-p:text-foreground/80 prose-li:leading-relaxed prose-li:text-foreground/80 prose-strong:font-medium prose-strong:text-foreground prose-a:text-mardu-purple prose-a:decoration-mardu-purple/35 prose-a:underline prose-a:underline-offset-4 [&>:first-child]:mt-0 [&>:first-child]:border-t-0 [&>:first-child]:pt-0">
            <Markdown>{visibleContentMarkdown}</Markdown>
          </article>
        </div>
      </section>
    </main>
  );
}
