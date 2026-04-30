'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { cn } from '../lib/utils';

export type HatchedIconVariant = 'diamond' | 'key' | 'unlock';

/**
 * API DTO for a Three.js line-structure icon preview.
 */
export type HatchedIconProps = {
  variant: HatchedIconVariant;
  size?: number;
  color?: string;
  lineGap?: number;
  lineWidth?: number;
  animated?: boolean;
  className?: string;
};

const VIEWBOX_SIZE = 128;
const CENTER = VIEWBOX_SIZE / 2;

type Segment = {
  x1: number;
  x2: number;
  y: number;
  opacity: number;
};

type Point = [number, number];

const DIAMOND_POLYGON: Point[] = [
  [21, 52],
  [39, 30],
  [89, 30],
  [107, 52],
  [64, 111],
];

const KEY_POLYGON: Point[] = [
  [77, 18],
  [62, 20],
  [48, 28],
  [38, 41],
  [34, 55],
  [38, 69],
  [51, 80],
  [57, 84],
  [53, 96],
  [67, 94],
  [64, 108],
  [80, 102],
  [76, 91],
  [89, 84],
  [96, 72],
  [95, 58],
  [91, 44],
  [85, 30],
  [84, 22],
];

const LOCK_BODY_POLYGON: Point[] = [
  [38, 58],
  [99, 58],
  [99, 92],
  [90, 110],
  [68, 124],
  [46, 110],
  [38, 92],
];

function pointInPolygon(x: number, y: number, polygon: Point[]) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function ellipseValue(
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
) {
  return (x - cx) ** 2 / rx ** 2 + (y - cy) ** 2 / ry ** 2;
}

function isUnlockPoint(x: number, y: number) {
  const body = pointInPolygon(x, y, LOCK_BODY_POLYGON);
  const outerArch = ellipseValue(x, y, 78, 44, 33, 32) <= 1 && y <= 59;
  const innerArch = ellipseValue(x, y, 78, 44, 19, 20) <= 1 && y <= 59;
  const leftLeg = x >= 45 && x <= 59 && y >= 43 && y <= 62;
  const rightCut = x >= 96 && x <= 113 && y >= 43 && y <= 51;
  const shackle = (outerArch && !innerArch && !rightCut) || leftLeg;

  const keyhole =
    ellipseValue(x, y, 68, 80, 8, 8) <= 1 ||
    (x >= 64 && x <= 72 && y >= 87 && y <= 102);
  const centerBand = x >= 41 && x <= 96 && y >= 70 && y <= 80;

  return (body || shackle) && !keyhole && !centerBand;
}

function isInVariant(variant: HatchedIconVariant, x: number, y: number) {
  if (variant === 'diamond') {
    return pointInPolygon(x, y, DIAMOND_POLYGON);
  }

  if (variant === 'key') {
    return pointInPolygon(x, y, KEY_POLYGON);
  }

  return isUnlockPoint(x, y);
}

function hashValue(a: number, b: number, c: number) {
  const value = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 43758.5453;

  return value - Math.floor(value);
}

function getStructuralCuts(
  variant: HatchedIconVariant,
  y: number,
  start: number,
  end: number,
) {
  const width = end - start;
  const cuts: Array<[number, number]> = [];
  const row = Math.round(y);

  if (width < 18) {
    return cuts;
  }

  if (variant === 'diamond') {
    if (y > 44 && y < 58) {
      cuts.push([start + width * 0.48, start + width * 0.58]);
    }

    if (y > 66 && y < 82 && row % 2 === 0) {
      cuts.push([start + width * 0.3, start + width * 0.42]);
    }
  }

  if (variant === 'key') {
    if (y > 32 && y < 82) {
      cuts.push([start + width * 0.42, start + width * 0.58]);
    }

    if (y > 48 && y < 68 && row % 3 !== 0) {
      cuts.push([start + width * 0.08, start + width * 0.25]);
    }

    if (y > 76 && y < 102 && row % 2 === 0) {
      cuts.push([start + width * 0.62, start + width * 0.82]);
    }
  }

  if (variant === 'unlock') {
    if (y > 54 && y < 96) {
      cuts.push([start + width * 0.54, start + width * 0.67]);
    }

    if (y > 82 && y < 108 && row % 3 !== 1) {
      cuts.push([start + width * 0.18, start + width * 0.34]);
    }
  }

  const randomCut = hashValue(row, Math.round(start), variant.length);

  if (randomCut > 0.72) {
    const cutStart = start + width * (0.18 + hashValue(row, 2, width) * 0.54);
    const cutWidth = 4 + hashValue(row, 3, width) * 9;
    cuts.push([cutStart, Math.min(end, cutStart + cutWidth)]);
  }

  return cuts
    .map(
      ([x1, x2]) =>
        [Math.max(start, x1), Math.min(end, x2)] as [number, number],
    )
    .filter(([x1, x2]) => x2 - x1 > 2)
    .sort((a, b) => a[0] - b[0]);
}

function pushStructuredSegments(
  segments: Segment[],
  variant: HatchedIconVariant,
  start: number,
  end: number,
  y: number,
) {
  const cuts = getStructuralCuts(variant, y, start, end);
  let cursor = start;

  cuts.forEach(([cutStart, cutEnd], index) => {
    if (cutStart - cursor > 2.5) {
      segments.push({ x1: cursor, x2: cutStart, y, opacity: 1 });
    }

    const dotWidth = variant === 'diamond' ? 2.2 : 2.8;
    const dotGap = variant === 'unlock' ? 5.8 : 6.5;

    for (let x = cutStart + 1; x < cutEnd - 1; x += dotGap) {
      if (hashValue(Math.round(y), index, Math.round(x)) > 0.35) {
        segments.push({
          x1: x,
          x2: Math.min(cutEnd, x + dotWidth),
          y,
          opacity: 0.78,
        });
      }
    }

    cursor = cutEnd;
  });

  if (end - cursor > 2.5) {
    segments.push({ x1: cursor, x2: end, y, opacity: 1 });
  }
}

function buildSegments(variant: HatchedIconVariant, lineGap: number) {
  const segments: Segment[] = [];
  const yStart = 12;
  const yEnd = 123;

  for (let y = yStart; y <= yEnd; y += lineGap) {
    let x = 8;

    while (x <= 120) {
      while (x <= 120 && !isInVariant(variant, x, y)) {
        x += 1;
      }

      const start = x;

      while (x <= 120 && isInVariant(variant, x, y)) {
        x += 1;
      }

      const end = x;

      if (end - start > 2.5) {
        pushStructuredSegments(segments, variant, start, end, y);
      }
    }
  }

  return segments;
}

function colorWithOpacity(color: string, opacity: number) {
  const parsed = new THREE.Color(color);

  return { parsed, opacity };
}

function addSegmentRect(
  positions: number[],
  x1: number,
  x2: number,
  y: number,
  thickness: number,
  z: number,
) {
  const left = (x1 - CENTER) / CENTER;
  const right = (x2 - CENTER) / CENTER;
  const top = (CENTER - y + thickness / 2) / CENTER;
  const bottom = (CENTER - y - thickness / 2) / CENTER;

  positions.push(left, top, z, right, top, z, right, bottom, z);
  positions.push(left, top, z, right, bottom, z, left, bottom, z);
}

function createStructureMesh(
  segments: Segment[],
  color: string,
  lineWidth: number,
  z: number,
  opacityScale: number,
) {
  const positions: number[] = [];
  const colors: number[] = [];

  segments.forEach((segment) => {
    const { parsed } = colorWithOpacity(color, segment.opacity * opacityScale);

    addSegmentRect(positions, segment.x1, segment.x2, segment.y, lineWidth, z);

    for (let i = 0; i < 6; i += 1) {
      colors.push(parsed.r, parsed.g, parsed.b);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: Math.min(1, opacityScale),
    vertexColors: true,
  });

  return new THREE.Mesh(geometry, material);
}

export function HatchedIcon({
  variant,
  size = 128,
  color = '#2f3cff',
  lineGap = 3,
  lineWidth = 1.6,
  animated = true,
  className,
}: HatchedIconProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -1.08,
      1.08,
      1.08,
      -1.08,
      0.1,
      20,
    );
    camera.position.set(0, 0, 4);

    const group = new THREE.Group();
    const segments = buildSegments(variant, Math.max(2, lineGap));
    const backLayer = createStructureMesh(
      segments,
      '#050510',
      lineWidth + 1.8,
      -0.08,
      0.82,
    );
    const mainLayer = createStructureMesh(segments, color, lineWidth, 0.04, 1);

    backLayer.position.set(0.055, -0.055, -0.04);
    group.add(backLayer, mainLayer);
    group.scale.setScalar(1.34);
    group.rotation.x = 0.2;
    group.rotation.y = -0.28;
    scene.add(group);

    let frame = 0;
    let animationFrame = 0;

    const render = () => {
      if (animated) {
        frame += 0.008;
        group.rotation.y = Math.sin(frame) * 0.22;
        group.rotation.x = 0.14 + Math.sin(frame * 0.72) * 0.08;
        group.rotation.z = Math.sin(frame * 0.58) * 0.035;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      root.removeChild(renderer.domElement);
      backLayer.geometry.dispose();
      mainLayer.geometry.dispose();
      (backLayer.material as THREE.Material).dispose();
      (mainLayer.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [animated, color, lineGap, lineWidth, size, variant]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-grid shrink-0 place-items-center',
        className,
      )}
      ref={rootRef}
      style={{ height: size, width: size }}
    />
  );
}

export function HatchedIconDemo({ className }: { className?: string }) {
  const variants: HatchedIconVariant[] = ['diamond', 'key', 'unlock'];

  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-3', className)}>
      {variants.map((variant) => (
        <div
          className="flex min-h-64 items-center justify-center border border-border/70 bg-background"
          key={variant}
        >
          <HatchedIcon
            className="text-[#2f3cff]"
            color="#2f3cff"
            lineGap={3}
            lineWidth={2}
            size={220}
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
}
