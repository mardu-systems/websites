import { postgresAdapter } from '@payloadcms/db-postgres';
import { mcpPlugin } from '@payloadcms/plugin-mcp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import * as blogAuthorsModule from './collections/blog-authors.ts';
import * as blogCategoriesModule from './collections/blog-categories.ts';
import * as blogPostsModule from './collections/blog-posts.ts';
import * as contactLeadsModule from './collections/contact-leads.ts';
import * as integrationCategoriesModule from './collections/integration-categories.ts';
import * as integrationProtocolsModule from './collections/integration-protocols.ts';
import * as integrationsModule from './collections/integrations.ts';
import * as mediaModule from './collections/media.ts';
import * as newsletterSubscribersModule from './collections/newsletter-subscribers.ts';
import * as preorderRequestsModule from './collections/preorder-requests.ts';
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

const BlogAuthors = resolveCollectionExport(blogAuthorsModule, 'BlogAuthors');
const BlogCategories = resolveCollectionExport(blogCategoriesModule, 'BlogCategories');
const BlogPosts = resolveCollectionExport(blogPostsModule, 'BlogPosts');
const ContactLeads = resolveCollectionExport(contactLeadsModule, 'ContactLeads');
const IntegrationCategories = resolveCollectionExport(
  integrationCategoriesModule,
  'IntegrationCategories',
);
const IntegrationProtocols = resolveCollectionExport(
  integrationProtocolsModule,
  'IntegrationProtocols',
);
const Integrations = resolveCollectionExport(integrationsModule, 'Integrations');
const Media = resolveCollectionExport(mediaModule, 'Media');
const NewsletterSubscribers = resolveCollectionExport(
  newsletterSubscribersModule,
  'NewsletterSubscribers',
);
const PreorderRequests = resolveCollectionExport(preorderRequestsModule, 'PreorderRequests');
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
  collections: [
    Users,
    Media,
    BlogCategories,
    BlogAuthors,
    BlogPosts,
    IntegrationCategories,
    IntegrationProtocols,
    Integrations,
    NewsletterSubscribers,
    ContactLeads,
    PreorderRequests,
  ],
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
  plugins: [
    // vercelBlobStorage({
    //   token: process.env.BLOB_READ_WRITE_TOKEN,
    //   collections: {
    //     media: true,
    //   },
    // }),
    mcpPlugin({
      collections: {
        'blog-posts': {
          enabled: true,
        },
        integrations: {
          enabled: true,
        },
      },
    }),
    seoPlugin({
      collections: ['blog-posts', 'integrations'],
      generateDescription: ({ doc }) => {
        if (typeof doc?.shortDescription === 'string') {
          return doc.shortDescription;
        }

        if (typeof doc?.excerpt === 'string') {
          return doc.excerpt;
        }

        return '';
      },
      generateImage: ({ doc }) => {
        if (typeof doc?.heroImage === 'object' && doc.heroImage && 'id' in doc.heroImage) {
          return doc.heroImage.id;
        }

        if (typeof doc?.logo === 'object' && doc.logo && 'id' in doc.logo) {
          return doc.logo.id;
        }

        if (typeof doc?.coverImage === 'object' && doc.coverImage && 'id' in doc.coverImage) {
          return doc.coverImage.id;
        }

        return '';
      },
      generateTitle: ({ doc }) => {
        if (typeof doc?.title === 'string') {
          return doc.title;
        }

        return '';
      },
      generateURL: ({ doc }) => {
        const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

        if (
          typeof doc?.availabilityStatus === 'string' &&
          typeof doc?.slug === 'string' &&
          doc.slug.length > 0
        ) {
          return `${baseURL}/integrations/${doc.slug}`;
        }

        if (typeof doc?.slug === 'string' && doc.slug.length > 0) {
          return `${baseURL}/blog/${doc.slug}`;
        }

        return `${baseURL}/blog`;
      },
      tabbedUI: true,
      uploadsCollection: 'media',
    }),
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'development' && process.env.OIDC_DEBUG === 'true') {
      console.info(
        '[OIDC][payload:onInit:authStrategies]',
        payload.authStrategies.map((s) => s.name),
      );
    }
  },
};

export default payloadSharedConfig;
