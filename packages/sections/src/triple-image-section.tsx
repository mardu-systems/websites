'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@mardu/ui/lib/utils';
import { Mail } from 'lucide-react';

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
  eyebrow?: string;
  title?: string;
  asideLabel?: string;
  cards: [TripleImageCardProps, TripleImageCardProps, TripleImageCardProps];
  className?: string;
}

export default function TripleImageSection({
  cards,
  className = '',
  eyebrow = 'Founding Team',
  title = 'Unser Team',
  asideLabel = 'People',
}: TripleImageSectionProps) {
  return (
    <section className={cn('section-hairline py-18 md:py-24', className)}>
      <div className="mardu-container">
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
          <div>
            {eyebrow ? (
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/45">{eyebrow}</p>
            ) : null}
            <h2 className="text-[clamp(1.7rem,3.1vw,3rem)] leading-[1.06] tracking-[-0.02em]">{title}</h2>
          </div>
          {asideLabel ? (
            <p className="hidden text-xs uppercase tracking-[0.18em] text-foreground/45 md:block">
              {asideLabel}
            </p>
          ) : null}
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
                    <Link
                      href={card.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-sm transition-colors hover:bg-[#004182] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
                      aria-label={`LinkedIn Profil von ${card.title}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Link>
                  ) : null}
                  {card.email ? (
                    <Link
                      href={`mailto:${card.email}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={`E-Mail an ${card.title}`}
                    >
                      <Mail className="size-5" />
                    </Link>
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
