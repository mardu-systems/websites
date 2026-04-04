import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url));

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app https://vitals.vercel-insights.com https://liv-showcase.s3.eu-central-1.amazonaws.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://www.mardu.space https://mardu.space;
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
    key: 'Feature-Policy',
    value: "camera 'none'; microphone 'none'; geolocation 'none'; fullscreen 'self'",
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
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
    value: 'https://www.mardu.space',
  },
];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: [
    '@mardu/layout',
    '@mardu/content-core',
    '@mardu/lead-core',
    '@mardu/sections',
    '@mardu/site-config',
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
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
