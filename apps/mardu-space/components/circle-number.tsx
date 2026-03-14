'use client';

interface CircleNumberProps {
  number: string | number;
  size?: string;
  borderWidth?: string;
  textSize?: string;
  color?: string;
  className?: string;
  anchor?: boolean;
}

export default function CircleNumber({
  number,
  size = 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20',
  borderWidth = 'border-[3px] sm:border-[4px] lg:border-[6px]',
  textSize = 'text-xl sm:text-3xl lg:text-4xl',
  color = 'border-accent text-accent',
  className = '',
  anchor = false,
}: CircleNumberProps) {
  return (
    <div
      data-timeline-anchor={anchor ? 'true' : undefined}
      className={`${size} ${borderWidth} rounded-full ${color} flex items-center justify-center ${className}`}
    >
      <span className={`${textSize} font-black leading-none tracking-tight`}>{number}</span>
    </div>
  );
}
