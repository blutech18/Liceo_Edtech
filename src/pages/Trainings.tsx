import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import activityDigitalCitizenship from "@/assets/activity-digital-citizenship.jpg";
import activityGoogleWorkspace from "@/assets/activity-google-workspace.jpg";
import activityEmanuscript from "@/assets/activity-emanuscript.jpg";
import activityCanva from "@/assets/activity-canva.jpg";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const upcomingTrainings = [
  {
    image: activityCanva,
    title: "Canva for the Classroom",
    description: "Basic Editing Skills for Photos and Videos",
    date: "To Be Announced",
  },
  {
    image: activityGoogleWorkspace,
    title: "Mastering Google Workspace Education",
    description: "Unlocking the Latest Tools for 21st Century Learning",
    date: "To Be Announced",
  },
];

const conductedTrainings = [
  {
    title: "Digital Citizenship and Internet Safety Educating",
    date: "November 2024",
    image: activityDigitalCitizenship,
  },
  {
    title: "Exploring eManuscript: Enhancing Library Resources with Digital Archival",
    date: "October 2024",
    image: activityEmanuscript,
  },
  {
    title: "Google Workspace for Education Fundamentals",
    date: "September 2024",
    image: activityGoogleWorkspace,
  },
  {
    title: "OBS Studio Training for Online Classes",
    date: "August 2024",
    image: null,
  },
  {
    title: "Learning Management System (LMS) Training",
    date: "July 2024",
    image: null,
  },
];

const Trainings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="Training Programs" 
          subtitle="Professional development for educators"
        />

        {/* Upcoming Trainings */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl mb-4 animate-fade-up">Upcoming Trainings</h2>
              <div className="section-divider" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {upcomingTrainings.map((training, index) => (
                <div 
                  key={index} 
                  className="card-enhanced overflow-hidden group animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {training.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">{training.description}</p>
                    <div className="flex items-center gap-2 mt-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {training.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conducted Trainings */}
        <section className="py-16 sm:py-20 bg-section-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl mb-4 animate-fade-up">Trainings Conducted</h2>
              <div className="section-divider" />
            </div>
            
            <div className="space-y-4">
              {conductedTrainings.map((training, index) => (
                <div
                  key={index}
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
                      {training.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Trainings;
