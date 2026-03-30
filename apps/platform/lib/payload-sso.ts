import { randomBytes, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { createLocalJWKSet, jwtVerify, SignJWT, type JSONWebKeySet } from 'jose';

export const OIDC_STATE_COOKIE = 'mardu_oidc_state';
export const OIDC_SESSION_COOKIE = 'mardu_oidc_session';

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const STATE_TTL_SECONDS = 60 * 10;

type OidcDiscovery = {
  authorization_endpoint: string;
  issuer: string;
  jwks_uri: string;
  token_endpoint: string;
};

type OidcJwksResponse = JSONWebKeySet;

type OidcSessionClaims = {
  email: string;
  name?: string;
  picture?: string;
  sub: string;
};

type OidcStateClaims = {
  codeVerifier: string;
  expiresAt: number;
  nonce: string;
  returnTo: string;
  state: string;
};

type VerifiedOidcUser = {
  email: string;
  name?: string;
  picture?: string;
  sub: string;
};

export const isOidcEnabled = (): boolean => {
  return Boolean(process.env.OIDC_ISSUER && process.env.OIDC_CLIENT_ID && process.env.OIDC_CLIENT_SECRET);
};

export const isOidcConfiguredForUI = (): boolean => isOidcEnabled();

export const isOidcDebugAllowed = (): boolean => {
  return process.env.NODE_ENV === 'development' && process.env.OIDC_DEBUG === 'true';
};

export const logOidcDebug = (event: string, details?: Record<string, unknown>) => {
  if (!isOidcDebugAllowed()) {
    return;
  }

  console.info(`[OIDC][${event}]`, details || {});
};

export const getPublicBaseURL = (): string => {
  return process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
};

export const getRequestBaseURL = (request: Request): string => {
  const requestURL = new URL(request.url);

  return `${requestURL.protocol}//${requestURL.host}`;
};

export const isSecureRequest = (request: Request): boolean => {
  const requestURL = new URL(request.url);
  return requestURL.protocol === 'https:';
};

const getSecret = (): Uint8Array => {
  const raw = process.env.OIDC_SESSION_SECRET || process.env.PAYLOAD_SECRET;

  if (!raw) {
    throw new Error('Missing OIDC_SESSION_SECRET or PAYLOAD_SECRET for OIDC session signing.');
  }

  return new TextEncoder().encode(raw);
};

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value;
};

const getOptionalEnv = (key: string): null | string => {
  const value = process.env[key];

  return value ? value : null;
};

export const buildRedirectURL = (request: Request, path: string): URL => {
  const base = getRequestBaseURL(request);

  if (path.startsWith('/')) {
    return new URL(path, base);
  }

  return new URL('/admin/login', base);
};

export const buildErrorRedirectURL = (request: Request, errorCode: string): URL => {
  const url = buildRedirectURL(request, '/admin/login');
  url.searchParams.set('error', errorCode);

  if (isOidcDebugAllowed()) {
    url.searchParams.set('oidc_debug', errorCode);
  }

  return url;
};

type CookieBaseOptions = {
  secure: boolean;
};

export const getOidcCookieBaseOptions = (request: Request): CookieBaseOptions => {
  return {
    secure: isSecureRequest(request),
  };
};

export const getStateCookieOptions = (request: Request, value: string) => {
  const base = getOidcCookieBaseOptions(request);

  return {
    httpOnly: true,
    maxAge: STATE_TTL_SECONDS,
    name: OIDC_STATE_COOKIE,
    path: '/api/sso/callback',
    sameSite: 'lax' as const,
    secure: base.secure,
    value,
  };
};

export const getExpiredStateCookieOptions = () => {
  return {
    maxAge: 0,
    name: OIDC_STATE_COOKIE,
    path: '/api/sso/callback',
    value: '',
  };
};

export const getSessionCookieOptions = (request: Request, value: string) => {
  const base = getOidcCookieBaseOptions(request);

  return {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    name: OIDC_SESSION_COOKIE,
    path: '/',
    sameSite: 'lax' as const,
    secure: base.secure,
    value,
  };
};

export const getExpiredSessionCookieOptions = () => {
  return {
    maxAge: 0,
    name: OIDC_SESSION_COOKIE,
    path: '/',
    value: '',
  };
};

const toBase64Url = (input: Buffer): string => {
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

const createCodeVerifier = (): string => {
  return toBase64Url(randomBytes(48));
};

const createCodeChallenge = (codeVerifier: string): string => {
  const digest = createHash('sha256').update(codeVerifier).digest();

  return toBase64Url(digest);
};

const createOpaqueValue = (): string => {
  return toBase64Url(randomBytes(24));
};

const sanitizeReturnTo = (returnTo?: string): string => {
  if (!returnTo || !returnTo.startsWith('/')) {
    return '/admin';
  }

  if (returnTo.startsWith('//')) {
    return '/admin';
  }

  return returnTo;
};

const getDiscoveryDocument = async (): Promise<OidcDiscovery> => {
  const issuer = getRequiredEnv('OIDC_ISSUER').replace(/\/$/, '');
  const discoveryURL = getOptionalEnv('OIDC_DISCOVERY_URL') || `${issuer}/.well-known/openid-configuration`;

  const response = await fetch(discoveryURL, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load OIDC discovery document: ${response.status}`);
  }

  const json = (await response.json()) as Partial<OidcDiscovery>;

  if (!json.authorization_endpoint || !json.token_endpoint || !json.jwks_uri || !json.issuer) {
    throw new Error('OIDC discovery document is missing required endpoints.');
  }

  return {
    authorization_endpoint: json.authorization_endpoint,
    issuer: json.issuer,
    jwks_uri: getOptionalEnv('OIDC_JWKS_URI') || json.jwks_uri,
    token_endpoint: json.token_endpoint,
  };
};

const getJWKS = async (jwksURI: string): Promise<OidcJwksResponse> => {
  const response = await fetch(jwksURI, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load OIDC JWKS: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    const body = await response.text().catch(() => '');
    throw new Error(
      `OIDC JWKS response is not valid JSON. content-type=${contentType || 'unknown'} body-preview=${body.slice(0, 160)}`,
    );
  }

  if (!json || typeof json !== 'object' || !('keys' in json) || !Array.isArray(json.keys)) {
    throw new Error(
      `OIDC JWKS payload is malformed. content-type=${contentType || 'unknown'} body-preview=${JSON.stringify(json).slice(0, 160)}`,
    );
  }

  if (!json.keys.every((key) => key && typeof key === 'object')) {
    throw new Error(
      `OIDC JWKS payload contains invalid keys. content-type=${contentType || 'unknown'} body-preview=${JSON.stringify(json).slice(0, 160)}`,
    );
  }

  return json as OidcJwksResponse;
};

export const buildOidcAuthorization = async (inputReturnTo?: string) => {
  const discovery = await getDiscoveryDocument();
  const clientID = getRequiredEnv('OIDC_CLIENT_ID');
  const redirectURI = getRequiredEnv('OIDC_REDIRECT_URI');

  const codeVerifier = createCodeVerifier();
  const codeChallenge = createCodeChallenge(codeVerifier);
  const state = createOpaqueValue();
  const nonce = createOpaqueValue();
  const returnTo = sanitizeReturnTo(inputReturnTo);

  const params = new URLSearchParams({
    client_id: clientID,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    nonce,
    redirect_uri: redirectURI,
    response_type: 'code',
    scope: 'openid profile email',
    state,
  });

  const statePayload: OidcStateClaims = {
    codeVerifier,
    expiresAt: Date.now() + STATE_TTL_SECONDS * 1000,
    nonce,
    returnTo,
    state,
  };

  return {
    authorizationURL: `${discovery.authorization_endpoint}?${params.toString()}`,
    statePayload,
  };
};

const toBase64UrlString = (value: string): string => {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

const fromBase64UrlString = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, 'base64').toString('utf8');
};

const signStatePayload = (payloadBase64Url: string): string => {
  return createHmac('sha256', Buffer.from(getSecret()))
    .update(payloadBase64Url)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

export const createOidcStateToken = (payload: OidcStateClaims): string => {
  const payloadPart = toBase64UrlString(JSON.stringify(payload));
  const signaturePart = signStatePayload(payloadPart);

  return `${payloadPart}.${signaturePart}`;
};

export const verifyOidcState = async (token: string): Promise<OidcStateClaims> => {
  const [payloadPart, signaturePart] = token.split('.');

  if (!payloadPart || !signaturePart) {
    throw new Error('Invalid OIDC state token format.');
  }

  const expectedSignature = signStatePayload(payloadPart);

  if (
    expectedSignature.length !== signaturePart.length ||
    !timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signaturePart))
  ) {
    throw new Error('Invalid OIDC state signature.');
  }

  const payload = JSON.parse(fromBase64UrlString(payloadPart)) as Partial<OidcStateClaims>;

  if (
    typeof payload.state !== 'string' ||
    typeof payload.nonce !== 'string' ||
    typeof payload.codeVerifier !== 'string' ||
    typeof payload.returnTo !== 'string' ||
    typeof payload.expiresAt !== 'number'
  ) {
    throw new Error('Invalid OIDC state token.');
  }

  if (payload.expiresAt < Date.now()) {
    throw new Error('OIDC state token expired.');
  }

  return {
    codeVerifier: payload.codeVerifier,
    expiresAt: payload.expiresAt,
    nonce: payload.nonce,
    returnTo: sanitizeReturnTo(payload.returnTo),
    state: payload.state,
  };
};

const exchangeCodeForTokens = async (args: {
  code: string;
  codeVerifier: string;
}): Promise<{ id_token: string }> => {
  const discovery = await getDiscoveryDocument();
  const clientID = getRequiredEnv('OIDC_CLIENT_ID');
  const clientSecret = getRequiredEnv('OIDC_CLIENT_SECRET');
  const redirectURI = getRequiredEnv('OIDC_REDIRECT_URI');

  const body = new URLSearchParams({
    client_id: clientID,
    client_secret: clientSecret,
    code: args.code,
    code_verifier: args.codeVerifier,
    grant_type: 'authorization_code',
    redirect_uri: redirectURI,
  });

  const response = await fetch(discovery.token_endpoint, {
    body,
    cache: 'no-store',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`OIDC token exchange failed: ${response.status}`);
  }

  const json = (await response.json()) as { id_token?: string };

  if (!json.id_token) {
    throw new Error('OIDC token exchange did not return id_token.');
  }

  return {
    id_token: json.id_token,
  };
};

const verifyIDToken = async (args: {
  idToken: string;
  nonce: string;
}): Promise<VerifiedOidcUser> => {
  const discovery = await getDiscoveryDocument();
  const clientID = getRequiredEnv('OIDC_CLIENT_ID');
  const jwksPayload = await getJWKS(discovery.jwks_uri);
  const jwks = createLocalJWKSet(jwksPayload);

  const { payload } = await jwtVerify(args.idToken, jwks, {
    audience: clientID,
    issuer: discovery.issuer,
  });

  if (payload.nonce !== args.nonce) {
    throw new Error('Invalid OIDC nonce.');
  }

  if (typeof payload.sub !== 'string') {
    throw new Error('OIDC id_token is missing sub claim.');
  }

  if (typeof payload.email !== 'string') {
    throw new Error('OIDC id_token is missing email claim.');
  }

  return {
    email: payload.email.toLowerCase(),
    name: typeof payload.name === 'string' ? payload.name : undefined,
    picture: typeof payload.picture === 'string' ? payload.picture : undefined,
    sub: payload.sub,
  };
};

export const resolveOidcUserFromCallback = async (args: {
  code: string;
  nonce: string;
  codeVerifier: string;
}) => {
  const tokens = await exchangeCodeForTokens({
    code: args.code,
    codeVerifier: args.codeVerifier,
  });

  return verifyIDToken({
    idToken: tokens.id_token,
    nonce: args.nonce,
  });
};

const parseListEnv = (value?: string): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
};

export const isEmailAllowedForOidc = (email: string): boolean => {
  const normalizedEmail = email.toLowerCase();
  const allowedEmails = parseListEnv(process.env.OIDC_ALLOWED_EMAILS);
  const allowedDomains = parseListEnv(process.env.OIDC_ALLOWED_EMAIL_DOMAINS);

  if (allowedEmails.length === 0 && allowedDomains.length === 0) {
    return true;
  }

  if (allowedEmails.includes(normalizedEmail)) {
    return true;
  }

  const [, domain = ''] = normalizedEmail.split('@');

  return domain ? allowedDomains.includes(domain) : false;
};

export const canAutoProvisionOidcUsers = (): boolean => {
  const configuredValue = process.env.OIDC_AUTO_CREATE_USERS;

  if (configuredValue === 'true') {
    return true;
  }

  if (configuredValue === 'false') {
    return false;
  }

  return process.env.NODE_ENV !== 'production';
};

export const createOidcSessionToken = async (claims: OidcSessionClaims): Promise<string> => {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
};

export const verifyOidcSessionToken = async (token: string): Promise<OidcSessionClaims> => {
  const { payload } = await jwtVerify(token, getSecret());

  if (typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
    throw new Error('Invalid OIDC session token payload.');
  }

  return {
    email: payload.email.toLowerCase(),
    name: typeof payload.name === 'string' ? payload.name : undefined,
    picture: typeof payload.picture === 'string' ? payload.picture : undefined,
    sub: payload.sub,
  };
};

export const getCookieValue = (cookieHeader: null | string, cookieName: string): null | string => {
  if (!cookieHeader) {
    return null;
  }

  const cookieParts = cookieHeader.split(';');

  for (const part of cookieParts) {
    const trimmed = part.trim();

    if (trimmed.startsWith(`${cookieName}=`)) {
      return decodeURIComponent(trimmed.slice(cookieName.length + 1));
    }
  }

  return null;
};
