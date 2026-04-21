import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] transition",
        variant === "default"
          ? "border border-cyan-300/70 text-space-cyan hover:bg-cyan-400/10"
          : "border border-orange-300/60 text-space-orange hover:bg-orange-400/10",
        className,
      )}
      {...props}
    />
  );
}
