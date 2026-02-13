import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { getUpcomingTrainings, getConductedTrainings, Training } from "@/lib/api";
import { format } from "date-fns";

const Trainings = () => {
  const [upcomingTrainings, setUpcomingTrainings] = useState<Training[]>([]);
  const [conductedTrainings, setConductedTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainings() {
      setLoading(true);
      const [upcoming, conducted] = await Promise.all([
        getUpcomingTrainings(),
        getConductedTrainings(),
      ]);
      setUpcomingTrainings(upcoming);
      setConductedTrainings(conducted);
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="Training Programs" 
          subtitle="Professional development for educators"
        />

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && (
          <>
            {/* Upcoming Trainings */}
            <section className="py-16 sm:py-20 bg-background">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <h2 className="section-title text-3xl mb-4 animate-fade-up">Upcoming Trainings</h2>
                  <div className="section-divider" />
                </div>
                
                {upcomingTrainings.length === 0 ? (
                  <p className="text-center text-muted-foreground">No upcoming trainings at the moment. Check back soon!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {upcomingTrainings.map((training, index) => (
                      <div 
                        key={training.id} 
                        className="card-enhanced overflow-hidden group animate-fade-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {training.image && (
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                              src={training.image}
                              alt={training.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                              <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                                <ArrowRight className="w-4 h-4" />
                                Register Now
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            {training.title}
                          </h3>
                          <p className="text-muted-foreground mt-2">{training.description}</p>
                          <div className="flex items-center gap-2 mt-4 text-sm">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(training.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Conducted Trainings */}
            <section className="py-16 sm:py-20 bg-section-bg">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <h2 className="section-title text-3xl mb-4 animate-fade-up">Trainings Conducted</h2>
                  <div className="section-divider" />
                </div>
                
                {conductedTrainings.length === 0 ? (
                  <p className="text-center text-muted-foreground">No trainings conducted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {conductedTrainings.map((training, index) => (
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
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {training.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {formatDate(training.date)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Trainings;
