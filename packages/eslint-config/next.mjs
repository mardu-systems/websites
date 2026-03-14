import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export function createNextConfig(extraIgnores = []) {
  return defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      ...extraIgnores,
    ]),
  ]);
}

export default createNextConfig;
