import config from '../payload.config.ts';
import { solutions } from '../../mardu-space/data/solutions.ts';
import { getPayload } from 'payload';

const run = async () => {
  const payload = await getPayload({ config });

  for (const solution of solutions) {
    const existing = await payload.find({
      collection: 'solutions',
      where: {
        slug: {
          equals: solution.slug,
        },
      },
      limit: 1,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    });

    const data = {
      title: solution.title,
      slug: solution.slug,
      badge: solution.badge,
      tagline: solution.tagline,
      summary: solution.summary,
      themeTone: solution.themeTone,
      heroTitle: solution.heroTitle,
      heroIntro: solution.heroIntro,
      problemTitle: solution.problemTitle,
      problemBody: solution.problemBody,
      ctaLabel: solution.ctaLabel,
      ctaHref: solution.ctaHref,
      imageUrl: solution.imageUrl,
      imageAlt: solution.imageAlt,
      heroImageUrl: solution.heroImageUrl,
      heroImageAlt: solution.heroImageAlt,
      detailMarkdown: solution.detailMarkdown,
      features: solution.features?.map((feature) => ({
        title: feature.title,
        description: feature.description,
      })),
      contentBlocks: solution.contentBlocks.map((block) => ({
        eyebrow: block.eyebrow,
        title: block.title,
        body: block.body,
        imageUrl: block.imageUrl,
        imageAlt: block.imageAlt,
        imageSide: block.imageSide,
      })),
      featured: false,
      publishedAt: new Date().toISOString(),
      sites: ['mardu-space'],
      _status: 'published',
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: 'solutions',
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: 'solutions',
        data,
        overrideAccess: true,
      });
    }
  }

  console.info(`Seeded ${solutions.length} solutions.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
