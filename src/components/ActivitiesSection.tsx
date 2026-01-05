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
    <section className="py-8 sm:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-8">ACTIVITIES</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="activity-card group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                <img
                  src={activity.image}
                  alt={activity.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground text-center leading-relaxed px-2">
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
