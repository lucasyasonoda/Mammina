import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-wine-dark",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
