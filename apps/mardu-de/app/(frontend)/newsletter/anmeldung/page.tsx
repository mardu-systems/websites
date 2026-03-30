import type { Metadata } from 'next';
import { NewsletterStatusPage } from '@mardu/sections';

export const metadata: Metadata = {
  title: 'Newsletter Anmeldung',
  description: 'Status Ihrer Newsletter-Anmeldung bei Mardu.',
  alternates: {
    canonical: '/newsletter/anmeldung',
  },
};

export default async function NewsletterConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  return <NewsletterStatusPage variant="confirm" searchParams={resolvedSearchParams} />;
}
