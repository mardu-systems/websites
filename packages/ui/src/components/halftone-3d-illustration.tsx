"use client";

import { useEffect, useMemo, useRef } from "react";

import {
  DEFAULT_PREVIEW_DISTANCE,
  resolveHalftone3DPose,
  resolveHalftone3DSettings,
} from "./halftone-3d/presets";
import {
  mountHalftoneCanvas,
  type HalftoneCanvasController,
} from "./halftone-3d/renderer";
import type {
  Halftone3DIllustrationProps,
  Halftone3DPose,
  Halftone3DSettings,
  Halftone3DShapeKey,
} from "./halftone-3d/types";

export {
  DEFAULT_PREVIEW_DISTANCE,
  defaultDollarCoinPose,
  defaultHalftone3DSettings,
  resolveHalftone3DPose,
  resolveHalftone3DSettings,
} from "./halftone-3d/presets";
export type {
  DeepPartial,
  Halftone3DAnimationSettings,
  Halftone3DBackgroundSettings,
  Halftone3DHalftoneSettings,
  Halftone3DIllustrationProps,
  Halftone3DLightingSettings,
  Halftone3DMaterialSettings,
  Halftone3DPose,
  Halftone3DSettings,
  Halftone3DShapeKey,
} from "./halftone-3d/types";

type MountOptionsSnapshot = {
  initialPose: Halftone3DPose;
  modelRotation?: readonly [number, number, number];
  modelUrl?: string;
  previewDistance: number;
  settings: Halftone3DSettings;
  shapeKey: Halftone3DShapeKey;
};

export function Halftone3DIllustration({
  className,
  initialPose,
  modelRotation,
  modelUrl,
  onError,
  previewDistance = DEFAULT_PREVIEW_DISTANCE,
  settings,
  shapeKey,
  style,
}: Halftone3DIllustrationProps) {
  const mountReference = useRef<HTMLDivElement>(null);
  const controllerReference = useRef<HalftoneCanvasController | null>(null);
  const latestOnErrorReference = useRef(onError);

  const resolvedSettings = useMemo(
    () => resolveHalftone3DSettings(shapeKey, settings),
    [shapeKey, settings],
  );
  const resolvedShapeKey = resolvedSettings.shapeKey;

  const initialMountOptionsReference = useRef<MountOptionsSnapshot | null>(
    null,
  );
  if (initialMountOptionsReference.current === null) {
    initialMountOptionsReference.current = {
      initialPose: resolveHalftone3DPose(initialPose),
      modelRotation,
      modelUrl,
      previewDistance,
      settings: resolvedSettings,
      shapeKey: resolvedShapeKey,
    };
  }

  useEffect(() => {
    latestOnErrorReference.current = onError;
  }, [onError]);

  useEffect(() => {
    const container = mountReference.current;
    const mountOptions = initialMountOptionsReference.current;
    const abortController = new AbortController();

    if (!container || !mountOptions) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isInViewport = false;

    const syncPlayback = () => {
      controllerReference.current?.setActive(
        isInViewport && !document.hidden && !reducedMotionQuery.matches,
      );
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = Boolean(entry?.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.01 },
    );
    const handleVisibilityChange = () => syncPlayback();
    const handleReducedMotionChange = () => syncPlayback();

    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    void mountHalftoneCanvas({
      ...mountOptions,
      container,
      onError: (error) => latestOnErrorReference.current?.(error),
      signal: abortController.signal,
    }).then((controller) => {
      if (abortController.signal.aborted) {
        controller?.dispose();
        return;
      }

      controllerReference.current = controller;
      syncPlayback();
    });

    return () => {
      abortController.abort();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      controllerReference.current?.dispose();
      controllerReference.current = null;
    };
  }, []);

  useEffect(() => {
    controllerReference.current?.update({
      previewDistance,
      settings: resolvedSettings,
      shapeKey: resolvedShapeKey,
    });
  }, [previewDistance, resolvedSettings, resolvedShapeKey]);

  return (
    <div
      className={className}
      ref={mountReference}
      style={{
        background: resolvedSettings.background.transparent
          ? "transparent"
          : resolvedSettings.background.color,
        height: "100%",
        width: "100%",
        ...style,
      }}
    />
  );
}

export type DollarCoinProps = Omit<Halftone3DIllustrationProps, "shapeKey">;

export function DollarCoin(props: DollarCoinProps) {
  return <Halftone3DIllustration {...props} shapeKey="dollarCoin" />;
}

export default Halftone3DIllustration;
