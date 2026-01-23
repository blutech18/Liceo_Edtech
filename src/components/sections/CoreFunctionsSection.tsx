import {
  Megaphone,
  Network,
  Users,
  GraduationCap,
  Monitor,
  Globe,
} from "lucide-react";

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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 title-glow"
            style={{ color: "#FFFFFF" }}
          >
            Core Functions
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#CCCCCC" }}
          >
            Driving educational excellence through strategic technology
            integration and comprehensive support services.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {functions.map((func, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 animate-fade-up"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #800000",
                animationDelay: `${0.1 * index}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(160, 16, 16, 0.4)";
                e.currentTarget.style.borderColor = "#A01010";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#800000";
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(160, 16, 16, 0.15)" }}
              >
                <func.icon className="w-7 h-7" style={{ color: "#A01010" }} />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: "#FFFFFF" }}
              >
                {func.title}
              </h3>

              {/* Description */}
              <p className="leading-relaxed" style={{ color: "#CCCCCC" }}>
                {func.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFunctionsSection;
