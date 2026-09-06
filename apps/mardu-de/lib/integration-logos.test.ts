import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, test } from 'node:test';
import type { IntegrationDetailDto } from '@mardu/content-core';
import { INTEGRATION_LOGO_SOURCES, withIntegrationLogo } from './integration-logos';

const integration: IntegrationDetailDto = {
  id: 'example',
  slug: 'auth0',
  title: 'Auth0',
  shortDescription: 'Single Sign-on',
  status: 'available',
  featured: false,
  sortOrder: 0,
  categories: [],
  protocols: [],
  content: { example: true },
  supportedActions: ['Anmelden'],
  useCases: [],
};

describe('integration logos', () => {
  test('adds a shipped logo to a detail entry without losing its content', () => {
    const result = withIntegrationLogo(integration);
    assert.ok(result.logoUrl);
    assert.equal(result.logoAlt, 'Auth0');
    assert.equal(result.content, integration.content);
    assert.equal(result.supportedActions, integration.supportedActions);
    assert.equal(integration.logoUrl, undefined);
  });

  test('keeps an editorial logo and its alternative text', () => {
    const result = withIntegrationLogo({
      ...integration,
      logoUrl: 'https://example.com/logo.svg',
      logoAlt: 'Editorial logo',
    });
    assert.equal(result.logoUrl, 'https://example.com/logo.svg');
    assert.equal(result.logoAlt, 'Editorial logo');
  });

  test('leaves an unknown integration without a logo unchanged', () => {
    const unknown = { ...integration, slug: 'new-integration' };
    assert.equal(withIntegrationLogo(unknown), unknown);
  });

  test('ships every configured fallback asset', () => {
    for (const [slug, path] of Object.entries(INTEGRATION_LOGO_SOURCES)) {
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${slug}: ${path}`);
    }
  });
});
