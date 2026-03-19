import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../payload.config.ts';
import { getPayload } from 'payload';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const LEGAL_ROOT = join(CURRENT_DIR, '../../../packages/content-core/src/legal');

const legalSeedItems = [
  {
    slug: 'privacy',
    title: 'Datenschutzerklärung',
    pageKind: 'privacy',
    summary: 'Informationen zum Datenschutz.',
    updatedLabel: '14.11.2025',
  },
  {
    slug: 'publisher',
    title: 'Impressum',
    pageKind: 'publisher',
    summary: 'Angaben gemäß § 5 TMG.',
    updatedLabel: '14.11.2025',
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  for (const item of legalSeedItems) {
    const contentMarkdown = await readFile(join(LEGAL_ROOT, `${item.slug}.md`), 'utf8');

    const existing = await payload.find({
      collection: 'legal-pages',
      where: {
        slug: {
          equals: item.slug,
        },
      },
      limit: 1,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    });

    const data = {
      ...item,
      contentMarkdown,
      sites: ['mardu-de', 'mardu-space', 'platform'],
      _status: 'published',
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: 'legal-pages',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: 'legal-pages',
        data,
        overrideAccess: true,
      });
    }
  }

  console.info(`Seeded ${legalSeedItems.length} legal pages.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
