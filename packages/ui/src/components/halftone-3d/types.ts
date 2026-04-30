import type { CSSProperties } from "react";
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Builtin-Objekte, die ohne externe Loader direkt als Three.js-Geometrie gerendert werden.
 */
export type Halftone3DShapeKey =
  | "torusKnot"
  | "sphere"
  | "torus"
  | "icosahedron"
  | "box"
  | "cone"
  | "cylinder"
  | "octahedron"
  | "dodecahedron"
  | "tetrahedron"
  | "sunCoin"
  | "lotusCoin"
  | "arrowTarget"
  | "dollarCoin";

/**
 * Lichtsetup für Haupt-, Füll- und Umgebungslicht.
 */
export type Halftone3DLightingSettings = {
  intensity: number;
  fillIntensity: number;
  ambientIntensity: number;
  angleDegrees: number;
  height: number;
};

/**
 * Materialparameter für die 3D-Geometrie vor dem Halftone-Postprocessing.
 */
export type Halftone3DMaterialSettings = {
  surface: "solid" | "glass";
  color: string;
  roughness: number;
  metalness: number;
  thickness: number;
  refraction: number;
  environmentPower: number;
};

/**
 * Halftone-Shaderparameter für Rastergröße, Tonwertziel und Strichfarbe.
 */
export type Halftone3DHalftoneSettings = {
  enabled: boolean;
  scale: number;
  power: number;
  toneTarget: "light" | "dark";
  width: number;
  imageContrast: number;
  dashColor: string;
  hoverDashColor: string;
};

/**
 * Hintergrundvertrag für den WebGL-Renderer.
 */
export type Halftone3DBackgroundSettings = {
  transparent: boolean;
  color: string;
};

/**
 * Animations- und Interaktionsparameter für Rotation, Drag, Hover und Lichtbewegung.
 */
export type Halftone3DAnimationSettings = {
  autoRotateEnabled: boolean;
  breatheEnabled: boolean;
  cameraParallaxEnabled: boolean;
  followHoverEnabled: boolean;
  followDragEnabled: boolean;
  floatEnabled: boolean;
  hoverHalftoneEnabled: boolean;
  hoverLightEnabled: boolean;
  dragFlowEnabled: boolean;
  lightSweepEnabled: boolean;
  rotateEnabled: boolean;
  autoSpeed: number;
  autoWobble: number;
  breatheAmount: number;
  breatheSpeed: number;
  cameraParallaxAmount: number;
  cameraParallaxEase: number;
  driftAmount: number;
  hoverRange: number;
  hoverEase: number;
  hoverReturn: boolean;
  dragSens: number;
  dragFriction: number;
  dragMomentum: boolean;
  rotateAxis: "x" | "y" | "z" | "xy" | "-x" | "-y" | "-z" | "-xy";
  rotatePreset: "axis" | "lissajous" | "orbit" | "tumble";
  rotateSpeed: number;
  rotatePingPong: boolean;
  floatAmplitude: number;
  floatSpeed: number;
  lightSweepHeightRange: number;
  lightSweepRange: number;
  lightSweepSpeed: number;
  springDamping: number;
  springReturnEnabled: boolean;
  springStrength: number;
  hoverHalftonePowerShift: number;
  hoverHalftoneRadius: number;
  hoverHalftoneWidthShift: number;
  hoverLightIntensity: number;
  hoverLightRadius: number;
  dragFlowDecay: number;
  dragFlowRadius: number;
  dragFlowStrength: number;
  hoverWarpStrength: number;
  hoverWarpRadius: number;
  dragWarpStrength: number;
  waveEnabled: boolean;
  waveSpeed: number;
  waveAmount: number;
};

/**
 * Vollständiges Settings-DTO für die 3D-Halftone-Illustration.
 */
export type Halftone3DSettings = {
  sourceMode: "shape";
  shapeKey: Halftone3DShapeKey;
  lighting: Halftone3DLightingSettings;
  material: Halftone3DMaterialSettings;
  halftone: Halftone3DHalftoneSettings;
  background: Halftone3DBackgroundSettings;
  animation: Halftone3DAnimationSettings;
};

/**
 * Startpose für Rotation und interne Zeitbasis. Wird beim Mount gelesen.
 */
export type Halftone3DPose = {
  autoElapsed: number;
  rotateElapsed: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  targetRotationX: number;
  targetRotationY: number;
  timeElapsed: number;
};

/**
 * Öffentliche Props-API der wiederverwendbaren Client-Komponente.
 */
export type Halftone3DIllustrationProps = {
  shapeKey?: Halftone3DShapeKey;
  settings?: DeepPartial<Halftone3DSettings>;
  initialPose?: Partial<Halftone3DPose>;
  previewDistance?: number;
  className?: string;
  style?: CSSProperties;
  onError?: (error: unknown) => void;
};
