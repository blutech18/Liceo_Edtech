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
  const [showAllConducted, setShowAllConducted] = useState(false);
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
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-white/30">|</span>
            <p className="section-subtitle text-base sm:text-lg">
              {sectionContent.subtitle}
            </p>
          </div>
        </div>

        {/* Activities Carousel */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No activities to display at the moment.
          </p>
        ) : (
          <div className="relative px-16">
            {/* Left Arrow - Outside */}
            {activities.length > 4 && scrollPosition > 10 && (
              <button
                onClick={() => scroll("left")}
                onMouseDown={() => startContinuousScroll("left")}
                onMouseUp={stopContinuousScroll}
                onMouseLeave={stopContinuousScroll}
                onTouchStart={() => startContinuousScroll("left")}
                onTouchEnd={stopContinuousScroll}
                className="absolute -left-2 top-[40%] -translate-y-1/2 z-10 p-4 bg-white hover:bg-white rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-7 h-7 text-[#8B1538]" />
              </button>
            )}

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="grid grid-flow-col auto-cols-[calc(25%-1.5rem)] sm:auto-cols-[calc(25%-1.5rem)] gap-8 pb-4">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="group cursor-pointer animate-fade-up"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    onClick={() => openModal(activity)}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl card-enhanced"
                      style={{ aspectRatio: "5/7" }}
                    >
                      {activity.image ? (
                        <img
                          src={activity.image}
                          alt={activity.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{
                            willChange: "transform",
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
                      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-sm leading-relaxed line-clamp-2">
                          {activity.description || activity.title}
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-white font-medium text-sm">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-center font-bold text-lg mt-6 text-foreground group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                      {activity.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow - Outside */}
            {activities.length > 4 && (
              <button
                onClick={() => scroll("right")}
                onMouseDown={() => startContinuousScroll("right")}
                onMouseUp={stopContinuousScroll}
                onMouseLeave={stopContinuousScroll}
                onTouchStart={() => startContinuousScroll("right")}
                onTouchEnd={stopContinuousScroll}
                className="absolute -right-2 top-[40%] -translate-y-1/2 z-10 p-4 bg-white hover:bg-white rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-7 h-7 text-[#8B1538]" />
              </button>
            )}
          </div>
        )}

        {/* Conducted Trainings Section */}
        {!loading && conductedTrainings.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="px-4 py-1.5 rounded-full text-sm font-medium border bg-primary/10 text-primary border-primary/20">
                Trainings Conducted
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

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
                  {training.image && (
                    <div className="w-full sm:w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={training.image}
                        alt={training.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          willChange: "transform",
                          backfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {training.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatDateShort(training.date)}
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
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAllConducted(!showAllConducted)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors duration-200"
                >
                  {showAllConducted ? (
                    <>
                      Show Less
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </>
                  ) : (
                    <>
                      Show More ({conductedTrainings.length - 4} more)
                      <ArrowRight className="w-4 h-4 -rotate-90" />
                    </>
                  )}
                </button>
              </div>
            )}
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
              <div className="relative h-[500px] md:h-auto overflow-hidden bg-gray-100">
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
