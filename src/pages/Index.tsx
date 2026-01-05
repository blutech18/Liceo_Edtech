import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import VideosSection from "@/components/VideosSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ActivitiesSection />
        <VideosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
