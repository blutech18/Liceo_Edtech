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
import { getSectionContent, SectionContent } from "@/lib/api";

const defaultHeroContent: SectionContent = {
  id: "",
  section_key: "hero",
  title: "LICEO EDUCATIONAL TECHNOLOGY CENTER",
  subtitle: "Empowering education through innovative technology solutions",
};

const Index = () => {
  const [heroContent, setHeroContent] =
    useState<SectionContent>(defaultHeroContent);

  useEffect(() => {
    async function fetchHeroContent() {
      const contentData = await getSectionContent();
      if (contentData.hero) {
        setHeroContent(contentData.hero);
      }
    }
    fetchHeroContent();
  }, []);

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

        {/* Core Functions Section */}
        <CoreFunctionsSection />

        {/* Services & Roles Section */}
        <ServicesRolesSection />

        <EdTechTeamSection />
        <HotlineSection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
