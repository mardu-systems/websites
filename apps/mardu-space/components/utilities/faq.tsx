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
};

export default function Faq({ items, className }: FaqProps) {
  return (
    <Accordion type="single" collapsible className={cn('w-full border-t border-black/8', className)}>
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-b border-black/8">
          <AccordionTrigger className="py-6 text-xl font-semibold tracking-[-0.02em] text-foreground">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-foreground/72">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
