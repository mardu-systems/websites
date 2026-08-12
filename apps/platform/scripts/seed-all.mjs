import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../payload.config.ts';
import { getPayload } from 'payload';

if (process.env.VERCEL_ENV === 'production') {
  console.error('seed:all is permanently disabled in the Vercel production environment.');
  process.exit(1);
}

if (process.env.ALLOW_FIXTURE_SEED !== 'true') {
  console.error(
    'Refusing to run seed:all without ALLOW_FIXTURE_SEED=true. This command creates demo users, leads, subscribers and preorders and is restricted to isolated development or CI databases.',
  );
  process.exit(1);
}

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const scripts = [
  'seed-legal-pages.mjs',
  'seed-integrations.mjs',
  'seed-roadmap-items.mjs',
  'seed-solutions.mjs',
  'seed-catalog.mjs',
];

async function runScriptsSequentially() {
  console.info('==================================================');
  console.info('Starting Sequential Payload CMS Seeding...');
  console.info('==================================================');

  for (const script of scripts) {
    const scriptPath = join(CURRENT_DIR, script);
    console.info(`\nRunning script: ${script}...`);
    try {
      // Run the script with node and tsx import for seamless TS/ESM resolution
      execSync(`node --import tsx ${scriptPath}`, {
        stdio: 'inherit',
        cwd: join(CURRENT_DIR, '..'), // Run with CWD set to apps/platform to resolve aliases correctly
        env: { ...process.env, NODE_ENV: 'development' },
      });
      console.info(`✓ ${script} completed successfully.`);
    } catch (error) {
      console.error(`✗ ${script} failed with error.`);
      throw error;
    }
  }

  console.info('\n==================================================');
  console.info('Individual seeders completed. Seeding remaining CRM collections...');
  console.info('==================================================');

  const payload = await getPayload({ config });

  // 1. Seed Admin User if not exists
  console.info('\nSeeding Admin User...');
  const existingUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@mardu.de',
      },
    },
    limit: 1,
    pagination: false,
    overrideAccess: true,
  });

  if (!existingUser.docs[0]) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@mardu.de',
        password: 'admin12345',
        role: 'admin',
      },
      overrideAccess: true,
    });
    console.info('✓ Admin User (admin@mardu.de) created.');
  } else {
    console.info('• Admin User (admin@mardu.de) already exists.');
  }

  // 2. Seed Contact Leads
  console.info('\nSeeding B2B Contact Leads...');
  const leads = [
    {
      name: 'Max Mustermann',
      email: 'max@makerspace-hamburg.de',
      message:
        'Wir planen die Eröffnung eines Makerspaces mit 80 Mitgliedern und wollen 5 Maschinen und 3 Türen absichern. Bitte um Beratung bezüglich der Steuerungseinheiten und Schließzylinder.',
      site: 'mardu-de',
      company: 'Makerspace Hamburg eV',
      phone: '+49 40 1234567',
    },
    {
      name: 'Dr. Angelika Weber',
      email: 'a.weber@tum-labore.de',
      message:
        'Für unser Universitätslabor für chemische Analytik suchen wir eine digitale Zutrittskontrolle zur Steuerung von Gefahrstoffschränken und Laborzugängen. Das System muss OIDC-kompatibel sein.',
      site: 'mardu-de',
      company: 'TU München - Lehrstuhl für Analytik',
      phone: '+49 89 9876543',
    },
  ];

  for (const lead of leads) {
    const existing = await payload.find({
      collection: 'contact-leads',
      where: {
        email: {
          equals: lead.email,
        },
      },
      limit: 1,
      pagination: false,
      overrideAccess: true,
    });

    if (!existing.docs[0]) {
      await payload.create({
        collection: 'contact-leads',
        data: {
          ...lead,
          _status: 'published',
        },
        overrideAccess: true,
      });
      console.info(`✓ Contact lead created for: ${lead.email}`);
    } else {
      console.info(`• Contact lead already exists for: ${lead.email}`);
    }
  }

  // 3. Seed Newsletter Subscribers
  console.info('\nSeeding Newsletter Subscribers...');
  const subscribers = [
    {
      email: 'newsletter-demo@mardu.de',
      site: 'mardu-de',
      role: 'newsletter',
      status: 'confirmed',
      firstName: 'Anna',
      lastName: 'Schmidt',
      company: 'Hochschule Berlin',
      subscriptionKey: 'mardu-de:newsletter-demo@mardu.de:newsletter',
      consentModel: 'double-opt-in',
      confirmedAt: new Date().toISOString(),
    },
    {
      email: 'ot-security@industry-safety.de',
      site: 'mardu-de',
      role: 'newsletter',
      status: 'pending',
      firstName: 'Frank',
      lastName: 'Meyer',
      company: 'Meyer Industrieanlagen',
      subscriptionKey: 'mardu-de:ot-security@industry-safety.de:newsletter',
      consentModel: 'double-opt-in',
    },
  ];

  for (const sub of subscribers) {
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        subscriptionKey: {
          equals: sub.subscriptionKey,
        },
      },
      limit: 1,
      pagination: false,
      overrideAccess: true,
    });

    if (!existing.docs[0]) {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: sub,
        overrideAccess: true,
      });
      console.info(`✓ Newsletter subscriber created for: ${sub.email}`);
    } else {
      console.info(`• Newsletter subscriber already exists for: ${sub.email}`);
    }
  }

  // 4. Seed Preorder Requests
  console.info('\nSeeding Preorder Requests...');
  const preorders = [
    {
      site: 'mardu-de',
      email: 'a.schmidt@hs-berlin.de',
      status: 'received',
      emailDeliveryStatus: 'pending',
    },
  ];

  for (const preorder of preorders) {
    const existing = await payload.find({
      collection: 'preorder-requests',
      where: {
        and: [
          {
            site: {
              equals: preorder.site,
            },
          },
          {
            email: {
              equals: preorder.email,
            },
          },
        ],
      },
      limit: 1,
      pagination: false,
      overrideAccess: true,
    });

    if (!existing.docs[0]) {
      await payload.create({
        collection: 'preorder-requests',
        data: preorder,
        overrideAccess: true,
      });
      console.info(`✓ Preorder request created for: ${preorder.email}`);
    } else {
      console.info(`• Preorder request already exists for: ${preorder.email}`);
    }
  }

  console.info('\n==================================================');
  console.info('✓ ✓ ALL 19 collections successfully seeded!');
  console.info('==================================================');
}

runScriptsSequentially()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('✗ Master seeding script failed:', error);
    process.exit(1);
  });
