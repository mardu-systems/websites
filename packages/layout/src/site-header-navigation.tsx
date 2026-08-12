"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@mardu/ui/lib/utils";
import type { HeaderNavLinkDto } from "./dto";

function useAnchorNavigation() {
  const pathname = usePathname();

  return React.useCallback(
    (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        !href.startsWith("#") ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        pathname !== "/"
      ) {
        return false;
      }

      event.preventDefault();
      const id = href.slice(1);
      const behavior: ScrollBehavior = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "auto"
        : "smooth";

      window.setTimeout(() => {
        const element = document.getElementById(id);
        if (!element) return;

        element.scrollIntoView({ behavior, block: "start" });
        const hash = `#${id}`;
        if (window.location.hash !== hash)
          window.history.pushState(null, "", hash);
      }, 100);

      return true;
    },
    [pathname],
  );
}

export function HeaderNavLink({
  item,
  className,
  onNavigate,
  variant = "default",
}: {
  item: HeaderNavLinkDto;
  className?: string;
  onNavigate?: () => void;
  variant?: "default" | "editorial-index";
}) {
  const pathname = usePathname();
  const handleAnchorNavigation = useAnchorNavigation();
  const href =
    item.href.startsWith("#") && pathname !== "/" ? `/${item.href}` : item.href;
  const isCurrentRoute =
    !item.href.startsWith("#") && pathname?.startsWith(item.href);

  if (variant === "editorial-index") {
    return (
      <Link
        href={href}
        aria-current={isCurrentRoute ? "page" : undefined}
        onClick={(event) => {
          handleAnchorNavigation(item.href, event);
          onNavigate?.();
        }}
        className={cn(
          "group flex min-h-11 min-w-0 flex-col justify-center text-left text-foreground transition-colors hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple",
          isCurrentRoute && "text-mardu-purple",
          className,
        )}
      >
        <span data-nav-copy className="flex min-w-0 flex-col">
          {item.index ? (
            <span className="text-[0.6875rem] leading-none text-mardu-purple">
              [{item.index}
            </span>
          ) : null}
          <span
            data-label
            className="mt-1 truncate text-[0.8125rem] font-normal uppercase leading-none tracking-[0.02em]"
          >
            {item.label}]
          </span>
          {item.description ? (
            <span
              data-description
              className="mt-1 whitespace-pre-line text-[0.6875rem] leading-[1.35] text-foreground/55 group-hover:text-mardu-purple/80"
            >
              {item.description}
            </span>
          ) : null}
        </span>
        <span
          data-nav-arrow
          className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isCurrentRoute ? "page" : undefined}
      onClick={(event) => {
        handleAnchorNavigation(item.href, event);
        onNavigate?.();
      }}
      className={cn(
        "text-sm uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-foreground",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}

export function MobileMenuTriggerIcon({
  iconSrc,
  closeIconSrc,
  open,
  fallbackClassName = "size-5",
}: {
  iconSrc?: string;
  closeIconSrc?: string;
  open: boolean;
  fallbackClassName?: string;
}) {
  if (!iconSrc) {
    return (
      <span
        className={cn("relative block size-5 shrink-0", fallbackClassName)}
        aria-hidden="true"
      >
        <Menu
          className={cn(
            "absolute inset-0 size-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
          strokeWidth={1.8}
        />
        <X
          className={cn(
            "absolute inset-0 size-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
          strokeWidth={1.8}
        />
      </span>
    );
  }

  if (closeIconSrc) {
    return (
      <span
        className="relative block size-5 shrink-0 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={iconSrc}
          alt=""
          fill
          sizes="20px"
          className={cn(
            "object-contain transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        />
        <Image
          src={closeIconSrc}
          alt=""
          fill
          sizes="20px"
          className={cn(
            "object-contain transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
          )}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative block size-5 shrink-0 overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        open && "rotate-90",
      )}
      aria-hidden="true"
    >
      <Image
        src={iconSrc}
        alt=""
        fill
        sizes="20px"
        className="object-contain"
      />
    </span>
  );
}

export function MobileMenuTriggerLabel({ open }: { open: boolean }) {
  return (
    <span
      className="inline-grid h-5 overflow-hidden text-left leading-5"
      aria-hidden="true"
    >
      <span
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        Menü
      </span>
      <span
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
        )}
      >
        Schließen
      </span>
    </span>
  );
}
