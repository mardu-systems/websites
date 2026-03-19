import { cn } from './utils';

type VariantMap = Record<string, Record<string, string>>;
type VariantOptions<T extends VariantMap> = {
  [K in keyof T]?: keyof T[K] & string;
} & {
  className?: string;
};

export type VariantProps<T extends (...args: any[]) => any> =
  T extends (selection?: infer Selection) => any
    ? Omit<NonNullable<Selection>, 'className'>
    : never;

export function cva<TVariants extends VariantMap>(
  base: string,
  config?: {
    variants?: TVariants;
    defaultVariants?: {
      [K in keyof TVariants]?: keyof TVariants[K] & string;
    };
  },
) {
  return (selection?: VariantOptions<TVariants>) => {
    const mergedSelection = {
      ...(config?.defaultVariants ?? {}),
      ...(selection ?? {}),
    };

    const variantClasses = Object.entries(config?.variants ?? {}).map(([variantName, values]) => {
      const variantValue = mergedSelection[variantName];
      return variantValue ? values[variantValue] : undefined;
    });

    return cn(base, ...variantClasses, selection?.className);
  };
}
