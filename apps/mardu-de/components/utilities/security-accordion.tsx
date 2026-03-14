import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AccordionData = {
  id: string;
  title: string;
  content: string | ReactNode;
};

interface SecurityAccordionProps {
  title: string;
  items: AccordionData[];
  className?: string;
}

export default function SecurityAccordion({ title, items, className }: SecurityAccordionProps) {
  return (
    <section
      className={cn('bg-background py-20 px-6 md:px-8 w-full', className)}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">{title}</h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-xl font-semibold text-foreground text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
