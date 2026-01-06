import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail } from "lucide-react";
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

const EdTechTeam = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title="Educational Technology Team" />

        {/* Director */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-4">
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">{director.name}</h2>
              <p className="text-muted-foreground">{director.role}</p>
              <a
                href={`mailto:${director.email}`}
                className="flex items-center gap-2 text-primary hover:underline mt-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                {director.email}
              </a>
            </div>

            {/* E-Learning Specialists */}
            <div className="mb-12">
              <h3 className="section-title text-center mb-8">E-Learning Specialists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {specialists.map((specialist, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                      <img
                        src={specialist.image}
                        alt={specialist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground">{specialist.name}</h4>
                    <p className="text-sm text-muted-foreground">{specialist.campus}</p>
                    <a
                      href={`mailto:${specialist.email}`}
                      className="flex items-center gap-1 text-primary hover:underline mt-1 text-xs"
                    >
                      <Mail className="w-3 h-3" />
                      {specialist.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* E-Learning Technical Staff */}
            <div className="mb-12">
              <h3 className="section-title text-center mb-8">E-Learning Technical Staff</h3>
              
              {/* Coordinator */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
                  <img
                    src={coordinator.image}
                    alt={coordinator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground">{coordinator.name}</h4>
                <p className="text-sm text-muted-foreground">{coordinator.role}</p>
                <a
                  href={`mailto:${coordinator.email}`}
                  className="flex items-center gap-1 text-primary hover:underline mt-1 text-xs"
                >
                  <Mail className="w-3 h-3" />
                  {coordinator.email}
                </a>
              </div>

              {/* Technical Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {technicalStaff.map((staff, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-4">
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground">{staff.name}</h4>
                    <p className="text-sm text-muted-foreground">{staff.campus}</p>
                    <a
                      href={`mailto:${staff.email}`}
                      className="flex items-center gap-1 text-primary hover:underline mt-1 text-xs"
                    >
                      <Mail className="w-3 h-3" />
                      {staff.email}
                    </a>
                  </div>
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
