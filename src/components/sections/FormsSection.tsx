import { useState, useEffect } from "react";
import { Download, ArrowRight, Loader2 } from "lucide-react";
import { getDownloadableForms, getSectionContent, DownloadableForm, SectionContent } from "@/lib/api";

const defaultContent: SectionContent = {
  id: '', section_key: 'forms',
  title: 'Downloadable Forms',
  subtitle: 'Access official EdTech Center forms'
};

const FormsSection = () => {
  const [forms, setForms] = useState<DownloadableForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [formsData, contentData] = await Promise.all([
        getDownloadableForms(),
        getSectionContent()
      ]);
      setForms(formsData);
      if (contentData.forms) {
        setSectionContent(contentData.forms);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const scrollToHotline = () => {
    const element = document.getElementById('hotline');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="forms" className="py-16 sm:py-20 section-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-muted-foreground/30">|</span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : forms.length === 0 ? (
          <p className="text-center text-muted-foreground">No forms available at the moment.</p>
        ) : (
          <div className="grid gap-4">
            {forms.map((form, index) => (
              <a
                key={form.id}
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-enhanced flex items-center gap-5 p-5 sm:p-6 group hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 text-2xl">
                  {form.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {form.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {form.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Note */}
        <div className="mt-12 card-glass p-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">Need help with forms?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Contact our EdTech team for assistance with forms or submission procedures.
              </p>
            </div>
            <button
              onClick={scrollToHotline}
              className="inline-flex items-center gap-2 btn-primary whitespace-nowrap"
            >
              Contact Hotline
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormsSection;
