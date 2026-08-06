import type { Metadata } from 'next';
import ConfiguratorPageClient from './configurator-page-client';

export type { State } from './configurator-page-client';

export const metadata: Metadata = {
  title: 'Konfigurator',
  description: 'Stelle dein individuelles Mardu-System zusammen.',
};

export default function ConfiguratorPage() {
  return <ConfiguratorPageClient />;
}
