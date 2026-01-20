import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-staff.jpg";

interface ParallaxHeroProps {
  title: string;
  subtitle?: string;
}

const ParallaxHero = ({ title, subtitle }: ParallaxHeroProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img
          src={heroImage}
          alt="Liceo EdTech Center Staff"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Gradient Overlays - Maroon Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
        <div 
          className="text-center max-w-4xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 500),
          }}
        >
          {/* Decorative Line Above */}
          <div className="flex justify-center mb-6 animate-fade-up">
            <div className="w-16 h-1 bg-primary rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/80 text-lg sm:text-xl md:text-2xl mt-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}

          {/* Decorative Line Below */}
          <div className="flex justify-center mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-24 h-1 bg-white/40 rounded-full" />
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce" style={{ animationDelay: '1s' }}>
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2 mx-auto">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
            <p className="text-white/50 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default ParallaxHero;
