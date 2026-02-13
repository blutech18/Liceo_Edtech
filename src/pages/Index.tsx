import { useState, useEffect, ComponentType } from "react";
import Header from "@/components/Header";
import ParallaxHero from "@/components/ParallaxHero";
import AboutGoalsSection from "@/components/sections/AboutGoalsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import VideosSection from "@/components/VideosSection";
import HotlineSection from "@/components/sections/HotlineSection";
import GoogleClassroomSection from "@/components/sections/GoogleClassroomSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import EdTechTeamSection from "@/components/sections/EdTechTeamSection";
import FeedbackSection from "@/components/sections/FeedbackSection";
import AboutUsGroupSection from "@/components/sections/AboutUsGroupSection";
import FormsSection from "@/components/sections/FormsSection";
import Footer from "@/components/Footer";
import { getSectionContent, getSectionOrder, SectionContent } from "@/lib/api";

// Map section keys to their React components
const sectionComponentMap: Record<string, ComponentType> = {
  trainings: ActivitiesSection,
  google_classroom: GoogleClassroomSection,
  videos: VideosSection,
  resources: ResourcesSection,
  forms: FormsSection,
  about_us: AboutUsGroupSection,
  team: EdTechTeamSection,
  hotline: HotlineSection,
  feedback: FeedbackSection,
};

// Default order matching the original hardcoded layout
const defaultSectionOrder = [
  "trainings",
  "google_classroom",
  "videos",
  "resources",
  "forms",
  "about_us",
  "team",
  "hotline",
  "feedback",
];

const defaultHeroContent: SectionContent = {
  id: "",
  section_key: "hero",
  title: "LICEO EDUCATIONAL TECHNOLOGY CENTER",
  subtitle: "Empowering education through innovative technology solutions",
};

const Index = () => {
  const [heroContent, setHeroContent] =
    useState<SectionContent>(defaultHeroContent);
  const [sectionOrder, setSectionOrder] =
    useState<string[]>(defaultSectionOrder);

  useEffect(() => {
    async function fetchData() {
      const [contentData, savedOrder] = await Promise.all([
        getSectionContent(),
        getSectionOrder(),
      ]);
      if (contentData.hero) {
        setHeroContent(contentData.hero);
      }
      if (savedOrder && savedOrder.length > 0) {
        // Merge: use saved order, append any new sections not in saved order
        const merged = [...savedOrder];
        defaultSectionOrder.forEach((key) => {
          if (!merged.includes(key)) merged.push(key);
        });
        setSectionOrder(merged);
      }
    }
    fetchData();
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

        {/* About & Goals Section (always first after hero) */}
        <AboutGoalsSection />

        {/* Dynamic sections rendered in saved order */}
        {sectionOrder.map((key) => {
          const SectionComponent = sectionComponentMap[key];
          if (!SectionComponent) return null;
          return <SectionComponent key={key} />;
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
