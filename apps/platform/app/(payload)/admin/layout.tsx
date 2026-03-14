import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import { ProgressBar, RootProvider } from '@payloadcms/ui';
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig';
import { handleServerFunctions } from '@payloadcms/next/layouts';
import { headers } from 'next/headers';
import {
  createPayloadRequest,
  getAccessResults,
  getPayload,
  type ServerFunctionClient,
} from 'payload';
import '@payloadcms/next/css';

export const dynamic = 'force-dynamic';

const serverFunction: ServerFunctionClient = async (args) => {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const requestHeaders = await headers();
  const host =
    requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || 'localhost:3000';
  const protocol =
    requestHeaders.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
  const url = `${protocol}://${host}/admin`;

  const req = await createPayloadRequest({
    canSetHeaders: false,
    config,
    request: new Request(url, {
      headers: requestHeaders,
    }),
  });

  const permissions = req.user ? await getAccessResults({ req }) : null;

  const clientConfig = getClientConfig({
    config: payload.config,
    i18n: req.i18n,
    importMap,
    user: req.user ?? true,
  });

  const languageOptions = Object.entries(payload.config.i18n.supportedLanguages || {}).map(
    ([value, languageConfig]) => ({
      label: languageConfig.translations.general.thisLanguage,
      value,
    }),
  );

  return (
    <>
      <style>{'@layer payload-default, payload;'}</style>
      <RootProvider
        config={clientConfig}
        dateFNSKey={req.i18n.dateFNSKey}
        fallbackLang={payload.config.i18n.fallbackLanguage}
        isNavOpen
        languageCode={req.i18n.language}
        languageOptions={languageOptions as never}
        locale={req.locale ?? undefined}
        permissions={permissions as never}
        serverFunction={serverFunction}
        theme="light"
        translations={req.i18n.translations}
        user={req.user}
      >
        <div className="payload-admin-root" data-theme="light">
          <ProgressBar />
          {children}
        </div>
      </RootProvider>
      <div id="portal" />
    </>
  );
}
