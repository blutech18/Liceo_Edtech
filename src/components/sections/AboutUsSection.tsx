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
      className="py-16 sm:py-20 scroll-mt-16 relative overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Background Image — fetched from section_content.about_us.image_url */}
      {sectionContent.image_url && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${sectionContent.image_url}')`,
            opacity: 0.45,
          }}
        />
      )}
      {/* Dark gradient overlay for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {sectionContent.title}
          </h2>
          <p className="text-base sm:text-lg text-white/70 mt-2">
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Statement */}
            <div
              className="animate-fade-up h-full backdrop-blur-sm rounded-2xl p-8 sm:p-10 flex flex-col justify-center border border-white/10"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
            >
              {mission.map((item, index) => (
                <p
                  key={item.id}
                  className={`leading-relaxed text-lg text-center text-white/90 ${index > 0 ? "mt-4" : ""}`}
                >
                  {item.content}
                </p>
              ))}
            </div>

            {/* Goals Section */}
            <div
              className="animate-fade-up h-full backdrop-blur-sm rounded-2xl p-6 flex flex-col border border-white/10"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                animationDelay: "0.1s",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(160, 16, 16, 0.4)" }}
                >
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Goals</h3>
              </div>
              <p className="mb-4 text-center text-white/80">
                Liceo EdTech promotes high-quality programs and services
                supported by technology that:
              </p>
              <ul className="space-y-3 flex-1">
                {goals.map((goal) => (
                  <li key={goal.id} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                    <span className="text-white/85">{goal.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutUsSection;
