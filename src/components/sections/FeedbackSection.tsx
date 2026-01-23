import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { getFeedbackConfig, getSectionContent, getHelpDeskConfig, FeedbackConfig, SectionContent, HelpDeskConfig } from "@/lib/api";

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
    <section id="feedback" className="py-16 sm:py-20 scroll-mt-16" style={{ backgroundColor: "#1A1A1A" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#FFFFFF" }}>
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl" style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <p className="text-base sm:text-lg" style={{ color: "#CCCCCC" }}>
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#A01010" }} />
          </div>
        ) : (
          <>
            {/* Embedded Form */}
            <div 
              className="rounded-xl overflow-hidden animate-fade-up"
              style={{ 
                backgroundColor: "#0F0F0F",
                border: "1px solid #800000",
                animationDelay: '0.1s'
              }}
            >
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
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 rounded"
                style={{ 
                  backgroundColor: "#A01010",
                  color: "#FFFFFF"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(160, 16, 16, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <ExternalLink className="w-4 h-4" />
                {feedbackConfig.button_text}
              </a>
            </div>

            {/* Help Desk Link */}
            <div 
              className="mt-12 rounded-xl p-8 text-center animate-fade-up"
              style={{ 
                backgroundColor: "#0F0F0F",
                border: "1px solid #800000",
                animationDelay: '0.35s'
              }}
            >
              <p className="font-semibold text-lg mb-3" style={{ color: "#FFFFFF" }}>{helpDeskConfig.title}</p>
              <a
                href={helpDeskConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 rounded"
                style={{ 
                  backgroundColor: "#A01010",
                  color: "#FFFFFF"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(160, 16, 16, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
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
