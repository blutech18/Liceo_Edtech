import { useState, useEffect } from "react";
import { Play, Loader2 } from "lucide-react";
import { getVideos, Video, getSectionContent, SectionContent } from "@/lib/api";

const defaultContent: SectionContent = {
  id: '', section_key: 'videos',
  title: 'Google Workspace Updates',
  subtitle: 'Stay updated with the latest Google Workspace features and tutorials'
};

const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [videosData, contentData] = await Promise.all([
        getVideos(),
        getSectionContent()
      ]);
      setVideos(videosData);
      if (contentData.videos) {
        setSectionContent(contentData.videos);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section className="py-16 sm:py-20 section-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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
        ) : videos.length === 0 ? (
          <p className="text-center text-muted-foreground">No videos available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className="card-enhanced group overflow-hidden animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="video-container relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtube_id}`}
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
        )}
      </div>
    </section>
  );
};

export default VideosSection;
