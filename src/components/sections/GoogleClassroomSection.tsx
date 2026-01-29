import { useState, useEffect } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
} from "lucide-react";
import {
  getSectionContent,
  SectionContent,
  getGoogleClassroomRoles,
  GoogleClassroomRole,
} from "@/lib/api";
import gcStudent from "@/assets/gc-student.jpg";
import gcTeacher from "@/assets/gc-teacher.jpg";
import gcGuardian from "@/assets/gc-guardian.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  SeasonalHoverCards,
  SeasonCardProps,
} from "@/components/ui/seasonal-hover-cards";

const defaultContent: SectionContent = {
  id: "",
  section_key: "google_classroom",
  title: "Guide to Google Classroom",
  subtitle: "Comprehensive guides for students, teachers, and guardians",
};

// Default images mapping
const defaultImages: Record<string, string> = {
  student: gcStudent,
  teacher: gcTeacher,
  guardian: gcGuardian,
};

const GoogleClassroomSection = () => {
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);
  const [roles, setRoles] = useState<GoogleClassroomRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<GoogleClassroomRole | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<number>(0);


  useEffect(() => {
    async function fetchData() {
      try {
        const [contentData, rolesData] = await Promise.all([
          getSectionContent(),
          getGoogleClassroomRoles(),
        ]);

        if (contentData.google_classroom) {
          setSectionContent(contentData.google_classroom);
        }

        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching Google Classroom data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openModal = (role: GoogleClassroomRole) => {
    setSelectedRole(role);
    setActiveTab(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <section
      id="google-classroom"
      className="py-16 sm:py-20 section-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-muted-foreground/30">
              |
            </span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading guides...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && roles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No guides available at the moment.
            </p>
          </div>
        )}

        {/* Role Image Cards */}
        {!loading && roles.length > 0 && (
          <div className="animate-fade-up">
            <SeasonalHoverCards
              cards={roles.map((role) => ({
                title: role.role_name,
                subtitle: `Click to view ${role.role_name.toLowerCase()} guide`,
                description: role.description,
                imageSrc:
                  role.image_url || defaultImages[role.role_key] || gcStudent,
                imageAlt: role.role_name,
                onClick: () => openModal(role),
              }))}
            />
          </div>
        )}

        {!loading && roles.length > 0 && (
          <p
            className="text-center text-xs text-muted-foreground mt-12 italic animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Image sources: Shutterstock, PSU, TeachHub
          </p>
        )}

        {/* Redesigned Modal with Tabs */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-[640px] md:w-[900px] lg:w-[1200px] h-[85vh] sm:h-[700px] max-h-[90vh] p-0 gap-0 flex flex-col overflow-hidden rounded-xl">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-primary via-primary-light to-primary px-4 sm:px-6 py-4 sm:py-5 border-b border-border/10 flex-shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 pr-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {selectedRole?.role_name} Guide
                  </h2>
                  <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                    {selectedRole?.sections?.length || 0} sections • {selectedRole?.sections?.reduce(
                      (acc, section) => acc + (section.links?.length || 0),
                      0,
                    ) || 0} resources
                  </p>
                </div>
              </div>
            </div>

            {/* Tabbed Interface */}
            <div className="flex flex-col flex-1 overflow-hidden min-h-0">
              {/* Tab Navigation */}
              <div className="border-b border-border bg-muted/20 flex-shrink-0">
                <ScrollArea className="w-full">
                  <div className="flex px-2 sm:px-4 gap-1 sm:gap-2 min-w-max">
                    {selectedRole?.sections?.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                          activeTab === index
                            ? "border-primary text-primary bg-primary/5"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{section.title}</span>
                          <span className="text-xs opacity-60">({section.links?.length || 0})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Tab Content */}
              <ScrollArea className="flex-1">
                <div className="p-4 sm:p-6">
                  {selectedRole?.sections?.map((section, index) => (
                    activeTab === index && (
                      <div key={index} className="space-y-3">
                        {section.links && section.links.length > 0 ? (
                          <div className="grid gap-3">
                            {section.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all duration-200 hover:shadow-md"
                              >
                                <div className="mt-0.5 flex-shrink-0">
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {link.title}
                                  </h4>
                                  {link.description && (
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                                      {link.description}
                                    </p>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground text-sm">
                              No resources available in this section.
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GoogleClassroomSection;
