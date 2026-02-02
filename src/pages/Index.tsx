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

  // All photos - used in both sliders with different orders
  const allPhotos = [
    { src: "/main-zoom.jpg", alt: "Liceo EdTech Team - Main Group Photo" },
    { src: "/338371906_734362534805234_3366201482441741317_n - Copy.jpg", alt: "EdTech Training Session" },
    { src: "/338532354_175174585373633_754774540942843373_n - Copy.jpg", alt: "EdTech Training - Classroom" },
    { src: "/375765614_1392128901706735_5999934061009236073_n.jpg", alt: "EdTech Team Collaboration" },
    { src: "/377111245_817982596460494_8998216380982485328_n.jpg", alt: "EdTech Team Group Photo" },
    { src: "/377116796_182710944842007_6387069679737127570_n.jpg", alt: "EdTech Computer Lab Group" },
    { src: "/487422417_1727927568102374_8999461794905366399_n.jpg", alt: "EdTech Students Session" },
    { src: "/1662959004030.jpeg", alt: "EdTech Training Activity" },
    { src: "/1662959048848.jpg", alt: "EdTech Workshop" },
    { src: "/1662959048963.jpg", alt: "EdTech Learning Session" },
    { src: "/1662959127911.jpeg", alt: "EdTech Team Event" },
    { src: "/1665368454174.jpeg", alt: "EdTech Training Session" },
    { src: "/1665369510610.jpg", alt: "EdTech Learning Event" },
    { src: "/305558604_600165075134295_7509065295010418348_n.jpg", alt: "EdTech Team Photo" },
    { src: "/371510792_664171062565280_3978790831415730128_n.jpg", alt: "EdTech Training" },
    { src: "/376358154_321244916942557_496627954619840386_n.jpg", alt: "EdTech Session" },
    { src: "/377111245_817982596460494_8998216380982485328_n (1).jpg", alt: "EdTech Group Photo" },
    { src: "/393902636_727138639457711_4847343440993204588_n.jpg", alt: "EdTech Training Day" },
    { src: "/416119795_1339872564072799_6633497612539586825_n.jpg", alt: "EdTech Team Activity" },
    { src: "/416345115_1583345455809046_8001964166704505687_n.jpg", alt: "EdTech Session" },
    { src: "/591171122_1338820160768069_5153357539214251193_n.jpg", alt: "EdTech Event" },
    { src: "/IMG20240309090549.jpg", alt: "EdTech Event Photo" },
    { src: "/IMG20240309161330.jpg", alt: "EdTech Training Photo" },
    { src: "/IMG20240309161333.jpg", alt: "EdTech Group Activity" },
    { src: "/_LOT8268.JPG", alt: "EdTech Professional Photo" },
    { src: "/_LOT8272.JPG", alt: "EdTech Team Photo" },
    { src: "/_LOT8289.JPG", alt: "EdTech Group Portrait" },
  ];

  // First slider - original order
  const parallaxImages = allPhotos;

  // Second slider - reversed/shuffled order
  const sliderImages2 = [
    allPhotos[26], allPhotos[13], allPhotos[5], allPhotos[19], allPhotos[2],
    allPhotos[24], allPhotos[8], allPhotos[16], allPhotos[0], allPhotos[21],
    allPhotos[11], allPhotos[3], allPhotos[25], allPhotos[7], allPhotos[18],
    allPhotos[1], allPhotos[23], allPhotos[10], allPhotos[14], allPhotos[6],
    allPhotos[22], allPhotos[4], allPhotos[17], allPhotos[9], allPhotos[20],
    allPhotos[12], allPhotos[15],
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

        {/* Infinite Photo Sliders - overlapping hero */}
        <div className="section-dark py-4 md:py-8 -mt-20 md:-mt-32 relative z-10 space-y-4 md:space-y-6">
          {/* First slider - moves left */}
          <InfiniteSlider images={parallaxImages} speed={40} direction="left" />
          {/* Second slider - moves right (opposite direction) */}
          <InfiniteSlider images={sliderImages2} speed={35} direction="right" />
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
