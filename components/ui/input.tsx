import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => (
  <input ref={ref} className={cn("h-12 w-full border-b border-ink/30 bg-transparent px-0 text-base placeholder:text-ink/50 focus:border-gold focus:outline-none", className)} {...p} />
));
Input.displayName = "Input";
