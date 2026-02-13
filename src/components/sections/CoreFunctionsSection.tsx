import { useState, useEffect } from "react";
import { Loader2, Settings } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  getSectionContent,
  getAboutUsContent,
  SectionContent,
  AboutUsContent,
} from "@/lib/api";

const defaultSectionContent: SectionContent = {
  id: "",
  section_key: "core_functions",
  title: "Core Functions",
  subtitle:
    "Driving educational excellence through strategic technology integration and comprehensive support services.",
};

const CoreFunctionsSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(
    defaultSectionContent,
  );
  const [functions, setFunctions] = useState<AboutUsContent[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, aboutData] = await Promise.all([
        getSectionContent(),
        getAboutUsContent(),
      ]);
      if (contentData.core_functions) {
        setSectionContent(contentData.core_functions);
      }
      setFunctions(
        aboutData
          .filter((c) => c.section_type === "functions")
          .sort((a, b) => a.display_order - b.display_order),
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section
      id="core-functions"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "hsl(var(--bg-surface))" }}
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
            style={{ color: "hsl(var(--text-main))" }}
          >
            {sectionContent.title}
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            {sectionContent.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#A01010" }}
            />
          </div>
        ) : functions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {functions.map((func, index) => (
              <div
                key={func.id}
                className="relative group rounded-xl animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={
                    typeof window !== "undefined" && "ontouchstart" in window
                  }
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                  variant="maroon"
                />

                <div
                  className="relative p-6 sm:p-8 rounded-xl transition-all duration-300 group-hover:-translate-y-1 h-full"
                  style={{
                    backgroundColor: "hsl(var(--bg-surface))",
                    border: "1px solid rgba(128, 0, 0, 0.5)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-[1.05] md:group-hover:scale-110"
                    style={{ backgroundColor: "rgba(160, 16, 16, 0.15)" }}
                  >
                    <Settings
                      className="w-7 h-7"
                      style={{ color: "#A01010" }}
                    />
                  </div>

                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "hsl(var(--text-muted))" }}
                  >
                    {func.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            No core functions available.
          </p>
        )}
      </div>
    </section>
  );
};

export default CoreFunctionsSection;
