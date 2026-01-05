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
    <section className="py-8 sm:py-12 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-8">
          LATEST VIDEOS FOR GOOGLE WORKSPACE UPDATES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-background rounded-sm shadow-md overflow-hidden">
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
