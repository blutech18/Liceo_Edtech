import heroImage from "@/assets/hero-staff.jpg";

const HeroSection = () => {
  return (
    <section className="relative">
      {/* Hero Image with Enhanced Overlay */}
      <div className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden">
        <img
          src={heroImage}
          alt="Liceo EdTech Center Staff"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse-soft_8s_ease-in-out_infinite]"
        />
        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent" />
        
        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent opacity-40" />
      </div>

      {/* Title Banner with Enhanced Design */}
      <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary py-8 sm:py-10 overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-center tracking-tight">
            <span className="block animate-fade-up">LICEO</span>
            <span className="block font-light lowercase text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              educational
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: '0.2s' }}>
              TECHNOLOGY CENTER
            </span>
          </h1>
          
          {/* Decorative Line */}
          <div className="flex justify-center mt-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-24 h-1 bg-primary-foreground/40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
