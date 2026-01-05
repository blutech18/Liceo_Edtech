import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="bg-primary py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-center uppercase tracking-wide">
              Feedback
            </h1>
            <p className="text-primary-foreground/80 text-center mt-2">
              We Want to Hear From You
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">User Satisfaction Survey</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us improve our Educational Technology Center services by completing this survey.
                </p>
              </div>
              
              {/* Embedded Google Form */}
              <div className="aspect-[4/5] sm:aspect-[16/12]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd8RCqP7RBkqFhGVJBNGDOMVGDNGqEtZGNqYCxVrVqJMGrqnQ/viewform?embedded=true"
                  className="w-full h-full border-0"
                  title="User Satisfaction Survey"
                >
                  Loading...
                </iframe>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://forms.gle/ZGLkmgAMvva55YoB8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Open form in new window
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
