import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import orgChart from "@/assets/org-chart.jpg";
import { ExternalLink, Target, Cog, Users, Briefcase, CheckCircle2, Loader2 } from "lucide-react";
import { getSectionContent, getAboutUsContent, getHelpDeskConfig, SectionContent, AboutUsContent, HelpDeskConfig } from "@/lib/api";

const defaultContent: SectionContent = {
  id: '', section_key: 'about_us',
  title: 'About Us',
  subtitle: 'Empowering education through technology'
};

const defaultHelpDesk: HelpDeskConfig = {
  id: '',
  title: 'EdTech Help Desk Monitoring Form',
  url: 'https://forms.gle/ZGLkmgAMvva55YoB8'
};

const AboutUsSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);
  const [aboutContent, setAboutContent] = useState<AboutUsContent[]>([]);
  const [helpDeskConfig, setHelpDeskConfig] = useState<HelpDeskConfig>(defaultHelpDesk);
  const [orgChartImage, setOrgChartImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, aboutData, helpDeskData] = await Promise.all([
        getSectionContent(),
        getAboutUsContent(),
        getHelpDeskConfig()
      ]);
      if (contentData.about_us) {
        setSectionContent(contentData.about_us);
        if (contentData.about_us.image_url) {
          setOrgChartImage(contentData.about_us.image_url);
        }
      }
      setAboutContent(aboutData);
      if (helpDeskData) {
        setHelpDeskConfig(helpDeskData);
      }
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

            {/* Organizational Chart */}
            <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h3 className="section-title text-2xl mb-3">Organizational Chart</h3>
                <div className="section-divider" />
              </div>
              <div className="card-enhanced overflow-hidden">
                <div className="max-h-[300px] sm:max-h-[400px] md:max-h-[500px] overflow-hidden flex items-center justify-center">
                  <img
                    src={orgChartImage || orgChart}
                    alt="EdTech Organizational Chart"
                    className="w-full h-auto max-h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Help Desk Link */}
            <div className="card-glass p-8 text-center animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <p className="text-foreground font-semibold text-lg mb-3">{helpDeskConfig.title}</p>
              <a
                href={helpDeskConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                Access Form
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsSection;
