import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { mcpPlugin } from '@payloadcms/plugin-mcp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import migrations from '@/migrations/index.ts';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import { BlogAuthors } from '@/collections/blog-authors.ts';
import { BlogCategories } from '@/collections/blog-categories.ts';
import { BlogPosts } from '@/collections/blog-posts.ts';
import { ContactLeads } from '@/collections/contact-leads.ts';
import { IntegrationCategories } from '@/collections/integration-categories.ts';
import { IntegrationProtocols } from '@/collections/integration-protocols.ts';
import { Integrations } from '@/collections/integrations.ts';
import { LegalPages } from '@/collections/legal-pages.ts';
import { Media } from '@/collections/media.ts';
import { NewsletterSubscribers } from '@/collections/newsletter-subscribers.ts';
import { PreorderRequests } from '@/collections/preorder-requests.ts';
import { RoadmapItems } from '@/collections/roadmap-items.ts';
import { Users } from '@/collections/users.ts';
import { Solutions } from '@/collections/solution.ts';
import { ProductCategories } from '@/collections/product-categories.ts';
import { ProductTechnologies } from '@/collections/product-technologies.ts';
import { ProductCarriers } from '@/collections/product-carriers.ts';
import { Products } from '@/collections/products.ts';
import { ProductVariants } from '@/collections/product-variants.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseURL =
  process.env.DATABASE_URI || 'postgres://postgres:postgres@127.0.0.1:5432/mardu_payload';

export default buildConfig({
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
    Solutions,
    ProductCategories,
    ProductTechnologies,
    ProductCarriers,
    Products,
    ProductVariants,
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
      baseDir: __dirname,
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const site = Array.isArray(data?.sites) && data.sites.length > 0 ? data.sites[0] : '';
        let frontendBaseURL = 'http://localhost:3000';

        if (process.env.NODE_ENV === 'production') {
          if (site === 'mardu-de') {
            frontendBaseURL = 'https://www.mardu.de';
          } else {
            frontendBaseURL = 'https://platform.mardu.de';
          }
        } else {
          // Local development URLs
          if (site === 'mardu-de') {
            frontendBaseURL = process.env.NEXT_PUBLIC_MARDU_DE_URL || 'http://localhost:3000';
          } else {
            frontendBaseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:4000';
          }
        }

        const slug = typeof data?.slug === 'string' ? data.slug : '';
        if (!slug) {
          return frontendBaseURL;
        }

        const collectionSlug = collectionConfig?.slug;

        if (collectionSlug === 'legal-pages') {
          return `${frontendBaseURL}/${slug}`;
        }
        if (collectionSlug === 'integrations') {
          return `${frontendBaseURL}/integrations/${slug}`;
        }
        if (collectionSlug === 'solutions') {
          return `${frontendBaseURL}/solutions/${slug}`;
        }
        if (collectionSlug === 'products') {
          return `${frontendBaseURL}/products/${slug}`;
        }
        if (collectionSlug === 'blog-posts') {
          return `${frontendBaseURL}/blog/${slug}`;
        }
        return frontendBaseURL;
      },
      collections: ['blog-posts', 'integrations', 'solutions', 'products', 'legal-pages'],
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
            'Pflege öffentlicher Roadmap-Einträge für mardu.de inklusive Drafts, Status und Zeiträumen.',
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
        solutions: {
          description: 'Redaktionelle Pflege von Solutions',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'product-categories': {
          description: 'Taxonomie fuer Produktkategorien',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'product-technologies': {
          description: 'Taxonomie fuer Produkttechnologien',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'product-carriers': {
          description: 'Taxonomie fuer Produkt-Carrier',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        products: {
          description: 'Redaktionelle Pflege von Produkten',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
        'product-variants': {
          description: 'Redaktionelle Pflege von Produktvarianten',
          enabled: {
            create: true,
            delete: true,
            find: true,
            update: true,
          },
        },
      },
    }),
    seoPlugin({
      collections: ['blog-posts', 'integrations', 'solutions', 'products'],
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
          return (doc.heroImage as any).id;
        }

        if (typeof doc?.image === 'object' && doc.image && 'id' in doc.image) {
          return (doc.image as any).id;
        }

        if (typeof doc?.logo === 'object' && doc.logo && 'id' in doc.logo) {
          return (doc.logo as any).id;
        }

        if (typeof doc?.coverImage === 'object' && doc.coverImage && 'id' in doc.coverImage) {
          return (doc.coverImage as any).id;
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

        if (typeof doc?.name === 'string') {
          return doc.name;
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

        if (
          typeof doc?.heroTitle === 'string' &&
          typeof doc?.slug === 'string' &&
          doc.slug.length > 0
        ) {
          return `${baseURL}/solutions/${doc.slug}`;
        }

        if (
          typeof doc?.availability === 'string' &&
          typeof doc?.slug === 'string' &&
          doc.slug.length > 0
        ) {
          return `${baseURL}/products/${doc.slug}`;
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
});
