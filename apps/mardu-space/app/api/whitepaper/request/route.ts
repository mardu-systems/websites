import { NextResponse } from 'next/server';
import { z } from 'zod';
import { forwardPlatformJson } from '@/lib/platform-api';

const whitepaperRequestSchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  company: z.string().trim().optional(),
  token: z.string().trim().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = whitepaperRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const response = await forwardPlatformJson('/api/newsletter', {
      ...parsed.data,
      role: 'whitepaper',
      site: 'mardu-space',
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      return NextResponse.json({ error: body?.error ?? 'Upstream request failed' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Whitepaper request error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
