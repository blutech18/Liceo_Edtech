import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail, Linkedin } from "lucide-react";
import teamDirector from "@/assets/team-director.jpg";
import teamSpecialist1 from "@/assets/team-specialist-1.jpg";
import teamSpecialist2 from "@/assets/team-specialist-2.jpg";
import teamSpecialist3 from "@/assets/team-specialist-3.jpg";
import teamCoordinator from "@/assets/team-coordinator.jpg";
import teamTech1 from "@/assets/team-tech-1.jpg";
import teamTech2 from "@/assets/team-tech-2.jpg";
import teamTech3 from "@/assets/team-tech-3.jpg";

const director = {
  name: "Dr. Marco Marvin L. Rado",
  role: "Director",
  email: "mlrado@liceo.edu.ph",
  image: teamDirector,
};

const specialists = [
  {
    name: "Dave Lawrence Pamotongan",
    campus: "Main Campus",
    email: "dpamotongan@liceo.edu.ph",
    image: teamSpecialist1,
  },
  {
    name: "Mary Jane Morato",
    campus: "Rodolfo N. Pelaez Campus",
    email: "mmorato@liceo.edu.ph",
    image: teamSpecialist2,
  },
  {
    name: "Mary Abigail Paulan",
    campus: "Paseo Del Rio Campus",
    email: "mpaulan@liceo.edu.ph",
    image: teamSpecialist3,
  },
];

const coordinator = {
  name: "Mr. Roy Emeterio L. Pabilona",
  role: "Coordinator, E-Learning Technology and Infrastructure",
  email: "rpabilona@liceo.edu.ph",
  image: teamCoordinator,
};

const technicalStaff = [
  {
    name: "Remar Lumances",
    campus: "Main Campus",
    email: "rlumances@liceo.edu.ph",
    image: teamTech1,
  },
  {
    name: "Vidal Valledor",
    campus: "PDR Campus",
    email: "vvalledor@liceo.edu.ph",
    image: teamTech2,
  },
  {
    name: "Judison Ferth R. Nunez",
    campus: "Grade School Campus",
    email: "jnunez@liceo.edu.ph",
    image: teamTech3,
  },
];

interface TeamMemberCardProps {
  name: string;
  role?: string;
  campus?: string;
  email: string;
  image: string;
  size?: "lg" | "md" | "sm";
  delay?: number;
}

const TeamMemberCard = ({ name, role, campus, email, image, size = "md", delay = 0 }: TeamMemberCardProps) => {
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
      <div className={`${sizeClasses[size]} rounded-2xl overflow-hidden shadow-elevated mb-5 profile-ring transition-all duration-500 group-hover:shadow-primary group-hover:ring-primary/40`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h4 className="font-bold text-foreground text-lg">{name}</h4>
      <p className="text-sm text-muted-foreground mt-1">{role || campus}</p>
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

const EdTechTeam = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="Educational Technology Team" 
          subtitle="Meet the people behind Liceo EdTech"
        />

        {/* Director */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center mb-16">
              <TeamMemberCard
                name={director.name}
                role={director.role}
                email={director.email}
                image={director.image}
                size="lg"
                delay={0}
              />
            </div>

            {/* E-Learning Specialists */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h3 className="section-title text-2xl mb-3 animate-fade-up">E-Learning Specialists</h3>
                <div className="section-divider" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {specialists.map((specialist, index) => (
                  <TeamMemberCard
                    key={index}
                    name={specialist.name}
                    campus={specialist.campus}
                    email={specialist.email}
                    image={specialist.image}
                    delay={0.1 + index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* E-Learning Technical Staff */}
            <div>
              <div className="text-center mb-10">
                <h3 className="section-title text-2xl mb-3 animate-fade-up">E-Learning Technical Staff</h3>
                <div className="section-divider" />
              </div>
              
              {/* Coordinator */}
              <div className="flex flex-col items-center mb-12">
                <TeamMemberCard
                  name={coordinator.name}
                  role={coordinator.role}
                  email={coordinator.email}
                  image={coordinator.image}
                  delay={0.1}
                />
              </div>

              {/* Technical Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {technicalStaff.map((staff, index) => (
                  <TeamMemberCard
                    key={index}
                    name={staff.name}
                    campus={staff.campus}
                    email={staff.email}
                    image={staff.image}
                    size="sm"
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EdTechTeam;
