import { useState, useEffect } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  const [showMobileNav, setShowMobileNav] = useState(false);


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
              {/* Mobile Section Navigator - Dropdown Style */}
              <div className="sm:hidden border-b border-border bg-muted/30 flex-shrink-0 p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-12 text-left font-medium overflow-hidden"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                        <Badge variant="secondary" className="text-xs px-2 flex-shrink-0">
                          {activeTab + 1}/{selectedRole?.sections?.length || 0}
                        </Badge>
                        <span className="truncate block">
                          {selectedRole?.sections?.[activeTab]?.title}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-[400px]">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b mb-1">
                      Select a tutorial section
                    </div>
                    {selectedRole?.sections?.map((section, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex justify-between items-center py-3 ${
                          activeTab === index ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <span className="font-medium">{section.title}</span>
                        <Badge variant={activeTab === index ? "default" : "secondary"} className="text-xs">
                          {section.links?.length || 0} links
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Quick navigation arrows */}
                <div className="flex items-center justify-between mt-2 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab(activeTab - 1)}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={activeTab === (selectedRole?.sections?.length || 1) - 1}
                    onClick={() => setActiveTab(activeTab + 1)}
                    className="flex-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Desktop Tab Navigation */}
              <div className="hidden sm:block border-b border-border bg-muted/20 flex-shrink-0">
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
