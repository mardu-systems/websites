import { getAdminPageMetadata, renderAdminPage } from '@/app/(payload)/admin/_shared';
import type { Metadata } from 'next';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  return getAdminPageMetadata([], searchParams);
};

export default async function AdminRootPage({ searchParams }: { searchParams: SearchParams }) {
  return renderAdminPage([], searchParams);
}
