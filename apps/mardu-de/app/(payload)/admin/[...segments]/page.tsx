import { getPlatformOrigin } from '@mardu/site-config';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Params = Promise<{ segments: string[] }>;

export const metadata: Metadata = {
  title: 'Mardu Platform Admin',
};

export default async function AdminSegmentPage({
  params,
}: {
  params: Params;
}) {
  const resolved = await params;
  redirect(new URL(`/admin/${resolved.segments.join('/')}`, getPlatformOrigin()).toString());
}
