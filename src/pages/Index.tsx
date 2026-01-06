import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import ActivitiesSection from "@/components/ActivitiesSection";
import VideosSection from "@/components/VideosSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Liceo Educational Technology Center"
          subtitle="Empowering education through innovative technology solutions"
        />
        <ActivitiesSection />
        <VideosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
