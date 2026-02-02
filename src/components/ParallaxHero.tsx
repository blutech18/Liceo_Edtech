import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

// Typewriter hook with reset capability - fixed cleanup
const useTypewriter = (
  text: string,
  speed: number = 50,
  delay: number = 1000,
  shouldReset: boolean | number = false,
) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setDisplayText("");
    setIsComplete(false);
    let index = 0;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, shouldReset]);

  return { displayText, isComplete };
};

const ParallaxHero = ({ subtitle }: ParallaxHeroProps) => {
  const tagline =
    "Empowering education through innovative technology solutions";
  const [isInView, setIsInView] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { displayText, isComplete } = useTypewriter(
    tagline,
    50,
    500,
    resetTrigger,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInView;
        setIsInView(entry.isIntersecting);

        // Control video playback based on visibility
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Autoplay was prevented, try muted
            });
            if (!wasInView) {
              setResetTrigger((prev) => prev + 1);
            }
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
  }, [isInView]);

  const handleTrainingsClick = () => {
    const trainingsSection = document.getElementById("trainings");
    if (trainingsSection) {
      trainingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAccessFormClick = () => {
    // Open EdTech Help Desk Monitoring Form in new tab
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
            opacity: 1,
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "auto",
          }}
        >
          <source
            src="/faulty-terminal-maroon.webm"
            type="video/webm"
          />
        </video>
      </div>

      {/* Overlay removed to show raw video */}
      
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.h1>

          {/* Subtitle with Typewriter Effect */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center px-2">
            <p
              className="font-light leading-relaxed"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {displayText}
              <span
                className="inline-block w-0.5 h-5 ml-1 align-middle"
                style={{
                  backgroundColor: "#A01010",
                  animation: "typewriter-blink 1s step-end infinite",
                  opacity: isComplete ? 0 : 1,
                }}
              />
            </p>
          </div>
          <style>{`
            @keyframes typewriter-blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleTrainingsClick}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02]"
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
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{
                backgroundColor: "rgba(160, 16, 16, 0.15)",
                border: "1px solid rgba(160, 16, 16, 0.4)",
                color: "#FFFFFF",
              }}
            >
              Access Form <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
