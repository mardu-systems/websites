import { getPayload } from 'payload';

const MIN_PASSWORD_LENGTH = 16;

const readEnv = (name) => process.env[name]?.trim() ?? '';

const fail = (message) => {
  console.error(`[admin:reset-password] ${message}`);
  process.exit(1);
};

const validateEmail = (email) => {
  if (!email || !email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
    fail('ADMIN_EMAIL must be a valid email address.');
  }
};

const validatePassword = (password) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    fail(`ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }
};

const formatErrorMessage = (error) => {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('payload_locked_documents_rels')) {
    return `${message}

The database schema does not match the current Payload config. Run pending Payload migrations against the target DATABASE_URI before retrying.`;
  }

  return message;
};

const run = async () => {
  const email = readEnv('ADMIN_EMAIL').toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? '';
  const confirm = readEnv('ADMIN_PASSWORD_RESET_CONFIRM');
  const createIfMissing = readEnv('ADMIN_CREATE_IF_MISSING') === 'true';

  if (confirm !== 'true') {
    fail('Refusing to run without ADMIN_PASSWORD_RESET_CONFIRM=true.');
  }

  validateEmail(email);
  validatePassword(password);

  const { default: config } = await import('../payload.config.ts');
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    overrideLock: true,
  });

  const user = existing.docs[0];

  if (!user && !createIfMissing) {
    fail('Admin user not found. Set ADMIN_CREATE_IF_MISSING=true to create it explicitly.');
  }

  if (user) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password,
      },
      overrideAccess: true,
      overrideLock: true,
    });

    console.info(`[admin:reset-password] Updated password for ${email}.`);
    return;
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
    overrideAccess: true,
    overrideLock: true,
  });

  console.info(`[admin:reset-password] Created admin user ${email}.`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[admin:reset-password] Failed.');
    console.error(formatErrorMessage(error));
    process.exit(1);
  });
