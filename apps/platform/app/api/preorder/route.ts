import { NextResponse } from 'next/server';
import { preorderRequestSchema, readRequestJson } from '@mardu/lead-core';
import { createOrUpdatePreorderRequest, setPreorderEmailDeliveryStatus } from '@/lib/preorder';
import { renderEmailLayout, sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const jsonResult = await readRequestJson(req);
  if (!jsonResult.success) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = preorderRequestSchema.safeParse(jsonResult.data);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const requestRecord = await createOrUpdatePreorderRequest(parsed.data);

  try {
    await sendEmail({
      subject: 'Neue Preorder-Anfrage',
      text: `Site: ${parsed.data.site}\nEmail: ${parsed.data.email}`,
      html: renderEmailLayout(
        parsed.data.site,
        'Neue Preorder-Anfrage',
        `<p><strong>${parsed.data.email}</strong> m&ouml;chte vorbestellen.</p><p>Site: ${parsed.data.site}</p>`,
      ),
    });
    await setPreorderEmailDeliveryStatus((requestRecord as { id: string | number }).id, 'sent');
  } catch (err) {
    console.error('Failed to send preorder email', err);
    await setPreorderEmailDeliveryStatus((requestRecord as { id: string | number }).id, 'failed');
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
