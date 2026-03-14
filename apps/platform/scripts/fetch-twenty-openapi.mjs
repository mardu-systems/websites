import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DEFAULT_BASE_URL = 'https://twenty.mardu.systems';
const DEFAULT_OPENAPI_PATH = '/rest/open-api/core';
const DEFAULT_OUTPUT_FILE = 'twenty-mardu.json';
const DEFAULT_TIMEOUT_MS = 15_000;

function getTimeoutMs() {
  const parsed = Number(process.env.TWENTY_OPENAPI_FETCH_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.floor(parsed);
}

function buildOpenApiUrl() {
  if (process.env.TWENTY_OPENAPI_URL) {
    return process.env.TWENTY_OPENAPI_URL;
  }

  const baseUrl = process.env.TWENTY_OPENAPI_BASE_URL ?? DEFAULT_BASE_URL;
  const path = process.env.TWENTY_OPENAPI_PATH ?? DEFAULT_OPENAPI_PATH;
  const url = new URL(path, baseUrl);

  const token = process.env.TWENTY_OPENAPI_TOKEN;
  if (token) {
    url.searchParams.set('token', token);
  }

  return url.toString();
}

async function main() {
  const openApiUrl = buildOpenApiUrl();
  const outputPath = resolve(
    process.cwd(),
    process.env.TWENTY_OPENAPI_OUTPUT ?? DEFAULT_OUTPUT_FILE,
  );

  const headers = { Accept: 'application/json' };
  if (process.env.TWENTY_API_KEY) {
    headers.Authorization = `Bearer ${process.env.TWENTY_API_KEY}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getTimeoutMs());

  try {
    const res = await fetch(openApiUrl, {
      method: 'GET',
      headers,
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(
        `Failed to fetch spec (${res.status} ${res.statusText})${body ? `: ${body}` : ''}`,
      );
    }

    const spec = await res.json();
    if (!spec || typeof spec !== 'object' || typeof spec.openapi !== 'string') {
      throw new Error('Response is not a valid OpenAPI document (missing `openapi` field).');
    }

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(spec, null, 2)}\n`, 'utf8');

    console.log(`OpenAPI spec saved: ${outputPath}`);
    console.log(`OpenAPI version: ${spec.openapi}`);
    if (spec.info?.version) {
      console.log(`API version: ${spec.info.version}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
