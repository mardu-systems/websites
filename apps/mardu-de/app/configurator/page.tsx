import type { Metadata } from 'next';
import ConfiguratorPageClient from './configurator-page-client';
import { createPageMetadata } from '@/lib/seo';

export type { State } from './configurator-page-client';

export const metadata: Metadata = createPageMetadata({
  title: 'Konfigurator',
  description: 'Stelle dein individuelles Mardu-System zusammen.',
  path: '/configurator',
});

export default function ConfiguratorPage() {
  return <ConfiguratorPageClient />;
}
