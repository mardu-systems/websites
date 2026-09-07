import config from '../payload.config.ts';
import { integrationSeedItems } from '../data/integration-seed-items.ts';
import { getPayload } from 'payload';

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

const upsertCategory = async (payload, title) => {
  const slug = toSlug(title);

  const existing = await payload.find({
    collection: 'integration-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    return existing.docs[0];
  }

  return payload.create({
    collection: 'integration-categories',
    data: {
      title,
      slug,
    },
    overrideAccess: true,
  });
};

const upsertProtocol = async (payload, title) => {
  const slug = toSlug(title);

  const existing = await payload.find({
    collection: 'integration-protocols',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    return existing.docs[0];
  }

  return payload.create({
    collection: 'integration-protocols',
    data: {
      title,
      slug,
      badgeStyle: 'neutral',
    },
    overrideAccess: true,
  });
};

const createLexicalParagraph = (text) => ({
  root: {
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: null,
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: null,
        textStyle: '',
        textFormat: 0,
        children: [
          {
            type: 'text',
            version: 1,
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
});

const run = async () => {
  const payload = await getPayload({ config });

  for (const item of integrationSeedItems) {
    const category = await upsertCategory(payload, item.category);
    const protocols = [];

    for (const protocolTitle of item.protocols) {
      const protocol = await upsertProtocol(payload, protocolTitle);
      protocols.push(protocol);
    }

    const existing = await payload.find({
      collection: 'integrations',
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

    const integrationData = {
      title: item.title,
      slug: item.slug,
      availabilityStatus: item.status,
      shortDescription: item.shortDescription,
      ...(item.vendor ? { vendor: item.vendor } : {}),
      categories: [category.id],
      protocols: protocols.map((p) => p.id),
      supportedActions: [{ title: 'Benutzer und Rollen synchronisieren' }],
      useCases: [{ title: 'Automatisierte Freigaben und Provisionierung' }],
      description: createLexicalParagraph(item.shortDescription),
      _status: 'published',
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: 'integrations',
        id: existing.docs[0].id,
        data: integrationData,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: 'integrations',
        data: integrationData,
        overrideAccess: true,
      });
    }
  }

  console.info(`Seeded ${integrationSeedItems.length} integrations.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
