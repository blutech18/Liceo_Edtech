import { useState, useEffect } from "react";
import { Mail, Loader2, User } from "lucide-react";
import { getTeamMembers, TeamMember, getSectionContent, SectionContent } from "@/lib/api";

interface TeamMemberCardProps {
  name: string;
  role?: string;
  email: string;
  image?: string;
  size?: "lg" | "md" | "sm";
  delay?: number;
}

const TeamMemberCard = ({ name, role, email, image, size = "md", delay = 0 }: TeamMemberCardProps) => {
  const sizeClasses = {
    lg: "w-44 h-44 sm:w-52 sm:h-52",
    md: "w-32 h-32 sm:w-40 sm:h-40",
    sm: "w-28 h-28 sm:w-32 sm:h-32",
  };

  return (
    <div
      className="flex flex-col items-center text-center group animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`${sizeClasses[size]} rounded-2xl overflow-hidden shadow-elevated mb-5 ring-4 ring-white transition-all duration-500 group-hover:shadow-primary group-hover:ring-white/80`}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <User className="w-1/3 h-1/3 text-primary/50" />
          </div>
        )}
      </div>
      <h4 className="font-bold text-foreground text-lg">{name}</h4>
      {role && (
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {role.split(' - ').map((line, index) => (
            <span key={index}>
              {line}
              {index < role.split(' - ').length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mt-3 text-sm font-medium transition-all duration-300 hover:gap-3"
      >
        <Mail className="w-4 h-4" />
        {email}
      </a>
    </div>
  );
};

const defaultContent: SectionContent = {
  id: '', section_key: 'team',
  title: 'Educational Technology Team',
  subtitle: 'Meet the people behind Liceo EdTech'
};

const EdTechTeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchTeamMembers() {
      setLoading(true);
      const [data, contentData] = await Promise.all([
        getTeamMembers(),
        getSectionContent()
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
  const director = teamMembers.find(m => m.department.toLowerCase() === 'director');
  const specialists = teamMembers.filter(m => m.department.toLowerCase() === 'e-learning specialist' || m.department.toLowerCase() === 'e-learning specialists');
  const coordinator = teamMembers.find(m => m.department.toLowerCase() === 'coordinator' || m.position.toLowerCase().includes('coordinator'));
  const technicalStaff = teamMembers.filter(m => 
    (m.department.toLowerCase() === 'e-learning technical staff' || m.department.toLowerCase() === 'technical staff') &&
    !m.position.toLowerCase().includes('coordinator')
  );

  return (
    <section id="edtech-team" className="py-16 sm:py-20 section-maroon scroll-mt-16">
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
        ) : (
          <>
            {/* Director */}
            {director && (
              <div className="mb-16">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium border bg-white/10 text-white border-white/20">
                    Director
                  </span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>
                <div className="flex flex-col items-center">
                  <TeamMemberCard
                    name={director.name}
                    role={director.position}
                    email={director.email}
                    image={director.image}
                    size="lg"
                    delay={0}
                  />
                </div>
              </div>
            )}

            {/* E-Learning Specialists */}
            {specialists.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium border bg-white/10 text-white border-white/20">
                    E-Learning Specialists
                  </span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                  {specialists.slice(0, 3).map((specialist, index) => (
                    <TeamMemberCard
                      key={specialist.id}
                      name={specialist.name}
                      role={specialist.position}
                      email={specialist.email}
                      image={specialist.image}
                      delay={0.1 + index * 0.1}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* E-Learning Technical Staff */}
            {(coordinator || technicalStaff.length > 0) && (
              <div>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium border bg-white/10 text-white border-white/20">
                    E-Learning Technical Staff
                  </span>
                  <div className="flex-1 h-px bg-white/20" />
                </div>

                {/* Coordinator */}
                {coordinator && (
                  <div className="flex flex-col items-center mb-12">
                    <TeamMemberCard
                      name={coordinator.name}
                      role={coordinator.position}
                      email={coordinator.email}
                      image={coordinator.image}
                      delay={0.1}
                    />
                  </div>
                )}

                {/* Technical Staff Members */}
                {technicalStaff.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {technicalStaff.slice(0, 3).map((staff, index) => (
                      <TeamMemberCard
                        key={staff.id}
                        name={staff.name}
                        role={staff.position}
                        email={staff.email}
                        image={staff.image}
                        size="sm"
                        delay={0.2 + index * 0.1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!director && specialists.length === 0 && !coordinator && technicalStaff.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70">No team members available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default EdTechTeamSection;
