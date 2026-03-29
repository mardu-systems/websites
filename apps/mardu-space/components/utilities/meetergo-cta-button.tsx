'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, buttonVariants } from '@mardu/ui/components/button';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@mardu/ui/lib/utils';

// Types extracted from meetergo-integration definitions
export interface MeetergoPrefill {
  firstname?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  timezone?: string;
  locale?: string;
  [key: string]: string | undefined;
}

interface MeetergoIntegration {
  launchScheduler: (schedulerLink?: string, params?: Record<string, string>) => void;
  isReady: () => boolean;
  openModal: () => void;
  closeModal: () => void;
  setPrefill: (prefill: MeetergoPrefill) => void;
}

declare global {
  interface Window {
    meetergo?: MeetergoIntegration;
  }
}

export interface MeetergoCTAButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  link?: string;
  prefill?: MeetergoPrefill;
}

export function MeetergoCTAButton({
  className,
  children,
  onClick,
  link = 'https://cal.meetergo.com/infomardu/30-min-meeting-or-info',
  prefill,
  size = 'default',
  variant = 'default',
  ...props
}: MeetergoCTAButtonProps) {
  const SRC = 'https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js';
  const [loading, setLoading] = React.useState(false);

  const ensureScript = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      if (window.meetergo?.isReady()) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${SRC}"]`);
      if (existingScript) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve();
        } else {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', (e) => reject(e));
        }
        return;
      }

      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.setAttribute('data-loaded', 'false');
      s.onload = () => {
        s.setAttribute('data-loaded', 'true');
        resolve();
      };
      s.onerror = (e) => {
        s.setAttribute('data-loaded', 'error');
        reject(e);
      };
      document.body.appendChild(s);
    });
  }, []);

  const handleClick = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      e.preventDefault();
      e.stopPropagation();

      try {
        setLoading(true);
        await ensureScript();

        // Small delay to ensure initialization if script just loaded
        if (!window.meetergo) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (window.meetergo) {
          // Convert prefill to Record<string, string> as required by launchScheduler params
          const params: Record<string, string> = {};
          if (prefill) {
            Object.entries(prefill).forEach(([key, value]) => {
              if (value !== undefined) {
                params[key] = value;
              }
            });
          }

          window.meetergo.launchScheduler(link, params);
        } else {
          console.error('Meetergo SDK not initialized');
        }
      } catch (err) {
        console.error('Failed to load Meetergo script', err);
      } finally {
        setLoading(false);
      }
    },
    [ensureScript, link, prefill, onClick],
  );

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'mt-3 w-full touch-manipulation sm:ml-4 sm:mt-0 sm:w-auto',
        className,
      )}
      size={size}
      variant={variant}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
      {children || 'Demo Vereinbaren'}
    </Button>
  );
}
