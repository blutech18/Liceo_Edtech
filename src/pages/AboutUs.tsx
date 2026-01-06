import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import orgChart from "@/assets/org-chart.jpg";
import { ExternalLink, Target, Cog, Users, Briefcase, CheckCircle2 } from "lucide-react";

const goals = [
  "Connects people, data, content, resources, expertise, and learning experiences to boost teaching effectiveness",
  "Facilitates access to instructional materials",
  "Provides resources and tools to create, manage, and assess quality and usefulness",
  "Creates opportunity for teachers to become more collaborative in creating learning communities",
];

const functions = [
  "Strategizes technology initiatives such as student information systems, learning management systems and the like",
  "Acts as a communication bridge across all departments",
  "Ensures the meaningful inclusion of technology-based resources in instructional initiatives",
  "Enables personalized learning where students can choose from a menu of learning experiences",
  "Organizes learning using a wide variety of digital devices and resources",
  "Helps learning move beyond the classroom and take advantage of virtual learning opportunities",
];

const keyRoles = [
  "Supporting teachers as digital learning coaches",
  "Leading instructional software and hardware selection processes",
  "Collaborating with both instructional and tech department colleagues",
  "Working with school leaders",
  "Training and supporting administrative, instructional systems",
];

const services = [
  "ICT-based Teacher Training",
  "Media Production Services",
  "Web-based Seminar",
  "Mobile Learning",
  "Digital Learning Recording Sessions",
  "Learning Space Design",
];

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="About Us" 
          subtitle="Empowering education through technology"
        />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Mission Statement */}
            <div className="mb-12 animate-fade-up">
              <div className="card-glass p-8 sm:p-10">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  The Liceo Educational Technology Center (Liceo EdTech) ensures that access to and 
                  proficiency in technology is provided to the academic community. So that all students, 
                  teachers, administrator, and staff, may creatively integrate technology at work, It is 
                  assumed that by routinely using the rich repository of educational resources, this enhance 
                  the delivery of instruction, strengthen support in all areas of the curriculum, and reinforce 
                  the educational needs of students, staff and community.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4 text-lg">
                  The center offers skills-based and curriculum-integrated professional development opportunities, 
                  collaborative initiatives with other curriculum departments, and software and tools that are 
                  current and necessary for the 21st century education.
                </p>
              </div>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="mb-12 space-y-4">
              <AccordionItem value="goals" className="card-enhanced border-0 px-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    Goals
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground mb-4">
                    Liceo EdTech promotes high-quality programs and services supported by technology that:
                  </p>
                  <ul className="space-y-3">
                    {goals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="functions" className="card-enhanced border-0 px-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Cog className="w-5 h-5 text-primary" />
                    </div>
                    Functions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ol className="space-y-3">
                    {functions.map((func, index) => (
                      <li key={index} className="flex items-start gap-4 text-muted-foreground">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{func}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roles" className="card-enhanced border-0 px-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    Key Roles
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ol className="space-y-3">
                    {keyRoles.map((role, index) => (
                      <li key={index} className="flex items-start gap-4 text-muted-foreground">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{role}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="card-enhanced border-0 px-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
                <AccordionTrigger className="text-lg font-bold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    Services Offered
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-section-bg">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Organizational Chart */}
            <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h2 className="section-title text-2xl mb-3">Organizational Chart</h2>
                <div className="section-divider" />
              </div>
              <div className="card-enhanced overflow-hidden">
                <img
                  src={orgChart}
                  alt="EdTech Organizational Chart"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Help Desk Link */}
            <div className="card-glass p-8 text-center animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <p className="text-foreground font-semibold text-lg mb-3">EdTech Help Desk Monitoring Form</p>
              <a
                href="https://forms.gle/ZGLkmgAMvva55YoB8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                Access Form
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
