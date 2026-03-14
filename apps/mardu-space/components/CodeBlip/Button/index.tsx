'use client';
import { Plus } from 'lucide-react';
import React from 'react';

import type { CodeBlip } from '../types';

import { useCodeBlip } from '../CodeBlipContext';

const CodeBlipButton: React.FC<{ blip: CodeBlip; delay?: number; index?: number }> = ({
  blip,
  delay: delayFromProps = 500,
  index = 1,
}) => {
  const { isOpen, openModal } = useCodeBlip();
  const label = `Info zu ${blip.label}`;
  const delay = (delayFromProps * index) / 1000;

  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="codeblip-modal"
      aria-hidden={isOpen ? true : undefined}
      aria-disabled={isOpen}
      disabled={isOpen}
      onClick={() => openModal(blip)}
      className={[
        'relative inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full p-3',
        'transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
        'motion-reduce:transition-none',
        'opacity-100 scale-100 active:scale-95',
        isOpen ? 'pointer-events-none opacity-0 scale-0' : '',
        'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      ].join(' ')}
    >
      <span
        className="absolute inset-0 rounded-full bg-foreground/20 opacity-30 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none group-hover:scale-110 group-hover:opacity-40 group-focus-visible:scale-110 group-focus-visible:opacity-40"
        style={{ transitionDelay: `${delay}s` }}
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 rounded-full bg-foreground/10 opacity-20 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none group-hover:scale-105 group-hover:opacity-30 group-focus-visible:scale-105 group-focus-visible:opacity-30"
        style={{ transitionDelay: `${delay + 0.1}s` }}
        aria-hidden="true"
      />

      <span className="relative z-10 inline-flex items-center justify-center rounded-full border border-border bg-background p-2 shadow-lg">
        <Plus className="size-[0.7rem]" aria-hidden="true" />
      </span>
    </button>
  );
};

export default CodeBlipButton;
