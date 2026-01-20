import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { getFeedbackConfig, getSectionContent, FeedbackConfig, SectionContent } from "@/lib/api";

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

const FeedbackSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);
  const [feedbackConfig, setFeedbackConfig] = useState<FeedbackConfig>(defaultFeedbackConfig);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, configData] = await Promise.all([
        getSectionContent(),
        getFeedbackConfig()
      ]);
      if (contentData.feedback) {
        setSectionContent(contentData.feedback);
      }
      if (configData) {
        setFeedbackConfig(configData);
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
          </>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;
