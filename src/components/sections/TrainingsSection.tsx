import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Loader2, ExternalLink, MapPin, Monitor } from "lucide-react";
import { getUpcomingTrainings, getConductedTrainings, Training, getSectionContent, SectionContent } from "@/lib/api";
import { format } from "date-fns";

const defaultContent: SectionContent = {
  id: '', section_key: 'trainings',
  title: 'Training Programs',
  subtitle: 'Professional development for educators'
};

const TrainingsSection = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState<Training[]>([]);
  const [conductedTrainings, setConductedTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);
  const [showAllConducted, setShowAllConducted] = useState(false);

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
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <section id="trainings" className="py-16 sm:py-20 section-white scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <h2 className="section-title text-3xl sm:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-muted-foreground/30">|</span>
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
          <>            {/* Conducted Trainings */}
            <div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="px-4 py-1.5 rounded-full text-sm font-medium border bg-primary/10 text-primary border-primary/20">
                  Trainings Conducted
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              {conductedTrainings.length === 0 ? (
                <p className="text-center text-muted-foreground">No trainings conducted yet.</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {(showAllConducted ? conductedTrainings : conductedTrainings.slice(0, 4)).map((training, index) => (
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
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                              {formatDate(training.date)}
                            </div>
                            {training.start_time && training.end_time && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {formatTime(training.start_time)} - {formatTime(training.end_time)}
                              </div>
                            )}
                            {training.training_type && (
                              <div className="flex items-center gap-1.5">
                                {training.training_type === 'online' ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                                <span className="capitalize">{training.training_type}</span>
                              </div>
                            )}
                            {training.venue && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {training.venue}
                              </div>
                            )}
                            {training.participants !== undefined && training.participants > 0 && (
                              <div className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {training.participants} participants
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Training Links - Right side corner */}
                        {(training.poster_link || training.training_details_link || training.program_link) && (
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
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrainingsSection;
