import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useMemo, useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  variant?: "fade" | "fadeUp" | "fadeScale" | "slideLeft" | "slideRight";
  distance?: number;
  scaleFrom?: number;
  parallax?: boolean;
  parallaxStrength?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  variant = "fadeUp",
  distance = 16,
  scaleFrom = 0.98,
  parallax = false,
  parallaxStrength = 40,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll(
    shouldReduceMotion || !parallax
      ? undefined
      : {
          target: targetRef,
          offset: ["start end", "end start"],
        },
  );

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxStrength, -parallaxStrength],
  );

  const { initial, whileInView } = useMemo(() => {
    if (shouldReduceMotion) {
      return { initial: false as const, whileInView: undefined };
    }

    switch (variant) {
      case "fade":
        return {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        };
      case "fadeScale":
        return {
          initial: { opacity: 0, scale: scaleFrom },
          whileInView: { opacity: 1, scale: 1 },
        };
      case "slideLeft":
        return {
          initial: { opacity: 0, x: distance },
          whileInView: { opacity: 1, x: 0 },
        };
      case "slideRight":
        return {
          initial: { opacity: 0, x: -distance },
          whileInView: { opacity: 1, x: 0 },
        };
      case "fadeUp":
      default:
        return {
          initial: { opacity: 0, y: distance },
          whileInView: { opacity: 1, y: 0 },
        };
    }
  }, [distance, scaleFrom, shouldReduceMotion, variant]);

  return (
    <motion.div
      ref={targetRef}
      className={className}
      style={shouldReduceMotion || !parallax ? undefined : { y: parallaxY }}
      initial={initial}
      whileInView={whileInView}
      viewport={shouldReduceMotion ? undefined : { once, amount }}
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
