'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';

import { cn } from '../lib/utils';

function Progress({
  className,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={(state) =>
        cn(
          'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    >
      <ProgressPrimitive.Track className="size-full overflow-hidden rounded-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full transition-[width]"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
