import { LegalPage } from '@mardu/sections';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildLegalPageMetadata, getLegalPage } from '@/lib/legal-pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('publisher');
  return buildLegalPageMetadata('publisher', page);
}

export default async function Publisher() {
  const page = await getLegalPage('publisher');

  if (!page) {
    notFound();
  }

  return <LegalPage page={page} />;
}
