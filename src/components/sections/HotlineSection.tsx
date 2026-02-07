import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import {
  getHotlineContacts,
  getHotlineCategories,
  getCoordinatorContact,
  getSectionContent,
  HotlineContact,
  HotlineCategory,
  CoordinatorContact,
  SectionContent,
} from "@/lib/api";

const defaultContent: SectionContent = {
  id: "",
  section_key: "hotline",
  title: "EdTech Hotline",
  subtitle: "Get technical support from our specialists",
};

const HotlineSection = () => {
  const [contacts, setContacts] = useState<HotlineContact[]>([]);
  const [categories, setCategories] = useState<HotlineCategory[]>([]);
  const [coordinator, setCoordinator] = useState<CoordinatorContact | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contactsData, categoriesData, coordinatorData, contentData] =
        await Promise.all([
          getHotlineContacts(),
          getHotlineCategories(),
          getCoordinatorContact(),
          getSectionContent(),
        ]);
      setContacts(contactsData);
      setCategories(categoriesData);
      setCoordinator(coordinatorData);
      if (contentData.hotline) {
        setSectionContent(contentData.hotline);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Group contacts by category (only active contacts)
  const groupedContacts = contacts
    .filter((contact) => contact.status === "active")
    .reduce(
      (acc, contact) => {
        if (!acc[contact.category]) {
          acc[contact.category] = [];
        }
        acc[contact.category].push(contact);
        return acc;
      },
      {} as Record<string, HotlineContact[]>,
    );

  // Get category info helper
  const getCategoryInfo = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    if (!category) {
      const initials = categoryName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      return {
        name: categoryName,
        initials,
        gradient: "from-red-900 via-red-800 to-red-900",
      };
    }

    const initials = category.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return {
      name: category.name,
      initials,
      gradient: "from-red-900 via-red-800 to-red-900",
      image_url: category.image_url || "",
    };
  };

  // Sort categories by display_order
  const sortedCategories = categories
    .filter((c) => c.status === "active")
    .sort((a, b) => {
      if (a.display_order !== b.display_order) {
        return a.display_order - b.display_order;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <section
      id="hotline"
      className="py-16 sm:py-20 scroll-mt-16"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              {sectionContent.title}
            </h2>
            <span
              className="hidden sm:block text-2xl"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              |
            </span>
            <p className="text-base sm:text-lg" style={{ color: "#CCCCCC" }}>
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#A01010" }}
            />
          </div>
        ) : (
          <>
            {/* 3-Column Grid Layout */}
            {sortedCategories.length === 0 ? (
              <div
                className="text-center py-12"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <p>No hotline categories available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {sortedCategories.map((category, index) => {
                  const categoryContacts = groupedContacts[category.name] || [];
                  if (categoryContacts.length === 0) return null;

                  const info = getCategoryInfo(category.name);
                  return (
                    <div
                      key={category.id}
                      className="rounded-xl overflow-hidden animate-fade-up transition-all duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #800000",
                        animationDelay: `${index * 0.1}s`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 15px rgba(160, 16, 16, 0.4)";
                        e.currentTarget.style.borderColor = "#A01010";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#800000";
                      }}
                    >
                      {/* Category Header with Image/Initials - Event Card Style */}
                      <div className="relative h-36 sm:h-40 overflow-hidden group/image">
                        {info.image_url ? (
                          <>
                            <img
                              src={info.image_url}
                              alt={info.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-[1.03] md:group-hover/image:scale-110"
                              style={{
                                backfaceVisibility: "hidden",
                                transform: "translateZ(0)",
                              }}
                              onError={(e) => {
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.style.background =
                                    "linear-gradient(135deg, #800000 0%, #A01010 50%, #800000 100%)";
                                  e.currentTarget.style.display = "none";
                                }
                              }}
                            />
                            {/* Gradient Overlay - Event Card Style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            {/* Category Name Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                              <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow-lg">
                                {info.name}
                              </h3>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #800000 0%, #A01010 50%, #800000 100%)",
                              }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            {/* Decorative Pattern */}
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                              <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
                            </div>
                            {/* Category Initials */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div
                                className="text-5xl font-bold"
                                style={{ color: "rgba(255,255,255,0.9)" }}
                              >
                                {info.initials}
                              </div>
                            </div>
                            {/* Category Name Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                              <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow-lg">
                                {info.name}
                              </h3>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Contact Details */}
                      <div className="p-4">
                        <div className="space-y-4">
                          {categoryContacts.map((contact) => (
                            <div
                              key={contact.id}
                              className="pb-4 border-b last:border-0 last:pb-0 group"
                              style={{ borderColor: "rgba(128, 0, 0, 0.2)" }}
                            >
                              <h4
                                className="font-semibold"
                                style={{ color: "#FFFFFF" }}
                              >
                                {contact.name}
                              </h4>
                              {contact.campus && (
                                <p
                                  className="text-sm mt-0.5 flex items-center gap-1"
                                  style={{ color: "#CCCCCC" }}
                                >
                                  <MapPin className="w-3 h-3" />
                                  {contact.campus}
                                </p>
                              )}
                              <a
                                href={`mailto:${contact.email}`}
                                className="inline-flex items-center gap-2 text-sm font-medium mt-2 transition-all duration-300 group-hover:gap-3 underline decoration-1 underline-offset-2 hover:decoration-2"
                                style={{ color: "#FF8A8A" }}
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
                  );
                })}
              </div>
            )}

            {/* Coordinator Contact */}
            {coordinator && (
              <div
                className="mt-12 rounded-xl overflow-hidden animate-fade-up"
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #800000",
                  animationDelay: "0.4s",
                }}
              >
                <div
                  className="px-6 py-4 border-b"
                  style={{ borderColor: "rgba(128, 0, 0, 0.3)" }}
                >
                  <h3
                    className="font-bold flex items-center gap-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(160, 16, 16, 0.15)" }}
                    >
                      <Phone className="w-5 h-5" style={{ color: "#A01010" }} />
                    </div>
                    E-Learning Technology Coordinator
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#FFFFFF" }}
                      >
                        {coordinator.name}
                      </h4>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: "#CCCCCC" }}
                      >
                        {coordinator.title}
                      </p>
                    </div>
                    <a
                      href={`mailto:${coordinator.email}`}
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3 underline decoration-1 underline-offset-2 hover:decoration-2"
                      style={{ color: "#FF8A8A" }}
                    >
                      <Mail className="w-4 h-4" />
                      {coordinator.email}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default HotlineSection;
