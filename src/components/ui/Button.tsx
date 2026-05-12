"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "outline" | "link";
type Size = "default" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight whitespace-nowrap select-none btn-press disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink hover:bg-accent-deep",
  ghost:
    "text-cream hover:bg-ink-soft",
  outline:
    "border border-line text-cream hover:border-line-strong hover:text-cream",
  link:
    "text-cream underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  default: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  sm: "h-10 px-4 text-xs",
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: Variant;
    size?: Size;
    withArrow?: boolean;
  }
>(({ className, variant = "primary", size = "default", asChild, withArrow, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {withArrow ? <ArrowUpRight className="size-4" strokeWidth={1.5} /> : null}
      </span>
    </Comp>
  );
});
Button.displayName = "Button";
