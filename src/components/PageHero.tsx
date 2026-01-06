import heroImage from "@/assets/hero-staff.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden">
        <img
          src={heroImage}
          alt="Liceo EdTech Center Staff"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      {/* Title Banner */}
      <div className="bg-primary py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground text-center tracking-wide uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="text-primary-foreground/80 text-center mt-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
