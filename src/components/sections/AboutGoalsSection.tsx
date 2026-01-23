import { Lightbulb, Target, TrendingUp, Users } from "lucide-react";

const AboutGoalsSection = () => {
  return (
    <section
      id="about-goals"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#0F0F0F" }}
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 title-glow"
              style={{ color: "#FFFFFF" }}
            >
              Bridging Education & Innovation
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg mb-8 leading-relaxed"
              style={{ color: "#CCCCCC" }}
            >
              Liceo EdTech promotes high-quality programs and services supported
              by technology that ensures access to and proficiency in technology
              for the entire academic community of Liceo de Cagayan University.
            </p>

            {/* Goals */}
            <div className="space-y-4">
              <h3
                className="text-xl font-semibold mb-4 flex items-center gap-3"
                style={{ color: "#FFFFFF" }}
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
                    <p style={{ color: "#CCCCCC" }}>{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div
            className="relative animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #800000",
              }}
            >
              {/* Placeholder visual with icons */}
              <div className="aspect-[4/3] flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                  {[
                    { icon: Lightbulb, label: "Innovation" },
                    { icon: Users, label: "Community" },
                    { icon: TrendingUp, label: "Growth" },
                    { icon: Target, label: "Goals" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: "#0F0F0F",
                        border: "1px solid #800000",
                      }}
                    >
                      <item.icon
                        className="w-10 h-10 mb-3"
                        style={{ color: "#A01010" }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#FFFFFF" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(160, 16, 16, 0.2)" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(128, 0, 0, 0.15)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGoalsSection;
