import {
  Megaphone,
  Network,
  Users,
  GraduationCap,
  Monitor,
  Globe,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const functions = [
  {
    icon: Network,
    title: "Strategic Initiatives",
    description:
      "Spearhead the development and implementation of innovative ICT strategies aligned with the university's vision.",
  },
  {
    icon: Megaphone,
    title: "Communication Bridge",
    description:
      "Facilitate seamless communication between departments, faculty, and students through digital platforms.",
  },
  {
    icon: Users,
    title: "Tech Inclusion",
    description:
      "Ensure equitable access to technology resources for all members of the academic community.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description:
      "Support adaptive learning environments tailored to individual student needs and learning styles.",
  },
  {
    icon: Monitor,
    title: "Digital Competency",
    description:
      "Build and enhance digital skills among faculty and students through comprehensive training programs.",
  },
  {
    icon: Globe,
    title: "Virtual Learning",
    description:
      "Enable remote and hybrid learning experiences through robust virtual classroom infrastructure.",
  },
];

const CoreFunctionsSection = () => {
  return (
    <section
      id="core-functions"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#A01010" }}
          >
            What We Do
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 title-glow"
            style={{ color: "#FFFFFF" }}
          >
            Core Functions
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "#CCCCCC" }}
          >
            Driving educational excellence through strategic technology
            integration and comprehensive support services.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {functions.map((func, index) => (
            <div
              key={index}
              className="relative group rounded-xl animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Glowing Effect */}
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
                variant="maroon"
              />

              {/* Card Content */}
              <div
                className="relative p-6 sm:p-8 rounded-xl transition-all duration-300 group-hover:-translate-y-1 h-full"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(128, 0, 0, 0.5)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-[1.05] md:group-hover:scale-110"
                  style={{ backgroundColor: "rgba(160, 16, 16, 0.15)" }}
                >
                  <func.icon className="w-7 h-7" style={{ color: "#A01010" }} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-semibold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  {func.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "#CCCCCC" }}
                >
                  {func.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFunctionsSection;
