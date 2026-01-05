import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import orgChart from "@/assets/org-chart.jpg";
import { ExternalLink } from "lucide-react";

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
        {/* Hero Banner */}
        <div className="bg-primary py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-center uppercase tracking-wide">
              About Us
            </h1>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            {/* Mission Statement */}
            <div className="prose prose-sm max-w-none mb-10">
              <p className="text-muted-foreground leading-relaxed">
                The Liceo Educational Technology Center (Liceo EdTech) ensures that access to and 
                proficiency in technology is provided to the academic community. So that all students, 
                teachers, administrator, and staff, may creatively integrate technology at work, It is 
                assumed that by routinely using the rich repository of educational resources, this enhance 
                the delivery of instruction, strengthen support in all areas of the curriculum, and reinforce 
                the educational needs of students, staff and community.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The center offers skills-based and curriculum-integrated professional development opportunities, 
                collaborative initiatives with other curriculum departments, and software and tools that are 
                current and necessary for the 21st century education.
              </p>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="mb-10">
              <AccordionItem value="goals">
                <AccordionTrigger className="text-lg font-bold uppercase">
                  Goals
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    Liceo EdTech promotes high-quality programs and services supported by technology that:
                  </p>
                  <ul className="space-y-2">
                    {goals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary font-bold">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="functions">
                <AccordionTrigger className="text-lg font-bold uppercase">
                  Functions
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-3">
                    {functions.map((func, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary font-bold w-6 flex-shrink-0">{index + 1}.</span>
                        <span>{func}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roles">
                <AccordionTrigger className="text-lg font-bold uppercase">
                  Key Roles
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2">
                    {keyRoles.map((role, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary font-bold w-6 flex-shrink-0">{index + 1}.</span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services">
                <AccordionTrigger className="text-lg font-bold uppercase">
                  Services Offered
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary font-bold w-6 flex-shrink-0">{index + 1}.</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Organizational Chart */}
            <div className="mb-10">
              <h2 className="section-title text-center mb-6">Organizational Chart</h2>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={orgChart}
                  alt="EdTech Organizational Chart"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Help Desk Link */}
            <div className="bg-primary/5 p-6 rounded-lg text-center">
              <p className="text-foreground font-medium mb-2">EdTech Help Desk Monitoring Form</p>
              <a
                href="https://forms.gle/ZGLkmgAMvva55YoB8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                https://forms.gle/ZGLkmgAMvva55YoB8
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
