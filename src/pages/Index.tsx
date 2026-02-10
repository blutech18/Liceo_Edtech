import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ParallaxHero from "@/components/ParallaxHero";
import AboutGoalsSection from "@/components/sections/AboutGoalsSection";
import CoreFunctionsSection from "@/components/sections/CoreFunctionsSection";
import ServicesRolesSection from "@/components/sections/ServicesRolesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import VideosSection from "@/components/VideosSection";
import HotlineSection from "@/components/sections/HotlineSection";
import GoogleClassroomSection from "@/components/sections/GoogleClassroomSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import EdTechTeamSection from "@/components/sections/EdTechTeamSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import FormsSection from "@/components/sections/FormsSection";
import Footer from "@/components/Footer";
import { getSectionContent, SectionContent, getSliderImages } from "@/lib/api";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const defaultHeroContent: SectionContent = {
  id: "",
  section_key: "hero",
  title: "LICEO EDUCATIONAL TECHNOLOGY CENTER",
  subtitle: "Empowering education through innovative technology solutions",
};

const Index = () => {
  const [heroContent, setHeroContent] =
    useState<SectionContent>(defaultHeroContent);
  const [sliderPhotos, setSliderPhotos] = useState<
    { src: string; alt: string }[]
  >([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);

  useEffect(() => {
    async function fetchHeroContent() {
      const contentData = await getSectionContent();
      if (contentData.hero) {
        setHeroContent(contentData.hero);
      }
    }
    fetchHeroContent();

    async function fetchSliderImages() {
      setIsLoadingSlider(true);
      const images = await getSliderImages();
      setSliderPhotos(
        images.map((img) => ({ src: img.src, alt: img.alt || "Slider image" })),
      );
      setIsLoadingSlider(false);
    }
    fetchSliderImages();
  }, []);

  // First slider - use slider photos directly
  const parallaxImages = sliderPhotos;

  // Second slider - reversed order
  const sliderImages2 = [...sliderPhotos].reverse();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "hsl(var(--bg-main))" }}
    >
      <Header />
      <main className="flex-1">
        {/* Home Section with Beams Background */}
        <ParallaxHero
          title={heroContent.title}
          subtitle={heroContent.subtitle}
        />

        {/* About & Goals Section */}
        <AboutGoalsSection />

        {/* Core Functions Section */}
        <CoreFunctionsSection />

        {/* Services & Roles Section */}
        <ServicesRolesSection />

        {/* Trainings Section - card carousel + conducted trainings */}
        <ActivitiesSection />

        {/* Google Classroom Section */}
        <GoogleClassroomSection />

        <VideosSection />

        {/* Resources Section Group */}
        <ResourcesSection />
        <FormsSection />

        {/* About Us Section Group */}
        <AboutUsSection />

        {/* Infinite Photo Sliders - above EdTech Team */}
        {isLoadingSlider ? (
          <div className="py-4 md:py-8 space-y-4 md:space-y-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex gap-4 sm:gap-5 md:gap-6 overflow-hidden px-4"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex-shrink-0 rounded-xl sm:rounded-2xl animate-pulse"
                    style={{
                      width: "clamp(220px, 32vw, 350px)",
                      height: "clamp(160px, 24vw, 260px)",
                      backgroundColor: "hsl(var(--bg-surface))",
                      border: "1px solid rgba(128, 0, 0, 0.3)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : sliderPhotos.length > 0 ? (
          <div
            className="py-4 md:py-8 relative z-10 space-y-4 md:space-y-6"
            style={{ backgroundColor: "hsl(var(--bg-surface))" }}
          >
            {/* First slider - moves left */}
            <InfiniteSlider
              images={parallaxImages}
              speed={40}
              direction="left"
            />
            {/* Second slider - moves right (opposite direction) */}
            <InfiniteSlider
              images={sliderImages2}
              speed={35}
              direction="right"
            />
          </div>
        ) : null}

        <EdTechTeamSection />
        <HotlineSection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
