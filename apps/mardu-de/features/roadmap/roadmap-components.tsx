import type { RoadmapItemDto, RoadmapStatus } from '@mardu/content-core';
import { ArrowRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@mardu/ui/components/dialog';
import { cn } from '@mardu/ui/lib/utils';
import SiteContactForm from '@/components/forms/contact';

export type RoadmapFilter = 'all' | RoadmapStatus;

export const statusOrder: RoadmapStatus[] = ['done', 'beta', 'in-progress', 'planned'];

export const statusContent: Record<
  RoadmapStatus,
  { label: string; shortLabel: string; colorClassName: string }
> = {
  done: {
    label: 'Kürzlich umgesetzt',
    shortLabel: 'Umgesetzt',
    colorClassName: 'bg-primary',
  },
  beta: {
    label: 'Im Pilot',
    shortLabel: 'Pilot',
    colorClassName: 'bg-secondary-foreground',
  },
  'in-progress': {
    label: 'In Arbeit',
    shortLabel: 'In Arbeit',
    colorClassName: 'bg-muted-foreground',
  },
  planned: {
    label: 'Vorgesehen',
    shortLabel: 'Vorgesehen',
    colorClassName: 'bg-accent',
  },
};

export const categoryLabels: Record<RoadmapItemDto['category'], string> = {
  software: 'Software',
  hardware: 'Hardware',
  platform: 'Plattform',
  integrations: 'Integrationen',
};

export function RoadmapCard({ item }: { item: RoadmapItemDto }) {
  const status = statusContent[item.status];

  return (
    <li className="group flex min-h-48 flex-col border-b border-border px-0 py-5 md:min-h-52 md:border-r md:px-5 xl:px-6">
      <div className="pt-1">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-background',
              status.colorClassName,
            )}
            role="img"
            aria-label={`Status: ${status.label}`}
          >
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <h2 className="max-w-[22ch] text-xl font-light leading-[1.12] tracking-[-0.025em] text-foreground md:text-[1.375rem]">
            {item.title}
          </h2>
        </div>
        <p className="mt-3 max-w-[34rem] pl-9 text-base leading-[1.6] text-muted-foreground">
          {item.summary}
        </p>
      </div>
    </li>
  );
}

export function FeatureRequestDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="group flex min-h-12 w-full cursor-pointer items-center justify-between border-y border-border py-2.5 text-left text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          />
        }
      >
        Funktion vorschlagen
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowRight
            className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-none border-border bg-background p-0 shadow-2xl sm:max-w-2xl"
      >
        <DialogClose className="absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Dialog schließen</span>
        </DialogClose>
        <DialogHeader className="border-b border-border px-6 py-7 pr-14 text-left md:px-9 md:py-9">
          <p className="font-mono text-xs tracking-[0.14em] text-mardu-purple">[FUNKTIONSWUNSCH]</p>
          <DialogTitle className="max-w-[18ch] text-[clamp(2rem,5vw,3rem)] font-light leading-[0.98] tracking-[-0.035em] text-foreground">
            Welche Funktion fehlt dir?
          </DialogTitle>
          <DialogDescription className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Beschreibe kurz den Anwendungsfall. Wir prüfen den Wunsch im Kontext der bestehenden
            Roadmap und melden uns persönlich zurück.
          </DialogDescription>
        </DialogHeader>
        <div className="contact-editorial-form px-6 py-7 md:px-9 md:py-9">
          <SiteContactForm
            submit
            action="/api/contact"
            initialMessage={'Funktionswunsch zur Mardu-Roadmap:\n\n'}
            extra={{ source: 'roadmap-feature-request' }}
            submitLabel="Funktionswunsch senden"
            successMessage="Danke! Wir prüfen den Funktionswunsch und melden uns bei dir."
            layout="plain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
