import { getPlatformOrigin } from '@mardu/site-config';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mardu Platform Admin',
};

export default async function AdminRootPage() {
  redirect(new URL('/admin', getPlatformOrigin()).toString());
}
