import { useState, useEffect } from "react";
import { Target, CheckCircle2, Loader2 } from "lucide-react";
import {
  getSectionContent,
  getAboutUsContent,
  SectionContent,
  AboutUsContent,
} from "@/lib/api";

const defaultContent: SectionContent = {
  id: "",
  section_key: "about_us",
  title: "About Us",
  subtitle: "Empowering education through technology",
};

const AboutUsSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);
  const [aboutContent, setAboutContent] = useState<AboutUsContent[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, aboutData] = await Promise.all([
        getSectionContent(),
        getAboutUsContent(),
      ]);
      if (contentData.about_us) {
        setSectionContent(contentData.about_us);
      }
      setAboutContent(aboutData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Group content by section type
  const mission = aboutContent.filter((c) => c.section_type === "mission");
  const goals = aboutContent.filter((c) => c.section_type === "goals");

  return (
    <section
      id="about-us"
      className="py-16 sm:py-20 scroll-mt-16"
      style={{ backgroundColor: "hsl(var(--bg-surface))" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "hsl(var(--text-main))" }}
            >
              {sectionContent.title}
            </h2>
            <span
              className="hidden sm:block text-2xl"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              |
            </span>
            <p
              className="text-base sm:text-lg"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#A01010" }}
            />
          </div>
        ) : (
          <>
            {/* Mission Statement */}
            <div className="mb-12 animate-fade-up">
              <div
                className="p-8 sm:p-10 rounded-xl backdrop-blur-sm"
                style={{
                  backgroundColor: "hsl(var(--bg-main) / 0.8)",
                  border: "1px solid rgba(128, 0, 0, 0.3)",
                }}
              >
                {mission.map((item, index) => (
                  <p
                    key={item.id}
                    className={`leading-relaxed text-lg text-center ${index > 0 ? "mt-4" : ""}`}
                    style={{ color: "hsl(var(--text-muted))" }}
                  >
                    {item.content}
                  </p>
                ))}
              </div>
            </div>

            {/* Goals Section - Always Visible */}
            <div
              className="rounded-xl p-6 animate-fade-up"
              style={{
                backgroundColor: "hsl(var(--bg-main))",
                border: "1px solid #800000",
                animationDelay: "0.1s",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(160, 16, 16, 0.15)" }}
                >
                  <Target className="w-5 h-5" style={{ color: "#A01010" }} />
                </div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "hsl(var(--text-main))" }}
                >
                  Goals
                </h3>
              </div>
              <p
                className="mb-4 text-center"
                style={{ color: "hsl(var(--text-muted))" }}
              >
                Liceo EdTech promotes high-quality programs and services
                supported by technology that:
              </p>
              <ul className="space-y-3">
                {goals.map((goal) => (
                  <li key={goal.id} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#A01010" }}
                    />
                    <span style={{ color: "hsl(var(--text-muted))" }}>
                      {goal.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsSection;
