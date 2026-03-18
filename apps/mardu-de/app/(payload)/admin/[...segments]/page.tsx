import { getAdminPageMetadata, renderAdminPage } from '@/app/(payload)/admin/_shared';
import type { Metadata } from 'next';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
type Params = Promise<{ segments: string[] }>;

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const resolved = await params;

  return getAdminPageMetadata(resolved.segments, searchParams);
};

export default async function AdminSegmentPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const resolved = await params;

  return renderAdminPage(resolved.segments, searchParams);
}
