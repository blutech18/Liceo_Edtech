import { useState, useEffect } from "react";
import { Play, Loader2 } from "lucide-react";
import { getVideos, Video, getSectionContent, SectionContent } from "@/lib/api";

const defaultContent: SectionContent = {
  id: "",
  section_key: "videos",
  title: "Google Workspace Updates",
  subtitle:
    "Stay updated with the latest Google Workspace features and tutorials",
};

const LazyYouTube = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full h-full group/play cursor-pointer bg-black"
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/play:bg-black/40 transition-colors">
        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform">
          <Play className="w-6 h-6 text-white ml-1" fill="white" />
        </div>
      </div>
    </button>
  );
};

const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionContent, setSectionContent] =
    useState<SectionContent>(defaultContent);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [videosData, contentData] = await Promise.all([
        getVideos(),
        getSectionContent(),
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
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold">
              {sectionContent.title}
            </h2>
            <span className="hidden sm:block text-2xl text-muted-foreground/30">
              |
            </span>
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
          <p className="text-center text-muted-foreground">
            No videos available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="card-enhanced group overflow-hidden animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="video-container relative">
                  <LazyYouTube videoId={video.youtube_id} title={video.title} />
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
