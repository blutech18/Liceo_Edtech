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
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
      style={{ backgroundColor: "#0F0F0F" }}
    >
      <Header />
      <main className="flex-1">
        {/* Home Section with Beams Background */}
        <ScrollReveal>
          <ParallaxHero
            title={heroContent.title}
            subtitle={heroContent.subtitle}
          />
        </ScrollReveal>

        {/* Infinite Photo Sliders - overlapping hero */}
        {sliderPhotos.length > 0 && (
          <div className="section-dark py-4 md:py-8 -mt-20 md:-mt-32 relative z-10 space-y-4 md:space-y-6">
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
        )}

        {/* About & Goals Section */}
        <ScrollReveal delay={0.05}>
          <AboutGoalsSection />
        </ScrollReveal>

        {/* Core Functions Section */}
        <ScrollReveal delay={0.08}>
          <CoreFunctionsSection />
        </ScrollReveal>

        {/* Services & Roles Section */}
        <ScrollReveal delay={0.1}>
          <ServicesRolesSection />
        </ScrollReveal>

        {/* Trainings Section - card carousel + conducted trainings */}
        <ScrollReveal delay={0.12}>
          <ActivitiesSection />
        </ScrollReveal>

        {/* Google Classroom Section */}
        <ScrollReveal delay={0.14}>
          <GoogleClassroomSection />
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <VideosSection />
        </ScrollReveal>

        {/* Resources Section Group */}
        <ScrollReveal delay={0.18}>
          <ResourcesSection />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <FormsSection />
        </ScrollReveal>

        {/* About Us Section Group */}
        <ScrollReveal delay={0.22}>
          <AboutUsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <EdTechTeamSection />
        </ScrollReveal>
        <ScrollReveal delay={0.26}>
          <HotlineSection />
        </ScrollReveal>
        <ScrollReveal delay={0.28}>
          <FeedbackSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
