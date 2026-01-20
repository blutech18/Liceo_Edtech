import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { getHotlineContacts, getHotlineCategories, getCoordinatorContact, getSectionContent, HotlineContact, HotlineCategory, CoordinatorContact, SectionContent } from "@/lib/api";

const defaultContent: SectionContent = {
  id: '', section_key: 'hotline',
  title: 'EdTech Hotline',
  subtitle: 'Get technical support from our specialists'
};

const HotlineSection = () => {
  const [contacts, setContacts] = useState<HotlineContact[]>([]);
  const [categories, setCategories] = useState<HotlineCategory[]>([]);
  const [coordinator, setCoordinator] = useState<CoordinatorContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [contactsData, categoriesData, coordinatorData, contentData] = await Promise.all([
        getHotlineContacts(),
        getHotlineCategories(),
        getCoordinatorContact(),
        getSectionContent()
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
    .filter(contact => contact.status === 'active')
    .reduce((acc, contact) => {
      if (!acc[contact.category]) {
        acc[contact.category] = [];
      }
      acc[contact.category].push(contact);
      return acc;
    }, {} as Record<string, HotlineContact[]>);

  // Get category info helper
  const getCategoryInfo = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) {
      // Fallback for unknown categories
      const initials = categoryName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return {
        name: categoryName,
        initials,
        gradient: 'from-blue-400 via-cyan-400 to-blue-500'
      };
    }

    // Generate initials from category name
    const initials = category.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    // Default gradients based on category name or use a hash-based color
    const gradients: Record<string, string> = {
      'Google Workspace': 'from-blue-400 via-cyan-400 to-blue-500',
      'School Automate': 'from-green-400 via-emerald-400 to-green-500',
      'Campus Internet': 'from-orange-400 via-amber-400 to-orange-500'
    };

    return {
      name: category.name,
      initials,
      gradient: gradients[category.name] || 'from-blue-400 via-cyan-400 to-blue-500',
      image_url: category.image_url || ''
    };
  };

  // Sort categories by display_order (same as admin panel)
  // This ensures the public site matches the order set in the admin via drag-and-drop
  const sortedCategories = categories
    .filter(c => c.status === 'active')
    .sort((a, b) => {
      // Primary sort: display_order (set by admin drag-and-drop)
      if (a.display_order !== b.display_order) {
        return a.display_order - b.display_order;
      }
      // Secondary sort: by name (fallback for categories with same display_order)
      return a.name.localeCompare(b.name);
    });

  return (
    <section id="hotline" className="py-16 sm:py-20 section-maroon scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
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
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {sortedCategories.length === 0 ? (
                <div className="text-center py-12 text-white/80">
                  <p>No hotline categories available at the moment.</p>
                </div>
              ) : (
                sortedCategories.map((category, index) => {
                  const categoryContacts = groupedContacts[category.name] || [];
                  if (categoryContacts.length === 0) return null; // Don't show empty categories

                  const info = getCategoryInfo(category.name);
                  return (
                    <div
                      key={category.id}
                      className="card-enhanced overflow-hidden animate-fade-up bg-white"
                      style={{ animationDelay: `${index * 0.1}s`, backgroundColor: 'white' }}
                    >
                      {/* Title Header */}
                      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-6 py-5 border-b-2 border-primary/20">
                        <h3 className="font-bold text-xl text-foreground tracking-wide">
                          {info.name}
                        </h3>
                      </div>

                      {/* Grid Layout with Image and Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left - Image Placeholder */}
                        <div className={`relative h-full min-h-[250px] flex items-center justify-center overflow-hidden ${info.image_url ? '' : `bg-gradient-to-br ${info.gradient}`}`}>
                          {info.image_url ? (
                            <img
                              src={info.image_url}
                              alt={info.name}
                              className="w-full h-full object-contain p-6"
                              onError={(e) => {
                                // Fallback to gradient on error
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.className = `relative h-full min-h-[200px] flex items-center justify-center overflow-hidden bg-gradient-to-br ${info.gradient}`;
                                  e.currentTarget.style.display = 'none';
                                }
                              }}
                            />
                          ) : (
                            <>
                              {/* Decorative Pattern */}
                              <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-20 h-20 border-4 border-white rounded-lg rotate-45"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/50 rounded-full"></div>
                              </div>
                              {/* Category Initials */}
                              <div className="relative z-10 text-center">
                                <div className="text-6xl font-bold text-white/90 mb-2">
                                  {info.initials}
                                </div>
                                <div className="text-white/80 text-sm font-medium px-4">
                                  {info.name}
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Right - Contact Details */}
                        <div className="p-6 bg-white flex items-center">
                          <div className="grid gap-4 w-full">
                            {categoryContacts.map((contact) => (
                              <div
                                key={contact.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0 group"
                              >
                                <div>
                                  <h4 className="font-semibold text-foreground">{contact.name}</h4>
                                  {contact.campus && (
                                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {contact.campus}
                                    </p>
                                  )}
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
                    </div>
                  );
                })
              )}
            </div>

            {/* Coordinator Contact */}
            {coordinator && (
              <div className="mt-12 card-enhanced overflow-hidden animate-fade-up bg-white" style={{ animationDelay: '0.4s', backgroundColor: 'white' }}>
                {/* Content Only - No Image Placeholder */}
                <div className="bg-white px-6 py-4 border-b border-border/50">
                  <h3 className="font-bold text-foreground flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    E-Learning Technology Coordinator
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                    <div>
                      <h4 className="font-semibold text-foreground">{coordinator.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{coordinator.title}</p>
                    </div>
                    <a
                      href={`mailto:${coordinator.email}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium transition-all duration-300 group-hover:gap-3"
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
    </section >
  );
};

export default HotlineSection;
