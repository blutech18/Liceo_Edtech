import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    name: "Flippity",
    description: "Create flashcards, quizzes, and games from Google Sheets",
    url: "https://flippity.net/",
    category: "Interactive Learning",
  },
  {
    name: "OBS Studio",
    description: "Free and open source software for video recording and live streaming",
    url: "https://obsproject.com/",
    category: "Media Production",
  },
  {
    name: "Canva",
    description: "Design presentations, posters, and visual content",
    url: "https://www.canva.com/",
    category: "Design",
  },
  {
    name: "Google Docs",
    description: "Create and edit documents online collaboratively",
    url: "https://docs.google.com/",
    category: "Google Workspace",
  },
  {
    name: "Google Slides",
    description: "Create beautiful presentations for your classes",
    url: "https://slides.google.com/",
    category: "Google Workspace",
  },
  {
    name: "Google Forms",
    description: "Create surveys, quizzes, and collect data easily",
    url: "https://forms.google.com/",
    category: "Google Workspace",
  },
  {
    name: "Google Meet",
    description: "Video conferencing for virtual classes and meetings",
    url: "https://meet.google.com/",
    category: "Google Workspace",
  },
  {
    name: "Google Drive",
    description: "Store, share, and access files from anywhere",
    url: "https://drive.google.com/",
    category: "Google Workspace",
  },
  {
    name: "Kahoot!",
    description: "Game-based learning platform for interactive quizzes",
    url: "https://kahoot.com/",
    category: "Interactive Learning",
  },
  {
    name: "Padlet",
    description: "Digital canvas for collaborative brainstorming",
    url: "https://padlet.com/",
    category: "Collaboration",
  },
  {
    name: "Quizizz",
    description: "Gamified quizzes for student engagement",
    url: "https://quizizz.com/",
    category: "Interactive Learning",
  },
  {
    name: "Loom",
    description: "Screen and video recording for instructional content",
    url: "https://www.loom.com/",
    category: "Media Production",
  },
];

const Resources = () => {
  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title="Educational Resources" />

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-center text-muted-foreground mb-10">
              Explore our curated collection of educational technology tools and resources.
            </p>

            {categories.map((category) => (
              <div key={category} className="mb-10">
                <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter((r) => r.category === category)
                    .map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card p-4 rounded-lg shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {resource.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {resource.description}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
