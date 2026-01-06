import { Play } from "lucide-react";

const videos = [
  {
    id: "mkshQPIH8xs",
    title: "Google Classroom Practice Sets",
    channel: "Sara Hoffman",
  },
  {
    id: "3Q8CQ9vcHwE",
    title: "Google Meet: Start a video conference",
    channel: "Google Workspace",
  },
  {
    id: "CsGYh8AacgY",
    title: "Google Classroom Updates 2023",
    channel: "Sara Hoffman",
  },
];

const VideosSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl sm:text-4xl mb-4 animate-fade-up">
            Google Workspace Updates
          </h2>
          <div className="section-divider mb-4" />
          <p className="section-subtitle animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Stay updated with the latest Google Workspace features and tutorials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className="card-enhanced group overflow-hidden animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="video-container relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-3 h-3 text-primary" />
                  </span>
                  {video.channel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
