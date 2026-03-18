import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import { RootLayout, type ServerFunctionClient } from '@payloadcms/next/layouts';
import { handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';

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
