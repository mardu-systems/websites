'use client';

import * as React from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export interface RecaptchaProviderProps {
  children: React.ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

const isDev = process.env.NODE_ENV === 'development';

export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return React.useCallback(
    async (action: string) => {
      if (isDev) return 'recaptcha-disabled';
      if (!executeRecaptcha) return null;
      return await executeRecaptcha(action);
    },
    [executeRecaptcha],
  );
}
