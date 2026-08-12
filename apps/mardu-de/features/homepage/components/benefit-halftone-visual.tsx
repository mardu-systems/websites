'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const DeferredHalftone3DIllustration = dynamic(
  () =>
    import('@mardu/ui/components/halftone-3d-illustration').then(
      (module) => module.Halftone3DIllustration,
    ),
  {
    ssr: false,
    loading: () => <BenefitVisualFallback />,
  },
);

const benefitHalftoneSettings = {
  material: {
    color: '#f3eef9',
    metalness: 0,
    roughness: 0.72,
  },
  halftone: {
    dashColor: '#9c80c2',
    hoverDashColor: '#9c80c2',
    power: -0.1,
    scale: 17,
    width: 0.48,
  },
  background: {
    color: '#f4f4f4',
    transparent: true,
  },
  animation: {
    autoRotateEnabled: false,
    cameraParallaxAmount: 0.08,
    cameraParallaxEnabled: true,
    dragFlowEnabled: true,
    followDragEnabled: false,
    followHoverEnabled: true,
    hoverHalftoneEnabled: true,
    hoverHalftonePowerShift: 0.24,
    lightSweepEnabled: true,
    hoverHalftoneRadius: 0.42,
    hoverHalftoneWidthShift: -0.12,
    hoverLightEnabled: true,
    hoverLightIntensity: 0.55,
    hoverLightRadius: 0.38,
    hoverRange: 8,
    rotateAxis: 'y',
    rotateEnabled: true,
    rotatePingPong: true,
    rotateRange: 12,
    rotateSpeed: 0.42,
    rotationConstraint: 'y',
  },
} as const;

const benefitHalftoneInitialPose = {
  autoElapsed: 0,
  rotateElapsed: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  targetRotationX: 0,
  targetRotationY: 0,
  timeElapsed: 0,
} as const;

function BenefitVisualFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-[12%] rounded-full border border-mardu-purple/15 bg-[radial-gradient(circle_at_center,rgba(156,128,194,0.16)_0_1px,transparent_1.5px)] bg-[length:12px_12px]"
    />
  );
}

interface BenefitHalftoneVisualProps {
  modelUrl?: string;
}

/** Defers the Three.js bundle until the benefit visual approaches the viewport. */
export function BenefitHalftoneVisual({ modelUrl }: BenefitHalftoneVisualProps) {
  const rootReference = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const root = rootReference.current;

    if (!root || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '240px 0px', threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={rootReference} className="absolute inset-0">
      {shouldLoad ? (
        <DeferredHalftone3DIllustration
          initialPose={benefitHalftoneInitialPose}
          modelUrl={modelUrl}
          previewDistance={3.75}
          settings={benefitHalftoneSettings}
          shapeKey="box"
        />
      ) : (
        <BenefitVisualFallback />
      )}
    </div>
  );
}
