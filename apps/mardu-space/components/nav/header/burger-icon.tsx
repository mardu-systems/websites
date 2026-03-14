'use client';

import clsx from 'clsx';

interface BurgerIconProps {
  isOpen: boolean;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function BurgerIcon({ isOpen, variant = 'light', className }: BurgerIconProps) {
  const lineColor = variant === 'light' ? 'bg-neutral-900' : 'bg-white';

  return (
    <div className={clsx('flex h-5 w-6 flex-col items-center justify-center gap-1', className)}>
      {/* Top line */}
      <span
        className={clsx(
          'h-0.5 w-full transform transition-all duration-300 ease-in-out motion-reduce:transition-none',
          lineColor,
          isOpen && 'translate-y-[6px] rotate-45',
        )}
      />
      {/* Middle line */}
      <span
        className={clsx(
          'h-0.5 w-full transform transition-all duration-300 ease-in-out motion-reduce:transition-none',
          lineColor,
          isOpen && 'opacity-0',
        )}
      />
      {/* Bottom line */}
      <span
        className={clsx(
          'h-0.5 w-full transform transition-all duration-300 ease-in-out motion-reduce:transition-none',
          lineColor,
          isOpen && '-translate-y-[6px] -rotate-45',
        )}
      />
    </div>
  );
}
