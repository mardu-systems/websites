import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import * as usersModule from './collections/users.ts';

const resolveCollectionExport = (module, exportName) => {
  if (module && typeof module === 'object') {
    if (exportName in module) {
      return module[exportName];
    }

    if (module.default && typeof module.default === 'object' && exportName in module.default) {
      return module.default[exportName];
    }

    if (module.default) {
      return module.default;
    }
  }

  throw new Error(`Missing collection export "${exportName}" in payload shared config.`);
};

const Users = resolveCollectionExport(usersModule, 'Users');

const databaseURL =
  process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/mardu_payload';

const payloadSharedConfig = {
  secret: process.env.PAYLOAD_SECRET || 'payload-dev-secret-please-change',
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
  }),
  editor: lexicalEditor(),
  collections: [Users],
  admin: {
    user: Users.slug,
    theme: 'light',
    components: {
      graphics: {
        Logo: '/components/payload/admin-login-logo.tsx#AdminLoginLogo',
      },
      logout: {
        Button: '/components/payload/admin-sso-logout-button.tsx#AdminSSOLogoutButton',
      },
      settingsMenu: ['/components/payload/admin-auth-status.tsx#AdminAuthStatus'],
    },
    importMap: {
      baseDir: process.cwd(),
    },
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'development' && process.env.OIDC_DEBUG === 'true') {
      console.info('[OIDC][payload:onInit:authStrategies]', payload.authStrategies.map((s) => s.name));
    }
  },
};

export default payloadSharedConfig;
