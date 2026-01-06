import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { FileText, ExternalLink } from "lucide-react";

const forms = [
  {
    title: "EdTech Center ISO Request Forms",
    description: "Official request forms for educational technology services and equipment",
    url: "#",
  },
  {
    title: "Equipment Borrowing Form",
    description: "Request to borrow audio-visual equipment and devices",
    url: "#",
  },
  {
    title: "Technical Support Request",
    description: "Submit a request for technical assistance",
    url: "#",
  },
  {
    title: "Training Request Form",
    description: "Request for department or group training sessions",
    url: "#",
  },
];

const Forms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title="Downloadable Forms" />

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-muted-foreground mb-10">
              Access and download official forms for EdTech Center services.
            </p>

            <div className="space-y-4">
              {forms.map((form, index) => (
                <a
                  key={index}
                  href={form.url}
                  className="flex items-center gap-4 bg-card p-5 rounded-lg shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {form.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {form.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* Note */}
            <div className="mt-10 bg-primary/5 p-6 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                For questions about forms or submission procedures, please contact the EdTech Center
                through our <a href="/hotline" className="text-primary hover:underline">Hotline</a> page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Forms;
