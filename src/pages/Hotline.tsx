import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

const hotlineContacts = [
  {
    campus: "MAIN CAMPUS",
    contacts: [
      { name: "Dave Lawrence Pamotongan", email: "dpamotongan@liceo.edu.ph", role: "Google Workspace & School Automate" },
      { name: "Remar Lumances", email: "rlumances@liceo.edu.ph", role: "Campus Internet Issues" },
    ],
  },
  {
    campus: "RODOLFO N. PELAEZ CAMPUS (RNP)",
    contacts: [
      { name: "Mary Jane Morato", email: "mmorato@liceo.edu.ph", role: "Google Workspace & School Automate" },
    ],
  },
  {
    campus: "PASEO DEL RIO CAMPUS (PDR)",
    contacts: [
      { name: "Mary Abigail Paulan", email: "mpaulan@liceo.edu.ph", role: "Google Workspace & School Automate" },
      { name: "Vidal Valledor", email: "vvalledor@liceo.edu.ph", role: "Campus Internet Issues" },
    ],
  },
  {
    campus: "GRADE SCHOOL CAMPUS",
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
        {/* Hero Banner */}
        <div className="bg-primary py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-center uppercase tracking-wide">
              EdTech Hotline
            </h1>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-center text-muted-foreground mb-8">
              Need technical assistance? Contact our EdTech specialists for help with Google Workspace, School Automate, or campus internet issues.
            </p>

            <div className="space-y-8">
              {hotlineContacts.map((campus, index) => (
                <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary/10 px-6 py-3 border-b border-border">
                    <h2 className="font-bold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {campus.campus}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {campus.contacts.map((contact, contactIndex) => (
                        <div
                          key={contactIndex}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border last:border-0 last:pb-0"
                        >
                          <div>
                            <h3 className="font-semibold text-foreground">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                          </div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 text-primary hover:underline text-sm"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coordinator Contact */}
            <div className="mt-8 bg-primary text-primary-foreground rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">E-Learning Technology Coordinator</h3>
              <p className="font-semibold">Mr. Roy Emeterio L. Pabilona</p>
              <a href="mailto:rpabilona@liceo.edu.ph" className="flex items-center justify-center gap-2 mt-2 hover:underline">
                <Mail className="w-4 h-4" />
                rpabilona@liceo.edu.ph
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hotline;
