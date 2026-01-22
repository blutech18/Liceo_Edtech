import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Cog, Users, Briefcase, CheckCircle2, Loader2 } from "lucide-react";
import { getSectionContent, getAboutUsContent, SectionContent, AboutUsContent } from "@/lib/api";

const defaultContent: SectionContent = {
  id: '', section_key: 'about_us',
  title: 'About Us',
  subtitle: 'Empowering education through technology'
};

const AboutUsSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);
  const [aboutContent, setAboutContent] = useState<AboutUsContent[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, aboutData] = await Promise.all([
        getSectionContent(),
        getAboutUsContent()
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
  const mission = aboutContent.filter(c => c.section_type === 'mission');
  const goals = aboutContent.filter(c => c.section_type === 'goals');
  const functions = aboutContent.filter(c => c.section_type === 'functions');
  const keyRoles = aboutContent.filter(c => c.section_type === 'key_roles');
  const services = aboutContent.filter(c => c.section_type === 'services');

  return (
    <section id="about-us" className="py-16 sm:py-20 section-maroon scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
            {/* Mission Statement */}
            <div className="mb-12 animate-fade-up">
              <div className="card-glass p-8 sm:p-10">
                {mission.map((item, index) => (
                  <p key={item.id} className={`text-muted-foreground leading-relaxed text-lg ${index > 0 ? 'mt-4' : ''}`}>
                    {item.content}
                  </p>
                ))}
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
                    {goals.map((goal) => (
                      <li key={goal.id} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{goal.content}</span>
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
                      <li key={func.id} className="flex items-start gap-4 text-muted-foreground">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{func.content}</span>
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
                      <li key={role.id} className="flex items-start gap-4 text-muted-foreground">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{role.content}</span>
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
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.id} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{service.content}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsSection;
