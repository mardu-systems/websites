'use client';

import NextError from 'next/error';
import { useEffect } from 'react';
import { reportError } from '@mardu/observability';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    reportError(error, 'global-error');
  }, [error]);

  return (
    <html lang="de">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
