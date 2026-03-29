'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

/**
 * SVG line connector that links timeline anchors inside a shared root element.
 */
export interface DashedConnectorProps {
  rootRef: RefObject<HTMLElement | null>;
  anchorSelector?: string;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
  offsetBeforePoint?: number;
  mobileStroke?: string;
  mobileStrokeWidth?: number;
  mobileDash?: string;
}

export default function DashedConnector({
  rootRef,
  anchorSelector = '[data-timeline-anchor]',
  stroke = 'var(--accent)',
  strokeWidth = 2,
  dash = '6 8',
  offsetBeforePoint = 16,
  mobileStroke = 'color-mix(in oklch, var(--accent) 40%, transparent)',
  mobileStrokeWidth = 8,
  mobileDash = '12 16',
}: DashedConnectorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const isMobile = useIsMobile();

  const effectiveStroke = isMobile ? mobileStroke : stroke;
  const effectiveStrokeWidth = isMobile ? mobileStrokeWidth : strokeWidth;
  const effectiveDash = isMobile ? mobileDash : dash;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const getAnchors = () => Array.from(root.querySelectorAll(anchorSelector)) as HTMLElement[];

    const buildIndividualConnections = (points: { x: number; y: number }[], offset: number) => {
      if (points.length < 2) {
        return [];
      }

      const segments: string[] = [];

      for (let index = 0; index < points.length - 1; index += 1) {
        const startPoint = {
          x: points[index].x,
          y: points[index].y + offset,
        };

        const endPoint = {
          x: points[index + 1].x,
          y: points[index + 1].y - offset,
        };

        const midY = (startPoint.y + endPoint.y) / 2;
        segments.push(
          `M ${startPoint.x},${startPoint.y} C ${startPoint.x},${midY} ${endPoint.x},${midY} ${endPoint.x},${endPoint.y}`,
        );
      }

      return segments;
    };

    const update = () => {
      const rootRect = root.getBoundingClientRect();
      setBox({ w: rootRect.width, h: rootRect.height });

      const points = getAnchors()
        .filter((element) => getComputedStyle(element).display !== 'none')
        .map((element) => {
          const elementRect = element.getBoundingClientRect();
          return {
            x: elementRect.left + elementRect.width / 2 - rootRect.left + root.scrollLeft,
            y: elementRect.top + elementRect.height / 2 - rootRect.top + root.scrollTop,
          };
        })
        .sort((a, b) => a.y - b.y);

      const pathSegments = buildIndividualConnections(points, offsetBeforePoint);
      const svg = svgRef.current;
      if (!svg) {
        return;
      }

      svg.querySelectorAll('path').forEach((path) => path.remove());
      pathSegments.forEach((pathData) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', effectiveStroke);
        path.setAttribute('stroke-width', effectiveStrokeWidth.toString());
        path.setAttribute('stroke-dasharray', effectiveDash);
        path.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.appendChild(path);
      });
    };

    const rootResizeObserver = new ResizeObserver(update);
    rootResizeObserver.observe(root);

    const anchorResizeObservers = getAnchors().map((element) => {
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return observer;
    });

    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
      rootResizeObserver.disconnect();
      anchorResizeObservers.forEach((observer) => observer.disconnect());
    };
  }, [
    anchorSelector,
    effectiveDash,
    effectiveStroke,
    effectiveStrokeWidth,
    offsetBeforePoint,
    rootRef,
  ]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none block"
      width="100%"
      height="100%"
      viewBox={`0 0 ${Math.max(1, box.w)} ${Math.max(1, box.h)}`}
      preserveAspectRatio="none"
    />
  );
}
