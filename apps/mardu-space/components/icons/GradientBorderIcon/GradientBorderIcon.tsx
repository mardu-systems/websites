import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import classes from '../index.module.scss';
import { IconProps } from '../types';

export const GradientBorderIcon: React.FC<IconProps> = (props) => {
  const { className, size, style } = props;

  return (
    <svg
      className={[className, classes.icon, size && classes[size]].filter(Boolean).join(' ')}
      fill="none"
      height="69"
      style={style}
      viewBox="0 0 69 69"
      width="69"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="34.5" cy="34.5" r="33.5" stroke="url(#paint0_linear_4502_439)" strokeWidth="4" />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_4502_439"
          x1="52.4376"
          x2="-5.83957"
          y1="-8.56049"
          y2="51.5721"
        >
          <stop stopColor="#007FAE" />
          <stop offset="0.653394" stopColor="#578A9C" />
          <stop offset="1" stopColor="#DFC198" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const GradientBorderPulsing: React.FC<{
  delaySec?: number;
  className?: string;
  showStaticRing?: boolean;
}> = ({ delaySec = 0, className, showStaticRing = true }) => {
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);
  return (
    <span className={['pointer-events-none absolute inset-0', className].filter(Boolean).join(' ')}>
      {showStaticRing && <GradientBorderIcon size="full" className="opacity-80" />}
      <motion.span
        className="absolute inset-0 rounded-full bg-background"
        initial={{ scale: 0.35, opacity: 0.2 }}
        animate={{ scale: 1.05, opacity: 0 }}
        transition={{ duration: 2, ease: easing, repeat: Infinity, delay: delaySec }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-background"
        initial={{ scale: 0.5, opacity: 0.12 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 2.2, ease: easing, repeat: Infinity, delay: delaySec + 0.4 }}
      />
    </span>
  );
};
