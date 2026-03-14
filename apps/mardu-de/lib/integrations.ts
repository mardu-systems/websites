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

const site = 'mardu-de' as const;

export const getIntegrationCategories = async () =>
  getPlatformIntegrationCategories(getPlatformOrigin());

export const getIntegrationProtocols = async () =>
  getPlatformIntegrationProtocols(getPlatformOrigin());

export const getFeaturedIntegrations = async (limit = 8) =>
  getPlatformFeaturedIntegrations(getPlatformOrigin(), site, limit);

export const getIntegrations = async (query: IntegrationListQueryDto) =>
  getPlatformIntegrations(getPlatformOrigin(), site, query);

export const getIntegrationBySlug = async (slug: string) =>
  getPlatformIntegrationBySlug(getPlatformOrigin(), site, slug);

export const getRelatedIntegrations = async (integration: IntegrationDetailDto, limit = 3) =>
  getPlatformRelatedIntegrations(getPlatformOrigin(), site, integration, limit);
