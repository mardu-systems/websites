import { NextRequest, NextResponse } from 'next/server';
import { verifyNewsletterToken } from '@mardu/lead-core';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  // 1. Verify Token
  const payload = verifyNewsletterToken(token, 'mardu-space');
  
  if (!payload || payload.purpose !== 'whitepaper-download' || payload.site !== 'mardu-space') {
    console.error('Download failed: Invalid token or purpose.', { token, payload });
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }

  // 2. Locate File
  const filePath = path.join(process.cwd(), 'assets/secure/whitepaper_v1.0.pdf');

  if (!fs.existsSync(filePath)) {
    console.error('Download failed: File not found at', filePath);
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir)) {
      console.error(`Contents of ${dir}:`, fs.readdirSync(dir));
    } else {
      console.error(`Directory ${dir} does not exist. CWD is ${process.cwd()}`);
      const assetsDir = path.join(process.cwd(), 'assets');
      if (fs.existsSync(assetsDir)) {
        console.error(`'assets' dir exists. Contents:`, fs.readdirSync(assetsDir));
      } else {
        console.error(`'assets' dir MISSING in root.`);
      }
    }
    return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      "Content-Disposition": 'attachment; filename="Mardu_space_Whitepaper_2026_v1.0.pdf"',
    },
  });
}
