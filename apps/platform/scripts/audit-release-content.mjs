import config from '../payload.config.ts';
import {
  catalogCarriers,
  catalogCategories,
  catalogTechnologies,
} from '../data/catalog/categories.ts';
import { catalogProducts } from '../data/catalog/products.ts';
import { integrationSeedItems } from '../data/integration-seed-items.ts';
import { roadmapSeedItems } from '../data/roadmap-seed-items.ts';
import { solutions } from '../data/solution-seed-items.ts';
import { getPayload } from 'payload';

const includeDocuments = process.env.CONTENT_AUDIT_INCLUDE_DOCUMENTS === 'true';

const definitions = [
  {
    collection: 'legal-pages',
    expected: [
      { slug: 'privacy', title: 'Datenschutzerklärung' },
      { slug: 'publisher', title: 'Impressum' },
    ],
  },
  { collection: 'integrations', expected: integrationSeedItems },
  { collection: 'roadmap-items', expected: roadmapSeedItems },
  { collection: 'solutions', expected: solutions },
  { collection: 'product-categories', expected: catalogCategories },
  { collection: 'product-technologies', expected: catalogTechnologies },
  { collection: 'product-carriers', expected: catalogCarriers },
  {
    collection: 'product-variants',
    expected: catalogProducts.flatMap((product) =>
      product.variants.map((variant) => ({ ...variant, slug: variant.id })),
    ),
  },
  { collection: 'products', expected: catalogProducts },
];

function readSlug(document) {
  return typeof document?.slug === 'string' ? document.slug : undefined;
}

function summarizeDocument(document) {
  return {
    slug: readSlug(document),
    status: document?._status ?? 'not-versioned',
    updatedAt: document?.updatedAt,
  };
}

async function main() {
  const payload = await getPayload({ config });
  const report = [];

  for (const definition of definitions) {
    const current = await payload.find({
      collection: definition.collection,
      limit: 1000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    });
    const expectedBySlug = new Map(
      definition.expected
        .map((document) => [readSlug(document), document])
        .filter(([slug]) => slug),
    );
    const currentBySlug = new Map(
      current.docs.map((document) => [readSlug(document), document]).filter(([slug]) => slug),
    );
    const missing = [...expectedBySlug.keys()].filter((slug) => !currentBySlug.has(slug));
    const existing = [...expectedBySlug.keys()].filter((slug) => currentBySlug.has(slug));
    const unexpectedPublished = [...currentBySlug.entries()]
      .filter(([slug, document]) => !expectedBySlug.has(slug) && document._status === 'published')
      .map(([slug]) => slug);

    report.push({
      collection: definition.collection,
      expectedCount: expectedBySlug.size,
      currentCount: currentBySlug.size,
      missing,
      existing: existing.map((slug) => summarizeDocument(currentBySlug.get(slug))),
      unexpectedPublished,
      ...(includeDocuments
        ? {
            reviewPairs: existing.map((slug) => ({
              slug,
              expected: expectedBySlug.get(slug),
              current: currentBySlug.get(slug),
            })),
          }
        : {}),
    });
  }

  console.info(JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2));

  const missingCount = report.reduce((total, item) => total + item.missing.length, 0);
  if (missingCount > 0) {
    console.error(
      `Content audit found ${missingCount} missing document(s). Review the JSON report before running any individual content seeder.`,
    );
    return 2;
  }

  return 0;
}

main()
  .then((exitCode) => process.exit(exitCode))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
