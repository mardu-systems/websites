import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url));
const platformOrigin = new URL(
  process.env.MARDU_PLATFORM_ORIGIN?.trim() || 'https://platform.mardu.de',
);

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app https://vitals.vercel-insights.com https://liv-showcase.s3.eu-central-1.amazonaws.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://www.mardu.de https://mardu.de ${platformOrigin.origin};
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://vercel.live https://vitals.vercel-insights.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
  frame-src 'self' https://cal.meetergo.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://cal.meetergo.com;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), fullscreen=(self), payment=()',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://www.mardu.de',
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: [
    '@mardu/catalog-ui',
    '@mardu/layout',
    '@mardu/content-core',
    '@mardu/lead-core',
    '@mardu/sections',
    '@mardu/site-config',
    '@mardu/solutions-ui',
    '@mardu/styles',
    '@mardu/ui',
  ],
  turbopack: {
    root: workspaceRoot,
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    return config;
  },
  images: {
    dangerouslyAllowLocalIP: process.env.ALLOW_LOCAL_CONTENT_IMAGES === 'true',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      new URL('/**', platformOrigin),
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/solutions/:slug',
        destination: '/solutions?solution=:slug',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/products?product=:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
