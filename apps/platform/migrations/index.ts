import * as migration_20260302_230205_init_blog_schema from './20260302_230205_init_blog_schema';
import * as migration_20260401_anti_spam_guards from './20260401_anti_spam_guards';
import * as migration_20260402_191500_add_mcp_plugin_schema from './20260402_191500_add_mcp_plugin_schema';

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
  {
    up: migration_20260402_191500_add_mcp_plugin_schema.up,
    down: migration_20260402_191500_add_mcp_plugin_schema.down,
    name: '20260402_191500_add_mcp_plugin_schema'
  },
];
