'use client';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import type { CodeBlip } from '../types';

import { useCodeBlip } from '../CodeBlipContext';

const CodeBlipButton: React.FC<{ blip: CodeBlip; delay?: number; index?: number }> = ({
  blip,
  delay: delayFromProps = 500,
  index = 1,
}) => {
  const { isOpen, openModal } = useCodeBlip();

  const delay = (delayFromProps * index) / 1000; // seconds for framer-motion

  return (
    <motion.button
      aria-pressed={isOpen}
      onClick={() => openModal(blip)}
      className={[
        'relative inline-flex items-center justify-center rounded-full p-3',
        'transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
        'opacity-100 scale-100',
        isOpen ? 'pointer-events-none opacity-0 scale-0' : '',
        'group',
      ].join(' ')}
      whileTap={{ scale: 0.95 }}
    >
      <span className="sr-only">Code feature</span>

      {/* Pulsing shadows */}
      <motion.span
        className="absolute inset-0 rounded-full bg-foreground/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-foreground/10"
        animate={{
          scale: [1.05, 1.15, 1.05],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
      />

      {/* Central button with icon */}
      <span className="relative z-10 inline-flex items-center justify-center rounded-full border border-border bg-background p-2 shadow-lg">
        <Plus className="size-[0.7rem]" />
      </span>
    </motion.button>
  );
};

export default CodeBlipButton;
