import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import type { Metadata } from 'next';
import '@/app/(frontend)/globals.css';

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

export const getAdminPageMetadata = async (
  segments: string[],
  searchParams: SearchParams,
): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params: Promise.resolve({ segments }),
    searchParams: normalizeSearchParams(searchParams),
  });

export const renderAdminPage = async (segments: string[], searchParams: SearchParams) =>
  RootPage({
    config,
    importMap,
    params: Promise.resolve({ segments }),
    searchParams: normalizeSearchParams(searchParams),
  });
