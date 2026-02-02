import { useRef, useEffect, useState, useCallback } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface InfiniteSliderProps {
  images: Image[];
  speed?: number; // pixels per second
  direction?: "left" | "right"; // slide direction
}

export function InfiniteSlider({ images, speed = 30, direction = "left" }: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });

  // Duplicate images for seamless looping
  const duplicatedImages = [...images, ...images, ...images];

  // Get single set width
  const getSingleSetWidth = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return 0;
    return scrollElement.scrollWidth / 3;
  }, []);

  // Handle seamless loop
  const handleLoop = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth === 0) return;
    
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += singleSetWidth;
    }
  }, [getSingleSetWidth]);

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Initialize and run animation - only when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize position to middle set
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth > 0 && container.scrollLeft < singleSetWidth / 2) {
      container.scrollLeft = singleSetWidth;
    }

    // Don't run animation if not visible
    if (!isVisible) {
      lastTimeRef.current = 0;
      return;
    }

    const animate = (currentTime: number) => {
      if (!isPaused && !isDragging && container && isVisible) {
        const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0;
        
        // Skip large delta times (tab was inactive or animation just started)
        if (deltaTime < 0.1) {
          const movement = speed * deltaTime;

          // Move based on direction
          if (direction === "left") {
            container.scrollLeft += movement;
          } else {
            container.scrollLeft -= movement;
          }
          
          // Handle seamless loop
          handleLoop();
        }
      }
      
      lastTimeRef.current = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging, speed, handleLoop, getSingleSetWidth, isVisible, direction]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: containerRef.current?.scrollLeft || 0,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    if (containerRef.current) {
      handleLoop();
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging && containerRef.current) {
      handleLoop();
    }
    setIsDragging(false);
    setIsPaused(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      scrollLeft: containerRef.current?.scrollLeft || 0,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handleTouchEnd = () => {
    if (containerRef.current) {
      handleLoop();
    }
    setIsDragging(false);
    setIsPaused(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full py-4 md:py-6 overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Slider container */}
      <div
        ref={containerRef}
        className="overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: "translateZ(0)",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 md:gap-6"
          style={{ 
            width: "max-content",
            transform: "translateZ(0)",
            willChange: "auto",
          }}
        >
          {duplicatedImages.map(({ src, alt }, index) => (
            <div
              key={`${index}-${src}`}
              className="group flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-[3px] hover:scale-[1.02]"
              style={{
                width: "clamp(220px, 32vw, 350px)",
                height: "clamp(160px, 24vw, 260px)",
                borderColor: "#800000",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
              }}
            >
              <div 
                className="w-full h-full group-hover:shadow-[0_0_25px_rgba(128,0,0,0.7)]"
                style={{ transition: "box-shadow 0.2s ease-out" }}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Slider image ${(index % images.length) + 1}`}
                  className="h-full w-full object-cover pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
