import { getSiteFeatureFlags } from '@mardu/site-config/feature-flags.server';
import { buildLlmsText } from '@/lib/llms';

export const dynamic = 'force-dynamic';

export async function GET() {
  const features = await getSiteFeatureFlags('mardu-de');

  return new Response(buildLlmsText(features), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
