import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@mardu/ui';
import { ArrowUpRight } from 'lucide-react';
import { customerProof } from '../homepage-content';

export function CustomerProofSection() {
  return (
    <section
      id="kunden"
      aria-labelledby="customer-proof-title"
      className="border-b border-white/10 bg-black py-14 text-white md:py-16 xl:py-20"
    >
      <div className="mardu-container grid gap-12 xl:grid-cols-[0.17fr_0.58fr_0.25fr] xl:gap-10">
        <div>
          <h2
            id="customer-proof-title"
            className="text-xs font-normal uppercase tracking-[0.18em] text-white/60"
          >
            [{customerProof.label}]
          </h2>
          <ul className="sr-only">
            {customerProof.partners.map((partner) => (
              <li key={partner.name}>{partner.name}</li>
            ))}
          </ul>
        </div>

        <div
          className="grid grid-cols-2 gap-x-7 gap-y-7 sm:grid-cols-3 xl:-mt-1 xl:grid-cols-4"
          aria-hidden="true"
        >
          {customerProof.partners.map((partner) => {
            const isRotated = partner.presentation === 'rotated-monochrome';
            const isNativeSquare = partner.presentation === 'native-square';
            const isNative = partner.presentation === 'native' || isNativeSquare;

            return (
              <div
                key={partner.name}
                className="relative flex min-h-20 items-center justify-center px-2 py-1"
              >
                <Image
                  src={partner.logoSrc}
                  alt=""
                  width={partner.width}
                  height={partner.height}
                  sizes="(min-width: 1280px) 170px, (min-width: 640px) 150px, 42vw"
                  style={isRotated ? { height: '9rem' } : undefined}
                  className={cn(
                    'object-contain',
                    isRotated
                      ? 'absolute w-auto max-w-none rotate-90'
                      : isNativeSquare
                        ? 'size-16'
                        : 'h-auto max-h-[4.75rem] w-auto max-w-full',
                    !isNative && 'brightness-0 invert',
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="xl:pl-4">
          <p className="max-w-[29rem] text-base leading-snug text-white">
            {customerProof.description}
          </p>
          <nav className="mt-5 border-t border-white/30" aria-label="Direkteinstiege">
            {customerProof.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-11 items-center gap-2 border-b border-white/30 text-xs text-white/75 transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-black"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-3 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
                </span>
                [{link.index} {link.label}]
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
