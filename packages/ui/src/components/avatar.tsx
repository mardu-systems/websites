'use client';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

import { cn } from '../lib/utils';

function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={(state) =>
        cn(
          'relative flex size-8 shrink-0 overflow-hidden rounded-full',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={(state) =>
        cn(
          'aspect-square size-full',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={(state) =>
        cn(
          'bg-muted flex size-full items-center justify-center rounded-full',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
