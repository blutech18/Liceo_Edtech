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
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([0]),
  );

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

  const toggleSection = (index: number) => {
    if (expandedSections.has(index)) {
      // Close the section if it's already open
      setExpandedSections(new Set());
    } else {
      // Open only this section, close all others
      setExpandedSections(new Set([index]));
    }
  };

  const openModal = (role: GoogleClassroomRole) => {
    setSelectedRole(role);
    setExpandedSections(new Set([0]));
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

        {/* Redesigned Professional Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[1200px] max-w-[95vw] h-[700px] max-h-[90vh] p-0 gap-0 flex flex-col overflow-hidden rounded-xl">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-primary via-primary-light to-primary px-6 py-6 border-b border-border/10 flex-shrink-0">
              <div className="flex items-center gap-4 pr-12">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {selectedRole?.role_name} Guide
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-white/80 text-sm line-clamp-1">
                      {selectedRole?.description}
                    </p>
                    <span className="text-white/60 text-sm mx-2">•</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 hover:bg-white/25 text-xs font-medium"
                      >
                        {selectedRole?.sections?.length || 0} Sections
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 hover:bg-white/25 text-xs font-medium"
                      >
                        {selectedRole?.sections?.reduce(
                          (acc, section) => acc + (section.links?.length || 0),
                          0,
                        ) || 0}{" "}
                        Resources
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body - Two Column Layout */}
            <div className="flex flex-1 overflow-hidden min-h-0">
              {/* Left Sidebar - Section Navigation */}
              <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-3 space-y-2">
                    {selectedRole?.sections?.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => toggleSection(index)}
                        className={`w-full px-4 py-4 rounded-lg transition-all duration-200 group ${
                          expandedSections.has(index)
                            ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                            : "bg-muted/60 hover:bg-muted hover:shadow-sm text-foreground border border-border/40"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-1.5">
                          <div className="font-semibold text-sm leading-tight">
                            {section.title}
                          </div>
                          <div
                            className={`text-xs font-medium ${
                              expandedSections.has(index)
                                ? "text-primary-foreground/90"
                                : "text-muted-foreground"
                            }`}
                          >
                            {section.links?.length || 0} resources
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Right Content Area - Links Only */}
              <div className="flex-1 flex flex-col bg-background">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    {selectedRole?.sections?.map(
                      (section, index) =>
                        expandedSections.has(index) && (
                          <div
                            key={index}
                            className="grid grid-cols-1 gap-2 animate-fade-in"
                          >
                            {section.links?.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                  <ExternalLink className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                                    {link.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1 truncate">
                                    {link.url}
                                  </div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-muted-foreground -rotate-90 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                              </a>
                            ))}
                          </div>
                        ),
                    )}

                    {/* Empty State */}
                    {(!selectedRole?.sections ||
                      selectedRole.sections.length === 0) && (
                      <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          No sections available for this role.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GoogleClassroomSection;
