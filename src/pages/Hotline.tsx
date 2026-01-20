import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const hotlineContacts = [
  {
    campus: "Main Campus",
    contacts: [
      { name: "Dave Lawrence Pamotongan", email: "dpamotongan@liceo.edu.ph", role: "Google Workspace & School Automate" },
      { name: "Remar Lumances", email: "rlumances@liceo.edu.ph", role: "Campus Internet Issues" },
    ],
  },
  {
    campus: "Rodolfo N. Pelaez Campus (RNP)",
    contacts: [
      { name: "Mary Jane Morato", email: "mmorato@liceo.edu.ph", role: "Google Workspace & School Automate" },
    ],
  },
  {
    campus: "Paseo Del Rio Campus (PDR)",
    contacts: [
      { name: "Mary Abigail Paulan", email: "mpaulan@liceo.edu.ph", role: "Google Workspace & School Automate" },
      { name: "Vidal Valledor", email: "vvalledor@liceo.edu.ph", role: "Campus Internet Issues" },
    ],
  },
  {
    campus: "Grade School Campus",
    contacts: [
      { name: "Judison Ferth R. Nunez", email: "jnunez@liceo.edu.ph", role: "Technical Support" },
    ],
  },
];

const Hotline = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="EdTech Hotline"
          subtitle="Get technical support from our specialists"
        />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto animate-fade-up">
              Need technical assistance? Contact our EdTech specialists for help with Google Workspace, School Automate, or campus internet issues.
            </p>

            <div className="space-y-6">
              {hotlineContacts.map((campus, index) => (
                <div
                  key={index}
                  className="card-enhanced overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-border/50">
                    <h2 className="font-bold text-foreground flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      {campus.campus}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {campus.contacts.map((contact, contactIndex) => (
                        <div
                          key={contactIndex}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0 group"
                        >
                          <div>
                            <h3 className="font-semibold text-foreground">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{contact.role}</p>
                          </div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium transition-all duration-300 group-hover:gap-3"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coordinator Contact */}
            <div className="mt-12 relative overflow-hidden rounded-2xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary" />
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }} />
              </div>
              <div className="relative p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl text-primary-foreground mb-2">E-Learning Technology Coordinator</h3>
                <p className="font-semibold text-primary-foreground/90 text-lg">Mr. Roy Emeterio L. Pabilona</p>
                <a
                  href="mailto:rpabilona@liceo.edu.ph"
                  className="inline-flex items-center gap-2 mt-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  rpabilona@liceo.edu.ph
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hotline;
