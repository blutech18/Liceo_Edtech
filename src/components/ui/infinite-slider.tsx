import { useRef, useEffect, useState, useCallback } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface InfiniteSliderProps {
  images: Image[];
  speed?: number; // pixels per second
}

export function InfiniteSlider({ images, speed = 30 }: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  // Initialize and run animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize position to middle set
    const singleSetWidth = getSingleSetWidth();
    if (singleSetWidth > 0 && container.scrollLeft < singleSetWidth / 2) {
      container.scrollLeft = singleSetWidth;
    }

    const animate = (currentTime: number) => {
      if (!isPaused && !isDragging && container) {
        const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0;
        const movement = speed * deltaTime;

        // Directly modify scrollLeft
        container.scrollLeft += movement;
        
        // Handle seamless loop
        handleLoop();
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
  }, [isPaused, isDragging, speed, handleLoop, getSingleSetWidth]);

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
      handleLoop(); // Ensure we're in valid position
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
    <div className="relative w-full py-8 md:py-12 overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Slider container */}
      <div
        ref={containerRef}
        className="overflow-x-hidden cursor-grab active:cursor-grabbing select-none"
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
          className="flex gap-4 sm:gap-6 md:gap-8"
          style={{ width: "max-content" }}
        >
          {duplicatedImages.map(({ src, alt }, index) => (
            <div
              key={`${index}-${src}`}
              className="group flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border-2 sm:border-[3px] hover:scale-[1.02]"
              style={{
                width: "clamp(280px, 40vw, 450px)",
                height: "clamp(200px, 30vw, 340px)",
                borderColor: "#800000",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <div className="w-full h-full transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(128,0,0,0.7)]">
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Slider image ${(index % images.length) + 1}`}
                  className="h-full w-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hint */}
      <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 opacity-60">
        Hover to pause • Drag to explore
      </p>
    </div>
  );
}
