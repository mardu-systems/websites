import type { ReactNode } from 'react';
import { isProductsEnabled } from '@mardu/site-config/feature-flags.server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductsLayout({ children }: { children: ReactNode }) {
  if (!(await isProductsEnabled('mardu-de'))) {
    notFound();
  }

  return children;
}
