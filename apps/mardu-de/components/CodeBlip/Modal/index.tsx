'use client';
import Link from 'next/link';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { cubicBezier, motion, useAnimate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { useCodeBlip } from '../CodeBlipContext';

const Modal: React.FC = ({}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dialogRef, animate] = useAnimate();
  const { closeModal, data, isOpen } = useCodeBlip();

  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  // Ignoring additional dependencies because we don't want the useEffect to rerun on every ref
  useEffect(() => {
    if (isOpen) {
      animate(dialogRef.current, { opacity: 1 }, { duration: 0.35, ease: easing });

      if (containerRef.current) {
        animate(containerRef.current, { x: 0 }, { duration: 0.35, ease: easing });
      }
      if (closeRef.current) {
        animate(closeRef.current, { transform: 'scale(1)' }, { duration: 0.15, ease: easing });
      }

      closeRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    animate(dialogRef.current, { opacity: 0 }, { duration: 0.15, ease: easing }).then(closeModal);

    if (containerRef.current) {
      animate(containerRef.current, { x: 20 });
    }
    if (closeRef.current) {
      animate(closeRef.current, { transform: 'scale(0)' });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full bg-black/50 backdrop-blur-2xl p-8 sm:p-16 overflow-auto flex items-center justify-center ${isOpen ? '' : 'pointer-events-none'}`}
      data-theme={'dark'}
      ref={dialogRef}
      style={{ opacity: 0 }}
    >
      <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <button
        autoFocus
        className="fixed right-6 top-6 sm:right-12 sm:top-12 inline-flex items-center justify-center rounded-full p-5 border border-white/40 text-white/70 transition-colors duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:text-white/90 hover:border-white/60 z-[51]"
        onClick={handleClose}
        ref={closeRef}
        style={{ transform: 'scale(0.5)' }}
      >
        <span className="sr-only">Close</span>
        <CloseIcon />
      </button>
      {data && (
        <motion.div
          className="relative w-full max-w-[720px] px-6 sm:px-12 md:px-20 text-left text-white"
          initial={{ x: 20 }}
          ref={containerRef}
        >
          <div className="mb-4 text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-white/60">
            {data.label}
          </div>
          <div className="prose prose-invert max-w-none">{data.feature}</div>
          {data.enableLink && data.link && (
            <Link
              href={data.link.href}
              target={data.link.target}
              className="mt-6 inline-flex items-center text-white/90 hover:text-white underline decoration-white/40 underline-offset-4"
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
