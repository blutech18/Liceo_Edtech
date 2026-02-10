import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  getTeamMembers,
  TeamMember as APITeamMember,
  getSectionContent,
  SectionContent,
} from "@/lib/api";
import { TeamMemberCard } from "@/components/ui/team-member-card";

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
            <span className="hidden sm:block text-2xl text-muted-foreground/30">
              |
            </span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="space-y-16">
            {/* Director */}
            {director && (
              <div className="flex justify-center">
                <div className="w-full max-w-[320px] animate-fade-up">
                  <TeamMemberCard
                    imageUrl={director.image || "/placeholder-avatar.png"}
                    name={director.name}
                    position={director.position}
                    email={director.email}
                    themeColor="0 68% 42%"
                    size="lg"
                  />
                </div>
              </div>
            )}

            {specialists.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-foreground text-xl sm:text-2xl font-bold animate-fade-up">
                    E-Learning Specialists
                  </h3>
                  <div className="w-16 h-0.5 bg-primary mx-auto mt-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                  {specialists.map((specialist, index) => (
                    <div
                      key={specialist.id}
                      className="animate-fade-up w-full max-w-[320px] mx-auto sm:max-w-none"
                      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                      <TeamMemberCard
                        imageUrl={specialist.image || "/placeholder-avatar.png"}
                        name={specialist.name}
                        position={specialist.position}
                        email={specialist.email}
                        themeColor="0 68% 42%"
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(coordinator || technicalStaff.length > 0) && (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-foreground text-xl sm:text-2xl font-bold animate-fade-up">
                    E-Learning Technical Staff
                  </h3>
                  <div className="w-16 h-0.5 bg-primary mx-auto mt-3" />
                </div>

                {/* Coordinator */}
                {coordinator && (
                  <div className="flex justify-center mb-10">
                    <div
                      className="w-full max-w-[320px] animate-fade-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <TeamMemberCard
                        imageUrl={
                          coordinator.image || "/placeholder-avatar.png"
                        }
                        name={coordinator.name}
                        position={coordinator.position}
                        email={coordinator.email}
                        themeColor="0 68% 42%"
                        size="lg"
                      />
                    </div>
                  </div>
                )}

                {/* Technical Staff */}
                {technicalStaff.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {technicalStaff.map((staff, index) => (
                      <div
                        key={staff.id}
                        className="animate-fade-up w-full max-w-[320px] mx-auto sm:max-w-none"
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                        <TeamMemberCard
                          imageUrl={staff.image || "/placeholder-avatar.png"}
                          name={staff.name}
                          position={staff.position}
                          email={staff.email}
                          themeColor="0 68% 42%"
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No team members available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EdTechTeamSection;
