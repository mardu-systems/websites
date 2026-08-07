"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "../lib/utils";

type PopoverAnchorContextValue = {
  anchorRef: React.RefObject<HTMLSpanElement | null>;
  hasAnchor: boolean;
  setHasAnchor: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopoverAnchorContext =
  React.createContext<PopoverAnchorContextValue | null>(null);

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const [hasAnchor, setHasAnchor] = React.useState(false);
  const value = React.useMemo(
    () => ({ anchorRef, hasAnchor, setHasAnchor }),
    [hasAnchor],
  );

  return (
    <PopoverAnchorContext.Provider value={value}>
      <PopoverPrimitive.Root {...props} />
    </PopoverAnchorContext.Provider>
  );
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

function PopoverContent({
  className,
  align = "center",
  alignOffset,
  side,
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  const anchor = React.useContext(PopoverAnchorContext);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor?.hasAnchor ? anchor.anchorRef : undefined}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-hidden",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  render,
  ref,
  ...props
}: useRender.ComponentProps<"span">) {
  const anchor = React.useContext(PopoverAnchorContext);
  const setHasAnchor = anchor?.setHasAnchor;
  const refs: React.Ref<HTMLSpanElement>[] = [];

  if (anchor) refs.push(anchor.anchorRef);
  if (ref) refs.push(ref);

  React.useEffect(() => {
    setHasAnchor?.(true);
    return () => setHasAnchor?.(false);
  }, [setHasAnchor]);

  return useRender({
    defaultTagName: "span",
    render,
    ref: refs,
    props: { ...props, "data-slot": "popover-anchor" },
  });
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
