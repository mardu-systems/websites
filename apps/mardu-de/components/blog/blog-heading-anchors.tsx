'use client';

import { useEffect } from 'react';

type HeadingLink = {
  id: string;
  level: 1 | 2 | 3;
};

type BlogHeadingAnchorsProps = {
  containerId: string;
  headings: HeadingLink[];
};

export function BlogHeadingAnchors({ containerId, headings }: BlogHeadingAnchorsProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container || headings.length === 0) {
      return;
    }

    const elements = Array.from(container.querySelectorAll('h1, h2, h3'));
    let index = 0;

    for (const element of elements) {
      const expected = headings[index];

      if (!expected) {
        break;
      }

      const level = Number(element.tagName.slice(1)) as 1 | 2 | 3;

      if (level !== expected.level) {
        continue;
      }

      element.id = expected.id;
      index += 1;
    }
  }, [containerId, headings]);

  return null;
}
