import type { ReactNode } from 'react';
import { isBlogEnabled } from '@mardu/site-config/feature-flags.server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BlogLayout({ children }: { children: ReactNode }) {
  if (!(await isBlogEnabled('mardu-de'))) {
    notFound();
  }

  return children;
}
