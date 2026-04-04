import config from '../payload.config.ts';
import { roadmapSeedItems } from '../data/roadmap-seed-items.ts';
import { getPayload } from 'payload';

const run = async () => {
  const payload = await getPayload({ config });

  for (const item of roadmapSeedItems) {
    const existing = await payload.find({
      collection: 'roadmap-items',
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

    const roadmapData = {
      ...item,
      featured: false,
      sites: ['mardu-space'],
      _status: 'published',
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: 'roadmap-items',
        id: existing.docs[0].id,
        data: roadmapData,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: 'roadmap-items',
        data: roadmapData,
        overrideAccess: true,
      });
    }
  }

  console.info(`Seeded ${roadmapSeedItems.length} roadmap items.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
