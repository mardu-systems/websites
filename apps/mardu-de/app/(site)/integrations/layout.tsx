import type { ReactNode } from 'react';
import { isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function IntegrationsLayout({ children }: { children: ReactNode }) {
  if (!(await isIntegrationsEnabled('mardu-de'))) {
    notFound();
  }

  return children;
}
