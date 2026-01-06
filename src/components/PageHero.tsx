import heroImage from "@/assets/hero-staff.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <img
          src={heroImage}
          alt="Liceo EdTech Center Staff"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent opacity-30" />
      </div>

      {/* Title Banner */}
      <div className="relative bg-gradient-to-r from-primary via-primary to-primary-dark py-6 sm:py-8">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-center tracking-tight animate-fade-up">
            {title}
          </h1>
          {subtitle && (
            <p className="text-primary-foreground/80 text-center mt-3 text-base sm:text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
