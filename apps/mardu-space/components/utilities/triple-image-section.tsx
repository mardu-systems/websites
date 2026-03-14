'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { cn } from '@/lib/utils';

export interface TripleImageCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  linkedinUrl?: string; // optional LinkedIn profile
  email?: string; // optional email
  objectPosition?: string; // e.g. 'center top' for zoom/reposition
  unoptimized?: boolean;
}

export interface TripleImageSectionProps {
  cards: [TripleImageCardProps, TripleImageCardProps, TripleImageCardProps];
  className?: string;
}

export default function TripleImageSection({ cards, className = '' }: TripleImageSectionProps) {
  return (
    <section
      className={cn(
        'flex flex-col items-center px-4 md:px-8 py-12 md:py-24 bg-background text-foreground',
        className,
      )}
    >
      <div className="w-full max-w-7xl">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-primary">Unser Team</h2>
        </ScrollReveal>
        {/* Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title ?? index} delay={index * 0.1} className="flex flex-col">
              <motion.article
                layout
                className="flex flex-col h-full bg-card rounded-[24px] overflow-hidden shadow-sm"
              >
                {/* Image */}
                <motion.div
                  className="relative w-full aspect-square md:h-[400px] overflow-hidden mb-6"
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    priority={index === 0}
                    unoptimized={card.unoptimized}
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 33vw"
                    className="object-cover"
                    style={card.objectPosition ? { objectPosition: card.objectPosition } : {}}
                  />
                </motion.div>

                {/* Content */}
                <div className="flex flex-col gap-3 px-6 pb-8">
                  {/* Title */}
                  <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.2] text-primary">
                    {card.title}
                  </h3>
                  <h5 className="text-[15px] md:text-[20px] font-semibold text-primary/80">
                    {card.subtitle}
                  </h5>

                  {/* Description */}
                  <div className="text-[16px] md:text-[18px] leading-[1.4] text-muted-foreground space-y-3">
                    {typeof card.description === 'string' ? (
                      <p>{card.description}</p>
                    ) : (
                      card.description
                    )}
                  </div>

                  {/* Contact Buttons */}
                  {(card.linkedinUrl || card.email) && (
                    <div className="mt-4 flex gap-3">
                      {card.linkedinUrl && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={card.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 shadow-sm"
                            aria-label={`LinkedIn Profil von ${card.title}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </Link>
                        </motion.div>
                      )}
                      {card.email && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`mailto:${card.email}`}
                            className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm"
                            aria-label={`E-Mail an ${card.title}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2" />
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
