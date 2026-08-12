import type { Metadata } from 'next';
import { NewsletterStatusPage } from '@mardu/sections';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Newsletter Anmeldung',
  description: 'Status deiner Newsletter-Anmeldung bei Mardu.',
  path: '/newsletter/anmeldung',
  index: false,
});

export default async function NewsletterConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  return <NewsletterStatusPage variant="confirm" searchParams={resolvedSearchParams} />;
}
