"use client";

import * as React from "react";

export function useScrolledPast(px: number) {
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      setPast(window.scrollY >= px);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [px]);

  return past;
}

export function useMeasuredHeaderHeight(
  headerRef: React.RefObject<HTMLElement | null>,
  fallback = 72,
) {
  const [height, setHeight] = React.useState(fallback);

  React.useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const measure = () => setHeight(element.getBoundingClientRect().height);
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [headerRef]);

  return height;
}

export function useMobileMenuFocusTrap(
  open: boolean,
  headerRef: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const header = headerRef.current;
      if (!header) return;

      const focusableElements = Array.from(
        header.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      const activeElement = document.activeElement;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [headerRef, onClose, open]);
}
