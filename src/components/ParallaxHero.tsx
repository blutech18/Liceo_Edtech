import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { getHeroSliderImages, type SliderImage } from "@/lib/api";
import TiltedCard from "@/components/ui/TiltedCard";

import teamCoordinator from "@/assets/team-coordinator.jpg";
import teamDirector from "@/assets/team-director.jpg";
import teamSpecialist1 from "@/assets/team-specialist-1.jpg";
import teamSpecialist2 from "@/assets/team-specialist-2.jpg";

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

const avatars = [
  teamCoordinator,
  teamDirector,
  teamSpecialist1,
  teamSpecialist2,
];

const ParallaxHero = ({ subtitle }: ParallaxHeroProps) => {
  const tagline =
    "Empowering education through innovative technology solutions";
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Control video playback based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 },
    );
    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  // Typewriter effect
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typewriterKey, setTypewriterKey] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    const typeTimer = setInterval(() => {
      if (charIndex < tagline.length) {
        setDisplayedText(tagline.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        // Keep cursor blinking for a moment, then restart
        setTimeout(() => {
          setShowCursor(false);
          // Wait a bit then restart the typewriter
          setTimeout(() => {
            setDisplayedText("");
            setShowCursor(true);
            setTypewriterKey((prev) => prev + 1);
          }, 3000);
        }, 2000);
      }
    }, 45);
    return () => clearInterval(typeTimer);
  }, [typewriterKey]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const blinkTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkTimer);
  }, [showCursor]);

  // Carousel state
  const [carouselImages, setCarouselImages] = useState<SliderImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch carousel images (only hero-flagged ones)
  useEffect(() => {
    async function fetchImages() {
      const images = await getHeroSliderImages();
      setCarouselImages(images);
    }
    fetchImages();
  }, []);

  // Auto-advance carousel
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

  // Clear transitioning flag
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentSlide]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    startAutoplay(); // Reset autoplay timer
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

  // Swipe handlers
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

  const handleTrainingsClick = () => {
    const trainingsSection = document.getElementById("trainings");
    if (trainingsSection) {
      trainingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAccessFormClick = () => {
    window.open("https://forms.gle/ZGLkmgAMvva55YoB8", "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      {/* Video Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/edtech_logo.png"
          className="w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <source src="/faulty-terminal-maroon.webm" type="video/webm" />
        </video>
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Main content - split layout */}
      <div className="relative z-20 flex min-h-screen w-full items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-16">
        <div
          className={`max-w-7xl mx-auto w-full grid grid-cols-1 ${carouselImages.length > 0 ? "lg:grid-cols-2" : ""} gap-10 lg:gap-16 items-center`}
        >
          {/* LEFT COLUMN - Content */}
          <div
            className={`flex flex-col gap-6 sm:gap-7 order-1 ${carouselImages.length > 0 ? "text-center lg:text-left" : "text-center max-w-3xl mx-auto"}`}
          >
            {/* Main Title */}
            <div className="space-y-2">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span style={{ color: "#FFFFFF" }}>Liceo</span>{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B6B 0%, #A01010 50%, #800000 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Educational
                </span>
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #A01010 0%, #800000 60%, #FF6B6B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Technology
                </span>{" "}
                <span style={{ color: "#FFFFFF" }}>Center</span>
              </h1>
            </div>

            {/* Subtitle — Typewriter */}
            <p
              className={`text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light min-h-[1.75em] ${carouselImages.length > 0 ? "lg:mx-0" : ""}`}
              style={{ color: "rgba(255, 255, 255, 0.65)" }}
            >
              {displayedText}
              <span
                className="inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom"
                style={{
                  backgroundColor: "rgba(160, 16, 16, 0.8)",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </p>

            {/* CTA Buttons */}
            <div
              className={`grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 sm:gap-4 ${carouselImages.length > 0 ? "lg:items-start" : "justify-center"}`}
            >
              <button
                onClick={handleTrainingsClick}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #A01010 0%, #800000 100%)",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 24px rgba(160, 16, 16, 0.35)",
                }}
              >
                Explore Trainings
              </button>
              <button
                onClick={handleAccessFormClick}
                className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(160,16,16,0.6)]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  backdropFilter: "blur(8px)",
                }}
              >
                Access Form <ExternalLink className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Social Proof - visible on desktop only (inside left column) */}
            <div
              className={`hidden lg:flex flex-col sm:flex-row items-center gap-4 ${carouselImages.length > 0 ? "lg:items-start lg:justify-start" : "justify-center"}`}
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2"
                    style={{
                      borderColor: "#0F0F0F",
                      boxShadow: "0 0 0 1px rgba(160, 16, 16, 0.3)",
                    }}
                  >
                    <img
                      src={src}
                      alt="Team member"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                  style={{
                    borderColor: "#0F0F0F",
                    backgroundColor: "rgba(160, 16, 16, 0.25)",
                    color: "#FF6B6B",
                    boxShadow: "0 0 0 1px rgba(160, 16, 16, 0.3)",
                  }}
                >
                  +10
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Trusted by Educators
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Serving Liceo faculty & staff
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN / MOBILE: Image Carousel Card (only when hero images exist) */}
          {carouselImages.length > 0 && (
            <div className="relative order-2 flex justify-center lg:justify-end">
              {/* TiltedCard carousel wrapper — matches button width on mobile */}
              <div
                className="relative w-full lg:max-w-[860px]"
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
                    rotateAmplitude={10}
                    scaleOnHover={1.04}
                    showMobileWarning={false}
                    showTooltip={false}
                    borderRadius="1.25rem"
                    captionText=""
                  />
                </div>
                {/* Mobile / Tablet carousel (reduced size, matches button width) */}
                <div className="block lg:hidden">
                  <TiltedCard
                    imageSrc={carouselImages[currentSlide]?.src}
                    altText={
                      carouselImages[currentSlide]?.alt || "EdTech Center"
                    }
                    containerHeight="180px"
                    containerWidth="100%"
                    imageHeight="180px"
                    imageWidth="100%"
                    rotateAmplitude={8}
                    scaleOnHover={1.02}
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
                              ? "#FFFFFF"
                              : "rgba(255,255,255,0.4)",
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Proof - visible on mobile only (below carousel) */}
          <div
            className={`flex lg:hidden flex-col sm:flex-row items-center gap-4 justify-center order-3`}
          >
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: "#0F0F0F",
                    boxShadow: "0 0 0 1px rgba(160, 16, 16, 0.3)",
                  }}
                >
                  <img
                    src={src}
                    alt="Team member"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-semibold border-2"
                style={{
                  borderColor: "#0F0F0F",
                  backgroundColor: "rgba(160, 16, 16, 0.25)",
                  color: "#FF6B6B",
                  boxShadow: "0 0 0 1px rgba(160, 16, 16, 0.3)",
                }}
              >
                +10
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                Trusted by Educators
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Serving Liceo faculty & staff
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
