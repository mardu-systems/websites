"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { EditorialActionButton } from "@mardu/ui/components/editorial-action-button";
import type { HeaderCtaDto, MeetergoPrefillDto } from "./dto";

interface MeetergoIntegration {
  launchScheduler: (
    schedulerLink?: string,
    params?: Record<string, string>,
  ) => void;
  isReady: () => boolean;
  openModal: () => void;
  closeModal: () => void;
  setPrefill: (prefill: MeetergoPrefillDto) => void;
}

declare global {
  interface Window {
    meetergo?: MeetergoIntegration;
  }
}

const MEETERGO_SRC =
  "https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js";

function isExternalHref(href: string, external?: boolean) {
  return external ?? /^https?:\/\//i.test(href);
}

function LinkButton({
  cta,
  className,
  onNavigate,
  showArrow = false,
}: {
  cta: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
  showArrow?: boolean;
}) {
  const external = isExternalHref(cta.href, cta.external);
  if (external) {
    if (showArrow) {
      return (
        <EditorialActionButton
          render={
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
            />
          }
          className={className}
        >
          {cta.label}
        </EditorialActionButton>
      );
    }

    return (
      <Button
        render={
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
          />
        }
        className={className}
      >
        {cta.label}
      </Button>
    );
  }

  if (showArrow) {
    return (
      <EditorialActionButton
        render={<Link href={cta.href} onClick={onNavigate} />}
        className={className}
      >
        {cta.label}
      </EditorialActionButton>
    );
  }

  return (
    <Button
      render={<Link href={cta.href} onClick={onNavigate} />}
      className={className}
    >
      {cta.label}
    </Button>
  );
}

function MeetergoButton({
  cta,
  className,
  onNavigate,
  showArrow,
}: {
  cta: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
  showArrow: boolean;
}) {
  const [loading, setLoading] = React.useState(false);

  const ensureScript = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined" || window.meetergo?.isReady()) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        `script[src="${MEETERGO_SRC}"]`,
      );
      if (existingScript) {
        if (existingScript.getAttribute("data-loaded") === "true") {
          resolve();
        } else {
          existingScript.addEventListener("load", () => resolve(), {
            once: true,
          });
          existingScript.addEventListener("error", (error) => reject(error), {
            once: true,
          });
        }
        return;
      }

      const script = document.createElement("script");
      script.src = MEETERGO_SRC;
      script.async = true;
      script.setAttribute("data-loaded", "false");
      script.onload = () => {
        script.setAttribute("data-loaded", "true");
        resolve();
      };
      script.onerror = (error) => {
        script.setAttribute("data-loaded", "error");
        reject(error);
      };
      document.body.appendChild(script);
    });
  }, []);

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onNavigate?.();

      try {
        setLoading(true);
        await ensureScript();

        if (!window.meetergo) {
          await new Promise((resolve) => window.setTimeout(resolve, 100));
        }

        if (!window.meetergo) {
          console.error("Meetergo SDK not initialized");
          return;
        }

        const params: Record<string, string> = {};
        if (cta.prefill) {
          for (const [key, value] of Object.entries(cta.prefill)) {
            if (value !== undefined) params[key] = value;
          }
        }

        window.meetergo.launchScheduler(cta.href, params);
      } catch (error) {
        console.error("Failed to load Meetergo script", error);
      } finally {
        setLoading(false);
      }
    },
    [cta.href, cta.prefill, ensureScript, onNavigate],
  );

  const loadingIcon = loading ? (
    <Loader2 className="animate-spin" aria-hidden="true" />
  ) : undefined;

  return showArrow ? (
    <EditorialActionButton
      onClick={handleClick}
      className={className}
      disabled={loading}
      aria-busy={loading}
      icon={loadingIcon}
    >
      {cta.label}
    </EditorialActionButton>
  ) : (
    <Button
      onClick={handleClick}
      className={className}
      disabled={loading}
      aria-busy={loading}
    >
      {loadingIcon}
      {cta.label}
    </Button>
  );
}

export function HeaderCtaButton({
  cta,
  className,
  onNavigate,
  showArrow = false,
}: {
  cta?: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
  showArrow?: boolean;
}) {
  if (!cta) return null;

  return cta.mode === "link" ? (
    <LinkButton
      cta={cta}
      className={className}
      onNavigate={onNavigate}
      showArrow={showArrow}
    />
  ) : (
    <MeetergoButton
      cta={cta}
      className={className}
      onNavigate={onNavigate}
      showArrow={showArrow}
    />
  );
}
