'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setSelected(img)}
            className="relative group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-md"
            />
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 bg-overlay/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <Image
            src={selected.src}
            alt={selected.alt}
            width={1200}
            height={800}
            className="max-h-full w-auto object-contain rounded"
          />
        </div>
      )}
    </>
  );
}
