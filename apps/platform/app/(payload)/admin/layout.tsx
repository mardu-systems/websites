import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import '@payloadcms/next/css';
import { RootLayout } from '@payloadcms/next/layouts';
import { handleServerFunctions } from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';
import React from 'react';

export const dynamic = 'force-dynamic';

const serverFunction: ServerFunctionClient = async (args: Parameters<ServerFunctionClient>[0]) => {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={Promise.resolve(config)}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
