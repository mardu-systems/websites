import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import type { Metadata } from 'next';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const normalizeSearchParams = async (
  searchParams: SearchParams,
): Promise<Record<string, string | string[]>> => {
  const resolved = await searchParams;
  const entries = Object.entries(resolved).filter((entry): entry is [string, string | string[]] => {
    return entry[1] !== undefined;
  });

  return Object.fromEntries(entries);
};

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params: Promise.resolve({} as { segments: string[] }),
    searchParams: normalizeSearchParams(searchParams),
  });

export default async function AdminRootPage({ searchParams }: { searchParams: SearchParams }) {
  return RootPage({
    config,
    importMap,
    params: Promise.resolve({} as { segments: string[] }),
    searchParams: normalizeSearchParams(searchParams),
  });
}
