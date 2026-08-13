import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  featureEnvVarNames,
  getSiteFlagDefinitions,
  parseBooleanEnvOverride,
  siteConfigs,
} from './index';

describe('site feature flag contract', () => {
  test('keeps unfinished mardu.de content disabled by default', () => {
    assert.deepEqual(siteConfigs['mardu-de'].features, {
      blog: false,
      integrations: false,
      products: false,
    });

    const definitions = getSiteFlagDefinitions('mardu-de');
    assert.deepEqual(Object.keys(definitions).sort(), ['blog', 'integrations', 'products']);
    assert.ok(Object.values(definitions).every((definition) => !definition.defaultValue));
  });

  test('documents one static fallback variable per flag', () => {
    assert.deepEqual(featureEnvVarNames['mardu-de'], {
      blog: 'MARDU_DE_ENABLE_BLOG',
      integrations: 'MARDU_DE_ENABLE_INTEGRATIONS',
      products: 'MARDU_DE_ENABLE_PRODUCTS',
    });
    assert.equal(parseBooleanEnvOverride(' true '), true);
    assert.equal(parseBooleanEnvOverride('FALSE'), false);
    assert.equal(parseBooleanEnvOverride('enabled'), undefined);
  });
});
