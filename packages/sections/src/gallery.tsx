'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Render-ready gallery image DTO.
 */
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelected(image)}
            className="relative group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="h-auto w-full rounded-md object-cover"
            />
          </button>
        ))}
      </div>
      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/80 p-4"
          onClick={() => setSelected(null)}
        >
          <Image
            src={selected.src}
            alt={selected.alt}
            width={1200}
            height={800}
            className="max-h-full w-auto rounded object-contain"
          />
        </div>
      ) : null}
    </>
  );
}
