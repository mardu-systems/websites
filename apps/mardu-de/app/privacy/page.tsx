import { LegalPage } from '@mardu/sections';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildLegalPageMetadata, getLegalPage } from '@/lib/legal-pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('privacy');
  return buildLegalPageMetadata('privacy', page);
}

export default async function Privacy() {
  const page = await getLegalPage('privacy');

  if (!page) {
    notFound();
  }

  return <LegalPage page={page} />;
}
