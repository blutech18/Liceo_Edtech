import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

const ParallaxHero = ({ subtitle }: ParallaxHeroProps) => {
  const tagline =
    "Empowering education through innovative technology solutions";
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Control video playback based on visibility
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Autoplay was prevented
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

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
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <source
            src="/faulty-terminal-maroon.webm"
            type="video/webm"
          />
        </video>
      </div>
      
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-2">
            <div
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm"
              style={{
                backgroundColor: "rgba(160, 16, 16, 0.2)",
                border: "1px solid rgba(160, 16, 16, 0.4)",
                color: "#CCCCCC",
              }}
            >
              🎓 Liceo Educational Technology Center
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight font-serif"
            style={{
              background:
                "linear-gradient(135deg, #FF6B6B 0%, #A01010 50%, #800000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Playfair Display', 'Georgia', serif",
            }}
          >
            EdTech
          </h1>

          {/* Subtitle - Static text for performance */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl flex items-center justify-center px-2">
            <p
              className="font-light leading-relaxed"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {tagline}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button
              onClick={handleTrainingsClick}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base"
              style={{
                background: "linear-gradient(135deg, #A01010 0%, #800000 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(160, 16, 16, 0.3)",
              }}
            >
              Trainings
            </button>
            <button
              onClick={handleAccessFormClick}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
              style={{
                backgroundColor: "rgba(160, 16, 16, 0.15)",
                border: "1px solid rgba(160, 16, 16, 0.4)",
                color: "#FFFFFF",
              }}
            >
              Access Form <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
