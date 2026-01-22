import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { getFeedbackConfig, getSectionContent, getHelpDeskConfig, FeedbackConfig, SectionContent, HelpDeskConfig } from "@/lib/api";
import orgChart from "@/assets/org-chart.jpg";

const defaultContent: SectionContent = {
  id: '', section_key: 'feedback',
  title: 'Feedback',
  subtitle: 'We value your input to improve our services'
};

const defaultFeedbackConfig: FeedbackConfig = {
  id: '',
  form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSeOQn-UU4U-TuWT9ngJVB2bpqrTYKBp-JmVHKsrcjRBVDHDcA/viewform',
  button_text: 'Open form in new window'
};

const defaultHelpDesk: HelpDeskConfig = {
  id: '',
  title: 'EdTech Help Desk Monitoring Form',
  url: 'https://forms.gle/ZGLkmgAMvva55YoB8'
};

const FeedbackSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);
  const [feedbackConfig, setFeedbackConfig] = useState<FeedbackConfig>(defaultFeedbackConfig);
  const [helpDeskConfig, setHelpDeskConfig] = useState<HelpDeskConfig>(defaultHelpDesk);
  const [orgChartImage, setOrgChartImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, configData, helpDeskData] = await Promise.all([
        getSectionContent(),
        getFeedbackConfig(),
        getHelpDeskConfig()
      ]);
      if (contentData.feedback) {
        setSectionContent(contentData.feedback);
        if (contentData.feedback.image_url) {
          setOrgChartImage(contentData.feedback.image_url);
        }
      }
      // Also check about_us for org chart image
      if (contentData.about_us?.image_url) {
        setOrgChartImage(contentData.about_us.image_url);
      }
      if (configData) {
        setFeedbackConfig(configData);
      }
      if (helpDeskData) {
        setHelpDeskConfig(helpDeskData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const embedUrl = feedbackConfig.form_url.includes('?') 
    ? `${feedbackConfig.form_url}&embedded=true`
    : `${feedbackConfig.form_url}?embedded=true`;

  return (
    <section id="feedback" className="py-16 sm:py-20 section-white scroll-mt-16">
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
        ) : (
          <>
            {/* Embedded Form */}
            <div className="card-enhanced overflow-hidden animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-full" style={{ height: '800px' }}>
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  title="User Satisfaction Survey"
                >
                  Loading...
                </iframe>
              </div>
            </div>

            <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <a
                href={feedbackConfig.form_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                {feedbackConfig.button_text}
              </a>
            </div>

            {/* Organizational Chart */}
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">Organizational Chart</h3>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
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
            <div className="mt-12 card-enhanced p-8 text-center animate-fade-up" style={{ animationDelay: '0.35s' }}>
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

export default FeedbackSection;
