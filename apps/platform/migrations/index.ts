import * as migration_20260302_230205_init_blog_schema from './20260302_230205_init_blog_schema';
import * as migration_20260401_anti_spam_guards from './20260401_anti_spam_guards';

export const migrations = [
  {
    up: migration_20260302_230205_init_blog_schema.up,
    down: migration_20260302_230205_init_blog_schema.down,
    name: '20260302_230205_init_blog_schema'
  },
  {
    up: migration_20260401_anti_spam_guards.up,
    down: migration_20260401_anti_spam_guards.down,
    name: '20260401_anti_spam_guards'
  },
];
