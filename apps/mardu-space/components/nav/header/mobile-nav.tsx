'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { NavEntry } from '@/types/header';
import BurgerIcon from './burger-icon';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';

export default function MobileNav({
  items,
  variant = 'light',
}: {
  items: NavEntry[];
  variant?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();
  const pathname = usePathname();

  const linkColor = 'text-white/90 hover:text-white';

  const closeAndGo = () => setOpen(false);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    shouldScroll: boolean,
  ) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (shouldScroll) {
      event.preventDefault();
      scrollToSection(href);
    }

    closeAndGo();
  };

  const resolveHref = (href: string) => (pathname === '/' ? href : `/${href}`);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={clsx(
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            variant === 'light'
              ? 'focus-visible:ring-neutral-900 focus-visible:ring-offset-white'
              : 'focus-visible:ring-white focus-visible:ring-offset-neutral-950',
          )}
          aria-label="Navigation öffnen"
        >
          <BurgerIcon isOpen={open} variant={variant} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full h-full p-0 bg-radial-[at_5%_5%] from-zinc-900 from-70% to-[#37093F] text-white border-0 flex flex-col overscroll-contain"
      >
        {/* Header */}
        <SheetHeader className="flex items-center justify-between px-6 pt-6">
          <SheetTitle className="text-white tracking-wide uppercase">Navigation</SheetTitle>
        </SheetHeader>

        {/* Navigation - Centered */}
        <nav
          className="flex-1 flex items-center justify-center px-6 overflow-y-auto"
          aria-label="Mobile Navigation"
        >
          <Accordion type="multiple" className="w-full max-w-md">
            {items.map((entry) => (
              <div key={entry.label}>
                {entry.type === 'link' ? (
                  entry.href.startsWith('#') ? (
                    <Link
                      href={resolveHref(entry.href)}
                      onClick={(event) =>
                        handleLinkClick(event, entry.href, pathname === '/')
                      }
                      className={clsx(
                        'h-14 rounded-md px-4 text-lg uppercase flex items-center justify-center w-full font-medium touch-manipulation',
                        linkColor,
                        'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                      )}
                    >
                      {entry.label}
                    </Link>
                  ) : (
                    <Link
                      href={entry.href}
                      onClick={(event) => handleLinkClick(event, entry.href, false)}
                      className={clsx(
                        'h-14 rounded-md px-4 text-lg uppercase flex items-center justify-center font-medium touch-manipulation',
                        linkColor,
                        'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                      )}
                    >
                      {entry.label}
                    </Link>
                  )
                ) : (
                  <AccordionItem value={entry.label} className="border-0">
                    <AccordionTrigger
                      className={clsx(
                        'h-14 px-4 text-lg uppercase hover:no-underline justify-center font-medium touch-manipulation',
                        linkColor,
                      )}
                    >
                      {entry.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 px-2 pb-3">
                        {entry.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href || '#'}
                              onClick={(event) =>
                                handleLinkClick(event, item.href || '#', false)
                              }
                              className="flex items-center gap-3 rounded-md p-3 text-sm hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 touch-manipulation"
                            >
                              {item.image && (
                                <Image
                                  src={item.image.src}
                                  alt={item.image.alt || `${item.label} image`}
                                  width={56}
                                  height={40}
                                  className="h-10 w-14 rounded object-cover"
                                  loading="lazy"
                                />
                              )}
                              <div>
                                <div>{item.label}</div>
                                {item.description && (
                                  <p className="text-xs text-neutral-400">{item.description}</p>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </div>
            ))}
          </Accordion>
        </nav>

        {/* Footer-CTA */}
        <div className="p-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] flex justify-center">
          <MeetergoCTAButton
            onClick={closeAndGo}
            className="w-full max-w-md h-14 text-base tracking-wide uppercase bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Demo Vereinbaren
          </MeetergoCTAButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
