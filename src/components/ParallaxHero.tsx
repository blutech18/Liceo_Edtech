import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getHeroImage } from "@/lib/api";
import { useTheme } from "@/contexts/ThemeContext";

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
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const { theme } = useTheme();

  // Fetch hero split image from section_content
  useEffect(() => {
    getHeroImage().then(setHeroImage);
  }, []);

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
        setTimeout(() => {
          setShowCursor(false);
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
      style={{ backgroundColor: theme === "dark" ? "#0F0F0F" : "#FFFFFF" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Video background — maroon on black (dark), maroon on white (light via CSS invert) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              theme === "dark"
                ? "none"
                : "invert(1) hue-rotate(180deg) saturate(3) brightness(0.6)",
          }}
        >
          <source src="/faulty-terminal-maroon.webm" type="video/webm" />
        </video>
        {/* Heavy dark overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: heroImage
              ? theme === "dark"
                ? "linear-gradient(to right, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.75) 45%, rgba(15,15,15,0.4) 55%, transparent 65%)"
                : "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.4) 55%, transparent 65%)"
              : theme === "dark"
                ? "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.2) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.2) 100%)",
          }}
        />
      </div>

      {/* Right-side hero image — diagonal slant edge */}
      {heroImage && (
        <div
          className="absolute top-0 right-0 bottom-0 hidden lg:block"
          style={{
            width: "42%",
            zIndex: 1,
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <img
            src={heroImage}
            alt="Liceo EdTech"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle gradient along the diagonal edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(to right, rgba(15,15,15,0.6) 0%, rgba(15,15,15,0.15) 25%, transparent 45%)"
                  : "linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 25%, transparent 45%)",
            }}
          />
        </div>
      )}

      {/* Mobile hero image — shown below content */}
      {heroImage && (
        <div className="absolute inset-0 lg:hidden" style={{ zIndex: 1 }}>
          <img
            src={heroImage}
            alt="Liceo EdTech"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(180deg, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.7) 40%, rgba(15,15,15,0.85) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.88) 100%)",
            }}
          />
        </div>
      )}

      {/* Main content — left-aligned text */}
      <div className="relative z-20 flex min-h-screen w-full items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div
            className={`flex flex-col gap-6 sm:gap-7 ${heroImage ? "text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:max-w-[45%]" : "text-center max-w-3xl mx-auto"}`}
          >
            {/* Main Title */}
            <div className="space-y-2">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span
                  style={{ color: theme === "dark" ? "#FFFFFF" : "#1A1A1A" }}
                >
                  Liceo
                </span>{" "}
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
                <span
                  style={{ color: theme === "dark" ? "#FFFFFF" : "#1A1A1A" }}
                >
                  Center
                </span>
              </h1>
            </div>

            {/* Subtitle — Typewriter */}
            <p
              className={`text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-light min-h-[1.75em] ${heroImage ? "mx-auto lg:mx-0" : "mx-auto"}`}
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.6)",
              }}
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
              className={`grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 sm:gap-4 ${heroImage ? "lg:items-start" : "justify-center"}`}
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
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(0, 0, 0, 0.04)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.12)"
                      : "1px solid rgba(0, 0, 0, 0.15)",
                  color: theme === "dark" ? "#FFFFFF" : "#1A1A1A",
                  backdropFilter: "blur(8px)",
                }}
              >
                Access Form <ExternalLink className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Social Proof */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 ${heroImage ? "lg:items-start lg:justify-start" : "justify-center"}`}
            >
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2"
                    style={{
                      borderColor: theme === "dark" ? "#0F0F0F" : "#FFFFFF",
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
                    borderColor: theme === "dark" ? "#0F0F0F" : "#FFFFFF",
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
                  style={{
                    color:
                      theme === "dark"
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(0,0,0,0.85)",
                  }}
                >
                  Trusted by Educators
                </span>
                <span
                  className="text-xs"
                  style={{
                    color:
                      theme === "dark"
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.5)",
                  }}
                >
                  Serving Liceo faculty & staff
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
