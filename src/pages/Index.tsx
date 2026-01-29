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

  useEffect(() => {
    async function fetchHeroContent() {
      const contentData = await getSectionContent();
      if (contentData.hero) {
        setHeroContent(contentData.hero);
      }
    }
    fetchHeroContent();
  }, []);

  const parallaxImages = [
    {
      src: "/main-zoom.jpg",
      alt: "Liceo EdTech Team - Main Group Photo",
    },
    {
      src: "/338371906_734362534805234_3366201482441741317_n - Copy.jpg",
      alt: "EdTech Training Session - Computer Lab",
    },
    {
      src: "/338532354_175174585373633_754774540942843373_n - Copy.jpg",
      alt: "EdTech Training - Classroom Learning",
    },
    {
      src: "/375765614_1392128901706735_5999934061009236073_n.jpg",
      alt: "EdTech Team Collaboration",
    },
    {
      src: "/377111245_817982596460494_8998216380982485328_n.jpg",
      alt: "EdTech Team Group Photo",
    },
    {
      src: "/377116796_182710944842007_6387069679737127570_n.jpg",
      alt: "EdTech Team - Computer Lab Group Photo",
    },
    {
      src: "/487422417_1727927568102374_8999461794905366399_n.jpg",
      alt: "EdTech Training - Students Learning Session",
    },
  ];

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

        {/* Infinite Photo Slider - overlapping hero */}
        <div className="section-dark py-8 md:py-12 -mt-20 md:-mt-32 relative z-10">
          <InfiniteSlider images={parallaxImages} speed={40} />
        </div>

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
