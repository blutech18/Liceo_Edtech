import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ExternalLink, MessageSquare, Star } from "lucide-react";

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title="Feedback" subtitle="We value your input to improve our services" />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Title Section */}
            <div className="mb-8 text-center animate-fade-up">
              <h2 className="text-2xl font-bold text-foreground">User Satisfaction Survey</h2>
              <p className="text-muted-foreground mt-2">
                Help us improve our Educational Technology Center services by completing this survey.
              </p>
            </div>

            {/* Embedded Form */}
            <div className="card-enhanced overflow-hidden animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-full" style={{ height: '2400px' }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeOQn-UU4U-TuWT9ngJVB2bpqrTYKBp-JmVHKsrcjRBVDHDcA/viewform?embedded=true"
                  className="w-full h-full border-0"
                  title="User Satisfaction Survey"
                >
                  Loading...
                </iframe>
              </div>
            </div>

            <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeOQn-UU4U-TuWT9ngJVB2bpqrTYKBp-JmVHKsrcjRBVDHDcA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                Open form in new window
              </a>
            </div>

            {/* Rating Info */}
            <div className="mt-12 card-glass p-8 text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground">
                Your feedback helps us maintain excellent service quality and continuously improve our offerings.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
