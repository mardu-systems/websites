'use client';
import Link from 'next/link';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { cubicBezier, motion, useAnimate, useReducedMotion } from 'framer-motion';
import React, { useEffect, useId, useRef } from 'react';

import { useCodeBlip } from '../CodeBlipContext';

const Modal: React.FC = ({}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const [dialogRef, animate] = useAnimate<HTMLDivElement>();
  const { closeModal, data, isOpen } = useCodeBlip();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

  const easing = cubicBezier(0.165, 0.84, 0.44, 1);
  const openDuration = shouldReduceMotion ? 0 : 0.35;
  const closeDuration = shouldReduceMotion ? 0 : 0.15;
  const scaleDuration = shouldReduceMotion ? 0 : 0.15;

  const handleClose = React.useCallback(() => {
    const overlay = dialogRef.current;
    const closeAnimation = overlay
      ? animate(overlay, { opacity: 0 }, { duration: closeDuration, ease: easing })
      : Promise.resolve();

    if (containerRef.current) {
      animate(
        containerRef.current,
        { x: shouldReduceMotion ? 0 : 20 },
        { duration: closeDuration, ease: easing },
      );
    }
    if (closeRef.current) {
      animate(closeRef.current, { transform: 'scale(0)' }, { duration: scaleDuration, ease: easing });
    }

    closeAnimation.then(closeModal);
  }, [animate, closeDuration, closeModal, dialogRef, easing, scaleDuration, shouldReduceMotion]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      previouslyFocusedRef.current =
        typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;

      animate(dialogRef.current, { opacity: 1 }, { duration: openDuration, ease: easing });

      if (containerRef.current) {
        animate(containerRef.current, { x: 0 }, { duration: openDuration, ease: easing });
      }
      if (closeRef.current) {
        animate(closeRef.current, { transform: 'scale(1)' }, { duration: scaleDuration, ease: easing });
      }

      closeRef.current?.focus();
    }
  }, [animate, dialogRef, easing, isOpen, openDuration, scaleDuration]);

  useEffect(() => {
    if (isOpen) return;
    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    previouslyFocusedRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (!active || !root.contains(active)) {
          event.preventDefault();
          first.focus();
          return;
        }
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, isOpen]);

  return (
    <div
      id="codeblip-modal"
      className={`fixed inset-0 z-50 w-full h-full bg-black/50 backdrop-blur-2xl p-8 sm:p-16 overflow-auto overscroll-contain flex items-center justify-center ${isOpen ? '' : 'pointer-events-none'}`}
      data-theme={'dark'}
      ref={dialogRef}
      style={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-hidden={isOpen ? undefined : true}
      aria-labelledby={data ? titleId : undefined}
    >
      <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <button
        type="button"
        className="fixed right-6 top-6 sm:right-12 sm:top-12 inline-flex items-center justify-center rounded-full p-5 border border-white/40 text-white/70 transition-colors duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:text-white/90 hover:border-white/60 z-[51] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
        onClick={handleClose}
        ref={closeRef}
        style={shouldReduceMotion ? undefined : { transform: 'scale(0.5)' }}
      >
        <span className="sr-only">Schließen</span>
        <span aria-hidden="true">
          <CloseIcon />
        </span>
      </button>
      {data && (
        <motion.div
          className="relative w-full max-w-[720px] px-6 sm:px-12 md:px-20 text-left text-white"
          initial={{ x: shouldReduceMotion ? 0 : 20 }}
          ref={containerRef}
        >
          <h2
            id={titleId}
            className="mb-4 text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-white/60"
          >
            {data.label}
          </h2>
          <div className="prose prose-invert max-w-none">{data.feature}</div>
          {data.enableLink && data.link && (
            <Link
              href={data.link.href}
              target={data.link.target}
              className="mt-6 inline-flex items-center text-white/90 hover:text-white underline decoration-white/40 underline-offset-4 touch-manipulation"
            >
              {data.link.label}
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Modal;
