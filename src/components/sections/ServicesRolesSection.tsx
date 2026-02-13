import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  getSectionContent,
  getAboutUsContent,
  SectionContent,
  AboutUsContent,
} from "@/lib/api";

const defaultSectionContent: SectionContent = {
  id: "",
  section_key: "services_roles",
  title: "Services & Key Roles",
  subtitle:
    "Comprehensive technology services delivered by our dedicated team of experts.",
};

const ServicesRolesSection = () => {
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(
    defaultSectionContent,
  );
  const [services, setServices] = useState<AboutUsContent[]>([]);
  const [keyRoles, setKeyRoles] = useState<AboutUsContent[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contentData, aboutData] = await Promise.all([
        getSectionContent(),
        getAboutUsContent(),
      ]);
      if (contentData.services_roles) {
        setSectionContent(contentData.services_roles);
      }
      setServices(
        aboutData
          .filter((c) => c.section_type === "services")
          .sort((a, b) => a.display_order - b.display_order),
      );
      setKeyRoles(
        aboutData
          .filter((c) => c.section_type === "key_roles")
          .sort((a, b) => a.display_order - b.display_order),
      );
      setLoading(false);
    }
    fetchData();
  }, []);

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
            {sectionContent.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "hsl(var(--text-muted))" }}
          >
            {sectionContent.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#A01010" }}
            />
          </div>
        ) : (
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
                    key={service.id}
                    className="flex items-center gap-4 animate-fade-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#A01010" }}
                    />
                    <span style={{ color: "hsl(var(--text-muted))" }}>
                      {service.content}
                    </span>
                  </li>
                ))}
                {services.length === 0 && (
                  <li style={{ color: "hsl(var(--text-muted))" }}>
                    No services available.
                  </li>
                )}
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
                    key={role.id}
                    className="flex items-center gap-4 animate-fade-up"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "#A01010" }}
                    />
                    <span style={{ color: "hsl(var(--text-muted))" }}>
                      {role.content}
                    </span>
                  </li>
                ))}
                {keyRoles.length === 0 && (
                  <li style={{ color: "hsl(var(--text-muted))" }}>
                    No key roles available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesRolesSection;
