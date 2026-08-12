'use client';

import { type PointerEvent, useEffect, useRef } from 'react';

const INITIAL_RUN_DURATION = 6_000;
const INTERACTION_RUN_DURATION = 900;
const MAX_PIXEL_RATIO = 1.5;

const fieldNodes = [
  [0.08, 0.18],
  [0.21, 0.1],
  [0.34, 0.22],
  [0.49, 0.12],
  [0.67, 0.2],
  [0.86, 0.1],
  [0.14, 0.43],
  [0.29, 0.53],
  [0.47, 0.39],
  [0.63, 0.51],
  [0.81, 0.4],
  [0.93, 0.58],
  [0.08, 0.72],
  [0.25, 0.83],
  [0.42, 0.69],
  [0.58, 0.82],
  [0.75, 0.68],
  [0.9, 0.86],
] as const;

const fieldConnections = [
  [0, 1],
  [0, 6],
  [1, 2],
  [2, 3],
  [2, 7],
  [2, 8],
  [3, 4],
  [4, 5],
  [4, 9],
  [4, 10],
  [5, 10],
  [6, 7],
  [6, 12],
  [7, 8],
  [7, 13],
  [7, 14],
  [8, 9],
  [8, 14],
  [9, 10],
  [9, 15],
  [9, 16],
  [10, 11],
  [10, 16],
  [11, 17],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
] as const;

type Point = { x: number; y: number };

/** Lightweight, decorative access topology layered over the hero image. */
export function HeroSystemField() {
  const rootReference = useRef<HTMLDivElement>(null);
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const pointerReference = useRef<Point>({ x: 0.5, y: 0.5 });
  const activateReference = useRef<(duration: number) => void>(() => {});
  const allowsPointerAnimationReference = useRef(false);

  useEffect(() => {
    const root = rootReference.current;
    const canvas = canvasReference.current;
    const context = canvas?.getContext('2d');

    if (!root || !canvas || !context) {
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    allowsPointerAnimationReference.current = finePointerQuery.matches;
    let animationFrame = 0;
    let animationOrigin = performance.now();
    let stopAt = animationOrigin;
    let hasPlayedEntrance = false;
    let isInViewport = false;
    let logicalWidth = 1;
    let logicalHeight = 1;

    const canAnimate = () => isInViewport && !document.hidden && !reducedMotionQuery.matches;

    const draw = (timestamp: number) => {
      const elapsed = timestamp - animationOrigin;
      const isAnimating = canAnimate() && timestamp < stopAt;
      context.clearRect(0, 0, logicalWidth, logicalHeight);
      context.lineCap = 'round';

      context.strokeStyle = '#cdbcff';

      for (
        let connectionIndex = 0;
        connectionIndex < fieldConnections.length;
        connectionIndex += 1
      ) {
        const connection = fieldConnections[connectionIndex];

        if (!connection) {
          continue;
        }

        const [fromIndex, toIndex] = connection;
        const from = fieldNodes[fromIndex];
        const to = fieldNodes[toIndex];

        if (!from || !to) {
          continue;
        }

        const fromX = from[0] * logicalWidth;
        const fromY = from[1] * logicalHeight;
        const toX = to[0] * logicalWidth;
        const toY = to[1] * logicalHeight;
        const pointer = pointerReference.current;
        const midpointX = (from[0] + to[0]) * 0.5;
        const midpointY = (from[1] + to[1]) * 0.5;
        const pointerDistance = Math.hypot(midpointX - pointer.x, midpointY - pointer.y);
        const proximity = Math.max(0, 1 - pointerDistance * 2.4);

        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.lineWidth = 0.8 + proximity * 0.9;
        context.globalAlpha = 0.2 + proximity * 0.28;
        context.stroke();

        if (isAnimating && connectionIndex % 4 === 0) {
          const progress = (elapsed / 1_850 + connectionIndex * 0.13) % 1;
          const pulseX = fromX + (toX - fromX) * progress;
          const pulseY = fromY + (toY - fromY) * progress;

          context.beginPath();
          context.arc(pulseX, pulseY, 7, 0, Math.PI * 2);
          context.fillStyle = '#a78bfa';
          context.globalAlpha = 0.16;
          context.fill();

          context.beginPath();
          context.arc(pulseX, pulseY, 1.8, 0, Math.PI * 2);
          context.fillStyle = '#f4efff';
          context.globalAlpha = 0.92;
          context.fill();
        }
      }

      for (let nodeIndex = 0; nodeIndex < fieldNodes.length; nodeIndex += 1) {
        const node = fieldNodes[nodeIndex];

        if (!node) {
          continue;
        }

        const [nodeX, nodeY] = node;
        const x = nodeX * logicalWidth;
        const y = nodeY * logicalHeight;
        const pointerDistance = Math.hypot(
          nodeX - pointerReference.current.x,
          nodeY - pointerReference.current.y,
        );
        const proximity = Math.max(0, 1 - pointerDistance * 3.1);
        const pulse = isAnimating ? Math.sin(elapsed / 420 + nodeIndex * 0.9) * 0.5 + 0.5 : 0.35;
        const radius = 2.1 + pulse * 1.1 + proximity * 2;

        context.beginPath();
        context.arc(x, y, radius + 4, 0, Math.PI * 2);
        context.fillStyle = '#a78bfa';
        context.globalAlpha = 0.05 + proximity * 0.11;
        context.fill();

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = '#ece5ff';
        context.globalAlpha = 0.7 + proximity * 0.25;
        context.fill();
      }

      context.globalAlpha = 1;

      if (isAnimating) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        animationFrame = 0;
      }
    };

    const activate = (duration: number) => {
      if (!canAnimate()) {
        draw(performance.now());
        return;
      }

      const now = performance.now();
      stopAt = Math.max(stopAt, now + duration);

      if (!animationFrame) {
        animationOrigin = now;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };
    activateReference.current = activate;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      logicalWidth = Math.max(rect.width, 1);
      logicalHeight = Math.max(rect.height, 1);
      canvas.width = Math.round(logicalWidth * pixelRatio);
      canvas.height = Math.round(logicalHeight * pixelRatio);
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = Boolean(entry?.isIntersecting);

        if (!isInViewport) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
          return;
        }

        if (!hasPlayedEntrance) {
          hasPlayedEntrance = true;
          activate(INITIAL_RUN_DURATION);
        } else {
          draw(performance.now());
        }
      },
      { threshold: 0.05 },
    );
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        draw(performance.now());
      }
    };
    const handleReducedMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      draw(performance.now());
    };
    const handleFinePointerChange = () => {
      allowsPointerAnimationReference.current = finePointerQuery.matches;
    };

    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    finePointerQuery.addEventListener('change', handleFinePointerChange);
    resize();

    return () => {
      activateReference.current = () => {};
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      finePointerQuery.removeEventListener('change', handleFinePointerChange);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!allowsPointerAnimationReference.current) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerReference.current.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
    pointerReference.current.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    activateReference.current(INTERACTION_RUN_DURATION);
  };

  const handlePointerLeave = () => {
    if (!allowsPointerAnimationReference.current) {
      return;
    }

    pointerReference.current.x = 0.5;
    pointerReference.current.y = 0.5;
    activateReference.current(INTERACTION_RUN_DURATION);
  };

  return (
    <div
      ref={rootReference}
      aria-hidden="true"
      className="absolute inset-0 z-10 overflow-hidden"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            'linear-gradient(rgba(210, 198, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(210, 198, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'linear-gradient(to bottom right, transparent 2%, black 38%, black 76%, transparent 100%)',
        }}
      />
      <canvas ref={canvasReference} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,11,28,0.2),transparent_36%,rgba(15,11,28,0.16)),linear-gradient(0deg,rgba(15,11,28,0.28),transparent_45%)]" />
    </div>
  );
}
