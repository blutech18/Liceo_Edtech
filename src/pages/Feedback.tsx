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
            <div className="card-enhanced overflow-hidden animate-fade-up">
              <div className="p-6 sm:p-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">User Satisfaction Survey</h2>
                    <p className="text-muted-foreground mt-1">
                      Help us improve our Educational Technology Center services by completing this survey.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Embedded Google Form */}
              <div className="aspect-[4/5] sm:aspect-[16/12] bg-section-bg">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd8RCqP7RBkqFhGVJBNGDOMVGDNGqEtZGNqYCxVrVqJMGrqnQ/viewform?embedded=true"
                  className="w-full h-full border-0"
                  title="User Satisfaction Survey"
                >
                  Loading...
                </iframe>
              </div>
            </div>

            <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <a
                href="https://forms.gle/ZGLkmgAMvva55YoB8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                Open form in new window
              </a>
            </div>

            {/* Rating Info */}
            <div className="mt-12 card-glass p-8 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
