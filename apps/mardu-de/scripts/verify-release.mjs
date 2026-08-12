const baseUrl = new URL(process.env.RELEASE_BASE_URL || 'http://127.0.0.1:3000');
const canonicalOrigin = new URL(process.env.RELEASE_CANONICAL_ORIGIN || 'https://www.mardu.de');
const maxPages = Number(process.env.RELEASE_MAX_PAGES || 250);
const requestTimeoutMs = Number(process.env.RELEASE_REQUEST_TIMEOUT_MS || 15_000);

const requiredNoindexPaths = new Set([
  '/newsletter/anmeldung',
  '/newsletter/abmeldung',
  '/whitepaper/success',
]);
const ignoredPathPrefixes = ['/api/', '/_next/', '/.well-known/vercel/flags'];
const ignoredFileExtensions = new Set([
  '.avif',
  '.css',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.pdf',
  '.png',
  '.svg',
  '.txt',
  '.webp',
  '.xml',
  '.zip',
]);

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function readAttribute(tag, name) {
  const quoted = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  if (quoted) {
    return decodeHtml(quoted[2] ?? '');
  }

  const unquoted = tag.match(new RegExp(`\\b${name}\\s*=\\s*([^\\s>]+)`, 'i'));
  return unquoted?.[1] ? decodeHtml(unquoted[1]) : undefined;
}

function findTags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

function findMetaContent(html, name) {
  return findTags(html, 'meta')
    .filter((tag) => readAttribute(tag, 'name')?.toLowerCase() === name.toLowerCase())
    .map((tag) => readAttribute(tag, 'content'))
    .filter(Boolean);
}

function findCanonicalUrls(html) {
  return findTags(html, 'link')
    .filter((tag) =>
      (readAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('canonical'),
    )
    .map((tag) => readAttribute(tag, 'href'))
    .filter(Boolean);
}

function normalizePath(pathname) {
  if (pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}

function isIgnoredPath(pathname) {
  if (ignoredPathPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  const lastSegment = pathname.split('/').at(-1) ?? '';
  const extensionIndex = lastSegment.lastIndexOf('.');
  return extensionIndex >= 0 && ignoredFileExtensions.has(lastSegment.slice(extensionIndex));
}

function extractInternalPaths(html) {
  const paths = new Set();

  for (const tag of findTags(html, 'a')) {
    const href = readAttribute(tag, 'href');
    if (!href || /^(?:mailto:|tel:|javascript:|data:|#)/i.test(href)) {
      continue;
    }

    try {
      const url = new URL(href, baseUrl);
      if (url.origin !== baseUrl.origin && url.origin !== canonicalOrigin.origin) {
        continue;
      }

      const pathname = normalizePath(url.pathname);
      if (!isIgnoredPath(pathname)) {
        paths.add(pathname);
      }
    } catch {
      // Invalid hrefs are reported by browsers and are not crawlable release routes.
    }
  }

  return paths;
}

function parseSitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => {
    const url = new URL(decodeHtml(match[1].trim()));
    return normalizePath(url.pathname);
  });
}

function validateCanonical(pathname, canonicalUrls, errors) {
  if (canonicalUrls.length !== 1) {
    errors.push(`${pathname}: expected exactly one canonical, received ${canonicalUrls.length}`);
    return;
  }

  try {
    const canonical = new URL(canonicalUrls[0], canonicalOrigin);
    if (
      canonical.origin !== canonicalOrigin.origin ||
      normalizePath(canonical.pathname) !== pathname
    ) {
      errors.push(`${pathname}: canonical points to ${canonical.toString()}`);
    }
  } catch {
    errors.push(`${pathname}: canonical is not a valid URL`);
  }
}

function validateJsonLd(pathname, html, errors) {
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  if (blocks.length === 0) {
    errors.push(`${pathname}: no JSON-LD block found`);
    return;
  }

  for (const [, source] of blocks) {
    try {
      JSON.parse(source);
    } catch (error) {
      errors.push(
        `${pathname}: invalid JSON-LD (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }
}

async function fetchText(pathname) {
  const url = new URL(pathname, baseUrl);
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(requestTimeoutMs),
    headers: { 'user-agent': 'mardu-release-verifier/1.0' },
  });

  return { response, text: await response.text(), url };
}

async function main() {
  if (!Number.isFinite(maxPages) || maxPages < 1) {
    throw new Error('RELEASE_MAX_PAGES must be a positive number');
  }

  const errors = [];
  const sitemapResult = await fetchText('/sitemap.xml');
  if (!sitemapResult.response.ok) {
    throw new Error(`sitemap.xml returned HTTP ${sitemapResult.response.status}`);
  }

  const sitemapPaths = new Set(parseSitemapPaths(sitemapResult.text));
  if (sitemapPaths.size === 0) {
    throw new Error('sitemap.xml contains no URLs');
  }

  const queued = new Set(['/', ...sitemapPaths, ...requiredNoindexPaths]);
  const discoveredFrom = new Map();
  const queue = [...queued];
  const visited = new Set();

  while (queue.length > 0) {
    if (visited.size >= maxPages) {
      errors.push(`crawl exceeded the configured limit of ${maxPages} pages`);
      break;
    }

    const pathname = queue.shift();
    if (!pathname || visited.has(pathname)) {
      continue;
    }
    visited.add(pathname);

    let result;
    try {
      result = await fetchText(pathname);
    } catch (error) {
      errors.push(
        `${pathname}: request failed (${error instanceof Error ? error.message : String(error)})`,
      );
      continue;
    }

    if (!result.response.ok) {
      const referrer = discoveredFrom.get(pathname);
      errors.push(
        `${pathname}: HTTP ${result.response.status}${referrer ? ` (linked from ${referrer})` : ''}`,
      );
      continue;
    }

    const contentType = result.response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html')) {
      errors.push(`${pathname}: expected text/html, received ${contentType || 'unknown'}`);
      continue;
    }

    const h1Count = (result.text.match(/<h1\b/gi) ?? []).length;
    if (h1Count !== 1) {
      errors.push(`${pathname}: expected exactly one h1, received ${h1Count}`);
    }

    const descriptions = findMetaContent(result.text, 'description');
    if (descriptions.length !== 1 || !descriptions[0]?.trim()) {
      errors.push(`${pathname}: expected one non-empty meta description`);
    }

    const robots = findMetaContent(result.text, 'robots').join(',').toLowerCase();
    const isNoindex = /(?:^|[,\s])noindex(?:$|[,\s])/.test(robots);
    const canonicalUrls = findCanonicalUrls(result.text);

    if (requiredNoindexPaths.has(pathname)) {
      if (!isNoindex) {
        errors.push(`${pathname}: status page must be noindex`);
      }
    } else {
      if (isNoindex) {
        errors.push(`${pathname}: public page unexpectedly contains noindex`);
      }
      validateCanonical(pathname, canonicalUrls, errors);
      validateJsonLd(pathname, result.text, errors);
    }

    for (const linkedPath of extractInternalPaths(result.text)) {
      if (!queued.has(linkedPath)) {
        queued.add(linkedPath);
        discoveredFrom.set(linkedPath, pathname);
        queue.push(linkedPath);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Release verification failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.info(
    `Release verification passed: ${visited.size} HTML routes, ${sitemapPaths.size} sitemap URLs, no broken internal links.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
