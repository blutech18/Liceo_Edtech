import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  getTeamMembers,
  TeamMember as APITeamMember,
  getSectionContent,
  SectionContent,
} from "@/lib/api";
import { TeamCarousel, TeamMember } from "@/components/ui/team-carousel";

const defaultContent: SectionContent = {
  id: "",
  section_key: "team",
  title: "Educational Technology Team",
  subtitle: "Meet the people behind Liceo EdTech",
};

const EdTechTeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<APITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchTeamMembers() {
      setLoading(true);
      const [data, contentData] = await Promise.all([
        getTeamMembers(),
        getSectionContent(),
      ]);
      setTeamMembers(data);
      if (contentData.team) {
        setSectionContent(contentData.team);
      }
      setLoading(false);
    }
    fetchTeamMembers();
  }, []);

  // Filter team members by department
  const director = teamMembers.find(
    (m) => m.department.toLowerCase() === "director",
  );
  const specialists = teamMembers.filter(
    (m) =>
      m.department.toLowerCase() === "e-learning specialist" ||
      m.department.toLowerCase() === "e-learning specialists",
  );
  const coordinator = teamMembers.find(
    (m) =>
      m.department.toLowerCase() === "coordinator" ||
      m.position.toLowerCase().includes("coordinator"),
  );
  const technicalStaff = teamMembers.filter(
    (m) =>
      (m.department.toLowerCase() === "e-learning technical staff" ||
        m.department.toLowerCase() === "technical staff") &&
      !m.position.toLowerCase().includes("coordinator"),
  );

  return (
    <section
      id="edtech-team"
      className="py-16 sm:py-20 section-maroon scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-white/30">|</span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : teamMembers.length > 0 ? (
          <TeamCarousel
            members={teamMembers.map((member) => ({
              id: member.id,
              name: member.name,
              role: member.position,
              image: member.image || "/placeholder-avatar.png",
              bio: `${member.department} • ${member.email}`,
            }))}
            title="EDTECH TEAM"
            titleSize="xl"
            titleColor="rgba(160, 16, 16, 1)"
            background="transparent"
            cardWidth={300}
            cardHeight={400}
            cardRadius={20}
            showArrows={true}
            showDots={true}
            keyboardNavigation={true}
            touchNavigation={true}
            animationDuration={800}
            autoPlay={5000}
            pauseOnHover={true}
            visibleCards={2}
            sideCardScale={0.85}
            sideCardOpacity={0.7}
            grayscaleEffect={true}
            infoPosition="bottom"
            infoTextColor="rgb(255, 255, 255)"
            className="py-8"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/70">
              No team members available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EdTechTeamSection;
