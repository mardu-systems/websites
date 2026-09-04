import {
  getPlatformFeaturedIntegrations,
  getPlatformIntegrationBySlug,
  getPlatformIntegrationCategories,
  getPlatformIntegrationProtocols,
  getPlatformIntegrations,
  getPlatformRelatedIntegrations,
  type IntegrationDetailDto,
  type IntegrationListQueryDto,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

import { withIntegrationLogo } from './integration-logos';

const site = 'mardu-de' as const;

export const getIntegrationCategories = async () =>
  getPlatformIntegrationCategories(getPlatformOrigin());

export const getIntegrationProtocols = async () =>
  getPlatformIntegrationProtocols(getPlatformOrigin());

export const getFeaturedIntegrations = async (limit = 8) =>
  (await getPlatformFeaturedIntegrations(getPlatformOrigin(), site, limit)).map(
    withIntegrationLogo,
  );

export const getIntegrations = async (query: IntegrationListQueryDto) => {
  const result = await getPlatformIntegrations(getPlatformOrigin(), site, query);
  return { ...result, items: result.items.map(withIntegrationLogo) };
};

export const getIntegrationBySlug = async (slug: string) => {
  const integration = await getPlatformIntegrationBySlug(getPlatformOrigin(), site, slug);
  return integration ? withIntegrationLogo(integration) : integration;
};

export const getRelatedIntegrations = async (integration: IntegrationDetailDto, limit = 3) =>
  (await getPlatformRelatedIntegrations(getPlatformOrigin(), site, integration, limit)).map(
    withIntegrationLogo,
  );
