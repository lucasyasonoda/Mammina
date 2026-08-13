import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-wine text-paper-soft hover:bg-wine-dark",
        ghost: "bg-transparent border border-blush text-wine-dark hover:bg-blush-soft",
        outline:
          "border-[1.5px] border-sky text-wine-dark bg-transparent hover:bg-sky hover:text-wine-dark",
      },
      size: {
        default: "h-auto px-[26px] py-[13px]",
        sm: "h-auto px-4 py-2 text-xs",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
