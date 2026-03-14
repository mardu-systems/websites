'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { MegaGroup } from '@/types/header';

export default function MegaContent({ group }: { group: MegaGroup }) {
  return (
    <div className="overflow-hidden">
      {group.hero ? (
        <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
          {/* Hero-Bild */}
          <div className="relative col-span-3 aspect-[16/9] w-full md:aspect-auto md:h-64">
            <Image
              src={group.hero.src}
              alt={group.hero.alt || group.label}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
            {group.hero.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 py-2 text-sm text-white/90">
                {group.hero.caption}
              </div>
            )}
          </div>

          {/* Link-Liste */}
          <div className="col-span-2 p-3">
            <ul className="grid grid-cols-1 divide-y divide-white/10">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href || '#'}
                    className="group flex items-center gap-3 p-3 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 touch-manipulation"
                  >
                    {/* Thumbnail */}
                    {item.image ? (
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden ring-1 ring-white/10">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt || item.label}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="flex h-12 w-16 shrink-0 items-center justify-center bg-white/5">
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      {item.description && (
                        <p className="text-xs text-white/70 line-clamp-2">{item.description}</p>
                      )}
                    </div>

                    {/* Pfeil */}
                    <ArrowRight
                      className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        // Kartenraster
        <div className="grid gap-3 p-3 grid-cols-1 sm:grid-cols-2 max-w-xl">
          {group.items.map((item) => (
            <Link
              key={item.label}
              href={item.href || '#'}
              className="group overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 touch-manipulation"
            >
              {/* Bild */}
              {item.image ? (
                <div className="relative h-32 w-full">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.label}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-32 w-full items-center justify-center bg-white/5">
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </div>
              )}

              {/* Inhalt */}
              <div className="p-3">
                <div className="text-sm font-semibold text-white">{item.label}</div>
                {item.description && (
                  <p className="mt-1 text-xs text-white/70 line-clamp-2">{item.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
