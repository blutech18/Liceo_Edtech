import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FaultyTerminal from "@/components/FaultyTerminal";

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

// Typewriter hook
const useTypewriter = (
  text: string,
  speed: number = 50,
  delay: number = 1000,
) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayText, isTyping };
};

const ParallaxHero = ({ subtitle }: ParallaxHeroProps) => {
  const tagline =
    "Empowering education through innovative technology solutions";
  const { displayText, isTyping } = useTypewriter(tagline, 50, 1000);
  const [isInView, setIsInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
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
    // Open EdTech Help Desk Monitoring Form in new tab
    window.open("https://forms.gle/ZGLkmgAMvva55YoB8", "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0F0F0F", cursor: "crosshair" }}
    >
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <FaultyTerminal
          scale={1}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.2}
          pause={!isInView}
          scanlineIntensity={0.2}
          glitchAmount={0.3}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={false}
          curvature={0.05}
          tint="#A01010"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.35}
          dpr={1}
        />
      </div>

      {/* Subtle overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15, 15, 15, 0.4), rgba(15, 15, 15, 0.6))",
          zIndex: 1,
        }}
      />
      <div className="relative z-20 flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
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
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(135deg, #FF6B6B 0%, #A01010 50%, #800000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              willChange: "transform, opacity",
              fontFamily: "'Playfair Display', 'Georgia', serif",
            }}
          >
            EdTech
          </motion.h1>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            className="text-base md:text-lg lg:text-xl max-w-3xl h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <p
              className="font-light"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              {displayText}
              {isTyping && (
                <span
                  className="inline-block w-0.5 h-5 ml-1 animate-pulse"
                  style={{ backgroundColor: "#A01010" }}
                />
              )}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleTrainingsClick}
              className="px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #A01010 0%, #800000 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(160, 16, 16, 0.3)",
                willChange: "transform",
              }}
            >
              Trainings
            </button>
            <button
              onClick={handleAccessFormClick}
              className="px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
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
