"use client";

import type {SVGProps} from "react";
import * as React from "react";
import {cn} from "@/lib/utils";

/** Nur Komponententypen übergeben: icon={Shield} */
type IconType = React.ComponentType<SVGProps<SVGSVGElement>>;

export type FeatureListItemDef = {
    label: React.ReactNode;
    icon?: IconType;
    iconAriaLabel?: string;
};

export type FeatureListProps = {
    items?: FeatureListItemDef[];
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    columns?: 1 | 2 | 3;
    className?: string;
    iconClassName?: string;
    iconColorClassName?: string; // z.B. "text-violet-600"
};

const textBySize = (s: FeatureListProps["size"]) =>
    s === "sm" ? "text-[13px] md:text-sm"
        : s === "lg" ? "text-base md:text-lg"
            : "text-sm md:text-base";

const iconBySize = (s: FeatureListProps["size"]) =>
    s === "sm" ? "h-4 w-4 md:h-5 md:w-5"
        : s === "lg" ? "h-6 w-6 md:h-7 md:w-7"
            : "h-5 w-5 md:h-6 md:w-6";

const layoutByCols = (c: FeatureListProps["columns"]) =>
    c === 3 ? "grid grid-cols-1 md:grid-cols-3 gap-4"
        : c === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "space-y-4";

/* --------- Item --------- */

type ItemProps = {
    children: React.ReactNode;
    icon?: IconType;
    iconAriaLabel?: string;
    size?: "sm" | "md" | "lg";
    iconClassName?: string;
    iconColorClassName?: string;
    className?: string;
};

function Item({
                  children,
                  icon: Icon,
                  iconAriaLabel,
                  size = "md",
                  iconClassName,
                  iconColorClassName = "text-primary",
                  className,
              }: ItemProps) {
    const textSize = textBySize(size);
    const iconSize = iconBySize(size);

    return (
        <li className={cn("flex items-start gap-3", className)}>
            {Icon ? (
                <Icon
                    className={cn(iconSize, "shrink-0 mt-0.5", iconColorClassName, iconClassName)}
                    aria-label={iconAriaLabel}
                    aria-hidden={!iconAriaLabel}
                />
            ) : null}
            <span className={cn(textSize, "leading-relaxed")}>{children}</span>
        </li>
    );
}

/* --------- Root --------- */

function FeatureListRoot({
                             items,
                             children,
                             size = "md",
                             columns = 1,
                             className,
                             iconClassName,
                             iconColorClassName = "text-primary",
                         }: FeatureListProps) {
    const layout = layoutByCols(columns);

    return (
        <ul className={cn(layout, className)}>
            {items && items.length
                ? items.map((it, i) => (
                    <Item
                        key={i}
                        icon={it.icon}
                        iconAriaLabel={it.iconAriaLabel}
                        size={size}
                        iconClassName={iconClassName}
                        iconColorClassName={iconColorClassName}
                    >
                        {it.label}
                    </Item>
                ))
                : children}
        </ul>
    );
}

const FeatureList = Object.assign(FeatureListRoot, {Item});
export default FeatureList;
