import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Simplified ScrollReveal - just renders children without animation overhead.
 * This eliminates the lag when scrolling back to sections.
 */
export function ScrollReveal({
  children,
  className,
}: ScrollRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
