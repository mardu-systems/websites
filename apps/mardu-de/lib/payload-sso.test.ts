import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { exportJWK, generateKeyPair, SignJWT } from 'jose';
import { verifyOidcIdToken } from './payload-sso';

const ISSUER = 'https://auth.example.test/application/o/cms/';
const CLIENT_ID = 'payload-cms';
const NONCE = 'expected-nonce';

describe('verifyOidcIdToken', () => {
  test('verifies an HS256 token with the OIDC client secret without loading JWKS', async () => {
    const clientSecret = 'test-client-secret-with-at-least-32-bytes';
    const idToken = await new SignJWT({
      email: 'ADMIN@EXAMPLE.TEST',
      name: 'Admin User',
      nonce: NONCE,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setAudience(CLIENT_ID)
      .setIssuer(ISSUER)
      .setSubject('authentik-user-id')
      .setExpirationTime('5m')
      .sign(new TextEncoder().encode(clientSecret));

    const user = await verifyOidcIdToken({
      clientID: CLIENT_ID,
      clientSecret,
      discovery: {
        id_token_signing_alg_values_supported: ['HS256'],
        issuer: ISSUER,
        jwks_uri: `${ISSUER}jwks/`,
      },
      idToken,
      loadJWKS: async () => {
        throw new Error('JWKS must not be loaded for HS256 tokens.');
      },
      nonce: NONCE,
    });

    assert.deepEqual(user, {
      email: 'admin@example.test',
      name: 'Admin User',
      picture: undefined,
      sub: 'authentik-user-id',
    });
  });

  test('keeps verifying RS256 tokens with the provider JWKS', async () => {
    const { privateKey, publicKey } = await generateKeyPair('RS256');
    const publicJwk = await exportJWK(publicKey);
    const idToken = await new SignJWT({
      email: 'admin@example.test',
      nonce: NONCE,
    })
      .setProtectedHeader({ alg: 'RS256', kid: 'provider-signing-key' })
      .setAudience(CLIENT_ID)
      .setIssuer(ISSUER)
      .setSubject('provider-user-id')
      .setExpirationTime('5m')
      .sign(privateKey);

    const user = await verifyOidcIdToken({
      clientID: CLIENT_ID,
      clientSecret: 'unused-for-rs256',
      discovery: {
        id_token_signing_alg_values_supported: ['RS256'],
        issuer: ISSUER,
        jwks_uri: `${ISSUER}jwks/`,
      },
      idToken,
      loadJWKS: async () => ({
        keys: [
          {
            ...publicJwk,
            alg: 'RS256',
            kid: 'provider-signing-key',
            use: 'sig',
          },
        ],
      }),
      nonce: NONCE,
    });

    assert.equal(user.email, 'admin@example.test');
    assert.equal(user.sub, 'provider-user-id');
  });

  test('rejects a token algorithm that the provider does not advertise', async () => {
    const clientSecret = 'test-client-secret-with-at-least-32-bytes';
    const idToken = await new SignJWT({
      email: 'admin@example.test',
      nonce: NONCE,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setAudience(CLIENT_ID)
      .setIssuer(ISSUER)
      .setSubject('authentik-user-id')
      .setExpirationTime('5m')
      .sign(new TextEncoder().encode(clientSecret));

    await assert.rejects(
      verifyOidcIdToken({
        clientID: CLIENT_ID,
        clientSecret,
        discovery: {
          id_token_signing_alg_values_supported: ['RS256'],
          issuer: ISSUER,
          jwks_uri: `${ISSUER}jwks/`,
        },
        idToken,
        nonce: NONCE,
      }),
      /not advertised by the provider/,
    );
  });
});
