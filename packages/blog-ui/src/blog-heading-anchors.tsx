"use client";

import { useEffect } from "react";

export type BlogHeadingLink = {
  id: string;
  level: 1 | 2 | 3;
};

export interface BlogHeadingAnchorsProps {
  containerId: string;
  headings: BlogHeadingLink[];
}

export function BlogHeadingAnchors({
  containerId,
  headings,
}: BlogHeadingAnchorsProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container || headings.length === 0) {
      return;
    }

    const elements = Array.from(container.querySelectorAll("h1, h2, h3"));
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
