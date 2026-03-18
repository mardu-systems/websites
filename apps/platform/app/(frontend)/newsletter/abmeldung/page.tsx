import type { Metadata } from 'next';
import { NewsletterStatusPage } from '@/components/utilities/newsletter-status-page';

export const metadata: Metadata = {
  title: 'Newsletter Abmeldung',
  description: 'Status Ihrer Newsletter-Abmeldung bei Mardu.',
  alternates: {
    canonical: '/newsletter/abmeldung',
  },
};

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  return <NewsletterStatusPage variant="unsubscribe" searchParams={resolvedSearchParams} />;
}
