import type { Metadata } from 'next';
import path from 'path';
import fs from 'fs/promises';
import Markdown from 'react-markdown';
import { Overline } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Angaben gemäß § 5 TMG für mardu.space.',
  alternates: {
    canonical: '/publisher',
  },
  openGraph: {
    title: 'Impressum | mardu.space',
    description: 'Angaben gemäß § 5 TMG für mardu.space.',
    url: '/publisher',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Impressum | mardu.space',
    description: 'Angaben gemäß § 5 TMG für mardu.space.',
  },
};

export default async function Publisher() {
  const filePath = path.join(process.cwd(), 'publisher.md');
  const fileContent = await fs.readFile(filePath, 'utf8');

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Rechtliches</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Impressum
          </h1>
        </div>
        <div className="space-y-6 pt-8 md:pt-10">
          <article className="prose max-w-none prose-headings:font-sans prose-headings:tracking-[-0.02em] prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3">
            <Markdown>{fileContent}</Markdown>
          </article>
        </div>
      </section>
    </main>
  );
}
