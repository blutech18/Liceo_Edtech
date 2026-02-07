import { useRef, useEffect, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
};

const variantStyles: Record<
  string,
  { hidden: React.CSSProperties; visible: React.CSSProperties }
> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translate3d(0, 40px, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, transform: "scale3d(0.92, 0.92, 1)" },
    visible: { opacity: 1, transform: "scale3d(1, 1, 1)" },
  },
  "slide-left": {
    hidden: { opacity: 0, transform: "translate3d(-30px, 0, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  },
  "slide-right": {
    hidden: { opacity: 0, transform: "translate3d(30px, 0, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion.current) {
    return <div className={className}>{children}</div>;
  }

  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? styles.visible : styles.hidden),
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
