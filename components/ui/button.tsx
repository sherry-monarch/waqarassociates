import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const v = cva("inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50", {
  variants: { variant: { gold: "bg-gold text-ink hover:bg-white", ink: "bg-ink text-paper hover:bg-navy", outline: "border border-current hover:bg-white/10" }, size: { default: "h-12 px-7", sm: "h-9 px-5" } },
  defaultVariants: { variant: "gold", size: "default" },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof v> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...p }, ref) => {
  const C = asChild ? Slot : "button";
  return <C ref={ref} className={cn(v({ variant, size }), className)} {...p} />;
});
Button.displayName = "Button";
