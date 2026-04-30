'use client';

import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';

import {cn} from '../lib/utils';

type ShaderUniforms = {
    uTime: { value: number };
    uResolution: { value: THREE.Vector2 };
    uMouse: { value: THREE.Vector2 };
    uMouseActive: { value: number };
    uBaseColor: { value: THREE.Color };
    uPrimaryColor: { value: THREE.Color };
    uSecondaryColor: { value: THREE.Color };
    uPixelRatio: { value: number };
};

export type InteractiveStripeShaderBackgroundProps = {
    className?: string;
    baseColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    interactive?: boolean;
    intensity?: number;
};

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform vec3 uBaseColor;
uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform float uPixelRatio;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(19.17, 7.31);
    amplitude *= 0.5;
  }

  return value;
}

float sdCircle(vec2 p, vec2 center, float radius) {
  return length(p - center) - radius;
}

float sdSegment(vec2 p, vec2 a, vec2 b, float radius) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);

  return length(pa - ba * h) - radius;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 aspectUv = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 mouse = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);
  float time = uTime * 0.16;

  // mouse influence
  float mouseDistance = length(aspectUv - mouse);
  float hover = smoothstep(0.38, 0.0, mouseDistance) * uMouseActive;
  vec2 mouseDirection = normalize(aspectUv - mouse + 0.0001);
  vec2 hoverPull = mouseDirection * hover * 0.032;

  vec2 p = aspectUv;
  p.x += sin((p.y + time) * 3.8) * 0.016;
  p.x += (fbm(p * 1.85 + vec2(time, -time * 0.42)) - 0.5) * 0.06;
  p += hoverPull;
  p.x += sin((p.y + uTime * 0.8) * 42.0) * hover * 0.014;
  p.y += cos((p.x - uTime * 0.4) * 18.0) * hover * 0.006;

  // procedural shape field
  float leftColumn = abs(p.x + 0.92) - 0.13;
  leftColumn = max(leftColumn, abs(p.y + 0.02) - 0.64);

  float leftCap = sdCircle(p, vec2(-0.86, 0.47), 0.22);
  float leftBelly = sdCircle(p, vec2(-0.92, -0.16), 0.32);
  float topBridge = sdSegment(p, vec2(-0.78, 0.22), vec2(-0.08, 0.08), 0.115);
  float centerStem = sdSegment(p, vec2(-0.16, 0.56), vec2(-0.02, -0.58), 0.075);
  float centerBelly = sdCircle(p, vec2(0.05, -0.04), 0.24);
  float rightArc = abs(length((p - vec2(0.64, -0.02)) * vec2(0.82, 1.08)) - 0.44) - 0.04;
  float rightDiagonal = sdSegment(p, vec2(0.34, 0.2), vec2(1.12, -0.44), 0.052);
  float rightTail = sdSegment(p, vec2(0.84, -0.28), vec2(1.2, -0.5), 0.035);

  float field = min(leftColumn, leftCap);
  field = min(field, leftBelly);
  field = min(field, topBridge);
  field = min(field, centerStem);
  field = min(field, centerBelly);
  field = min(field, rightArc);
  field = min(field, rightDiagonal);
  field = min(field, rightTail);

  float erosion = fbm(p * 3.4 + vec2(time * 0.48, -time * 0.32));
  float shape = smoothstep(0.034, -0.012, field + (erosion - 0.5) * 0.04);

  // horizontal stripe mask
  float stripeFrequency = mix(70.0, 84.0, hover);
  float stripeWarp = sin(uv.x * 7.0 + time) * 0.001 + (fbm(vec2(uv.x * 1.4, uv.y * 0.6 + time)) - 0.5) * 0.0012;
  float stripeCoord = (uv.y + stripeWarp + hover * 0.0012) * stripeFrequency;
  float stripeCenter = abs(fract(stripeCoord) - 0.5);
  float stripe = 1.0 - smoothstep(0.08, 0.13, stripeCenter);

  // broken segment noise
  vec2 segmentUv = vec2(uv.x + hover * 0.01 * sin(uv.y * 82.0 + uTime), uv.y);
  vec2 cell = floor(vec2(segmentUv.x * 138.0, uv.y * stripeFrequency));
  float segmentNoise = hash(cell);
  float rowNoise = hash(vec2(0.0, cell.y));
  float neighborNoise = hash(cell + vec2(1.0, 0.0));
  float runNoise = max(segmentNoise, neighborNoise * 0.62);
  float shortRuns = smoothstep(0.16 - hover * 0.08, 0.42, runNoise);
  float longRuns = smoothstep(0.25, 0.66, fbm(vec2(cell.x * 0.04, cell.y * 0.17 + time * 0.35)));
  float rowGate = smoothstep(0.06, 0.22, rowNoise);
  float brokenSegments = max(shortRuns * 0.52, longRuns) * rowGate;

  float edgeFade = smoothstep(0.03, 0.36, shape);
  float density = shape * edgeFade * stripe * brokenSegments;
  float softDots = shape * (1.0 - stripe) * smoothstep(0.92 - hover * 0.14, 0.985, hash(cell + 17.0));
  float ink = clamp(density + softDots * 0.09 + hover * stripe * shape * 0.08, 0.0, 1.0);

  // final color composition
  vec3 stripeColor = mix(uPrimaryColor, uSecondaryColor, clamp(smoothstep(0.18, 0.9, uv.y) + hover * 0.08, 0.0, 1.0));
  float brightness = 0.86 + shape * 0.06 + hover * 0.14;
  vec3 color = mix(uBaseColor, stripeColor * brightness, ink);

  float vignette = smoothstep(1.55, 0.24, length(aspectUv * vec2(0.62, 0.9)));
  color = mix(color, uBaseColor, (1.0 - vignette) * 0.22);

  gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderPlane({
                         baseColor,
                         primaryColor,
                         secondaryColor,
                         interactive,
                         intensity,
                     }: Required<Omit<InteractiveStripeShaderBackgroundProps, 'className'>>) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
    const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
    const targetActivity = useRef(0);
    const smoothActivity = useRef(0);
    const {size, gl} = useThree();

    const uniforms = useMemo<ShaderUniforms>(
        () => ({
            uTime: {value: 0},
            uResolution: {value: new THREE.Vector2(1, 1)},
            uMouse: {value: new THREE.Vector2(0.5, 0.5)},
            uMouseActive: {value: 0},
            uBaseColor: {value: new THREE.Color(baseColor)},
            uPrimaryColor: {value: new THREE.Color(primaryColor)},
            uSecondaryColor: {value: new THREE.Color(secondaryColor)},
            uPixelRatio: {value: 1},
        }),
        [baseColor, primaryColor, secondaryColor],
    );

    useEffect(() => {
        const material = materialRef.current;

        if (!material) {
            return;
        }

        material.uniforms.uBaseColor.value.set(baseColor);
        material.uniforms.uPrimaryColor.value.set(primaryColor);
        material.uniforms.uSecondaryColor.value.set(secondaryColor);
    }, [baseColor, primaryColor, secondaryColor]);

    useFrame((state, delta) => {
        const material = materialRef.current;

        if (!material) {
            return;
        }

        smoothMouse.current.lerp(targetMouse.current, 1 - Math.pow(0.001, delta));
        const activityTarget = interactive ? targetActivity.current * intensity : 0;
        smoothActivity.current +=
            (activityTarget - smoothActivity.current) * Math.min(1, delta * 8);
        targetActivity.current *= 0.92;

        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uResolution.value.set(size.width, size.height);
        material.uniforms.uPixelRatio.value = gl.getPixelRatio();
        material.uniforms.uMouse.value.copy(smoothMouse.current);
        material.uniforms.uMouseActive.value = smoothActivity.current;
    });

    useEffect(() => {
        const element = gl.domElement;

        if (!interactive) {
            targetActivity.current = 0;
            return;
        }

        const handlePointerMove = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();

            targetMouse.current.set(
                (event.clientX - rect.left) / rect.width,
                1 - (event.clientY - rect.top) / rect.height,
            );

            targetActivity.current = 1;
        };

        const handlePointerLeave = () => {
            targetActivity.current = 0;
        };

        element.addEventListener('pointermove', handlePointerMove);
        element.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            element.removeEventListener('pointermove', handlePointerMove);
            element.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, [gl, interactive]);

    return (
        <mesh>
            <planeGeometry args={[2, 2]}/>
            <shaderMaterial
                ref={materialRef}
                depthTest={false}
                depthWrite={false}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                vertexShader={vertexShader}
            />
        </mesh>
    );
}

export function InteractiveStripeShaderBackground({
                                                      className,
                                                      baseColor = '#f7f6f3',
                                                      primaryColor = '#2f3cff',
                                                      secondaryColor = '#8d5cf6',
                                                      interactive = true,
                                                      intensity = 1,
                                                  }: InteractiveStripeShaderBackgroundProps) {
    return (
        <div
            className={cn('absolute inset-0 overflow-hidden bg-[#f7f6f3]', className)}
        >
            <Canvas
                className="pointer-events-auto"
                camera={{position: [0, 0, 1], near: 0.1, far: 10}}
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
            >
                <ShaderPlane
                    baseColor={baseColor}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    interactive={interactive}
                    intensity={intensity}
                />
            </Canvas>
        </div>
    );
}

export function InteractiveStripeShaderHero() {
    return (
        <section className="relative min-h-[720px] overflow-hidden bg-[#f7f6f3]">
            <InteractiveStripeShaderBackground intensity={0.85}/>
            <div
                className="relative z-10 mx-auto flex min-h-[720px] w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
                <div className="mb-6 flex items-center gap-3">
                    <a
                        className="border border-black bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                        href="#"
                    >
                        Get started
                    </a>
                    <a
                        className="border border-black/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground"
                        href="#"
                    >
                        Talk to us
                    </a>
                </div>
                <h1 className="max-w-4xl text-[clamp(3.4rem,9vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.06em] text-foreground">
                    Build your SaaS ops layer
                </h1>
                <p className="mt-7 max-w-xl text-sm leading-relaxed text-foreground/62 md:text-base">
                    A calm interactive WebGL hero background with procedural stripe
                    fields, dithered segments and subtle pointer response.
                </p>
            </div>
        </section>
    );
}
