import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

export function findMonorepoRoot(startDir) {
  let dir = startDir;
  while (dir !== resolve(dir, '..')) {
    if (
      existsSync(join(dir, 'turbo.json')) ||
      existsSync(join(dir, 'bun.lockb')) ||
      existsSync(join(dir, 'bun.lock'))
    ) {
      return dir;
    }
    dir = resolve(dir, '..');
  }
  // Fallback to 2 levels up
  return resolve(startDir, '..', '..');
}
