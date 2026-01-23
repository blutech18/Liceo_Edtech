import { BGPattern } from "@/components/ui/bg-pattern";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

const ParallaxHero = ({ subtitle }: ParallaxHeroProps) => {
  const handleExploreClick = () => {
    const trainingsSection = document.getElementById("trainings");
    if (trainingsSection) {
      trainingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById("about-us");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      <BGPattern
        variant="grid"
        mask="fade-edges"
        size={40}
        fill="rgba(160, 16, 16, 0.25)"
      />
      <div className="relative z-10 flex h-screen w-full items-center justify-center">
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
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
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
            }}
          >
            Liceo Educational
            <br />
            Technology Center
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              willChange: "transform, opacity",
            }}
          >
            {subtitle ||
              "Ensuring access to and proficiency in technology for the entire academic community."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleExploreClick}
              className="px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #A01010 0%, #800000 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(160, 16, 16, 0.3)",
                willChange: "transform",
              }}
            >
              Explore the Trainings
            </button>
            <button
              onClick={handleLearnMoreClick}
              className="text-base font-semibold transition-colors flex items-center gap-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")
              }
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
