import { RichText } from '@payloadcms/richtext-lexical/react';

export function BlogRichText({ content }: { content: unknown }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-headings:text-foreground prose-h2:mt-12 prose-h2:text-[clamp(1.8rem,3.5vw,2.6rem)] prose-h3:mt-9 prose-h3:text-[clamp(1.35rem,2.6vw,1.8rem)] prose-p:leading-relaxed prose-p:text-foreground/84 prose-li:text-foreground/82 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3 prose-blockquote:border-l-black/20 prose-blockquote:text-foreground/80">
      <RichText data={content as never} />
    </div>
  );
}
