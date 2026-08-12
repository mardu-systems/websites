'use client';

import clsx from 'clsx';
import * as React from 'react';

/** Properties for the accessible, horizontally scrollable progress tracker. */
export type StepIndicatorProps = {
  /** 1-based current step. */
  current: number;
  /** Labels also determine the number of steps when provided. */
  labels?: string[];
  /** Explicit number of steps when no labels are available. */
  total?: number;
  /** Enables direct navigation; receives a 1-based index. */
  onStepClick?: (index: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
  showProgressLine?: boolean;
};

type StepState = 'active' | 'done' | 'pending';
type StepSize = NonNullable<StepIndicatorProps['size']>;

const sizeConfig = {
  sm: {
    circle: 'w-7 h-7 text-xs',
    gap: 'gap-1',
    label: 'text-[11px]',
    padding: 'p-1',
    lineHeight: 'h-0.5',
  },
  md: {
    circle: 'w-9 h-9 text-sm',
    gap: 'gap-1',
    label: 'text-xs',
    padding: 'p-1.5',
    lineHeight: 'h-0.75',
  },
  lg: {
    circle: 'w-12 h-12 text-base',
    gap: 'gap-1',
    label: 'text-sm',
    padding: 'p-2',
    lineHeight: 'h-1',
  },
} as const;

const stepStyles: Record<StepState, string> = {
  active: 'bg-primary text-primary-foreground border-primary shadow-sm',
  done: 'bg-primary/15 text-primary border-primary/40',
  pending: 'bg-background text-muted-foreground border-border',
};

function getStepState(stepIndex: number, current: number): StepState {
  if (stepIndex === current) return 'active';
  return stepIndex < current ? 'done' : 'pending';
}

function getAriaLabel(stepIndex: number, total: number, label?: string) {
  const baseLabel = `Schritt ${stepIndex} von ${total}`;
  return label ? `${baseLabel}: ${label}` : baseLabel;
}

function StepCircle({
  stepIndex,
  state,
  size,
  label,
  totalSteps,
  onClick,
}: {
  stepIndex: number;
  state: StepState;
  size: StepSize;
  label?: string;
  totalSteps: number;
  onClick?: () => void;
}) {
  const config = sizeConfig[size];
  const circle = (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full border',
        config.circle,
        stepStyles[state],
      )}
      aria-current={state === 'active' ? 'step' : undefined}
      aria-label={getAriaLabel(stepIndex, totalSteps, label)}
    >
      <span className="font-medium tabular-nums">{stepIndex}</span>
    </div>
  );

  if (!onClick) return circle;

  return (
    <button
      type="button"
      className={clsx(
        'group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        config.padding,
      )}
      onClick={onClick}
    >
      {circle}
    </button>
  );
}

function ProgressLine({ isDone, size }: { isDone: boolean; size: StepSize }) {
  const config = sizeConfig[size];

  return (
    <li aria-hidden="true" className={clsx('min-w-6 flex-1', config.gap)}>
      <div className={clsx('relative w-full bg-border/70', config.lineHeight)}>
        <div
          className={clsx(
            'absolute inset-y-0 left-0 transition-all duration-300 motion-reduce:transition-none',
            config.lineHeight,
            isDone ? 'w-full bg-primary' : 'w-0',
          )}
        />
      </div>
    </li>
  );
}

export default function StepIndicator({
  current,
  labels,
  total,
  onStepClick,
  size = 'md',
  className,
  showLabels = true,
  showProgressLine = true,
}: StepIndicatorProps) {
  const stepCount = labels?.length ?? total ?? 0;
  const clampedCurrent = Math.min(Math.max(current, 1), Math.max(stepCount, 1));
  const activeStepRef = React.useRef<HTMLLIElement | null>(null);
  const config = sizeConfig[size];

  React.useEffect(() => {
    activeStepRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [clampedCurrent]);

  if (stepCount === 0) return null;

  return (
    <div className={clsx('no-scrollbar w-full overflow-x-auto', className)}>
      <nav aria-label="Fortschritt">
        <ol
          className={clsx(
            'flex snap-x snap-mandatory flex-nowrap items-center whitespace-nowrap',
            config.gap,
          )}
        >
          {Array.from({ length: stepCount }, (_, index) => {
            const stepIndex = index + 1;
            const state = getStepState(stepIndex, clampedCurrent);
            const stepLabel = labels?.[index];

            return (
              <React.Fragment key={stepIndex}>
                <li
                  className="flex snap-center items-center px-1"
                  ref={
                    state === 'active'
                      ? (element) => {
                          activeStepRef.current = element;
                        }
                      : undefined
                  }
                >
                  <StepCircle
                    stepIndex={stepIndex}
                    state={state}
                    size={size}
                    label={stepLabel}
                    totalSteps={stepCount}
                    onClick={onStepClick ? () => onStepClick(stepIndex) : undefined}
                  />
                  {showLabels && stepLabel ? (
                    <span className={clsx('ml-2 text-muted-foreground', config.label)}>
                      {stepLabel}
                    </span>
                  ) : null}
                </li>
                {showProgressLine && stepIndex < stepCount ? (
                  <ProgressLine isDone={state === 'done'} size={size} />
                ) : null}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
