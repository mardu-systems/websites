// @ts-nocheck
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

const NOISE_TEXTURE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(#n)' opacity='0.7'/></svg>",
)}`;

export type NoiseAuroraTone = 'indigo-amber' | 'rose-indigo';
export type NoiseAuroraIntensity = 'soft' | 'medium' | 'strong';

/**
 * API DTO for a full-bleed gradient + noise background layer.
 */
export type NoiseAuroraBackgroundProps = {
  className?: string;
  tone?: NoiseAuroraTone;
  intensity?: NoiseAuroraIntensity;
};

/**
 * API DTO for compact heading accents behind text blocks.
 */
export type HeadingNoiseAccentProps = {
  className?: string;
  tone?: NoiseAuroraTone;
  intensity?: NoiseAuroraIntensity;
};

function getAuroraStyle(tone: NoiseAuroraTone, intensity: NoiseAuroraIntensity): CSSProperties {
  const opacityByIntensity: Record<NoiseAuroraIntensity, number> = {
    soft: 0.4,
    medium: 0.55,
    strong: 0.7,
  };

  const backgroundByTone: Record<NoiseAuroraTone, string> = {
    'indigo-amber': `
      radial-gradient(45% 40% at 12% 88%, rgb(68 95 255 / 0.75) 0%, rgb(68 95 255 / 0) 65%),
      radial-gradient(48% 40% at 36% 10%, rgb(238 156 65 / 0.64) 0%, rgb(238 156 65 / 0) 70%),
      radial-gradient(40% 58% at 88% 72%, rgb(255 255 255 / 0.38) 0%, rgb(255 255 255 / 0) 70%),
      linear-gradient(102deg, rgb(19 22 34) 10%, rgb(31 33 48) 52%, rgb(12 13 20) 100%)
    `,
    'rose-indigo': `
      radial-gradient(48% 44% at 16% 15%, rgb(242 122 122 / 0.6) 0%, rgb(242 122 122 / 0) 70%),
      radial-gradient(42% 40% at 18% 90%, rgb(105 114 255 / 0.58) 0%, rgb(105 114 255 / 0) 70%),
      radial-gradient(34% 54% at 85% 70%, rgb(244 230 230 / 0.32) 0%, rgb(244 230 230 / 0) 72%),
      linear-gradient(110deg, rgb(53 22 28) 4%, rgb(85 44 27) 44%, rgb(14 15 23) 100%)
    `,
  };

  return {
    backgroundImage: backgroundByTone[tone],
    opacity: opacityByIntensity[intensity],
  };
}

export function NoiseAuroraBackground({
  className,
  tone = 'indigo-amber',
  intensity = 'medium',
}: NoiseAuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute inset-0" style={getAuroraStyle(tone, intensity)} />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: `url("${NOISE_TEXTURE_DATA_URI}")`,
          backgroundSize: '220px 220px',
          opacity: intensity === 'soft' ? 0.15 : intensity === 'medium' ? 0.21 : 0.3,
        }}
      />
    </div>
  );
}

export function HeadingNoiseAccent({
  className,
  tone = 'indigo-amber',
  intensity = 'medium',
}: HeadingNoiseAccentProps) {
  const style = getAuroraStyle(tone, intensity);

  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-md blur-[1px]',
        className,
      )}
    >
      <span className="absolute inset-0 rounded-md" style={style} />
      <span
        className="absolute inset-0 rounded-md mix-blend-soft-light"
        style={{
          backgroundImage: `url("${NOISE_TEXTURE_DATA_URI}")`,
          backgroundSize: '150px 150px',
          opacity: intensity === 'soft' ? 0.2 : intensity === 'medium' ? 0.27 : 0.34,
        }}
      />
      <span
        className="absolute inset-0 rounded-md"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.22) 1px, transparent 1px, transparent 8px)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)',
          opacity: 0.38,
        }}
      />
    </span>
  );
}
