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
            {/* Feedback Form Link Button */}
            <div 
              className="rounded-xl p-8 sm:p-12 text-center animate-fade-up"
              style={{ 
                backgroundColor: "#0F0F0F",
                border: "1px solid #800000",
                animationDelay: '0.1s'
              }}
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                  User Satisfaction Survey
                </h3>
                <p className="text-sm sm:text-base mb-8" style={{ color: "#CCCCCC" }}>
                  Help us improve our services by sharing your feedback. Your input is valuable to us!
                </p>
                <a
                  href={feedbackConfig.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg transition-all duration-300 rounded-xl"
                  style={{ 
                    backgroundColor: "#A01010",
                    color: "#FFFFFF"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(160, 16, 16, 0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  {feedbackConfig.button_text || "Open Feedback Form"}
                </a>
              </div>
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
