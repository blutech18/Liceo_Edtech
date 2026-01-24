import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
  getResources,
  Resource,
  getSectionContent,
  SectionContent,
} from "@/lib/api";

const categoryColors: Record<string, string> = {
  "Interactive Learning": "bg-primary/10 text-primary border-primary/20",
  "Media Production": "bg-primary/10 text-primary border-primary/20",
  Design: "bg-primary/10 text-primary border-primary/20",
  "Google Workspace": "bg-primary/10 text-primary border-primary/20",
  Collaboration: "bg-primary/10 text-primary border-primary/20",
};

const defaultContent: SectionContent = {
  id: "",
  section_key: "resources",
  title: "Educational Resources",
  subtitle: "Tools and platforms to enhance your teaching",
};

const ResourcesSection = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);
  const [categoryOrder, setCategoryOrder] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      const [data, contentData] = await Promise.all([
        getResources(),
        getSectionContent(),
      ]);
      setResources(data);
      if (contentData.resources) {
        setSectionContent(contentData.resources);
      }

      // Load category order from localStorage (same as admin panel)
      const savedOrder = localStorage.getItem("resourceCategoryOrder");
      if (savedOrder) {
        setCategoryOrder(JSON.parse(savedOrder));
      }

      setLoading(false);
    }
    fetchResources();
  }, []);

  const categories = [...new Set(resources.map((r) => r.category))].sort(
    (a, b) => {
      const orderA = categoryOrder[a] ?? 999;
      const orderB = categoryOrder[b] ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    },
  );

  return (
    <section
      id="resources"
      className="py-16 sm:py-20 section-maroon scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-white/30">|</span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : resources.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No resources available at the moment.
          </p>
        ) : (
          categories.map((category, catIndex) => (
            <div
              key={category}
              className="mb-12 animate-fade-up"
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border ${categoryColors[category] || "bg-primary/10 text-primary border-primary/20"}`}
                >
                  {category}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources
                  .filter((r) => r.category === category)
                  .map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-enhanced overflow-hidden group hover-lift"
                    >
                      {/* Image Placeholder */}
                      {resource.image && (
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
