import { getPlatformOrigin } from '@mardu/site-config';

function buildPlatformUrl(pathname: string): string {
  return new URL(pathname, getPlatformOrigin()).toString();
}

export async function forwardPlatformJson(pathname: string, body: unknown, init?: RequestInit) {
  return fetch(buildPlatformUrl(pathname), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
    ...init,
  });
}

export function buildPlatformRedirect(pathname: string, searchParams: URLSearchParams): string {
  const url = new URL(pathname, getPlatformOrigin());
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}
