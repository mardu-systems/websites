"use client";

import * as React from "react";
import { Halftone3DIllustration } from "@mardu/ui/components/halftone-3d-illustration";

export function FooterWordmark({ src }: { src: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number | null = null;
    let listening = false;
    const updatePointerPosition = (event: PointerEvent) => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        container.style.setProperty(
          "--wordmark-x",
          `${event.clientX - rect.left}px`,
        );
        container.style.setProperty(
          "--wordmark-y",
          `${event.clientY - rect.top}px`,
        );
        animationFrame = null;
      });
    };
    const startListening = () => {
      if (!listening) {
        window.addEventListener("pointermove", updatePointerPosition, {
          passive: true,
        });
        listening = true;
      }
    };
    const stopListening = () => {
      if (listening) {
        window.removeEventListener("pointermove", updatePointerPosition);
        listening = false;
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? startListening() : stopListening()),
      { rootMargin: "160px 0px" },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      stopListening();
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-12 -mb-8 pt-8 sm:mt-16 sm:-mb-12 lg:-mb-16 lg:pt-12"
      aria-hidden="true"
    >
      <div
        className="relative aspect-[904/140] w-full [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
        style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }}
      >
        <div className="absolute inset-0 bg-white/[0.018]" />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(circle 30rem at var(--wordmark-x, -40rem) var(--wordmark-y, -40rem), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.14) 32%, rgba(255,255,255,0.035) 58%, transparent 76%)",
          }}
        />
      </div>
    </div>
  );
}

export function FooterHalftoneMark({
  color = "#8D69BF",
  src,
}: {
  color?: string;
  src: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-28 z-0 size-[28rem] opacity-[0.24] sm:-right-28 sm:-top-40 sm:size-[36rem] lg:-right-32 lg:-top-48 lg:size-[44rem]"
    >
      <div
        className="size-full [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} 0 2.2px, transparent 2.5px)`,
          backgroundSize: "14px 14px",
          maskImage: `url("${src}")`,
          WebkitMaskImage: `url("${src}")`,
        }}
      />
    </div>
  );
}

const FOOTER_MODEL_INITIAL_POSE = {
  autoElapsed: 0,
  rotateElapsed: 0,
  rotationX: 0.22,
  rotationY: -0.55,
  rotationZ: -0.05,
  targetRotationX: 0.22,
  targetRotationY: -0.55,
  timeElapsed: 0,
} as const;

const FOOTER_MODEL_ROTATION = [Math.PI / 2, 0, 0] as const;

export function FooterStaticModelMark({
  color = "#8D69BF",
  src,
}: {
  color?: string;
  src: string;
}) {
  const settings = React.useMemo(
    () => ({
      lighting: {
        ambientIntensity: 0.02,
        angleDegrees: 28,
        fillIntensity: 0.08,
        height: 1.4,
        intensity: 1.3,
      },
      material: {
        color: "#8D69BF",
        environmentPower: 2.8,
        metalness: 0,
        refraction: 1.4,
        roughness: 0.32,
        surface: "glass" as const,
        thickness: 80,
      },
      halftone: {
        dashColor: color,
        hoverDashColor: color,
        power: -0.32,
        scale: 10,
        width: 0.4,
      },
      background: { color: "#000000", transparent: true },
      animation: {
        autoRotateEnabled: false,
        breatheEnabled: false,
        cameraParallaxEnabled: false,
        dragFlowEnabled: false,
        floatEnabled: false,
        followDragEnabled: false,
        followHoverEnabled: false,
        hoverHalftoneEnabled: true,
        hoverLightEnabled: false,
        lightSweepEnabled: true,
        rotateEnabled: false,
        waveAmount: 1.15,
        waveEnabled: false,
        waveSpeed: 0,
      },
    }),
    [color],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-12 -top-16 z-0 size-[22rem] opacity-[0.18] sm:-right-16 sm:-top-24 sm:size-[28rem] lg:-right-16 lg:-top-40 lg:size-[34rem]"
    >
      <Halftone3DIllustration
        initialPose={FOOTER_MODEL_INITIAL_POSE}
        modelRotation={FOOTER_MODEL_ROTATION}
        modelUrl={src}
        previewDistance={3.35}
        settings={settings}
        shapeKey="box"
      />
    </div>
  );
}
