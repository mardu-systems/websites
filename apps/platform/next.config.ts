import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
import { fileURLToPath } from 'node:url';

const workspaceRoot = fileURLToPath(new URL('../../', import.meta.url));
const nextConfig: NextConfig = {
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
  outputFileTracingIncludes: {
    '/**/*': ['./migrations/**/*'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'platform.mardu.de',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mardu.de',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'mardu.de',
        pathname: '/api/media/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
