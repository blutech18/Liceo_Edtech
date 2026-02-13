import { useRef, useEffect, useState, useMemo } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface InfiniteSliderProps {
  images: Image[];
  speed?: number; // duration in seconds for one complete cycle
  direction?: "left" | "right";
}

export function InfiniteSlider({
  images,
  speed = 30,
  direction = "left",
}: InfiniteSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Calculate animation duration based on number of images
  // Higher duration = slower sliding
  const duration = useMemo(() => {
    // More images = longer duration for consistent speed
    return Math.max(60, images.length * 5);
  }, [images.length]);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasAppeared) {
          setHasAppeared(true);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [hasAppeared]);

  const animationStyle = useMemo(() => {
    const animationName = direction === "left" ? "scroll-left" : "scroll-right";
    return {
      animation: `${animationName} ${duration}s linear infinite`,
      animationPlayState: isVisible && !isPaused ? "running" : "paused",
    };
  }, [direction, duration, isVisible, isPaused]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full py-4 md:py-6 overflow-hidden transition-opacity duration-700 ease-out"
      style={{ opacity: hasAppeared ? 1 : 0 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* CSS Keyframes */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Slider track */}
      <div
        className="flex gap-4 sm:gap-5 md:gap-6"
        style={{
          width: "max-content",
          willChange: "transform",
          ...animationStyle,
        }}
      >
        {/* Duplicate images twice for seamless loop */}
        {[...images, ...images].map(({ src, alt }, index) => (
          <div
            key={`${index}-${src}`}
            className="flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-[3px]"
            style={{
              width: "clamp(220px, 32vw, 350px)",
              height: "clamp(160px, 24vw, 260px)",
              borderColor: "#800000",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={alt || `Slider image ${(index % images.length) + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
