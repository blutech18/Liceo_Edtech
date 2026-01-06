import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import gcStudent from "@/assets/gc-student.jpg";
import gcTeacher from "@/assets/gc-teacher.jpg";
import gcGuardian from "@/assets/gc-guardian.jpg";
import { ArrowRight } from "lucide-react";

const roles = [
  {
    title: "Student",
    image: gcStudent,
    description: "Access your classes, submit assignments, and collaborate with classmates.",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Teacher",
    image: gcTeacher,
    description: "Create classes, manage assignments, and track student progress.",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Guardian",
    image: gcGuardian,
    description: "Monitor your child's academic activities and receive updates.",
    color: "from-purple-500 to-purple-600",
  },
];

const GoogleClassroom = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero 
          title="Guide to Google Classroom" 
          subtitle="Select your role to access personalized resources"
        />

        {/* Content */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto animate-fade-up">
              Select your role to access personalized guides and resources for Google Classroom.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl card-enhanced">
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${role.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm leading-relaxed">
                        {role.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-white font-medium text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-center font-bold text-2xl mt-6 text-foreground group-hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                    {role.title}
                  </h2>
                  <p className="text-center text-sm text-muted-foreground mt-2 px-4">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-12 italic animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Image sources: Shutterstock, PSU, TeachHub
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleClassroom;
