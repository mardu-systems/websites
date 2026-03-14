import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Markdown from 'react-markdown';
import { Overline } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zum Datenschutz bei mardu.space.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Datenschutzerklärung | mardu.space',
    description: 'Informationen zum Datenschutz bei mardu.space.',
    url: '/privacy',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: 'Datenschutzerklärung | mardu.space',
    description: 'Informationen zum Datenschutz bei mardu.space.',
  },
};

export default async function Privacy() {
  const filePath = path.join(process.cwd(), 'privacy.md');
  const fileContent = await fs.readFile(filePath, 'utf8');

  const today = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
  }).format(new Date());
  const changed = '14.11.2025';

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="mardu-container py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <Overline>Rechtliches</Overline>
          <h1 className="headline-balance text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-foreground/60">Stand: {today}</p>
          <p className="text-sm text-foreground/60">Geändert: {changed}</p>
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
