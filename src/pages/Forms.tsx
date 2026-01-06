import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { FileText, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const forms = [
  {
    title: "EdTech Center ISO Request Forms",
    description: "Official request forms for educational technology services and equipment",
    url: "#",
    icon: "📋",
  },
  {
    title: "Equipment Borrowing Form",
    description: "Request to borrow audio-visual equipment and devices",
    url: "#",
    icon: "🎬",
  },
  {
    title: "Technical Support Request",
    description: "Submit a request for technical assistance",
    url: "#",
    icon: "🛠️",
  },
  {
    title: "Training Request Form",
    description: "Request for department or group training sessions",
    url: "#",
    icon: "📚",
  },
];

const Forms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title="Downloadable Forms" subtitle="Access official EdTech Center forms" />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto animate-fade-up">
              Access and download official forms for EdTech Center services.
            </p>

            <div className="grid gap-4">
              {forms.map((form, index) => (
                <a
                  key={index}
                  href={form.url}
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

            {/* Note */}
            <div className="mt-12 card-glass p-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-foreground">Need help with forms?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact our EdTech team for assistance with forms or submission procedures.
                  </p>
                </div>
                <Link 
                  to="/hotline" 
                  className="inline-flex items-center gap-2 btn-primary whitespace-nowrap"
                >
                  Contact Hotline
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Forms;
