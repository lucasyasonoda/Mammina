import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full border border-wine/25 bg-paper-soft px-3.5 py-3 text-[14.5px] text-ink placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-sky",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
