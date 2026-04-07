import ReactMarkdown from 'react-markdown';
import { Overline } from '@mardu/ui/components/typography';

export interface DetailMarkdownProps {
  eyebrow: string;
  title: string;
  markdown: string;
}

export function DetailMarkdown({
  eyebrow,
  title,
  markdown,
}: DetailMarkdownProps) {
  return (
    <article className="mx-auto w-full max-w-4xl">
      <div className="space-y-3">
        <Overline>{eyebrow}</Overline>
        <h2 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
      </div>

      <div className="space-y-6 pt-8 md:pt-10">
        <div className="prose max-w-none prose-headings:font-sans prose-headings:tracking-[-0.02em] prose-p:max-w-none prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
