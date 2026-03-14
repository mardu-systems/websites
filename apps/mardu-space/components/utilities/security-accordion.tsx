import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Overline } from '@/components/ui/typography';

export type AccordionData = {
  id: string;
  title: string;
  content: string | ReactNode;
};

interface SecurityAccordionProps {
  title: string;
  eyebrow?: string;
  items: AccordionData[];
  className?: string;
}

export default function SecurityAccordion({
  title,
  eyebrow,
  items,
  className,
}: SecurityAccordionProps) {
  return (
    <section className={cn('w-full bg-background py-20 md:py-24', className)}>
      <div className="mardu-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        <h2 className="headline-balance mb-12 max-w-4xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full border-t border-black/8">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-black/8">
              <AccordionTrigger className="py-6 text-left text-xl font-semibold tracking-[-0.02em] text-foreground">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-foreground/72">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
