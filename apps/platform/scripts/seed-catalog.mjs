import config from '../payload.config.ts';
import {
  catalogCarriers,
  catalogCategories,
  catalogTechnologies,
} from '../../mardu-space/data/catalog/categories.ts';
import { catalogProducts } from '../../mardu-space/data/catalog/products.ts';
import { getPayload } from 'payload';

async function findBySlug(payload, collection, slug) {
  const existing = await payload.find({
    collection,
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

  return existing.docs[0] ?? null;
}

async function upsertBySlug(payload, collection, slug, data) {
  const existing = await findBySlug(payload, collection, slug);

  if (existing) {
    return payload.update({
      collection,
      id: existing.id,
      data,
      overrideAccess: true,
    });
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  });
}

const run = async () => {
  const payload = await getPayload({ config });

  const categoryIds = new Map();
  const technologyIds = new Map();
  const carrierIds = new Map();
  const variantIds = new Map();
  const productIds = new Map();

  for (const [index, category] of catalogCategories.entries()) {
    const doc = await upsertBySlug(payload, 'product-categories', category.slug, {
      name: category.name,
      slug: category.slug,
      eyebrow: category.eyebrow,
      description: category.description,
      imageUrl: category.imageUrl,
      imageAlt: category.imageAlt,
      featured: category.featured ?? false,
      sortOrder: index,
      sites: ['mardu-space'],
      _status: 'published',
    });

    categoryIds.set(category.id, doc.id);
  }

  for (const [index, technology] of catalogTechnologies.entries()) {
    const doc = await upsertBySlug(payload, 'product-technologies', technology.slug, {
      name: technology.name,
      slug: technology.slug,
      description: technology.description,
      visualLabel: technology.visualLabel,
      imageUrl: technology.imageUrl,
      imageAlt: technology.imageAlt,
      sortOrder: index,
      sites: ['mardu-space'],
      _status: 'published',
    });

    technologyIds.set(technology.id, doc.id);
  }

  for (const [index, carrier] of catalogCarriers.entries()) {
    const doc = await upsertBySlug(payload, 'product-carriers', carrier.slug, {
      name: carrier.name,
      slug: carrier.slug,
      description: carrier.description,
      visualLabel: carrier.visualLabel,
      technologyLabel: carrier.technologyLabel,
      imageUrl: carrier.imageUrl,
      imageAlt: carrier.imageAlt,
      sortOrder: index,
      sites: ['mardu-space'],
      _status: 'published',
    });

    carrierIds.set(carrier.id, doc.id);
  }

  for (const product of catalogProducts) {
    for (const [index, variant] of product.variants.entries()) {
      const doc = await upsertBySlug(payload, 'product-variants', variant.id, {
        label: variant.label,
        slug: variant.id,
        summary: variant.summary,
        priceFromLabel: variant.priceFromLabel,
        availabilityLabel: variant.availabilityLabel,
        recommendation: variant.recommendation,
        attributes: variant.attributes.map((attribute) => ({
          label: attribute.label,
          value: attribute.value,
        })),
        sortOrder: index,
        sites: ['mardu-space'],
        _status: 'published',
      });

      variantIds.set(variant.id, doc.id);
    }
  }

  for (const [index, product] of catalogProducts.entries()) {
    const doc = await upsertBySlug(payload, 'products', product.slug, {
      name: product.name,
      slug: product.slug,
      summary: product.summary,
      tagline: product.tagline,
      badge: product.badge,
      eyebrow: product.categoryName,
      description: product.summary,
      heroDescription: product.heroDescription,
      overview: product.overview,
      detailMarkdown: product.detailMarkdown,
      breadcrumbLabel: product.breadcrumbLabel,
      priceFromLabel: product.priceFromLabel,
      availability: product.availability,
      availabilityLabel: product.availabilityLabel,
      imageUrl: product.imageUrl,
      imageAlt: product.imageAlt,
      priceFrom:
        typeof product.inquiryContext.priceFrom === 'string' &&
        Number.isFinite(Number(product.inquiryContext.priceFrom))
          ? Number(product.inquiryContext.priceFrom)
          : undefined,
      variants: product.variants.map((variant) => variantIds.get(variant.id)).filter(Boolean),
      categories: [categoryIds.get(product.categoryId)].filter(Boolean),
      technologies: product.technologies.map((technology) => technologyIds.get(technology.id)).filter(Boolean),
      carriers: product.carriers.map((carrier) => carrierIds.get(carrier.id)).filter(Boolean),
      technologiesHeading: product.technologiesHeading,
      technologiesIntro: product.technologiesIntro,
      carriersHeading: product.carriersHeading,
      carriersIntro: product.carriersIntro,
      featureGroups: product.featureGroups.map((group) => ({
        title: group.title,
        items: group.items.map((item) => ({
          item,
        })),
      })),
      specGroups: product.specGroups.map((group) => ({
        title: group.title,
        specs: group.specs.map((spec) => ({
          label: spec.label,
          value: spec.value,
        })),
      })),
      primaryCtaLabel: product.primaryCtaLabel,
      secondaryCtaLabel: product.secondaryCtaLabel,
      featured: product.featured ?? false,
      sortOrder: index,
      sites: ['mardu-space'],
      _status: 'published',
    });

    productIds.set(product.id, doc.id);
  }

  for (const category of catalogCategories) {
    const categoryId = categoryIds.get(category.id);

    if (!categoryId) {
      continue;
    }

    await payload.update({
      collection: 'product-categories',
      id: categoryId,
      data: {
        products: category.productIds.map((productId) => productIds.get(productId)).filter(Boolean),
      },
      overrideAccess: true,
    });
  }

  for (const product of catalogProducts) {
    const productId = productIds.get(product.id);

    if (!productId) {
      continue;
    }

    await payload.update({
      collection: 'products',
      id: productId,
      data: {
        relatedProducts: product.relatedProducts
          .map((relatedProduct) => productIds.get(relatedProduct.id))
          .filter(Boolean),
      },
      overrideAccess: true,
    });
  }

  console.info(
    `Seeded ${catalogCategories.length} categories, ${catalogTechnologies.length} technologies, ${catalogCarriers.length} carriers and ${catalogProducts.length} products.`,
  );
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
