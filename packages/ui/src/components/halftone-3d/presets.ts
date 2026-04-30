import type {
  DeepPartial,
  Halftone3DPose,
  Halftone3DSettings,
  Halftone3DShapeKey,
} from "./types";

export const defaultHalftone3DSettings: Halftone3DSettings = {
  sourceMode: "shape",
  shapeKey: "dollarCoin",
  lighting: {
    intensity: 1,
    fillIntensity: 0.15,
    ambientIntensity: 0.08,
    angleDegrees: 45,
    height: 2,
  },
  material: {
    surface: "solid",
    color: "#d4d0c8",
    roughness: 0.42,
    metalness: 0.16,
    thickness: 150,
    refraction: 2,
    environmentPower: 5,
  },
  halftone: {
    enabled: true,
    scale: 24.72,
    power: -0.07,
    toneTarget: "light",
    width: 0.46,
    imageContrast: 1,
    dashColor: "#4A38F5",
    hoverDashColor: "#4A38F5",
  },
  background: {
    transparent: true,
    color: "#000000",
  },
  animation: {
    autoRotateEnabled: true,
    breatheEnabled: false,
    cameraParallaxEnabled: false,
    followHoverEnabled: false,
    followDragEnabled: false,
    floatEnabled: false,
    hoverHalftoneEnabled: false,
    hoverLightEnabled: false,
    dragFlowEnabled: false,
    lightSweepEnabled: false,
    rotateEnabled: false,
    autoSpeed: 0.13,
    autoWobble: 0,
    breatheAmount: 0.04,
    breatheSpeed: 0.8,
    cameraParallaxAmount: 0.3,
    cameraParallaxEase: 0.08,
    driftAmount: 8,
    hoverRange: 25,
    hoverEase: 0.08,
    hoverReturn: true,
    dragSens: 0.008,
    dragFriction: 0.08,
    dragMomentum: true,
    rotateAxis: "y",
    rotatePreset: "axis",
    rotateSpeed: 0.2,
    rotatePingPong: false,
    floatAmplitude: 0.16,
    floatSpeed: 0.8,
    lightSweepHeightRange: 0.5,
    lightSweepRange: 28,
    lightSweepSpeed: 0.7,
    springDamping: 0.72,
    springReturnEnabled: false,
    springStrength: 0.18,
    hoverHalftonePowerShift: 0.42,
    hoverHalftoneRadius: 0.2,
    hoverHalftoneWidthShift: -0.18,
    hoverLightIntensity: 0.8,
    hoverLightRadius: 0.2,
    dragFlowDecay: 0.08,
    dragFlowRadius: 0.24,
    dragFlowStrength: 1.8,
    hoverWarpStrength: 3,
    hoverWarpRadius: 0.15,
    dragWarpStrength: 5,
    waveEnabled: false,
    waveSpeed: 1,
    waveAmount: 2,
  },
};

export const defaultDollarCoinPose: Halftone3DPose = {
  autoElapsed: 269.151000000017,
  rotateElapsed: 1.1990000000000003,
  rotationX: 2.749660298162001e-39,
  rotationY: 34.914623805774504,
  rotationZ: -1.3248615483800522e-58,
  targetRotationX: 0,
  targetRotationY: 0,
  timeElapsed: 274.255,
};

export const DEFAULT_PREVIEW_DISTANCE = 6.1;
export function resolveHalftone3DSettings(
  shapeKey: Halftone3DShapeKey | undefined,
  overrides: DeepPartial<Halftone3DSettings> | undefined,
): Halftone3DSettings {
  const resolvedShapeKey =
    shapeKey ?? overrides?.shapeKey ?? defaultHalftone3DSettings.shapeKey;

  return {
    ...defaultHalftone3DSettings,
    ...overrides,
    sourceMode: "shape",
    shapeKey: resolvedShapeKey,
    lighting: {
      ...defaultHalftone3DSettings.lighting,
      ...overrides?.lighting,
    },
    material: {
      ...defaultHalftone3DSettings.material,
      ...overrides?.material,
    },
    halftone: {
      ...defaultHalftone3DSettings.halftone,
      ...overrides?.halftone,
    },
    background: {
      ...defaultHalftone3DSettings.background,
      ...overrides?.background,
    },
    animation: {
      ...defaultHalftone3DSettings.animation,
      ...overrides?.animation,
    },
  };
}

export function resolveHalftone3DPose(
  initialPose: Partial<Halftone3DPose> | undefined,
): Halftone3DPose {
  return {
    ...defaultDollarCoinPose,
    ...initialPose,
  };
}
