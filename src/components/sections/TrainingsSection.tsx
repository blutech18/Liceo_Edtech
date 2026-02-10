import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Calendar,
  Clock,
  ArrowRight,
  Loader2,
  ExternalLink,
  MapPin,
  Monitor,
  ImageOff,
} from "lucide-react";
import {
  getUpcomingTrainings,
  getConductedTrainings,
  Training,
  getSectionContent,
  SectionContent,
} from "@/lib/api";
import { format } from "date-fns";

const defaultContent: SectionContent = {
  id: "",
  section_key: "trainings",
  title: "Training Programs",
  subtitle: "Professional development for educators",
};

const TrainingsSection = () => {
  const { theme } = useTheme();
  const [upcomingTrainings, setUpcomingTrainings] = useState<Training[]>([]);
  const [conductedTrainings, setConductedTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);
  const [showAllConducted, setShowAllConducted] = useState(false);
  const [showConducted, setShowConducted] = useState(true);

  useEffect(() => {
    async function fetchTrainings() {
      setLoading(true);
      const [upcoming, conducted, contentData] = await Promise.all([
        getUpcomingTrainings(),
        getConductedTrainings(),
        getSectionContent(),
      ]);
      setUpcomingTrainings(upcoming);
      setConductedTrainings(conducted);
      if (contentData.trainings) {
        setSectionContent(contentData.trainings);
      }
      setLoading(false);
    }
    fetchTrainings();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMMM yyyy");
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    try {
      const [hours, minutes] = timeStr.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <section
      id="trainings"
      className="py-16 sm:py-20 section-white scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {" "}
            {/* Conducted Trainings */}
            <div>
              {/* Clickable Dropdown Header - Card Style */}
              <button
                onClick={() => setShowConducted(!showConducted)}
                className="w-full mb-8 group cursor-pointer"
              >
                <div
                  className="relative flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all duration-300 group-hover:shadow-lg group-active:scale-[0.99]"
                  style={{
                    background:
                      theme === "dark"
                        ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                        : "linear-gradient(135deg, #A01010 0%, #800000 100%)",
                    borderColor:
                      theme === "dark"
                        ? "rgba(99, 102, 241, 0.4)"
                        : "rgba(128, 0, 0, 0.3)",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                        : "0 4px 20px rgba(128, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      theme === "dark"
                        ? "rgba(99, 102, 241, 0.7)"
                        : "rgba(160, 16, 16, 0.8)";
                    e.currentTarget.style.boxShadow =
                      theme === "dark"
                        ? "0 8px 30px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        : "0 8px 30px rgba(128, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      theme === "dark"
                        ? "rgba(99, 102, 241, 0.4)"
                        : "rgba(128, 0, 0, 0.3)";
                    e.currentTarget.style.boxShadow =
                      theme === "dark"
                        ? "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                        : "0 4px 20px rgba(128, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                  }}
                >
                  {/* Left side - Icon and Text */}
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${theme === "dark" ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-white/10 checkbox-border"}`}>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Text content */}
                    <div className="text-left">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                        Trainings Conducted
                      </h3>
                      <p className={`text-sm font-medium ${theme === "dark" ? "text-indigo-300/80" : "text-white/80"}`}>
                        Click to {showConducted ? "collapse" : "expand"} •{" "}
                        {conductedTrainings.length} total
                      </p>
                    </div>
                  </div>

                  {/* Right side - Count and Chevron */}
                  <div className="flex items-center gap-4">
                    {/* Count badge */}
                    <div className={`hidden sm:flex items-center justify-center min-w-[3rem] h-10 px-4 rounded-xl border ${theme === "dark" ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/30" : "bg-white/10 border-white/20"}`}>
                      <span className="text-lg font-bold text-white">
                        {conductedTrainings.length}
                      </span>
                    </div>

                    {/* Chevron */}
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${showConducted ? "rotate-180" : "rotate-0"} ${theme === "dark" ? "bg-white/10 group-hover:bg-white/20" : "bg-white/10 group-hover:bg-white/20"}`}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              {/* Collapsible Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${showConducted ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                {conductedTrainings.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No trainings conducted yet.
                  </p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {(showAllConducted
                        ? conductedTrainings
                        : conductedTrainings.slice(0, 4)
                      ).map((training, index) => (
                        <div
                          key={training.id}
                          className="card-enhanced p-5 flex flex-col sm:flex-row gap-5 group animate-fade-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="w-full sm:w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl">
                            {training.image ? (
                              <img
                                src={training.image}
                                alt={training.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] md:group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted/50 border border-border rounded-xl flex flex-col items-center justify-center gap-1.5">
                                <ImageOff className="w-8 h-8 text-muted-foreground/40" />
                                <span className="text-xs text-muted-foreground/40 font-medium">
                                  No Image
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {training.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {formatDate(training.date)}
                              </div>
                              {training.start_time && training.end_time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  {formatTime(training.start_time)} -{" "}
                                  {formatTime(training.end_time)}
                                </div>
                              )}
                              {training.training_type && (
                                <div className="flex items-center gap-1.5">
                                  {training.training_type === "online" ? (
                                    <Monitor className="w-3.5 h-3.5" />
                                  ) : (
                                    <MapPin className="w-3.5 h-3.5" />
                                  )}
                                  <span className="capitalize">
                                    {training.training_type}
                                  </span>
                                </div>
                              )}
                              {training.venue && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {training.venue}
                                </div>
                              )}
                              {training.participants !== undefined &&
                                training.participants > 0 && (
                                  <div className="flex items-center gap-1.5">
                                    <svg
                                      className="w-3.5 h-3.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                    {training.participants} participants
                                  </div>
                                )}
                            </div>
                          </div>

                          {/* Training Links - Right side corner */}
                          {(training.poster_link ||
                            training.training_details_link ||
                            training.program_link) && (
                            <div className="flex flex-row gap-2 justify-center items-center">
                              {training.poster_link && (
                                <a
                                  href={training.poster_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Poster
                                </a>
                              )}
                              {training.training_details_link && (
                                <a
                                  href={training.training_details_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Training Details
                                </a>
                              )}
                              {training.program_link && (
                                <a
                                  href={training.program_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Program
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Show More/Less Button */}
                    {conductedTrainings.length > 4 && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => setShowAllConducted(!showAllConducted)}
                          className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)",
                            boxShadow: "0 4px 20px rgba(13, 148, 136, 0.35)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 8px 30px rgba(13, 148, 136, 0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 4px 20px rgba(13, 148, 136, 0.35)";
                          }}
                        >
                          {/* Shimmer effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                          <span className="relative z-10 flex items-center gap-3 text-sm sm:text-base">
                            {showAllConducted ? (
                              <>
                                <svg
                                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                                Show Less
                              </>
                            ) : (
                              <>
                                <svg
                                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                                View All {conductedTrainings.length - 4} More
                                Trainings
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>{" "}
              {/* End of Collapsible Content */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrainingsSection;
