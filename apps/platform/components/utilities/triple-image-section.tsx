'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TripleImageCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  linkedinUrl?: string;
  email?: string;
  objectPosition?: string;
  unoptimized?: boolean;
}

export interface TripleImageSectionProps {
  cards: [TripleImageCardProps, TripleImageCardProps, TripleImageCardProps];
  className?: string;
}

export default function TripleImageSection({ cards, className = '' }: TripleImageSectionProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/45">Founding Team</p>
            <h2 className="text-[clamp(1.7rem,3.1vw,3rem)] leading-[1.06] tracking-[-0.02em]">Unser Team</h2>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.18em] text-foreground/45 md:block">People</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={card.title ?? index}
              className="group border border-black/10 bg-white/55 p-4 transition-colors hover:bg-white/75"
            >
              <div className="relative mb-5 aspect-4/5 overflow-hidden border border-black/10">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  priority={index === 0}
                  unoptimized={card.unoptimized}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 34vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
                />
              </div>

              <h3 className="font-serif text-[2rem] leading-[0.95] tracking-[-0.02em]">{card.title}</h3>
              <p className="mb-3 mt-1 text-[11px] uppercase tracking-[0.18em] text-foreground/55">{card.subtitle}</p>
              <div className="space-y-3 text-[15px] leading-relaxed text-foreground/75 md:text-base">
                {typeof card.description === 'string' ? <p>{card.description}</p> : card.description}
              </div>

              {(card.linkedinUrl || card.email) && (
                <div className="relative z-20 mt-5 flex gap-2 border-t border-black/10 pt-4">
                  {card.linkedinUrl ? (
                    <Button asChild variant="outline" size="icon" className="rounded-none">
                      <Link
                        href={card.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto"
                        aria-label={`LinkedIn Profil von ${card.title}`}
                      >
                        <Linkedin className="size-4" />
                      </Link>
                    </Button>
                  ) : null}
                  {card.email ? (
                    <Button asChild size="icon" className="rounded-none">
                      <Link
                        href={`mailto:${card.email}`}
                        className="pointer-events-auto"
                        aria-label={`E-Mail an ${card.title}`}
                      >
                        <Mail className="size-4" />
                      </Link>
                    </Button>
                  ) : null}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
