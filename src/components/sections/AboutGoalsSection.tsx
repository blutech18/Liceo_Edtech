import { Target } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { getHeroSliderImages, type SliderImage } from "@/lib/api";
import TiltedCard from "@/components/ui/TiltedCard";

const AboutGoalsSection = () => {
  // Carousel state (moved from hero)
  const [carouselImages, setCarouselImages] = useState<SliderImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchImages() {
      const images = await getHeroSliderImages();
      setCarouselImages(images);
    }
    fetchImages();
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (carouselImages.length > 0) {
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }
    }, 4000);
  }, [carouselImages.length]);

  useEffect(() => {
    if (carouselImages.length > 1) {
      startAutoplay();
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [carouselImages.length, startAutoplay]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentSlide]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    startAutoplay();
  };

  const nextSlide = () => {
    if (carouselImages.length === 0) return;
    goToSlide((currentSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    if (carouselImages.length === 0) return;
    goToSlide(
      (currentSlide - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      id="about-goals"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "hsl(var(--bg-main))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-up">
            {/* Section Label */}
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#A01010" }}
            >
              About Us
            </p>

            {/* Main Heading */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 title-glow"
              style={{ color: "hsl(var(--text-main))" }}
            >
              Bridging Education & Innovation
            </h2>

            {/* Description */}
            <p
              className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              Liceo EdTech promotes high-quality programs and services supported
              by technology that ensures access to and proficiency in technology
              for the entire academic community of Liceo de Cagayan University.
            </p>

            {/* Goals */}
            <div className="space-y-4">
              <h3
                className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-3"
                style={{ color: "hsl(var(--text-main))" }}
              >
                <Target className="w-6 h-6" style={{ color: "#A01010" }} />
                Our Goals
              </h3>

              <div className="space-y-3">
                {[
                  "Boost teaching and learning effectiveness through innovative technology",
                  "Enhance digital literacy across the academic community",
                  "Foster a culture of continuous technological improvement",
                  "Provide accessible tech resources for students and faculty",
                ].map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-fade-up"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "#A01010" }}
                    />
                    <p
                      className="text-sm sm:text-base"
                      style={{ color: "hsl(var(--text-muted))" }}
                    >
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - TiltedCard Carousel */}
          {carouselImages.length > 0 && (
            <div
              className="relative animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="relative w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Desktop carousel */}
                <div className="hidden lg:block">
                  <TiltedCard
                    imageSrc={carouselImages[currentSlide]?.src}
                    altText={
                      carouselImages[currentSlide]?.alt || "EdTech Center"
                    }
                    containerHeight="480px"
                    containerWidth="100%"
                    imageHeight="480px"
                    imageWidth="100%"
                    rotateAmplitude={6}
                    scaleOnHover={1.02}
                    showMobileWarning={false}
                    showTooltip={false}
                    borderRadius="1.25rem"
                    captionText=""
                  />
                </div>
                {/* Mobile / Tablet carousel */}
                <div className="block lg:hidden">
                  <TiltedCard
                    imageSrc={carouselImages[currentSlide]?.src}
                    altText={
                      carouselImages[currentSlide]?.alt || "EdTech Center"
                    }
                    containerHeight="220px"
                    containerWidth="100%"
                    imageHeight="220px"
                    imageWidth="100%"
                    rotateAmplitude={5}
                    scaleOnHover={1.01}
                    showMobileWarning={false}
                    showTooltip={false}
                    borderRadius="1rem"
                    captionText=""
                  />
                </div>

                {/* Dot indicators */}
                {carouselImages.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: index === currentSlide ? "24px" : "8px",
                          height: "8px",
                          backgroundColor:
                            index === currentSlide
                              ? "hsl(var(--text-main))"
                              : "hsla(var(--text-main), 0.4)",
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(160, 16, 16, 0.2)" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(128, 0, 0, 0.15)" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutGoalsSection;
