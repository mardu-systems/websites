'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@mardu/ui/components/accordion';
import { cn } from '@mardu/ui/lib/utils';
import React from 'react';

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

export type FaqProps = {
  items: FaqItem[];
  className?: string;
  variant?: 'default' | 'lined';
};

export default function Faq({ items, className, variant = 'default' }: FaqProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full', variant === 'default' ? 'space-y-2' : 'border-t border-black/8', className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className={cn(variant === 'lined' && 'border-b border-black/8')}
        >
          <AccordionTrigger
            className={cn(
              'text-xl font-semibold text-foreground',
              variant === 'lined' && 'py-6 tracking-[-0.02em]',
            )}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              'text-base text-muted-foreground leading-relaxed',
              variant === 'lined' && 'pb-6',
            )}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
