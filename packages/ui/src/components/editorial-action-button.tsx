import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "./button";
import { cn } from "../lib/utils";

export type EditorialActionButtonProps = Omit<
  ComponentProps<typeof Button>,
  "children" | "className" | "size" | "variant"
> & {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  priority?: "primary" | "secondary";
  tone?: "light" | "dark";
};

/**
 * Canonical page-level action for Mardu's editorial surfaces.
 *
 * Use this for prominent navigation and marketing CTAs. Form submits, dialog
 * controls and compact product actions continue to use the generic `Button`.
 */
function EditorialActionButton({
  children,
  className,
  icon = <ArrowUpRight aria-hidden="true" />,
  priority = "primary",
  tone = "light",
  ...props
}: EditorialActionButtonProps) {
  const isDark = tone === "dark";
  const isPrimary = priority === "primary";

  return (
    <Button
      data-slot="editorial-action-button"
      className={cn(
        "group h-12 gap-2.5 rounded-none border-y bg-transparent px-0 text-base font-normal shadow-none",
        "hover:bg-transparent focus-visible:ring-offset-2",
        isDark
          ? "border-white/30 text-white hover:border-white hover:text-white focus-visible:ring-white/45"
          : "border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full transition-colors",
          "[&_svg]:size-3.5 [&_svg]:stroke-[1.8]",
          "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out",
          "group-hover:[&_svg]:rotate-45 group-focus-visible:[&_svg]:rotate-45 motion-reduce:[&_svg]:transition-none",
          isPrimary && isDark && "bg-white text-black",
          isPrimary && !isDark && "bg-mardu-purple text-white",
          !isPrimary && isDark && "border border-white/45 text-white",
          !isPrimary &&
            !isDark &&
            "border border-foreground/30 text-foreground group-hover:border-primary group-hover:text-primary",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      {children}
    </Button>
  );
}

export { EditorialActionButton };
