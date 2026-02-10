import { useState, useEffect, useRef, useCallback } from "react";
import {
  Loader2,
  ArrowRight,
  X,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Monitor,
  ExternalLink,
  ChevronDown,
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
  section_key: "activities",
  title: "Trainings",
  subtitle:
    "Explore our workshops and training programs designed to enhance digital literacy",
};

// Define a type that extends Training for display purposes
interface ActivityDisplay {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  training_type?: "online" | "in-person";
  venue?: string;
  participants?: number;
  status: "active" | "inactive";
}

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<ActivityDisplay[]>([]);
  const [conductedTrainings, setConductedTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityDisplay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showConducted, setShowConducted] = useState(false);
  const [conductedPage, setConductedPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [trainingsData, conducted, contentData] = await Promise.all([
        getUpcomingTrainings(),
        getConductedTrainings(),
        getSectionContent(),
      ]);

      // Transform trainings to activity display format
      const activitiesFromTrainings: ActivityDisplay[] = trainingsData.map(
        (training: Training) => ({
          id: training.id,
          title: training.title,
          description: training.description,
          image: training.image,
          date: training.date,
          start_time: training.start_time,
          end_time: training.end_time,
          training_type: training.training_type,
          venue: training.venue,
          participants: training.participants,
          status:
            training.status === "upcoming" ? "active" : ("active" as const),
        }),
      );

      setActivities(activitiesFromTrainings);
      setConductedTrainings(conducted);
      if (contentData.activities) {
        // Only update subtitle from API, keep title as "Trainings"
        setSectionContent({
          ...contentData.activities,
          title: "Trainings",
        });
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const openModal = (activity: ActivityDisplay) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedActivity(null), 300);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (dateStr: string) => {
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

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.offsetWidth;
        const newPosition =
          direction === "left"
            ? scrollPosition - scrollAmount
            : scrollPosition + scrollAmount;

        carouselRef.current.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
        setScrollPosition(newPosition);
      }
    },
    [scrollPosition],
  );

  const startContinuousScroll = (direction: "left" | "right") => {
    scroll(direction);
    scrollIntervalRef.current = setInterval(() => {
      scroll(direction);
    }, 300);
  };

  const stopContinuousScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        scroll("right");
      } else {
        scroll("left");
      }
    }
  };

  // Update scroll position on mount and when activities change
  useEffect(() => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  }, [activities]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const canScrollLeft = scrollPosition > 10;
  const canScrollRight = carouselRef.current
    ? scrollPosition <
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth - 10
    : activities.length > 4;

  return (
    <section
      id="trainings"
      className="py-16 sm:py-20 section-maroon scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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

        {/* Activities Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No activities to display at the moment.
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  onClick={() => openModal(activity)}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl card-enhanced"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {activity.image ? (
                      <img
                        src={activity.image}
                        alt={activity.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:group-hover:scale-110"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                        <span className="text-white/50 text-6xl font-bold">
                          {activity.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm leading-relaxed line-clamp-2">
                        {activity.description || activity.title}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-white font-medium text-sm">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-center font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4 text-foreground group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                    {activity.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conducted Trainings Section - Collapsible */}
        {!loading && conductedTrainings.length > 0 && (
          <div className="mt-16">
            {/* Unified Container with Maroon Gradient */}
            <div
              className="rounded-xl border-2 overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #4a0f0f 0%, #2d0808 100%)",
                borderColor: "rgba(160, 16, 16, 0.6)",
                boxShadow: "0 4px 20px rgba(128, 0, 0, 0.3)",
              }}
            >
              {/* Clickable Header */}
              <button
                onClick={() => setShowConducted(!showConducted)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 group cursor-pointer transition-all duration-300 hover:bg-white/5"
              >
                {/* Left side - Icon and Text */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon container */}
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#A01010] to-[#800000] shadow-md">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Trainings Conducted
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-100 font-medium">
                      {conductedTrainings.length} completed • Click to{" "}
                      {showConducted ? "hide" : "view"}
                    </p>
                  </div>
                </div>

                {/* Right side - Count badge and Chevron */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Count badge */}
                  <div className="flex items-center justify-center min-w-[2.5rem] h-8 sm:h-10 px-3 rounded-lg bg-[#A01010]/30 border border-[#A01010]/50">
                    <span className="text-sm sm:text-lg font-bold text-white">
                      {conductedTrainings.length}
                    </span>
                  </div>

                  {/* Chevron */}
                  <div
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 transition-all duration-300 group-hover:bg-white/20 ${showConducted ? "rotate-180" : "rotate-0"}`}
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </button>

              {/* Expandable Content - Inside the same container */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${showConducted ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                {/* Divider line */}
                <div className="mx-5 sm:mx-6 h-px bg-white/10" />

                {/* Cards Grid */}
                <div className="p-5 sm:p-6 animate-fade-up">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {conductedTrainings
                      .slice(conductedPage * 8, (conductedPage + 1) * 8)
                      .map((training, index) => (
                        <div
                          key={training.id}
                          className="group cursor-pointer"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div
                            className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
                            style={{ aspectRatio: "3/4" }}
                          >
                            {training.image ? (
                              <img
                                src={training.image}
                                alt={training.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:group-hover:scale-110"
                                style={{
                                  backfaceVisibility: "hidden",
                                  transform: "translateZ(0)",
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex flex-col items-center justify-center gap-2">
                                <ImageOff className="w-10 h-10 text-white/30" />
                                <span className="text-white/30 text-xs font-medium">
                                  No Image
                                </span>
                              </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/80 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="flex items-center gap-2 text-white text-xs mb-2">
                                <Clock className="w-3 h-3" />
                                {formatDateShort(training.date)}
                              </div>
                              {training.participants !== undefined &&
                                training.participants > 0 && (
                                  <div className="flex items-center gap-2 text-white text-xs mb-2">
                                    <svg
                                      className="w-3 h-3"
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
                              {(training.poster_link ||
                                training.training_details_link ||
                                training.program_link) && (
                                <div className="flex gap-2 mt-2">
                                  {training.poster_link && (
                                    <a
                                      href={training.poster_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-white text-xs underline hover:text-white/80"
                                    >
                                      Poster
                                    </a>
                                  )}
                                  {training.training_details_link && (
                                    <a
                                      href={training.training_details_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-white text-xs underline hover:text-white/80"
                                    >
                                      Details
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <h3 className="text-center font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4 text-white group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                            {training.title}
                          </h3>
                        </div>
                      ))}
                  </div>

                  {/* Pagination Controls */}
                  {conductedTrainings.length > 8 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button
                        onClick={() =>
                          setConductedPage(Math.max(0, conductedPage - 1))
                        }
                        disabled={conductedPage === 0}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm text-white/90">
                        Page {conductedPage + 1} of{" "}
                        {Math.ceil(conductedTrainings.length / 8)}
                      </span>
                      <button
                        onClick={() =>
                          setConductedPage(
                            Math.min(
                              Math.ceil(conductedTrainings.length / 8) - 1,
                              conductedPage + 1,
                            ),
                          )
                        }
                        disabled={
                          conductedPage >=
                          Math.ceil(conductedTrainings.length / 8) - 1
                        }
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Details Modal */}
      {isModalOpen && selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left Column - Image */}
              <div className="relative h-[280px] sm:h-[400px] md:h-auto overflow-hidden bg-gray-100">
                {selectedActivity.image ? (
                  <img
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-white/30 text-9xl font-bold">
                      {selectedActivity.title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Status and Date Badges - Overlaid on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center gap-3 flex-wrap">
                    {selectedActivity.status === "active" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/90 text-white text-sm font-semibold rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        Active
                      </span>
                    )}
                    {selectedActivity.date && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 text-gray-700 text-sm font-medium rounded-full">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedActivity.date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex-1 flex flex-col justify-center">
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedActivity.title}
                  </h2>

                  {/* Description */}
                  {selectedActivity.description && (
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedActivity.description}
                      </p>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    {/* Date and Time Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(selectedActivity.date)}
                        </p>
                      </div>
                      {selectedActivity.start_time &&
                        selectedActivity.end_time && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Time</p>
                            <p className="font-semibold text-gray-900">
                              {formatTime(selectedActivity.start_time)} -{" "}
                              {formatTime(selectedActivity.end_time)}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* Venue Row */}
                    {selectedActivity.venue && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Venue</p>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {selectedActivity.venue}
                        </p>
                      </div>
                    )}

                    {/* Type and Participants Row */}
                    <div className="grid grid-cols-2 gap-4">
                      {selectedActivity.training_type && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Type</p>
                          <p className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                            {selectedActivity.training_type === "online" ? (
                              <Monitor className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            {selectedActivity.training_type}
                          </p>
                        </div>
                      )}
                      {selectedActivity.participants !== undefined &&
                        selectedActivity.participants > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Participants
                            </p>
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
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
                              {selectedActivity.participants} participants
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ActivitiesSection;
