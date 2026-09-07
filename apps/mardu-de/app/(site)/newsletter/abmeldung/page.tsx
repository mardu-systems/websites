import type { Metadata } from 'next';
import { NewsletterStatusPage } from '@mardu/sections';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Newsletter Abmeldung',
  description: 'Status deiner Newsletter-Abmeldung bei Mardu.',
  path: '/newsletter/abmeldung',
  index: false,
});

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  return <NewsletterStatusPage variant="unsubscribe" searchParams={resolvedSearchParams} />;
}
