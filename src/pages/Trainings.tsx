import Header from "@/components/Header";
import Footer from "@/components/Footer";
import activityDigitalCitizenship from "@/assets/activity-digital-citizenship.jpg";
import activityGoogleWorkspace from "@/assets/activity-google-workspace.jpg";
import activityEmanuscript from "@/assets/activity-emanuscript.jpg";
import activityCanva from "@/assets/activity-canva.jpg";

const upcomingTrainings = [
  {
    image: activityCanva,
    title: "Canva for the Classroom",
    description: "Basic Editing Skills for Photos and Videos",
    date: "TBA",
  },
  {
    image: activityGoogleWorkspace,
    title: "Mastering Google Workspace Education",
    description: "Unlocking the Latest Tools for 21st Century Learning",
    date: "TBA",
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
        {/* Hero Banner */}
        <div className="bg-primary py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-center uppercase tracking-wide">
              Trainings
            </h1>
          </div>
        </div>

        {/* Upcoming Trainings */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="section-title text-center mb-8">Upcoming Trainings</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {upcomingTrainings.map((training, index) => (
                <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={training.image}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{training.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{training.description}</p>
                    <p className="text-sm text-primary font-medium mt-2">{training.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conducted Trainings */}
        <section className="py-8 sm:py-12 bg-section-bg">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="section-title text-center mb-8">Trainings Conducted</h2>
            
            <div className="space-y-4">
              {conductedTrainings.map((training, index) => (
                <div
                  key={index}
                  className="bg-card p-4 rounded-lg shadow-sm border border-border flex flex-col sm:flex-row gap-4"
                >
                  {training.image && (
                    <div className="w-full sm:w-32 h-24 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={training.image}
                        alt={training.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{training.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{training.date}</p>
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
