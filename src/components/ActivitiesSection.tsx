import activityDigitalCitizenship from "@/assets/activity-digital-citizenship.jpg";
import activityGoogleWorkspace from "@/assets/activity-google-workspace.jpg";
import activityEmanuscript from "@/assets/activity-emanuscript.jpg";
import activityCanva from "@/assets/activity-canva.jpg";

const activities = [
  {
    image: activityDigitalCitizenship,
    caption: "Digital Citizenship and Internet Safety Educating",
  },
  {
    image: activityGoogleWorkspace,
    caption: "Mastering Google Workspace Education: Unlocking the Latest Tools for 21st Century Learning",
  },
  {
    image: activityEmanuscript,
    caption: "Exploring eManuscript: Enhancing Library Resources with Digital Archival",
  },
  {
    image: activityCanva,
    caption: "Canva for the Classroom: Basic Editing Skills for Photos and Videos",
  },
];

const ActivitiesSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl sm:text-4xl mb-4 animate-fade-up">
            Our Activities
          </h2>
          <div className="section-divider mb-4" />
          <p className="section-subtitle animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Explore our workshops and training programs designed to enhance digital literacy
          </p>
        </div>
        
        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="activity-card group animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <img
                  src={activity.image}
                  alt={activity.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {activity.caption}
                  </p>
                </div>
              </div>
              
              {/* Caption below (visible by default) */}
              <p className="mt-4 text-sm text-muted-foreground text-center leading-relaxed px-2 group-hover:text-foreground transition-colors duration-300">
                {activity.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
