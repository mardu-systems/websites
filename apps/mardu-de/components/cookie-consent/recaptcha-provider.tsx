import { type ReactNode } from 'react';

// reCAPTCHA disabled: Google reCAPTCHA removed entirely
export default function RecaptchaProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
