import { postgresAdapter } from '@payloadcms/db-postgres';
import { mcpPlugin } from '@payloadcms/plugin-mcp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import migrations from './migrations/index.ts';
import * as blogAuthorsModule from './collections/blog-authors.ts';
import * as blogCategoriesModule from './collections/blog-categories.ts';
import * as blogPostsModule from './collections/blog-posts.ts';
import * as contactLeadsModule from './collections/contact-leads.ts';
import * as integrationCategoriesModule from './collections/integration-categories.ts';
import * as integrationProtocolsModule from './collections/integration-protocols.ts';
import * as integrationsModule from './collections/integrations.ts';
import * as legalPagesModule from './collections/legal-pages.ts';
import * as mediaModule from './collections/media.ts';
import * as newsletterSubscribersModule from './collections/newsletter-subscribers.ts';
import * as preorderRequestsModule from './collections/preorder-requests.ts';
import * as roadmapItemsModule from './collections/roadmap-items.ts';
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
const LegalPages = resolveCollectionExport(legalPagesModule, 'LegalPages');
const Media = resolveCollectionExport(mediaModule, 'Media');
const NewsletterSubscribers = resolveCollectionExport(
  newsletterSubscribersModule,
  'NewsletterSubscribers',
);
const PreorderRequests = resolveCollectionExport(preorderRequestsModule, 'PreorderRequests');
const RoadmapItems = resolveCollectionExport(roadmapItemsModule, 'RoadmapItems');
const Users = resolveCollectionExport(usersModule, 'Users');

const databaseURL =
  process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/mardu_payload';

const payloadSharedConfig = {
  secret: process.env.PAYLOAD_SECRET || 'payload-dev-secret-please-change',
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
    push: false,
    migrationDir: './migrations',
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    BlogCategories,
    BlogAuthors,
    BlogPosts,
    LegalPages,
    RoadmapItems,
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
    mcpPlugin({
      collections: {
        'blog-posts': {
          description:
            'Redaktionelle Pflege von Blog-Inhalten fuer CMS-Workflows inklusive Lesen, Anlegen, Aktualisieren und Loeschen.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'blog-categories': {
          description:
            'Taxonomie fuer Blog-Posts. Ermoeglicht redaktionelle Verwaltung von Kategorien ueber MCP.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'blog-authors': {
          description:
            'Pflege von Blog-Autorenprofilen fuer redaktionelle Zuordnung und Darstellung im CMS.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        integrations: {
          description:
            'CMS-Pflege fuer Integrationen inklusive Lesen, Erstellen, Aktualisieren und Entfernen von Eintraegen.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'integration-categories': {
          description:
            'Taxonomie fuer Integrationen. Wird fuer redaktionelle Pflege und Filterlogik bereitgestellt.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'integration-protocols': {
          description:
            'Pflege von Protokoll-Taxonomien fuer Integrationen im operativen CMS-Kontext.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'legal-pages': {
          description:
            'Pflege rechtlicher Seiten wie Impressum und Datenschutz mit vollem redaktionellen CRUD-Zugriff.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'roadmap-items': {
          description:
            'Pflege öffentlicher Roadmap-Einträge für mardu.space inklusive Drafts, Status und Zeiträumen.',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        media: {
          description:
            'Lesender Zugriff auf Media-Dokumente fuer Referenzen in CMS-Workflows. Uploads und Loeschungen bleiben ausserhalb von MCP.',
          enabled: {
            find: true,
          },
        },
        'newsletter-subscribers': {
          description:
            'Operative Bearbeitung von Newsletter-Abonnenten fuer CRM-nahe Workflows ohne Loeschrechte.',
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        'contact-leads': {
          description:
            'Operative Bearbeitung von Kontaktanfragen fuer Lead- und Vertriebs-Workflows ohne Loeschrechte.',
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
        'preorder-requests': {
          description:
            'Operative Bearbeitung von Vorbestellungen fuer Pipeline- und Qualification-Workflows ohne Loeschrechte.',
          enabled: {
            create: true,
            find: true,
            update: true,
          },
        },
      },
    }),
    seoPlugin({
      collections: ['blog-posts', 'integrations'],
      generateDescription: ({ doc }) => {
        if (typeof doc?.seoDescription === 'string') {
          return doc.seoDescription;
        }

        if (typeof doc?.summary === 'string') {
          return doc.summary;
        }

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
        if (typeof doc?.seoTitle === 'string') {
          return doc.seoTitle;
        }

        if (typeof doc?.title === 'string') {
          return doc.title;
        }

        return '';
      },
      generateURL: ({ doc }) => {
        const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

        if (
          typeof doc?.canonicalUrl === 'string' &&
          doc.canonicalUrl.length > 0 &&
          (doc?.slug === 'privacy' || doc?.slug === 'publisher')
        ) {
          return doc.canonicalUrl;
        }

        if ((doc?.slug === 'privacy' || doc?.slug === 'publisher') && typeof doc?.slug === 'string') {
          return `${baseURL}/${doc.slug}`;
        }

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
