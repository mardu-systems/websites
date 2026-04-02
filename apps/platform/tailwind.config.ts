import type { Config } from 'tailwindcss';

const config: Config = {
  // Shared workspace packages provide Tailwind utility classes that must be
  // scanned in the consuming app build, otherwise dialog/layout styles vanish.
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/**/*.{ts,tsx}',
  ],
};

export default config;
