import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ExternalLink, ArrowUpRight } from "lucide-react";

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

const categoryColors: Record<string, string> = {
  "Interactive Learning": "bg-blue-500/10 text-blue-600 border-blue-200",
  "Media Production": "bg-purple-500/10 text-purple-600 border-purple-200",
  "Design": "bg-pink-500/10 text-pink-600 border-pink-200",
  "Google Workspace": "bg-green-500/10 text-green-600 border-green-200",
  "Collaboration": "bg-orange-500/10 text-orange-600 border-orange-200",
};

const Resources = () => {
  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="Educational Resources" 
          subtitle="Tools and platforms to enhance your teaching"
        />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto animate-fade-up">
              Explore our curated collection of educational technology tools and resources.
            </p>

            {categories.map((category, catIndex) => (
              <div 
                key={category} 
                className="mb-12 animate-fade-up"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${categoryColors[category]}`}>
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter((r) => r.category === category)
                    .map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-enhanced p-5 group hover-lift"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {resource.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
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
