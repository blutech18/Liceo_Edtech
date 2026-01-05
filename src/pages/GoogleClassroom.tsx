import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gcStudent from "@/assets/gc-student.jpg";
import gcTeacher from "@/assets/gc-teacher.jpg";
import gcGuardian from "@/assets/gc-guardian.jpg";

const roles = [
  {
    title: "STUDENT",
    image: gcStudent,
    description: "Access your classes, submit assignments, and collaborate with classmates.",
  },
  {
    title: "TEACHER",
    image: gcTeacher,
    description: "Create classes, manage assignments, and track student progress.",
  },
  {
    title: "GUARDIAN",
    image: gcGuardian,
    description: "Monitor your child's academic activities and receive updates.",
  },
];

const GoogleClassroom = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="bg-primary py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-center uppercase tracking-wide">
              Guide to Google Classroom
            </h1>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-center text-muted-foreground mb-10">
              Select your role to access personalized guides and resources for Google Classroom.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-center font-bold text-xl mt-4 text-foreground group-hover:text-primary transition-colors">
                    {role.title}
                  </h2>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-10 italic">
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
