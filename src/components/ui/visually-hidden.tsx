import * as React from "react";
import { cn } from "@/lib/utils";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "span";
    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0",
          className
        )}
        {...props}
      />
    );
  }
);
VisuallyHidden.displayName = "VisuallyHidden";
