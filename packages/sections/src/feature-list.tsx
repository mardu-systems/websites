'use client';

import type { SVGProps } from 'react';
import * as React from 'react';
import { cn } from '@mardu/ui/lib/utils';

type IconType = React.ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Render-ready DTO for a single feature bullet.
 */
export interface FeatureListItemDef {
  label: React.ReactNode;
  icon?: IconType;
  iconAriaLabel?: string;
}

export interface FeatureListProps {
  items?: FeatureListItemDef[];
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3;
  className?: string;
  iconClassName?: string;
  iconColorClassName?: string;
}

const textBySize = (size: FeatureListProps['size']) =>
  size === 'sm'
    ? 'text-[13px] md:text-sm'
    : size === 'lg'
      ? 'text-base md:text-lg'
      : 'text-sm md:text-base';

const iconBySize = (size: FeatureListProps['size']) =>
  size === 'sm'
    ? 'h-4 w-4 md:h-5 md:w-5'
    : size === 'lg'
      ? 'h-6 w-6 md:h-7 md:w-7'
      : 'h-5 w-5 md:h-6 md:w-6';

const layoutByCols = (columns: FeatureListProps['columns']) =>
  columns === 3
    ? 'grid grid-cols-1 gap-4 md:grid-cols-3'
    : columns === 2
      ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
      : 'space-y-4';

interface FeatureListItemProps {
  children: React.ReactNode;
  icon?: IconType;
  iconAriaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  iconClassName?: string;
  iconColorClassName?: string;
  className?: string;
}

function Item({
  children,
  icon: Icon,
  iconAriaLabel,
  size = 'md',
  iconClassName,
  iconColorClassName = 'text-primary',
  className,
}: FeatureListItemProps) {
  return (
    <li className={cn('flex items-start gap-3', className)}>
      {Icon ? (
        <Icon
          className={cn(iconBySize(size), 'mt-0.5 shrink-0', iconColorClassName, iconClassName)}
          aria-label={iconAriaLabel}
          aria-hidden={!iconAriaLabel}
        />
      ) : null}
      <span className={cn(textBySize(size), 'leading-relaxed')}>{children}</span>
    </li>
  );
}

function FeatureListRoot({
  items,
  children,
  size = 'md',
  columns = 1,
  className,
  iconClassName,
  iconColorClassName = 'text-primary',
}: FeatureListProps) {
  return (
    <ul className={cn(layoutByCols(columns), className)}>
      {items?.length
        ? items.map((item, index) => (
            <Item
              key={index}
              icon={item.icon}
              iconAriaLabel={item.iconAriaLabel}
              size={size}
              iconClassName={iconClassName}
              iconColorClassName={iconColorClassName}
            >
              {item.label}
            </Item>
          ))
        : children}
    </ul>
  );
}

const FeatureList = Object.assign(FeatureListRoot, { Item });
export default FeatureList;
