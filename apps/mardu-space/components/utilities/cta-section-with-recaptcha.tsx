'use client';

import { useRecaptcha } from '@/lib/recaptcha';
import {
  CTASection,
  type CTASectionNewsletterDialogProps,
  type CTASectionProps,
} from '@mardu/sections';

type CTASectionWithRecaptchaProps = Omit<CTASectionProps, 'newsletterDialog'> & {
  newsletterDialog?: Omit<CTASectionNewsletterDialogProps, 'getRequestToken'>;
};

export default function CTASectionWithRecaptcha({
  newsletterDialog,
  ...props
}: CTASectionWithRecaptchaProps) {
  const executeRecaptcha = useRecaptcha();

  return (
    <CTASection
      {...props}
      newsletterDialog={{ ...newsletterDialog, getRequestToken: executeRecaptcha }}
    />
  );
}
