import { CheckCircle2 } from "lucide-react";

const services = [
  "ICT Training & Professional Development",
  "Media Production & Content Creation",
  "Learning Management System Support",
  "Technical Infrastructure Management",
  "Educational Software Integration",
  "Digital Resource Development",
];

const keyRoles = [
  "Digital Learning Coaches",
  "Instructional Technology Specialists",
  "Tech Leaders & Coordinators",
  "E-Learning Content Developers",
  "IT Support & Help Desk Team",
  "Educational Data Analysts",
];

const ServicesRolesSection = () => {
  return (
    <section
      id="services-roles"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "hsl(var(--bg-main))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#A01010" }}
          >
            Our Expertise
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 title-glow"
            style={{ color: "hsl(var(--text-main))" }}
          >
            Services & Key Roles
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            Comprehensive technology services delivered by our dedicated team of
            experts.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Column 1: Services Offered */}
          <div
            className="p-8 sm:p-10 rounded-2xl animate-fade-up"
            style={{
              backgroundColor: "hsl(var(--bg-surface))",
              border: "1px solid #800000",
            }}
          >
            <h3
              className="text-2xl font-bold mb-8 flex items-center gap-3"
              style={{ color: "hsl(var(--text-main))" }}
            >
              <span
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: "#A01010" }}
              />
              Services Offered
            </h3>

            <ul className="space-y-4">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 animate-fade-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#A01010" }}
                  />
                  <span style={{ color: "hsl(var(--text-muted))" }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Key Roles */}
          <div
            className="p-8 sm:p-10 rounded-2xl animate-fade-up"
            style={{
              backgroundColor: "hsl(var(--bg-surface))",
              border: "1px solid #800000",
              animationDelay: "0.1s",
            }}
          >
            <h3
              className="text-2xl font-bold mb-8 flex items-center gap-3"
              style={{ color: "hsl(var(--text-main))" }}
            >
              <span
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: "#A01010" }}
              />
              Key Roles
            </h3>

            <ul className="space-y-4">
              {keyRoles.map((role, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 animate-fade-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "#A01010" }}
                  />
                  <span style={{ color: "hsl(var(--text-muted))" }}>
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesRolesSection;
