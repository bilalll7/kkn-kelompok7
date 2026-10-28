import type { ReactNode } from "react";
export function Reveal({
  children,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  variant?: "up" | "fade" | "left" | "right" | "image";
  className?: string;
}) {
  return (
    <div data-reveal={variant} className={className}>
      {children}
    </div>
  );
}
